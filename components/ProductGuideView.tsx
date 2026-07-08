"use client";
import Link from "next/link";
import Image from "next/image";
import { inquiryMailto, SERVICE_EMAIL } from "@/components/contact";
import { useLocale, t, type LangText } from "@/components/LocaleContext";
import { getProductGuide, whyEtiaNote, type GuideCard } from "@/components/productGuideData";
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
  Layers,
  Layers3,
} from "lucide-react";

const BLUE = "#1A56DB";
const GREEN = "#44B549";

const ICONS: Record<string, typeof Cable> = {
  cable: Cable,
  radio: Radio,
  scan: ScanLine,
  settings: Settings2,
  crosshair: Crosshair,
  lightbulb: Lightbulb,
  sun: Sun,
  aperture: Aperture,
  cpu: Cpu,
  wrench: Wrench,
  lifebuoy: LifeBuoy,
  zap: Zap,
  layers: Layers,
  layers3: Layers3,
  file: FileText,
};
function iconFor(name?: string) {
  return (name && ICONS[name]) || Cable;
}

const whyEtia: { Icon: typeof BadgeCheck; title: LangText }[] = [
  { Icon: BadgeCheck, title: { en: "Genuine OmniCure Products", zh: "正品 OmniCure 产品" } },
  { Icon: Crosshair, title: { en: "Application-Driven Selection", zh: "应用导向选型" } },
  { Icon: Zap, title: { en: "Local Supply & Fast Response", zh: "本地供货 · 快速响应" } },
  { Icon: LifeBuoy, title: { en: "Long-Term Service Support", zh: "长期服务支持" } },
];

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

export default function ProductGuideView({ slug }: { slug: string }) {
  const { locale } = useLocale();
  const g = getProductGuide(slug);
  if (!g) return null;

  const P = g.productName;
  const pdfList: { key: string; title: LangText; desc: LangText; btn: LangText; href?: string }[] = [
    {
      key: "brochure",
      title: { en: `${P} Brochure`, zh: `${P} 产品手册` },
      desc: { en: "Product overview, key features, system compatibility, control functions, and performance benefits.", zh: "产品概述、核心功能、系统兼容性、控制功能与性能优势。" },
      btn: { en: "Download Brochure", zh: "下载产品手册" },
      href: g.pdfs.brochure,
    },
    {
      key: "quickStart",
      title: { en: `${P} Quick Start Guide`, zh: `${P} 快速入门指南` },
      desc: { en: "Startup steps, installation, exposure setup, intensity setting, and first-run configuration.", zh: "启动步骤、安装、曝光设置、强度设置与首次运行配置。" },
      btn: { en: "Download Quick Start Guide", zh: "下载快速入门指南" },
      href: g.pdfs.quickStart,
    },
    {
      key: "userGuide",
      title: { en: `${P} User Guide`, zh: `${P} 用户指南` },
      desc: { en: "Full operating manual covering safety, setup, calibration, control, maintenance, troubleshooting, and specifications.", zh: "完整操作手册,涵盖安全、设置、校准、控制、维护、故障排除与规格。" },
      btn: { en: "Download User Guide", zh: "下载用户指南" },
      href: g.pdfs.userGuide,
    },
  ].filter((c) => c.href);

  const quoteMail = inquiryMailto(locale, { subject: `${P} — Request a Quote`, context: g.h1.en });
  const supportMail = inquiryMailto(locale, { subject: `${P} — Technical Support`, context: g.h1.en, email: SERVICE_EMAIL });
  const engineerMail = inquiryMailto(locale, { subject: `${P} — Talk to an Engineer`, context: g.h1.en });

  const renderCardTitleBody = (c: GuideCard) => (
    <>
      <h3 className="font-bold text-[15px] leading-snug mb-2" style={{ color: BLUE }}>
        {t(c.title, locale)}
      </h3>
      <p className="text-sm text-gray-500 leading-relaxed">{t(c.body, locale)}</p>
    </>
  );

  return (
    <>
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="border-b border-gray-200 py-3 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-xs text-gray-400">
          <Link href="/product" className="hover:text-[#1A56DB]">{t({ en: "Products", zh: "产品" }, locale)}</Link>
          <span className="mx-2">›</span>
          <Link href="/product/omnicure" className="hover:text-[#1A56DB]">OmniCure</Link>
          <span className="mx-2">›</span>
          <span style={{ color: BLUE }}>{g.breadcrumbName}</span>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-gray-200 bg-gradient-to-br from-white via-[#EEF6FF] to-[#F1FAEF]">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 md:py-20 grid gap-12 lg:grid-cols-[1.05fr_.95fr] lg:items-center">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-[#1A56DB]/20 bg-white px-3 py-1.5 text-xs font-bold" style={{ color: BLUE }}>
                <BadgeCheck className="h-4 w-4" />
                {t(g.eyebrow, locale)}
              </span>
            </div>
            <h1 className="max-w-3xl text-4xl md:text-5xl font-bold leading-[1.1] tracking-tight" style={{ color: BLUE }}>
              {t(g.h1, locale)}
            </h1>
            <p className="mt-4 text-xl md:text-2xl font-semibold text-[#102A43]">{t(g.headline, locale)}</p>
            <p className="mt-4 max-w-2xl text-base md:text-lg leading-7 text-gray-600">{t(g.subheadline, locale)}</p>

            <div className="mt-7 grid grid-cols-2 sm:grid-cols-4 gap-3">
              {g.stats.map((s) => (
                <div key={s.label.en} className="rounded-lg p-3 border border-gray-200 bg-white/80 backdrop-blur">
                  <p className="text-base font-bold leading-tight" style={{ color: BLUE }}>{s.val}</p>
                  <p className="text-xs text-gray-500 leading-tight mt-1">{t(s.label, locale)}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <a href={quoteMail} className="inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-sm font-bold text-white transition hover:-translate-y-0.5" style={{ background: BLUE }}>
                {t({ en: "Request a Quote", zh: "请求报价" }, locale)}
                <ArrowRight className="h-4 w-4" />
              </a>
              {g.pdfs.brochure && (
                <a href={g.pdfs.brochure} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#D4DFEC] bg-white px-6 py-3.5 text-sm font-bold transition hover:-translate-y-0.5 hover:border-[#1A56DB]" style={{ color: BLUE }}>
                  <Download className="h-4 w-4" />
                  {t({ en: "Download Brochure", zh: "下载产品手册" }, locale)}
                </a>
              )}
              <a href={supportMail} className="inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-sm font-bold text-white transition hover:-translate-y-0.5" style={{ background: GREEN }}>
                <LifeBuoy className="h-4 w-4" />
                {t({ en: "Get Technical Support", zh: "获取技术支持" }, locale)}
              </a>
            </div>
          </div>

          <div className="relative min-h-[360px] lg:min-h-[410px] rounded-[32px] border border-white/80 bg-white/75 p-5 sm:p-8 shadow-[0_25px_80px_rgba(20,60,150,.12)] backdrop-blur">
            <Image src={g.heroImage} alt={g.heroAlt} fill sizes="(max-width: 1024px) 100vw, 45vw" className="object-contain p-6" priority />
          </div>
        </div>
      </section>

      {/* Trust bar — OmniCure brand variant (4 trust points) */}
      <section className="bg-gradient-to-r from-[#143C96] to-[#1F63D6] px-4 py-5 text-white sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-3 text-center md:flex-row md:justify-between md:text-left">
          <p className="text-sm font-semibold">{t({ en: "ETIA is an authorized distributor of OmniCure® products.", zh: "ETIA 是 OmniCure® 产品的授权分销商。" }, locale)}</p>
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

      {/* Overview */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHead eyebrow={{ en: "Overview", zh: "概述" }} title={{ en: `${P} Product Overview`, zh: `${P} 产品概述` }} locale={locale} />
          <p className="text-gray-600 leading-relaxed text-lg">{t(g.overview, locale)}</p>
          {g.relatedLinks.length > 0 && (
            <p className="mt-5 text-sm text-gray-500">
              {t({ en: "Related:", zh: "相关链接:" }, locale)}{" "}
              {g.relatedLinks.map((l, i) => (
                <span key={l.href}>
                  {i > 0 && <span className="mx-1.5 text-gray-300">·</span>}
                  <Link href={l.href} className="font-semibold hover:underline" style={{ color: BLUE }}>{t(l.label, locale)}</Link>
                </span>
              ))}
            </p>
          )}
        </div>
      </section>

      {/* Key Features */}
      <section className="py-16 md:py-20" style={{ background: "#f0f4f8" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHead eyebrow={{ en: "Key Features", zh: "核心功能" }} title={{ en: `${P} Key Features`, zh: `${P} 核心功能` }} locale={locale} />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {g.features.map((f) => {
              const Icon = iconFor(f.icon);
              return (
                <div key={f.title.en} className="flex flex-col rounded-2xl border border-gray-100 bg-white p-6 transition-all hover:-translate-y-0.5 hover:border-[#1A56DB]/30 hover:shadow-md">
                  <span className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl" style={{ background: "#1A56DB14", color: BLUE }}>
                    <Icon size={22} strokeWidth={1.75} />
                  </span>
                  {renderCardTitleBody(f)}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* User Guides & Technical Resources */}
      {pdfList.length > 0 && (
        <section className="py-16 md:py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHead
              eyebrow={{ en: "Documentation", zh: "技术文档" }}
              title={{ en: `${P} User Guides & Technical Resources`, zh: `${P} 用户指南与技术资源` }}
              sub={{ en: "Find the documents and operating guidance you need for installation, setup, calibration, maintenance, and troubleshooting.", zh: "查找安装、设置、校准、维护与故障排除所需的文档与操作指导。" }}
              locale={locale}
            />
            <div className="grid gap-6 md:grid-cols-3">
              {pdfList.map((c) => (
                <div key={c.key} className="flex flex-col rounded-2xl border border-gray-200 bg-gradient-to-b from-white to-[#f7faff] p-7 shadow-sm">
                  <span className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl" style={{ background: "#1A56DB14", color: BLUE }}>
                    <FileText size={24} strokeWidth={1.75} />
                  </span>
                  <h3 className="font-bold text-lg leading-snug mb-3" style={{ color: BLUE }}>{t(c.title, locale)}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed mb-6">{t(c.desc, locale)}</p>
                  <a href={c.href} target="_blank" rel="noopener noreferrer" className="mt-auto inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-bold text-white transition hover:-translate-y-0.5" style={{ background: BLUE }}>
                    <Download className="h-4 w-4" />
                    {t(c.btn, locale)}
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Setup Guide */}
      {g.setup.length > 0 && (
        <section className="py-16 md:py-20" style={{ background: "#f0f4f8" }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHead eyebrow={{ en: "Setup", zh: "设置" }} title={{ en: `${P} Setup Guide`, zh: `${P} 设置指南` }} locale={locale} />
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {g.setup.map((c, i) => (
                <div key={c.title.en} className="rounded-2xl border border-gray-100 bg-white p-6">
                  <span className="inline-flex text-xs font-bold px-2.5 py-1 rounded mb-3 text-white" style={{ background: GREEN }}>
                    {t({ en: "Step", zh: "步骤" }, locale)} {String(i + 1).padStart(2, "0")}
                  </span>
                  {renderCardTitleBody(c)}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Troubleshooting */}
      {g.troubleshooting.length > 0 && (
        <section className="py-16 md:py-20 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHead eyebrow={{ en: "Troubleshooting", zh: "故障排除" }} title={{ en: `${P} Troubleshooting`, zh: `${P} 故障排除` }} locale={locale} />
            <div className="space-y-3">
              {g.troubleshooting.map((item, i) => (
                <details key={item.title.en} className="group rounded-xl border border-gray-200 bg-white px-5 py-4 [&_summary::-webkit-details-marker]:hidden" open={i === 0}>
                  <summary className="flex cursor-pointer items-center justify-between gap-3 font-semibold text-[15px]" style={{ color: BLUE }}>
                    {t(item.title, locale)}
                    <span className="shrink-0 transition-transform group-open:rotate-45" style={{ color: GREEN }}>+</span>
                  </summary>
                  <p className="mt-3 text-sm text-gray-500 leading-relaxed">{t(item.body, locale)}</p>
                </details>
              ))}
            </div>

            {g.errorTable && (
              <details className="mt-6 rounded-xl border border-gray-200 bg-white px-5 py-4 [&_summary::-webkit-details-marker]:hidden">
                <summary className="cursor-pointer font-semibold text-[15px]" style={{ color: BLUE }}>{t(g.errorTable.title, locale)}</summary>
                <div className="mt-4 overflow-x-auto">
                  <table className="w-full text-sm min-w-[560px]">
                    <thead>
                      <tr className="text-white" style={{ background: BLUE }}>
                        {g.errorTable.cols.map((c) => (
                          <th key={c.en} className="text-left font-semibold px-4 py-2.5">{t(c, locale)}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {g.errorTable.rows.map((r, ri) => (
                        <tr key={ri} className={ri % 2 === 1 ? "bg-gray-50" : "bg-white"}>
                          {r.map((cell, ci) => (
                            <td key={ci} className={`px-4 py-2.5 align-top ${ci === 0 ? "font-semibold whitespace-nowrap" : "text-gray-500"}`} style={ci === 0 ? { color: BLUE } : undefined}>{cell}</td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </details>
            )}

            <p className="mt-6 text-sm text-gray-500">
              {t({ en: "Still stuck?", zh: "仍未解决?" }, locale)}{" "}
              <a href={supportMail} className="font-semibold hover:underline" style={{ color: BLUE }}>{t({ en: "Contact ETIA technical support →", zh: "联系 ETIA 技术支持 →" }, locale)}</a>
            </p>
          </div>
        </section>
      )}

      {/* Support */}
      {g.support.length > 0 && (
        <section className="py-16 md:py-20" style={{ background: "#f0f4f8" }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHead
              eyebrow={{ en: "Service & Support", zh: "服务与支持" }}
              title={{ en: `${P} Maintenance & Support`, zh: `${P} 维护与支持` }}
              sub={{ en: `ETIA can support ${P} users with replacement parts, calibration guidance, maintenance, repair support, and troubleshooting.`, zh: `ETIA 可为 ${P} 用户提供备件、校准指导、维护、维修支持与故障排除。` }}
              locale={locale}
            />
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {g.support.map((c) => {
                const Icon = iconFor(c.icon);
                return (
                  <div key={c.title.en} className="flex gap-4 rounded-2xl border border-gray-100 bg-white p-6">
                    <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl" style={{ background: "#44B54918", color: GREEN }}>
                      <Icon size={22} strokeWidth={1.75} />
                    </span>
                    <div>
                      <h3 className="font-bold text-[15px] leading-snug mb-1.5" style={{ color: BLUE }}>{t(c.title, locale)}</h3>
                      <p className="text-sm text-gray-500 leading-relaxed">{t(c.body, locale)}</p>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="mt-8">
              <a href={supportMail} className="inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3 text-sm font-bold text-white transition hover:-translate-y-0.5" style={{ background: BLUE }}>
                {t({ en: "Get Maintenance Support", zh: "获取维护支持" }, locale)}
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </section>
      )}

      {/* Why Buy from ETIA */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHead
            eyebrow={{ en: "Why ETIA", zh: "为何选择 ETIA" }}
            title={{ en: `Why Buy ${P} from ETIA`, zh: `为何从 ETIA 购买 ${P}` }}
            sub={{ en: whyEtiaNote, zh: "ETIA 为中国、泰国、越南及东南亚的制造商提供正品 OmniCure 产品、应用咨询、本地供货、安装培训、维护、维修支持与故障排除。" }}
            locale={locale}
          />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {whyEtia.map((c) => (
              <div key={c.title.en} className="rounded-2xl border border-gray-100 bg-[#f7faff] p-6 text-center">
                <span className="mx-auto mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full" style={{ background: "#1A56DB14", color: BLUE }}>
                  <c.Icon size={24} strokeWidth={1.75} />
                </span>
                <h3 className="font-bold text-[15px]" style={{ color: BLUE }}>{t(c.title, locale)}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      {g.faqs.length > 0 && (
        <section className="py-16 md:py-20" style={{ background: "#f0f4f8" }}>
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHead eyebrow={{ en: "FAQ", zh: "常见问题" }} title={{ en: `${P} FAQ`, zh: `${P} 常见问题` }} locale={locale} />
            <div className="space-y-3">
              {g.faqs.map((f) => (
                <details key={f.q.en} className="group rounded-xl border border-gray-200 bg-white px-5 py-4 [&_summary::-webkit-details-marker]:hidden">
                  <summary className="flex cursor-pointer items-center justify-between gap-3 font-semibold text-[15px] text-[#102A43]">
                    {t(f.q, locale)}
                    <span className="shrink-0 transition-transform group-open:rotate-45" style={{ color: GREEN }}>+</span>
                  </summary>
                  <p className="mt-3 text-sm text-gray-500 leading-relaxed">{t(f.a, locale)}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Final CTA */}
      <section className="bg-gradient-to-r from-[#143C96] to-[#1F63D6] px-4 py-16 text-white sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <Zap className="mx-auto h-9 w-9 text-[#8BE172]" />
          <h2 className="mt-5 text-2xl md:text-4xl font-bold">
            {t({ en: `Need Help with ${P} Selection, Setup, or Troubleshooting?`, zh: `在 ${P} 选型、设置或故障排除方面需要帮助?` }, locale)}
          </h2>
          <p className="mx-auto mt-5 max-w-3xl leading-7 text-blue-100">
            {t({ en: `ETIA engineers can help with ${P} product selection, configuration, setup, calibration guidance, maintenance, repair support, and technical troubleshooting.`, zh: `ETIA 工程师可协助进行 ${P} 产品选型、配置、设置、校准指导、维护、维修支持与技术故障排除。` }, locale)}
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row sm:flex-wrap">
            <a href={engineerMail} className="rounded-xl bg-[#41A62A] px-7 py-3.5 text-sm font-bold text-white transition hover:-translate-y-0.5">{t({ en: "Talk to an Engineer", zh: "咨询工程师" }, locale)}</a>
            <a href={quoteMail} className="rounded-xl border border-white/35 bg-white/10 px-7 py-3.5 text-sm font-bold text-white transition hover:-translate-y-0.5">{t({ en: "Request a Quote", zh: "请求报价" }, locale)}</a>
            {g.pdfs.userGuide && (
              <a href={g.pdfs.userGuide} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/35 bg-white/10 px-7 py-3.5 text-sm font-bold text-white transition hover:-translate-y-0.5">
                <Download className="h-4 w-4" />
                {t({ en: `Download ${P} User Guide`, zh: `下载 ${P} 用户指南` }, locale)}
              </a>
            )}
          </div>
          <p className="mt-6 text-xs text-blue-200">
            <Link href="/contact" className="underline hover:text-white">{t({ en: "Sales & Support", zh: "销售与支持" }, locale)}</Link>
            <span className="mx-2">·</span>
            <Link href="/contact" className="underline hover:text-white">{t({ en: "Contact ETIA", zh: "联系 ETIA" }, locale)}</Link>
            <span className="mx-2">·</span>
            <Link href="/product/omnicure" className="underline hover:text-white">OmniCure</Link>
          </p>
        </div>
      </section>
    </>
  );
}
