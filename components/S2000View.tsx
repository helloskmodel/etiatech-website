"use client";
import Link from "next/link";
import Image from "next/image";
import { inquiryMailto } from "@/components/contact";
import { useLocale, t, type LangText } from "@/components/LocaleContext";

const PROMO = "https://etiatech-1303055923.cos.ap-singapore.myqcloud.com/IMAGE/PROMOTION";
const VIDEO = "https://etiatech-1303055923.cos.ap-singapore.myqcloud.com/VIDEO/OMNICURE%202000%20ENLIGH%20VERSION%20.mp4";

const img = {
  intro: `${PROMO}/PROMOTION-OMNICURE%20S2000%20ELITE%20-INTRODUCTION.webp`,
  lcd: `${PROMO}/PRODMOTION-OMNICURE%20S2000%20ELITE%20-LCD%20SCREEN%20AND%20TOUCH%20SCREEN%20UI.webp`,
  lamp: `${PROMO}/PROMOTION-%20OMNICURE%20S2000%20ELITE%20-LAMP.webp`,
  loop: `${PROMO}/PROMOTION-OMNICURE%202000%20ELITE-LOOP%20FEEDBACK.webp`,
  remote: `${PROMO}/PROMOTION-OMNICURE%202000%20ELITE-REMOTE%20CONTROL.webp`,
  calibration: `${PROMO}/PROMOTION-OMNICURE%20S2000%20ELITE%20-CALIBRATION%20AND%20RADIOMETRY.webp`,
  stepcure: `${PROMO}/PROMOTION-OMNICURE-2000%20ELITE%20-STEPCURE%202.0%20WITH%20PLC%20CONTROL.webp`,
  nfc: `${PROMO}/PROMOTION-OMNICURE%20S2000%20ELITE%20-NFC%20CARD.webp`,
};

const heroStats: { val: string; label: LangText }[] = [
  { val: "30 W/cm²", label: { en: "Peak Irradiance", zh: "峰值辐照度" } },
  { val: "±5%", label: { en: "CLF Stability", zh: "闭环稳定性" } },
  { val: "30 ms", label: { en: "Shutter", zh: "快门" } },
  { val: "I 4.0", label: { en: "PLC · NFC · Web UI", zh: "PLC · NFC · Web UI" } },
];

const benefits: { icon: string; title: LangText; desc: LangText }[] = [
  { icon: "⚡", title: { en: "Highest Irradiance", zh: "最高辐照度" }, desc: { en: "Up to 30 W/cm² peak irradiance drives faster cure cycles and reliable bonding even with low-sensitivity adhesives.", zh: "最高30 W/cm²峰值辐照度,即使面对低敏感度胶粘剂也能实现更快的固化周期与可靠粘接。" } },
  { icon: "🎯", title: { en: "Repeatable Process", zh: "可重复工艺" }, desc: { en: "Closed-Loop Feedback maintains ±5% irradiance stability across the lamp's entire service life — no recalibration between runs.", zh: "闭环反馈在灯管整个使用寿命内保持±5%辐照度稳定性——批次之间无需重新校准。" } },
  { icon: "⏱️", title: { en: "Exact Dose", zh: "精确剂量" }, desc: { en: "30 ms precision electromechanical shutter prevents over-cure and ensures validated dose delivery on every single exposure.", zh: "30毫秒精密机电快门防止过固化,确保每一次曝光都输出经验证的剂量。" } },
  { icon: "💡", title: { en: "Smart Lamp Management", zh: "智能灯管管理" }, desc: { en: "Intelli-Lamp tracks lamp hours and output trend, alerting you before intensity drops affect production quality.", zh: "Intelli-Lamp追踪灯管使用时长与输出趋势,在强度下降影响生产质量之前提醒您。" } },
  { icon: "🔗", title: { en: "Industry 4.0 Ready", zh: "支持工业4.0" }, desc: { en: "PLC, Ethernet, NFC, and Web UI connect seamlessly into modern automated manufacturing lines — zero integration headaches.", zh: "PLC、以太网、NFC与Web UI无缝接入现代自动化产线——零集成烦恼。" } },
];

const features: { no: LangText; title: LangText; desc: LangText; tags: LangText[]; image?: string; note?: LangText }[] = [
  {
    no: { en: "Feature 01", zh: "技术 01" },
    title: { en: "Closed-Loop Feedback (CLF)", zh: "闭环反馈 (CLF)" },
    desc: { en: "Over time, the output of all mercury lamps decreases, which left uncorrected can negatively impact curing efficiency. The S2000 Elite's Closed-Loop Feedback technology uses an internal optical sensor to monitor lamp output in real time and adjust the iris to automatically maintain irradiance to within ±5% of the set point — ensuring repeatable, measurable doses of curing energy for increased yields and quality. An on-screen indicator, light ring and audible alarm signal when the lamp can no longer generate the set irradiance level, eliminating frequent manual checks while prolonging lamp lifetime. Calibration with the OmniCure R2000 Radiometer offers real-time display of irradiance on the S2000 Elite — the only system that can be calibrated in real time for NIST accuracy. Excelitas proprietary technology: often imitated, never duplicated.", zh: "随着时间的推移，汞灯输出降低，会降低固化过程的有效性。OmniCure S2000 Elite 闭环反馈技术包括一个内部光学传感器，用于实时监控灯输出，并调整光圈，以自动将辐照度水平保持在设定点的 ±5% 以内，确保可重复和可测量的固化能量剂量，从而提高产量和质量。当灯不能再产生设定的辐照度水平时，屏幕上的指示灯、光环和声音警报会发出警告。现在，您可以使用灯具直到其寿命结束，而无需经常检查辐照度水平。使用 OmniCure R2000 辐射计进行校准，可在 OmniCure S2000 Elite 上实时显示辐照度。唯一能够实时校准 NIST 精度的系统；非常适合自动化或半自动化环境；经常模仿，从不重复；Excelitas Technologies 的专有技术。" },
    tags: [{ en: "±5% Stability", zh: "±5% 稳定性" }, { en: "Real-Time NIST Calibration", zh: "实时NIST校准" }, { en: "Auto Iris", zh: "自动光阑" }],
    image: img.loop,
  },
  {
    no: { en: "Feature 02", zh: "技术 02" },
    title: { en: "Web UI — Remote Control", zh: "Web UI — 远程控制" },
    desc: { en: "Remote control, management and monitoring of single or multiple systems is available from almost any device through the WEB UI, expanding all of the options and features from the system touchscreen to a larger laptop or tablet screen. The WEB UI enables you to run exposures, build and manage curing profiles, review and download system logs, and download and push software updates to multiple units from the comfort of your office. Advanced control for troubleshooting is also available through the command line interface.", zh: "几乎任何设备都可以通过 WEB UI 对单个或多个系统进行远程控制、管理和监控，从而将系统触摸屏上的所有选项和功能扩展到更大的笔记本电脑或平板电脑屏幕。WEB UI 允许用户在舒适的办公室内运行曝光、构建和管理固化配置文件、查看和下载系统日志，以及下载软件更新并将其推送到多个单元。WEB UI 还通过命令行界面为故障排除提供高级控制。" },
    tags: [{ en: "Multi-System", zh: "多系统" }, { en: "Any Device", zh: "任意设备" }, { en: "CLI Troubleshooting", zh: "命令行排障" }],
    image: img.remote,
  },
  {
    no: { en: "Feature 03", zh: "技术 03" },
    title: { en: "LCD & Touch Screen UI", zh: "LCD 触摸屏界面" },
    desc: { en: "A new 4.3\" LCD touch screen display provides easy access to all system functionality. The intuitive, easy-to-use UI makes it simple to access and navigate through system information, settings and run screens.", zh: "新的 4.3 英寸 LCD 触摸屏显示器可轻松访问所有系统功能。直观易用的用户界面使访问和浏览系统信息、设置和运行屏幕变得简单。" },
    tags: [{ en: "4.3\" Touchscreen", zh: "4.3英寸触屏" }, { en: "Intuitive UI", zh: "直观界面" }],
    image: img.lcd,
  },
  {
    no: { en: "Feature 04", zh: "技术 04" },
    title: { en: "StepCure 2.0 with PLC Control", zh: "StepCure 2.0 + PLC 控制" },
    desc: { en: "The OmniCure S2000 Elite was designed with automation in mind. The built-in StepCure 2.0 software allows users to upload a customized multi-phase cure profile directly to the system, offering greater cure control. By providing integrated PLC controller functionality and up to 7 programmable PLC output channels through the ladder-logic based StepCure program, the S2000 Elite helps simplify and lower the cost of automating assembly lines.", zh: "OmniCure S2000 Elite 的设计考虑到了自动化。内置的 StepCure 软件可以将定制的多相固化配置文件直接下载到系统中；此选项以前仅在连接到外部桌面 PC 时可用，它为用户提供了更好的控制。OmniCure S2000 Elite 作为 PLC 控制器，通过基于梯形逻辑的 StepCure 程序提供多达 8 个可编程 PLC 输出通道，有助于简化并降低自动化装配线的成本。" },
    tags: [{ en: "Multi-Phase Profiles", zh: "多阶段曲线" }, { en: "PLC Control", zh: "PLC控制" }, { en: "Ladder Logic", zh: "梯形逻辑" }],
    image: img.stepcure,
  },
  {
    no: { en: "Feature 05", zh: "技术 05" },
    title: { en: "30 ms Precision Shutter", zh: "30毫秒精密快门" },
    desc: { en: "The lightning-fast 30 ms shutter delivers a precise dosage to every single exposure for the most repeatable cure. With StepCure, the shutter enables precise exposures as low as 100 ms with minimal ramp-up and ramp-down times.", zh: "闪电般的 30 毫秒快门为每次曝光提供精确的剂量，以实现最可重复的固化。使用 StepCure，快门允许曝光间隔短至 100 ms，且上升和下降时间最小。" },
    tags: [{ en: "30 ms Actuation", zh: "30毫秒动作" }, { en: "Exposures from 100 ms", zh: "低至100毫秒曝光" }, { en: "Repeatable Dose", zh: "可重复剂量" }],
  },
  {
    no: { en: "Feature 06", zh: "技术 06" },
    title: { en: "Calibration & Radiometry", zh: "校准与辐射测量" },
    desc: { en: "Radiometry is an essential consideration for any repeatable curing process. Combine the OmniCure S2000 Elite with an OmniCure R2000 radiometer to measure and calibrate the light output, allowing cure profiles to be set in absolute peak irradiance (W/cm²) or optical power (W). The R2000 requires calibration every 12 months (NIST traceable) and can be used to set the output of multiple S2000 Elite systems at the identical irradiance level.", zh: "光强度测量是任何可重复固化过程的重要环节。将 OmniCure S2000 Elite 与 OmniCure R2000 辐射计相结合，以测量和校准光输出，从而将系统的固化轮廓设置为绝对峰值辐照度（W/cm²）或光功率（W）。OmniCure R2000 辐射计要求每 12 个月校准一次（NIST 可追踪），并可用于将多个 S2000 系统的输出设置为相同的辐照度水平。" },
    tags: [{ en: "W/cm² or W", zh: "W/cm² 或 W" }, { en: "NIST Traceable", zh: "NIST溯源" }, { en: "Multi-System Match", zh: "多机一致" }],
    image: img.calibration,
  },
  {
    no: { en: "Feature 07", zh: "技术 07" },
    title: { en: "Intelli-Tap NFC Communication", zh: "Intelli-Tap NFC 通信" },
    desc: { en: "Intelli-Tap Near-Field Communication (NFC) enabled keycards let users reach the next level in process control. Two Intelli-Tap keycards are available — Admin and Supervisor — each with their own set of functionalities to cater to specific process requirements.", zh: "Intelli-Tap 支持 NFC 的钥匙卡使用户能够达到过程控制的下一个级别。提供两个 Intelli-Tap 钥匙卡——管理员和主管，每个卡都有自己的一套功能，以满足特定的流程要求。" },
    tags: [{ en: "NFC Keycard", zh: "NFC钥匙卡" }, { en: "Admin / Supervisor", zh: "管理员/主管" }, { en: "Process Security", zh: "工艺安全" }],
    note: { en: "Part numbers — 019-00406R: S2000 Elite Intelli-Tap Supervisor NFC card · 019-00407R: S2000 Elite Intelli-Tap Admin NFC card.", zh: "部件号 — 019-00406R:S2000 Elite Intelli-Tap Supervisor NFC 卡 · 019-00407R:S2000 Elite Intelli-Tap Admin NFC 卡。" },
    image: img.nfc,
  },
  {
    no: { en: "Feature 08", zh: "技术 08" },
    title: { en: "Field-Replaceable Lamp & Filter", zh: "现场可换灯管与滤光片" },
    desc: { en: "Ideal for academic, development or laboratory applications, the OmniCure S2000 Elite can quickly be user-reconfigured with a different optical band-pass filter or lamp type. The system automatically detects the new configuration and adjusts operating parameters depending on the components installed. Choose from seven optical band-pass filters and two lamp types.", zh: "OmniCure S2000 Elite 非常适合学术、开发或实验室应用，可根据安装的组件自动检测和调整其参数，从而使用不同的光学带通滤波器或灯型快速重新配置。可从 7 种不同的光学带通滤波器或 2 种不同的灯具类型中选择。" },
    tags: [{ en: "7 Filters", zh: "7种滤光片" }, { en: "2 Lamp Types", zh: "2种灯管" }, { en: "Auto-Detect", zh: "自动识别" }],
    note: { en: "Lamps — 012-68000R (Standard), 012-69000R (Surface Cure). Filters — 019-00387R (400–500 nm), 019-00388R (365 nm), 019-00389R (320–390 nm), 019-00390R (250–450 nm), 019-00391R (320–500 nm), 019-00392R (Blank).", zh: "灯管 — 012-68000R(标准)、012-69000R(表面固化)。滤光片 — 019-00387R(400–500 nm)、019-00388R(365 nm)、019-00389R(320–390 nm)、019-00390R(250–450 nm)、019-00391R(320–500 nm)、019-00392R(空白)。" },
    image: img.lamp,
  },
];

const specs: { param: LangText; value: LangText; verify?: boolean }[] = [
  { param: { en: "Peak Irradiance", zh: "峰值辐照度" }, value: { en: "Up to 30 W/cm²", zh: "最高 30 W/cm²" } },
  { param: { en: "Light Source", zh: "光源" }, value: { en: "200W Mercury (Hg) short-arc lamp, broad spectrum", zh: "200W 汞(Hg)短弧灯,宽光谱" } },
  { param: { en: "Spectral Output", zh: "光谱输出" }, value: { en: "320–500 nm (UVA + visible)", zh: "320–500 nm(UVA + 可见光)" } },
  { param: { en: "Shutter", zh: "快门" }, value: { en: "Electromechanical precision shutter, 30 ms actuation", zh: "机电精密快门,30毫秒动作" } },
  { param: { en: "Irradiance Control", zh: "辐照度控制" }, value: { en: "Closed-Loop Feedback (CLF), ±5% stability", zh: "闭环反馈(CLF),±5% 稳定性" } },
  { param: { en: "Cure Modes", zh: "固化模式" }, value: { en: "Timer / Energy (dose) / StepCure 2.0 multi-step", zh: "定时 / 能量(剂量)/ StepCure 2.0 多台阶" } },
  { param: { en: "Lamp Intelligence", zh: "灯管智能" }, value: { en: "Intelli-Lamp — hour tracking, output monitoring, replacement alert", zh: "Intelli-Lamp — 时长追踪、输出监测、更换提醒" } },
  { param: { en: "Access Control", zh: "访问控制" }, value: { en: "Intelli-Tap NFC keycard (configurable access levels)", zh: "Intelli-Tap NFC钥匙卡(权限等级可配置)" } },
  { param: { en: "Connectivity", zh: "连接性" }, value: { en: "Ethernet (TCP/IP), USB, RS-232, PLC I/O", zh: "以太网(TCP/IP)、USB、RS-232、PLC I/O" } },
  { param: { en: "Remote Monitoring", zh: "远程监控" }, value: { en: "Web UI — browser-based, no software installation", zh: "Web UI——基于浏览器,无需安装软件" } },
  { param: { en: "Display", zh: "显示屏" }, value: { en: '4.3" colour touchscreen LCD', zh: "4.3英寸彩色触摸屏LCD" } },
  { param: { en: "Light Guide", zh: "导光管" }, value: { en: "All OmniCure S Series liquid light guides", zh: "全系列 OmniCure S 系列液体导光管" } },
  { param: { en: "Radiometer", zh: "辐射计" }, value: { en: "OmniCure R2000 NIST-traceable radiometer", zh: "OmniCure R2000 NIST溯源辐射计" } },
  { param: { en: "Input Voltage", zh: "输入电压" }, value: { en: "100–240V AC, 50/60 Hz", zh: "100–240V 交流,50/60 Hz" } },
  { param: { en: "Input Current", zh: "输入电流" }, value: { en: "3.5 A max at 120 VAC / 2.0 A max at 240 VAC", zh: "120VAC 最大 3.5A / 240VAC 最大 2.0A" } },
  { param: { en: "Lamp Life", zh: "灯管寿命" }, value: { en: "2,000 h guaranteed; typically 3,500–4,000 h", zh: "保证 2,000 小时;通常 3,500–4,000 小时" } },
  { param: { en: "Dimensions (H×W×D)", zh: "尺寸(高×宽×深)" }, value: { en: "268 × 139 × 289 mm (10.54 × 5.45 × 11.38 in)", zh: "268 × 139 × 289 mm(10.54 × 5.45 × 11.38 in)" } },
  { param: { en: "Weight", zh: "重量" }, value: { en: "3 kg (6.6 lb)", zh: "3 千克(6.6 磅)" } },
  { param: { en: "Operating Temperature", zh: "工作温度" }, value: { en: "15°C to 40°C, dry location, 15–95% RH (non-condensing)", zh: "15°C 至 40°C,干燥环境,15–95% 相对湿度(无冷凝)" } },
  { param: { en: "Warranty", zh: "保修" }, value: { en: "System 1 year; lamp 2,000 h", zh: "系统 1 年;灯管 2,000 小时" } },
];

const accessories: { icon: string; title: LangText; desc: LangText; cta: LangText }[] = [
  { icon: "📏", title: { en: "R2000 Radiometer", zh: "R2000 辐射计" }, desc: { en: "NIST-traceable UV radiometer — measures irradiance (W/cm²) and dose (mJ/cm²) at point of cure. Essential for process validation and regulatory compliance.", zh: "NIST溯源UV辐射计——在固化点测量辐照度(W/cm²)与剂量(mJ/cm²)。工艺验证与法规合规的必备工具。" }, cta: { en: "View R2000 Radiometer →", zh: "查看 R2000 辐射计 →" } },
  { icon: "🔗", title: { en: "S2E Network Module", zh: "S2E 网络模块" }, desc: { en: "Ethernet connectivity module for seamless integration with legacy automation systems. Enables remote monitoring and control without replacing existing PLC setups.", zh: "以太网连接模块,与旧有自动化系统无缝集成。无需更换现有PLC即可实现远程监控与控制。" }, cta: { en: "View S2E Module →", zh: "查看 S2E 模块 →" } },
  { icon: "💡", title: { en: "S Series Light Guides", zh: "S 系列导光管" }, desc: { en: "Liquid light guides in various lengths and tip diameters — single branch and multi-branch configurations. Delivers UV energy precisely to the cure point.", zh: "多种长度与端头直径的液体导光管——单支与多支配置。将UV能量精确传递至固化点。" }, cta: { en: "View Light Guides →", zh: "查看导光管 →" } },
  { icon: "🔭", title: { en: "Collimating Adaptors", zh: "准直适配器" }, desc: { en: "Extends working distance while maintaining irradiance uniformity. Ideal for applications requiring standoff clearance from sensitive components.", zh: "在保持辐照均匀性的同时延长工作距离。适合需要与敏感元件保持间距的应用。" }, cta: { en: "Enquire →", zh: "咨询 →" } },
  { icon: "🎯", title: { en: "Spot Size Adaptors", zh: "光斑尺寸适配器" }, desc: { en: "Adjusts the cure spot diameter to match bond line geometry. Available in multiple aperture sizes for precision spotting on small components.", zh: "调整固化光斑直径以匹配粘接线几何。提供多种孔径,用于小型元件的精密点固化。" }, cta: { en: "Enquire →", zh: "咨询 →" } },
];

const applications: { icon: string; title: LangText; desc: LangText; bg: string }[] = [
  { icon: "🏥", title: { en: "Medical Devices", zh: "医疗器械" }, desc: { en: "Catheter tip bonding, needle assembly, sensor encapsulation, surgical instrument bonding — where validated, repeatable processes are regulatory requirements.", zh: "导管尖端粘接、针头装配、传感器封装、手术器械粘接——这些场景对验证、可重复的工艺有法规要求。" }, bg: "linear-gradient(135deg, #0d9488 0%, #0f766e 100%)" },
  { icon: "💻", title: { en: "Electronics", zh: "电子" }, desc: { en: "PCB conformal coating cure, component bonding, display assembly, wire tacking — high throughput with precise dose control for every board.", zh: "PCB三防漆固化、元件粘接、显示屏装配、线材点固——高产能且对每块板都精确控制剂量。" }, bg: "linear-gradient(135deg, #1A56DB 0%, #1241a3 100%)" },
  { icon: "🔋", title: { en: "EV Battery & Automotive", zh: "电动汽车电池与汽车" }, desc: { en: "Battery tab bonding, cell assembly, sensor potting, connector sealing — demanding cure specs in high-volume EV production lines.", zh: "电池极耳粘接、电芯装配、传感器灌封、连接器密封——满足大批量EV产线的严苛固化规范。" }, bg: "linear-gradient(135deg, #44B549 0%, #166534 100%)" },
];

export default function S2000View() {
  const { locale } = useLocale();
  return (
    <>
      {/* Breadcrumb */}
      <div className="border-b border-gray-200 py-3 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-xs text-gray-400">
          <Link href="/product" className="hover:text-[#1A56DB]">{t({ en: "Products", zh: "产品" }, locale)}</Link>
          <span className="mx-2">›</span>
          <Link href="/product/omnicure" className="hover:text-[#1A56DB]">OmniCure</Link>
          <span className="mx-2">›</span>
          <span style={{ color: "#1A56DB" }}>S2000 Elite</span>
        </div>
      </div>

      {/* Hero — light */}
      <section className="py-12 relative overflow-hidden border-b border-gray-200" style={{ background: "#f1f5f9" }}>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className="text-[11px] font-bold px-2.5 py-1 rounded text-white" style={{ background: "#1A56DB" }}>OmniCure</span>
              <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full border border-gray-300 text-gray-600">{t({ en: "S Series · Lamp-Based UV Spot Curing", zh: "S 系列 · 灯式 UV 点固化" }, locale)}</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold leading-tight mb-2" style={{ color: "#1A56DB" }}>S2000 Elite</h1>
            <p className="text-lg md:text-xl font-semibold mb-3" style={{ color: "#44B549" }}>{t({ en: "Maximum Power. Total Control.", zh: "极致功率，全面掌控。" }, locale)}</p>
            <p className="text-base text-gray-600 max-w-xl mb-6 leading-relaxed">
              {t({ en: "The industry's most advanced lamp-based UV spot curing system — up to 30 W/cm² with closed-loop precision for medical, electronics, and EV manufacturing.", zh: "业界最先进的灯式UV点固化系统——最高30 W/cm²,以闭环精度服务于医疗、电子与电动汽车制造。" }, locale)}
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
              {heroStats.map((s) => (
                <div key={s.label.en} className="rounded-lg p-3 border border-gray-200 bg-white">
                  <p className="text-xl font-bold" style={{ color: "#1A56DB" }}>{s.val}</p>
                  <p className="text-xs text-gray-500 leading-tight mt-0.5">{t(s.label, locale)}</p>
                </div>
              ))}
            </div>
            <div className="flex flex-wrap gap-4">
              <a href={inquiryMailto(locale, { subject: "Quote Request", context: "OmniCure S2000 Elite" })} className="px-6 py-3 rounded font-semibold text-white hover:opacity-90 transition-all" style={{ background: "#44B549" }}>{t({ en: "Request a Quote", zh: "获取报价" }, locale)}</a>
              <a href={inquiryMailto(locale, { subject: "S2000 Elite Datasheet", context: "OmniCure S2000 Elite" })} className="px-6 py-3 rounded font-semibold text-gray-700 border border-gray-300 hover:border-gray-500 transition-all">⬇ {t({ en: "Request Datasheet", zh: "索取数据表" }, locale)}</a>
            </div>
          </div>
          <div className="rounded-2xl bg-white border border-gray-200 shadow-sm relative" style={{ height: "360px" }}>
            <Image src={img.intro} alt="OmniCure S2000 Elite UV spot curing system" fill sizes="(max-width: 1024px) 100vw, 40vw" className="object-contain p-6" priority />
          </div>
        </div>
      </section>

      {/* Product Overview — white */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-xs font-semibold tracking-widest uppercase mb-2" style={{ color: "#44B549" }}>{t({ en: "Product Overview", zh: "产品概述" }, locale)}</p>
            <h2 className="text-3xl md:text-4xl font-bold mb-6" style={{ color: "#1A56DB" }}>{t({ en: "Built for Validated Manufacturing", zh: "为验证级制造而生" }, locale)}</h2>
            <div className="w-12 h-1 rounded mb-6" style={{ background: "#44B549" }} />
            <p className="text-gray-500 mb-5 leading-relaxed">
              {t({ en: "The OmniCure S2000 Elite is the flagship lamp-based UV spot curing system, engineered for manufacturers who demand the highest irradiance output and uncompromising process control. Delivering up to 30 W/cm² through a 200W mercury short-arc lamp, the S2000 Elite produces broad-spectrum UV energy across 320–500 nm — covering virtually every photoinitiator chemistry in use today.", zh: "OmniCure S2000 Elite 是旗舰级灯式UV点固化系统,专为追求最高辐照输出与严苛工艺控制的制造商而设计。它通过200W汞短弧灯提供最高30 W/cm²的辐照度,在320–500 nm范围内输出宽光谱UV能量——几乎覆盖当今所有在用的光引发剂化学体系。" }, locale)}
            </p>
            <p className="text-gray-500 leading-relaxed">
              {t({ en: "Closed-Loop Feedback technology continuously monitors and adjusts output, maintaining irradiance within ±5% of set point throughout the lamp's lifetime. Combined with a 30 ms precision electromechanical shutter, the S2000 Elite ensures every exposure delivers an exact, repeatable UV dose — critical for validated medical device and electronics manufacturing processes.", zh: "闭环反馈技术持续监测并调整输出,在灯管整个寿命周期内将辐照度维持在设定值±5%以内。配合30毫秒精密机电快门,S2000 Elite确保每次曝光都输出精确、可重复的UV剂量——这对验证级医疗器械与电子制造工艺至关重要。" }, locale)}
            </p>
          </div>
          <div className="rounded-2xl border border-gray-100 bg-gray-50 relative overflow-hidden" style={{ height: "320px" }}>
            <video controls preload="metadata" poster={img.lcd} className="absolute inset-0 w-full h-full object-contain bg-black">
              <source src={VIDEO} type="video/mp4" />
              {t({ en: "Your browser does not support the video tag.", zh: "您的浏览器不支持视频播放。" }, locale)}
            </video>
          </div>
        </div>
      </section>

      {/* Key Benefits — light gray */}
      <section className="py-20" style={{ background: "#f0f4f8" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-semibold tracking-widest uppercase mb-2" style={{ color: "#44B549" }}>{t({ en: "Key Benefits", zh: "核心优势" }, locale)}</p>
          <h2 className="text-3xl md:text-4xl font-bold mb-2" style={{ color: "#1A56DB" }}>{t({ en: "Why the S2000 Elite?", zh: "为何选择 S2000 Elite?" }, locale)}</h2>
          <div className="w-12 h-1 rounded mb-10" style={{ background: "#44B549" }} />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
            {benefits.map((b) => (
              <div key={b.title.en} className="rounded-xl p-5 border border-gray-100 bg-white hover:border-[#1A56DB]/30 hover:shadow-md transition-all">
                <div className="text-2xl mb-3">{b.icon}</div>
                <h3 className="font-semibold text-sm mb-2" style={{ color: "#1A56DB" }}>{t(b.title, locale)}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{t(b.desc, locale)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technology — white, alternating feature blocks */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-semibold tracking-widest uppercase mb-2" style={{ color: "#44B549" }}>{t({ en: "Technology", zh: "核心技术" }, locale)}</p>
          <h2 className="text-3xl md:text-4xl font-bold mb-2" style={{ color: "#1A56DB" }}>{t({ en: "8 Technologies That Set the S2000 Elite Apart", zh: "让 S2000 Elite 脱颖而出的8大技术" }, locale)}</h2>
          <div className="w-12 h-1 rounded mb-12" style={{ background: "#44B549" }} />
          <div className="flex flex-col gap-12">
            {features.map((f, i) => (
              <div key={f.no.en} className={f.image ? "grid lg:grid-cols-2 gap-8 items-center" : "max-w-3xl"}>
                {f.image && (
                  <div className={`rounded-2xl border border-gray-100 bg-gray-50 relative ${i % 2 === 1 ? "lg:order-2" : ""}`} style={{ height: "360px" }}>
                    <Image src={f.image} alt={t(f.title, locale)} fill sizes="(max-width: 1024px) 100vw, 40vw" className="object-contain p-6" />
                  </div>
                )}
                <div className={f.image && i % 2 === 1 ? "lg:order-1" : ""}>
                  <span className="inline-block text-xs font-bold px-3 py-1 rounded mb-3 text-white" style={{ background: "#44B549" }}>{t(f.no, locale)}</span>
                  <h3 className="text-2xl font-bold mb-4" style={{ color: "#1A56DB" }}>{t(f.title, locale)}</h3>
                  <p className="text-gray-500 leading-relaxed mb-5">{t(f.desc, locale)}</p>
                  {f.note && <p className="text-xs text-gray-400 mb-5 leading-relaxed">{t(f.note, locale)}</p>}
                  <div className="flex flex-wrap gap-2">
                    {f.tags.map((tag) => (
                      <span key={tag.en} className="text-xs font-medium px-3 py-1 rounded-full border" style={{ borderColor: "#1A56DB", color: "#1A56DB", background: "#1A56DB10" }}>{t(tag, locale)}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Specifications — light gray */}
      <section className="py-20" style={{ background: "#f0f4f8" }}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-semibold tracking-widest uppercase mb-2" style={{ color: "#44B549" }}>{t({ en: "Specifications", zh: "规格参数" }, locale)}</p>
          <h2 className="text-3xl md:text-4xl font-bold mb-2" style={{ color: "#1A56DB" }}>{t({ en: "Technical Specifications · S2000 Elite", zh: "技术规格 · S2000 Elite" }, locale)}</h2>
          <div className="w-12 h-1 rounded mb-6" style={{ background: "#44B549" }} />
          <p className="text-gray-500 mb-6 max-w-2xl">
            {t({ en: "Full technical specifications. For complete dimensional drawings and installation data, download the official datasheet.", zh: "完整技术规格。如需完整尺寸图纸与安装数据,请下载官方数据表。" }, locale)}
          </p>
          <a href={inquiryMailto(locale, { subject: "S2000 Elite Datasheet", context: "OmniCure S2000 Elite" })} className="inline-block px-5 py-2.5 rounded font-semibold text-white hover:opacity-90 transition-all mb-4" style={{ background: "#1A56DB" }}>
            📄 {t({ en: "Download Datasheet (PDF)", zh: "下载数据表(PDF)" }, locale)}
          </a>
          <p className="text-xs text-gray-400 mb-8">
            {t({ en: "Note: Values marked ⚠ Verify should be confirmed against the official OmniCure datasheet before publishing.", zh: "注:标记 ⚠ 待核实 的数值应在发布前对照 OmniCure 官方数据表确认。" }, locale)}
          </p>
          <div className="rounded-2xl overflow-hidden border border-gray-200 bg-white">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-white" style={{ background: "#1A56DB" }}>
                  <th className="text-left font-semibold px-5 py-3 w-1/3">{t({ en: "Parameter", zh: "参数" }, locale)}</th>
                  <th className="text-left font-semibold px-5 py-3">{t({ en: "Specification", zh: "规格" }, locale)}</th>
                </tr>
              </thead>
              <tbody>
                {specs.map((s, i) => (
                  <tr key={s.param.en} className={i % 2 === 1 ? "bg-gray-50" : "bg-white"}>
                    <td className="px-5 py-3 font-medium text-gray-700 align-top">{t(s.param, locale)}</td>
                    <td className="px-5 py-3 text-gray-500">
                      {s.verify && <span className="font-semibold mr-1" style={{ color: "#d97706" }}>⚠ {t({ en: "Verify", zh: "待核实" }, locale)}</span>}
                      {t(s.value, locale)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Accessories — white */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-semibold tracking-widest uppercase mb-2" style={{ color: "#44B549" }}>{t({ en: "Accessories", zh: "配件" }, locale)}</p>
          <h2 className="text-3xl md:text-4xl font-bold mb-2" style={{ color: "#1A56DB" }}>{t({ en: "Compatible Accessories", zh: "兼容配件" }, locale)}</h2>
          <div className="w-12 h-1 rounded mb-4" style={{ background: "#44B549" }} />
          <p className="text-gray-500 max-w-2xl mb-10">{t({ en: "Complete your S2000 Elite system with OmniCure-approved accessories for measurement, connectivity, and light delivery.", zh: "用 OmniCure 认可的测量、连接与光传输配件,完善您的 S2000 Elite 系统。" }, locale)}</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {accessories.map((a) => (
              <div key={a.title.en} className="rounded-xl p-6 border border-gray-100 bg-gray-50 hover:shadow-md hover:border-[#1A56DB]/30 transition-all flex flex-col">
                <div className="text-2xl mb-3">{a.icon}</div>
                <h3 className="font-semibold mb-2" style={{ color: "#1A56DB" }}>{t(a.title, locale)}</h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-4 flex-1">{t(a.desc, locale)}</p>
                <a href={inquiryMailto(locale, { subject: "Accessory Inquiry", context: "OmniCure S2000 Elite" })} className="text-sm font-medium hover:underline" style={{ color: "#1A56DB" }}>{t(a.cta, locale)}</a>
              </div>
            ))}
            <div className="rounded-xl p-6 border-2 border-dashed border-[#1A56DB]/30 bg-[#1A56DB]/5 flex flex-col">
              <div className="text-2xl mb-3">💬</div>
              <h3 className="font-semibold mb-2" style={{ color: "#1A56DB" }}>{t({ en: "Not sure what you need?", zh: "不确定需要什么?" }, locale)}</h3>
              <p className="text-gray-500 text-sm leading-relaxed mb-4 flex-1">{t({ en: "Our engineers will recommend the right accessories for your application, working distance, and light guide configuration.", zh: "我们的工程师将根据您的应用、工作距离与导光管配置,推荐合适的配件。" }, locale)}</p>
              <a href={inquiryMailto(locale, { subject: "Engineering Inquiry", context: "OmniCure S2000 Elite" })} className="text-sm font-medium hover:underline" style={{ color: "#1A56DB" }}>{t({ en: "Talk to an Engineer →", zh: "咨询工程师 →" }, locale)}</a>
            </div>
          </div>
        </div>
      </section>

      {/* Applications — light gray */}
      <section className="py-20" style={{ background: "#f0f4f8" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-semibold tracking-widest uppercase mb-2" style={{ color: "#44B549" }}>{t({ en: "Applications", zh: "应用领域" }, locale)}</p>
          <h2 className="text-3xl md:text-4xl font-bold mb-2" style={{ color: "#1A56DB" }}>{t({ en: "Industries We Serve", zh: "我们服务的行业" }, locale)}</h2>
          <div className="w-12 h-1 rounded mb-4" style={{ background: "#44B549" }} />
          <p className="text-gray-500 max-w-2xl mb-10">{t({ en: "The S2000 Elite's combination of high irradiance, validated dose control, and Industry 4.0 connectivity makes it the system of choice across demanding manufacturing sectors.", zh: "S2000 Elite 集高辐照度、验证级剂量控制与工业4.0连接于一身,成为严苛制造领域的首选系统。" }, locale)}</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {applications.map((a) => (
              <div key={a.title.en} className="rounded-2xl overflow-hidden border border-gray-100 bg-white shadow-sm hover:shadow-md transition-all">
                <div className="h-40 flex items-center justify-center text-6xl" style={{ background: a.bg }}>{a.icon}</div>
                <div className="p-6">
                  <h3 className="font-bold text-lg mb-2" style={{ color: "#1A56DB" }}>{t(a.title, locale)}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{t(a.desc, locale)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16" style={{ background: "#1A56DB" }}>
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">{t({ en: "Ready to specify the S2000 Elite?", zh: "准备选型 S2000 Elite?" }, locale)}</h2>
          <p className="text-gray-300 mb-8">{t({ en: "Our UV curing engineers will match irradiance, light guide, and dose control to your exact process — from selection to validation.", zh: "我们的UV固化工程师将根据您的具体工艺匹配辐照度、导光管与剂量控制——从选型到验证。" }, locale)}</p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href={inquiryMailto(locale, { subject: "Quote Request", context: "OmniCure S2000 Elite" })} className="px-8 py-3 rounded font-semibold text-white hover:opacity-90 transition-all" style={{ background: "#44B549" }}>{t({ en: "Request a Quote →", zh: "获取报价 →" }, locale)}</a>
            <Link href="/product/omnicure" className="px-8 py-3 rounded font-semibold text-white border border-white/30 hover:border-white/60 transition-all">{t({ en: "Back to OmniCure", zh: "返回 OmniCure" }, locale)}</Link>
          </div>
        </div>
      </section>
    </>
  );
}
