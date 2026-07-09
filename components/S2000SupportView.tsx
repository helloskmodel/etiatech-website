"use client";
import Link from "next/link";
import Image from "next/image";
import { BadgeCheck, ArrowRight } from "lucide-react";
import { inquiryMailto } from "@/components/contact";
import TrustStrip from "@/components/TrustStrip";
import FinalCta from "@/components/FinalCta";
import { useLocale, t } from "@/components/LocaleContext";
import {
  quickStart,
  filterChange,
  ringColors,
  troubleshooting,
  safety,
  lampTypes,
  lampHandling,
  opticalFilters,
  regulatory,
  faq,
  PRODUCT_PATH,
  LAMP_PATH,
  QUICK_START_PDF_FILENAME,
  type Procedure,
} from "@/components/s2000Support";

const HERO_IMG =
  "https://etiatech-1303055923.cos.ap-singapore.myqcloud.com/IMAGE/PROMOTION/PROMOTION-OMNICURE%20S2000%20ELITE%20-INTRODUCTION.webp";
const LAMP_IMG =
  "https://etiatech-1303055923.cos.ap-singapore.myqcloud.com/IMAGE/PROMOTION/PROMOTION-%20OMNICURE%20S2000%20ELITE%20-LAMP.webp";

// Section anchors for the on-page table of contents.
const toc: { id: string; label: { en: string; zh: string } }[] = [
  { id: "quick-start", label: { en: "Installation & Quick Start", zh: "安装与快速入门" } },
  { id: "changing-the-optical-filter", label: { en: "Changing the Optical Filter", zh: "更换光学滤光片" } },
  { id: "status-light-ring", label: { en: "Status Light Ring", zh: "状态光环" } },
  { id: "troubleshooting", label: { en: "Troubleshooting", zh: "故障排查" } },
  { id: "safety-precautions", label: { en: "Safety Precautions", zh: "安全注意事项" } },
  { id: "lamps-and-filters", label: { en: "Lamps & Filters", zh: "灯管与滤光片" } },
  { id: "regulatory", label: { en: "Regulatory & Compliance", zh: "合规信息" } },
  { id: "faq", label: { en: "FAQ", zh: "常见问题" } },
];

function ProcedureBlock({ p, hideTitle = false }: { p: Procedure; hideTitle?: boolean }) {
  const { locale } = useLocale();
  return (
    <div id={p.id} className="scroll-mt-24">
      {!hideTitle && <h3 className="text-xl md:text-2xl font-bold mb-2" style={{ color: "#1A56DB" }}>{t(p.title, locale)}</h3>}
      {p.intro && <p className="text-gray-500 text-sm leading-relaxed mb-4 max-w-3xl">{t(p.intro, locale)}</p>}
      <ol className="space-y-2.5">
        {p.steps.map((s, i) => (
          <li key={i} className="flex gap-3 text-sm text-gray-600 leading-relaxed">
            <span className="flex items-center justify-center shrink-0 w-6 h-6 rounded-full text-xs font-bold text-white" style={{ background: "#1A56DB" }}>{i + 1}</span>
            <span className="pt-0.5">{t(s, locale)}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}

export default function S2000SupportView() {
  const { locale } = useLocale();
  const manualNote = t(
    {
      en: "Quick reference only. Always confirm procedures, indicator colours and error codes against your OmniCure S2000 Elite User Manual — ETIA can help you interpret any indicator or code.",
      zh: "此处仅为快速参考。请始终以您的 OmniCure S2000 Elite 用户手册为准来确认操作步骤、指示灯颜色与错误代码——ETIA 可协助您解读任何指示或代码。",
    },
    locale
  );

  return (
    <>
      {/* Breadcrumb */}
      <div className="border-b border-gray-200 py-3 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-xs text-gray-400">
          <Link href="/product" className="hover:text-[#1A56DB]">{t({ en: "Products", zh: "产品" }, locale)}</Link>
          <span className="mx-2">›</span>
          <Link href="/product/omnicure" className="hover:text-[#1A56DB]">OmniCure</Link>
          <span className="mx-2">›</span>
          <Link href={PRODUCT_PATH} className="hover:text-[#1A56DB]">S2000 Elite</Link>
          <span className="mx-2">›</span>
          <span style={{ color: "#1A56DB" }}>{t({ en: "Support", zh: "技术支持" }, locale)}</span>
        </div>
      </div>

      {/* Hero — site standard (matches Sales & Support) */}
      <section className="relative overflow-hidden border-b border-[#D9E4EA] bg-gradient-to-br from-white via-[#EEF6FF] to-[#F1FAEF]">
        <div className="absolute -right-36 -top-36 h-[34rem] w-[34rem] rounded-full bg-[#1F63D6]/10 blur-3xl" />
        <div className="absolute -bottom-40 left-1/3 h-96 w-96 rounded-full bg-[#63C94A]/10 blur-3xl" />
        <div className="relative mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 md:py-24 lg:grid-cols-[1.05fr_.95fr] lg:items-center lg:px-8">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-[#41A62A]/20 bg-white px-3 py-1.5 text-xs font-bold text-[#41A62A] shadow-sm"><BadgeCheck className="h-4 w-4" /> {t({ en: "Technical Support · Knowledge Base", zh: "技术支持 · 知识库" }, locale)}</div>
            <h1 className="mt-6 max-w-4xl text-4xl font-bold leading-[1.08] tracking-tight text-[#143C96] md:text-6xl">
              {t({ en: "OmniCure S2000 Elite", zh: "OmniCure S2000 Elite" }, locale)}<span className="mt-2 block text-2xl font-bold text-[#41A62A] md:text-4xl">{t({ en: "Installation & Support", zh: "安装与技术支持" }, locale)}</span>
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-[#667085] md:text-lg">
              {t({ en: "Step-by-step start-up, light-guide and lamp-module installation, optical filter changes, status light-ring colour meanings, troubleshooting, safety precautions and regulatory information for the OmniCure S2000 Elite UV spot curing system.", zh: "OmniCure S2000 Elite 紫外点固化系统的分步开机、导光管与灯管模块安装、光学滤光片更换、状态光环颜色含义、故障排查、安全注意事项与合规信息。" }, locale)}
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a href={inquiryMailto(locale, { subject: `Request: ${QUICK_START_PDF_FILENAME}`, context: "OmniCure S2000 Elite Quick Start Guide" })} className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#41A62A] px-6 py-3.5 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-[#358B22]">{t({ en: "Request Quick Start Guide (PDF)", zh: "索取快速入门指南 (PDF)" }, locale)} <ArrowRight className="h-4 w-4" /></a>
              <a href={inquiryMailto(locale, { subject: "S2000 Elite Technical Support", context: "OmniCure S2000 Elite" })} className="inline-flex items-center justify-center rounded-xl border border-[#D4DFEC] bg-white px-6 py-3.5 text-sm font-bold text-[#143C96] transition hover:-translate-y-0.5 hover:border-[#143C96] hover:text-[#1F63D6]">{t({ en: "Talk to an Engineer", zh: "咨询工程师" }, locale)}</a>
            </div>
          </div>
          <div className="relative min-h-[410px] rounded-[32px] border border-white/80 bg-white/75 p-5 shadow-[0_25px_80px_rgba(20,60,150,.12)] backdrop-blur sm:p-8">
            <Image src={HERO_IMG} alt="OmniCure S2000 Elite UV spot curing system installation and support guide" fill sizes="(max-width: 1024px) 100vw, 40vw" className="object-contain p-8" priority />
          </div>
        </div>
      </section>

      <TrustStrip />

      {/* On-page table of contents */}
      <section className="py-6 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex flex-wrap gap-2" aria-label={t({ en: "On this page", zh: "本页目录" }, locale)}>
            {toc.map((s) => (
              <a key={s.id} href={`#${s.id}`} className="text-xs font-semibold px-3 py-1.5 rounded-full border transition-colors" style={{ borderColor: "#1A56DB33", color: "#1A56DB", background: "#1A56DB0d" }}>{t(s.label, locale)}</a>
            ))}
          </nav>
        </div>
      </section>

      {/* Installation & Quick Start */}
      <section id="quick-start" className="py-16 bg-white scroll-mt-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-semibold tracking-widest uppercase mb-2" style={{ color: "#44B549" }}>{t({ en: "Installation & Quick Start", zh: "安装与快速入门" }, locale)}</p>
          <h2 className="text-3xl md:text-4xl font-bold mb-2" style={{ color: "#1A56DB" }}>{t({ en: "OmniCure S2000 Elite Quick Start Guide", zh: "OmniCure S2000 Elite 快速入门指南" }, locale)}</h2>
          <div className="w-12 h-1 rounded mb-6" style={{ background: "#44B549" }} />
          <p className="text-gray-500 mb-4 max-w-3xl">{t({ en: "Follow these numbered steps to start up the system, install the light guide, and install or replace the lamp module.", zh: "按以下编号步骤开机、安装导光管，以及安装或更换灯管模块。" }, locale)}</p>
          <p className="text-xs text-gray-400 mb-10 max-w-3xl">{manualNote}</p>
          <div className="flex flex-col gap-12">
            {quickStart.map((p) => (
              <div key={p.id}>
                <ProcedureBlock p={p} />
                {p.id === "installing-the-lamp-module" && (
                  <div className="mt-6 rounded-2xl border p-6" style={{ borderColor: "#f5d9a8", background: "#fffbeb" }}>
                    <p className="text-sm font-bold mb-3" style={{ color: "#d97706" }}>{t({ en: "Important handling notes", zh: "重要操作注意事项" }, locale)}</p>
                    <ul className="space-y-2">
                      {lampHandling.map((h, i) => (
                        <li key={i} className="flex gap-3 text-sm text-gray-700 leading-relaxed">
                          <span className="shrink-0 font-bold" style={{ color: "#d97706" }}>⚠</span>
                          <span>{t(h, locale)}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Changing the Optical Filter */}
      <section className="py-16 scroll-mt-20" style={{ background: "#f0f4f8" }}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-semibold tracking-widest uppercase mb-2" style={{ color: "#44B549" }}>{t({ en: "Configuration", zh: "配置" }, locale)}</p>
          <h2 className="text-3xl md:text-4xl font-bold mb-2" style={{ color: "#1A56DB" }}>{t(filterChange.title, locale)}</h2>
          <div className="w-12 h-1 rounded mb-8" style={{ background: "#44B549" }} />
          <div className="rounded-2xl border border-gray-100 bg-white p-6 md:p-8">
            <ProcedureBlock p={filterChange} hideTitle />
          </div>
        </div>
      </section>

      {/* Status Light Ring */}
      <section id="status-light-ring" className="py-16 bg-white scroll-mt-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-semibold tracking-widest uppercase mb-2" style={{ color: "#44B549" }}>{t({ en: "Interaction Guide", zh: "交互指引" }, locale)}</p>
          <h2 className="text-3xl md:text-4xl font-bold mb-2" style={{ color: "#1A56DB" }}>{t({ en: "Status Light Ring Colours & What They Mean", zh: "状态光环颜色及其含义" }, locale)}</h2>
          <div className="w-12 h-1 rounded mb-4" style={{ background: "#44B549" }} />
          <p className="text-gray-500 mb-6 max-w-3xl">{t({ en: "The S2000 Elite signals its state through a front-panel status light ring (backed by an on-screen indicator and an audible alarm). Use this table to read the colour at a glance.", zh: "S2000 Elite 通过前面板状态光环（并配合屏幕指示与声音报警）指示其状态。使用下表可一眼读懂颜色含义。" }, locale)}</p>
          <div className="overflow-x-auto rounded-2xl border border-gray-200">
            <table className="w-full text-sm min-w-[640px]">
              <thead>
                <tr className="text-white" style={{ background: "#1A56DB" }}>
                  <th className="text-left font-semibold px-5 py-3">{t({ en: "Colour", zh: "颜色" }, locale)}</th>
                  <th className="text-left font-semibold px-5 py-3">{t({ en: "Status", zh: "状态" }, locale)}</th>
                  <th className="text-left font-semibold px-5 py-3">{t({ en: "What it means", zh: "含义" }, locale)}</th>
                </tr>
              </thead>
              <tbody>
                {ringColors.map((r, i) => (
                  <tr key={r.swatch} className={i % 2 === 1 ? "bg-gray-50" : "bg-white"}>
                    <td className="px-5 py-3 align-top">
                      <span className="inline-flex items-center gap-2 font-semibold text-gray-700">
                        <span className="inline-block w-3.5 h-3.5 rounded-full ring-1 ring-black/10" style={{ background: r.swatch }} />
                        {t(r.color, locale)}
                      </span>
                    </td>
                    <td className="px-5 py-3 align-top font-semibold" style={{ color: "#1A56DB" }}>{t(r.state, locale)}</td>
                    <td className="px-5 py-3 align-top text-gray-500 leading-relaxed">{t(r.meaning, locale)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-gray-400 mt-3">{manualNote}</p>
        </div>
      </section>

      {/* Troubleshooting */}
      <section id="troubleshooting" className="py-16 scroll-mt-20" style={{ background: "#f0f4f8" }}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-semibold tracking-widest uppercase mb-2" style={{ color: "#44B549" }}>{t({ en: "Troubleshooting", zh: "故障排查" }, locale)}</p>
          <h2 className="text-3xl md:text-4xl font-bold mb-2" style={{ color: "#1A56DB" }}>{t({ en: "OmniCure S2000 Troubleshooting", zh: "OmniCure S2000 故障排查" }, locale)}</h2>
          <div className="w-12 h-1 rounded mb-8" style={{ background: "#44B549" }} />
          <div className="overflow-x-auto rounded-2xl border border-gray-200">
            <table className="w-full text-sm min-w-[640px]">
              <thead>
                <tr className="text-white" style={{ background: "#1A56DB" }}>
                  <th className="text-left font-semibold px-5 py-3 w-1/3">{t({ en: "Symptom", zh: "现象" }, locale)}</th>
                  <th className="text-left font-semibold px-5 py-3">{t({ en: "Checks & actions", zh: "检查与处理" }, locale)}</th>
                </tr>
              </thead>
              <tbody>
                {troubleshooting.map((r, i) => (
                  <tr key={i} className={i % 2 === 1 ? "bg-gray-50" : "bg-white"}>
                    <td className="px-5 py-3 align-top font-semibold text-gray-700">{t(r.symptom, locale)}</td>
                    <td className="px-5 py-3 align-top text-gray-500 leading-relaxed">{t(r.checks, locale)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Safety Precautions */}
      <section id="safety-precautions" className="py-16 bg-white scroll-mt-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-semibold tracking-widest uppercase mb-2" style={{ color: "#d97706" }}>{t({ en: "Safety", zh: "安全" }, locale)}</p>
          <h2 className="text-3xl md:text-4xl font-bold mb-2" style={{ color: "#1A56DB" }}>{t({ en: "Safety Precautions", zh: "安全注意事项" }, locale)}</h2>
          <div className="w-12 h-1 rounded mb-8" style={{ background: "#d97706" }} />
          <div className="rounded-2xl border p-6 md:p-8" style={{ borderColor: "#f5d9a8", background: "#fffbeb" }}>
            <ul className="space-y-3">
              {safety.map((s, i) => (
                <li key={i} className="flex gap-3 text-sm text-gray-700 leading-relaxed">
                  <span className="shrink-0 font-bold" style={{ color: "#d97706" }}>⚠</span>
                  <span>{t(s, locale)}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Lamps & Filters */}
      <section id="lamps-and-filters" className="py-16 scroll-mt-20" style={{ background: "#f0f4f8" }}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-semibold tracking-widest uppercase mb-2" style={{ color: "#44B549" }}>{t({ en: "Lamps & Filters", zh: "灯管与滤光片" }, locale)}</p>
          <h2 className="text-3xl md:text-4xl font-bold mb-2" style={{ color: "#1A56DB" }}>{t({ en: "Supported Lamp Types & Optical Filters", zh: "支持的灯管类型与光学滤光片" }, locale)}</h2>
          <div className="w-12 h-1 rounded mb-8" style={{ background: "#44B549" }} />
          <div className="grid gap-6 lg:grid-cols-2 items-start">
            <div className="grid gap-5">
              {lampTypes.map((l) => (
                <div key={l.module} className="rounded-2xl border border-gray-100 bg-white p-6">
                  <div className="flex items-center justify-between gap-3 mb-2">
                    <h3 className="text-lg font-bold text-gray-900">{t(l.name, locale)}</h3>
                    <span className="text-xs font-mono font-semibold px-2 py-1 rounded whitespace-nowrap" style={{ background: "#1A56DB10", color: "#1A56DB" }}>{l.module}</span>
                  </div>
                  <p className="text-sm text-gray-500 leading-relaxed mb-2">{t(l.desc, locale)}</p>
                  <p className="text-xs text-gray-400">{t({ en: "Spare 200 W lamp:", zh: "备用 200 W 灯管：" }, locale)} <span className="font-mono">{l.spare}</span></p>
                </div>
              ))}
              <div className="rounded-2xl border border-gray-100 bg-white p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-3">{t({ en: "Selectable Optical Band-Pass Filters", zh: "可选光学带通滤光片" }, locale)}</h3>
                <ul className="space-y-1.5">
                  {opticalFilters.map((f) => (
                    <li key={f.pn} className="flex items-center gap-3 text-sm text-gray-600">
                      <span className="font-mono font-semibold" style={{ color: "#1A56DB" }}>{f.pn}</span>
                      <span className="text-gray-400">—</span>
                      <span>{t(f.range, locale)}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="rounded-2xl border border-gray-100 bg-white relative" style={{ height: "360px" }}>
              <Image src={LAMP_IMG} alt="OmniCure S2000 Elite lamp module installation — Standard 012-68000R and Surface Cure 012-69000R" fill sizes="(max-width: 1024px) 100vw, 40vw" className="object-contain p-6" />
            </div>
          </div>
          <div className="mt-6 rounded-xl border border-gray-100 bg-white p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <p className="text-sm text-gray-600">{t({ en: "Need a genuine replacement lamp? Order by part number or ask for a compatibility check.", zh: "需要正品替换灯管？可按料号订购或申请兼容性核对。" }, locale)}</p>
            <Link href={LAMP_PATH} className="shrink-0 inline-flex items-center justify-center rounded-lg px-5 py-2.5 text-sm font-bold text-white hover:opacity-90" style={{ background: "#1A56DB" }}>{t({ en: "Order S2000 Lamp →", zh: "订购 S2000 灯管 →" }, locale)}</Link>
          </div>
        </div>
      </section>

      {/* Regulatory & Compliance */}
      <section id="regulatory" className="py-16 bg-white scroll-mt-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-semibold tracking-widest uppercase mb-2" style={{ color: "#44B549" }}>{t({ en: "Authority & Trust", zh: "权威与信任" }, locale)}</p>
          <h2 className="text-3xl md:text-4xl font-bold mb-2" style={{ color: "#1A56DB" }}>{t({ en: "Regulatory & Compliance Information", zh: "合规与认证信息" }, locale)}</h2>
          <div className="w-12 h-1 rounded mb-8" style={{ background: "#44B549" }} />
          <ul className="grid sm:grid-cols-2 gap-3">
            {regulatory.map((r, i) => (
              <li key={i} className="flex gap-3 rounded-xl border border-gray-100 bg-gray-50 p-4 text-sm text-gray-600 leading-relaxed">
                <span className="shrink-0 font-bold" style={{ color: "#44B549" }}>✓</span>
                <span>{t(r, locale)}</span>
              </li>
            ))}
          </ul>
          <p className="text-xs text-gray-400 mt-4 max-w-3xl">{t({ en: "Exact certificate, FCC ID and model/serial numbers are printed on the product rating label and listed in the OmniCure S2000 Elite User Manual.", zh: "具体的证书、FCC ID 及型号／序列号印在产品铭牌上，并列于 OmniCure S2000 Elite 用户手册中。" }, locale)}</p>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-16 scroll-mt-20" style={{ background: "#f0f4f8" }}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-semibold tracking-widest uppercase mb-2" style={{ color: "#44B549" }}>{t({ en: "FAQ", zh: "常见问题" }, locale)}</p>
          <h2 className="text-3xl md:text-4xl font-bold mb-8" style={{ color: "#1A56DB" }}>{t({ en: "Frequently Asked Questions", zh: "常见问题解答" }, locale)}</h2>
          <div className="divide-y divide-gray-200 rounded-2xl border border-gray-200 bg-white px-6">
            {faq.map((f) => (
              <details key={f.q.en} className="py-4 group">
                <summary className="cursor-pointer font-semibold text-gray-900 list-none flex justify-between items-center gap-4">
                  {t(f.q, locale)}
                  <span className="text-gray-400 group-open:rotate-45 transition-transform shrink-0">＋</span>
                </summary>
                <p className="text-sm text-gray-600 leading-relaxed mt-2">{t(f.a, locale)}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <FinalCta
        heading={t({ en: "Need installation, calibration or troubleshooting help?", zh: "需要安装、校准或故障排查支持？" }, locale)}
        body={t({ en: "As an authorized OmniCure distributor, ETIA provides documentation, on-site installation, R2000 calibration, and local service across Southeast Asia.", zh: "作为 OmniCure 授权分销商，ETIA 在东南亚提供文档、现场安装、R2000 校准与本地服务。" }, locale)}
        primary={{ label: t({ en: "Talk to an Engineer", zh: "咨询工程师" }, locale), href: inquiryMailto(locale, { subject: "S2000 Elite Technical Support", context: "OmniCure S2000 Elite" }) }}
        secondary={{ label: t({ en: "Back to S2000 Elite", zh: "返回 S2000 Elite" }, locale), href: PRODUCT_PATH }}
      />
    </>
  );
}
