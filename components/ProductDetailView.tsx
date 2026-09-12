"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { FileText, Download } from "lucide-react";
import { brandGroupName, productImage, productHref, products, localizeProduct, productTagline, techRouteFor, productDocs, productDocUrl, type Product } from "@/components/productCatalog";
import { inquiryMailto } from "@/components/contact";
import FinalCta from "@/components/FinalCta";
import { localizeSpecLabel } from "@/components/specLabels.zh";
import { useLocale, t } from "@/components/LocaleContext";
import RelatedApplications from "@/components/RelatedApplications";
import AddToInquiryButton from "@/components/inquiry/AddToInquiryButton";
import PartPicker from "@/components/inquiry/PartPicker";
import { partsForModel } from "@/components/omnicureParts";
import { consumablesHref, machineBySlug, machineForProduct } from "@/components/consumables";

/** One line, one job: name the section. No eyebrow, no rule, no product name. */
function SectionHead({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-xl md:text-2xl font-bold mb-5" style={{ color: "#1A56DB" }}>
      {children}
    </h2>
  );
}

/** Rows of the spec table shown before the reader asks for the rest. */
const SPEC_PREVIEW = 6;

const brandPageSlug: Record<Product["brandId"], string> = {
  omnicure: "omnicure",
  phoseon: "phoseon",
  fusionuv: "fusion-uv",
  noblelight: "noblelight",
};

// Unified standard product template. Section order is fixed for every catalog
// product: Hero / Key Benefits / Specifications / Part numbers / (Documents) /
// Ideal Applications / Application Notes / Related Products / CTA.
// Applications sit at the bottom, right above the application-note links, so
// the top of the page stays focused on the product itself.
//
// Two things this template used to do, and no longer does. It printed the
// specifications twice — the first six as cards under "At a Glance", then all
// of them again as a table — which on 27 of the catalogue's products meant two
// sections with identical content. And every section wore the same heavy shell:
// 64px of padding top and bottom, a green eyebrow, a heading that spelled out
// the product's full name again, and a green rule. Measured on a phone, that
// shell cost 287px to deliver twelve words. One spec block now, one heading per
// section, and the section's name rather than the product's — the reader worked
// out what product they were looking at in the hero.
export default function ProductDetailView({ product, accent }: { product: Product; accent: string }) {
  const { locale } = useLocale();
  const [allSpecs, setAllSpecs] = useState(false);
  const p = localizeProduct(product, locale);
  const docs = productDocs[product.slug] ?? [];
  // The heading names the product, so it has to be the product's name. Taking
  // the first three words made "OmniCure S2000 Elite" out of both the system
  // and its filter cartridges — five pairs of products ended up with the same
  // heading. Drop only the part-number tail the name carries after a dash.
  const shortName = p.name.split(" — ")[0];
  // The related block is the brand group, so it is named after the group. A
  // product's own brand is not the same thing: ETIA's light guides sit in the
  // OmniCure group, and "More ETIA Systems" over four OmniCure lamps is wrong.
  const groupName = brandGroupName[product.brandId];
  // Where this model's wear parts, their service life and their replacement
  // signs live. Not every product has one — only the machines ETIA services.
  const consumablesMachine = machineBySlug.get(machineForProduct[product.slug] ?? "");
  // An accessory page (a light guide, a filter, an adapter) draws on one part
  // family and is not a machine. Calling its table "Lamps, Light Guides & Part
  // Numbers" put the word "lamp" at the top of a page that sells no lamp.
  const accessoryParts = (partsForModel[product.slug]?.length ?? 0) === 1;
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
              <AddToInquiryButton item={{ kind: "product", slug: product.slug }} accent={accent} size="lg" />
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
        <section className="py-10" style={{ background: "#f0f4f8" }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHead>{t({ en: "Key Benefits", zh: "核心优势", th: "ประโยชน์หลัก", vi: "Lợi ích chính" }, locale)}</SectionHead>
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

      {/* 3 · Specifications — the whole table, six rows at a time.
          Six is what the old "At a Glance" cards showed, and for 27 products
          that is already everything; the rest open on request rather than
          unrolling nineteen rows nobody asked for. */}
      {p.specs.length > 0 && (
        <section className="py-10 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHead>{t({ en: "Specifications", zh: "规格参数", th: "ข้อมูลจำเพาะ", vi: "Thông số kỹ thuật" }, locale)}</SectionHead>
            <div className="rounded-2xl overflow-hidden border border-gray-200 bg-white">
              <table className="w-full text-sm">
                <tbody>
                  {(allSpecs ? p.specs : p.specs.slice(0, SPEC_PREVIEW)).map(([label, value], i) => (
                    <tr key={label} className={i % 2 === 1 ? "bg-gray-50" : "bg-white"}>
                      <td className="px-5 py-3 font-medium text-gray-700 align-top w-2/5">{localizeSpecLabel(label, locale)}</td>
                      <td className="px-5 py-3 text-gray-500">{value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {p.specs.length > SPEC_PREVIEW && !allSpecs && (
              <button
                type="button"
                onClick={() => setAllSpecs(true)}
                className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-[#1A56DB] hover:underline"
              >
                {t(
                  {
                    en: `Show all ${p.specs.length} specifications`,
                    zh: `展开全部 ${p.specs.length} 项规格`,
                    th: `ดูข้อมูลจำเพาะทั้งหมด ${p.specs.length} รายการ`,
                    vi: `Xem toàn bộ ${p.specs.length} thông số`,
                  },
                  locale
                )}
                <span aria-hidden>↓</span>
              </button>
            )}
          </div>
        </section>
      )}

      {/* Part numbers the catalogue lists for this model (OmniCure only) */}
      {partsForModel[product.slug] && (
        <section className="py-10 bg-white border-t border-gray-100">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-xl md:text-2xl font-bold mb-2" style={{ color: "#1A56DB" }}>
              {accessoryParts
                ? t({ en: "Part Numbers for This Product", zh: "本产品料号", th: "หมายเลขชิ้นส่วนของผลิตภัณฑ์นี้", vi: "Mã linh kiện của sản phẩm này" }, locale)
                : t({ en: "Lamps, Light Guides & Part Numbers", zh: "灯泡、导光管与料号", th: "หลอด ท่อนำแสง & หมายเลขชิ้นส่วน", vi: "Đèn, ống dẫn sáng & mã linh kiện" }, locale)}
            </h2>
            <p className="text-sm text-gray-600 mb-6">
              {accessoryParts
                ? t({ en: "Every size the catalogue lists for this product. Pick the one you need — the part number is filled in — and add it to your inquiry.", zh: "目录里为这个产品列出的全部规格。选中需要的那一条，料号自动带出，直接加进询单。", th: "ทุกขนาดที่แคตตาล็อกระบุสำหรับผลิตภัณฑ์นี้ เลือกรายการที่ต้องการ หมายเลขชิ้นส่วนจะถูกกรอกให้ แล้วเพิ่มลงในรายการสอบถาม", vi: "Mọi kích thước catalogue liệt kê cho sản phẩm này. Chọn mục bạn cần — mã linh kiện tự điền — rồi thêm vào yêu cầu." }, locale)
                : t({ en: "Everything the catalogue lists for this model. Pick by what it is — the part number is filled in — and add it to your inquiry with the system.", zh: "目录里给这个机型列的全部配件。按用途逐项选，料号自动带出，和整机一起加进询单。", th: "ทุกอย่างที่แคตตาล็อกระบุสำหรับรุ่นนี้ เลือกตามสิ่งที่เป็น หมายเลขชิ้นส่วนจะถูกกรอกให้ แล้วเพิ่มลงในรายการสอบถามพร้อมกับระบบ", vi: "Mọi thứ catalogue liệt kê cho mẫu này. Chọn theo mô tả — mã linh kiện tự điền — rồi thêm vào yêu cầu cùng hệ thống." }, locale)}
            </p>
            <PartPicker families={partsForModel[product.slug]} model={product.slug} heading={false} />
            {consumablesMachine && (
              <Link
                href={consumablesHref(consumablesMachine.slug)}
                className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-[#1A56DB] hover:underline"
              >
                {t(
                  {
                    en: `Service life and replacement signs for ${consumablesMachine.name} consumables`,
                    zh: `${consumablesMachine.name} 耗材的使用寿命与更换判断`,
                    th: `อายุใช้งานและสัญญาณการเปลี่ยนวัสดุสิ้นเปลืองของ ${consumablesMachine.name}`,
                    vi: `Tuổi thọ và dấu hiệu thay thế vật tư cho ${consumablesMachine.name}`,
                  },
                  locale
                )}
                <span aria-hidden>→</span>
              </Link>
            )}
          </div>
        </section>
      )}

      {/* Documents & Downloads (optional) */}
      {docs.length > 0 && (
        <section className="py-10 bg-white border-t border-gray-100">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHead>{t({ en: "Brochures & Guides", zh: "产品手册与指南", th: "โบรชัวร์และคู่มือ", vi: "Tài liệu & hướng dẫn" }, locale)}</SectionHead>
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
        <section className="py-10 bg-white border-t border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHead>{t({ en: "Ideal Applications", zh: "理想应用", th: "การใช้งานที่เหมาะสม", vi: "Ứng dụng lý tưởng" }, locale)}</SectionHead>
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
        <section className="py-10 bg-white border-t border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHead>{t({ en: `More ${groupName} Systems`, zh: `更多 ${groupName} 系统`, th: `ระบบ ${groupName} เพิ่มเติม`, vi: `Thêm hệ thống ${groupName}` }, locale)}</SectionHead>
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
