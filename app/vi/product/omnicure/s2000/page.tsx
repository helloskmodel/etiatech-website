import type { Metadata } from "next";
import S2000LandingVi from "@/components/S2000LandingVi";

const SITE = "https://www.etiatech.com";
const PAGE_PATH = "/vi/product/omnicure/s2000";
const OG_IMAGE =
  "https://etiatech-1303055923.cos.ap-singapore.myqcloud.com/IMAGE/PROMOTION/PROMOTION-OMNICURE%20S2000%20ELITE%20-INTRODUCTION.webp";

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
  offers: {
    "@type": "Offer",
    availability: "https://schema.org/InStock",
    seller: { "@type": "Organization", name: "Etiatec (Thailand) Co., Ltd." },
  },
};

export default function S2000ViPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <S2000LandingVi />
    </>
  );
}
