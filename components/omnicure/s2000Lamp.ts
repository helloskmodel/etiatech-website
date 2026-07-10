import type { Metadata } from "next";
import type { Lang } from "./copy";

// OmniCure S2000 Elite Lamp — repeat-purchase replacement-lamp SEM landing page.
// Copy is the client's OFFICIAL 4-language content (EN + TH here; ZH/VI pending
// separate pages). SEO follows the client's guidance: the part number is the
// #1 keyword — primary SKU 012-64000R appears in the title, H1, first 100 words,
// a crawlable plain-text part table, alt text, and Product schema; typo/
// transposition variants (e.g. 021-64000R) are covered as secondary text.

const SITE = "https://www.etiatech.com";
const IMG = "https://etiatech-1303055923.cos.ap-singapore.myqcloud.com/IMAGE/product";

export const LAMP_PATHS = { en: "/product/omnicure/s2000-lamp", th: "/th/omnicure-s2000-lamp" };
export const PRIMARY_CODE = "012-64000R";

export const LAMP = {
  name: "OmniCure S2000 Elite Lamp",
  tagline: "High-Pressure Mercury UV Curing Spot Source",
  spec: "250–600 nm · 200 W",
  primaryCode: PRIMARY_CODE,
  variants: "021-64000R · 012 64000R · S2000 64000R · 64000R lamp",
  heroImage: `${IMG}/S2000%20LAMP.png`,
  heroAlt: "Omnicure S2000 Elite Lamp 012-64000R 200W UV curing lamp module",
  // 16:9 promo shot for the replacement-lamp banner on the OmniCure page.
  promoImage: `${IMG}/S2000%20LAMP%201609.jpg`,
  spectralImage: `${IMG}/S2000%20LAMP-SPECTRAL%20OUTPUT.png`,
  spectralAlt: "Omnicure S2000 200W lamp 012-64000R spectral output 250-600nm",
  lifeImage: `${IMG}/S2000%20LAMP-LONG%20SERVICE%20LIFE.png`,
  lifeAlt: "Omnicure S2000 spare 200W lamp 012-54000R long service life",
  stats: [
    ["250–600 nm", "Spectral Range"],
    ["200 W", "Hg Short-Arc"],
    ["Up to 40 W/cm²", "Long-wave UV"],
    ["2,000 h", "Guaranteed · ~4,000 h typical"],
  ] as [string, string][],
  // Part-number table stays in English on every language page (ordering accuracy
  // + these codes are the primary search keywords). Kept as plain text.
  parts: [
    ["012-64000R", "Standard Spare 200 W Lamp for S2000 and S1500"],
    ["012-54000R", "Spare 200 W Lamp for Surface Curing for S2000"],
    ["012-68000R", "S2000 Elite Lamp Module – Standard"],
    ["012-69000R", "S2000 Elite Lamp Module – Surface Cure"],
  ] as [string, string][],
  lampTypes: [
    { name: "Standard", pn: "012-68000R / 012-64000R", descEn: "Broad-spectrum output for the widest range of UV adhesive bonding applications.", descTh: "แสงสเปกตรัมกว้าง รองรับงานบ่มกาวยูวีได้หลากหลายที่สุด" },
    { name: "Surface Cure", pn: "012-69000R / 012-54000R", descEn: "Reshapes the power spectrum for a smooth, seamless, tack-free finish on acrylic resins (overcomes oxygen inhibition).", descTh: "ปรับสเปกตรัมเพื่อผิวอะคริลิกเรียบเนียนไร้รอยต่อ ไม่เหนียวติด (แก้ปัญหาการยับยั้งจากออกซิเจน)" },
  ],
};

// Official per-language body copy (EN + TH from the client's document).
const CONTENT: Record<Lang, { h1: string; intro: string[]; features: string[]; benefits: string[]; faq: { q: string; a: string }[] }> = {
  en: {
    h1: "OmniCure S2000 Elite Lamp — 200 W UV Curing Lamp (012-64000R)",
    intro: [
      "The Omnicure S2000 series carries a high-pressure mercury lamp that integrates and emits wavelengths from 250 nm to 600 nm in a fixed ratio, forming an extremely strong spectral distribution across the UV band. With long-wave UV irradiance up to 40 W/cm², this high-power lamp achieves faster curing.",
      "The Omnicure S2000 200 W lamp (012-64000R) is guaranteed for 2,000 hours of service. High output, a gentle decay curve and the S2000 closed-loop feedback auto-compensation greatly extend lamp life and lower the cost of use — most of our customers reach 4,000 hours of lamp life.",
      "This makes the S2000 suitable for high-volume, large-scale production as well as small-batch experiments in university laboratories and research institutes.",
    ],
    features: [
      "Intelli-Lamp smart lamp technology — patented technology gives the S2000 automatic time-tracking and broad-spectrum output, so it adapts to a wide range of adhesive and substrate bonding applications.",
      "Selectable peak irradiance — for any application you can select one of the most effective peak irradiance levels to serve as the spot source of the curing system.",
      "Overcomes oxygen inhibition — where adhesives are prone to oxygen inhibition, our unique tube technology outputs enough optical power in the short-wave UV range to promote a smooth, seamless surface polish on acrylic resins.",
      "No inert gas, no secondary cure — curing needs no inert-gas environment and no high-temperature secondary cure.",
    ],
    benefits: [
      "Guaranteed lamp life — every 200 W lamp is guaranteed for 2,000 hours of service.",
      "Extended real-world life — high optical power, a gentle decay curve and closed-loop feedback auto-compensation push lamp life much further; most customers reach 4,000 hours.",
      "Lower cost of ownership — longer usable life per lamp means fewer replacements and a lower cost of use over the life of the system.",
      "Faster curing throughput — up to 40 W/cm² of long-wave UV irradiance cures parts faster, lifting throughput on high-volume lines.",
    ],
    faq: [
      { q: "Which S2000 lamp do I need — Standard or Surface Cure?", a: "Standard (012-68000R / spare 012-64000R) suits most UV adhesive bonding. Surface Cure (012-69000R / spare 012-54000R) reshapes the spectrum for a tack-free, seamless acrylic finish. Not sure? Send us your application and we'll confirm the right part number." },
      { q: "How long does the S2000 200 W lamp last?", a: "It is guaranteed for 2,000 hours. With the S2000's closed-loop feedback auto-compensation and a gentle decay curve, most customers reach around 4,000 hours." },
      { q: "Are these genuine OmniCure lamps with warranty?", a: "Yes — ETIA is an authorized OmniCure distributor; genuine lamps with full manufacturer warranty, not grey-market imports." },
      { q: "Do you stock S2000 lamps in Thailand?", a: "Yes — local stock and fast delivery, so your production line isn't left waiting for a replacement." },
    ],
  },
  th: {
    h1: "หลอด OmniCure S2000 Elite — หลอดบ่มยูวี 200 วัตต์ (012-64000R)",
    intro: [
      "ซีรีส์ Omnicure S2000 ติดตั้งหลอดปรอทแรงดันสูงที่รวมและปล่อยความยาวคลื่นตั้งแต่ 250 นาโนเมตรถึง 600 นาโนเมตรในอัตราส่วนคงที่ เกิดเป็นการกระจายสเปกตรัมที่เข้มข้นอย่างยิ่งในย่านรังสียูวี ด้วยความเข้มแสงยูวีคลื่นยาวสูงถึง 40 วัตต์/ตร.ซม. หลอดกำลังสูงนี้จึงบ่มได้เร็วยิ่งขึ้น",
      "หลอด Omnicure S2000 ขนาด 200 วัตต์ (012-64000R) รับประกันอายุใช้งาน 2000 ชั่วโมง กำลังแสงที่สูงมาก เส้นโค้งการเสื่อมที่ค่อยเป็นค่อยไป และการชดเชยอัตโนมัติแบบวงปิดของ S2000 ช่วยยืดอายุหลอดได้อย่างมากและลดต้นทุนการใช้งาน — ลูกค้าส่วนใหญ่ของเราใช้งานหลอดได้ถึง 4000 ชั่วโมง",
      "จึงเหมาะทั้งกับองค์กรที่ผลิตปริมาณมากในขนาดใหญ่ และการทดลองปริมาณน้อยในห้องปฏิบัติการมหาวิทยาลัยและสถาบันวิจัย",
    ],
    features: [
      "เทคโนโลยีหลอดอัจฉริยะ Intelli-Lamp — เทคโนโลยีที่จดสิทธิบัตรทำให้ S2000 ติดตามเวลาอัตโนมัติและให้แสงสเปกตรัมกว้าง จึงรองรับการยึดติดกาวและวัสดุพื้นผิวได้หลากหลาย",
      "เลือกความเข้มแสงสูงสุดได้ — สำหรับทุกงาน คุณสามารถเลือกระดับความเข้มแสงสูงสุดที่มีประสิทธิภาพที่สุดหนึ่งระดับ เพื่อใช้เป็นแหล่งกำเนิดแสงจุดของระบบบ่ม",
      "เอาชนะการยับยั้งจากออกซิเจน — ในกรณีที่กาวมีแนวโน้มถูกออกซิเจนยับยั้ง เทคโนโลยีหลอดเฉพาะของเราให้กำลังแสงเพียงพอในย่านยูวีคลื่นสั้น ส่งเสริมให้พื้นผิวเรซินอะคริลิกเรียบเนียนไร้รอยต่อ",
      "ไม่ต้องใช้ก๊าซเฉื่อยหรือบ่มซ้ำ — การบ่มไม่ต้องใช้สภาพแวดล้อมก๊าซเฉื่อยและไม่ต้องบ่มซ้ำที่อุณหภูมิสูง",
    ],
    benefits: [
      "รับประกันอายุหลอด — หลอดขนาด 200 วัตต์ทุกหลอดรับประกันอายุใช้งาน 2000 ชั่วโมง",
      "อายุใช้งานจริงที่ยาวนานขึ้น — กำลังแสงสูง เส้นโค้งการเสื่อมที่ค่อยเป็นค่อยไป และการชดเชยอัตโนมัติแบบวงปิด ช่วยยืดอายุหลอดได้ไกลกว่ามาก — ลูกค้าส่วนใหญ่ใช้ได้ถึง 4000 ชั่วโมง",
      "ต้นทุนการเป็นเจ้าของต่ำลง — อายุใช้งานต่อหลอดที่ยาวนานขึ้นหมายถึงการเปลี่ยนน้อยลงและต้นทุนตลอดอายุระบบต่ำลง",
      "อัตราการบ่มเร็วขึ้น — ความเข้มยูวีคลื่นยาวสูงถึง 40 วัตต์/ตร.ซม. บ่มชิ้นงานได้เร็วขึ้น เพิ่มกำลังการผลิตในสายการผลิตปริมาณมาก",
    ],
    faq: [
      { q: "ควรเลือกหลอด S2000 รุ่นไหน — Standard หรือ Surface Cure?", a: "Standard (012-68000R / อะไหล่ 012-64000R) เหมาะกับงานบ่มกาวยูวีส่วนใหญ่ ส่วน Surface Cure (012-69000R / อะไหล่ 012-54000R) ปรับสเปกตรัมเพื่อผิวอะคริลิกเรียบเนียนไร้รอยต่อ ไม่แน่ใจ? ส่งลักษณะงานมาให้เรา แล้วเราจะช่วยยืนยันหมายเลขชิ้นส่วนที่ถูกต้อง" },
      { q: "หลอด S2000 200 วัตต์ใช้งานได้นานแค่ไหน?", a: "รับประกัน 2000 ชั่วโมง และด้วยการชดเชยอัตโนมัติแบบวงปิดของ S2000 ลูกค้าส่วนใหญ่ใช้งานได้ราว 4000 ชั่วโมง" },
      { q: "เป็นหลอด OmniCure ของแท้พร้อมการรับประกันหรือไม่?", a: "ใช่ — ETIA เป็นตัวแทนจำหน่าย OmniCure ที่ได้รับอนุญาต หลอดของแท้พร้อมการรับประกันจากโรงงาน ไม่ใช่สินค้าหิ้ว" },
      { q: "มีสต็อกหลอด S2000 ในประเทศไทยหรือไม่?", a: "มี — สต็อกในพื้นที่และจัดส่งรวดเร็ว เพื่อไม่ให้สายการผลิตของคุณต้องรอ" },
    ],
  },
};

export function getLampContent(lang: Lang) {
  return CONTENT[lang] ?? CONTENT.en;
}

export function lampMetadata(lang: Lang): Metadata {
  const title =
    lang === "th"
      ? "หลอด OmniCure S2000 Elite | 012-64000R 200W UV Lamp"
      : "Omnicure S2000 Elite Lamp | 012-64000R 200W UV Lamp";
  const description =
    "Omnicure S2000 Elite Lamp (012-64000R): 200W high-pressure mercury UV spot source, 250–600nm, up to 40 W/cm². 2000h guaranteed, 4000h typical. Genuine, in stock in Thailand.";
  return {
    title,
    description,
    alternates: {
      canonical: SITE + LAMP_PATHS[lang],
      languages: { en: SITE + LAMP_PATHS.en, th: SITE + LAMP_PATHS.th, "x-default": SITE + LAMP_PATHS.en },
    },
  };
}

export function lampJsonLd(lang: Lang) {
  const product = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: LAMP.name,
    brand: { "@type": "Brand", name: "OmniCure" },
    description: getLampContent(lang).intro[0],
    image: LAMP.heroImage,
    category: "UV Curing Lamp",
    sku: PRIMARY_CODE,
    mpn: PRIMARY_CODE,
    offers: {
      "@type": "Offer",
      availability: "https://schema.org/InStock",
      seller: { "@type": "Organization", name: "Etiatec (Thailand) Co., Ltd.", areaServed: "TH" },
      url: SITE + LAMP_PATHS[lang],
    },
  };
  const faq = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: getLampContent(lang).faq.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };
  return [product, faq];
}
