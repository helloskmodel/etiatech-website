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

export const productGuides: ProductGuide[] = [lx500];

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
