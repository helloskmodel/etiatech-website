// Copy + config for the standalone OmniCure Thailand SEM landing pages.
// EN is final (verbatim from the build brief). TH uses reviewed strings where
// we have them and falls back to EN elsewhere — TODO_TH marks strings still
// pending a vetted Thai translation (do NOT invent Thai for these).

export type Lang = "en" | "th";

// Brand palette (from the logo brief). TODO_FILL: confirm exact hex from logo.
export const BRAND = {
  green: "#4CAF3E",
  blue: "#1A3DAD",
  blueDark: "#142f86",
} as const;

// Contact — real ETIA Thailand sales director (Sompoch).
export const CONTACT = {
  phone: "+66 811 746 947",
  phoneHref: "+66811746947",
  lineId: "@712sangs", // "Omnicure Thailand" LINE official account
  email: "sompoch@etia-tech.com",
  address: "22/41 H-Cape Biz Center, Sukhaphiban 2 Rd, Prawet, Bangkok 10250",
} as const;

export const MODELS = ["S2000", "S1500 Pro", "LX500", "Flood", "Other"] as const;

type Product = { id: string; name: string; desc: string };
type FAQ = { q: string; a: string };

export type LandingCopy = {
  metaTitle: string;
  metaDescription: string;
  hero: {
    h1: string;
    subhead: string;
    badges: string[];
    ctaPrimary: string;
    ctaSecondary: string;
  };
  trustBar: string;
  productsHeading: string;
  products: Product[];
  askPrice: string;
  whyHeading: string;
  why: string[];
  applicationsHeading: string;
  applications: string;
  serviceHeading: string;
  service: string;
  closingHeading: string;
  contactLine: string;
  faqHeading: string;
  faq: FAQ[];
  form: {
    heading: string;
    name: string;
    company: string;
    phone: string;
    model: string;
    message: string;
    submit: string;
    consent: string;
    thanksTitle: string;
    thanksBody: string;
    required: string;
  };
};

const en: LandingCopy = {
  metaTitle: "Authorized OmniCure Distributor in Thailand | S2000, LX500 | ETIA",
  metaDescription:
    "ETIA is an authorized OmniCure distributor in Thailand — S2000, LX500 UV curing systems with local stock, installation, service and manufacturer warranty.",
  hero: {
    h1: "Authorized OmniCure Distributor in Thailand",
    subhead:
      "S2000 · LX500 · Spot & Flood UV Curing — local sales, installation, and service from Bangkok.",
    badges: ["Authorized by Excelitas Canada", "Full manufacturer guarantee", "On-site service in Thailand"],
    ctaPrimary: "Request a Quote",
    ctaSecondary: "Talk to us on LINE",
  },
  trustBar:
    "As an authorized distributor appointed by Excelitas Canada, ETIA supplies genuine OmniCure UV curing systems in Thailand — backed by the manufacturer's full guarantee and local installation support. Authentic products, local stock, Thai-language support, and after-sales service you can actually reach.",
  productsHeading: "OmniCure Systems",
  products: [
    { id: "s2000", name: "OmniCure S2000 / S2000 Elite", desc: "High-intensity spot UV curing for precise, repeatable bonding." },
    { id: "lx500", name: "OmniCure LX500 / LX400+", desc: "LED spot curing: cool operation, long lifetime, low maintenance." },
    { id: "flood", name: "Flood & area curing systems", desc: "Uniform UV curing over larger areas for assembly lines." },
    { id: "accessories", name: "Accessories & spare parts", desc: "Lightguides, radiometers, accessories & spare parts." },
  ],
  askPrice: "Ask Price",
  whyHeading: "Why buy from an authorized local distributor",
  why: [
    "Genuine & guaranteed — authentic OmniCure units with manufacturer warranty, not grey-market imports.",
    "Local stock & faster delivery — no long overseas lead times.",
    "Installation & commissioning in Thailand — set up and performance-validated on-site.",
    "Thai-language technical support — engineers who understand your process.",
    "Local repair, calibration & spare parts — minimal downtime.",
  ],
  applicationsHeading: "Applications",
  applications:
    "OmniCure systems from ETIA support UV curing in PCB manufacturing, automotive electronics, medical device assembly, parts assembly, and consumer electronics — wherever precise, repeatable curing matters.",
  serviceHeading: "Service & support",
  service:
    "Beyond supply, ETIA provides local repair, calibration, lightguide and bulb replacement, and spare parts for OmniCure systems — minimizing downtime and protecting your investment.",
  closingHeading: "Need OmniCure in Thailand? Get pricing and expert advice today.",
  contactLine: `☎ ${CONTACT.phone} · 💬 LINE: ${CONTACT.lineId} · ✉ ${CONTACT.email} · 📍 Bangkok, Thailand`,
  faqHeading: "Frequently asked questions",
  faq: [
    { q: "Where can I buy OmniCure in Thailand?", a: "From ETIA, an authorized distributor appointed by Excelitas Canada, with local stock and service." },
    { q: "Do you supply the OmniCure S2000 and LX500?", a: "Yes — both available, pricing on request." },
    { q: "Do you provide repair and calibration in Thailand?", a: "Yes — local service, calibration, and spare parts." },
    { q: "Are these genuine units with warranty?", a: "Yes — authentic products with full manufacturer guarantee." },
  ],
  form: {
    heading: "Request a Quote",
    name: "Name",
    company: "Company",
    phone: "Phone",
    model: "Model needed",
    message: "Message (optional)",
    submit: "Request a Quote",
    thanksTitle: "Thank you — we'll be in touch.",
    thanksBody: "Our Thailand team will contact you shortly with pricing and advice.",
    required: "Please complete the required fields.",
    consent: "By submitting this form, you agree that ETIA may process your contact information to respond to your inquiry, provide product recommendations, and offer sales or technical support. Please see our Privacy Policy for details.",
  },
};

// TH: reviewed strings where available; everything else falls back to EN.
// TODO_TH: hero.subhead, trustBar, why[], applications, service, faq[], form.*
const th: Partial<LandingCopy> = {
  metaTitle: "ตัวแทนจำหน่าย OmniCure ที่ได้รับอนุญาตในประเทศไทย | S2000, LX500 | ETIA",
  hero: {
    h1: "ตัวแทนจำหน่าย OmniCure ที่ได้รับอนุญาตในประเทศไทย",
    subhead: "S2000 · LX500 · Spot & Flood UV Curing — local sales, installation, and service from Bangkok.", // TODO_TH
    badges: ["ได้รับการแต่งตั้งโดย Excelitas Canada", "รับประกันจากโรงงานเต็มรูปแบบ", "บริการติดตั้งในประเทศไทย"],
    ctaPrimary: "ขอใบเสนอราคา",
    ctaSecondary: "คุยกับเราทาง LINE",
  },
  productsHeading: "ระบบ OmniCure",
  askPrice: "สอบถามราคา",
  whyHeading: "ทำไมต้องซื้อจากตัวแทนจำหน่ายที่ได้รับอนุญาตในพื้นที่",
  applicationsHeading: "การใช้งาน",
  serviceHeading: "บริการและการสนับสนุน",
  faqHeading: "คำถามที่พบบ่อย",
  form: {
    ...en.form,
    heading: "ขอใบเสนอราคา",
    name: "ชื่อ",
    company: "บริษัท",
    phone: "โทรศัพท์",
    model: "รุ่นที่ต้องการ",
    message: "ข้อความ (ไม่บังคับ)",
    submit: "ขอใบเสนอราคา",
    thanksTitle: "ขอบคุณ — เราจะติดต่อกลับโดยเร็ว",
    thanksBody: "ทีมงานประเทศไทยของเราจะติดต่อกลับพร้อมราคาและคำแนะนำ",
    required: "กรุณากรอกข้อมูลที่จำเป็น",
    consent: "การส่งแบบฟอร์มนี้ถือว่าคุณยินยอมให้ ETIA ประมวลผลข้อมูลติดต่อของคุณเพื่อตอบกลับคำถาม ให้คำแนะนำผลิตภัณฑ์ และให้การสนับสนุนด้านการขายหรือทางเทคนิค โปรดดูรายละเอียดในนโยบายความเป็นส่วนตัวของเรา",
  },
};

// Deep per-key fallback: TH value if present, else EN.
export function getCopy(lang: Lang): LandingCopy {
  if (lang === "en") return en;
  return {
    ...en,
    ...th,
    hero: { ...en.hero, ...(th.hero ?? {}) },
    form: { ...en.form, ...(th.form ?? {}) },
  } as LandingCopy;
}
