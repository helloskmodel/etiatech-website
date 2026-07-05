# 特种标签选型数据库 — 设计建议 / Label Selection Database Design

> 给 DB 团队的结构设计建议。目标：这个库要同时喂三样东西——
> **① 选型商城（筛选）、② 细分市场营销微站（E-E-A-T 内容）、③ Digital Mark Tang（AI 数字工程师，RAG）**。
> 现在库还在建，源头设计对，后面全省事。

---

## 0. 一句话总纲

> **参数是"带来源的结构化事实"，故事是"署名的人写的叙述"，两者分开存，永不混。**

你们商城已经立了一条最重要的原则——**"未公布的参数留空，绝不编造，标注来源"**。
这份设计做的就一件事：把这条原则从"人工自觉"变成**数据库层面强制的结构**。AI 和网站都只能读库，读不到的就留空，天生编不出来。

---

## 1. 六条必须先定的设计原则

### 原则 1：每一个物理参数都是一条"带出处的声明"，不是一个裸值
不要存 `temp_max = 260`。要存：

| 字段 | 值 | 说明 |
|---|---|---|
| value_num | 260 | 归一化后的数值（用于筛选/比较） |
| unit | `degC` | 规范单位 |
| value_verbatim | `260 °C (continuous)` | **TDS 上原文照抄**，一字不改 |
| source_id | → TDS #123 | 出处（外键） |
| source_locator | `p.2, Table 1` | 出处定位 |
| retrieved_date | 2026-07-01 | 采集日期 |
| is_published | true | 品牌是否公布过；false = 网站显示"—" |

> 这样任何一个数字都能点回原始 TDS。**这既是防乱写的闸门，又是 Google E-E-A-T 里 Trust 的顶级信号（引用权威来源）。**

### 原则 2：留空 = 没有这条记录（或 is_published=false），网站渲染成"—"
**绝不允许用 0、"N/A"、"约"、"估计" 去填空。** 没数据就是没数据。
只有 `is_published=true` 的记录才会流到网站和 AI。派生/估算值（confidence≠published）默认不出库。

### 原则 3：稳定 ID 永不变，显示名可以改
产品、行业、应用、参数项，每个都要一个**不可变的 code/slug**（学你们 application notes 里 `AN-MED-001` 那套）。
显示的中文名/英文名随便改，但 code 一旦定了就锁死——这是 DB ↔ 网站 ↔ AI 三方永远对得上的根。

### 原则 4：能筛选的维度都做成"字典表 + 外键"，不要自由文本
行业、应用、面材、胶型、耐化学品、认证、印刷方式……全部做成**受控词表**（枚举表）。
自由文本无法筛选，也无法做多语言。字典化之后，微站可以按任意维度切片导出。

### 原则 5：参数（事实）和文案（叙述）分两套表存
- **事实**（规格，来自 TDS，带出处，客观、不可改）→ 规格表
- **叙述**（应用故事、成功案例、新闻，人写的，主观、E-E-A-T）→ 内容表

两者混在一张表里，就是乱写的温床，也做不了出处追溯。**这个分离本身就是 E-E-A-T 的结构。**

### 原则 6：数字是语言中立的，只翻译"标签"和"枚举值"
规格行（260 °C、Acrylic）不需要翻译——**大部分数据天生免翻译**。
只有参数项的名称（"最高连续耐温"）、枚举值（"丙烯酸胶"）、和文案，才进翻译表。省一大半翻译工作量。

---

## 2. 表结构（ERD 概览）

```
                    ┌─────────────┐
                    │   brand     │  品牌/厂商（7家）
                    └──────┬──────┘
                           │
        ┌──────────────────┼───────────────────┐
        │                  │                    │
   ┌────▼─────┐      ┌─────▼──────┐       ┌─────▼──────┐
   │ product  │◄─────┤   source   │       │ product_   │
   │ (SKU)    │      │ (TDS/官网) │       │ media      │
   └────┬─────┘      └─────▲──────┘       │ (图/PDF)   │
        │                  │              └────────────┘
        │            ┌─────┴──────┐
        │            │ spec_value │  ★核心：带出处的参数声明
        │            └─────▲──────┘
        │                  │
        │            ┌─────┴─────────┐
        │            │ attribute_dict│  参数字典（受控）
        │            └───────────────┘
        │
   ┌────┴──────────── 多对多 join 表 ────────────┐
   │  product_industry   product_application     │  ← 微站按此切片
   │  product_material   product_certification   │
   └────┬─────────┬──────────┬─────────┬─────────┘
        │         │          │         │
   ┌────▼───┐ ┌───▼────┐ ┌───▼────┐ ┌──▼──────────┐
   │industry│ │applica-│ │material│ │certification│  ← 字典表
   └────────┘ │ tion   │ └────────┘ └─────────────┘
              └────────┘

   ── 叙述内容（和上面完全分开）──
   ┌──────────────┐ ┌────────────┐ ┌──────────┐
   │application_  │ │ case_study │ │  news    │
   │ note (Expert)│ │ (Experience│ │ (Author) │
   └──────────────┘ └────────────┘ └──────────┘
```

---

## 3. 关键表字段清单

### 3.1 `product` — 产品/SKU（核心事实主体）
| 字段 | 类型 | 说明 |
|---|---|---|
| id / slug | 稳定唯一 | 不可变主键 |
| brand_id | FK | |
| series / model | text | 系列 / 型号 |
| name_i18n | jsonb | {en,zh,vi} |
| description_i18n | jsonb | 中性描述，非营销文案 |
| status | enum | active / eol（停产） |
| primary_image_url | text | |
| updated_at | date | |

### 3.2 `attribute_dict` — 参数字典（受控，加参数不改表结构）
| 字段 | 说明 |
|---|---|
| code | 如 `TEMP_CONT_MAX`、`ADHESIVE_TYPE`（不可变） |
| label_i18n | "最高连续耐温" / "Max continuous temp" |
| category | thermal / mechanical / adhesive / chemical / print / compliance / dimensional |
| data_type | number / enum / text / boolean |
| canonical_unit | `degC` / `micron` / `N/25mm`… |
| enum_set_ref | 若是枚举，指向哪个词表 |

> 加一个新参数 = 加一行字典，网站自动渲染。**不用改表、不用发版。**

### 3.3 `spec_value` — 带出处的参数声明（★最重要）
见原则 1 的字段表。约束：
- **每一行必须有 source_id**（数据库层强制 NOT NULL）——没出处的参数进不了库。
- 数值型必须有 unit；枚举型 value_text 必须在词表内。
- `confidence` 默认 `published`；非 published 不导出到网站/AI。

### 3.4 关键字典 & 多对多
- `industry`（汽车 / 医疗医药 / 钢铁 / 工业电子 / 汽车电子 / 消费电子 …）
- `application`（工况/用例：回流焊 PI 标签、深冷储存防篡改、线缆标识、铭牌 …）
- `material_facestock`（聚酰亚胺 PI / PET / PP / 乙烯基 / PC …）
- `adhesive_type`（丙烯酸 / 橡胶 / 硅胶 …）
- `chemical_agent`（耐受的化学品清单）
- `certification`（UL/cUL 969、RoHS、REACH、车规 …）
- `print_method`（热转印+碳带类型 / 激光 …）

join 表：`product_industry`、`product_application`、`product_material`、`product_certification`（都是多对多）。
> **微站就是靠这些 join 表切片**——`WHERE industry='automotive-electronics'` 导一份，就是汽车电子站的 products.json。

### 3.5 `source` — 出处
| 字段 | 说明 |
|---|---|
| id | |
| brand_id | FK |
| doc_type | TDS / official_website / selection_tool |
| url | 原始链接 |
| title / version | TDS 标题 / 版本号 |
| retrieved_date | 采集日 |

### 3.6 叙述内容表（和参数完全分开）
- **`application_note`**（→ Expertise）：industry、sub_category、challenge/solution/benefit/recommended（i18n）、关联 product_ids。**可含通用技术知识。**
- **`case_study`**（→ Experience，Google 新加的 E）：真实客户名、before/after 量化指标、现场图、`consent_flag`（客户授权）、关联 products/applications。**此表字段强制要求真实数据，绝不能编。**
- **`news`**（→ Authoritativeness）：type（award/tradeshow/authorization/milestone）、**date（必填）**、body(i18n)、展会另加 event_start/event_end/venue（喂 schema.org/Event）。

---

## 4. 高温标签（你们重点行业）要特别设计的字段

聚酰亚胺高温标签是你点名的强项，普通"耐温一个值"不够用，建议在 `attribute_dict` 里就拆细：

| code | 含义 |
|---|---|
| TEMP_CONT_MAX / TEMP_CONT_MIN | 连续使用温度上/下限 |
| TEMP_PEAK_MAX | 短时/峰值耐温 |
| REFLOW_PEAK / REFLOW_DURATION | 回流焊峰值温度 + 可承受时长 |
| REFLOW_CYCLES | 可过几次回流 |

> 有了这几项，选型商城和 AI 才能回答"**过 3 次 260 °C 峰值回流焊、用什么标签**"这种真实工况问题。

---

## 5. 喂给 Digital Mark Tang（AI 数字工程师）的准备

因为参数是**结构化 + 带单位 + 带出处**的，AI 天生就能"查库+引用"，而不是"生成":
1. 建一个物化视图 `product_spec_sheet`：把每个产品的规格拍平成"参数名: 值 (来源)"的文本行。
2. 每个产品存一段 embedding，做语义检索（"防高温掉标"→ 匹配 PI + 高峰值耐温）。
3. AI 回答时**只能引用 spec_value 里的行 + 附 source url**。查不到 → 回"该参数厂商未公布"或转真人。
> **这就根治了 AI 乱写**：它不是在生成知识，是在查你们自己带出处的库。

---

## 6. 一条完整示例记录（给团队照着建）

```jsonc
// product
{ "id": "kapoly-ht5000", "brand_id": "brandX", "series": "HT",
  "model": "5000", "name_i18n": {"zh":"HT-5000 聚酰亚胺高温标签","en":"HT-5000 Polyimide Label"},
  "status": "active" }

// spec_value（多行，每行带出处）
{ "product_id":"kapoly-ht5000", "attribute":"TEMP_CONT_MAX",
  "value_num":260, "unit":"degC", "value_verbatim":"260 °C continuous",
  "source_id":"tds-001", "source_locator":"p.2", "is_published":true }
{ "product_id":"kapoly-ht5000", "attribute":"ADHESIVE_TYPE",
  "value_text":"acrylic", "source_id":"tds-001", "is_published":true }
{ "product_id":"kapoly-ht5000", "attribute":"CHEM_RESIST_IPA",
  "is_published":false }   // 厂商未公布 → 网站显示"—"，AI 说"未公布"

// join
{ "product_id":"kapoly-ht5000", "industry":"automotive-electronics" }
{ "product_id":"kapoly-ht5000", "application":"pcb-reflow-labeling" }
```

---

## 7. 给团队的落地清单（TL;DR）

- [ ] 每个参数一条 `spec_value`，**source_id 数据库层设 NOT NULL**
- [ ] 空值就不建行 / `is_published=false`，**禁止填 0 或"约"**
- [ ] 所有可筛维度做字典表 + 外键，别用自由文本
- [ ] 产品/行业/应用/参数项都给**不可变 code**
- [ ] 参数表和叙述表（应用/案例/新闻）**物理分开**
- [ ] i18n 只翻译标签、枚举值、文案；数字免翻译
- [ ] 高温相关参数拆成 连续/峰值/回流 多项
- [ ] case_study 表强制真实字段 + 客户授权标记
- [ ] news 表 date 必填，展会带 event 字段
```
