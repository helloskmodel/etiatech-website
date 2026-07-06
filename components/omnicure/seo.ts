import type { Metadata } from "next";
import { getCopy, CONTACT, type Lang } from "./copy";

const SITE = "https://www.etiatech.com";
const URLS: Record<Lang, string> = {
  en: `${SITE}/omnicure-thailand`,
  th: `${SITE}/th/omnicure`,
};

export function landingMetadata(lang: Lang): Metadata {
  const c = getCopy(lang);
  return {
    title: c.metaTitle,
    description: c.metaDescription,
    alternates: {
      canonical: URLS[lang],
      languages: {
        en: URLS.en,
        th: URLS.th,
        "x-default": URLS.en,
      },
    },
  };
}

export function landingJsonLd(lang: Lang) {
  const c = getCopy(lang);
  const org = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "ETIA Technology",
    url: URLS[lang],
    description:
      "Authorized OmniCure distributor in Thailand, appointed by Excelitas Canada — genuine UV curing systems with local stock, installation and service.",
    address: {
      "@type": "PostalAddress",
      streetAddress: CONTACT.address,
      addressLocality: "Bangkok",
      addressCountry: "TH",
    },
    areaServed: "TH",
    brand: { "@type": "Brand", name: "OmniCure" },
  };
  const faq = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: c.faq.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
  return [org, faq];
}
