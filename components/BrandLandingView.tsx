"use client";
import Link from "next/link";
import Image from "next/image";
import { products, productHref, productImage, localizeProduct, productHighlights, popularityRank, techRouteFor } from "@/components/productCatalog";
import { brandLanding, type BrandSlug } from "@/components/brandLanding";
import { LAMP, LAMP_PATHS } from "@/components/omnicure/s2000Lamp";
import HeroBackdrop from "@/components/HeroBackdrop";
import { heroBannerImages } from "@/components/caseStudies";
import WhyEtiaCards from "@/components/WhyEtiaCards";
import { inquiryMailto } from "@/components/contact";
import { useLocale, t } from "@/components/LocaleContext";
import { APPLICATION_CATEGORIES, getApplicationsForProduct } from "@/data/applicationsData";
import OmniCureBrandLanding from "@/components/OmniCureBrandLanding";
import PhoseonBrandLanding from "@/components/PhoseonBrandLanding";

// Number of top products (per brand) that get the "Popular" badge.
const POPULAR_COUNT = 2;

// Mirrors the sequence in the current OmniCure UV Curing Product Catalog:
// lamp spot systems → LED spot systems → area systems → fiber system.
const OMNICURE_CATALOG_ORDER = [
  "s2000-elite", "s1500-pro", "r2000", "s-series-light-guides",
  "lx500", "v3-led-heads", "ls200",
  "ac2", "ac4", "ac5", "ac7", "ac8", "ac8-hd", "ac9225", "ac9225-f",
  "s2e-network-module",
];

// Short technology tag shown on each product card (English + Chinese).
const tagZh: Record<string, string> = {
  "UV Lamp Spot": "UV 灯式点固化",
  "UV LED Spot": "UV LED 点固化",
  "UV Radiometer": "UV 辐射计",
  "S-Series Accessory": "S 系列配件",
  "Small-Area": "小面积",
  "Large-Area": "大面积",
  "Large-Area · High-Dose": "大面积 · 高剂量",
  "UV Spot Curing": "UV 点固化",
  "Air-Cooled UV LED Curing": "风冷 UV LED",
  "Water-Cooled UV LED Area Curing": "水冷 UV LED 面固化",
  "Microwave UV Curing": "微波 UV 固化",
};

export default function BrandLandingView({ slug }: { slug: BrandSlug }) {
  const { locale } = useLocale();
  const b = brandLanding[slug];
  // Keep the generic brand renderer available for the other Excelitas brands;
  // OmniCure uses its dedicated decision-page experience.
  if ((slug as string) === "omnicure") return <OmniCureBrandLanding />;
  if ((slug as string) === "phoseon") return <PhoseonBrandLanding />;
  // Flat shop grid ordered by popularity (best-selling first), not by technology.
  const brandProducts = products
    .filter((p) => p.brandId === b.catalogBrandId)
    .sort((a, c) => {
      if (slug !== "omnicure") return popularityRank(a.slug) - popularityRank(c.slug);
      const ai = OMNICURE_CATALOG_ORDER.indexOf(a.slug);
      const ci = OMNICURE_CATALOG_ORDER.indexOf(c.slug);
      return (ai === -1 ? 999 : ai) - (ci === -1 ? 999 : ci);
    });
  const brandApplications = Array.from(
    new Map(
      brandProducts.flatMap((product) => getApplicationsForProduct(product.slug)).map((application) => [application.slug, application])
    ).values()
  );

  return (
    <>
      {/* Breadcrumb */}
      <div className="border-b border-gray-200 py-3 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-xs text-gray-400">
          <Link href="/product" className="hover:text-[#1A56DB]">{t({ en: "Products", zh: "产品" }, locale)}</Link>
          <span className="mx-2">›</span>
          <span style={{ color: b.color }}>{b.name}</span>
        </div>
      </div>

      {/* Hero */}
      <section className="py-16 md:py-24 relative overflow-hidden" style={{ background: "linear-gradient(135deg, #1A56DB 0%, #123C94 100%)" }}>
        <HeroBackdrop images={heroBannerImages} />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="mb-4">
              <span className="inline-block text-[11px] font-bold px-2.5 py-1 rounded-full text-white" style={{ background: "#44B549" }}>{t({ en: "Authorized Distributor", zh: "授权代理商" }, locale)}</span>
            </div>
            {b.hero && (
              <p className="text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: "#44B549" }}>{t(b.hero.eyebrow, locale)}</p>
            )}
            <h1 className={`text-3xl md:text-5xl font-bold leading-tight text-white ${b.hero ? "mb-4" : "mb-6"}`}>
              {b.hero
                ? t(b.hero.headline, locale).split("\n").map((line, i, arr) => (
                    <span key={i}>
                      {arr.length > 1 && i === arr.length - 1 ? <span style={{ color: "#44B549" }}>{line}</span> : line}
                      {i < arr.length - 1 && <br />}
                    </span>
                  ))
                : `${b.name} ${t({ en: "UV Curing Systems", zh: "UV 固化系统" }, locale)}`}
            </h1>
            {b.hero && (
              <p className="text-base md:text-lg text-gray-200 leading-relaxed mb-6 max-w-2xl">{t(b.hero.subline, locale)}</p>
            )}
            <div className="flex flex-wrap gap-4">
              <a href={inquiryMailto(locale, { subject: "Engineering Inquiry", context: b.name })} className="px-6 py-3 rounded font-semibold text-white hover:opacity-90 transition-all" style={{ background: b.color }}>{t({ en: "Talk to an Engineer →", zh: "咨询工程师 →" }, locale)}</a>
              <Link href="/application" className="px-6 py-3 rounded font-semibold text-white border border-white/30 hover:border-white/60 transition-all">{t({ en: "Browse by Application →", zh: "按应用浏览 →" }, locale)}</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Overview — brand body copy */}
      <section className="py-16 bg-white border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-semibold tracking-widest uppercase mb-2" style={{ color: "#44B549" }}>{t({ en: "Overview", zh: "品牌概述" }, locale)}</p>
          <h2 className="text-2xl md:text-3xl font-bold mb-4" style={{ color: b.color }}>{t({ en: `About ${b.name}`, zh: `关于 ${b.name}` }, locale)}</h2>
          <div className="w-12 h-1 rounded mb-6" style={{ background: "#44B549" }} />
          {t(b.intro, locale).split("\n\n").map((para, i) => (
            <p key={i} className="text-base text-gray-600 leading-relaxed mb-4 last:mb-0">{para}</p>
          ))}
        </div>
      </section>

      {/* Technology routes */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-semibold tracking-widest uppercase mb-2" style={{ color: "#44B549" }}>{t({ en: "Products", zh: "产品" }, locale)}</p>
          <h2 className="text-2xl md:text-3xl font-bold mb-2" style={{ color: "#1A56DB" }}>{t({ en: slug === "omnicure" ? "OmniCure UV Curing Product Catalog" : `Shop ${b.name} Systems`, zh: slug === "omnicure" ? "OmniCure UV 固化产品清单" : `${b.name} 全系产品` }, locale)}</h2>
          <p className="mb-8 text-sm text-gray-500">{t({ en: slug === "omnicure" ? "Lamp and LED spot curing, small- and large-area UV LED systems, fiber curing, radiometry, and accessories." : "Browse systems by product and technology.", zh: slug === "omnicure" ? "涵盖灯式与 LED 点固化、小面积与大面积 UV LED、光纤固化、辐射测量及配件。" : "按产品与技术浏览系统。" }, locale)}</p>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {brandProducts.map((raw, i) => {
              const p = localizeProduct(raw, locale);
              const tags = productHighlights[p.slug] ?? [];
              const popular = i < POPULAR_COUNT;
              const relatedApplications = getApplicationsForProduct(p.slug, 2);
              return (
                <div key={p.slug} className="rounded-xl border border-gray-100 overflow-hidden bg-white flex flex-col group hover:shadow-md hover:border-gray-200 transition-all">
                  <Link href={productHref(p)} className="relative block h-32 sm:h-36 bg-white">
                    {popular && (
                      <span className="absolute top-2 left-2 z-10 text-[9px] font-bold px-2 py-0.5 rounded-full text-white" style={{ background: "#44B549" }}>★ {t({ en: "POPULAR", zh: "热门" }, locale)}</span>
                    )}
                    {productImage(p) ? (
                      <Image src={productImage(p)} alt={p.name} fill sizes="(max-width: 640px) 50vw, 25vw" className="object-contain p-3 group-hover:scale-105 transition-transform duration-300" />
                    ) : (
                      <span className="absolute inset-0 flex items-center justify-center text-sm font-semibold text-center px-3" style={{ color: b.color }}>{p.brand}</span>
                    )}
                  </Link>
                  <div className="p-4 flex flex-col flex-1 border-t border-gray-50">
                    {(() => {
                      // Canonical technology route (one of the six). Accessories
                      // (no curing route) fall back to their short sub label.
                      const r = techRouteFor(p);
                      const label = r ? t(r, locale) : (locale === "zh" ? tagZh[p.sub || p.tech] ?? (p.sub || p.tech) : (p.sub || p.tech));
                      return label ? (
                        <span className="inline-block self-start text-[9px] font-bold uppercase tracking-wide px-2 py-0.5 rounded mb-2" style={{ background: `${b.color}12`, color: b.color }}>
                          {label}
                        </span>
                      ) : null;
                    })()}
                    <Link href={productHref(p)} className="font-bold text-[13px] leading-snug text-gray-800 mb-2 line-clamp-3 hover:text-[#1A56DB]">{p.name}</Link>
                    {tags.length > 0 && (
                      <div className="flex flex-wrap gap-1 mb-3">
                        {tags.slice(0, 3).map((h) => (
                          <span key={h} className="text-[10px] font-medium px-2 py-0.5 rounded-full border" style={{ borderColor: `${b.color}30`, color: b.color, background: `${b.color}0a` }}>{h}</span>
                        ))}
                      </div>
                    )}
                    {relatedApplications.length > 0 && (
                      <div className="mb-3 border-t border-gray-100 pt-3">
                        <p className="mb-1 text-[9px] font-bold uppercase tracking-wide text-[#44B549]">Related applications</p>
                        {relatedApplications.map((application) => <Link key={application.slug} href={`/applications/${application.slug}`} className="block line-clamp-1 text-[10px] font-medium leading-relaxed text-gray-500 hover:text-[#1A56DB] hover:underline">{application.title}</Link>)}
                      </div>
                    )}
                    <Link href={productHref(p)} className="mt-auto text-xs font-semibold hover:underline" style={{ color: b.color }}>{t({ en: "View details →", zh: "查看详情 →" }, locale)}</Link>
                  </div>
                </div>
              );
            })}

            {/* Consumable — OmniCure S2000 Elite replacement lamp (links to the SEM landing page) */}
            {slug === "omnicure" && (
              <Link href={LAMP_PATHS.en} className="rounded-xl border border-gray-100 overflow-hidden bg-white flex flex-col group hover:shadow-md hover:border-gray-200 transition-all">
                <div className="relative h-32 sm:h-36 bg-white">
                  <span className="absolute top-2 left-2 z-10 text-[9px] font-bold px-2 py-0.5 rounded-full text-white" style={{ background: "#0d9488" }}>{t({ en: "CONSUMABLE", zh: "耗材" }, locale)}</span>
                  <Image src={LAMP.heroImage} alt={LAMP.name} fill sizes="(max-width: 640px) 50vw, 25vw" className="object-contain p-3 group-hover:scale-105 transition-transform duration-300" />
                </div>
                <div className="p-4 flex flex-col flex-1 border-t border-gray-50">
                  <span className="inline-block self-start text-[9px] font-bold uppercase tracking-wide px-2 py-0.5 rounded mb-2" style={{ background: `${b.color}12`, color: b.color }}>
                    {t({ en: "Replacement Lamp", zh: "替换灯管" }, locale)}
                  </span>
                  <h3 className="font-bold text-[13px] leading-snug text-gray-800 mb-2 line-clamp-3">{LAMP.name}</h3>
                  <div className="flex flex-wrap gap-1 mb-3">
                    {["012-64000R", "200W", t({ en: "Genuine", zh: "原厂正品" }, locale)].map((h) => (
                      <span key={h} className="text-[10px] font-medium px-2 py-0.5 rounded-full border" style={{ borderColor: `${b.color}30`, color: b.color, background: `${b.color}0a` }}>{h}</span>
                    ))}
                  </div>
                  <span className="mt-auto text-xs font-semibold group-hover:underline" style={{ color: b.color }}>{t({ en: "View details →", zh: "查看详情 →" }, locale)}</span>
                </div>
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* Typical applications */}
      <section className="py-14" style={{ background: "#f0f4f8" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-semibold tracking-widest uppercase mb-2" style={{ color: "#44B549" }}>{t({ en: "Typical Applications", zh: "典型应用行业" }, locale)}</p>
          <h2 className="text-2xl md:text-3xl font-bold mb-6" style={{ color: "#1A56DB" }}>{t({ en: "Where It's Used", zh: "应用领域" }, locale)}</h2>
          <div className="flex flex-wrap gap-3">
            {b.applications.map((a) => (
              <Link key={a.en} href="/application" className="text-sm font-semibold px-4 py-2 rounded-full border border-gray-200 bg-white text-gray-700 hover:border-[#1A56DB] hover:text-[#1A56DB] transition-all">
                {t(a, locale)} →
              </Link>
            ))}
          </div>
        </div>
      </section>

      {brandApplications.length > 0 && (
        <section className="border-t border-gray-100 bg-white py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-[#44B549]">Application Case Studies</p>
            <h2 className="text-2xl font-bold text-[#1A56DB] md:text-3xl">{b.name} applications by industry</h2>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-gray-500">Explore practical applications connected to the recommended {b.name} systems, including the customer challenge, solution, benefits, and ETIA support.</p>
            <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {APPLICATION_CATEGORIES.map((category) => {
                const categoryApplications = brandApplications.filter((application) => application.industryCategory === category);
                if (!categoryApplications.length) return null;
                return (
                  <div key={category} className="rounded-xl border border-gray-200 bg-[#f8fafc] p-5">
                    <div className="mb-4 flex items-center justify-between gap-3">
                      <h3 className="text-sm font-bold text-[#1A56DB]">{category}</h3>
                      <span className="rounded-full bg-white px-2 py-1 text-[10px] font-bold text-gray-400">{categoryApplications.length}</span>
                    </div>
                    <div className="space-y-2.5">
                      {categoryApplications.map((application) => (
                        <Link key={application.slug} href={`/applications/${application.slug}`} className="block text-xs font-medium leading-relaxed text-gray-600 hover:text-[#1A56DB] hover:underline">
                          {application.title} →
                        </Link>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
            <Link href="/applications" className="mt-8 inline-block text-sm font-semibold text-[#1A56DB] hover:underline">Browse all application case studies →</Link>
          </div>
        </section>
      )}

      {/* Why buy through ETIA */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-semibold tracking-widest uppercase mb-2" style={{ color: "#44B549" }}>{t({ en: "Why ETIA", zh: "为何选择 ETIA" }, locale)}</p>
          <h2 className="text-2xl md:text-3xl font-bold mb-8" style={{ color: "#1A56DB" }}>{t({ en: `Why Buy ${b.name} Through ETIA`, zh: `为什么通过 ETIA 采购 ${b.name}` }, locale)}</h2>
          <WhyEtiaCards />
        </div>
      </section>

      {/* CTA */}
      <section className="py-14" style={{ background: "#1A56DB" }}>
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">{t({ en: `Need help selecting a ${b.name} system?`, zh: `需要帮助挑选 ${b.name} 系统?` }, locale)}</h2>
          <p className="text-gray-300 mb-8">{t({ en: "Our UV curing engineers will match the right configuration to your process — from selection to validation.", zh: "我们的 UV 固化工程师将为您的工艺匹配合适的配置——从选型到验证。" }, locale)}</p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href={inquiryMailto(locale, { subject: "Sales Inquiry", context: b.name })} className="px-8 py-3 rounded font-semibold text-white hover:opacity-90 transition-all" style={{ background: "#44B549" }}>{t({ en: "Talk to Our Sales →", zh: "联系我们的销售 →" }, locale)}</a>
            <Link href="/product" className="px-8 py-3 rounded font-semibold text-white border border-white/30 hover:border-white/60 transition-all">{t({ en: "All Products", zh: "全部产品" }, locale)}</Link>
          </div>
        </div>
      </section>
    </>
  );
}
