import type { Metadata } from "next";
import { seoDescription, seoTitle } from "@/components/seoText";
import type { LangText } from "@/components/LocaleContext";
import type { ProductCategorySlug } from "@/components/productCategories";
import { applicationsData } from "@/data/applicationsData";
import type { Application } from "@/data/applicationTypes";

const SITE = "https://www.etiatech.com";

// ─────────────────────────────────────────────────────────────────────────
// ETIA's five industry solutions.
//
// The counterpart to the product categories: customers who don't know which
// light source they need arrive by industry instead. Each industry page is an
// indexable hub that states the bonding problems in that sector, points at the
// product categories that solve them, and lists the application notes below.
//
// `applicationSlugs` re-groups the existing application notes under the five
// industries. It is an explicit list rather than a rule over
// `industryCategory`, because the old five categories don't map one-to-one
// onto these — see docs/PROJECT-STATUS.md.
// ─────────────────────────────────────────────────────────────────────────

export type IndustrySlug =
  | "optical-modules"
  | "optical-fiber"
  | "semiconductor"
  | "automotive"
  | "medical-device"
  | "scientific-instruments";

export type IndustrySolution = {
  slug: IndustrySlug;
  accent: string;
  name: LangText;
  tagline: LangText;
  intro: LangText[];
  // The bonding / curing processes ETIA is asked about in this sector.
  processes: { title: LangText; body: LangText }[];
  // Optional: the specific parts or devices this sector brings us, shown as
  // chips. Populated where there is published material naming them.
  applications?: LangText[];
  // Product categories to steer this industry's visitors towards, in order.
  recommends: ProductCategorySlug[];
  // Photograph for the home page industry card. Nothing to fall back to here —
  // an industry has no catalogue model of its own — so a card without one
  // renders as a tinted tile until the picture arrives.
  cardImage?: string;
  // Application notes belonging to this industry, in display order.
  applicationSlugs: string[];
  metaTitle: string;
  metaDescription: string;
  // Not published yet — same contract as a draft product category: hidden
  // from the menu, the home page and the cross-links, out of the sitemap,
  // previewable at its URL with noindex.
  draft?: boolean;
};

export const industrySolutions: Record<IndustrySlug, IndustrySolution> = {
  // ────────────────────────── 1. 光模块行业 ──────────────────────────
  "optical-modules": {
    slug: "optical-modules",
    accent: "#0ea5e9",
    name: { en: "Optical Modules", zh: "光模块行业", vi: "Mô-đun quang", th: "ออปติคัลโมดูล" },
    tagline: {
      en: "400G to 1.6T transceivers, co-packaged optics and fibre arrays — sub-micron bonds that must not move.",
      zh: "400G 至 1.6T 光模块、共封装光学与光纤阵列——亚微米级、不允许位移的粘接。",
      vi: "Bộ thu phát 400G đến 1.6T, quang đồng gói và mảng sợi quang — các mối dán dưới micron không được phép xê dịch.",
      th: "ทรานซีฟเวอร์ 400G ถึง 1.6T ออปติกแบบโคแพ็กเกจ และอาร์เรย์เส้นใยแก้ว — รอยยึดระดับต่ำกว่าไมครอนที่ต้องไม่ขยับ",
    },
    intro: [
      {
        en: "In an optical transceiver, alignment is the product. A fibre array bonded a micron out of position costs insertion loss you can never recover, so the adhesive has to lock at the aligned position and stay there through reflow, thermal cycling and years in a hot switch cabinet.",
        zh: "在光模块中，对准精度就是产品本身。光纤阵列若偏离对准位置一微米，所造成的插入损耗将无法挽回。因此胶粘剂必须在对准位置瞬间锁定，并在回流焊、温度循环及交换机机柜内数年高温运行中保持稳定。",
        vi: "Trong một bộ thu phát quang, sự căn chỉnh chính là sản phẩm. Một mảng sợi quang dán lệch một micron sẽ gây tổn hao xen mà bạn không bao giờ lấy lại được, nên keo phải khóa đúng ở vị trí đã căn chỉnh và giữ nguyên qua reflow, chu trình nhiệt và nhiều năm trong tủ switch nóng.",
        th: "ในทรานซีฟเวอร์เชิงแสง การจัดแนวคือตัวผลิตภัณฑ์ อาร์เรย์เส้นใยแก้วที่ยึดผิดตำแหน่งไปหนึ่งไมครอนทำให้เกิดการสูญเสียการแทรกที่กู้คืนไม่ได้ กาวจึงต้องล็อกที่ตำแหน่งที่จัดแนวไว้และคงอยู่ตรงนั้นตลอดการรีโฟลว์ การวนรอบอุณหภูมิ และการใช้งานหลายปีในตู้สวิตช์ที่ร้อน",
      },
      {
        en: "That is a UV curing problem before it is an adhesive problem: cure too slowly and the alignment drifts; cure unevenly and shrinkage pulls the fibre off axis. ETIA specifies the spot head, wavelength and dose profile so the bond fixtures in the sub-second window your active alignment station allows.",
        zh: "这首先是紫外固化问题，其次才是胶水问题：固化过慢，对准会漂移；固化不均，收缩应力会将光纤拉离轴心。ETIA 为您选定点固化灯头、波长与剂量曲线，使粘接在主动对准工位所允许的亚秒级窗口内完成定位固定。",
        vi: "Đó là bài toán đóng rắn UV trước khi là bài toán keo dán: đóng rắn quá chậm thì căn chỉnh trôi; đóng rắn không đều thì co ngót kéo sợi quang lệch trục. ETIA xác định đầu chiếu điểm, bước sóng và biên dạng liều chiếu để mối dán được định vị trong khoảng dưới một giây mà trạm căn chỉnh chủ động của bạn cho phép.",
        th: "นี่คือโจทย์ของการบ่ม UV ก่อนจะเป็นโจทย์ของกาว: บ่มช้าเกินไปแนวจัดวางจะเคลื่อน บ่มไม่สม่ำเสมอแรงหดตัวจะดึงเส้นใยออกนอกแกน ETIA กำหนดหัวฉายแบบจุด ความยาวคลื่น และโปรไฟล์ปริมาณแสง เพื่อให้รอยยึดถูกตรึงภายในช่วงเวลาไม่ถึงหนึ่งวินาทีตามที่สถานีจัดแนวแบบแอ็กทีฟของคุณเปิดให้",
      },
    ],
    processes: [
      {
        title: { en: "Fibre array & V-groove bonding", zh: "光纤阵列与 V 型槽粘接", vi: "Liên kết mảng sợi quang & rãnh chữ V", th: "การยึดติดอาร์เรย์เส้นใยแก้ว & ร่องรูปตัววี" },
        body: {
          en: "Sub-second tack at the aligned position, then full cure — without pulling the fibre off axis.",
          zh: "在对准位置亚秒级定位固化，再完成整体固化——且不将光纤拉离轴心。",
          vi: "Định vị dưới một giây tại vị trí đã căn chỉnh, rồi đóng rắn hoàn toàn — mà không kéo sợi quang lệch trục.",
          th: "ตรึงตำแหน่งภายในเสี้ยววินาที ณ ตำแหน่งที่จัดแนวไว้ แล้วจึงบ่มเต็มที่ — โดยไม่ดึงเส้นใยออกนอกแกน",
        },
      },
      {
        title: { en: "Lens & isolator attach", zh: "透镜与隔离器贴装", vi: "Gắn thấu kính & bộ cách ly", th: "การติดตั้งเลนส์ & ไอโซเลเตอร์" },
        body: {
          en: "Low-outgassing cures that keep the optical path clean over the module's service life.",
          zh: "低逸气固化，在模块服役期内保持光路洁净。",
          vi: "Đóng rắn ít thoát khí, giữ đường quang sạch trong suốt vòng đời mô-đun.",
          th: "การบ่มที่ปล่อยแก๊สต่ำ ช่วยรักษาเส้นทางแสงให้สะอาดตลอดอายุการใช้งานของโมดูล",
        },
      },
      {
        title: { en: "Co-packaged optics assembly", zh: "共封装光学装配", vi: "Lắp ráp quang đồng gói", th: "การประกอบออปติกแบบโคแพ็กเกจ" },
        body: {
          en: "Localised UV energy next to temperature-sensitive ASICs and photonic dies.",
          zh: "在温度敏感的 ASIC 与光子芯片旁实现局部紫外能量投放。",
          vi: "Năng lượng UV cục bộ ngay cạnh ASIC và die quang tử nhạy nhiệt.",
          th: "พลังงาน UV เฉพาะจุดข้าง ASIC และไดโฟโตนิกที่ไวต่ออุณหภูมิ",
        },
      },
      {
        title: { en: "Connector termination", zh: "连接器端接", vi: "Đầu nối sợi quang", th: "การเข้าหัวคอนเนกเตอร์" },
        body: {
          en: "Fast, repeatable ferrule bonding for high-volume patch cord and connector production.",
          zh: "快速、可重复的插芯粘接，适用于大批量跳线与连接器生产。",
          vi: "Dán ferrule nhanh và lặp lại được cho sản xuất dây nhảy và đầu nối sản lượng lớn.",
          th: "การยึดเฟอร์รูลอย่างรวดเร็วและทำซ้ำได้ สำหรับการผลิตแพตช์คอร์ดและคอนเนกเตอร์ปริมาณมาก",
        },
      },
      {
        title: { en: "Fibre draw & recoat", zh: "光纤拉丝与再涂覆", vi: "Kéo sợi & phủ lại", th: "การดึงเส้นใย & เคลือบซ้ำ" },
        body: {
          en: "High-intensity 360° curing of primary and secondary coatings at draw-tower line speeds.",
          zh: "在拉丝塔产线速度下，对一次与二次涂层进行 360° 高强度固化。",
          vi: "Đóng rắn 360° cường độ cao cho lớp phủ sơ cấp và thứ cấp ở tốc độ tháp kéo sợi.",
          th: "การบ่ม 360° ความเข้มสูงสำหรับชั้นเคลือบปฐมภูมิและทุติยภูมิ ที่ความเร็วของหอดึงเส้นใย",
        },
      },
    ],
    recommends: ["uv-led", "mercury-uv-lamp"],
    cardImage: "https://etiatech-1303055923.cos.ap-singapore.myqcloud.com/IMAGE/INDUSTRY/CPO",
    applicationSlugs: [
      "uv-curing-optical-transceiver-manufacturing",
      "uv-curing-co-packaged-optics-fiber-array-bonding",
      "uv-curing-photonic-integrated-circuit-packaging",
    ],
    metaTitle: "UV Curing for Optical Modules & Transceivers | 400G–1.6T | ETIA",
    metaDescription:
      "UV curing solutions for optical module manufacturing — fibre array bonding, co-packaged optics, lens attach, connector termination and fibre draw coating. Sub-micron alignment retention, specified by ETIA's engineers.",
  },

  // ────────────────────────── 2. 光纤与线缆 ──────────────────────────
  // Split out of optical modules: a draw tower and a cable plant are a
  // different customer from a transceiver line, and fibre is the one place
  // the AC9225-F exists for.
  "optical-fiber": {
    slug: "optical-fiber",
    accent: "#0d9488",
    cardImage: "https://etiatech-1303055923.cos.ap-singapore.myqcloud.com/IMAGE/case%20studies%20/0501-fiber-cable.jpg",
    name: { en: "Optical Fiber & Cable", zh: "光纤与线缆", vi: "Sợi quang & cáp", th: "เส้นใยแก้วนำแสง & สายเคเบิล" },
    tagline: {
      en: "Draw-tower coating, ribboning, termination and cable marking — 360° cure at line speed.",
      zh: "拉丝塔涂覆、带纤、端接与线缆标识——产线速度下的 360° 固化。",
      vi: "Phủ tháp kéo sợi, ghép băng, đầu nối và đánh dấu cáp — đóng rắn 360° ở tốc độ dây chuyền.",
      th: "การเคลือบที่หอดึงเส้นใย การทำริบบอน การเข้าหัว และการทำเครื่องหมายสายเคเบิล — บ่ม 360° ที่ความเร็วสายการผลิต",
    },
    intro: [
      {
        en: "A draw tower does not slow down for the UV lamp. Primary and secondary coatings have to cure fully, all the way round, at the speed the fibre is moving — or the line runs slower than the tower was bought for.",
        zh: "拉丝塔不会为紫外灯减速。一次、二次涂层必须在光纤走线速度下全周向固化透——否则产线跑不到塔的设计速度。",
        vi: "Tháp kéo sợi không chậm lại vì đèn UV. Lớp phủ sơ cấp và thứ cấp phải đóng rắn hoàn toàn, quanh chu vi, ở đúng tốc độ sợi đang chạy — nếu không dây chuyền chạy chậm hơn mức tháp được mua để làm.",
        th: "หอดึงเส้นใยไม่ชะลอเพื่อหลอด UV ชั้นเคลือบปฐมภูมิและทุติยภูมิต้องบ่มเต็มที่รอบเส้นที่ความเร็วเดิม — ไม่เช่นนั้นสายการผลิตจะช้ากว่าที่ซื้อหอมาทำ",
      },
      {
        en: "ETIA specifies the fibre-optimised LED head, its face-to-face arrangement and the dose at working distance, and supports the connector and splice work downstream with spot systems.",
        zh: "ETIA 选定光纤专用 LED 灯头、对射布置与工作距离下的剂量，后段的连接器端接与熔接保护则由点光源系统承接。",
        vi: "ETIA xác định đầu LED tối ưu cho sợi quang, cách bố trí đối diện và liều ở khoảng cách làm việc, và hỗ trợ khâu đầu nối, bảo vệ mối hàn phía sau bằng hệ thống điểm.",
        th: "ETIA กำหนดหัว LED ที่ปรับให้เหมาะกับเส้นใย การจัดวางแบบหันหน้าเข้าหากัน และปริมาณที่ระยะทำงาน พร้อมรองรับงานเข้าหัวและป้องกันจุดต่อปลายน้ำด้วยระบบจุด",
      },
    ],
    processes: [
      {
        title: { en: "Draw-tower primary & secondary coating", zh: "拉丝塔一次 / 二次涂覆", vi: "Phủ sơ cấp & thứ cấp tại tháp kéo", th: "การเคลือบปฐมภูมิ & ทุติยภูมิที่หอดึง" },
        body: {
          en: "Face-to-face AC9225-F heads: up to 88 W/cm² at the fibre, 10–18 mm working distance, 40,000 h LED life.",
          zh: "AC9225-F 对射布置：光纤处最高 88 W/cm²，工作距离 10–18 mm，LED 寿命 40,000 小时。",
          vi: "Đầu AC9225-F đối diện: tới 88 W/cm² tại sợi, khoảng cách làm việc 10–18 mm, tuổi thọ LED 40.000 h.",
          th: "หัว AC9225-F แบบหันหน้าเข้าหากัน: สูงถึง 88 W/cm² ที่เส้นใย ระยะทำงาน 10–18 มม. อายุ LED 40,000 ชม.",
        },
      },
      {
        title: { en: "Ribbon & tight-buffer coating", zh: "带纤与紧套涂覆", vi: "Phủ băng sợi & lớp đệm chặt", th: "การเคลือบริบบอน & ทิกต์บัฟเฟอร์" },
        body: {
          en: "Even cure across a ribbon width; heads adjoin without a uniformity gap.",
          zh: "整幅带纤均匀固化；多灯头拼接无均匀性断点。",
          vi: "Đóng rắn đều trên toàn bề rộng băng; các đầu ghép nối không có khe hụt đồng đều.",
          th: "บ่มสม่ำเสมอทั่วความกว้างริบบอน หัวต่อกันได้โดยไม่มีช่องว่างความสม่ำเสมอ",
        },
      },
      {
        title: { en: "Connector termination & splice protection", zh: "连接器端接与熔接保护", vi: "Đầu nối & bảo vệ mối hàn", th: "การเข้าหัวคอนเนกเตอร์ & ป้องกันจุดต่อ" },
        body: {
          en: "Repeatable ferrule bonding and recoat with the S2000 Elite or LX500, radiometer-verified.",
          zh: "S2000 Elite 或 LX500 完成可重复的插芯粘接与再涂覆，辐射计验证剂量。",
          vi: "Dán ferrule và phủ lại lặp lại được bằng S2000 Elite hoặc LX500, xác nhận bằng máy đo bức xạ.",
          th: "การยึดเฟอร์รูลและเคลือบซ้ำอย่างทำซ้ำได้ด้วย S2000 Elite หรือ LX500 ตรวจสอบด้วยเรดิโอมิเตอร์",
        },
      },
      {
        title: { en: "Cable marking & ribboning inks", zh: "线缆标识与带纤油墨", vi: "Mực đánh dấu cáp & ghép băng", th: "หมึกทำเครื่องหมายสายเคเบิล & ริบบอน" },
        body: {
          en: "UV-curable inks fixed inline by air-cooled LED heads, no solvent, no oven.",
          zh: "UV 油墨由风冷 LED 灯头在线固化，无溶剂、无烘箱。",
          vi: "Mực UV được cố định trên dây chuyền bằng đầu LED làm mát khí, không dung môi, không lò.",
          th: "หมึก UV ถูกบ่มในไลน์ด้วยหัว LED ระบายอากาศ ไม่มีตัวทำละลาย ไม่มีเตาอบ",
        },
      },
    ],
    recommends: ["uv-led", "mercury-uv-lamp"],
    applicationSlugs: [
      "uv-led-curing-optical-fiber-draw-tower-coating",
      "uv-spot-curing-fiber-optic-connector-termination",
    ],
    metaTitle: "UV Curing for Optical Fiber & Cable Manufacturing | Draw Tower, Ribbon, Termination | ETIA",
    metaDescription:
      "UV curing for fibre and cable plants — draw-tower primary and secondary coating with the fibre-optimised OmniCure AC9225-F, ribbon and tight-buffer coating, connector termination and splice protection, cable marking inks. Specified by ETIA's engineers.",
  },

  // ────────────────────────── 2. 半导体行业 ──────────────────────────
  semiconductor: {
    slug: "semiconductor",
    accent: "#1A56DB",
    name: { en: "Semiconductor & Electronics", zh: "半导体行业", vi: "Bán dẫn & điện tử", th: "เซมิคอนดักเตอร์ & อิเล็กทรอนิกส์" },
    tagline: {
      en: "Advanced packaging, display bonding and PCB protection — UV curing next to die that cannot take heat.",
      zh: "先进封装、显示贴合与 PCB 防护——在无法承受热应力的芯片旁完成紫外固化。",
      vi: "Đóng gói tiên tiến, liên kết màn hình và bảo vệ PCB — đóng rắn UV ngay cạnh die không chịu được nhiệt.",
      th: "แพ็กเกจขั้นสูง การประกบจอแสดงผล และการป้องกัน PCB — การบ่ม UV ข้างไดที่ทนความร้อนไม่ได้",
    },
    intro: [
      {
        en: "Semiconductor and electronics assembly keeps asking the same question: how do you cure an adhesive fast, next to a die, a sensor or a flex circuit that will not tolerate the heat of a thermal cure. UV LED answers it — the energy goes into the photoinitiator, not into the substrate.",
        zh: "半导体与电子装配始终面临同一个问题：如何在芯片、传感器或柔性电路旁快速固化胶粘剂，而这些元件无法承受热固化的温度。UV LED 给出了答案——能量进入光引发剂，而非基材。",
        vi: "Ngành lắp ráp bán dẫn và điện tử luôn đặt ra cùng một câu hỏi: làm sao đóng rắn keo thật nhanh ngay cạnh một die, một cảm biến hay một mạch dẻo vốn không chịu nổi nhiệt của quá trình đóng rắn nhiệt. UV LED trả lời câu hỏi đó — năng lượng đi vào chất khơi mào quang, không đi vào vật liệu nền.",
        th: "งานประกอบเซมิคอนดักเตอร์และอิเล็กทรอนิกส์ตั้งคำถามเดิมเสมอ: จะบ่มกาวให้เร็วได้อย่างไร ในตำแหน่งที่อยู่ติดกับได เซ็นเซอร์ หรือวงจรอ่อนที่ทนความร้อนจากการบ่มด้วยความร้อนไม่ได้ UV LED คือคำตอบ — พลังงานเข้าสู่โฟโตอินิชิเอเตอร์ ไม่ใช่เข้าสู่วัสดุฐาน",
      },
      {
        en: "From wafer-level underfill dams and advanced packaging to OCA display lamination, conformal coating and component staking, ETIA matches the source to the geometry: spot heads for point bonds, small-area arrays for sub-assemblies, and wide arrays for panel and web lines.",
        zh: "从晶圆级底部填充围坝、先进封装，到 OCA 显示贴合、三防漆涂覆与元件加固，ETIA 依据几何形状匹配光源：点固化头用于点位粘接，小面积阵列用于子组件，宽幅阵列用于面板与卷材产线。",
        vi: "Từ đê chắn underfill cấp wafer và đóng gói tiên tiến, đến ép lớp màn hình OCA, phủ bảo vệ và cố định linh kiện, ETIA khớp nguồn sáng với hình học: đầu chiếu điểm cho mối dán điểm, dàn diện tích nhỏ cho cụm con, và dàn rộng cho dây chuyền tấm và cuộn.",
        th: "ตั้งแต่เขื่อนกั้นอันเดอร์ฟิลระดับเวเฟอร์และแพ็กเกจขั้นสูง ไปจนถึงการลามิเนตจอ OCA การเคลือบป้องกัน และการยึดชิ้นส่วน ETIA จับคู่แหล่งกำเนิดแสงกับรูปทรงงาน: หัวฉายแบบจุดสำหรับรอยยึดเฉพาะจุด อาร์เรย์พื้นที่เล็กสำหรับชิ้นงานย่อย และอาร์เรย์หน้ากว้างสำหรับสายการผลิตแบบแผ่นและแบบม้วน",
      },
    ],
    processes: [
      {
        title: { en: "Advanced packaging & underfill dams", zh: "先进封装与底填围坝", vi: "Đóng gói tiên tiến & đê chắn underfill", th: "แพ็กเกจขั้นสูง & เขื่อนกั้นอันเดอร์ฟิล" },
        body: {
          en: "Precise, localised cures that fix dam geometry without thermally stressing the die.",
          zh: "精确的局部固化，在不对芯片造成热应力的前提下固定围坝几何形状。",
          vi: "Đóng rắn cục bộ chính xác, cố định hình dạng đê chắn mà không gây ứng suất nhiệt lên die.",
          th: "การบ่มเฉพาะจุดอย่างแม่นยำ ตรึงรูปทรงเขื่อนกั้นโดยไม่สร้างความเค้นเชิงความร้อนแก่ได",
        },
      },
      {
        title: { en: "Display OCA & edge sealing", zh: "显示 OCA 与边框封装", vi: "OCA màn hình & niêm mép", th: "OCA จอแสดงผล & การซีลขอบ" },
        body: {
          en: "Uniform large-area dose for optically clear adhesive lamination and OLED edge seals.",
          zh: "均匀的大面积剂量，用于光学透明胶贴合与 OLED 边缘封装。",
          vi: "Liều chiếu đồng đều trên diện rộng cho ép lớp keo trong suốt quang học và niêm mép OLED.",
          th: "ปริมาณแสงสม่ำเสมอบนพื้นที่กว้าง สำหรับการลามิเนตกาวใสเชิงแสงและการซีลขอบ OLED",
        },
      },
      {
        title: { en: "PCB conformal coating", zh: "PCB 三防漆涂覆", vi: "Phủ bảo vệ PCB", th: "การเคลือบป้องกัน PCB" },
        body: {
          en: "Seconds-scale cure of protective coatings, in line, with no oven footprint.",
          zh: "在线秒级固化防护涂层，无需烘箱占地。",
          vi: "Đóng rắn lớp phủ bảo vệ trong vài giây, ngay trên dây chuyền, không chiếm chỗ cho lò.",
          th: "บ่มสารเคลือบป้องกันภายในไม่กี่วินาที บนสายการผลิต โดยไม่ต้องใช้พื้นที่วางเตาอบ",
        },
      },
      {
        title: { en: "Component staking & wire tacking", zh: "元件加固与线材点胶固定", vi: "Cố định linh kiện & ghim dây", th: "การยึดชิ้นส่วน & การตรึงสายไฟ" },
        body: {
          en: "Vibration-proof anchoring of tall components and loose wires on populated boards.",
          zh: "在已贴装板卡上对高元件与散线进行防振锚固。",
          vi: "Cố định chống rung cho linh kiện cao và dây rời trên bo mạch đã gắn linh kiện.",
          th: "การยึดกันสั่นสะเทือนสำหรับชิ้นส่วนสูงและสายไฟที่หลุดลอยบนบอร์ดที่ประกอบแล้ว",
        },
      },
      {
        title: { en: "Potting & encapsulation", zh: "灌封与封装", vi: "Đổ keo & bao phủ bảo vệ", th: "การหล่อเรซิน & การห่อหุ้ม" },
        body: {
          en: "UV-cure encapsulants that protect assemblies without long thermal dwell times.",
          zh: "紫外固化封装材料，无需长时间热固化即可保护组件。",
          vi: "Vật liệu bao phủ đóng rắn UV, bảo vệ cụm lắp ráp mà không cần thời gian giữ nhiệt kéo dài.",
          th: "วัสดุห่อหุ้มชนิดบ่มด้วย UV ที่ปกป้องชิ้นงานประกอบโดยไม่ต้องแช่ความร้อนนาน",
        },
      },
    ],
    recommends: ["uv-led", "mercury-uv-lamp"],
    cardImage: "https://etiatech-1303055923.cos.ap-singapore.myqcloud.com/IMAGE/INDUSTRY/PCB%20",
    applicationSlugs: [
      "uv-curing-advanced-semiconductor-packaging",
      "uv-led-curing-display-module-oca-bonding",
      "uv-led-curing-oled-panel-edge-sealing",
      "uv-led-curing-pcb-conformal-coating",
      "uv-led-curing-wire-tacking-component-staking",
      "uv-curing-electronics-potting-encapsulation",
      "uv-curing-micro-speaker-assembly",
    ],
    metaTitle: "UV Curing for Semiconductor & Electronics Assembly | ETIA",
    metaDescription:
      "UV curing for semiconductor and electronics manufacturing — advanced packaging, underfill dams, display OCA bonding, OLED edge sealing, PCB conformal coating, staking and potting. Low-thermal UV LED systems from ETIA.",
  },

  // ────────────────────────── 3. 汽车行业 ──────────────────────────
  automotive: {
    slug: "automotive",
    accent: "#f59e0b",
    name: { en: "Automotive", zh: "汽车", vi: "Ô tô", th: "ยานยนต์" },
    tagline: {
      en: "Sensors, displays, interior trim and battery assembly — bonds that survive a decade in a car, made at line takt.",
      zh: "传感器、显示屏、内饰件与电池装配——在整车上要撑十年的粘接，且必须在节拍内完成。",
      vi: "Cảm biến, màn hình, nội thất và lắp ráp pin — những mối dán trụ được cả thập kỷ trên xe, thực hiện theo nhịp dây chuyền.",
      th: "เซ็นเซอร์ จอแสดงผล ชิ้นส่วนภายใน และการประกอบแบตเตอรี่ — รอยยึดที่ต้องอยู่ได้สิบปีในรถ และทำได้ทันจังหวะสายการผลิต",
    },
    intro: [
      {
        en: "A modern car is held together by adhesive as much as by fasteners. Camera and LiDAR modules are aligned and bonded, displays are bonded rather than clipped, trim panels carry light guides and ambient lighting, and battery components are joined next to cells that must not be heated. Every one of those joints has to survive a decade of heat soak, humidity and vibration — while being made at line takt.",
        zh: "现代汽车靠胶粘剂结合的部位，已不亚于靠紧固件。摄像头与激光雷达模组需要对准后粘接，显示屏由粘接取代卡扣固定，饰板集成了导光件与氛围灯，电池部件则要在不能受热的电芯旁完成连接。而每一处接合都必须在十年的高温暴晒、湿热与振动中保持可靠——同时还要在产线节拍内完成。",
        vi: "Một chiếc xe hiện đại được giữ với nhau bằng keo dán nhiều không kém gì bằng bu-lông. Mô-đun camera và LiDAR được căn chỉnh rồi dán, màn hình được dán thay vì cài khớp, tấm ốp nội thất mang ống dẫn sáng và đèn không gian, còn linh kiện pin được ghép ngay cạnh những cell không được phép nóng lên. Mỗi mối nối ấy đều phải sống sót qua cả thập kỷ ngâm nhiệt, ẩm và rung — trong khi vẫn phải làm kịp nhịp dây chuyền.",
        th: "รถยนต์สมัยใหม่ยึดติดกันด้วยกาวไม่น้อยไปกว่าด้วยตัวยึด โมดูลกล้องและ LiDAR ต้องจัดแนวแล้วยึดติด จอแสดงผลใช้การยึดด้วยกาวแทนการล็อกด้วยคลิป แผงตกแต่งภายในมีตัวนำแสงและไฟบรรยากาศ ส่วนชิ้นส่วนแบตเตอรี่ต้องประกอบข้างเซลล์ที่ห้ามได้รับความร้อน ทุกรอยต่อเหล่านี้ต้องอยู่รอดผ่านความร้อนสะสม ความชื้น และการสั่นสะเทือนนานนับสิบปี — ในขณะที่ต้องผลิตให้ทันจังหวะสายการผลิต",
      },
      {
        en: "UV curing is what makes those two demands compatible: a bond that fixtures in seconds instead of minutes in an oven, with the energy going into the adhesive rather than into the sensor, the display or the cell next to it. ETIA specifies the source and the dose for each of those joints.",
        zh: "紫外固化正是让这两项要求得以兼容的手段：几秒内定位固化，而非在烘箱中等待数分钟；能量进入胶粘剂本身，而不是旁边的传感器、显示屏或电芯。ETIA 为每一处这样的接合确定光源与剂量。",
        vi: "Đóng rắn UV chính là thứ dung hòa hai đòi hỏi đó: một mối dán được định vị trong vài giây thay vì vài phút trong lò, với năng lượng đi vào keo chứ không vào cảm biến, màn hình hay cell pin bên cạnh. ETIA xác định nguồn sáng và liều chiếu cho từng mối nối ấy.",
        th: "การบ่มด้วย UV คือสิ่งที่ทำให้ข้อเรียกร้องทั้งสองอยู่ร่วมกันได้: รอยยึดที่ตรึงตำแหน่งได้ในไม่กี่วินาทีแทนที่จะเป็นหลายนาทีในเตาอบ โดยพลังงานเข้าสู่กาว ไม่ใช่เข้าสู่เซ็นเซอร์ จอแสดงผล หรือเซลล์ที่อยู่ข้าง ๆ ETIA กำหนดแหล่งกำเนิดแสงและปริมาณแสงให้กับรอยต่อแต่ละจุด",
      },
    ],
    processes: [
      {
        title: { en: "Interior trim & light guide bonding", zh: "内饰件与导光件粘接", vi: "Liên kết nội thất & ống dẫn sáng", th: "การยึดติดชิ้นส่วนภายใน & ตัวนำแสง" },
        body: {
          en: "Fast fixturing of trim panels, light guides and ambient lighting assemblies.",
          zh: "对饰板、导光件与氛围灯组件进行快速定位固化。",
          vi: "Định vị nhanh tấm ốp nội thất, ống dẫn sáng và cụm đèn không gian nội thất.",
          th: "การตรึงตำแหน่งอย่างรวดเร็วของแผงตกแต่ง ตัวนำแสง และชุดไฟบรรยากาศ",
        },
      },
      {
        title: { en: "Display & cluster bonding", zh: "显示屏与仪表盘贴合", vi: "Liên kết màn hình & cụm đồng hồ", th: "การประกบจอแสดงผล & แผงหน้าปัด" },
        body: {
          en: "Optically clear bonds for instrument clusters and centre-stack displays.",
          zh: "用于仪表盘与中控显示屏的光学透明粘接。",
          vi: "Mối dán trong suốt quang học cho cụm đồng hồ và màn hình trung tâm.",
          th: "รอยยึดใสเชิงแสงสำหรับแผงหน้าปัดและจอกลางคอนโซล",
        },
      },
      {
        title: { en: "ADAS camera & LiDAR assembly", zh: "ADAS 摄像与激光雷达装配", vi: "Lắp ráp camera ADAS & LiDAR", th: "การประกอบกล้อง ADAS & LiDAR" },
        body: {
          en: "Alignment-critical lens and sensor bonds that hold through thermal cycling.",
          zh: "对准精度关键的镜头与传感器粘接，可承受温度循环考验。",
          vi: "Mối dán thấu kính và cảm biến đòi hỏi căn chỉnh chính xác, giữ vững qua chu trình nhiệt.",
          th: "รอยยึดเลนส์และเซ็นเซอร์ที่ต้องการความแม่นยำในการจัดแนว และคงทนผ่านการวนรอบอุณหภูมิ",
        },
      },
      {
        title: { en: "EV battery components", zh: "动力电池部件", vi: "Linh kiện pin xe điện", th: "ชิ้นส่วนแบตเตอรี่ EV" },
        body: {
          en: "Cell tab, sensor and housing bonding without heating the cell.",
          zh: "电芯极耳、传感器与外壳粘接，且不对电芯加热。",
          vi: "Dán cực pin, cảm biến và vỏ mà không làm nóng cell.",
          th: "การยึดขั้วเซลล์ เซ็นเซอร์ และตัวเรือน โดยไม่ทำให้เซลล์ร้อน",
        },
      },
    ],
    recommends: ["uv-led", "mercury-uv-lamp", "infrared-heating"],
    cardImage: "https://etiatech-1303055923.cos.ap-singapore.myqcloud.com/IMAGE/INDUSTRY/AUTO",
    applicationSlugs: [
      "uv-spot-curing-adas-camera-module-assembly",
      "uv-led-curing-automotive-lidar-sensor-assembly",
      "uv-curing-ev-battery-manufacturing",
    ],
    metaTitle: "UV Curing for Automotive Manufacturing | ADAS, Display, Trim & EV Battery | ETIA",
    metaDescription:
      "UV curing for automotive manufacturing — ADAS camera and LiDAR sensor assembly, display and cluster bonding, interior trim and ambient lighting, and EV battery components. Seconds-scale fixturing at line takt, from ETIA.",
  },

  // ───────────────────── 4. 三类医疗器械行业 ─────────────────────
  "medical-device": {
    slug: "medical-device",
    accent: "#41A62A",
    name: { en: "Class III Medical Devices", zh: "三类医疗器械行业", vi: "Thiết bị y tế nhóm III", th: "อุปกรณ์การแพทย์ประเภทที่ 3" },
    tagline: {
      en: "Catheters, needles and diagnostic consumables — where the cure has to be validated, not just visible.",
      zh: "导管、针头与诊断耗材——固化必须经过验证，而不只是看起来固化了。",
      vi: "Ống thông, kim và vật tư chẩn đoán — nơi quá trình đóng rắn phải được thẩm định, không chỉ nhìn thấy được.",
      th: "สายสวน เข็ม และวัสดุสิ้นเปลืองสำหรับการวินิจฉัย — งานที่การบ่มต้องผ่านการตรวจรับรอง ไม่ใช่แค่มองเห็นว่าบ่มแล้ว",
    },
    intro: [
      {
        en: "Class III device manufacturing is where UV curing is held to its strictest standard. The bond is inside a product that goes into a patient, so it is not enough for it to cure — the dose has to be measured, recorded and reproducible across every unit, shift and lamp change.",
        zh: "三类医疗器械制造对紫外固化提出了最严苛的要求。粘接部位位于植入或介入患者体内的产品之中，因此仅仅固化并不足够——剂量必须可测量、可记录，并在每一件产品、每个班次、每次换灯之后保持可重复。",
        vi: "Sản xuất thiết bị nhóm III là nơi đóng rắn UV bị đặt dưới chuẩn mực khắt khe nhất. Mối dán nằm bên trong một sản phẩm sẽ đi vào cơ thể bệnh nhân, nên chỉ đóng rắn thôi là chưa đủ — liều chiếu phải được đo, được ghi lại và tái lập được trên từng sản phẩm, từng ca và từng lần thay đèn.",
        th: "การผลิตอุปกรณ์ประเภทที่ 3 คือจุดที่การบ่ม UV ถูกกำกับด้วยมาตรฐานที่เข้มงวดที่สุด รอยยึดอยู่ภายในผลิตภัณฑ์ที่จะเข้าสู่ร่างกายผู้ป่วย ดังนั้นแค่บ่มได้จึงไม่เพียงพอ — ปริมาณแสงต้องวัดได้ บันทึกได้ และทำซ้ำได้ในทุกชิ้น ทุกกะ และทุกครั้งที่เปลี่ยนหลอด",
      },
      {
        en: "That is why ETIA sells radiometry alongside every medical installation. Closed-loop lamp systems hold intensity constant over lamp life, traceable radiometers document it, and the resulting numbers are what stand up in an ISO 13485 audit or an IQ/OQ/PQ package.",
        zh: "这正是 ETIA 在每一套医疗设备中同时配置辐照测量方案的原因。闭环灯式系统在整个灯泡寿命内保持光强恒定，可溯源辐照计对其加以记录，而这些数据正是 ISO 13485 审核或 IQ/OQ/PQ 文件中站得住脚的依据。",
        vi: "Đó là lý do ETIA bán thiết bị đo bức xạ đi kèm mọi hệ thống lắp đặt cho ngành y tế. Hệ đèn vòng kín giữ cường độ ổn định suốt tuổi thọ đèn, thiết bị đo truy xuất được ghi nhận điều đó, và những con số thu được chính là thứ đứng vững trong một cuộc đánh giá ISO 13485 hay một bộ hồ sơ IQ/OQ/PQ.",
        th: "นี่คือเหตุผลที่ ETIA จำหน่ายเครื่องวัดรังสีควบคู่ไปกับทุกงานติดตั้งในภาคการแพทย์ ระบบหลอดแบบวงปิดรักษาความเข้มให้คงที่ตลอดอายุหลอด เครื่องวัดที่สอบกลับได้ทำหน้าที่บันทึกค่านั้นไว้ และตัวเลขที่ได้คือสิ่งที่ยืนหยัดได้ในการตรวจประเมิน ISO 13485 หรือในชุดเอกสาร IQ/OQ/PQ",
      },
    ],
    processes: [
      {
        title: { en: "Catheter & balloon bonding", zh: "导管与球囊粘接", vi: "Liên kết ống thông & bóng nong", th: "การยึดติดสายสวน & บอลลูน" },
        body: {
          en: "360° bond-line curing of tip, hub, marker and balloon joints.",
          zh: "对导管头端、座、显影标记与球囊接合处进行 360° 粘接面固化。",
          vi: "Đóng rắn 360° đường dán tại đầu ống, đốc, điểm đánh dấu và mối nối bóng nong.",
          th: "การบ่มแนวยึด 360° ที่ปลายสาย ฐาน จุดมาร์ก และรอยต่อบอลลูน",
        },
      },
      {
        title: { en: "Needle & cannula assembly", zh: "针头与套管装配", vi: "Lắp ráp kim & ống thông", th: "การประกอบเข็ม & แคนนูลา" },
        body: {
          en: "High-throughput hub bonding with repeatable dose on every unit.",
          zh: "高节拍针座粘接，每一件产品的剂量均可重复。",
          vi: "Dán đốc kim sản lượng cao với liều chiếu lặp lại được trên từng sản phẩm.",
          th: "การยึดฐานเข็มปริมาณสูง ด้วยปริมาณแสงที่ทำซ้ำได้ในทุกชิ้น",
        },
      },
      {
        title: { en: "Diagnostic & microfluidic sealing", zh: "诊断与微流控封合", vi: "Niêm thẻ chẩn đoán & vi lỏng", th: "การซีลการ์ดวินิจฉัย & ไมโครฟลูอิดิก" },
        body: {
          en: "Card and cartridge sealing without heat-distorting the fluidic channels.",
          zh: "对检测卡与卡盒进行封合，且不因受热使流道变形。",
          vi: "Niêm thẻ và hộp mực mà không làm biến dạng vì nhiệt các kênh dẫn dịch.",
          th: "การซีลการ์ดและคาร์ทริดจ์โดยไม่ทำให้ช่องทางเดินของเหลวเสียรูปจากความร้อน",
        },
      },
      {
        title: { en: "Process validation & documentation", zh: "工艺验证与记录", vi: "Thẩm định quy trình & hồ sơ", th: "การตรวจรับรองกระบวนการ & เอกสาร" },
        body: {
          en: "Traceable radiometry for IQ/OQ/PQ, ISO 13485 and customer audits.",
          zh: "可溯源的辐照测量，满足 IQ/OQ/PQ、ISO 13485 与客户审核要求。",
          vi: "Đo bức xạ truy xuất nguồn gốc phục vụ IQ/OQ/PQ, ISO 13485 và đánh giá của khách hàng.",
          th: "การวัดรังสีที่สอบกลับได้ สำหรับ IQ/OQ/PQ, ISO 13485 และการตรวจประเมินของลูกค้า",
        },
      },
    ],
    applications: [
      { en: "Catheters, stents & syringes", zh: "导管、支架与注射器", vi: "Ống thông, stent & bơm tiêm", th: "สายสวน สเตนต์ & กระบอกฉีดยา" },
      { en: "Cannula assemblies & blood oxygenators", zh: "套管组件与血液氧合器", vi: "Cụm canule & máy trao đổi oxy máu", th: "ชุดแคนนูลา & เครื่องแลกเปลี่ยนออกซิเจนในเลือด" },
      { en: "Endoscopes, optics & fibre optics", zh: "内窥镜、光学件与光纤", vi: "Nội soi, quang học & sợi quang", th: "กล้องส่องตรวจ ออปติก & เส้นใยแก้วนำแสง" },
      { en: "Anaesthesia & respiratory masks", zh: "麻醉与呼吸面罩", vi: "Mặt nạ gây mê & hô hấp", th: "หน้ากากวางยาสลบ & ช่วยหายใจ" },
      { en: "Endotracheal tubing & connectors", zh: "气管插管与接头", vi: "Ống nội khí quản & đầu nối", th: "ท่อช่วยหายใจ & ข้อต่อ" },
      { en: "Drainage devices & tubing", zh: "引流器械与管路", vi: "Thiết bị dẫn lưu & ống dẫn", th: "อุปกรณ์ระบายของเหลว & ท่อ" },
      { en: "Transdermal patches & hydrogels", zh: "透皮贴剂与水凝胶", vi: "Miếng dán qua da & hydrogel", th: "แผ่นแปะผ่านผิวหนัง & ไฮโดรเจล" },
      { en: "Medical coatings & filters", zh: "医用涂层与滤材", vi: "Lớp phủ y tế & màng lọc", th: "สารเคลือบทางการแพทย์ & ตัวกรอง" },
      { en: "Hearing aids & insulin pens", zh: "助听器与胰岛素笔", vi: "Máy trợ thính & bút tiêm insulin", th: "เครื่องช่วยฟัง & ปากกาอินซูลิน" },
      { en: "Arterial locators", zh: "动脉定位器", vi: "Thiết bị định vị động mạch", th: "อุปกรณ์ระบุตำแหน่งหลอดเลือดแดง" },
      { en: "Atraumatic guidewire tips", zh: "无创导丝头端", vi: "Đầu dây dẫn không gây tổn thương", th: "ปลายลวดนำแบบไม่ทำให้บาดเจ็บ" },
    ],
    recommends: ["mercury-uv-lamp", "uv-led"],
    cardImage: "https://etiatech-1303055923.cos.ap-singapore.myqcloud.com/IMAGE/INDUSTRY/MEDICAL%20DEVICE",
    applicationSlugs: [
      "uv-spot-curing-cardiovascular-catheter-bonding",
      "uv-led-curing-hypodermic-needle-cannula-assembly",
      "uv-curing-pcr-microfluidic-diagnostic-card-sealing",
    ],
    metaTitle: "UV Curing for Class III Medical Device Manufacturing | ETIA",
    metaDescription:
      "Validated UV curing for Class III medical devices — catheter and balloon bonding, needle and cannula assembly, microfluidic diagnostic sealing, with traceable radiometry for IQ/OQ/PQ and ISO 13485. From ETIA.",
  },

  // ───────────────────────── 5. 科学实验 ─────────────────────────
  // Backed by the S2000 Elite / LX500 bench notes (photorheology, adhesive
  // screening, radiometry) — the analytical OEM lamp line was discontinued.
  // Photocalorimetry stays out: Mettler Toledo's kit uses Hamamatsu and DELO
  // sources and TA's PCA has its own lamp, so there is no claim to make there.
  "scientific-instruments": {
    slug: "scientific-instruments",
    accent: "#7c3aed",
    name: { en: "Laboratory & Research", zh: "科学实验", vi: "Phòng thí nghiệm & nghiên cứu", th: "ห้องปฏิบัติการ & การวิจัย" },
    tagline: { en: "The UV module inside the rheometer and the thermal analyser — light as a controlled variable in the measurement.", zh: "流变仪与热分析仪内部的那只紫外模块——把光变成测量中一个受控变量。", vi: "Mô-đun UV bên trong máy đo lưu biến và máy phân tích nhiệt — ánh sáng như một biến số được kiểm soát trong phép đo.", th: "โมดูล UV ภายในเครื่องวัดรีโอโลยีและเครื่องวิเคราะห์ทางความร้อน — แสงในฐานะตัวแปรควบคุมของการวัด" },
    intro: [
      { en: "Put UV light onto the sample and a rotational rheometer becomes a photo-instrument. The rheometer keeps oscillating while the light is on, tracking the storage modulus G′ and the loss modulus G″ through the whole cure — and where the two cross, you have the gel point, read directly rather than inferred. Photo-DSC does the same for the heat of reaction. In both, the light is not illumination; it is the variable being applied.", zh: "把紫外光打到样品上，旋转流变仪就变成了一台光学仪器。光照期间流变仪持续振荡，全程跟踪储能模量 G′ 与损耗模量 G″——两者交叉之处就是凝胶点，直接读出，而不是推算。光量热（Photo-DSC）对反应热做同样的事。两者中，光都不是照明，而是被施加的那个变量。", vi: "Chiếu tia UV lên mẫu và máy đo lưu biến quay trở thành một thiết bị quang học. Máy tiếp tục dao động trong khi đèn bật, theo dõi mô đun tích trữ G′ và mô đun tổn hao G″ suốt quá trình đóng rắn — nơi hai đường cắt nhau chính là điểm gel, đọc trực tiếp chứ không phải suy ra. Photo-DSC làm điều tương tự với nhiệt phản ứng. Ở cả hai, ánh sáng không phải để chiếu sáng; nó là biến số được áp đặt.", th: "ฉายแสง UV ลงบนตัวอย่าง แล้วเครื่องวัดรีโอโลยีแบบหมุนก็กลายเป็นเครื่องมือเชิงแสง เครื่องยังคงสั่นต่อเนื่องขณะเปิดไฟ ติดตามมอดูลัสสะสม G′ และมอดูลัสสูญเสีย G″ ตลอดการบ่ม — จุดที่เส้นทั้งสองตัดกันคือจุดเจล อ่านได้โดยตรงแทนที่จะอนุมาน Photo-DSC ทำแบบเดียวกันกับความร้อนของปฏิกิริยา ในทั้งสองกรณี แสงไม่ใช่การส่องสว่าง แต่คือตัวแปรที่ถูกใส่เข้าไป" },
      { en: "That puts unusual demands on the source. The dose has to be identical from run to run or the curves are not comparable — so intensity has to hold as the lamp ages, not merely start high. The shutter has to open on the instrument's command, because time zero of the measurement is the moment the light arrives. And the light usually has to travel down a light guide into a closed measuring cell and through a quartz plate, which means the number that matters is the irradiance at the sample, not at the lamp.", zh: "这对光源提出了不寻常的要求。每次实验的剂量必须完全一致，否则曲线之间没有可比性——所以强度必须随灯泡老化而保持恒定，而不只是初始值高。快门必须由仪器指令开启，因为测量的零时刻就是光到达的那一刻。而光通常要经光导进入封闭的测量池、再穿过石英板，这意味着有意义的数字是样品处的辐照度，而不是灯口处的。", vi: "Điều đó đặt ra những yêu cầu khác thường cho nguồn sáng. Liều chiếu phải giống hệt nhau giữa các lần chạy, nếu không các đường cong sẽ không so sánh được — nên cường độ phải giữ nguyên khi đèn già đi, chứ không chỉ cao lúc ban đầu. Cửa chắn phải mở theo lệnh của thiết bị, vì thời điểm không của phép đo chính là lúc ánh sáng tới. Và ánh sáng thường phải đi qua ống dẫn sáng vào buồng đo kín rồi xuyên tấm thạch anh, nghĩa là con số có ý nghĩa là cường độ tại mẫu, không phải tại đèn.", th: "นั่นทำให้แหล่งกำเนิดแสงต้องรับข้อกำหนดที่ไม่ธรรมดา ปริมาณแสงต้องเท่ากันทุกครั้งที่ทดสอบ มิฉะนั้นกราฟจะเทียบกันไม่ได้ — ความเข้มจึงต้องคงที่เมื่อหลอดเสื่อมลง ไม่ใช่แค่สูงตอนเริ่มต้น ชัตเตอร์ต้องเปิดตามคำสั่งของเครื่องมือ เพราะเวลาศูนย์ของการวัดคือวินาทีที่แสงมาถึง และแสงมักต้องเดินทางผ่านตัวนำแสงเข้าสู่เซลล์วัดแบบปิดและผ่านแผ่นควอตซ์ ซึ่งหมายความว่าตัวเลขที่สำคัญคือความเข้มแสงที่ตัวอย่าง ไม่ใช่ที่หลอด" },
      { en: "ETIA supplies that module. The OmniCure® S2000 is the broad-spectrum choice — a 250–600 nm mercury source with closed-loop feedback holding output constant over lamp life, delivered through a light guide, with the shutter under external control. The OmniCure LX500 is the LED alternative where a narrow band at 365, 385, 395 or 405 nm matches the photoinitiator and the sample must not take the infrared load a lamp brings with it. Published photo-rheology work runs exactly this way: an Anton Paar MCR302 with an OmniCure S2000 at 250–450 nm, plate/plate at a 0.3 mm gap, tracking G′, G″, tan δ and complex viscosity in real time.", zh: "ETIA 供应的就是这个模块。OmniCure® S2000 是宽光谱的选择——250–600 nm 汞光源，闭环反馈在整个灯寿命内保持输出恒定，经光导传输，快门可由外部控制。OmniCure LX500 则是 LED 方案，适用于 365、385、395 或 405 nm 窄带正好匹配光引发剂、且样品不能承受汞灯附带红外热负荷的场合。已发表的光流变研究正是这样做的：Anton Paar MCR302 配 OmniCure S2000，250–450 nm，平板/平板 0.3 mm 间隙，实时跟踪 G′、G″、tanδ 与复数黏度。", vi: "ETIA cung cấp chính mô-đun đó. OmniCure® S2000 là lựa chọn phổ rộng — nguồn thủy ngân 250–600 nm với phản hồi vòng kín giữ đầu ra ổn định suốt tuổi thọ đèn, truyền qua ống dẫn sáng, cửa chắn điều khiển từ bên ngoài. OmniCure LX500 là phương án LED khi dải hẹp tại 365, 385, 395 hoặc 405 nm khớp với chất khơi mào quang và mẫu không được chịu tải nhiệt hồng ngoại mà đèn thủy ngân mang theo. Công trình lưu biến quang đã công bố chạy đúng như vậy: Anton Paar MCR302 với OmniCure S2000 ở 250–450 nm, plate/plate khe 0,3 mm, theo dõi G′, G″, tan δ và độ nhớt phức theo thời gian thực.", th: "ETIA จัดหาโมดูลนั้น OmniCure® S2000 คือตัวเลือกสเปกตรัมกว้าง — แหล่งกำเนิดปรอท 250–600 nm พร้อมการป้อนกลับแบบวงปิดที่รักษาเอาต์พุตให้คงที่ตลอดอายุหลอด ส่งผ่านตัวนำแสง และควบคุมชัตเตอร์จากภายนอกได้ ส่วน OmniCure LX500 เป็นทางเลือกแบบ LED เมื่อย่านแคบที่ 365, 385, 395 หรือ 405 nm ตรงกับโฟโตอินิชิเอเตอร์ และตัวอย่างรับภาระความร้อนอินฟราเรดจากหลอดปรอทไม่ได้ งานวิจัยโฟโตรีโอโลยีที่ตีพิมพ์แล้วทำแบบนี้พอดี: Anton Paar MCR302 กับ OmniCure S2000 ที่ 250–450 nm แผ่นคู่ขนานระยะห่าง 0.3 มม. ติดตาม G′, G″, tan δ และความหนืดเชิงซ้อนแบบเรียลไทม์" },
      { en: "We supply the light module, not the rheometer. Instrument builders come to us to specify a source, its optics and its coupling into a new platform; laboratories come to us to keep an installed setup running when the original lamp is ageing or has been discontinued, and to put traceable radiometry on the sample plane so this year's curves still compare with last year's.", zh: "我们供应的是光模块，不是流变仪本身。仪器厂商找我们，是为新平台确定光源、光学与耦合方案；实验室找我们，是在原配灯泡老化或停产时让现有装置继续运转，以及在样品平面上建立可溯源的辐照度测量，好让今年的曲线仍能与去年的相比。", vi: "Chúng tôi cung cấp mô-đun ánh sáng, không phải máy đo lưu biến. Nhà chế tạo thiết bị tìm đến chúng tôi để xác định nguồn sáng, hệ quang và cách ghép nối vào nền tảng mới; phòng thí nghiệm tìm đến để duy trì hệ thống đang lắp đặt khi đèn nguyên bản đã già hoặc ngừng sản xuất, và để có phép đo bức xạ truy xuất được ngay tại mặt phẳng mẫu, sao cho đường cong năm nay vẫn so sánh được với năm ngoái.", th: "เราจัดหาโมดูลแสง ไม่ใช่ตัวเครื่องวัดรีโอโลยี ผู้ผลิตเครื่องมือมาหาเราเพื่อกำหนดแหล่งกำเนิดแสง ระบบออปติก และวิธีเชื่อมต่อเข้ากับแพลตฟอร์มใหม่ ส่วนห้องปฏิบัติการมาหาเราเพื่อให้ชุดที่ติดตั้งอยู่ทำงานต่อได้เมื่อหลอดเดิมเสื่อมหรือเลิกผลิต และเพื่อวางการวัดรังสีที่สอบกลับได้ไว้ที่ระนาบตัวอย่าง ให้กราฟของปีนี้ยังเทียบกับปีที่แล้วได้" },
    ],
    processes: [
      {
        title: { en: "Photo-rheology on a rotational rheometer", zh: "旋转流变仪光流变", vi: "Lưu biến quang trên máy đo lưu biến quay", th: "โฟโตรีโอโลยีบนเครื่องวัดรีโอโลยีแบบหมุน" },
        body: { en: "UV through a quartz plate while the instrument oscillates — G′ and G″ followed through the cure, gel point read off their crossover.", zh: "紫外光透过石英板照射，仪器同时振荡——全程跟踪 G′ 与 G″，凝胶点从两者交叉处读出。", vi: "UV xuyên tấm thạch anh trong khi máy dao động — theo dõi G′ và G″ suốt quá trình đóng rắn, đọc điểm gel tại giao điểm.", th: "แสง UV ผ่านแผ่นควอตซ์ขณะเครื่องสั่น — ติดตาม G′ และ G″ ตลอดการบ่ม อ่านจุดเจลจากจุดตัดของทั้งสอง" },
      },
      {
        title: { en: "Photo-DSC & photocalorimetry", zh: "光量热与 Photo-DSC", vi: "Photo-DSC & đo nhiệt lượng quang", th: "Photo-DSC & โฟโตแคลอริเมทรี" },
        body: { en: "The same source used against heat flow rather than modulus, for reaction enthalpy and conversion under a known dose.", zh: "同一光源改用于测量热流而非模量，在已知剂量下得到反应焓与转化率。", vi: "Cùng nguồn sáng đó dùng với dòng nhiệt thay vì mô đun, cho entanpi phản ứng và độ chuyển hóa dưới liều chiếu đã biết.", th: "ใช้แหล่งกำเนิดแสงเดียวกันกับการวัดฟลักซ์ความร้อนแทนมอดูลัส เพื่อหาเอนทาลปีปฏิกิริยาและการเปลี่ยนรูปภายใต้ปริมาณแสงที่ทราบค่า" },
      },
      {
        title: { en: "Broad spectrum or narrow band", zh: "宽光谱还是窄带", vi: "Phổ rộng hay dải hẹp", th: "สเปกตรัมกว้างหรือย่านแคบ" },
        body: { en: "S2000 at 250–600 nm when the photoinitiator is unknown or absorbs widely; LX500 at a single LED band when it is known and the sample cannot take infrared load.", zh: "光引发剂未知或吸收范围宽时用 250–600 nm 的 S2000；已知且样品不能承受红外热负荷时，用单一 LED 波段的 LX500。", vi: "S2000 ở 250–600 nm khi chưa biết chất khơi mào hoặc nó hấp thụ rộng; LX500 ở một dải LED duy nhất khi đã biết và mẫu không chịu được tải nhiệt hồng ngoại.", th: "S2000 ที่ 250–600 nm เมื่อยังไม่ทราบโฟโตอินิชิเอเตอร์หรือมันดูดกลืนกว้าง; LX500 ที่ย่าน LED เดียวเมื่อทราบแล้วและตัวอย่างรับภาระความร้อนอินฟราเรดไม่ได้" },
      },
      {
        title: { en: "Light guide delivery into the cell", zh: "经光导送入测量池", vi: "Dẫn sáng vào buồng đo", th: "การนำแสงเข้าสู่เซลล์วัด" },
        body: { en: "Coupling the source into a closed measuring cell — light guide, collimation and the geometry that gets an even field across the plate.", zh: "把光源耦合进封闭测量池——光导、准直，以及让照射场在整个平板上均匀的几何布置。", vi: "Ghép nguồn sáng vào buồng đo kín — ống dẫn sáng, chuẩn trực và hình học cho trường chiếu đều trên toàn tấm.", th: "การเชื่อมแหล่งกำเนิดแสงเข้าสู่เซลล์วัดแบบปิด — ตัวนำแสง การรวมลำแสง และเรขาคณิตที่ให้สนามแสงสม่ำเสมอทั่วแผ่น" },
      },
      {
        title: { en: "Dose repeatability & radiometry", zh: "剂量重复性与辐照度测量", vi: "Độ lặp lại của liều chiếu & đo bức xạ", th: "ความสามารถทำซ้ำของปริมาณแสง & การวัดรังสี" },
        body: { en: "Closed-loop feedback holds intensity over lamp life; the R2000 and LS200 measure what actually reaches the sample plane, so results stay comparable across months.", zh: "闭环反馈在灯寿命内保持强度恒定；R2000 与 LS200 测量真正到达样品平面的光，使结果在数月之间仍可比较。", vi: "Phản hồi vòng kín giữ cường độ suốt tuổi thọ đèn; R2000 và LS200 đo lượng ánh sáng thực sự tới mặt phẳng mẫu, giữ cho kết quả so sánh được qua nhiều tháng.", th: "การป้อนกลับแบบวงปิดรักษาความเข้มตลอดอายุหลอด; R2000 และ LS200 วัดแสงที่ไปถึงระนาบตัวอย่างจริง ทำให้ผลลัพธ์เทียบกันได้ข้ามเดือน" },
      },
      {
        title: { en: "OEM integration & retrofit", zh: "OEM 集成与改造", vi: "Tích hợp OEM & cải tạo", th: "การผสานระบบ OEM & การปรับปรุงของเดิม" },
        body: { en: "Specifying a source for a new instrument platform, or keeping an installed setup in service when its original lamp is ageing or discontinued.", zh: "为新仪器平台确定光源方案，或在原配灯泡老化、停产时让现有装置继续服役。", vi: "Xác định nguồn sáng cho một nền tảng thiết bị mới, hoặc duy trì hệ thống đang lắp đặt khi đèn nguyên bản già đi hoặc ngừng sản xuất.", th: "กำหนดแหล่งกำเนิดแสงสำหรับแพลตฟอร์มเครื่องมือใหม่ หรือรักษาชุดที่ติดตั้งอยู่ให้ใช้งานต่อเมื่อหลอดเดิมเสื่อมหรือเลิกผลิต" },
      },
    ],
    recommends: ["mercury-uv-lamp", "uv-led"],
    cardImage: "https://etiatech-1303055923.cos.ap-singapore.myqcloud.com/IMAGE/INDUSTRY/RND",
    applicationSlugs: [
      "uv-spot-curing-photorheology-rotational-rheometer",
      "uv-spot-curing-laboratory-adhesive-screening-specimen-preparation",
      "uv-radiometry-irradiance-measurement-process-validation",
    ],
    metaTitle: "UV Curing Modules for Photo-Rheology & Photo-DSC | OmniCure S2000 & LX500 | ETIA",
    metaDescription:
      "UV modules for laboratory instruments — OmniCure S2000 broad-spectrum 250–600 nm and LX500 UV LED for photo-rheology on rotational rheometers and for photo-DSC, with light-guide delivery, external shutter control and traceable radiometry at the sample plane. Supplied and supported by ETIA.",
  },
};

// Menu / page order — the order the customer specified.
export const INDUSTRY_ORDER: IndustrySlug[] = [
  "optical-modules",
  "optical-fiber",
  "semiconductor",
  "automotive",
  "medical-device",
  "scientific-instruments",
];

// Every industry, drafts included — for static params and a draft's own page.
export const industryList: IndustrySolution[] = INDUSTRY_ORDER.map((slug) => industrySolutions[slug]);

// What the site actually shows: menus, grids, cross-links and the sitemap.
export const publishedIndustries: IndustrySolution[] = industryList.filter((i) => !i.draft);

// The application notes the five industries claim, in industry order. These
// are the only notes the site lists — on /applications, in the sitemap, on
// product pages. A note no industry claims still resolves at its URL (nothing
// indexed 404s) but carries noindex and is linked from nowhere, until an
// industry takes it or it is retired.
export const publishedApplicationSlugs: string[] = Array.from(
  new Set(publishedIndustries.flatMap((i) => i.applicationSlugs))
);
const PUBLISHED_APP = new Set(publishedApplicationSlugs);
export function isPublishedApplication(slug: string): boolean {
  return PUBLISHED_APP.has(slug);
}
export function industryOfApplication(slug: string): IndustrySlug | undefined {
  return publishedIndustries.find((i) => i.applicationSlugs.includes(slug))?.slug;
}

export function industryHref(slug: IndustrySlug): string {
  return `/solutions/${slug}`;
}

export function isIndustrySlug(s: string): s is IndustrySlug {
  return s in industrySolutions;
}

const BY_SLUG = new Map<string, Application>(
  (applicationsData as Application[]).map((a) => [a.slug, a])
);

// The application notes belonging to an industry, in the configured order.
// Silently skips slugs that no longer exist so a renamed note can't break the
// build — the page just shows one card fewer.
export function industryApplications(slug: IndustrySlug): Application[] {
  return industrySolutions[slug].applicationSlugs
    .map((s) => BY_SLUG.get(s))
    // A note held back with `published: false` resolves to a 404, so the
    // industry page must not list it.
    .filter((a): a is Application => Boolean(a) && a?.published !== false);
}

export function industryMetadata(slug: IndustrySlug): Metadata {
  const i = industrySolutions[slug];
  return {
    title: seoTitle(i.metaTitle),
    description: seoDescription(i.metaDescription),
    alternates: { canonical: `${SITE}${industryHref(slug)}` },
    ...(i.draft ? { robots: { index: false, follow: false } } : {}),
  };
}

// Home > Industry Solutions > {Industry}
export function industryBreadcrumbJsonLd(slug: IndustrySlug) {
  const i = industrySolutions[slug];
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE },
      { "@type": "ListItem", position: 2, name: "Industry Solutions", item: `${SITE}/applications` },
      { "@type": "ListItem", position: 3, name: i.name.en, item: `${SITE}${industryHref(slug)}` },
    ],
  };
}
