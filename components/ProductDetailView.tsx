"use client";
import Link from "next/link";
import Image from "next/image";
import { productImage, localizeProduct, type Product } from "@/components/productCatalog";
import { useLocale, t } from "@/components/LocaleContext";

// Client view for the generic product detail page. The server page supplies
// the catalog product + brand accent; this component localizes the copy
// based on the active locale (cookie-backed).
export default function ProductDetailView({ product, accent }: { product: Product; accent: string }) {
  const { locale } = useLocale();
  const p = localizeProduct(product, locale);

  return (
    <>
      {/* Breadcrumb */}
      <div className="border-b border-gray-200 py-3 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-xs text-gray-400">
          <Link href="/product" className="hover:text-[#1A56DB]">{t({ en: "Products", zh: "产品" }, locale)}</Link>
          <span className="mx-2">›</span>
          <Link href="/product/systems" className="hover:text-[#1A56DB]">{t({ en: "All Systems", zh: "全部系统" }, locale)}</Link>
          <span className="mx-2">›</span>
          <span style={{ color: accent }}>{p.name}</span>
        </div>
      </div>

      {/* Hero */}
      <section className="py-12 relative overflow-hidden border-b border-gray-200" style={{ background: "#f1f5f9" }}>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className="text-[11px] font-bold px-2.5 py-1 rounded text-white" style={{ background: accent }}>{p.brand}</span>
              <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full border border-gray-300 text-gray-600">{p.tech}{p.sub ? ` · ${p.sub}` : ""}</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold leading-tight mb-4" style={{ color: "#1A56DB" }}>{p.name}</h1>
            <p className="text-base text-gray-600 leading-relaxed mb-8">{p.intro}</p>
            <div className="flex flex-wrap gap-4">
              <a href="mailto:mark_tang@etia-tech.com?subject=Quote%20Request" className="px-6 py-3 rounded font-semibold text-white hover:opacity-90 transition-all" style={{ background: accent }}>{t({ en: "Request a Quote", zh: "获取报价" }, locale)}</a>
              <a href="mailto:mark_tang@etia-tech.com?subject=Engineering%20Inquiry" className="px-6 py-3 rounded font-semibold text-gray-700 border border-gray-300 hover:border-gray-500 transition-all">{t({ en: "Talk to an Engineer", zh: "咨询工程师" }, locale)}</a>
            </div>
          </div>
          {/* Product image */}
          <div className="rounded-2xl bg-white border border-gray-200 shadow-sm relative" style={{ height: "360px" }}>
            {productImage(p) ? (
              <Image src={productImage(p)} alt={p.name} fill sizes="(max-width: 1024px) 100vw, 40vw" className="object-contain p-6" priority />
            ) : (
              <span className="absolute inset-0 flex items-center justify-center text-lg font-bold" style={{ color: accent }}>{p.brand}</span>
            )}
          </div>
        </div>
      </section>

      {/* Features + Applications */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12">
          <div>
            <p className="text-xs font-semibold tracking-widest uppercase mb-2" style={{ color: "#44B549" }}>{t({ en: "Features", zh: "特点" }, locale)}</p>
            <h2 className="text-2xl font-bold mb-6" style={{ color: "#1A56DB" }}>{t({ en: "Key Features", zh: "核心特点" }, locale)}</h2>
            <ul className="space-y-3">
              {p.features.map((f) => (
                <li key={f} className="flex gap-3 text-sm text-gray-600 leading-relaxed">
                  <span className="mt-1 flex-shrink-0 w-4 h-4 rounded-full flex items-center justify-center text-white text-[10px]" style={{ background: accent }}>✓</span>
                  <span>{f}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-xs font-semibold tracking-widest uppercase mb-2" style={{ color: "#44B549" }}>{t({ en: "Applications", zh: "应用" }, locale)}</p>
            <h2 className="text-2xl font-bold mb-6" style={{ color: "#1A56DB" }}>{t({ en: "Where It's Used", zh: "应用场景" }, locale)}</h2>
            <ul className="space-y-3">
              {p.applications.map((a) => (
                <li key={a} className="flex gap-3 text-sm text-gray-600 leading-relaxed">
                  <span className="mt-1.5 flex-shrink-0 w-2 h-2 rounded-full" style={{ background: "#44B549" }} />
                  <span>{a}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Specifications */}
      <section className="py-16" style={{ background: "#f0f4f8" }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-semibold tracking-widest uppercase mb-2" style={{ color: "#44B549" }}>{t({ en: "Specifications", zh: "规格参数" }, locale)}</p>
          <h2 className="text-2xl font-bold mb-6" style={{ color: "#1A56DB" }}>{t({ en: "Technical Specifications", zh: "技术规格" }, locale)}</h2>
          <div className="rounded-2xl overflow-hidden border border-gray-200 bg-white">
            <table className="w-full text-sm">
              <tbody>
                {p.specs.map(([label, value], i) => (
                  <tr key={label} className={i % 2 === 1 ? "bg-gray-50" : "bg-white"}>
                    <td className="px-5 py-3 font-medium text-gray-700 align-top w-2/5">{label}</td>
                    <td className="px-5 py-3 text-gray-500">{value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-14" style={{ background: "#1A56DB" }}>
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">{t({ en: `Interested in the ${product.name.split(" ").slice(0, 3).join(" ")}?`, zh: "对该产品感兴趣?" }, locale)}</h2>
          <p className="text-gray-300 mb-8">{t({ en: "Our UV curing engineers will match the right configuration to your process — from selection to validation.", zh: "我们的UV固化工程师将为您的工艺匹配合适的配置——从选型到验证。" }, locale)}</p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="mailto:mark_tang@etia-tech.com?subject=Quote%20Request" className="px-8 py-3 rounded font-semibold text-white hover:opacity-90 transition-all" style={{ background: "#44B549" }}>{t({ en: "Request a Quote →", zh: "获取报价 →" }, locale)}</a>
            <Link href="/product/systems" className="px-8 py-3 rounded font-semibold text-white border border-white/30 hover:border-white/60 transition-all">{t({ en: "All Systems", zh: "全部系统" }, locale)}</Link>
          </div>
        </div>
      </section>
    </>
  );
}
