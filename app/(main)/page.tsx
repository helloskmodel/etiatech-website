import type { Metadata } from "next";
import HomeView from "@/components/HomeView";

export const metadata: Metadata = {
  title: "ETIA Technology | UV Curing Systems & Solutions Distributor",
  description:
    "Authorized OmniCure distributor in Thailand and Vietnam, also supplying Phoseon, Fusion UV and Noblelight — 20 years of UV curing expertise and local stock.",
  alternates: {
    canonical: "https://www.etiatech.com",
    languages: { en: "https://www.etiatech.com", "zh-Hans": "https://www.etiatech.com/zh", vi: "https://www.etiatech.com/vi", th: "https://www.etiatech.com/th", "x-default": "https://www.etiatech.com" },
  },
};

const orgJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "ETIA Technology",
  url: "https://www.etiatech.com",
  logo: "https://www.etiatech.com/logo/etia-tech.png",
  description:
    "Authorized distributor of UV curing systems with 20 years of application expertise.",
  address: [
    { "@type": "PostalAddress", addressLocality: "Shanghai", addressCountry: "CN" },
    { "@type": "PostalAddress", addressLocality: "Hong Kong", addressCountry: "HK" },
    { "@type": "PostalAddress", addressLocality: "Bangkok", addressCountry: "TH" },
    { "@type": "PostalAddress", addressLocality: "Bac Ninh", addressCountry: "VN" },
  ],
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
      />
      <HomeView />
    </>
  );
}
