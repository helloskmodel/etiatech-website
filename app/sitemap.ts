import type { MetadataRoute } from "next";
import { products, productHref } from "@/components/productCatalog";
import { caseStudiesCn } from "@/data/caseStudiesCn";
import { applicationsData } from "@/data/applicationsData";
import { getAllArticles } from "@/components/insights";

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
    { url: `${SITE}/product/omnicure`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE}/product/phoseon`, changeFrequency: "monthly", priority: 0.85 },
    { url: `${SITE}/product/fusion-uv`, changeFrequency: "monthly", priority: 0.85 },
    { url: `${SITE}/product/noblelight`, changeFrequency: "monthly", priority: 0.85 },
    { url: `${SITE}/applications`, changeFrequency: "weekly", priority: 0.9 },
    // NOTE: /application, /product and /product/systems are intentionally NOT
    // listed — next.config redirects them (308) to /applications and
    // /product/omnicure. Only the canonical 200 destinations belong in the
    // sitemap; listing a redirect makes Google report "Page with redirect".
    { url: `${SITE}/case-studies`, changeFrequency: "weekly", priority: 0.7 },
    { url: `${SITE}/insights`, changeFrequency: "weekly", priority: 0.7 },
    { url: `${SITE}/terms`, changeFrequency: "yearly", priority: 0.3 },
    { url: `${SITE}/contact`, changeFrequency: "monthly", priority: 0.8 },
    // OmniCure S2000 Elite product page (main + Thai + Vietnamese), hreflang-linked.
    ...["/product/omnicure/s2000", "/th/product/omnicure/s2000", "/vi/product/omnicure/s2000"].map((path) => ({
      url: `${SITE}${path}`,
      changeFrequency: "monthly" as const,
      priority: 0.95,
      alternates: {
        languages: {
          en: `${SITE}/product/omnicure/s2000`,
          th: `${SITE}/th/product/omnicure/s2000`,
          vi: `${SITE}/vi/product/omnicure/s2000`,
          "x-default": `${SITE}/product/omnicure/s2000`,
        },
      },
    })),
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
