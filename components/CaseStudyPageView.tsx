"use client";
import Link from "next/link";
import Image from "next/image";
import { type CaseStudy, caseStudyImage, localizeCase, successStories, caseSlug } from "@/components/caseStudies";
import { industryColors, industryImage, industryFallbackIcon } from "@/components/industryMedia";
import { localizeIndustry } from "@/components/applicationNotes";
import { brandsForCase, systemsForCase, techRoutesForCase } from "@/components/productApplications";
import { brandAccent, brandRouteSlug, productHref, productModel } from "@/components/productCatalog";
import { inquiryMailto } from "@/components/contact";
import { useLocale, t } from "@/components/LocaleContext";

// Full landing page for a single case study — the indexable counterpart to the
// CaseStudyModal. Same content, rendered on its own URL with a tag row and
// structured breadcrumb for SEO.
export default function CaseStudyPageView({ caseStudy }: { caseStudy: CaseStudy }) {
  const { locale } = useLocale();
  const c = localizeCase(caseStudy, locale);
  const color = industryColors[caseStudy.industry] || "#1A56DB";
  const headerImg = caseStudyImage(c) || industryImage[caseStudy.industry];
  const Icon = industryFallbackIcon[caseStudy.industry];

  const related = successStories
    .filter((x) => x.industry === caseStudy.industry && x.id !== caseStudy.id)
    .slice(0, 3)
    .map((x) => ({ raw: x, loc: localizeCase(x, locale) }));

  // Brand · Product · Technology stickers, derived from the systems this case
  // study uses (deduplicated).
  const brands = brandsForCase(caseStudy);
  const systems = systemsForCase(caseStudy);
  const techRoutes = techRoutesForCase(caseStudy);

  return (
    <>
      {/* Breadcrumb */}
      <div className="border-b border-gray-200 py-3 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-xs text-gray-400">
          <Link href="/" className="hover:text-[#1A56DB]">{t({ en: "Home", zh: "首页" }, locale)}</Link>
          <span className="mx-2">›</span>
          <Link href="/application#case-studies" className="hover:text-[#1A56DB]">{t({ en: "Case Studies", zh: "客户案例" }, locale)}</Link>
          <span className="mx-2">›</span>
          <span className="text-gray-500">{c.title}</span>
        </div>
      </div>

      {/* Hero image */}
      <div className="relative h-56 md:h-72 overflow-hidden bg-gray-100">
        {headerImg ? (
          <Image src={headerImg} alt={c.industry} fill priority sizes="100vw" className="object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center" style={{ background: `linear-gradient(135deg, ${color} 0%, ${color}cc 100%)` }}>
            {Icon ? <Icon className="w-16 h-16 text-white/90" strokeWidth={1.5} /> : null}
          </div>
        )}
        <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.55) 100%)" }} />
        <div className="absolute inset-x-0 bottom-0">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pb-6">
            <div className="flex flex-wrap items-center gap-1.5 mb-3">
              <Link href={`/application?ind=${encodeURIComponent(caseStudy.industry)}`} className="text-[11px] font-bold px-2 py-0.5 rounded text-white hover:opacity-90 transition-opacity" style={{ background: color }}>
                {localizeIndustry(caseStudy.industry, locale).toUpperCase()}
              </Link>
              <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-white/90 text-gray-700">{c.sector}</span>
              <span className="text-[11px] font-mono font-semibold px-2 py-0.5 rounded-full bg-white/90 text-[#1A56DB]">{t({ en: "Case Study", zh: "案例" }, locale)} {caseStudy.id}</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-white leading-tight">{c.title}</h1>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="py-12 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Brand · Product · Technology tickets (derived from the systems used) */}
          {(brands.length > 0 || systems.length > 0 || techRoutes.length > 0) && (
            <div className="flex flex-wrap items-center gap-1.5 mb-3">
              {brands.map((p) => (
                <Link key={p.brandId} href={`/product/${brandRouteSlug[p.brandId]}`} className="text-[11px] font-bold px-2.5 py-0.5 rounded-full text-white hover:opacity-90 transition-opacity" style={{ background: brandAccent[p.brandId] }}>
                  {p.brand}
                </Link>
              ))}
              {systems.map((p) => (
                <Link key={p.slug} href={productHref(p)} className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full border border-gray-300 text-gray-700 bg-white hover:border-gray-500 transition-colors">
                  {productModel(p)}
                </Link>
              ))}
              {techRoutes.map((tr) => (
                <span key={tr.en} className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full border border-gray-300 text-gray-600 bg-white">{t(tr, locale)}</span>
              ))}
            </div>
          )}

          {/* Keyword tags */}
          <div className="flex flex-wrap gap-1.5 mb-6">
            {c.keywords.map((k) => (
              <span key={k} className="text-[11px] font-medium px-2 py-0.5 rounded-full border" style={{ borderColor: `${color}40`, color, background: `${color}0d` }}>{k}</span>
            ))}
          </div>

          {/* Headline metric */}
          <div className="mb-8 rounded-xl p-5 border border-gray-100" style={{ background: `${color}0a` }}>
            <p className="text-3xl font-bold" style={{ color: "#1A56DB" }}>{c.metric}</p>
            <p className="text-sm text-gray-500 mt-1">{c.metricLabel}</p>
          </div>

          <div className="space-y-4">
            {c.overview && (
              <div className="rounded-lg p-5 bg-gray-50 border border-gray-100">
                <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">{t({ en: "Application Overview", zh: "应用概述" }, locale)}</p>
                <p className="text-sm text-gray-700 leading-relaxed">{c.overview}</p>
              </div>
            )}
            <div className="rounded-lg p-5 bg-red-50 border border-red-100">
              <p className="text-xs font-bold text-red-600 uppercase tracking-wider mb-2">{t({ en: "The Challenge", zh: "挑战" }, locale)}</p>
              <p className="text-sm text-gray-700 leading-relaxed">{c.challenge}</p>
            </div>
            <div className="rounded-lg p-5 border" style={{ background: "#f0f5ff", borderColor: "#c7d9ff" }}>
              <p className="text-xs font-bold uppercase tracking-wider mb-2" style={{ color: "#1A56DB" }}>{t({ en: "The Solution", zh: "解决方案" }, locale)}</p>
              <p className="text-sm text-gray-700 leading-relaxed">{c.solution}</p>
            </div>
            {c.materials && (
              <div className="rounded-lg p-5 border" style={{ background: "#fafafa", borderColor: "#e5e7eb" }}>
                <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">{t({ en: "Compatible Materials", zh: "兼容材料" }, locale)}</p>
                <div className="overflow-x-auto">
                  <table className="w-full text-[11px] text-left text-gray-600">
                    <thead>
                      <tr className="text-gray-400">
                        <th className="py-1 pr-2 font-semibold">{t({ en: "Application", zh: "应用" }, locale)}</th>
                        <th className="py-1 pr-2 font-semibold">{t({ en: "System", zh: "系统" }, locale)}</th>
                        <th className="py-1 pr-2 font-semibold">{t({ en: "Adhesive / Category", zh: "胶粘剂 / 类别" }, locale)}</th>
                        <th className="py-1 font-semibold">{t({ en: "Notes", zh: "备注" }, locale)}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {c.materials.rows.map((m, i) => (
                        <tr key={i} className="border-t border-gray-100 align-top">
                          <td className="py-1 pr-2">{m.application}</td>
                          <td className="py-1 pr-2">{m.system}</td>
                          <td className="py-1 pr-2">{m.category}</td>
                          <td className="py-1">{m.notes}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                {c.materials.disclaimer && (
                  <p className="text-[11px] text-orange-500 mt-2 leading-relaxed">⚠ {c.materials.disclaimer}</p>
                )}
              </div>
            )}
            {c.benefits && c.benefits.length > 0 ? (
              <div className="rounded-lg p-5 bg-green-50 border border-green-100">
                <p className="text-xs font-bold text-green-700 uppercase tracking-wider mb-2">{t({ en: "The Benefit", zh: "效益" }, locale)}</p>
                <ul className="text-sm text-gray-700 leading-relaxed list-disc pl-5 space-y-1.5">
                  {c.benefits.map((b, i) => <li key={i}>{b}</li>)}
                </ul>
              </div>
            ) : c.results ? (
              <div className="rounded-lg p-5 bg-green-50 border border-green-100">
                <p className="text-xs font-bold text-green-700 uppercase tracking-wider mb-2">{t({ en: "Results & Metrics", zh: "成果与指标" }, locale)}</p>
                <p className="text-sm text-gray-700 leading-relaxed">{c.results}</p>
              </div>
            ) : null}
            {c.marketContext && (
              <div className="rounded-lg p-5 border" style={{ background: "#0891b20d", borderColor: "#0891b233" }}>
                <p className="text-xs font-bold uppercase tracking-wider mb-2" style={{ color: "#0891b2" }}>{t({ en: "Market Context", zh: "市场背景" }, locale)}</p>
                <p className="text-sm text-gray-700 leading-relaxed">{c.marketContext}</p>
              </div>
            )}
          </div>

          <p className="text-[11px] text-gray-400 mt-4">{t({ en: "Source", zh: "来源" }, locale)}: {c.source}</p>

          {/* CTA */}
          <div className="mt-8 rounded-2xl p-6 text-center" style={{ background: "#1A56DB" }}>
            <h2 className="text-xl font-bold text-white mb-2">{t({ en: "Facing a similar UV curing challenge?", zh: "面临类似的 UV Curing 光固化挑战?" }, locale)}</h2>
            <p className="text-gray-200 text-sm mb-5">{t({ en: "Our engineers match the right UV system to your exact process — from selection to validation.", zh: "我们的工程师将为您的具体工艺匹配合适的UV系统——从选型到验证。" }, locale)}</p>
            <div className="flex flex-wrap justify-center gap-3">
              <a href={inquiryMailto(locale, { subject: "Sales Inquiry", context: caseStudy.company })} className="px-6 py-2.5 rounded font-semibold text-white hover:opacity-90 transition-all" style={{ background: "#44B549" }}>{t({ en: "Talk to Our Sales →", zh: "联系我们的销售 →" }, locale)}</a>
              <Link href="/product" className="px-6 py-2.5 rounded font-semibold text-white border border-white/30 hover:border-white/60 transition-all">{t({ en: "Explore Products", zh: "浏览产品" }, locale)}</Link>
            </div>
          </div>

          {/* Related case studies */}
          {related.length > 0 && (
            <div className="mt-10">
              <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">{t({ en: "Related in", zh: "相关案例" }, locale)} {localizeIndustry(caseStudy.industry, locale)}</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {related.map(({ raw, loc }) => (
                  <Link key={raw.id} href={`/case-studies/${caseSlug(raw)}`} className="block rounded-lg border border-gray-100 bg-white p-4 shadow-sm hover:shadow-md transition-all group">
                    <p className="text-[11px] text-gray-400 mb-1">{loc.sector}</p>
                    <p className="text-sm font-semibold text-gray-900 leading-snug group-hover:text-[#1A56DB] transition-colors">{loc.title}</p>
                  </Link>
                ))}
              </div>
            </div>
          )}

          <div className="mt-8">
            <Link href="/application#case-studies" className="text-sm font-semibold hover:underline" style={{ color: "#1A56DB" }}>← {t({ en: "Back to all case studies", zh: "返回全部案例" }, locale)}</Link>
          </div>
        </div>
      </div>
    </>
  );
}
