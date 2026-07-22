import type { LangText } from "@/components/LocaleContext";

// Six industry landing pages, populated from the internal
// Application × Product matrix (EN/CN copy provided by the ETIA team;
// TH/VI translated to match). Only products with live catalog pages are
// listed; rankings follow the matrix's primary/secondary fit. Internal
// strategy notes from the source sheet are intentionally not shown.

export type IndustryProduct = {
  slug: string; // catalog product slug → /product/systems/<slug>
  name: string;
  note: LangText;
};

export type Industry = {
  slug: string;
  name: LangText;
  headline: LangText;
  sub: LangText;
  painPoints: LangText[];
  valueProp: LangText;
  products: IndustryProduct[];
  tips: LangText[];
  ctaLabel: LangText;
  ctaSubject: string;
  relatedNoteSlugs: string[];
};

export const industries: Industry[] = [
  {
    slug: "medical",
    name: { en: "Medical & Life Sciences", zh: "医疗与生命科学", th: "การแพทย์และวิทยาศาสตร์ชีวภาพ", vi: "Y tế & khoa học sự sống" },
    headline: { en: "Precision UV Curing for Medical Device Assembly", zh: "医疗器械精密 UV 固化解决方案", th: "การบ่ม UV ความแม่นยำสูงสำหรับการประกอบอุปกรณ์การแพทย์", vi: "UV curing chính xác cho lắp ráp thiết bị y tế" },
    sub: { en: "Validated, auditable curing for catheters, lenses, microfluidics and wearables.", zh: "面向导管、透镜、微流控与可穿戴设备的可验证、可审计固化工艺。", th: "กระบวนการบ่มที่ตรวจรับรองและตรวจสอบได้ สำหรับสายสวน เลนส์ ไมโครฟลูอิดิกส์ และอุปกรณ์สวมใส่", vi: "Quy trình curing xác nhận được, kiểm toán được cho catheter, thấu kính, vi lưu và thiết bị đeo." },
    painPoints: [
      { en: "Strict biocompatibility and leachables requirements", zh: "严格的生物相容性与可沥滤物要求", th: "ข้อกำหนดความเข้ากันได้ทางชีวภาพและสารชะละลายที่เข้มงวด", vi: "Yêu cầu nghiêm ngặt về tương thích sinh học và chất thôi nhiễm" },
      { en: "100% process traceability for FDA / ISO 13485", zh: "FDA / ISO 13485 要求 100% 工艺可追溯", th: "การตรวจสอบย้อนกลับกระบวนการ 100% ตาม FDA / ISO 13485", vi: "Truy xuất quy trình 100% theo FDA / ISO 13485" },
      { en: "Fragile substrates — catheters, lenses, microfluidics", zh: "基材脆弱——导管、透镜、微流控芯片", th: "วัสดุเปราะบาง — สายสวน เลนส์ ไมโครฟลูอิดิกส์", vi: "Vật liệu mỏng manh — catheter, thấu kính, vi lưu" },
      { en: "Zero thermal damage to sensitive components", zh: "敏感部件不允许任何热损伤", th: "ห้ามเกิดความเสียหายจากความร้อนต่อชิ้นส่วนไว", vi: "Không cho phép tổn hại nhiệt lên linh kiện nhạy cảm" },
    ],
    valueProp: {
      en: "UV LED delivers instant on/off control with minimal heat into the substrate. Closed-loop irradiance feedback (S2000 Elite) makes every cure identical and auditable, and mercury-free LED systems suit regulated medical environments.",
      zh: "UV LED 即开即关,几乎不向基材传热;S2000 Elite 的闭环光强反馈让每一次固化一致且可审计;无汞 LED 系统满足医疗环境法规要求。",
      th: "UV LED เปิด-ปิดทันทีโดยส่งความร้อนสู่ชิ้นงานน้อยมาก Closed-Loop Feedback ของ S2000 Elite ทำให้ทุกการบ่มเหมือนกันและตรวจสอบได้ ระบบ LED ไร้ปรอทเหมาะกับสภาพแวดล้อมทางการแพทย์",
      vi: "UV LED bật/tắt tức thời, truyền nhiệt tối thiểu vào chi tiết. Phản hồi vòng kín của S2000 Elite khiến mọi lần cure giống hệt nhau và kiểm toán được; hệ LED không thủy ngân phù hợp môi trường y tế.",
    },
    products: [
      { slug: "s2000-elite", name: "OmniCure S2000 Elite", note: { en: "Lamp spot — the validated gold standard", zh: "灯管点光源——验证级金标准", th: "หลอดแบบจุด — มาตรฐานทองระดับการตรวจรับรอง", vi: "Spot đèn — chuẩn vàng đã xác nhận" } },
      { slug: "lx500", name: "OmniCure LX500", note: { en: "LED spot — instant on/off, mercury-free", zh: "LED 点光源——即开即关、无汞", th: "LED แบบจุด — เปิดปิดทันที ไร้ปรอท", vi: "Spot LED — bật/tắt tức thời, không thủy ngân" } },
      { slug: "r2000", name: "OmniCure R2000 Radiometer", note: { en: "Radiometry for IQ/OQ/PQ validation", zh: "辐照测量,支撑 IQ/OQ/PQ 验证", th: "การวัดแสงรองรับการตรวจรับรอง IQ/OQ/PQ", vi: "Đo bức xạ phục vụ xác nhận IQ/OQ/PQ" } },
    ],
    tips: [
      { en: "Qualify wavelength against the adhesive photoinitiator first — 365 nm covers most biocompatible UV adhesives", zh: "先做波长与胶水光引发剂的匹配确认——365 nm 覆盖多数生物相容性 UV 胶", th: "ยืนยันความยาวคลื่นกับ photoinitiator ของกาวก่อน — 365 nm ครอบคลุมกาวชีวภาพส่วนใหญ่", vi: "Xác nhận bước sóng với photoinitiator của keo trước — 365 nm phù hợp đa số keo y sinh" },
      { en: "Use closed-loop systems for IQ/OQ/PQ validation and log cure parameters for device history records", zh: "用闭环系统做 IQ/OQ/PQ 验证,并记录固化参数进入器械历史记录(DHR)", th: "ใช้ระบบวงปิดสำหรับการตรวจรับรอง IQ/OQ/PQ และบันทึกพารามิเตอร์เข้า DHR", vi: "Dùng hệ vòng kín cho IQ/OQ/PQ và ghi tham số cure vào hồ sơ thiết bị (DHR)" },
      { en: "Measure irradiance with a calibrated radiometer before each shift", zh: "每班次开工前用校准过的辐照计测量光强", th: "วัดความเข้มด้วยเรดิโอมิเตอร์ที่สอบเทียบแล้วก่อนเริ่มกะ", vi: "Đo cường độ bằng radiometer đã hiệu chuẩn trước mỗi ca" },
    ],
    ctaLabel: { en: "Request an Application Evaluation", zh: "申请应用评估", th: "ขอรับการประเมินการใช้งาน", vi: "Yêu cầu đánh giá ứng dụng" },
    ctaSubject: "Medical Application Evaluation",
    relatedNoteSlugs: ["uv-spot-curing-cardiovascular-catheter-bonding", "uv-led-curing-hypodermic-needle-cannula-assembly", "uv-curing-pcr-microfluidic-diagnostic-card-sealing"],
  },
  {
    slug: "electronics",
    name: { en: "Electronics & Semiconductor", zh: "电子与半导体", th: "อิเล็กทรอนิกส์และเซมิคอนดักเตอร์", vi: "Điện tử & bán dẫn" },
    headline: { en: "High-Throughput UV Curing for Electronics Manufacturing", zh: "电子与半导体制造 UV 固化方案", th: "การบ่ม UV ปริมาณสูงสำหรับการผลิตอิเล็กทรอนิกส์", vi: "UV curing năng suất cao cho sản xuất điện tử" },
    sub: { en: "From precision spot bonding to full-panel area curing — without thermal damage.", zh: "从精密点固化到整板面固化,全程无热损伤。", th: "จากการยึดแบบจุดความแม่นยำสูงถึงการบ่มทั้งแผง — โดยไม่มีความเสียหายจากความร้อน", vi: "Từ bonding điểm chính xác đến area curing cả panel — không tổn hại nhiệt." },
    painPoints: [
      { en: "Miniaturization demands precise small-spot control", zh: "小型化趋势要求精准的微小光斑控制", th: "การย่อส่วนต้องการการควบคุมจุดแสงเล็กอย่างแม่นยำ", vi: "Thu nhỏ linh kiện đòi hỏi kiểm soát điểm sáng nhỏ chính xác" },
      { en: "High-volume lines need fast cure at consistent quality", zh: "大批量产线需要又快又稳的固化质量", th: "ไลน์ปริมาณสูงต้องการการบ่มเร็วที่คุณภาพคงที่", vi: "Dây chuyền sản lượng lớn cần cure nhanh với chất lượng ổn định" },
      { en: "Thermal damage risk to PCBs and sensitive components", zh: "PCB 与敏感元件存在热损伤风险", th: "ความเสี่ยงความเสียหายจากความร้อนต่อ PCB และชิ้นส่วนไว", vi: "Rủi ro tổn hại nhiệt cho PCB và linh kiện nhạy cảm" },
      { en: "Many adhesive types — underfill, conformal coat, encapsulant", zh: "胶种繁多——底部填充、三防漆、封装胶", th: "กาวหลายชนิด — underfill, conformal coat, encapsulant", vi: "Nhiều loại keo — underfill, phủ bảo vệ, encapsulant" },
    ],
    valueProp: {
      en: "UV LED provides high irradiance in a compact footprint that drops straight into automated assembly lines, while air-cooled area systems cure wide PCBs without chillers.",
      zh: "UV LED 以紧凑体积输出高光强,可直接集成进自动化产线;风冷面光源无需冷水机即可固化大尺寸 PCB。",
      th: "UV LED ให้ความเข้มสูงในขนาดกะทัดรัด ติดตั้งเข้าไลน์อัตโนมัติได้ทันที ระบบพื้นที่ระบายความร้อนด้วยอากาศบ่ม PCB กว้างโดยไม่ต้องใช้ชิลเลอร์",
      vi: "UV LED cho cường độ cao trong kích thước nhỏ gọn, tích hợp thẳng vào dây chuyền tự động; hệ area làm mát bằng khí cure PCB rộng mà không cần chiller.",
    },
    products: [
      { slug: "s2000-elite", name: "OmniCure S2000 Elite / LX500", note: { en: "Precision spot for underfill and optoelectronics", zh: "精密点固化:底部填充与光电组装", th: "จุดความแม่นยำสูงสำหรับ underfill และออปโตอิเล็กทรอนิกส์", vi: "Spot chính xác cho underfill và quang điện tử" } },
      { slug: "ac8", name: "OmniCure AC8 Series / HD", note: { en: "Area curing for PCB and display panels", zh: "面固化:PCB 与显示面板", th: "บ่มพื้นที่สำหรับ PCB และแผงจอ", vi: "Area curing cho PCB và panel hiển thị" } },
      { slug: "ac9225", name: "OmniCure AC9 Series (incl. AC9300P)", note: { en: "High-power area for cable marking and wide zones", zh: "高功率面光源:线缆标识与宽幅区域", th: "พื้นที่กำลังสูงสำหรับการมาร์กสายและโซนกว้าง", vi: "Area công suất cao cho đánh dấu cáp và vùng rộng" } },
    ],
    tips: [
      { en: "Map wavelength to the adhesive system — most electronics underfills respond at 365–405 nm", zh: "波长要与胶水体系匹配——多数电子底部填充胶响应 365–405 nm", th: "จับคู่ความยาวคลื่นกับระบบกาว — underfill ส่วนใหญ่ตอบสนอง 365–405 nm", vi: "Khớp bước sóng với hệ keo — đa số underfill đáp ứng 365–405 nm" },
      { en: "Use area curing for conformal coatings to guarantee edge-to-edge cure", zh: "三防漆用面固化,确保边到边完全固化", th: "ใช้การบ่มพื้นที่สำหรับ conformal coating เพื่อบ่มถึงขอบทุกด้าน", vi: "Dùng area curing cho lớp phủ bảo vệ để cure trọn từ mép tới mép" },
      { en: "Validate intensity uniformity with radiometric mapping across the full cure area; AC8-HD offers the highest uniformity on large panels", zh: "用辐照测绘验证整个固化面上的均匀性;大面板选 AC8-HD 均匀性最高", th: "ตรวจสอบความสม่ำเสมอด้วยการทำแผนที่รังสีทั่วพื้นที่บ่ม แผงใหญ่ใช้ AC8-HD", vi: "Xác nhận độ đồng đều bằng bản đồ bức xạ trên toàn vùng cure; panel lớn dùng AC8-HD" },
    ],
    ctaLabel: { en: "Request Process Validation Support", zh: "申请工艺验证支持", th: "ขอรับการสนับสนุนการตรวจรับรองกระบวนการ", vi: "Yêu cầu hỗ trợ xác nhận quy trình" },
    ctaSubject: "Electronics Process Validation",
    relatedNoteSlugs: ["uv-led-curing-pcb-conformal-coating", "uv-led-curing-display-module-oca-bonding", "uv-curing-micro-speaker-assembly", "uv-led-curing-wire-tacking-component-staking", "uv-curing-electronics-potting-encapsulation", "uv-spot-curing-adas-camera-module-assembly"],
  },
  {
    slug: "optical-communications",
    name: { en: "Optical Communications", zh: "光通信", th: "การสื่อสารด้วยแสง", vi: "Truyền thông quang" },
    headline: { en: "UV LED Curing for Optical Fiber & Photonic Components", zh: "光纤与光通信器件 UV 固化方案", th: "การบ่ม UV LED สำหรับไฟเบอร์ออปติกและชิ้นส่วนโฟโตนิก", vi: "UV LED curing cho sợi quang & linh kiện photonic" },
    sub: { en: "360° cure at fiber-draw speed, and precision bonding for photonic packaging.", zh: "拉丝级速度的 360° 固化,以及光子封装的精密粘接。", th: "การบ่ม 360° ที่ความเร็วดึงเส้นใย และการยึดความแม่นยำสูงสำหรับแพ็กเกจโฟโตนิก", vi: "Cure 360° ở tốc độ kéo sợi, và bonding chính xác cho đóng gói photonic." },
    painPoints: [
      { en: "Fiber draw speeds up to 3,000 m/min demand instant cure", zh: "高达 3,000 m/min 的拉丝速度要求瞬时固化", th: "ความเร็วดึงเส้นใยถึง 3,000 m/min ต้องการการบ่มทันที", vi: "Tốc độ kéo sợi tới 3.000 m/phút đòi hỏi cure tức thời" },
      { en: "Coating must be perfectly concentric — no eccentricity", zh: "涂层必须完全同心,不允许偏心", th: "การเคลือบต้องร่วมศูนย์สมบูรณ์ — ห้ามเยื้องศูนย์", vi: "Lớp phủ phải đồng tâm hoàn hảo — không lệch tâm" },
      { en: "24/7 continuous production with zero downtime tolerance", zh: "24/7 连续生产,零停机容忍度", th: "ผลิตต่อเนื่อง 24/7 หยุดไลน์ไม่ได้", vi: "Sản xuất liên tục 24/7, không chấp nhận dừng máy" },
      { en: "Temperature rise causes fiber geometry deviation", zh: "温升会造成光纤几何偏差", th: "อุณหภูมิที่สูงขึ้นทำให้เรขาคณิตของเส้นใยเบี่ยงเบน", vi: "Nhiệt tăng gây sai lệch hình học sợi" },
    ],
    valueProp: {
      en: "Purpose-built fiber UV systems deliver 360° circumferential cure at draw speed: the Semray PC6003 is designed from the ground up for 24/7 continuous operation, and the OmniCure AC9225-F puts up to 88 W/cm² at the fiber for the highest process speeds.",
      zh: "专为光纤设计的 UV 系统在拉丝速度下实现 360° 环向固化:Semray PC6003 为 24/7 连续运行而生,AC9225-F 在光纤表面可达 88 W/cm²,支撑最高产速。",
      th: "ระบบ UV เฉพาะไฟเบอร์บ่มรอบทิศ 360° ที่ความเร็วดึงเส้นใย: Semray PC6003 ออกแบบเพื่อทำงานต่อเนื่อง 24/7 และ AC9225-F ให้ถึง 88 W/cm² ที่เส้นใยเพื่อความเร็วสูงสุด",
      vi: "Hệ UV chuyên cho sợi quang cure 360° ở tốc độ kéo: Semray PC6003 sinh ra cho vận hành liên tục 24/7, AC9225-F đạt tới 88 W/cm² tại sợi cho tốc độ cao nhất.",
    },
    products: [
      { slug: "semray-pc6003", name: "Semray UV PC6003", note: { en: "Fiber draw — built for 24/7 continuous ops", zh: "拉丝固化——为 24/7 连续运行打造", th: "ดึงเส้นใย — สร้างเพื่อทำงานต่อเนื่อง 24/7", vi: "Kéo sợi — chế tạo cho vận hành 24/7" } },
      { slug: "ac9225-f", name: "OmniCure AC9225-F", note: { en: "Up to 88 W/cm² at the fiber for top speeds", zh: "光纤表面高达 88 W/cm²,支撑最高速度", th: "สูงถึง 88 W/cm² ที่เส้นใย เพื่อความเร็วสูงสุด", vi: "Tới 88 W/cm² tại sợi cho tốc độ tối đa" } },
      { slug: "lighthammer-10", name: "LightHammer 10 Mk III", note: { en: "Broadband microwave UV for secondary coating and jacketing", zh: "宽谱微波 UV:二次涂覆与护套", th: "UV ไมโครเวฟสเปกตรัมกว้างสำหรับการเคลือบชั้นสองและแจ็กเก็ต", vi: "UV vi sóng phổ rộng cho lớp phủ thứ cấp và vỏ bọc" } },
    ],
    tips: [
      { en: "Validate irradiance at the fiber surface (not the lamp face) using a fiber radiometer", zh: "用光纤辐照计在光纤表面(而非灯面)验证光强", th: "ตรวจสอบความเข้มที่ผิวเส้นใย (ไม่ใช่หน้าโคม) ด้วยเรดิโอมิเตอร์ไฟเบอร์", vi: "Xác nhận cường độ tại bề mặt sợi (không phải mặt đèn) bằng radiometer sợi quang" },
      { en: "Specify an IP52+ enclosure where coolant or coating splash is possible", zh: "存在冷却液或涂料飞溅的场合选 IP52 以上防护", th: "เลือกตัวถัง IP52 ขึ้นไปเมื่อมีโอกาสสารหล่อเย็นหรือสารเคลือบกระเด็น", vi: "Chọn vỏ IP52+ nơi có nguy cơ bắn tóe chất làm mát hoặc lớp phủ" },
      { en: "Match the coating resin's cure wavelength — typically 365–385 nm", zh: "匹配涂料树脂的固化波长,通常为 365–385 nm", th: "จับคู่ความยาวคลื่นบ่มของเรซินเคลือบ — โดยทั่วไป 365–385 nm", vi: "Khớp bước sóng cure của nhựa phủ — thường 365–385 nm" },
    ],
    ctaLabel: { en: "Fiber Application Consultation", zh: "光纤应用咨询", th: "ปรึกษาการใช้งานไฟเบอร์", vi: "Tư vấn ứng dụng sợi quang" },
    ctaSubject: "Fiber / Photonics Application Consultation",
    relatedNoteSlugs: ["uv-curing-optical-transceiver-manufacturing", "uv-curing-co-packaged-optics-fiber-array-bonding", "uv-curing-photonic-integrated-circuit-packaging", "uv-led-curing-optical-fiber-draw-tower-coating", "uv-spot-curing-fiber-optic-connector-termination", "uv-curing-advanced-semiconductor-packaging"],
  },
  {
    slug: "new-energy",
    name: { en: "New Energy & Battery", zh: "新能源与电池", th: "พลังงานใหม่และแบตเตอรี่", vi: "Năng lượng mới & pin" },
    headline: { en: "UV Curing Solutions for EV Battery & New Energy Manufacturing", zh: "新能源与电池制造 UV 固化方案", th: "โซลูชันการบ่ม UV สำหรับการผลิตแบตเตอรี่ EV และพลังงานใหม่", vi: "Giải pháp UV curing cho sản xuất pin EV & năng lượng mới" },
    sub: { en: "Uniform, high-dose curing across wide webs — without heating sensitive cells.", zh: "宽幅涂布的均匀高剂量固化,且不加热敏感电芯。", th: "การบ่มโดสสูงสม่ำเสมอทั่วเว็บกว้าง — โดยไม่ทำให้เซลล์ไวร้อน", vi: "Cure liều cao đồng đều trên web rộng — không làm nóng cell nhạy cảm." },
    painPoints: [
      { en: "Electrode coating needs uniform, fast cure over wide webs", zh: "电极涂布需要宽幅、均匀且快速的固化", th: "การเคลือบอิเล็กโทรดต้องบ่มเร็วสม่ำเสมอทั่วเว็บกว้าง", vi: "Phủ điện cực cần cure nhanh, đồng đều trên web rộng" },
      { en: "EV structural bonding requires high-strength adhesive cure", zh: "EV 结构粘接要求高强度胶水固化", th: "การยึดโครงสร้าง EV ต้องการการบ่มกาวความแข็งแรงสูง", vi: "Bonding kết cấu EV đòi hỏi cure keo cường độ cao" },
      { en: "Heat-sensitive substrates demand thermal management", zh: "热敏基材需要严格的热管理", th: "วัสดุไวความร้อนต้องการการจัดการความร้อน", vi: "Vật liệu nhạy nhiệt cần quản lý nhiệt chặt" },
      { en: "Line speeds above 30 m/min", zh: "产线速度超过 30 m/min", th: "ความเร็วไลน์เกิน 30 m/min", vi: "Tốc độ dây chuyền trên 30 m/phút" },
    ],
    valueProp: {
      en: "High-power air-cooled and water-cooled UV LED area systems deliver a uniform dose across wide electrode webs — the high irradiance and dose that thick coatings need, without thermal impact.",
      zh: "高功率风冷/水冷 UV LED 面光源在宽幅电极涂布上输出均匀剂量——厚涂层需要的高光强、高剂量,同时不产生热影响。",
      th: "ระบบพื้นที่ UV LED กำลังสูงทั้งระบายอากาศและน้ำ ให้โดสสม่ำเสมอทั่วเว็บอิเล็กโทรดกว้าง — ความเข้มและโดสสูงที่ชั้นเคลือบหนาต้องการ โดยไม่มีผลกระทบความร้อน",
      vi: "Hệ area UV LED công suất cao làm mát khí/nước cho liều đồng đều trên web điện cực rộng — cường độ và liều cao mà lớp phủ dày cần, không tác động nhiệt.",
    },
    products: [
      { slug: "ac8", name: "OmniCure AC8 Series / HD", note: { en: "High-dose area curing with HD uniformity", zh: "高剂量面固化,HD 级均匀性", th: "บ่มพื้นที่โดสสูงพร้อมความสม่ำเสมอระดับ HD", vi: "Area liều cao với độ đồng đều HD" } },
      { slug: "fl440", name: "Phoseon FireLine FL440", note: { en: "Water-cooled, maximum power, IP66", zh: "水冷最大功率,IP66 防护", th: "ระบายความร้อนด้วยน้ำ กำลังสูงสุด IP66", vi: "Làm mát nước, công suất tối đa, IP66" } },
      { slug: "lighthammer-10", name: "LightHammer 10 Mk III", note: { en: "Broadband option for electrode coating", zh: "电极涂布的宽谱选项", th: "ตัวเลือกสเปกตรัมกว้างสำหรับเคลือบอิเล็กโทรด", vi: "Tùy chọn phổ rộng cho phủ điện cực" } },
    ],
    tips: [
      { en: "Validate UV dose (mJ/cm²), not just irradiance (W/cm²), for thick-coating penetration", zh: "厚涂层穿透要验证剂量(mJ/cm²),不能只看光强(W/cm²)", th: "ตรวจสอบโดส UV (mJ/cm²) ไม่ใช่แค่ความเข้ม (W/cm²) สำหรับการทะลุชั้นหนา", vi: "Xác nhận liều UV (mJ/cm²), không chỉ cường độ (W/cm²), cho lớp phủ dày" },
      { en: "Water-cooled systems are preferred for continuous high-speed electrode lines", zh: "连续高速电极产线优先选水冷系统", th: "ไลน์อิเล็กโทรดความเร็วสูงต่อเนื่องควรใช้ระบบระบายความร้อนด้วยน้ำ", vi: "Dây chuyền điện cực tốc độ cao liên tục nên dùng hệ làm mát nước" },
      { en: "For pouch/prismatic cell edge bonding, LX500 spot curing adds positioning accuracy", zh: "软包/方形电芯边缘粘接,可用 LX500 点固化提高定位精度", th: "การยึดขอบเซลล์ pouch/prismatic ใช้ LX500 เพิ่มความแม่นยำ", vi: "Bonding mép cell pouch/prismatic dùng spot LX500 tăng độ chính xác" },
    ],
    ctaLabel: { en: "Request a Battery UV Cure Trial", zh: "申请电池 UV 固化试验", th: "ขอทดลองการบ่ม UV สำหรับแบตเตอรี่", vi: "Yêu cầu thử nghiệm UV cure cho pin" },
    ctaSubject: "Battery / New Energy UV Cure Trial",
    relatedNoteSlugs: ["uv-curing-ev-battery-manufacturing", "uv-led-curing-automotive-lidar-sensor-assembly"],
  },
  {
    slug: "printing-packaging",
    name: { en: "Digital Printing & Packaging", zh: "数字印刷与包装", th: "การพิมพ์ดิจิทัลและบรรจุภัณฑ์", vi: "In kỹ thuật số & bao bì" },
    headline: { en: "High-Speed UV LED Curing for Digital Printing & Packaging", zh: "数字印刷与包装 UV LED 固化方案", th: "การบ่ม UV LED ความเร็วสูงสำหรับการพิมพ์ดิจิทัลและบรรจุภัณฑ์", vi: "UV LED curing tốc độ cao cho in kỹ thuật số & bao bì" },
    sub: { en: "Cure ink the instant it lands — from narrow carriages to wide-format lines.", zh: "墨水落纸即固化——从窄幅小车到宽幅产线。", th: "บ่มหมึกทันทีที่ตกถึงผิว — จากหัวพิมพ์แคบถึงไลน์หน้ากว้าง", vi: "Cure mực ngay khi chạm bề mặt — từ carriage hẹp đến dây chuyền khổ rộng." },
    painPoints: [
      { en: "Ink must cure immediately after jetting — no migration", zh: "喷墨后必须立即固化,不允许墨水迁移", th: "หมึกต้องบ่มทันทีหลังพ่น — ห้ามซึมเคลื่อน", vi: "Mực phải cure ngay sau khi phun — không lan thấm" },
      { en: "Carriage widths from 150 mm to 3,000+ mm", zh: "小车宽度从 150 mm 到 3,000+ mm", th: "ความกว้างตั้งแต่ 150 mm ถึงกว่า 3,000 mm", vi: "Bề rộng carriage từ 150 mm đến hơn 3.000 mm" },
      { en: "High irradiance AND high uniformity, simultaneously", zh: "高光强与高均匀性必须同时满足", th: "ต้องได้ทั้งความเข้มสูงและความสม่ำเสมอสูงพร้อมกัน", vi: "Cần đồng thời cường độ cao VÀ độ đồng đều cao" },
      { en: "Mixed substrates — paper, film, corrugated, foil", zh: "基材混杂——纸张、薄膜、瓦楞、箔材", th: "วัสดุหลากหลาย — กระดาษ ฟิล์ม ลูกฟูก ฟอยล์", vi: "Vật liệu đa dạng — giấy, phim, sóng, lá kim loại" },
    ],
    valueProp: {
      en: "FireJet and AC Series deliver 20+ W/cm² in compact packages built for inkjet carriage mounting; water-cooled Semray 5000+ covers wide-format work. LED eliminates lamp replacement cost and mercury waste.",
      zh: "FireJet 与 AC 系列以适合喷墨小车安装的紧凑体积输出 20+ W/cm²;水冷 Semray 5000+ 覆盖宽幅场景。LED 免去换灯成本与汞废弃物。",
      th: "FireJet และ AC Series ให้ 20+ W/cm² ในขนาดกะทัดรัดสำหรับติดตั้งบนหัวพิมพ์ Semray 5000+ ระบายความร้อนด้วยน้ำครอบคลุมงานหน้ากว้าง LED ตัดค่าเปลี่ยนหลอดและของเสียปรอท",
      vi: "FireJet và AC Series cho 20+ W/cm² trong kích thước nhỏ gắn lên carriage; Semray 5000+ làm mát nước phủ khổ rộng. LED loại bỏ chi phí thay đèn và chất thải thủy ngân.",
    },
    products: [
      { slug: "firejet-one", name: "Phoseon FireJet ONE", note: { en: "20 W/cm², stackable to any print width", zh: "20 W/cm²,可堆叠适配任意打印幅宽", th: "20 W/cm² ต่อขยายได้ทุกความกว้างพิมพ์", vi: "20 W/cm², xếp chồng theo mọi khổ in" } },
      { slug: "fj100", name: "Phoseon FJ100 Gen2", note: { en: "Compact self-contained OEM print curing", zh: "紧凑一体化 OEM 打印固化", th: "ระบบพิมพ์ OEM แบบครบในตัว กะทัดรัด", vi: "Curing in OEM nhỏ gọn, tự chứa" } },
      { slug: "ac8", name: "OmniCure AC8/P Series", note: { en: "Print-optimized area curing", zh: "印刷优化版面固化", th: "บ่มพื้นที่รุ่นปรับแต่งเพื่อการพิมพ์", vi: "Area curing tối ưu cho in" } },
      { slug: "semray-5000", name: "Semray 5000+", note: { en: "Wide-format, 30% more output", zh: "宽幅场景,输出提升 30%", th: "หน้ากว้าง เอาต์พุตเพิ่ม 30%", vi: "Khổ rộng, đầu ra tăng 30%" } },
    ],
    tips: [
      { en: "Specify the print-optimized 'P' variants of the AC8 for inkjet applications", zh: "喷墨应用要指定 AC8 的印刷优化 'P' 版本", th: "งานอิงค์เจ็ทให้ระบุรุ่น 'P' ของ AC8 ที่ปรับเพื่อการพิมพ์", vi: "Ứng dụng inkjet chọn biến thể 'P' của AC8 tối ưu cho in" },
      { en: "Measure dose (mJ/cm²) per ink layer and confirm the minimum cure dose with your ink supplier", zh: "按墨层测量剂量(mJ/cm²),与墨水供应商确认最低固化剂量", th: "วัดโดส (mJ/cm²) ต่อชั้นหมึก และยืนยันโดสขั้นต่ำกับผู้ผลิตหมึกของคุณ", vi: "Đo liều (mJ/cm²) mỗi lớp mực và xác nhận liều tối thiểu với nhà cung cấp mực" },
      { en: "For pigmented or dark coatings on packaging, broadband microwave UV cures where LED struggles", zh: "包装上的深色/含颜料涂层,LED 难固化时可用宽谱微波 UV", th: "งานเคลือบสีเข้มบนบรรจุภัณฑ์ ใช้ UV ไมโครเวฟสเปกตรัมกว้างเมื่อ LED บ่มยาก", vi: "Lớp phủ tối màu trên bao bì dùng UV vi sóng phổ rộng khi LED khó cure" },
    ],
    ctaLabel: { en: "Talk to a Print Curing Specialist", zh: "咨询印刷固化专家", th: "ปรึกษาผู้เชี่ยวชาญการบ่มงานพิมพ์", vi: "Trao đổi với chuyên gia curing ngành in" },
    ctaSubject: "Printing / Packaging UV Curing Inquiry",
    relatedNoteSlugs: [],
  },
  {
    slug: "advanced-materials",
    name: { en: "Advanced Materials", zh: "先进材料", th: "วัสดุขั้นสูง", vi: "Vật liệu tiên tiến" },
    headline: { en: "UV Curing for Advanced Coatings, Composites & Wood Finishing", zh: "先进材料、涂层与木材 UV 固化方案", th: "การบ่ม UV สำหรับสารเคลือบขั้นสูง คอมโพสิต และงานไม้", vi: "UV curing cho lớp phủ tiên tiến, composite & hoàn thiện gỗ" },
    sub: { en: "Deep-cure dose and broadband spectrum for thick, pigmented and textured coatings.", zh: "为厚涂层、含颜料涂层与纹理表面提供深固化剂量与宽谱覆盖。", th: "โดสบ่มลึกและสเปกตรัมกว้าง สำหรับชั้นเคลือบหนา มีสี และพื้นผิวขรุขระ", vi: "Liều cure sâu và phổ rộng cho lớp phủ dày, có màu và bề mặt gồ ghề." },
    painPoints: [
      { en: "Thick UV coatings need high dose for deep cure penetration", zh: "厚 UV 涂层需要高剂量实现深层固化", th: "ชั้นเคลือบ UV หนาต้องการโดสสูงเพื่อบ่มลึก", vi: "Lớp phủ UV dày cần liều cao để cure sâu" },
      { en: "Wood surfaces are irregular — uniform area coverage is hard", zh: "木材表面不规则,均匀覆盖是难点", th: "ผิวไม้ไม่เรียบ — ครอบคลุมสม่ำเสมอได้ยาก", vi: "Bề mặt gỗ không đều — khó phủ đồng nhất" },
      { en: "Fast conveyor speeds — flooring runs at 30–50 m/min", zh: "输送速度快——地板产线 30–50 m/min", th: "สายพานเร็ว — พื้นไม้วิ่ง 30–50 m/min", vi: "Băng tải nhanh — sàn gỗ chạy 30–50 m/phút" },
      { en: "Pigmented and dark coatings need broadband UV", zh: "含颜料与深色涂层需要宽谱 UV", th: "เคลือบสีเข้มต้องการ UV สเปกตรัมกว้าง", vi: "Lớp phủ có màu và tối cần UV phổ rộng" },
    ],
    valueProp: {
      en: "Water-cooled LED systems (VeriCure) and broadband microwave systems (LightHammer) deliver the dose and spectral coverage that thick coatings and wood finishing demand.",
      zh: "水冷 LED 系统(VeriCure)与宽谱微波系统(LightHammer)提供厚涂层与木材涂装所需的剂量与光谱覆盖。",
      th: "ระบบ LED ระบายความร้อนด้วยน้ำ (VeriCure) และระบบไมโครเวฟสเปกตรัมกว้าง (LightHammer) ให้โดสและช่วงสเปกตรัมที่งานเคลือบหนาและงานไม้ต้องการ",
      vi: "Hệ LED làm mát nước (VeriCure) và hệ vi sóng phổ rộng (LightHammer) cho liều và phổ mà lớp phủ dày cùng hoàn thiện gỗ đòi hỏi.",
    },
    products: [
      { slug: "vericure", name: "Phoseon VeriCure", note: { en: "Wide-format wood coating at up to 50 m/min", zh: "宽幅木材涂装,线速最高 50 m/min", th: "เคลือบไม้หน้ากว้างที่สูงสุด 50 m/min", vi: "Phủ gỗ khổ rộng tới 50 m/phút" } },
      { slug: "lighthammer-10", name: "LightHammer 10 / 6", note: { en: "Broadband microwave for pigmented coatings", zh: "宽谱微波:含颜料涂层", th: "ไมโครเวฟสเปกตรัมกว้างสำหรับเคลือบมีสี", vi: "Vi sóng phổ rộng cho lớp phủ có màu" } },
      { slug: "fl440", name: "Phoseon FireLine FL440", note: { en: "IP66 high power for harsh environments", zh: "IP66 高功率,适应严苛环境", th: "IP66 กำลังสูง เหมาะสภาพแวดล้อมหนัก", vi: "IP66 công suất cao cho môi trường khắc nghiệt" } },
    ],
    tips: [
      { en: "Wood coating favours water-cooled systems — sustained high dose without cool-down pauses", zh: "木材涂装优先水冷系统——高剂量可持续输出,无需停机降温", th: "งานไม้เหมาะกับระบบระบายความร้อนด้วยน้ำ — โดสสูงต่อเนื่องไม่ต้องพักเครื่อง", vi: "Phủ gỗ ưu tiên hệ làm mát nước — liều cao liên tục không nghỉ máy" },
      { en: "SLM technology gives superior uniformity on rough and textured wood surfaces", zh: "SLM 技术在粗糙纹理木面上均匀性更优", th: "เทคโนโลยี SLM ให้ความสม่ำเสมอเหนือกว่าบนผิวไม้ขรุขระ", vi: "Công nghệ SLM cho độ đồng đều vượt trội trên bề mặt gỗ thô" },
      { en: "Composite curing may need custom wavelength profiles — review with the ETIA application team", zh: "复合材料固化可能需要定制波长方案——请与 ETIA 应用团队评审", th: "งานคอมโพสิตอาจต้องการโปรไฟล์ความยาวคลื่นเฉพาะ — ปรึกษาทีมแอปพลิเคชัน ETIA", vi: "Composite có thể cần hồ sơ bước sóng riêng — trao đổi với đội ứng dụng ETIA" },
    ],
    ctaLabel: { en: "Discuss Your Coating Line", zh: "咨询您的涂装产线", th: "ปรึกษาไลน์เคลือบของคุณ", vi: "Trao đổi về dây chuyền phủ của bạn" },
    ctaSubject: "Coatings / Wood / Composites UV Curing Inquiry",
    relatedNoteSlugs: [],
  },
];

export function getIndustry(slug: string): Industry | undefined {
  return industries.find((i) => i.slug === slug);
}
