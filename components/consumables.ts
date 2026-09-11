// The consumables side of the business, organised the way a customer thinks
// about it: "I have this machine — what wears out, what is its part number,
// how long does it last, and how do I know it is time?"
//
// Three rules this file exists to enforce:
//
//  1. A consumable is reached through the machine it fits. A filter cartridge
//     that fits an S2000 Elite and nothing else is listed under the S2000
//     Elite, not in a flat catalogue where a customer has to know already.
//
//  2. Every service-life figure names where it came from. Where the
//     manufacturer publishes hours, we print the hours and the document. Where
//     nobody publishes hours, we say so and give the measurable signal
//     instead. We never split the difference with a plausible-sounding number:
//     a customer schedules maintenance on these figures.
//
//  3. Part numbers come from the catalogue in `omnicureParts.ts`, which is
//     itself checked against ETIA's inventory. Nothing is typed twice.
//
// "Carried by ETIA" means the part number is on ETIA's item master — we buy
// and sell it in-region. It is not a live stock level, and the site must not
// claim one.

import type { LangText } from "./LocaleContext";
import { parts } from "./omnicureParts";

// ---------------------------------------------------------------------------
// Service life

/**
 * What a consumable's life is known to be.
 *
 * `rated` carries published hours. `measured` is for the parts nobody rates in
 * hours — a filter cartridge, a light guide, an air filter — where the honest
 * answer is a measurement or an inspection, not a number. Both carry the
 * signals that say replacement time has come, because on the shop floor that
 * is what actually triggers the order.
 */
export type ServiceLife =
  | {
      kind: "rated";
      /** The headline figure, e.g. "2,000 h guaranteed · 4,000 h typical". */
      rows: { label: LangText; value: LangText }[];
      /** Which document the figures are from. Printed under the table. */
      source: LangText;
    }
  | {
      kind: "measured";
      /** Why there is no hour figure, and what to use instead. */
      basis: LangText;
    };

export type ConsumableKind =
  | "lamp"
  | "filter"
  | "light-guide"
  | "lens"
  | "window"
  | "air-filter"
  | "cable"
  | "calibration"
  | "wear"
  | "safety";

export const consumableKinds: Record<ConsumableKind, LangText> = {
  lamp: { en: "Lamps", zh: "灯泡", th: "หลอดไฟ", vi: "Đèn" },
  filter: { en: "Optical filters", zh: "滤片", th: "ฟิลเตอร์ออปติก", vi: "Kính lọc" },
  "light-guide": { en: "Light guides", zh: "导光管", th: "ท่อนำแสง", vi: "Ống dẫn sáng" },
  lens: { en: "Lenses & adapters", zh: "镜头与转接件", th: "เลนส์และอะแดปเตอร์", vi: "Thấu kính & bộ chuyển" },
  window: { en: "Protective windows", zh: "保护视窗", th: "หน้าต่างป้องกัน", vi: "Cửa sổ bảo vệ" },
  "air-filter": { en: "Air filters", zh: "空气滤网", th: "ไส้กรองอากาศ", vi: "Lọc gió" },
  cable: { en: "Cables", zh: "线缆", th: "สายเคเบิล", vi: "Cáp" },
  calibration: { en: "Calibration & metrology", zh: "校准与测量", th: "การสอบเทียบและการวัด", vi: "Hiệu chuẩn & đo lường" },
  wear: { en: "Wear parts", zh: "易损件", th: "ชิ้นส่วนสึกหรอ", vi: "Chi tiết hao mòn" },
  safety: { en: "Safety & cleaning", zh: "安全与清洁", th: "ความปลอดภัยและการทำความสะอาด", vi: "An toàn & vệ sinh" },
};

// ---------------------------------------------------------------------------
// The consumables themselves

export type Consumable = {
  id: string;
  kind: ConsumableKind;
  name: LangText;
  /** What it is and what it does, in one or two sentences. */
  what: LangText;
  /** Catalogue part numbers. Descriptions are pulled from omnicureParts.ts. */
  pns: string[];
  /**
   * Omitted where ETIA does not state one. Light guides are the case: they are
   * ETIA's own product and ETIA publishes no hours for them, so the page says
   * nothing about life rather than implying a figure. What the customer needs
   * from us on a light guide is the handling rule, and that is `caution`.
   */
  life?: ServiceLife;
  /** Observable signs that it is due. The list a technician actually uses. */
  signs?: LangText[];
  /** Product page, when the consumable has one. */
  href?: string;
  /** Shown as a warning band on the card. Used for the light guide bend rule. */
  caution?: LangText;
};

// Sources, written once so the wording stays identical everywhere:
const SRC_S2000E_GUIDE: LangText = {
  en: "OmniCure S2000 Elite User Guide, 035-00707",
  zh: "OmniCure S2000 Elite 用户手册 035-00707",
  th: "คู่มือผู้ใช้ OmniCure S2000 Elite, 035-00707",
  vi: "Hướng dẫn sử dụng OmniCure S2000 Elite, 035-00707",
};
const SRC_LED_DATASHEET: LangText = {
  en: "Manufacturer LED head datasheet",
  zh: "厂家 LED 灯头数据表",
  th: "แผ่นข้อมูลหัว LED ของผู้ผลิต",
  vi: "Tài liệu kỹ thuật đầu LED của nhà sản xuất",
};

export const consumables: Consumable[] = [
  // ── Lamps ────────────────────────────────────────────────────────────────
  {
    id: "lamp-s2000-elite",
    kind: "lamp",
    name: { en: "S2000 Elite lamp module", zh: "S2000 Elite 灯泡模块", th: "โมดูลหลอด S2000 Elite", vi: "Mô-đun đèn S2000 Elite" },
    what: {
      en: "The 200 W mercury lamp in its own module, with the Intelli-Lamp chip that tells the system how many hours the lamp has run. Standard for adhesive curing, Surface Cure for tack-free acrylic surfaces.",
      zh: "200 W 汞灯连同模块本体，带 Intelli-Lamp 芯片，机器据此知道这支灯已经点了多少小时。标准型用于胶粘剂固化，表面固化型用于丙烯酸表面不发粘。",
      th: "หลอดปรอท 200 วัตต์ในโมดูลของตัวเอง พร้อมชิป Intelli-Lamp ที่บอกระบบว่าหลอดใช้งานมากี่ชั่วโมง รุ่นมาตรฐานสำหรับบ่มกาว รุ่น Surface Cure สำหรับผิวอะคริลิกที่ต้องไม่เหนียวติด",
      vi: "Đèn thủy ngân 200 W trong mô-đun riêng, có chip Intelli-Lamp báo cho hệ thống biết đèn đã chạy bao nhiêu giờ. Bản Standard để đóng rắn keo, bản Surface Cure cho bề mặt acrylic không dính tay.",
    },
    pns: ["012-68000R", "012-69000R"],
    href: "/product/systems/s2000-lamp",
    life: {
      kind: "rated",
      rows: [
        {
          label: { en: "Guaranteed", zh: "厂家保证", th: "รับประกัน", vi: "Bảo đảm" },
          value: { en: "2,000 h", zh: "2,000 小时", th: "2,000 ชม.", vi: "2.000 giờ" },
        },
        {
          label: { en: "Typical", zh: "通常可达", th: "โดยทั่วไป", vi: "Thông thường" },
          value: { en: "4,000 h", zh: "4,000 小时", th: "4,000 ชม.", vi: "4.000 giờ" },
        },
        {
          label: { en: "Operational limit", zh: "使用上限", th: "ขีดจำกัดการใช้งาน", vi: "Giới hạn vận hành" },
          value: { en: "4,500 h", zh: "4,500 小时", th: "4,500 ชม.", vi: "4.500 giờ" },
        },
        {
          label: { en: "Counted by", zh: "计时方式", th: "นับโดย", vi: "Được đếm bởi" },
          value: {
            en: "Intelli-Lamp chip — the system shows estimated lifetime in hours",
            zh: "Intelli-Lamp 芯片——机器界面显示预计剩余寿命（小时）",
            th: "ชิป Intelli-Lamp — ระบบแสดงอายุที่ประมาณไว้เป็นชั่วโมง",
            vi: "Chip Intelli-Lamp — hệ thống hiển thị tuổi thọ ước tính theo giờ",
          },
        },
      ],
      source: SRC_S2000E_GUIDE,
    },
    signs: [
      {
        en: "The system's estimated lifetime counter is approaching zero",
        zh: "机器上的预计寿命计时接近归零",
        th: "ตัวนับอายุที่ประมาณไว้ของระบบใกล้ศูนย์",
        vi: "Bộ đếm tuổi thọ ước tính của hệ thống gần về không",
      },
      {
        en: "Closed-loop feedback can no longer hold the set intensity",
        zh: "闭环反馈已经维持不住设定光强",
        th: "การป้อนกลับแบบวงปิดรักษาความเข้มที่ตั้งไว้ไม่ได้อีกต่อไป",
        vi: "Phản hồi vòng kín không còn giữ được cường độ đã đặt",
      },
      {
        en: "Cure time has crept up on a process that has not otherwise changed",
        zh: "工艺没变，固化时间却一点点变长",
        th: "เวลาบ่มค่อย ๆ เพิ่มขึ้นทั้งที่กระบวนการไม่ได้เปลี่ยน",
        vi: "Thời gian đóng rắn tăng dần trong khi quy trình không đổi",
      },
      {
        en: "The lamp will not strike, or strikes and drops out",
        zh: "灯打不着，或者点着后又灭",
        th: "หลอดไม่ติด หรือติดแล้วดับ",
        vi: "Đèn không mồi được, hoặc mồi xong lại tắt",
      },
    ],
    caution: {
      en: "Never interrupt the warm-up cycle: a lamp shut down mid-warm-up is not covered by the manufacturer's guarantee. The lamp contains mercury and its box says so — it is hazardous waste, and it must be disposed of under the law of the country it is in, never in general waste.",
      zh: "预热过程绝对不能中断：预热中途断电的灯泡不在厂家保证范围内。灯泡含汞，包装盒上就写着——属危险废物，必须按所在国法律处置，绝不可混入一般垃圾。",
      th: "ห้ามขัดจังหวะรอบอุ่นเครื่องเด็ดขาด หลอดที่ถูกปิดกลางคันระหว่างอุ่นเครื่องไม่อยู่ในการรับประกันของผู้ผลิต หลอดมีสารปรอทตามที่ระบุบนกล่อง จัดเป็นของเสียอันตราย ต้องกำจัดตามกฎหมายของประเทศที่หลอดอยู่ ห้ามทิ้งรวมกับขยะทั่วไป",
      vi: "Tuyệt đối không ngắt chu trình khởi động làm nóng: đèn bị tắt giữa chừng khi đang làm nóng không được nhà sản xuất bảo đảm. Đèn có chứa thủy ngân — hộp đèn ghi rõ điều đó — nên là chất thải nguy hại và phải được xử lý theo luật của nước nơi đèn đang ở, tuyệt đối không bỏ vào rác thường.",
    },
  },
  {
    id: "lamp-s2000",
    kind: "lamp",
    name: { en: "S2000 replacement lamp", zh: "S2000 替换灯泡", th: "หลอดเปลี่ยน S2000", vi: "Đèn thay thế S2000" },
    what: {
      en: "The 200 W replacement lamp for the S2000 and S2000-XLA platform, Standard and Surface Cure. It carries Intelli-Lamp too, so the system reads the hours off the lamp itself. Same 200 W mercury arc source as the Elite's; the module differs and the two are not interchangeable.",
      zh: "S2000 与 S2000-XLA 平台的 200 W 替换灯泡，分标准型与表面固化型。它同样带 Intelli-Lamp，机器直接从灯上读灯时。与 Elite 同为 200 W 汞灯，但模块不同，两者不能互换。",
      th: "หลอดเปลี่ยน 200 วัตต์สำหรับแพลตฟอร์ม S2000 และ S2000-XLA มีทั้งรุ่นมาตรฐานและ Surface Cure มีชิป Intelli-Lamp เช่นกัน ระบบจึงอ่านชั่วโมงจากตัวหลอดได้ เป็นหลอดปรอท 200 วัตต์เหมือนของ Elite แต่โมดูลต่างกันและใช้แทนกันไม่ได้",
      vi: "Đèn thay thế 200 W cho nền tảng S2000 và S2000-XLA, bản Standard và Surface Cure. Đèn cũng mang chip Intelli-Lamp nên hệ thống đọc số giờ ngay trên đèn. Cùng nguồn hồ quang thủy ngân 200 W như bản Elite; mô-đun khác nhau và hai loại không thay cho nhau được.",
    },
    pns: ["012-64000R", "012-65000R"],
    href: "/product/systems/s2000-lamp",
    life: {
      kind: "rated",
      rows: [
        {
          label: { en: "Guaranteed", zh: "厂家保证", th: "รับประกัน", vi: "Bảo đảm" },
          value: { en: "2,000 h", zh: "2,000 小时", th: "2,000 ชม.", vi: "2.000 giờ" },
        },
        {
          label: { en: "Counted by", zh: "计时方式", th: "นับโดย", vi: "Được đếm bởi" },
          value: {
            en: "Intelli-Lamp chip on the lamp, read by the system",
            zh: "灯上的 Intelli-Lamp 芯片，由机器读取",
            th: "ชิป Intelli-Lamp บนหลอด อ่านค่าโดยระบบ",
            vi: "Chip Intelli-Lamp trên đèn, được hệ thống đọc",
          },
        },
      ],
      source: {
        en: "Manufacturer lamp guarantee",
        zh: "厂家灯泡保证",
        th: "การรับประกันหลอดของผู้ผลิต",
        vi: "Bảo đảm đèn của nhà sản xuất",
      },
    },
    signs: [
      {
        en: "Lamp-hour counter past the guaranteed figure and output falling",
        zh: "灯时超过保证小时数，且光输出在下降",
        th: "ตัวนับชั่วโมงหลอดเกินค่าที่รับประกันและกำลังแสงลดลง",
        vi: "Bộ đếm giờ đèn vượt mức bảo đảm và công suất ra đang giảm",
      },
      {
        en: "Measured irradiance at the light guide tip has dropped against the last reading",
        zh: "用辐射计量导光管出光端，比上次读数明显下降",
        th: "ความเข้มรังสีที่วัดได้ที่ปลายท่อนำแสงลดลงเทียบกับค่าที่วัดครั้งก่อน",
        vi: "Cường độ bức xạ đo tại đầu ống dẫn sáng đã giảm so với lần đo trước",
      },
      {
        en: "Cure time has crept up on an unchanged process",
        zh: "工艺没变，固化时间却变长",
        th: "เวลาบ่มเพิ่มขึ้นทั้งที่กระบวนการไม่เปลี่ยน",
        vi: "Thời gian đóng rắn tăng lên dù quy trình không đổi",
      },
    ],
    caution: {
      en: "Never interrupt the warm-up cycle: a lamp shut down mid-warm-up is not covered by the manufacturer's guarantee. The lamp contains mercury and its box says so — it is hazardous waste, and it must be disposed of under the law of the country it is in, never in general waste.",
      zh: "预热过程绝对不能中断：预热中途断电的灯泡不在厂家保证范围内。灯泡含汞，包装盒上就写着——属危险废物，必须按所在国法律处置，绝不可混入一般垃圾。",
      th: "ห้ามขัดจังหวะรอบอุ่นเครื่องเด็ดขาด หลอดที่ถูกปิดกลางคันระหว่างอุ่นเครื่องไม่อยู่ในการรับประกันของผู้ผลิต หลอดมีสารปรอทตามที่ระบุบนกล่อง จัดเป็นของเสียอันตราย ต้องกำจัดตามกฎหมายของประเทศที่หลอดอยู่ ห้ามทิ้งรวมกับขยะทั่วไป",
      vi: "Tuyệt đối không ngắt chu trình khởi động làm nóng: đèn bị tắt giữa chừng khi đang làm nóng không được nhà sản xuất bảo đảm. Đèn có chứa thủy ngân — hộp đèn ghi rõ điều đó — nên là chất thải nguy hại và phải được xử lý theo luật của nước nơi đèn đang ở, tuyệt đối không bỏ vào rác thường.",
    },
  },

  // ── Filters ──────────────────────────────────────────────────────────────
  {
    id: "filter-s2000-elite",
    kind: "filter",
    name: { en: "S2000 Elite filter cartridge", zh: "S2000 Elite 滤片", th: "คาร์ทริดจ์ฟิลเตอร์ S2000 Elite", vi: "Hộp kính lọc S2000 Elite" },
    what: {
      en: "Genuine Excelitas cartridges. The lamp emits 250–600 nm continuously; the cartridge decides which part of that reaches the part, so choosing it is choosing the process. Seven bands, changed by the operator without tools.",
      zh: "Excelitas 原厂滤片。灯连续发射 250–600 nm，由滤片决定哪一段打到工件上——选滤片就是选工艺。七种波段，操作工免工具更换。",
      th: "คาร์ทริดจ์แท้จาก Excelitas หลอดปล่อยแสง 250–600 nm ต่อเนื่อง คาร์ทริดจ์เป็นตัวกำหนดว่าช่วงใดจะไปถึงชิ้นงาน การเลือกคาร์ทริดจ์จึงคือการเลือกกระบวนการ มีเจ็ดแถบ ผู้ใช้เปลี่ยนเองได้โดยไม่ต้องใช้เครื่องมือ",
      vi: "Hộp kính lọc chính hãng Excelitas. Đèn phát liên tục 250–600 nm; hộp kính lọc quyết định phần nào tới được chi tiết, nên chọn nó là chọn quy trình. Bảy dải, người vận hành tự thay không cần dụng cụ.",
    },
    pns: ["019-00390R", "019-00389R", "019-00391R", "019-00388R", "019-00387R", "019-00392R", "019-00394R", "019-00410R"],
    href: "/product/systems/s2000-elite-filters",
    life: {
      kind: "measured",
      basis: {
        en: "The manufacturer publishes no rated life for the cartridges. They are optical glass in a hot beam path: they degrade by solarisation and by contamination, not on a clock. Judge them on measured output and on what the glass looks like.",
        zh: "厂家没有给滤片标称寿命。它是热光路里的光学玻璃，靠光致变色与污染衰减，不按时间走。以实测光输出和玻璃的外观判断。",
        th: "ผู้ผลิตไม่ได้ประกาศอายุใช้งานของคาร์ทริดจ์ มันคือกระจกออปติกในเส้นทางลำแสงร้อน เสื่อมจากการเกิดสีจากแสงและจากสิ่งสกปรก ไม่ได้เสื่อมตามเวลา ให้ตัดสินจากกำลังแสงที่วัดได้และสภาพของกระจก",
        vi: "Nhà sản xuất không công bố tuổi thọ định mức cho hộp kính lọc. Đó là kính quang học nằm trong đường truyền chùm sáng nóng: nó suy giảm do hiện tượng sẫm màu vì bức xạ và do bám bẩn, không theo đồng hồ. Hãy đánh giá qua công suất đo được và qua chính mặt kính.",
      },
    },
    signs: [
      {
        en: "Measured irradiance has fallen although the lamp is new or its hours are low",
        zh: "灯是新的或灯时不高，实测光强却下降",
        th: "ความเข้มรังสีที่วัดได้ลดลงทั้งที่หลอดใหม่หรือชั่วโมงยังน้อย",
        vi: "Cường độ bức xạ đo được đã giảm dù đèn còn mới hoặc số giờ còn thấp",
      },
      {
        en: "Visible clouding, browning or a burn mark on the glass",
        zh: "玻璃上有发雾、发黄或烧灼痕迹",
        th: "เห็นฝ้า สีน้ำตาล หรือรอยไหม้บนกระจก",
        vi: "Kính bị mờ, ngả nâu hoặc có vết cháy",
      },
      {
        en: "A coating that is flaking or crazing at the edge",
        zh: "镀膜边缘起皮或龟裂",
        th: "สารเคลือบลอกหรือแตกลายงาที่ขอบ",
        vi: "Lớp phủ bong hoặc rạn ở mép",
      },
      {
        en: "The process moved to a different adhesive and needs a different band",
        zh: "换了胶水，需要换一个波段",
        th: "กระบวนการเปลี่ยนไปใช้กาวอื่นและต้องใช้แถบคลื่นอื่น",
        vi: "Quy trình chuyển sang loại keo khác và cần dải khác",
      },
    ],
  },
  {
    id: "filter-s2000",
    kind: "filter",
    name: { en: "S2000 / S1500 filter", zh: "S2000 / S1500 滤片", th: "ฟิลเตอร์ S2000 / S1500", vi: "Kính lọc S2000 / S1500" },
    what: {
      en: "Genuine Excelitas internal filters for the S2000, S2000-XLA and S1500, in five bands, plus external filters that mount ahead of the light guide. Which band is fitted is ticked on the label on the back of the machine.",
      zh: "S2000、S2000-XLA 与 S1500 的 Excelitas 原厂内置滤片，五种波段，另有装在导光管前的外置滤片。现装的是哪一种，机器背面的标签上勾着。",
      th: "ฟิลเตอร์ภายในแท้จาก Excelitas สำหรับ S2000, S2000-XLA และ S1500 มีห้าแถบ พร้อมฟิลเตอร์ภายนอกที่ติดหน้าท่อนำแสง แถบที่ติดตั้งอยู่ถูกติ๊กไว้บนฉลากด้านหลังเครื่อง",
      vi: "Kính lọc trong chính hãng Excelitas cho S2000, S2000-XLA và S1500, năm dải, kèm kính lọc ngoài lắp phía trước ống dẫn sáng. Dải nào đang lắp được đánh dấu trên nhãn ở mặt sau máy.",
    },
    // The five internal filters are in the order of the "Filter Option
    // Installed" label on the back of the machine, so a technician reads the
    // ticked box and finds the same row here. External filters follow.
    pns: ["019-01046R", "019-01048R", "019-01049R", "019-01047R", "019-01045R", "019-01023", "019-01024", "019-01022", "019-01026", "019-01025", "019-00108"],
    life: {
      kind: "measured",
      basis: {
        en: "No rated life is published. Same optical glass in the same hot beam path as the Elite cartridges: judge on measured output and on the glass.",
        zh: "厂家未标称寿命。与 Elite 滤片是同样热光路里的同种光学玻璃：以实测光输出和玻璃外观判断。",
        th: "ไม่มีการประกาศอายุใช้งาน เป็นกระจกออปติกชนิดเดียวกันในเส้นทางลำแสงร้อนเดียวกันกับคาร์ทริดจ์ของ Elite ให้ตัดสินจากกำลังแสงที่วัดได้และสภาพกระจก",
        vi: "Không có tuổi thọ định mức được công bố. Cùng loại kính quang học trong cùng đường truyền chùm sáng nóng như hộp kính lọc bản Elite: đánh giá qua công suất đo được và qua mặt kính.",
      },
    },
    signs: [
      {
        en: "Measured irradiance has fallen although the lamp is new or its hours are low",
        zh: "灯是新的或灯时不高，实测光强却下降",
        th: "ความเข้มรังสีที่วัดได้ลดลงทั้งที่หลอดใหม่หรือชั่วโมงยังน้อย",
        vi: "Cường độ bức xạ đo được đã giảm dù đèn còn mới hoặc số giờ còn thấp",
      },
      {
        en: "Visible clouding, browning or a burn mark on the glass",
        zh: "玻璃上有发雾、发黄或烧灼痕迹",
        th: "เห็นฝ้า สีน้ำตาล หรือรอยไหม้บนกระจก",
        vi: "Kính bị mờ, ngả nâu hoặc có vết cháy",
      },
    ],
  },

  // ── Light guides ─────────────────────────────────────────────────────────
  {
    id: "light-guide",
    kind: "light-guide",
    name: { en: "Light guide", zh: "导光管", th: "ท่อนำแสง", vi: "Ống dẫn sáng" },
    what: {
      en: "ETIA's own light guide line: liquid-filled and high-power fibre, 3, 5 and 8 mm tips, 750 to 5000 mm, single through four-leg, plus line terminations. This is the part that gets handled every shift, so it is the part that wears first.",
      zh: "ETIA 自有导光管产品线：液芯与高功率光纤，管口 3、5、8 mm，长度 750–5000 mm，单分支至四分支，另有线型出光端。这是每班都要动的一件，所以也是最先坏的一件。",
      th: "ท่อนำแสงไลน์ของ ETIA เอง: แบบไส้ของเหลวและเส้นใยแก้วกำลังสูง ปลาย 3, 5 และ 8 มม. ยาว 750–5000 มม. ตั้งแต่หนึ่งถึงสี่ขา พร้อมปลายแบบเส้น นี่คือชิ้นที่ถูกจับต้องทุกกะ จึงเป็นชิ้นที่สึกก่อนเพื่อน",
      vi: "Dòng ống dẫn sáng của chính ETIA: lõi lỏng và sợi quang công suất cao, đầu 3, 5 và 8 mm, dài 750–5000 mm, từ một tới bốn nhánh, kèm đầu ra dạng vạch. Đây là chi tiết bị cầm nắm mỗi ca, nên cũng là chi tiết hỏng trước tiên.",
    },
    pns: ["805-00002", "805-00004", "805-00007", "805-00009", "805-00011", "806-00005", "806-00011", "806-00012"],
    href: "/product/systems/s-liquid-light-guide",
    caution: {
      en: "Do not bend, kink, coil tightly or hang a light guide by its tip. A liquid-filled guide that is bent past its limit is damaged permanently, and the damage is often invisible from the outside — the first sign is a cure that will not pass. Keep it in gentle sweeps, support its weight, and cap the tip when it is off the machine.",
      zh: "导光管不可弯折、不可打死弯、不可紧绕成盘、不可提着出光端吊挂。液芯管一旦弯过极限就是永久损伤，而且外表往往看不出来——第一个征兆是固化不合格。走线要走大弧度，重量要有支撑，下机后给端面盖上保护帽。",
      th: "ห้ามดัด หักพับ ม้วนแน่น หรือแขวนท่อนำแสงด้วยปลายของมัน ท่อแบบไส้ของเหลวที่ถูกดัดเกินขีดจำกัดจะเสียหายถาวร และความเสียหายมักมองไม่เห็นจากภายนอก — สัญญาณแรกคือการบ่มที่ไม่ผ่าน ให้เดินท่อเป็นส่วนโค้งกว้าง รองรับน้ำหนัก และครอบปลายเมื่อถอดออกจากเครื่อง",
      vi: "Không được uốn gập, làm gãy khúc, cuộn chặt hay treo ống dẫn sáng bằng chính đầu của nó. Ống lõi lỏng bị uốn quá giới hạn sẽ hỏng vĩnh viễn, và hư hỏng đó thường không nhìn thấy từ bên ngoài — dấu hiệu đầu tiên là mẻ đóng rắn không đạt. Hãy đi ống theo đường cong rộng, đỡ lấy trọng lượng của nó, và đậy nắp đầu ống khi tháo khỏi máy.",
    },
  },

  // ── Optics on the light guide ────────────────────────────────────────────
  {
    id: "lg-optics",
    kind: "lens",
    name: { en: "Light guide adapters & cure rings", zh: "导光管转接件与固化环", th: "อะแดปเตอร์ท่อนำแสงและวงแหวนบ่ม", vi: "Bộ chuyển ống dẫn sáng & vòng đóng rắn" },
    what: {
      en: "What goes on the end of the guide to shape the beam: 90° angle adapters, adjustable collimating adapters, cure rings for 360° curing, light line assemblies.",
      zh: "装在导光管出光端整形光束的件：90° 转角转接件、可调准直转接件、360° 固化环、线型出光组件。",
      th: "สิ่งที่ใส่ที่ปลายท่อเพื่อจัดรูปลำแสง: อะแดปเตอร์มุม 90° อะแดปเตอร์คอลลิเมตปรับได้ วงแหวนบ่มสำหรับบ่มรอบ 360° และชุดปลายแบบเส้น",
      vi: "Những gì lắp ở đầu ống để định hình chùm sáng: bộ chuyển góc 90°, bộ chuyển chuẩn trực điều chỉnh được, vòng đóng rắn cho đóng rắn 360°, cụm đầu ra dạng vạch.",
    },
    pns: ["810-00001", "810-00002", "810-00003", "810-00041", "810-00042", "810-00043", "810-00048", "810-00049", "810-00050", "810-00013", "809-00083"],
    life: {
      kind: "measured",
      basis: {
        en: "These are glass and metal with no rated life. They come off the replacement list when the optic is scorched, fogged or chipped, or when a thread or thumb screw no longer holds position.",
        zh: "玻璃件与金属件，无标称寿命。光学面烧蚀、发雾、崩缺，或螺纹与手拧螺丝已经锁不住位置时更换。",
        th: "เป็นกระจกและโลหะ ไม่มีอายุใช้งานกำหนดไว้ เปลี่ยนเมื่อชิ้นออปติกไหม้ เป็นฝ้า หรือบิ่น หรือเมื่อเกลียวหรือสกรูมือหมุนยึดตำแหน่งไม่อยู่",
        vi: "Là kính và kim loại, không có tuổi thọ định mức. Thay khi chi tiết quang bị cháy, mờ hoặc sứt, hoặc khi ren và vít tay không còn giữ được vị trí.",
      },
    },
    signs: [
      { en: "Scorched or fogged lens face", zh: "镜面烧蚀或发雾", th: "หน้าเลนส์ไหม้หรือเป็นฝ้า", vi: "Mặt thấu kính bị cháy hoặc mờ" },
      { en: "Chipped glass or a cracked holder", zh: "玻璃崩缺或夹持件开裂", th: "กระจกบิ่นหรือตัวจับแตก", vi: "Kính sứt hoặc thân giữ bị nứt" },
      { en: "Thumb screw or thread will not hold the set position", zh: "手拧螺丝或螺纹锁不住设定位置", th: "สกรูมือหมุนหรือเกลียวยึดตำแหน่งที่ตั้งไว้ไม่อยู่", vi: "Vít tay hoặc ren không giữ được vị trí đã đặt" },
    ],
  },

  // ── LED heads and their optics ───────────────────────────────────────────
  {
    id: "led-head",
    kind: "lamp",
    name: { en: "UV LED head", zh: "UV LED 灯头", th: "หัว UV LED", vi: "Đầu UV LED" },
    what: {
      en: "The LED head is the light source on an LX500 system — 365, 385, 395 or 405 nm, 55 or 125 mm. It is not a consumable in the way a mercury lamp is, but it does age, and a head is the part a line keeps a spare of.",
      zh: "LX500 系统的光源就是 LED 灯头——365、385、395 或 405 nm，55 或 125 mm。它不像汞灯那样属于耗材，但确实会衰减，产线通常会备一只。",
      th: "หัว LED คือแหล่งกำเนิดแสงของระบบ LX500 — 365, 385, 395 หรือ 405 nm ขนาด 55 หรือ 125 มม. มันไม่ใช่วัสดุสิ้นเปลืองแบบหลอดปรอท แต่ก็เสื่อมได้ และเป็นชิ้นที่สายการผลิตมักสำรองไว้",
      vi: "Đầu LED chính là nguồn sáng trên hệ LX500 — 365, 385, 395 hoặc 405 nm, 55 hoặc 125 mm. Nó không phải vật tư tiêu hao như đèn thủy ngân, nhưng vẫn lão hóa, và là chi tiết mà một dây chuyền thường để dự phòng.",
    },
    pns: ["019-00398R", "019-00400R", "019-00402R", "019-00404R", "019-00399R", "019-00401R", "019-00403R", "019-00405R"],
    href: "/product/systems/lx500",
    life: {
      kind: "rated",
      rows: [
        {
          label: { en: "Rated life", zh: "标称寿命", th: "อายุใช้งานที่กำหนด", vi: "Tuổi thọ định mức" },
          value: { en: "Over 20,000 h", zh: "20,000 小时以上", th: "มากกว่า 20,000 ชม.", vi: "Trên 20.000 giờ" },
        },
        {
          label: { en: "Condition", zh: "前提条件", th: "เงื่อนไข", vi: "Điều kiện" },
          value: {
            en: "Heat sink clean and clamped, ambient within spec",
            zh: "散热器清洁且夹持到位，环境温度在规格内",
            th: "ฮีตซิงก์สะอาดและยึดแน่น อุณหภูมิแวดล้อมอยู่ในสเปก",
            vi: "Tản nhiệt sạch và được kẹp chắc, nhiệt độ môi trường trong giới hạn",
          },
        },
      ],
      source: SRC_LED_DATASHEET,
    },
    signs: [
      {
        en: "Measured irradiance has fallen below what the process window needs",
        zh: "实测光强已经低于工艺窗口的要求",
        th: "ความเข้มรังสีที่วัดได้ต่ำกว่าที่หน้าต่างกระบวนการต้องการ",
        vi: "Cường độ bức xạ đo được đã xuống dưới mức cửa sổ quy trình yêu cầu",
      },
      {
        en: "The head runs hot, or the controller reports a head fault",
        zh: "灯头发烫，或控制器报灯头故障",
        th: "หัวร้อนผิดปกติ หรือคอนโทรลเลอร์แจ้งความผิดพลาดของหัว",
        vi: "Đầu chạy nóng, hoặc bộ điều khiển báo lỗi đầu đèn",
      },
      {
        en: "Visible damage to the emitting window",
        zh: "出光窗口有可见损伤",
        th: "หน้าต่างเปล่งแสงมีความเสียหายที่มองเห็นได้",
        vi: "Cửa sổ phát sáng có hư hỏng nhìn thấy được",
      },
    ],
  },
  {
    id: "led-optics",
    kind: "lens",
    name: { en: "LED focusing lenses & 90° adapters", zh: "LED 聚光镜头与 90° 转接件", th: "เลนส์รวมแสง LED และอะแดปเตอร์ 90°", vi: "Thấu kính hội tụ LED & bộ chuyển 90°" },
    what: {
      en: "Screw-on optics that turn a head's output into a 3 to 12 mm spot, a 5 mm line, or a right-angle spot where the head cannot point straight at the joint.",
      zh: "旋装在灯头上的光学件，把灯头输出变成 3–12 mm 光斑、5 mm 线光，或在灯头对不正胶点时打成直角。",
      th: "ออปติกแบบขันเกลียวที่เปลี่ยนแสงจากหัวให้เป็นจุดขนาด 3 ถึง 12 มม. เส้น 5 มม. หรือจุดมุมฉากเมื่อหัวเล็งตรงไปที่จุดยึดไม่ได้",
      vi: "Chi tiết quang vặn vào đầu đèn, biến đầu ra thành điểm 3 đến 12 mm, vạch 5 mm, hoặc điểm vuông góc khi đầu đèn không chiếu thẳng vào mối được.",
    },
    pns: ["810-00053R", "810-00054R", "810-00060R", "810-00061R", "810-00066R", "810-00078R", "810-00083R", "810-00084R", "810-00085R"],
    life: {
      kind: "measured",
      basis: {
        en: "No rated life. Lenses sit close to the work and pick up adhesive splash and outgassing; most are replaced because they are dirty beyond cleaning, not because they are old.",
        zh: "无标称寿命。镜头离工件很近，会溅到胶、会沾析出物；多数是脏到洗不掉才换，不是用旧了才换。",
        th: "ไม่มีอายุใช้งานกำหนดไว้ เลนส์อยู่ใกล้ชิ้นงานและรับกาวกระเด็นและไอระเหย ส่วนใหญ่เปลี่ยนเพราะสกปรกจนล้างไม่ออก ไม่ใช่เพราะเก่า",
        vi: "Không có tuổi thọ định mức. Thấu kính nằm sát chi tiết và hứng keo bắn cùng hơi thoát ra; phần lớn được thay vì bẩn tới mức không lau được, không phải vì cũ.",
      },
    },
    signs: [
      { en: "Adhesive cured onto the lens face", zh: "胶固化在镜面上", th: "กาวแข็งตัวติดบนหน้าเลนส์", vi: "Keo đã đóng rắn dính trên mặt thấu kính" },
      { en: "Hazing that cleaning will not remove", zh: "清洁去不掉的雾化", th: "ฝ้าที่ทำความสะอาดแล้วไม่หาย", vi: "Vết mờ mà lau chùi không hết" },
      { en: "Spot size or shape no longer matches the setup sheet", zh: "光斑尺寸或形状与作业指导书对不上", th: "ขนาดหรือรูปร่างจุดแสงไม่ตรงกับใบตั้งเครื่องอีกต่อไป", vi: "Kích thước hoặc hình dạng điểm sáng không còn khớp phiếu cài đặt" },
    ],
  },
  {
    id: "led-cable",
    kind: "cable",
    name: { en: "LED head extension cable", zh: "LED 灯头延长线", th: "สายต่อหัว LED", vi: "Cáp nối dài đầu LED" },
    what: {
      en: "HDMI head-to-controller cables from 1 to 10 m, plus the adapters for running an older LX405 head on an LX500 controller.",
      zh: "灯头到控制器的 HDMI 线，1–10 m，另有把旧款 LX405 灯头接到 LX500 控制器上的转接线。",
      th: "สาย HDMI จากหัวถึงคอนโทรลเลอร์ ตั้งแต่ 1 ถึง 10 ม. พร้อมอะแดปเตอร์สำหรับใช้หัว LX405 รุ่นเก่ากับคอนโทรลเลอร์ LX500",
      vi: "Cáp HDMI từ đầu đèn tới bộ điều khiển, dài 1 đến 10 m, kèm bộ chuyển để chạy đầu LX405 đời cũ trên bộ điều khiển LX500.",
    },
    pns: ["018-00642R", "018-00643R", "018-00644R", "018-00645R", "018-00651R"],
    life: {
      kind: "measured",
      basis: {
        en: "A cable on a static bench outlives the machine. A cable in a cable chain or on a moving axis is a wear part, and how long it lasts is set by the bend radius and the cycle rate of that axis, not by us.",
        zh: "固定工位上的线比机器还耐用。走拖链或跟着轴运动的线属于易损件，能用多久取决于那条轴的弯曲半径和动作频次，不由我们定。",
        th: "สายบนโต๊ะที่อยู่กับที่อยู่ได้นานกว่าตัวเครื่อง ส่วนสายที่อยู่ในรางกระดูกงูหรือบนแกนที่เคลื่อนที่คือชิ้นส่วนสึกหรอ อายุขึ้นกับรัศมีดัดและอัตรารอบของแกนนั้น ไม่ใช่เรากำหนด",
        vi: "Cáp trên bàn cố định sống lâu hơn cả máy. Cáp nằm trong xích dẫn cáp hoặc trên trục chuyển động là chi tiết hao mòn, và tuổi thọ do bán kính uốn và nhịp chạy của trục đó quyết định, không phải do chúng tôi.",
      },
    },
    signs: [
      { en: "Intermittent head detection or dropouts under movement", zh: "灯头识别时有时无，或一动就掉线", th: "ตรวจพบหัวไม่ต่อเนื่อง หรือหลุดเมื่อมีการเคลื่อนไหว", vi: "Nhận đầu đèn chập chờn hoặc mất kết nối khi chuyển động" },
      { en: "Cracked jacket or a connector shell working loose", zh: "外皮开裂，或接头壳松动", th: "ปลอกแตกหรือเปลือกคอนเนกเตอร์หลวม", vi: "Vỏ bọc nứt hoặc thân đầu nối bị lỏng" },
    ],
  },

  // ── AC Series large-area heads ───────────────────────────────────────────
  {
    id: "ac-window",
    kind: "window",
    name: { en: "AC Series protective window", zh: "AC 系列保护视窗", th: "หน้าต่างป้องกัน AC Series", vi: "Cửa sổ bảo vệ dòng AC" },
    what: {
      en: "The sacrificial quartz window in front of the LED array. It takes the ink mist, adhesive splash and outgassing so the array does not. Replacing a window is routine; replacing an array is not.",
      zh: "LED 阵列前面的牺牲性石英视窗，替阵列挡下墨雾、胶溅与析出物。换视窗是例行工作，换阵列不是。",
      th: "หน้าต่างควอตซ์แบบสิ้นเปลืองด้านหน้าอาร์เรย์ LED ทำหน้าที่รับละอองหมึก กาวกระเด็น และไอระเหยแทนอาร์เรย์ การเปลี่ยนหน้าต่างเป็นงานประจำ การเปลี่ยนอาร์เรย์ไม่ใช่",
      vi: "Cửa sổ thạch anh hy sinh nằm trước dàn LED. Nó hứng sương mực, keo bắn và hơi thoát ra thay cho dàn LED. Thay cửa sổ là việc thường lệ; thay dàn LED thì không.",
    },
    pns: ["019-00232R", "019-00203R", "019-00204R", "020-00922", "020-00923", "020-00924", "020-00967", "020-00968", "020-00969"],
    life: {
      kind: "measured",
      basis: {
        en: "A sacrificial part, so its life is set by the process it sits over, not by a clock. Inspect it on the shift changeover and replace it when cleaning no longer clears it.",
        zh: "牺牲件，寿命由它罩着的工艺决定，不按时间走。交接班时检查，洗不干净就换。",
        th: "เป็นชิ้นส่วนสิ้นเปลือง อายุขึ้นกับกระบวนการที่มันครอบอยู่ ไม่ใช่ตามเวลา ให้ตรวจตอนเปลี่ยนกะ และเปลี่ยนเมื่อทำความสะอาดแล้วยังไม่ใส",
        vi: "Là chi tiết hy sinh, nên tuổi thọ do quy trình bên dưới nó quyết định, không theo đồng hồ. Kiểm tra khi giao ca và thay khi lau không còn sạch được.",
      },
    },
    signs: [
      { en: "Cured deposit that cleaning will not remove", zh: "固化在上面、洗不掉的残留", th: "คราบที่แข็งตัวและล้างไม่ออก", vi: "Cặn đã đóng rắn mà lau không hết" },
      { en: "Scratches, pitting or a crack anywhere in the glass", zh: "玻璃上有划痕、麻点或裂纹", th: "มีรอยขีด รอยบุ๋ม หรือรอยร้าวบนกระจก", vi: "Kính có vết xước, rỗ hoặc nứt" },
      { en: "Measured irradiance down with a head that is otherwise healthy", zh: "灯头本身正常，实测光强却下降", th: "ความเข้มรังสีลดลงทั้งที่หัวยังปกติดี", vi: "Cường độ bức xạ giảm trong khi đầu đèn vẫn bình thường" },
    ],
  },
  {
    id: "ac-air-filter",
    kind: "air-filter",
    name: { en: "AC Series air filter", zh: "AC 系列空气滤网", th: "ไส้กรองอากาศ AC Series", vi: "Lọc gió dòng AC" },
    what: {
      en: "The air-cooled heads pull their cooling air through a filter. A blocked filter does not announce itself — it just lets the array run hotter, which costs output first and life second.",
      zh: "风冷灯头的冷却风要过滤网。滤网堵了不会报警，只是让阵列跑得更热——先掉光输出，再折寿命。",
      th: "หัวระบายความร้อนด้วยอากาศดูดอากาศผ่านไส้กรอง ไส้กรองที่ตันไม่ได้ส่งสัญญาณเตือน มันแค่ทำให้อาร์เรย์ร้อนขึ้น ซึ่งกินกำลังแสงก่อน แล้วจึงกินอายุ",
      vi: "Các đầu làm mát bằng gió hút không khí qua một tấm lọc. Lọc tắc không tự báo — nó chỉ khiến dàn LED chạy nóng hơn, làm mất công suất trước và giảm tuổi thọ sau.",
    },
    pns: ["019-00209R", "020-00869", "020-00860", "020-00900", "020-00901", "020-00899", "019-00208R"],
    life: {
      kind: "measured",
      basis: {
        en: "Interval is set by the air in the room, not by run hours: a print shop with paper dust blocks a filter in weeks where a clean assembly room takes months. Put it on the preventive schedule and check it against the actual filter.",
        zh: "更换周期取决于车间的空气，不是运行小时数：有纸粉的印刷车间几周就堵，洁净装配间几个月才堵。列入预防性保养计划，按实际滤网的脏污程度校正周期。",
        th: "ระยะเวลาเปลี่ยนขึ้นกับอากาศในห้อง ไม่ใช่ชั่วโมงเดินเครื่อง: โรงพิมพ์ที่มีฝุ่นกระดาษตันภายในไม่กี่สัปดาห์ ขณะที่ห้องประกอบที่สะอาดใช้ได้เป็นเดือน ให้ใส่ไว้ในแผนบำรุงรักษาเชิงป้องกันและปรับรอบตามสภาพไส้กรองจริง",
        vi: "Chu kỳ do không khí trong phòng quyết định, không phải giờ chạy máy: xưởng in nhiều bụi giấy làm tắc lọc trong vài tuần, còn phòng lắp ráp sạch thì hàng tháng. Hãy đưa vào lịch bảo trì phòng ngừa và hiệu chỉnh theo tình trạng tấm lọc thực tế.",
      },
    },
    signs: [
      { en: "Visible dust loading on the filter face", zh: "滤网表面积尘明显", th: "เห็นฝุ่นจับหน้าไส้กรอง", vi: "Thấy bụi bám dày trên mặt lọc" },
      { en: "Head running hotter than its usual temperature", zh: "灯头温度比平时高", th: "หัวร้อนกว่าอุณหภูมิปกติ", vi: "Đầu đèn chạy nóng hơn nhiệt độ thường ngày" },
      { en: "Output down with a clean window and a healthy array", zh: "视窗干净、阵列正常，光输出却下降", th: "กำลังแสงลดลงทั้งที่หน้าต่างสะอาดและอาร์เรย์ปกติ", vi: "Công suất giảm dù cửa sổ sạch và dàn LED bình thường" },
    ],
  },

  // ── Metrology ────────────────────────────────────────────────────────────
  {
    id: "r2000-calibration",
    kind: "calibration",
    name: { en: "R2000 radiometer calibration", zh: "R2000 辐射计校准", th: "การสอบเทียบเครื่องวัดรังสี R2000", vi: "Hiệu chuẩn máy đo bức xạ R2000" },
    what: {
      en: "The radiometer is what makes every other figure on this page mean something. Its own calibration is consumed by use: the reference is valid for a set amount of lamp-on time, after which the readings are indications, not measurements.",
      zh: "这页上其他所有数字之所以有意义，靠的就是辐射计。它自己的校准是会被用掉的：参考值只在一定的灯亮时长内有效，过了以后读数只能算指示值，不能算测量值。",
      th: "เครื่องวัดรังสีคือสิ่งที่ทำให้ตัวเลขอื่นทั้งหมดในหน้านี้มีความหมาย การสอบเทียบของมันเองถูกใช้หมดไปตามการใช้งาน: ค่าอ้างอิงใช้ได้ภายในเวลาที่หลอดติดจำนวนหนึ่ง หลังจากนั้นค่าที่อ่านได้เป็นเพียงค่าบ่งชี้ ไม่ใช่ค่าที่วัดได้",
      vi: "Máy đo bức xạ là thứ khiến mọi con số khác trên trang này có ý nghĩa. Bản thân việc hiệu chuẩn của nó bị tiêu hao theo sử dụng: giá trị tham chiếu chỉ có hiệu lực trong một khoảng thời gian đèn sáng nhất định, sau đó số đọc chỉ là chỉ thị, không phải phép đo.",
    },
    pns: ["021-00016", "021-00034", "020-00510B"],
    href: "/product/systems/r2000",
    life: {
      kind: "rated",
      rows: [
        {
          label: { en: "Calibration validity", zh: "校准有效期", th: "อายุการสอบเทียบ", vi: "Hiệu lực hiệu chuẩn" },
          value: { en: "112 h of lamp-on time", zh: "112 小时灯亮时长", th: "112 ชม. ของเวลาที่หลอดติด", vi: "112 giờ đèn sáng" },
        },
        {
          label: { en: "Then", zh: "到期后", th: "จากนั้น", vi: "Sau đó" },
          value: {
            en: "Recalibrate before the readings are used for process control",
            zh: "重新校准后，读数才能用于工艺管控",
            th: "สอบเทียบใหม่ก่อนนำค่าที่อ่านได้ไปใช้ควบคุมกระบวนการ",
            vi: "Hiệu chuẩn lại trước khi dùng số đọc để kiểm soát quy trình",
          },
        },
      ],
      source: SRC_S2000E_GUIDE,
    },
    signs: [
      { en: "Lamp-on time since the last calibration has passed 112 h", zh: "距上次校准的灯亮时长已超过 112 小时", th: "เวลาที่หลอดติดนับจากการสอบเทียบครั้งล่าสุดเกิน 112 ชม.", vi: "Thời gian đèn sáng kể từ lần hiệu chuẩn trước đã quá 112 giờ" },
      { en: "Two radiometers disagree on the same cure site", zh: "两台辐射计在同一个固化点读数不一致", th: "เครื่องวัดสองเครื่องให้ค่าต่างกันที่จุดบ่มเดียวกัน", vi: "Hai máy đo cho kết quả khác nhau tại cùng một điểm đóng rắn" },
      { en: "An audit or a customer qualification needs a current certificate", zh: "审核或客户认证要求提供在有效期内的校准证书", th: "การตรวจประเมินหรือการรับรองจากลูกค้าต้องใช้ใบรับรองที่ยังไม่หมดอายุ", vi: "Một cuộc đánh giá hoặc yêu cầu phê duyệt từ khách hàng cần chứng chỉ còn hiệu lực" },
    ],
  },
  {
    id: "ls200-calibration",
    kind: "calibration",
    name: { en: "LS200 LED light meter & sensors", zh: "LS200 LED 测光仪与探头", th: "เครื่องวัดแสง LED LS200 และเซนเซอร์", vi: "Máy đo sáng LED LS200 & cảm biến" },
    what: {
      en: "The irradiance and power sensors for V3 LED heads, with the positioning device that puts the sensor in the same place every time — which is what makes one week's reading comparable to the next.",
      zh: "V3 LED 灯头的辐照度与功率探头，配定位器，保证每次探头都放在同一个位置——这才让这周的读数和下周可比。",
      th: "เซนเซอร์วัดความเข้มรังสีและกำลังสำหรับหัว LED รุ่น V3 พร้อมอุปกรณ์จัดตำแหน่งที่วางเซนเซอร์ในจุดเดิมทุกครั้ง ซึ่งทำให้ค่าที่อ่านสัปดาห์นี้เทียบกับสัปดาห์หน้าได้",
      vi: "Cảm biến cường độ bức xạ và công suất cho đầu LED V3, kèm bộ định vị đặt cảm biến vào đúng một chỗ mỗi lần — đó là điều khiến số đọc tuần này so sánh được với tuần sau.",
    },
    pns: ["019-00427R", "019-00412R", "019-00414R", "019-00413R", "019-00415R", "019-00409R", "019-00131R"],
    life: {
      kind: "measured",
      basis: {
        en: "A sensor drifts; how fast depends on how much UV it has absorbed. Send it for recalibration on the interval your quality system requires, and sooner if two sensors start disagreeing.",
        zh: "探头会漂移，漂多快取决于它吃了多少紫外。按质量体系要求的周期送检；如果两只探头开始对不上，就提前送。",
        th: "เซนเซอร์มีการเลื่อนค่า เร็วแค่ไหนขึ้นกับปริมาณ UV ที่ดูดซับไป ให้ส่งสอบเทียบตามรอบที่ระบบคุณภาพกำหนด และเร็วกว่านั้นหากเซนเซอร์สองตัวเริ่มให้ค่าไม่ตรงกัน",
        vi: "Cảm biến sẽ trôi; nhanh hay chậm tùy lượng UV nó đã hấp thụ. Gửi hiệu chuẩn lại theo chu kỳ hệ thống chất lượng của bạn yêu cầu, và sớm hơn nếu hai cảm biến bắt đầu lệch nhau.",
      },
    },
    signs: [
      { en: "Two sensors disagree on the same head", zh: "两只探头在同一个灯头上读数不一致", th: "เซนเซอร์สองตัวให้ค่าต่างกันบนหัวเดียวกัน", vi: "Hai cảm biến cho kết quả khác nhau trên cùng một đầu đèn" },
      { en: "A reading that contradicts a known-good process", zh: "读数与已知正常的工艺结果矛盾", th: "ค่าที่อ่านได้ขัดกับกระบวนการที่รู้ว่าปกติดี", vi: "Số đọc mâu thuẫn với một quy trình vẫn đang chạy tốt" },
      { en: "The calibration certificate has expired", zh: "校准证书已过期", th: "ใบรับรองการสอบเทียบหมดอายุ", vi: "Chứng chỉ hiệu chuẩn đã hết hạn" },
    ],
  },

  // ── Everything a bench gets through ──────────────────────────────────────
  {
    id: "bench-consumables",
    kind: "safety",
    name: { en: "Cleaning kit, end caps & safety glasses", zh: "清洁套件、端面保护帽与防紫外眼镜", th: "ชุดทำความสะอาด ฝาครอบปลาย และแว่นนิรภัย", vi: "Bộ vệ sinh, nắp đầu ống & kính an toàn" },
    what: {
      en: "The parts a bench actually gets through: the light guide cleaning kit, the coloured end caps that stop a tip being chipped on the bench, and UV safety glasses for everyone standing near an open beam.",
      zh: "工位上真正会消耗掉的东西：导光管清洁套件、防止端面在台面上磕碰的彩色保护帽，以及站在敞开光路附近的人都要戴的防紫外眼镜。",
      th: "ของที่โต๊ะทำงานใช้หมดไปจริง ๆ: ชุดทำความสะอาดท่อนำแสง ฝาครอบปลายสีต่าง ๆ ที่กันปลายบิ่นบนโต๊ะ และแว่นนิรภัย UV สำหรับทุกคนที่ยืนใกล้ลำแสงเปิด",
      vi: "Những thứ một bàn thao tác thực sự dùng hết: bộ vệ sinh ống dẫn sáng, nắp đầu ống nhiều màu giúp đầu ống không bị sứt trên bàn, và kính an toàn UV cho mọi người đứng gần chùm sáng hở.",
    },
    pns: ["019-00052", "019-00090R", "019-00091R", "019-00092R", "019-01010", "854-00001R", "014-00070R"],
    life: {
      kind: "measured",
      basis: {
        en: "Ordered by consumption, not by interval. The one item with a real replacement rule is the safety glasses: replace them when the lens is scratched, crazed or pitted, because scratched UV eyewear does not protect reliably.",
        zh: "按消耗量订，不按周期。唯一有硬性更换规则的是防紫外眼镜：镜片划伤、龟裂或有麻点就必须换——划伤的防紫外眼镜防护不可靠。",
        th: "สั่งตามปริมาณที่ใช้ ไม่ใช่ตามรอบเวลา สิ่งเดียวที่มีกฎการเปลี่ยนจริงจังคือแว่นนิรภัย: ต้องเปลี่ยนเมื่อเลนส์เป็นรอยขีด แตกลายงา หรือเป็นรอยบุ๋ม เพราะแว่นกัน UV ที่เป็นรอยป้องกันได้ไม่น่าเชื่อถือ",
        vi: "Đặt theo mức tiêu hao, không theo chu kỳ. Món duy nhất có quy tắc thay thật sự là kính an toàn: thay khi mắt kính bị xước, rạn hoặc rỗ, vì kính chắn UV bị xước thì bảo vệ không đáng tin.",
      },
    },
    signs: [
      { en: "Safety glasses scratched, crazed or pitted — replace, do not polish", zh: "眼镜划伤、龟裂或有麻点——直接换，不要打磨", th: "แว่นนิรภัยเป็นรอยขีด แตกลายงา หรือเป็นรอยบุ๋ม — ให้เปลี่ยน อย่าขัด", vi: "Kính an toàn bị xước, rạn hoặc rỗ — thay mới, đừng đánh bóng" },
      { en: "Cleaning tissues or swabs run out mid-shift", zh: "清洁纸或棉签在班中用完", th: "กระดาษเช็ดหรือสำลีหมดกลางกะ", vi: "Giấy lau hoặc tăm bông hết giữa ca" },
      { en: "An end cap lost, so a tip is sitting bare on the bench", zh: "保护帽丢了，端面就这么裸露放在台面上", th: "ฝาครอบปลายหาย ทำให้ปลายวางเปลือยอยู่บนโต๊ะ", vi: "Mất nắp đầu ống, khiến đầu ống nằm trần trên bàn" },
    ],
  },
];

export const consumableById = new Map(consumables.map((c) => [c.id, c]));

// ---------------------------------------------------------------------------
// Machines

export type ConsumableMachine = {
  slug: string;
  /** The model as it is printed on the machine. */
  name: string;
  brand: string;
  tech: LangText;
  /** The product page for the machine itself, when it has one. */
  productHref?: string;
  intro: LangText;
  /** Consumable ids, in the order a customer meets them. */
  items: string[];
};

export const consumableMachines: ConsumableMachine[] = [
  {
    slug: "s2000-elite",
    name: "OmniCure S2000 Elite",
    brand: "OmniCure",
    tech: { en: "UV spot curing", zh: "紫外点固化", th: "การบ่มจุดด้วย UV", vi: "Đóng rắn điểm bằng UV" },
    productHref: "/product/omnicure/s2000",
    intro: {
      en: "The Elite runs three consumables in series — lamp, filter cartridge, light guide — and a fall in cure performance can come from any of them. Work them in that order: the lamp has a counter, the filter and the guide do not.",
      zh: "Elite 上有三样耗材串在一条光路上——灯泡、滤片、导光管——固化变差可能出在其中任何一样。按这个顺序查：灯泡有计时器，滤片和导光管没有。",
      th: "Elite มีวัสดุสิ้นเปลืองสามอย่างเรียงกันบนเส้นทางแสงเดียว — หลอด คาร์ทริดจ์ฟิลเตอร์ ท่อนำแสง — และการบ่มที่แย่ลงอาจมาจากอันใดก็ได้ ให้ไล่ตามลำดับนี้: หลอดมีตัวนับ ส่วนฟิลเตอร์และท่อนำแสงไม่มี",
      vi: "Bản Elite có ba vật tư tiêu hao nối tiếp nhau trên cùng đường quang — đèn, hộp kính lọc, ống dẫn sáng — và chất lượng đóng rắn giảm có thể do bất kỳ cái nào. Hãy kiểm theo thứ tự đó: đèn có bộ đếm, kính lọc và ống dẫn sáng thì không.",
    },
    items: ["lamp-s2000-elite", "filter-s2000-elite", "light-guide", "lg-optics", "r2000-calibration", "bench-consumables"],
  },
  {
    slug: "s2000",
    // The nameplate says S2000-XLA, so the page does too: a customer reading
    // the plate on the back of their machine has to recognise this page.
    name: "OmniCure S2000 / S2000-XLA",
    brand: "OmniCure",
    tech: { en: "UV spot curing", zh: "紫外点固化", th: "การบ่มจุดด้วย UV", vi: "Đóng rắn điểm bằng UV" },
    productHref: "/product/omnicure/s2000",
    intro: {
      en: "The S2000 and S2000-XLA platform, still in service across the region. Its lamp module and filters are not the Elite's: check the part number before ordering, because the two sets look alike and will not fit each other. Which filter is fitted to your machine is ticked on the label on its back panel — read that before ordering a replacement.",
      zh: "S2000 与 S2000-XLA 平台，区域内仍有大量在用。它的灯泡模块与滤片与 Elite 不通用：下单前先核料号，两套外观相似但装不上。机器背面标签上勾了哪一格，现装的就是哪一片滤片——订之前先看那张标签。",
      th: "แพลตฟอร์ม S2000 และ S2000-XLA ยังใช้งานอยู่ทั่วภูมิภาค โมดูลหลอดและฟิลเตอร์ไม่ใช่ของ Elite: ตรวจรหัสอะไหล่ก่อนสั่ง เพราะสองชุดหน้าตาคล้ายกันแต่ใส่แทนกันไม่ได้ ฟิลเตอร์ที่ติดตั้งอยู่ถูกติ๊กไว้บนฉลากด้านหลังเครื่อง อ่านก่อนสั่งของทดแทน",
      vi: "Nền tảng S2000 và S2000-XLA, vẫn đang chạy khắp khu vực. Mô-đun đèn và kính lọc của nó không phải của bản Elite: hãy kiểm mã hàng trước khi đặt, vì hai bộ trông giống nhau nhưng không lắp cho nhau được. Kính lọc đang lắp được đánh dấu trên nhãn ở mặt sau máy — hãy đọc nhãn đó trước khi đặt hàng thay thế.",
    },
    items: ["lamp-s2000", "filter-s2000", "light-guide", "lg-optics", "r2000-calibration", "bench-consumables"],
  },
  {
    slug: "lx500",
    name: "OmniCure LX500 / LX505",
    brand: "OmniCure",
    tech: { en: "UV LED spot curing", zh: "UV LED 点固化", th: "การบ่มจุดด้วย UV LED", vi: "Đóng rắn điểm bằng UV LED" },
    productHref: "/product/systems/lx500",
    intro: {
      en: "An LED system has no lamp to change, which moves the maintenance to the optics and the cabling. The lens in front of the head is the part that gets dirty, and on a moving axis the head cable is the part that fails.",
      zh: "LED 系统没有灯泡要换，保养重点就转到光学件与线缆上。灯头前面的镜头最容易脏；如果灯头跟着轴运动，坏的往往是那根线。",
      th: "ระบบ LED ไม่มีหลอดให้เปลี่ยน งานบำรุงรักษาจึงย้ายไปที่ออปติกและสายไฟ เลนส์หน้าหัวคือชิ้นที่สกปรกง่ายที่สุด และบนแกนที่เคลื่อนที่ สายหัวคือชิ้นที่เสีย",
      vi: "Hệ LED không có đèn để thay, nên việc bảo trì dồn sang phần quang và dây cáp. Thấu kính trước đầu đèn là chi tiết bẩn nhanh nhất, còn trên trục chuyển động thì cáp đầu đèn là thứ hỏng.",
    },
    items: ["led-head", "led-optics", "led-cable", "ls200-calibration", "bench-consumables"],
  },
  {
    slug: "ac-series",
    name: "OmniCure AC Series",
    brand: "OmniCure",
    tech: { en: "Air-cooled UV LED area curing", zh: "风冷 UV LED 面固化", th: "การบ่มพื้นที่ด้วย UV LED ระบายอากาศ", vi: "Đóng rắn diện tích bằng UV LED làm mát gió" },
    productHref: "/product/technology/air-cooled-uv-led-curing",
    intro: {
      en: "Two parts keep an air-cooled area head alive, and both are cheap: the window that takes the contamination instead of the array, and the filter that keeps the cooling air clean. Neglecting either shows up as lost irradiance long before it shows up as a fault.",
      zh: "风冷面光源靠两样便宜东西活着：替阵列挨脏的视窗，和保证冷却风干净的滤网。这两样不管，先是光强掉，很久以后才会报故障。",
      th: "สองชิ้นที่ทำให้หัวบ่มพื้นที่แบบระบายอากาศอยู่รอด และทั้งคู่ราคาถูก: หน้าต่างที่รับสิ่งสกปรกแทนอาร์เรย์ และไส้กรองที่ทำให้อากาศระบายความร้อนสะอาด ละเลยอย่างใดอย่างหนึ่งจะเห็นเป็นความเข้มรังสีที่หายไปนานก่อนที่จะขึ้นเป็นความผิดพลาด",
      vi: "Hai chi tiết giữ cho đầu đèn diện tích làm mát gió sống được, và cả hai đều rẻ: cửa sổ hứng bẩn thay cho dàn LED, và tấm lọc giữ sạch luồng gió làm mát. Bỏ bê cái nào cũng sẽ hiện ra dưới dạng mất cường độ bức xạ từ rất lâu trước khi nó hiện ra dưới dạng lỗi.",
    },
    items: ["ac-window", "ac-air-filter", "ls200-calibration", "bench-consumables"],
  },
];

export const machineBySlug = new Map(consumableMachines.map((m) => [m.slug, m]));
export const isConsumableMachine = (slug: string): boolean => machineBySlug.has(slug);

// ---------------------------------------------------------------------------
// Joining to the part catalogue

export type ConsumablePart = { pn: string; desc: string; note?: string };

const partByPn = new Map(parts.map((p) => [p.pn, p]));

/**
 * The catalogue rows for a consumable, in the order the consumable lists them.
 * A part number with no catalogue entry is dropped rather than shown bare: a
 * number with no description is not something a customer can order against.
 */
export function partsFor(c: Consumable): ConsumablePart[] {
  return c.pns
    .map((pn) => partByPn.get(pn))
    .filter((p): p is NonNullable<typeof p> => Boolean(p))
    .map((p) => ({ pn: p.pn, desc: p.desc, ...(p.note ? { note: p.note } : {}) }));
}

/** Consumables for a machine, in the machine's own order, unknown ids dropped. */
export function consumablesFor(slug: string): Consumable[] {
  const m = machineBySlug.get(slug);
  if (!m) return [];
  return m.items.map((id) => consumableById.get(id)).filter((c): c is Consumable => Boolean(c));
}

/** Which machines a consumable appears on — used for the cross-links. */
export function machinesUsing(id: string): ConsumableMachine[] {
  return consumableMachines.filter((m) => m.items.includes(id));
}

/**
 * Which consumables page a catalogue product belongs to. A product page is
 * where a customer lands when they are choosing a machine; the consumables
 * page is where they land two years later. This is the link between them.
 */
export const machineForProduct: Record<string, string> = {
  "s2000-elite": "s2000-elite",
  "s2000-elite-filters": "s2000-elite",
  "s2000-lamp": "s2000-elite",
  "s1500-pro": "s2000",
  "s-liquid-light-guide": "s2000-elite",
  "s-fiber-light-guide": "s2000-elite",
  "s-fiber-light-line": "s2000-elite",
  "s-cure-ring-adapter": "s2000-elite",
  "s-light-line-adapter": "s2000-elite",
  "s-collimating-adapter": "s2000-elite",
  r2000: "s2000-elite",
  lx500: "lx500",
  lx505: "lx500",
  "v3-led-heads": "lx500",
  ls200: "lx500",
  ac2: "ac-series",
  ac4: "ac-series",
  ac5: "ac-series",
  ac7: "ac-series",
  ac8: "ac-series",
  "ac8-hd": "ac-series",
  ac9225: "ac-series",
  "ac9225-f": "ac-series",
};

export const consumablesHref = (slug?: string) => (slug ? `/consumables/${slug}` : "/consumables");
