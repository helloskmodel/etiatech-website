import type { Metadata } from "next";
import type { Locale } from "@/components/LocaleContext";

const SITE = "https://www.etiatech.com";

const seo: Record<Exclude<Locale, "en">, { title: string; description: string; keywords: string[] }> = {
  zh: {
    title: "UV 固化系统与解决方案 | ETIA Technology",
    description: "ETIA 提供 OmniCure、Phoseon、Fusion UV 与 Noblelight UV 固化系统，拥有 20 年设备选型、工艺验证、维修与本地技术支持经验。",
    keywords: ["UV固化系统", "UV LED固化", "紫外线固化设备", "OmniCure", "Phoseon", "UV固化解决方案"],
  },
  vi: {
    title: "Hệ thống & giải pháp đóng rắn UV tại Việt Nam | ETIA",
    description: "ETIA cung cấp hệ thống đóng rắn UV OmniCure, Phoseon, Fusion UV và Noblelight tại Việt Nam, cùng dịch vụ lựa chọn, xác nhận quy trình, bảo trì và sửa chữa.",
    keywords: ["hệ thống đóng rắn UV", "đèn UV LED", "máy sấy UV", "OmniCure Việt Nam", "Phoseon Việt Nam", "giải pháp UV"],
  },
  th: {
    title: "ระบบบ่มยูวีและโซลูชัน UV LED ในประเทศไทย | ETIA",
    description: "ETIA จำหน่ายระบบบ่มยูวี OmniCure, Phoseon, Fusion UV และ Noblelight ในประเทศไทย พร้อมบริการเลือกอุปกรณ์ ทดสอบกระบวนการ บำรุงรักษา และซ่อม",
    keywords: ["ระบบบ่มยูวี", "เครื่องฉายแสง UV", "UV LED ประเทศไทย", "OmniCure Thailand", "Phoseon Thailand", "โซลูชันยูวี"],
  },
};

export function localizedHomeMetadata(locale: Exclude<Locale, "en">): Metadata {
  const path = `/${locale}`;
  return {
    ...seo[locale],
    metadataBase: new URL(SITE),
    alternates: {
      canonical: path,
      languages: { en: "/", "zh-CN": "/zh", vi: "/vi", th: "/th", "x-default": "/" },
    },
    openGraph: {
      type: "website",
      url: path,
      siteName: "ETIA Technology",
      locale: locale === "zh" ? "zh_CN" : locale === "vi" ? "vi_VN" : "th_TH",
      title: seo[locale].title,
      description: seo[locale].description,
    },
  };
}

export function localizedOrganizationJsonLd(locale: Exclude<Locale, "en">) {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "ETIA Technology",
    url: `${SITE}/${locale}`,
    description: seo[locale].description,
    areaServed: locale === "zh" ? ["CN", "HK"] : locale === "vi" ? "VN" : "TH",
    contactPoint: { "@type": "ContactPoint", contactType: "sales and technical support", email: "mark_tang@etia-tech.com", availableLanguage: locale },
  };
}
