"use client";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Download, FileText } from "lucide-react";
import HeroBanner from "@/components/HeroBanner";
import { PAGE_BANNERS } from "@/components/caseStudies";
import FinalCta from "@/components/FinalCta";
import { inquiryMailto } from "@/components/contact";
import { useLocale, t } from "@/components/LocaleContext";
import { localizeHref } from "@/components/localeHref";
import {
  productCategories,
  publishedProductCategories,
  productCategoryHref,
  categoryProducts,
  categoryModelGroups,
  type ProductCategorySlug,
} from "@/components/productCategories";
import { productHref, productImage, brandAccent, localizeProduct, productDocUrl } from "@/components/productCatalog";

/**
 * A "BY TECHNOLOGY" product category page — the light-source technology a
 * customer actually searches for (mercury lamp, UV LED, microwave, measurement,
 * infrared), with the catalog models that belong to it.
 *
 * A category still awaiting its product line-up (`contentPending` with no
 * models) renders the overview and an inquiry CTA rather than an empty grid —
 * we never invent specs to fill a page.
 */
// Stable anchor for a group heading, so the home page can link straight to a
// shelf rather than dropping the visitor at the top of a thirty-model page.
export function groupAnchor(titleEn: string): string {
  return titleEn.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

export default function ProductCategoryView({ slug }: { slug: ProductCategorySlug }) {
  const { locale } = useLocale();
  const c = productCategories[slug];
  const models = categoryProducts(slug);
  const modelGroups = categoryModelGroups(slug);
  // A draft category still lists the published ones, but never the reverse.
  const others = publishedProductCategories.filter((o) => o.slug !== slug);

  return (
    <>
      {/* Breadcrumb */}
      <div className="border-b border-gray-200 bg-white py-3">
        <div className="mx-auto max-w-7xl px-4 text-xs text-gray-400 sm:px-6 lg:px-8">
          <Link href={localizeHref("/product", locale)} className="hover:text-[#1A56DB]">
            {t({ en: "Products", zh: "产品中心", th: "ผลิตภัณฑ์", vi: "Sản phẩm" }, locale)}
          </Link>
          <span className="mx-2">›</span>
          <span style={{ color: c.accent }}>{t(c.name, locale)}</span>
        </div>
      </div>

      {/* Hero */}
      <header className="relative overflow-hidden border-b border-[#D9E4EA] bg-gradient-to-br from-white via-[#EEF6FF] to-[#F1FAEF]">
        <HeroBanner src={c.heroImage ?? PAGE_BANNERS.applications} />
        <div className="relative mx-auto max-w-7xl px-4 py-14 sm:px-6 md:py-20 lg:px-8">
          <p className="text-xs font-bold uppercase tracking-[.18em]" style={{ color: c.accent }}>
            {t({ en: "By Technology", zh: "按技术分类", th: "ตามเทคโนโลยี", vi: "Theo công nghệ" }, locale)}
          </p>
          <h1 className="mt-3 max-w-3xl text-3xl font-bold leading-tight text-[#143C96] md:text-5xl">
            {t(c.name, locale)}
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-[#475467] md:text-lg">{t(c.tagline, locale)}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={inquiryMailto(locale, { subject: "Engineering Inquiry", context: c.name.en })}
              className="inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-bold text-white transition hover:-translate-y-0.5"
              style={{ background: c.accent }}
            >
              {t({ en: "Talk to an Engineer", zh: "咨询工程师", th: "ปรึกษาวิศวกร", vi: "Trao đổi với kỹ sư" }, locale)}
              <ArrowRight className="h-4 w-4" />
            </a>
            <Link
              href={localizeHref("/applications", locale)}
              className="inline-flex items-center gap-2 rounded-xl border border-[#143C96]/25 px-6 py-3 text-sm font-bold text-[#143C96] transition hover:border-[#143C96]/60"
            >
              {t({ en: "Browse by Industry", zh: "按行业浏览", th: "ดูตามอุตสาหกรรม", vi: "Xem theo ngành" }, locale)}
            </Link>
          </div>
        </div>
      </header>

      {/* The catalogue leads. This page used to open with the overview and
          the selection guide, so a visitor met several screens of prose
          before the first product — on a phone, the grid was below the
          fold twice over. The prose still follows, for the visitor who
          wants it and for search; it simply no longer stands in front of
          the pictures. */}
      {/* Models */}
      <section className="bg-white px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="flex items-end justify-between gap-4">
            <h2 className="text-2xl font-bold text-[#143C96] md:text-3xl">
              {t({ en: "Systems & Models", zh: "产品型号", th: "ระบบและรุ่น", vi: "Hệ thống & model" }, locale)}
            </h2>
            {models.length > 0 && (
              <span className="text-xs text-gray-400">
                {models.length} {t({ en: "models", zh: "款", th: "รุ่น", vi: "model" }, locale)}
              </span>
            )}
          </div>

          {models.length > 0 ? (
            // Grouped when the category defines sub-headings — UV LED is 30
            // models, which stops being readable as one flat grid. Categories
            // without groups come back as a single untitled group, so there is
            // only ever one code path here.
            <div className="mt-8 space-y-10">
              {modelGroups.map((group, gi) => (
                <div key={group.title ? group.title.en : `rest-${gi}`} id={group.title ? groupAnchor(group.title.en) : undefined} className="scroll-mt-24">
                  {group.title && (
                    <div className="mb-4 flex items-baseline gap-3">
                      <h3 className="shrink-0 text-lg font-bold text-[#143C96]">{t(group.title, locale)}</h3>
                      <span className="h-px flex-1 bg-[#E6EAF0]" />
                      <span className="shrink-0 text-xs text-gray-400">
                        {group.items.length} {t({ en: "models", zh: "款", th: "รุ่น", vi: "model" }, locale)}
                      </span>
                    </div>
                  )}
                  <div className="grid grid-cols-2 gap-3 sm:gap-6 lg:grid-cols-3">
                    {group.items.map((raw) => {
                      const p = localizeProduct(raw, locale);
                      return (
                        <Link
                          key={p.slug}
                          href={productHref(p)}
                          className="group flex flex-col overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm transition-all hover:shadow-md"
                        >
                          <div className="relative h-32 overflow-hidden bg-gray-50 sm:h-56">
                            {productImage(p) ? (
                              <Image
                                src={productImage(p)}
                                alt={p.name}
                                fill
                                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                className="object-contain p-4 transition-transform duration-300 group-hover:scale-105"
                              />
                            ) : (
                              <span className="absolute inset-0 flex items-center justify-center px-3 text-center text-sm font-semibold" style={{ color: brandAccent[p.brandId] }}>
                                {p.brand}
                              </span>
                            )}
                            <span className="absolute left-2 top-2 rounded px-2 py-0.5 text-[10px] font-bold text-white" style={{ background: brandAccent[p.brandId] }}>
                              {p.brand}
                            </span>
                          </div>
                          {/* Name and nothing else. The blurb belongs on the
                              product page; in a grid of thirty it turned
                              browsing into reading. */}
                          <div className="flex flex-1 flex-col p-3 sm:p-4">
                            <h4 className="text-xs font-bold leading-snug text-[#1A56DB] sm:text-sm">{p.name}</h4>
                            <span className="mt-auto pt-2 text-[11px] font-semibold group-hover:underline sm:pt-3 sm:text-xs" style={{ color: brandAccent[p.brandId] }}>
                              {t({ en: "View details →", zh: "查看详情 →", th: "ดูรายละเอียด →", vi: "Xem chi tiết →" }, locale)}
                            </span>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            // No models published yet — invite the enquiry instead of showing
            // an empty grid or placeholder specs.
            <div className="mt-8 rounded-2xl border border-dashed border-[#D9E4EA] bg-[#F7FAFC] p-10 text-center">
              <p className="mx-auto max-w-xl text-base leading-7 text-[#475467]">
                {t(
                  {
                    en: "We size this equipment to the process rather than selling it from a shelf. Send us your temperature, line speed and product geometry and our engineers will specify it.",
                    zh: "这类设备我们按工艺选型，而非现货照单发货。请把您的工艺温度、产线速度与产品尺寸发给我们，工程师将为您确定方案。",
                  },
                  locale
                )}
              </p>
              <a
                href={inquiryMailto(locale, { subject: "Engineering Inquiry", context: c.name.en })}
                className="mt-6 inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-bold text-white transition hover:-translate-y-0.5"
                style={{ background: c.accent }}
              >
                {t({ en: "Request a Specification", zh: "索取选型方案", th: "ขอข้อมูลจำเพาะ", vi: "Yêu cầu cấu hình" }, locale)}
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          )}
        </div>
      </section>

      {/* Overview */}
      <section className="border-b border-gray-100 bg-white px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <p className="text-xs font-bold uppercase tracking-[.18em] text-[#41A62A]">
            {t({ en: "Overview", zh: "技术概述", th: "ภาพรวม", vi: "Tổng quan" }, locale)}
          </p>
          <h2 className="mt-3 text-2xl font-bold text-[#143C96] md:text-3xl">
            {t({ en: `About ${c.name.en}`, zh: `关于${c.name.zh ?? c.name.en}` }, locale)}
          </h2>
          <div className="mt-4 mb-6 h-1 w-12 rounded" style={{ background: c.accent }} />
          {c.intro.map((para, i) => (
            <p key={i} className="mb-4 text-base leading-7 text-[#475467] last:mb-0">
              {t(para, locale)}
            </p>
          ))}
        </div>
      </section>

      {/* Downloads — literature covering the whole category. */}
      {c.docs && c.docs.length > 0 && (
        <section className="border-t border-gray-100 bg-white px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl">
            <p className="text-xs font-bold uppercase tracking-[.18em] text-[#41A62A]">
              {t({ en: "Downloads", zh: "资料下载", th: "ดาวน์โหลด", vi: "Tải tài liệu" }, locale)}
            </p>
            <h2 className="mt-3 text-2xl font-bold text-[#143C96] md:text-3xl">
              {t({ en: "Brochures & Guides", zh: "产品手册与指南", th: "โบรชัวร์และคู่มือ", vi: "Tài liệu & hướng dẫn" }, locale)}
            </h2>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {c.docs.map((d) => (
                <a
                  key={d.file}
                  href={productDocUrl(d)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-4 rounded-xl border border-gray-200 bg-white px-5 py-4 transition-all hover:border-gray-400 hover:shadow-sm"
                >
                  <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-lg text-white" style={{ background: c.accent }}>
                    <FileText className="h-5 w-5" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-sm font-semibold text-gray-800">{t(d.kind, locale)}</span>
                    <span className="block text-xs text-gray-400">
                      {t({ en: "PDF · opens in a new tab", zh: "PDF · 新标签页打开", th: "PDF · เปิดในแท็บใหม่", vi: "PDF · mở trong tab mới" }, locale)}
                    </span>
                  </span>
                  <Download className="h-4 w-4 flex-shrink-0 text-gray-300 transition-colors group-hover:text-gray-600" />
                </a>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Typical applications */}
      {c.applications.length > 0 && (
        <section className="border-t border-gray-100 bg-white px-4 pb-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <h2 className="text-2xl font-bold text-[#143C96] md:text-3xl">
              {t({ en: "Typical applications", zh: "典型应用", th: "การใช้งานทั่วไป", vi: "Ứng dụng điển hình" }, locale)}
            </h2>
            <div className="mt-6 flex flex-wrap gap-3">
              {c.applications.map((a, i) => (
                <span key={i} className="rounded-full border border-[#D9E4EA] bg-[#F7FAFC] px-4 py-2 text-sm font-medium text-[#475467]">
                  {t(a, locale)}
                </span>
              ))}
            </div>

            {c.gallery && c.gallery.length > 0 && (
              <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                {c.gallery.map((g) => (
                  <figure key={g.src} className="overflow-hidden rounded-2xl border border-[#D9E4EA] bg-white">
                    <div className="relative aspect-[4/3] bg-[#F7FAFC]">
                      <Image src={g.src} alt={t(g.caption, locale)} fill sizes="(max-width: 640px) 100vw, 25vw" className="object-cover" />
                    </div>
                    <figcaption className="px-4 py-3 text-xs leading-5 text-[#667085]">{t(g.caption, locale)}</figcaption>
                  </figure>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {/* Other technologies */}
      <section className="border-t border-gray-100 bg-[#F7FAFC] px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-2xl font-bold text-[#143C96] md:text-3xl">
            {t({ en: "Other technologies", zh: "其他技术品类", th: "เทคโนโลยีอื่น", vi: "Công nghệ khác" }, locale)}
          </h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {others.map((o) => (
              <Link
                key={o.slug}
                href={localizeHref(productCategoryHref(o.slug), locale)}
                className="group rounded-2xl border border-[#D9E4EA] bg-white p-6 transition hover:border-[#1A56DB]/40 hover:shadow-md"
              >
                <div className="mb-3 h-1 w-8 rounded" style={{ background: o.accent }} />
                <h3 className="text-base font-bold text-[#143C96]">{t(o.name, locale)}</h3>
                <span className="mt-4 inline-flex items-center gap-1 text-xs font-bold text-[#41A62A]">
                  {t({ en: "View", zh: "查看", th: "ดู", vi: "Xem" }, locale)} <ArrowRight className="h-3.5 w-3.5" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <FinalCta
        heading={t(
          { en: "Not sure which system fits your process?", zh: "不确定哪套系统适合您的工艺？", th: "ไม่แน่ใจว่าระบบใดเหมาะกับกระบวนการของคุณ?", vi: "Chưa chắc hệ thống nào phù hợp với quy trình của bạn?" },
          locale
        )}
        body={t(
          { en: "Send us the adhesive datasheet, the joint geometry and the line speed. Our engineers will come back with a specified system, not a catalogue.", zh: "把胶水技术资料、接合部位尺寸与产线速度发给我们。工程师会回复一套确定的选型方案，而不是一本样本。", th: "ส่งข้อมูลกาว รูปทรงรอยต่อ และความเร็วสายการผลิตมาให้เรา วิศวกรของเราจะตอบกลับด้วยระบบที่ระบุชัดเจน", vi: "Gửi cho chúng tôi thông số kỹ thuật keo, hình dạng mối nối và tốc độ dây chuyền. Kỹ sư của chúng tôi sẽ đề xuất cấu hình cụ thể." },
          locale
        )}
        primary={{
          label: t({ en: "Talk to an Engineer", zh: "咨询工程师", th: "ปรึกษาวิศวกร", vi: "Trao đổi với kỹ sư" }, locale),
          href: inquiryMailto(locale, { subject: "Engineering Inquiry", context: c.name.en }),
        }}
        secondary={{
          label: t({ en: "Browse by Industry", zh: "按行业浏览", th: "ดูตามอุตสาหกรรม", vi: "Xem theo ngành" }, locale),
          href: localizeHref("/applications", locale),
        }}
      />
    </>
  );
}
