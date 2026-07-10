import type { Metadata } from "next";
import S2000View from "@/components/S2000View";
import LocalizedChrome from "@/components/LocalizedChrome";
import { s2000Faqs } from "@/components/s2000Faq";

const SITE = "https://www.etiatech.com";
const PAGE_PATH = "/zh/product/omnicure/s2000";
const OG_IMAGE =
  "https://etiatech-1303055923.cos.ap-singapore.myqcloud.com/IMAGE/PROMOTION/PROMOTION-OMNICURE%20S2000%20ELITE%20-INTRODUCTION.webp";

// Shared hreflang group — must be identical on all four language versions.
const S2000_LANGUAGES = {
  en: `${SITE}/product/omnicure/s2000`,
  "zh-CN": `${SITE}/zh/product/omnicure/s2000`,
  vi: `${SITE}/vi/product/omnicure/s2000`,
  th: `${SITE}/th/product/omnicure/s2000`,
  "x-default": `${SITE}/product/omnicure/s2000`,
};

const PDF = "https://etiatech-1303055923.cos.ap-singapore.myqcloud.com/PDF";

export const metadata: Metadata = {
  title: "OmniCure S2000 Elite UV 点固化系统 | 用户指南与技术支持 | ETIA",
  description:
    "OmniCure S2000 Elite UV 点固化系统——下载用户指南、快速入门指南与产品手册。涵盖设置、校准、灯管更换、光学滤镜、导光管、PLC、Web UI、故障排除与 ETIA 技术支持。",
  keywords: [
    "OmniCure S2000 Elite",
    "OmniCure S2000 Elite UV 点固化系统",
    "UV 点固化",
    "紫外线点固化系统",
    "OmniCure S2000 Elite 用户指南",
    "OmniCure S2000 Elite 灯管更换",
    "OmniCure S2000 Elite 校准",
    "OmniCure S2000 Elite 导光管",
    "OmniCure S2000 Elite 故障排除",
    "OmniCure 中国",
    "UV 固化技术支持",
  ],
  alternates: {
    canonical: SITE + PAGE_PATH,
    languages: S2000_LANGUAGES,
  },
  openGraph: {
    type: "website",
    url: SITE + PAGE_PATH,
    siteName: "ETIA",
    locale: "zh_CN",
    title: "OmniCure S2000 Elite UV 点固化系统 | ETIA",
    description:
      "灯式高强度 UV 点固化系统，配备闭环反馈、30 ms 高速快门、PLC、Web UI、NFC 与 StepCure——并提供用户指南、灯管更换、校准与 ETIA 技术支持。",
    images: [{ url: OG_IMAGE, alt: "OmniCure S2000 Elite UV 点固化系统与导光管" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "OmniCure S2000 Elite UV 点固化系统 | ETIA",
    description: "用户指南、快速入门、灯管更换、校准、PLC、Web UI、故障排除与 ETIA 技术支持。",
    images: [OG_IMAGE],
  },
};

const productJsonLd = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: "OmniCure S2000 Elite UV 点固化系统",
  brand: { "@type": "Brand", name: "OmniCure" },
  category: "UV Spot Curing System",
  description:
    "灯式高强度 UV 点固化系统，具备闭环反馈强度控制、30 ms 高速快门、StepCure PLC 控制、Web UI、NFC 访问控制，以及用户可自行更换的灯管与光学滤镜，适用于经过验证的生产制造。",
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
    seller: { "@type": "Organization", name: "ETIA Technology" },
  },
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "产品", item: `${SITE}/product/omnicure` },
    { "@type": "ListItem", position: 2, name: "OmniCure", item: `${SITE}/product/omnicure` },
    { "@type": "ListItem", position: 3, name: "S2000 Elite", item: SITE + PAGE_PATH },
  ],
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: s2000Faqs.map((f) => ({
    "@type": "Question",
    name: f.q.zh ?? f.q.en,
    acceptedAnswer: { "@type": "Answer", text: f.a.zh ?? f.a.en },
  })),
};

export default function S2000EliteZhPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <LocalizedChrome locale="zh">
        <S2000View />
      </LocalizedChrome>
    </>
  );
}
