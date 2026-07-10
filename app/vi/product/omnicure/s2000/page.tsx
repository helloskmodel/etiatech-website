import type { Metadata } from "next";
import S2000LandingVi from "@/components/S2000LandingVi";
import { s2000FaqsVi } from "@/components/s2000FaqVi";

const SITE = "https://www.etiatech.com";
const PAGE_PATH = "/vi/product/omnicure/s2000";
const OG_IMAGE =
  "https://etiatech-1303055923.cos.ap-singapore.myqcloud.com/IMAGE/PROMOTION/PROMOTION-OMNICURE%20S2000%20ELITE%20-INTRODUCTION.webp";
const PDF = "https://etiatech-1303055923.cos.ap-singapore.myqcloud.com/PDF";

export const metadata: Metadata = {
  title: "OmniCure S2000 Elite | Hệ thống UV Spot Curing | ETIA Việt Nam",
  description:
    "OmniCure S2000 Elite là hệ thống UV spot curing dùng đèn cường độ cao, hỗ trợ Closed-Loop Feedback, Web UI, PLC, NFC, StepCure, thay đèn, hiệu chuẩn, bảo trì và hỗ trợ kỹ thuật từ ETIA.",
  keywords: [
    "OmniCure S2000 Elite",
    "UV spot curing",
    "hệ thống UV curing",
    "UV curing",
    "đèn UV",
    "Closed-Loop Feedback",
    "StepCure",
    "Intelli-Lamp",
    "OmniCure Việt Nam",
    "hỗ trợ kỹ thuật UV curing",
    "keo UV",
    "thiết bị y tế UV curing",
  ],
  alternates: {
    canonical: SITE + PAGE_PATH,
    // hreflang group — must be identical on all four language versions.
    languages: {
      en: `${SITE}/product/omnicure/s2000`,
      "zh-CN": `${SITE}/zh/product/omnicure/s2000`,
      vi: `${SITE}/vi/product/omnicure/s2000`,
      th: `${SITE}/th/product/omnicure/s2000`,
      "x-default": `${SITE}/product/omnicure/s2000`,
    },
  },
  openGraph: {
    type: "website",
    url: SITE + PAGE_PATH,
    siteName: "ETIA",
    locale: "vi_VN",
    title: "OmniCure S2000 Elite | Hệ thống UV Spot Curing | ETIA Việt Nam",
    description:
      "Hệ thống UV spot curing dùng đèn cường độ cao với Closed-Loop Feedback, Web UI, PLC, NFC và StepCure — cùng dịch vụ thay đèn, hiệu chuẩn, bảo trì và hỗ trợ kỹ thuật từ ETIA.",
    images: [{ url: OG_IMAGE, alt: "OmniCure S2000 Elite UV spot curing system" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "OmniCure S2000 Elite | Hệ thống UV Spot Curing | ETIA Việt Nam",
    description:
      "Hệ thống UV spot curing dùng đèn cường độ cao với Closed-Loop Feedback, Web UI, PLC, NFC và StepCure.",
    images: [OG_IMAGE],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: "OmniCure S2000 Elite",
  brand: { "@type": "Brand", name: "OmniCure" },
  category: "UV Spot Curing System",
  description:
    "Hệ thống UV spot curing dùng đèn cường độ cao với Closed-Loop Feedback, cửa trập chính xác, Web UI, PLC, NFC và StepCure — dùng cho sản xuất thiết bị y tế, điện tử và xe điện.",
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
    { "@type": "ListItem", position: 1, name: "Sản phẩm", item: `${SITE}/product/omnicure` },
    { "@type": "ListItem", position: 2, name: "OmniCure", item: `${SITE}/product/omnicure` },
    { "@type": "ListItem", position: 3, name: "S2000 Elite", item: SITE + PAGE_PATH },
  ],
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: s2000FaqsVi.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export default function S2000ViPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <S2000LandingVi />
    </>
  );
}
