import type { Metadata } from "next";
import type { Product } from "@/components/productCatalog";
import type { LangText } from "@/components/LocaleContext";

const SITE = "https://www.etiatech.com";

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
    tagline: { en: "UV Spot & Area Curing · Excelitas", zh: "UV 点固化与面固化 · Excelitas" },
    intro: {
      en: "OmniCure® is a trusted UV curing brand under Excelitas, offering LED and lamp-based spot, small-area and large-area curing systems for adhesives, coatings and inks.\n\nWith stable optical power, uniform curing performance and reliable process control, OmniCure supports precision manufacturing in medical devices, electronics, optoelectronics and other demanding applications.",
      zh: "OmniCure® 是 Excelitas 旗下值得信赖的 UV 固化品牌,提供 LED 与灯式的点固化、小面积及大面积固化系统,适用于胶粘剂、涂层与油墨。\n\n凭借稳定的光输出、均匀的固化性能与可靠的工艺控制,OmniCure 为医疗器械、电子、光电子等高要求领域的精密制造提供支持。",
    },
    applications: [
      { en: "Medical Device", zh: "医疗器械" },
      { en: "Electronics & PCB", zh: "电子与 PCB" },
      { en: "Photonics & Advanced Packaging", zh: "光子学与先进封装" },
      { en: "EV Battery & Automotive", zh: "动力电池与汽车" },
    ],
    metaTitle: "OmniCure UV Curing Systems — Authorized Distributor | ETIA",
    metaDescription:
      "OmniCure UV spot & area curing systems (lamp + UV LED) with closed-loop feedback. ETIA is an Asia-Pacific authorized distributor — local stock, selection support, and in-house repair.",
  },
  phoseon: {
    catalogBrandId: "phoseon",
    name: "Phoseon",
    logo: "◆",
    color: "#0ea5e9",
    tagline: { en: "UV LED Air & Water-Cooled · Printing & Industrial", zh: "UV LED 风冷与水冷 · 印刷与工业" },
    intro: {
      en: "Phoseon pioneered high-power UV LED curing for printing and industrial processes. Its air-cooled FireJet/FireEdge and water-cooled FireLine, VeriCure and Nexus II families deliver high irradiance and dose in rugged, easy-to-integrate form factors — from narrow-web flexo and inkjet to demanding wide-format and coating lines.",
      zh: "Phoseon 是印刷与工业领域高功率 UV LED 固化的开创者。其风冷 FireJet/FireEdge 与水冷 FireLine、VeriCure、Nexus II 系列,以坚固、易集成的结构提供高辐照度与高剂量——覆盖窄幅柔印、喷墨,以及严苛的宽幅与涂层产线。",
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
  return { title: b.metaTitle, description: b.metaDescription };
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
