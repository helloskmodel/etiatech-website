import type { Metadata } from "next";
import type { Locale } from "@/components/LocaleContext";
import { applicationsZh } from "@/data/applicationsData.zh";
import { getApplicationBySlug } from "@/data/applicationsData";
import { getCaseCnBySlug } from "@/data/caseStudiesCn";

// Shared SEO plumbing for the locale-locked (/zh /vi /th) versions of the
// main-site pages. Every group member must emit the SAME hreflang group.

const SITE = "https://www.etiatech.com";

export type SubLocale = Exclude<Locale, "en">;
export const SUB_LOCALES: SubLocale[] = ["zh", "vi", "th"];

export const OG_LOCALE: Record<SubLocale, string> = { zh: "zh_CN", vi: "vi_VN", th: "th_TH" };

// hreflang group for a main-site path mirrored at /zh /vi /th.
export function languageAlternates(path: string): Record<string, string> {
  return {
    en: `${SITE}${path}`,
    "zh-Hans": `${SITE}/zh${path}`,
    vi: `${SITE}/vi${path}`,
    th: `${SITE}/th${path}`,
    "x-default": `${SITE}${path}`,
  };
}

// ---------------------------------------------------------------------------
// Applications index (/applications)

const APPLICATIONS_INDEX_META: Record<SubLocale, { title: string; description: string }> = {
  zh: {
    title: "UV Curing 紫外线固化应用案例 | ETIA Technology",
    description: "深入了解 UV Curing 紫外线固化实际应用案例：客户挑战、推荐产品、应用收益与 ETIA 技术支持。",
  },
  th: {
    title: "กรณีศึกษาการใช้งาน UV Curing | ETIA Technology",
    description: "สำรวจกรณีศึกษาการใช้งาน UV curing จริง พร้อมความท้าทายของลูกค้า ผลิตภัณฑ์ที่แนะนำ ประโยชน์ และการสนับสนุนทางเทคนิคจาก ETIA",
  },
  vi: {
    title: "Case study ứng dụng UV Curing | ETIA Technology",
    description: "Khám phá các case study ứng dụng UV curing thực tế: thách thức của khách hàng, sản phẩm khuyến nghị, lợi ích và hỗ trợ kỹ thuật từ ETIA.",
  },
};

export function applicationsIndexMetadata(locale: SubLocale): Metadata {
  return {
    ...APPLICATIONS_INDEX_META[locale],
    alternates: { canonical: `${SITE}/${locale}/applications`, languages: languageAlternates("/applications") },
  };
}

// Application detail (/applications/[slug]) — localized title/description come
// from the client-translated applicationsZh data; English SEO fields are the
// fallback for anything missing.
export function applicationDetailMetadata(slug: string, locale: SubLocale): Metadata {
  const application = getApplicationBySlug(slug);
  if (!application) return { title: "Application Case Study | ETIA Technology" };
  const l10n = applicationsZh[slug];
  const title = l10n?.title?.[locale] ?? application.seo.title;
  const description = l10n?.subtitle?.[locale] ?? application.seo.description;
  const path = `/applications/${slug}`;
  const url = `${SITE}/${locale}${path}`;
  return {
    title,
    description,
    keywords: application.seo.keywords,
    alternates: { canonical: url, languages: languageAlternates(path) },
    openGraph: { title, description, url, type: "article", locale: OG_LOCALE[locale], images: [application.image] },
  };
}

export function applicationDetailJsonLd(slug: string, locale: SubLocale) {
  const application = getApplicationBySlug(slug);
  if (!application) return null;
  const l10n = applicationsZh[slug];
  const url = `${SITE}/${locale}/applications/${slug}`;
  return {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: l10n?.title?.[locale] ?? application.title,
    description: l10n?.subtitle?.[locale] ?? application.seo.description,
    image: application.image,
    inLanguage: locale === "zh" ? "zh-CN" : locale,
    keywords: application.seo.keywords.join(", "),
    author: { "@type": "Organization", name: "ETIA Technology" },
    publisher: { "@type": "Organization", name: "ETIA Technology", url: SITE },
    mainEntityOfPage: url,
  };
}

// ---------------------------------------------------------------------------
// Case studies (/case-studies, /case-studies/[slug])

const CASE_INDEX_META: Record<SubLocale, { title: string; description: string }> = {
  zh: {
    title: "UV Curing 紫外线固化案例分享 — OmniCure 应用 | ETIA Technology",
    description: "ETIA UV Curing 紫外线固化案例：OmniCure S2000 Elite、LX500 与 AC Large 如何解决医疗、汽车、电子、光子与光纤制造中的实际生产难题。",
  },
  th: {
    title: "กรณีศึกษา UV Curing — การใช้งาน OmniCure | ETIA Technology",
    description: "กรณีศึกษา UV Curing จาก ETIA: OmniCure S2000 Elite, LX500 และ AC Large แก้ปัญหาการผลิตจริงในอุตสาหกรรมการแพทย์ ยานยนต์ อิเล็กทรอนิกส์ โฟโตนิกส์ และการผลิตไฟเบอร์",
  },
  vi: {
    title: "Case study UV Curing — Ứng dụng OmniCure | ETIA Technology",
    description: "Case study UV Curing của ETIA: OmniCure S2000 Elite, LX500 và AC Large giải quyết các thách thức sản xuất thực tế trong y tế, ô tô, điện tử, quang tử và sản xuất sợi quang.",
  },
};

export function caseStudiesIndexMetadata(locale: SubLocale): Metadata {
  return {
    ...CASE_INDEX_META[locale],
    alternates: { canonical: `${SITE}/${locale}/case-studies`, languages: languageAlternates("/case-studies") },
  };
}

export function caseStudyDetailMetadata(slug: string, locale: SubLocale): Metadata {
  const cn = getCaseCnBySlug(slug);
  if (!cn) return { title: "UV Curing Case Study — ETIA Technology" };
  const title = cn.seoTitle[locale] ?? cn.seoTitle.en;
  const description = cn.seoDesc[locale] ?? cn.seoDesc.en;
  const path = `/case-studies/${slug}`;
  const url = `${SITE}/${locale}${path}`;
  return {
    title: `${title} | ETIA`,
    description,
    alternates: { canonical: url, languages: languageAlternates(path) },
    openGraph: { title, description, url, type: "article", locale: OG_LOCALE[locale], images: cn.image ? [cn.image] : undefined },
  };
}

export function caseStudyDetailJsonLd(slug: string, locale: SubLocale) {
  const cn = getCaseCnBySlug(slug);
  if (!cn) return null;
  const url = `${SITE}/${locale}/case-studies/${slug}`;
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: cn.seoTitle[locale] ?? cn.seoTitle.en,
    description: cn.seoDesc[locale] ?? cn.seoDesc.en,
    articleSection: cn.industry[locale] ?? cn.industry.en,
    inLanguage: locale === "zh" ? "zh-CN" : locale,
    image: cn.image || undefined,
    author: { "@type": "Organization", name: "ETIA Technology" },
    publisher: { "@type": "Organization", name: "ETIA Technology" },
    mainEntityOfPage: url,
  };
}

// ---------------------------------------------------------------------------
// Contact (/contact)

const CONTACT_META: Record<SubLocale, { title: string; description: string }> = {
  zh: {
    title: "UV Curing 销售与支持——从选型到服务 | ETIA",
    description: "覆盖中国与东南亚的应用驱动型 UV Curing 紫外线固化支持：系统选型、应用评估、本地供货、安装培训、维护维修与辐照计校准，服务 OmniCure® 与 Phoseon® 系统。",
  },
  th: {
    title: "ฝ่ายขายและการสนับสนุน UV Curing — ตั้งแต่การเลือกจนถึงบริการ | ETIA",
    description: "การสนับสนุน UV curing ที่ขับเคลื่อนด้วยการใช้งานจริงทั่วเอเชียตะวันออกเฉียงใต้: การเลือกระบบ การประเมินการใช้งาน การจัดหาในพื้นที่ การติดตั้ง การฝึกอบรม การบำรุงรักษา การซ่อม และการสอบเทียบเรดิโอมิเตอร์สำหรับระบบ OmniCure® และ Phoseon®",
  },
  vi: {
    title: "Bán hàng & Hỗ trợ UV Curing — Từ lựa chọn đến dịch vụ | ETIA",
    description: "Hỗ trợ UV curing theo ứng dụng tại Đông Nam Á: lựa chọn hệ thống, đánh giá ứng dụng, cung ứng tại chỗ, lắp đặt, đào tạo, bảo trì, sửa chữa và hiệu chuẩn radiometer cho hệ thống OmniCure® và Phoseon®.",
  },
};

export function contactMetadata(locale: SubLocale): Metadata {
  return {
    ...CONTACT_META[locale],
    alternates: { canonical: `${SITE}/${locale}/contact`, languages: languageAlternates("/contact") },
  };
}

// ---------------------------------------------------------------------------
// Brand landing pages (OmniCure / Phoseon) — the dedicated landing components
// carry full zh/th/vi body copy, so all four language routes exist. The Thai
// meta strings come from the client's translation deck; zh keeps the site-wide
// "UV Curing 紫外线固化" keyword convention.

export function brandLanguageAlternates(slug: string): Record<string, string> {
  const en = `${SITE}/product/${slug}`;
  return {
    en,
    "zh-Hans": `${SITE}/zh/product/${slug}`,
    vi: `${SITE}/vi/product/${slug}`,
    th: `${SITE}/th/product/${slug}`,
    "x-default": en,
  };
}

const BRAND_LOCALE_META: Record<string, Record<SubLocale, { title: string; description: string }>> = {
  omnicure: {
    zh: {
      title: "OmniCure UV Curing 紫外线固化系统 — 授权经销商 | ETIA",
      description: "ETIA 提供正品 OmniCure® UV Curing 紫外线固化系统、S2000 Elite 点光源、LX500 UV LED 点光源、替换灯管及配件，并提供本地应用支持、安装、维护与维修服务。",
    },
    th: {
      title: "ระบบ UV Curing OmniCure — ตัวแทนจำหน่ายที่ได้รับอนุญาต | ETIA",
      description: "ETIA จัดจำหน่ายระบบ UV curing OmniCure® ของแท้, OmniCure S2000 Elite, OmniCure LX500, หลอดไฟทดแทน และอุปกรณ์เสริม พร้อมการสนับสนุนด้านการใช้งาน การติดตั้ง การบำรุงรักษา และการซ่อมในพื้นที่",
    },
    vi: {
      // Title/description from the client's official Vietnamese deck.
      title: "Hệ thống UV Curing OmniCure — Nhà phân phối được ủy quyền | ETIA",
      description: "ETIA cung cấp hệ thống UV curing OmniCure® chính hãng, OmniCure S2000 Elite, OmniCure LX500, đèn thay thế và phụ kiện, cùng hỗ trợ kỹ thuật địa phương về lựa chọn, lắp đặt, bảo trì và sửa chữa.",
    },
  },
  phoseon: {
    zh: {
      title: "Phoseon UV LED 固化系统 — 授权经销商 | ETIA",
      description: "正品 Phoseon® UV LED 固化系统：风冷与水冷高功率 UV LED，适用于油墨、涂层与胶粘剂的固化与干燥，覆盖标签、包装、数码印刷、电子、汽车及医疗器械等领域。",
    },
    th: {
      // Title/description from the client's official Thai deck.
      title: "ระบบ UV LED Curing Phoseon — ตัวแทนจำหน่ายที่ได้รับอนุญาต | ETIA",
      description: "ETIA จัดจำหน่ายระบบ UV LED curing Phoseon® รวมถึง Nexus II, VeriCure, FireJet, FireLine และ FireEdge สำหรับงานพิมพ์บรรจุภัณฑ์ coating อิเล็กทรอนิกส์ ไฟเบอร์ สายเคเบิล และการผลิตอุตสาหกรรม พร้อมการสนับสนุนทางเทคนิคในพื้นที่และคำแนะนำการเลือกระบบ",
    },
    vi: {
      // Title/description from the client's official Vietnamese deck.
      title: "Hệ thống UV LED Curing Phoseon — Nhà phân phối được ủy quyền | ETIA",
      description: "ETIA cung cấp hệ thống UV LED curing Phoseon® bao gồm Nexus II, VeriCure, FireJet, FireLine và FireEdge cho in ấn bao bì, coating, điện tử, sợi quang, cáp và sản xuất công nghiệp, cùng hỗ trợ kỹ thuật địa phương và tư vấn lựa chọn hệ thống.",
    },
  },
};

export function brandLocaleMetadata(slug: "omnicure" | "phoseon", locale: SubLocale): Metadata {
  const meta = BRAND_LOCALE_META[slug][locale];
  return {
    ...meta,
    alternates: { canonical: `${SITE}/${locale}/product/${slug}`, languages: brandLanguageAlternates(slug) },
    openGraph: { ...meta, url: `${SITE}/${locale}/product/${slug}`, type: "website", locale: OG_LOCALE[locale] },
  };
}
