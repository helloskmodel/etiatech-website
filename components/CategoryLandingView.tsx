"use client";
import Link from "next/link";
import Image from "next/image";
import {
  productsInCategory,
  productHref,
  productImage,
  localizeProduct,
  productHighlights,
  techRouteFor,
  brandAccent,
  brandRouteSlug,
} from "@/components/productCatalog";
import type { ProductCategory } from "@/components/productCategories";
import HeroBackdrop from "@/components/HeroBackdrop";
import { heroBannerImages } from "@/components/caseStudies";
import WhyEtiaCards from "@/components/WhyEtiaCards";
import FinalCta from "@/components/FinalCta";
import { inquiryMailto } from "@/components/contact";
import { useLocale, t } from "@/components/LocaleContext";
import { getApplicationsForProduct } from "@/data/applicationsData";
import { applicationsZh } from "@/data/applicationsData.zh";

// Category pages are entry points for buyers searching by light source, so the
// accent is the site blue rather than a brand colour — a category spans brands.
const ACCENT = "#1A56DB";
const GREEN = "#41A62A";

// Applications shown under the grid, deduped across every product in the
// category. Capped so a 29-product category doesn't dump 40 links on the page.
const MAX_APPLICATIONS = 12;

export default function CategoryLandingView({ category }: { category: ProductCategory }) {
  const { locale } = useLocale();
  const items = productsInCategory(category.id);

  const applications = Array.from(
    new Map(
      items
        .flatMap((p) => getApplicationsForProduct(p.slug))
        .map((a) => [a.slug, a]),
    ).values(),
  ).slice(0, MAX_APPLICATIONS);

  // Brands represented in this category — buyers who arrive by light source
  // often still want to jump to a brand they already run on the line.
  const brands = Array.from(new Map(items.map((p) => [p.brandId, p])).values());

  return (
    <>
      {/* Breadcrumb */}
      <div className="border-b border-gray-200 py-3 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-xs text-gray-400">
          <Link href="/product" className="hover:text-[#1A56DB]">{t({ en: "Products", zh: "产品" }, locale)}</Link>
          <span className="mx-2">›</span>
          <span style={{ color: ACCENT }}>{t(category.label, locale)}</span>
        </div>
      </div>

      {/* Hero */}
      <section className="py-16 md:py-24 relative overflow-hidden" style={{ background: "linear-gradient(135deg, #1A56DB 0%, #123C94 100%)" }}>
        <HeroBackdrop images={heroBannerImages} />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="mb-4">
              <span className="inline-block text-[11px] font-bold px-2.5 py-1 rounded-full text-white" style={{ background: GREEN }}>
                {t({ en: "Supplied & Supported by ETIA", zh: "ETIA 供应与支持", th: "จัดหาและสนับสนุนโดย ETIA", vi: "Cung cấp & hỗ trợ bởi ETIA" }, locale)}
              </span>
            </div>
            <p className="text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: GREEN }}>
              {t({ en: "Product Category", zh: "产品中心", th: "หมวดผลิตภัณฑ์", vi: "Danh mục sản phẩm" }, locale)}
            </p>
            <h1 className="text-3xl md:text-5xl font-bold leading-tight text-white mb-4">{t(category.label, locale)}</h1>
            <p className="text-base md:text-lg text-gray-200 leading-relaxed mb-6 max-w-2xl">{t(category.blurb, locale)}</p>
            <div className="flex flex-wrap gap-4">
              <a
                href={inquiryMailto(locale, { subject: "Engineering Inquiry", context: category.label.en })}
                className="px-6 py-3 rounded font-semibold text-white hover:opacity-90 transition-all"
                style={{ background: GREEN }}
              >
                {t({ en: "Talk to an Engineer →", zh: "咨询工程师 →" }, locale)}
              </a>
              <Link href="/applications" className="px-6 py-3 rounded font-semibold text-white border border-white/30 hover:border-white/60 transition-all">
                {t({ en: "Browse by Application →", zh: "按应用浏览 →" }, locale)}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Product grid — or an enquiry panel for a category we don't stock yet */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-semibold tracking-widest uppercase mb-2" style={{ color: GREEN }}>{t({ en: "Products", zh: "产品" }, locale)}</p>
          <h2 className="text-2xl md:text-3xl font-bold mb-2" style={{ color: ACCENT }}>
            {t({ en: `${category.label.en} Systems`, zh: `${category.label.zh}系列产品` }, locale)}
          </h2>

          {items.length === 0 ? (
            <div className="mt-6 rounded-xl border border-gray-200 bg-[#f8fafc] p-8 max-w-3xl">
              <p className="text-sm leading-relaxed text-gray-600 mb-5">
                {t(
                  {
                    en: "We are finalising the product line-up for this category. Tell us your process — line speed, working width, target temperature and substrate — and an ETIA engineer will come back with the systems that fit.",
                    zh: "该品类产品线正在整理中。把您的工艺条件告诉我们 —— 线速、有效幅宽、目标温度与基材 —— ETIA 工程师会为您匹配合适的机型。",
                  },
                  locale,
                )}
              </p>
              <a
                href={inquiryMailto(locale, { subject: "Engineering Inquiry", context: category.label.en })}
                className="inline-block px-6 py-3 rounded font-semibold text-white hover:opacity-90 transition-all"
                style={{ background: GREEN }}
              >
                {t({ en: "Send us your requirements →", zh: "发送您的需求 →" }, locale)}
              </a>
            </div>
          ) : (
            <>
              <p className="mb-8 text-sm text-gray-500">
                {t({ en: `${items.length} systems available through ETIA.`, zh: `ETIA 可供 ${items.length} 款机型。` }, locale)}
              </p>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {items.map((raw) => {
                  const p = localizeProduct(raw, locale);
                  const tags = productHighlights[p.slug] ?? [];
                  const color = brandAccent[p.brandId];
                  const route = techRouteFor(p);
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
                        {route && (
                          <span className="inline-block self-start text-[9px] font-bold uppercase tracking-wide px-2 py-0.5 rounded mb-2" style={{ background: `${color}12`, color }}>
                            {t(route, locale)}
                          </span>
                        )}
                        <Link href={productHref(p)} className="font-bold text-[13px] leading-snug text-gray-800 mb-2 line-clamp-3 hover:text-[#1A56DB]">{p.name}</Link>
                        {tags.length > 0 && (
                          <div className="flex flex-wrap gap-1 mb-3">
                            {tags.slice(0, 3).map((h) => (
                              <span key={h.en} className="text-[10px] font-medium px-2 py-0.5 rounded-full border" style={{ borderColor: `${color}30`, color, background: `${color}0a` }}>{t(h, locale)}</span>
                            ))}
                          </div>
                        )}
                        <Link href={productHref(p)} className="mt-auto text-xs font-semibold hover:underline" style={{ color }}>{t({ en: "View details →", zh: "查看详情 →" }, locale)}</Link>
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </div>
      </section>

      {/* Brands in this category */}
      {brands.length > 0 && (
        <section className="py-14" style={{ background: "#f0f4f8" }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-xs font-semibold tracking-widest uppercase mb-2" style={{ color: GREEN }}>{t({ en: "Brands", zh: "品牌" }, locale)}</p>
            <h2 className="text-2xl md:text-3xl font-bold mb-6" style={{ color: ACCENT }}>
              {t({ en: "Brands in this category", zh: "该品类涵盖的品牌" }, locale)}
            </h2>
            <div className="flex flex-wrap gap-3">
              {brands.map((p) => (
                <Link
                  key={p.brandId}
                  href={`/product/${brandRouteSlug[p.brandId]}`}
                  className="text-sm font-semibold px-4 py-2 rounded-full border border-gray-200 bg-white text-gray-700 hover:border-[#1A56DB] hover:text-[#1A56DB] transition-all"
                >
                  {p.brand} →
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Applications these systems are used for */}
      {applications.length > 0 && (
        <section className="border-t border-gray-100 bg-white py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <p className="mb-2 text-xs font-semibold uppercase tracking-widest" style={{ color: GREEN }}>
              {t({ en: "Applications", zh: "典型应用" }, locale)}
            </p>
            <h2 className="text-2xl md:text-3xl font-bold mb-6" style={{ color: ACCENT }}>
              {t({ en: "What these systems are used for", zh: "这些系统用在哪里" }, locale)}
            </h2>
            <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
              {applications.map((a) => {
                const title = (locale !== "en" && applicationsZh[a.slug]?.title?.[locale as "zh" | "th" | "vi"]) || a.title;
                return (
                  <Link
                    key={a.slug}
                    href={`/applications/${a.slug}`}
                    className="rounded-lg border border-gray-200 bg-[#f8fafc] px-4 py-3 text-xs font-medium leading-relaxed text-gray-600 hover:border-[#1A56DB] hover:text-[#1A56DB] transition-all"
                  >
                    {title} →
                  </Link>
                );
              })}
            </div>
            <Link href="/applications" className="mt-8 inline-block text-sm font-semibold hover:underline" style={{ color: ACCENT }}>
              {t({ en: "Browse all applications →", zh: "浏览全部应用 →" }, locale)}
            </Link>
          </div>
        </section>
      )}

      {/* Why buy through ETIA */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-semibold tracking-widest uppercase mb-2" style={{ color: GREEN }}>{t({ en: "Why ETIA", zh: "为何选择 ETIA" }, locale)}</p>
          <h2 className="text-2xl md:text-3xl font-bold mb-8" style={{ color: ACCENT }}>
            {t({ en: "Why Buy Through ETIA", zh: "为什么通过 ETIA 采购" }, locale)}
          </h2>
          <WhyEtiaCards />
        </div>
      </section>

      <FinalCta
        heading={t({ en: `Need help selecting a ${category.label.en.toLowerCase()} system?`, zh: `需要帮助挑选${category.label.zh}?` }, locale)}
        body={t({
          en: "Our UV curing engineers will match the right configuration to your process — from selection to validation.",
          zh: "我们的 UV Curing 紫外线固化工程师将为您的工艺匹配合适的配置——从选型到验证。",
        }, locale)}
        primary={{ label: t({ en: "Talk to an Engineer", zh: "咨询工程师" }, locale), href: inquiryMailto(locale, { subject: "Sales Inquiry", context: category.label.en }) }}
        secondary={{ label: t({ en: "All Products", zh: "全部产品" }, locale), href: "/product" }}
      />
    </>
  );
}
