import type { Metadata } from "next";
import type { Locale } from "@/components/LocaleContext";
import { getProduct, localizeProduct, productTagline } from "@/components/productCatalog";

const SITE = "https://www.etiatech.com";

// System detail pages that also exist as locale-locked routes
// (/zh|/vi|/th/product/systems/<slug>). When a new product gets its locale
// pages, add its slug here — the EN page metadata and the sitemap both read
// this list to emit the matching hreflang group.
export const LOCALIZED_SYSTEM_SLUGS: string[] = ["lx500"];

// hreflang alternates for one system detail page, shared by all 4 language
// versions so the group is identical from every member (a Google requirement).
export function systemLanguages(slug: string): Record<string, string> {
  const en = `${SITE}/product/systems/${slug}`;
  return {
    en,
    "zh-CN": `${SITE}/zh/product/systems/${slug}`,
    vi: `${SITE}/vi/product/systems/${slug}`,
    th: `${SITE}/th/product/systems/${slug}`,
    "x-default": en,
  };
}

export function localizedSystemMetadata(slug: string, locale: Exclude<Locale, "en">): Metadata {
  const base = getProduct(slug);
  if (!base) return { title: "Product — ETIA Technology" };
  const p = localizeProduct(base, locale);
  const tagline = productTagline[slug]?.[locale] ?? productTagline[slug]?.en;
  return {
    title: tagline ? `${p.name} — ${tagline} | ETIA` : `${p.name} — ETIA Technology`,
    description: p.intro.slice(0, 160),
    alternates: {
      canonical: `${SITE}/${locale}/product/systems/${slug}`,
      languages: systemLanguages(slug),
    },
    openGraph: {
      type: "website",
      url: `${SITE}/${locale}/product/systems/${slug}`,
      siteName: "ETIA Technology",
      locale: locale === "zh" ? "zh_CN" : locale === "vi" ? "vi_VN" : "th_TH",
      title: tagline ? `${p.name} — ${tagline}` : p.name,
      description: p.intro.slice(0, 160),
    },
  };
}
