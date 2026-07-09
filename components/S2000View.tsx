"use client";
import Link from "next/link";
import Image from "next/image";
import { inquiryMailto } from "@/components/contact";
import RelatedApplications from "@/components/RelatedApplications";
import TrustStrip from "@/components/TrustStrip";
import FinalCta from "@/components/FinalCta";
import { useLocale, t, type LangText } from "@/components/LocaleContext";
import { HeartPulse, CircuitBoard, Car, BadgeCheck, ArrowRight } from "lucide-react";

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

const applications: { Icon: typeof HeartPulse; title: LangText; desc: LangText }[] = [
  { Icon: HeartPulse, title: { en: "Medical Devices", zh: "医疗器械" }, desc: { en: "Catheter tip bonding, needle assembly, sensor encapsulation, surgical instrument bonding — where validated, repeatable processes are regulatory requirements.", zh: "导管尖端粘接、针头装配、传感器封装、手术器械粘接——这些场景对验证、可重复的工艺有法规要求。" } },
  { Icon: CircuitBoard, title: { en: "Electronics", zh: "电子" }, desc: { en: "PCB conformal coating cure, component bonding, display assembly, wire tacking — high throughput with precise dose control for every board.", zh: "PCB三防漆固化、元件粘接、显示屏装配、线材点固——高产能且对每块板都精确控制剂量。" } },
  { Icon: Car, title: { en: "EV Battery & Automotive", zh: "电动汽车电池与汽车" }, desc: { en: "Battery tab bonding, cell assembly, sensor potting, connector sealing — demanding cure specs in high-volume EV production lines.", zh: "电池极耳粘接、电芯装配、传感器灌封、连接器密封——满足大批量EV产线的严苛固化规范。" } },
];

const LAMP_PATH = "/product/omnicure/s2000-lamp";
const SUPPORT_PATH = "/product/omnicure/s2000/support";

// Decision-oriented "is it right for you"
const fitYes: LangText[] = [
  { en: "You need the highest broad-spectrum irradiance — up to 30 W/cm² — for low-sensitivity, thick or pigmented adhesives.", zh: "您需要最高的宽光谱辐照度（最高 30 W/cm²），用于低敏感、厚层或含颜料的胶粘剂。" },
  { en: "Your process must be validated and audited (medical, EV) with ±5% closed-loop dose stability.", zh: "您的工艺需要验证与审计（医疗、电动汽车），并要求 ±5% 闭环剂量稳定性。" },
  { en: "You cure many chemistries and want 7 selectable band-pass filters and 2 lamp types.", zh: "您固化多种化学体系，需要 7 种可选带通滤光片与 2 种灯管。" },
  { en: "You are automating — StepCure 2.0, PLC I/O, Web UI and NFC access control.", zh: "您正在推进自动化 —— StepCure 2.0、PLC I/O、Web UI 与 NFC 权限控制。" },
  { en: "You must match multiple stations to identical, NIST-traceable output with the R2000.", zh: "您需要用 R2000 将多台设备匹配到一致、NIST 可溯源的输出。" },
];
const fitConsider: { text: LangText; href: string; label: LangText }[] = [
  { text: { en: "You want a wavelength-specific UV LED source (365 / 385 / 405 nm) with long life and low maintenance.", zh: "您需要特定波长的 UV LED 光源（365 / 385 / 405 nm），寿命长、维护低。" }, href: "/product/systems/lx500", label: { en: "See OmniCure LX500", zh: "查看 OmniCure LX500" } },
  { text: { en: "You run a simpler, cost-sensitive lamp-based spot-curing process.", zh: "您的灯式点固化工艺更简单、对成本敏感。" }, href: "/product/systems/s1500-pro", label: { en: "See OmniCure S1500 Pro", zh: "查看 OmniCure S1500 Pro" } },
];

// Comparison: S2000 Elite vs S1500 Pro vs LX500
const compare: { feature: LangText; s2000: LangText; s1500: LangText; lx500: LangText }[] = [
  { feature: { en: "Curing type", zh: "固化类型" }, s2000: { en: "Lamp · broad spectrum", zh: "灯式 · 宽光谱" }, s1500: { en: "Lamp · broad spectrum", zh: "灯式 · 宽光谱" }, lx500: { en: "UV LED · wavelength-specific", zh: "UV LED · 特定波长" } },
  { feature: { en: "Peak irradiance", zh: "峰值辐照度" }, s2000: { en: "Up to 30 W/cm²", zh: "最高 30 W/cm²" }, s1500: { en: "High", zh: "高" }, lx500: { en: "High (LED)", zh: "高（LED）" } },
  { feature: { en: "Spectral output", zh: "光谱输出" }, s2000: { en: "320–500 nm · 7 selectable filters", zh: "320–500 nm · 7 种可选滤光片" }, s1500: { en: "Broad spectrum", zh: "宽光谱" }, lx500: { en: "365 / 385 / 405 nm", zh: "365 / 385 / 405 nm" } },
  { feature: { en: "Dose control", zh: "剂量控制" }, s2000: { en: "Closed-Loop Feedback ±5% + R2000", zh: "闭环反馈 ±5% + R2000" }, s1500: { en: "Essential control", zh: "基础控制" }, lx500: { en: "Stable LED output + LS200", zh: "稳定 LED 输出 + LS200" } },
  { feature: { en: "Automation", zh: "自动化" }, s2000: { en: "StepCure 2.0 · PLC · NFC · Web UI", zh: "StepCure 2.0 · PLC · NFC · Web UI" }, s1500: { en: "Standard I/O", zh: "标准 I/O" }, lx500: { en: "Multi-channel · modular heads", zh: "多通道 · 模块化灯头" } },
  { feature: { en: "Maintenance", zh: "维护" }, s2000: { en: "Field-replaceable lamp (2,000 h+)", zh: "现场可换灯管（2,000 小时+）" }, s1500: { en: "Replaceable lamp", zh: "可换灯管" }, lx500: { en: "Long-life LED · low maintenance", zh: "长寿命 LED · 低维护" } },
  { feature: { en: "Best for", zh: "最适合" }, s2000: { en: "Validated high-power lamp curing", zh: "验证级高功率灯式固化" }, s1500: { en: "Cost-effective lamp curing", zh: "高性价比灯式固化" }, lx500: { en: "Automated / wavelength-specific LED spot", zh: "自动化 / 特定波长 LED 点固化" } },
];

// Lamps, filters & accessories (all genuine OmniCure part numbers)
const accessories: { title: LangText; items: LangText[]; href?: string; cta?: LangText }[] = [
  { title: { en: "Replacement Lamps", zh: "替换灯管" }, items: [{ en: "012-68000R — Lamp Module (Standard)", zh: "012-68000R — 灯管模块（标准）" }, { en: "012-69000R — Lamp Module (Surface Cure)", zh: "012-69000R — 灯管模块（表面固化）" }, { en: "012-64000R / 012-54000R — 200 W spare lamps", zh: "012-64000R / 012-54000R — 200W 备用灯管" }], href: LAMP_PATH, cta: { en: "Order lamps", zh: "订购灯管" } },
  { title: { en: "Optical Band-Pass Filters (7)", zh: "光学带通滤光片（7 种）" }, items: [{ en: "019-00387R (400–500 nm) · 019-00388R (365 nm) · 019-00389R (320–390 nm)", zh: "019-00387R (400–500 nm) · 019-00388R (365 nm) · 019-00389R (320–390 nm)" }, { en: "019-00390R (250–450 nm) · 019-00391R (320–500 nm) · 019-00392R (Blank)", zh: "019-00390R (250–450 nm) · 019-00391R (320–500 nm) · 019-00392R (空白)" }] },
  { title: { en: "Liquid Light Guides & Adapters", zh: "液体导光管与适配器" }, items: [{ en: "OmniCure S Series — 3 / 5 / 8 mm; single, dual & triple-leg; Cure-Ring and Light-Line adapters", zh: "OmniCure S 系列 — 3 / 5 / 8 mm；单/双/三支；Cure-Ring 与 Light-Line 适配器" }], href: "/product/systems/s-series-light-guides", cta: { en: "View light guides", zh: "查看导光管" } },
  { title: { en: "Radiometer & Calibration", zh: "辐射计与校准" }, items: [{ en: "OmniCure R2000 — NIST-traceable, real-time irradiance calibration for the S2000 Elite", zh: "OmniCure R2000 — NIST 可溯源，为 S2000 Elite 实时校准辐照度" }], href: "/product/systems/r2000", cta: { en: "View R2000", zh: "查看 R2000" } },
  { title: { en: "NFC Access Keycards", zh: "NFC 权限卡" }, items: [{ en: "019-00406R — Intelli-Tap Supervisor · 019-00407R — Intelli-Tap Admin", zh: "019-00406R — Intelli-Tap 主管卡 · 019-00407R — Intelli-Tap 管理员卡" }] },
  { title: { en: "Service & Support", zh: "服务与支持" }, items: [{ en: "Lamp compatibility check, installation, calibration and process validation support by ETIA.", zh: "由 ETIA 提供灯管兼容性核对、安装、校准与工艺验证支持。" }], href: "/contact", cta: { en: "Talk to Support", zh: "联系支持" } },
];

// Specific application chips
const appChips: LangText[] = [
  { en: "Catheter tip bonding", zh: "导管尖端粘接" },
  { en: "Needle & cannula assembly", zh: "针头与套管装配" },
  { en: "Sensor encapsulation", zh: "传感器封装" },
  { en: "PCB component bonding", zh: "PCB 元件粘接" },
  { en: "Wire tacking", zh: "线材点固" },
  { en: "EV battery sensor potting", zh: "EV 电池传感器灌封" },
  { en: "Connector sealing", zh: "连接器密封" },
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

      {/* Hero — site standard (matches Sales & Support) */}
      <section className="relative overflow-hidden border-b border-[#D9E4EA] bg-gradient-to-br from-white via-[#EEF6FF] to-[#F1FAEF]">
        <div className="absolute -right-36 -top-36 h-[34rem] w-[34rem] rounded-full bg-[#1F63D6]/10 blur-3xl" />
        <div className="absolute -bottom-40 left-1/3 h-96 w-96 rounded-full bg-[#63C94A]/10 blur-3xl" />
        <div className="relative mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 md:py-24 lg:grid-cols-[1.05fr_.95fr] lg:items-center lg:px-8">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-[#41A62A]/20 bg-white px-3 py-1.5 text-xs font-bold text-[#41A62A] shadow-sm"><BadgeCheck className="h-4 w-4" /> {t({ en: "OmniCure · Lamp-Based UV Spot Curing", zh: "OmniCure · 灯式 UV 点固化" }, locale)}</div>
            <h1 className="mt-6 max-w-4xl text-4xl font-bold leading-[1.08] tracking-tight text-[#143C96] md:text-6xl">
              {t({ en: "OmniCure S2000 Elite", zh: "OmniCure S2000 Elite" }, locale)}<span className="mt-2 block text-2xl font-bold text-[#41A62A] md:text-4xl">{t({ en: "Maximum Power. Total Control.", zh: "极致功率，全面掌控。" }, locale)}</span>
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-[#667085] md:text-lg">
              {t({ en: "The industry's most advanced lamp-based UV spot curing system — up to 30 W/cm² with closed-loop precision for medical, electronics, and EV manufacturing.", zh: "业界最先进的灯式UV点固化系统——最高30 W/cm²,以闭环精度服务于医疗、电子与电动汽车制造。" }, locale)}
            </p>
            <div className="mt-7 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {heroStats.map((s) => (
                <div key={s.label.en} className="rounded-xl border border-[#DCE7F5] bg-white/70 p-3 backdrop-blur">
                  <p className="text-xl font-bold text-[#143C96]">{s.val}</p>
                  <p className="mt-0.5 text-xs leading-tight text-gray-500">{t(s.label, locale)}</p>
                </div>
              ))}
            </div>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a href={inquiryMailto(locale, { subject: "S2000 Elite Engineering Inquiry", context: "OmniCure S2000 Elite" })} className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#41A62A] px-6 py-3.5 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-[#358B22]">{t({ en: "Talk to an Engineer", zh: "咨询工程师" }, locale)} <ArrowRight className="h-4 w-4" /></a>
              <a href={inquiryMailto(locale, { subject: "S2000 Elite Datasheet", context: "OmniCure S2000 Elite" })} className="inline-flex items-center justify-center rounded-xl border border-[#D4DFEC] bg-white px-6 py-3.5 text-sm font-bold text-[#143C96] transition hover:-translate-y-0.5 hover:border-[#143C96] hover:text-[#1F63D6]">{t({ en: "Request Datasheet", zh: "索取数据表" }, locale)}</a>
            </div>
          </div>
          <div className="relative min-h-[410px] rounded-[32px] border border-white/80 bg-white/75 p-5 shadow-[0_25px_80px_rgba(20,60,150,.12)] backdrop-blur sm:p-8">
            <Image src={img.intro} alt="OmniCure S2000 Elite UV spot curing system" fill sizes="(max-width: 1024px) 100vw, 40vw" className="object-contain p-8" priority />
          </div>
        </div>
      </section>

      <TrustStrip />

      {/* Is it right for you — decision */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-semibold tracking-widest uppercase mb-2" style={{ color: "#44B549" }}>{t({ en: "Decision Guide", zh: "选型指南" }, locale)}</p>
          <h2 className="text-3xl md:text-4xl font-bold mb-2" style={{ color: "#1A56DB" }}>{t({ en: "Is S2000 Elite Right for Your Process?", zh: "S2000 Elite 适合您的工艺吗？" }, locale)}</h2>
          <div className="w-12 h-1 rounded mb-10" style={{ background: "#44B549" }} />
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="rounded-2xl border border-gray-100 bg-[#f0f7f0] p-7">
              <h3 className="font-bold text-lg mb-4" style={{ color: "#1A56DB" }}>{t({ en: "Choose the S2000 Elite if…", zh: "如果符合以下情况，请选择 S2000 Elite：" }, locale)}</h3>
              <ul className="space-y-3">
                {fitYes.map((f) => (
                  <li key={f.en} className="flex items-start gap-2.5 text-sm text-gray-600 leading-relaxed"><span className="mt-0.5 shrink-0 font-bold" style={{ color: "#44B549" }}>✓</span>{t(f, locale)}</li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border border-gray-100 bg-gray-50 p-7">
              <h3 className="font-bold text-lg mb-4 text-gray-700">{t({ en: "Consider an alternative if…", zh: "如果符合以下情况，可考虑其他型号：" }, locale)}</h3>
              <ul className="space-y-4">
                {fitConsider.map((f) => (
                  <li key={f.href} className="text-sm text-gray-600 leading-relaxed">
                    <span className="flex items-start gap-2.5"><span className="mt-0.5 shrink-0 text-gray-400">→</span>{t(f.text, locale)}</span>
                    <Link href={f.href} className="ml-6 mt-1 inline-block font-semibold hover:underline" style={{ color: "#1A56DB" }}>{t(f.label, locale)} →</Link>
                  </li>
                ))}
              </ul>
            </div>
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

      {/* Comparison — white */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-semibold tracking-widest uppercase mb-2" style={{ color: "#44B549" }}>{t({ en: "Compare", zh: "对比选型" }, locale)}</p>
          <h2 className="text-3xl md:text-4xl font-bold mb-2" style={{ color: "#1A56DB" }}>{t({ en: "Lamp vs LED — S2000 Elite · S1500 Pro · LX500", zh: "灯式 vs LED —— S2000 Elite · S1500 Pro · LX500" }, locale)}</h2>
          <div className="w-12 h-1 rounded mb-8" style={{ background: "#44B549" }} />
          <div className="overflow-x-auto rounded-2xl border border-gray-200">
            <table className="w-full text-sm min-w-[720px]">
              <thead>
                <tr className="text-white" style={{ background: "#1A56DB" }}>
                  <th className="text-left font-semibold px-5 py-3 w-1/4">{t({ en: "Feature", zh: "特性" }, locale)}</th>
                  <th className="text-left font-semibold px-5 py-3">S2000 Elite</th>
                  <th className="text-left font-semibold px-5 py-3">S1500 Pro</th>
                  <th className="text-left font-semibold px-5 py-3">LX500</th>
                </tr>
              </thead>
              <tbody>
                {compare.map((row, i) => (
                  <tr key={row.feature.en} className={i % 2 === 1 ? "bg-gray-50" : "bg-white"}>
                    <td className="px-5 py-3 font-medium text-gray-700 align-top">{t(row.feature, locale)}</td>
                    <td className="px-5 py-3 align-top font-semibold" style={{ color: "#1A56DB" }}>{t(row.s2000, locale)}</td>
                    <td className="px-5 py-3 align-top text-gray-500">{t(row.s1500, locale)}</td>
                    <td className="px-5 py-3 align-top text-gray-500">{t(row.lx500, locale)}</td>
                  </tr>
                ))}
                <tr className="bg-white border-t border-gray-200">
                  <td className="px-5 py-3" />
                  <td className="px-5 py-3"><span className="text-xs font-bold" style={{ color: "#1A56DB" }}>{t({ en: "You are here", zh: "当前页面" }, locale)}</span></td>
                  <td className="px-5 py-3"><Link href="/product/systems/s1500-pro" className="text-xs font-bold hover:underline" style={{ color: "#1A56DB" }}>{t({ en: "View S1500 Pro →", zh: "查看 S1500 Pro →" }, locale)}</Link></td>
                  <td className="px-5 py-3"><Link href="/product/systems/lx500" className="text-xs font-bold hover:underline" style={{ color: "#1A56DB" }}>{t({ en: "View LX500 →", zh: "查看 LX500 →" }, locale)}</Link></td>
                </tr>
              </tbody>
            </table>
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
          <p className="text-gray-500 mb-8 max-w-2xl">
            {t({ en: "Full technical specifications for the OmniCure S2000 Elite lamp-based UV spot curing system. For complete dimensional drawings and installation data, contact our engineering team.", zh: "OmniCure S2000 Elite 灯式UV点固化系统的完整技术规格。如需完整尺寸图纸与安装数据,请联系我们的工程团队。" }, locale)}
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

      {/* Lamps, Filters & Accessories — white */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-semibold tracking-widest uppercase mb-2" style={{ color: "#44B549" }}>{t({ en: "Consumables & Accessories", zh: "耗材与配件" }, locale)}</p>
          <h2 className="text-3xl md:text-4xl font-bold mb-2" style={{ color: "#1A56DB" }}>{t({ en: "S2000 Elite Lamps, Filters & Accessories", zh: "S2000 Elite 灯管、滤光片与配件" }, locale)}</h2>
          <div className="w-12 h-1 rounded mb-4" style={{ background: "#44B549" }} />
          <p className="text-gray-500 max-w-3xl mb-10">{t({ en: "Genuine OmniCure replacement lamps, optical filters, liquid light guides, radiometry and calibration — supplied and supported locally by ETIA.", zh: "正品 OmniCure 替换灯管、光学滤光片、液体导光管、辐射测量与校准 —— 由 ETIA 本地供货与支持。" }, locale)}</p>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {accessories.map((a) => (
              <div key={a.title.en} className="flex flex-col rounded-2xl border border-gray-100 bg-gray-50 p-6">
                <h3 className="font-bold mb-3" style={{ color: "#1A56DB" }}>{t(a.title, locale)}</h3>
                <ul className="space-y-2 mb-4">
                  {a.items.map((it) => (
                    <li key={it.en} className="text-xs leading-relaxed text-gray-500">{t(it, locale)}</li>
                  ))}
                </ul>
                {a.href && a.cta && (
                  <Link href={a.href} className="mt-auto inline-flex items-center gap-1 text-sm font-semibold hover:underline" style={{ color: "#1A56DB" }}>{t(a.cta, locale)} →</Link>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Parts CTA — teal band */}
      <section className="py-14" style={{ background: "linear-gradient(135deg, #1A56DB 0%, #087F6B 100%)" }}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-5 text-center md:flex-row md:items-center md:justify-between md:text-left">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-white">{t({ en: "Need S2000 Lamp or Accessories?", zh: "需要 S2000 灯管或配件？" }, locale)}</h2>
            <p className="mt-2 text-blue-100 max-w-2xl">{t({ en: "Order genuine replacement lamps by part number, or send us your model and serial for a compatibility check.", zh: "按料号订购正品替换灯管，或发送型号与序列号进行兼容性核对。" }, locale)}</p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row md:shrink-0">
            <Link href={LAMP_PATH} className="inline-flex items-center justify-center rounded-xl bg-white px-6 py-3 text-sm font-bold text-[#1A56DB] transition hover:-translate-y-0.5">{t({ en: "Order S2000 Lamp →", zh: "订购 S2000 灯管 →" }, locale)}</Link>
            <a href={inquiryMailto(locale, { subject: "S2000 Lamp / Accessories", context: "System model / serial number / lamp photo" })} className="inline-flex items-center justify-center rounded-xl border border-white/40 px-6 py-3 text-sm font-bold text-white transition hover:border-white">{t({ en: "Talk to Support", zh: "联系支持" }, locale)}</a>
          </div>
        </div>
      </section>

      {/* Installation & Support callout — internal link to the support page */}
      <section className="py-14 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-gray-200 bg-[#f6f9ff] p-6 md:p-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-xl md:text-2xl font-bold mb-2" style={{ color: "#1A56DB" }}>{t({ en: "Installation & Operation Guidance", zh: "安装与操作指导" }, locale)}</h2>
              <p className="text-gray-500 max-w-2xl leading-relaxed">{t({ en: "Need installation and operation guidance for the OmniCure S2000 Elite? See our detailed installation guide page — startup, light guide and lamp module installation, optical filter changes, status light-ring colours, troubleshooting, safety and regulatory information.", zh: "需要 OmniCure S2000 Elite 的安装与操作指导？请查看我们的详细安装指南页面——开机、导光管与灯管模块安装、光学滤光片更换、状态光环颜色、故障排查、安全与合规信息。" }, locale)}</p>
            </div>
            <Link href={SUPPORT_PATH} className="shrink-0 inline-flex items-center justify-center rounded-xl px-6 py-3 text-sm font-bold text-white transition hover:-translate-y-0.5" style={{ background: "#1A56DB" }}>{t({ en: "Installation & Support Guide →", zh: "安装与支持指南 →" }, locale)}</Link>
          </div>
        </div>
      </section>

      {/* Applications — light gray */}
      <section className="py-20" style={{ background: "#f0f4f8" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-semibold tracking-widest uppercase mb-2" style={{ color: "#44B549" }}>{t({ en: "Applications", zh: "应用领域" }, locale)}</p>
          <h2 className="text-3xl md:text-4xl font-bold mb-2" style={{ color: "#1A56DB" }}>{t({ en: "Industries We Serve", zh: "我们服务的行业" }, locale)}</h2>
          <div className="w-12 h-1 rounded mb-4" style={{ background: "#44B549" }} />
          <p className="text-gray-500 max-w-2xl mb-6">{t({ en: "The S2000 Elite's combination of high irradiance, validated dose control, and Industry 4.0 connectivity makes it the system of choice across demanding manufacturing sectors.", zh: "S2000 Elite 集高辐照度、验证级剂量控制与工业4.0连接于一身,成为严苛制造领域的首选系统。" }, locale)}</p>
          <div className="flex flex-wrap gap-2 mb-10">
            {appChips.map((c) => (
              <span key={c.en} className="text-xs font-semibold px-3 py-1.5 rounded-full border" style={{ borderColor: "#1A56DB33", color: "#1A56DB", background: "#1A56DB0d" }}>{t(c, locale)}</span>
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {applications.map((a) => (
              <div key={a.title.en} className="rounded-2xl border border-gray-100 bg-white shadow-sm hover:shadow-md hover:border-[#1A56DB]/30 transition-all p-6">
                <div className="flex items-center gap-3 mb-3">
                  <span className="flex items-center justify-center w-11 h-11 rounded-lg shrink-0" style={{ background: "#1A56DB14", color: "#1A56DB" }}>
                    <a.Icon size={24} strokeWidth={1.75} />
                  </span>
                  <h3 className="font-bold text-lg" style={{ color: "#1A56DB" }}>{t(a.title, locale)}</h3>
                </div>
                <p className="text-gray-500 text-sm leading-relaxed">{t(a.desc, locale)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <RelatedApplications productSlug="s2000-elite" />

      <FinalCta
        heading={t({ en: "Ready to specify the S2000 Elite?", zh: "准备选型 S2000 Elite?" }, locale)}
        body={t({ en: "Our UV curing engineers will match irradiance, light guide, and dose control to your exact process — from selection to validation.", zh: "我们的UV光固化工程师将根据您的具体工艺匹配辐照度、导光管与剂量控制——从选型到验证。" }, locale)}
        primary={{ label: t({ en: "Talk to an Engineer", zh: "咨询工程师" }, locale), href: inquiryMailto(locale, { subject: "S2000 Elite Engineering Inquiry", context: "OmniCure S2000 Elite" }) }}
        secondary={{ label: t({ en: "Request Datasheet", zh: "索取数据表" }, locale), href: inquiryMailto(locale, { subject: "S2000 Elite Datasheet", context: "OmniCure S2000 Elite" }) }}
      />
    </>
  );
}
