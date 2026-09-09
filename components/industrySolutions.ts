import type { Metadata } from "next";
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
  // Product categories to steer this industry's visitors towards, in order.
  recommends: ProductCategorySlug[];
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
    recommends: ["uv-led", "mercury-uv-lamp", "uv-measurement"],
    applicationSlugs: [
      "uv-curing-optical-transceiver-manufacturing",
      "uv-curing-co-packaged-optics-fiber-array-bonding",
      "uv-curing-photonic-integrated-circuit-packaging",
      "uv-spot-curing-fiber-optic-connector-termination",
      "uv-led-curing-optical-fiber-draw-tower-coating",
    ],
    metaTitle: "UV Curing for Optical Modules & Transceivers | 400G–1.6T | ETIA",
    metaDescription:
      "UV curing solutions for optical module manufacturing — fibre array bonding, co-packaged optics, lens attach, connector termination and fibre draw coating. Sub-micron alignment retention, specified by ETIA's engineers.",
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
    recommends: ["uv-led", "uv-measurement", "mercury-uv-lamp"],
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
    recommends: ["mercury-uv-lamp", "uv-led", "uv-measurement"],
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
  // Now backed by a real product line — the Excelitas analytical light
  // sources — rather than by third-party evidence about rheometers alone.
  // Photocalorimetry stays out: Mettler Toledo's kit uses Hamamatsu and DELO
  // sources and TA's PCA has its own lamp, so there is no claim to make there.
  "scientific-instruments": {
    slug: "scientific-instruments",
    accent: "#7c3aed",
    name: { en: "Laboratory & Research", zh: "科学实验", vi: "Phòng thí nghiệm & nghiên cứu", th: "ห้องปฏิบัติการ & การวิจัย" },
    tagline: {
      en: "The light source inside the instrument — for spectrometers, chromatographs, gas detectors and photo-rheology.",
      zh: "仪器内部的那个光源——用于分光光度计、色谱仪、气体检测仪与光流变。",
      vi: "Nguồn sáng bên trong thiết bị — cho máy quang phổ, sắc ký, thiết bị dò khí và lưu biến quang.",
      th: "แหล่งกำเนิดแสงภายในเครื่องมือ — สำหรับสเปกโตรมิเตอร์ โครมาโทกราฟ เครื่องตรวจจับแก๊ส และโฟโตรีโอโลยี",
    },
    intro: [
      {
        en: "In an analytical instrument the light source is not a peripheral — it sets the detection limit. A UV-Vis spectrophotometer or an HPLC is limited by how stable and how intense its deuterium lamp stays over life; a photoionisation detector is limited by photon energy and window purity. Instrument builders write their specification around that component, and laboratories live with the consequences for years.",
        zh: "在分析仪器中，光源不是外围件——它直接决定检测限。UV-Vis 分光光度计或 HPLC 的性能上限，取决于氘灯在整个寿命期内的稳定性与强度；光电离检测器则受限于光子能量与窗口纯度。仪器厂商围绕这个部件撰写规格书，而实验室要为此承担数年的后果。",
        vi: "Trong một thiết bị phân tích, nguồn sáng không phải thiết bị ngoại vi — nó quyết định giới hạn phát hiện. Máy quang phổ UV-Vis hay HPLC bị giới hạn bởi độ ổn định và cường độ mà đèn deuterium giữ được suốt tuổi thọ; đầu dò quang ion hóa bị giới hạn bởi năng lượng photon và độ tinh khiết của cửa sổ. Nhà chế tạo thiết bị viết đặc tả quanh linh kiện đó, còn phòng thí nghiệm sống với hệ quả trong nhiều năm.",
        th: "ในเครื่องมือวิเคราะห์ แหล่งกำเนิดแสงไม่ใช่อุปกรณ์ต่อพ่วง — แต่เป็นตัวกำหนดขีดจำกัดการตรวจวัด สเปกโตรโฟโตมิเตอร์ UV-Vis หรือ HPLC ถูกจำกัดด้วยความเสถียรและความเข้มที่หลอดดิวทีเรียมรักษาไว้ได้ตลอดอายุ ส่วนเครื่องตรวจจับแบบโฟโตไอออไนเซชันถูกจำกัดด้วยพลังงานโฟตอนและความบริสุทธิ์ของหน้าต่าง ผู้ผลิตเครื่องมือเขียนข้อกำหนดโดยอิงชิ้นส่วนนี้ และห้องปฏิบัติการต้องอยู่กับผลของมันไปอีกหลายปี",
      },
      {
        en: "ETIA supplies that component. The Excelitas analytical range covers D2 plus deuterium lamps for HPLC, UHPLC and high-end UV-Vis; PID lamps in DC and RF excitation for gas chromatography, mass spectrometry, VOC monitoring and explosives trace detection; and the FiberLight® D2, a 6 W module carrying a deuterium lamp, a tungsten lamp, a shutter, the optics and an SMA connector for instruments with no room to spare.",
        zh: "ETIA 供应的正是这个部件。Excelitas 分析光源产品线涵盖：用于 HPLC、UHPLC 与高端 UV-Vis 的 D2 plus 系列氘灯；DC 与 RF 激发的 PID 灯，用于气相色谱、质谱、VOC 监测与爆炸物痕量检测；以及 FiberLight® D2——一个集成氘灯、钨灯、快门、光学系统与 SMA 接口的 6 W 模块，专为空间紧张的仪器而设。",
        vi: "ETIA cung cấp chính linh kiện đó. Dải sản phẩm phân tích của Excelitas gồm đèn deuterium D2 plus cho HPLC, UHPLC và UV-Vis cao cấp; đèn PID kích thích DC và RF cho sắc ký khí, khối phổ, giám sát VOC và phát hiện vết chất nổ; cùng FiberLight® D2, mô-đun 6 W mang đèn deuterium, đèn vonfram, cửa chắn, hệ quang và đầu nối SMA cho các thiết bị không còn chỗ trống.",
        th: "ETIA จัดหาชิ้นส่วนนั้นให้ ผลิตภัณฑ์งานวิเคราะห์ของ Excelitas ครอบคลุมหลอดดิวทีเรียม D2 plus สำหรับ HPLC, UHPLC และ UV-Vis ระดับสูง; หลอด PID แบบกระตุ้น DC และ RF สำหรับแก๊สโครมาโทกราฟี แมสสเปกโตรเมตรี การเฝ้าระวัง VOC และการตรวจหาร่องรอยวัตถุระเบิด; และ FiberLight® D2 โมดูลขนาด 6 วัตต์ที่บรรจุหลอดดิวทีเรียม หลอดทังสเตน ชัตเตอร์ ระบบออปติก และขั้วต่อ SMA สำหรับเครื่องมือที่ไม่มีพื้นที่เหลือ",
      },
      {
        en: "The same logic reaches the rheometer. Put UV light onto the sample and a rotational rheometer becomes a photo-instrument: it tracks the storage and loss moduli through the cure, and the crossover of G′ and G″ gives the gel point directly. The OmniCure® S2000 is the mercury source specified in TA Instruments\u2019 UV light-guide accessory for its rheometers, and published photo-rheology on Anton Paar MCR instruments has been run with OmniCure S1500 and S2000 through a light guide.",
        zh: "同样的逻辑延伸到流变仪。把紫外光打到样品上，旋转流变仪就变成了一台光学仪器：它追踪固化过程中的储能模量与损耗模量，G′ 与 G″ 的交叉点直接给出胶凝点。OmniCure® S2000 是 TA Instruments 流变仪紫外光导附件所指定的汞灯光源；在 Anton Paar MCR 仪器上发表的光流变研究，也采用 OmniCure S1500 与 S2000 经光导耦合。",
        vi: "Cùng logic ấy vươn tới máy đo lưu biến. Chiếu ánh sáng UV lên mẫu và máy đo lưu biến quay trở thành thiết bị quang học: nó theo dõi mô-đun tích trữ và tổn hao suốt quá trình đóng rắn, và giao điểm G′ với G″ cho ngay điểm gel. OmniCure® S2000 là nguồn đèn thủy ngân được quy định trong phụ kiện ống dẫn sáng UV của TA Instruments cho máy đo lưu biến của hãng, và nghiên cứu lưu biến quang đã công bố trên thiết bị Anton Paar MCR dùng OmniCure S1500 và S2000 qua ống dẫn sáng.",
        th: "ตรรกะเดียวกันนี้ขยายไปถึงเครื่องวัดความหนืด เมื่อฉายแสง UV ลงบนตัวอย่าง เครื่องวัดความหนืดแบบหมุนจะกลายเป็นเครื่องมือเชิงแสง: ติดตามมอดูลัสสะสมและมอดูลัสสูญเสียตลอดการบ่ม และจุดตัดของ G′ กับ G″ ให้จุดเจลออกมาโดยตรง OmniCure® S2000 คือแหล่งกำเนิดแสงหลอดปรอทที่ระบุไว้ในอุปกรณ์เสริมตัวนำแสง UV ของ TA Instruments สำหรับเครื่องวัดความหนืดของบริษัท และงานวิจัยโฟโตรีโอโลยีที่ตีพิมพ์บนเครื่อง Anton Paar MCR ใช้ OmniCure S1500 และ S2000 ผ่านตัวนำแสง",
      },
      {
        en: "Across both, the awkward part is the same: knowing how much light reaches the sample. Irradiance falls off with distance and drifts as a lamp ages, so a reading taken at the source is not the number that acted on the sample — which is why traceable radiometry belongs with the source rather than after it. We work with instrument builders integrating a source into a new platform, and with laboratories keeping an installed instrument in service when its original lamp is ageing or discontinued.",
        zh: "两类应用面对的难题是同一个：究竟有多少光抵达了样品。辐照度随距离衰减、随灯管老化漂移，因此在光源端测得的读数并不是作用于样品的数值——这正是可溯源辐照测量应当与光源一同配置、而非事后追加的原因。我们既服务于将光源集成进新平台的仪器厂商，也服务于在原配灯管老化或停产后仍需维持仪器运转的实验室。",
        vi: "Ở cả hai, phần khó là như nhau: biết được bao nhiêu ánh sáng tới được mẫu. Cường độ suy giảm theo khoảng cách và trôi khi đèn lão hóa, nên số đo lấy tại nguồn không phải con số đã tác động lên mẫu — vì vậy đo bức xạ truy xuất được phải đi cùng nguồn sáng chứ không phải sau đó. Chúng tôi làm việc với nhà chế tạo thiết bị tích hợp nguồn sáng vào nền tảng mới, và với phòng thí nghiệm duy trì thiết bị đã lắp đặt khi đèn nguyên bản lão hóa hoặc ngừng sản xuất.",
        th: "ทั้งสองกรณีมีจุดยากเดียวกัน: การรู้ว่ามีแสงไปถึงตัวอย่างมากเท่าใด ความเข้มลดลงตามระยะทางและเลื่อนไปเมื่อหลอดเสื่อม ค่าที่วัดที่ตัวแหล่งกำเนิดแสงจึงไม่ใช่ค่าที่กระทำต่อตัวอย่างจริง — นั่นคือเหตุผลที่การวัดรังสีแบบสอบกลับได้ต้องมาพร้อมแหล่งกำเนิดแสง ไม่ใช่ตามมาทีหลัง เราทำงานกับผู้ผลิตเครื่องมือที่ผสานแหล่งกำเนิดแสงเข้ากับแพลตฟอร์มใหม่ และกับห้องปฏิบัติการที่ต้องรักษาเครื่องมือที่ติดตั้งแล้วให้ใช้งานต่อเมื่อหลอดเดิมเสื่อมสภาพหรือเลิกผลิต",
      },
    ],
    processes: [
      {
        title: { en: "UV-Vis spectrophotometry & HPLC", zh: "UV-Vis 分光光度法与 HPLC", vi: "Quang phổ UV-Vis & HPLC", th: "สเปกโตรโฟโตเมตรี UV-Vis & HPLC" },
        body: {
          en: "Deuterium sources whose intensity holds over life, so detection limits and calibration intervals hold with it.",
          zh: "强度在整个寿命期内保持稳定的氘灯光源，使检测限与校准周期随之稳定。",
          vi: "Nguồn deuterium giữ được cường độ suốt tuổi thọ, nhờ đó giới hạn phát hiện và chu kỳ hiệu chuẩn cũng ổn định theo.",
          th: "แหล่งกำเนิดแสงดิวทีเรียมที่รักษาความเข้มไว้ได้ตลอดอายุ ทำให้ขีดจำกัดการตรวจวัดและรอบการสอบเทียบคงที่ตามไปด้วย",
        },
      },
      {
        title: { en: "Gas detection & chromatography", zh: "气体检测与色谱分析", vi: "Phát hiện khí & sắc ký", th: "การตรวจจับแก๊ส & โครมาโทกราฟี" },
        body: {
          en: "PID lamps selected by photon energy and window material for the compounds you actually need to see.",
          zh: "按光子能量与窗口材料选定 PID 灯，以匹配您实际需要检出的化合物。",
          vi: "Đèn PID được chọn theo năng lượng photon và vật liệu cửa sổ, phù hợp với đúng các hợp chất bạn cần phát hiện.",
          th: "เลือกหลอด PID ตามพลังงานโฟตอนและวัสดุหน้าต่าง ให้ตรงกับสารประกอบที่คุณต้องตรวจจับจริง",
        },
      },
      {
        title: { en: "Compact & portable instruments", zh: "紧凑型与便携式仪器", vi: "Thiết bị nhỏ gọn & di động", th: "เครื่องมือขนาดกะทัดรัด & พกพา" },
        body: {
          en: "The FiberLight® D2 module puts a full UV-Vis source on one board, for handheld and battery-driven designs.",
          zh: "FiberLight® D2 模块把一套完整的 UV-Vis 光源做在一块板上，适用于手持与电池供电设计。",
          vi: "Mô-đun FiberLight® D2 đưa trọn một nguồn UV-Vis lên một bo mạch, dành cho thiết kế cầm tay và chạy pin.",
          th: "โมดูล FiberLight® D2 รวมแหล่งกำเนิดแสง UV-Vis ครบชุดไว้บนบอร์ดเดียว สำหรับงานออกแบบแบบมือถือและใช้แบตเตอรี่",
        },
      },
      {
        title: { en: "Photo-rheology", zh: "光流变", vi: "Lưu biến quang", th: "โฟโตรีโอโลยี" },
        body: {
          en: "UV curing on a rotational rheometer — follow G′ and G″ through the cure and read the gel point off their crossover.",
          zh: "在旋转流变仪上进行紫外固化——追踪 G′ 与 G″ 的变化，由其交叉点读出胶凝点。",
          vi: "Đóng rắn UV trên máy đo lưu biến quay — theo dõi G′ và G″ suốt quá trình và đọc điểm gel tại giao điểm.",
          th: "การบ่ม UV บนเครื่องวัดความหนืดแบบหมุน — ติดตาม G′ และ G″ ตลอดการบ่ม แล้วอ่านจุดเจลจากจุดตัด",
        },
      },
      {
        title: { en: "OEM integration", zh: "OEM 集成", vi: "Tích hợp OEM", th: "การผสานระบบ OEM" },
        body: {
          en: "Specifying the source, optics and coupling for a light module being built into a new instrument platform.",
          zh: "为集成进新仪器平台的光源模块，确定光源、光学与耦合方案。",
          vi: "Xác định nguồn sáng, quang học và cách ghép nối cho mô-đun ánh sáng tích hợp vào nền tảng thiết bị mới.",
          th: "การกำหนดแหล่งกำเนิดแสง ระบบออปติก และการเชื่อมต่อ สำหรับโมดูลแสงที่จะติดตั้งในแพลตฟอร์มเครื่องมือใหม่",
        },
      },
      {
        title: { en: "Source replacement and retrofit", zh: "光源替换与改造", vi: "Thay thế và cải tạo nguồn sáng", th: "การเปลี่ยนและปรับปรุงแหล่งกำเนิดแสง" },
        body: {
          en: "Keeping an installed instrument in service when its original lamp source is ageing or discontinued.",
          zh: "当仪器原配光源老化或停产时，让已装机的设备继续可用。",
          vi: "Duy trì hoạt động của thiết bị đã lắp đặt khi nguồn đèn nguyên bản lão hóa hoặc ngừng sản xuất.",
          th: "รักษาให้เครื่องมือที่ติดตั้งแล้วใช้งานต่อได้ เมื่อแหล่งกำเนิดแสงเดิมเสื่อมสภาพหรือเลิกผลิต",
        },
      },
    ],
    recommends: ["analytical-light-sources", "mercury-uv-lamp", "uv-led"],
    applicationSlugs: [],
    metaTitle: "Light Sources for Analytical Instruments & Photo-Rheology | ETIA",
    metaDescription:
      "Deuterium lamps, PID lamps and the FiberLight D2 UV-Vis module for spectrometers, HPLC, gas chromatography and gas detection — plus UV sources for photo-rheology on rotational rheometers. Supplied and supported by ETIA.",
  },
};

// Menu / page order — the order the customer specified.
export const INDUSTRY_ORDER: IndustrySlug[] = [
  "optical-modules",
  "semiconductor",
  "automotive",
  "medical-device",
  "scientific-instruments",
];

// Every industry, drafts included — for static params and a draft's own page.
export const industryList: IndustrySolution[] = INDUSTRY_ORDER.map((slug) => industrySolutions[slug]);

// What the site actually shows: menus, grids, cross-links and the sitemap.
export const publishedIndustries: IndustrySolution[] = industryList.filter((i) => !i.draft);

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
    .filter((a): a is Application => Boolean(a));
}

export function industryMetadata(slug: IndustrySlug): Metadata {
  const i = industrySolutions[slug];
  return {
    title: i.metaTitle,
    description: i.metaDescription,
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
