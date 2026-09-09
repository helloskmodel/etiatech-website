// 入库发号的集成测试 —— 跑在真实 Postgres 上,不用 mock。
//
// 需要 TRACE_DATABASE_URL 指向一个可以随便清空的库,并已应用
// docs/ops-system/schema.sql。没设这个变量时整组跳过,所以 `npm test`
// 在没有数据库的环境里照样能跑。
//
//   createdb etia && psql -d etia -f docs/ops-system/schema.sql
//   TRACE_DATABASE_URL=postgres://etia@127.0.0.1:55432/etia npm test

import { test, before, after, beforeEach } from "node:test";
import assert from "node:assert/strict";
import { Pool, type PoolClient } from "pg";

import { parseSerial } from "./serial.ts";
import { receiveIntake } from "./intake.ts";

const URL = process.env.TRACE_DATABASE_URL;
const skip = URL ? false : "未设置 TRACE_DATABASE_URL,跳过数据库集成测试";

let pool: Pool;

before(async () => {
  if (!URL) return;
  pool = new Pool({ connectionString: URL, max: 6 });
});

after(async () => {
  if (pool) await pool.end();
});

beforeEach(async () => {
  if (!URL) return;
  // TRUNCATE 绕过行级触发器,所以「事件只追加」的保护不会挡住清库。
  await pool.query(
    `truncate unit_event, unit, intake_batch, serial_counter, customer, item, app_user, site
       restart identity cascade`
  );
  await pool.query(
    `insert into site (code, serial_letter, name_i18n, timezone, currency) values
       ('CN-HQ','C','{"zh":"上海"}','Asia/Shanghai','CNY'),
       ('TH','T','{"zh":"泰国"}','Asia/Bangkok','THB')`
  );
  await pool.query(`insert into app_user (site_id, name) values (1,'仓管')`);
  await pool.query(
    `insert into item (code, kind, name_i18n, rated_hours, calibration_interval_months) values
       ('012-64000R','lamp','{"zh":"200W 汞灯"}',2000,null),
       ('S2000-XLA','device','{"zh":"OmniCure S2000"}',null,12)`
  );
});

async function inTx<T>(fn: (c: PoolClient) => Promise<T>): Promise<T> {
  const c = await pool.connect();
  try {
    await c.query("begin");
    const out = await fn(c);
    await c.query("commit");
    return out;
  } catch (e) {
    await c.query("rollback");
    throw e;
  } finally {
    c.release();
  }
}

const lamps = (qty: number, over: Record<string, unknown> = {}) => ({
  siteCode: "CN-HQ",
  itemCode: "012-64000R",
  qty,
  oemLotRaw: "28/2026 019",
  poNo: "PO-2026-0088",
  receivedBy: 1,
  ...over,
});

// ---------------------------------------------------------------------------

test("一箱货:发号连续、可解析、站点与年份正确", { skip }, async () => {
  const r = await inTx((c) => receiveIntake(c, lamps(3)));
  assert.equal(r.units.length, 3);

  const parsed = r.units.map((u) => parseSerial(u.serial));
  assert.ok(parsed.every(Boolean), "发出的号必须能通过自己的校验位");
  assert.deepEqual(
    parsed.map((p) => p!.seq),
    [0, 1, 2],
    "号段应当连续"
  );
  assert.ok(parsed.every((p) => p!.site === "C"));
  assert.equal(new Set(r.units.map((u) => u.serial)).size, 3);
});

test("每支灯泡都落一条 received 事件,当前状态是推导出来的", { skip }, async () => {
  const r = await inTx((c) => receiveIntake(c, lamps(2)));
  const { rows } = await pool.query(
    `select serial, state from unit_current where serial = any($1) order by serial`,
    [r.units.map((u) => u.serial)]
  );
  assert.equal(rows.length, 2);
  assert.ok(rows.every((x) => x.state === "received"));
});

test("手写批次原样保存,生产日期在格式确认前保持空", { skip }, async () => {
  await inTx((c) => receiveIntake(c, lamps(1, { oemLotRaw: "28/2026 019" })));
  const { rows } = await pool.query(`select oem_lot_raw, mfg_date, qty from intake_batch`);
  assert.equal(rows[0].oem_lot_raw, "28/2026 019", "批次必须原样照抄,不做任何清洗");
  assert.equal(rows[0].mfg_date, null, "格式未经原厂确认前不许瞎猜生产日期");
  assert.equal(rows[0].qty, 1);
});

test("并发入库不撞号 —— 六箱货同时进来", { skip }, async () => {
  // 仓库两个人同时扫、或页面被连点,都会走到这里。发重号意味着两支不同的灯
  // 贴了同一个标签,事后无法分辨。
  const results = await Promise.all(
    Array.from({ length: 6 }, () => inTx((c) => receiveIntake(c, lamps(5))))
  );
  const all = results.flatMap((r) => r.units.map((u) => u.serial));
  assert.equal(all.length, 30);
  assert.equal(new Set(all).size, 30, "出现了重号");

  const seqs = all.map((s) => parseSerial(s)!.seq).sort((a, b) => a - b);
  assert.deepEqual(seqs, Array.from({ length: 30 }, (_, i) => i), "号段应当既不重复也不跳号");
});

test("不同站点各自发号,互不干扰", { skip }, async () => {
  const cn = await inTx((c) => receiveIntake(c, lamps(2)));
  const th = await inTx((c) => receiveIntake(c, lamps(2, { siteCode: "TH" })));
  assert.deepEqual(cn.units.map((u) => parseSerial(u.serial)!.seq), [0, 1]);
  assert.deepEqual(th.units.map((u) => parseSerial(u.serial)!.seq), [0, 1]);
  assert.ok(th.units.every((u) => parseSerial(u.serial)!.site === "T"));
});

test("设备记原厂序列号,灯泡留空", { skip }, async () => {
  const r = await inTx((c) =>
    receiveIntake(c, {
      siteCode: "CN-HQ",
      itemCode: "S2000-XLA",
      qty: 2,
      oemSerials: ["S2000-XL-A-1560", "S2000-XL-A-1561"],
      scanSource: "usb_scanner",
    })
  );
  assert.deepEqual(
    r.units.map((u) => u.oemSerial).sort(),
    ["S2000-XL-A-1560", "S2000-XL-A-1561"]
  );

  const lamp = await inTx((c) => receiveIntake(c, lamps(1)));
  assert.equal(lamp.units[0].oemSerial, null, "灯泡没有原厂序列号");
});

test("同一个原厂序列号不能入库两次", { skip }, async () => {
  const dev = { siteCode: "CN-HQ", itemCode: "S2000-XLA", qty: 1, oemSerials: ["S2000-XL-A-1560"] };
  await inTx((c) => receiveIntake(c, dev));
  await assert.rejects(() => inTx((c) => receiveIntake(c, dev)), /duplicate key|unique/i);
});

test("数量非法直接拒绝,不留任何痕迹", { skip }, async () => {
  for (const qty of [0, -1, 2.5]) {
    await assert.rejects(() => inTx((c) => receiveIntake(c, lamps(qty))), /数量必须是正整数/);
  }
  const { rows } = await pool.query(`select count(*)::int as n from unit`);
  assert.equal(rows[0].n, 0);
});

test("站点或物料不存在时拒绝", { skip }, async () => {
  await assert.rejects(() => inTx((c) => receiveIntake(c, lamps(1, { siteCode: "XX" }))), /站点不存在/);
  await assert.rejects(
    () => inTx((c) => receiveIntake(c, lamps(1, { itemCode: "NOPE" }))),
    /物料不存在/
  );
});

test("事务回滚后不留半截数据 —— 号发了但单品没建出来是最坏的情况", { skip }, async () => {
  await assert.rejects(
    () =>
      inTx(async (c) => {
        await receiveIntake(c, lamps(3));
        throw new Error("模拟后续步骤失败");
      }),
    /模拟后续步骤失败/
  );
  for (const t of ["unit", "unit_event", "intake_batch"]) {
    const { rows } = await pool.query(`select count(*)::int as n from ${t}`);
    assert.equal(rows[0].n, 0, `${t} 残留了数据`);
  }
});
