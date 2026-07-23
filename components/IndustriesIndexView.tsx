"use client";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { useLocale, t } from "@/components/LocaleContext";
import { industries } from "@/data/industriesData";
import TrustStrip from "@/components/TrustStrip";

export default function IndustriesIndexView() {
  const { locale } = useLocale();
  return (
    <>
      <section className="py-16 md:py-24 relative overflow-hidden" style={{ background: "#0f2444" }}>
        <Image
          src="https://etiatech-1303055923.cos.ap-singapore.myqcloud.com/IMAGE/logo/UVCURING.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0" style={{ background: "linear-gradient(90deg, rgba(13,30,58,0.94) 0%, rgba(18,65,163,0.78) 55%, rgba(26,86,219,0.35) 100%)" }} />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-bold uppercase tracking-widest text-[#41A62A]">{t({ en: "Industry Solutions", zh: "行业解决方案", th: "โซลูชันรายอุตสาหกรรม", vi: "Giải pháp theo ngành" }, locale)}</p>
          <h1 className="mt-4 max-w-3xl text-3xl md:text-5xl font-bold leading-tight text-white">
            {t({ en: "UV Curing, Matched to Your Industry", zh: "按行业匹配的 UV 固化方案", th: "การบ่ม UV ที่เหมาะกับอุตสาหกรรมของคุณ", vi: "UV curing phù hợp với ngành của bạn" }, locale)}
          </h1>
          <p className="mt-5 max-w-3xl text-base md:text-lg leading-relaxed text-white/80">
            {t({
              en: "Each industry cures differently. Pick yours to see the pain points we solve, the systems ranked by fit, and the process practices our engineers validate with customers.",
              zh: "每个行业的固化需求都不同。选择您的行业,查看我们解决的痛点、按匹配度排序的推荐系统,以及工程师与客户共同验证的工艺实践。",
              th: "แต่ละอุตสาหกรรมบ่มไม่เหมือนกัน เลือกอุตสาหกรรมของคุณเพื่อดูปัญหาที่เราแก้ ระบบที่จัดอันดับตามความเหมาะสม และแนวปฏิบัติที่วิศวกรของเราตรวจรับรองร่วมกับลูกค้า",
              vi: "Mỗi ngành cure một khác. Chọn ngành của bạn để xem các vấn đề chúng tôi giải quyết, hệ thống xếp theo mức phù hợp và thực hành quy trình mà kỹ sư chúng tôi xác nhận cùng khách hàng.",
            }, locale)}
          </p>
        </div>
      </section>

      <TrustStrip />

      <section className="py-14 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {industries.map((ind) => (
              <Link key={ind.slug} href={`/industries/${ind.slug}`} className="group flex flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white transition-all hover:-translate-y-1 hover:border-[#1A56DB]/40 hover:shadow-md">
                <div className="bg-[#41A62A] px-6 py-2.5 text-xs font-bold uppercase tracking-widest text-white">{t(ind.name, locale)}</div>
                <div className="relative aspect-[16/9]">
                  <Image src={ind.image} alt={t(ind.name, locale)} fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" className="object-cover" />
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <h2 className="text-lg font-bold leading-snug text-[#102A43] group-hover:text-[#1A56DB]">{t(ind.headline, locale)}</h2>
                  <ul className="mt-4 space-y-2">
                    {ind.typicalApps.map((app, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm leading-relaxed text-gray-600">
                        <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-[#41A62A]" />
                        {t(app, locale)}
                      </li>
                    ))}
                  </ul>
                  <span className="mt-auto inline-flex items-center gap-1 pt-4 text-sm font-semibold text-[#1A56DB]">
                    {t({ en: "Explore solutions", zh: "查看方案", th: "ดูโซลูชัน", vi: "Xem giải pháp" }, locale)}
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
