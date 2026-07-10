import type { Metadata } from "next";
import S2000LandingTh from "@/components/S2000LandingTh";
import { s2000FaqsTh } from "@/components/s2000FaqTh";

const SITE = "https://www.etiatech.com";
const PAGE_PATH = "/th/product/omnicure/s2000";
const OG_IMAGE =
  "https://etiatech-1303055923.cos.ap-singapore.myqcloud.com/IMAGE/PROMOTION/PROMOTION-OMNICURE%20S2000%20ELITE%20-INTRODUCTION.webp";
const PDF = "https://etiatech-1303055923.cos.ap-singapore.myqcloud.com/PDF";

export const metadata: Metadata = {
  title: "OmniCure S2000 Elite | ระบบ UV Spot Curing | ETIA Thailand",
  description:
    "OmniCure S2000 Elite คือระบบ UV spot curing แบบใช้หลอดกำลังสูง รองรับ Closed-Loop Feedback, Web UI, PLC, NFC, StepCure การเปลี่ยนหลอด การ calibration การบำรุงรักษา และการสนับสนุนทางเทคนิคจาก ETIA",
  keywords: [
    "OmniCure S2000 Elite",
    "OmniCure S2000 Elite Thailand",
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
    // hreflang must stay bidirectional — mirror app/sitemap.ts and the
    // en/vi S2000 pages.
    languages: {
      en: `${SITE}/product/omnicure/s2000`,
      th: `${SITE}/th/product/omnicure/s2000`,
      vi: `${SITE}/vi/product/omnicure/s2000`,
      "x-default": `${SITE}/product/omnicure/s2000`,
    },
  },
  openGraph: {
    type: "website",
    url: SITE + PAGE_PATH,
    siteName: "ETIA",
    locale: "th_TH",
    title: "OmniCure S2000 Elite | ระบบ UV Spot Curing | ETIA Thailand",
    description:
      "ระบบ UV spot curing แบบใช้หลอดกำลังสูง พร้อม Closed-Loop Feedback, Web UI, PLC, NFC และ StepCure — พร้อมบริการเปลี่ยนหลอด calibration บำรุงรักษา และการสนับสนุนทางเทคนิคจาก ETIA",
    images: [{ url: OG_IMAGE, alt: "OmniCure S2000 Elite UV Spot Curing System with light guide" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "OmniCure S2000 Elite | ระบบ UV Spot Curing | ETIA Thailand",
    description:
      "ระบบ UV spot curing แบบใช้หลอดกำลังสูง พร้อม Closed-Loop Feedback, Web UI, PLC, NFC และ StepCure",
    images: [OG_IMAGE],
  },
};

const productJsonLd = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: "OmniCure S2000 Elite",
  brand: { "@type": "Brand", name: "OmniCure" },
  category: "UV Spot Curing System",
  description:
    "ระบบ UV spot curing แบบใช้หลอดกำลังสูง พร้อม Closed-Loop Feedback, การควบคุม shutter ที่แม่นยำ, Web UI, PLC, NFC และ StepCure สำหรับการผลิตอุปกรณ์การแพทย์ อิเล็กทรอนิกส์ และยานยนต์",
  image: OG_IMAGE,
  url: SITE + PAGE_PATH,
  subjectOf: [
    { "@type": "DigitalDocument", name: "OmniCure S2000 Elite Brochure", url: `${PDF}/Brochure%20-%20OmniCure%20S2000%20Elite%20UV%20Curing%20System.pdf` },
    { "@type": "DigitalDocument", name: "OmniCure S2000 Elite Quick Start Guide", url: `${PDF}/Quick%20Start%20Guide%20-%20OmniCure%20S2000%20Elite%20UV%20Curing%20System.pdf` },
    { "@type": "DigitalDocument", name: "OmniCure S2000 Elite User Guide", url: `${PDF}/User%20Guide%20-%20OmniCure%20S2000%20Elite%20UV%20Curing%20System.pdf` },
  ],
  offers: {
    "@type": "Offer",
    availability: "https://schema.org/InStock",
    seller: { "@type": "Organization", name: "Etiatec (Thailand) Co., Ltd." },
  },
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "ผลิตภัณฑ์", item: `${SITE}/product/omnicure` },
    { "@type": "ListItem", position: 2, name: "OmniCure", item: `${SITE}/product/omnicure` },
    { "@type": "ListItem", position: 3, name: "S2000 Elite", item: SITE + PAGE_PATH },
  ],
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: s2000FaqsTh.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export default function S2000ThPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <S2000LandingTh />
    </>
  );
}
