"use client";
import Image from "next/image";
import { ClipboardCheck, Settings2, LifeBuoy } from "lucide-react";
import { useLocale, t, type Locale } from "@/components/LocaleContext";

const IMG = "https://etiatech-1303055923.cos.ap-singapore.myqcloud.com/IMAGE/logo";

// ETIA Service Commitment poster — one per language, shown on the right.
const COMMITMENT_POSTER: Record<Locale, string> = {
  en: `${IMG}/etia%20service%20commitment-EN.png`,
  zh: `${IMG}/ETIA%20SERVICE-CN.png`,
  th: `${IMG}/ETIA%20SERVICE-TH.png`,
  vi: `${IMG}/ETIA%20SERVICE-VN.png`,
};

const lifecycle = [
  {
    icon: ClipboardCheck,
    phase: "Before Purchase",
    title: "Selection & Application",
    lead: "We help customers choose the right UV curing system before purchase.",
    points: ["Application discussion", "UV curing requirement review", "Adhesive and material consideration", "Working distance and exposure area review", "Product and accessory recommendation", "OmniCure®, Phoseon, UV spot curing, UV LED, and area curing selection support"],
    accent: "#1A56DB",
  },
  {
    icon: Settings2,
    phase: "During Implementation",
    title: "Setup & Training",
    lead: "We support the transition from equipment delivery to production use.",
    points: ["Installation guidance", "System setup support", "Operator training", "Light guide and accessory setup", "Process discussion", "Safety and maintenance reminders"],
    accent: "#0E9AA7",
  },
  {
    icon: LifeBuoy,
    phase: "After Sales",
    title: "Service & Reliability",
    lead: "We stay with customers after the system is installed.",
    points: ["Online technical service", "Onsite troubleshooting", "Maintenance guidance", "Repair support", "Spare parts and consumables coordination", "Long-term technical communication"],
    accent: "#087F6B",
  },
];

const supported = [
  "Medical device bonding", "Catheter bonding", "PCB and electronics assembly", "Automotive electronics",
  "CPO / photonics packaging", "Optical bonding", "Adhesive curing", "Component assembly", "Precision manufacturing",
];

export default function SalesSupportContent() {
  const { locale } = useLocale();
  return (
    <>
      {/* ETIA Service Commitment — text left, poster right */}
      <section className="bg-white py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
            <div>
              <p className="text-xs font-bold uppercase tracking-[.18em] text-[#44B549]">{t({ en: "ETIA Service Commitment", zh: "ETIA 服务承诺", th: "คำมั่นสัญญาด้านบริการของ ETIA", vi: "Cam kết dịch vụ của ETIA" }, locale)}</p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-[#102A43] md:text-4xl">{t({ en: "Service means more than supplying equipment", zh: "服务，不止于提供设备", th: "บริการที่มากกว่าการจัดหาอุปกรณ์", vi: "Dịch vụ không chỉ là cung cấp thiết bị" }, locale)}</h2>
              <p className="mt-5 leading-7 text-[#5F6C7B]">{t({ en: "At ETIA, service means genuine products, application-driven solutions, a dependable local supply chain, and long-term service — keeping your UV curing process stable, repeatable, and production-ready.", zh: "在 ETIA，服务意味着正品保障、应用驱动的解决方案、可靠的本地供应链与长期服务——让您的 UV Curing 紫外线固化工艺保持稳定、可重复、随时可投入生产。", th: "ที่ ETIA บริการหมายถึงสินค้าของแท้ โซลูชันที่ขับเคลื่อนด้วยการใช้งานจริง ซัพพลายเชนในพื้นที่ที่เชื่อถือได้ และบริการระยะยาว เพื่อให้กระบวนการ UV Curing ของคุณเสถียร ทำซ้ำได้ และพร้อมสำหรับการผลิต", vi: "Tại ETIA, dịch vụ nghĩa là sản phẩm chính hãng, giải pháp theo ứng dụng, chuỗi cung ứng địa phương đáng tin cậy và dịch vụ dài hạn — giúp quy trình UV curing của bạn ổn định, lặp lại được và sẵn sàng sản xuất." }, locale)}</p>
            </div>
            <div className="relative">
              <Image src={COMMITMENT_POSTER[locale]} alt={t({ en: "ETIA Service Commitment — genuine products, application-driven solutions, local supply chain, long-term service", zh: "ETIA 服务承诺——正品保障、应用驱动、本地供应、长期服务", th: "คำมั่นสัญญาด้านบริการของ ETIA", vi: "Cam kết dịch vụ của ETIA" }, locale)} width={1244} height={1244} sizes="(max-width: 1024px) 100vw, 46vw" className="h-auto w-full rounded-2xl" priority />
            </div>
          </div>
        </div>
      </section>

      {/* Support Across the Full Equipment Lifecycle */}
      <section className="bg-[#F6F8FB] py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-bold uppercase tracking-[.18em] text-[#44B549]">Full Lifecycle</p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-[#102A43] md:text-4xl">Support Across the Full Equipment Lifecycle</h2>
          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {lifecycle.map((phase) => {
              const Icon = phase.icon;
              return (
                <div key={phase.phase} className="flex flex-col rounded-3xl border border-[#E6EAF0] bg-white p-7" style={{ borderTopColor: phase.accent, borderTopWidth: 3 }}>
                  <span className="flex h-11 w-11 items-center justify-center rounded-2xl text-white" style={{ background: phase.accent }}><Icon className="h-5 w-5" strokeWidth={1.8} /></span>
                  <p className="mt-5 text-xs font-bold uppercase tracking-wide" style={{ color: phase.accent }}>{phase.phase}</p>
                  <h3 className="mt-1 text-xl font-bold text-[#102A43]">{phase.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-[#5F6C7B]">{phase.lead}</p>
                  <ul className="mt-5 space-y-2.5">
                    {phase.points.map((pt) => (
                      <li key={pt} className="flex items-start gap-2.5 text-sm leading-6 text-[#334E68]">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: phase.accent }} />
                        {pt}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* What We Support */}
      <section className="bg-white py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-bold uppercase tracking-[.18em] text-[#44B549]">What We Support</p>
          <h2 className="mt-3 max-w-3xl text-3xl font-bold tracking-tight text-[#102A43] md:text-4xl">Applications across industrial and life science</h2>
          <p className="mt-4 max-w-3xl leading-7 text-[#5F6C7B]">ETIA supports UV curing customers across a wide range of industrial and life science applications.</p>
          <div className="mt-8 flex flex-wrap gap-2.5">
            {supported.map((a) => (
              <span key={a} className="rounded-full border border-[#1A56DB]/20 bg-[#1A56DB]/[.06] px-4 py-2 text-sm font-semibold text-[#1A56DB]">{a}</span>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
