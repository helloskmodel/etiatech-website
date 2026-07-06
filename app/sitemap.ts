import type { MetadataRoute } from "next";
import { products, productHref } from "@/components/productCatalog";
import { apps, appSlug } from "@/components/applicationNotes";
import { successStories, caseSlug } from "@/components/caseStudies";
import { markets, marketApps, marketCases, marketProducts } from "@/components/markets";

const SITE = "https://www.etiatech.com";

// NOTE: we intentionally omit `lastModified`. We don't track a reliable
// per-page modification date, and stamping every URL with the build time
// (new Date()) is a misleading freshness signal — omitting it is better than
// providing a wrong date. changeFrequency + priority still guide crawlers.
export default function sitemap(): MetadataRoute.Sitemap {
  const core: MetadataRoute.Sitemap = [
    { url: SITE, changeFrequency: "weekly", priority: 1.0 },
    { url: `${SITE}/product`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE}/product/systems`, changeFrequency: "weekly", priority: 0.8 },
    // Brand landing pages
    { url: `${SITE}/product/omnicure`, changeFrequency: "monthly", priority: 0.85 },
    { url: `${SITE}/product/phoseon`, changeFrequency: "monthly", priority: 0.85 },
    { url: `${SITE}/product/fusion-uv`, changeFrequency: "monthly", priority: 0.85 },
    { url: `${SITE}/product/noblelight`, changeFrequency: "monthly", priority: 0.85 },
    { url: `${SITE}/application`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE}/contact`, changeFrequency: "monthly", priority: 0.8 },
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

  // Individual application-note landing pages (one per application point).
  const appPages: MetadataRoute.Sitemap = apps.map((a) => ({
    url: `${SITE}/application/${appSlug(a)}`,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  // Individual case-study landing pages.
  const casePages: MetadataRoute.Sitemap = successStories.map((c) => ({
    url: `${SITE}/case-studies/${caseSlug(c)}`,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  // Thailand market microsite — one URL per language, each declaring its
  // hreflang alternates so Google indexes all three for Thailand.
  const thLangs = markets.th.locales;
  const langAlternates = (path: string) =>
    Object.fromEntries(thLangs.map((l) => [l, `${SITE}/th/${l}${path}`]));

  // SEM landing pages (skeletons; content filled later).
  const landingSlugs = ["omnicure-thailand", "omnicure-s2000", "omnicure-lx500", "omnicure-s1500-pro", "uv-curing-system-thailand", "contact"];

  const thPages: MetadataRoute.Sitemap = [
    // Home + applications index, per language.
    ...thLangs.map((l) => ({
      url: `${SITE}/th/${l}`,
      changeFrequency: "weekly" as const,
      priority: 0.9,
      alternates: { languages: langAlternates("") },
    })),
    // SEM landing pages, per language.
    ...landingSlugs.flatMap((slug) =>
      thLangs.map((l) => ({
        url: `${SITE}/th/${l}/${slug}`,
        changeFrequency: "monthly" as const,
        priority: 0.8,
        alternates: { languages: langAlternates(`/${slug}`) },
      }))
    ),
    // Thailand products index, per language.
    ...thLangs.map((l) => ({
      url: `${SITE}/th/${l}/product`,
      changeFrequency: "weekly" as const,
      priority: 0.85,
      alternates: { languages: langAlternates("/product") },
    })),
    ...thLangs.map((l) => ({
      url: `${SITE}/th/${l}/application`,
      changeFrequency: "monthly" as const,
      priority: 0.7,
      alternates: { languages: langAlternates("/application") },
    })),
    // One entry per scoped application note, per language.
    ...marketApps("th").flatMap((app) =>
      thLangs.map((l) => ({
        url: `${SITE}/th/${l}/application/${appSlug(app)}`,
        changeFrequency: "monthly" as const,
        priority: 0.6,
        alternates: { languages: langAlternates(`/application/${appSlug(app)}`) },
      }))
    ),
    // One entry per scoped product, per language.
    ...marketProducts("th").flatMap((p) =>
      thLangs.map((l) => ({
        url: `${SITE}/th/${l}/product/${p.slug}`,
        changeFrequency: "monthly" as const,
        priority: 0.7,
        alternates: { languages: langAlternates(`/product/${p.slug}`) },
      }))
    ),
    // One entry per scoped case study, per language.
    ...marketCases("th").flatMap((c) => {
      const slug = c.id.toLowerCase();
      return thLangs.map((l) => ({
        url: `${SITE}/th/${l}/case-studies/${slug}`,
        changeFrequency: "monthly" as const,
        priority: 0.6,
        alternates: { languages: langAlternates(`/case-studies/${slug}`) },
      }));
    }),
  ];

  return [...core, ...thPages, ...productPages, ...appPages, ...casePages];
}
