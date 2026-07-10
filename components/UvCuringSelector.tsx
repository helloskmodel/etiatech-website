"use client";
import Link from "next/link";
import { useState } from "react";
import { Crosshair, Wind, Droplets, Radio, Zap, Lightbulb, Layers3, ScanLine, ChevronDown } from "lucide-react";
import { useLocale } from "@/components/LocaleContext";

// Application-driven, two-layer UV curing selection guide.
// Top level: four categories. UV Spot Curing and Air-Cooled UV Curing expand
// into two sub-options each; Water-Cooled and Microwave link straight to their
// landing page. Every leaf links to a product / landing page.
//
// Copy is client-supplied per language (uvCuringSelection); structure —
// icons, accents and landing-page links — lives in CONFIG and is zipped with
// the copy by index.

const uvCuringSelection = {
  en: {
    eyebrow: "UV CURING SYSTEM SELECTION",
    title: "How to Choose the Right UV Curing System",
    subtitle: "Start with your application, then match wavelength, curing area, intensity, cooling method and production needs.",
    topLayerTitle: "Choose by Technology Type",
    topLayerSubtitle: "Select the main UV curing technology first, then explore the system type that fits your process.",
    categories: [
      { title: "UV Spot Curing", subtitle: "LED Spot / Lamp Spot", description: "For precision bonding, adhesive dots, medical devices, electronics and localized curing.", cta: "Choose Spot Curing →", children: [
        { title: "UV LED Spot Curing", tag: "365 / 385 / 395 / 405 nm", description: "Wavelength-specific spot curing for adhesive dots, precision bonding and automated assembly.", cta: "Explore LED Spot →" },
        { title: "UV Lamp Spot Curing", tag: "Broad Spectrum · High Intensity", description: "High-intensity broad-spectrum spot curing for established adhesives and demanding bonding processes.", cta: "Explore Lamp Spot →" },
      ] },
      { title: "Air-Cooled UV Curing", subtitle: "Small-Area / Large-Area", description: "Compact and production-ready UV LED curing for machines, coatings, marking, printing and packaging.", cta: "Choose Air-Cooled →", children: [
        { title: "Air-Cooled Small-Area Curing", tag: "Compact · Low Heat", description: "Small-area LED exposure for compact machines, coating, marking and localized curing.", cta: "Explore Small-Area →" },
        { title: "Air-Cooled Large-Area Curing", tag: "High Output · Production Ready", description: "Air-cooled large-area LED curing for printing, packaging, coatings and continuous production lines.", cta: "Explore Large-Area →" },
      ] },
      { title: "Water-Cooled UV Curing", subtitle: "High-Power Large-Area", description: "High-output UV LED curing for wide-web, high-speed production and demanding continuous processes.", cta: "Explore Water-Cooled →", children: [] },
      { title: "Microwave UV Curing", subtitle: "Broad-Spectrum High-Dose", description: "Broad-spectrum UV curing for high-speed web, coatings, printing and established production lines.", cta: "Explore Microwave UV →", children: [] },
    ],
    finalCtaTitle: "Not sure which system fits your process?",
    finalCtaText: "Tell us your material, curing area, working distance and production speed. ETIA will help recommend the right UV curing system.",
    finalCtaButton: "Talk to an Engineer →",
  },
  zh: {
    eyebrow: "紫外线固化系统选型",
    title: "如何选择合适的紫外线固化系统",
    subtitle: "从应用出发，再匹配波长、固化面积、光强、冷却方式和生产需求。",
    topLayerTitle: "按技术类型选择",
    topLayerSubtitle: "先选择主要紫外线固化技术方向，再进入适合工艺的系统类型。",
    categories: [
      { title: "UV 点固化", subtitle: "LED 点固化 / 灯泡点固化", description: "适用于精密粘接、点胶固化、医疗器械、电子制造及局部固化应用。", cta: "选择点固化 →", children: [
        { title: "UV LED 点固化", tag: "365 / 385 / 395 / 405 nm", description: "针对特定波长的点固化，适用于点胶、精密粘接和自动化装配。", cta: "查看 LED 点固化 →" },
        { title: "UV 灯泡点固化", tag: "宽光谱 · 高强度", description: "高强度宽光谱点固化，适用于成熟胶黏剂体系和高要求粘接工艺。", cta: "查看灯泡点固化 →" },
      ] },
      { title: "风冷紫外线固化", subtitle: "小面积 / 大面积", description: "适用于设备集成、涂层、打标、印刷、包装及产线应用的 UV LED 固化。", cta: "选择风冷系统 →", children: [
        { title: "风冷小面积固化", tag: "紧凑 · 低热量", description: "适用于紧凑设备、涂层、打标及局部固化的小面积 LED 曝光。", cta: "查看小面积固化 →" },
        { title: "风冷大面积固化", tag: "高输出 · 适合量产", description: "适用于印刷、包装、涂层及连续生产线的风冷大面积 LED 固化。", cta: "查看大面积固化 →" },
      ] },
      { title: "水冷紫外线固化", subtitle: "高功率大面积", description: "适用于宽幅、高速生产及高负荷连续工艺的高输出 UV LED 固化。", cta: "查看水冷系统 →", children: [] },
      { title: "微波紫外线固化", subtitle: "宽光谱 · 高剂量", description: "适用于高速卷材、涂层、印刷及成熟产线工艺的宽光谱紫外线固化。", cta: "查看微波 UV →", children: [] },
    ],
    finalCtaTitle: "不确定哪种系统适合您的工艺？",
    finalCtaText: "告诉我们您的材料、固化面积、工作距离和生产速度，ETIA 将帮助您推荐合适的紫外线固化系统。",
    finalCtaButton: "咨询工程师 →",
  },
  vi: {
    eyebrow: "LỰA CHỌN HỆ THỐNG UV CURING",
    title: "Cách chọn hệ thống UV Curing phù hợp",
    subtitle: "Bắt đầu từ ứng dụng, sau đó kết hợp bước sóng, diện tích curing, cường độ, phương pháp làm mát và nhu cầu sản xuất.",
    topLayerTitle: "Chọn theo loại công nghệ",
    topLayerSubtitle: "Trước tiên chọn công nghệ UV curing chính, sau đó xem hệ thống phù hợp với quy trình của bạn.",
    categories: [
      { title: "UV Spot Curing", subtitle: "LED Spot / Lamp Spot", description: "Phù hợp cho liên kết chính xác, điểm keo, thiết bị y tế, điện tử và curing cục bộ.", cta: "Chọn Spot Curing →", children: [
        { title: "UV LED Spot Curing", tag: "365 / 385 / 395 / 405 nm", description: "Spot curing theo bước sóng cụ thể cho điểm keo, liên kết chính xác và lắp ráp tự động.", cta: "Khám phá LED Spot →" },
        { title: "UV Lamp Spot Curing", tag: "Quang phổ rộng · Cường độ cao", description: "Spot curing quang phổ rộng cường độ cao cho keo dán đã được thiết lập và quy trình liên kết yêu cầu cao.", cta: "Khám phá Lamp Spot →" },
      ] },
      { title: "Air-Cooled UV Curing", subtitle: "Small-Area / Large-Area", description: "UV LED curing nhỏ gọn và sẵn sàng cho sản xuất, phù hợp cho máy móc, lớp phủ, đánh dấu, in ấn và bao bì.", cta: "Chọn Air-Cooled →", children: [
        { title: "Air-Cooled Small-Area Curing", tag: "Nhỏ gọn · Nhiệt thấp", description: "Chiếu LED diện tích nhỏ cho máy compact, lớp phủ, đánh dấu và curing cục bộ.", cta: "Khám phá Small-Area →" },
        { title: "Air-Cooled Large-Area Curing", tag: "Công suất cao · Sẵn sàng sản xuất", description: "LED curing diện tích lớn làm mát bằng không khí cho in ấn, bao bì, lớp phủ và dây chuyền liên tục.", cta: "Khám phá Large-Area →" },
      ] },
      { title: "Water-Cooled UV Curing", subtitle: "Diện tích lớn · Công suất cao", description: "UV LED curing công suất cao cho web rộng, sản xuất tốc độ cao và quy trình liên tục yêu cầu cao.", cta: "Khám phá Water-Cooled →", children: [] },
      { title: "Microwave UV Curing", subtitle: "Quang phổ rộng · Liều cao", description: "UV curing quang phổ rộng cho web tốc độ cao, lớp phủ, in ấn và dây chuyền sản xuất đã được thiết lập.", cta: "Khám phá Microwave UV →", children: [] },
    ],
    finalCtaTitle: "Chưa chắc hệ thống nào phù hợp với quy trình của bạn?",
    finalCtaText: "Hãy cho chúng tôi biết vật liệu, diện tích curing, khoảng cách làm việc và tốc độ sản xuất. ETIA sẽ giúp đề xuất hệ thống UV curing phù hợp.",
    finalCtaButton: "Trao đổi với kỹ sư →",
  },
  th: {
    eyebrow: "การเลือก UV CURING SYSTEM",
    title: "วิธีเลือก UV Curing System ที่เหมาะสม",
    subtitle: "เริ่มจากการใช้งานของคุณ จากนั้นจึงพิจารณาความยาวคลื่น พื้นที่ curing ความเข้มแสง วิธีระบายความร้อน และความต้องการด้านการผลิต",
    topLayerTitle: "เลือกตามประเภทเทคโนโลยี",
    topLayerSubtitle: "เลือกเทคโนโลยี UV curing หลักก่อน แล้วจึงดูระบบที่เหมาะกับกระบวนการของคุณ",
    categories: [
      { title: "UV Spot Curing", subtitle: "LED Spot / Lamp Spot", description: "เหมาะสำหรับงานยึดติดความแม่นยำ จุดกาว อุปกรณ์การแพทย์ อิเล็กทรอนิกส์ และการ curing เฉพาะจุด", cta: "เลือก Spot Curing →", children: [
        { title: "UV LED Spot Curing", tag: "365 / 385 / 395 / 405 nm", description: "Spot curing ตามความยาวคลื่นเฉพาะ สำหรับจุดกาว งานยึดติดความแม่นยำ และงานประกอบอัตโนมัติ", cta: "ดู LED Spot →" },
        { title: "UV Lamp Spot Curing", tag: "Broad Spectrum · High Intensity", description: "Spot curing แบบ broad spectrum ความเข้มสูง สำหรับกาวที่ใช้งานอยู่แล้วและกระบวนการยึดติดที่ต้องการประสิทธิภาพสูง", cta: "ดู Lamp Spot →" },
      ] },
      { title: "Air-Cooled UV Curing", subtitle: "Small-Area / Large-Area", description: "UV LED curing ขนาดกะทัดรัดและพร้อมสำหรับการผลิต เหมาะสำหรับเครื่องจักร งานเคลือบ งานมาร์กกิ้ง งานพิมพ์ และบรรจุภัณฑ์", cta: "เลือก Air-Cooled →", children: [
        { title: "Air-Cooled Small-Area Curing", tag: "Compact · Low Heat", description: "การฉายแสง LED พื้นที่ขนาดเล็ก สำหรับเครื่องจักรขนาดกะทัดรัด งานเคลือบ งานมาร์กกิ้ง และการ curing เฉพาะจุด", cta: "ดู Small-Area →" },
        { title: "Air-Cooled Large-Area Curing", tag: "High Output · Production Ready", description: "LED curing พื้นที่ขนาดใหญ่แบบ air-cooled สำหรับงานพิมพ์ บรรจุภัณฑ์ งานเคลือบ และสายการผลิตต่อเนื่อง", cta: "ดู Large-Area →" },
      ] },
      { title: "Water-Cooled UV Curing", subtitle: "High-Power Large-Area", description: "UV LED curing กำลังสูงสำหรับงาน wide-web การผลิตความเร็วสูง และกระบวนการต่อเนื่องที่ต้องการกำลังสูง", cta: "ดู Water-Cooled →", children: [] },
      { title: "Microwave UV Curing", subtitle: "Broad-Spectrum High-Dose", description: "UV curing แบบ broad spectrum สำหรับงาน web ความเร็วสูง งานเคลือบ งานพิมพ์ และสายการผลิตเดิมที่ใช้งานต่อเนื่อง", cta: "ดู Microwave UV →", children: [] },
    ],
    finalCtaTitle: "ยังไม่แน่ใจว่าระบบใดเหมาะกับกระบวนการของคุณ?",
    finalCtaText: "แจ้งวัสดุ พื้นที่ curing ระยะทำงาน และความเร็วการผลิตของคุณให้เรา ETIA จะช่วยแนะนำ UV curing system ที่เหมาะสม",
    finalCtaButton: "ปรึกษาวิศวกร →",
  },
} as const;

// Structure zipped with the copy by index: icons, ETIA blue/green accents and
// the landing-page links each card / sub-option navigates to.
const CONFIG: {
  icon: typeof Crosshair;
  accent: string;
  soft: string;
  href?: string;
  childIcons?: (typeof Crosshair)[];
  childHrefs?: string[];
}[] = [
  { icon: Crosshair, accent: "#1A56DB", soft: "#EEF3FF", childIcons: [Zap, Lightbulb], childHrefs: ["/product/omnicure", "/product/omnicure/s2000"] },
  { icon: Wind, accent: "#2F80ED", soft: "#EEF6FF", childIcons: [Layers3, ScanLine], childHrefs: ["/product/omnicure", "/product/omnicure"] },
  { icon: Droplets, accent: "#087F6B", soft: "#EAF6F3", href: "/product/phoseon" },
  { icon: Radio, accent: "#6BBF3A", soft: "#F1FBEC", href: "/product/systems" },
];

export default function UvCuringSelector() {
  const { locale } = useLocale();
  const c = uvCuringSelection[locale] ?? uvCuringSelection.en;
  const [open, setOpen] = useState<number | null>(null);
  const activeCfg = open !== null ? CONFIG[open] : undefined;
  const activeCat = open !== null ? c.categories[open] : undefined;

  return (
    <section id="uv-curing-selector" className="bg-white">
      {/* Intro */}
      <div className="mx-auto max-w-7xl px-4 pt-24 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <p className="text-xs font-bold uppercase tracking-[.18em] text-[#44B549]">{c.eyebrow}</p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-[#102A43] md:text-5xl">{c.title}</h2>
          <p className="mt-5 text-lg font-semibold text-[#1A56DB]">{c.subtitle}</p>
        </div>
      </div>

      {/* Top-level: four category cards (2×2 / stacked on mobile) */}
      <div className="mx-auto max-w-7xl px-4 pt-12 sm:px-6 lg:px-8">
        <p className="text-xs font-bold uppercase tracking-[.14em] text-[#1A56DB]">{c.topLayerTitle}</p>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-[#5F6C7B]">{c.topLayerSubtitle}</p>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {c.categories.map((cat, i) => {
            const cfg = CONFIG[i];
            const Icon = cfg.icon;
            const expandable = cat.children.length > 0;
            const isOpen = open === i;
            const inner = (
              <>
                <div className="flex items-start justify-between gap-3">
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl" style={{ background: cfg.soft, color: cfg.accent }}>
                    <Icon className="h-6 w-6" strokeWidth={1.8} />
                  </span>
                  {expandable && <ChevronDown className={`h-5 w-5 text-[#98A6B8] transition-transform ${isOpen ? "rotate-180" : ""}`} />}
                </div>
                <h3 className="mt-4 text-lg font-bold leading-snug text-[#102A43]">{cat.title}</h3>
                <p className="mt-1 text-[11px] font-bold uppercase tracking-wide" style={{ color: cfg.accent }}>{cat.subtitle}</p>
                <p className="mt-3 flex-1 text-sm leading-6 text-[#5F6C7B]">{cat.description}</p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold" style={{ color: cfg.accent }}>{cat.cta}</span>
              </>
            );
            const cls = "group flex h-full flex-col rounded-3xl border border-[#E6EAF0] bg-[#FAFBFC] p-6 text-left transition hover:-translate-y-1 hover:border-[#D4DFEC] hover:bg-white hover:shadow-[0_16px_44px_rgba(15,36,68,.08)]";
            return expandable ? (
              <button key={i} type="button" aria-expanded={isOpen} onClick={() => setOpen(isOpen ? null : i)} className={cls} style={{ borderTopColor: cfg.accent, borderTopWidth: 3, ...(isOpen ? { borderColor: cfg.accent } : {}) }}>
                {inner}
              </button>
            ) : (
              <Link key={i} href={cfg.href!} className={cls} style={{ borderTopColor: cfg.accent, borderTopWidth: 3 }}>
                {inner}
              </Link>
            );
          })}
        </div>

        {/* Second-level: sub-options for the expanded category */}
        {activeCat && activeCfg && activeCat.children.length > 0 && (
          <div className="mt-4 rounded-3xl border border-[#E6EAF0] bg-[#F6F8FB] p-4 sm:p-6">
            <p className="mb-4 px-1 text-xs font-bold uppercase tracking-[.14em]" style={{ color: activeCfg.accent }}>{activeCat.title}</p>
            <div className="grid gap-4 sm:grid-cols-2">
              {activeCat.children.map((sub, j) => {
                const SubIcon = activeCfg.childIcons?.[j] ?? activeCfg.icon;
                const href = activeCfg.childHrefs?.[j] ?? "/product/systems";
                return (
                  <Link key={j} href={href} className="group flex flex-col rounded-2xl border border-[#E6EAF0] bg-white p-5 transition hover:-translate-y-1 hover:border-[#D4DFEC] hover:shadow-[0_14px_40px_rgba(15,36,68,.08)]">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl" style={{ background: activeCfg.soft, color: activeCfg.accent }}>
                      <SubIcon className="h-5 w-5" strokeWidth={1.8} />
                    </span>
                    <h4 className="mt-4 text-base font-bold leading-snug text-[#102A43]">{sub.title}</h4>
                    <p className="mt-1 text-[11px] font-bold uppercase tracking-wide" style={{ color: activeCfg.accent }}>{sub.tag}</p>
                    <p className="mt-3 flex-1 text-sm leading-6 text-[#5F6C7B]">{sub.description}</p>
                    <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold" style={{ color: activeCfg.accent }}>{sub.cta}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Final CTA */}
      <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-[32px] bg-gradient-to-br from-[#143C96] to-[#1F63D6] px-6 py-14 text-center text-white sm:px-10">
          <h2 className="mx-auto max-w-2xl text-3xl font-bold md:text-4xl">{c.finalCtaTitle}</h2>
          <p className="mx-auto mt-5 max-w-3xl leading-7 text-blue-100">{c.finalCtaText}</p>
          <div className="mt-8 flex justify-center">
            <Link href="/contact" className="inline-flex items-center justify-center rounded-xl bg-[#44B549] px-7 py-3.5 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-[#3A9D3F]">{c.finalCtaButton}</Link>
          </div>
        </div>
      </div>
    </section>
  );
}
