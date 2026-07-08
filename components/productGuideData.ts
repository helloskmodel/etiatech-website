import type { LangText } from "@/components/LocaleContext";

// ─────────────────────────────────────────────────────────────────────────
// Data-driven OmniCure product-guide pages.
// One template (components/ProductGuideView.tsx) renders every record below,
// served at /product/omnicure/<slug>. To add a product: append a record here
// and add `href: "/product/omnicure/<slug>"` to its catalog entry so the
// systems route skips it (no duplicate page) and brand cards point here.
//
// Plain (non-client) module: the route reads these for <title>, description,
// keywords and Product/Breadcrumb/FAQ JSON-LD on the server.
// ─────────────────────────────────────────────────────────────────────────

export type GuideCard = { icon?: string; title: LangText; body: LangText };
export type GuideFaq = { q: LangText; a: LangText };
export type GuideLink = { href: string; label: LangText };

export type ProductGuide = {
  slug: string; // URL segment under /product/omnicure/
  productName: string; // used inside H2/H3 headings, e.g. "OmniCure LX500"
  breadcrumbName: string; // short crumb label, e.g. "LX500"
  eyebrow: LangText;
  h1: LangText; // full keyword H1
  headline: LangText;
  subheadline: LangText;
  heroImage: string;
  heroAlt: string;
  stats: { val: string; label: LangText }[];
  overview: LangText;
  features: GuideCard[];
  pdfs: { brochure?: string; quickStart?: string; userGuide?: string };
  setup: GuideCard[];
  troubleshooting: GuideCard[];
  errorTable?: { title: LangText; cols: LangText[]; rows: string[][] };
  support: GuideCard[];
  faqs: GuideFaq[];
  relatedLinks: GuideLink[];
  // SEO (server)
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  schemaCategory: string;
  schemaDescription: string;
};

const PDF_BASE = "https://etiatech-1303055923.cos.ap-singapore.myqcloud.com/PDF";
const IMG_BASE = "https://etiatech-1303055923.cos.ap-singapore.myqcloud.com/IMAGE/product";
const pdf = (name: string) => `${PDF_BASE}/${encodeURIComponent(name)}`;

const whyEtiaNote =
  "ETIA supports manufacturers across China, Thailand, Vietnam, and Southeast Asia with genuine OmniCure products, application consultation, local supply, installation training, maintenance, repair support, and troubleshooting.";

// ───────────────────────────── LX500 ─────────────────────────────
const lx500: ProductGuide = {
  slug: "lx500",
  productName: "OmniCure LX500",
  breadcrumbName: "LX500",
  eyebrow: { en: "OmniCure LX Series · UV LED Spot Curing", zh: "OmniCure LX 系列 · UV LED 点固化" },
  h1: { en: "OmniCure LX500 UV LED Spot Curing System", zh: "OmniCure LX500 UV LED 点固化系统" },
  headline: { en: "Flexible Power. Consistent Cures.", zh: "灵活功率,稳定固化。" },
  subheadline: {
    en: "High-performance UV LED spot curing with Intelli-Lamp stability, up to four-head control, and ±5% optical stability for repeatable, energy-efficient manufacturing.",
    zh: "高性能 UV LED 点固化,配备 Intelli-Lamp 稳定性、最多四灯头控制与 ±5% 光学稳定性,实现可重复、节能的制造。",
  },
  heroImage: `${IMG_BASE}/LX500.png`,
  heroAlt: "OmniCure LX500 UV LED Spot Curing System controller with UV LED head",
  stats: [
    { val: "Up to 27 W/cm²", label: { en: "V3 LED irradiance", zh: "V3 灯头辐照度" } },
    { val: "±5%", label: { en: "Optical stability", zh: "光学稳定性" } },
    { val: "2 or 4", label: { en: "Head channels", zh: "灯头通道" } },
    { val: "365–405 nm", label: { en: "UV LED wavelengths", zh: "UV LED 波长" } },
  ],
  overview: {
    en: "The OmniCure LX500 is a UV LED spot curing controller designed for flexible, repeatable, energy-efficient production. Available in 2- or 4-channel configurations, it manages up to four UV LED heads simultaneously or independently at 365, 385, 395, and 405 nm. Proprietary Intelli-Lamp technology monitors head temperature and lifetime while automatically maintaining ±5% optical stability for consistent process assurance.",
    zh: "OmniCure LX500 是一款 UV LED 点固化控制器,专为灵活、可重复、节能的生产而设计。提供 2 通道或 4 通道配置,可在 365、385、395、405 nm 下同时或独立控制最多四个 UV LED 灯头。专有的 Intelli-Lamp 技术监测灯头温度与寿命,并自动保持 ±5% 光学稳定性,确保工艺一致。",
  },
  features: [
    { icon: "layers", title: { en: "OmniCure LX500 Multi-Head Control", zh: "OmniCure LX500 多灯头控制" }, body: { en: "Control up to four UV LED spot curing heads simultaneously or independently from a single 2- or 4-channel controller.", zh: "用单个 2 或 4 通道控制器同时或独立控制最多四个 UV LED 点固化灯头。" } },
    { icon: "lightbulb", title: { en: "OmniCure LX500 Intelli-Lamp LED Technology", zh: "OmniCure LX500 Intelli-Lamp LED 技术" }, body: { en: "Intelli-Lamp monitors LED head temperature and lifetime while maintaining ±5% optical stability over the LED lifetime for reliable, repeatable curing.", zh: "Intelli-Lamp 监测 LED 灯头温度与寿命,并在 LED 整个寿命内保持 ±5% 光学稳定性,实现可靠、可重复的固化。" } },
    { icon: "aperture", title: { en: "OmniCure LX500 Multiple UV Wavelengths", zh: "OmniCure LX500 多种 UV 波长" }, body: { en: "Supports 365, 385, 395, and 405 nm UV LED heads at high irradiance to cover a wide range of photoinitiator chemistries.", zh: "支持 365、385、395、405 nm 的高辐照度 UV LED 灯头,覆盖多种光引发剂化学体系。" } },
    { icon: "settings", title: { en: "OmniCure LX500 Precise Intensity Control", zh: "OmniCure LX500 精确强度控制" }, body: { en: "Set light intensity from 5–100% in 1% increments for consistent, repeatable UV dose across every exposure.", zh: "以 1% 增量在 5–100% 范围内设置光强,确保每次曝光的 UV 剂量一致、可重复。" } },
    { icon: "cpu", title: { en: "OmniCure LX500 StepCure Multi-Phase Curing", zh: "OmniCure LX500 StepCure 多阶段固化" }, body: { en: "StepCure enables customized multi-phase curing profiles via the controller or PC interface for advanced process control.", zh: "StepCure 可通过控制器或 PC 界面创建定制的多阶段固化配置,实现高级工艺控制。" } },
    { icon: "layers3", title: { en: "OmniCure LX500 Micro SD Programming & Logging", zh: "OmniCure LX500 Micro SD 编程与日志" }, body: { en: "A Micro SD interface enables easy single-step programming and automatically saves exposure events and faults in real time.", zh: "Micro SD 接口支持便捷的一步编程,并实时自动保存曝光事件与故障记录。" } },
    { icon: "sun", title: { en: "OmniCure LX500 V3 UV LED Head Support", zh: "OmniCure LX500 V3 UV LED 灯头支持" }, body: { en: "Supports OmniCure's higher-power V3 UV LED Heads delivering up to 27 W/cm² irradiance and up to 1,100 mW optical power.", zh: "支持 OmniCure 更高功率的 V3 UV LED 灯头,提供最高 27 W/cm² 辐照度与最高 1,100 mW 光功率。" } },
    { icon: "zap", title: { en: "OmniCure LX500 Energy-Efficient Compact Design", zh: "OmniCure LX500 节能紧凑设计" }, body: { en: "Uses about 75% less energy than a typical UV arc-lamp system, with a compact, robust design that needs no cooling in dense environments.", zh: "比典型 UV 弧光灯系统节能约 75%,采用紧凑坚固设计,在密集环境中无需冷却。" } },
  ],
  pdfs: {
    brochure: pdf("Brochure - OmniCure LX500 LED Spot UV Curing System.pdf"),
    quickStart: pdf("Quick Start Guide - OmniCure LX500 LED Spot UV Curing System.pdf"),
    userGuide: pdf("User Guide - OmniCure LX500 LED Spot UV Curing System.pdf"),
  },
  setup: [
    { title: { en: "OmniCure LX500 Controller Power & Connection", zh: "OmniCure LX500 控制器供电与连接" }, body: { en: "Connect the AC power cord to a grounded outlet, insert the DC adapter into the controller's DC IN, and set the power switch to “I” (ON).", zh: "将 AC 电源线接入接地插座,把 DC 适配器插入控制器背面的 DC IN,并将电源开关拨到 “I”(ON)。" } },
    { title: { en: "OmniCure LX500 UV LED Head Installation", zh: "OmniCure LX500 UV LED 灯头安装" }, body: { en: "With power off, insert each UV LED head into its channel until the locking connector seats. Heads are interchangeable to any channel.", zh: "断电后,将每个 UV LED 灯头插入通道,直至锁扣连接器到位。灯头可互换至任意通道。" } },
    { title: { en: "OmniCure LX500 Door Interlock / Safety Jumper", zh: "OmniCure LX500 门锁 / 安全跳线" }, body: { en: "If not using an external PLC, connect the door-interlock jumper between pins 24 and 25 on the PLC connector — a closed contact enables head output.", zh: "若不使用外部 PLC,把门锁跳线接在 PLC 接口的 24 与 25 针之间——接点闭合才会启用灯头输出。" } },
    { title: { en: "OmniCure LX500 Intensity Setting", zh: "OmniCure LX500 强度设置" }, body: { en: "Set intensity from 5–100% in 1% increments using the 4-way membrane control. Calibrate with the LS200 for W/cm² or W control.", zh: "用四向薄膜按键以 1% 增量在 5–100% 设置强度。使用 LS200 校准后可用 W/cm² 或 W 控制。" } },
    { title: { en: "OmniCure LX500 Exposure & StepCure Setup", zh: "OmniCure LX500 曝光与 StepCure 设置" }, body: { en: "Set exposure time and trigger source. StepCure multi-phase profiles run only in countdown mode (status-bar arrow pointing down).", zh: "设置曝光时间与触发源。StepCure 多阶段配置仅在倒计时模式下运行(状态栏箭头朝下)。" } },
    { title: { en: "OmniCure LX500 Micro SD Programming", zh: "OmniCure LX500 Micro SD 编程" }, body: { en: "Use the Micro SD card for single-step programming and to automatically log exposure events and faults for traceability.", zh: "使用 Micro SD 卡进行一步编程,并自动记录曝光事件与故障以便追溯。" } },
  ],
  troubleshooting: [
    { title: { en: "OmniCure LX500 UV Head Does Not Light", zh: "OmniCure LX500 UV 灯头不亮" }, body: { en: "Confirm the door-interlock jumper is closed between pins 24–25 on the PLC connector, and that the UV LED head is fully seated in its channel (power off before reseating). If the issue continues, contact ETIA technical support.", zh: "确认门锁跳线在 PLC 接口 24–25 针之间已短接,且 UV LED 灯头已完全插入通道(重新插拔前先断电)。如问题持续,请联系 ETIA 技术支持。" } },
    { title: { en: "OmniCure LX500 Head Overheating (Error 1)", zh: "OmniCure LX500 灯头过热(Error 1)" }, body: { en: "Check the fixture position on the head, keep ambient temperature below 35°C, verify emission/timer mode, and confirm the lens is clean. The head recovers once it cools below the threshold.", zh: "检查夹具在灯头上的位置,保持环境温度低于 35°C,核实发射/计时模式,并确认镜头清洁。温度降到阈值以下后灯头会恢复。" } },
    { title: { en: "OmniCure LX500 Low Output Intensity", zh: "OmniCure LX500 输出强度偏低" }, body: { en: "With power off, check the head lens is clean, verify the intensity setpoint, and — when using closed-loop feedback — keep intensity below about 80% so the feedback does not reach its limit. If the issue continues, contact ETIA technical support.", zh: "断电后检查灯头镜头是否洁净,核实强度设定值;使用闭环反馈时,将强度设在约 80% 以下,以免反馈达到上限。如问题持续,请联系 ETIA 技术支持。" } },
    { title: { en: "OmniCure LX500 StepCure Not Running", zh: "OmniCure LX500 StepCure 不运行" }, body: { en: "StepCure runs only in countdown mode (status-bar arrow pointing down). Confirm you are not in count-up mode, the trigger source matches your input, and the intensity type matches the head calibration.", zh: "StepCure 仅在倒计时模式下运行(状态栏箭头朝下)。确认不在计数上升模式、触发源与输入一致、强度类型与灯头校准匹配。" } },
    { title: { en: "OmniCure LX500 Front Panel Locked", zh: "OmniCure LX500 前面板锁定" }, body: { en: "If a lock icon appears in the status bar, the front panel is locked by a PLC input or PC command. Release the lock via PLC/PC; the lock does not persist after a power cycle.", zh: "若状态栏出现锁图标,说明前面板被 PLC 输入或 PC 指令锁定。通过 PLC/PC 解锁;锁定状态在断电重启后不保留。" } },
    { title: { en: "OmniCure LX500 Controller Will Not Power On", zh: "OmniCure LX500 控制器无法通电" }, body: { en: "Confirm the AC power cord is secure in a grounded outlet, the DC adapter is inserted into DC IN, and the power switch is set to “I” (ON). Use only the supplied or an equivalent certified cable.", zh: "确认 AC 电源线牢固接入接地插座、DC 适配器已插入 DC IN、电源开关拨到 “I”(ON)。仅使用随附或同等认证的线缆。" } },
  ],
  errorTable: {
    title: { en: "OmniCure LX500 Error Code Reference", zh: "OmniCure LX500 错误码速查" },
    cols: [{ en: "Code", zh: "错误码" }, { en: "Meaning", zh: "含义" }, { en: "Action", zh: "处理" }],
    rows: [
      ["Error 1", "UV LED head exceeded allowed operating temperature", "Check fixture position, emission/timer mode, lens cleanliness"],
      ["Error 2", "Head short circuit", "Check head-to-controller connection"],
      ["Error 3", "Head disconnected after power-on", "Check connection; power-cycle to restart"],
      ["Error 4", "Head open circuit", "Check connection and head cable for damage"],
      ["Error 5", "Head 1-wire memory chip error", "Check head connection; power-cycle"],
      ["Error 6", "Head temperature cannot be read", "Check head connection; power-cycle"],
      ["Error 7", "Head in a different controller/port position", "Reinsert as prompted; press Select to confirm"],
      ["Error 8", "StepCure intensity exceeds head capability", "Adjust intensity or recalibrate the head"],
      ["System 1–3", "Internal hardware/communication/storage error", "Restart the system; if persistent, contact service"],
      ["System 5", "System performance limit", "Slow down the control input rate"],
    ],
  },
  support: [
    { icon: "sun", title: { en: "OmniCure LX500 UV LED Head Support", zh: "OmniCure LX500 UV LED 灯头支持" }, body: { en: "Support for V3 UV LED head selection at 365/385/395/405 nm and head replacement.", zh: "支持 365/385/395/405 nm 的 V3 UV LED 灯头选型与更换。" } },
    { icon: "aperture", title: { en: "OmniCure LX500 Lens & Accessory Support", zh: "OmniCure LX500 镜头与配件支持" }, body: { en: "Support for focusing lenses, adapters, extension cables, and foot-pedal/PLC accessories.", zh: "支持聚焦镜头、适配器、延长线缆与脚踏板/PLC 配件。" } },
    { icon: "crosshair", title: { en: "OmniCure LX500 Radiometry & Calibration Support", zh: "OmniCure LX500 辐射测量与校准支持" }, body: { en: "Support for OmniCure LS200 radiometry and repeatable W/cm² or W intensity control.", zh: "支持 OmniCure LS200 辐射测量与可重复的 W/cm² 或 W 强度控制。" } },
    { icon: "cpu", title: { en: "OmniCure LX500 StepCure & PLC Integration Support", zh: "OmniCure LX500 StepCure 与 PLC 集成支持" }, body: { en: "Support for StepCure profiles, PLC and USB integration, and automated line setup.", zh: "支持 StepCure 配置、PLC 与 USB 集成,以及自动化产线搭建。" } },
    { icon: "wrench", title: { en: "OmniCure LX500 Maintenance & Repair Support", zh: "OmniCure LX500 维护与维修支持" }, body: { en: "Support for routine maintenance, troubleshooting, and repair coordination.", zh: "支持日常维护、故障排除与维修协调。" } },
  ],
  faqs: [
    { q: { en: "Where can I download the OmniCure LX500 user guide?", zh: "在哪里可以下载 OmniCure LX500 用户指南?" }, a: { en: "Download the OmniCure LX500 User Guide, Quick Start Guide, and Brochure from the User Guides & Technical Resources section on this page. The User Guide covers setup, UV LED head installation, intensity control, StepCure, Micro SD programming, error codes, and maintenance.", zh: "可从本页面的“用户指南与技术资源”部分下载 OmniCure LX500 用户指南、快速入门指南与产品手册。用户指南涵盖设置、UV LED 灯头安装、强度控制、StepCure、Micro SD 编程、错误码与维护。" } },
    { q: { en: "How many UV LED heads can the OmniCure LX500 control?", zh: "OmniCure LX500 可以控制多少个 UV LED 灯头?" }, a: { en: "The OmniCure LX500 is available in 2- or 4-channel configurations and can control up to four UV LED spot curing heads simultaneously or independently from a single controller.", zh: "OmniCure LX500 提供 2 通道或 4 通道配置,可用单个控制器同时或独立控制最多四个 UV LED 点固化灯头。" } },
    { q: { en: "What wavelengths does the OmniCure LX500 support?", zh: "OmniCure LX500 支持哪些波长?" }, a: { en: "The OmniCure LX500 supports 365, 385, 395, and 405 nm UV LED heads. With V3 UV LED Heads it delivers up to 27 W/cm² irradiance and up to 1,100 mW optical power.", zh: "OmniCure LX500 支持 365、385、395、405 nm 的 UV LED 灯头。搭配 V3 UV LED 灯头时,可提供最高 27 W/cm² 辐照度与最高 1,100 mW 光功率。" } },
    { q: { en: "Why is the OmniCure LX500 UV head not lighting up?", zh: "为什么 OmniCure LX500 的 UV 灯头不亮?" }, a: { en: "Check the door interlock / safety jumper (pins 24–25 on the PLC connector must be closed to enable head output) and confirm the UV LED head is fully seated in its channel. If the issue continues, contact ETIA technical support.", zh: "检查门锁 / 安全跳线(PLC 接口的 24–25 针必须短接才能启用灯头输出),并确认 UV LED 灯头已完全插入通道。如问题持续,请联系 ETIA 技术支持。" } },
    { q: { en: "What does OmniCure LX500 Error 1 mean?", zh: "OmniCure LX500 的 Error 1 是什么意思?" }, a: { en: "Error 1 indicates the UV LED head exceeded its allowed operating temperature. Check the fixture position on the head, ambient temperature (below 35°C), emission/timer mode, and lens cleanliness. The head recovers once it cools below the threshold.", zh: "Error 1 表示 UV LED 灯头超过了允许的工作温度。请检查夹具位置、环境温度(低于 35°C)、发射/计时模式与镜头清洁度。温度降到阈值以下后灯头会恢复。" } },
    { q: { en: "Why won't StepCure run on the OmniCure LX500?", zh: "为什么 StepCure 在 OmniCure LX500 上不运行?" }, a: { en: "StepCure only runs in countdown mode (the status-bar arrow points down). Confirm you are not in count-up mode, that the trigger source matches your input, and that the intensity type matches the head calibration.", zh: "StepCure 仅在倒计时模式下运行(状态栏箭头朝下)。请确认不在计数上升模式、触发源与输入一致、且强度类型与灯头校准匹配。" } },
    { q: { en: "How do I keep the OmniCure LX500 output stable?", zh: "如何保持 OmniCure LX500 的输出稳定?" }, a: { en: "The LX500's Intelli-Lamp technology maintains ±5% optical stability over LED lifetime. For W/cm² or W control, calibrate with the OmniCure LS200 radiometry system; when using closed-loop feedback, keep intensity below about 80%.", zh: "LX500 的 Intelli-Lamp 技术在 LED 整个寿命内保持 ±5% 光学稳定性。若需 W/cm² 或 W 控制,请用 OmniCure LS200 校准;使用闭环反馈时,建议将强度设在约 80% 以下。" } },
    { q: { en: "Can ETIA provide OmniCure LX500 support and V3 LED heads?", zh: "ETIA 能提供 OmniCure LX500 支持与 V3 LED 灯头吗?" }, a: { en: "Yes. ETIA supplies genuine OmniCure LX500 controllers, V3 UV LED heads, focusing lenses and accessories, and provides calibration, StepCure/PLC integration, maintenance, and troubleshooting across China, Thailand, Vietnam, and Southeast Asia.", zh: "可以。ETIA 供应正品 OmniCure LX500 控制器、V3 UV LED 灯头、聚焦镜头与配件,并在中国、泰国、越南及东南亚地区提供校准、StepCure/PLC 集成、维护与故障排除。" } },
  ],
  relatedLinks: [
    { href: "/product/omnicure", label: { en: "OmniCure product family", zh: "OmniCure 产品系列" } },
    { href: "/product/systems/v3-led-heads", label: { en: "OmniCure V3 UV LED Heads", zh: "OmniCure V3 UV LED 灯头" } },
    { href: "/product/systems/ls200", label: { en: "OmniCure LS200 radiometer", zh: "OmniCure LS200 辐射计" } },
    { href: "/contact", label: { en: "Sales & Support", zh: "销售与支持" } },
  ],
  metaTitle: "OmniCure LX500 UV LED Spot Curing System | User Guide & Support | ETIA",
  metaDescription:
    "OmniCure LX500 UV LED spot curing controller — download the user guide, quick start guide, and brochure. 2/4-head control, 365–405 nm, Intelli-Lamp ±5% stability, StepCure, V3 LED heads, error codes, calibration, and ETIA technical support.",
  keywords: [
    "OmniCure LX500",
    "OmniCure LX500 UV LED Spot Curing System",
    "OmniCure LX500 user guide",
    "OmniCure LX500 quick start guide",
    "OmniCure LX500 troubleshooting",
    "OmniCure LX500 error codes",
    "OmniCure LX500 V3 LED heads",
    "OmniCure LX500 StepCure",
    "OmniCure LX500 calibration",
    "OmniCure LX500 LS200",
    "OmniCure LX500 technical support",
  ],
  schemaCategory: "UV LED Spot Curing System",
  schemaDescription:
    "UV LED spot curing controller with 2- or 4-channel head control at 365/385/395/405 nm, Intelli-Lamp ±5% optical stability, StepCure multi-phase curing, Micro SD programming, and support for V3 UV LED heads up to 27 W/cm².",
};

// ───────────────────────────── S1500 Pro ─────────────────────────────
const s1500Pro: ProductGuide = {
  slug: "s1500-pro",
  productName: "OmniCure S1500 Pro",
  breadcrumbName: "S1500 Pro",
  eyebrow: { en: "OmniCure S Series · Lamp-Based UV Spot Curing", zh: "OmniCure S 系列 · 灯式 UV 点固化" },
  h1: { en: "OmniCure S1500 Pro UV Spot Curing System", zh: "OmniCure S1500 Pro UV 点固化系统" },
  headline: { en: "Automation-Ready UV Curing.", zh: "为自动化而生的 UV 固化。" },
  subheadline: {
    en: "Lamp-based UV spot curing with Intelli-Lamp 2.0, StepCure 2.0 multi-phase profiles, a 4.3-inch touchscreen, and Industry 4.0 traceability for automated manufacturing.",
    zh: "灯式 UV 点固化,配备 Intelli-Lamp 2.0、StepCure 2.0 多阶段配置、4.3 英寸触摸屏与工业 4.0 可追溯性,适用于自动化制造。",
  },
  heroImage: `${IMG_BASE}/S1500.png`,
  heroAlt: "OmniCure S1500 Pro UV Spot Curing System with 4.3-inch touchscreen",
  stats: [
    { val: "Up to 30 W/cm²", label: { en: "Output irradiance", zh: "输出辐照度" } },
    { val: "2,000 h", label: { en: "Guaranteed lamp life", zh: "保证灯管寿命" } },
    { val: "7 filters", label: { en: "User-interchangeable", zh: "用户可换" } },
    { val: "PLC · NFC · SD", label: { en: "Industry 4.0 ready", zh: "工业 4.0 就绪" } },
  ],
  overview: {
    en: "The OmniCure S1500 Pro is a lamp-based UV spot curing system designed for automated manufacturing. Intelli-Lamp 2.0 continuously monitors lamp parameters and optimizes lamp life (2,000 hours guaranteed), while integrated StepCure 2.0 enables customizable multi-phase curing profiles. A 4.3-inch LCD touchscreen simplifies operation, and Industry 4.0 features — programmable PLC output, a Flight Recorder event tracker, and Intelli-Tap NFC — support validated, traceable production.",
    zh: "OmniCure S1500 Pro 是一款灯式 UV 点固化系统,专为自动化制造设计。Intelli-Lamp 2.0 持续监测灯管参数并优化灯管寿命(保证 2,000 小时),内置 StepCure 2.0 可创建定制的多阶段固化配置。4.3 英寸 LCD 触摸屏简化操作,工业 4.0 功能——可编程 PLC 输出、Flight Recorder 事件记录与 Intelli-Tap NFC——支持经验证、可追溯的生产。",
  },
  features: [
    { icon: "lightbulb", title: { en: "OmniCure S1500 Pro Intelli-Lamp 2.0 Technology", zh: "OmniCure S1500 Pro Intelli-Lamp 2.0 技术" }, body: { en: "Intelli-Lamp 2.0 constantly monitors lamp parameters and optimizes lamp life, with 2,000 hours guaranteed.", zh: "Intelli-Lamp 2.0 持续监测灯管参数并优化灯管寿命,保证 2,000 小时。" } },
    { icon: "cpu", title: { en: "OmniCure S1500 Pro StepCure 2.0 Curing Profiles", zh: "OmniCure S1500 Pro StepCure 2.0 固化配置" }, body: { en: "StepCure 2.0 enables precise programming of multi-phase curing profiles for repeatable, validated processes.", zh: "StepCure 2.0 可精确编程多阶段固化配置,实现可重复、经验证的工艺。" } },
    { icon: "scan", title: { en: "OmniCure S1500 Pro Touchscreen User Interface", zh: "OmniCure S1500 Pro 触摸屏用户界面" }, body: { en: "A 4.3-inch high-resolution LCD touchscreen simplifies operation, settings, and exposure control.", zh: "4.3 英寸高分辨率 LCD 触摸屏简化操作、设置与曝光控制。" } },
    { icon: "zap", title: { en: "OmniCure S1500 Pro High UV Output", zh: "OmniCure S1500 Pro 高 UV 输出" }, body: { en: "A 200-Watt UV lamp delivers outputs up to 30 W/cm² for demanding spot curing applications.", zh: "200 瓦 UV 灯管提供最高 30 W/cm² 输出,满足严苛的点固化应用。" } },
    { icon: "aperture", title: { en: "OmniCure S1500 Pro Interchangeable Filters & Lamp", zh: "OmniCure S1500 Pro 可换滤光片与灯管" }, body: { en: "User-interchangeable optical filters (7 options) and lamp types allow fast configuration for different chemistries.", zh: "用户可更换的光学滤光片(7 种)与灯管类型,可针对不同化学体系快速配置。" } },
    { icon: "settings", title: { en: "OmniCure S1500 Pro StepCure PLC Output", zh: "OmniCure S1500 Pro StepCure PLC 输出" }, body: { en: "A programmable PLC output via the DB50 port integrates the S1500 Pro into automated production lines.", zh: "通过 DB50 端口的可编程 PLC 输出,将 S1500 Pro 集成到自动化产线。" } },
    { icon: "radio", title: { en: "OmniCure S1500 Pro Intelli-Tap NFC Access Control", zh: "OmniCure S1500 Pro Intelli-Tap NFC 访问控制" }, body: { en: "Intelli-Tap NFC keycards (Admin and Supervisor levels) protect and control validated process settings.", zh: "Intelli-Tap NFC 钥匙卡(管理员与主管等级)保护并控制经验证的工艺设置。" } },
    { icon: "layers3", title: { en: "OmniCure S1500 Pro Flight Recorder Traceability", zh: "OmniCure S1500 Pro Flight Recorder 可追溯性" }, body: { en: "The Flight Recorder system event tracker plus USB and SD connectivity support Industry 4.0 traceability.", zh: "Flight Recorder 系统事件记录器配合 USB 与 SD 连接,支持工业 4.0 可追溯性。" } },
  ],
  pdfs: {
    brochure: pdf("Brochure - OmniCure S1500 Pro.pdf"),
    quickStart: pdf("Quick Start Guide - OmniCure S1500 Pro.pdf"),
    userGuide: pdf("User Guide - OmniCure S1500 Pro - English.pdf"),
  },
  setup: [
    { title: { en: "OmniCure S1500 Pro Startup", zh: "OmniCure S1500 Pro 启动" }, body: { en: "Install the lamp module, install the optical filter, connect power, turn on the system, and allow proper warm-up before operation.", zh: "安装灯管模块、安装光学滤光片、连接电源、开启系统,并在操作前进行充分预热。" } },
    { title: { en: "OmniCure S1500 Pro Light Guide Installation", zh: "OmniCure S1500 Pro 导光管安装" }, body: { en: "Insert the light guide into the front light guide port until it clicks into place. The system is backward compatible with original S1500 light guides.", zh: "将导光管插入前部导光管端口,直至卡入到位。系统向后兼容原始 S1500 导光管。" } },
    { title: { en: "OmniCure S1500 Pro Exposure Time Setting", zh: "OmniCure S1500 Pro 曝光时间设置" }, body: { en: "Set exposure time from the Run screen using the 4.3-inch touchscreen.", zh: "在运行界面上使用 4.3 英寸触摸屏设置曝光时间。" } },
    { title: { en: "OmniCure S1500 Pro Intensity Setting", zh: "OmniCure S1500 Pro 强度设置" }, body: { en: "Set intensity from the touchscreen. Calibration with a radiometer is required for W/cm² control.", zh: "通过触摸屏设置强度。W/cm² 控制需要用辐射计校准。" } },
    { title: { en: "OmniCure S1500 Pro StepCure Profile Setup", zh: "OmniCure S1500 Pro StepCure 配置设置" }, body: { en: "Build a multi-phase StepCure 2.0 profile on the touchscreen and assign the programmable PLC output for automation.", zh: "在触摸屏上创建多阶段 StepCure 2.0 配置,并分配可编程 PLC 输出用于自动化。" } },
    { title: { en: "OmniCure S1500 Pro Lock and Unlock", zh: "OmniCure S1500 Pro 锁定与解锁" }, body: { en: "Use PIN or Intelli-Tap NFC keycard access control to protect validated curing settings.", zh: "使用 PIN 或 Intelli-Tap NFC 钥匙卡访问控制,保护经验证的固化设置。" } },
  ],
  troubleshooting: [
    { title: { en: "OmniCure S1500 Pro Lamp Does Not Strike", zh: "OmniCure S1500 Pro 灯管无法点亮" }, body: { en: "Check lamp installation, optical filter installation, the lamp housing panel, the power connection, and system status. If the issue continues, contact ETIA technical support.", zh: "检查灯管安装、光学滤光片安装、灯罩面板、电源连接与系统状态。如问题持续,请联系 ETIA 技术支持。" } },
    { title: { en: "OmniCure S1500 Pro Light Guide Not Detected", zh: "OmniCure S1500 Pro 未检测到导光管" }, body: { en: "Check whether the light guide is fully inserted and properly seated in the light guide port. If the issue continues, contact ETIA technical support.", zh: "检查导光管是否完全插入并正确安装在导光管端口中。如问题持续,请联系 ETIA 技术支持。" } },
    { title: { en: "OmniCure S1500 Pro Filter Not Recognized", zh: "OmniCure S1500 Pro 无法识别滤光片" }, body: { en: "Confirm the optical filter cartridge is properly installed and fastened. If the filter is not properly installed, the system may not recognize it and the lamp may not strike.", zh: "确认光学滤光片卡盒已正确安装并固定。若滤光片未正确安装,系统可能无法识别,灯管也可能无法点亮。" } },
    { title: { en: "OmniCure S1500 Pro Output Intensity Unstable", zh: "OmniCure S1500 Pro 输出强度不稳定" }, body: { en: "Allow sufficient warm-up, verify calibration, inspect the light guide, and check lamp life status via Intelli-Lamp 2.0. If the issue continues, contact ETIA technical support.", zh: "进行充分预热、核实校准、检查导光管,并通过 Intelli-Lamp 2.0 查看灯管寿命状态。如问题持续,请联系 ETIA 技术支持。" } },
    { title: { en: "OmniCure S1500 Pro StepCure Not Running", zh: "OmniCure S1500 Pro StepCure 不运行" }, body: { en: "Confirm the StepCure 2.0 profile is programmed correctly and the exposure mode and trigger source match your setup. If the issue continues, contact ETIA technical support.", zh: "确认 StepCure 2.0 配置编程正确,且曝光模式与触发源与设置匹配。如问题持续,请联系 ETIA 技术支持。" } },
    { title: { en: "OmniCure S1500 Pro System Locked", zh: "OmniCure S1500 Pro 系统锁定" }, body: { en: "Use the configured PIN or an Intelli-Tap Supervisor/Admin NFC keycard depending on the access-control setup. If the issue continues, contact ETIA technical support.", zh: "根据访问控制设置,使用配置的 PIN 或 Intelli-Tap 主管/管理员 NFC 钥匙卡。如问题持续,请联系 ETIA 技术支持。" } },
  ],
  support: [
    { icon: "sun", title: { en: "OmniCure S1500 Pro Replacement Lamp Support", zh: "OmniCure S1500 Pro 替换灯管支持" }, body: { en: "Support for lamp type selection and genuine replacement lamp supply.", zh: "支持灯管类型选型与正品替换灯管供应。" } },
    { icon: "aperture", title: { en: "OmniCure S1500 Pro Optical Filter Support", zh: "OmniCure S1500 Pro 光学滤光片支持" }, body: { en: "Support for selecting and replacing the 7 optical band-pass filters.", zh: "支持 7 种光学带通滤光片的选型与更换。" } },
    { icon: "cable", title: { en: "OmniCure S1500 Pro Light Guide Support", zh: "OmniCure S1500 Pro 导光管支持" }, body: { en: "Support for light guide selection, installation, cleaning, and replacement.", zh: "支持导光管的选型、安装、清洁与更换。" } },
    { icon: "crosshair", title: { en: "OmniCure S1500 Pro Calibration Support", zh: "OmniCure S1500 Pro 校准支持" }, body: { en: "Support for radiometer calibration and repeatable irradiance control.", zh: "支持辐射计校准与可重复的辐照度控制。" } },
    { icon: "wrench", title: { en: "OmniCure S1500 Pro Maintenance & Repair Support", zh: "OmniCure S1500 Pro 维护与维修支持" }, body: { en: "Support for routine maintenance, troubleshooting, and repair coordination.", zh: "支持日常维护、故障排除与维修协调。" } },
  ],
  faqs: [
    { q: { en: "Where can I download the OmniCure S1500 Pro user guide?", zh: "在哪里可以下载 OmniCure S1500 Pro 用户指南?" }, a: { en: "Download the OmniCure S1500 Pro User Guide, Quick Start Guide, and Brochure from the User Guides & Technical Resources section on this page. The User Guide covers setup, calibration, StepCure 2.0, PLC integration, maintenance, and troubleshooting.", zh: "可从本页面的“用户指南与技术资源”部分下载 OmniCure S1500 Pro 用户指南、快速入门指南与产品手册。用户指南涵盖设置、校准、StepCure 2.0、PLC 集成、维护与故障排除。" } },
    { q: { en: "How long does the OmniCure S1500 Pro lamp last?", zh: "OmniCure S1500 Pro 灯管能用多久?" }, a: { en: "The OmniCure S1500 Pro uses a 200-Watt UV lamp with Intelli-Lamp 2.0, guaranteed for 2,000 hours. Intelli-Lamp 2.0 continuously monitors lamp parameters to optimize lamp life.", zh: "OmniCure S1500 Pro 采用 200 瓦 UV 灯管并配备 Intelli-Lamp 2.0,保证 2,000 小时。Intelli-Lamp 2.0 持续监测灯管参数以优化寿命。" } },
    { q: { en: "How do I install the OmniCure S1500 Pro light guide?", zh: "如何安装 OmniCure S1500 Pro 导光管?" }, a: { en: "Insert the light guide into the front light guide port until it clicks into place. The S1500 Pro is backward compatible with original S1500 light guides. See the Quick Start Guide for details.", zh: "将导光管插入前部导光管端口,直至卡入到位。S1500 Pro 向后兼容原始 S1500 导光管。详情见快速入门指南。" } },
    { q: { en: "Why does the OmniCure S1500 Pro lamp not strike?", zh: "为什么 OmniCure S1500 Pro 灯管无法点亮?" }, a: { en: "Check lamp installation, optical filter installation, the lamp housing panel, the power connection, and system status. If the issue continues, contact ETIA technical support.", zh: "检查灯管安装、光学滤光片安装、灯罩面板、电源连接与系统状态。如问题持续,请联系 ETIA 技术支持。" } },
    { q: { en: "Does the OmniCure S1500 Pro support PLC automation?", zh: "OmniCure S1500 Pro 支持 PLC 自动化吗?" }, a: { en: "Yes. The S1500 Pro provides a programmable PLC output via the DB50 port and StepCure 2.0 multi-phase profiles for automated, repeatable production.", zh: "支持。S1500 Pro 通过 DB50 端口提供可编程 PLC 输出,并配备 StepCure 2.0 多阶段配置,实现自动化、可重复的生产。" } },
    { q: { en: "How many optical filters does the OmniCure S1500 Pro support?", zh: "OmniCure S1500 Pro 支持多少种光学滤光片?" }, a: { en: "The S1500 Pro supports 7 user-interchangeable optical band-pass filters plus interchangeable lamp types, allowing fast configuration for different curing chemistries.", zh: "S1500 Pro 支持 7 种用户可换的光学带通滤光片以及可换灯管类型,可针对不同固化化学体系快速配置。" } },
    { q: { en: "Is the OmniCure S1500 Pro cleanroom ready?", zh: "OmniCure S1500 Pro 适合洁净室吗?" }, a: { en: "Yes. The S1500 Pro is cleanroom-ready with a dedicated duct attachment area, making it suitable for medical device and micro-electronic manufacturing environments.", zh: "适合。S1500 Pro 洁净室就绪,配有专用导管连接区域,适用于医疗器械与微电子制造环境。" } },
    { q: { en: "Can ETIA provide OmniCure S1500 Pro support?", zh: "ETIA 能提供 OmniCure S1500 Pro 支持吗?" }, a: { en: "Yes. ETIA supplies genuine OmniCure S1500 Pro lamps, optical filters, and light guides, and provides calibration, StepCure/PLC integration, maintenance, and troubleshooting across China, Thailand, Vietnam, and Southeast Asia.", zh: "可以。ETIA 供应正品 OmniCure S1500 Pro 灯管、光学滤光片与导光管,并在中国、泰国、越南及东南亚地区提供校准、StepCure/PLC 集成、维护与故障排除。" } },
  ],
  relatedLinks: [
    { href: "/product/omnicure", label: { en: "OmniCure product family", zh: "OmniCure 产品系列" } },
    { href: "/product/omnicure/s2000", label: { en: "OmniCure S2000 Elite", zh: "OmniCure S2000 Elite" } },
    { href: "/product/systems/s2e-network-module", label: { en: "OmniCure S2E Network Module", zh: "OmniCure S2E 网络模块" } },
    { href: "/contact", label: { en: "Sales & Support", zh: "销售与支持" } },
  ],
  metaTitle: "OmniCure S1500 Pro UV Spot Curing System | User Guide & Support | ETIA",
  metaDescription:
    "OmniCure S1500 Pro lamp-based UV spot curing system — download the user guide, quick start guide, and brochure. Intelli-Lamp 2.0, StepCure 2.0, 4.3-inch touchscreen, 7 optical filters, PLC, NFC, calibration, troubleshooting, and ETIA technical support.",
  keywords: [
    "OmniCure S1500 Pro",
    "OmniCure S1500 Pro UV Spot Curing System",
    "OmniCure S1500 Pro user guide",
    "OmniCure S1500 Pro quick start guide",
    "OmniCure S1500 Pro troubleshooting",
    "OmniCure S1500 Pro lamp replacement",
    "OmniCure S1500 Pro optical filter",
    "OmniCure S1500 Pro StepCure",
    "OmniCure S1500 Pro PLC",
    "OmniCure S1500 Pro calibration",
    "OmniCure S1500 Pro technical support",
  ],
  schemaCategory: "UV Spot Curing System",
  schemaDescription:
    "Lamp-based UV spot curing system with Intelli-Lamp 2.0 (2,000 h guaranteed lamp life), StepCure 2.0 multi-phase curing, a 4.3-inch touchscreen, 7 user-interchangeable optical filters, programmable PLC output, and Intelli-Tap NFC access control.",
};

// ───────────────────────────── AC9225-F ─────────────────────────────
const ac9225f: ProductGuide = {
  slug: "ac9225-f",
  productName: "OmniCure AC9225-F",
  breadcrumbName: "AC9225-F",
  eyebrow: { en: "OmniCure AC Series · Air-Cooled UV LED Fiber Curing", zh: "OmniCure AC 系列 · 风冷 UV LED 光纤固化" },
  h1: { en: "OmniCure AC9225-F Air-Cooled UV LED Fiber Curing System", zh: "OmniCure AC9225-F 风冷 UV LED 光纤固化系统" },
  headline: { en: "High-Speed Fiber Curing.", zh: "高速光纤固化。" },
  subheadline: {
    en: "Air-cooled, high-output UV LED curing purpose-built for optical fiber — up to 88 W/cm² at the fiber, a replaceable outer window, and multiple systems joinable for wider, uniform cure areas.",
    zh: "专为光纤打造的风冷高输出 UV LED 固化——光纤处最高 88 W/cm²、可更换外窗,并可多机联接以获得更宽、均匀的固化区域。",
  },
  heroImage: `${IMG_BASE}/AC9225-F.png`,
  heroAlt: "OmniCure AC9225-F Air-Cooled UV LED Fiber Curing System",
  stats: [
    { val: "Up to 88 W/cm²", label: { en: "Peak irradiance at fiber", zh: "光纤处峰值辐照度" } },
    { val: "395 nm", label: { en: "UV LED wavelength", zh: "UV LED 波长" } },
    { val: "Air-cooled", label: { en: "No chiller required", zh: "无需冷水机" } },
    { val: ">40,000 h", label: { en: "LED lifetime", zh: "LED 寿命" } },
  ],
  overview: {
    en: "The OmniCure AC9225-F is an air-cooled UV LED curing system purpose-designed for optical fiber curing. An innovative optical design enhances output and optimizes UV delivery onto the fiber, delivering up to 88 W/cm² peak irradiance at the fiber (typical face-to-face configuration) at a 10–18 mm working distance. A replaceable outer window lets customers scale production speeds without complex integration, and multiple systems can be joined to increase cure-area width while maintaining uniformity.",
    zh: "OmniCure AC9225-F 是一款专为光纤固化设计的风冷 UV LED 固化系统。创新的光学设计增强输出并优化 UV 向光纤的传输,在 10–18 mm 工作距离下(典型面对面配置)于光纤处提供最高 88 W/cm² 峰值辐照度。可更换的外窗使客户无需复杂集成即可提升生产速度,并可多机联接以在保持均匀性的同时扩大固化区域宽度。",
  },
  features: [
    { icon: "aperture", title: { en: "OmniCure AC9225-F Fiber-Optimized Optics", zh: "OmniCure AC9225-F 光纤优化光学" }, body: { en: "Innovative optics are purpose-designed for optical fiber curing, enhancing output and UV delivery onto the fiber.", zh: "创新光学专为光纤固化设计,增强输出并优化 UV 向光纤的传输。" } },
    { icon: "zap", title: { en: "OmniCure AC9225-F High Peak Irradiance", zh: "OmniCure AC9225-F 高峰值辐照度" }, body: { en: "Delivers up to 88 W/cm² peak irradiance at the fiber in a typical face-to-face configuration for high line speeds.", zh: "在典型面对面配置下于光纤处提供最高 88 W/cm² 峰值辐照度,支持高线速。" } },
    { icon: "crosshair", title: { en: "OmniCure AC9225-F Working Distance", zh: "OmniCure AC9225-F 工作距离" }, body: { en: "Optimized for a 10–18 mm working distance with a 15 × 225 mm emitting window at 395 nm.", zh: "针对 10–18 mm 工作距离优化,395 nm 下发光窗口为 15 × 225 mm。" } },
    { icon: "sun", title: { en: "OmniCure AC9225-F Air-Cooled Design", zh: "OmniCure AC9225-F 风冷设计" }, body: { en: "Fully air-cooled with no chiller required, simplifying integration and reducing facility overhead.", zh: "全风冷,无需冷水机,简化集成并降低厂务开销。" } },
    { icon: "layers", title: { en: "OmniCure AC9225-F Joinable Multi-System", zh: "OmniCure AC9225-F 多机联接" }, body: { en: "Multiple systems can be joined to increase cure-area width while maintaining uniformity across all systems.", zh: "可多机联接以扩大固化区域宽度,同时在所有系统间保持均匀性。" } },
    { icon: "settings", title: { en: "OmniCure AC9225-F Replaceable Outer Window", zh: "OmniCure AC9225-F 可更换外窗" }, body: { en: "A replaceable outer window lets customers scale production speeds and maintain the system without complex changes.", zh: "可更换外窗使客户无需复杂改动即可提升生产速度并维护系统。" } },
    { icon: "lightbulb", title: { en: "OmniCure AC9225-F Long LED Lifetime", zh: "OmniCure AC9225-F 长 LED 寿命" }, body: { en: "Over 40,000 hours of LED lifetime with no replacement parts for reliable, low-maintenance production.", zh: "超过 40,000 小时 LED 寿命且无需更换部件,实现可靠、低维护的生产。" } },
    { icon: "cpu", title: { en: "OmniCure AC9225-F Energy Efficiency", zh: "OmniCure AC9225-F 节能" }, body: { en: "Up to 60% lower power consumption than traditional arc-lamp fiber curing systems.", zh: "比传统弧光灯光纤固化系统节能最高 60%。" } },
  ],
  pdfs: {
    brochure: pdf("Brochure – OmniCure AC9225F UV LED Fiber Curing Systems.pdf"),
    userGuide: pdf("User Guide - OmniCure AC8 LED UV Curing System.pdf"),
  },
  setup: [
    { title: { en: "OmniCure AC9225-F Mounting & Working Distance", zh: "OmniCure AC9225-F 安装与工作距离" }, body: { en: "Mount the system in a face-to-face configuration and set the fiber at a 10–18 mm working distance within the cure zone.", zh: "以面对面配置安装系统,并将光纤设置在固化区域内 10–18 mm 的工作距离。" } },
    { title: { en: "OmniCure AC9225-F Power & Air-Cooling", zh: "OmniCure AC9225-F 供电与风冷" }, body: { en: "Connect power and ensure adequate airflow around the unit — the system is air-cooled and requires no chiller.", zh: "接通电源并确保设备周围有充足气流——系统为风冷,无需冷水机。" } },
    { title: { en: "OmniCure AC9225-F Fiber Alignment", zh: "OmniCure AC9225-F 光纤对准" }, body: { en: "Align the fiber centrally in the emitting window (15 × 225 mm at 395 nm) for optimal, uniform UV delivery.", zh: "将光纤对准发光窗口中心(395 nm 下 15 × 225 mm),以获得最佳、均匀的 UV 传输。" } },
    { title: { en: "OmniCure AC9225-F Intensity & Control", zh: "OmniCure AC9225-F 强度与控制" }, body: { en: "Set UV intensity and control via the controller interface to match your fiber coating and line speed.", zh: "通过控制器界面设置 UV 强度与控制,以匹配光纤涂层与线速。" } },
    { title: { en: "OmniCure AC9225-F Multi-System Joining", zh: "OmniCure AC9225-F 多机联接" }, body: { en: "Join multiple AC9225-F systems to widen the cure area, and verify uniformity across all joined systems.", zh: "联接多台 AC9225-F 系统以扩大固化区域,并核实所有联接系统间的均匀性。" } },
    { title: { en: "OmniCure AC9225-F Outer Window Check", zh: "OmniCure AC9225-F 外窗检查" }, body: { en: "Inspect the replaceable outer window before production and replace it when contamination reduces output.", zh: "生产前检查可更换外窗,当污染导致输出下降时予以更换。" } },
  ],
  troubleshooting: [
    { title: { en: "OmniCure AC9225-F Low Output at the Fiber", zh: "OmniCure AC9225-F 光纤处输出偏低" }, body: { en: "Verify the 10–18 mm working distance, check the outer window for contamination (replace if needed), and confirm fiber alignment in the emitting window. If the issue continues, contact ETIA technical support.", zh: "核实 10–18 mm 工作距离,检查外窗是否污染(必要时更换),并确认光纤在发光窗口中的对准。如问题持续,请联系 ETIA 技术支持。" } },
    { title: { en: "OmniCure AC9225-F System Overheating", zh: "OmniCure AC9225-F 系统过热" }, body: { en: "As an air-cooled system, ensure vents are unobstructed, ambient temperature is within spec, and airflow around the unit is adequate. If the issue continues, contact ETIA technical support.", zh: "作为风冷系统,确保通风口无阻挡、环境温度在规格范围内、设备周围气流充足。如问题持续,请联系 ETIA 技术支持。" } },
    { title: { en: "OmniCure AC9225-F Non-Uniform Cure Across Joined Systems", zh: "OmniCure AC9225-F 多机联接固化不均" }, body: { en: "Check alignment and spacing between joined systems and verify each system's output is matched. If the issue continues, contact ETIA technical support.", zh: "检查联接系统之间的对准与间距,并核实每台系统的输出是否一致。如问题持续,请联系 ETIA 技术支持。" } },
    { title: { en: "OmniCure AC9225-F Outer Window Contamination", zh: "OmniCure AC9225-F 外窗污染" }, body: { en: "Coating overspray or debris on the outer window reduces UV at the fiber. Inspect and replace the outer window to restore output.", zh: "涂层飞溅或碎屑附着在外窗上会降低光纤处的 UV。检查并更换外窗以恢复输出。" } },
    { title: { en: "OmniCure AC9225-F No UV Output", zh: "OmniCure AC9225-F 无 UV 输出" }, body: { en: "Confirm power connection, any safety interlock, and the control/trigger signal to the system. If the issue continues, contact ETIA technical support.", zh: "确认电源连接、任何安全联锁,以及给系统的控制/触发信号。如问题持续,请联系 ETIA 技术支持。" } },
    { title: { en: "OmniCure AC9225-F Reduced Line Speed / Cure", zh: "OmniCure AC9225-F 线速/固化下降" }, body: { en: "Verify irradiance at the fiber, outer window condition, and working distance; a degraded window or incorrect distance lowers achievable line speed. If the issue continues, contact ETIA technical support.", zh: "核实光纤处辐照度、外窗状况与工作距离;外窗劣化或距离不当会降低可达到的线速。如问题持续,请联系 ETIA 技术支持。" } },
  ],
  support: [
    { icon: "settings", title: { en: "OmniCure AC9225-F Replaceable Outer Window Support", zh: "OmniCure AC9225-F 可更换外窗支持" }, body: { en: "Support for outer window supply, inspection, and replacement to maintain output and line speed.", zh: "支持外窗供应、检查与更换,以维持输出与线速。" } },
    { icon: "sun", title: { en: "OmniCure AC9225-F UV LED Head Support", zh: "OmniCure AC9225-F UV LED 灯头支持" }, body: { en: "Support for the 395 nm fiber-curing head and configuration selection.", zh: "支持 395 nm 光纤固化灯头与配置选型。" } },
    { icon: "crosshair", title: { en: "OmniCure AC9225-F Radiometry & Calibration Support", zh: "OmniCure AC9225-F 辐射测量与校准支持" }, body: { en: "Support for irradiance measurement and repeatable output across joined systems.", zh: "支持辐照度测量与多机联接间的可重复输出。" } },
    { icon: "layers", title: { en: "OmniCure AC9225-F Multi-System Integration Support", zh: "OmniCure AC9225-F 多机集成支持" }, body: { en: "Support for joining multiple systems, alignment, and uniformity across a wider cure area.", zh: "支持多机联接、对准与更宽固化区域的均匀性。" } },
    { icon: "wrench", title: { en: "OmniCure AC9225-F Maintenance & Repair Support", zh: "OmniCure AC9225-F 维护与维修支持" }, body: { en: "Support for routine maintenance, troubleshooting, and repair coordination.", zh: "支持日常维护、故障排除与维修协调。" } },
  ],
  faqs: [
    { q: { en: "Where can I download the OmniCure AC9225-F user guide?", zh: "在哪里可以下载 OmniCure AC9225-F 用户指南?" }, a: { en: "Download the OmniCure AC9225-F Brochure and the OmniCure AC user guide from the User Guides & Technical Resources section on this page. The user guide covers setup, operation, maintenance, and troubleshooting for the OmniCure AC LED curing series.", zh: "可从本页面的“用户指南与技术资源”部分下载 OmniCure AC9225-F 产品手册与 OmniCure AC 系列用户指南。用户指南涵盖 OmniCure AC LED 固化系列的设置、操作、维护与故障排除。" } },
    { q: { en: "What peak irradiance does the OmniCure AC9225-F deliver at the fiber?", zh: "OmniCure AC9225-F 在光纤处能提供多大峰值辐照度?" }, a: { en: "The OmniCure AC9225-F delivers up to 88 W/cm² peak irradiance at the fiber in a typical face-to-face configuration at a 10–18 mm working distance.", zh: "OmniCure AC9225-F 在典型面对面配置、10–18 mm 工作距离下,于光纤处提供最高 88 W/cm² 峰值辐照度。" } },
    { q: { en: "Is the OmniCure AC9225-F air-cooled?", zh: "OmniCure AC9225-F 是风冷的吗?" }, a: { en: "Yes. The AC9225-F is fully air-cooled and requires no chiller, simplifying integration into high-speed fiber production lines.", zh: "是。AC9225-F 为全风冷,无需冷水机,简化了在高速光纤产线中的集成。" } },
    { q: { en: "How do I replace the OmniCure AC9225-F outer window?", zh: "如何更换 OmniCure AC9225-F 的外窗?" }, a: { en: "The AC9225-F uses a replaceable outer window. When coating overspray or contamination reduces output, inspect and replace the outer window. ETIA can supply outer windows and provide replacement guidance.", zh: "AC9225-F 采用可更换外窗。当涂层飞溅或污染导致输出下降时,检查并更换外窗。ETIA 可供应外窗并提供更换指导。" } },
    { q: { en: "Can multiple OmniCure AC9225-F systems be joined?", zh: "多台 OmniCure AC9225-F 系统可以联接吗?" }, a: { en: "Yes. Multiple AC9225-F systems can be joined to increase cure-area width while maintaining uniformity across all systems.", zh: "可以。多台 AC9225-F 系统可联接以扩大固化区域宽度,同时在所有系统间保持均匀性。" } },
    { q: { en: "What is the OmniCure AC9225-F LED lifetime?", zh: "OmniCure AC9225-F 的 LED 寿命是多少?" }, a: { en: "The AC9225-F provides over 40,000 hours of LED lifetime with no replacement parts, and uses up to 60% less power than traditional arc-lamp fiber curing systems.", zh: "AC9225-F 提供超过 40,000 小时的 LED 寿命且无需更换部件,并比传统弧光灯光纤固化系统节能最高 60%。" } },
    { q: { en: "What is the OmniCure AC9225-F working distance?", zh: "OmniCure AC9225-F 的工作距离是多少?" }, a: { en: "The AC9225-F is optimized for a 10–18 mm working distance with a 15 × 225 mm emitting window at 395 nm.", zh: "AC9225-F 针对 10–18 mm 工作距离优化,395 nm 下发光窗口为 15 × 225 mm。" } },
    { q: { en: "Can ETIA provide OmniCure AC9225-F support?", zh: "ETIA 能提供 OmniCure AC9225-F 支持吗?" }, a: { en: "Yes. ETIA supplies genuine OmniCure AC9225-F systems and outer windows, and provides calibration, multi-system integration, maintenance, and troubleshooting across China, Thailand, Vietnam, and Southeast Asia.", zh: "可以。ETIA 供应正品 OmniCure AC9225-F 系统与外窗,并在中国、泰国、越南及东南亚地区提供校准、多机集成、维护与故障排除。" } },
  ],
  relatedLinks: [
    { href: "/product/omnicure", label: { en: "OmniCure product family", zh: "OmniCure 产品系列" } },
    { href: "/product/systems/ac9225", label: { en: "OmniCure AC9225", zh: "OmniCure AC9225" } },
    { href: "/contact", label: { en: "Sales & Support", zh: "销售与支持" } },
  ],
  metaTitle: "OmniCure AC9225-F Air-Cooled UV LED Fiber Curing System | ETIA",
  metaDescription:
    "OmniCure AC9225-F (AC9225F) air-cooled UV LED fiber curing system — download the brochure and user guide. Up to 88 W/cm² at the fiber, 395 nm, replaceable outer window, joinable multi-system, >40,000 h LED life, and ETIA technical support.",
  keywords: [
    "OmniCure AC9225-F",
    "OmniCure AC9225F",
    "OmniCure AC9225-F UV LED Fiber Curing System",
    "OmniCure AC9225F fiber curing",
    "OmniCure AC9225-F user guide",
    "OmniCure AC9225-F brochure",
    "OmniCure AC9225-F outer window",
    "OmniCure AC9225-F troubleshooting",
    "OmniCure AC9225-F calibration",
    "OmniCure air-cooled UV LED fiber curing",
    "OmniCure AC9225-F technical support",
  ],
  schemaCategory: "Air-Cooled UV LED Fiber Curing System",
  schemaDescription:
    "Air-cooled UV LED curing system purpose-designed for optical fiber curing, delivering up to 88 W/cm² peak irradiance at the fiber at a 10–18 mm working distance, with a replaceable outer window, joinable multi-system operation, and over 40,000 hours of LED lifetime.",
};

export const productGuides: ProductGuide[] = [lx500, s1500Pro, ac9225f];

export const productGuideBySlug: Record<string, ProductGuide> = Object.fromEntries(
  productGuides.map((g) => [g.slug, g])
);

export function getProductGuide(slug: string): ProductGuide | undefined {
  return productGuideBySlug[slug];
}

// English-only Q&A for FAQPage JSON-LD (mirrors on-page text).
export function guideFaqEnglish(g: ProductGuide) {
  return g.faqs.map((f) => ({ q: f.q.en, a: f.a.en }));
}

export { whyEtiaNote };
