import type { Metadata } from "next";
import { buildProductConfig } from "./productConfig";
import type { Lang } from "./copy";

const SITE = "https://www.etiatech.com";

// Canonical URL per product landing, per language.
export const PRODUCT_PATHS: Record<string, { en: string; th: string }> = {
  "s2000-elite": { en: "/omnicure-s2000", th: "/th/omnicure-s2000" },
  lx500: { en: "/omnicure-lx500", th: "/th/omnicure-lx500" },
};

export function productLandingMetadata(slug: string, lang: Lang): Metadata {
  const c = buildProductConfig(slug, lang);
  const paths = PRODUCT_PATHS[slug];
  if (!c || !paths) return {};
  return {
    title: c.metaTitle,
    description: c.metaDescription,
    alternates: {
      canonical: SITE + paths[lang],
      languages: { en: SITE + paths.en, th: SITE + paths.th, "x-default": SITE + paths.en },
    },
  };
}

export function productLandingJsonLd(slug: string, lang: Lang) {
  const c = buildProductConfig(slug, lang);
  if (!c) return [];
  const product = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: c.name,
    brand: { "@type": "Brand", name: "OmniCure" },
    description: c.subhead,
    image: c.image,
    category: "UV Spot Curing",
    offers: {
      "@type": "Offer",
      availability: "https://schema.org/InStock",
      seller: { "@type": "Organization", name: "Etiatec (Thailand) Co., Ltd.", areaServed: "TH" },
    },
  };
  const faq = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: c.faq.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };
  return [product, faq];
}
