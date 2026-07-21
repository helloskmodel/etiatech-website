import { getProduct, localizeProduct, productImage } from "@/components/productCatalog";
import { productContentTh } from "@/app/th/productContentTh";
import type { Lang } from "./copy";

// Builds a plain-data config for a product SEM landing page from the real
// catalog + Thai brochure content. Runs on the server; the result is passed to
// the client <ProductLanding>. Nothing here is fabricated.

export type ProductLandingConfig = {
  slug: string;
  lang: Lang;
  name: string;
  tagline: string;
  subhead: string;
  stats: [string, string][];
  image: string;
  features: string[];
  specs: [string, string][];
  applications: string[];
  faq: { q: string; a: string }[];
  metaTitle: string;
  metaDescription: string;
};

type Tri = { en: string; th: string };
const pick = (t: Tri, l: Lang) => t[l];

const META: Record<string, {
  tagline: Tri;
  stats: [string, string][];
  faq: { q: Tri; a: Tri }[];
  metaTitle: Tri;
  // Optional landing-only copy overrides. SEM landing pages need short,
  // benefit-first wording; without these the page falls back to the catalog
  // intro/features, which read like brochure paragraphs.
  landingSubhead?: Tri;
  landingFeatures?: Record<Lang, string[]>;
}> = {
  "s2000-elite": {
    tagline: { en: "Maximum Power. Total Control.", th: "พลังสูงสุด ควบคุมได้ทุกขั้นตอน" },
    stats: [["30 W/cm²", "Peak Irradiance"], ["±5%", "CLF Stability"], ["30 ms", "Shutter"], ["200 W", "Hg Lamp"]],
    metaTitle: {
      en: "OmniCure S2000 Elite UV Spot Curing — Thailand | Authorized Distributor",
      th: "OmniCure S2000 Elite ระบบบ่มยูวีแบบจุด — ประเทศไทย | ตัวแทนจำหน่ายที่ได้รับอนุญาต",
    },
    faq: [
      { q: { en: "Is the OmniCure S2000 Elite available in Thailand?", th: "OmniCure S2000 Elite มีจำหน่ายในประเทศไทยหรือไม่?" },
        a: { en: "Yes — ETIA is an authorized OmniCure distributor in Thailand, with local stock, installation and service.", th: "มี — ETIA เป็นตัวแทนจำหน่าย OmniCure ที่ได้รับอนุญาตในประเทศไทย พร้อมสต็อก ติดตั้ง และบริการในพื้นที่" } },
      { q: { en: "What irradiance does the S2000 Elite deliver?", th: "S2000 Elite ให้ค่าความเข้มแสงเท่าใด?" },
        a: { en: "Up to 30 W/cm², with Closed-Loop Feedback holding ±5% stability across lamp life.", th: "สูงถึง 30 W/cm² พร้อม Closed-Loop Feedback รักษาเสถียรภาพ ±5% ตลอดอายุหลอด" } },
      { q: { en: "Do you provide installation and calibration?", th: "มีบริการติดตั้งและสอบเทียบหรือไม่?" },
        a: { en: "Yes — on-site installation, R2000 radiometer calibration, and spare parts locally.", th: "มี — ติดตั้งในพื้นที่ สอบเทียบด้วยเรดิโอมิเตอร์ R2000 และอะไหล่ในประเทศ" } },
      { q: { en: "What is the warranty?", th: "การรับประกันเป็นอย่างไร?" },
        a: { en: "Full manufacturer warranty — system 1 year, lamp 2,000 hours.", th: "รับประกันจากโรงงานเต็มรูปแบบ — ระบบ 1 ปี หลอด 2,000 ชั่วโมง" } },
    ],
  },
  "s1500-pro": {
    tagline: { en: "Automation-Ready UV Spot Curing.", th: "ระบบบ่มยูวีแบบจุด พร้อมสำหรับไลน์ผลิตอัตโนมัติ" },
    stats: [["30 W/cm²", "Peak Irradiance"], ["2,000 h", "Lamp Guarantee"], ['4.3"', "Touch Screen"], ["PLC", "DB50 Output"]],
    metaTitle: {
      en: "OmniCure S1500 Pro UV Spot Curing — Thailand | Authorized Distributor",
      th: "OmniCure S1500 Pro ระบบบ่มยูวีแบบจุด — ประเทศไทย | ตัวแทนจำหน่ายที่ได้รับอนุญาต",
    },
    landingSubhead: {
      en: "200 W lamp-based UV spot curing built for automated manufacturing — up to 30 W/cm², a guaranteed 2,000-hour lamp, PLC output and full Industry 4.0 traceability.",
      th: "ระบบบ่มยูวีแบบจุดหลอด 200 W ออกแบบเพื่อการผลิตอัตโนมัติ — ความเข้มสูงสุด 30 W/cm² รับประกันหลอด 2,000 ชั่วโมง พร้อม PLC และการตรวจสอบย้อนกลับตามแนวทาง Industry 4.0",
    },
    landingFeatures: {
      en: [
        "Intelli-Lamp® 2.0 — lamp life guaranteed for 2,000 hours",
        "Up to 30 W/cm² output from a 200 W UV lamp",
        "StepCure® 2.0 — program multi-phase cure profiles",
        '4.3" LCD touch screen for fast, simple setup',
        "Programmable PLC output (DB50) for automated lines",
        "NFC Intelli-Tap® keycards + Flight Recorder event tracking",
        "7 interchangeable optical filters; cleanroom-ready",
        "Backward compatible with original S1500 light guides & radiometers",
      ],
      th: [
        "Intelli-Lamp® 2.0 — รับประกันอายุหลอด 2,000 ชั่วโมง",
        "ความเข้มแสงสูงสุด 30 W/cm² จากหลอด UV 200 W",
        "StepCure® 2.0 — ตั้งโปรไฟล์การบ่มหลายขั้นตอน",
        'จอสัมผัส LCD 4.3" ตั้งค่าง่ายและรวดเร็ว',
        "เอาต์พุต PLC (DB50) ตั้งโปรแกรมได้ สำหรับไลน์ผลิตอัตโนมัติ",
        "คีย์การ์ด NFC Intelli-Tap® + Flight Recorder บันทึกเหตุการณ์",
        "ฟิลเตอร์ออปติคัลเปลี่ยนเองได้ 7 แบบ พร้อมใช้ในคลีนรูม",
        "ใช้ร่วมกับ light guide และเรดิโอมิเตอร์ของ S1500 รุ่นเดิมได้",
      ],
    },
    faq: [
      { q: { en: "Is the OmniCure S1500 Pro available in Thailand?", th: "OmniCure S1500 Pro มีจำหน่ายในประเทศไทยหรือไม่?" },
        a: { en: "Yes — ETIA is an authorized OmniCure distributor in Thailand, with local stock, installation and service.", th: "มี — ETIA เป็นตัวแทนจำหน่าย OmniCure ที่ได้รับอนุญาตในประเทศไทย พร้อมสต็อก ติดตั้ง และบริการในพื้นที่" } },
      { q: { en: "How is the S1500 Pro suited to automated production?", th: "S1500 Pro เหมาะกับการผลิตอัตโนมัติอย่างไร?" },
        a: { en: "It offers a programmable PLC output (DB50), StepCure 2.0 profiles, NFC access control and Flight Recorder event tracking for traceability.", th: "มีเอาต์พุต PLC (DB50) ตั้งโปรแกรมได้, โปรไฟล์ StepCure 2.0, ควบคุมสิทธิ์ด้วย NFC และ Flight Recorder สำหรับการตรวจสอบย้อนกลับ" } },
      { q: { en: "Can I keep my original S1500 accessories?", th: "ใช้อุปกรณ์เสริมของ S1500 รุ่นเดิมได้หรือไม่?" },
        a: { en: "Yes — the S1500 Pro is fully backward compatible with original S1500 light guides and radiometers.", th: "ได้ — S1500 Pro ใช้ร่วมกับ light guide และเรดิโอมิเตอร์ของ S1500 รุ่นเดิมได้ทั้งหมด" } },
      { q: { en: "What is the lamp warranty?", th: "การรับประกันหลอดเป็นอย่างไร?" },
        a: { en: "Lamp life is guaranteed for 2,000 hours, managed by Intelli-Lamp 2.0 monitoring.", th: "รับประกันอายุหลอด 2,000 ชั่วโมง ควบคุมโดยระบบตรวจสอบ Intelli-Lamp 2.0" } },
    ],
  },
  lx500: {
    tagline: { en: "Cool, Stable LED Spot Curing.", th: "การบ่มแบบจุดด้วย LED ที่เย็นและเสถียร" },
    stats: [["27 W/cm²", "Peak @385nm"], ["±5%", "Optical Stability"], ["2 / 4", "Channels"], ["1%", "Intensity Steps"]],
    // Short, one-idea-per-line copy distilled from the official Excelitas
    // LX500 brochure — keep it scannable; the full detail lives in the specs
    // table and the catalog product page.
    landingSubhead: {
      en: "Ultra-compact UV LED spot curing with ±5% optical stability and up to 27 W/cm² peak irradiance — consistent, repeatable cures at a fraction of the running cost.",
      th: "ระบบบ่มยูวีแบบจุดด้วย LED ขนาดกะทัดรัด เสถียรภาพแสง ±5% ความเข้มสูงสุด 27 W/cm² — บ่มได้สม่ำเสมอ ทำซ้ำได้ ด้วยต้นทุนการใช้งานที่ต่ำ",
    },
    landingFeatures: {
      en: [
        "±5% optical stability — Intelli-Lamp® monitors every exposure",
        "Up to 27 W/cm² peak irradiance (365 / 385 / 395 / 405 nm heads)",
        "Runs up to 4 LED heads — together or independently",
        "1% intensity steps (5–100%) for tight process control",
        "StepCure® 2.0 — program multi-step cure profiles",
        "~75% less energy than arc-lamp systems",
        "Cool, compact, no external cooling — fits any line; PLC / USB control",
      ],
      th: [
        "เสถียรภาพแสง ±5% — Intelli-Lamp® ตรวจสอบทุกครั้งที่ฉายแสง",
        "ความเข้มสูงสุด 27 W/cm² (หัว LED 365 / 385 / 395 / 405 nm)",
        "ควบคุมหัว LED ได้สูงสุด 4 หัว พร้อมกันหรือแยกอิสระ",
        "ปรับความเข้มละเอียดทีละ 1% (5–100%) ควบคุมกระบวนการได้แม่นยำ",
        "StepCure® 2.0 — ตั้งโปรไฟล์การบ่มหลายขั้นตอน",
        "ประหยัดพลังงานกว่าระบบหลอด arc ประมาณ 75%",
        "ขนาดเล็ก ทำงานเย็น ไม่ต้องระบายความร้อนภายนอก รองรับ PLC / USB",
      ],
    },
    metaTitle: {
      en: "OmniCure LX500 UV LED Spot Curing — Thailand | Authorized Distributor",
      th: "OmniCure LX500 UV LED บ่มแบบจุด — ประเทศไทย | ตัวแทนจำหน่ายที่ได้รับอนุญาต",
    },
    faq: [
      { q: { en: "Is the OmniCure LX500 available in Thailand?", th: "OmniCure LX500 มีจำหน่ายในประเทศไทยหรือไม่?" },
        a: { en: "Yes — ETIA is an authorized OmniCure distributor in Thailand, with local stock, installation and service.", th: "มี — ETIA เป็นตัวแทนจำหน่าย OmniCure ที่ได้รับอนุญาตในประเทศไทย พร้อมสต็อก ติดตั้ง และบริการในพื้นที่" } },
      { q: { en: "How many heads can the LX500 control?", th: "LX500 ควบคุมหัวได้กี่หัว?" },
        a: { en: "Up to four UV LED heads, simultaneously or independently, at 365 / 385 / 395 / 405 nm.", th: "สูงสุด 4 หัว UV LED พร้อมกันหรือแยกอิสระ ที่ 365 / 385 / 395 / 405 nm" } },
      { q: { en: "Do you provide installation and calibration?", th: "มีบริการติดตั้งและสอบเทียบหรือไม่?" },
        a: { en: "Yes — on-site setup, LS200 UV LED radiometry calibration, and spare parts locally.", th: "มี — ติดตั้งในพื้นที่ สอบเทียบด้วย LS200 และอะไหล่ในประเทศ" } },
      { q: { en: "What is the warranty?", th: "การรับประกันเป็นอย่างไร?" },
        a: { en: "Full manufacturer warranty, backed by local ETIA support.", th: "รับประกันจากโรงงานเต็มรูปแบบ พร้อมการสนับสนุนจาก ETIA ในพื้นที่" } },
    ],
  },
};

export function buildProductConfig(slug: string, lang: Lang): ProductLandingConfig | null {
  const p = getProduct(slug);
  const meta = META[slug];
  if (!p || !meta) return null;

  const th = productContentTh[slug];
  const loc = localizeProduct(p, "en");

  // Features: landing override first, then TH brochure highlights, then catalog.
  const features =
    meta.landingFeatures?.[lang] ??
    (lang === "th" && th?.highlights?.length ? th.highlights : (loc.features ?? []));
  // Specs: TH brochure spec groups (flattened) when available, else catalog.
  const specs: [string, string][] =
    lang === "th" && th?.specGroups?.length
      ? th.specGroups.flatMap((g) => g.rows)
      : p.specs;
  const subhead = meta.landingSubhead
    ? pick(meta.landingSubhead, lang)
    : lang === "th" && th?.subtitle
      ? th.subtitle
      : loc.intro;

  return {
    slug,
    lang,
    name: p.name,
    tagline: pick(meta.tagline, lang),
    subhead,
    stats: meta.stats,
    image: productImage(p),
    features: features.slice(0, 8),
    specs: specs.slice(0, 12),
    applications: p.applications ?? [],
    faq: meta.faq.map((f) => ({ q: pick(f.q, lang), a: pick(f.a, lang) })),
    metaTitle: pick(meta.metaTitle, lang),
    metaDescription: (subhead ?? "").slice(0, 155),
  };
}
