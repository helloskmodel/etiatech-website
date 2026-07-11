"use client";
import Link from "next/link";
import Image from "next/image";
import { BadgeCheck, ArrowRight } from "lucide-react";
import { inquiryMailto } from "@/components/contact";
import FinalCta from "@/components/FinalCta";
import HeroBanner from "@/components/HeroBanner";
import TrustStrip from "@/components/TrustStrip";
import { PAGE_BANNERS } from "@/components/caseStudies";
import { useLocale, t } from "@/components/LocaleContext";

type CardLocale = { title: string; description: string };
export type ArticleCard = {
  slug: string;
  date: string;
  tags: string[];
  author: string;
  cover?: string;
  readingMinutes: number;
  locales: { en: CardLocale; zh?: CardLocale };
};

function fmtDate(iso: string, locale: string): string {
  if (!iso) return "";
  const d = new Date(iso + "T00:00:00Z");
  if (isNaN(d.getTime())) return iso;
  return d.toLocaleDateString(locale === "zh" ? "zh-CN" : "en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  });
}

export default function InsightsIndexView({ articles }: { articles: ArticleCard[] }) {
  const { locale } = useLocale();
  const pick = (a: ArticleCard) => (locale === "zh" && a.locales.zh) || a.locales.en;

  return (
    <>
      {/* Hero — site standard (matches Sales & Support) */}
      <section className="relative overflow-hidden border-b border-[#D9E4EA] bg-gradient-to-br from-white via-[#EEF6FF] to-[#F1FAEF] py-16 md:py-24">
        <HeroBanner src={PAGE_BANNERS.insights} />
        <div className="absolute -right-36 -top-36 h-[34rem] w-[34rem] rounded-full bg-[#1A56DB]/10 blur-3xl" />
        <div className="absolute -bottom-40 left-1/3 h-96 w-96 rounded-full bg-[#63C94A]/10 blur-3xl" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-[#41A62A]/20 bg-white px-3 py-1.5 text-xs font-bold text-[#41A62A] shadow-sm">
            <BadgeCheck className="h-4 w-4" /> {t({ en: "ETIA Insights", zh: "ETIA 洞察" }, locale)}
          </div>
          <h1 className="mt-6 max-w-3xl text-4xl font-bold leading-[1.08] tracking-tight text-[#143C96] md:text-6xl">
            {t({ en: "UV Curing Insights", zh: "紫外线固化技术洞察与应用指南", th: "ความรู้เชิงเทคนิคและคู่มือการใช้งาน UV Curing", vi: "Kiến thức kỹ thuật & hướng dẫn ứng dụng UV Curing" }, locale)}<span className="mt-2 block text-2xl font-bold text-[#41A62A] md:text-4xl">{t({ en: "& Application Guides", zh: "理解工艺 优化固化", th: "เข้าใจกระบวนการ ปรับปรุงการคิวริ่งให้เหมาะสม", vi: "Hiểu quy trình, tối ưu đóng rắn." }, locale)}</span>
          </h1>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a href={inquiryMailto(locale, { subject: "UV Curing Technical Inquiry", context: "Insights / application question" })} className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#41A62A] px-6 py-3.5 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-[#358B22]">{t({ en: "Talk to an Engineer", zh: "咨询工程师", th: "ปรึกษาวิศวกร", vi: "Trao đổi với kỹ sư" }, locale)} <ArrowRight className="h-4 w-4" /></a>
            <Link href="/product" className="inline-flex items-center justify-center rounded-xl border border-[#D4DFEC] bg-white px-6 py-3.5 text-sm font-bold text-[#143C96] transition hover:-translate-y-0.5 hover:border-[#143C96] hover:text-[#1A56DB]">{t({ en: "Browse UV Curing Systems", zh: "浏览UV Curing 紫外线固化系统", th: "ดูระบบ UV Curing", vi: "Xem hệ thống UV Curing" }, locale)}</Link>
          </div>
          </div>
        </div>
      </section>

      <TrustStrip />

      {/* Article grid */}
      <section className="py-14" style={{ background: "#f5f7fa" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {articles.length === 0 ? (
            <p className="text-center text-gray-400 py-20">
              {t({ en: "New articles are coming soon.", zh: "新文章即将发布。" , vi: "Bài viết mới sẽ sớm ra mắt.", th: "บทความใหม่กำลังจะมาเร็ว ๆ นี้" }, locale)}
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {articles.map((a) => {
                const c = pick(a);
                return (
                  <Link
                    key={a.slug}
                    href={`/insights/${a.slug}`}
                    className="group flex flex-col rounded-2xl overflow-hidden border border-gray-200 bg-white shadow-sm hover:shadow-md transition-all"
                  >
                    <div className="relative h-44 bg-gray-100 overflow-hidden">
                      {a.cover ? (
                        <Image src={a.cover} alt={c.title} fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" className="object-cover group-hover:scale-105 transition-transform duration-300" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center" style={{ background: "linear-gradient(135deg, #1A56DB 0%, #123C94 100%)" }}>
                          <span className="text-white/90 text-4xl font-bold">ETIA</span>
                        </div>
                      )}
                    </div>
                    <div className="p-5 flex flex-col flex-1">
                      <div className="flex flex-wrap gap-1.5 mb-3">
                        {a.tags.slice(0, 3).map((tag) => (
                          <span key={tag} className="text-[11px] font-medium px-2 py-0.5 rounded-full border" style={{ borderColor: "#1A56DB33", color: "#1A56DB", background: "#1A56DB0d" }}>
                            {tag}
                          </span>
                        ))}
                      </div>
                      <h2 className="font-bold text-base leading-snug text-gray-800 group-hover:text-[#1A56DB] transition-colors line-clamp-2 mb-2">{c.title}</h2>
                      <p className="text-sm text-gray-500 leading-relaxed line-clamp-3 flex-1">{c.description}</p>
                      <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-xs text-gray-400">
                        <span>{fmtDate(a.date, locale)}</span>
                        <span>{a.readingMinutes} {t({ en: "min read", zh: "分钟阅读" , vi: "phút đọc", th: "นาทีในการอ่าน" }, locale)}</span>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </section>

      <FinalCta
        heading={t({ en: "Have a UV curing challenge to solve?", zh: "有紫外线固化难题要解决?", th: "มีโจทย์ UV Curing ที่ต้องแก้ไหม?", vi: "Có bài toán UV curing cần giải quyết?" }, locale)}
        body={t({ en: "Tell us your material, curing area, wavelength and production requirements. ETIA engineers will help you find the right solution.", zh: "告诉我们您的材料、固化面积、波长与生产要求。ETIA 工程师将帮助您找到合适方案。", th: "บอกเราเกี่ยวกับวัสดุ พื้นที่คิวริ่ง ความยาวคลื่น และความต้องการด้านการผลิตของคุณ วิศวกรของ ETIA จะช่วยหาโซลูชันที่เหมาะสม", vi: "Cho chúng tôi biết vật liệu, diện tích đóng rắn, bước sóng và yêu cầu sản xuất. Kỹ sư ETIA sẽ giúp bạn tìm giải pháp phù hợp." }, locale)}
        primary={{ label: t({ en: "Talk to an Engineer", zh: "咨询工程师", th: "ปรึกษาวิศวกร", vi: "Trao đổi với kỹ sư" }, locale), href: inquiryMailto(locale, { subject: "UV Curing Inquiry" }) }}
        secondary={{ label: t({ en: "Browse Products", zh: "浏览产品", th: "ดูสินค้า", vi: "Xem sản phẩm" }, locale), href: "/product" }}
      />
    </>
  );
}
