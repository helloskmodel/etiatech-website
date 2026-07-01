"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { industryImage, industryFallbackIcon, industryColors } from "@/components/industryMedia";
import { successStories, caseStudyImage, heroBannerImage, localizeCase, type CaseStudy } from "@/components/caseStudies";
import { apps, localizeApp, localizeIndustry, type App } from "@/components/applicationNotes";
import CaseStudyModal from "@/components/CaseStudyModal";
import { useLocale, t } from "@/components/LocaleContext";


const industries = [...new Set(apps.map((a) => a.industry))];


export default function ApplicationPage() {
  const [activeIndustry, setActiveIndustry] = useState<string>("All");
  const [selectedApp, setSelectedApp] = useState<App | null>(null);
  const [selectedCase, setSelectedCase] = useState<CaseStudy | null>(null);
  const { locale } = useLocale();

  const filtered = activeIndustry === "All" ? apps : apps.filter((a) => a.industry === activeIndustry);

  return (
    <>
      {/* Hero */}
      <section className="py-16 md:py-20 relative overflow-hidden" style={{ background: "#0f2444" }}>
        {heroBannerImage && <Image src={heroBannerImage} alt="" fill priority sizes="100vw" className="object-cover" />}
        <div className="absolute inset-0" style={{ background: "linear-gradient(90deg, rgba(13,30,58,0.94) 0%, rgba(18,65,163,0.82) 50%, rgba(26,86,219,0.45) 100%)" }} />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl text-left">
          <p className="text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: "#44B549" }}>{t({ en: "10 Industries · 62 Application Notes", zh: "10大行业 · 62个应用点" }, locale)}</p>
          <h1 className="text-3xl md:text-4xl font-bold text-white leading-tight mb-3">{t({ en: "Validated Applications.", zh: "验证过的应用。" }, locale)}<br /><span style={{ color: "#44B549" }}>{t({ en: "Reliable Performance.", zh: "可靠的性能。" }, locale)}</span></h1>
          <p className="text-base text-gray-200 mb-8 leading-relaxed">
            {t({ en: "UV curing solutions proven across 10 industries and 62 application scenarios — helping manufacturers achieve stable curing results in demanding production environments.", zh: "经10大行业、62个应用场景验证的UV固化解决方案——帮助制造商在严苛的生产环境中获得稳定的固化效果。" }, locale)}
          </p>
          <div className="flex flex-wrap gap-4">
            <a href="mailto:mark_tang@etia-tech.com?subject=Sales%20Inquiry" className="px-6 py-3 rounded font-semibold text-white hover:opacity-90 transition-all" style={{ background: "#1A56DB" }}>
              {t({ en: "Talk to Our Sales", zh: "联系我们的销售" }, locale)}
            </a>
            <Link href="/product" className="px-6 py-3 rounded font-semibold text-white border border-white/30 hover:border-white/60 transition-all">
              {t({ en: "Explore Products", zh: "浏览产品" }, locale)}
            </Link>
          </div>
          </div>
        </div>
      </section>

      {/* Filter Tabs */}
      <section className="sticky top-16 z-40 border-b border-gray-200 bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-wrap gap-1.5">
          <button
            onClick={() => setActiveIndustry("All")}
            className={`px-2.5 py-1 rounded-full text-xs font-semibold transition-all ${activeIndustry === "All" ? "text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}
            style={activeIndustry === "All" ? { background: "#1A56DB" } : {}}
          >
            {t({ en: "All", zh: "全部" }, locale)} ({apps.length})
          </button>
          {industries.map((ind) => (
            <button
              key={ind}
              onClick={() => setActiveIndustry(ind)}
              className={`px-2.5 py-1 rounded-full text-xs font-semibold transition-all flex items-center gap-1 ${activeIndustry === ind ? "text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}
              style={activeIndustry === ind ? { background: industryColors[ind] } : {}}
            >
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: industryColors[ind] }} />
              {localizeIndustry(ind, locale)}
            </button>
          ))}
        </div>
      </section>

      {/* Application Cards */}
      <section className="py-10" style={{ background: "#f5f7fa" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {filtered.map((rawApp) => {
              const app = localizeApp(rawApp, locale);
              return (
              <button
                key={app.id}
                onClick={() => setSelectedApp(app)}
                className="text-left rounded-xl bg-white border border-gray-100 shadow-sm hover:shadow-md transition-all group overflow-hidden"
              >
                {/* Colored top bar */}
                <div className="h-1" style={{ background: industryColors[app.industry] }} />
                <div className="p-4">
                  {/* Badges row */}
                  <div className="flex flex-wrap items-center gap-1.5 mb-3">
                    <span className="text-xs font-bold px-2 py-0.5 rounded text-white" style={{ background: industryColors[app.industry] }}>
                      {localizeIndustry(app.industry, locale).toUpperCase()}
                    </span>
                    <span className="text-xs px-2 py-0.5 rounded bg-gray-100 text-gray-600 font-medium">{app.product}</span>
                    {app.hot && <span className="text-xs px-2 py-0.5 rounded-full bg-orange-50 text-orange-500 border border-orange-200 font-semibold">⭐ {t({ en: "Hot", zh: "热门" }, locale)}</span>}
                  </div>
                  {/* Title */}
                  <h3 className="font-bold text-gray-900 text-sm leading-snug mb-1 group-hover:text-[#1A56DB] transition-colors">{app.title}</h3>
                  {/* Subcategory */}
                  <p className="text-xs text-gray-400 mb-3">{app.subCategory}</p>
                  {/* Footer */}
                  <div className="flex items-center justify-between pt-2 border-t border-gray-50">
                    <span className="text-xs text-gray-300">{app.id}</span>
                    <span className="text-xs text-[#1A56DB] opacity-0 group-hover:opacity-100 transition-opacity font-medium">{t({ en: "View →", zh: "查看 →" }, locale)}</span>
                  </div>
                </div>
              </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Customer Success */}
      <section id="case-studies" className="py-20 bg-white scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-semibold tracking-widest uppercase mb-2" style={{ color: "#44B549" }}>{t({ en: "Customer Success", zh: "客户成功案例" }, locale)}</p>
          <h2 className="text-3xl font-bold mb-3" style={{ color: "#1A56DB" }}>{t({ en: "From Application Know-How to Real Results", zh: "从应用专知到真实成果" }, locale)}</h2>
          <p className="text-gray-500 mb-10 max-w-3xl">{t({ en: "Unmatched light-cure expertise — full system solutions where chemistry, material, and equipment work as one.", zh: "无可比拟的光固化专业能力——化学、材料与设备协同一体的完整系统解决方案。" }, locale)}</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {successStories.map((raw) => {
              const s = localizeCase(raw, locale);
              return (
              <button
                key={s.id}
                onClick={() => setSelectedCase(s)}
                className="text-left rounded-xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-md transition-all bg-white flex flex-col group"
              >
                {/* Visual header — real industry photo (icon fallback) */}
                <div className="relative h-32 overflow-hidden bg-gray-100">
                  {(caseStudyImage(s) || industryImage[s.industry]) ? (
                    <Image src={caseStudyImage(s) || industryImage[s.industry]} alt={s.industry} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover group-hover:scale-105 transition-transform duration-300" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center" style={{ background: `linear-gradient(135deg, ${industryColors[s.industry]} 0%, ${industryColors[s.industry]}cc 100%)` }}>
                      {(() => { const Icon = industryFallbackIcon[s.industry]; return Icon ? <Icon className="w-10 h-10 text-white/90" strokeWidth={1.5} /> : null; })()}
                    </div>
                  )}
                  <span className="absolute top-2 left-2 text-[10px] font-bold px-2 py-0.5 rounded text-white" style={{ background: industryColors[s.industry] }}>{s.industry.toUpperCase()}</span>
                  <span className="absolute top-2 right-2 text-[10px] text-white bg-black/30 px-1.5 py-0.5 rounded">{s.id}</span>
                </div>
                {/* Title */}
                <div className="px-5 pt-4 pb-2">
                  <h3 className="font-bold text-base leading-snug" style={{ color: "#1A56DB" }}>{s.title}</h3>
                  <p className="text-gray-400 text-xs mt-1">{s.company}</p>
                </div>
                {/* Keywords */}
                <div className="px-5 pb-4 flex flex-wrap gap-1.5 flex-1 content-start">
                  {s.keywords.map((k) => (
                    <span key={k} className="text-[11px] font-medium px-2 py-0.5 rounded-full border" style={{ borderColor: `${industryColors[s.industry]}40`, color: industryColors[s.industry], background: `${industryColors[s.industry]}0d` }}>
                      {k}
                    </span>
                  ))}
                </div>
                {/* Footer metric */}
                <div className="px-5 py-3 border-t border-gray-100 flex items-center justify-between bg-gray-50">
                  <div>
                    <p className="text-xl font-bold" style={{ color: "#1A56DB" }}>{s.metric}</p>
                    <p className="text-[11px] text-gray-400 mt-0.5 line-clamp-1">{s.metricLabel}</p>
                  </div>
                  <span className="text-xs font-semibold whitespace-nowrap group-hover:underline" style={{ color: industryColors[s.industry] }}>{locale === "zh" ? "查看案例 →" : "Read case →"}</span>
                </div>
              </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16" style={{ background: "#1A56DB" }}>
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Find the Right UV Curing Solution for Your Process</h2>
          <p className="text-gray-300 mb-6">Our engineers are ready to help — from application validation to system selection.</p>
          <a href="mailto:mark_tang@etia-tech.com?subject=Sales%20Inquiry" className="px-8 py-3 rounded font-semibold text-white hover:opacity-90" style={{ background: "#44B549" }}>
            Talk to Our Sales →
          </a>
        </div>
      </section>

      {/* Modal */}
      {selectedApp && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: "rgba(0,0,0,0.85)" }}
          onClick={() => setSelectedApp(null)}
        >
          <div
            className="w-full max-w-lg rounded-2xl bg-white relative max-h-[90vh] overflow-y-auto shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Colored top bar */}
            <div className="h-1.5 rounded-t-2xl" style={{ background: industryColors[selectedApp.industry] }} />
            <div className="p-6">
            <button onClick={() => setSelectedApp(null)} className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 text-xl leading-none">✕</button>

            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-bold px-2 py-0.5 rounded text-white" style={{ background: industryColors[selectedApp.industry] }}>{localizeIndustry(selectedApp.industry, locale).toUpperCase()}</span>
              <span className="text-xs text-gray-400">{selectedApp.subCategory}</span>
              {selectedApp.hot && <span className="text-xs px-2 py-0.5 rounded-full bg-orange-50 text-orange-500 border border-orange-200 font-semibold">⭐ {t({ en: "Hot", zh: "热门" }, locale)}</span>}
            </div>
            <h2 className="text-xl font-bold mt-2 mb-1 pr-6" style={{ color: "#1A56DB" }}>{selectedApp.title}</h2>
            <p className="text-xs text-gray-400 mb-3">{selectedApp.id}</p>
            <p className="text-sm text-gray-600 leading-relaxed mb-5">{selectedApp.intro}</p>

            <div className="space-y-3 mb-5">
              <div className="rounded-lg p-4 bg-red-50 border border-red-100">
                <p className="text-xs font-bold text-red-600 uppercase tracking-wider mb-2">{t({ en: "The Challenge", zh: "挑战" }, locale)}</p>
                <p className="text-sm text-gray-700 leading-relaxed">{selectedApp.challenge}</p>
              </div>
              <div className="rounded-lg p-4 border" style={{ background: "#f0f5ff", borderColor: "#c7d9ff" }}>
                <p className="text-xs font-bold uppercase tracking-wider mb-2" style={{ color: "#1A56DB" }}>{t({ en: "The Solution", zh: "解决方案" }, locale)}</p>
                <p className="text-sm text-gray-700 leading-relaxed">{selectedApp.solution}</p>
              </div>
              <div className="rounded-lg p-4 bg-green-50 border border-green-100">
                <p className="text-xs font-bold text-green-700 uppercase tracking-wider mb-2">{t({ en: "The Benefit", zh: "效益" }, locale)}</p>
                <p className="text-sm text-gray-700 leading-relaxed">{selectedApp.benefit}</p>
              </div>
              <div className="rounded-lg p-4 border" style={{ background: "#fafafa", borderColor: "#eee" }}>
                <p className="text-xs font-bold uppercase tracking-wider mb-2" style={{ color: industryColors[selectedApp.industry] }}>{t({ en: "Technology Highlights", zh: "技术亮点" }, locale)}</p>
                <ul className="text-sm text-gray-700 leading-relaxed list-disc pl-5 space-y-1">
                  {selectedApp.highlights.map((h, i) => <li key={i}>{h}</li>)}
                </ul>
              </div>
              <div className="rounded-lg p-4 bg-gray-50 border border-gray-100">
                <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">{t({ en: "Recommended System", zh: "推荐系统" }, locale)}</p>
                <p className="text-sm font-semibold" style={{ color: "#1A56DB" }}>{selectedApp.recommended}</p>
              </div>
            </div>

            <a
              href="mailto:mark_tang@etia-tech.com?subject=Sales%20Inquiry"
              className="block text-center py-2.5 rounded font-semibold text-white text-sm hover:opacity-90"
              style={{ background: "#2563eb" }}
              onClick={() => setSelectedApp(null)}
            >
              {t({ en: "Talk to Our Sales →", zh: "联系我们的销售 →" }, locale)}
            </a>
            </div>
          </div>
        </div>
      )}

      {/* Case Study Modal */}
      {selectedCase && (
        <CaseStudyModal caseStudy={selectedCase} onClose={() => setSelectedCase(null)} />
      )}
    </>
  );
}
