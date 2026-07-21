"use client";
import Link from "next/link";
import { apps, appSlug, localizeApp, localizeIndustry, type App } from "@/components/applicationNotes";
import { productForAppNote } from "@/components/productApplications";
import { productHref, productModel, techRouteFor, type Product } from "@/components/productCatalog";
import { industryColors } from "@/components/industryMedia";
import { inquiryMailto } from "@/components/contact";
import { useLocale, t } from "@/components/LocaleContext";

const brandPageSlug: Record<Product["brandId"], string> = {
  omnicure: "omnicure",
  phoseon: "phoseon",
  fusionuv: "fusion-uv",
  noblelight: "noblelight",
};

// Full landing page for a single application note — the indexable counterpart
// to the Application-page modal. Renders the same content plus a four-tag
// taxonomy (industry / application point / UV technology / UV brand) so each
// note can be discovered and ranked on its own URL.
export default function AppNoteView({ note }: { note: App }) {
  const { locale } = useLocale();
  const a = localizeApp(note, locale);
  const color = industryColors[note.industry] || "#1A56DB";
  // Product / brand / tech derived from the English catalog, then displayed.
  const product = productForAppNote(note);
  const techRoute = product ? techRouteFor(product) : undefined;

  // Other notes in the same industry (for internal linking).
  const related = apps
    .filter((x) => x.industry === note.industry && x.id !== note.id)
    .slice(0, 4)
    .map((x) => ({ raw: x, loc: localizeApp(x, locale) }));

  return (
    <>
      {/* Breadcrumb */}
      <div className="border-b border-gray-200 py-3 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-xs text-gray-400">
          <Link href="/" className="hover:text-[#1A56DB]">{t({ en: "Home", zh: "首页" }, locale)}</Link>
          <span className="mx-2">›</span>
          <Link href="/application" className="hover:text-[#1A56DB]">{t({ en: "Application", zh: "应用" }, locale)}</Link>
          <span className="mx-2">›</span>
          <span className="text-gray-500">{a.title}</span>
        </div>
      </div>

      {/* Header */}
      <header className="py-12 border-b border-gray-200" style={{ background: "#f1f5f9" }}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Taxonomy tickets: Industry · Application · Brand · Product · Technology */}
          <div className="flex flex-wrap items-center gap-1.5 mb-4">
            <Link href={`/application?ind=${encodeURIComponent(note.industry)}`} className="text-[11px] font-bold px-2 py-0.5 rounded text-white hover:opacity-90 transition-opacity" style={{ background: color }}>
              {localizeIndustry(note.industry, locale).toUpperCase()}
            </Link>
            <span className="text-[11px] font-medium px-2 py-0.5 rounded-full border border-gray-300 text-gray-600 bg-white">{a.subCategory}</span>
            {product && (
              <Link href={`/product/${brandPageSlug[product.brandId]}`} className="text-[11px] font-semibold px-2 py-0.5 rounded-full border hover:opacity-90 transition-opacity" style={{ borderColor: `${color}55`, color, background: `${color}0d` }}>
                {product.brand}
              </Link>
            )}
            {product && (
              <Link href={productHref(product)} className="text-[11px] font-semibold px-2 py-0.5 rounded-full border border-gray-300 text-gray-700 bg-white hover:border-gray-500 transition-colors">
                {productModel(product)}
              </Link>
            )}
            {techRoute && (
              <span className="text-[11px] font-medium px-2 py-0.5 rounded-full border border-gray-300 text-gray-600 bg-white">{t(techRoute, locale)}</span>
            )}
            {note.hot && <span className="text-[11px] px-2 py-0.5 rounded-full bg-orange-50 text-orange-500 border border-orange-200 font-semibold">⭐ {t({ en: "Hot", zh: "热门" }, locale)}</span>}
          </div>
          <h1 className="text-3xl md:text-4xl font-bold leading-tight mb-4" style={{ color: "#1A56DB" }}>{a.title}</h1>
          <p className="text-base text-gray-600 leading-relaxed">{a.intro}</p>
          <p className="mt-4"><span className="inline-block text-[11px] font-mono font-semibold px-2 py-0.5 rounded bg-[#1A56DB]/10 text-[#1A56DB]">{t({ en: "Ref.", zh: "编号" }, locale)} {note.id}</span></p>
        </div>
      </header>

      {/* Body */}
      <div className="py-12 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-4">
            <div className="rounded-lg p-5 bg-red-50 border border-red-100">
              <p className="text-xs font-bold text-red-600 uppercase tracking-wider mb-2">{t({ en: "The Challenge", zh: "挑战" }, locale)}</p>
              <p className="text-sm text-gray-700 leading-relaxed">{a.challenge}</p>
            </div>
            <div className="rounded-lg p-5 border" style={{ background: "#f0f5ff", borderColor: "#c7d9ff" }}>
              <p className="text-xs font-bold uppercase tracking-wider mb-2" style={{ color: "#1A56DB" }}>{t({ en: "The Solution", zh: "解决方案" }, locale)}</p>
              <p className="text-sm text-gray-700 leading-relaxed">{a.solution}</p>
            </div>
            <div className="rounded-lg p-5 bg-green-50 border border-green-100">
              <p className="text-xs font-bold text-green-700 uppercase tracking-wider mb-2">{t({ en: "The Benefit", zh: "效益" }, locale)}</p>
              <p className="text-sm text-gray-700 leading-relaxed">{a.benefit}</p>
            </div>
            <div className="rounded-lg p-5 border" style={{ background: "#fafafa", borderColor: "#eee" }}>
              <p className="text-xs font-bold uppercase tracking-wider mb-2" style={{ color }}>{t({ en: "Technology Highlights", zh: "技术亮点" }, locale)}</p>
              <ul className="text-sm text-gray-700 leading-relaxed list-disc pl-5 space-y-1.5">
                {a.highlights.map((h, i) => <li key={i}>{h}</li>)}
              </ul>
            </div>
          </div>

          {/* Recommended system */}
          <div className="mt-6 rounded-xl p-5 border border-gray-200 bg-gray-50 flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">{t({ en: "Recommended System", zh: "推荐系统" }, locale)}</p>
              <p className="text-base font-semibold" style={{ color: "#1A56DB" }}>{a.recommended}</p>
            </div>
            {product && (
              <Link href={productHref(product)} className="px-5 py-2.5 rounded font-semibold text-white text-sm hover:opacity-90 transition-all whitespace-nowrap" style={{ background: "#1A56DB" }}>
                {t({ en: "View system specs →", zh: "查看系统规格 →" }, locale)}
              </Link>
            )}
          </div>

          {/* CTA */}
          <div className="mt-8 rounded-2xl p-6 text-center" style={{ background: "#1A56DB" }}>
            <h2 className="text-xl font-bold text-white mb-2">{t({ en: "Have a similar curing challenge?", zh: "有类似的固化难题?" }, locale)}</h2>
            <p className="text-gray-200 text-sm mb-5">{t({ en: "Our engineers match the right UV system to your exact process — from selection to validation.", zh: "我们的工程师将为您的具体工艺匹配合适的UV系统——从选型到验证。" }, locale)}</p>
            <div className="flex flex-wrap justify-center gap-3">
              <a href={inquiryMailto(locale, { subject: "Sales Inquiry", context: note.title })} className="px-6 py-2.5 rounded font-semibold text-white hover:opacity-90 transition-all" style={{ background: "#41A62A" }}>{t({ en: "Talk to Our Sales →", zh: "联系我们的销售 →" }, locale)}</a>
              <Link href="/product" className="px-6 py-2.5 rounded font-semibold text-white border border-white/30 hover:border-white/60 transition-all">{t({ en: "Explore Products", zh: "浏览产品" }, locale)}</Link>
            </div>
          </div>

          {/* Related application notes */}
          {related.length > 0 && (
            <div className="mt-10">
              <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">{t({ en: "Related in", zh: "相关应用" }, locale)} {localizeIndustry(note.industry, locale)}</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {related.map(({ raw, loc }) => (
                  <Link key={raw.id} href={`/application/${appSlug(raw)}`} className="block rounded-lg border border-gray-100 bg-white p-4 shadow-sm hover:shadow-md transition-all group">
                    <p className="text-[11px] text-gray-400 mb-1">{loc.subCategory}</p>
                    <p className="text-sm font-semibold text-gray-900 leading-snug group-hover:text-[#1A56DB] transition-colors">{loc.title}</p>
                  </Link>
                ))}
              </div>
            </div>
          )}

          <div className="mt-8">
            <Link href="/application" className="text-sm font-semibold hover:underline" style={{ color: "#1A56DB" }}>← {t({ en: "Back to all applications", zh: "返回全部应用" }, locale)}</Link>
          </div>
        </div>
      </div>
    </>
  );
}
