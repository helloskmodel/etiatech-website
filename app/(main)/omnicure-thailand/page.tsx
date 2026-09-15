import type { Metadata } from "next";
import { SITE_URL, seoDescription, seoTitle } from "@/components/seoText";
import OmniCureThailandView from "@/components/OmniCureThailandView";
import { TH_FAQ } from "@/components/omnicureThailandFaq";

// /omnicure-thailand — the organic page for "OmniCure Thailand" searches.
//
// WHY THIS URL EXISTS AGAIN
// It is an old URL from the previous site that Google still ranks around
// position 7 and that still earns clicks, while this repo only ever carried a
// 308 to /product/omnicure. That works today — the click is captured after the
// redirect — but Google eventually folds a redirecting URL into its target, and
// the target ranks far worse for this query. Holding the URL with a real page
// keeps the position instead of handing it to a page that does not rank for it.
//
// WHY NOT A COPY OF /lp/uv-curing-thailand
// That one is the Google Ads landing page: its own <html>, no navigation, a
// quote form. Deliberately noindex so it never competes organically. An organic
// page needs the site's chrome and, more importantly, needs content the brand
// page does not have — otherwise the two compete and Google picks one. So this
// page is about ETIA *in Thailand*: the Thai company, Bangkok stock, local
// service and the Thai-language channels. The catalogue itself stays on
// /product/omnicure, which this page links into rather than reproduces.

const URL = `${SITE_URL}/omnicure-thailand`;

export const metadata: Metadata = {
  title: seoTitle("OmniCure UV Curing Systems in Thailand"),
  description: seoDescription(
    "Genuine OmniCure UV curing systems in Thailand through authorized channels — S2000 Elite, S1500 Pro, LX500 and AC Series, with Bangkok stock, installation, calibration and service from Etiatec (Thailand)."
  ),
  keywords: [
    "OmniCure Thailand",
    "UV curing Thailand",
    "OmniCure S2000 Thailand",
    "OmniCure LX500 Thailand",
    "UV curing spare parts Bangkok",
  ],
  alternates: { canonical: URL },
  openGraph: {
    title: "OmniCure UV Curing Systems in Thailand | ETIA",
    description:
      "Bangkok stock, installation, calibration and service for OmniCure UV curing systems — supplied through authorized channels.",
    url: URL,
    type: "website",
  },
};

// Breadcrumb + the questions a buyer in Thailand actually opens with. The FAQ
// copy is shared with the view so the page and the structured data can never
// drift apart.
function jsonLd() {
  return [
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
        { "@type": "ListItem", position: 2, name: "OmniCure in Thailand", item: URL },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: TH_FAQ.map((f) => ({
        "@type": "Question",
        name: f.q.en,
        acceptedAnswer: { "@type": "Answer", text: f.a.en },
      })),
    },
  ];
}

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd()) }} />
      <OmniCureThailandView />
    </>
  );
}
