import type { Metadata } from "next";
import type { LangText } from "@/components/LocaleContext";
import { products, type Product, type ProductDoc } from "@/components/productCatalog";

const SITE = "https://www.etiatech.com";
const COS_PDF = "https://etiatech-1303055923.cos.ap-singapore.myqcloud.com/PDF";

// ─────────────────────────────────────────────────────────────────────────
// ETIA's five customer-facing product categories.
//
// This is the taxonomy customers actually search by — the light source
// technology ("汞灯紫外光源", "UV LED 光源", "微波无极灯"), not the brand.
// The brand pages (/product/omnicure etc.) stay as a second way in; this is
// the primary one, and drives the PRODUCT → BY TECHNOLOGY menu, the product
// centre and the home page.
//
// Products are pulled out of the catalog by `match`, so a category's model
// list stays in sync when the catalog changes — nothing to maintain twice.
// ─────────────────────────────────────────────────────────────────────────

export type ProductCategorySlug =
  | "mercury-uv-lamp"
  | "uv-led"
  | "microwave-uv-lamp"
  | "uv-measurement"
  | "infrared-heating"
  | "analytical-light-sources";

export type ProductCategory = {
  slug: ProductCategorySlug;
  accent: string;
  // Menu label and page H1.
  name: LangText;
  // One-line hero subline — the "what is it, who is it for" sentence.
  tagline: LangText;
  // Body paragraphs for the overview section.
  intro: LangText[];
  // Typical applications / industries, rendered as chips.
  applications: LangText[];
  metaTitle: string;
  metaDescription: string;
  // Optional hero photograph for the category page. Falls back to the shared
  // page banner when absent.
  heroImage?: string;
  // Optional photographs of the technology in production, shown alongside the
  // typical-applications list.
  gallery?: { src: string; caption: LangText }[];
  // Optional literature that covers the whole category rather than one model,
  // rendered as a downloads block on the category page.
  docs?: ProductDoc[];
  // Optional reference section explaining how to choose within the category —
  // prose steps plus comparison tables. Only ever populated from material the
  // manufacturer publishes; see docs/PROJECT-STATUS.md.
  selectionGuide?: {
    heading: LangText;
    standfirst: LangText;
    steps: { title: LangText; body: LangText }[];
    tables?: {
      caption: LangText;
      columns: LangText[];
      rows: LangText[][];
      footnote?: LangText;
    }[];
  };
  // Selects this category's models out of the product catalog.
  match: (p: Product) => boolean;
  // Not published yet. A draft category is hidden from the menu, the product
  // centre, the home page and the cross-links, and stays out of the sitemap;
  // its page still builds so it can be previewed at its URL, but carries
  // noindex. Clear the flag to publish.
  draft?: boolean;
};

// Measurement instruments are catalogued under "UV Spot Curing" because they
// ship with the spot systems, but they belong to their own category here.
const MEASUREMENT_SLUGS = new Set(["r2000", "ls200"]);

export const productCategories: Record<ProductCategorySlug, ProductCategory> = {
  // ─────────────────────────── 1. 汞灯紫外光源 ───────────────────────────
  "mercury-uv-lamp": {
    slug: "mercury-uv-lamp",
    accent: "#1A56DB",
    name: { en: "Mercury UV Lamp Sources", zh: "汞灯紫外光源", vi: "Nguồn UV đèn thủy ngân", th: "แหล่งกำเนิด UV หลอดปรอท" },
    tagline: {
      en: "Broad-spectrum mercury lamp UV curing — the proven choice when your adhesive needs full 320–500 nm output.",
      zh: "宽光谱汞灯紫外固化——当胶水需要完整 320–500 nm 输出时，久经验证的选择。",
      vi: "Đóng rắn UV bằng đèn thủy ngân phổ rộng — lựa chọn đã được kiểm chứng khi keo của bạn cần trọn dải 320–500 nm.",
      th: "การบ่ม UV ด้วยหลอดปรอทสเปกตรัมกว้าง — ตัวเลือกที่พิสูจน์แล้วเมื่อกาวของคุณต้องการเอาต์พุตเต็มช่วง 320–500 nm",
    },
    intro: [
      {
        en: "Mercury arc lamp UV sources deliver a broad, continuous spectrum from roughly 250 to 600 nm. That full spectral coverage is why they remain the reference light source for adhesives, coatings and inks whose photoinitiators absorb outside the narrow UV LED bands — and why many validated medical and electronics processes are still specified around them.",
        zh: "汞弧灯紫外光源提供约 250–600 nm 的宽广连续光谱。正是这种完整的光谱覆盖，使其在光引发剂吸收峰位于 UV LED 窄带之外的胶粘剂、涂层与油墨领域，始终是基准光源——也是大量已验证的医疗与电子工艺至今仍按其规格设计的原因。",
        vi: "Nguồn UV đèn hồ quang thủy ngân phát ra phổ rộng, liên tục từ khoảng 250 đến 600 nm. Chính độ phủ phổ trọn vẹn đó khiến chúng vẫn là nguồn sáng chuẩn cho keo, lớp phủ và mực có chất khơi mào quang hấp thụ ngoài các dải hẹp của UV LED — và là lý do nhiều quy trình y tế, điện tử đã được thẩm định vẫn quy định dùng chúng.",
        th: "แหล่งกำเนิด UV แบบหลอดอาร์กปรอทให้สเปกตรัมกว้างและต่อเนื่องตั้งแต่ราว 250 ถึง 600 nm ความครอบคลุมสเปกตรัมที่เต็มช่วงนี้เองที่ทำให้ยังเป็นแหล่งกำเนิดแสงอ้างอิงสำหรับกาว สารเคลือบ และหมึกที่มีโฟโตอินิชิเอเตอร์ดูดกลืนนอกย่านแคบของ UV LED — และเป็นเหตุผลที่กระบวนการทางการแพทย์และอิเล็กทรอนิกส์จำนวนมากที่ผ่านการตรวจรับรองแล้วยังคงระบุให้ใช้",
      },
      {
        en: "ETIA supplies the OmniCure® S-Series spot curing systems: closed-loop optical feedback holds intensity constant over lamp life, so the dose your process was validated at on day one is the dose it still receives 2,000 hours later. Genuine replacement lamps, light guides and calibration are stocked in-region.",
        zh: "ETIA 供应 OmniCure® S 系列点固化系统：闭环光学反馈在整个灯泡寿命内保持光强恒定——工艺首日验证的剂量，2000 小时后依然一致。原厂替换灯泡、光导与校准服务均有区域备货。",
        vi: "ETIA cung cấp hệ thống đóng rắn điểm OmniCure® S-Series: phản hồi quang vòng kín giữ cường độ ổn định suốt tuổi thọ đèn, nên liều chiếu mà quy trình của bạn được thẩm định trong ngày đầu vẫn là liều chiếu nhận được sau 2.000 giờ. Đèn thay thế chính hãng, ống dẫn sáng và dịch vụ hiệu chuẩn đều có sẵn trong khu vực.",
        th: "ETIA จัดหาระบบบ่มแบบจุด OmniCure® S-Series: การป้อนกลับเชิงแสงแบบวงปิดรักษาความเข้มให้คงที่ตลอดอายุหลอด ปริมาณแสงที่กระบวนการของคุณผ่านการตรวจรับรองในวันแรก จึงเป็นปริมาณเดิมที่ได้รับเมื่อผ่านไป 2,000 ชั่วโมง หลอดเปลี่ยนของแท้ ตัวนำแสง และการสอบเทียบ มีสต็อกในภูมิภาค",
      },
    ],
    applications: [
      { en: "Medical device bonding", zh: "医疗器械粘接", vi: "Liên kết thiết bị y tế", th: "การยึดติดอุปกรณ์การแพทย์" },
      { en: "Catheter & needle assembly", zh: "导管与针头装配", vi: "Lắp ráp ống thông & kim", th: "การประกอบสายสวน & เข็ม" },
      { en: "Electronics assembly", zh: "电子装配", vi: "Lắp ráp điện tử", th: "การประกอบอิเล็กทรอนิกส์" },
      { en: "Optical component bonding", zh: "光学元件粘接", vi: "Liên kết linh kiện quang", th: "การยึดติดชิ้นส่วนออปติก" },
      { en: "Laboratory & R&D curing", zh: "实验室与研发固化", vi: "Đóng rắn trong phòng thí nghiệm & R&D", th: "การบ่มในห้องปฏิบัติการ & R&D" },
    ],
    metaTitle: "Mercury UV Lamp Curing Sources | OmniCure S-Series | ETIA",
    metaDescription:
      "Broad-spectrum mercury lamp UV curing sources with closed-loop intensity control. OmniCure S2000 Elite and S1500 Pro spot curing systems, genuine lamps and light guides, supplied and serviced by ETIA in Asia-Pacific.",
    match: (p) =>
      p.tech === "UV Spot Curing" && (p.sub === "UV Lamp Spot" || p.sub === "S-Series Accessory"),
  },

  // ─────────────────────────── 2. LED紫外光源 ───────────────────────────
  "uv-led": {
    slug: "uv-led",
    accent: "#41A62A",
    name: { en: "UV LED Light Sources", zh: "LED紫外光源", vi: "Nguồn sáng UV LED", th: "แหล่งกำเนิดแสง UV LED" },
    tagline: {
      en: "From single-point spot heads to 1350 mm production arrays — mercury-free UV LED curing at every scale.",
      zh: "从单点点固化头到 1350 mm 产线阵列——覆盖各种规模的无汞 UV LED 固化。",
      vi: "Từ đầu chiếu điểm đơn đến dàn sản xuất rộng 1350 mm — đóng rắn UV LED không thủy ngân ở mọi quy mô.",
      th: "ตั้งแต่หัวฉายจุดเดียวไปจนถึงอาร์เรย์การผลิตกว้าง 1350 มม. — การบ่ม UV LED ปลอดปรอทในทุกขนาด",
    },
    intro: [
      {
        en: "UV LED sources emit a narrow band at 365, 385, 395 or 405 nm with no warm-up, no ozone and no mercury. They switch instantly, run tens of thousands of hours, and put far less infrared heat into the part — which is what makes them the default choice for temperature-sensitive assemblies and for lines that cannot afford lamp-change downtime.",
        zh: "UV LED 光源在 365、385、395 或 405 nm 发射窄带光，无需预热、无臭氧、无汞。瞬时开关、寿命数万小时，且向工件传递的红外热量极低——这正是温度敏感装配以及无法承受换灯停机的产线以其为首选的原因。",
        vi: "Nguồn UV LED phát dải hẹp tại 365, 385, 395 hoặc 405 nm, không cần khởi động nóng, không sinh ozon và không chứa thủy ngân. Chúng bật tắt tức thời, chạy hàng chục nghìn giờ và truyền ít nhiệt hồng ngoại vào chi tiết hơn nhiều — đó là lý do chúng trở thành lựa chọn mặc định cho cụm lắp ráp nhạy nhiệt và cho dây chuyền không thể chịu thời gian dừng để thay đèn.",
        th: "แหล่งกำเนิด UV LED เปล่งแสงย่านแคบที่ 365, 385, 395 หรือ 405 nm โดยไม่ต้องอุ่นเครื่อง ไม่เกิดโอโซน และไม่มีปรอท เปิดปิดได้ทันที ใช้งานได้หลายหมื่นชั่วโมง และถ่ายเทความร้อนอินฟราเรดสู่ชิ้นงานน้อยกว่ามาก — จึงเป็นตัวเลือกหลักสำหรับงานประกอบที่ไวต่ออุณหภูมิ และสายการผลิตที่รับภาระการหยุดเปลี่ยนหลอดไม่ได้",
      },
      {
        en: "ETIA covers the full range: OmniCure® LX spot curing and AC Series air-cooled arrays, Phoseon® FireEdge / FireJet / FireLine, and Noblelight Semray® water-cooled systems up to 1350 mm emission width. We size the head, wavelength and working distance to your adhesive's datasheet and your line speed — not the other way round.",
        zh: "ETIA 覆盖完整产品线：OmniCure® LX 点固化与 AC 系列风冷阵列、Phoseon® FireEdge / FireJet / FireLine，以及发光宽度达 1350 mm 的 Noblelight Semray® 水冷系统。我们依据您的胶水技术数据与产线速度来选定灯头、波长与工作距离——而不是反过来。",
        vi: "ETIA bao phủ trọn dải sản phẩm: đóng rắn điểm OmniCure® LX và dàn làm mát bằng khí AC Series, Phoseon® FireEdge / FireJet / FireLine, cùng hệ làm mát bằng nước Noblelight Semray® với bề rộng phát xạ đến 1350 mm. Chúng tôi chọn đầu đèn, bước sóng và khoảng cách làm việc theo thông số keo và tốc độ dây chuyền của bạn — chứ không phải ngược lại.",
        th: "ETIA ครอบคลุมผลิตภัณฑ์เต็มช่วง: การบ่มแบบจุด OmniCure® LX และอาร์เรย์ระบายความร้อนด้วยอากาศซีรีส์ AC, Phoseon® FireEdge / FireJet / FireLine และระบบระบายความร้อนด้วยน้ำ Noblelight Semray® ที่มีความกว้างการเปล่งแสงถึง 1350 มม. เรากำหนดหัวโคม ความยาวคลื่น และระยะทำงานตามเอกสารข้อมูลกาวและความเร็วสายการผลิตของคุณ — ไม่ใช่ในทางกลับกัน",
      },
    ],
    applications: [
      { en: "Optical module & transceiver assembly", zh: "光模块与光收发器装配", vi: "Lắp ráp mô-đun quang & bộ thu phát", th: "การประกอบออปติคัลโมดูล & ทรานซีฟเวอร์" },
      { en: "Semiconductor & advanced packaging", zh: "半导体与先进封装", vi: "Bán dẫn & đóng gói tiên tiến", th: "เซมิคอนดักเตอร์ & แพ็กเกจขั้นสูง" },
      { en: "Display & OCA bonding", zh: "显示与 OCA 贴合", vi: "Liên kết màn hình & OCA", th: "การประกบจอแสดงผล & OCA" },
      { en: "PCB conformal coating", zh: "PCB 三防漆涂覆", vi: "Phủ bảo vệ PCB", th: "การเคลือบป้องกัน PCB" },
      { en: "Optical fibre coating & marking", zh: "光纤涂覆与标识", vi: "Phủ & đánh dấu sợi quang", th: "การเคลือบ & ทำเครื่องหมายเส้นใยแก้วนำแสง" },
      { en: "Printing, coating & packaging", zh: "印刷、涂层与包装", vi: "In ấn, phủ & bao bì", th: "งานพิมพ์ เคลือบ & บรรจุภัณฑ์" },
    ],
    metaTitle: "UV LED Curing Light Sources | Spot, Area & Wide-Web | ETIA",
    metaDescription:
      "UV LED curing light sources at 365/385/395/405 nm — OmniCure LX spot and AC Series, Phoseon FireEdge, FireJet and FireLine, Noblelight Semray water-cooled arrays to 1350 mm. Application-matched and supported by ETIA.",
    match: (p) =>
      !MEASUREMENT_SLUGS.has(p.slug) &&
      ((p.tech === "UV Spot Curing" && p.sub === "UV LED Spot") ||
        p.tech === "Air-Cooled UV LED Curing" ||
        p.tech === "Water-Cooled UV LED Area Curing"),
  },

  // ────────────────────────── 3. 微波无极灯 ──────────────────────────
  // Sourced from Excelitas' public Fusion UV product-category pages and the
  // "Microwave-powered UV Curing System Overview" catalog (UVP44 EN/01.26).
  "microwave-uv-lamp": {
    slug: "microwave-uv-lamp",
    accent: "#f59e0b",
    name: { en: "Microwave Electrodeless UV Lamps", zh: "微波无极灯", vi: "Đèn UV vi sóng không điện cực", th: "หลอด UV ไมโครเวฟไร้ขั้วไฟฟ้า" },
    tagline: {
      en: "Fusion UV® microwave-powered curing — no electrodes to erode, 200–600 nm broad spectrum, and unlimited cure width by stacking lamps end to end.",
      zh: "Fusion UV® 微波无极紫外固化——无电极损耗、200–600 nm 宽光谱，灯头端对端拼接实现固化宽度无限扩展。",
      vi: "Đóng rắn bằng vi sóng Fusion UV® — không có điện cực để mòn, phổ rộng 200–600 nm, và bề rộng đóng rắn không giới hạn nhờ ghép nối các đèn đầu-nối-đầu.",
      th: "การบ่มด้วยพลังไมโครเวฟ Fusion UV® — ไม่มีขั้วไฟฟ้าให้สึกกร่อน สเปกตรัมกว้าง 200–600 nm และความกว้างการบ่มไม่จำกัดด้วยการต่อหลอดเรียงกัน",
    },
    intro: [
      {
        en: "Fusion UV® was founded in 1971 with the invention of microwave-powered UV curing technology, and Excelitas acquired the Fusion UV microwave portfolio in 2024 through its acquisition of Noblelight. Microwave-powered lamps excite the bulb fill with microwave energy rather than electrodes — there are no electrodes to erode, which is the root of the platform's output stability and long service life.",
        zh: "Fusion UV® 创立于 1971 年，以微波紫外固化技术的发明起家；2024 年，Excelitas 通过收购 Noblelight 获得 Fusion UV 微波产品线。微波灯以微波能量激发灯泡填充物，而非依靠电极——不存在电极损耗，这正是该平台输出稳定、寿命长久的技术根源。",
        vi: "Fusion UV® được thành lập năm 1971 cùng với phát minh công nghệ đóng rắn UV bằng vi sóng, và Excelitas tiếp nhận danh mục vi sóng Fusion UV vào năm 2024 thông qua việc mua lại Noblelight. Đèn vi sóng kích thích chất nạp trong bóng bằng năng lượng vi sóng thay vì điện cực — không có điện cực để mòn, và đó là gốc rễ của độ ổn định công suất cùng tuổi thọ dài của nền tảng này.",
        th: "Fusion UV® ก่อตั้งในปี 1971 พร้อมการประดิษฐ์เทคโนโลยีการบ่ม UV ด้วยพลังไมโครเวฟ และ Excelitas ได้รับพอร์ตผลิตภัณฑ์ไมโครเวฟของ Fusion UV มาในปี 2024 ผ่านการเข้าซื้อ Noblelight หลอดไมโครเวฟกระตุ้นสารบรรจุในหลอดด้วยพลังงานไมโครเวฟแทนการใช้ขั้วไฟฟ้า — จึงไม่มีขั้วไฟฟ้าให้สึกกร่อน ซึ่งเป็นรากฐานของความเสถียรของกำลังส่งและอายุการใช้งานที่ยาวนานของแพลตฟอร์มนี้",
      },
      {
        en: "The technology significantly improves production speed, process consistency and operating lifetime, while putting less heat into the substrate. An easy-to-service modular design gives process flexibility at a lower cost of ownership, and the systems are available in a range of power classes and UV broadband wavelengths. They retrofit into existing production lines or integrate into new ones, and the latest systems are Industry 4.0 ready with embedded sensors and microprocessors.",
        zh: "该技术显著提升生产速度、工艺一致性与运行寿命，同时降低传递到基材上的热量。易于维护的模块化设计带来工艺灵活性与更低的使用成本；系统提供多种功率等级与紫外宽光谱波长可选。设备既可改造接入现有产线，也可集成进新建产线；最新机型已具备工业 4.0 能力，内置传感器与微处理器。",
        vi: "Công nghệ này cải thiện đáng kể tốc độ sản xuất, tính nhất quán của quy trình và tuổi thọ vận hành, đồng thời truyền ít nhiệt vào vật liệu nền hơn. Thiết kế mô-đun dễ bảo trì mang lại sự linh hoạt trong quy trình với chi phí sở hữu thấp hơn, và hệ thống có nhiều cấp công suất cùng dải bước sóng UV rộng. Chúng lắp bổ sung được vào dây chuyền hiện có hoặc tích hợp vào dây chuyền mới, và các hệ thống mới nhất đã sẵn sàng cho Công nghiệp 4.0 với cảm biến và vi xử lý tích hợp.",
        th: "เทคโนโลยีนี้ช่วยเพิ่มความเร็วการผลิต ความสม่ำเสมอของกระบวนการ และอายุการใช้งานอย่างมีนัยสำคัญ พร้อมกับถ่ายเทความร้อนสู่วัสดุน้อยลง การออกแบบแบบโมดูลที่ซ่อมบำรุงง่ายให้ความยืดหยุ่นของกระบวนการด้วยต้นทุนการเป็นเจ้าของที่ต่ำลง และมีให้เลือกหลายระดับกำลังไฟพร้อมความยาวคลื่น UV ย่านกว้าง ระบบสามารถติดตั้งเพิ่มในสายการผลิตเดิมหรือผสานเข้ากับสายใหม่ และรุ่นล่าสุดพร้อมรองรับอุตสาหกรรม 4.0 ด้วยเซ็นเซอร์และไมโครโปรเซสเซอร์ในตัว",
      },
      {
        en: "ETIA supplies the full range — from the economical F300S to the ultra-high-output 10-inch LightHammer® 10 Mark III — together with the DRF Series for optical fibre draw towers. Fusion UV lamps are used in hundreds of industrial curing applications, from automotive headlamps to flooring to medical devices, wire marking and electronic components.",
        zh: "ETIA 提供完整产品线——从经济型 F300S 到超高输出的 10 英寸 LightHammer® 10 Mark III，以及用于光纤拉丝塔的 DRF 系列。Fusion UV 灯已应用于数百种工业固化场景，涵盖汽车大灯、地板材料、医疗器械、线缆打标与电子元器件。",
        vi: "ETIA cung cấp trọn dải sản phẩm — từ F300S kinh tế đến LightHammer® 10 Mark III 10 inch công suất siêu cao — cùng dòng DRF cho tháp kéo sợi quang. Đèn Fusion UV được dùng trong hàng trăm ứng dụng đóng rắn công nghiệp, từ đèn pha ô tô đến vật liệu sàn, thiết bị y tế, đánh dấu dây cáp và linh kiện điện tử.",
        th: "ETIA จัดหาผลิตภัณฑ์เต็มช่วง — ตั้งแต่ F300S รุ่นประหยัด ไปจนถึง LightHammer® 10 Mark III ขนาด 10 นิ้วที่ให้กำลังสูงมาก — พร้อมซีรีส์ DRF สำหรับหอดึงเส้นใยแก้วนำแสง หลอด Fusion UV ถูกใช้ในงานบ่มเชิงอุตสาหกรรมนับร้อยประเภท ตั้งแต่ไฟหน้ารถยนต์ วัสดุปูพื้น อุปกรณ์การแพทย์ การทำเครื่องหมายสายไฟ ไปจนถึงชิ้นส่วนอิเล็กทรอนิกส์",
      },
      {
        en: "UV curing of coatings, inks, paints and adhesives is regarded as a green technology: compared with solvent-based processes it cuts VOC emissions, air pollutants and flammability risk, and gives production staff a healthier working environment.",
        zh: "涂层、油墨、涂料与胶粘剂的紫外固化被视为一项绿色技术：相比溶剂型工艺，可大幅减少 VOC 排放、降低大气污染物与易燃风险，并为一线作业人员提供更健康的工作环境。",
        vi: "Đóng rắn bằng UV cho lớp phủ, mực, sơn và keo được xem là công nghệ xanh: so với quy trình gốc dung môi, nó cắt giảm phát thải VOC, chất ô nhiễm không khí và nguy cơ cháy, đồng thời mang lại môi trường làm việc lành mạnh hơn cho công nhân sản xuất.",
        th: "การบ่มสารเคลือบ หมึก สี และกาวด้วย UV ถือเป็นเทคโนโลยีสีเขียว: เมื่อเทียบกับกระบวนการที่ใช้ตัวทำละลาย จะลดการปล่อย VOC มลพิษทางอากาศ และความเสี่ยงจากการติดไฟ ทั้งยังให้สภาพแวดล้อมการทำงานที่ดีต่อสุขภาพพนักงานผลิตมากขึ้น",
      },
    ],
    applications: [
      { en: "Automotive headlamps", zh: "汽车大灯", vi: "Đèn pha ô tô", th: "ไฟหน้ารถยนต์" },
      { en: "Flooring", zh: "地板材料", vi: "Vật liệu sàn", th: "วัสดุปูพื้น" },
      { en: "Medical devices", zh: "医疗器械", vi: "Thiết bị y tế", th: "อุปกรณ์การแพทย์" },
      { en: "Wire marking", zh: "线缆打标", vi: "Đánh dấu dây cáp", th: "การทำเครื่องหมายสายไฟ" },
      { en: "Electronic components", zh: "电子元器件", vi: "Linh kiện điện tử", th: "ชิ้นส่วนอิเล็กทรอนิกส์" },
      { en: "Optical fibre production", zh: "光纤生产", vi: "Sản xuất sợi quang", th: "การผลิตเส้นใยแก้วนำแสง" },
      { en: "Printing, coating & converting", zh: "印刷、涂层与加工", vi: "In ấn, phủ & gia công", th: "งานพิมพ์ เคลือบ & แปรรูป" },
    ],
    metaTitle: "Microwave Electrodeless UV Lamps | Fusion UV F Series & LightHammer | ETIA",
    metaDescription:
      "Fusion UV microwave-powered UV curing systems — electrodeless lamps from the economical F300S to the LightHammer 10 Mark III, with H, D and V bulb fills, unlimited cure width and Industry 4.0 sensing. Supplied and supported by ETIA.",
    docs: [
      {
        file: "Microwave-powered+UV+Curing+System+Overview+Brochure.pdf",
        kind: { en: "Microwave UV Systems Overview", zh: "微波紫外系统总览手册", vi: "Tổng quan hệ thống UV vi sóng", th: "ภาพรวมระบบ UV ไมโครเวฟ" },
        base: COS_PDF,
      },
      {
        file: "Belt Conveyors for UV Microwave Curing Systems Brochure.pdf",
        kind: { en: "Belt Conveyors Brochure", zh: "输送机产品手册", vi: "Brochure băng tải", th: "โบรชัวร์สายพานลำเลียง" },
        base: COS_PDF,
      },
    ],
    selectionGuide: {
      heading: { en: "Choosing your lamp system", zh: "如何选择灯系统", vi: "Chọn hệ thống đèn phù hợp", th: "การเลือกระบบหลอดที่เหมาะสม" },
      standfirst: {
        en: "Three decisions size a microwave UV installation: how wide the cure has to be, how much power the chemistry needs, and which bulb spectrum the photoinitiator absorbs. Everything else — shutters, control, cooling — follows.",
        zh: "微波紫外系统的选型由三个决定构成：固化宽度要多宽、化学体系需要多大功率、光引发剂吸收哪种灯管光谱。其余的快门、控制、冷却，都由此推导。",
        vi: "Ba quyết định định cỡ một hệ thống UV vi sóng: cần đóng rắn rộng bao nhiêu, hệ hóa học cần bao nhiêu công suất, và chất khơi mào quang hấp thụ phổ đèn nào. Mọi thứ còn lại — cửa chắn, điều khiển, làm mát — đều suy ra từ đó.",
        th: "สามการตัดสินใจกำหนดขนาดของระบบ UV ไมโครเวฟ: ต้องบ่มกว้างเท่าใด เคมีต้องการกำลังไฟเท่าใด และโฟโตอินิชิเอเตอร์ดูดกลืนสเปกตรัมหลอดแบบใด ส่วนที่เหลือ — ชัตเตอร์ ระบบควบคุม การระบายความร้อน — ล้วนตามมาจากสามข้อนี้",
      },
      steps: [
        {
          title: { en: "1 · Width — stack, don't overlap", zh: "1 · 宽度——拼接，无需重叠", vi: "1 · Bề rộng — ghép nối, không chồng lấn", th: "1 · ความกว้าง — ต่อเรียง ไม่ต้องซ้อนทับ" },
          body: {
            en: "Lamp heads butt end to end for unlimited cure width, with no loss of energy between them and no need to overlap. That is what makes wide-web lines practical: 8-metre systems are in production today.",
            zh: "灯头可端对端拼接，实现固化宽度的无限扩展，相邻灯头之间没有能量损失，也无需重叠布置。正因如此，宽幅产线才具备可行性——目前已有 8 米幅宽的系统投入生产。",
            vi: "Các đầu đèn ghép sát đầu-nối-đầu cho bề rộng đóng rắn không giới hạn, không mất năng lượng giữa chúng và không cần chồng lấn. Đó chính là điều khiến dây chuyền khổ rộng trở nên khả thi: hiện đã có hệ thống rộng 8 mét đang vận hành sản xuất.",
            th: "หัวโคมต่อชนกันแบบปลายชนปลายเพื่อความกว้างการบ่มที่ไม่จำกัด โดยไม่สูญเสียพลังงานระหว่างกันและไม่ต้องซ้อนทับ นี่คือสิ่งที่ทำให้สายการผลิตหน้ากว้างเป็นไปได้จริง: ปัจจุบันมีระบบกว้าง 8 เมตรใช้งานอยู่ในการผลิตแล้ว",
          },
        },
        {
          title: { en: "2 · Power class and bulb length", zh: "2 · 功率等级与灯管长度", vi: "2 · Cấp công suất và chiều dài đèn", th: "2 · ระดับกำลังไฟและความยาวหลอด" },
          body: {
            en: "Bulb length is 15 cm (6\") or 25 cm (10\"); power class runs from 120 W/cm on the F300S to 240 W/cm on the F600S and the LightHammer® 10 family. Higher power buys line speed — it is not a substitute for the right spectrum.",
            zh: "灯管长度为 15 cm（6 英寸）或 25 cm（10 英寸）；功率等级从 F300S 的 120 W/cm，到 F600S 与 LightHammer® 10 系列的 240 W/cm。更高的功率换来的是产线速度——但它不能替代正确的光谱。",
            vi: "Chiều dài đèn là 15 cm (6\") hoặc 25 cm (10\"); cấp công suất từ 120 W/cm trên F300S đến 240 W/cm trên F600S và dòng LightHammer® 10. Công suất cao hơn mua được tốc độ dây chuyền — nhưng không thay thế được phổ đúng.",
            th: "ความยาวหลอดมี 15 ซม. (6 นิ้ว) หรือ 25 ซม. (10 นิ้ว); ระดับกำลังไฟตั้งแต่ 120 W/cm บน F300S ถึง 240 W/cm บน F600S และตระกูล LightHammer® 10 กำลังไฟที่สูงขึ้นซื้อความเร็วสายการผลิตได้ — แต่ไม่อาจใช้แทนสเปกตรัมที่ถูกต้อง",
          },
        },
        {
          title: { en: "3 · Bulb fill sets the spectrum", zh: "3 · 灯管填充决定光谱", vi: "3 · Chất nạp trong đèn quyết định phổ", th: "3 · สารบรรจุในหลอดกำหนดสเปกตรัม" },
          body: {
            en: "H, D and V bulbs put their energy in different places. Match the bulb to where your photoinitiator absorbs — a pigmented or thick film that will not through-cure under an H bulb often cures cleanly under a D or V. Special fill bulbs can be made to match an unusual chemistry.",
            zh: "H、D、V 三种灯管的能量分布各不相同。请按光引发剂的吸收位置选择灯管——在 H 灯管下无法穿透固化的含颜料体系或厚膜，改用 D 或 V 灯管往往能干净固化。对于特殊化学体系，还可定制特殊填充灯管以匹配光谱。",
            vi: "Đèn H, D và V đặt năng lượng ở những vị trí khác nhau. Hãy chọn đèn theo nơi chất khơi mào quang của bạn hấp thụ — một màng dày hoặc có sắc tố không đóng rắn xuyên suốt dưới đèn H thường lại đóng rắn sạch dưới đèn D hoặc V. Có thể chế tạo đèn nạp đặc biệt để khớp với hệ hóa học không thông dụng.",
            th: "หลอด H, D และ V วางพลังงานไว้คนละตำแหน่ง ให้เลือกหลอดตามช่วงที่โฟโตอินิชิเอเตอร์ของคุณดูดกลืน — ฟิล์มหนาหรือฟิล์มที่มีเม็ดสีซึ่งบ่มไม่ทะลุใต้หลอด H มักบ่มได้สะอาดใต้หลอด D หรือ V และสามารถผลิตหลอดบรรจุสารพิเศษให้ตรงกับเคมีที่ไม่ทั่วไปได้",
          },
        },
        {
          title: { en: "4 · Then the line format", zh: "4 · 最后是产线形态", vi: "4 · Sau đó là dạng dây chuyền", th: "4 · จากนั้นคือรูปแบบสายการผลิต" },
          body: {
            en: "The same lamp head goes into very different handling systems — benchtop conveyor for R&D, sheet and part handling, web, wide-line, wire and fibre, or a static chamber for 3D parts. Nitrogen inerting, dichroic reflectors and water-cooled beds are the levers for heat-sensitive or oxygen-inhibited work.",
            zh: "同一个灯头可以装进形态迥异的处理系统——研发用台式输送、片材与工件输送、卷材、宽幅、线缆与光纤，或用于 3D 工件的静态曝光腔。对热敏或受氧阻聚的工艺，氮气惰化、二向色反射镜与水冷台面是主要调节手段。",
            vi: "Cùng một đầu đèn có thể lắp vào những hệ xử lý rất khác nhau — băng tải để bàn cho R&D, xử lý tấm và chi tiết, cuộn, khổ rộng, dây và sợi quang, hoặc buồng tĩnh cho chi tiết 3D. Trơ hóa bằng nitơ, gương phản xạ lưỡng sắc và bàn làm mát bằng nước là những đòn bẩy cho công việc nhạy nhiệt hoặc bị oxy ức chế.",
            th: "หัวโคมเดียวกันสามารถติดตั้งในระบบลำเลียงที่ต่างกันมาก — สายพานตั้งโต๊ะสำหรับ R&D การลำเลียงแผ่นและชิ้นงาน วัสดุม้วน หน้ากว้าง สายไฟและเส้นใยแก้ว หรือห้องแบบสถิตสำหรับชิ้นงาน 3 มิติ การไล่ออกซิเจนด้วยไนโตรเจน กระจกสะท้อนไดโครอิก และแท่นระบายความร้อนด้วยน้ำ คือเครื่องมือสำหรับงานที่ไวต่อความร้อนหรือถูกออกซิเจนยับยั้ง",
          },
        },
      ],
      tables: [
        {
          caption: { en: "Lamp systems", zh: "灯系统一览", vi: "Hệ thống đèn", th: "ระบบหลอด" },
          columns: [
            { en: "Model", zh: "机型", vi: "Model", th: "รุ่น" },
            { en: "Bulb length", zh: "灯管长度", vi: "Chiều dài đèn", th: "ความยาวหลอด" },
            { en: "Power class", zh: "功率等级", vi: "Cấp công suất", th: "ระดับกำลังไฟ" },
            { en: "Power level", zh: "功率调节", vi: "Điều chỉnh công suất", th: "การปรับกำลังไฟ" },
            { en: "Warm start", zh: "热启动", vi: "Khởi động nóng", th: "การสตาร์ทขณะร้อน" },
          ],
          rows: [
            [
              { en: "F300S / F300SQ", zh: "F300S / F300SQ", vi: "F300S / F300SQ", th: "F300S / F300SQ" },
              { en: "15 cm (6\")", zh: "15 cm（6″）", vi: "15 cm (6\")", th: "15 cm (6\")" },
              { en: "120 W/cm (300 W/inch)", zh: "120 W/cm（300 W/英寸）", vi: "120 W/cm (300 W/inch)", th: "120 W/cm (300 W/inch)" },
              { en: "Fixed, or quick restart (optional)", zh: "固定，或快速重启（选配）", vi: "Cố định, hoặc khởi động lại nhanh (tùy chọn)", th: "คงที่ หรือรีสตาร์ทเร็ว (ตัวเลือก)" },
              { en: "5 seconds", zh: "5 秒", vi: "5 giây", th: "5 วินาที" },
            ],
            [
              { en: "F600S", zh: "F600S", vi: "F600S", th: "F600S" },
              { en: "25 cm (10\")", zh: "25 cm（10″）", vi: "25 cm (10\")", th: "25 cm (10\")" },
              { en: "240 W/cm (600 W/inch)", zh: "240 W/cm（600 W/英寸）", vi: "240 W/cm (600 W/inch)", th: "240 W/cm (600 W/inch)" },
              { en: "Dual level (160 / 240 W/cm)", zh: "双档（160 / 240 W/cm）", vi: "Dual level (160 / 240 W/cm)", th: "Dual level (160 / 240 W/cm)" },
              { en: "5 seconds", zh: "5 秒", vi: "5 giây", th: "5 วินาที" },
            ],
            [
              { en: "LightHammer® 6 Mark II", zh: "LightHammer® 6 Mark II", vi: "LightHammer® 6 Mark II", th: "LightHammer® 6 Mark II" },
              { en: "15 cm (6\")", zh: "15 cm（6″）", vi: "15 cm (6\")", th: "15 cm (6\")" },
              { en: "200 W/cm (500 W/inch)", zh: "200 W/cm（500 W/英寸）", vi: "200 W/cm (500 W/inch)", th: "200 W/cm (500 W/inch)" },
              { en: "Variable 35–100%, quick restart", zh: "35–100% 无级可调，快速重启", vi: "Điều chỉnh vô cấp 35–100%, khởi động lại nhanh", th: "ปรับต่อเนื่อง 35–100% รีสตาร์ทเร็ว" },
              { en: "Instantaneous", zh: "瞬时", vi: "Tức thời", th: "ทันที" },
            ],
            [
              { en: "LightHammer® 10 Mark II", zh: "LightHammer® 10 Mark II", vi: "LightHammer® 10 Mark II", th: "LightHammer® 10 Mark II" },
              { en: "25 cm (10\")", zh: "25 cm（10″）", vi: "25 cm (10\")", th: "25 cm (10\")" },
              { en: "240 W/cm (600 W/inch)", zh: "240 W/cm（600 W/英寸）", vi: "240 W/cm (600 W/inch)", th: "240 W/cm (600 W/inch)" },
              { en: "Variable 35–100%, quick restart", zh: "35–100% 无级可调，快速重启", vi: "Điều chỉnh vô cấp 35–100%, khởi động lại nhanh", th: "ปรับต่อเนื่อง 35–100% รีสตาร์ทเร็ว" },
              { en: "Instantaneous", zh: "瞬时", vi: "Tức thời", th: "ทันที" },
            ],
            [
              { en: "LightHammer® 10L Mark II", zh: "LightHammer® 10L Mark II", vi: "LightHammer® 10L Mark II", th: "LightHammer® 10L Mark II" },
              { en: "25 cm (10\")", zh: "25 cm（10″）", vi: "25 cm (10\")", th: "25 cm (10\")" },
              { en: "170 W/cm (410 W/inch)", zh: "170 W/cm（410 W/英寸）", vi: "170 W/cm (410 W/inch)", th: "170 W/cm (410 W/inch)" },
              { en: "Variable 35–100%, quick restart", zh: "35–100% 无级可调，快速重启", vi: "Điều chỉnh vô cấp 35–100%, khởi động lại nhanh", th: "ปรับต่อเนื่อง 35–100% รีสตาร์ทเร็ว" },
              { en: "Instantaneous", zh: "瞬时", vi: "Tức thời", th: "ทันที" },
            ],
            [
              { en: "LightHammer® 10H Mark II", zh: "LightHammer® 10H Mark II", vi: "LightHammer® 10H Mark II", th: "LightHammer® 10H Mark II" },
              { en: "25 cm (10\")", zh: "25 cm（10″）", vi: "25 cm (10\")", th: "25 cm (10\")" },
              { en: "240 W/cm (600 W/inch)", zh: "240 W/cm（600 W/英寸）", vi: "240 W/cm (600 W/inch)", th: "240 W/cm (600 W/inch)" },
              { en: "Variable 35–100%, quick restart", zh: "35–100% 无级可调，快速重启", vi: "Điều chỉnh vô cấp 35–100%, khởi động lại nhanh", th: "ปรับต่อเนื่อง 35–100% รีสตาร์ทเร็ว" },
              { en: "Instantaneous", zh: "瞬时", vi: "Tức thời", th: "ทันที" },
            ],
            [
              { en: "LightHammer® 10 Mark III", zh: "LightHammer® 10 Mark III", vi: "LightHammer® 10 Mark III", th: "LightHammer® 10 Mark III" },
              { en: "25 cm (10\")", zh: "25 cm（10″）", vi: "25 cm (10\")", th: "25 cm (10\")" },
              { en: "240 W/cm (600 W/inch)", zh: "240 W/cm（600 W/英寸）", vi: "240 W/cm (600 W/inch)", th: "240 W/cm (600 W/inch)" },
              { en: "Variable 35–100%", zh: "35–100% 无级可调", vi: "Điều chỉnh vô cấp 35–100%", th: "ปรับต่อเนื่อง 35–100%" },
              { en: "Instantaneous", zh: "瞬时", vi: "Tức thời", th: "ทันที" },
            ],
          ],
          footnote: {
            en: "All models: electrodeless UV lamp, semi-elliptical reflector, 5.3 cm (2.1\") optimum focus distance, unlimited cure width by stacking end to end, optional dichroic reflectors, standard external control. Cold start 15 s (20 s on F300S). Warm-start behaviour depends on duty cycle and power level. Bulbs contain mercury — manage in accordance with local, state or federal disposal laws; intact bulbs may be returned to the manufacturer.",
            zh: "全系列共同特性：无极紫外灯、半椭圆反射器、最佳焦距 5.3 cm（2.1 英寸）、端对端拼接实现固化宽度无限扩展、二向色反射镜选配、标配外部控制接口。冷启动 15 秒（F300S 为 20 秒）。热启动表现取决于占空比与功率等级。灯管含汞——须依据当地、州或联邦法规处置；完好的灯管可退回制造商处理。",
            vi: "Tất cả các model: đèn UV không điện cực, gương phản xạ bán elip, khoảng lấy nét tối ưu 5,3 cm (2,1\"), bề rộng đóng rắn không giới hạn nhờ ghép nối đầu-nối-đầu, gương lưỡng sắc tùy chọn, điều khiển ngoài tiêu chuẩn. Khởi động nguội 15 giây (20 giây với F300S). Đặc tính khởi động nóng phụ thuộc chu kỳ làm việc và cấp công suất. Đèn có chứa thủy ngân — xử lý theo quy định của địa phương, tiểu bang hoặc liên bang; đèn còn nguyên vẹn có thể gửi trả nhà sản xuất.",
            th: "ทุกรุ่น: หลอด UV ไร้ขั้วไฟฟ้า กระจกสะท้อนรูปครึ่งวงรี ระยะโฟกัสที่เหมาะสม 5.3 ซม. (2.1 นิ้ว) ความกว้างการบ่มไม่จำกัดด้วยการต่อเรียงปลายชนปลาย กระจกไดโครอิกเป็นตัวเลือก และการควบคุมจากภายนอกเป็นมาตรฐาน สตาร์ทเย็น 15 วินาที (20 วินาทีสำหรับ F300S) พฤติกรรมการสตาร์ทขณะร้อนขึ้นอยู่กับรอบการทำงานและระดับกำลังไฟ หลอดมีปรอทเป็นส่วนประกอบ — ต้องจัดการตามกฎหมายท้องถิ่น รัฐ หรือรัฐบาลกลาง หลอดที่ยังไม่แตกสามารถส่งคืนผู้ผลิตได้",
          },
        },
        {
          caption: { en: "Bulb fills", zh: "灯管光谱类型", vi: "Chất nạp trong đèn", th: "สารบรรจุในหลอด" },
          columns: [
            { en: "Bulb", zh: "灯管", vi: "Đèn", th: "หลอด" },
            { en: "Spectrum", zh: "光谱特征", vi: "Phổ phát xạ", th: "สเปกตรัม" },
            { en: "Choose it for", zh: "适用方向", vi: "Phù hợp cho", th: "เหมาะสำหรับ" },
          ],
          rows: [
            [
              { en: "H", zh: "H 灯管", vi: "H", th: "H" },
              { en: "Broadband multi-line output across roughly 200–580 nm", zh: "约 200–580 nm 范围内的宽带多谱线输出", vi: "Phổ rộng nhiều vạch trong khoảng 200–580 nm", th: "เอาต์พุตหลายเส้นสเปกตรัมย่านกว้างราว 200–580 nm" },
              { en: "The general-purpose default — standard photoinitiator systems", zh: "通用默认选择——标准光引发剂体系", vi: "Lựa chọn mặc định đa dụng — hệ chất khơi mào quang tiêu chuẩn", th: "ตัวเลือกมาตรฐานสำหรับงานทั่วไป — ระบบโฟโตอินิชิเอเตอร์ทั่วไป" },
            ],
            [
              { en: "D", zh: "D 灯管", vi: "D", th: "D" },
              { en: "Energy concentrated in the 350–400 nm region", zh: "能量集中于 350–400 nm 区间", vi: "Năng lượng tập trung trong vùng 350–400 nm", th: "พลังงานกระจุกตัวในช่วง 350–400 nm" },
              { en: "Thick films and pigmented systems needing depth of cure", zh: "需要深层穿透固化的厚膜与含颜料体系", vi: "Màng dày và hệ có sắc tố cần đóng rắn sâu", th: "ฟิล์มหนาและระบบที่มีเม็ดสีซึ่งต้องการการบ่มลึก" },
            ],
            [
              { en: "V", zh: "V 灯管", vi: "V", th: "V" },
              { en: "Energy concentrated around 400–420 nm", zh: "能量集中于 400–420 nm 附近", vi: "Năng lượng tập trung quanh 400–420 nm", th: "พลังงานกระจุกตัวราว 400–420 nm" },
              { en: "Dark and high-opacity coatings that need long-wave cure", zh: "需要长波固化的深色与高遮盖涂层", vi: "Lớp phủ sẫm màu, độ che phủ cao cần đóng rắn bước sóng dài", th: "สารเคลือบสีเข้มและทึบแสงสูงที่ต้องบ่มด้วยคลื่นยาว" },
            ],
            [
              { en: "H+", zh: "H+ 灯管", vi: "H+", th: "H+" },
              { en: "Enhanced H output", zh: "增强型 H 灯管输出", vi: "Công suất H tăng cường", th: "เอาต์พุตแบบ H ที่เพิ่มกำลัง" },
              { en: "Where a standard H bulb runs out of output", zh: "标准 H 灯管输出不足的场合", vi: "Khi đèn H tiêu chuẩn không đủ công suất", th: "เมื่อหลอด H มาตรฐานให้กำลังไม่พอ" },
            ],
          ],
          footnote: {
            en: "13 mm electrodeless bulbs. Special fill bulbs are available to match the lamp spectrum to an unusual process chemistry.",
            zh: "13 mm 无极灯管。可提供特殊填充灯管，按非常规工艺化学体系匹配灯管光谱。",
            vi: "Đèn không điện cực 13 mm. Có sẵn đèn nạp đặc biệt để khớp phổ đèn với hệ hóa học quy trình không thông dụng.",
            th: "หลอดไร้ขั้วไฟฟ้าขนาด 13 มม. มีหลอดที่บรรจุสารพิเศษให้เลือก เพื่อจับคู่สเปกตรัมกับเคมีของกระบวนการที่ไม่ทั่วไป",
          },
        },
        {
          caption: { en: "UV processing systems", zh: "整线处理系统", vi: "Hệ thống xử lý UV", th: "ระบบประมวลผล UV" },
          columns: [
            { en: "System", zh: "系统类型", vi: "Loại hệ thống", th: "ประเภทระบบ" },
            { en: "Key specifications", zh: "关键规格", vi: "Thông số chính", th: "ข้อมูลจำเพาะหลัก" },
          ],
          rows: [
            [
              { en: "Benchtop conveyor", zh: "台式输送系统", vi: "Băng tải để bàn", th: "สายพานตั้งโต๊ะ" },
              { en: "Belt speeds 0.6–76 m/min (2–250 fpm); lamp rotates, raises and lowers; for laboratory and R&D, rugged enough for pilot plant or production", zh: "皮带速度 0.6–76 m/min（2–250 fpm）；灯头可旋转、升降；面向实验室与研发，亦可用于中试与生产环境", vi: "Tốc độ băng tải 0,6–76 m/phút (2–250 fpm); đèn xoay, nâng và hạ; dành cho phòng thí nghiệm và R&D, đủ bền cho sản xuất thử nghiệm hoặc sản xuất", th: "ความเร็วสายพาน 0.6–76 ม./นาที (2–250 fpm); หลอดหมุน ยกขึ้นและลดลงได้; สำหรับห้องปฏิบัติการและ R&D แข็งแรงพอสำหรับโรงงานนำร่องหรือการผลิต" },
            ],
            [
              { en: "Sheet & part handling", zh: "片材/工件输送系统", vi: "Xử lý tấm & chi tiết", th: "การลำเลียงแผ่น & ชิ้นงาน" },
              { en: "Conveyor 5 cm–3 m wide, to 150 m/min (500 fpm); Teflon®-coated Kevlar®, anti-static Nomex® or stainless belts; water-cooled beds, cold reflectors, nitrogen inerting available", zh: "输送宽度 5 cm–3 m，速度最高 150 m/min（500 fpm）；特氟龙涂层凯夫拉、防静电 Nomex® 或不锈钢皮带；可配水冷台面、冷反射镜、氮气惰化", vi: "Băng tải rộng 5 cm–3 m, tốc độ đến 150 m/phút (500 fpm); băng Kevlar® phủ Teflon®, Nomex® chống tĩnh điện hoặc thép không gỉ; có sẵn bàn làm mát bằng nước, gương phản xạ lạnh và trơ hóa bằng nitơ", th: "สายพานกว้าง 5 ซม.–3 ม. ความเร็วถึง 150 ม./นาที (500 fpm); สายพาน Kevlar® เคลือบ Teflon®, Nomex® ป้องกันไฟฟ้าสถิต หรือสเตนเลส; มีแท่นระบายความร้อนด้วยน้ำ กระจกสะท้อนเย็น และการไล่ออกซิเจนด้วยไนโตรเจนให้เลือก" },
            ],
            [
              { en: "Web systems", zh: "卷材系统", vi: "Hệ thống cuộn", th: "ระบบวัสดุม้วน" },
              { en: "15 cm–6 m wide; nitrogen inerting to 50 ppm O₂; purged and pressurised versions for hazardous locations; full process-control integration and on-line monitoring", zh: "幅宽 15 cm–6 m；氮气惰化可至 50 ppm O₂；危险区域可选正压吹扫型；可与工艺控制系统完整集成并支持在线监测", vi: "Khổ 15 cm–6 m; trơ hóa bằng nitơ đến 50 ppm O₂; bản thổi khí và tăng áp cho khu vực nguy hiểm; tích hợp đầy đủ với hệ điều khiển quy trình và giám sát trực tuyến", th: "ความกว้าง 15 ซม.–6 ม.; ไล่ออกซิเจนด้วยไนโตรเจนถึง 50 ppm O₂; รุ่นเป่าไล่และอัดความดันสำหรับพื้นที่อันตราย; ผสานกับระบบควบคุมกระบวนการเต็มรูปแบบและเฝ้าติดตามออนไลน์" },
            ],
            [
              { en: "Wide-line systems", zh: "宽幅系统", vi: "Hệ thống khổ rộng", th: "ระบบหน้ากว้าง" },
              { en: "Width unlimited — 8-metre systems in production; excellent uniformity across the full width; heat management for thermally sensitive product; nitrogen inerting available", zh: "幅宽不限——已有 8 米系统投产；全幅宽均匀性优异；针对热敏产品提供热管理方案；可配氮气惰化", vi: "Bề rộng không giới hạn — đã có hệ thống 8 mét đang vận hành; độ đồng đều xuất sắc trên toàn bộ khổ; quản lý nhiệt cho sản phẩm nhạy nhiệt; có sẵn trơ hóa bằng nitơ", th: "ความกว้างไม่จำกัด — มีระบบขนาด 8 เมตรใช้งานในการผลิตแล้ว; ความสม่ำเสมอยอดเยี่ยมตลอดหน้ากว้าง; การจัดการความร้อนสำหรับผลิตภัณฑ์ที่ไวต่อความร้อน; มีการไล่ออกซิเจนด้วยไนโตรเจนให้เลือก" },
            ],
            [
              { en: "Wire, cable & fibre", zh: "线缆与光纤系统", vi: "Dây, cáp & sợi quang", th: "สายไฟ เคเบิล & เส้นใยแก้ว" },
              { en: "360° reflector systems for maximum efficiency; high-intensity, well-defined sweet spot for line speed; patented reflector for optical fibre production; nitrogen inerting available", zh: "360° 反射器设计以实现最高效率；高强度、边界清晰的甜点区以提升产线速度；光纤生产专用反射器已获专利；可配氮气惰化", vi: "Hệ gương phản xạ 360° cho hiệu suất tối đa; vùng hội tụ cường độ cao, ranh giới rõ ràng để tăng tốc độ dây chuyền; gương phản xạ được cấp bằng sáng chế cho sản xuất sợi quang; có sẵn trơ hóa bằng nitơ", th: "ระบบกระจกสะท้อน 360° เพื่อประสิทธิภาพสูงสุด; จุดโฟกัสความเข้มสูงที่มีขอบเขตชัดเจนเพื่อเพิ่มความเร็วสายการผลิต; กระจกสะท้อนที่จดสิทธิบัตรสำหรับการผลิตเส้นใยแก้วนำแสง; มีการไล่ออกซิเจนด้วยไนโตรเจนให้เลือก" },
            ],
            [
              { en: "Special product handling", zh: "特殊工件处理系统", vi: "Xử lý sản phẩm đặc biệt", th: "การลำเลียงชิ้นงานพิเศษ" },
              { en: "Static exposure chambers; 3D part curing; rotational or non-rotational cure; robotic part handling", zh: "静态曝光腔；3D 工件固化；旋转或非旋转固化；机器人上下料", vi: "Buồng chiếu tĩnh; đóng rắn chi tiết 3D; đóng rắn có xoay hoặc không xoay; xử lý chi tiết bằng robot", th: "ห้องฉายแสงแบบสถิต; การบ่มชิ้นงาน 3 มิติ; การบ่มแบบหมุนหรือไม่หมุน; การลำเลียงชิ้นงานด้วยหุ่นยนต์" },
            ],
          ],
          footnote: {
            en: "Custom solutions are available for every system type except the benchtop and wire/fibre lines, which are standard configurations.",
            zh: "除台式系统与线缆/光纤系统为标准配置外，其余各类系统均可提供定制方案。",
            vi: "Có giải pháp tùy chỉnh cho mọi loại hệ thống, ngoại trừ dòng để bàn và dòng dây/sợi quang vốn là cấu hình tiêu chuẩn.",
            th: "มีโซลูชันสั่งทำสำหรับระบบทุกประเภท ยกเว้นรุ่นตั้งโต๊ะและรุ่นสายไฟ/เส้นใยแก้ว ซึ่งเป็นคอนฟิกมาตรฐาน",
          },
        },
      ],
    },
    match: (p) => p.tech === "Microwave UV Curing",
  },

  // ───────────────────────── 4. 精密检测仪表 ─────────────────────────
  "uv-measurement": {
    slug: "uv-measurement",
    accent: "#0ea5e9",
    name: { en: "Precision UV Measurement Instruments", zh: "精密检测仪表", vi: "Thiết bị đo UV chính xác", th: "เครื่องมือวัด UV ความแม่นยำสูง" },
    tagline: {
      en: "Radiometers and calibration systems — the instruments that turn a UV process from 'it looked cured' into a documented number.",
      zh: "辐照计与校准系统——把紫外工艺从「看起来固化了」变成可记录数据的仪表。",
      vi: "Thiết bị đo bức xạ và hệ hiệu chuẩn — những công cụ biến quy trình UV từ “trông có vẻ đã đóng rắn” thành một con số có hồ sơ.",
      th: "เครื่องวัดรังสีและระบบสอบเทียบ — เครื่องมือที่เปลี่ยนกระบวนการ UV จาก “ดูเหมือนบ่มแล้ว” ให้เป็นตัวเลขที่บันทึกได้",
    },
    intro: [
      {
        en: "A UV process is only controlled if it is measured. Radiometers verify that the irradiance and dose reaching the bond line are what the process was validated at — before a drifting lamp, a contaminated light guide or a changed working distance turns into a field failure.",
        zh: "紫外工艺唯有可测量，方能可控。辐照计用于验证抵达粘接面的辐照度与剂量是否与工艺验证值一致——避免灯泡衰减、光导污染或工作距离变化演变为现场失效。",
        vi: "Một quy trình UV chỉ được kiểm soát nếu nó được đo. Thiết bị đo bức xạ xác nhận rằng cường độ và liều chiếu tới đường dán đúng bằng giá trị quy trình đã được thẩm định — trước khi một bóng đèn suy giảm, một ống dẫn sáng bị bẩn hay một khoảng cách làm việc bị thay đổi trở thành lỗi ngoài hiện trường.",
        th: "กระบวนการ UV จะถือว่าควบคุมได้ก็ต่อเมื่อมีการวัด เครื่องวัดรังสียืนยันว่าความเข้มและปริมาณแสงที่ไปถึงแนวยึดตรงกับค่าที่กระบวนการผ่านการตรวจรับรองไว้ — ก่อนที่หลอดที่เสื่อมลง ตัวนำแสงที่ปนเปื้อน หรือระยะทำงานที่เปลี่ยนไป จะกลายเป็นความเสียหายในภาคสนาม",
      },
      {
        en: "ETIA supplies the OmniCure® R2000 radiometer for lamp-based spot systems and the LS200 UV LED radiometry and calibration system, both with traceable factory calibration. For regulated medical device and aerospace production, these are what makes your process records defensible in an audit.",
        zh: "ETIA 供应用于灯式点固化系统的 OmniCure® R2000 辐照计，以及 LS200 UV LED 辐照测量与校准系统，均具备可溯源的出厂校准。对于受监管的医疗器械与航空航天生产而言，这正是让工艺记录在审核中站得住脚的依据。",
        vi: "ETIA cung cấp thiết bị đo bức xạ OmniCure® R2000 cho hệ đóng rắn điểm dùng đèn và hệ đo–hiệu chuẩn UV LED LS200, cả hai đều có hiệu chuẩn xuất xưởng truy xuất được. Với sản xuất thiết bị y tế và hàng không vũ trụ chịu quản lý, đây chính là thứ khiến hồ sơ quy trình của bạn đứng vững trong một cuộc đánh giá.",
        th: "ETIA จัดหาเครื่องวัดรังสี OmniCure® R2000 สำหรับระบบบ่มแบบจุดที่ใช้หลอด และระบบวัด–สอบเทียบ UV LED รุ่น LS200 ทั้งสองมาพร้อมการสอบเทียบจากโรงงานที่สอบกลับได้ สำหรับการผลิตอุปกรณ์การแพทย์และอากาศยานที่อยู่ภายใต้การกำกับดูแล นี่คือสิ่งที่ทำให้บันทึกกระบวนการของคุณยืนหยัดได้ในการตรวจประเมิน",
      },
    ],
    applications: [
      { en: "Medical device process validation", zh: "医疗器械工艺验证", vi: "Thẩm định quy trình thiết bị y tế", th: "การตรวจรับรองกระบวนการอุปกรณ์การแพทย์" },
      { en: "Routine production QA checks", zh: "量产例行质量检查", vi: "Kiểm tra chất lượng định kỳ trong sản xuất", th: "การตรวจสอบคุณภาพประจำในการผลิต" },
      { en: "Lamp & LED ageing monitoring", zh: "灯泡与 LED 衰减监控", vi: "Giám sát lão hóa đèn & LED", th: "การเฝ้าติดตามการเสื่อมของหลอด & LED" },
      { en: "Line qualification (IQ/OQ/PQ)", zh: "产线确认（IQ/OQ/PQ）", vi: "Xác nhận dây chuyền (IQ/OQ/PQ)", th: "การรับรองสายการผลิต (IQ/OQ/PQ)" },
      { en: "R&D process development", zh: "研发工艺开发", vi: "Phát triển quy trình R&D", th: "การพัฒนากระบวนการ R&D" },
    ],
    metaTitle: "UV Radiometers & Calibration Instruments | OmniCure R2000, LS200 | ETIA",
    metaDescription:
      "Precision UV measurement instruments — OmniCure R2000 radiometer and LS200 UV LED radiometry and calibration system with traceable calibration, for process validation and production QA. Supplied by ETIA.",
    match: (p) => MEASUREMENT_SLUGS.has(p.slug),
    // Awaiting the customer's own instrument line-up and copy.
    draft: true,
  },

  // ────────────────────────── 5. 红外加热 ──────────────────────────
  "infrared-heating": {
    slug: "infrared-heating",
    accent: "#dc2626",
    name: { en: "Infrared Heating", zh: "红外加热", vi: "Gia nhiệt hồng ngoại", th: "การให้ความร้อนอินฟราเรด" },
    tagline: {
      en: "Noblelight infrared modules — heat delivered into the product, exactly where the process needs it.",
      zh: "Noblelight 红外模块——将热量直接送入产品，精确投放在工艺所需之处。",
      vi: "Mô-đun hồng ngoại Noblelight — nhiệt được đưa thẳng vào sản phẩm, đúng vị trí quy trình cần.",
      th: "โมดูลอินฟราเรด Noblelight — ส่งความร้อนเข้าสู่ผลิตภัณฑ์โดยตรง ตรงจุดที่กระบวนการต้องการ",
    },
    // Overview copy from the Excelitas "Infrared Modules for Industrial
    // Process Technology" brochure. The source text still says "Heraeus" —
    // the pre-acquisition brand — so it reads as Excelitas here.
    intro: [
      {
        en: "Noblelight infrared modules from Excelitas deliver thermal energy in a practical form. This simplifies and accelerates operating stages, optimises energy usage and results in an exceptional finished product. Whether they are large heating fields, tunnels, ovens or individual modules, our modular infrared systems are always precisely matched to your processes and materials — so the infrared heat is supplied in the right amounts, exactly where it is required.",
        zh: "Excelitas 的 Noblelight 红外模块以切实可用的形式输出热能，从而简化并加快工序、优化能耗，并带来出色的成品质量。无论是大型加热面、隧道炉、烘箱还是单个模块，我们的模块化红外系统始终与您的工艺和材料精确匹配——让红外热量以恰当的量，投放在恰当的位置。",
        vi: "Mô-đun hồng ngoại Noblelight của Excelitas cung cấp năng lượng nhiệt ở dạng thiết thực. Điều này đơn giản hóa và đẩy nhanh các công đoạn vận hành, tối ưu hóa việc sử dụng năng lượng và cho ra thành phẩm xuất sắc. Dù là trường gia nhiệt lớn, hầm, lò hay từng mô-đun riêng lẻ, hệ hồng ngoại mô-đun của chúng tôi luôn được khớp chính xác với quy trình và vật liệu của bạn — để nhiệt hồng ngoại được cấp đúng lượng, đúng nơi cần thiết.",
        th: "โมดูลอินฟราเรด Noblelight จาก Excelitas ส่งมอบพลังงานความร้อนในรูปแบบที่ใช้งานได้จริง ซึ่งช่วยลดความยุ่งยากและเร่งขั้นตอนการทำงาน เพิ่มประสิทธิภาพการใช้พลังงาน และให้ผลงานสำเร็จรูปที่ยอดเยี่ยม ไม่ว่าจะเป็นพื้นที่ทำความร้อนขนาดใหญ่ อุโมงค์ เตาอบ หรือโมดูลเดี่ยว ระบบอินฟราเรดแบบโมดูลของเราจับคู่กับกระบวนการและวัสดุของคุณอย่างแม่นยำเสมอ — เพื่อให้ความร้อนอินฟราเรดถูกจ่ายในปริมาณที่เหมาะสม ตรงจุดที่ต้องการพอดี",
      },
      {
        en: "Infrared heat is intelligent heat, because it heats the material precisely and efficiently. Noblelight infrared modules are supplied ready-to-fit and can be integrated directly into the production process, and can be supplied with matching control units and housings — the ideal solution for industrial heating processes.",
        zh: "红外热是「聪明的热」，因为它精确而高效地加热材料本身。Noblelight 红外模块以可直接安装的状态交付，能够直接集成进生产工序，并可配套相应的控制单元与外壳——是工业加热工艺的理想方案。",
        vi: "Nhiệt hồng ngoại là nhiệt thông minh, bởi nó gia nhiệt vật liệu một cách chính xác và hiệu quả. Mô-đun hồng ngoại Noblelight được giao ở trạng thái sẵn sàng lắp đặt và có thể tích hợp trực tiếp vào quy trình sản xuất, đồng thời có thể đi kèm bộ điều khiển và vỏ tương ứng — giải pháp lý tưởng cho các quy trình gia nhiệt công nghiệp.",
        th: "ความร้อนอินฟราเรดคือความร้อนที่ชาญฉลาด เพราะให้ความร้อนแก่วัสดุอย่างแม่นยำและมีประสิทธิภาพ โมดูลอินฟราเรด Noblelight จัดส่งในสภาพพร้อมติดตั้งและผสานเข้ากับกระบวนการผลิตได้โดยตรง อีกทั้งยังจัดหาพร้อมชุดควบคุมและตัวครอบที่เข้าชุดกันได้ — เป็นโซลูชันที่เหมาะที่สุดสำหรับกระบวนการให้ความร้อนในอุตสาหกรรม",
      },
      {
        en: "Our speciality is problem solving. Solutions range from a simple module through to a purpose-built system with control: the simply constructed M series for retrofits and single heating stations, the scalable MX series with integrated control for complete heating systems, and custom-engineered MX solutions built around your geometry. Emitter output, voltage and wavelength are selected for the material actually being heated.",
        zh: "我们的专长是解决问题。方案从单个模块，到带控制系统的专门定制设备：结构简明的 M 系列，适用于改造与单工位加热；带集成控制的 MX 可扩展系列，构成完整加热系统；以及围绕您的几何形状定制开发的 MX 方案。发射器的功率、电压与波长，均依据实际受热材料选定。",
        vi: "Chuyên môn của chúng tôi là giải quyết vấn đề. Giải pháp trải từ một mô-đun đơn giản đến hệ thống chế tạo riêng kèm điều khiển: dòng M cấu tạo đơn giản cho việc cải tạo và trạm gia nhiệt đơn lẻ, dòng MX mở rộng được với điều khiển tích hợp cho hệ gia nhiệt hoàn chỉnh, và giải pháp MX thiết kế riêng theo hình học của bạn. Công suất, điện áp và bước sóng của bộ phát được chọn theo đúng vật liệu thực sự được gia nhiệt.",
        th: "ความเชี่ยวชาญของเราคือการแก้ปัญหา โซลูชันมีตั้งแต่โมดูลเดี่ยวแบบเรียบง่าย ไปจนถึงระบบที่สร้างขึ้นเฉพาะพร้อมระบบควบคุม: ซีรีส์ M ที่มีโครงสร้างเรียบง่ายสำหรับการปรับปรุงและสถานีทำความร้อนเดี่ยว ซีรีส์ MX ที่ขยายได้พร้อมชุดควบคุมในตัวสำหรับระบบทำความร้อนครบชุด และโซลูชัน MX ที่ออกแบบเฉพาะตามรูปทรงของคุณ กำลังไฟ แรงดัน และความยาวคลื่นของหลอดถูกเลือกตามวัสดุที่ได้รับความร้อนจริง",
      },
      {
        en: "ETIA supplies and supports these modules in Asia-Pacific — tell us your process temperature, line speed and product geometry, and our engineers will specify the emitter, module and control system for it.",
        zh: "ETIA 在亚太区提供这些模块的供应与支持——请告知您的工艺温度、产线速度与产品几何形状，我们的工程师将据此确定发射器、模块与控制系统方案。",
        vi: "ETIA cung cấp và hỗ trợ các mô-đun này tại châu Á – Thái Bình Dương — hãy cho chúng tôi biết nhiệt độ quy trình, tốc độ dây chuyền và hình học sản phẩm, kỹ sư của chúng tôi sẽ xác định bộ phát, mô-đun và hệ điều khiển phù hợp.",
        th: "ETIA จัดหาและให้การสนับสนุนโมดูลเหล่านี้ในภูมิภาคเอเชียแปซิฟิก — เพียงแจ้งอุณหภูมิกระบวนการ ความเร็วสายการผลิต และรูปทรงผลิตภัณฑ์ วิศวกรของเราจะกำหนดหลอด โมดูล และระบบควบคุมที่เหมาะสมให้",
      },
    ],
    applications: [
      { en: "Automotive component drying & activation", zh: "汽车零部件干燥与活化", vi: "Sấy & hoạt hóa linh kiện ô tô", th: "การอบแห้ง & กระตุ้นผิวชิ้นส่วนยานยนต์" },
      { en: "Lacquer & coating drying", zh: "涂料与涂层干燥", vi: "Sấy sơn & lớp phủ", th: "การอบแห้งแล็กเกอร์ & สารเคลือบ" },
      { en: "Plastics welding, laminating & embossing", zh: "塑料焊接、层压与压花", vi: "Hàn, ép lớp & dập nổi nhựa", th: "การเชื่อม ลามิเนต & ปั๊มลายพลาสติก" },
      { en: "Glass coating, cutting & mirror backing", zh: "玻璃涂层、切割与镜背处理", vi: "Phủ, cắt kính & tráng gương", th: "การเคลือบ ตัดกระจก & เคลือบหลังกระจกเงา" },
      { en: "Cable, fibre & wire tube ovens", zh: "线缆、光纤与线材管式炉", vi: "Lò ống cho cáp, sợi quang & dây", th: "เตาอบแบบท่อสำหรับเคเบิล เส้นใยแก้ว & ลวด" },
      { en: "Pre-heating before coating or bonding", zh: "涂覆或粘接前预热", vi: "Gia nhiệt sơ bộ trước khi phủ hoặc dán", th: "การอุ่นก่อนเคลือบหรือยึดติด" },
    ],
    metaTitle: "Industrial Infrared Heating Modules | Noblelight M & MX Series | ETIA",
    metaDescription:
      "Excelitas Noblelight infrared heating modules for industrial process technology — M 85, M 110, M 115, scalable MX modules with integrated control, custom MX systems and infrared control systems. Specified to your process by ETIA.",
    docs: [
      {
        file: "Custom MX Infrared Heating Modules Brochure.pdf",
        kind: { en: "Infrared Modules Brochure", zh: "红外模块产品手册", vi: "Brochure mô-đun hồng ngoại", th: "โบรชัวร์โมดูลอินฟราเรด" },
        base: COS_PDF,
      },
    ],
    heroImage: "/images/infrared/emitter-array.jpg",
    gallery: [
      {
        src: "/images/infrared/automotive-body-drying.jpg",
        caption: { en: "Infrared drying of a painted car body", zh: "车身涂装的红外干燥", vi: "Sấy hồng ngoại thân xe đã sơn", th: "การอบแห้งด้วยอินฟราเรดของตัวถังรถที่พ่นสีแล้ว" },
      },
      {
        src: "/images/infrared/mx-scalable-modules.jpg",
        caption: { en: "MX modules in an automotive production line", zh: "汽车产线中的 MX 模块", vi: "Mô-đun MX trên dây chuyền sản xuất ô tô", th: "โมดูล MX ในสายการผลิตยานยนต์" },
      },
      {
        src: "/images/infrared/web-drying-line.jpg",
        caption: { en: "Infrared field drying a continuous web", zh: "连续卷材的红外加热面", vi: "Trường hồng ngoại sấy vật liệu cuộn liên tục", th: "พื้นที่อินฟราเรดอบแห้งวัสดุม้วนต่อเนื่อง" },
      },
      {
        src: "/images/infrared/control-cabinet.jpg",
        caption: { en: "Control and regulation cabinet", zh: "控制与调节柜", vi: "Tủ điều khiển và điều chỉnh", th: "ตู้ควบคุมและปรับค่า" },
      },
    ],
    match: (p) => p.tech === "Infrared Heating",
  },

  // ────────────────────── 6. 分析光源 ──────────────────────
  // Not curing equipment: these are OEM light sources built into someone
  // else's analytical instrument. Sourced from the public Excelitas
  // "High-quality light sources for analytical instruments" brochure.
  "analytical-light-sources": {
    slug: "analytical-light-sources",
    accent: "#0ea5e9",
    name: { en: "Analytical Light Sources", zh: "分析光源", vi: "Nguồn sáng phân tích", th: "แหล่งกำเนิดแสงสำหรับงานวิเคราะห์" },
    tagline: {
      en: "Deuterium, PID and integrated UV-Vis sources — the lamp inside the spectrometer, the chromatograph and the gas detector.",
      zh: "氘灯、PID 灯与一体化 UV-Vis 光源——分光光度计、色谱仪与气体检测仪内部的那只灯。",
      vi: "Nguồn deuterium, PID và mô-đun UV-Vis tích hợp — chiếc đèn bên trong máy quang phổ, máy sắc ký và thiết bị dò khí.",
      th: "แหล่งกำเนิดแสงดิวทีเรียม PID และโมดูล UV-Vis แบบรวม — หลอดที่อยู่ภายในสเปกโตรมิเตอร์ โครมาโทกราฟ และเครื่องตรวจจับแก๊ส",
    },
    intro: [
      {
        en: "An analytical instrument is only as good as its light source. In UV-Vis spectrophotometry and HPLC the detection limit is set by how stable and how intense the lamp is; in photoionisation detection it is set by the photon energy and the purity of the window. These are not accessories bolted on afterwards — they are the component the instrument's specification is written around.",
        zh: "分析仪器的性能上限，取决于它的光源。在 UV-Vis 分光光度法与 HPLC 中，检测限由灯的稳定性与强度决定；在光电离检测中，则由光子能量与窗口材料的纯度决定。这些不是事后加装的配件——而是仪器规格书据以撰写的那个核心部件。",
        vi: "Một thiết bị phân tích chỉ tốt ngang nguồn sáng của nó. Trong quang phổ UV-Vis và HPLC, giới hạn phát hiện được quyết định bởi độ ổn định và cường độ của đèn; trong phát hiện quang ion hóa, nó do năng lượng photon và độ tinh khiết của cửa sổ quyết định. Đây không phải phụ kiện lắp thêm về sau — mà là linh kiện mà bản đặc tả của thiết bị được viết dựa trên nó.",
        th: "เครื่องมือวิเคราะห์จะดีได้เท่าที่แหล่งกำเนิดแสงของมันดี ในสเปกโตรโฟโตเมตรี UV-Vis และ HPLC ขีดจำกัดการตรวจวัดถูกกำหนดด้วยความเสถียรและความเข้มของหลอด ส่วนในการตรวจจับแบบโฟโตไอออไนเซชันถูกกำหนดด้วยพลังงานโฟตอนและความบริสุทธิ์ของวัสดุหน้าต่าง สิ่งเหล่านี้ไม่ใช่อุปกรณ์เสริมที่ติดเพิ่มภายหลัง — แต่เป็นชิ้นส่วนที่ข้อกำหนดของเครื่องมือถูกเขียนขึ้นรอบตัวมัน",
      },
      {
        en: "ETIA supplies the Excelitas analytical range: deuterium lamps of the D2 plus series for HPLC, UHPLC and high-end UV-Vis; photoionisation detector lamps in DC and RF excitation for gas chromatography, mass spectrometry, VOC monitoring and explosives trace detection; and the FiberLight® D2, which packs a deuterium lamp, a tungsten lamp, a shutter, the optics and an SMA connector into one 6 W module for instruments with no room to spare.",
        zh: "ETIA 供应 Excelitas 完整的分析光源产品线：用于 HPLC、UHPLC 与高端 UV-Vis 的 D2 plus 系列氘灯；DC 与 RF 两种激发方式的 PID 光电离检测灯，用于气相色谱、质谱、VOC 监测与爆炸物痕量检测；以及 FiberLight® D2——将氘灯、钨灯、快门、光学系统与 SMA 接口集成于一个 6 W 模块，专为空间紧张的仪器而设计。",
        vi: "ETIA cung cấp trọn dải sản phẩm phân tích của Excelitas: đèn deuterium dòng D2 plus cho HPLC, UHPLC và UV-Vis cao cấp; đèn dò quang ion hóa (PID) kích thích DC và RF cho sắc ký khí, khối phổ, giám sát VOC và phát hiện vết chất nổ; cùng FiberLight® D2 gói đèn deuterium, đèn vonfram, cửa chắn, hệ quang và đầu nối SMA vào một mô-đun 6 W dành cho thiết bị không còn chỗ trống.",
        th: "ETIA จัดหาผลิตภัณฑ์งานวิเคราะห์ของ Excelitas ครบช่วง: หลอดดิวทีเรียมซีรีส์ D2 plus สำหรับ HPLC, UHPLC และ UV-Vis ระดับสูง; หลอด PID แบบกระตุ้น DC และ RF สำหรับแก๊สโครมาโทกราฟี แมสสเปกโตรเมตรี การเฝ้าระวัง VOC และการตรวจหาร่องรอยวัตถุระเบิด; และ FiberLight® D2 ที่รวมหลอดดิวทีเรียม หลอดทังสเตน ชัตเตอร์ ระบบออปติก และขั้วต่อ SMA ไว้ในโมดูลขนาด 6 วัตต์เดียว สำหรับเครื่องมือที่ไม่มีพื้นที่เหลือ",
      },
      {
        en: "Excelitas builds these alongside the OEMs that use them, to the dimensions and performance the instrument requires — and the PID lamps come off the industry's first fully automated production line, which is what lets lamp-to-lamp consistency and short lead times exist at the same time. ETIA handles specification, supply and replacement in Asia-Pacific.",
        zh: "Excelitas 与使用这些光源的 OEM 客户共同开发，按仪器所需的尺寸与性能定制——其中 PID 灯出自业内首条全自动化产线，这正是灯与灯之间的一致性与短交期能够并存的原因。ETIA 在亚太区负责选型、供应与更换。",
        vi: "Excelitas phát triển chúng cùng với chính các OEM sử dụng, theo đúng kích thước và hiệu năng mà thiết bị yêu cầu — và đèn PID được sản xuất trên dây chuyền tự động hóa hoàn toàn đầu tiên của ngành, điều khiến tính đồng nhất giữa các đèn và thời gian giao hàng ngắn cùng tồn tại được. ETIA phụ trách xác định cấu hình, cung ứng và thay thế tại châu Á – Thái Bình Dương.",
        th: "Excelitas พัฒนาผลิตภัณฑ์เหล่านี้ร่วมกับ OEM ที่นำไปใช้ ตามขนาดและสมรรถนะที่เครื่องมือต้องการ — และหลอด PID ผลิตจากสายการผลิตอัตโนมัติเต็มรูปแบบสายแรกของวงการ ซึ่งเป็นเหตุผลที่ความสม่ำเสมอระหว่างหลอดกับระยะเวลาส่งมอบที่สั้นเกิดขึ้นพร้อมกันได้ ETIA ดูแลการกำหนดสเปก การจัดหา และการเปลี่ยนทดแทนในภูมิภาคเอเชียแปซิฟิก",
      },
    ],
    applications: [
      { en: "UV-Vis spectroscopy", zh: "UV-Vis 光谱分析", vi: "Quang phổ UV-Vis", th: "สเปกโทรสโกปี UV-Vis" },
      { en: "HPLC & UHPLC", zh: "HPLC 与 UHPLC", vi: "HPLC & UHPLC", th: "HPLC & UHPLC" },
      { en: "Gas chromatography & mass spectrometry", zh: "气相色谱与质谱", vi: "Sắc ký khí & khối phổ", th: "แก๊สโครมาโทกราฟี & แมสสเปกโตรเมตรี" },
      { en: "Atomic absorption spectroscopy", zh: "原子吸收光谱", vi: "Quang phổ hấp thụ nguyên tử", th: "อะตอมมิกแอบซอร์พชันสเปกโทรสโกปี" },
      { en: "VOC & air quality monitoring", zh: "VOC 与空气质量监测", vi: "Giám sát VOC & chất lượng không khí", th: "การเฝ้าระวัง VOC & คุณภาพอากาศ" },
      { en: "Explosives trace detection", zh: "爆炸物痕量检测", vi: "Phát hiện vết chất nổ", th: "การตรวจหาร่องรอยวัตถุระเบิด" },
      { en: "Water & pollution monitoring", zh: "水质与污染监测", vi: "Giám sát nước & ô nhiễm", th: "การเฝ้าระวังน้ำ & มลพิษ" },
      { en: "Thin layer chromatography & HPCE", zh: "薄层色谱与毛细管电泳", vi: "Sắc ký lớp mỏng & HPCE", th: "ทินเลเยอร์โครมาโทกราฟี & HPCE" },
      { en: "Semiconductor inspection", zh: "半导体检测", vi: "Kiểm tra bán dẫn", th: "การตรวจสอบเซมิคอนดักเตอร์" },
    ],
    metaTitle: "Analytical Light Sources | Deuterium, PID & FiberLight D2 | ETIA",
    metaDescription:
      "Excelitas analytical light sources for instrument OEMs — D2 plus deuterium lamps for HPLC/UHPLC and UV-Vis, PID lamps for GC, MS and VOC detection, and the FiberLight D2 integrated UV-Vis module. Specified and supplied by ETIA.",
    match: (p) => p.tech === "Analytical Light Sources",
  },
};

// Menu / page order — the order the customer specified.
export const PRODUCT_CATEGORY_ORDER: ProductCategorySlug[] = [
  "mercury-uv-lamp",
  "uv-led",
  "microwave-uv-lamp",
  "uv-measurement",
  "infrared-heating",
  "analytical-light-sources",
];

// Every category, drafts included — for the route's static params and for
// anything that must still resolve a draft (e.g. its own page).
export const productCategoryList: ProductCategory[] = PRODUCT_CATEGORY_ORDER.map(
  (slug) => productCategories[slug]
);

// What the site actually shows: menus, grids, cross-links and the sitemap.
export const publishedProductCategories: ProductCategory[] = productCategoryList.filter(
  (c) => !c.draft
);

export function productCategoryHref(slug: ProductCategorySlug): string {
  return `/product/technology/${slug}`;
}

// The catalog models in a category, in catalog order.
export function categoryProducts(slug: ProductCategorySlug): Product[] {
  return products.filter(productCategories[slug].match);
}

// The technology categories a brand actually has products in. Computed from
// the catalog so it stays true as the catalog changes — the four brands cross
// the five categories rather than mapping one-to-one onto them.
export function categoriesForBrand(brandId: Product["brandId"]): ProductCategory[] {
  return publishedProductCategories.filter((c) =>
    products.some((p) => p.brandId === brandId && c.match(p))
  );
}

export function isProductCategorySlug(s: string): s is ProductCategorySlug {
  return s in productCategories;
}

export function productCategoryMetadata(slug: ProductCategorySlug): Metadata {
  const c = productCategories[slug];
  return {
    title: c.metaTitle,
    description: c.metaDescription,
    alternates: { canonical: `${SITE}${productCategoryHref(slug)}` },
    ...(c.draft ? { robots: { index: false, follow: false } } : {}),
  };
}

// Home > Products > {Category}
export function productCategoryBreadcrumbJsonLd(slug: ProductCategorySlug) {
  const c = productCategories[slug];
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE },
      { "@type": "ListItem", position: 2, name: "Products", item: `${SITE}/product` },
      { "@type": "ListItem", position: 3, name: c.name.en, item: `${SITE}${productCategoryHref(slug)}` },
    ],
  };
}
