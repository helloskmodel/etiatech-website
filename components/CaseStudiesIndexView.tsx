"use client";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BadgeCheck } from "lucide-react";
import { caseStudiesCn } from "@/data/caseStudiesCn";
import TrustStrip from "@/components/TrustStrip";
import { useLocale, t } from "@/components/LocaleContext";

export default function CaseStudiesIndexView() {
  const { locale } = useLocale();
  return (
    <>
      <header className="relative overflow-hidden border-b border-[#D9E4EA] bg-gradient-to-br from-white via-[#EEF6FF] to-[#F1FAEF]">
        <div className="absolute -right-36 -top-36 h-[34rem] w-[34rem] rounded-full bg-[#1F63D6]/10 blur-3xl" />
        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-20 lg:px-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#41A62A]/20 bg-white px-3 py-1.5 text-xs font-bold text-[#41A62A] shadow-sm"><BadgeCheck className="h-4 w-4" /> {t({ en: "Case Studies", zh: "案例研究", th: "กรณีศึกษา", vi: "Case Study" }, locale)}</div>
          <h1 className="mt-6 max-w-3xl text-4xl font-bold leading-[1.08] tracking-tight text-[#143C96] md:text-5xl">{t({ en: "UV Curing Case Studies", zh: "UV Curing 紫外线固化案例研究", th: "กรณีศึกษา UV Curing", vi: "Case Study UV Curing" }, locale)}</h1>
          <p className="mt-5 max-w-3xl text-base leading-7 text-[#667085]">{t({ en: "How OmniCure systems solve specific production challenges — one industry, one product, one clear result.", zh: "OmniCure 系统如何解决具体的生产问题——一个行业、一个主推产品、一个明确结果。", th: "ระบบ OmniCure แก้ปัญหาการผลิตที่เฉพาะเจาะจงอย่างไร — หนึ่งอุตสาหกรรม หนึ่งผลิตภัณฑ์ หนึ่งผลลัพธ์ที่ชัดเจน", vi: "Cách hệ thống OmniCure giải quyết các thách thức sản xuất cụ thể — một ngành, một sản phẩm, một kết quả rõ ràng." }, locale)}</p>
        </div>
      </header>

      <TrustStrip />

      <main className="bg-[#f6f8fb] py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {caseStudiesCn.map((c) => (
              <Link key={c.slug} href={`/case-studies/${c.slug}`} className="group flex flex-col overflow-hidden rounded-xl border border-gray-200 bg-white transition-all hover:border-[#1A56DB]/30 hover:shadow-md">
                <div className="relative aspect-video bg-gray-50">
                  <Image src={c.image} alt={t(c.title, locale)} fill sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw" className="object-cover transition-transform duration-300 group-hover:scale-105" />
                </div>
                <div className="flex flex-1 flex-col border-t border-gray-100 p-5">
                  <p className="mb-2 text-[11px] font-bold uppercase tracking-wider text-[#44B549]">{t(c.industry, locale)} · {c.product}</p>
                  <h2 className="text-base font-bold leading-snug text-gray-900 transition-colors group-hover:text-[#1A56DB]">{t(c.title, locale)}</h2>
                  <p className="mt-3 line-clamp-2 flex-1 text-sm leading-relaxed text-gray-500">{t(c.scene, locale)}</p>
                  <p className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-[#1A56DB]">{t({ en: "Read case study", zh: "查看案例", th: "อ่านกรณีศึกษา", vi: "Xem case study" }, locale)} <ArrowRight className="h-3.5 w-3.5" /></p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
