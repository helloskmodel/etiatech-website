"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState, type ComponentType, type ReactNode } from "react";
import {
  ArrowRight,
  BadgeCheck,
  ChevronLeft,
  ChevronRight,
  GraduationCap,
  Warehouse,
  Wrench,
} from "lucide-react";
import { inquiryMailto } from "@/components/contact";
import { useLocale, t, type LangText, type Locale } from "@/components/LocaleContext";
import { industries } from "@/data/industriesData";
import { productImage, products } from "@/components/productCatalog";
import TrustStrip from "@/components/TrustStrip";
import FinalCta from "@/components/FinalCta";
import NewsTicker from "@/components/NewsTicker";
import CustomerLogos from "@/components/CustomerLogos";

const whyCards: { title: LangText; body: LangText; icon: ComponentType<{ className?: string; strokeWidth?: number }> }[] = [
  { title: { en: "20 Years of Application Experience", zh: "20 年应用经验", th: "ประสบการณ์ด้านการใช้งาน 20 ปี", vi: "20 năm kinh nghiệm ứng dụng" }, body: { en: "Hands-on UV curing knowledge across medical, electronics, photonics, automotive and industrial manufacturing.", zh: "覆盖医疗、电子、光子、汽车及工业制造场景，提供贴近现场的紫外线固化经验。", th: "เรามีความรู้ด้าน UV curing จากประสบการณ์จริง ครอบคลุมงานผลิตในอุตสาหกรรมการแพทย์ อิเล็กทรอนิกส์ โฟโตนิกส์ ยานยนต์ และอุตสาหกรรมการผลิตทั่วไป", vi: "Chúng tôi có kiến thức thực tiễn về UV curing trong các lĩnh vực sản xuất thiết bị y tế, điện tử, quang tử, ô tô và sản xuất công nghiệp." }, icon: GraduationCap },
  { title: { en: "Authorized & Genuine Supply", zh: "授权正品供应", th: "ช่องทางจัดจำหน่ายที่ได้รับอนุญาตและสินค้าของแท้", vi: "Nguồn cung được ủy quyền & sản phẩm chính hãng" }, body: { en: "Genuine systems, replacement lamps and accessories through authorized supply channels.", zh: "正品设备、替换灯泡与配套附件，来源可靠，供应规范。", th: "จัดหาเครื่อง UV curing หลอดไฟสำรอง และอุปกรณ์เสริมของแท้ ผ่านช่องทางจัดจำหน่ายที่ได้รับอนุญาต", vi: "Cung cấp hệ thống UV curing, đèn thay thế và phụ kiện chính hãng thông qua các kênh cung ứng được ủy quyền." }, icon: BadgeCheck },
  { title: { en: "Local Stock & Fast Response", zh: "本地库存 快速响应", th: "สต็อกในประเทศ ตอบสนองรวดเร็ว", vi: "Kho hàng địa phương & phản hồi nhanh" }, body: { en: "Local equipment and consumables help reduce lead time and production risk.", zh: "本地备货，缩短交期，降低停线与生产风险。", th: "มีอุปกรณ์และวัสดุสิ้นเปลืองในสต็อกท้องถิ่น ช่วยลดระยะเวลารอสินค้าและลดความเสี่ยงต่อการผลิต", vi: "Thiết bị và vật tư tiêu hao có sẵn tại địa phương giúp rút ngắn thời gian giao hàng và giảm rủi ro gián đoạn sản xuất." }, icon: Warehouse },
  { title: { en: "In-House Repair & Lifecycle Support", zh: "内部维修 长期支持", th: "บริการซ่อมและการสนับสนุนตลอดอายุการใช้งาน", vi: "Sửa chữa nội bộ & hỗ trợ vòng đời sản phẩm" }, body: { en: "Troubleshooting, maintenance and repair coordination to keep your process running.", zh: "故障排查、维护保养与维修协调，保障工艺持续稳定运行。", th: "ให้การสนับสนุนด้านการแก้ไขปัญหา การบำรุงรักษา และการประสานงานซ่อม เพื่อช่วยให้กระบวนการผลิตดำเนินต่อไปอย่างมั่นคง", vi: "Hỗ trợ xử lý sự cố, bảo trì và điều phối sửa chữa nhằm giúp quy trình sản xuất vận hành ổn định." }, icon: Wrench },
];

// OmniCure systems featured in the hero product carousel (all have COS assets).
const heroProductSlugs = ["s1500-pro", "lx500", "v3-led-heads", "ac8", "ac5", "ls200"];

// Chinese headings break between any two hanzi by default, which can split a
// bound word (伙伴 / 品牌 / 应用说明 / 案例分享) awkwardly across two lines. For
// zh we render a custom node that keeps the trailing phrase together (and, where
// noted, forces a mobile-only break); every other locale renders normally.
function CjkHeading({ locale, text, zh }: { locale: Locale; text: LangText; zh: ReactNode }) {
  return <>{locale === "zh" ? zh : t(text, locale)}</>;
}

function product(slug: string) {
  return products.find((item) => item.slug === slug);
}

export default function HomeView() {
  const { locale } = useLocale();
  const engineerMail = inquiryMailto(locale, { subject: "UV Curing Engineering Inquiry", context: "Application / adhesive / curing area / wavelength / production requirements" });
  const omnicureProduct = product("s2000-elite") ?? product("lx500");
  const phoseonProduct = product("nexus-ii") ?? product("firejet-one");

  const heroProducts = heroProductSlugs
    .map((slug) => product(slug))
    .filter((p): p is NonNullable<typeof p> => !!p && !!productImage(p));
  const [heroIndex, setHeroIndex] = useState(0);
  // Only the current slide downloads on first paint; the next one starts
  // after the first image has loaded. Mounting all six at once made every
  // hidden slide download immediately and compete with the hero LCP.
  const [heroReady, setHeroReady] = useState(false);
  useEffect(() => {
    if (heroProducts.length <= 1) return;
    const timer = setInterval(() => setHeroIndex((i) => (i + 1) % heroProducts.length), 3500);
    return () => clearInterval(timer);
  }, [heroProducts.length]);

  const caseScrollRef = useRef<HTMLDivElement>(null);
  const scrollCases = (dir: number) => caseScrollRef.current?.scrollBy({ left: dir * 320, behavior: "smooth" });

  return <div className="bg-white text-[#102038]">
    <section className="relative overflow-hidden border-b border-[#D9E4EA] bg-gradient-to-br from-white via-[#EEF6FF] to-[#F1FAEF]">
      <div className="absolute -right-36 -top-36 h-[34rem] w-[34rem] rounded-full bg-[#1A56DB]/10 blur-3xl" />
      <div className="absolute -bottom-40 left-1/3 h-96 w-96 rounded-full bg-[#63C94A]/10 blur-3xl" />
      <div className="relative mx-auto grid max-w-7xl gap-12 px-4 py-12 sm:px-6 md:py-16 lg:grid-cols-[1.05fr_.95fr] lg:items-start lg:px-8">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-[#41A62A]/20 bg-white px-3 py-1.5 text-xs font-bold text-[#41A62A] shadow-sm"><BadgeCheck className="h-4 w-4" />{t({ en: "Authorized Distributor · Genuine Products Through Official Channels", zh: "授权经销 · 官方渠道正品", th: "ตัวแทนจำหน่ายที่ได้รับอนุญาต · สินค้าของแท้ผ่านช่องทางอย่างเป็นทางการ" , vi: "Nhà phân phối được ủy quyền · Sản phẩm chính hãng qua kênh chính thức" }, locale)}</span>
          <h1 className="mt-6 max-w-4xl text-4xl font-bold leading-[1.08] tracking-tight text-[#143C96] md:text-6xl"><CjkHeading locale={locale} text={{ en: "Your UV Curing Solution Partner", zh: "紫外线固化 就找 ETIA", th: "โซลูชัน UV Curing เลือก ETIA", vi: "Giải pháp UV Curing, hãy chọn ETIA" }} zh={<>紫外线固化 就找 ETIA</>} /><span className="mt-2 block text-2xl font-bold text-[#41A62A] md:text-4xl">{t({ en: "From Selection to Support.", zh: "选型 应用 售后 一站支持", th: "การเลือกอุปกรณ์ การใช้งาน และบริการหลังการขาย — รองรับครบวงจร", vi: "Tư vấn lựa chọn, ứng dụng và hậu mãi — hỗ trợ trọn gói." }, locale)}</span></h1>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row"><Link href="/product/omnicure" className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#41A62A] px-6 py-3.5 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-[#358B22]">{t({ en: "Explore Products", zh: "浏览产品", th: "ดูสินค้า" , vi: "Khám phá sản phẩm" }, locale)} <ArrowRight className="h-4 w-4" /></Link><a href={engineerMail} className="inline-flex items-center justify-center rounded-xl border border-[#D4DFEC] bg-white px-6 py-3.5 text-sm font-bold text-[#143C96] transition hover:-translate-y-0.5 hover:border-[#143C96] hover:text-[#1A56DB]">{t({ en: "Talk to an Engineer", zh: "咨询工程师", th: "ปรึกษาวิศวกร" , vi: "Trao đổi với kỹ sư" }, locale)}</a></div>
        </div>
        <div className="relative min-h-[340px] rounded-[32px] border border-white/80 bg-white/75 p-5 shadow-[0_25px_80px_rgba(20,60,150,.12)] backdrop-blur sm:p-8">
          <div className="absolute left-10 right-10 top-1/2 h-24 -translate-y-1/2 rounded-full bg-gradient-to-r from-[#1A56DB]/20 via-[#63C94A]/35 to-transparent blur-2xl" />
          {heroProducts.map((p, i) => {
            const n = heroProducts.length;
            const isCurrent = i === heroIndex;
            const isNeighbor = i === (heroIndex + 1) % n || i === (heroIndex + n - 1) % n;
            // Mount only the visible slide plus (once it has loaded) its
            // neighbors, so the next fade-in is already cached without
            // downloading all slides up front.
            if (!isCurrent && !(heroReady && isNeighbor)) return null;
            return <Image key={p.slug} src={productImage(p)} alt={p.name} fill priority={i === 0} onLoad={i === 0 ? () => setHeroReady(true) : undefined} sizes="(max-width: 1024px) 100vw, 46vw" className={`object-contain p-16 transition-opacity duration-700 ${isCurrent ? "opacity-100" : "opacity-0"}`} />;
          })}
          {heroProducts.length > 1 && <div className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 gap-2">{heroProducts.map((p, i) => <button key={p.slug} type="button" aria-label={`Show ${p.name}`} onClick={() => setHeroIndex(i)} className={`h-2 rounded-full transition-all ${i === heroIndex ? "w-6 bg-[#143C96]" : "w-2 bg-[#143C96]/25"}`} />)}</div>}
          <div className="absolute left-4 top-5 rounded-xl border border-[#D9E4EA] bg-white px-4 py-3 shadow-lg sm:left-6"><p className="text-xs font-bold text-[#143C96]">{t({ en: "Genuine Products", zh: "官方渠道正品", th: "สินค้าของแท้", vi: "Sản phẩm chính hãng" }, locale)}</p><p className="mt-1 text-[10px] text-[#667085]">{t({ en: "Authorized supply", zh: "授权经销", th: "จัดหาอย่างเป็นทางการ" , vi: "Nguồn cung được ủy quyền" }, locale)}</p></div>
          <div className="absolute right-4 top-1/3 rounded-xl border border-[#D9E4EA] bg-white px-4 py-3 shadow-lg sm:right-6"><p className="text-xs font-bold text-[#143C96]">{t({ en: "Application Support", zh: "应用支持", th: "การสนับสนุนด้านการใช้งาน" , vi: "Hỗ trợ ứng dụng" }, locale)}</p><p className="mt-1 text-[10px] text-[#667085]">{t({ en: "Engineer-led selection", zh: "工程师主导选型", th: "การเลือกโดยวิศวกร" , vi: "Kỹ sư tư vấn lựa chọn" }, locale)}</p></div>
          <div className="absolute bottom-5 left-8 rounded-xl border border-[#D9E4EA] bg-white px-4 py-3 shadow-lg"><p className="text-xs font-bold text-[#41A62A]">{t({ en: "In-House Repair", zh: "内部维修能力", th: "ศูนย์ซ่อมภายใน" , vi: "Sửa chữa nội bộ" }, locale)}</p><p className="mt-1 text-[10px] text-[#667085]">{t({ en: "Lifecycle support", zh: "全生命周期支持", th: "การสนับสนุนตลอดอายุการใช้งาน" , vi: "Hỗ trợ trọn vòng đời" }, locale)}</p></div>
        </div>
      </div>
    </section>

    <TrustStrip />
    <NewsTicker />
    <CustomerLogos />

    <section className="px-4 pt-14 pb-20 sm:px-6 md:pt-20 lg:px-8"><div className="mx-auto max-w-7xl"><p className="text-xs font-bold uppercase tracking-[.18em] text-[#41A62A]">{t({ en: "Authorized Brand Solutions", zh: "授权品牌解决方案", th: "โซลูชันแบรนด์ที่ได้รับอนุญาต", vi: "Giải pháp thương hiệu được ủy quyền" }, locale)}</p><h2 className="mt-3 text-3xl font-bold text-[#143C96] md:text-4xl">{t({ en: "Industry-Leading UV Curing Brands", zh: "行业知名的紫外线固化品牌", th: "แบรนด์ UV Curing ชั้นนำในอุตสาหกรรม", vi: "Các thương hiệu UV Curing uy tín trong ngành" }, locale)}</h2><div className="mt-10 grid gap-6 lg:grid-cols-2"><Link href="/product/omnicure" className="group grid overflow-hidden rounded-3xl border border-[#D9E4EA] bg-gradient-to-br from-white to-[#EEF6FF] sm:grid-cols-[1fr_.9fr]"><div className="p-8"><span className="text-xs font-bold uppercase tracking-[.14em] text-[#41A62A]">{t({ en: "Precision Manufacturing", zh: "精密制造", th: "การผลิตที่ต้องการความแม่นยำ", vi: "Sản xuất chính xác" }, locale)}</span><h3 className="mt-3 text-2xl font-bold text-[#143C96]">{t({ en: "OmniCure UV Curing Systems", zh: "OmniCure 紫外线固化系统", th: "ระบบ UV Curing จาก OmniCure", vi: "Hệ thống UV Curing OmniCure" }, locale)}</h3><p className="mt-4 text-sm leading-6 text-[#667085]">{t({ en: "Precision UV curing for assembly, bonding, medical devices and electronics.", zh: "适用于装配、粘接、医疗器械和电子制造的精密紫外线固化。", th: "UV curing ที่แม่นยำสำหรับงานประกอบ งานยึดติด อุปกรณ์การแพทย์ และอิเล็กทรอนิกส์", vi: "UV curing chính xác cho lắp ráp, liên kết, thiết bị y tế và điện tử." }, locale)}</p><span className="mt-7 inline-flex items-center gap-2 text-sm font-bold text-[#143C96]">{t({ en: "Explore OmniCure", zh: "了解 OmniCure", th: "ดูเพิ่มเติมเกี่ยวกับ OmniCure", vi: "Khám phá OmniCure" }, locale)} <ArrowRight className="h-4 w-4"/></span></div><div className="relative min-h-64 bg-white/60">{omnicureProduct&&productImage(omnicureProduct)&&<Image src={productImage(omnicureProduct)} alt="OmniCure UV curing system" fill sizes="(max-width:1024px) 100vw, 45vw" className="object-contain p-7 transition group-hover:scale-105"/>}</div></Link><Link href="/product/phoseon" className="group grid overflow-hidden rounded-3xl border border-[#D9E4EA] bg-gradient-to-br from-white to-[#F1FAEF] sm:grid-cols-[1fr_.9fr]"><div className="p-8"><span className="text-xs font-bold uppercase tracking-[.14em] text-[#41A62A]">{t({ en: "Industrial UV LED", zh: "工业 UV LED", th: "UV LED สำหรับอุตสาหกรรม", vi: "UV LED công nghiệp" }, locale)}</span><h3 className="mt-3 text-2xl font-bold text-[#143C96]">{t({ en: "Phoseon UV LED Curing Systems", zh: "Phoseon UV LED 固化系统", th: "ระบบ UV LED Curing จาก Phoseon", vi: "Hệ thống UV LED Curing Phoseon" }, locale)}</h3><p className="mt-4 text-sm leading-6 text-[#667085]">{t({ en: "Industrial UV LED curing for inks, coatings, printing, packaging and production lines.", zh: "适用于油墨、涂层、印刷、包装及生产线的工业 UV LED 固化。", th: "UV LED curing สำหรับหมึกพิมพ์ สารเคลือบ งานพิมพ์ บรรจุภัณฑ์ และสายการผลิต", vi: "UV LED curing công nghiệp cho mực in, lớp phủ, in ấn, bao bì và dây chuyền sản xuất." }, locale)}</p><span className="mt-7 inline-flex items-center gap-2 text-sm font-bold text-[#41A62A]">{t({ en: "Explore Phoseon", zh: "了解 Phoseon", th: "ดูเพิ่มเติมเกี่ยวกับ Phoseon", vi: "Khám phá Phoseon" }, locale)} <ArrowRight className="h-4 w-4"/></span></div><div className="relative min-h-64 bg-white/60">{phoseonProduct&&productImage(phoseonProduct)&&<Image src={productImage(phoseonProduct)} alt="Phoseon industrial UV LED curing system" fill sizes="(max-width:1024px) 100vw, 45vw" className="object-contain p-7 transition group-hover:scale-105"/>}</div></Link></div></div></section>

    <section className="bg-gradient-to-br from-[#143C96] to-[#1A56DB] px-4 py-16 text-white sm:px-6 lg:px-8 md:py-20"><div className="mx-auto max-w-7xl"><div className="flex items-end justify-between gap-4"><div><h2 className="text-3xl font-bold md:text-4xl">{t({ en: "Solutions by Industry", zh: "按行业找方案", th: "โซลูชันตามอุตสาหกรรม", vi: "Giải pháp theo ngành" }, locale)}</h2><p className="mt-3 max-w-xl text-sm text-white/75">{t({ en: "Pick your industry to see recommended systems, process tips and proven applications.", zh: "选择您的行业,查看推荐系统、工艺建议与实战应用。", th: "เลือกอุตสาหกรรมของคุณเพื่อดูระบบที่แนะนำ เคล็ดลับกระบวนการ และการใช้งานที่พิสูจน์แล้ว", vi: "Chọn ngành của bạn để xem hệ thống khuyến nghị, mẹo quy trình và ứng dụng đã kiểm chứng." }, locale)}</p></div><Link href="/industries" className="hidden items-center gap-2 text-sm font-bold text-white sm:inline-flex">{t({ en: "All Industries", zh: "全部行业", th: "ทุกอุตสาหกรรม", vi: "Tất cả ngành" }, locale)} <ArrowRight className="h-4 w-4"/></Link></div><div className="mt-8"><div ref={caseScrollRef} className="flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">{industries.map(ind=><Link href={`/industries/${ind.slug}`} key={ind.slug} className="group w-[165px] shrink-0 snap-start overflow-hidden rounded-2xl bg-white text-[#102038] shadow-xl sm:w-[240px]"><div className="relative aspect-[4/3] bg-[#EEF6FF]"><Image src={ind.image} alt={t(ind.name, locale)} fill sizes="(max-width: 640px) 165px, 240px" className="object-cover transition group-hover:scale-105"/></div><div className="p-3.5 sm:p-4"><h3 className="text-sm font-bold leading-snug text-[#143C96] sm:text-base">{t(ind.name, locale)}</h3><p className="mt-1 hidden text-xs leading-relaxed text-gray-500 line-clamp-2 sm:block">{t(ind.sub, locale)}</p><span className="mt-2 inline-flex items-center gap-1 text-xs font-bold text-[#41A62A]">{t({ en: "Explore", zh: "查看方案", th: "ดูโซลูชัน", vi: "Xem giải pháp" }, locale)} <ArrowRight className="h-3.5 w-3.5"/></span></div></Link>)}</div><div className="mt-5 flex justify-end gap-3"><button type="button" aria-label={t({ en: "Previous industries", zh: "上一组行业", th: "อุตสาหกรรมก่อนหน้า", vi: "Ngành trước" }, locale)} onClick={()=>scrollCases(-1)} className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/40 bg-white/10 text-white transition hover:bg-white/20"><ChevronLeft className="h-5 w-5"/></button><button type="button" aria-label={t({ en: "Next industries", zh: "下一组行业", th: "อุตสาหกรรมถัดไป", vi: "Ngành tiếp theo" }, locale)} onClick={()=>scrollCases(1)} className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/40 bg-white/10 text-white transition hover:bg-white/20"><ChevronRight className="h-5 w-5"/></button></div></div></div></section>

    <section className="px-4 pt-14 pb-16 sm:px-6 md:pt-20 md:pb-20 lg:px-8"><div className="mx-auto max-w-7xl"><h2 className="text-3xl font-bold text-[#143C96] md:text-4xl">{t({ en: "Why Manufacturers Choose ETIA", zh: "为什么制造企业选择 ETIA", th: "ทำไมผู้ผลิตจึงเลือก ETIA", vi: "Vì sao các nhà sản xuất chọn ETIA" }, locale)}</h2>
    {/* Mobile: one compact card with four rows — fits a single screen. */}
    <div className="mt-6 divide-y divide-[#E6EDF3] rounded-2xl border border-[#D9E4EA] bg-white shadow-[0_10px_35px_rgba(20,60,150,.06)] md:hidden">{whyCards.map((item,i)=>{const Icon=item.icon;const accent=i%2===0?"#1A56DB":"#41A62A";const soft=i%2===0?"#EEF6FF":"#F0F9EA";return <div key={item.title.en} className="flex items-start gap-3.5 p-4"><span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl" style={{background:soft,color:accent}}><Icon className="h-5 w-5" strokeWidth={1.8}/></span><div><h3 className="text-sm font-bold leading-snug" style={{color:accent}}>{t(item.title, locale)}</h3><p className="mt-1 text-xs leading-5 text-[#667085]">{t(item.body, locale)}</p></div></div>})}</div>
    <div className="mt-10 hidden gap-5 md:grid md:grid-cols-2 lg:grid-cols-4">{whyCards.map((item,i)=>{const Icon=item.icon;const accent=i%2===0?"#1A56DB":"#41A62A";const soft=i%2===0?"#EEF6FF":"#F0F9EA";return <article key={item.title.en} className="rounded-2xl border border-[#D9E4EA] bg-white p-6 shadow-[0_10px_35px_rgba(20,60,150,.06)]" style={{borderTopColor:accent,borderTopWidth:3}}><div className="flex items-center gap-3"><span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl" style={{background:soft,color:accent}}><Icon className="h-7 w-7" strokeWidth={1.7}/></span><h3 className="font-bold leading-snug" style={{color:accent}}>{t(item.title, locale)}</h3></div><p className="mt-4 text-sm leading-6 text-[#667085]">{t(item.body, locale)}</p></article>})}</div></div></section>

    <FinalCta heading={t({ en: "Need help choosing the right UV curing system?", zh: "需要帮助选择合适的 UV Curing 紫外线固化系统吗？", th: "ต้องการความช่วยเหลือในการเลือกระบบ UV curing ที่เหมาะสมหรือไม่?" , vi: "Bạn cần hỗ trợ chọn hệ thống UV curing phù hợp?" }, locale)} body={t({ en: "Tell us your application, adhesive, curing area, wavelength, and production requirements. ETIA engineers will help you find the right solution.", zh: "告诉我们您的应用、胶粘剂、固化面积、波长与生产要求。ETIA 工程师将帮助您找到合适方案。", th: "บอกเราเกี่ยวกับการใช้งาน กาว พื้นที่การบ่ม ความยาวคลื่น และความต้องการการผลิตของคุณ วิศวกรของ ETIA จะช่วยคุณหาโซลูชันที่เหมาะสม" , vi: "Cho chúng tôi biết ứng dụng, keo, diện tích đóng rắn, bước sóng và yêu cầu sản xuất của bạn. Kỹ sư ETIA sẽ giúp bạn tìm giải pháp phù hợp." }, locale)} primary={{ label: t({ en: "Talk to an Engineer", zh: "咨询工程师", th: "ปรึกษาวิศวกร" , vi: "Trao đổi với kỹ sư" }, locale), href: engineerMail }} secondary={{ label: t({ en: "Send Your Application", zh: "提交您的应用需求", th: "ส่งการใช้งานของคุณ" , vi: "Gửi thông tin ứng dụng của bạn" }, locale), href: inquiryMailto(locale, { subject: "UV Curing Application Review", context: "Application / adhesive / area / wavelength / production requirements" }) }} />
  </div>;
}
