import type { MetadataRoute } from "next";
import { products, productHref } from "@/components/productCatalog";
import { caseStudiesCn } from "@/data/caseStudiesCn";
import { applicationsData } from "@/data/applicationsData";

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
    // Brand landing pages
    { url: `${SITE}/product/omnicure`, changeFrequency: "monthly", priority: 0.85 },
    { url: `${SITE}/product/phoseon`, changeFrequency: "monthly", priority: 0.85 },
    { url: `${SITE}/product/fusion-uv`, changeFrequency: "monthly", priority: 0.85 },
    { url: `${SITE}/product/noblelight`, changeFrequency: "monthly", priority: 0.85 },
    { url: `${SITE}/applications`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE}/contact`, changeFrequency: "monthly", priority: 0.8 },
    // OmniCure S2000 Elite product page (main + Thai), hreflang-linked.
    {
      url: `${SITE}/product/omnicure/s2000`,
      changeFrequency: "monthly",
      priority: 0.9,
      alternates: { languages: { en: `${SITE}/product/omnicure/s2000`, th: `${SITE}/th/product/omnicure/s2000`, "x-default": `${SITE}/product/omnicure/s2000` } },
    },
    {
      url: `${SITE}/th/product/omnicure/s2000`,
      changeFrequency: "monthly",
      priority: 0.85,
      alternates: { languages: { en: `${SITE}/product/omnicure/s2000`, th: `${SITE}/th/product/omnicure/s2000`, "x-default": `${SITE}/product/omnicure/s2000` } },
    },
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
    // Standalone product SEM landing pages (S2000, LX500), en + th.
    ...[
      { en: "/omnicure-s2000", th: "/th/omnicure-s2000" },
      { en: "/omnicure-lx500", th: "/th/omnicure-lx500" },
      { en: "/product/omnicure/s2000-lamp", th: "/th/omnicure-s2000-lamp" },
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

  // One entry per product detail page (deduped by URL).
  const seen = new Set(core.map((e) => e.url));
  const productPages: MetadataRoute.Sitemap = [];
  for (const p of products) {
    const url = `${SITE}${productHref(p)}`;
    if (seen.has(url)) continue;
    seen.add(url);
    productPages.push({ url, changeFrequency: "monthly", priority: 0.7 });
  }

  // Individual case-study landing pages.
  const casePages: MetadataRoute.Sitemap = caseStudiesCn.map((c) => ({
    url: `${SITE}/case-studies/${c.slug}`,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  const applicationCasePages: MetadataRoute.Sitemap = applicationsData.map((application) => ({
    url: `${SITE}/applications/${application.slug}`,
    changeFrequency: "monthly",
    priority: 0.75,
  }));

  return [...core, ...productPages, ...applicationCasePages, ...casePages];
}
