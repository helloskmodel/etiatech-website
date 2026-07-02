"use client";
import Link from "next/link";
import Image from "next/image";
import { products, technologies, productHref, productImage, localizeProduct, productHighlights } from "@/components/productCatalog";
import { brandLanding, type BrandSlug } from "@/components/brandLanding";
import WhyEtiaCards from "@/components/WhyEtiaCards";
import { useLocale, t } from "@/components/LocaleContext";

const techZh: Record<string, string> = {
  "UV Spot Curing": "UV 点固化",
  "UV Lamp Spot Curing": "UV 灯式点固化",
  "UV LED Spot Curing": "UV LED 点固化",
  "Water-Cooled UV LED Area Curing": "水冷式 UV LED 面固化",
  "Air-Cooled UV LED Curing": "风冷式 UV LED 固化",
  "Microwave UV Curing": "微波 UV 固化",
};

// Within "UV Spot Curing", split into the two commercial routes — lamp-based
// (S-Series + its radiometer/accessories) vs UV LED (LX-Series). Other
// technologies stay as a single group.
function routeGroups(brandProducts: import("@/components/productCatalog").Product[]) {
  const groups: { label: string; items: typeof brandProducts }[] = [];
  for (const tech of technologies) {
    const inTech = brandProducts.filter((p) => p.tech === tech);
    if (!inTech.length) continue;
    if (tech === "UV Spot Curing") {
      const isLed = (p: (typeof inTech)[number]) => /LED/i.test(p.sub ?? "");
      const lamp = inTech.filter((p) => !isLed(p));
      const led = inTech.filter((p) => isLed(p));
      if (lamp.length) groups.push({ label: "UV Lamp Spot Curing", items: lamp });
      if (led.length) groups.push({ label: "UV LED Spot Curing", items: led });
    } else {
      groups.push({ label: tech, items: inTech });
    }
  }
  return groups;
}

export default function BrandLandingView({ slug }: { slug: BrandSlug }) {
  const { locale } = useLocale();
  const b = brandLanding[slug];
  const techLabel = (tech: string) => (locale === "zh" ? techZh[tech] ?? tech : tech);
  const brandProducts = products.filter((p) => p.brandId === b.catalogBrandId);

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
      <section className="py-14 border-b border-gray-200" style={{ background: "#f1f5f9" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-11 h-11 rounded-xl flex items-center justify-center text-white text-xl font-bold flex-shrink-0" style={{ background: b.color }}>{b.logo}</div>
              <span className="text-[11px] font-bold px-2.5 py-1 rounded-full text-white" style={{ background: "#44B549" }}>{t({ en: "Authorized Distributor", zh: "授权代理商" }, locale)}</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold leading-tight mb-2" style={{ color: b.color }}>{b.name} {t({ en: "UV Curing Systems", zh: "UV 固化系统" }, locale)}</h1>
            <p className="text-sm font-semibold mb-4" style={{ color: "#44B549" }}>{t(b.tagline, locale)}</p>
            <p className="text-base text-gray-600 leading-relaxed mb-6">{t(b.intro, locale)}</p>
            <div className="flex flex-wrap gap-4">
              <a href="mailto:mark_tang@etia-tech.com?subject=Engineering%20Inquiry" className="px-6 py-3 rounded font-semibold text-white hover:opacity-90 transition-all" style={{ background: b.color }}>{t({ en: "Talk to an Engineer →", zh: "咨询工程师 →" }, locale)}</a>
              <Link href="/application" className="px-6 py-3 rounded font-semibold text-gray-700 border border-gray-300 hover:border-gray-500 transition-all">{t({ en: "Browse by Application →", zh: "按应用浏览 →" }, locale)}</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Technology routes */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-semibold tracking-widest uppercase mb-2" style={{ color: "#44B549" }}>{t({ en: "Products", zh: "产品" }, locale)}</p>
          <h2 className="text-2xl md:text-3xl font-bold mb-8" style={{ color: "#1A56DB" }}>{t({ en: `Shop ${b.name} Systems`, zh: `${b.name} 全系产品` }, locale)}</h2>
          <div className="space-y-12">
            {routeGroups(brandProducts).map((g) => {
              const group = g.items;
              return (
                <div key={g.label}>
                  <div className="flex items-center gap-3 mb-5">
                    <span className="inline-block text-xs font-bold px-3 py-1 rounded text-white" style={{ background: b.color }}>{techLabel(g.label).toUpperCase()}</span>
                    <span className="text-xs text-gray-400">{group.length} {t({ en: "systems", zh: "款系统" }, locale)}</span>
                  </div>
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    {group.map((raw) => {
                      const p = localizeProduct(raw, locale);
                      const tags = productHighlights[p.slug] ?? [];
                      return (
                        <Link key={p.slug} href={productHref(p)} className="rounded-xl border border-gray-100 overflow-hidden bg-white flex flex-col group hover:shadow-md hover:border-gray-200 transition-all">
                          <div className="relative h-32 sm:h-36 bg-white">
                            {productImage(p) ? (
                              <Image src={productImage(p)} alt={p.name} fill sizes="(max-width: 640px) 50vw, 25vw" className="object-contain p-3 group-hover:scale-105 transition-transform duration-300" />
                            ) : (
                              <span className="absolute inset-0 flex items-center justify-center text-sm font-semibold text-center px-3" style={{ color: b.color }}>{p.brand}</span>
                            )}
                          </div>
                          <div className="p-4 flex flex-col flex-1 border-t border-gray-50">
                            <h3 className="font-bold text-[13px] leading-snug text-gray-800 mb-2 line-clamp-3">{p.name}</h3>
                            {tags.length > 0 && (
                              <div className="flex flex-wrap gap-1 mb-3">
                                {tags.slice(0, 3).map((h) => (
                                  <span key={h} className="text-[10px] font-medium px-2 py-0.5 rounded-full border" style={{ borderColor: `${b.color}30`, color: b.color, background: `${b.color}0a` }}>{h}</span>
                                ))}
                              </div>
                            )}
                            <span className="mt-auto text-xs font-semibold group-hover:underline" style={{ color: b.color }}>{t({ en: "View details →", zh: "查看详情 →" }, locale)}</span>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              );
            })}
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
            <a href="mailto:mark_tang@etia-tech.com?subject=Sales%20Inquiry" className="px-8 py-3 rounded font-semibold text-white hover:opacity-90 transition-all" style={{ background: "#44B549" }}>{t({ en: "Talk to Our Sales →", zh: "联系我们的销售 →" }, locale)}</a>
            <Link href="/product" className="px-8 py-3 rounded font-semibold text-white border border-white/30 hover:border-white/60 transition-all">{t({ en: "All Products", zh: "全部产品" }, locale)}</Link>
          </div>
        </div>
      </section>
    </>
  );
}
