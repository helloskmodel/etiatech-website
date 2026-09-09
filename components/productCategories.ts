import type { Metadata } from "next";
import type { LangText } from "@/components/LocaleContext";
import { products, type Product } from "@/components/productCatalog";

const SITE = "https://www.etiatech.com";

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
  "microwave-uv-lamp": {
    slug: "microwave-uv-lamp",
    accent: "#f59e0b",
    name: { en: "Microwave Electrodeless UV Lamps", zh: "微波无极灯" },
    tagline: {
      en: "Electrodeless microwave UV — 200–600 nm broad spectrum, no electrodes to erode, built for continuous web production.",
      zh: "微波无极紫外——200–600 nm 宽光谱，无电极损耗，专为连续卷材生产而生。",
    },
    intro: [
      {
        en: "Microwave electrodeless lamps excite the bulb fill with microwave energy instead of electrodes. With no electrodes to erode, output stays stable far longer than a conventional arc lamp, and the bulb can be re-specified (H, D, V and other doped fills) to move the spectrum onto your ink or coating's absorption peak without changing the hardware.",
        zh: "微波无极灯以微波能量激发灯泡填充物，无需电极。由于不存在电极损耗，其输出稳定性远超传统弧光灯；同时可通过更换灯泡填充配方（H、D、V 及其他掺杂型）将光谱移至油墨或涂层的吸收峰，而无需更换硬件。",
      },
      {
        en: "ETIA supplies the Fusion UV® F Series and LightHammer® platforms, plus the DRF Series for optical fibre draw towers. These retrofit into existing production lines, and are the established source for wide-web printing, coating and converting where broad-spectrum through-cure matters more than spot precision.",
        zh: "ETIA 供应 Fusion UV® F 系列与 LightHammer® 平台，以及用于光纤拉丝塔的 DRF 系列。它们可改造接入现有产线，是宽幅印刷、涂层与加工领域的成熟光源——在这些场景中，宽光谱穿透固化比点位精度更为关键。",
      },
    ],
    applications: [
      { en: "Wide-web printing & converting", zh: "宽幅印刷与加工" },
      { en: "Industrial coatings", zh: "工业涂层" },
      { en: "Optical fibre draw tower", zh: "光纤拉丝塔" },
      { en: "Label & packaging production", zh: "标签与包装生产" },
      { en: "Wood & panel finishing", zh: "木器与板材涂饰" },
    ],
    metaTitle: "Microwave Electrodeless UV Lamps | Fusion UV F Series & LightHammer | ETIA",
    metaDescription:
      "Fusion UV electrodeless microwave UV lamp systems — 200–600 nm broad spectrum, no electrode erosion, F Series, LightHammer and DRF optical fibre platforms for printing, coating and converting lines. Supplied by ETIA.",
    match: (p) => p.tech === "Microwave UV Curing",
    // Awaiting the customer's own product/application material for this line.
    contentPending: true,
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
