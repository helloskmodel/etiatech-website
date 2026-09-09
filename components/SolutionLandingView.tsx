"use client";
import Link from "next/link";
import Image from "next/image";
import {
  getProduct,
  productHref,
  productImage,
  localizeProduct,
  brandAccent,
} from "@/components/productCatalog";
import { solutionApplications, solutionNotes, type Solution } from "@/components/solutions";
import { localizeApp, localizeIndustry } from "@/components/applicationNotes";
import { applicationsZh } from "@/data/applicationsData.zh";
import HeroBackdrop from "@/components/HeroBackdrop";
import { heroBannerImages } from "@/components/caseStudies";
import WhyEtiaCards from "@/components/WhyEtiaCards";
import FinalCta from "@/components/FinalCta";
import { inquiryHref } from "@/components/contact";
import { useLocale, t } from "@/components/LocaleContext";

const ACCENT = "#1A56DB";
const GREEN = "#41A62A";

// Notes are supporting depth, not the main event — the linked applications
// above them carry the SEO value. Cap so a 9-note industry stays scannable.
const MAX_NOTES = 6;

export default function SolutionLandingView({ solution }: { solution: Solution }) {
  const { locale } = useLocale();
  const applications = solutionApplications(solution);
  const notes = solutionNotes(solution).slice(0, MAX_NOTES);
  const systems = solution.productSlugs
    .map((slug) => getProduct(slug))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));

  return (
    <>
      {/* Breadcrumb */}
      <div className="border-b border-gray-200 py-3 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-xs text-gray-400">
          <Link href="/solutions" className="hover:text-[#1A56DB]">{t({ en: "Solutions", zh: "行业解决方案" }, locale)}</Link>
          <span className="mx-2">›</span>
          <span style={{ color: ACCENT }}>{t(solution.label, locale)}</span>
        </div>
      </div>

      {/* Hero */}
      <section className="py-16 md:py-24 relative overflow-hidden" style={{ background: "linear-gradient(135deg, #1A56DB 0%, #123C94 100%)" }}>
        <HeroBackdrop images={heroBannerImages} />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="mb-4">
              <span className="inline-block text-[11px] font-bold px-2.5 py-1 rounded-full text-white" style={{ background: GREEN }}>
                {t({ en: "20 Years of Application Expertise", zh: "20 年应用经验", th: "ประสบการณ์ 20 ปี", vi: "20 năm kinh nghiệm ứng dụng" }, locale)}
              </span>
            </div>
            <p className="text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: GREEN }}>
              {t({ en: "Industry Solution", zh: "行业解决方案", th: "โซลูชันอุตสาหกรรม", vi: "Giải pháp ngành" }, locale)}
            </p>
            <h1 className="text-3xl md:text-5xl font-bold leading-tight text-white mb-4">{t(solution.label, locale)}</h1>
            <p className="text-base md:text-lg text-gray-200 leading-relaxed mb-6 max-w-2xl">{t(solution.blurb, locale)}</p>
            <div className="flex flex-wrap gap-4">
              <a
                href={inquiryHref(locale, { subject: "Engineering Inquiry", context: solution.label.en })}
                className="px-6 py-3 rounded font-semibold text-white hover:opacity-90 transition-all"
                style={{ background: GREEN }}
              >
                {t({ en: "Talk to an Engineer →", zh: "咨询工程师 →" }, locale)}
              </a>
              <Link href="/product" className="px-6 py-3 rounded font-semibold text-white border border-white/30 hover:border-white/60 transition-all">
                {t({ en: "Browse Products →", zh: "浏览产品 →" }, locale)}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Overview */}
      <section className="py-16 bg-white border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-semibold tracking-widest uppercase mb-2" style={{ color: GREEN }}>{t({ en: "Overview", zh: "行业概述" }, locale)}</p>
          <h2 className="text-2xl md:text-3xl font-bold mb-4" style={{ color: ACCENT }}>
            {t({ en: `UV Curing in ${solution.label.en}`, zh: `${solution.label.zh}中的 UV 固化` }, locale)}
          </h2>
          <div className="w-12 h-1 rounded mb-6" style={{ background: GREEN }} />
          {t(solution.intro, locale).split("\n\n").map((para, i) => (
            <p key={i} className="text-base text-gray-600 leading-relaxed mb-4 last:mb-0">{para}</p>
          ))}
        </div>
      </section>

      {/* Live application pages */}
      {applications.length > 0 && (
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-xs font-semibold tracking-widest uppercase mb-2" style={{ color: GREEN }}>{t({ en: "Applications", zh: "应用案例" }, locale)}</p>
            <h2 className="text-2xl md:text-3xl font-bold mb-2" style={{ color: ACCENT }}>
              {t({ en: "Applications in this industry", zh: "该行业的典型应用" }, locale)}
            </h2>
            <p className="mb-8 text-sm text-gray-500">
              {t({ en: "The customer challenge, the system used, and the result.", zh: "客户面临的挑战、所用系统与最终结果。" }, locale)}
            </p>
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {applications.map((a) => {
                const zh = applicationsZh[a.slug];
                const title = (locale !== "en" && zh?.title?.[locale as "zh" | "th" | "vi"]) || a.title;
                const subtitle = (locale !== "en" && zh?.subtitle?.[locale as "zh" | "th" | "vi"]) || a.subtitle;
                return (
                  <Link
                    key={a.slug}
                    href={`/applications/${a.slug}`}
                    className="group rounded-xl border border-gray-200 bg-white p-5 hover:border-[#1A56DB] hover:shadow-md transition-all flex flex-col"
                  >
                    <h3 className="text-sm font-bold leading-snug text-gray-800 mb-2 group-hover:text-[#1A56DB]">{title}</h3>
                    {subtitle && <p className="text-xs leading-relaxed text-gray-500 line-clamp-3 mb-3">{subtitle}</p>}
                    <span className="mt-auto text-xs font-semibold" style={{ color: ACCENT }}>
                      {t({ en: "Read the application →", zh: "查看应用详情 →" }, locale)}
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Application notes — content only, these have no individual URLs */}
      {notes.length > 0 && (
        <section className="py-16" style={{ background: "#f0f4f8" }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-xs font-semibold tracking-widest uppercase mb-2" style={{ color: GREEN }}>{t({ en: "Application Notes", zh: "应用要点" }, locale)}</p>
            <h2 className="text-2xl md:text-3xl font-bold mb-8" style={{ color: ACCENT }}>
              {t({ en: "Process points our engineers see most", zh: "工程师最常遇到的工艺问题" }, locale)}
            </h2>
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {notes.map((raw) => {
                const n = localizeApp(raw, locale);
                return (
                  <div key={n.id} className="rounded-xl border border-gray-200 bg-white p-5 flex flex-col">
                    <span className="inline-block self-start text-[9px] font-bold uppercase tracking-wide px-2 py-0.5 rounded mb-2" style={{ background: `${ACCENT}12`, color: ACCENT }}>
                      {localizeIndustry(n.subCategory, locale)}
                    </span>
                    <h3 className="text-sm font-bold leading-snug text-gray-800 mb-2">{n.title}</h3>
                    <p className="text-xs leading-relaxed text-gray-500 mb-3 line-clamp-4">{n.challenge}</p>
                    <p className="mt-auto text-[11px] font-semibold text-gray-400">
                      {t({ en: "Recommended:", zh: "推荐机型：" }, locale)} <span style={{ color: GREEN }}>{n.recommended}</span>
                    </p>
                  </div>
                );
              })}
            </div>
            <Link href="/applications" className="mt-8 inline-block text-sm font-semibold hover:underline" style={{ color: ACCENT }}>
              {t({ en: "Browse all applications →", zh: "浏览全部应用 →" }, locale)}
            </Link>
          </div>
        </section>
      )}

      {/* Recommended systems */}
      {systems.length > 0 && (
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-xs font-semibold tracking-widest uppercase mb-2" style={{ color: GREEN }}>{t({ en: "Recommended Systems", zh: "推荐系统" }, locale)}</p>
            <h2 className="text-2xl md:text-3xl font-bold mb-8" style={{ color: ACCENT }}>
              {t({ en: "Systems we recommend for this industry", zh: "我们为该行业推荐的机型" }, locale)}
            </h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {systems.map((raw) => {
                const p = localizeProduct(raw, locale);
                const color = brandAccent[p.brandId];
                return (
                  <div key={p.slug} className="rounded-xl border border-gray-100 overflow-hidden bg-white flex flex-col group hover:shadow-md hover:border-gray-200 transition-all">
                    <Link href={productHref(p)} className="relative block h-32 sm:h-36 bg-white">
                      {productImage(p) ? (
                        <Image src={productImage(p)} alt={p.name} fill sizes="(max-width: 640px) 50vw, 25vw" className="object-contain p-3 group-hover:scale-105 transition-transform duration-300" />
                      ) : (
                        <span className="absolute inset-0 flex items-center justify-center text-sm font-semibold text-center px-3" style={{ color }}>{p.brand}</span>
                      )}
                    </Link>
                    <div className="p-4 flex flex-col flex-1 border-t border-gray-50">
                      <span className="inline-block self-start text-[9px] font-bold uppercase tracking-wide px-2 py-0.5 rounded mb-2" style={{ background: `${color}12`, color }}>{p.brand}</span>
                      <Link href={productHref(p)} className="font-bold text-[13px] leading-snug text-gray-800 mb-2 line-clamp-3 hover:text-[#1A56DB]">{p.name}</Link>
                      <Link href={productHref(p)} className="mt-auto text-xs font-semibold hover:underline" style={{ color }}>{t({ en: "View details →", zh: "查看详情 →" }, locale)}</Link>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Why ETIA */}
      <section className="py-16 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-semibold tracking-widest uppercase mb-2" style={{ color: GREEN }}>{t({ en: "Why ETIA", zh: "为何选择 ETIA" }, locale)}</p>
          <h2 className="text-2xl md:text-3xl font-bold mb-8" style={{ color: ACCENT }}>
            {t({ en: "Why work with ETIA on this", zh: "为什么选择 ETIA 合作" }, locale)}
          </h2>
          <WhyEtiaCards />
        </div>
      </section>

      <FinalCta
        heading={t({ en: `Working on a ${solution.label.en.toLowerCase()} process?`, zh: `正在做${solution.label.zh}的工艺?` }, locale)}
        body={t({
          en: "Tell us the bond, the substrate and the line rate — our engineers will come back with the system and the dose window that fit.",
          zh: "把粘接部位、基材与产线节拍告诉我们 —— 工程师会为您匹配合适的机型与剂量窗口。",
        }, locale)}
        primary={{ label: t({ en: "Talk to an Engineer", zh: "咨询工程师" }, locale), href: inquiryHref(locale, { subject: "Sales Inquiry", context: solution.label.en }) }}
        secondary={{ label: t({ en: "All Applications", zh: "全部应用" }, locale), href: "/applications" }}
      />
    </>
  );
}
