# 应用说明全面复核（对照现有产品线）

日期：2026-09-10 · 依据：站内 62 条应用说明（`components/applicationNotes.ts`，未上架）、
已上架的 15 篇应用案例（`data/applicationsData.js`）、Excelitas 官网 UV curing 应用分区、
noblelight.com 红外发射器与应用页。

## 一、结论

1. 62 条里 **47 条能归进 5 大行业**，15 条在 5 大行业之外（木材 6、金属涂装 4、印刷 3、航空航天 2）。
2. 62 条**全部只推荐 OmniCure**。Phoseon、Fusion UV、Noblelight 红外三条线一条都没出现——
   而这三条线恰恰是大面积、卷材、烘干类应用的正确答案。
3. **红外一条应用说明都没有**，noblelight 官网列了二十多个红外应用，其中汽车类 4–5 个直接对得上我们的 5 大行业。
4. **科学实验行业 0 条**。要补 3 条。
5. Excelitas 自己发布的应用说明里，有 3 篇我们没有：血液氧合器装配、光纤/线缆 UV 喷码、FIPG 现场发泡密封垫。
6. 9 条的推荐产品写法与现行目录不符（型号打错、写了我们不代理的灯、把点光源写成流水线）。

## 二、62 条 → 5 大行业归属

| 原行业（62 条） | 条数 | 归入 | 说明 |
|---|---|---|---|
| Medical Device Assembly | 11 | 三类医疗器械 | 全部保留 |
| Electronics & PCB Assembly | 9 | 半导体与电子 | 全部保留 |
| Automotive & ADAS | 8 | 汽车 | 全部保留 |
| Photonics & Advanced Packaging | 8 | 光模块 6 · 半导体与电子 2 | PHO-005 Chiplet/2.5D、PHO-006 晶圆划片膜 → 半导体 |
| Optical Fiber & Cable | 6 | 光模块（子类"光纤与互连"） | 连接器/熔接/AOC 贴合光模块；拉丝塔/带纤/护套是线缆制造，勉强归入，见待定 1 |
| Optics & Imaging | 3 | 半导体与电子 1 · 光模块 2 | OPT-001 镜头粘接→电子（摄像模组）；OPT-002/003 → 光模块 |
| Aerospace & Defense | 4 | 半导体与电子 2 · 撤 2 | AER-002 航电 PCB、AER-004 航天电子封装 → 电子；AER-001 复材粘接、AER-003 密封胶 → 先撤 |
| Wood & Furniture | 6 | 先撤 | 5 大行业之外；对应 Fusion 微波 / Phoseon 面光源 / 红外 |
| Metal & Industrial Coatings | 4 | 先撤 | 同上 |
| Printing & Graphic Arts | 3 | 先撤 | 同上 |
| **合计** | **62** | **上 47 · 撤 15** | |

## 三、推荐产品需要改写的 9 条

| 编号 | 现写法 | 问题 | 改为 |
|---|---|---|---|
| AN-CAB-002 | OmniCure AC922S-F | 型号打错 | OmniCure AC9225-F |
| AN-PRT-002 | AC8-HD or NobleLight Medium Pressure | Amba 中压灯我们不代理 | Fusion UV F300/LightHammer（微波）或 Phoseon FireLine |
| AN-WOD-001 | 同上 | 同上 | 同上 |
| AN-MET-001 | AC8 or NobleLight Medium Pressure | 同上 | Fusion UV 微波；粉末流平前段加 Noblelight 中波/碳纤维红外 |
| AN-PRT-001 | LX500 Inline | LX500 是点光源，不做在线喷墨 | Phoseon FireEdge/FireJet（钉固）+ FireLine（全固） |
| AN-WOD-004 | LX500 Inline (Pin + Flood) | 同上 | 同上 |
| AN-MET-003 | AC Large LED or LX500 Array | 同上 | Phoseon FireJet / OmniCure AC8 |
| AN-CAB-004/006 | AC Large with 360° Reflector Array | 无此标准件 | 写成"AC8/AC9 + 定制 360° 反射腔（SR）" |
| AN-WOD-002 | AC Large with Multi-Angle Reflector | 无此标准件 | 同上 |

## 四、要新写的 11 条

### 科学实验（现为 0）
1. 光流变 / 光固化动力学 — Anton Paar MCR302 + OmniCure S2000（已核实的公开论文：250–450 nm，plate/plate 0.3 mm，10 Hz，0.3% 应变）
2. 实验室点固化与样品制备 — S1500 Pro / LX500 + LC6 台式输送
3. 辐照度测量与工艺验证 — R2000 / LS200，校准周期与追溯

### 红外（现为 0，noblelight 官网应用，全部归汽车/电子）
4. 仪表板与内饰件加热成型 — 碳纤维发射器（替代金属管与蒸汽）
5. 保险杠水性漆烘干 — 碳纤维发射器（比短波省 30% 能耗）
6. 安全气囊织物涂层烘干 — 中波
7. 车玻璃丝印烘干 / 预热 — 中波
8. 电池极片涂布箔材烘干 — 碳纤维 / 中波（Emitters 手册明确列出）

### Excelitas 已发布而我们缺的
9. 血液氧合器装配 — S2000 Elite（医疗）
10. 光纤与线缆 UV 喷码 — AC 系列 + UV 油墨（光模块/线缆）
11. FIPG 现场发泡密封垫 ~1 秒固化 — AC 系列（汽车/电子）

## 五、Excelitas 官网应用分区对照

| Excelitas 分区 | 我们的覆盖 |
|---|---|
| Medical Device Assembly | 11 条 ✓ |
| Electronics Manufacturing | 9 条 ✓ |
| Optical Fiber Manufacturing | 6 条 ✓ |
| Cable Assembly Manufacturing | 部分（连接器/AOC）|
| Composite Materials | 仅 AER-001，且拟撤 |
| Wood Coatings | 6 条，拟撤（在 5 大行业外）|
| Metal Substrate Coatings | 4 条，拟撤 |
| Printing | 3 条，拟撤 |

## 六、待你定的 3 件事

1. **光纤拉丝塔 / 带纤 / 护套（3 条）**放"光模块"下面合不合适？它们是线缆厂的活，不是光模块厂。要么归光模块的"光纤与互连"子类，要么暂撤。
2. **木材 / 金属涂装 / 印刷 / 玻璃 / 食品**：这些是 Fusion、Phoseon、Noblelight 红外的主战场，但都不在 5 大行业里。红外线一旦要卖，5 个行业就装不下——是加第 6 个"工业涂装与烘干"，还是红外只做汽车/电子？
3. **上架方式**：现在上架的 15 篇是"应用案例"格式（含图、挑战/方案/收益），62 条是"应用说明"格式（无图）。上 47 条要么补图转成案例格式，要么先以无图列表上。

## 七、不做的（与既定约束一致）

noblelight 页面里的 UV 消毒（BlueLight、Steribelt）、闪光灯复材固化、分析光源（食品检测）——不代理，不写。
