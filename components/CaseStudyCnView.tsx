"use client";
import Image from "next/image";
import Link from "next/link";
import { CheckCircle2, Lightbulb } from "lucide-react";
import type { CaseCn, LList } from "@/data/caseStudiesCn";
import ServiceCommitment from "@/components/ServiceCommitment";
import { useLocale, t, type Locale } from "@/components/LocaleContext";

function pick(list: LList, locale: Locale): string[] {
  return (list as Record<string, string[] | undefined>)[locale] ?? list.en;
}

function TextSection({ eyebrow, title, paragraphs }: { eyebrow: string; title: string; paragraphs: string[] }) {
  if (!paragraphs.length) return null;
  return (
    <section className="border-t border-gray-100 py-9 first:border-0 first:pt-0">
      <p className="mb-2 text-xs font-bold uppercase tracking-widest text-[#41A62A]">{eyebrow}</p>
      <h2 className="mb-4 text-2xl font-bold text-[#1A56DB]">{title}</h2>
      <div className="space-y-4 text-[15px] leading-7 text-gray-600">
        {paragraphs.map((p) => <p key={p}>{p}</p>)}
      </div>
    </section>
  );
}

export default function CaseStudyCnView({ caseStudy: c }: { caseStudy: CaseCn }) {
  const { locale } = useLocale();

  return (
    <>
      <div className="border-b border-gray-200 bg-white py-3">
        <div className="mx-auto max-w-7xl px-4 text-xs text-gray-400 sm:px-6 lg:px-8">
          <Link href="/" className="hover:text-[#1A56DB]">{t({ en: "Home", zh: "首页", th: "หน้าแรก", vi: "Trang chủ" }, locale)}</Link><span className="mx-2">›</span>
          <Link href="/case-studies" className="hover:text-[#1A56DB]">{t({ en: "Case Studies", zh: "案例研究", th: "กรณีศึกษา", vi: "Case Study" }, locale)}</Link><span className="mx-2">›</span>
          <span className="text-gray-500">{t(c.title, locale)}</span>
        </div>
      </div>

      <header className="border-b border-gray-200 bg-[#f1f5f9] py-12 md:py-16">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-[1.3fr_.7fr] lg:px-8">
          <div>
            <div className="mb-3 flex flex-wrap items-center gap-2">
              <span className="rounded px-2 py-0.5 text-[11px] font-bold text-white" style={{ background: "#1A56DB" }}>{t(c.industry, locale)}</span>
              <span className="rounded-full bg-white px-2 py-0.5 font-mono text-[11px] font-semibold text-[#1A56DB]">{t({ en: "Case Study", zh: "案例", th: "กรณีศึกษา", vi: "Case Study" }, locale)} {c.id}</span>
            </div>
            <h1 className="text-3xl font-bold leading-tight text-[#1A56DB] md:text-5xl">{t(c.title, locale)}</h1>
            <p className="mt-5 max-w-3xl text-base leading-relaxed text-gray-600 md:text-lg">{t(c.scene, locale)}</p>
          </div>
          <div className="relative aspect-video overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
            <Image src={c.image} alt={t(c.title, locale)} fill priority sizes="(max-width: 1024px) 100vw, 40vw" className="object-cover" />
          </div>
        </div>
      </header>

      <section aria-label="Case metadata" className="border-b border-gray-200 bg-white">
        <div className="mx-auto grid max-w-7xl divide-y divide-gray-200 px-4 sm:grid-cols-2 sm:divide-x sm:divide-y-0 sm:px-6 lg:grid-cols-4 lg:px-8">
          {[
            [t({ en: "Industry", zh: "行业归口", th: "อุตสาหกรรม", vi: "Ngành" }, locale), t(c.industry, locale)],
            [t({ en: "Application", zh: "应用场景", th: "การใช้งาน", vi: "Ứng dụng" }, locale), t(c.scene, locale)],
            [t({ en: "Main Product", zh: "主推产品", th: "ผลิตภัณฑ์หลัก", vi: "Sản phẩm chính" }, locale), c.product],
            [t({ en: "Technology", zh: "技术路线", th: "เทคโนโลยี", vi: "Công nghệ" }, locale), t(c.techRoute, locale)],
          ].map(([label, value]) => (
            <div key={label} className="px-4 py-5 first:pl-0 sm:first:pl-4">
              <p className="text-[10px] font-bold uppercase tracking-widest text-[#41A62A]">{label}</p>
              <p className="mt-2 text-xs font-semibold leading-relaxed text-gray-700">{value}</p>
            </div>
          ))}
        </div>
      </section>

      <main className="bg-white py-14">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[minmax(0,1fr)_300px] lg:px-8">
          <article className="max-w-3xl">
            <TextSection eyebrow={t({ en: "01 · Application", zh: "01 · 应用概述", th: "01 · ภาพรวมการใช้งาน", vi: "01 · Tổng quan ứng dụng" }, locale)} title={t({ en: "Application Overview", zh: "应用概述", th: "ภาพรวมการใช้งาน", vi: "Tổng quan ứng dụng" }, locale)} paragraphs={pick(c.overview, locale)} />
            <TextSection eyebrow={t({ en: "02 · Challenge", zh: "02 · 客户挑战", th: "02 · ความท้าทายของลูกค้า", vi: "02 · Thách thức" }, locale)} title={t({ en: "Customer Challenge", zh: "客户挑战", th: "ความท้าทายของลูกค้า", vi: "Thách thức của khách hàng" }, locale)} paragraphs={pick(c.challenge, locale)} />
            <TextSection eyebrow={t({ en: "03 · Solution", zh: "03 · 解决方案", th: "03 · โซลูชัน", vi: "03 · Giải pháp" }, locale)} title={t({ en: "UV Curing Solution", zh: "UV Curing 紫外线固化解决方案", th: "โซลูชัน UV Curing", vi: "Giải pháp UV Curing" }, locale)} paragraphs={pick(c.solution, locale)} />

            <section className="border-t border-gray-100 py-9">
              <p className="mb-2 text-xs font-bold uppercase tracking-widest text-[#41A62A]">{t({ en: "04 · Recommended System", zh: "04 · 推荐系统", th: "04 · ระบบที่แนะนำ", vi: "04 · Hệ thống đề xuất" }, locale)}</p>
              <h2 className="mb-5 text-2xl font-bold text-[#1A56DB]">{t({ en: "Recommended System", zh: "推荐系统", th: "ระบบที่แนะนำ", vi: "Hệ thống đề xuất" }, locale)}</h2>
              <div className="overflow-x-auto rounded-xl border border-gray-200">
                <table className="w-full min-w-[560px] text-left text-sm">
                  <thead className="bg-[#f0f5ff] text-xs font-bold uppercase tracking-wide text-[#1A56DB]">
                    <tr>
                      <th className="px-4 py-3">{t({ en: "Process Step", zh: "工艺步骤", th: "ขั้นตอนกระบวนการ", vi: "Bước quy trình" }, locale)}</th>
                      <th className="px-4 py-3">{t({ en: "Main Product", zh: "主推产品", th: "ผลิตภัณฑ์หลัก", vi: "Sản phẩm chính" }, locale)}</th>
                      <th className="px-4 py-3">{t({ en: "Value", zh: "应用价值", th: "คุณค่า", vi: "Giá trị" }, locale)}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {c.recSystem.map((r) => (
                      <tr key={r.step.en} className="align-top">
                        <td className="px-4 py-3 font-semibold text-gray-800">{t(r.step, locale)}</td>
                        <td className="px-4 py-3 text-[#1A56DB]">{r.product}</td>
                        <td className="px-4 py-3 text-gray-600">{t(r.value, locale)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            <section className="border-t border-gray-100 py-9">
              <p className="mb-2 text-xs font-bold uppercase tracking-widest text-[#41A62A]">{t({ en: "05 · Benefits", zh: "05 · 应用收益", th: "05 · ประโยชน์ที่ได้รับ", vi: "05 · Lợi ích" }, locale)}</p>
              <h2 className="mb-5 text-2xl font-bold text-[#1A56DB]">{t({ en: "Benefits", zh: "应用收益", th: "ประโยชน์ที่ได้รับ", vi: "Lợi ích ứng dụng" }, locale)}</h2>
              <div className="grid gap-3 sm:grid-cols-2">
                {pick(c.benefits, locale).map((b) => <div key={b} className="flex gap-3 rounded-lg border border-gray-100 bg-gray-50 p-4 text-sm font-medium text-gray-700"><CheckCircle2 size={18} className="shrink-0 text-[#41A62A]" />{b}</div>)}
              </div>
            </section>

            <div className="my-4 flex gap-3 rounded-xl border border-[#FBBF24]/30 bg-[#FFFBEB] p-5">
              <Lightbulb size={20} className="mt-0.5 shrink-0 text-[#D97706]" />
              <div>
                <p className="mb-1 text-xs font-bold uppercase tracking-widest text-[#D97706]">{t({ en: "Engineer's Note", zh: "工程师提示", th: "คำแนะนำจากวิศวกร", vi: "Ghi chú của kỹ sư" }, locale)}</p>
                <p className="text-[15px] leading-7 text-gray-700">{t(c.engineerTip, locale)}</p>
              </div>
            </div>

            <TextSection eyebrow={t({ en: "06 · ETIA Support", zh: "06 · ETIA 服务支持", th: "06 · การสนับสนุนจาก ETIA", vi: "06 · Hỗ trợ ETIA" }, locale)} title={t({ en: "ETIA Support", zh: "ETIA 服务支持", th: "การสนับสนุนจาก ETIA", vi: "Hỗ trợ ETIA" }, locale)} paragraphs={[t(c.etiaSupport, locale)]} />
          </article>

          <aside className="lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
              <p className="text-xs font-bold uppercase tracking-widest text-[#41A62A]">{t({ en: "Recommended System", zh: "推荐系统", th: "ระบบที่แนะนำ", vi: "Hệ thống đề xuất" }, locale)}</p>
              <p className="mt-2 text-lg font-bold text-[#1A56DB]">{c.product}</p>
              <p className="mt-3 text-sm leading-relaxed text-gray-500">{t(c.cta, locale)}</p>
              <Link href="/contact" className="mt-5 block rounded-lg bg-[#41A62A] px-5 py-3 text-center text-sm font-bold text-white hover:opacity-90">{t({ en: "Contact ETIA →", zh: "联系 ETIA →", th: "ติดต่อ ETIA →", vi: "Liên hệ ETIA →" }, locale)}</Link>
              <ServiceCommitment compact />
            </div>
          </aside>
        </div>
      </main>
    </>
  );
}
