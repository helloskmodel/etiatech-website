"use client";
import Link from "next/link";
import Image from "next/image";
import { AlertTriangle, Lightbulb, ArrowRight } from "lucide-react";
import { useLocale, t } from "@/components/LocaleContext";
import { productImage, getProduct, localizeProduct } from "@/components/productCatalog";
import { getApplicationBySlug } from "@/data/applicationsData";
import ApplicationCard from "@/components/ApplicationCard";
import TrustStrip from "@/components/TrustStrip";
import FinalCta from "@/components/FinalCta";
import { inquiryMailto } from "@/components/contact";
import type { Industry } from "@/data/industriesData";

export default function IndustryView({ industry }: { industry: Industry }) {
  const { locale } = useLocale();
  const notes = industry.relatedNoteSlugs
    .map((s) => getApplicationBySlug(s))
    .filter((n): n is NonNullable<typeof n> => Boolean(n));

  return (
    <>
      {/* Hero */}
      <section className="py-16 md:py-24 relative overflow-hidden" style={{ background: "#0f2444" }}>
        <div className="absolute inset-0" style={{ background: "linear-gradient(90deg, rgba(13,30,58,0.94) 0%, rgba(18,65,163,0.82) 50%, rgba(26,86,219,0.45) 100%)" }} />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-bold uppercase tracking-widest text-[#41A62A]">{t({ en: "Industry Solutions", zh: "行业解决方案", th: "โซลูชันรายอุตสาหกรรม", vi: "Giải pháp theo ngành" }, locale)} · {t(industry.name, locale)}</p>
          <h1 className="mt-4 max-w-3xl text-3xl md:text-5xl font-bold leading-tight text-white">{t(industry.headline, locale)}</h1>
          <p className="mt-5 max-w-3xl text-base md:text-lg leading-relaxed text-white/80">{t(industry.sub, locale)}</p>
        </div>
      </section>

      <TrustStrip />

      {/* Pain points */}
      <section className="py-14 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-bold uppercase tracking-widest text-[#41A62A] mb-2">{t({ en: "The Challenge", zh: "行业痛点", th: "ความท้าทาย", vi: "Thách thức" }, locale)}</p>
          <h2 className="text-2xl md:text-3xl font-bold text-[#143C96] mb-8">{t({ en: "What makes curing hard here", zh: "这个行业的固化难在哪", th: "อะไรทำให้การบ่มในอุตสาหกรรมนี้ยาก", vi: "Điều gì khiến curing khó ở ngành này" }, locale)}</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {industry.painPoints.map((p) => (
              <div key={t(p, "en")} className="flex items-start gap-3 rounded-lg border border-gray-100 bg-gray-50 p-4 text-sm font-medium text-gray-700">
                <AlertTriangle className="h-5 w-5 shrink-0 text-[#1A56DB]" />
                {t(p, locale)}
              </div>
            ))}
          </div>
          <p className="mt-8 max-w-3xl text-[15px] leading-7 text-gray-600">{t(industry.valueProp, locale)}</p>
        </div>
      </section>

      {/* Recommended systems */}
      <section className="py-14" style={{ background: "#f6f8fb" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-bold uppercase tracking-widest text-[#41A62A] mb-2">{t({ en: "Recommended Systems", zh: "推荐系统", th: "ระบบที่แนะนำ", vi: "Hệ thống khuyến nghị" }, locale)}</p>
          <h2 className="text-2xl md:text-3xl font-bold text-[#143C96] mb-8">{t({ en: "Ranked by fit for this industry", zh: "按行业匹配度排序", th: "จัดอันดับตามความเหมาะสมกับอุตสาหกรรม", vi: "Xếp theo mức phù hợp với ngành" }, locale)}</h2>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {industry.products.map((p, i) => {
              const cat = getProduct(p.slug);
              const img = cat ? productImage(localizeProduct(cat, locale)) : "";
              return (
                <Link key={p.slug + i} href={`/product/systems/${p.slug}`} className="group rounded-xl border border-gray-200 bg-white overflow-hidden transition-all hover:-translate-y-1 hover:border-[#1A56DB]/40 hover:shadow-md">
                  <div className="relative h-40 bg-gray-50 border-b border-gray-100">
                    {img ? (
                      <Image src={img} alt={p.name} fill sizes="(max-width: 640px) 100vw, 33vw" className="object-contain p-4" />
                    ) : (
                      <span className="absolute inset-0 flex items-center justify-center font-bold text-[#1A56DB]">{p.name}</span>
                    )}
                    <span className="absolute left-3 top-3 inline-flex h-7 w-7 items-center justify-center rounded-full bg-[#1A56DB] text-xs font-bold text-white">{i + 1}</span>
                  </div>
                  <div className="p-4">
                    <h3 className="text-sm font-bold text-[#102A43] group-hover:text-[#1A56DB]">{p.name}</h3>
                    <p className="mt-1 text-xs leading-relaxed text-gray-500">{t(p.note, locale)}</p>
                    <span className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-[#41A62A]">{t({ en: "View product", zh: "查看产品", th: "ดูผลิตภัณฑ์", vi: "Xem sản phẩm" }, locale)} <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" /></span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Process tips */}
      <section className="py-14 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-bold uppercase tracking-widest text-[#41A62A] mb-2">{t({ en: "From Our Engineers", zh: "工程师建议", th: "จากวิศวกรของเรา", vi: "Từ kỹ sư của chúng tôi" }, locale)}</p>
          <h2 className="text-2xl md:text-3xl font-bold text-[#143C96] mb-8">{t({ en: "Process best practices", zh: "工艺最佳实践", th: "แนวปฏิบัติที่ดีของกระบวนการ", vi: "Thực hành quy trình tốt nhất" }, locale)}</h2>
          <div className="grid gap-4 md:grid-cols-3">
            {industry.tips.map((tip) => (
              <div key={t(tip, "en")} className="rounded-xl border border-[#1A56DB]/15 bg-[#f0f5ff] p-5 text-sm leading-relaxed text-gray-700">
                <Lightbulb className="mb-3 h-5 w-5 text-[#1A56DB]" />
                {t(tip, locale)}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Related application notes */}
      {notes.length > 0 && (
        <section className="py-14" style={{ background: "#f6f8fb" }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-xs font-bold uppercase tracking-widest text-[#41A62A] mb-2">{t({ en: "Proven in Production", zh: "实战案例", th: "พิสูจน์แล้วในการผลิตจริง", vi: "Đã kiểm chứng trong sản xuất" }, locale)}</p>
            <h2 className="text-2xl md:text-3xl font-bold text-[#143C96] mb-8">{t({ en: "Application notes for this industry", zh: "本行业应用笔记", th: "แอปพลิเคชันโน้ตของอุตสาหกรรมนี้", vi: "Ghi chú ứng dụng của ngành" }, locale)}</h2>
            <div className="grid gap-5 md:grid-cols-3">
              {notes.map((n) => (
                <ApplicationCard key={n.slug} application={n} compact />
              ))}
            </div>
          </div>
        </section>
      )}

      <FinalCta
        heading={t(industry.ctaLabel, locale)}
        body={t({
          en: "Tell us your application, materials and line speed — ETIA engineers will match, test and validate the right UV curing configuration with you.",
          zh: "告诉我们您的应用、材料与产线速度——ETIA 工程师将与您一起匹配、测试并验证合适的 UV 固化配置。",
          th: "บอกเราเกี่ยวกับการใช้งาน วัสดุ และความเร็วไลน์ของคุณ — วิศวกร ETIA จะจับคู่ ทดสอบ และตรวจรับรองการกำหนดค่าที่เหมาะสมร่วมกับคุณ",
          vi: "Cho chúng tôi biết ứng dụng, vật liệu và tốc độ dây chuyền — kỹ sư ETIA sẽ cùng bạn chọn, thử và xác nhận cấu hình UV curing phù hợp.",
        }, locale)}
        primary={{ label: t(industry.ctaLabel, locale), href: inquiryMailto(locale, { subject: industry.ctaSubject }) }}
        secondary={{ label: t({ en: "All Industries", zh: "全部行业", th: "ทุกอุตสาหกรรม", vi: "Tất cả ngành" }, locale), href: "/industries" }}
      />
    </>
  );
}
