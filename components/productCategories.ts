import type { Metadata } from "next";
import type { LangText } from "@/components/LocaleContext";
import { products, type Product, type ProductDoc } from "@/components/productCatalog";

const SITE = "https://www.etiatech.com";
const COS_PDF = "https://etiatech-1303055923.cos.ap-singapore.myqcloud.com/PDF";

// ─────────────────────────────────────────────────────────────────────────
// ETIA's five customer-facing product categories.
//
// This is the taxonomy customers actually search by — the light source
// technology ("汞灯紫外光源", "UV LED 光源", "微波无极灯"), not the brand.
// The brand pages (/product/omnicure etc.) stay as a second way in; this is
// the primary one, and drives the PRODUCT → BY TECHNOLOGY menu, the product
// centre and the home page.
//
// Products are pulled out of the catalog by `match`, so a category's model
// list stays in sync when the catalog changes — nothing to maintain twice.
// ─────────────────────────────────────────────────────────────────────────

export type ProductCategorySlug =
  | "mercury-uv-lamp"
  | "uv-led"
  | "microwave-uv-lamp"
  | "uv-measurement"
  | "infrared-heating";

export type ProductCategory = {
  slug: ProductCategorySlug;
  accent: string;
  // Menu label and page H1.
  name: LangText;
  // One-line hero subline — the "what is it, who is it for" sentence.
  tagline: LangText;
  // Body paragraphs for the overview section.
  intro: LangText[];
  // Typical applications / industries, rendered as chips.
  applications: LangText[];
  metaTitle: string;
  metaDescription: string;
  // Optional hero photograph for the category page. Falls back to the shared
  // page banner when absent.
  heroImage?: string;
  // Optional photographs of the technology in production, shown alongside the
  // typical-applications list.
  gallery?: { src: string; caption: LangText }[];
  // Optional literature that covers the whole category rather than one model,
  // rendered as a downloads block on the category page.
  docs?: ProductDoc[];
  // Optional reference section explaining how to choose within the category —
  // prose steps plus comparison tables. Only ever populated from material the
  // manufacturer publishes; see docs/PROJECT-STATUS.md.
  selectionGuide?: {
    heading: LangText;
    standfirst: LangText;
    steps: { title: LangText; body: LangText }[];
    tables?: {
      caption: LangText;
      columns: LangText[];
      rows: LangText[][];
      footnote?: LangText;
    }[];
  };
  // Selects this category's models out of the product catalog.
  match: (p: Product) => boolean;
  // Set while the category is still waiting on customer-supplied copy and
  // model data. Such a page renders its overview and an inquiry CTA but no
  // invented specs; if it also has no catalog models it stays out of the
  // sitemap (see app/sitemap.ts) until there is something worth ranking.
  contentPending?: boolean;
};

// Measurement instruments are catalogued under "UV Spot Curing" because they
// ship with the spot systems, but they belong to their own category here.
const MEASUREMENT_SLUGS = new Set(["r2000", "ls200"]);

export const productCategories: Record<ProductCategorySlug, ProductCategory> = {
  // ─────────────────────────── 1. 汞灯紫外光源 ───────────────────────────
  "mercury-uv-lamp": {
    slug: "mercury-uv-lamp",
    accent: "#1A56DB",
    name: { en: "Mercury UV Lamp Sources", zh: "汞灯紫外光源" },
    tagline: {
      en: "Broad-spectrum mercury lamp UV curing — the proven choice when your adhesive needs full 320–500 nm output.",
      zh: "宽光谱汞灯紫外固化——当胶水需要完整 320–500 nm 输出时，久经验证的选择。",
    },
    intro: [
      {
        en: "Mercury arc lamp UV sources deliver a broad, continuous spectrum from roughly 250 to 600 nm. That full spectral coverage is why they remain the reference light source for adhesives, coatings and inks whose photoinitiators absorb outside the narrow UV LED bands — and why many validated medical and electronics processes are still specified around them.",
        zh: "汞弧灯紫外光源提供约 250–600 nm 的宽广连续光谱。正是这种完整的光谱覆盖，使其在光引发剂吸收峰位于 UV LED 窄带之外的胶粘剂、涂层与油墨领域，始终是基准光源——也是大量已验证的医疗与电子工艺至今仍按其规格设计的原因。",
      },
      {
        en: "ETIA supplies the OmniCure® S-Series spot curing systems: closed-loop optical feedback holds intensity constant over lamp life, so the dose your process was validated at on day one is the dose it still receives 2,000 hours later. Genuine replacement lamps, light guides and calibration are stocked in-region.",
        zh: "ETIA 供应 OmniCure® S 系列点固化系统：闭环光学反馈在整个灯泡寿命内保持光强恒定——工艺首日验证的剂量，2000 小时后依然一致。原厂替换灯泡、光导与校准服务均有区域备货。",
      },
    ],
    applications: [
      { en: "Medical device bonding", zh: "医疗器械粘接" },
      { en: "Catheter & needle assembly", zh: "导管与针头装配" },
      { en: "Electronics assembly", zh: "电子装配" },
      { en: "Optical component bonding", zh: "光学元件粘接" },
      { en: "Laboratory & R&D curing", zh: "实验室与研发固化" },
    ],
    metaTitle: "Mercury UV Lamp Curing Sources | OmniCure S-Series | ETIA",
    metaDescription:
      "Broad-spectrum mercury lamp UV curing sources with closed-loop intensity control. OmniCure S2000 Elite and S1500 Pro spot curing systems, genuine lamps and light guides, supplied and serviced by ETIA in Asia-Pacific.",
    match: (p) =>
      p.tech === "UV Spot Curing" && (p.sub === "UV Lamp Spot" || p.sub === "S-Series Accessory"),
  },

  // ─────────────────────────── 2. LED紫外光源 ───────────────────────────
  "uv-led": {
    slug: "uv-led",
    accent: "#41A62A",
    name: { en: "UV LED Light Sources", zh: "LED紫外光源" },
    tagline: {
      en: "From single-point spot heads to 1350 mm production arrays — mercury-free UV LED curing at every scale.",
      zh: "从单点点固化头到 1350 mm 产线阵列——覆盖各种规模的无汞 UV LED 固化。",
    },
    intro: [
      {
        en: "UV LED sources emit a narrow band at 365, 385, 395 or 405 nm with no warm-up, no ozone and no mercury. They switch instantly, run tens of thousands of hours, and put far less infrared heat into the part — which is what makes them the default choice for temperature-sensitive assemblies and for lines that cannot afford lamp-change downtime.",
        zh: "UV LED 光源在 365、385、395 或 405 nm 发射窄带光，无需预热、无臭氧、无汞。瞬时开关、寿命数万小时，且向工件传递的红外热量极低——这正是温度敏感装配以及无法承受换灯停机的产线以其为首选的原因。",
      },
      {
        en: "ETIA covers the full range: OmniCure® LX spot curing and AC Series air-cooled arrays, Phoseon® FireEdge / FireJet / FireLine, and Noblelight Semray® water-cooled systems up to 1350 mm emission width. We size the head, wavelength and working distance to your adhesive's datasheet and your line speed — not the other way round.",
        zh: "ETIA 覆盖完整产品线：OmniCure® LX 点固化与 AC 系列风冷阵列、Phoseon® FireEdge / FireJet / FireLine，以及发光宽度达 1350 mm 的 Noblelight Semray® 水冷系统。我们依据您的胶水技术数据与产线速度来选定灯头、波长与工作距离——而不是反过来。",
      },
    ],
    applications: [
      { en: "Optical module & transceiver assembly", zh: "光模块与光收发器装配" },
      { en: "Semiconductor & advanced packaging", zh: "半导体与先进封装" },
      { en: "Display & OCA bonding", zh: "显示与 OCA 贴合" },
      { en: "PCB conformal coating", zh: "PCB 三防漆涂覆" },
      { en: "Optical fibre coating & marking", zh: "光纤涂覆与标识" },
      { en: "Printing, coating & packaging", zh: "印刷、涂层与包装" },
    ],
    metaTitle: "UV LED Curing Light Sources | Spot, Area & Wide-Web | ETIA",
    metaDescription:
      "UV LED curing light sources at 365/385/395/405 nm — OmniCure LX spot and AC Series, Phoseon FireEdge, FireJet and FireLine, Noblelight Semray water-cooled arrays to 1350 mm. Application-matched and supported by ETIA.",
    match: (p) =>
      !MEASUREMENT_SLUGS.has(p.slug) &&
      ((p.tech === "UV Spot Curing" && p.sub === "UV LED Spot") ||
        p.tech === "Air-Cooled UV LED Curing" ||
        p.tech === "Water-Cooled UV LED Area Curing"),
  },

  // ────────────────────────── 3. 微波无极灯 ──────────────────────────
  // Sourced from Excelitas' public Fusion UV product-category pages and the
  // "Microwave-powered UV Curing System Overview" catalog (UVP44 EN/01.26).
  "microwave-uv-lamp": {
    slug: "microwave-uv-lamp",
    accent: "#f59e0b",
    name: { en: "Microwave Electrodeless UV Lamps", zh: "微波无极灯" },
    tagline: {
      en: "Fusion UV® microwave-powered curing — no electrodes to erode, 200–600 nm broad spectrum, and unlimited cure width by stacking lamps end to end.",
      zh: "Fusion UV® 微波无极紫外固化——无电极损耗、200–600 nm 宽光谱，灯头端对端拼接实现固化宽度无限扩展。",
    },
    intro: [
      {
        en: "Fusion UV® was founded in 1971 with the invention of microwave-powered UV curing technology, and Excelitas acquired the Fusion UV microwave portfolio in 2024 through its acquisition of Noblelight. Microwave-powered lamps excite the bulb fill with microwave energy rather than electrodes — there are no electrodes to erode, which is the root of the platform's output stability and long service life.",
        zh: "Fusion UV® 创立于 1971 年，以微波紫外固化技术的发明起家；2024 年，Excelitas 通过收购 Noblelight 获得 Fusion UV 微波产品线。微波灯以微波能量激发灯泡填充物，而非依靠电极——不存在电极损耗，这正是该平台输出稳定、寿命长久的技术根源。",
      },
      {
        en: "The technology significantly improves production speed, process consistency and operating lifetime, while putting less heat into the substrate. An easy-to-service modular design gives process flexibility at a lower cost of ownership, and the systems are available in a range of power classes and UV broadband wavelengths. They retrofit into existing production lines or integrate into new ones, and the latest systems are Industry 4.0 ready with embedded sensors and microprocessors.",
        zh: "该技术显著提升生产速度、工艺一致性与运行寿命，同时降低传递到基材上的热量。易于维护的模块化设计带来工艺灵活性与更低的使用成本；系统提供多种功率等级与紫外宽光谱波长可选。设备既可改造接入现有产线，也可集成进新建产线；最新机型已具备工业 4.0 能力，内置传感器与微处理器。",
      },
      {
        en: "ETIA supplies the full range — from the economical F300S to the ultra-high-output 10-inch LightHammer® 10 Mark III — together with the DRF Series for optical fibre draw towers. Fusion UV lamps are used in hundreds of industrial curing applications, from automotive headlamps to flooring to medical devices, wire marking and electronic components.",
        zh: "ETIA 提供完整产品线——从经济型 F300S 到超高输出的 10 英寸 LightHammer® 10 Mark III，以及用于光纤拉丝塔的 DRF 系列。Fusion UV 灯已应用于数百种工业固化场景，涵盖汽车大灯、地板材料、医疗器械、线缆打标与电子元器件。",
      },
      {
        en: "UV curing of coatings, inks, paints and adhesives is regarded as a green technology: compared with solvent-based processes it cuts VOC emissions, air pollutants and flammability risk, and gives production staff a healthier working environment.",
        zh: "涂层、油墨、涂料与胶粘剂的紫外固化被视为一项绿色技术：相比溶剂型工艺，可大幅减少 VOC 排放、降低大气污染物与易燃风险，并为一线作业人员提供更健康的工作环境。",
      },
    ],
    applications: [
      { en: "Automotive headlamps", zh: "汽车大灯" },
      { en: "Flooring", zh: "地板材料" },
      { en: "Medical devices", zh: "医疗器械" },
      { en: "Wire marking", zh: "线缆打标" },
      { en: "Electronic components", zh: "电子元器件" },
      { en: "Optical fibre production", zh: "光纤生产" },
      { en: "Printing, coating & converting", zh: "印刷、涂层与加工" },
    ],
    metaTitle: "Microwave Electrodeless UV Lamps | Fusion UV F Series & LightHammer | ETIA",
    metaDescription:
      "Fusion UV microwave-powered UV curing systems — electrodeless lamps from the economical F300S to the LightHammer 10 Mark III, with H, D and V bulb fills, unlimited cure width and Industry 4.0 sensing. Supplied and supported by ETIA.",
    docs: [
      {
        file: "Microwave-powered+UV+Curing+System+Overview+Brochure.pdf",
        kind: { en: "Microwave UV Systems Overview", zh: "微波紫外系统总览手册", vi: "Tổng quan hệ thống UV vi sóng", th: "ภาพรวมระบบ UV ไมโครเวฟ" },
        base: COS_PDF,
      },
      {
        file: "Belt Conveyors for UV Microwave Curing Systems Brochure.pdf",
        kind: { en: "Belt Conveyors Brochure", zh: "输送机产品手册", vi: "Brochure băng tải", th: "โบรชัวร์สายพานลำเลียง" },
        base: COS_PDF,
      },
    ],
    selectionGuide: {
      heading: { en: "Choosing your lamp system", zh: "如何选择灯系统" },
      standfirst: {
        en: "Three decisions size a microwave UV installation: how wide the cure has to be, how much power the chemistry needs, and which bulb spectrum the photoinitiator absorbs. Everything else — shutters, control, cooling — follows.",
        zh: "微波紫外系统的选型由三个决定构成：固化宽度要多宽、化学体系需要多大功率、光引发剂吸收哪种灯管光谱。其余的快门、控制、冷却，都由此推导。",
      },
      steps: [
        {
          title: { en: "1 · Width — stack, don't overlap", zh: "1 · 宽度——拼接，无需重叠" },
          body: {
            en: "Lamp heads butt end to end for unlimited cure width, with no loss of energy between them and no need to overlap. That is what makes wide-web lines practical: 8-metre systems are in production today.",
            zh: "灯头可端对端拼接，实现固化宽度的无限扩展，相邻灯头之间没有能量损失，也无需重叠布置。正因如此，宽幅产线才具备可行性——目前已有 8 米幅宽的系统投入生产。",
          },
        },
        {
          title: { en: "2 · Power class and bulb length", zh: "2 · 功率等级与灯管长度" },
          body: {
            en: "Bulb length is 15 cm (6\") or 25 cm (10\"); power class runs from 120 W/cm on the F300S to 240 W/cm on the F600S and the LightHammer® 10 family. Higher power buys line speed — it is not a substitute for the right spectrum.",
            zh: "灯管长度为 15 cm（6 英寸）或 25 cm（10 英寸）；功率等级从 F300S 的 120 W/cm，到 F600S 与 LightHammer® 10 系列的 240 W/cm。更高的功率换来的是产线速度——但它不能替代正确的光谱。",
          },
        },
        {
          title: { en: "3 · Bulb fill sets the spectrum", zh: "3 · 灯管填充决定光谱" },
          body: {
            en: "H, D and V bulbs put their energy in different places. Match the bulb to where your photoinitiator absorbs — a pigmented or thick film that will not through-cure under an H bulb often cures cleanly under a D or V. Special fill bulbs can be made to match an unusual chemistry.",
            zh: "H、D、V 三种灯管的能量分布各不相同。请按光引发剂的吸收位置选择灯管——在 H 灯管下无法穿透固化的含颜料体系或厚膜，改用 D 或 V 灯管往往能干净固化。对于特殊化学体系，还可定制特殊填充灯管以匹配光谱。",
          },
        },
        {
          title: { en: "4 · Then the line format", zh: "4 · 最后是产线形态" },
          body: {
            en: "The same lamp head goes into very different handling systems — benchtop conveyor for R&D, sheet and part handling, web, wide-line, wire and fibre, or a static chamber for 3D parts. Nitrogen inerting, dichroic reflectors and water-cooled beds are the levers for heat-sensitive or oxygen-inhibited work.",
            zh: "同一个灯头可以装进形态迥异的处理系统——研发用台式输送、片材与工件输送、卷材、宽幅、线缆与光纤，或用于 3D 工件的静态曝光腔。对热敏或受氧阻聚的工艺，氮气惰化、二向色反射镜与水冷台面是主要调节手段。",
          },
        },
      ],
      tables: [
        {
          caption: { en: "Lamp systems", zh: "灯系统一览" },
          columns: [
            { en: "Model", zh: "机型" },
            { en: "Bulb length", zh: "灯管长度" },
            { en: "Power class", zh: "功率等级" },
            { en: "Power level", zh: "功率调节" },
            { en: "Warm start", zh: "热启动" },
          ],
          rows: [
            [
              { en: "F300S / F300SQ", zh: "F300S / F300SQ" },
              { en: "15 cm (6\")", zh: "15 cm（6″）" },
              { en: "120 W/cm (300 W/inch)", zh: "120 W/cm（300 W/英寸）" },
              { en: "Fixed, or quick restart (optional)", zh: "固定，或快速重启（选配）" },
              { en: "5 seconds", zh: "5 秒" },
            ],
            [
              { en: "F600S", zh: "F600S" },
              { en: "25 cm (10\")", zh: "25 cm（10″）" },
              { en: "240 W/cm (600 W/inch)", zh: "240 W/cm（600 W/英寸）" },
              { en: "Dual level (160 / 240 W/cm)", zh: "双档（160 / 240 W/cm）" },
              { en: "5 seconds", zh: "5 秒" },
            ],
            [
              { en: "LightHammer® 6 Mark II", zh: "LightHammer® 6 Mark II" },
              { en: "15 cm (6\")", zh: "15 cm（6″）" },
              { en: "200 W/cm (500 W/inch)", zh: "200 W/cm（500 W/英寸）" },
              { en: "Variable 35–100%, quick restart", zh: "35–100% 无级可调，快速重启" },
              { en: "Instantaneous", zh: "瞬时" },
            ],
            [
              { en: "LightHammer® 10 Mark II", zh: "LightHammer® 10 Mark II" },
              { en: "25 cm (10\")", zh: "25 cm（10″）" },
              { en: "240 W/cm (600 W/inch)", zh: "240 W/cm（600 W/英寸）" },
              { en: "Variable 35–100%, quick restart", zh: "35–100% 无级可调，快速重启" },
              { en: "Instantaneous", zh: "瞬时" },
            ],
            [
              { en: "LightHammer® 10L Mark II", zh: "LightHammer® 10L Mark II" },
              { en: "25 cm (10\")", zh: "25 cm（10″）" },
              { en: "170 W/cm (410 W/inch)", zh: "170 W/cm（410 W/英寸）" },
              { en: "Variable 35–100%, quick restart", zh: "35–100% 无级可调，快速重启" },
              { en: "Instantaneous", zh: "瞬时" },
            ],
            [
              { en: "LightHammer® 10H Mark II", zh: "LightHammer® 10H Mark II" },
              { en: "25 cm (10\")", zh: "25 cm（10″）" },
              { en: "240 W/cm (600 W/inch)", zh: "240 W/cm（600 W/英寸）" },
              { en: "Variable 35–100%, quick restart", zh: "35–100% 无级可调，快速重启" },
              { en: "Instantaneous", zh: "瞬时" },
            ],
            [
              { en: "LightHammer® 10 Mark III", zh: "LightHammer® 10 Mark III" },
              { en: "25 cm (10\")", zh: "25 cm（10″）" },
              { en: "240 W/cm (600 W/inch)", zh: "240 W/cm（600 W/英寸）" },
              { en: "Variable 35–100%", zh: "35–100% 无级可调" },
              { en: "Instantaneous", zh: "瞬时" },
            ],
          ],
          footnote: {
            en: "All models: electrodeless UV lamp, semi-elliptical reflector, 5.3 cm (2.1\") optimum focus distance, unlimited cure width by stacking end to end, optional dichroic reflectors, standard external control. Cold start 15 s (20 s on F300S). Warm-start behaviour depends on duty cycle and power level. Bulbs contain mercury — manage in accordance with local, state or federal disposal laws; intact bulbs may be returned to the manufacturer.",
            zh: "全系列共同特性：无极紫外灯、半椭圆反射器、最佳焦距 5.3 cm（2.1 英寸）、端对端拼接实现固化宽度无限扩展、二向色反射镜选配、标配外部控制接口。冷启动 15 秒（F300S 为 20 秒）。热启动表现取决于占空比与功率等级。灯管含汞——须依据当地、州或联邦法规处置；完好的灯管可退回制造商处理。",
          },
        },
        {
          caption: { en: "Bulb fills", zh: "灯管光谱类型" },
          columns: [
            { en: "Bulb", zh: "灯管" },
            { en: "Spectrum", zh: "光谱特征" },
            { en: "Choose it for", zh: "适用方向" },
          ],
          rows: [
            [
              { en: "H", zh: "H 灯管" },
              { en: "Broadband multi-line output across roughly 200–580 nm", zh: "约 200–580 nm 范围内的宽带多谱线输出" },
              { en: "The general-purpose default — standard photoinitiator systems", zh: "通用默认选择——标准光引发剂体系" },
            ],
            [
              { en: "D", zh: "D 灯管" },
              { en: "Energy concentrated in the 350–400 nm region", zh: "能量集中于 350–400 nm 区间" },
              { en: "Thick films and pigmented systems needing depth of cure", zh: "需要深层穿透固化的厚膜与含颜料体系" },
            ],
            [
              { en: "V", zh: "V 灯管" },
              { en: "Energy concentrated around 400–420 nm", zh: "能量集中于 400–420 nm 附近" },
              { en: "Dark and high-opacity coatings that need long-wave cure", zh: "需要长波固化的深色与高遮盖涂层" },
            ],
            [
              { en: "H+", zh: "H+ 灯管" },
              { en: "Enhanced H output", zh: "增强型 H 灯管输出" },
              { en: "Where a standard H bulb runs out of output", zh: "标准 H 灯管输出不足的场合" },
            ],
          ],
          footnote: {
            en: "13 mm electrodeless bulbs. Special fill bulbs are available to match the lamp spectrum to an unusual process chemistry.",
            zh: "13 mm 无极灯管。可提供特殊填充灯管，按非常规工艺化学体系匹配灯管光谱。",
          },
        },
        {
          caption: { en: "UV processing systems", zh: "整线处理系统" },
          columns: [
            { en: "System", zh: "系统类型" },
            { en: "Key specifications", zh: "关键规格" },
          ],
          rows: [
            [
              { en: "Benchtop conveyor", zh: "台式输送系统" },
              { en: "Belt speeds 0.6–76 m/min (2–250 fpm); lamp rotates, raises and lowers; for laboratory and R&D, rugged enough for pilot plant or production", zh: "皮带速度 0.6–76 m/min（2–250 fpm）；灯头可旋转、升降；面向实验室与研发，亦可用于中试与生产环境" },
            ],
            [
              { en: "Sheet & part handling", zh: "片材/工件输送系统" },
              { en: "Conveyor 5 cm–3 m wide, to 150 m/min (500 fpm); Teflon®-coated Kevlar®, anti-static Nomex® or stainless belts; water-cooled beds, cold reflectors, nitrogen inerting available", zh: "输送宽度 5 cm–3 m，速度最高 150 m/min（500 fpm）；特氟龙涂层凯夫拉、防静电 Nomex® 或不锈钢皮带；可配水冷台面、冷反射镜、氮气惰化" },
            ],
            [
              { en: "Web systems", zh: "卷材系统" },
              { en: "15 cm–6 m wide; nitrogen inerting to 50 ppm O₂; purged and pressurised versions for hazardous locations; full process-control integration and on-line monitoring", zh: "幅宽 15 cm–6 m；氮气惰化可至 50 ppm O₂；危险区域可选正压吹扫型；可与工艺控制系统完整集成并支持在线监测" },
            ],
            [
              { en: "Wide-line systems", zh: "宽幅系统" },
              { en: "Width unlimited — 8-metre systems in production; excellent uniformity across the full width; heat management for thermally sensitive product; nitrogen inerting available", zh: "幅宽不限——已有 8 米系统投产；全幅宽均匀性优异；针对热敏产品提供热管理方案；可配氮气惰化" },
            ],
            [
              { en: "Wire, cable & fibre", zh: "线缆与光纤系统" },
              { en: "360° reflector systems for maximum efficiency; high-intensity, well-defined sweet spot for line speed; patented reflector for optical fibre production; nitrogen inerting available", zh: "360° 反射器设计以实现最高效率；高强度、边界清晰的甜点区以提升产线速度；光纤生产专用反射器已获专利；可配氮气惰化" },
            ],
            [
              { en: "Special product handling", zh: "特殊工件处理系统" },
              { en: "Static exposure chambers; 3D part curing; rotational or non-rotational cure; robotic part handling", zh: "静态曝光腔；3D 工件固化；旋转或非旋转固化；机器人上下料" },
            ],
          ],
          footnote: {
            en: "Custom solutions are available for every system type except the benchtop and wire/fibre lines, which are standard configurations.",
            zh: "除台式系统与线缆/光纤系统为标准配置外，其余各类系统均可提供定制方案。",
          },
        },
      ],
    },
    match: (p) => p.tech === "Microwave UV Curing",
  },

  // ───────────────────────── 4. 精密检测仪表 ─────────────────────────
  "uv-measurement": {
    slug: "uv-measurement",
    accent: "#0ea5e9",
    name: { en: "Precision UV Measurement Instruments", zh: "精密检测仪表" },
    tagline: {
      en: "Radiometers and calibration systems — the instruments that turn a UV process from 'it looked cured' into a documented number.",
      zh: "辐照计与校准系统——把紫外工艺从「看起来固化了」变成可记录数据的仪表。",
    },
    intro: [
      {
        en: "A UV process is only controlled if it is measured. Radiometers verify that the irradiance and dose reaching the bond line are what the process was validated at — before a drifting lamp, a contaminated light guide or a changed working distance turns into a field failure.",
        zh: "紫外工艺唯有可测量，方能可控。辐照计用于验证抵达粘接面的辐照度与剂量是否与工艺验证值一致——避免灯泡衰减、光导污染或工作距离变化演变为现场失效。",
      },
      {
        en: "ETIA supplies the OmniCure® R2000 radiometer for lamp-based spot systems and the LS200 UV LED radiometry and calibration system, both with traceable factory calibration. For regulated medical device and aerospace production, these are what makes your process records defensible in an audit.",
        zh: "ETIA 供应用于灯式点固化系统的 OmniCure® R2000 辐照计，以及 LS200 UV LED 辐照测量与校准系统，均具备可溯源的出厂校准。对于受监管的医疗器械与航空航天生产而言，这正是让工艺记录在审核中站得住脚的依据。",
      },
    ],
    applications: [
      { en: "Medical device process validation", zh: "医疗器械工艺验证" },
      { en: "Routine production QA checks", zh: "量产例行质量检查" },
      { en: "Lamp & LED ageing monitoring", zh: "灯泡与 LED 衰减监控" },
      { en: "Line qualification (IQ/OQ/PQ)", zh: "产线确认（IQ/OQ/PQ）" },
      { en: "R&D process development", zh: "研发工艺开发" },
    ],
    metaTitle: "UV Radiometers & Calibration Instruments | OmniCure R2000, LS200 | ETIA",
    metaDescription:
      "Precision UV measurement instruments — OmniCure R2000 radiometer and LS200 UV LED radiometry and calibration system with traceable calibration, for process validation and production QA. Supplied by ETIA.",
    match: (p) => MEASUREMENT_SLUGS.has(p.slug),
    // Awaiting the customer's own instrument line-up and copy.
    contentPending: true,
  },

  // ────────────────────────── 5. 红外加热 ──────────────────────────
  "infrared-heating": {
    slug: "infrared-heating",
    accent: "#dc2626",
    name: { en: "Infrared Heating", zh: "红外加热" },
    tagline: {
      en: "Noblelight infrared modules — heat delivered into the product, exactly where the process needs it.",
      zh: "Noblelight 红外模块——将热量直接送入产品，精确投放在工艺所需之处。",
    },
    // Overview copy from the Excelitas "Infrared Modules for Industrial
    // Process Technology" brochure. The source text still says "Heraeus" —
    // the pre-acquisition brand — so it reads as Excelitas here.
    intro: [
      {
        en: "Noblelight infrared modules from Excelitas deliver thermal energy in a practical form. This simplifies and accelerates operating stages, optimises energy usage and results in an exceptional finished product. Whether they are large heating fields, tunnels, ovens or individual modules, our modular infrared systems are always precisely matched to your processes and materials — so the infrared heat is supplied in the right amounts, exactly where it is required.",
        zh: "Excelitas 的 Noblelight 红外模块以切实可用的形式输出热能，从而简化并加快工序、优化能耗，并带来出色的成品质量。无论是大型加热面、隧道炉、烘箱还是单个模块，我们的模块化红外系统始终与您的工艺和材料精确匹配——让红外热量以恰当的量，投放在恰当的位置。",
      },
      {
        en: "Infrared heat is intelligent heat, because it heats the material precisely and efficiently. Noblelight infrared modules are supplied ready-to-fit and can be integrated directly into the production process, and can be supplied with matching control units and housings — the ideal solution for industrial heating processes.",
        zh: "红外热是「聪明的热」，因为它精确而高效地加热材料本身。Noblelight 红外模块以可直接安装的状态交付，能够直接集成进生产工序，并可配套相应的控制单元与外壳——是工业加热工艺的理想方案。",
      },
      {
        en: "Our speciality is problem solving. Solutions range from a simple module through to a purpose-built system with control: the simply constructed M series for retrofits and single heating stations, the scalable MX series with integrated control for complete heating systems, and custom-engineered MX solutions built around your geometry. Emitter output, voltage and wavelength are selected for the material actually being heated.",
        zh: "我们的专长是解决问题。方案从单个模块，到带控制系统的专门定制设备：结构简明的 M 系列，适用于改造与单工位加热；带集成控制的 MX 可扩展系列，构成完整加热系统；以及围绕您的几何形状定制开发的 MX 方案。发射器的功率、电压与波长，均依据实际受热材料选定。",
      },
      {
        en: "ETIA supplies and supports these modules in Asia-Pacific — tell us your process temperature, line speed and product geometry, and our engineers will specify the emitter, module and control system for it.",
        zh: "ETIA 在亚太区提供这些模块的供应与支持——请告知您的工艺温度、产线速度与产品几何形状，我们的工程师将据此确定发射器、模块与控制系统方案。",
      },
    ],
    applications: [
      { en: "Automotive component drying & activation", zh: "汽车零部件干燥与活化" },
      { en: "Lacquer & coating drying", zh: "涂料与涂层干燥" },
      { en: "Plastics welding, laminating & embossing", zh: "塑料焊接、层压与压花" },
      { en: "Glass coating, cutting & mirror backing", zh: "玻璃涂层、切割与镜背处理" },
      { en: "Cable, fibre & wire tube ovens", zh: "线缆、光纤与线材管式炉" },
      { en: "Pre-heating before coating or bonding", zh: "涂覆或粘接前预热" },
    ],
    metaTitle: "Industrial Infrared Heating Modules | Noblelight M & MX Series | ETIA",
    metaDescription:
      "Excelitas Noblelight infrared heating modules for industrial process technology — M 85, M 110, M 115, scalable MX modules with integrated control, custom MX systems and infrared control systems. Specified to your process by ETIA.",
    docs: [
      {
        file: "Custom MX Infrared Heating Modules Brochure.pdf",
        kind: { en: "Infrared Modules Brochure", zh: "红外模块产品手册", vi: "Brochure mô-đun hồng ngoại", th: "โบรชัวร์โมดูลอินฟราเรด" },
        base: COS_PDF,
      },
    ],
    heroImage: "/images/infrared/emitter-array.jpg",
    gallery: [
      {
        src: "/images/infrared/automotive-body-drying.jpg",
        caption: { en: "Infrared drying of a painted car body", zh: "车身涂装的红外干燥" },
      },
      {
        src: "/images/infrared/mx-scalable-modules.jpg",
        caption: { en: "MX modules in an automotive production line", zh: "汽车产线中的 MX 模块" },
      },
      {
        src: "/images/infrared/web-drying-line.jpg",
        caption: { en: "Infrared field drying a continuous web", zh: "连续卷材的红外加热面" },
      },
      {
        src: "/images/infrared/control-cabinet.jpg",
        caption: { en: "Control and regulation cabinet", zh: "控制与调节柜" },
      },
    ],
    match: (p) => p.tech === "Infrared Heating",
  },
};

// Menu / page order — the order the customer specified.
export const PRODUCT_CATEGORY_ORDER: ProductCategorySlug[] = [
  "mercury-uv-lamp",
  "uv-led",
  "microwave-uv-lamp",
  "uv-measurement",
  "infrared-heating",
];

export const productCategoryList: ProductCategory[] = PRODUCT_CATEGORY_ORDER.map(
  (slug) => productCategories[slug]
);

export function productCategoryHref(slug: ProductCategorySlug): string {
  return `/product/technology/${slug}`;
}

// The catalog models in a category, in catalog order.
export function categoryProducts(slug: ProductCategorySlug): Product[] {
  return products.filter(productCategories[slug].match);
}

// The technology categories a brand actually has products in. Computed from
// the catalog so it stays true as the catalog changes — the four brands cross
// the five categories rather than mapping one-to-one onto them.
export function categoriesForBrand(brandId: Product["brandId"]): ProductCategory[] {
  return productCategoryList.filter((c) =>
    products.some((p) => p.brandId === brandId && c.match(p))
  );
}

export function isProductCategorySlug(s: string): s is ProductCategorySlug {
  return s in productCategories;
}

export function productCategoryMetadata(slug: ProductCategorySlug): Metadata {
  const c = productCategories[slug];
  return {
    title: c.metaTitle,
    description: c.metaDescription,
    alternates: { canonical: `${SITE}${productCategoryHref(slug)}` },
  };
}

// Home > Products > {Category}
export function productCategoryBreadcrumbJsonLd(slug: ProductCategorySlug) {
  const c = productCategories[slug];
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE },
      { "@type": "ListItem", position: 2, name: "Products", item: `${SITE}/product` },
      { "@type": "ListItem", position: 3, name: c.name.en, item: `${SITE}${productCategoryHref(slug)}` },
    ],
  };
}
