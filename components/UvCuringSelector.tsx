"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { useLocale, t } from "@/components/LocaleContext";
import { inquiryMailto } from "@/components/contact";
import FinalCta from "@/components/FinalCta";
import { products, TECH_ROUTES, techRouteFor, productHref, productImage, localizeProduct } from "@/components/productCatalog";

// Application-driven, database-backed selection guide. Instead of long prose,
// the visitor picks one of the six canonical UV curing technologies and sees
// the actual matching products from the catalog (techRouteFor). Product names
// and technology labels are already localized in the catalog, so only a few
// UI strings live here.

const ACCENTS = ["#1A56DB", "#2F80ED", "#087F6B", "#1A9C8E", "#0E7490", "#6BBF3A"];

// Precompute the product list for each technology route once.
const ROUTE_PRODUCTS = TECH_ROUTES.map((route) => ({
  route,
  items: products.filter((p) => techRouteFor(p)?.id === route.id),
}));

export default function UvCuringSelector() {
  const { locale } = useLocale();
  const [sel, setSel] = useState(0);
  const active = ROUTE_PRODUCTS[sel];
  const accent = ACCENTS[sel];
  const engineerMail = inquiryMailto(locale, { subject: "UV Curing System Selection", context: t(active.route, locale) });

  return (
    <>
    <section id="uv-curing-selector" className="bg-white">
      <div className="mx-auto max-w-7xl px-4 pt-20 sm:px-6 lg:px-8">
        {/* Hero — short */}
        <p className="text-xs font-bold uppercase tracking-[.18em] text-[#44B549]">{t({ en: "UV Curing System Selection", zh: "紫外线固化系统选型", th: "การเลือกระบบ UV Curing", vi: "Chọn hệ thống UV Curing" }, locale)}</p>
        <h2 className="mt-3 max-w-3xl text-3xl font-bold tracking-tight text-[#102A43] md:text-4xl">{t({ en: "How to Choose the Right UV Curing System", zh: "如何选择合适的紫外线固化系统", th: "วิธีเลือกระบบ UV Curing ที่เหมาะสม", vi: "Cách chọn hệ thống UV Curing phù hợp" }, locale)}</h2>
        <p className="mt-3 max-w-2xl leading-7 text-[#5F6C7B]">{t({ en: "Start with your application, then match wavelength, curing area, intensity and production speed.", zh: "从应用出发，再匹配波长、固化面积、光强与生产速度。", th: "เริ่มจากการใช้งานของคุณ แล้วจับคู่ความยาวคลื่น พื้นที่คิวริ่ง ความเข้มแสง และความเร็วการผลิต", vi: "Bắt đầu từ ứng dụng của bạn, rồi khớp bước sóng, diện tích đóng rắn, cường độ và tốc độ sản xuất." }, locale)}</p>

        {/* Technology selector — tappable, mobile-first */}
        <p className="mt-8 text-xs font-bold uppercase tracking-wide text-[#1A56DB]">{t({ en: "Choose your curing technology", zh: "选择固化技术", th: "เลือกเทคโนโลยีการคิวริ่ง", vi: "Chọn công nghệ đóng rắn" }, locale)}</p>
        <div className="mt-3 grid grid-cols-1 gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
          {ROUTE_PRODUCTS.map((rp, i) => {
            const activeBtn = i === sel;
            return (
              <button
                key={rp.route.id}
                type="button"
                onClick={() => setSel(i)}
                className="flex items-center justify-between gap-2 rounded-xl border px-4 py-3 text-left text-sm font-semibold transition"
                style={activeBtn ? { borderColor: ACCENTS[i], background: ACCENTS[i], color: "#fff" } : { borderColor: "#E3EAF2", background: "#fff", color: "#334E68" }}
              >
                <span>{t(rp.route, locale)}</span>
                <span className={`text-xs ${activeBtn ? "text-white/80" : "text-[#98A6B8]"}`}>{rp.items.length}</span>
              </button>
            );
          })}
        </div>

        {/* Matching products for the selected technology */}
        <div className="mt-6 rounded-3xl border border-[#E6EAF0] bg-[#FAFBFC] p-5 sm:p-7" style={{ borderTopColor: accent, borderTopWidth: 3 }}>
          <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
            <div>
              <h3 className="text-lg font-bold leading-snug text-[#102A43]">{t(active.route, locale)}</h3>
              <p className="mt-1 text-xs font-semibold" style={{ color: accent }}>{active.items.length} {t({ en: "matching products", zh: "款匹配产品", th: "ผลิตภัณฑ์ที่ตรงกัน", vi: "sản phẩm phù hợp" }, locale)}</p>
            </div>
            <a href={engineerMail} className="inline-flex items-center justify-center gap-1.5 self-start rounded-xl border border-[#D4DFEC] bg-white px-4 py-2.5 text-sm font-bold text-[#143C96] transition hover:border-[#143C96] sm:self-auto">{t({ en: "Talk to an Engineer", zh: "咨询工程师", th: "ปรึกษาวิศวกร", vi: "Trao đổi với kỹ sư" }, locale)} <ArrowRight className="h-4 w-4" /></a>
          </div>

          <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {active.items.map((raw) => {
              const p = localizeProduct(raw, locale);
              const img = productImage(p);
              return (
                <Link key={p.slug} href={productHref(p)} className="group flex flex-col overflow-hidden rounded-2xl border border-[#E6EAF0] bg-white transition hover:-translate-y-1 hover:border-[#B9CCE2] hover:shadow-[0_14px_40px_rgba(15,36,68,.08)]">
                  <div className="relative h-32 border-b border-[#EEF2F6] bg-white">{img ? <Image src={img} alt={p.name} fill sizes="(max-width:640px) 100vw, 33vw" className="object-contain p-4 transition group-hover:scale-105" /> : null}</div>
                  <div className="flex flex-1 flex-col p-4">
                    <h4 className="text-sm font-bold leading-snug text-[#102A43] group-hover:text-[#1A56DB]">{p.name}</h4>
                    <span className="mt-auto inline-flex items-center gap-1 pt-3 text-xs font-bold" style={{ color: accent }}>{t({ en: "View product", zh: "查看产品", th: "ดูผลิตภัณฑ์", vi: "Xem sản phẩm" }, locale)} <ArrowRight className="h-3.5 w-3.5" /></span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </section>

    <FinalCta
      heading={t({ en: "Not sure which system fits your process?", zh: "不确定哪种系统适合您的工艺？", th: "ยังไม่แน่ใจว่าระบบใดเหมาะกับกระบวนการของคุณ?", vi: "Chưa chắc hệ thống nào phù hợp với quy trình của bạn?" }, locale)}
      body={t({ en: "Tell us your material, curing area, working distance and production speed. ETIA will help recommend the right UV curing system.", zh: "告诉我们您的材料、固化面积、工作距离和生产速度，ETIA 将帮助您推荐合适的紫外线固化系统。", th: "แจ้งวัสดุ พื้นที่คิวริ่ง ระยะทำงาน และความเร็วการผลิตของคุณ ETIA จะช่วยแนะนำระบบ UV Curing ที่เหมาะสม", vi: "Cho chúng tôi biết vật liệu, diện tích đóng rắn, khoảng cách làm việc và tốc độ sản xuất. ETIA sẽ giúp đề xuất hệ thống UV Curing phù hợp." }, locale)}
      primary={{ label: t({ en: "Talk to an Engineer", zh: "咨询工程师", th: "ปรึกษาวิศวกร", vi: "Trao đổi với kỹ sư" }, locale), href: inquiryMailto(locale, { subject: "UV Curing System Selection", context: "Material / curing area / working distance / production speed" }) }}
      secondary={{ label: t({ en: "Browse Products", zh: "浏览产品", th: "ดูสินค้า", vi: "Xem sản phẩm" }, locale), href: "/product" }}
    />
    </>
  );
}
