"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { industryImage, industryFallbackIcon, industryColors } from "@/components/industryMedia";
import { successStories, caseStudyImage, caseSlug, heroBannerImage, localizeCase } from "@/components/caseStudies";
import { apps, appSlug, localizeApp, localizeIndustry } from "@/components/applicationNotes";
import { productForAppNote, brandsForCase, techRoutesForCase } from "@/components/productApplications";
import { techRouteFor, brandAccent } from "@/components/productCatalog";
import { useLocale, t } from "@/components/LocaleContext";
import { inquiryMailto } from "@/components/contact";


const industries = [...new Set(apps.map((a) => a.industry))];


export default function ApplicationPage() {
  const [activeIndustry, setActiveIndustry] = useState<string>("All");
  const { locale } = useLocale();

  // Deep-linking: /application?ind=<Industry> pre-selects a filter tab.
  // (Individual notes now live on their own /application/<slug> pages.)
  useEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    const ind = params.get("ind");
    if (ind && industries.includes(ind)) setActiveIndustry(ind);
  }, []);

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
          <h1 className="text-3xl md:text-4xl font-bold text-white leading-tight mb-3">{t({ en: "Validated UV Curing Applications.", zh: "经过验证的 UV Curing 光固化应用" }, locale)}<br /><span style={{ color: "#44B549" }}>{t({ en: "Reliable Performance.", zh: "可靠稳定的性能" }, locale)}</span></h1>
          <p className="text-base text-gray-200 mb-8 leading-relaxed">
            {t({ en: "UV curing solutions proven across 10 industries and 62 application scenarios — helping manufacturers achieve stable curing results in demanding production environments.", zh: "经10大行业、62个应用场景验证的UV Curing 光固化解决方案——帮助制造商在严苛的生产环境中获得稳定的固化效果。" }, locale)}
          </p>
          <div className="flex flex-wrap gap-4">
            <a href={inquiryMailto(locale, { subject: "Sales Inquiry" })} className="px-6 py-3 rounded font-semibold text-white hover:opacity-90 transition-all" style={{ background: "#1A56DB" }}>
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
              <Link
                key={app.id}
                id={app.id}
                href={`/application/${appSlug(rawApp)}`}
                className="text-left rounded-xl bg-white border border-gray-100 shadow-sm hover:shadow-md transition-all group overflow-hidden scroll-mt-32"
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
                    <span className="text-[11px] font-mono font-semibold px-2 py-0.5 rounded bg-[#1A56DB]/10 text-[#1A56DB]">{app.id}</span>
                    {app.hot && <span className="text-xs px-2 py-0.5 rounded-full bg-orange-50 text-orange-500 border border-orange-200 font-semibold">⭐ {t({ en: "Hot", zh: "热门" }, locale)}</span>}
                  </div>
                  {/* Canonical UV technology hint */}
                  {(() => {
                    const rp = productForAppNote(rawApp);
                    const r = rp ? techRouteFor(rp) : undefined;
                    return r ? (
                      <span className="inline-block text-[10px] font-semibold px-2 py-0.5 rounded-full border border-gray-200 text-gray-500 mb-2">{t(r, locale)}</span>
                    ) : null;
                  })()}
                  {/* Title */}
                  <h3 className="font-bold text-gray-900 text-sm leading-snug mb-1 group-hover:text-[#1A56DB] transition-colors">{app.title}</h3>
                  {/* Subcategory */}
                  <p className="text-xs text-gray-400 mb-3">{app.subCategory}</p>
                  {/* Footer */}
                  <div className="flex items-center justify-end pt-2 border-t border-gray-50">
                    <span className="text-xs text-[#1A56DB] opacity-0 group-hover:opacity-100 transition-opacity font-medium">{t({ en: "View →", zh: "查看 →" }, locale)}</span>
                  </div>
                </div>
              </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Customer Success */}
      <section id="case-studies" className="py-20 bg-white scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-semibold tracking-widest uppercase mb-2" style={{ color: "#44B549" }}>{t({ en: "Customer Success", zh: "客户成功案例" }, locale)}</p>
          <h2 className="text-3xl font-bold mb-3" style={{ color: "#1A56DB" }}>{t({ en: "From UV Curing Know-How to Real Results", zh: "从 UV Curing 光固化专业积淀，到落地实效成果" }, locale)}</h2>
          <p className="text-gray-500 mb-10 max-w-3xl text-balance">{t({ en: "Unmatched UV curing expertise — full system solutions where chemistry, material, and equipment work as one.", zh: "积累丰富的UV Curing 光固化的经验—— 为客户制定融合耗材、胶粘剂与设备一体化解决方案。" }, locale)}</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {successStories.map((raw) => {
              const s = localizeCase(raw, locale);
              return (
              <Link
                key={s.id}
                href={`/case-studies/${caseSlug(raw)}`}
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
                  <span className="absolute top-2 left-2 text-[10px] font-bold px-2 py-0.5 rounded text-white" style={{ background: industryColors[s.industry] }}>{s.sector.toUpperCase()}</span>
                  <span className="absolute top-2 right-2 text-[10px] text-white bg-black/30 px-1.5 py-0.5 rounded">{s.id}</span>
                </div>
                {/* Title */}
                <div className="px-5 pt-4 pb-2">
                  <h3 className="font-bold text-base leading-snug" style={{ color: "#1A56DB" }}>{s.title}</h3>
                  <p className="text-gray-400 text-xs mt-1">{s.company}</p>
                  {/* Brand + primary UV technology hint */}
                  <div className="flex flex-wrap items-center gap-1 mt-2">
                    {brandsForCase(raw).map((bp) => (
                      <span key={bp.brandId} className="text-[10px] font-bold px-1.5 py-0.5 rounded text-white" style={{ background: brandAccent[bp.brandId] }}>{bp.brand}</span>
                    ))}
                    {(() => {
                      const routes = techRoutesForCase(raw);
                      if (!routes.length) return null;
                      return (
                        <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded-full border border-gray-200 text-gray-500">
                          {t(routes[0], locale)}{routes.length > 1 ? ` +${routes.length - 1}` : ""}
                        </span>
                      );
                    })()}
                  </div>
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
              </Link>
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
          <a href={inquiryMailto(locale, { subject: "Sales Inquiry" })} className="px-8 py-3 rounded font-semibold text-white hover:opacity-90" style={{ background: "#44B549" }}>
            Talk to Our Sales →
          </a>
        </div>
      </section>

    </>
  );
}
