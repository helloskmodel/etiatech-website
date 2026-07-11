import type { Metadata } from "next";
import type { LandingCopy } from "./copy";
import type { LandingContact } from "./OmniCureLanding";

// Copy + SEO for the standalone OmniCure Vietnam SEM landing pages
// (/omnicure-vietnam + /vi/omnicure), mirroring the Thailand pair.
// EN adapts the reviewed Thailand copy with Vietnam facts; VI is a working
// translation PENDING REVIEW by the Vietnam team (Tien) before ads run.

export type VnLang = "en" | "vi";

// ETIA Vietnam contact (same source as the Contact page office card).
// No LINE in Vietnam — LINE CTAs are hidden on these pages.
export const VN_CONTACT: LandingContact = {
  phone: "+84 344 590 091",
  phoneHref: "+84344590091",
  email: "omnicure.vn@gmail.com",
  address: "No. 10 Thanh Nien Street, Area 5, Vo Cuong Ward, Bac Ninh Province, Viet Nam",
};

const en: LandingCopy = {
  metaTitle: "Authorized OmniCure Distributor in Vietnam | S2000, LX500 | ETIA",
  metaDescription:
    "ETIA is an authorized OmniCure distributor in Vietnam — S2000, LX500 UV curing systems with local stock, installation, service and manufacturer warranty.",
  hero: {
    h1: "Authorized OmniCure Distributor in Vietnam",
    subhead: "S2000 · LX500 · Spot & Flood UV Curing — local sales, installation, and service from Bac Ninh.",
    badges: ["Authorized by Excelitas Canada", "Full manufacturer guarantee", "On-site service in Vietnam"],
    ctaPrimary: "Request a Quote",
    ctaSecondary: "",
  },
  trustBar:
    "As an authorized distributor appointed by Excelitas Canada, ETIA supplies genuine OmniCure UV curing systems in Vietnam — backed by the manufacturer's full guarantee and local installation support. Authentic products, local stock, Vietnamese-language support, and after-sales service you can actually reach.",
  productsHeading: "OmniCure Systems",
  products: [
    { id: "s2000", name: "OmniCure S2000 / S2000 Elite", desc: "High-intensity spot UV curing for precise, repeatable bonding." },
    { id: "lx500", name: "OmniCure LX500 / LX400+", desc: "LED spot curing: cool operation, long lifetime, low maintenance." },
    { id: "flood", name: "Flood & area curing systems", desc: "Uniform UV curing over larger areas for assembly lines." },
    { id: "accessories", name: "Accessories & spare parts", desc: "Lightguides, radiometers, accessories & spare parts." },
  ],
  askPrice: "Ask Price",
  whyHeading: "Why buy from an authorized local distributor",
  why: [
    "Genuine & guaranteed — authentic OmniCure units with manufacturer warranty, not grey-market imports.",
    "Local stock & faster delivery — no long overseas lead times.",
    "Installation & commissioning in Vietnam — set up and performance-validated on-site.",
    "Vietnamese-language technical support — engineers who understand your process.",
    "Local repair, calibration & spare parts — minimal downtime.",
  ],
  applicationsHeading: "Applications",
  applications:
    "OmniCure systems from ETIA support UV curing in PCB manufacturing, automotive electronics, medical device assembly, parts assembly, and consumer electronics — wherever precise, repeatable curing matters.",
  serviceHeading: "Service & support",
  service:
    "Beyond supply, ETIA provides local repair, calibration, lightguide and bulb replacement, and spare parts for OmniCure systems — minimizing downtime and protecting your investment.",
  closingHeading: "Need OmniCure in Vietnam? Get pricing and expert advice today.",
  contactLine: `☎ ${VN_CONTACT.phone} · ✉ ${VN_CONTACT.email} · 📍 Bac Ninh, Vietnam`,
  faqHeading: "Frequently asked questions",
  faq: [
    { q: "Where can I buy OmniCure in Vietnam?", a: "From ETIA, an authorized distributor appointed by Excelitas Canada, with local stock and service." },
    { q: "Do you supply the OmniCure S2000 and LX500?", a: "Yes — both available, pricing on request." },
    { q: "Do you provide repair and calibration in Vietnam?", a: "Yes — local service, calibration, and spare parts." },
    { q: "Are these genuine units with warranty?", a: "Yes — authentic products with full manufacturer guarantee." },
  ],
  form: {
    heading: "Request a Quote",
    name: "Name",
    company: "Company",
    phone: "Phone",
    model: "Model needed",
    message: "Message (optional)",
    submit: "Request a Quote",
    thanksTitle: "Thank you — we'll be in touch.",
    thanksBody: "Our Vietnam team will contact you shortly with pricing and advice.",
    required: "Please complete the required fields.",
    consent: "By submitting this form, you agree that ETIA may process your contact information to respond to your inquiry, provide product recommendations, and offer sales or technical support. Please see our Privacy Policy for details.",
  },
};

// VI: working translation of the EN copy above — review before running ads.
const vi: LandingCopy = {
  metaTitle: "Nhà phân phối OmniCure được ủy quyền tại Việt Nam | S2000, LX500 | ETIA",
  metaDescription:
    "ETIA là nhà phân phối OmniCure được ủy quyền tại Việt Nam — hệ thống UV curing S2000, LX500 với hàng sẵn kho, lắp đặt, dịch vụ và bảo hành chính hãng.",
  hero: {
    h1: "Nhà phân phối OmniCure được ủy quyền tại Việt Nam",
    subhead: "S2000 · LX500 · Spot & Flood UV Curing — bán hàng, lắp đặt và dịch vụ tại Bắc Ninh.",
    badges: ["Được ủy quyền bởi Excelitas Canada", "Bảo hành đầy đủ từ nhà sản xuất", "Dịch vụ tận nơi tại Việt Nam"],
    ctaPrimary: "Yêu cầu báo giá",
    ctaSecondary: "",
  },
  trustBar:
    "Là nhà phân phối được ủy quyền do Excelitas Canada chỉ định, ETIA cung cấp hệ thống UV curing OmniCure chính hãng tại Việt Nam — với bảo hành đầy đủ từ nhà sản xuất và hỗ trợ lắp đặt tại chỗ. Sản phẩm chính hãng, hàng sẵn kho, hỗ trợ tiếng Việt và dịch vụ hậu mãi bạn có thể liên hệ thực sự.",
  productsHeading: "Hệ thống OmniCure",
  products: [
    { id: "s2000", name: "OmniCure S2000 / S2000 Elite", desc: "UV spot curing cường độ cao cho liên kết chính xác, lặp lại được." },
    { id: "lx500", name: "OmniCure LX500 / LX400+", desc: "LED spot curing: vận hành mát, tuổi thọ dài, ít bảo trì." },
    { id: "flood", name: "Hệ thống flood & area curing", desc: "UV curing đồng đều trên diện tích lớn cho dây chuyền lắp ráp." },
    { id: "accessories", name: "Phụ kiện & linh kiện thay thế", desc: "Lightguide, radiometer, phụ kiện và linh kiện thay thế." },
  ],
  askPrice: "Hỏi giá",
  whyHeading: "Vì sao nên mua từ nhà phân phối được ủy quyền tại địa phương",
  why: [
    "Chính hãng & có bảo hành — thiết bị OmniCure chính hãng với bảo hành nhà sản xuất, không phải hàng trôi nổi.",
    "Hàng sẵn kho & giao nhanh — không phải chờ đợi nhập khẩu lâu.",
    "Lắp đặt & nghiệm thu tại Việt Nam — cài đặt và xác nhận hiệu năng tận nơi.",
    "Hỗ trợ kỹ thuật tiếng Việt — kỹ sư hiểu quy trình của bạn.",
    "Sửa chữa, hiệu chuẩn & linh kiện tại chỗ — giảm tối đa thời gian dừng máy.",
  ],
  applicationsHeading: "Ứng dụng",
  applications:
    "Hệ thống OmniCure từ ETIA hỗ trợ UV curing trong sản xuất PCB, điện tử ô tô, lắp ráp thiết bị y tế, lắp ráp linh kiện và điện tử tiêu dùng — ở bất cứ đâu cần curing chính xác, lặp lại được.",
  serviceHeading: "Dịch vụ & hỗ trợ",
  service:
    "Không chỉ cung cấp thiết bị, ETIA còn sửa chữa tại chỗ, hiệu chuẩn, thay lightguide và bóng đèn, cùng linh kiện thay thế cho hệ thống OmniCure — giảm thời gian dừng máy và bảo vệ khoản đầu tư của bạn.",
  closingHeading: "Cần OmniCure tại Việt Nam? Nhận báo giá và tư vấn ngay hôm nay.",
  contactLine: `☎ ${VN_CONTACT.phone} · ✉ ${VN_CONTACT.email} · 📍 Bắc Ninh, Việt Nam`,
  faqHeading: "Câu hỏi thường gặp",
  faq: [
    { q: "Mua OmniCure ở đâu tại Việt Nam?", a: "Từ ETIA — nhà phân phối được ủy quyền do Excelitas Canada chỉ định, với hàng sẵn kho và dịch vụ tại chỗ." },
    { q: "Có cung cấp OmniCure S2000 và LX500 không?", a: "Có — cả hai đều có sẵn, báo giá theo yêu cầu." },
    { q: "Có sửa chữa và hiệu chuẩn tại Việt Nam không?", a: "Có — dịch vụ, hiệu chuẩn và linh kiện thay thế tại chỗ." },
    { q: "Đây có phải thiết bị chính hãng kèm bảo hành không?", a: "Đúng — sản phẩm chính hãng với bảo hành đầy đủ từ nhà sản xuất." },
  ],
  form: {
    heading: "Yêu cầu báo giá",
    name: "Họ tên",
    company: "Công ty",
    phone: "Điện thoại",
    model: "Model cần mua",
    message: "Lời nhắn (không bắt buộc)",
    submit: "Yêu cầu báo giá",
    thanksTitle: "Cảm ơn bạn — chúng tôi sẽ sớm liên hệ.",
    thanksBody: "Đội ngũ Việt Nam của chúng tôi sẽ liên hệ với bạn cùng báo giá và tư vấn.",
    required: "Vui lòng điền các trường bắt buộc.",
    consent: "Bằng việc gửi biểu mẫu này, bạn đồng ý để ETIA xử lý thông tin liên hệ của bạn nhằm phản hồi yêu cầu, tư vấn sản phẩm và hỗ trợ bán hàng hoặc kỹ thuật. Vui lòng xem Chính sách bảo mật của chúng tôi để biết chi tiết.",
  },
};

export function getVnCopy(lang: VnLang): LandingCopy {
  return lang === "vi" ? vi : en;
}

const SITE = "https://www.etiatech.com";
export const VN_URLS: Record<VnLang, string> = {
  en: `${SITE}/omnicure-vietnam`,
  vi: `${SITE}/vi/omnicure`,
};

export function vnLandingMetadata(lang: VnLang): Metadata {
  const c = getVnCopy(lang);
  return {
    title: c.metaTitle,
    description: c.metaDescription,
    alternates: {
      canonical: VN_URLS[lang],
      languages: { en: VN_URLS.en, vi: VN_URLS.vi, "x-default": VN_URLS.en },
    },
  };
}

export function vnLandingJsonLd(lang: VnLang) {
  const c = getVnCopy(lang);
  const org = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "ETIA Technology",
    url: VN_URLS[lang],
    description:
      "Authorized OmniCure distributor in Vietnam, appointed by Excelitas Canada — genuine UV curing systems with local stock, installation and service.",
    address: {
      "@type": "PostalAddress",
      streetAddress: VN_CONTACT.address,
      addressLocality: "Bac Ninh",
      addressCountry: "VN",
    },
    areaServed: "VN",
    sameAs: ["https://www.etia-tech.com.vn"],
    brand: { "@type": "Brand", name: "OmniCure" },
  };
  const faq = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: c.faq.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };
  return [org, faq];
}
