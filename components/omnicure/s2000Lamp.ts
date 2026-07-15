import type { Metadata } from "next";

// OmniCure S2000 Elite Lamp — repeat-purchase replacement-lamp SEM landing page.
// Copy is the client's OFFICIAL 4-language content (EN/ZH/TH/VI, from the
// "Omnicure S2000 Elite Lamp 4 languages SEO" document). SEO follows the
// client's guidance: the part number is the #1 keyword — primary SKU 012-64000R
// appears in the title, H1, first 100 words, a crawlable plain-text part table,
// alt text, and Product schema; typo/transposition variants (e.g. 021-64000R)
// are covered as secondary text.

// The lamp pages exist in all four languages, unlike the EN+TH SEM landings —
// so they carry their own language union instead of the SEM `Lang`.
export type LampLang = "en" | "zh" | "th" | "vi";

const SITE = "https://www.etiatech.com";
const IMG = "https://etiatech-1303055923.cos.ap-singapore.myqcloud.com/IMAGE/product";

export const LAMP_PATHS: Record<LampLang, string> = {
  en: "/product/omnicure/s2000-lamp",
  zh: "/zh/product/omnicure/s2000-lamp",
  // TH keeps its original SEM-style URL — already indexed and linked from ads.
  th: "/th/omnicure-s2000-lamp",
  vi: "/vi/product/omnicure/s2000-lamp",
};

// hreflang group — shared by all four language versions (and the sitemap).
export const LAMP_LANGUAGES = {
  en: SITE + LAMP_PATHS.en,
  "zh-Hans": SITE + LAMP_PATHS.zh,
  th: SITE + LAMP_PATHS.th,
  vi: SITE + LAMP_PATHS.vi,
  "x-default": SITE + LAMP_PATHS.en,
};

export const PRIMARY_CODE = "012-64000R";

export const LAMP = {
  name: "OmniCure S2000 Elite Lamp",
  tagline: "High-Pressure Mercury UV Curing Spot Source",
  spec: "250–600 nm · 200 W",
  primaryCode: PRIMARY_CODE,
  variants: "021-64000R · 012 64000R · S2000 64000R · 64000R lamp",
  // COS on-the-fly compression (imageMogr2): serve a small webp instead of the
  // multi-MB source PNG, and the query string doubles as a cache-bust after an
  // in-place re-upload. ~2.3 MB → ~50 KB.
  heroImage: `${IMG}/S2000%20LAMP.png?imageMogr2/thumbnail/1000x/format/webp/quality/82`,
  heroAlt: "Omnicure S2000 Elite Lamp 012-64000R 200W UV curing lamp module",
  // 16:9 promo shot for the replacement-lamp banner on the OmniCure page.
  promoImage: `${IMG}/S2000%20LAMP%201609.jpg?imageMogr2/thumbnail/1200x/format/webp/quality/82`,
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
    {
      name: "Standard",
      pn: "012-68000R / 012-64000R",
      desc: {
        en: "Broad-spectrum output for the widest range of UV adhesive bonding applications.",
        zh: "宽光谱输出，适用范围最广的 UV 粘合剂粘接应用。",
        th: "แสงสเปกตรัมกว้าง รองรับงานบ่มกาวยูวีได้หลากหลายที่สุด",
        vi: "Phổ phát xạ rộng, đáp ứng dải ứng dụng dán keo UV rộng nhất.",
      } as Record<LampLang, string>,
    },
    {
      name: "Surface Cure",
      pn: "012-69000R / 012-54000R",
      desc: {
        en: "Reshapes the power spectrum for a smooth, seamless, tack-free finish on acrylic resins (overcomes oxygen inhibition).",
        zh: "重塑功率光谱，使丙烯酸树脂表面平滑无缝、不发粘（克服氧阻聚现象）。",
        th: "ปรับสเปกตรัมเพื่อผิวอะคริลิกเรียบเนียนไร้รอยต่อ ไม่เหนียวติด (แก้ปัญหาการยับยั้งจากออกซิเจน)",
        vi: "Định hình lại phổ công suất để bề mặt nhựa acrylic nhẵn mịn, liền mạch, không dính tay (khắc phục ức chế oxy).",
      } as Record<LampLang, string>,
    },
  ],
};

// Small UI strings around the official body copy, per language.
export const LAMP_UI: Record<
  LampLang,
  {
    eyebrow: string;
    request: string;
    overview: string;
    features: string;
    benefits: string;
    which: string;
    parts: string;
    partsHint: string;
    alsoSearched: string;
    faq: string;
    closing: string;
    askPrice: string;
  }
> = {
  en: {
    eyebrow: "OmniCure · Replacement Lamp",
    request: "Request a Quote / Re-order",
    overview: "Overview",
    features: "Features",
    benefits: "Benefits",
    which: "Which lamp do I need?",
    parts: "Part Numbers",
    partsHint: "Search by part number — order the exact lamp you need.",
    alsoSearched: "Also searched as: ",
    faq: "Frequently asked questions",
    closing: "Need a replacement S2000 lamp? Get pricing today.",
    askPrice: "Ask price →",
  },
  zh: {
    eyebrow: "OmniCure · 替换灯管",
    request: "索取报价 / 再次订购",
    overview: "产品介绍",
    features: "核心特性",
    benefits: "价值优势",
    which: "如何选择灯管型号?",
    parts: "零件号 (Part Numbers)",
    partsHint: "可直接按零件号搜索——按型号精准订购。",
    alsoSearched: "其他常见搜索写法：",
    faq: "常见问题",
    closing: "需要更换 S2000 灯管？立即获取报价。",
    askPrice: "咨询价格 →",
  },
  th: {
    eyebrow: "OmniCure · Replacement Lamp",
    request: "ขอราคา / สั่งซื้อหลอด",
    overview: "ข้อมูลผลิตภัณฑ์",
    features: "คุณสมบัติ",
    benefits: "ประโยชน์",
    which: "เลือกหลอดรุ่นไหน?",
    parts: "หมายเลขชิ้นส่วน (Part Numbers)",
    partsHint: "ค้นหาด้วยหมายเลขชิ้นส่วนได้เลย — สั่งหลอดที่ตรงรุ่น",
    alsoSearched: "ค้นหาด้วยรหัสอื่นได้: ",
    faq: "คำถามที่พบบ่อย",
    closing: "ต้องเปลี่ยนหลอด S2000? ขอราคาวันนี้",
    askPrice: "สอบถามราคา →",
  },
  vi: {
    eyebrow: "OmniCure · Đèn thay thế",
    request: "Yêu cầu báo giá / Đặt lại hàng",
    overview: "Giới thiệu",
    features: "Tính năng",
    benefits: "Lợi ích",
    which: "Chọn loại đèn nào?",
    parts: "Mã hàng (Part Numbers)",
    partsHint: "Tìm theo mã hàng — đặt đúng loại đèn bạn cần.",
    alsoSearched: "Cũng được tìm kiếm dưới dạng: ",
    faq: "Câu hỏi thường gặp",
    closing: "Cần thay đèn S2000? Nhận báo giá ngay hôm nay.",
    askPrice: "Hỏi giá →",
  },
};

// Official per-language body copy (EN/ZH/TH/VI from the client's document).
const CONTENT: Record<LampLang, { h1: string; intro: string[]; features: string[]; benefits: string[]; faq: { q: string; a: string }[] }> = {
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
  zh: {
    h1: "Omnicure S2000 Elite 灯管 — 200W UV 固化灯管（012-64000R）",
    intro: [
      "Omnicure S2000 系列搭载的高压汞灯，能按照一定的比例集成发出波长为 250nm 至 600nm 的光束，并在紫外线频带形成极强的频谱分布。这种大功率灯具可通过高达 40W/cm² 的高长波紫外线辐照度实现更快的固化。",
      "Omnicure S2000 200W 灯管（012-64000R）保证 2000 小时的使用寿命。超高的光功率、平缓的衰减曲线以及 S2000 闭环反馈自动补偿功能，极大地提升了灯具的使用寿命，有效地降低了使用成本 —— 我们多数客户的灯管使用寿命都达到了 4000 小时。",
      "这既适合大批量、大规模生产的企业，同时也适合大学实验室和研究所的小批量实验。",
    ],
    features: [
      "Intelli-Lamp® 智能灯具专利技术 — 凭借专利技术，S2000 具备自动时间跟踪和宽光谱输出的能力，可以适用于各种粘合剂／基质的粘合应用。",
      "可选峰值辐照度 — 对于各种应用，都可以选择其中一个最有效的最高峰值辐照度，作为固化系统的点光源。",
      "克服氧阻聚现象 — 在某些粘合剂容易出现氧阻聚现象的场合，我们独有的灯管技术可以让灯管在短波紫外线的波长范围上输出足够的光功率，促进丙烯酸树脂平滑无缝的表面抛光。",
      "无需惰性气体与二次固化 — 在固化过程中不需要惰性气体环境，也不需要高温二次固化。",
    ],
    benefits: [
      "保证灯管寿命 — 每支 200W 灯管均保证 2000 小时的使用寿命。",
      "延长实际使用寿命 — 超高光功率、平缓的衰减曲线以及闭环反馈自动补偿功能，极大延长灯具寿命 —— 多数客户的灯管寿命达到 4000 小时。",
      "降低使用成本 — 单支灯管可用寿命更长，意味着更换次数更少，系统全生命周期的使用成本更低。",
      "更快的固化节拍 — 高达 40W/cm² 的长波紫外线辐照度可更快完成固化，提升大批量产线的产能。",
    ],
    faq: [
      { q: "我应该选择哪种 S2000 灯管——Standard 还是 Surface Cure?", a: "Standard（012-68000R / 备用灯管 012-64000R）适用于大多数 UV 粘合剂粘接应用；Surface Cure（012-69000R / 备用灯管 012-54000R）通过重塑光谱实现丙烯酸树脂表面不发粘、平滑无缝。不确定选哪种？把您的应用告诉我们，我们帮您确认正确的零件号。" },
      { q: "S2000 200W 灯管能用多久?", a: "保证使用寿命 2000 小时。凭借 S2000 的闭环反馈自动补偿和平缓的衰减曲线，多数客户可达到约 4000 小时。" },
      { q: "是原厂正品 OmniCure 灯管并有保修吗?", a: "是——ETIA 是 OmniCure 授权经销商，供应原厂正品灯管并提供完整的原厂保修，绝非水货。" },
      { q: "有现货吗？交期多久?", a: "有——本地备货、快速发货，不会让您的产线停等备件。" },
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
  vi: {
    h1: "Đèn Omnicure S2000 Elite — Đèn bảo dưỡng UV 200W (012-64000R)",
    intro: [
      "Dòng Omnicure S2000 sử dụng đèn hồ quang thủy ngân áp suất cao, tích hợp và phát ra chùm sáng có bước sóng từ 250 nm đến 600 nm theo một tỷ lệ nhất định, tạo nên phân bố phổ cực mạnh trong dải tia cực tím. Với cường độ bức xạ UV bước sóng dài lên đến 40 W/cm², đèn công suất lớn này đạt được tốc độ bảo dưỡng nhanh hơn.",
      "Đèn Omnicure S2000 200W (012-64000R) được bảo đảm 2000 giờ hoạt động. Công suất quang cực cao, đường cong suy giảm thoải và tính năng tự động bù phản hồi vòng kín của S2000 giúp kéo dài đáng kể tuổi thọ đèn và giảm chi phí sử dụng — phần lớn khách hàng của chúng tôi đạt tuổi thọ đèn 4000 giờ.",
      "Điều này khiến S2000 phù hợp cho cả doanh nghiệp sản xuất hàng loạt quy mô lớn lẫn các thí nghiệm lô nhỏ tại phòng thí nghiệm đại học và viện nghiên cứu.",
    ],
    features: [
      "Công nghệ đèn thông minh Intelli-Lamp® — Công nghệ được cấp bằng sáng chế giúp S2000 tự động theo dõi thời gian và xuất phổ rộng, nhờ đó thích ứng với nhiều ứng dụng dán keo và vật liệu nền.",
      "Cường độ đỉnh tùy chọn — Với mọi ứng dụng, bạn có thể chọn một trong những mức cường độ đỉnh hiệu quả nhất làm nguồn sáng điểm của hệ thống bảo dưỡng.",
      "Khắc phục ức chế oxy — Khi keo dễ bị ức chế oxy, công nghệ ống đèn độc quyền của chúng tôi phát đủ công suất quang trong dải UV bước sóng ngắn, giúp bề mặt nhựa acrylic nhẵn mịn liền mạch.",
      "Không cần khí trơ hay bảo dưỡng lại — Quá trình bảo dưỡng không cần môi trường khí trơ và không cần bảo dưỡng lần hai ở nhiệt độ cao.",
    ],
    benefits: [
      "Bảo đảm tuổi thọ đèn — Mỗi bóng đèn 200W được bảo đảm 2000 giờ hoạt động.",
      "Tuổi thọ thực tế dài hơn — Công suất quang cao, đường suy giảm thoải và tự động bù phản hồi vòng kín kéo dài tuổi thọ đèn xa hơn nhiều — phần lớn khách hàng đạt 4000 giờ.",
      "Chi phí sở hữu thấp hơn — Tuổi thọ mỗi đèn dài hơn đồng nghĩa ít thay thế hơn và chi phí sử dụng thấp hơn trong suốt vòng đời hệ thống.",
      "Năng suất bảo dưỡng nhanh hơn — Cường độ UV bước sóng dài tới 40 W/cm² bảo dưỡng nhanh hơn, nâng năng suất cho dây chuyền sản lượng lớn.",
    ],
    faq: [
      { q: "Tôi nên chọn đèn S2000 nào — Standard hay Surface Cure?", a: "Standard (012-68000R / đèn dự phòng 012-64000R) phù hợp với hầu hết ứng dụng dán keo UV. Surface Cure (012-69000R / đèn dự phòng 012-54000R) định hình lại phổ để bề mặt acrylic liền mạch, không dính tay. Chưa chắc chắn? Hãy gửi ứng dụng của bạn cho chúng tôi, chúng tôi sẽ xác nhận đúng mã hàng." },
      { q: "Đèn S2000 200W dùng được bao lâu?", a: "Được bảo đảm 2000 giờ. Nhờ tính năng tự động bù phản hồi vòng kín của S2000 và đường cong suy giảm thoải, phần lớn khách hàng đạt khoảng 4000 giờ." },
      { q: "Đây có phải đèn OmniCure chính hãng kèm bảo hành không?", a: "Đúng — ETIA là nhà phân phối OmniCure được ủy quyền; đèn chính hãng với bảo hành đầy đủ từ nhà sản xuất, không phải hàng trôi nổi." },
      { q: "Có sẵn hàng không? Giao hàng mất bao lâu?", a: "Có — hàng có sẵn và giao nhanh, để dây chuyền sản xuất của bạn không phải chờ linh kiện thay thế." },
    ],
  },
};

export function getLampContent(lang: LampLang) {
  return CONTENT[lang] ?? CONTENT.en;
}

// Title ≤60 chars / description ≤155 chars per the client's SEO guidance,
// always leading with the primary part number.
const META: Record<LampLang, { title: string; description: string }> = {
  en: {
    title: "Omnicure S2000 Elite Lamp | 012-64000R 200W UV Lamp",
    description:
      "Omnicure S2000 Elite Lamp (012-64000R): 200W high-pressure mercury UV spot source, 250–600nm, up to 40 W/cm². 2000h guaranteed, 4000h typical. Genuine, in stock in Thailand.",
  },
  zh: {
    title: "Omnicure S2000 Elite 灯管 | 012-64000R 200W UV 灯管",
    description:
      "Omnicure S2000 Elite 灯管（012-64000R）：200W 高压汞灯 UV 点光源，250–600nm，最高 40 W/cm²。保证 2000 小时寿命，典型可达 4000 小时。原厂正品，现货供应。",
  },
  th: {
    title: "หลอด OmniCure S2000 Elite | 012-64000R 200W UV Lamp",
    description:
      "Omnicure S2000 Elite Lamp (012-64000R): 200W high-pressure mercury UV spot source, 250–600nm, up to 40 W/cm². 2000h guaranteed, 4000h typical. Genuine, in stock in Thailand.",
  },
  vi: {
    title: "Đèn Omnicure S2000 Elite | 012-64000R Đèn UV 200W",
    description:
      "Đèn Omnicure S2000 Elite (012-64000R): nguồn UV điểm đèn thủy ngân áp suất cao 200W, 250–600nm, tới 40 W/cm². Bảo đảm 2000 giờ, thực tế ~4000 giờ. Hàng chính hãng.",
  },
};

export function lampMetadata(lang: LampLang): Metadata {
  return {
    ...META[lang],
    alternates: {
      canonical: SITE + LAMP_PATHS[lang],
      languages: LAMP_LANGUAGES,
    },
  };
}

export function lampJsonLd(lang: LampLang) {
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
      seller:
        lang === "zh" || lang === "vi"
          ? { "@type": "Organization", name: "ETIA Technology" }
          : { "@type": "Organization", name: "Etiatec (Thailand) Co., Ltd.", areaServed: "TH" },
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
