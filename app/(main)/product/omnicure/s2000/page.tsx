import type { Metadata } from "next";
import S2000View from "@/components/S2000View";

const SITE = "https://www.etiatech.com";
const PAGE_PATH = "/product/omnicure/s2000";
const OG_IMAGE =
  "https://etiatech-1303055923.cos.ap-singapore.myqcloud.com/IMAGE/PROMOTION/PROMOTION-OMNICURE%20S2000%20ELITE%20-INTRODUCTION.webp";

export const metadata: Metadata = {
  title: "OmniCure S2000 Elite UV Spot Curing System | User Guide, Setup & Support | ETIA",
  description:
    "OmniCure S2000 Elite UV Spot Curing System — features, user guide, quick start guide, setup, troubleshooting, lamp replacement, optical filter, calibration and technical support from ETIA. Download the OmniCure S2000 Elite brochure and user guide.",
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
    title: "OmniCure S2000 Elite UV Spot Curing System | User Guide, Setup & Support",
    description:
      "Features, user guide, setup, troubleshooting, lamp replacement, calibration and technical support for the OmniCure S2000 Elite UV Spot Curing System.",
    images: [{ url: OG_IMAGE, alt: "OmniCure S2000 Elite UV Spot Curing System with light guide" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "OmniCure S2000 Elite UV Spot Curing System | ETIA",
    description:
      "User guide, setup, troubleshooting, lamp replacement and technical support for the OmniCure S2000 Elite.",
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
    "Lamp-based UV spot curing system with Closed-Loop Feedback intensity control, a 30 ms high-speed shutter, StepCure PLC control, Web UI remote monitoring and Intelli-Tap NFC access control for validated manufacturing.",
  image: OG_IMAGE,
  url: SITE + PAGE_PATH,
  offers: {
    "@type": "Offer",
    availability: "https://schema.org/InStock",
    seller: { "@type": "Organization", name: "Etiatec (Thailand) Co., Ltd." },
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    ["Where can I download the OmniCure S2000 Elite user guide?", "You can download the OmniCure S2000 Elite User Guide, Quick Start Guide and Brochure directly from the User Guides & Technical Resources section on this page, or request them from ETIA technical support."],
    ["How do I install the OmniCure S2000 Elite light guide?", "Insert the light guide into the front light guide port until it clicks into place. The light ring and system status confirm when the light guide is detected."],
    ["What do the OmniCure S2000 Elite light ring colors mean?", "The light ring color indicates system status such as light guide detection, warm-up, Closed-Loop Feedback status, and calibration condition. Full color definitions are in the OmniCure S2000 Elite User Guide."],
    ["Why does the OmniCure S2000 Elite lamp not strike?", "Check lamp installation, filter installation, the lamp housing panel, the power connection, and system status. If the optical filter is not properly installed the lamp may not strike. If the issue continues, contact ETIA technical support."],
    ["How do I replace the OmniCure S2000 Elite lamp?", "The S2000 Elite uses a user-changeable lamp module. ETIA can support standard and surface-cure lamp selection, installation guidance and genuine replacement lamps."],
    ["How do I install an OmniCure S2000 Elite optical filter?", "Install the optical filter cartridge into the filter slot and fasten it securely. If the filter is not properly installed, the system may not recognize it and the lamp may not strike."],
    ["Does the OmniCure S2000 Elite support PLC automation?", "Yes. StepCure provides programmable curing sequences with PLC control, and the system integrates into automated production lines via PLC I/O, Web UI and NFC access control."],
    ["Can ETIA provide OmniCure S2000 Elite troubleshooting support?", "Yes. ETIA provides OmniCure S2000 Elite troubleshooting, calibration guidance, maintenance and repair support across China, Thailand, Vietnam and Southeast Asia."],
  ].map(([q, a]) => ({
    "@type": "Question",
    name: q,
    acceptedAnswer: { "@type": "Answer", text: a },
  })),
};

export default function S2000ElitePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <S2000View />
    </>
  );
}
