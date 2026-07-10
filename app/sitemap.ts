import type { MetadataRoute } from "next";
import { products, productHref } from "@/components/productCatalog";
import { caseStudiesCn } from "@/data/caseStudiesCn";
import { applicationsData } from "@/data/applicationsData";
import { getAllArticles } from "@/components/insights";
import { LOCALIZED_SYSTEM_SLUGS, systemLanguages } from "@/components/localizedSystemsSeo";
import { LAMP_PATHS, LAMP_LANGUAGES } from "@/components/omnicure/s2000Lamp";
import { languageAlternates, brandLanguageAlternates } from "@/components/localePageSeo";

// URL prefixes of the four language versions of a mirrored main-site path.
const LOCALE_PREFIXES = ["", "/zh", "/vi", "/th"] as const;

const SITE = "https://www.etiatech.com";

// NOTE: we intentionally omit `lastModified`. We don't track a reliable
// per-page modification date, and stamping every URL with the build time
// (new Date()) is a misleading freshness signal — omitting it is better than
// providing a wrong date. changeFrequency + priority still guide crawlers.
export default function sitemap(): MetadataRoute.Sitemap {
  const core: MetadataRoute.Sitemap = [
    {
      url: SITE,
      changeFrequency: "weekly",
      priority: 1.0,
      alternates: { languages: { en: SITE, "zh-CN": `${SITE}/zh`, vi: `${SITE}/vi`, th: `${SITE}/th`, "x-default": SITE } },
    },
    ...["zh", "vi", "th"].map((locale) => ({
      url: `${SITE}/${locale}`,
      changeFrequency: "weekly" as const,
      priority: 0.9,
      alternates: { languages: { en: SITE, "zh-CN": `${SITE}/zh`, vi: `${SITE}/vi`, th: `${SITE}/th`, "x-default": SITE } },
    })),
    // Brand landing pages. OmniCure and Phoseon exist in all four languages
    // (hreflang-linked); Fusion UV / Noblelight are EN-only for now.
    ...(["omnicure", "phoseon"] as const).flatMap((slug) => {
      const langs = brandLanguageAlternates(slug);
      const priority = slug === "omnicure" ? 0.9 : 0.85;
      return LOCALE_PREFIXES.map((prefix) => ({
        url: `${SITE}${prefix}/product/${slug}`,
        changeFrequency: "monthly" as const,
        priority,
        alternates: { languages: langs },
      }));
    }),
    { url: `${SITE}/product/fusion-uv`, changeFrequency: "monthly", priority: 0.85 },
    { url: `${SITE}/product/noblelight`, changeFrequency: "monthly", priority: 0.85 },
    // Applications index (EN + ZH + VI + TH), hreflang-linked.
    ...LOCALE_PREFIXES.map((prefix) => ({
      url: `${SITE}${prefix}/applications`,
      changeFrequency: "weekly" as const,
      priority: 0.9,
      alternates: { languages: languageAlternates("/applications") },
    })),
    // NOTE: /application, /product and /product/systems are intentionally NOT
    // listed — next.config redirects them (308) to /applications and
    // /product/omnicure. Only the canonical 200 destinations belong in the
    // sitemap; listing a redirect makes Google report "Page with redirect".
    ...LOCALE_PREFIXES.map((prefix) => ({
      url: `${SITE}${prefix}/case-studies`,
      changeFrequency: "weekly" as const,
      priority: 0.7,
      alternates: { languages: languageAlternates("/case-studies") },
    })),
    { url: `${SITE}/insights`, changeFrequency: "weekly", priority: 0.7 },
    { url: `${SITE}/terms`, changeFrequency: "yearly", priority: 0.3 },
    ...LOCALE_PREFIXES.map((prefix) => ({
      url: `${SITE}${prefix}/contact`,
      changeFrequency: "monthly" as const,
      priority: 0.8,
      alternates: { languages: languageAlternates("/contact") },
    })),
    // OmniCure S2000 Elite product page (EN + ZH + TH + VI), hreflang-linked.
    ...["/product/omnicure/s2000", "/zh/product/omnicure/s2000", "/th/product/omnicure/s2000", "/vi/product/omnicure/s2000"].map((path) => ({
      url: `${SITE}${path}`,
      changeFrequency: "monthly" as const,
      priority: 0.95,
      alternates: {
        languages: {
          en: `${SITE}/product/omnicure/s2000`,
          "zh-CN": `${SITE}/zh/product/omnicure/s2000`,
          th: `${SITE}/th/product/omnicure/s2000`,
          vi: `${SITE}/vi/product/omnicure/s2000`,
          "x-default": `${SITE}/product/omnicure/s2000`,
        },
      },
    })),
    // System detail pages with locale-locked versions (currently LX500),
    // one hreflang-linked entry per language. The generic product loop below
    // skips these because their EN URL is already in `seen`.
    ...LOCALIZED_SYSTEM_SLUGS.flatMap((slug) =>
      ["", "/zh", "/vi", "/th"].map((prefix) => ({
        url: `${SITE}${prefix}/product/systems/${slug}`,
        changeFrequency: "monthly" as const,
        priority: 0.85,
        alternates: { languages: systemLanguages(slug) },
      }))
    ),
    // Standalone OmniCure Thailand SEM landing pages (en + th, hreflang-linked).
    {
      url: `${SITE}/omnicure-thailand`,
      changeFrequency: "weekly",
      priority: 0.9,
      alternates: { languages: { en: `${SITE}/omnicure-thailand`, th: `${SITE}/th/omnicure`, "x-default": `${SITE}/omnicure-thailand` } },
    },
    {
      url: `${SITE}/th/omnicure`,
      changeFrequency: "weekly",
      priority: 0.9,
      alternates: { languages: { en: `${SITE}/omnicure-thailand`, th: `${SITE}/th/omnicure`, "x-default": `${SITE}/omnicure-thailand` } },
    },
    // S2000 Elite replacement lamp (EN + ZH + TH + VI), hreflang-linked.
    ...(Object.values(LAMP_PATHS) as string[]).map((path) => ({
      url: `${SITE}${path}`,
      changeFrequency: "weekly" as const,
      priority: 0.9,
      alternates: { languages: LAMP_LANGUAGES },
    })),
    // Standalone product SEM landing pages (S2000, LX500), en + th.
    ...[
      { en: "/omnicure-s2000", th: "/th/omnicure-s2000" },
      { en: "/omnicure-lx500", th: "/th/omnicure-lx500" },
    ].flatMap((pair) => {
      const langs = { en: `${SITE}${pair.en}`, th: `${SITE}${pair.th}`, "x-default": `${SITE}${pair.en}` };
      return [
        { url: `${SITE}${pair.en}`, changeFrequency: "weekly" as const, priority: 0.9, alternates: { languages: langs } },
        { url: `${SITE}${pair.th}`, changeFrequency: "weekly" as const, priority: 0.9, alternates: { languages: langs } },
      ];
    }),
    { url: `${SITE}/privacy`, changeFrequency: "yearly", priority: 0.3 },
    { url: `${SITE}/cookies`, changeFrequency: "yearly", priority: 0.3 },
  ];

  // One entry per product detail page (deduped by URL). Featured/flagship
  // systems get a higher priority than the rest of the catalog.
  const FEATURED_PRIORITY: Record<string, number> = { lx500: 0.85, "s1500-pro": 0.8, "firejet-one": 0.8 };
  const seen = new Set(core.map((e) => e.url));
  const productPages: MetadataRoute.Sitemap = [];
  for (const p of products) {
    const url = `${SITE}${productHref(p)}`;
    if (seen.has(url)) continue;
    seen.add(url);
    productPages.push({ url, changeFrequency: "monthly", priority: FEATURED_PRIORITY[p.slug] ?? 0.7 });
  }

  // Individual case-study landing pages (EN + ZH + VI + TH each).
  const casePages: MetadataRoute.Sitemap = caseStudiesCn.flatMap((c) =>
    LOCALE_PREFIXES.map((prefix) => ({
      url: `${SITE}${prefix}/case-studies/${c.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.6,
      alternates: { languages: languageAlternates(`/case-studies/${c.slug}`) },
    }))
  );

  // Application case-study pages (EN + ZH + VI + TH each).
  const applicationCasePages: MetadataRoute.Sitemap = applicationsData.flatMap((application) =>
    LOCALE_PREFIXES.map((prefix) => ({
      url: `${SITE}${prefix}/applications/${application.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.75,
      alternates: { languages: languageAlternates(`/applications/${application.slug}`) },
    }))
  );

  // NOTE: the 62 application-note detail pages (/application/[slug]) are
  // intentionally NOT listed yet — their content is still being reviewed and
  // will be added to the sitemap gradually as each note is verified.

  // Published insights articles (English required per slug).
  const insightPages: MetadataRoute.Sitemap = getAllArticles().map((a) => ({
    url: `${SITE}/insights/${a.slug}`,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...core, ...productPages, ...applicationCasePages, ...insightPages, ...casePages];
}
