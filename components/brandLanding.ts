import type { Metadata } from "next";
import type { Product } from "@/components/productCatalog";
import type { LangText } from "@/components/LocaleContext";

const SITE = "https://www.etiatech.com";
const OG_IMAGE = "https://etiatech-1303055923.cos.ap-singapore.myqcloud.com/IMAGE/logo/ETIALOGO.jpg";

// Config for the four brand landing pages. Products are pulled from the
// catalog by `catalogBrandId` and grouped by technology route, so the model
// lists stay in sync automatically.
export type BrandSlug = "omnicure" | "phoseon" | "fusion-uv" | "noblelight";

export type BrandLanding = {
  catalogBrandId: Product["brandId"];
  name: string;
  logo: string;
  color: string;
  tagline: LangText;
  // Optional brand-specific hero copy. When present, the hero shows this
  // eyebrow / headline / subline instead of the generic "{brand} UV Curing
  // Systems" title. headline may contain "\n" for a line break (the last
  // line is accented). Falls back to the generic title when omitted.
  hero?: { eyebrow: LangText; headline: LangText; subline: LangText };
  intro: LangText;
  applications: LangText[];
  metaTitle: string;
  metaDescription: string;
};

export const brandLanding: Record<BrandSlug, BrandLanding> = {
  omnicure: {
    catalogBrandId: "omnicure",
    name: "OmniCure",
    logo: "●",
    color: "#1A56DB",
    tagline: { en: "", zh: "" },
    hero: {
      eyebrow: { en: "OmniCure®", zh: "OmniCure®" },
      headline: { en: "Precision Cures.\nSupreme Control.", zh: "精准固化\n稳定掌控" },
      subline: {
        en: "Authentic OmniCure® systems — local stock, service and warranty in-region.",
        zh: "正品 OmniCure® 系统 —— 本地库存、本地服务与区域保修。",
      },
    },
    intro: {
      en: "OmniCure® is a trusted UV curing brand under Excelitas, offering LED and lamp-based spot, small-area and large-area curing systems for adhesives, coatings and inks.\n\nWith stable optical power, uniform curing performance and reliable process control, OmniCure supports precision manufacturing in medical devices, electronics, optoelectronics and other demanding applications.",
      zh: "OmniCure® 是 Excelitas 旗下值得信赖的 UV Curing 紫外线固化品牌,提供 LED 与灯式的点固化、小面积及大面积固化系统,适用于胶粘剂、涂层与油墨。\n\n凭借稳定的光输出、均匀的固化性能与可靠的工艺控制,OmniCure 为医疗器械、电子、光电子等高要求领域的精密制造提供支持。",
    },
    applications: [
      { en: "Medical Device", zh: "医疗器械" },
      { en: "Electronics & PCB", zh: "电子与 PCB" },
      { en: "Photonics & Advanced Packaging", zh: "光子学与先进封装" },
      { en: "EV Battery & Automotive", zh: "动力电池与汽车" },
    ],
    metaTitle: "OmniCure UV Curing Systems — Authorized Distributor | ETIA",
    metaDescription:
      "OmniCure precision UV curing systems for assembly, bonding, medical devices and electronics. ETIA supplies genuine systems, lamps, application support and service.",
  },
  phoseon: {
    catalogBrandId: "phoseon",
    name: "Phoseon",
    logo: "◆",
    color: "#0ea5e9",
    tagline: { en: "", zh: "" },
    hero: {
      eyebrow: { en: "Phoseon®", zh: "Phoseon®" },
      headline: { en: "High-Power LED.\nLong-Life Performance.", zh: "高功率 LED\n超长寿命性能" },
      subline: {
        en: "Authentic Phoseon® systems — local stock, service and warranty in-region.",
        zh: "正品 Phoseon® 系统 —— 本地库存、本地服务与区域保修。",
      },
    },
    intro: {
      en: "Phoseon® is a UV LED technology brand under Excelitas, known for high-performance UV curing and life science illumination solutions.\n\nIts air-cooled and water-cooled UV LED systems support curing and drying of inks, coatings and adhesives across labels, packaging, digital printing, electronics, automotive and medical device applications.\n\nPhoseon also provides advanced LED illumination systems for fluorescence imaging, microscopy, laboratory instruments and life science applications.",
      zh: "Phoseon® 是 Excelitas 旗下的 UV LED 技术品牌,以高性能 UV Curing 紫外线固化与生命科学照明解决方案著称。\n\n其风冷与水冷 UV LED 系统,支持油墨、涂层与胶粘剂的固化与干燥,广泛应用于标签、包装、数码印刷、电子、汽车及医疗器械等领域。\n\nPhoseon 还提供先进的 LED 照明系统,用于荧光成像、显微镜、实验室仪器及生命科学应用。",
    },
    applications: [
      { en: "Printing & Packaging", zh: "印刷与包装" },
      { en: "Electronics", zh: "电子" },
      { en: "Industrial Coatings", zh: "工业涂层" },
      { en: "Optical Fiber & Cable", zh: "光纤与线缆" },
    ],
    metaTitle: "Phoseon UV LED Systems — Authorized Distributor | ETIA",
    metaDescription:
      "Phoseon high-power UV LED curing — air-cooled FireJet/FireEdge and water-cooled FireLine/VeriCure/Nexus II for printing and industrial lines. ETIA: Asia-Pacific authorized distributor.",
  },
  "fusion-uv": {
    catalogBrandId: "fusionuv",
    name: "Fusion UV",
    logo: "▲",
    color: "#f59e0b",
    tagline: { en: "Microwave UV · Broad Spectrum 200–600 nm", zh: "微波 UV · 宽光谱 200–600 nm" },
    intro: {
      en: "Fusion UV electrodeless microwave lamps deliver broad-spectrum 200–600 nm output with long bulb life and consistent performance. The F Series and flagship LightHammer platforms power printing, coatings, optical fiber and wide-web applications, and retrofit easily into existing production lines.",
      zh: "Fusion UV 无极微波灯提供宽光谱 200–600 nm 输出,灯泡寿命长、性能稳定。F 系列与旗舰 LightHammer 平台为印刷、涂层、光纤及宽幅卷材应用提供动力,并可轻松改造接入现有产线。",
    },
    applications: [
      { en: "Printing & Coatings", zh: "印刷与涂层" },
      { en: "Optical Fiber", zh: "光纤" },
      { en: "Wide-Web & Converting", zh: "宽幅卷材与加工" },
      { en: "Industrial", zh: "工业" },
    ],
    metaTitle: "Fusion UV Microwave UV Systems — Authorized Distributor | ETIA",
    metaDescription:
      "Fusion UV electrodeless microwave UV lamps — broad-spectrum 200–600 nm, F Series & LightHammer, for printing, coatings and optical fiber. ETIA: Asia-Pacific authorized distributor.",
  },
  noblelight: {
    catalogBrandId: "noblelight",
    name: "NobleLight",
    logo: "■",
    color: "#7c3aed",
    tagline: { en: "Semray UV LED · Large Area & Fiber", zh: "Semray UV LED · 大面积与光纤" },
    intro: {
      en: "Excelitas Noblelight Semray delivers scalable, water-cooled UV LED systems for large-area industrial curing, with emission widths from 400 to 1300 mm and purpose-built solutions for optical fiber draw and wire marking. Customized optics bring high intensity even at large working distances.",
      zh: "Excelitas Noblelight Semray 提供可扩展的水冷 UV LED 系统,用于大面积工业固化,发光宽度 400 至 1300 毫米,并为光纤拉丝与线材标识打造专用方案。定制光学设计即使在大工作距离下也能保持高强度。",
    },
    applications: [
      { en: "Industrial Large-Area Curing", zh: "工业大面积固化" },
      { en: "Optical Fiber Draw Tower", zh: "光纤拉丝塔" },
      { en: "Wire Marking", zh: "线材标识" },
      { en: "Custom UV LED Solutions", zh: "定制 UV LED 方案" },
    ],
    metaTitle: "NobleLight Semray UV LED Systems — Authorized Distributor | ETIA",
    metaDescription:
      "Excelitas Noblelight Semray water-cooled UV LED systems — scalable 400–1300 mm width, plus 360° optical-fiber curing. ETIA: Asia-Pacific authorized distributor.",
  },
};

// SEO metadata (title + description) for a brand landing page.
export function brandMetadata(slug: BrandSlug): Metadata {
  const b = brandLanding[slug];
  const url = `${SITE}/product/${slug}`;
  return {
    title: b.metaTitle,
    description: b.metaDescription,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      url,
      siteName: "ETIA Technology",
      title: b.metaTitle,
      description: b.metaDescription,
      images: [{ url: OG_IMAGE, alt: `${b.name} UV curing systems — ETIA Technology` }],
    },
    twitter: {
      card: "summary_large_image",
      title: b.metaTitle,
      description: b.metaDescription,
      images: [OG_IMAGE],
    },
  };
}

// BreadcrumbList JSON-LD: Home > Products > {Brand}.
export function brandBreadcrumbJsonLd(slug: BrandSlug) {
  const b = brandLanding[slug];
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE },
      { "@type": "ListItem", position: 2, name: "Products", item: `${SITE}/product` },
      { "@type": "ListItem", position: 3, name: b.name, item: `${SITE}/product/${slug}` },
    ],
  };
}
