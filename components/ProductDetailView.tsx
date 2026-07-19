"use client";
import Link from "next/link";
import Image from "next/image";
import { FileText, Download } from "lucide-react";
import { productImage, productHref, products, localizeProduct, productTagline, techRouteFor, productDocs, productDocUrl, type Product } from "@/components/productCatalog";
import { inquiryMailto } from "@/components/contact";
import FinalCta from "@/components/FinalCta";
import { localizeSpecLabel } from "@/components/specLabels.zh";
import { useLocale, t } from "@/components/LocaleContext";
import RelatedApplications from "@/components/RelatedApplications";

const brandPageSlug: Record<Product["brandId"], string> = {
  omnicure: "omnicure",
  phoseon: "phoseon",
  fusionuv: "fusion-uv",
  noblelight: "noblelight",
};

// Unified standard product template. Section order is fixed for every catalog
// product: Hero / Key Benefits / Technical Overview / Specifications /
// (Documents) / Ideal Applications / Application Notes / Related Products / CTA.
// Applications sit at the bottom, right above the application-note links, so
// the top of the page stays focused on the product itself.
export default function ProductDetailView({ product, accent }: { product: Product; accent: string }) {
  const { locale } = useLocale();
  const p = localizeProduct(product, locale);
  const docs = productDocs[product.slug] ?? [];
  const shortName = product.name.split(" ").slice(0, 3).join(" ");
  const related = products
    .filter((x) => x.brandId === product.brandId && x.slug !== product.slug)
    .slice(0, 4)
    .map((x) => localizeProduct(x, locale));

  return (
    <>
      {/* Breadcrumb */}
      <div className="border-b border-gray-200 py-3 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-xs text-gray-400">
          <Link href="/product" className="hover:text-[#1A56DB]">{t({ en: "Products", zh: "产品", th: "ผลิตภัณฑ์", vi: "Sản phẩm" }, locale)}</Link>
          <span className="mx-2">›</span>
          <Link href="/product/systems" className="hover:text-[#1A56DB]">{t({ en: "All Systems", zh: "全部系统", th: "ระบบทั้งหมด", vi: "Tất cả hệ thống" }, locale)}</Link>
          <span className="mx-2">›</span>
          <span style={{ color: accent }}>{p.name}</span>
        </div>
      </div>

      {/* 1 · Hero */}
      <section className="py-12 relative overflow-hidden border-b border-gray-200" style={{ background: "#f1f5f9" }}>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <Link href={`/product/${brandPageSlug[product.brandId]}`} className="text-[11px] font-bold px-2.5 py-1 rounded text-white hover:opacity-90 transition-opacity" style={{ background: accent }}>{p.brand} →</Link>
              {(() => {
                const r = techRouteFor(product);
                return <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full border border-gray-300 text-gray-600">{r ? t(r, locale) : p.tech}</span>;
              })()}
            </div>
            <h1 className="text-3xl md:text-4xl font-bold leading-tight mb-3" style={{ color: "#1A56DB" }}>{p.name}</h1>
            {productTagline[product.slug] && (
              <p className="text-lg md:text-xl font-semibold leading-snug mb-4" style={{ color: accent }}>{t(productTagline[product.slug], locale)}</p>
            )}
            <p className="text-base text-gray-600 leading-relaxed mb-8 max-w-xl">{p.intro}</p>
            <div className="flex flex-wrap gap-4">
              <a href={inquiryMailto(locale, { subject: "Engineering Inquiry", context: product.name })} className="px-6 py-3 rounded font-semibold text-white hover:opacity-90 transition-all" style={{ background: accent }}>{t({ en: "Talk to an Engineer", zh: "咨询工程师", th: "ปรึกษาวิศวกร", vi: "Trao đổi với kỹ sư" }, locale)}</a>
              <a href={inquiryMailto(locale, { subject: "Datasheet Request", context: product.name })} className="px-6 py-3 rounded font-semibold text-gray-700 border border-gray-300 hover:border-gray-500 transition-all">⬇ {t({ en: "Request Datasheet", zh: "索取数据表", th: "ขอเอกสารข้อมูล", vi: "Yêu cầu bảng dữ liệu" }, locale)}</a>
            </div>
          </div>
          <div className="rounded-2xl bg-white border border-gray-200 shadow-sm relative" style={{ height: "360px" }}>
            {productImage(p) ? (
              <Image src={productImage(p)} alt={p.name} fill sizes="(max-width: 1024px) 100vw, 40vw" className="object-contain p-6" priority />
            ) : (
              <span className="absolute inset-0 flex items-center justify-center text-lg font-bold" style={{ color: accent }}>{p.brand}</span>
            )}
          </div>
        </div>
      </section>

      {/* 2 · Key Benefits */}
      {p.features.length > 0 && (
        <section className="py-16" style={{ background: "#f0f4f8" }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-xs font-semibold tracking-widest uppercase mb-2" style={{ color: "#44B549" }}>{t({ en: "Key Benefits", zh: "核心优势", th: "ประโยชน์หลัก", vi: "Lợi ích chính" }, locale)}</p>
            <h2 className="text-2xl md:text-3xl font-bold mb-2" style={{ color: "#1A56DB" }}>{t({ en: `Why Choose the ${shortName}`, zh: "为何选择该产品", th: `เหตุใดจึงเลือก ${shortName}`, vi: `Vì sao chọn ${shortName}` }, locale)}</h2>
            <div className="w-12 h-1 rounded mb-8" style={{ background: "#44B549" }} />
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {p.features.map((f, i) => (
                <div key={f} className="rounded-xl p-5 border border-gray-100 bg-white">
                  <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg mb-3 text-white text-sm font-bold" style={{ background: accent }}>{i + 1}</span>
                  <p className="text-sm text-gray-600 leading-relaxed">{f}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 3 · Technical Overview */}
      {p.specs.length > 0 && (
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-xs font-semibold tracking-widest uppercase mb-2" style={{ color: "#44B549" }}>{t({ en: "Technical Overview", zh: "技术概览", th: "ภาพรวมทางเทคนิค", vi: "Tổng quan kỹ thuật" }, locale)}</p>
            <h2 className="text-2xl md:text-3xl font-bold mb-2" style={{ color: "#1A56DB" }}>{t({ en: "At a Glance", zh: "关键参数一览", th: "โดยสรุป", vi: "Tổng quan nhanh" }, locale)}</h2>
            <div className="w-12 h-1 rounded mb-8" style={{ background: "#44B549" }} />
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {p.specs.slice(0, 6).map(([label, value]) => (
                <div key={label} className="rounded-xl border border-gray-100 bg-gray-50 p-5">
                  <p className="text-xs font-semibold uppercase tracking-wide text-gray-400 mb-1">{localizeSpecLabel(label, locale)}</p>
                  <p className="text-sm font-bold leading-snug" style={{ color: "#1A56DB" }}>{value}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 4 · Specifications */}
      {p.specs.length > 0 && (
        <section className="py-16" style={{ background: "#f0f4f8" }}>
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-xs font-semibold tracking-widest uppercase mb-2" style={{ color: "#44B549" }}>{t({ en: "Specifications", zh: "规格参数", th: "ข้อมูลจำเพาะ", vi: "Thông số kỹ thuật" }, locale)}</p>
            <h2 className="text-2xl md:text-3xl font-bold mb-6" style={{ color: "#1A56DB" }}>{t({ en: "Technical Specifications", zh: "技术规格", th: "ข้อมูลจำเพาะทางเทคนิค", vi: "Thông số kỹ thuật chi tiết" }, locale)}</h2>
            <div className="rounded-2xl overflow-hidden border border-gray-200 bg-white">
              <table className="w-full text-sm">
                <tbody>
                  {p.specs.map(([label, value], i) => (
                    <tr key={label} className={i % 2 === 1 ? "bg-gray-50" : "bg-white"}>
                      <td className="px-5 py-3 font-medium text-gray-700 align-top w-2/5">{localizeSpecLabel(label, locale)}</td>
                      <td className="px-5 py-3 text-gray-500">{value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      )}

      {/* Documents & Downloads (optional) */}
      {docs.length > 0 && (
        <section className="py-16 bg-white border-t border-gray-100">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-xs font-semibold tracking-widest uppercase mb-2" style={{ color: "#44B549" }}>{t({ en: "Documents", zh: "资料下载", th: "เอกสาร", vi: "Tài liệu" }, locale)}</p>
            <h2 className="text-2xl md:text-3xl font-bold mb-6" style={{ color: "#1A56DB" }}>{t({ en: "Brochures & Guides", zh: "产品手册与指南", th: "โบรชัวร์และคู่มือ", vi: "Tài liệu & hướng dẫn" }, locale)}</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {docs.map((d) => (
                <a key={d.file} href={productDocUrl(d)} target="_blank" rel="noopener noreferrer" className="group flex items-center gap-4 rounded-xl border border-gray-200 bg-white px-5 py-4 hover:border-gray-400 hover:shadow-sm transition-all">
                  <span className="flex-shrink-0 w-11 h-11 rounded-lg flex items-center justify-center text-white" style={{ background: accent }}>
                    <FileText className="w-5 h-5" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-sm font-semibold text-gray-800">{t(d.kind, locale)}</span>
                    <span className="block text-xs text-gray-400">{t({ en: "PDF · opens in a new tab", zh: "PDF · 新标签页打开", th: "PDF · เปิดในแท็บใหม่", vi: "PDF · mở trong tab mới" }, locale)}</span>
                  </span>
                  <Download className="w-4 h-4 text-gray-300 group-hover:text-gray-600 flex-shrink-0 transition-colors" />
                </a>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 5 · Ideal Applications */}
      {p.applications.length > 0 && (
        <section className="py-14 bg-white border-t border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-xs font-semibold tracking-widest uppercase mb-2" style={{ color: "#44B549" }}>{t({ en: "Best For", zh: "适用场景", th: "เหมาะสำหรับ", vi: "Phù hợp cho" }, locale)}</p>
            <h2 className="text-2xl md:text-3xl font-bold mb-2" style={{ color: "#1A56DB" }}>{t({ en: "Ideal Applications", zh: "理想应用", th: "การใช้งานที่เหมาะสม", vi: "Ứng dụng lý tưởng" }, locale)}</h2>
            <div className="w-12 h-1 rounded mb-6" style={{ background: "#44B549" }} />
            <div className="flex flex-wrap gap-2.5">
              {p.applications.map((a) => (
                <span key={a} className="text-sm font-semibold px-4 py-2 rounded-full border" style={{ borderColor: `${accent}33`, color: accent, background: `${accent}0d` }}>{a}</span>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 6 · Application Notes (internal links to application case studies) */}
      <RelatedApplications productSlug={product.slug} />

      {/* 7 · Related Products */}
      {related.length > 0 && (
        <section className="py-16 bg-white border-t border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-xs font-semibold tracking-widest uppercase mb-2" style={{ color: "#44B549" }}>{t({ en: "Related Products", zh: "相关产品", th: "ผลิตภัณฑ์ที่เกี่ยวข้อง", vi: "Sản phẩm liên quan" }, locale)}</p>
            <h2 className="text-2xl md:text-3xl font-bold mb-8" style={{ color: "#1A56DB" }}>{t({ en: `More ${p.brand} Systems`, zh: `更多 ${p.brand} 系统`, th: `ระบบ ${p.brand} เพิ่มเติม`, vi: `Thêm hệ thống ${p.brand}` }, locale)}</h2>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {related.map((x) => (
                <Link key={x.slug} href={productHref(x)} className="group rounded-2xl border border-gray-100 bg-white overflow-hidden hover:-translate-y-1 hover:shadow-md hover:border-[#1A56DB]/30 transition-all">
                  <div className="relative h-40 bg-gray-50 border-b border-gray-100">
                    {productImage(x) ? (
                      <Image src={productImage(x)} alt={x.name} fill sizes="(max-width: 640px) 100vw, 25vw" className="object-contain p-4" />
                    ) : (
                      <span className="absolute inset-0 flex items-center justify-center font-bold" style={{ color: accent }}>{x.brand}</span>
                    )}
                  </div>
                  <div className="p-4">
                    <p className="text-[10px] font-bold uppercase tracking-wide text-gray-400">{x.tech}</p>
                    <h3 className="mt-1 text-sm font-bold leading-snug text-[#102A43] group-hover:text-[#1A56DB]">{x.name}</h3>
                    <span className="mt-3 inline-block text-xs font-semibold" style={{ color: accent }}>{t({ en: "View product →", zh: "查看产品 →", th: "ดูผลิตภัณฑ์ →", vi: "Xem sản phẩm →" }, locale)}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 8 · CTA */}
      <FinalCta
        heading={t({ en: `Interested in the ${shortName}?`, zh: "对该产品感兴趣?", th: `สนใจ ${shortName} หรือไม่?`, vi: `Quan tâm đến ${shortName}?` }, locale)}
        body={t({ en: "Our UV curing engineers will match the right configuration to your process — from selection to validation.", zh: "我们的UV Curing 紫外线固化工程师将为您的工艺匹配合适的配置——从选型到验证。", th: "วิศวกร UV Curing ของเราจะจับคู่การกำหนดค่าที่เหมาะสมกับกระบวนการของคุณ — ตั้งแต่การเลือกจนถึงการตรวจสอบยืนยัน", vi: "Kỹ sư UV curing của chúng tôi sẽ chọn cấu hình phù hợp cho quy trình của bạn — từ lựa chọn đến kiểm định." }, locale)}
        primary={{ label: t({ en: "Talk to an Engineer", zh: "咨询工程师", th: "ปรึกษาวิศวกร", vi: "Trao đổi với kỹ sư" }, locale), href: inquiryMailto(locale, { subject: "Engineering Inquiry", context: product.name }) }}
        secondary={{ label: t({ en: "All Systems", zh: "全部系统", th: "ระบบทั้งหมด", vi: "Tất cả hệ thống" }, locale), href: "/product/systems" }}
      />
    </>
  );
}
