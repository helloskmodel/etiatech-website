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
  // Photograph for the home page technology card. When absent the card falls
  // back to the first catalogued model that has one, so the row is never empty
  // while a proper technology shot is being prepared.
  cardImage?: string;
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
  // Optional sub-headings for a category whose model list is long enough that a
  // flat grid stops being navigable. Anything a group does not claim falls to
  // the end of the list under no heading, so a new catalog entry can never go
  // missing just because nobody updated the groups.
  groups?: { title: LangText; match: (p: Product) => boolean }[];
  // Not published yet. A draft category is hidden from the menu, the product
  // centre, the home page and the cross-links, and stays out of the sitemap;
  // its page still builds so it can be previewed at its URL, but carries
  // noindex. Clear the flag to publish.
  draft?: boolean;
};

// The two radiometers are catalogued under "UV Spot Curing" because they ship
// with the S-Series spot systems, which is also where they are sold from: they
// belong to the mercury lamp category, alongside the S2000 they calibrate.
// Naming them here lets that category claim them, lets the UV LED category pass
// over them, and orders them after the systems rather than before.
const MEASUREMENT_SLUGS = new Set(["r2000", "ls200"]);

export const productCategories: Record<ProductCategorySlug, ProductCategory> = {
  // ─────────────────────────── 1. 汞灯紫外光源 ───────────────────────────
  "mercury-uv-lamp": {
    slug: "mercury-uv-lamp",
    accent: "#1A56DB",
    name: { en: "UV Spot Curing Systems", zh: "汞灯紫外光源", vi: "Hệ thống đóng rắn UV điểm", th: "ระบบบ่ม UV แบบจุด" },
    tagline: {
      en: "Broad-spectrum mercury lamp UV curing — the proven choice when your adhesive needs full 320–500 nm output.",
      zh: "宽光谱汞灯紫外固化——当胶水需要完整 320–500 nm 输出时，久经验证的选择。",
      vi: "Đóng rắn UV bằng đèn thủy ngân phổ rộng — lựa chọn đã được kiểm chứng khi keo của bạn cần trọn dải 320–500 nm.",
      th: "การบ่ม UV ด้วยหลอดปรอทสเปกตรัมกว้าง — ตัวเลือกที่พิสูจน์แล้วเมื่อกาวของคุณต้องการเอาต์พุตเต็มช่วง 320–500 nm",
    },
    intro: [
      { en: "OmniCure S-Series mercury spot curing — a 250–600 nm broad spectrum, with closed-loop feedback holding the dose constant across lamp life.", zh: "OmniCure S 系列汞灯点固化——250–600 nm 宽光谱，闭环反馈让剂量在灯泡整个寿命内保持恒定。", vi: "Đóng rắn điểm bằng đèn thủy ngân OmniCure S-Series — phổ rộng 250–600 nm, phản hồi vòng kín giữ liều chiếu ổn định suốt tuổi thọ đèn.", th: "การบ่มแบบจุดด้วยหลอดปรอท OmniCure S-Series — สเปกตรัมกว้าง 250–600 nm พร้อมการป้อนกลับวงปิดที่รักษาปริมาณแสงให้คงที่ตลอดอายุหลอด" },
    ],
    applications: [
      { en: "Medical device bonding", zh: "医疗器械粘接", vi: "Liên kết thiết bị y tế", th: "การยึดติดอุปกรณ์การแพทย์" },
      { en: "Catheter & needle assembly", zh: "导管与针头装配", vi: "Lắp ráp ống thông & kim", th: "การประกอบสายสวน & เข็ม" },
      { en: "Electronics assembly", zh: "电子装配", vi: "Lắp ráp điện tử", th: "การประกอบอิเล็กทรอนิกส์" },
      { en: "Optical component bonding", zh: "光学元件粘接", vi: "Liên kết linh kiện quang", th: "การยึดติดชิ้นส่วนออปติก" },
      { en: "Laboratory & R&D curing", zh: "实验室与研发固化", vi: "Đóng rắn trong phòng thí nghiệm & R&D", th: "การบ่มในห้องปฏิบัติการ & R&D" },
      { en: "Dose measurement & calibration", zh: "剂量测量与校准", vi: "Đo liều & hiệu chuẩn", th: "การวัดโดส & การสอบเทียบ" },
    ],
    metaTitle: "UV Spot Curing Systems | OmniCure S2000 & S1500 | ETIA",
    metaDescription:
      "UV spot lamp curing explained: electroded medium-pressure arc lamps (0.4–60 kW, 200–600 nm) versus microwave electrodeless. OmniCure S2000 Elite and S1500 Pro spot curing systems with closed-loop intensity control, genuine lamps and light guides, supplied and serviced by ETIA in Asia-Pacific.",
    match: (p) =>
      (p.tech === "UV Spot Curing" &&
        (p.sub === "UV Lamp Spot" ||
          p.sub === "Replacement Lamp" ||
          p.sub === "S-Series Accessory")) ||
      // The R2000 and LS200 are sold as S2000 companions — dose calibration for
      // the systems above — so they belong on this page rather than nowhere.
      MEASUREMENT_SLUGS.has(p.slug),
  },

  // ─────────────────────────── 2. LED紫外光源 ───────────────────────────
  "uv-led": {
    slug: "uv-led",
    accent: "#41A62A",
    name: { en: "UV LED Curing Systems", zh: "LED紫外光源", vi: "Hệ thống đóng rắn UV LED", th: "ระบบบ่ม UV LED" },
    tagline: {
      en: "From single-point spot heads to 1350 mm production arrays — mercury-free UV LED curing at every scale.",
      zh: "从单点点固化头到 1350 mm 产线阵列——覆盖各种规模的无汞 UV LED 固化。",
      vi: "Từ đầu chiếu điểm đơn đến dàn sản xuất rộng 1350 mm — đóng rắn UV LED không thủy ngân ở mọi quy mô.",
      th: "ตั้งแต่หัวฉายจุดเดียวไปจนถึงอาร์เรย์การผลิตกว้าง 1350 มม. — การบ่ม UV LED ปลอดปรอทในทุกขนาด",
    },
    intro: [
      { en: "Narrow-band LED at 365, 385, 395 or 405 nm — no warm-up, no ozone, no mercury. Single-point heads through to 1350 mm production arrays, air- or water-cooled.", zh: "365/385/395/405 nm 窄带 LED，无预热、无臭氧、无汞。从单点光斑到 1350 mm 产线阵列，风冷水冷齐全。", vi: "LED dải hẹp ở 365, 385, 395 hoặc 405 nm — không cần khởi động, không ozone, không thủy ngân. Từ đầu chiếu điểm đến dàn 1350 mm, làm mát bằng khí hoặc nước.", th: "LED ย่านแคบที่ 365, 385, 395 หรือ 405 nm — ไม่ต้องอุ่นเครื่อง ไม่มีโอโซน ไม่มีปรอท ตั้งแต่หัวฉายแบบจุดจนถึงแถวยาว 1350 มม. ระบายความร้อนด้วยอากาศหรือน้ำ" },
    ],
    applications: [
      { en: "Optical module & transceiver assembly", zh: "光模块与光收发器装配", vi: "Lắp ráp mô-đun quang & bộ thu phát", th: "การประกอบออปติคัลโมดูล & ทรานซีฟเวอร์" },
      { en: "Semiconductor & advanced packaging", zh: "半导体与先进封装", vi: "Bán dẫn & đóng gói tiên tiến", th: "เซมิคอนดักเตอร์ & แพ็กเกจขั้นสูง" },
      { en: "Display & OCA bonding", zh: "显示与 OCA 贴合", vi: "Liên kết màn hình & OCA", th: "การประกบจอแสดงผล & OCA" },
      { en: "PCB conformal coating", zh: "PCB 三防漆涂覆", vi: "Phủ bảo vệ PCB", th: "การเคลือบป้องกัน PCB" },
      { en: "Optical fibre coating & marking", zh: "光纤涂覆与标识", vi: "Phủ & đánh dấu sợi quang", th: "การเคลือบ & ทำเครื่องหมายเส้นใยแก้วนำแสง" },
      { en: "Printing, coating & packaging", zh: "印刷、涂层与包装", vi: "In ấn, phủ & bao bì", th: "งานพิมพ์ เคลือบ & บรรจุภัณฑ์" },
    ],
    groups: [
      {
        title: { en: "UV LED Spot Curing Systems", zh: "UV LED 点固化系统", vi: "Hệ thống đóng rắn điểm UV LED", th: "ระบบบ่มแบบจุด UV LED" },
        match: (p) => p.tech === "UV Spot Curing",
      },
      {
        title: { en: "UV LED Air-Cooled Systems", zh: "UV LED 风冷系统", vi: "Hệ thống UV LED làm mát bằng không khí", th: "ระบบ UV LED ระบายความร้อนด้วยอากาศ" },
        match: (p) => p.tech === "Air-Cooled UV LED Curing",
      },
      {
        title: { en: "UV LED Water-Cooled Systems", zh: "UV LED 水冷系统", vi: "Hệ thống UV LED làm mát bằng nước", th: "ระบบ UV LED ระบายความร้อนด้วยน้ำ" },
        match: (p) => p.tech === "Water-Cooled UV LED Area Curing",
      },
    ],
    metaTitle: "UV LED Curing Systems | Spot, Air-Cooled & Water-Cooled | ETIA",
    metaDescription:
      "UV LED curing systems at 365/385/395/405 nm — OmniCure LX spot and AC Series, Phoseon FireEdge, FireJet and FireLine, Noblelight Semray water-cooled arrays to 1350 mm. Application-matched and supported by ETIA.",
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
    name: { en: "Microwave UV Curing Systems", zh: "微波无极灯", vi: "Hệ thống đóng rắn UV vi sóng", th: "ระบบบ่ม UV ไมโครเวฟ" },
    tagline: {
      en: "Fusion UV® microwave-powered curing — no electrodes to erode, 200–600 nm broad spectrum, and unlimited cure width by stacking lamps end to end.",
      zh: "Fusion UV® 微波无极紫外固化——无电极损耗、200–600 nm 宽光谱，灯头端对端拼接实现固化宽度无限扩展。",
      vi: "Đóng rắn bằng vi sóng Fusion UV® — không có điện cực để mòn, phổ rộng 200–600 nm, và bề rộng đóng rắn không giới hạn nhờ ghép nối các đèn đầu-nối-đầu.",
      th: "การบ่มด้วยพลังไมโครเวฟ Fusion UV® — ไม่มีขั้วไฟฟ้าให้สึกกร่อน สเปกตรัมกว้าง 200–600 nm และความกว้างการบ่มไม่จำกัดด้วยการต่อหลอดเรียงกัน",
    },
    intro: [
      { en: "Fusion UV microwave-powered electrodeless lamps — no electrodes to erode. A 200–600 nm broad spectrum, and cure width extended without limit by butting lamps end to end.", zh: "Fusion UV 微波激发无极灯，没有电极可损耗。200–600 nm 宽光谱，灯管首尾相接即可无限拓宽固化幅面。", vi: "Đèn không điện cực kích thích vi sóng Fusion UV — không có điện cực bị ăn mòn. Phổ rộng 200–600 nm, nối đèn liền nhau để mở rộng bề rộng đóng rắn không giới hạn.", th: "หลอดไร้ขั้วไฟฟ้ากระตุ้นด้วยไมโครเวฟจาก Fusion UV — ไม่มีขั้วไฟฟ้าให้สึกกร่อน สเปกตรัมกว้าง 200–600 nm และขยายความกว้างการบ่มได้ไม่จำกัดด้วยการต่อหลอดเรียงกัน" },
    ],
    applications: [
      { en: "Automotive headlamps", zh: "汽车大灯", vi: "Đèn pha ô tô", th: "ไฟหน้ารถยนต์" },
      { en: "Flooring", zh: "地板材料", vi: "Vật liệu sàn", th: "วัสดุปูพื้น" },
      { en: "Medical devices", zh: "医疗器械", vi: "Thiết bị y tế", th: "อุปกรณ์การแพทย์" },
      { en: "Wire marking", zh: "线缆打标", vi: "Đánh dấu dây cáp", th: "การทำเครื่องหมายสายไฟ" },
      { en: "Electronic components", zh: "电子元器件", vi: "Linh kiện điện tử", th: "ชิ้นส่วนอิเล็กทรอนิกส์" },
      { en: "Optical fibre production", zh: "光纤生产", vi: "Sản xuất sợi quang", th: "การผลิตเส้นใยแก้วนำแสง" },
      { en: "Printing, coating & converting", zh: "印刷、涂层与加工", vi: "In ấn, phủ & gia công", th: "งานพิมพ์ เคลือบ & แปรรูป" },
      { en: "Wood & furniture lacquer curing", zh: "木器与家具涂料固化", vi: "Đóng rắn sơn gỗ & nội thất", th: "การบ่มแล็กเกอร์ไม้ & เฟอร์นิเจอร์" },
      { en: "Metal coating & finishing", zh: "金属涂层与表面处理", vi: "Phủ & hoàn thiện bề mặt kim loại", th: "การเคลือบ & ตกแต่งผิวโลหะ" },
      { en: "Powder coating cure on MDF board", zh: "MDF 板粉末涂层固化", vi: "Đóng rắn lớp phủ bột trên ván MDF", th: "การบ่มสารเคลือบผงบนแผ่น MDF" },
    ],
    metaTitle: "Microwave UV Curing Systems | Fusion UV F Series & LightHammer | ETIA",
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

  // ────────────────────────── 5. 红外加热 ──────────────────────────
  "infrared-heating": {
    slug: "infrared-heating",
    accent: "#dc2626",
    name: { en: "Infrared Heating Systems", zh: "红外加热", vi: "Hệ thống gia nhiệt hồng ngoại", th: "ระบบให้ความร้อนอินฟราเรด" },
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
      { en: "Noblelight infrared modules put the heat into the product rather than the room. Match the emitter spectrum to the material's absorption and it heats faster, on less energy.", zh: "Noblelight 红外模块把热直接送进产品，而不是烘整个空间。发射器光谱与材料吸收光谱匹配，升温更快、能耗更低。", vi: "Mô-đun hồng ngoại Noblelight đưa nhiệt vào sản phẩm chứ không vào không gian. Khớp phổ phát xạ với phổ hấp thụ của vật liệu thì nóng nhanh hơn và tốn ít năng lượng hơn.", th: "โมดูลอินฟราเรดของ Noblelight ส่งความร้อนเข้าสู่ตัวผลิตภัณฑ์ ไม่ใช่ทั้งห้อง เมื่อจับคู่สเปกตรัมของตัวเปล่งกับการดูดกลืนของวัสดุ วัสดุจะร้อนเร็วขึ้นและใช้พลังงานน้อยลง" },
    ],
    applications: [
      { en: "Automotive component drying & activation", zh: "汽车零部件干燥与活化", vi: "Sấy & hoạt hóa linh kiện ô tô", th: "การอบแห้ง & กระตุ้นผิวชิ้นส่วนยานยนต์" },
      { en: "Lacquer & coating drying", zh: "涂料与涂层干燥", vi: "Sấy sơn & lớp phủ", th: "การอบแห้งแล็กเกอร์ & สารเคลือบ" },
      { en: "Plastics welding, laminating & embossing", zh: "塑料焊接、层压与压花", vi: "Hàn, ép lớp & dập nổi nhựa", th: "การเชื่อม ลามิเนต & ปั๊มลายพลาสติก" },
      { en: "Glass coating, cutting & mirror backing", zh: "玻璃涂层、切割与镜背处理", vi: "Phủ, cắt kính & tráng gương", th: "การเคลือบ ตัดกระจก & เคลือบหลังกระจกเงา" },
      { en: "Cable, fibre & wire tube ovens", zh: "线缆、光纤与线材管式炉", vi: "Lò ống cho cáp, sợi quang & dây", th: "เตาอบแบบท่อสำหรับเคเบิล เส้นใยแก้ว & ลวด" },
      { en: "Pre-heating before coating or bonding", zh: "涂覆或粘接前预热", vi: "Gia nhiệt sơ bộ trước khi phủ hoặc dán", th: "การอุ่นก่อนเคลือบหรือยึดติด" },
      { en: "Gelling powder coating on MDF board", zh: "MDF 板粉末涂层胶化", vi: "Làm keo hóa lớp phủ bột trên ván MDF", th: "การทำให้สารเคลือบผงเจลบนแผ่น MDF" },
      { en: "Heating before laminating or embossing", zh: "层压或压花前加热", vi: "Gia nhiệt trước khi ép lớp hoặc dập nổi", th: "การให้ความร้อนก่อนลามิเนตหรือปั๊มลาย" },
      { en: "Residual moisture removal in wood processing", zh: "木材加工残余水分去除", vi: "Loại bỏ độ ẩm dư trong gia công gỗ", th: "การกำจัดความชื้นตกค้างในการแปรรูปไม้" },
      { en: "Preheating for alloy application & reflow", zh: "合金涂覆与回流前预热", vi: "Gia nhiệt sơ bộ khi phủ hợp kim & hàn reflow", th: "การอุ่นก่อนการเคลือบโลหะผสม & รีโฟลว์" },
      { en: "Printing ink drying", zh: "印刷油墨干燥", vi: "Sấy mực in", th: "การอบแห้งหมึกพิมพ์" },
      { en: "Paper, cardboard & non-woven heating", zh: "纸张、纸板与无纺布加热", vi: "Gia nhiệt giấy, bìa carton & vải không dệt", th: "การให้ความร้อนกระดาษ กระดาษแข็ง & ผ้าไม่ทอ" },
    ],
    metaTitle: "Infrared Heating Systems | Noblelight M & MX Series | ETIA",
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
    selectionGuide: {
      heading: { en: "Which lamp for which measurement", zh: "哪种测量用哪种灯", vi: "Đèn nào cho phép đo nào", th: "หลอดชนิดใดสำหรับการวัดแบบใด" },
      standfirst: { en: "Excelitas indexes its analytical range by measurement technique rather than by lamp. The table below is that index: find the method your instrument runs, and it names the light source families built for it.", zh: "Excelitas 的分析光源是按测量方法索引的，而不是按灯型。下表就是这个索引：找到你的仪器所用的方法，即可看到为它设计的光源类别。", vi: "Excelitas lập chỉ mục dải sản phẩm phân tích theo kỹ thuật đo chứ không theo loại đèn. Bảng dưới đây chính là chỉ mục đó: tìm phương pháp thiết bị của bạn đang chạy, bảng sẽ chỉ ra các họ nguồn sáng được thiết kế cho nó.", th: "Excelitas จัดทำดัชนีผลิตภัณฑ์งานวิเคราะห์ตามเทคนิคการวัด ไม่ใช่ตามชนิดหลอด ตารางด้านล่างคือดัชนีนั้น: ค้นหาวิธีที่เครื่องมือของคุณใช้ แล้วตารางจะระบุตระกูลแหล่งกำเนิดแสงที่ออกแบบมาเพื่อวิธีนั้น" },
      steps: [
        {
          title: { en: "FiberLight® — when the instrument has to move", zh: "FiberLight® —— 当仪器需要移动", vi: "FiberLight® — khi thiết bị phải di chuyển", th: "FiberLight® — เมื่อเครื่องมือต้องเคลื่อนที่" },
          body: { en: "Reach for the FiberLight family when the constraint is space and power rather than ultimate sensitivity — portable, handheld or battery-driven instruments. L3 is a broadband UV LED covering 250–490 nm from a single emitter, under 1.5 W. D2 is a full UV-Vis module: deuterium plus tungsten lamp, shutter, optics and SMA 905 connector on one 6 W board, switching instantly on with stable output.", zh: "当制约条件是空间与功耗、而非极限灵敏度时，选 FiberLight 系列——便携式、手持式或电池供电仪器。L3 是宽谱 UV LED，单颗发光体覆盖 250–490 nm，功耗低于 1.5 W。D2 则是完整的 UV-Vis 模块：氘灯加钨灯、快门、光学系统与 SMA 905 接口集成在一块 6 W 电路板上，瞬时点亮且输出稳定。", vi: "Chọn dòng FiberLight khi ràng buộc là không gian và công suất chứ không phải độ nhạy tối đa — thiết bị xách tay, cầm tay hoặc chạy pin. L3 là UV LED dải rộng phủ 250–490 nm từ một nguồn phát duy nhất, dưới 1,5 W. D2 là mô-đun UV-Vis đầy đủ: đèn deuterium cùng đèn vonfram, cửa chắn, hệ quang và đầu nối SMA 905 trên một bo mạch 6 W, bật tức thì với đầu ra ổn định.", th: "เลือกตระกูล FiberLight เมื่อข้อจำกัดคือพื้นที่และกำลังไฟ ไม่ใช่ความไวสูงสุด — เครื่องมือแบบพกพา มือถือ หรือใช้แบตเตอรี่ L3 เป็น UV LED สเปกตรัมกว้างครอบคลุม 250–490 nm จากตัวเปล่งแสงเดียว ใช้กำลังต่ำกว่า 1.5 วัตต์ ส่วน D2 เป็นโมดูล UV-Vis เต็มรูปแบบ: หลอดดิวทีเรียมพร้อมหลอดทังสเตน ชัตเตอร์ ระบบออปติก และขั้วต่อ SMA 905 บนบอร์ด 6 วัตต์เดียว เปิดติดทันทีพร้อมเอาต์พุตที่เสถียร" },
        },
        {
          title: { en: "PID lamps — when you are detecting a gas", zh: "PID 灯 —— 当你检测的是气体", vi: "Đèn PID — khi bạn phát hiện chất khí", th: "หลอด PID — เมื่อคุณกำลังตรวจจับแก๊ส" },
          body: { en: "Every gas-phase method on the list runs on a PID lamp. Selection is by photon energy: the lamp is offered from 8.4 to 10.6 eV, and a compound only ionises if its ionisation energy sits below the lamp's photon energy — styrene at 8.4 eV, benzene at 9.24, isopropanol at 10.10, pentane at 10.34. A lower photon energy buys selectivity; a higher one buys coverage.", zh: "表中所有气相方法都用 PID 灯。选型依据是光子能量：灯的可选范围为 8.4 至 10.6 eV，只有电离能低于灯光子能量的化合物才会被电离——苯乙烯 8.4 eV、苯 9.24、异丙醇 10.10、戊烷 10.34。光子能量低则选择性好，高则覆盖面广。", vi: "Mọi phương pháp pha khí trong bảng đều dùng đèn PID. Việc chọn dựa trên năng lượng photon: đèn có từ 8,4 đến 10,6 eV, và một hợp chất chỉ bị ion hóa nếu năng lượng ion hóa của nó thấp hơn năng lượng photon của đèn — styrene 8,4 eV, benzene 9,24, isopropanol 10,10, pentane 10,34. Năng lượng photon thấp cho tính chọn lọc; cao cho độ bao phủ.", th: "ทุกวิธีในเฟสแก๊สในตารางใช้หลอด PID การเลือกอิงตามพลังงานโฟตอน: หลอดมีให้ตั้งแต่ 8.4 ถึง 10.6 eV และสารจะแตกตัวเป็นไอออนก็ต่อเมื่อพลังงานไอออไนเซชันของมันต่ำกว่าพลังงานโฟตอนของหลอด — สไตรีน 8.4 eV เบนซีน 9.24 ไอโซโพรพานอล 10.10 เพนเทน 10.34 พลังงานโฟตอนต่ำให้ความจำเพาะ สูงให้ความครอบคลุม" },
        },
        {
          title: { en: "Deuterium lamps — the UV workhorse", zh: "氘灯 —— 紫外的主力", vi: "Đèn deuterium — chủ lực vùng UV", th: "หลอดดิวทีเรียม — ตัวหลักของย่าน UV" },
          body: { en: "Deuterium covers more of the table than any other family: liquid chromatography, UV-Vis, TLC, HPCE, semiconductor inspection, and background correction in AAS. The choice within the range is the envelope — UV glass cuts off at 185 nm, high-transmission synthetic quartz at 160 nm — plus a 0.5 or 1.0 mm aperture for more focused intensity, and a see-through version if the instrument would otherwise need a moveable mirror or beam splitter.", zh: "氘灯覆盖表中最多的方法：液相色谱、UV-Vis、薄层色谱、毛细管电泳、半导体检测，以及原子吸收中的背景校正。系列内的选择在于壳体——UV 玻璃截止于 185 nm，高透过率合成石英截止于 160 nm；此外还有 0.5 或 1.0 mm 光阑以获得更集中的强度，以及在仪器原本需要动镜或分光镜时可选的直通式版本。", vi: "Deuterium bao phủ nhiều mục trong bảng hơn bất kỳ họ nào khác: sắc ký lỏng, UV-Vis, TLC, HPCE, kiểm tra bán dẫn và hiệu chỉnh nền trong AAS. Lựa chọn trong dải là lớp vỏ — kính UV cắt tại 185 nm, thạch anh tổng hợp truyền quang cao tại 160 nm — cùng khẩu độ 0,5 hoặc 1,0 mm cho cường độ tập trung hơn, và bản xuyên suốt nếu thiết bị lẽ ra cần gương di động hoặc bộ chia chùm.", th: "ดิวทีเรียมครอบคลุมรายการในตารางมากกว่าตระกูลใด: โครมาโทกราฟีของเหลว UV-Vis TLC HPCE การตรวจสอบเซมิคอนดักเตอร์ และการแก้ไขพื้นหลังใน AAS ตัวเลือกภายในช่วงคือหลอดแก้ว — กระจก UV ตัดที่ 185 nm ควอตซ์สังเคราะห์ส่งผ่านสูงที่ 160 nm — พร้อมรูรับแสง 0.5 หรือ 1.0 มม. เพื่อความเข้มที่รวมศูนย์กว่า และรุ่นแบบมองทะลุหากเครื่องมือจำเป็นต้องใช้กระจกเคลื่อนที่หรือบีมสปลิตเตอร์" },
        },
        {
          title: { en: "Hollow cathode lamps — chosen by element", zh: "空心阴极灯 —— 按元素选", vi: "Đèn cathode rỗng — chọn theo nguyên tố", th: "หลอดแคโทดกลวง — เลือกตามธาตุ" },
          body: { en: "In AAS the cathode is made from the element you are measuring, so the lamp is selected by element, not by specification: 70 single-element lamps in 37 mm and 50 mm. For routine work across several elements in one sample — alloys, for instance — multi-element lamps combine two to seven elements, offered only where the energy and lifetime hold up and the lines do not interfere. Data-coded versions exist for PerkinElmer and Thermo Fisher Scientific instruments.", zh: "在原子吸收中，阴极就是用你要测的那个元素做的，因此灯是按元素而不是按规格选：单元素灯 70 种，直径 37 mm 与 50 mm。若一个样品中要常规测多个元素——比如合金——则用多元素灯，可组合 2 至 7 种元素，且仅在能量与寿命足够、谱线互不干扰时才提供。PerkinElmer 与 Thermo Fisher Scientific 的仪器另有数据编码版本。", vi: "Trong AAS, cathode được làm từ chính nguyên tố bạn đo, nên đèn được chọn theo nguyên tố chứ không theo thông số: 70 đèn đơn nguyên tố, đường kính 37 mm và 50 mm. Với công việc thường quy đo nhiều nguyên tố trong cùng một mẫu — hợp kim chẳng hạn — đèn đa nguyên tố kết hợp từ hai đến bảy nguyên tố, chỉ được cung cấp khi năng lượng và tuổi thọ đủ và các vạch phổ không nhiễu nhau. Có bản mã hóa dữ liệu cho thiết bị PerkinElmer và Thermo Fisher Scientific.", th: "ใน AAS แคโทดทำจากธาตุที่คุณกำลังวัด หลอดจึงถูกเลือกตามธาตุ ไม่ใช่ตามสเปก: หลอดธาตุเดี่ยว 70 ชนิด ขนาด 37 มม. และ 50 มม. สำหรับงานประจำที่วัดหลายธาตุในตัวอย่างเดียว เช่น โลหะผสม หลอดหลายธาตุผสมได้ตั้งแต่สองถึงเจ็ดธาตุ และเสนอเฉพาะกรณีที่พลังงานและอายุการใช้งานเพียงพอและเส้นสเปกตรัมไม่รบกวนกัน มีรุ่นเข้ารหัสข้อมูลสำหรับเครื่อง PerkinElmer และ Thermo Fisher Scientific" },
        },
      ],
      tables: [
        {
          caption: { en: "Measurement technique to light source family", zh: "测量方法与光源类别对照", vi: "Kỹ thuật đo và họ nguồn sáng", th: "เทคนิคการวัดกับตระกูลแหล่งกำเนิดแสง" },
          columns: [
            { en: "Technique", zh: "方法", vi: "Kỹ thuật", th: "เทคนิค" },
            { en: "FiberLight®", zh: "FiberLight®", vi: "FiberLight®", th: "FiberLight®" },
            { en: "PID", zh: "PID", vi: "PID", th: "PID" },
            { en: "Deuterium", zh: "氘灯", vi: "Deuterium", th: "ดิวทีเรียม" },
            { en: "Hollow cathode", zh: "空心阴极灯", vi: "Cathode rỗng", th: "แคโทดกลวง" },
          ],
          rows: [
        [{ en: "Atomic absorption spectroscopy", zh: "原子吸收光谱", vi: "Quang phổ hấp thụ nguyên tử", th: "อะตอมมิกแอบซอร์พชันสเปกโทรสโกปี" }, { en: "—", zh: "—", vi: "—", th: "—" }, { en: "—", zh: "—", vi: "—", th: "—" }, { en: "●", zh: "●", vi: "●", th: "●" }, { en: "●", zh: "●", vi: "●", th: "●" }],
        [{ en: "Atomic fluorescence spectroscopy", zh: "原子荧光光谱", vi: "Quang phổ huỳnh quang nguyên tử", th: "อะตอมมิกฟลูออเรสเซนซ์สเปกโทรสโกปี" }, { en: "—", zh: "—", vi: "—", th: "—" }, { en: "—", zh: "—", vi: "—", th: "—" }, { en: "—", zh: "—", vi: "—", th: "—" }, { en: "●", zh: "●", vi: "●", th: "●" }],
        [{ en: "Emergency first response", zh: "应急处置", vi: "Ứng phó khẩn cấp", th: "การตอบสนองเหตุฉุกเฉิน" }, { en: "—", zh: "—", vi: "—", th: "—" }, { en: "●", zh: "●", vi: "●", th: "●" }, { en: "—", zh: "—", vi: "—", th: "—" }, { en: "—", zh: "—", vi: "—", th: "—" }],
        [{ en: "Exhaust monitoring", zh: "尾气监测", vi: "Giám sát khí thải", th: "การเฝ้าระวังไอเสีย" }, { en: "—", zh: "—", vi: "—", th: "—" }, { en: "●", zh: "●", vi: "●", th: "●" }, { en: "●", zh: "●", vi: "●", th: "●" }, { en: "—", zh: "—", vi: "—", th: "—" }],
        [{ en: "Gas chromatography (GC)", zh: "气相色谱（GC）", vi: "Sắc ký khí (GC)", th: "แก๊สโครมาโทกราฟี (GC)" }, { en: "—", zh: "—", vi: "—", th: "—" }, { en: "●", zh: "●", vi: "●", th: "●" }, { en: "—", zh: "—", vi: "—", th: "—" }, { en: "—", zh: "—", vi: "—", th: "—" }],
        [{ en: "High performance capillary electrophoresis (HPCE)", zh: "高效毛细管电泳（HPCE）", vi: "Điện di mao quản hiệu năng cao (HPCE)", th: "แคปิลลารีอิเล็กโทรโฟรีซิสสมรรถนะสูง (HPCE)" }, { en: "—", zh: "—", vi: "—", th: "—" }, { en: "—", zh: "—", vi: "—", th: "—" }, { en: "●", zh: "●", vi: "●", th: "●" }, { en: "—", zh: "—", vi: "—", th: "—" }],
        [{ en: "HPLC + UHPLC", zh: "HPLC 与 UHPLC", vi: "HPLC + UHPLC", th: "HPLC + UHPLC" }, { en: "—", zh: "—", vi: "—", th: "—" }, { en: "—", zh: "—", vi: "—", th: "—" }, { en: "●", zh: "●", vi: "●", th: "●" }, { en: "—", zh: "—", vi: "—", th: "—" }],
        [{ en: "Leak detection", zh: "泄漏检测", vi: "Phát hiện rò rỉ", th: "การตรวจหารอยรั่ว" }, { en: "—", zh: "—", vi: "—", th: "—" }, { en: "●", zh: "●", vi: "●", th: "●" }, { en: "—", zh: "—", vi: "—", th: "—" }, { en: "—", zh: "—", vi: "—", th: "—" }],
        [{ en: "Mass spectrometry (MS)", zh: "质谱（MS）", vi: "Khối phổ (MS)", th: "แมสสเปกโตรเมตรี (MS)" }, { en: "—", zh: "—", vi: "—", th: "—" }, { en: "●", zh: "●", vi: "●", th: "●" }, { en: "—", zh: "—", vi: "—", th: "—" }, { en: "—", zh: "—", vi: "—", th: "—" }],
        [{ en: "Personnel safety in confined spaces", zh: "受限空间人员安全", vi: "An toàn nhân sự trong không gian hạn chế", th: "ความปลอดภัยของบุคลากรในพื้นที่อับอากาศ" }, { en: "—", zh: "—", vi: "—", th: "—" }, { en: "●", zh: "●", vi: "●", th: "●" }, { en: "—", zh: "—", vi: "—", th: "—" }, { en: "—", zh: "—", vi: "—", th: "—" }],
        [{ en: "Pollution monitors", zh: "污染监测仪", vi: "Thiết bị giám sát ô nhiễm", th: "เครื่องเฝ้าระวังมลพิษ" }, { en: "●", zh: "●", vi: "●", th: "●" }, { en: "●", zh: "●", vi: "●", th: "●" }, { en: "●", zh: "●", vi: "●", th: "●" }, { en: "—", zh: "—", vi: "—", th: "—" }],
        [{ en: "Process control", zh: "过程控制", vi: "Kiểm soát quy trình", th: "การควบคุมกระบวนการ" }, { en: "●", zh: "●", vi: "●", th: "●" }, { en: "—", zh: "—", vi: "—", th: "—" }, { en: "●", zh: "●", vi: "●", th: "●" }, { en: "—", zh: "—", vi: "—", th: "—" }],
        [{ en: "Semiconductor inspection", zh: "半导体检测", vi: "Kiểm tra bán dẫn", th: "การตรวจสอบเซมิคอนดักเตอร์" }, { en: "—", zh: "—", vi: "—", th: "—" }, { en: "—", zh: "—", vi: "—", th: "—" }, { en: "●", zh: "●", vi: "●", th: "●" }, { en: "—", zh: "—", vi: "—", th: "—" }],
        [{ en: "Thin layer chromatography (TLC)", zh: "薄层色谱（TLC）", vi: "Sắc ký lớp mỏng (TLC)", th: "ทินเลเยอร์โครมาโทกราฟี (TLC)" }, { en: "—", zh: "—", vi: "—", th: "—" }, { en: "—", zh: "—", vi: "—", th: "—" }, { en: "●", zh: "●", vi: "●", th: "●" }, { en: "—", zh: "—", vi: "—", th: "—" }],
        [{ en: "UV-Vis spectroscopy", zh: "UV-Vis 光谱分析", vi: "Quang phổ UV-Vis", th: "สเปกโทรสโกปี UV-Vis" }, { en: "●", zh: "●", vi: "●", th: "●" }, { en: "—", zh: "—", vi: "—", th: "—" }, { en: "●", zh: "●", vi: "●", th: "●" }, { en: "—", zh: "—", vi: "—", th: "—" }],
          ],
          footnote: { en: "Source: Excelitas, High-quality light sources for analytical instruments (Inhouse XNG 05/25), applications index.", zh: "来源：Excelitas《High-quality light sources for analytical instruments》（Inhouse XNG 05/25）应用索引。", vi: "Nguồn: Excelitas, High-quality light sources for analytical instruments (Inhouse XNG 05/25), chỉ mục ứng dụng.", th: "ที่มา: Excelitas, High-quality light sources for analytical instruments (Inhouse XNG 05/25) ดัชนีการใช้งาน" },
        },
      ],
    },
    metaTitle: "Analytical Light Sources | Deuterium, PID & FiberLight D2 | ETIA",
    metaDescription:
      "Excelitas analytical light sources for instrument OEMs — D2 plus deuterium lamps for HPLC/UHPLC and UV-Vis, PID lamps for GC, MS and VOC detection, and the FiberLight D2 integrated UV-Vis module. Specified and supplied by ETIA.",
    match: (p) => p.tech === "Analytical Light Sources",
    // Held back from launch at the customer's request, alongside the precision
    // measurement category that was removed. The content and the models stay in
    // place — clear the flag to publish.
    draft: true,
  },
};

// Menu / page order — the order the customer specified.
export const PRODUCT_CATEGORY_ORDER: ProductCategorySlug[] = [
  "mercury-uv-lamp",
  "uv-led",
  "microwave-uv-lamp",
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

// A category's models split under its sub-headings, in group order, with any
// model no group claims appended under an empty title. Categories without
// groups return a single untitled group, so callers need only one code path.
export function categoryModelGroups(
  slug: ProductCategorySlug
): { title: LangText | null; items: Product[] }[] {
  const all = categoryProducts(slug);
  const groups = productCategories[slug].groups;
  if (!groups) return [{ title: null, items: all }];
  const claimed = new Set<string>();
  const out = groups.map((g) => {
    const items = all.filter((p) => g.match(p));
    items.forEach((p) => claimed.add(p.slug));
    return { title: g.title, items };
  }).filter((g) => g.items.length > 0);
  const rest = all.filter((p) => !claimed.has(p.slug));
  return rest.length > 0 ? [...out, { title: null, items: rest }] : out;
}

// The catalog models in a category, in catalog order — except that the two
// radiometers read last. They are companions to the systems they calibrate, and
// catalog order would otherwise open the mercury lamp page with them.
export function categoryProducts(slug: ProductCategorySlug): Product[] {
  const list = products.filter(productCategories[slug].match);
  return [
    ...list.filter((p) => !MEASUREMENT_SLUGS.has(p.slug)),
    ...list.filter((p) => MEASUREMENT_SLUGS.has(p.slug)),
  ];
}

// A brand's models grouped for its shop grid, in category order and then by
// the category's own sub-headings — which for OmniCure comes out as UV Spot
// Curing, UV LED Spot Curing and UV LED Air-Cooled, the split a customer of
// that brand actually thinks in.
//
// Draft categories are included here on purpose: the flag hides a category
// page, not the models, and they are still sold from the brand page.
export function brandModelGroups(
  brandId: Product["brandId"]
): { title: LangText; items: Product[] }[] {
  const out: { title: LangText; items: Product[] }[] = [];
  for (const c of productCategoryList) {
    const mine = categoryProducts(c.slug).filter((p) => p.brandId === brandId);
    if (mine.length === 0) continue;
    if (!c.groups) {
      out.push({ title: c.name, items: mine });
      continue;
    }
    const claimed = new Set<string>();
    for (const g of c.groups) {
      const items = mine.filter((p) => g.match(p));
      items.forEach((p) => claimed.add(p.slug));
      if (items.length > 0) out.push({ title: g.title, items });
    }
    const rest = mine.filter((p) => !claimed.has(p.slug));
    if (rest.length > 0) out.push({ title: c.name, items: rest });
  }
  return out;
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
