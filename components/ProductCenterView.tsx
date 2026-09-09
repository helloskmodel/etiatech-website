"use client";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import HeroBanner from "@/components/HeroBanner";
import { PAGE_BANNERS } from "@/components/caseStudies";
import FinalCta from "@/components/FinalCta";
import { inquiryMailto } from "@/components/contact";
import { useLocale, t } from "@/components/LocaleContext";
import { localizeHref } from "@/components/localeHref";
import { publishedProductCategories, productCategoryHref, categoryProducts, categoriesForBrand } from "@/components/productCategories";
import { brandLanding, type BrandSlug } from "@/components/brandLanding";
import { products, productImage } from "@/components/productCatalog";

// The four Excelitas brands ETIA distributes, in the order the customer wants
// them shown under "BY BRAND".
const BRAND_ORDER: BrandSlug[] = ["omnicure", "noblelight", "phoseon", "fusion-uv"];

/**
 * 产品中心 — the product centre. The single hub behind the PRODUCT menu,
 * offering both ways in: BY TECHNOLOGY (the light source a customer searches
 * for) and BY BRAND (the name they already trust).
 */
export default function ProductCenterView() {
  const { locale } = useLocale();

  return (
    <>
      {/* Hero */}
      <header className="relative overflow-hidden border-b border-[#D9E4EA] bg-gradient-to-br from-white via-[#EEF6FF] to-[#F1FAEF]">
        <HeroBanner src={PAGE_BANNERS.omnicure} />
        <div className="relative mx-auto max-w-7xl px-4 py-14 sm:px-6 md:py-20 lg:px-8">
          <p className="text-xs font-bold uppercase tracking-[.18em] text-[#41A62A]">
            {t({ en: "Product Centre", zh: "产品中心", th: "ศูนย์ผลิตภัณฑ์", vi: "Trung tâm sản phẩm" }, locale)}
          </p>
          <h1 className="mt-3 max-w-3xl text-3xl font-bold leading-tight text-[#143C96] md:text-5xl">
            {t(
              { en: "UV Curing & Industrial Light Sources", zh: "紫外固化与工业光源", th: "แหล่งกำเนิดแสง UV Curing และอุตสาหกรรม", vi: "Nguồn sáng UV Curing & công nghiệp" },
              locale
            )}
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-[#475467] md:text-lg">
            {t(
              {
                en: "Find your system by the light source technology you need, or by the brand you already run. Both routes land on the same engineers.",
                zh: "您可以按所需的光源技术查找设备，也可以按您正在使用的品牌查找。两条路径都由同一批工程师为您服务。",
              },
              locale
            )}
          </p>
        </div>
      </header>

      {/* BY TECHNOLOGY */}
      <section className="bg-white px-4 py-16 sm:px-6 lg:px-8 md:py-20">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs font-bold uppercase tracking-[.18em] text-[#41A62A]">
            {t({ en: "By Technology", zh: "按技术分类", th: "ตามเทคโนโลยี", vi: "Theo công nghệ" }, locale)}
          </p>
          <h2 className="mt-3 text-3xl font-bold text-[#143C96] md:text-4xl">
            {t({ en: "Choose your light source", zh: "选择您的光源", th: "เลือกแหล่งกำเนิดแสงของคุณ", vi: "Chọn nguồn sáng của bạn" }, locale)}
          </h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {publishedProductCategories.map((c) => {
              const count = categoryProducts(c.slug).length;
              return (
                <Link
                  key={c.slug}
                  href={localizeHref(productCategoryHref(c.slug), locale)}
                  className="group flex flex-col rounded-3xl border border-[#D9E4EA] bg-gradient-to-br from-white to-[#F7FAFC] p-7 transition hover:border-[#1A56DB]/40 hover:shadow-lg"
                >
                  <div className="mb-4 h-1.5 w-10 rounded" style={{ background: c.accent }} />
                  <h3 className="text-xl font-bold text-[#143C96]">{t(c.name, locale)}</h3>
                  <p className="mt-3 flex-1 text-sm leading-6 text-[#667085]">{t(c.tagline, locale)}</p>
                  <div className="mt-6 flex items-center justify-between">
                    <span className="inline-flex items-center gap-1.5 text-sm font-bold" style={{ color: c.accent }}>
                      {t({ en: "Explore", zh: "查看", th: "ดูเพิ่มเติม", vi: "Khám phá" }, locale)}
                      <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
                    </span>
                    {count > 0 && (
                      <span className="text-xs text-gray-400">
                        {count} {t({ en: "models", zh: "款", th: "รุ่น", vi: "model" }, locale)}
                      </span>
                    )}
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* BY BRAND */}
      <section className="bg-[#F7FAFC] px-4 py-16 sm:px-6 lg:px-8 md:py-20">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs font-bold uppercase tracking-[.18em] text-[#41A62A]">
            {t({ en: "By Brand", zh: "按品牌分类", th: "ตามแบรนด์", vi: "Theo thương hiệu" }, locale)}
          </p>
          <h2 className="mt-3 text-3xl font-bold text-[#143C96] md:text-4xl">
            {t({ en: "Authorized Excelitas brands", zh: "授权代理的 Excelitas 品牌", th: "แบรนด์ Excelitas ที่ได้รับอนุญาต", vi: "Các thương hiệu Excelitas được ủy quyền" }, locale)}
          </h2>
          <p className="mt-4 max-w-2xl text-sm leading-6 text-[#667085]">
            {t(
              {
                en: "Four brands that cross the technologies rather than map onto them — the chips on each card show which light sources that brand covers.",
                zh: "四个品牌横跨不同技术，并非与技术一一对应——每张卡片上的标签显示该品牌覆盖哪些光源。",
              },
              locale
            )}
          </p>
          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            {BRAND_ORDER.map((slug) => {
              const b = brandLanding[slug];
              const hero = products.find((p) => p.brandId === b.catalogBrandId && productImage(p));
              const count = products.filter((p) => p.brandId === b.catalogBrandId).length;
              const cats = categoriesForBrand(b.catalogBrandId);
              return (
                <Link
                  key={slug}
                  href={localizeHref(`/product/${slug}`, locale)}
                  className="group grid overflow-hidden rounded-3xl border border-[#D9E4EA] bg-white transition hover:border-[#1A56DB]/40 hover:shadow-lg sm:grid-cols-[1fr_.8fr]"
                >
                  <div className="p-7">
                    <div className="mb-3 h-1.5 w-10 rounded" style={{ background: b.color }} />
                    <h3 className="text-xl font-bold text-[#143C96]">{b.name}</h3>
                    <p className="mt-3 line-clamp-3 text-sm leading-6 text-[#667085]">
                      {t(b.intro, locale).split("\n\n")[0]}
                    </p>
                    {cats.length > 0 && (
                      <div className="mt-4 flex flex-wrap gap-1.5">
                        {cats.map((c) => (
                          <span
                            key={c.slug}
                            className="rounded-full border px-2.5 py-1 text-[11px] font-semibold"
                            style={{ borderColor: `${c.accent}55`, color: c.accent }}
                          >
                            {t(c.name, locale)}
                          </span>
                        ))}
                      </div>
                    )}
                    <div className="mt-6 flex items-center gap-3">
                      <span className="inline-flex items-center gap-1.5 text-sm font-bold" style={{ color: b.color }}>
                        {t({ en: "Explore", zh: "查看", th: "ดูเพิ่มเติม", vi: "Khám phá" }, locale)}
                        <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
                      </span>
                      <span className="text-xs text-gray-400">
                        {count} {t({ en: "models", zh: "款", th: "รุ่น", vi: "model" }, locale)}
                      </span>
                    </div>
                  </div>
                  <div className="relative min-h-44 bg-[#F7FAFC]">
                    {hero && (
                      <Image
                        src={productImage(hero)}
                        alt={`${b.name} UV curing system`}
                        fill
                        sizes="(max-width: 640px) 100vw, 40vw"
                        className="object-contain p-6 transition group-hover:scale-105"
                      />
                    )}
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <FinalCta
        heading={t(
          { en: "Not sure where to start?", zh: "不确定从哪里入手？", th: "ไม่แน่ใจว่าจะเริ่มตรงไหน?", vi: "Chưa biết bắt đầu từ đâu?" },
          locale
        )}
        body={t(
          {
            en: "Tell us the material, the joint and the line speed. Our engineers will specify the light source — you don't need to know the model number first.",
            zh: "告诉我们材料、接合部位与产线速度。工程师会为您确定光源方案——您无需先知道型号。",
          },
          locale
        )}
        primary={{
          label: t({ en: "Talk to an Engineer", zh: "咨询工程师", th: "ปรึกษาวิศวกร", vi: "Trao đổi với kỹ sư" }, locale),
          href: inquiryMailto(locale, { subject: "Sales Inquiry" }),
        }}
        secondary={{
          label: t({ en: "Browse by Industry", zh: "按行业浏览", th: "ดูตามอุตสาหกรรม", vi: "Xem theo ngành" }, locale),
          href: localizeHref("/applications", locale),
        }}
      />
    </>
  );
}
