import "server-only";

// URL-routed locales for the Thailand market microsite. The locale comes from
// the /th/[lang] path segment (SEO-correct, one URL per language) — NOT from
// the cookie-based LocaleContext the main site uses.
export const TH_LOCALES = ["th", "en", "zh"] as const;
export type ThLocale = (typeof TH_LOCALES)[number];

export function isThLocale(x: string): x is ThLocale {
  return (TH_LOCALES as readonly string[]).includes(x);
}

// Value for the <html lang> attribute per locale.
export const HTML_LANG: Record<ThLocale, string> = {
  th: "th",
  en: "en",
  zh: "zh-CN",
};

type Tri = Record<ThLocale, string>;

// ─────────────────────────────────────────────────────────────────────────
// ⚠️ TRANSLATION STATUS
// EN and ZH are final. TH strings below are a MACHINE-AUTHORED DRAFT and must
// be reviewed by the Thailand team before go-live (per the translate-then-
// review decision). Technical terms especially (e.g. "การบ่มยูวี" = UV curing)
// should be confirmed against local industry usage. Do not point production
// traffic here until the TH column is signed off.
// ─────────────────────────────────────────────────────────────────────────
export type ThDict = {
  metaTitle: string;
  metaDescription: string;
  nav: { home: string; products: string; applications: string; contact: string };
  hero: { kicker: string; title: string; subtitle: string; cta: string; ctaProducts: string };
  products: { heading: string; subheading: string; lampFamily: string; ledFamily: string; inquire: string; specsLabel: string };
  cta: { heading: string; body: string; button: string };
  footer: { tagline: string; rights: string };
};

const tri = {
  metaTitle: {
    th: "ระบบบ่มยูวีแบบจุด OmniCure | ETIA Technology ประเทศไทย",
    en: "OmniCure UV Spot Curing Systems | ETIA Technology Thailand",
    zh: "OmniCure UV 点固化系统 | ETIA Technology 泰国",
  } as Tri,
  metaDescription: {
    th: "ตัวแทนจำหน่ายที่ได้รับอนุญาตของระบบบ่มยูวีแบบจุด OmniCure ในประเทศไทย — ทั้งระบบหลอดยูวีและ UV LED พร้อมการควบคุม การวัดค่าความเข้มแสง และทีมวิศวกรที่ช่วยเลือกรุ่นและสนับสนุนทางเทคนิค",
    en: "Authorized distributor of OmniCure UV spot curing systems in Thailand — UV lamp and UV LED spot curing, controllers and radiometry, with engineer-led selection and technical support.",
    zh: "OmniCure UV 点固化系统泰国授权代理——涵盖 UV 灯式与 UV LED 点固化、控制器与辐照度测量，并由工程师团队提供选型与技术支持。",
  } as Tri,
  navHome: { th: "หน้าแรก", en: "Home", zh: "首页" } as Tri,
  navProducts: { th: "ผลิตภัณฑ์", en: "Products", zh: "产品" } as Tri,
  navApplications: { th: "การใช้งาน", en: "Applications", zh: "应用" } as Tri,
  navContact: { th: "ติดต่อเรา", en: "Contact", zh: "联系我们" } as Tri,
  heroKicker: {
    th: "OmniCure · ระบบบ่มยูวีแบบจุด",
    en: "OmniCure · UV Spot Curing",
    zh: "OmniCure · UV 点固化",
  } as Tri,
  heroTitle: {
    th: "ระบบบ่มยูวีแบบจุดที่แม่นยำ สำหรับสายการผลิตของคุณ",
    en: "Precision UV Spot Curing for Your Production Line",
    zh: "为您的产线，精准匹配 UV 点固化",
  } as Tri,
  heroSubtitle: {
    th: "ETIA เป็นตัวแทนจำหน่ายที่ได้รับอนุญาตของ OmniCure ในประเทศไทย ครอบคลุมทั้งระบบบ่มแบบหลอดยูวีและ UV LED พร้อมทีมวิศวกรประสบการณ์กว่า 20 ปี ช่วยเลือกและตรวจสอบระบบให้เหมาะกับงานของคุณ",
    en: "ETIA is OmniCure's authorized distributor in Thailand — covering both UV lamp and UV LED spot curing, with 20 years of engineering experience to help you select and validate the right system.",
    zh: "ETIA 是 OmniCure 在泰国的授权代理，涵盖 UV 灯式与 UV LED 点固化，由拥有 20 年经验的工程师团队为您选型并验证合适的系统。",
  } as Tri,
  heroCta: { th: "ปรึกษาวิศวกร", en: "Talk to an Engineer", zh: "咨询工程师" } as Tri,
  heroCtaProducts: { th: "ดูผลิตภัณฑ์", en: "View Products", zh: "查看产品" } as Tri,
  productsHeading: {
    th: "ระบบบ่มยูวีแบบจุด OmniCure",
    en: "OmniCure UV Spot Curing Systems",
    zh: "OmniCure UV 点固化系统",
  } as Tri,
  productsSubheading: {
    th: "ครบทั้งตระกูล — ระบบหลอดยูวีและ UV LED",
    en: "The complete family — UV lamp and UV LED systems",
    zh: "完整产品线——UV 灯式与 UV LED 系统",
  } as Tri,
  lampFamily: {
    th: "ระบบบ่มแบบจุด — หลอดยูวี (UV Lamp Spot)",
    en: "UV Lamp Spot Curing",
    zh: "UV 灯式点固化",
  } as Tri,
  ledFamily: {
    th: "ระบบบ่มแบบจุด — UV LED (UV LED Spot)",
    en: "UV LED Spot Curing",
    zh: "UV LED 点固化",
  } as Tri,
  inquire: { th: "สอบถามรุ่นนี้", en: "Inquire", zh: "咨询此型号" } as Tri,
  specsLabel: { th: "ข้อมูลจำเพาะ", en: "Key specs", zh: "主要规格" } as Tri,
  ctaHeading: {
    th: "ไม่แน่ใจว่าระบบไหนเหมาะกับงานของคุณ?",
    en: "Not sure which system is right for you?",
    zh: "不确定哪款系统适合您？",
  } as Tri,
  ctaBody: {
    th: "วิศวกรของเราจะช่วยจับคู่ระบบบ่มยูวีที่เหมาะกับการใช้งานของคุณ ตั้งแต่การเลือกรุ่นจนถึงการตรวจสอบ",
    en: "Our engineers will match the right UV curing system to your exact application — from selection to validation.",
    zh: "我们的工程师将为您的具体应用匹配合适的 UV 固化系统——从选型到验证。",
  } as Tri,
  ctaButton: { th: "ติดต่อฝ่ายขาย", en: "Talk to Our Sales", zh: "联系我们的销售" } as Tri,
  footerTagline: {
    th: "ตัวแทนจำหน่ายที่ได้รับอนุญาตของระบบบ่มยูวี OmniCure ในประเทศไทย",
    en: "Authorized distributor of OmniCure UV curing systems in Thailand.",
    zh: "OmniCure UV 固化系统泰国授权代理。",
  } as Tri,
  footerRights: {
    th: "สงวนลิขสิทธิ์",
    en: "All rights reserved.",
    zh: "版权所有。",
  } as Tri,
};

export function getDict(lang: ThLocale): ThDict {
  return {
    metaTitle: tri.metaTitle[lang],
    metaDescription: tri.metaDescription[lang],
    nav: {
      home: tri.navHome[lang],
      products: tri.navProducts[lang],
      applications: tri.navApplications[lang],
      contact: tri.navContact[lang],
    },
    hero: {
      kicker: tri.heroKicker[lang],
      title: tri.heroTitle[lang],
      subtitle: tri.heroSubtitle[lang],
      cta: tri.heroCta[lang],
      ctaProducts: tri.heroCtaProducts[lang],
    },
    products: {
      heading: tri.productsHeading[lang],
      subheading: tri.productsSubheading[lang],
      lampFamily: tri.lampFamily[lang],
      ledFamily: tri.ledFamily[lang],
      inquire: tri.inquire[lang],
      specsLabel: tri.specsLabel[lang],
    },
    cta: { heading: tri.ctaHeading[lang], body: tri.ctaBody[lang], button: tri.ctaButton[lang] },
    footer: { tagline: tri.footerTagline[lang], rights: tri.footerRights[lang] },
  };
}

// ─── Applications section ───────────────────────────────────────────────
// Scoped to Electronics, Medical, and automotive connectors. Application NOTE
// bodies (challenge/solution/benefit) are localized separately via
// localizeApp(): EN + ZH are final; TH bodies currently fall back to EN and are
// pending translation. The labels below are final in all three languages.
const appTri = {
  heading: {
    th: "การใช้งานตามอุตสาหกรรม",
    en: "Applications by Industry",
    zh: "按行业应用",
  } as Tri,
  subheading: {
    th: "โซลูชันการบ่มยูวีแบบจุดสำหรับงานอิเล็กทรอนิกส์ การแพทย์ และขั้วต่อยานยนต์",
    en: "UV spot curing solutions for electronics, medical, and automotive connector assembly.",
    zh: "面向电子、医疗与汽车接口装配的 UV 点固化方案。",
  } as Tri,
  challenge: { th: "โจทย์/ความท้าทาย", en: "Challenge", zh: "痛点/挑战" } as Tri,
  solution: { th: "โซลูชัน", en: "Solution", zh: "解决方案" } as Tri,
  benefit: { th: "ประโยชน์ที่ได้", en: "Benefit", zh: "收益" } as Tri,
  recommended: { th: "ผลิตภัณฑ์ที่แนะนำ", en: "Recommended", zh: "推荐产品" } as Tri,
  back: { th: "← กลับไปหน้าการใช้งาน", en: "← Back to Applications", zh: "← 返回应用" } as Tri,
  pendingTh: {
    th: "⚠️ เนื้อหาส่วนนี้อยู่ระหว่างการแปลเป็นภาษาไทย — แสดงเป็นภาษาอังกฤษชั่วคราว",
    en: "",
    zh: "",
  } as Tri,
};

export type ThAppDict = {
  nav: string;
  heading: string;
  subheading: string;
  challenge: string;
  solution: string;
  benefit: string;
  recommended: string;
  back: string;
  pendingTh: string;
};

export function getAppDict(lang: ThLocale): ThAppDict {
  return {
    nav: tri.navApplications[lang],
    heading: appTri.heading[lang],
    subheading: appTri.subheading[lang],
    challenge: appTri.challenge[lang],
    solution: appTri.solution[lang],
    benefit: appTri.benefit[lang],
    recommended: appTri.recommended[lang],
    back: appTri.back[lang],
    pendingTh: appTri.pendingTh[lang],
  };
}

// Localized label for the three focus industries. ZH comes from the main-site
// industry map; TH is provided here (short, reviewed labels).
const INDUSTRY_TH: Record<string, string> = {
  "Medical Device Assembly": "การประกอบอุปกรณ์การแพทย์",
  "Electronics & PCB Assembly": "อิเล็กทรอนิกส์และการประกอบ PCB",
  "Automotive & ADAS": "ยานยนต์และ ADAS",
};
export function thIndustryLabel(industry: string, lang: ThLocale): string {
  if (lang === "th") return INDUSTRY_TH[industry] ?? industry;
  return industry; // en/zh handled by the caller via localizeIndustry
}
