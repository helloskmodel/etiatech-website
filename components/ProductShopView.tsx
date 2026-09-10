"use client";
import { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Clock } from "lucide-react";
import { useLocale, t, type LangText } from "@/components/LocaleContext";
import { localizeHref } from "@/components/localeHref";
import { products, productImage, productHref, type Product } from "@/components/productCatalog";
import { publishedProductCategories, productCategories, categoryProducts, type ProductCategorySlug } from "@/components/productCategories";
import { brandLanding, type BrandSlug } from "@/components/brandLanding";
import { LIGHT_SOURCES, type LightSource } from "@/components/lightSources";
import { groupAnchor } from "@/components/ProductCategoryView";
import AddToInquiryButton from "@/components/inquiry/AddToInquiryButton";
import { useInquiry } from "@/components/inquiry/InquiryContext";

// The product centre as a shop. Every published model on one page, filtered
// by the brand a customer already runs and by the light source they need;
// each card adds to the inquiry basket, and the basket is sent as one list.
// ETIA answers within 24 hours — that promise sits at the top, where the
// customer decides whether it is worth their while.
//
// The home page already walks a visitor in by light source, industry and
// brand; this page does not repeat those rows. It is the shelf.

const BRAND_ORDER: BrandSlug[] = ["omnicure", "noblelight", "phoseon", "fusion-uv"];

// A light-source chip selects the products of its category, narrowed to one
// shelf where the chip points at an anchor (the three UV LED sources).
function matcher(ls: LightSource): (p: Product) => boolean {
  const [path, anchor] = ls.href.split("#");
  const slug = path.split("/").pop() as ProductCategorySlug;
  const cat = productCategories[slug];
  if (!cat) return () => false;
  if (!anchor || !cat.groups) return cat.match;
  const group = cat.groups.find((g) => groupAnchor(g.title.en) === anchor);
  return group ? (p) => cat.match(p) && group.match(p) : cat.match;
}

const ALL: LangText = { en: "All", zh: "全部", th: "ทั้งหมด", vi: "Tất cả" };

export default function ProductShopView() {
  const { locale } = useLocale();
  const { count, ready } = useInquiry();
  const [brand, setBrand] = useState<BrandSlug | "all">("all");
  const [source, setSource] = useState<number | "all">("all");

  const matchers = useMemo(() => LIGHT_SOURCES.map(matcher), []);
  // The shelf runs in light-source order — lamp spot systems first, the way
  // ETIA sells — and within a source in the order its category page shows
  // (systems before their radiometers). A model no source claims goes last
  // rather than missing.
  const published = useMemo(() => {
    const seen = new Set<string>();
    const out: Product[] = [];
    LIGHT_SOURCES.forEach((ls, i) => {
      const slug = ls.href.split("#")[0].split("/").pop() as ProductCategorySlug;
      for (const p of categoryProducts(slug)) {
        if (!seen.has(p.slug) && matchers[i](p)) {
          seen.add(p.slug);
          out.push(p);
        }
      }
    });
    for (const p of products) {
      if (!seen.has(p.slug) && publishedProductCategories.some((c) => c.match(p))) {
        seen.add(p.slug);
        out.push(p);
      }
    }
    return out;
  }, [matchers]);

  const shown = useMemo(() => {
    let list = published;
    if (brand !== "all") list = list.filter((p) => p.brandId === brandLanding[brand].catalogBrandId);
    if (source !== "all") list = list.filter(matchers[source]);
    return list;
  }, [published, brand, source, matchers]);

  const chip = (active: boolean) =>
    `shrink-0 rounded-full border px-3 py-1.5 text-xs font-bold transition ${
      active ? "text-white" : "bg-white text-[#143C96] hover:border-[#143C96]"
    }`;
  const chipStyle = (active: boolean, accent = "#143C96") =>
    active ? { background: accent, borderColor: accent } : { borderColor: "#D9E4EA" };

  return (
    <div className="bg-white text-[#102038]">
      {/* Header: what this page is, and the promise */}
      <section className="border-b border-[#D9E4EA] bg-gradient-to-br from-white via-[#EEF6FF] to-[#F1FAEF] px-4 pt-10 pb-8 sm:px-6 lg:px-8 md:pt-14 md:pb-10">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs font-bold uppercase tracking-[.18em] text-[#41A62A]">
            {t({ en: "Inquiry shop", zh: "询单商城", th: "ร้านสอบถาม", vi: "Gian hàng báo giá" }, locale)}
          </p>
          <h1 className="mt-2 text-3xl font-bold text-[#143C96] md:text-4xl">
            {t({ en: "Pick what you need. We reply within 24 hours.", zh: "选好你要的，24 小时内回复。", th: "เลือกสิ่งที่ต้องการ เราตอบกลับภายใน 24 ชั่วโมง", vi: "Chọn thứ bạn cần. Chúng tôi phản hồi trong 24 giờ." }, locale)}
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-[#667085] md:text-base">
            {t(
              {
                en: "Add systems, lamps and part numbers to one inquiry and send it once. A sales engineer — not a mailbox — answers with pricing, lead time and a recommendation.",
                zh: "把设备、灯泡、料号加进同一张询单，一次发出。回复你的是销售工程师，不是自动邮箱——报价、交期和选型建议一并给到。",
                th: "เพิ่มระบบ หลอด และหมายเลขชิ้นส่วนลงในรายการสอบถามเดียวแล้วส่งครั้งเดียว วิศวกรฝ่ายขายจะตอบพร้อมราคา ระยะเวลาส่งมอบ และคำแนะนำ",
                vi: "Thêm hệ thống, đèn và mã linh kiện vào một yêu cầu rồi gửi một lần. Kỹ sư bán hàng — không phải hộp thư tự động — trả lời kèm giá, thời gian giao và khuyến nghị.",
              },
              locale
            )}
          </p>
          <p className="mt-4 inline-flex items-center gap-2 rounded-full border border-[#41A62A]/30 bg-white px-3 py-1.5 text-xs font-bold text-[#41A62A]">
            <Clock className="h-4 w-4" />
            {t({ en: "Sales engineer reply within 24 hours", zh: "销售工程师 24 小时内回复", th: "วิศวกรฝ่ายขายตอบกลับภายใน 24 ชั่วโมง", vi: "Kỹ sư bán hàng phản hồi trong 24 giờ" }, locale)}
          </p>
        </div>
      </section>

      {/* Filters */}
      <section className="sticky top-16 z-30 border-b border-[#D9E4EA] bg-white/95 px-4 py-3 backdrop-blur sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl space-y-2">
          <div className="flex items-center gap-2 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            <span className="shrink-0 text-[10px] font-bold uppercase tracking-[.14em] text-[#667085]">
              {t({ en: "Brand", zh: "品牌", th: "แบรนด์", vi: "Thương hiệu" }, locale)}
            </span>
            <button type="button" className={chip(brand === "all")} style={chipStyle(brand === "all")} onClick={() => setBrand("all")}>{t(ALL, locale)}</button>
            {BRAND_ORDER.map((b) => (
              <button key={b} type="button" className={chip(brand === b)} style={chipStyle(brand === b, brandLanding[b].color)} onClick={() => setBrand(b)}>
                {brandLanding[b].name}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            <span className="shrink-0 text-[10px] font-bold uppercase tracking-[.14em] text-[#667085]">
              {t({ en: "Light source", zh: "光源", th: "แหล่งกำเนิดแสง", vi: "Nguồn sáng" }, locale)}
            </span>
            <button type="button" className={chip(source === "all")} style={chipStyle(source === "all")} onClick={() => setSource("all")}>{t(ALL, locale)}</button>
            {LIGHT_SOURCES.map((s, i) => (
              <button key={s.href} type="button" className={chip(source === i)} style={chipStyle(source === i, s.accent)} onClick={() => setSource(i)}>
                {t(s.name, locale)}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* The shelf */}
      <section className="px-4 py-8 sm:px-6 lg:px-8 md:py-10">
        <div className="mx-auto max-w-7xl">
          <p className="mb-4 text-xs text-[#667085]">
            {shown.length} {t({ en: "models", zh: "款", th: "รุ่น", vi: "mẫu" }, locale)}
          </p>
          {shown.length === 0 ? (
            <p className="rounded-2xl border border-dashed border-[#D9E4EA] p-10 text-center text-sm text-[#667085]">
              {t({ en: "No models match both filters.", zh: "没有同时符合两个筛选的型号。", th: "ไม่มีรุ่นที่ตรงกับตัวกรองทั้งสอง", vi: "Không có mẫu nào khớp cả hai bộ lọc." }, locale)}
            </p>
          ) : (
            <div className="grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-3 lg:grid-cols-4">
              {shown.map((p) => {
                const img = productImage(p);
                const accent = brandLanding[BRAND_ORDER.find((b) => brandLanding[b].catalogBrandId === p.brandId) ?? "omnicure"].color;
                return (
                  <div key={p.slug} className="group flex flex-col overflow-hidden rounded-2xl border border-[#D9E4EA] bg-white transition hover:border-[#1A56DB]/40 hover:shadow-lg">
                    <Link href={localizeHref(productHref(p), locale)} className="relative block h-32 bg-[#F7FAFC] sm:h-40">
                      {img ? (
                        <Image src={img} alt={p.name} fill sizes="(max-width:640px) 50vw, (max-width:1024px) 33vw, 25vw" className="object-contain p-3 transition duration-300 group-hover:scale-105" />
                      ) : (
                        <span className="absolute inset-0 flex items-center justify-center text-sm font-bold" style={{ color: accent }}>{p.brand}</span>
                      )}
                      <span className="absolute left-2 top-2 rounded px-1.5 py-0.5 text-[10px] font-bold text-white" style={{ background: accent }}>{p.brand}</span>
                    </Link>
                    <div className="flex flex-1 flex-col p-3 sm:p-4">
                      <Link href={localizeHref(productHref(p), locale)} className="text-sm font-bold leading-snug text-[#143C96] hover:underline">
                        {p.name}
                      </Link>
                      {p.sub && <p className="mt-1 text-[11px] text-[#667085]">{p.sub}</p>}
                      <div className="mt-auto flex items-center justify-between gap-2 pt-3">
                        <AddToInquiryButton item={{ kind: "product", slug: p.slug }} accent={accent} />
                        <Link href={localizeHref(productHref(p), locale)} className="text-[11px] font-bold" style={{ color: accent }}>
                          {t({ en: "Details", zh: "详情", th: "รายละเอียด", vi: "Chi tiết" }, locale)} →
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Sticky review bar, once the basket has anything in it */}
      {ready && count > 0 && (
        <div className="sticky bottom-0 z-30 border-t border-[#D9E4EA] bg-white/95 px-4 py-3 backdrop-blur sm:px-6 lg:px-8">
          <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
            <p className="text-sm text-[#102038]">
              <span className="font-bold text-[#143C96]">{count}</span>{" "}
              {t({ en: "items in your inquiry", zh: "项已加入询单", th: "รายการในรายการสอบถาม", vi: "mục trong yêu cầu báo giá" }, locale)}
            </p>
            <Link href={localizeHref("/inquiry", locale)} className="inline-flex items-center gap-2 rounded-full bg-[#41A62A] px-5 py-2.5 text-sm font-bold text-white hover:bg-[#368a22]">
              {t({ en: "Review & send", zh: "查看并发送", th: "ตรวจสอบและส่ง", vi: "Xem lại & gửi" }, locale)}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
