import type { Metadata } from "next";
import ThailandLanding from "@/components/omnicure/ThailandLanding";
import { getCopy, CONTACT } from "@/components/omnicure/copy";

const URL = "https://www.etiatech.com/lp/uv-curing-thailand";
const c = getCopy("en");

// Ad landing page — kept OUT of the organic index (noindex) so it never competes
// with the SEO product/application pages. follow:true lets Google crawl through
// to the OmniCure catalogue.
export const metadata: Metadata = {
  title: c.metaTitle,
  description: c.metaDescription,
  alternates: { canonical: URL },
  robots: { index: false, follow: true },
};

function jsonLd() {
  const org = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "ETIA Technology",
    url: URL,
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

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd()) }} />
      <ThailandLanding />
    </>
  );
}
