"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState, type ComponentType } from "react";
import {
  ArrowRight,
  BadgeCheck,
  BatteryCharging,
  Boxes,
  Cable,
  Car,
  Check,
  ChevronLeft,
  ChevronRight,
  CircuitBoard,
  Crosshair,
  GraduationCap,
  HeartPulse,
  Microscope,
  PackageCheck,
  Paintbrush,
  Printer,
  ShieldCheck,
  Sparkles,
  Warehouse,
  Wrench,
  Zap,
} from "lucide-react";
import { inquiryMailto } from "@/components/contact";
import { useLocale, t, type LangText } from "@/components/LocaleContext";
import { caseSlug, caseStudyImage, successStories } from "@/components/caseStudies";
import { productImage, products } from "@/components/productCatalog";
import TrustStrip from "@/components/TrustStrip";
import FinalCta from "@/components/FinalCta";

const whyCards: { title: LangText; body: LangText; icon: ComponentType<{ className?: string; strokeWidth?: number }> }[] = [
  { title: { en: "20 Years of Application Experience", zh: "20 年应用经验", th: "ประสบการณ์ด้านการใช้งาน 20 ปี" }, body: { en: "Hands-on UV curing knowledge across medical, electronics, photonics, automotive and industrial manufacturing.", zh: "在医疗、电子、光子学、汽车与工业制造领域积累的实战 UV 固化经验。", th: "ความรู้ด้าน UV curing เชิงปฏิบัติในอุตสาหกรรมการแพทย์ อิเล็กทรอนิกส์ โฟโตนิกส์ ยานยนต์ และการผลิตทางอุตสาหกรรม" }, icon: GraduationCap },
  { title: { en: "Authorized & Genuine Supply", zh: "授权正品供应", th: "การจัดหาสินค้าของแท้อย่างเป็นทางการ" }, body: { en: "Genuine systems, replacement lamps and accessories through authorized supply channels.", zh: "通过授权渠道供应正品系统、替换灯管与配件。", th: "ระบบ หลอดไฟสำรอง และอุปกรณ์เสริมของแท้ผ่านช่องทางการจัดหาที่ได้รับอนุญาต" }, icon: BadgeCheck },
  { title: { en: "Local Stock & Fast Response", zh: "本地库存与快速响应", th: "สต็อกในประเทศและตอบสนองรวดเร็ว" }, body: { en: "Local equipment and consumables help reduce lead time and production risk.", zh: "本地备货的设备与耗材有助于缩短交期、降低生产风险。", th: "อุปกรณ์และวัสดุสิ้นเปลืองในประเทศช่วยลดระยะเวลารอคอยและความเสี่ยงในการผลิต" }, icon: Warehouse },
  { title: { en: "In-House Repair & Lifecycle Support", zh: "自有维修与全生命周期支持", th: "การซ่อมภายในและการสนับสนุนตลอดอายุการใช้งาน" }, body: { en: "Troubleshooting, maintenance and repair coordination to keep your process running.", zh: "提供故障排查、维护与维修协调，保障您的产线持续运行。", th: "การแก้ไขปัญหา การบำรุงรักษา และการประสานงานซ่อมเพื่อให้กระบวนการของคุณทำงานต่อเนื่อง" }, icon: Wrench },
];

// OmniCure systems featured in the hero product carousel (all have COS assets).
const heroProductSlugs = ["s1500-pro", "lx500", "v3-led-heads", "ac8", "ac5", "ls200"];

const applications: Array<{ title: LangText; icon: ComponentType<{ className?: string; strokeWidth?: number }> }> = [
  { title: { en: "Medical Devices", zh: "医疗器械", th: "อุปกรณ์การแพทย์" }, icon: HeartPulse },
  { title: { en: "Electronics & Semiconductor", zh: "电子与半导体", th: "อิเล็กทรอนิกส์และเซมิคอนดักเตอร์" }, icon: CircuitBoard },
  { title: { en: "Optics & Photonics", zh: "光学与光子学", th: "ออปติกส์และโฟโตนิกส์" }, icon: Sparkles },
  { title: { en: "Automotive & EV", zh: "汽车与电动汽车", th: "ยานยนต์และรถ EV" }, icon: Car },
  { title: { en: "Printing & Packaging", zh: "印刷与包装", th: "การพิมพ์และบรรจุภัณฑ์" }, icon: Printer },
  { title: { en: "Industrial Coating & Assembly", zh: "工业涂布与组装", th: "การเคลือบและการประกอบทางอุตสาหกรรม" }, icon: Paintbrush },
];

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
  useEffect(() => {
    if (heroProducts.length <= 1) return;
    const timer = setInterval(() => setHeroIndex((i) => (i + 1) % heroProducts.length), 3500);
    return () => clearInterval(timer);
  }, [heroProducts.length]);

  const caseScrollRef = useRef<HTMLDivElement>(null);
  const scrollCases = (dir: number) => caseScrollRef.current?.scrollBy({ left: dir * 320, behavior: "smooth" });

  return <div className="bg-white text-[#102038]">
    <section className="relative overflow-hidden border-b border-[#D9E4EA] bg-gradient-to-br from-white via-[#EEF6FF] to-[#F1FAEF]">
      <div className="absolute -right-36 -top-36 h-[34rem] w-[34rem] rounded-full bg-[#1F63D6]/10 blur-3xl" />
      <div className="absolute -bottom-40 left-1/3 h-96 w-96 rounded-full bg-[#63C94A]/10 blur-3xl" />
      <div className="relative mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 md:py-24 lg:grid-cols-[1.05fr_.95fr] lg:items-center lg:px-8">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-[#41A62A]/20 bg-white px-3 py-1.5 text-xs font-bold text-[#41A62A] shadow-sm"><BadgeCheck className="h-4 w-4" />{t({ en: "Authorized Distributor · Genuine Products Guaranteed", zh: "授权代理商 · 正品保证", th: "ตัวแทนจำหน่ายที่ได้รับอนุญาต · รับประกันสินค้าของแท้" }, locale)}</span>
          <h1 className="mt-6 max-w-4xl text-4xl font-bold leading-[1.08] tracking-tight text-[#143C96] md:text-6xl">{t({ en: "Your UV Curing Solution Partner", zh: "您的 UV 固化解决方案伙伴", th: "พันธมิตรโซลูชัน UV Curing ของคุณ" }, locale)}<span className="mt-2 block text-2xl font-bold text-[#41A62A] md:text-4xl">{t({ en: "From Selection to Support.", zh: "从选型到支持。", th: "ตั้งแต่การเลือกจนถึงการสนับสนุน" }, locale)}</span></h1>
          <p className="mt-6 max-w-3xl text-base leading-7 text-[#667085] md:text-lg">{t({ en: "ETIA helps manufacturers select, validate, install, and maintain advanced UV curing systems for precision bonding, coating, printing, encapsulation, and high-reliability assembly.", zh: "ETIA 帮助制造商为精密粘接、涂布、印刷、封装与高可靠性组装，选型、验证、安装并维护先进的 UV 固化系统。", th: "ETIA ช่วยผู้ผลิตในการเลือก ตรวจสอบ ติดตั้ง และบำรุงรักษาระบบ UV curing ขั้นสูงสำหรับการยึดติด เคลือบ พิมพ์ เคลือบหุ้ม และการประกอบที่มีความน่าเชื่อถือสูง" }, locale)}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row"><Link href="/product/omnicure" className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#41A62A] px-6 py-3.5 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-[#358B22]">{t({ en: "Explore Products", zh: "浏览产品", th: "ดูสินค้า" }, locale)} <ArrowRight className="h-4 w-4" /></Link><a href={engineerMail} className="inline-flex items-center justify-center rounded-xl border border-[#D4DFEC] bg-white px-6 py-3.5 text-sm font-bold text-[#143C96] transition hover:-translate-y-0.5 hover:border-[#143C96] hover:text-[#1F63D6]">{t({ en: "Talk to an Engineer", zh: "咨询工程师", th: "ปรึกษาวิศวกร" }, locale)}</a></div>
        </div>
        <div className="relative min-h-[410px] rounded-[32px] border border-white/80 bg-white/75 p-5 shadow-[0_25px_80px_rgba(20,60,150,.12)] backdrop-blur sm:p-8">
          <div className="absolute left-10 right-10 top-1/2 h-24 -translate-y-1/2 rounded-full bg-gradient-to-r from-[#1F63D6]/20 via-[#63C94A]/35 to-transparent blur-2xl" />
          {heroProducts.map((p, i) => <Image key={p.slug} src={productImage(p)} alt={p.name} fill priority={i === 0} sizes="(max-width: 1024px) 100vw, 46vw" className={`object-contain p-16 transition-opacity duration-700 ${i === heroIndex ? "opacity-100" : "opacity-0"}`} />)}
          {heroProducts.length > 1 && <div className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 gap-2">{heroProducts.map((p, i) => <button key={p.slug} type="button" aria-label={`Show ${p.name}`} onClick={() => setHeroIndex(i)} className={`h-2 rounded-full transition-all ${i === heroIndex ? "w-6 bg-[#143C96]" : "w-2 bg-[#143C96]/25"}`} />)}</div>}
          <div className="absolute left-4 top-5 rounded-xl border border-[#D9E4EA] bg-white px-4 py-3 shadow-lg sm:left-6"><p className="text-xs font-bold text-[#143C96]">{t({ en: "Genuine Products", zh: "正品保证", th: "สินค้าของแท้" }, locale)}</p><p className="mt-1 text-[10px] text-[#667085]">{t({ en: "Authorized supply", zh: "授权供应", th: "จัดหาอย่างเป็นทางการ" }, locale)}</p></div>
          <div className="absolute right-4 top-1/3 rounded-xl border border-[#D9E4EA] bg-white px-4 py-3 shadow-lg sm:right-6"><p className="text-xs font-bold text-[#143C96]">{t({ en: "Application Support", zh: "应用支持", th: "การสนับสนุนด้านการใช้งาน" }, locale)}</p><p className="mt-1 text-[10px] text-[#667085]">{t({ en: "Engineer-led selection", zh: "工程师主导选型", th: "การเลือกโดยวิศวกร" }, locale)}</p></div>
          <div className="absolute bottom-5 left-8 rounded-xl border border-[#D9E4EA] bg-white px-4 py-3 shadow-lg"><p className="text-xs font-bold text-[#41A62A]">{t({ en: "In-House Repair", zh: "自有维修", th: "ศูนย์ซ่อมภายใน" }, locale)}</p><p className="mt-1 text-[10px] text-[#667085]">{t({ en: "Lifecycle support", zh: "全生命周期支持", th: "การสนับสนุนตลอดอายุการใช้งาน" }, locale)}</p></div>
        </div>
      </div>
    </section>

    <TrustStrip />

    <section className="px-4 py-20 sm:px-6 lg:px-8"><div className="mx-auto max-w-7xl"><h2 className="text-3xl font-bold text-[#143C96] md:text-4xl">{t({ en: "Why Manufacturers Choose ETIA", zh: "制造商为何选择 ETIA", th: "ทำไมผู้ผลิตจึงเลือก ETIA" }, locale)}</h2><p className="mt-4 max-w-3xl leading-7 text-[#667085]">{t({ en: "We combine authorized supply, hands-on application experience, and local technical service to keep your UV curing process stable, repeatable, and production-ready.", zh: "我们将授权供应、实战应用经验与本地技术服务相结合，让您的 UV 固化工艺保持稳定、可重复且随时可投入生产。", th: "เรารวมการจัดหาที่ได้รับอนุญาต ประสบการณ์การใช้งานเชิงปฏิบัติ และบริการทางเทคนิคในประเทศ เพื่อให้กระบวนการ UV curing ของคุณเสถียร ทำซ้ำได้ และพร้อมสำหรับการผลิต" }, locale)}</p><div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">{whyCards.map(item=>{const Icon=item.icon;return <article key={item.title.en} className="rounded-2xl border border-[#D9E4EA] bg-white p-6 shadow-[0_10px_35px_rgba(20,60,150,.06)]"><span className="inline-flex rounded-xl bg-[#EEF6FF] p-3 text-[#143C96]"><Icon className="h-6 w-6" strokeWidth={1.7}/></span><h3 className="mt-5 font-bold text-[#143C96]">{t(item.title, locale)}</h3><p className="mt-3 text-sm leading-6 text-[#667085]">{t(item.body, locale)}</p></article>})}</div></div></section>


    <section className="px-4 py-20 sm:px-6 lg:px-8"><div className="mx-auto max-w-7xl"><p className="text-xs font-bold uppercase tracking-[.18em] text-[#41A62A]">{t({ en: "Authorized Brand Solutions", zh: "授权品牌解决方案", th: "โซลูชันแบรนด์ที่ได้รับอนุญาต" }, locale)}</p><h2 className="mt-3 text-3xl font-bold text-[#143C96] md:text-4xl">{t({ en: "Authorized UV Curing Brands We Support", zh: "我们支持的授权 UV 固化品牌", th: "แบรนด์ UV Curing ที่เราสนับสนุน" }, locale)}</h2><div className="mt-10 grid gap-6 lg:grid-cols-2"><Link href="/product/omnicure" className="group grid overflow-hidden rounded-3xl border border-[#D9E4EA] bg-gradient-to-br from-white to-[#EEF6FF] sm:grid-cols-[1fr_.9fr]"><div className="p-8"><span className="text-xs font-bold uppercase tracking-[.14em] text-[#41A62A]">{t({ en: "Precision Manufacturing", zh: "精密制造", th: "การผลิตที่แม่นยำ" }, locale)}</span><h3 className="mt-3 text-2xl font-bold text-[#143C96]">{t({ en: "OmniCure UV Curing Systems", zh: "OmniCure UV 固化系统", th: "ระบบ UV Curing OmniCure" }, locale)}</h3><p className="mt-4 text-sm leading-6 text-[#667085]">{t({ en: "Precision UV curing for assembly, bonding, medical devices and electronics.", zh: "面向组装、粘接、医疗器械与电子的精密 UV 固化。", th: "UV curing ที่แม่นยำสำหรับการประกอบ การยึดติด อุปกรณ์การแพทย์ และอิเล็กทรอนิกส์" }, locale)}</p><span className="mt-7 inline-flex items-center gap-2 text-sm font-bold text-[#143C96]">{t({ en: "Explore OmniCure", zh: "了解 OmniCure", th: "ดู OmniCure" }, locale)} <ArrowRight className="h-4 w-4"/></span></div><div className="relative min-h-64 bg-white/60">{omnicureProduct&&productImage(omnicureProduct)&&<Image src={productImage(omnicureProduct)} alt="OmniCure UV curing system" fill sizes="(max-width:1024px) 100vw, 45vw" className="object-contain p-7 transition group-hover:scale-105"/>}</div></Link><Link href="/product/phoseon" className="group grid overflow-hidden rounded-3xl border border-[#D9E4EA] bg-gradient-to-br from-white to-[#F1FAEF] sm:grid-cols-[1fr_.9fr]"><div className="p-8"><span className="text-xs font-bold uppercase tracking-[.14em] text-[#41A62A]">{t({ en: "Industrial UV LED", zh: "工业 UV LED", th: "UV LED อุตสาหกรรม" }, locale)}</span><h3 className="mt-3 text-2xl font-bold text-[#143C96]">{t({ en: "Phoseon UV LED Curing Systems", zh: "Phoseon UV LED 固化系统", th: "ระบบ UV LED Curing Phoseon" }, locale)}</h3><p className="mt-4 text-sm leading-6 text-[#667085]">{t({ en: "Industrial UV LED curing for inks, coatings, printing, packaging and production lines.", zh: "面向油墨、涂层、印刷、包装与产线的工业 UV LED 固化。", th: "UV LED curing อุตสาหกรรมสำหรับหมึก สารเคลือบ การพิมพ์ บรรจุภัณฑ์ และสายการผลิต" }, locale)}</p><span className="mt-7 inline-flex items-center gap-2 text-sm font-bold text-[#41A62A]">{t({ en: "Explore Phoseon", zh: "了解 Phoseon", th: "ดู Phoseon" }, locale)} <ArrowRight className="h-4 w-4"/></span></div><div className="relative min-h-64 bg-white/60">{phoseonProduct&&productImage(phoseonProduct)&&<Image src={productImage(phoseonProduct)} alt="Phoseon industrial UV LED curing system" fill sizes="(max-width:1024px) 100vw, 45vw" className="object-contain p-7 transition group-hover:scale-105"/>}</div></Link></div></div></section>

    <section className="bg-[#F1FAEF] px-4 py-20 sm:px-6 lg:px-8"><div className="mx-auto max-w-7xl"><p className="text-xs font-bold uppercase tracking-[.18em] text-[#41A62A]">{t({ en: "Manufacturing Applications", zh: "制造应用", th: "การใช้งานในการผลิต" }, locale)}</p><h2 className="mt-3 text-3xl font-bold text-[#143C96] md:text-4xl">{t({ en: "Built for Demanding Manufacturing Applications", zh: "为严苛的制造应用而打造", th: "ออกแบบมาเพื่อการใช้งานการผลิตที่ท้าทาย" }, locale)}</h2><div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{applications.map(item=>{const Icon=item.icon;return <Link href="/applications" key={item.title.en} className="group flex items-center gap-4 rounded-2xl border border-[#D9E4EA] bg-white p-5 transition hover:-translate-y-1 hover:shadow-lg"><span className="rounded-xl bg-[#EEF6FF] p-3 text-[#143C96]"><Icon className="h-6 w-6" strokeWidth={1.7}/></span><span className="font-bold text-[#143C96] group-hover:text-[#41A62A]">{t(item.title, locale)}</span><ArrowRight className="ml-auto h-4 w-4 text-[#41A62A]"/></Link>})}</div></div></section>

    <section className="bg-gradient-to-br from-[#143C96] to-[#1F63D6] px-4 py-20 text-white sm:px-6 lg:px-8"><div className="mx-auto max-w-7xl"><p className="text-xs font-bold uppercase tracking-[.18em] text-[#A4E78F]">{t({ en: "Case Studies", zh: "案例研究", th: "กรณีศึกษา" }, locale)}</p><div className="mt-3 flex items-end justify-between gap-4"><div><h2 className="text-3xl font-bold md:text-4xl">{t({ en: "Where Performance Is Proven", zh: "性能，得到实证", th: "ที่ซึ่งประสิทธิภาพได้รับการพิสูจน์" }, locale)}</h2><p className="mt-3 max-w-3xl text-blue-100">{t({ en: "Real UV curing processes in precision and high-reliability manufacturing.", zh: "精密与高可靠性制造中的真实 UV 固化工艺。", th: "กระบวนการ UV curing จริงในการผลิตที่แม่นยำและมีความน่าเชื่อถือสูง" }, locale)}</p></div><Link href="/applications" className="hidden items-center gap-2 text-sm font-bold text-white sm:inline-flex">{t({ en: "View Applications", zh: "查看应用", th: "ดูการใช้งาน" }, locale)} <ArrowRight className="h-4 w-4"/></Link></div><div className="mt-10"><div ref={caseScrollRef} className="flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">{successStories.map(story=><Link href={`/case-studies/${caseSlug(story)}`} key={story.id} className="group w-[280px] shrink-0 snap-start overflow-hidden rounded-2xl bg-white text-[#102038] shadow-xl"><div className="relative h-40 bg-[#EEF6FF]">{caseStudyImage(story)&&<Image src={caseStudyImage(story)} alt={story.sector} fill sizes="280px" className="object-cover transition group-hover:scale-105"/>}</div><div className="p-5"><p className="text-[10px] font-bold uppercase tracking-[.12em] text-[#41A62A]">{story.sector}</p><h3 className="mt-2 line-clamp-3 font-bold leading-snug text-[#143C96]">{story.title}</h3><span className="mt-5 inline-flex items-center gap-1 text-xs font-bold text-[#143C96]">{t({ en: "Read case", zh: "阅读案例", th: "อ่านกรณีศึกษา" }, locale)} <ArrowRight className="h-3.5 w-3.5"/></span></div></Link>)}</div><div className="mt-6 flex justify-end gap-3"><button type="button" aria-label="Previous case studies" onClick={()=>scrollCases(-1)} className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/40 bg-white/10 text-white transition hover:bg-white/20"><ChevronLeft className="h-5 w-5"/></button><button type="button" aria-label="Next case studies" onClick={()=>scrollCases(1)} className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/40 bg-white/10 text-white transition hover:bg-white/20"><ChevronRight className="h-5 w-5"/></button></div></div></div></section>

    <FinalCta heading={t({ en: "Need help choosing the right UV curing system?", zh: "需要帮助选择合适的 UV 固化系统吗？", th: "ต้องการความช่วยเหลือในการเลือกระบบ UV curing ที่เหมาะสมหรือไม่?" }, locale)} body={t({ en: "Tell us your application, adhesive, curing area, wavelength, and production requirements. ETIA engineers will help you find the right solution.", zh: "告诉我们您的应用、胶粘剂、固化面积、波长与生产需求，ETIA 工程师将帮助您找到合适的解决方案。", th: "บอกเราเกี่ยวกับการใช้งาน กาว พื้นที่การบ่ม ความยาวคลื่น และความต้องการการผลิตของคุณ วิศวกรของ ETIA จะช่วยคุณหาโซลูชันที่เหมาะสม" }, locale)} primary={{ label: t({ en: "Talk to an Engineer", zh: "咨询工程师", th: "ปรึกษาวิศวกร" }, locale), href: engineerMail }} secondary={{ label: t({ en: "Send Your Application", zh: "发送您的应用", th: "ส่งการใช้งานของคุณ" }, locale), href: inquiryMailto(locale, { subject: "UV Curing Application Review", context: "Application / adhesive / area / wavelength / production requirements" }) }} />
  </div>;
}
