"use client";
import Link from "next/link";
import Image from "next/image";
import { inquiryMailto, SERVICE_EMAIL } from "@/components/contact";
import { useLocale, t, type LangText } from "@/components/LocaleContext";
import { s2000Faqs } from "@/components/s2000Faq";
import {
  ArrowRight,
  BadgeCheck,
  Cable,
  Crosshair,
  Download,
  FileText,
  Lightbulb,
  Radio,
  ScanLine,
  Settings2,
  Sun,
  Aperture,
  Cpu,
  Wrench,
  LifeBuoy,
  Zap,
} from "lucide-react";

const PROMO = "https://etiatech-1303055923.cos.ap-singapore.myqcloud.com/IMAGE/PROMOTION";
const HERO_IMG = `${PROMO}/PROMOTION-OMNICURE%20S2000%20ELITE%20-INTRODUCTION.webp`;

// Downloadable technical documents (COS-hosted PDFs)
const PDF = {
  brochure:
    "https://etiatech-1303055923.cos.ap-singapore.myqcloud.com/PDF/Brochure%20-%20OmniCure%20S2000%20Elite%20UV%20Curing%20System.pdf",
  quickStart:
    "https://etiatech-1303055923.cos.ap-singapore.myqcloud.com/PDF/Quick%20Start%20Guide%20-%20OmniCure%20S2000%20Elite%20UV%20Curing%20System.pdf",
  userGuide:
    "https://etiatech-1303055923.cos.ap-singapore.myqcloud.com/PDF/User%20Guide%20-%20OmniCure%20S2000%20Elite%20UV%20Curing%20System.pdf",
};

// Internal links
const BRAND_PATH = "/product/omnicure";
const LAMP_PATH = "/product/omnicure/s2000-lamp";
const SUPPORT_PATH = "/contact";

const BLUE = "#1A56DB";
const GREEN = "#41A62A";

const heroStats: { val: string; label: LangText }[] = [
  { val: "30 / 37 W/cm²", label: { en: "Optical output", zh: "光学输出" } },
  { val: "CLF", label: { en: "Closed-Loop Feedback", zh: "闭环反馈" } },
  { val: "30 ms", label: { en: "High-speed shutter", zh: "高速快门" } },
  { val: "Web UI · PLC", label: { en: "NFC · StepCure ready", zh: "NFC · StepCure 就绪" } },
];

const featureCards: { Icon: typeof Radio; title: LangText; body: LangText }[] = [
  {
    Icon: Cable,
    title: { en: "OmniCure S2000 Elite Remote Control & Monitoring", zh: "OmniCure S2000 Elite 远程控制与监控" },
    body: {
      en: "Remote control, management, and monitoring are available through the Web UI, allowing users to access system functions, curing profiles, system logs, and software updates from a connected device.",
      zh: "通过 Web UI 实现远程控制、管理与监控,用户可从联网设备访问系统功能、固化配置、系统日志与软件更新。",
    },
  },
  {
    Icon: ScanLine,
    title: { en: "OmniCure S2000 Elite Touchscreen User Interface", zh: "OmniCure S2000 Elite 触摸屏用户界面" },
    body: {
      en: "The 4.3-inch LCD touchscreen provides intuitive access to system control, settings, exposure operation, and curing-related status information.",
      zh: "4.3 英寸 LCD 触摸屏提供直观的系统控制、设置、曝光操作与固化相关状态信息访问。",
    },
  },
  {
    Icon: Cpu,
    title: { en: "OmniCure S2000 Elite StepCure PLC Control", zh: "OmniCure S2000 Elite StepCure PLC 控制" },
    body: {
      en: "StepCure allows programmable curing sequences with PLC control, helping users manage validated production processes with repeatable exposure control.",
      zh: "StepCure 支持可编程固化序列与 PLC 控制,帮助用户以可重复的曝光控制管理经验证的生产工艺。",
    },
  },
  {
    Icon: Settings2,
    title: { en: "OmniCure S2000 Elite Quick Configuration", zh: "OmniCure S2000 Elite 快速配置" },
    body: {
      en: "User-changeable lamp types and optical filters allow faster system configuration and reduced downtime during process changes.",
      zh: "用户可更换的灯管类型与光学滤光片可加快系统配置,并在工艺切换时减少停机时间。",
    },
  },
  {
    Icon: Crosshair,
    title: { en: "OmniCure S2000 Elite Closed-Loop Feedback (CLF)", zh: "OmniCure S2000 Elite 闭环反馈 (CLF)" },
    body: {
      en: "Closed-Loop Feedback monitors optical output and helps maintain repeatable irradiance during the curing process.",
      zh: "闭环反馈监测光学输出,帮助在固化过程中维持可重复的辐照度。",
    },
  },
  {
    Icon: Lightbulb,
    title: { en: "OmniCure S2000 Elite Intelli-Lamp Technology", zh: "OmniCure S2000 Elite Intelli-Lamp 技术" },
    body: {
      en: "Intelli-Lamp technology tracks lamp parameters and supports lamp-life management, helping reduce unexpected downtime.",
      zh: "Intelli-Lamp 技术追踪灯管参数并支持灯管寿命管理,帮助减少意外停机。",
    },
  },
  {
    Icon: Radio,
    title: { en: "OmniCure S2000 Elite Intelli-Tap NFC Access Control", zh: "OmniCure S2000 Elite Intelli-Tap NFC 访问控制" },
    body: {
      en: "Intelli-Tap NFC allows supervisor and administrator access control for locking, unlocking, and protecting process settings.",
      zh: "Intelli-Tap NFC 提供主管与管理员访问控制,用于锁定、解锁与保护工艺设置。",
    },
  },
  {
    Icon: Aperture,
    title: { en: "OmniCure S2000 Elite Optical Performance", zh: "OmniCure S2000 Elite 光学性能" },
    body: {
      en: "The S2000 Elite maintains backward compatibility with the original S2000 process platform, including light guides, optical filters, radiometry accessories, and spectral output.",
      zh: "S2000 Elite 与原始 S2000 工艺平台保持向后兼容,包括导光管、光学滤光片、辐射测量配件与光谱输出。",
    },
  },
];

const resourceCards: { title: LangText; desc: LangText; btn: LangText; href: string }[] = [
  {
    title: { en: "OmniCure S2000 Elite Brochure", zh: "OmniCure S2000 Elite 产品手册" },
    desc: {
      en: "Product overview, key features, system compatibility, control functions, and performance benefits.",
      zh: "产品概述、核心功能、系统兼容性、控制功能与性能优势。",
    },
    btn: { en: "Download Brochure", zh: "下载产品手册" },
    href: PDF.brochure,
  },
  {
    title: { en: "OmniCure S2000 Elite Quick Start Guide", zh: "OmniCure S2000 Elite 快速入门指南" },
    desc: {
      en: "Startup steps, light guide installation, exposure setup, lamp module installation, and optical filter installation.",
      zh: "启动步骤、导光管安装、曝光设置、灯管模块安装与光学滤光片安装。",
    },
    btn: { en: "Download Quick Start Guide", zh: "下载快速入门指南" },
    href: PDF.quickStart,
  },
  {
    title: { en: "OmniCure S2000 Elite User Guide", zh: "OmniCure S2000 Elite 用户指南" },
    desc: {
      en: "Full operating manual covering safety, setup, calibration, Web UI, PLC integration, StepCure, maintenance, software updates, troubleshooting, and specifications.",
      zh: "完整操作手册,涵盖安全、设置、校准、Web UI、PLC 集成、StepCure、维护、软件更新、故障排查与规格。",
    },
    btn: { en: "Download User Guide", zh: "下载用户指南" },
    href: PDF.userGuide,
  },
];

const setupCards: { title: LangText; body: LangText }[] = [
  {
    title: { en: "OmniCure S2000 Elite Startup", zh: "OmniCure S2000 Elite 启动" },
    body: {
      en: "Install the lamp module, install the optical filter, connect power, turn on the system, and allow proper warm-up before operation.",
      zh: "安装灯管模块、安装光学滤光片、连接电源、开启系统,并在操作前进行充分预热。",
    },
  },
  {
    title: { en: "OmniCure S2000 Elite Light Guide Installation", zh: "OmniCure S2000 Elite 导光管安装" },
    body: {
      en: "Insert the light guide into the front light guide port until it clicks into place.",
      zh: "将导光管插入前部导光管端口,直至卡入到位。",
    },
  },
  {
    title: { en: "OmniCure S2000 Elite Light Ring Status", zh: "OmniCure S2000 Elite 光环状态" },
    body: {
      en: "Use the light ring color to understand system status, including light guide detection, warm-up, Closed-Loop Feedback status, and calibration condition.",
      zh: "通过光环颜色了解系统状态,包括导光管检测、预热、闭环反馈状态与校准状况。",
    },
  },
  {
    title: { en: "OmniCure S2000 Elite Exposure Time Setting", zh: "OmniCure S2000 Elite 曝光时间设置" },
    body: {
      en: "Set exposure time from the Run screen using the touchscreen or navigation controls.",
      zh: "在运行界面上使用触摸屏或导航控件设置曝光时间。",
    },
  },
  {
    title: { en: "OmniCure S2000 Elite Intensity Setting", zh: "OmniCure S2000 Elite 强度设置" },
    body: {
      en: "Set intensity from the touchscreen or navigation buttons. Calibration is required for W/cm² and W control.",
      zh: "通过触摸屏或导航按钮设置强度。W/cm² 与 W 控制需要校准。",
    },
  },
  {
    title: { en: "OmniCure S2000 Elite Lock and Unlock", zh: "OmniCure S2000 Elite 锁定与解锁" },
    body: {
      en: "Use PIN or NFC access control to protect validated curing settings.",
      zh: "使用 PIN 或 NFC 访问控制保护经验证的固化设置。",
    },
  },
];

const troubleshooting: { title: LangText; body: LangText }[] = [
  {
    title: { en: "OmniCure S2000 Elite Light Guide Not Detected", zh: "OmniCure S2000 Elite 未检测到导光管" },
    body: {
      en: "Check whether the light guide is fully inserted and properly seated in the light guide port. If the issue continues, contact ETIA technical support.",
      zh: "检查导光管是否完全插入并正确安装在导光管端口中。如问题持续,请联系 ETIA 技术支持。",
    },
  },
  {
    title: { en: "OmniCure S2000 Elite Lamp Does Not Strike", zh: "OmniCure S2000 Elite 灯管无法点亮" },
    body: {
      en: "Check lamp installation, filter installation, lamp housing panel, power connection, and system status. If the issue continues, contact ETIA technical support.",
      zh: "检查灯管安装、滤光片安装、灯罩面板、电源连接与系统状态。如问题持续,请联系 ETIA 技术支持。",
    },
  },
  {
    title: { en: "OmniCure S2000 Elite Closed-Loop Feedback Inactive", zh: "OmniCure S2000 Elite 闭环反馈未激活" },
    body: {
      en: "Check calibration status, lamp condition, light guide connection, and filter configuration. If the issue continues, contact ETIA technical support.",
      zh: "检查校准状态、灯管状况、导光管连接与滤光片配置。如问题持续,请联系 ETIA 技术支持。",
    },
  },
  {
    title: { en: "OmniCure S2000 Elite Output Intensity Unstable", zh: "OmniCure S2000 Elite 输出强度不稳定" },
    body: {
      en: "Allow sufficient warm-up, verify calibration, inspect the light guide, and check lamp life status. If the issue continues, contact ETIA technical support.",
      zh: "进行充分预热、核实校准、检查导光管并查看灯管寿命状态。如问题持续,请联系 ETIA 技术支持。",
    },
  },
  {
    title: { en: "OmniCure S2000 Elite Filter Not Recognized", zh: "OmniCure S2000 Elite 无法识别滤光片" },
    body: {
      en: "Check whether the optical filter cartridge is properly installed and fastened. If the filter is not properly installed, the system may not recognize it and the lamp may not strike.",
      zh: "检查光学滤光片卡盒是否正确安装并固定。若滤光片未正确安装,系统可能无法识别,灯管也可能无法点亮。",
    },
  },
  {
    title: { en: "OmniCure S2000 Elite System Locked", zh: "OmniCure S2000 Elite 系统锁定" },
    body: {
      en: "Use the configured PIN, supervisor card, or administrator NFC card depending on the access control setup. If the issue continues, contact ETIA technical support.",
      zh: "根据访问控制设置,使用配置的 PIN、主管卡或管理员 NFC 卡。如问题持续,请联系 ETIA 技术支持。",
    },
  },
];

const supportCards: { Icon: typeof Sun; title: LangText; body: LangText }[] = [
  {
    Icon: Sun,
    title: { en: "OmniCure S2000 Elite Replacement Lamp Support", zh: "OmniCure S2000 Elite 替换灯管支持" },
    body: {
      en: "Support for standard curing lamp and surface cure lamp selection.",
      zh: "支持标准固化灯管与表面固化灯管的选型。",
    },
  },
  {
    Icon: Aperture,
    title: { en: "OmniCure S2000 Elite Optical Filter Support", zh: "OmniCure S2000 Elite 光学滤光片支持" },
    body: {
      en: "Support for selecting and replacing optical band-pass filters.",
      zh: "支持光学带通滤光片的选型与更换。",
    },
  },
  {
    Icon: Cable,
    title: { en: "OmniCure S2000 Elite Light Guide Support", zh: "OmniCure S2000 Elite 导光管支持" },
    body: {
      en: "Support for light guide selection, installation, cleaning, and replacement.",
      zh: "支持导光管的选型、安装、清洁与更换。",
    },
  },
  {
    Icon: Crosshair,
    title: { en: "OmniCure S2000 Elite Calibration Support", zh: "OmniCure S2000 Elite 校准支持" },
    body: {
      en: "Support for R2000 radiometer calibration and repeatable irradiance control.",
      zh: "支持 R2000 辐射计校准与可重复的辐照度控制。",
    },
  },
  {
    Icon: Wrench,
    title: { en: "OmniCure S2000 Elite Maintenance & Repair Support", zh: "OmniCure S2000 Elite 维护与维修支持" },
    body: {
      en: "Support for routine maintenance, troubleshooting, and repair coordination.",
      zh: "支持日常维护、故障排查与维修协调。",
    },
  },
];

const whyEtia: { Icon: typeof BadgeCheck; title: LangText }[] = [
  { Icon: BadgeCheck, title: { en: "Genuine OmniCure Products", zh: "正品 OmniCure 产品" } },
  { Icon: Crosshair, title: { en: "Application-Driven Selection", zh: "应用导向的选型" } },
  { Icon: Zap, title: { en: "Local Supply & Fast Response", zh: "本地供货与快速响应" } },
  { Icon: LifeBuoy, title: { en: "Long-Term Service Support", zh: "长期服务支持" } },
];

const faqs = s2000Faqs;

function SectionHead({
  eyebrow,
  title,
  sub,
  locale,
}: {
  eyebrow: LangText;
  title: LangText;
  sub?: LangText;
  locale: ReturnType<typeof useLocale>["locale"];
}) {
  return (
    <>
      <p className="text-xs font-semibold tracking-widest uppercase mb-2" style={{ color: GREEN }}>
        {t(eyebrow, locale)}
      </p>
      <h2 className="text-3xl md:text-4xl font-bold mb-2" style={{ color: BLUE }}>
        {t(title, locale)}
      </h2>
      <div className="w-12 h-1 rounded mb-6" style={{ background: GREEN }} />
      {sub && <p className="text-gray-500 max-w-3xl mb-10 leading-relaxed">{t(sub, locale)}</p>}
    </>
  );
}

export default function S2000View() {
  const { locale } = useLocale();

  const quoteMail = inquiryMailto(locale, {
    subject: "OmniCure S2000 Elite — Request a Quote",
    context: "OmniCure S2000 Elite UV Spot Curing System",
  });
  const supportMail = inquiryMailto(locale, {
    subject: "OmniCure S2000 Elite — Technical Support",
    context: "OmniCure S2000 Elite UV Spot Curing System",
    email: SERVICE_EMAIL,
  });
  const engineerMail = inquiryMailto(locale, {
    subject: "OmniCure S2000 Elite — Talk to an Engineer",
    context: "OmniCure S2000 Elite UV Spot Curing System",
  });

  return (
    <>
      {/* 1. Breadcrumb */}
      <nav aria-label="Breadcrumb" className="border-b border-gray-200 py-3 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-xs text-gray-400">
          <Link href="/product" className="hover:text-[#1A56DB]">
            {t({ en: "Products", zh: "产品" }, locale)}
          </Link>
          <span className="mx-2">›</span>
          <Link href={BRAND_PATH} className="hover:text-[#1A56DB]">
            OmniCure
          </Link>
          <span className="mx-2">›</span>
          <span style={{ color: BLUE }}>S2000 Elite</span>
        </div>
      </nav>

      {/* 2. Hero */}
      <section className="relative overflow-hidden border-b border-gray-200 bg-gradient-to-br from-white via-[#EEF6FF] to-[#F1FAEF]">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 md:py-20 grid gap-12 lg:grid-cols-[1.05fr_.95fr] lg:items-center">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-[#1A56DB]/20 bg-white px-3 py-1.5 text-xs font-bold" style={{ color: BLUE }}>
                <BadgeCheck className="h-4 w-4" />
                {t({ en: "OmniCure S Series · Lamp-Based UV Spot Curing", zh: "OmniCure S 系列 · 灯式 UV 点固化" }, locale)}
              </span>
            </div>
            <h1 className="max-w-3xl text-4xl md:text-5xl font-bold leading-[1.1] tracking-tight" style={{ color: BLUE }}>
              OmniCure S2000 Elite <span style={{ color: GREEN }}>UV Spot Curing System</span>
            </h1>
            <p className="mt-4 text-xl md:text-2xl font-semibold text-[#102A43]">
              {t({ en: "Maximum Power. Total Control.", zh: "高功率输出 精准过程控制" }, locale)}
            </p>
            <p className="mt-4 max-w-2xl text-base md:text-lg leading-7 text-gray-600">
              {t(
                {
                  en: "High-intensity lamp-based UV spot curing with Closed-Loop Feedback, precise shutter control, and advanced process monitoring for validated manufacturing.",
                  zh: "高强度灯式 UV 点固化,配备闭环反馈、精确快门控制与先进的工艺监控,适用于验证级制造。",
                },
                locale
              )}
            </p>

            <div className="mt-7 grid grid-cols-2 sm:grid-cols-4 gap-3">
              {heroStats.map((s) => (
                <div key={s.label.en} className="rounded-lg p-3 border border-gray-200 bg-white/80 backdrop-blur">
                  <p className="text-base font-bold leading-tight" style={{ color: BLUE }}>
                    {s.val}
                  </p>
                  <p className="text-xs text-gray-500 leading-tight mt-1">{t(s.label, locale)}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <a
                href={quoteMail}
                className="inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-sm font-bold text-white transition hover:-translate-y-0.5"
                style={{ background: BLUE }}
              >
                {t({ en: "Request a Quote", zh: "请求报价" }, locale)}
                <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href={PDF.brochure}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#D4DFEC] bg-white px-6 py-3.5 text-sm font-bold transition hover:-translate-y-0.5 hover:border-[#1A56DB]"
                style={{ color: BLUE }}
              >
                <Download className="h-4 w-4" />
                {t({ en: "Download Brochure", zh: "下载产品手册" }, locale)}
              </a>
              <a
                href={supportMail}
                className="inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-sm font-bold text-white transition hover:-translate-y-0.5"
                style={{ background: GREEN }}
              >
                <LifeBuoy className="h-4 w-4" />
                {t({ en: "Get Technical Support", zh: "获取技术支持" }, locale)}
              </a>
            </div>
          </div>

          <div className="relative min-h-[360px] lg:min-h-[410px] rounded-[32px] border border-white/80 bg-white/75 p-5 sm:p-8 shadow-[0_25px_80px_rgba(20,60,150,.12)] backdrop-blur">
            <Image
              src={HERO_IMG}
              alt="OmniCure S2000 Elite UV Spot Curing System with light guide"
              fill
              sizes="(max-width: 1024px) 100vw, 45vw"
              className="object-contain p-6"
              priority
            />
          </div>
        </div>
      </section>

      {/* Trust bar — OmniCure brand variant (4 trust points) */}
      <section className="bg-gradient-to-r from-[#143C96] to-[#1A56DB] px-4 py-5 text-white sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-3 text-center md:flex-row md:justify-between md:text-left">
          <p className="text-sm font-semibold">
            {t({ en: "ETIA is an authorized distributor of OmniCure® products.", zh: "ETIA 是 OmniCure® 产品的授权分销商。" }, locale)}
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-xs font-semibold text-blue-100">
            {[
              { en: "Genuine OmniCure Products", zh: "正品 OmniCure 产品" },
              { en: "Application-Driven Selection", zh: "应用导向选型" },
              { en: "Local Supply & Fast Response", zh: "本地供货 · 快速响应" },
              { en: "Long-Term Service Support", zh: "长期服务支持" },
            ].map((i) => (
              <span key={i.en} className="inline-flex items-center gap-1.5">
                <BadgeCheck className="h-4 w-4 text-[#8BE172]" />
                {t(i, locale)}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Product Overview */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHead
            eyebrow={{ en: "Overview", zh: "概述" }}
            title={{ en: "OmniCure S2000 Elite Product Overview", zh: "OmniCure S2000 Elite 产品概述" }}
            locale={locale}
          />
          <p className="text-gray-600 leading-relaxed text-lg">
            {t(
              {
                en: "The OmniCure S2000 Elite is a lamp-based UV spot curing system designed for demanding manufacturing processes that require stable optical output, repeatable dose control, fast exposure cycles, and reliable process monitoring. It is suitable for production environments where curing consistency, traceability, and uptime are critical.",
                zh: "OmniCure S2000 Elite 是一款灯式 UV 点固化系统,专为需要稳定光学输出、可重复剂量控制、快速曝光周期与可靠工艺监控的严苛制造工艺而设计。它适用于对固化一致性、可追溯性与正常运行时间要求严格的生产环境。",
              },
              locale
            )}
          </p>
          <p className="mt-5 text-sm text-gray-500">
            {t({ en: "Part of the", zh: "隶属于" }, locale)}{" "}
            <Link href={BRAND_PATH} className="font-semibold hover:underline" style={{ color: BLUE }}>
              {t({ en: "OmniCure product family", zh: "OmniCure 产品系列" }, locale)}
            </Link>
            {t({ en: ". Looking for consumables? See the", zh: "。需要耗材?请查看" }, locale)}{" "}
            <Link href={LAMP_PATH} className="font-semibold hover:underline" style={{ color: BLUE }}>
              {t({ en: "OmniCure S2000 replacement lamp page", zh: "OmniCure S2000 替换灯管页面" }, locale)}
            </Link>
            .
          </p>
        </div>
      </section>

      {/* 4. Key Features */}
      <section className="py-16 md:py-20" style={{ background: "#f0f4f8" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHead
            eyebrow={{ en: "Key Features", zh: "核心功能" }}
            title={{ en: "OmniCure S2000 Elite Key Features", zh: "OmniCure S2000 Elite 核心功能" }}
            locale={locale}
          />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {featureCards.map((f) => (
              <div
                key={f.title.en}
                className="flex flex-col rounded-2xl border border-gray-100 bg-white p-6 transition-all hover:-translate-y-0.5 hover:border-[#1A56DB]/30 hover:shadow-md"
              >
                <span
                  className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl"
                  style={{ background: "#1A56DB14", color: BLUE }}
                >
                  <f.Icon size={22} strokeWidth={1.75} />
                </span>
                <h3 className="font-bold text-[15px] leading-snug mb-2" style={{ color: BLUE }}>
                  {t(f.title, locale)}
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed">{t(f.body, locale)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. User Guides & Technical Resources */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHead
            eyebrow={{ en: "Documentation", zh: "技术文档" }}
            title={{ en: "OmniCure S2000 Elite User Guides & Technical Resources", zh: "OmniCure S2000 Elite 使用手册与技术资料" }}
            sub={{
              en: "Find the documents and operating guidance you need for installation, setup, calibration, maintenance, and troubleshooting.",
              zh: "查找安装、设置、校准、维护与故障排查所需的文档与操作指导。",
            }}
            locale={locale}
          />
          <div className="grid gap-6 md:grid-cols-3">
            {resourceCards.map((c) => (
              <div key={c.title.en} className="flex flex-col rounded-2xl border border-gray-200 bg-gradient-to-b from-white to-[#f7faff] p-7 shadow-sm">
                <span className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl" style={{ background: "#1A56DB14", color: BLUE }}>
                  <FileText size={24} strokeWidth={1.75} />
                </span>
                <h3 className="font-bold text-lg leading-snug mb-3" style={{ color: BLUE }}>
                  {t(c.title, locale)}
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed mb-6">{t(c.desc, locale)}</p>
                <a
                  href={c.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-auto inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-bold text-white transition hover:-translate-y-0.5"
                  style={{ background: BLUE }}
                >
                  <Download className="h-4 w-4" />
                  {t(c.btn, locale)}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Setup Guide */}
      <section className="py-16 md:py-20" style={{ background: "#f0f4f8" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHead
            eyebrow={{ en: "Setup", zh: "设置" }}
            title={{ en: "OmniCure S2000 Elite Setup Guide", zh: "OmniCure S2000 Elite 设置指南" }}
            locale={locale}
          />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {setupCards.map((c, i) => (
              <div key={c.title.en} className="rounded-2xl border border-gray-100 bg-white p-6">
                <span className="inline-flex text-xs font-bold px-2.5 py-1 rounded mb-3 text-white" style={{ background: GREEN }}>
                  {t({ en: "Step", zh: "步骤" }, locale)} {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="font-bold text-[15px] leading-snug mb-2" style={{ color: BLUE }}>
                  {t(c.title, locale)}
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed">{t(c.body, locale)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Troubleshooting */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHead
            eyebrow={{ en: "Troubleshooting", zh: "故障排查" }}
            title={{ en: "OmniCure S2000 Elite Troubleshooting", zh: "OmniCure S2000 Elite 故障排查" }}
            locale={locale}
          />
          <div className="space-y-3">
            {troubleshooting.map((item, i) => (
              <details
                key={item.title.en}
                className="group rounded-xl border border-gray-200 bg-white px-5 py-4 [&_summary::-webkit-details-marker]:hidden"
                open={i === 0}
              >
                <summary className="flex cursor-pointer items-center justify-between gap-3 font-semibold text-[15px]" style={{ color: BLUE }}>
                  {t(item.title, locale)}
                  <span className="shrink-0 text-gray-400 transition-transform group-open:rotate-45" style={{ color: GREEN }}>
                    +
                  </span>
                </summary>
                <p className="mt-3 text-sm text-gray-500 leading-relaxed">{t(item.body, locale)}</p>
              </details>
            ))}
          </div>
          <p className="mt-6 text-sm text-gray-500">
            {t({ en: "Still stuck?", zh: "仍未解决?" }, locale)}{" "}
            <a href={supportMail} className="font-semibold hover:underline" style={{ color: BLUE }}>
              {t({ en: "Contact ETIA technical support →", zh: "联系 ETIA 技术支持 →" }, locale)}
            </a>
          </p>
        </div>
      </section>

      {/* 8. Lamp Replacement & Maintenance Support */}
      <section className="py-16 md:py-20" style={{ background: "#f0f4f8" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHead
            eyebrow={{ en: "Service & Support", zh: "服务与支持" }}
            title={{ en: "OmniCure S2000 Elite Lamp Replacement & Maintenance Support", zh: "OmniCure S2000 Elite 灯泡更换与维护支持" }}
            sub={{
              en: "ETIA can support OmniCure S2000 Elite users with replacement lamps, optical filters, light guides, calibration guidance, maintenance, repair support, and troubleshooting.",
              zh: "ETIA 可为 OmniCure S2000 Elite 用户提供替换灯管、光学滤光片、导光管、校准指导、维护、维修支持与故障排查。",
            }}
            locale={locale}
          />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {supportCards.map((c) => (
              <div key={c.title.en} className="flex gap-4 rounded-2xl border border-gray-100 bg-white p-6">
                <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl" style={{ background: "#41A62A18", color: GREEN }}>
                  <c.Icon size={22} strokeWidth={1.75} />
                </span>
                <div>
                  <h3 className="font-bold text-[15px] leading-snug mb-1.5" style={{ color: BLUE }}>
                    {t(c.title, locale)}
                  </h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{t(c.body, locale)}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href={LAMP_PATH}
              className="inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3 text-sm font-bold text-white transition hover:-translate-y-0.5"
              style={{ background: BLUE }}
            >
              {t({ en: "OmniCure S2000 Replacement Lamps", zh: "OmniCure S2000 替换灯管" }, locale)}
              <ArrowRight className="h-4 w-4" />
            </Link>
            <a
              href={supportMail}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#D4DFEC] bg-white px-6 py-3 text-sm font-bold transition hover:-translate-y-0.5 hover:border-[#1A56DB]"
              style={{ color: BLUE }}
            >
              {t({ en: "Get Maintenance Support", zh: "获取维护支持" }, locale)}
            </a>
          </div>
        </div>
      </section>

      {/* 9. Why Buy from ETIA */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHead
            eyebrow={{ en: "Why ETIA", zh: "为何选择 ETIA" }}
            title={{ en: "Why Buy OmniCure S2000 Elite from ETIA", zh: "为何从 ETIA 购买 OmniCure S2000 Elite" }}
            sub={{
              en: "ETIA supports manufacturers across China, Thailand, Vietnam, and Southeast Asia with genuine OmniCure products, application consultation, local supply, installation training, lamp replacement guidance, maintenance, repair support, and troubleshooting.",
              zh: "ETIA 为中国、泰国、越南及东南亚的制造商提供正品 OmniCure 产品、应用咨询、本地供货、安装培训、灯管更换指导、维护、维修支持与故障排查。",
            }}
            locale={locale}
          />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {whyEtia.map((c) => (
              <div key={c.title.en} className="rounded-2xl border border-gray-100 bg-[#f7faff] p-6 text-center">
                <span className="mx-auto mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full" style={{ background: "#1A56DB14", color: BLUE }}>
                  <c.Icon size={24} strokeWidth={1.75} />
                </span>
                <h3 className="font-bold text-[15px]" style={{ color: BLUE }}>
                  {t(c.title, locale)}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 10. FAQ */}
      <section className="py-16 md:py-20" style={{ background: "#f0f4f8" }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHead
            eyebrow={{ en: "FAQ", zh: "常见问题" }}
            title={{ en: "OmniCure S2000 Elite FAQ", zh: "OmniCure S2000 Elite 常见问题" }}
            locale={locale}
          />
          <div className="space-y-3">
            {faqs.map((f) => (
              <details
                key={f.q.en}
                className="group rounded-xl border border-gray-200 bg-white px-5 py-4 [&_summary::-webkit-details-marker]:hidden"
              >
                <summary className="flex cursor-pointer items-center justify-between gap-3 font-semibold text-[15px] text-[#102A43]">
                  {t(f.q, locale)}
                  <span className="shrink-0 transition-transform group-open:rotate-45" style={{ color: GREEN }}>
                    +
                  </span>
                </summary>
                <p className="mt-3 text-sm text-gray-500 leading-relaxed">{t(f.a, locale)}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* 11. Final CTA */}
      <section className="bg-gradient-to-r from-[#143C96] to-[#1A56DB] px-4 py-16 text-white sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <Zap className="mx-auto h-9 w-9 text-[#8BE172]" />
          <h2 className="mt-5 text-2xl md:text-4xl font-bold">
            {t(
              {
                en: "Need Help with OmniCure S2000 Elite Selection, Setup, or Troubleshooting?",
                zh: "在 OmniCure S2000 Elite 选型、设置或故障排查方面需要帮助?",
              },
              locale
            )}
          </h2>
          <p className="mx-auto mt-5 max-w-3xl leading-7 text-blue-100">
            {t(
              {
                en: "ETIA engineers can help with OmniCure S2000 Elite product selection, lamp and filter configuration, light guide setup, calibration guidance, maintenance, repair support, and technical troubleshooting.",
                zh: "ETIA 工程师可协助进行 OmniCure S2000 Elite 产品选型、灯管与滤光片配置、导光管设置、校准指导、维护、维修支持与技术故障排查。",
              },
              locale
            )}
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row sm:flex-wrap">
            <a href={engineerMail} className="rounded-xl bg-[#41A62A] px-7 py-3.5 text-sm font-bold text-white transition hover:-translate-y-0.5">
              {t({ en: "Talk to an Engineer", zh: "咨询工程师" }, locale)}
            </a>
            <a href={quoteMail} className="rounded-xl border border-white/35 bg-white/10 px-7 py-3.5 text-sm font-bold text-white transition hover:-translate-y-0.5">
              {t({ en: "Request a Quote", zh: "请求报价" }, locale)}
            </a>
            <a
              href={PDF.userGuide}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/35 bg-white/10 px-7 py-3.5 text-sm font-bold text-white transition hover:-translate-y-0.5"
            >
              <Download className="h-4 w-4" />
              {t({ en: "Download OmniCure S2000 Elite User Guide", zh: "下载 OmniCure S2000 Elite 用户指南" }, locale)}
            </a>
          </div>
          <p className="mt-6 text-xs text-blue-200">
            <Link href={SUPPORT_PATH} className="underline hover:text-white">
              {t({ en: "Service & Support", zh: "销售与支持" }, locale)}
            </Link>
            <span className="mx-2">·</span>
            <Link href="/contact" className="underline hover:text-white">
              {t({ en: "Contact ETIA", zh: "联系 ETIA" }, locale)}
            </Link>
            <span className="mx-2">·</span>
            <Link href={BRAND_PATH} className="underline hover:text-white">
              OmniCure
            </Link>
          </p>
        </div>
      </section>
    </>
  );
}
