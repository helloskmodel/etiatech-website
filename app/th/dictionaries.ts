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
  products: { heading: string; subheading: string; lampFamily: string; ledFamily: string; inquire: string; specsLabel: string; details: string; featuresLabel: string; fullSpecsLabel: string };
  cta: { heading: string; body: string; button: string };
  footer: { tagline: string; rights: string };
};

const tri = {
  metaTitle: {
    th: "OmniCure ประเทศไทย — ตัวแทนจำหน่ายที่ได้รับอนุญาต UV Curing | ETIA",
    en: "OmniCure Thailand — Authorized UV Curing Distributor | ETIA",
    zh: "OmniCure 泰国授权分销商 — UV Curing 光固化系统 | ETIA",
  } as Tri,
  metaDescription: {
    th: "ตัวแทนจำหน่ายที่ได้รับอนุญาตของระบบบ่มยูวีแบบจุด OmniCure ในประเทศไทย — ทั้งระบบหลอดยูวีและ UV LED พร้อมการควบคุม การวัดค่าความเข้มแสง และทีมวิศวกรที่ช่วยเลือกรุ่นและสนับสนุนทางเทคนิค",
    en: "Authorized distributor of OmniCure UV spot curing systems in Thailand — UV lamp and UV LED spot curing, controllers and radiometry, with engineer-led selection and technical support.",
    zh: "OmniCure UV 点固化系统泰国授权代理——涵盖 UV 灯式与 UV LED 点固化、控制器与辐照度测量，并由工程师团队提供选型与技术支持。",
  } as Tri,
  navHome: { th: "หน้าแรก", en: "Home", zh: "首页" } as Tri,
  navProducts: { th: "ผลิตภัณฑ์", en: "Products", zh: "产品" } as Tri,
  navApplications: { th: "การใช้งาน", en: "Applications", zh: "应用" } as Tri,
  navContact: { th: "ฝ่ายขายและบริการ", en: "Sales & Support", zh: "销售与支持" } as Tri,
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
  details: { th: "ดูรายละเอียด", en: "View details", zh: "查看详情" } as Tri,
  featuresLabel: { th: "คุณสมบัติเด่น", en: "Key Features", zh: "主要特性" } as Tri,
  fullSpecsLabel: { th: "ข้อมูลจำเพาะทางเทคนิค", en: "Technical Specifications", zh: "技术规格" } as Tri,
  ctaHeading: {
    th: "ไม่แน่ใจว่าระบบไหนเหมาะกับงานของคุณ?",
    en: "Not sure which system is right for you?",
    zh: "不确定哪款系统适合您？",
  } as Tri,
  ctaBody: {
    th: "วิศวกรของเราจะช่วยจับคู่ระบบบ่มยูวีที่เหมาะกับการใช้งานของคุณ ตั้งแต่การเลือกรุ่นจนถึงการตรวจสอบ",
    en: "Our engineers will match the right UV curing system to your exact application — from selection to validation.",
    zh: "我们的工程师将为您的具体应用匹配合适的 UV Curing 光固化系统——从选型到验证。",
  } as Tri,
  ctaButton: { th: "ติดต่อฝ่ายขาย", en: "Talk to Our Sales", zh: "联系我们的销售" } as Tri,
  footerTagline: {
    th: "ตัวแทนจำหน่ายที่ได้รับอนุญาตของระบบ UV curing ระดับโลก ประสบการณ์ความเชี่ยวชาญเชิงการใช้งานกว่า 20 ปี ใน 10 อุตสาหกรรม",
    en: "Authorized distributor of world-class UV curing systems. 20 years of application expertise across 10 industries.",
    zh: "世界级 UV Curing 光固化系统授权代理，20 年应用专业经验，覆盖 10 大行业。",
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
      details: tri.details[lang],
      featuresLabel: tri.featuresLabel[lang],
      fullSpecsLabel: tri.fullSpecsLabel[lang],
    },
    cta: { heading: tri.ctaHeading[lang], body: tri.ctaBody[lang], button: tri.ctaButton[lang] },
    footer: { tagline: tri.footerTagline[lang], rights: tri.footerRights[lang] },
  };
}

// ─── Home page ──────────────────────────────────────────────────────────
// Full home copy supplied by the ETIA Thailand team (EN + TH); ZH reuses the
// main-site home strings. Structure mirrors the main site's HomeView.
const homeTri = {
  heroEyebrow: {
    th: "ตัวแทนจำหน่าย OmniCure ที่ได้รับอนุญาตในประเทศไทย · รับประกันสินค้าของแท้",
    en: "Authorized OmniCure Distributor in Thailand · Genuine Products Guaranteed",
    zh: "泰国 OmniCure 授权分销商 · 正品保证",
  } as Tri,
  heroTitleA: { th: "ความเชี่ยวชาญที่ไว้วางใจได้", en: "Trusted Expertise.", zh: "深耕积淀" } as Tri,
  heroTitleB: { th: "โซลูชันที่ตอบสนองรวดเร็ว", en: "Responsive Solutions.", zh: "高效响应" } as Tri,
  heroSubtitle: {
    th: "ETIA เปลี่ยนประสบการณ์ตรงด้าน UV curing กว่า 20 ปี ให้เป็นการสนับสนุนที่ใช้ได้จริง ครอบคลุมตั้งแต่การเลือกผลิตภัณฑ์ การตรวจสอบกระบวนการ การแก้ไขปัญหา การบำรุงรักษา ไปจนถึงการซ่อมโดยทีมงานของเราเอง",
    en: "ETIA turns 20 years of hands-on UV curing experience into practical support across product selection, process validation, troubleshooting, maintenance, and in-house repair.",
    zh: "ETIA将20年UV Curing 光固化实战经验，转化为覆盖选型、工艺验证、故障排查、保养与自有维修的全方位实用支持。",
  } as Tri,
  heroBtnProducts: { th: "ดูผลิตภัณฑ์ →", en: "Explore Products →", zh: "浏览产品 →" } as Tri,
  heroBtnEngineer: { th: "ปรึกษาวิศวกร", en: "Talk to an Engineer", zh: "咨询工程师" } as Tri,
  whyEyebrow: { th: "ทำไมต้อง ETIA", en: "Why ETIA", zh: "为何选择 ETIA" } as Tri,
  whyHeading: {
    th: "ETIA Thailand เป็นตัวแทนจำหน่ายผลิตภัณฑ์ OmniCure ที่ได้รับอนุญาตในประเทศไทย",
    en: "ETIA Thailand is an authorized distributor of OmniCure products in Thailand.",
    zh: "ETIA Thailand 是 OmniCure 产品在泰国的授权分销商。",
  } as Tri,
  whyIntro: {
    th: "ด้วยรากฐานความเป็นเลิศทางวิศวกรรม ETIA ร่วมมือกับแบรนด์ UV curing ชั้นนำระดับโลก เพื่อส่งมอบโซลูชันที่พิสูจน์แล้ว เชื่อถือได้ และดูแลครบวงจร — ตั้งแต่การเลือกจนถึงการสนับสนุน",
    en: "Rooted in engineering excellence, ETIA partners with the world's leading UV curing brands to deliver solutions that are proven, reliable, and backed end-to-end — from selection to support.",
    zh: "立足硬核工程技术，携手全球头部 UV Curing 光固化品牌，提供经过市场验证、性能稳定、全流程保障的一体化方案，从设备选型到终身售后全程护航。",
  } as Tri,
  spectrumEyebrow: { th: "เทคโนโลยี UV Curing", en: "UV Curing Technology", zh: "UV Curing 光固化技术" } as Tri,
  spectrumHeading: {
    th: "โซลูชัน UV Curing ครบทุกสเปกตรัม",
    en: "The Full Spectrum of UV Curing Solutions",
    zh: "全光谱UV Curing 光固化解决方案",
  } as Tri,
  spectrumSubtitle: {
    th: "200–600 nm · 6 เส้นทางเทคโนโลยี · 4 แบรนด์ระดับโลก",
    en: "200–600 nm · 6 Technology Routes · 4 World-Class Brands",
    zh: "200–600 nm · 6条技术路线 · 4大世界级品牌",
  } as Tri,
  spectrumViewAll: { th: "ดูผลิตภัณฑ์ทั้งหมด →", en: "View All Products →", zh: "查看全部产品 →" } as Tri,
  ctaHeading: {
    th: "ต้องการความช่วยเหลือในการเลือกระบบ UV curing ที่เหมาะสม?",
    en: "Need help selecting the right UV curing system?",
    zh: "需要帮助挑选合适的UV Curing 光固化系统?",
  } as Tri,
  ctaBody: {
    th: "วิศวกรของเราพร้อมช่วยเหลือ — ตั้งแต่ spot ถึง area, lamp ถึง LED, การเลือกจนถึงการตรวจสอบ",
    en: "Our engineers are ready to help — from spot to area, lamp to LED, selection to validation.",
    zh: "我们的工程师随时待命——从点固化到面固化，从灯式到LED，从选型到验证。",
  } as Tri,
  ctaButton: { th: "ปรึกษาวิศวกร ETIA →", en: "Talk to ETIA Engineers →", zh: "联系ETIA工程师 →" } as Tri,
  casesEyebrow: { th: "กรณีศึกษา", en: "Case Studies", zh: "案例研究" } as Tri,
  casesHeading: {
    th: "ที่ซึ่งประสิทธิภาพได้รับการพิสูจน์",
    en: "Where Performance Is Proven",
    zh: "实力，经得起验证",
  } as Tri,
  casesSubtitle: {
    th: "ดูว่าระบบ UV curing ของเราส่งมอบผลลัพธ์อย่างไร ในงานที่ความแม่นยำและความน่าเชื่อถือสำคัญที่สุด",
    en: "See how our UV curing systems deliver where precision and reliability matter most.",
    zh: "看我们的UV Curing 光固化系统如何在最看重精度与可靠性的场景中交付成果。",
  } as Tri,
  casesReadOne: { th: "อ่านกรณีศึกษานี้ →", en: "Read this case study →", zh: "阅读此案例 →" } as Tri,
};

const whyCards: { title: Tri; desc: Tri }[] = [
  {
    title: { th: "ความเชี่ยวชาญเชิงการใช้งานอย่างลึกซึ้ง", en: "Deep Application Expertise", zh: "深厚的应用专业能力" },
    desc: {
      th: "กรณีใช้งานจริงที่ผ่านการพิสูจน์กว่า 20 ปี ใน 10 อุตสาหกรรม ตั้งแต่การยึดติดอุปกรณ์การแพทย์ ไปจนถึงการแพ็กเกจโฟโตนิกส์สำหรับศูนย์ข้อมูล AI — เราพิสูจน์กระบวนการมาแล้ว คุณจึงไม่ต้องเริ่มจากศูนย์",
      en: "20 years of validated industry cases across 10 industries. From medical device bonding to AI-data-center photonics packaging — we've proven the process so you don't have to.",
      zh: "20年、覆盖10大行业的验证案例。从医疗器械粘接到AI数据中心光子封装——工艺我们已替你验证。",
    },
  },
  {
    title: { th: "สต็อกในพื้นที่ · จัดส่งรวดเร็ว", en: "Local Supply & Fast Delivery", zh: "本地备货 · 快速交付" },
    desc: {
      th: "อุปกรณ์และวัสดุสิ้นเปลืองมีสต็อกในพื้นที่ ไม่ต้องรอนาน ไม่มีปัญหาการนำเข้าที่คาดไม่ถึง — ได้ระบบที่คุณต้องการ ในเวลาที่คุณต้องการ",
      en: "Equipment and consumables in local stock. No long lead times, no import surprises — the system you need, when you need it.",
      zh: "设备与耗材本地备货。无漫长货期、无进口意外——你需要的系统，随需即得。",
    },
  },
  {
    title: { th: "ศูนย์ซ่อมของเราเอง", en: "In-House Repair Factory", zh: "自有维修工厂" },
    desc: {
      th: "ศูนย์ซ่อมของเราเองพร้อมทีมช่างเทคนิคที่ผ่านการฝึกอบรม ดูแลการบำรุงรักษา การรับประกันแบบขยาย และการซ่อมด่วน — ลดเวลาหยุดทำงานของสายการผลิตของคุณ",
      en: "Our own repair facility with a trained technical team handles maintenance, extended warranty, and urgent repairs — minimizing downtime on your production line.",
      zh: "自有维修工厂与专业技术团队，承接保养、延保与紧急维修——最大限度降低产线停机。",
    },
  },
  {
    title: { th: "บริการให้คำปรึกษาครบทุกกระบวนการ", en: "Full-Process Consulting Service", zh: "全流程咨询服务" },
    desc: {
      th: "ตั้งแต่การเลือกเริ่มต้นและการตรวจสอบการใช้งาน ไปจนถึงการแก้ไขปัญหาและการจัดการตลอดอายุการใช้งาน — วิศวกรของเราคือพันธมิตรของคุณในทุกขั้นตอน",
      en: "From initial selection and application validation to troubleshooting and lifecycle management — our engineers are your partners at every stage of the process.",
      zh: "从选型、应用验证到故障排查与全生命周期管理——我们的工程师是你每个环节的伙伴。",
    },
  },
];

export type ThHomeDict = {
  hero: { eyebrow: string; titleA: string; titleB: string; subtitle: string; btnProducts: string; btnEngineer: string };
  why: { eyebrow: string; heading: string; intro: string; cards: { title: string; desc: string }[] };
  spectrum: { eyebrow: string; heading: string; subtitle: string; viewAll: string };
  cases: { eyebrow: string; heading: string; subtitle: string; readOne: string };
  cta: { heading: string; body: string; button: string };
};

export function getHomeDict(lang: ThLocale): ThHomeDict {
  return {
    hero: {
      eyebrow: homeTri.heroEyebrow[lang],
      titleA: homeTri.heroTitleA[lang],
      titleB: homeTri.heroTitleB[lang],
      subtitle: homeTri.heroSubtitle[lang],
      btnProducts: homeTri.heroBtnProducts[lang],
      btnEngineer: homeTri.heroBtnEngineer[lang],
    },
    why: {
      eyebrow: homeTri.whyEyebrow[lang],
      heading: homeTri.whyHeading[lang],
      intro: homeTri.whyIntro[lang],
      cards: whyCards.map((c) => ({ title: c.title[lang], desc: c.desc[lang] })),
    },
    spectrum: {
      eyebrow: homeTri.spectrumEyebrow[lang],
      heading: homeTri.spectrumHeading[lang],
      subtitle: homeTri.spectrumSubtitle[lang],
      viewAll: homeTri.spectrumViewAll[lang],
    },
    cases: {
      eyebrow: homeTri.casesEyebrow[lang],
      heading: homeTri.casesHeading[lang],
      subtitle: homeTri.casesSubtitle[lang],
      readOne: homeTri.casesReadOne[lang],
    },
    cta: { heading: homeTri.ctaHeading[lang], body: homeTri.ctaBody[lang], button: homeTri.ctaButton[lang] },
  };
}

// ─── Authorized-distributor trust block ─────────────────────────────────
// Etiatec (Thailand) is the Excelitas-appointed authorized OmniCure distributor
// for Thailand (cert. dated 2026-05-28, valid one year). Surfacing this on every
// page is both a conversion driver and an E-E-A-T trust signal.
export const COMPANY = {
  legalName: "Etiatec (Thailand) Co., Ltd.",
  address: "22/41 H-Cape Biz Center, Sukhaphiban 2 Road, Prawet Subdistrict, Prawet District, Bangkok 10250",
  addressLocality: "Bangkok",
  postalCode: "10250",
  country: "TH",
  appointedBy: "Excelitas Canada Inc.",
  validThrough: "2027-05",
};

const authTri = {
  badge: {
    th: "ตัวแทนจำหน่าย OmniCure ที่ได้รับอนุญาตในประเทศไทย",
    en: "Authorized OmniCure Distributor in Thailand",
    zh: "泰国 OmniCure 授权分销商",
  } as Tri,
  statement: {
    th: "Etiatec (Thailand) Co., Ltd. เป็นตัวแทนจำหน่ายที่ได้รับอนุญาตอย่างเป็นทางการของผลิตภัณฑ์ OmniCure ในประเทศไทย แต่งตั้งโดย Excelitas Canada Inc. พร้อมการรับประกันจากโรงงานเต็มรูปแบบและบริการติดตั้งในพื้นที่ รองรับงานประมูลและ RFQ",
    en: "Etiatec (Thailand) Co., Ltd. is the authorized OmniCure distributor for Thailand, appointed by Excelitas Canada Inc., with full factory guarantee and local installation support — RFQ & tender ready.",
    zh: "Etiatec (Thailand) Co., Ltd. 是 OmniCure 产品在泰国的官方授权分销商，由 Excelitas Canada Inc. 授权，提供原厂完整保修与本地安装支持，支持招标与 RFQ。",
  } as Tri,
  requestQuote: { th: "ขอใบเสนอราคา", en: "Request a Quote", zh: "索取报价" } as Tri,
};

export type ThAuthDict = { badge: string; statement: string; requestQuote: string };
export function getAuthDict(lang: ThLocale): ThAuthDict {
  return { badge: authTri.badge[lang], statement: authTri.statement[lang], requestQuote: authTri.requestQuote[lang] };
}

// ─── Case-study detail labels ───────────────────────────────────────────
const caseTri = {
  overview: { th: "ภาพรวมการใช้งาน", en: "Application Overview", zh: "应用概览" } as Tri,
  challenge: { th: "ความท้าทาย", en: "The Challenge", zh: "挑战" } as Tri,
  solution: { th: "โซลูชัน", en: "The Solution", zh: "解决方案" } as Tri,
  benefit: { th: "ประโยชน์ที่ได้", en: "The Benefit", zh: "收益" } as Tri,
  marketContext: { th: "บริบทตลาด", en: "Market Context", zh: "市场背景" } as Tri,
  back: { th: "← กลับไปหน้ากรณีศึกษา", en: "← Back to Case Studies", zh: "← 返回案例" } as Tri,
};

export type ThCaseDict = {
  overview: string;
  challenge: string;
  solution: string;
  benefit: string;
  marketContext: string;
  back: string;
};

export function getCaseDict(lang: ThLocale): ThCaseDict {
  return {
    overview: caseTri.overview[lang],
    challenge: caseTri.challenge[lang],
    solution: caseTri.solution[lang],
    benefit: caseTri.benefit[lang],
    marketContext: caseTri.marketContext[lang],
    back: caseTri.back[lang],
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
