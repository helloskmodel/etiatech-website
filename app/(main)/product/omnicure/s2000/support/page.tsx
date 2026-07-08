import type { Metadata } from "next";
import S2000SupportView from "@/components/S2000SupportView";
import {
  SITE,
  SUPPORT_PATH,
  PRODUCT_PATH,
  startUp,
  lampModule,
  filterChange,
  faq,
  type Procedure,
} from "@/components/s2000Support";

const PAGE_URL = SITE + SUPPORT_PATH;
const OG_IMAGE =
  "https://etiatech-1303055923.cos.ap-singapore.myqcloud.com/IMAGE/PROMOTION/PROMOTION-OMNICURE%20S2000%20ELITE%20-INTRODUCTION.webp";

export const metadata: Metadata = {
  title: "OmniCure S2000 Elite Installation & Support Guide | ETIA",
  description:
    "OmniCure S2000 Elite support: quick start & startup steps, light guide and lamp module installation, optical filter change, status light-ring colour meanings, troubleshooting (lamp not striking, error codes), safety precautions and CE/RoHS/FCC regulatory info.",
  keywords: [
    "OmniCure S2000 support",
    "OmniCure S2000 Elite installation guide",
    "OmniCure S2000 Elite lamp module installation guide",
    "how to troubleshoot OmniCure S2000 lamp not striking",
    "OmniCure S2000 error codes",
    "OmniCure S2000 light ring colors",
    "how to change the optical filter on OmniCure S2000 Elite",
    "OmniCure S2000 quick start guide",
    "OmniCure S2000 safety precautions",
    "OmniCure S2000 startup",
    "OmniCure S2000 light guide installation",
    "OmniCure S2000 CE RoHS FCC",
    "UV curing support Southeast Asia",
  ],
  alternates: {
    canonical: PAGE_URL,
  },
  openGraph: {
    type: "article",
    url: PAGE_URL,
    siteName: "ETIA",
    title: "OmniCure S2000 Elite — Installation, Setup & Support Guide",
    description:
      "Step-by-step startup, light guide and lamp module installation, optical filter change, status light-ring colours, troubleshooting, safety and regulatory information for the OmniCure S2000 Elite.",
    images: [{ url: OG_IMAGE, alt: "OmniCure S2000 Elite installation and support guide" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "OmniCure S2000 Elite — Installation & Support Guide",
    description:
      "Startup, light guide & lamp module install, filter change, light-ring colours, troubleshooting, safety and regulatory info.",
    images: [OG_IMAGE],
  },
};

// Build a schema.org HowTo from a shared procedure (English canonical text).
function howTo(p: Procedure, name: string) {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name,
    description: p.intro?.en,
    step: p.steps.map((s, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      text: s.en,
    })),
  };
}

const breadcrumb = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Products", item: `${SITE}/product` },
    { "@type": "ListItem", position: 2, name: "OmniCure", item: `${SITE}/product/omnicure` },
    { "@type": "ListItem", position: 3, name: "S2000 Elite", item: SITE + PRODUCT_PATH },
    { "@type": "ListItem", position: 4, name: "Support", item: PAGE_URL },
  ],
};

const techArticle = {
  "@context": "https://schema.org",
  "@type": "TechArticle",
  headline: "OmniCure S2000 Elite — Installation, Setup & Support Guide",
  description:
    "Startup, light guide and lamp module installation, optical filter change, status light-ring colour meanings, troubleshooting, safety precautions and regulatory information for the OmniCure S2000 Elite UV spot curing system.",
  image: OG_IMAGE,
  url: PAGE_URL,
  about: { "@type": "Product", name: "OmniCure S2000 Elite", brand: { "@type": "Brand", name: "OmniCure" } },
  author: { "@type": "Organization", name: "ETIA" },
  publisher: { "@type": "Organization", name: "ETIA" },
  inLanguage: ["en", "zh"],
};

const faqPage = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faq.map((f) => ({
    "@type": "Question",
    name: f.q.en,
    acceptedAnswer: { "@type": "Answer", text: f.a.en },
  })),
};

const jsonLd = [
  techArticle,
  breadcrumb,
  howTo(startUp, "How to start up the OmniCure S2000 Elite"),
  howTo(lampModule, "How to install the OmniCure S2000 Elite lamp module"),
  howTo(filterChange, "How to change the optical filter on the OmniCure S2000 Elite"),
  faqPage,
];

export default function S2000SupportPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <S2000SupportView />
    </>
  );
}
