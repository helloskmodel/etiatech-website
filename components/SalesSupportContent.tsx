"use client";
import Image from "next/image";
import { ClipboardCheck, Settings2, LifeBuoy, ArrowRight } from "lucide-react";
import { useLocale, t, type Locale, type LangText } from "@/components/LocaleContext";

const IMG = "https://etiatech-1303055923.cos.ap-singapore.myqcloud.com/IMAGE/logo";

// ETIA Service Commitment poster — one per language, shown on the right.
// ?v bump forces Next's image optimizer to refetch after the artwork is
// re-exported at the same COS filename (COS serves no Cache-Control header).
const POSTER_V = "3";
const COMMITMENT_POSTER: Record<Locale, string> = {
  en: `${IMG}/ETIA%20SERVICE-EN.png?v=${POSTER_V}`,
  zh: `${IMG}/ETIA%20SERVICE-CN.png?v=${POSTER_V}`,
  th: `${IMG}/ETIA%20SERVICE-TH.png?v=${POSTER_V}`,
  vi: `${IMG}/ETIA%20SERVICE-VN.png?v=${POSTER_V}`,
};

const lifecycle: Array<{ icon: typeof ClipboardCheck; phase: LangText; title: LangText; lead: LangText; pills: LangText[]; cta: LangText; href: string; accent: string }> = [
  {
    icon: ClipboardCheck,
    phase: { en: "Before Purchase", zh: "购买前", th: "ก่อนการซื้อ", vi: "Trước khi mua" },
    title: { en: "Selection & Application", zh: "选型与应用", th: "การเลือกและการใช้งาน", vi: "Lựa chọn & ứng dụng" },
    lead: { en: "We evaluate your application and match the right UV curing system before you buy — from adhesive and material to working distance and exposure area.", zh: "在您下单前，我们评估您的应用并匹配合适的紫外线固化系统——从胶粘剂、材料到工作距离与照射面积。", th: "ก่อนที่คุณจะซื้อ เราประเมินการใช้งานและจับคู่ระบบ UV Curing ที่เหมาะสม ตั้งแต่กาวและวัสดุ ไปจนถึงระยะทำงานและพื้นที่ฉายแสง", vi: "Trước khi bạn mua, chúng tôi đánh giá ứng dụng và chọn hệ thống UV curing phù hợp — từ keo và vật liệu đến khoảng cách làm việc và diện tích chiếu." },
    pills: [
      { en: "Application review", zh: "应用评估", th: "ประเมินการใช้งาน", vi: "Đánh giá ứng dụng" },
      { en: "Selection advice", zh: "选型建议", th: "คำแนะนำการเลือก", vi: "Tư vấn lựa chọn" },
      { en: "Material match", zh: "材料匹配", th: "จับคู่วัสดุ", vi: "Phù hợp vật liệu" },
      { en: "Dose & exposure", zh: "剂量与照射", th: "โดสและการฉายแสง", vi: "Liều & chiếu xạ" },
    ],
    cta: { en: "Get selection help", zh: "获取选型支持", th: "ขอความช่วยเหลือด้านการเลือก", vi: "Nhận hỗ trợ lựa chọn" },
    href: "#inquiries",
    accent: "#1A56DB",
  },
  {
    icon: Settings2,
    phase: { en: "During Implementation", zh: "导入实施中", th: "ระหว่างการติดตั้งใช้งาน", vi: "Trong quá trình triển khai" },
    title: { en: "Setup & Training", zh: "安装与培训", th: "การติดตั้งและการฝึกอบรม", vi: "Lắp đặt & đào tạo" },
    lead: { en: "We support the move from delivery to production — installation, system setup, operator training and process guidance.", zh: "我们支持从交付到投产的过渡——安装、系统调试、操作培训与工艺指导。", th: "เราสนับสนุนการเปลี่ยนผ่านจากการส่งมอบสู่การผลิต ทั้งการติดตั้ง การตั้งค่าระบบ การฝึกอบรมผู้ปฏิบัติงาน และคำแนะนำด้านกระบวนการ", vi: "Chúng tôi hỗ trợ chuyển từ giao hàng đến sản xuất — lắp đặt, cài đặt hệ thống, đào tạo vận hành và hướng dẫn quy trình." },
    pills: [
      { en: "Installation", zh: "安装指导", th: "การติดตั้ง", vi: "Lắp đặt" },
      { en: "System setup", zh: "系统调试", th: "ตั้งค่าระบบ", vi: "Cài đặt hệ thống" },
      { en: "Operator training", zh: "操作培训", th: "ฝึกอบรมผู้ใช้", vi: "Đào tạo vận hành" },
      { en: "Safety & care", zh: "安全与维护", th: "ความปลอดภัยและดูแล", vi: "An toàn & bảo dưỡng" },
    ],
    cta: { en: "Plan your setup", zh: "咨询安装培训", th: "วางแผนการติดตั้ง", vi: "Lên kế hoạch lắp đặt" },
    href: "#inquiries",
    accent: "#0E9AA7",
  },
  {
    icon: LifeBuoy,
    phase: { en: "After Sales", zh: "售后", th: "หลังการขาย", vi: "Sau bán hàng" },
    title: { en: "Service & Reliability", zh: "服务与可靠性", th: "บริการและความน่าเชื่อถือ", vi: "Dịch vụ & độ tin cậy" },
    lead: { en: "We stay with you after install — online and onsite support, maintenance, spare parts and long-term technical communication.", zh: "安装完成后我们持续陪伴——在线与现场支持、维护保养、备件耗材及长期技术沟通。", th: "หลังติดตั้งเรายังอยู่เคียงข้างคุณ ทั้งการสนับสนุนออนไลน์และหน้างาน การบำรุงรักษา อะไหล่ และการสื่อสารทางเทคนิคระยะยาว", vi: "Sau khi lắp đặt, chúng tôi luôn đồng hành — hỗ trợ trực tuyến và tại chỗ, bảo trì, phụ tùng và trao đổi kỹ thuật lâu dài." },
    pills: [
      { en: "Online support", zh: "在线支持", th: "สนับสนุนออนไลน์", vi: "Hỗ trợ trực tuyến" },
      { en: "Onsite fix", zh: "现场排查", th: "แก้ไขหน้างาน", vi: "Xử lý tại chỗ" },
      { en: "Spare parts", zh: "备件耗材", th: "อะไหล่", vi: "Phụ tùng" },
      { en: "Long-term care", zh: "长期维保", th: "ดูแลระยะยาว", vi: "Bảo trì lâu dài" },
    ],
    cta: { en: "Request service", zh: "申请服务支持", th: "ขอรับบริการ", vi: "Yêu cầu dịch vụ" },
    href: "#inquiries",
    accent: "#087F6B",
  },
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
              <p className="text-xs font-bold uppercase tracking-[.18em] text-[#41A62A]">{t({ en: "ETIA Service Commitment", zh: "ETIA 服务承诺", th: "คำมั่นสัญญาด้านบริการของ ETIA", vi: "Cam kết dịch vụ của ETIA" }, locale)}</p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-[#102A43] md:text-4xl">{t({ en: "Service means more than supplying equipment", zh: "服务 不止于提供设备", th: "บริการที่มากกว่าการจัดหาอุปกรณ์", vi: "Dịch vụ không chỉ là cung cấp thiết\u00A0bị" }, locale)}</h2>
              <p className="mt-5 leading-7 text-[#5F6C7B]">{t({ en: "At ETIA, service means genuine products, application-driven solutions, a dependable local supply chain, and long-term service — keeping your UV curing process stable, repeatable, and production-ready.", zh: "在 ETIA，服务意味着正品渠道、应用驱动的解决方案、可靠的本地供应链与长期服务——让您的 UV Curing 紫外线固化工艺保持稳定、可重复、随时可投入生产。", th: "ที่ ETIA บริการหมายถึงสินค้าของแท้ โซลูชันที่ขับเคลื่อนด้วยการใช้งานจริง ซัพพลายเชนในพื้นที่ที่เชื่อถือได้ และบริการระยะยาว เพื่อให้กระบวนการ UV Curing ของคุณเสถียร ทำซ้ำได้ และพร้อมสำหรับการผลิต", vi: "Tại ETIA, dịch vụ nghĩa là sản phẩm chính hãng, giải pháp theo ứng dụng, chuỗi cung ứng địa phương đáng tin cậy và dịch vụ dài hạn — giúp quy trình UV curing của bạn ổn định, lặp lại được và sẵn sàng sản xuất." }, locale)}</p>
            </div>
            <div className="relative">
              <Image src={COMMITMENT_POSTER[locale]} alt={t({ en: "ETIA Service Commitment — genuine products, application-driven solutions, local supply chain, long-term service", zh: "ETIA 服务承诺——正品渠道、应用驱动、本地供应、长期服务", th: "คำมั่นสัญญาด้านบริการของ ETIA", vi: "Cam kết dịch vụ của ETIA" }, locale)} width={1244} height={1244} sizes="(max-width: 1024px) 60vw, 320px" className="mx-auto h-auto w-full max-w-xs rounded-2xl" priority />
            </div>
          </div>
        </div>
      </section>

      {/* Self-service troubleshooter — Chinese-only trial. The tool itself
          lives in public/tools/; add languages by extending its data JSON,
          then widen this locale gate. */}
      {locale === "zh" && (
        <section className="bg-[#F6F8FB] py-16 sm:py-20">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
            <p className="text-xs font-bold uppercase tracking-[.18em] text-[#41A62A]">自助支持</p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-[#102A43] md:text-4xl">故障排查向导</h2>
            <p className="mx-auto mt-4 max-w-xl leading-7 text-[#5F6C7B]">
              基于官方用户指南的故障排查章节整理。按提示选择设备与症状，一步步定位原因与处理方法——查不出的问题再联系工程师。
            </p>
            <a
              href="/tools/troubleshooter"
              className="mt-8 inline-flex items-center gap-2 rounded-xl bg-[#1A56DB] px-7 py-3.5 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-[#1A56DB]"
            >
              🔧 开始排查 <ArrowRight className="h-4 w-4" />
            </a>
            <p className="mt-3 text-xs text-[#7B8794]">试用版 · 当前覆盖 OmniCure LX500 常见故障</p>
          </div>
        </section>
      )}

      {/* Support Across the Full Equipment Lifecycle */}
      <section className="bg-white py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-bold uppercase tracking-[.18em] text-[#41A62A]">{t({ en: "Full Lifecycle", zh: "全生命周期", th: "ตลอดวงจรการใช้งาน", vi: "Toàn vòng đời" }, locale)}</p>
          <h2 className="mt-3 max-w-2xl text-3xl font-bold tracking-tight text-[#102A43] md:text-4xl">{t({ en: "Support Across the Full Equipment Lifecycle", zh: "覆盖设备全生命周期的支持", th: "การสนับสนุนตลอดวงจรการใช้งานของอุปกรณ์", vi: "Hỗ trợ suốt vòng đời thiết bị" }, locale)}</h2>
          <div className="mt-10 grid items-stretch gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {lifecycle.map((phase) => {
              const Icon = phase.icon;
              return (
                <div key={phase.phase.en} className="flex h-full flex-col rounded-3xl border border-[#E6EAF0] bg-[#F6F8FB] p-6 sm:p-7">
                  {/* Stage label with small accent icon */}
                  <div className="flex items-center gap-2.5">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-white" style={{ background: phase.accent }}><Icon className="h-4 w-4" strokeWidth={1.8} /></span>
                    <p className="text-[11px] font-bold uppercase tracking-[.14em]" style={{ color: phase.accent }}>{t(phase.phase, locale)}</p>
                  </div>
                  {/* Accent line */}
                  <span className="mt-4 block h-0.5 w-10 rounded-full" style={{ background: phase.accent }} />
                  <h3 className="mt-4 text-xl font-bold leading-snug text-[#102A43]">{t(phase.title, locale)}</h3>
                  <p className="mt-3 text-sm leading-6 text-[#5F6C7B]">{t(phase.lead, locale)}</p>
                  {/* Four keyword pills */}
                  <div className="mt-5 flex flex-wrap gap-2">
                    {phase.pills.map((pill) => (
                      <span key={pill.en} className="rounded-full border bg-white px-3 py-1 text-xs font-semibold" style={{ borderColor: `${phase.accent}33`, color: phase.accent }}>{t(pill, locale)}</span>
                    ))}
                  </div>
                  {/* CTA */}
                  <a href={phase.href} className="mt-auto inline-flex items-center gap-1.5 pt-6 text-sm font-bold transition hover:gap-2.5" style={{ color: phase.accent }}>{t(phase.cta, locale)} <ArrowRight className="h-4 w-4" /></a>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
