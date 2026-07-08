import type { Metadata } from "next";
import S2000View from "@/components/S2000View";

const SITE = "https://www.etiatech.com";
const PAGE_PATH = "/product/omnicure/s2000";
const OG_IMAGE =
  "https://etiatech-1303055923.cos.ap-singapore.myqcloud.com/IMAGE/PROMOTION/PROMOTION-OMNICURE%20S2000%20ELITE%20-INTRODUCTION.webp";

export const metadata: Metadata = {
  title: "OmniCure S2000 Elite — UV Lamp Spot Curing System | ETIA",
  description:
    "OmniCure S2000 Elite lamp-based UV spot curing system — up to 30 W/cm² peak irradiance, Closed-Loop Feedback (±5%), 30 ms precision shutter, and Industry 4.0 connectivity for validated medical, electronics, and EV manufacturing.",
  keywords: [
    "OmniCure S2000 Elite",
    "UV spot curing system",
    "lamp-based UV curing system",
    "UV adhesive curing",
    "OmniCure S2000 lamp",
    "replacement lamp",
    "OmniCure distributor Thailand",
    "UV curing support Southeast Asia",
    "UV curing",
    "UV lamp spot curing",
    "OmniCure",
    "OmniCure 2000 Elite",
    "OmniCure S2000",
    "lamp-based UV curing",
    "closed-loop feedback UV curing",
    "medical device UV curing",
  ],
  alternates: {
    canonical: SITE + PAGE_PATH,
  },
  openGraph: {
    type: "website",
    url: SITE + PAGE_PATH,
    siteName: "ETIA",
    title: "OmniCure S2000 Elite — UV Lamp Spot Curing System",
    description:
      "The industry's most advanced lamp-based UV spot curing system — up to 30 W/cm² with closed-loop precision for medical, electronics, and EV manufacturing.",
    images: [{ url: OG_IMAGE, alt: "OmniCure S2000 Elite UV spot curing system" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "OmniCure S2000 Elite — UV Lamp Spot Curing System",
    description:
      "Up to 30 W/cm², Closed-Loop Feedback (±5%), 30 ms shutter, Industry 4.0 ready.",
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
    "Lamp-based UV spot curing system delivering up to 30 W/cm² peak irradiance with Closed-Loop Feedback (±5% stability), a 30 ms precision electromechanical shutter, and Industry 4.0 connectivity (PLC, Ethernet, NFC, Web UI).",
  image: OG_IMAGE,
  url: SITE + PAGE_PATH,
  offers: {
    "@type": "Offer",
    availability: "https://schema.org/InStock",
    seller: { "@type": "Organization", name: "Etiatec (Thailand) Co., Ltd." },
  },
};

export default function S2000ElitePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <S2000View />
    </>
  );
}
