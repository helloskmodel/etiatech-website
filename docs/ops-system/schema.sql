-- 灯泡 / 设备全链路追溯 —— PostgreSQL 表结构（第 1、2 期）
--
-- 设计说明见 docs/ops-system/TRACEABILITY.md。两条不能动摇的原则：
--   ① 事件只追加，永不修改删除 —— 当前状态由事件推导（§3）
--   ② 所有业务表带 site_id，时间一律 timestamptz 存 UTC（DESIGN.md §2.1/2.2）
--
-- 权威库部署在国内腾讯云；境外 Vercel 只读一份**不含客户信息**的同步副本
-- （见 TRACEABILITY.md §6）。所以下面凡是客户相关的表，都不出境。

begin;

-- ===========================================================================
-- 主数据
-- ===========================================================================

-- 站点 / 工厂。将来东南亚开厂就在这里加一行，不改任何表结构。
create table site (
  id             bigserial primary key,
  code           text        not null unique,          -- CN-HQ / TH / VN
  serial_letter  char(1)     not null unique,          -- C / T / V，进序列号
  name_i18n      jsonb       not null,                 -- {"zh":"…","en":"…"}
  timezone       text        not null,                 -- Asia/Shanghai …
  currency       char(3)     not null,
  default_locale text        not null default 'en',
  created_at     timestamptz not null default now()
);

create table app_user (
  id           bigserial primary key,
  site_id      bigint      not null references site(id),
  name         text        not null,
  wecom_userid text unique,                            -- 东南亚员工没有，可空
  email        text unique,
  locale       text        not null default 'en',
  active       boolean     not null default true,
  created_at   timestamptz not null default now()
);

-- 物料 / 型号。灯泡的 Part Number（012-64000R）、主机型号（S2000-XLA）都在这。
create table item (
  id              bigserial primary key,
  code            text        not null unique,         -- 012-64000R / S2000-XLA
  kind            text        not null
                  check (kind in ('lamp','device','accessory')),
  brand           text        not null default 'Excelitas',
  name_i18n       jsonb       not null,
  spec_i18n       jsonb       not null default '{}'::jsonb,
  rated_hours     int,                                 -- 灯泡额定寿命
  warranty_months int,
  chanjet_code    text,                                -- 与畅捷通对账用
  created_at      timestamptz not null default now()
);

create table customer (
  id             bigserial primary key,
  code           text        not null unique,
  name_i18n      jsonb       not null,
  country        text,
  default_locale text        not null default 'en',
  chanjet_code   text,
  created_at     timestamptz not null default now()
);

-- ===========================================================================
-- 入库批次 —— 手写 Lot 只在这里录一次
-- ===========================================================================

-- 灯泡盒上的 Lot Number 是**蓝色圆珠笔手写**的（TRACEABILITY.md §2.1），
-- 所以整箱只录一次，而不是每支录一次 —— 把人工转抄的出错面降到最小。
create table intake_batch (
  id           bigserial primary key,
  site_id      bigint      not null references site(id),
  item_id      bigint      not null references item(id),

  oem_lot_raw  text,                 -- 原样照抄，**永不清洗**：将来批次格式
                                     -- 解读规则变了，还能重新解析
  mfg_date     date,                 -- 从 oem_lot 解析。格式待原厂确认
                                     -- （TRACEABILITY.md §10 第 1 项），
                                     -- 确认前保持 NULL，不要瞎猜填值
  qty          int         not null check (qty > 0),
  po_no        text,
  received_at  timestamptz not null,
  received_by  bigint      references app_user(id),
  note         text,
  created_at   timestamptz not null default now()
);

create index intake_batch_lot_idx on intake_batch (item_id, oem_lot_raw);

-- ===========================================================================
-- 单品 —— 每一支灯泡 / 每一台设备
-- ===========================================================================

create table unit (
  id              bigserial primary key,

  -- ETIA 自己发的号，规范形式（大写、无连字符），如 E26C0001482K。
  -- 生成与校验见 lib/traceability/serial.ts。
  serial          text        not null unique
                  check (serial ~ '^E[0-9]{2}[CTV][0-9]{7}[0-9A-Z]$'),

  item_id         bigint      not null references item(id),
  site_id         bigint      not null references site(id),
  intake_batch_id bigint      references intake_batch(id),

  -- 原厂序列号：主机有（S2000-XL-A-1560），灯泡没有 —— 这正是要自己发号的原因
  oem_serial      text,

  created_at      timestamptz not null default now()
);

create index unit_item_idx  on unit (item_id);
create index unit_batch_idx on unit (intake_batch_id);
create unique index unit_oem_serial_idx on unit (oem_serial) where oem_serial is not null;

-- 每站点每年的发号流水。放独立表用行锁取号，避免并发入库时撞号。
create table serial_counter (
  site_id  bigint not null references site(id),
  year     int    not null,
  next_seq int    not null default 0 check (next_seq <= 9999999),
  primary key (site_id, year)
);

-- ===========================================================================
-- 事件流 —— 只追加
-- ===========================================================================

create table unit_event (
  id          bigserial primary key,
  unit_id     bigint      not null references unit(id),
  seq         int         not null,          -- 该单品第几个事件，从 1 起
  event_type  text        not null check (event_type in (
                'manufactured','received','stocked','reserved',
                'shipped','delivered','installed',
                'warranty_claim','returned','scrapped')),

  occurred_at timestamptz not null,          -- 事情**发生**的时间
  recorded_at timestamptz not null default now(),  -- 录进系统的时间
                                             -- 两者分开：断网补传时差得出来

  site_id     bigint      references site(id),
  actor_id    bigint      references app_user(id),

  -- 关联单据：采购单 / 出货单 / 工单
  ref_type    text,
  ref_id      text,
  customer_id bigint      references customer(id),   -- shipped 时必填

  scan_source text        check (scan_source in
                ('usb_scanner','wecom_scan','manual','import')),
  payload     jsonb       not null default '{}'::jsonb,

  unique (unit_id, seq)
);

create index unit_event_unit_idx     on unit_event (unit_id, seq);
create index unit_event_type_time_idx on unit_event (event_type, occurred_at);
create index unit_event_customer_idx  on unit_event (customer_id)
       where customer_id is not null;

-- 「只追加」不能只靠约定，要让数据库来保证。任何 UPDATE / DELETE 直接报错，
-- 应用层写错了、或者有人手工去改，都会当场失败而不是悄悄改掉历史。
create or replace function unit_event_append_only() returns trigger as $$
begin
  raise exception '事件表只允许追加：不得 % unit_event（要更正请追加一条纠正事件）', tg_op;
end;
$$ language plpgsql;

create trigger unit_event_no_update before update on unit_event
  for each row execute function unit_event_append_only();
create trigger unit_event_no_delete before delete on unit_event
  for each row execute function unit_event_append_only();

-- ===========================================================================
-- 当前状态 —— 由事件推导，不是存出来的
-- ===========================================================================

create view unit_current as
select
  u.id            as unit_id,
  u.serial,
  u.item_id,
  u.site_id,
  e.event_type    as state,
  e.occurred_at   as state_since,
  e.customer_id,
  e.ref_type      as last_ref_type,
  e.ref_id        as last_ref_id
from unit u
left join lateral (
  select * from unit_event
  where unit_id = u.id
  order by seq desc
  limit 1
) e on true;

-- 出货时间线：客户设备台账和保修判定都读这个
create view unit_shipment as
select distinct on (unit_id)
  unit_id, customer_id, occurred_at as shipped_at, ref_id as shipment_no
from unit_event
where event_type = 'shipped'
order by unit_id, seq desc;

commit;

-- ---------------------------------------------------------------------------
-- 尚未建、等信息到位再补：
--   · warranty 判定（按出货日还是签收日？多少个月？是否按点灯小时数？
--     TRACEABILITY.md §10 第 4 项）
--   · Intelli-Lamp 读回的实际点灯小时数（§2.4，待原厂确认接口）
--   · 出货单 / 装箱单本体（DESIGN.md §5，与本表通过 ref_type/ref_id 关联）
-- ---------------------------------------------------------------------------
