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
    "zh-CN": `${SITE}/zh${path}`,
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
// Brand landing pages — Chinese only for now: brandLanding.ts carries full zh
// copy but no th/vi yet, so only the zh routes exist (a th/vi URL would render
// mostly-English body text, which is worse than no URL). The hreflang group is
// therefore en + zh-CN only.

export function brandLanguageAlternates(slug: string): Record<string, string> {
  const en = `${SITE}/product/${slug}`;
  return { en, "zh-CN": `${SITE}/zh/product/${slug}`, "x-default": en };
}

const BRAND_META_ZH: Record<string, { title: string; description: string }> = {
  omnicure: {
    title: "OmniCure UV Curing 紫外线固化系统 — 授权经销商 | ETIA",
    description: "正品 OmniCure® UV Curing 紫外线固化系统：LED 与灯式点固化、小面积及大面积固化，本地库存、本地服务与区域保修，适用于医疗器械、电子与光电子精密制造。",
  },
  phoseon: {
    title: "Phoseon UV LED 固化系统 — 授权经销商 | ETIA",
    description: "正品 Phoseon® UV LED 固化系统：风冷与水冷高功率 UV LED，适用于油墨、涂层与胶粘剂的固化与干燥，覆盖标签、包装、数码印刷、电子、汽车及医疗器械等领域。",
  },
};

export function brandZhMetadata(slug: "omnicure" | "phoseon"): Metadata {
  return {
    ...BRAND_META_ZH[slug],
    alternates: { canonical: `${SITE}/zh/product/${slug}`, languages: brandLanguageAlternates(slug) },
    openGraph: { ...BRAND_META_ZH[slug], url: `${SITE}/zh/product/${slug}`, type: "website", locale: "zh_CN" },
  };
}
