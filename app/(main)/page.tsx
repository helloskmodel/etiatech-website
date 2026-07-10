import type { Metadata } from "next";
import HomeView from "@/components/HomeView";
import { SALES_EMAIL } from "@/components/contact";

export const metadata: Metadata = {
  title: "ETIA Technology | UV Curing Systems & Solutions Distributor",
  description:
    "Authorized distributor of OmniCure, Phoseon, Fusion & NobleLight UV curing systems. 20 years of application expertise, local stock, in-house repair across 10 industries.",
  alternates: {
    canonical: "https://www.etiatech.com",
    languages: { en: "https://www.etiatech.com", "zh-CN": "https://www.etiatech.com/zh", vi: "https://www.etiatech.com/vi", th: "https://www.etiatech.com/th", "x-default": "https://www.etiatech.com" },
  },
  openGraph: {
    type: "website",
    url: "https://www.etiatech.com",
    siteName: "ETIA Technology",
    locale: "en_US",
    title: "ETIA Technology | UV Curing Systems & Solutions Distributor",
    description:
      "Authorized distributor of OmniCure, Phoseon, Fusion & NobleLight UV curing systems. 20 years of application expertise, local stock, in-house repair across 10 industries.",
    images: [
      {
        url: "https://etiatech-1303055923.cos.ap-singapore.myqcloud.com/IMAGE/logo/ETIALOGO.jpg",
        alt: "ETIA Technology — UV Curing Systems & Solutions Distributor",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ETIA Technology | UV Curing Systems & Solutions Distributor",
    description:
      "Authorized distributor of OmniCure, Phoseon, Fusion & NobleLight UV curing systems. 20 years of application expertise, local stock, in-house repair across 10 industries.",
    images: ["https://etiatech-1303055923.cos.ap-singapore.myqcloud.com/IMAGE/logo/ETIALOGO.jpg"],
  },
};

const orgJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "ETIA Technology",
  url: "https://www.etiatech.com",
  logo: "https://etiatech-1303055923.cos.ap-singapore.myqcloud.com/IMAGE/logo/ETIALOGO.jpg",
  description:
    "Authorized distributor of UV curing systems with 20 years of application expertise.",
  address: [
    { "@type": "PostalAddress", addressLocality: "Shanghai", addressCountry: "CN" },
    { "@type": "PostalAddress", addressLocality: "Hong Kong", addressCountry: "HK" },
    { "@type": "PostalAddress", addressLocality: "Bangkok", addressCountry: "TH" },
    { "@type": "PostalAddress", addressLocality: "Bac Ninh", addressCountry: "VN" },
  ],
  areaServed: ["CN", "HK", "TH", "VN"],
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "sales and technical support",
    email: SALES_EMAIL,
    availableLanguage: ["en", "zh", "th", "vi"],
  },
};

// WebSite schema: helps Google associate the domain with the "ETIA Technology"
// site name in results and link the canonical home URL.
const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "ETIA Technology",
  url: "https://www.etiatech.com",
  inLanguage: ["en", "zh-CN", "vi", "th"],
  publisher: { "@type": "Organization", name: "ETIA Technology" },
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
      />
      <HomeView />
    </>
  );
}
