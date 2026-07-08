import type { Metadata } from "next";
import S2000View from "@/components/S2000View";
import { S2000_FAQ } from "@/components/s2000Faq";

const SITE = "https://www.etiatech.com";
const PAGE_PATH = "/product/omnicure/s2000";
const OG_IMAGE =
  "https://etiatech-1303055923.cos.ap-singapore.myqcloud.com/IMAGE/PROMOTION/PROMOTION-OMNICURE%20S2000%20ELITE%20-INTRODUCTION.webp";

const PDF = {
  brochure:
    "https://etiatech-1303055923.cos.ap-singapore.myqcloud.com/PDF/Brochure%20-%20OmniCure%20S2000%20Elite%20UV%20Curing%20System.pdf",
  quickStart:
    "https://etiatech-1303055923.cos.ap-singapore.myqcloud.com/PDF/Quick%20Start%20Guide%20-%20OmniCure%20S2000%20Elite%20UV%20Curing%20System.pdf",
  userGuide:
    "https://etiatech-1303055923.cos.ap-singapore.myqcloud.com/PDF/User%20Guide%20-%20OmniCure%20S2000%20Elite%20UV%20Curing%20System.pdf",
};

export const metadata: Metadata = {
  title: "OmniCure S2000 Elite UV Spot Curing System | User Guide & Support | ETIA",
  description:
    "OmniCure S2000 Elite UV Spot Curing System — download the user guide, quick start guide, and brochure. Setup, calibration, lamp replacement, optical filter, light guide, PLC, Web UI, troubleshooting, and ETIA technical support.",
  keywords: [
    "OmniCure S2000 Elite",
    "OmniCure S2000 Elite UV Spot Curing System",
    "OmniCure S2000 Elite user guide",
    "OmniCure S2000 Elite quick start guide",
    "OmniCure S2000 Elite troubleshooting",
    "OmniCure S2000 Elite lamp replacement",
    "OmniCure S2000 Elite light guide",
    "OmniCure S2000 Elite optical filter",
    "OmniCure S2000 Elite calibration",
    "OmniCure S2000 Elite PLC",
    "OmniCure S2000 Elite Web UI",
    "OmniCure S2000 Elite technical support",
  ],
  alternates: {
    canonical: SITE + PAGE_PATH,
  },
  openGraph: {
    type: "website",
    url: SITE + PAGE_PATH,
    siteName: "ETIA",
    title: "OmniCure S2000 Elite UV Spot Curing System",
    description:
      "Lamp-based UV spot curing with Closed-Loop Feedback, 30 ms shutter, PLC, Web UI, and StepCure — with ETIA user guides, lamp replacement, and technical support.",
    images: [
      {
        url: OG_IMAGE,
        alt: "OmniCure S2000 Elite UV Spot Curing System with light guide",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "OmniCure S2000 Elite UV Spot Curing System",
    description:
      "User guide, quick start guide, setup, lamp replacement, calibration, PLC, Web UI, troubleshooting, and ETIA technical support.",
    images: [OG_IMAGE],
  },
};

const productSchema = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: "OmniCure S2000 Elite UV Spot Curing System",
  brand: { "@type": "Brand", name: "OmniCure" },
  category: "UV Spot Curing System",
  description:
    "Lamp-based UV spot curing system with Closed-Loop Feedback intensity control, a 30 ms high-speed shutter, StepCure PLC control, Web UI, NFC access control, and user-changeable lamps and optical filters for validated manufacturing.",
  image: OG_IMAGE,
  url: SITE + PAGE_PATH,
  offers: {
    "@type": "Offer",
    availability: "https://schema.org/InStock",
    seller: { "@type": "Organization", name: "Etiatec (Thailand) Co., Ltd." },
  },
  subjectOf: [
    { "@type": "CreativeWork", name: "OmniCure S2000 Elite Brochure", url: PDF.brochure },
    { "@type": "CreativeWork", name: "OmniCure S2000 Elite Quick Start Guide", url: PDF.quickStart },
    { "@type": "CreativeWork", name: "OmniCure S2000 Elite User Guide", url: PDF.userGuide },
  ],
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Products", item: SITE + "/product" },
    { "@type": "ListItem", position: 2, name: "OmniCure", item: SITE + "/product/omnicure" },
    { "@type": "ListItem", position: 3, name: "OmniCure S2000 Elite", item: SITE + PAGE_PATH },
  ],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: S2000_FAQ.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export default function S2000ElitePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <S2000View />
    </>
  );
}
