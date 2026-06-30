import type { MetadataRoute } from "next";
import { products, productHref } from "@/components/productCatalog";

const SITE = "https://www.etiatech.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const core: MetadataRoute.Sitemap = [
    { url: SITE, lastModified: now, changeFrequency: "weekly", priority: 1.0 },
    { url: `${SITE}/product`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE}/product/systems`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${SITE}/product/omnicure`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE}/application`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE}/contact`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE}/privacy`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${SITE}/cookies`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
  ];

  // One entry per product detail page (deduped by URL).
  const seen = new Set(core.map((e) => e.url));
  const productPages: MetadataRoute.Sitemap = [];
  for (const p of products) {
    const url = `${SITE}${productHref(p)}`;
    if (seen.has(url)) continue;
    seen.add(url);
    productPages.push({ url, lastModified: now, changeFrequency: "monthly", priority: 0.7 });
  }

  return [...core, ...productPages];
}
