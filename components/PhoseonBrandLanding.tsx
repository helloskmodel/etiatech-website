"use client";

import Image from "next/image";
import Link from "next/link";
import type { ComponentType } from "react";
import {
  ArrowRight,
  BadgeCheck,
  Cable,
  Check,
  CircuitBoard,
  Droplets,
  Factory,
  Gauge,
  Layers3,
  Leaf,
  MonitorCog,
  Package,
  Paintbrush,
  Printer,
  ShieldCheck,
  Sparkles,
  ThermometerSun,
  Zap,
} from "lucide-react";
import { inquiryMailto } from "@/components/contact";
import { useLocale, t } from "@/components/LocaleContext";
import { productHref, productImage, products, type Product } from "@/components/productCatalog";
import TrustStrip from "@/components/TrustStrip";
import HeroBanner from "@/components/HeroBanner";
import { PAGE_BANNERS } from "@/components/caseStudies";
import FinalCta from "@/components/FinalCta";

const green = "#6BBF3A";
const deepGreen = "#087F6B";

const familyConfig = [
  { name: "Phoseon Nexus II™", headline: "High-Power UV LED Curing Systems for Printing & Packaging", body: "Large-area UV LED curing in air-cooled and water-cooled configurations for demanding production lines.", slugs: ["nexus-ii", "nexus-ii-ac"], points: ["Air- and water-cooled", "300–675 mm web widths", "Nexus DataHub monitoring", "5-year full-system warranty"], color: green },
  { name: "Phoseon VeriCure™", headline: "Ultra-High Dose Wide-Format UV LED Curing Systems", body: "Ultra-high UV dose in a wide format for wood coatings and demanding industrial curing.", slugs: ["vericure"], points: ["Wide lamp format", "Ultra-high UV dose", "Water-cooled", "Built for tough environments"], color: deepGreen },
  { name: "Phoseon FireJet™", headline: "Scalable High-Irradiance UV LED Curing Systems", body: "Scalable systems for high irradiance and compact production requirements.", slugs: ["fj800", "fj801", "firejet-one", "fj100", "fj240"], points: ["High irradiance", "Scalable form factor", "TargetCure technology", "Optional Ethernet"], color: "#28A96B" },
  { name: "Phoseon FireLine™", headline: "High-Performance Water-Cooled UV LED Curing Systems", body: "Water-cooled platforms for high-dose, high-irradiance production applications.", slugs: ["fl200", "fl400", "fl400-i", "fl440"], points: ["Water-cooled platform", "High dose and irradiance", "Digital / analog control", "Optional Ethernet"], color: "#1B8F75" },
  { name: "Phoseon FireEdge™", headline: "Compact UV LED Curing Systems for Pinning and Full Cure", body: "Thin, compact UV LED systems for pinning, gelling and smaller production setups.", slugs: ["fe100", "fe400", "fe410"], points: ["Small form factor", "Multiple optics", "WhisperCure technology", "Natural convection options"], color: "#39A0FF" },
];

const benefits: Array<{ title: string; body: string; icon: ComponentType<{ className?: string; strokeWidth?: number }> }> = [
  { title: "High UV Energy", body: "Strong UV output for demanding industrial curing processes.", icon: Zap },
  { title: "Controlled Intensity", body: "Consistent curing across inks, coatings, adhesives and sensitive substrates.", icon: Gauge },
  { title: "Efficient LED Operation", body: "Lower heat, maintenance and energy use than traditional systems.", icon: Leaf },
  { title: "Production-Line Integration", body: "Built for presses, coating lines, converting and automation.", icon: Factory },
];

const industries = [
  { title: "Printing & Packaging", detail: "Inkjet · Screen · Flexo · Offset · Labels", icon: Printer },
  { title: "Electronics", detail: "Protective coatings · Potting · Marking", icon: CircuitBoard },
  { title: "Industrial Coatings", detail: "Wood · Metal · Glass coatings", icon: Paintbrush },
  { title: "Fiber & Cable", detail: "Tube printing · Cable marking · UV coating", icon: Cable },
  { title: "Medical Manufacturing", detail: "Device coatings · Tube and label printing", icon: ShieldCheck },
  { title: "Adhesives & Converting", detail: "Bonding · Laminating · Surface treatment", icon: Layers3 },
];

const why = [
  { title: "Quality Built In", body: "Self-protecting diode design, long lifetime and industrial reliability.", icon: ShieldCheck },
  { title: "Cooling Built In", body: "Air- and water-cooled platforms for different production demands.", icon: ThermometerSun },
  { title: "Innovation Built In", body: "Advanced UV LED technology supported by a strong patent foundation.", icon: Sparkles },
  { title: "Efficiency Built In", body: "Reduced heat, energy consumption and maintenance requirements.", icon: Leaf },
];

// Hero technology selector (mirrors the OmniCure page): three Phoseon UV LED
// curing technologies by cooling method and curing area.
const phoseonTech = [
  { kicker: "Water-Cooled", name: "UV LED Area Curing Systems", icon: Droplets, color: "#1E5BFF", soft: "#EEF3FF" },
  { kicker: "Air-Cooled", name: "UV LED Small-Area Curing Systems", icon: ThermometerSun, color: "#6BBF3A", soft: "#F1FBEC" },
  { kicker: "Air-Cooled", name: "UV LED Large-Area Curing Systems", icon: Layers3, color: "#087F6B", soft: "#F2FBF8" },
];

function findProduct(slug: string): Product | undefined {
  return products.find((product) => product.brandId === "phoseon" && product.slug === slug);
}

function FamilyVisual({ slugs, name }: { slugs: string[]; name: string }) {
  const product = slugs.map(findProduct).find(Boolean);
  const image = product ? productImage(product) : "";
  return <div className="relative h-52 border-b border-[#EDF2F6] bg-white">{image ? <Image src={image} alt={name} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-contain p-7 transition duration-300 group-hover:scale-105" /> : <span className="absolute inset-0 flex items-center justify-center text-xl font-bold text-[#6BBF3A]">{name}</span>}</div>;
}

export default function PhoseonBrandLanding() {
  const { locale } = useLocale();
  const engineerMail = inquiryMailto(locale, { subject: "Phoseon UV LED Engineering Inquiry", context: "Material / curing width / line speed / cooling preference" });
  const nexus = findProduct("nexus-ii") ?? findProduct("nexus-ii-ac");

  return <div className="bg-white text-[#14213D]">
    <section className="relative overflow-hidden border-b border-[#D9E4EA] bg-gradient-to-br from-white via-[#EEF6FF] to-[#F1FAEF]">
      <HeroBanner src={PAGE_BANNERS.phoseon} />
      <div className="absolute -right-32 -top-40 h-[34rem] w-[34rem] rounded-full bg-[#1F63D6]/10 blur-3xl" />
      <div className="absolute -bottom-48 left-1/3 h-96 w-96 rounded-full bg-[#63C94A]/10 blur-3xl" />
      <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-24 lg:px-8">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-[#41A62A]/20 bg-white px-3 py-1.5 text-xs font-bold text-[#41A62A] shadow-sm"><BadgeCheck className="h-4 w-4" /> Phoseon® UV LED Curing Solutions</div>
          <h1 className="mt-5 max-w-3xl text-4xl font-bold leading-[1.08] tracking-tight text-[#143C96] md:text-6xl">{t({ en: "Phoseon UV Curing Solutions", zh: "Phoseon UV Curing 紫外线固化解决方案", th: "โซลูชัน UV Curing ของ Phoseon", vi: "Giải pháp UV Curing Phoseon" }, locale)}<span className="mt-2 block text-2xl font-bold text-[#41A62A] md:text-4xl">{t({ en: "Built for Production Performance.", zh: "适配量产，效能出众。", th: "ออกแบบเพื่อประสิทธิภาพการผลิต", vi: "Được tạo ra cho hiệu suất sản xuất." }, locale)}</span></h1>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row"><a href="#phoseon-families" className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#41A62A] px-6 py-3.5 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-[#358B22]">Explore Phoseon Solutions <ArrowRight className="h-4 w-4" /></a><a href={engineerMail} className="inline-flex items-center justify-center rounded-xl border border-[#D4DFEC] bg-white px-6 py-3.5 text-sm font-bold text-[#143C96] transition hover:border-[#143C96] hover:text-[#1F63D6]">Talk to an Engineer</a></div>
        </div>
      </div>
    </section>

    <TrustStrip />

    <section className="px-4 py-20 sm:px-6 lg:px-8"><div className="mx-auto max-w-7xl"><p className="text-xs font-bold uppercase tracking-[.18em] text-[#6BBF3A]">Industrial UV LED Platform</p><h2 className="mt-3 text-3xl font-bold text-[#102A43] md:text-4xl">UV LED Curing for Industrial Manufacturing</h2><p className="mt-3 max-w-3xl text-[#5F6C7B]">Designed for production environments requiring high output, controlled intensity, efficient operation and long lifetime.</p><div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">{benefits.map((item) => { const Icon=item.icon; return <article key={item.title} className="rounded-2xl border border-[#E3EAF2] p-6"><span className="inline-flex rounded-xl bg-[#F2FBF8] p-3 text-[#087F6B]"><Icon className="h-6 w-6" strokeWidth={1.7}/></span><h3 className="mt-5 font-bold text-[#102A43]">{item.title}</h3><p className="mt-3 text-sm leading-6 text-[#5F6C7B]">{item.body}</p></article>})}</div></div></section>

    <section id="phoseon-families" className="scroll-mt-20 bg-[#F7FAFC] px-4 py-20 sm:px-6 lg:px-8"><div className="mx-auto max-w-7xl"><p className="text-xs font-bold uppercase tracking-[.18em] text-[#6BBF3A]">Product Families</p><h2 className="mt-3 text-3xl font-bold text-[#102A43] md:text-4xl">Phoseon Product Families</h2><p className="mt-3 max-w-3xl text-[#5F6C7B]">Choose by cooling method, curing width, UV power requirement and production application.</p><div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">{familyConfig.map((family,index) => { const product=family.slugs.map(findProduct).find(Boolean); const href=product?productHref(product):"/contact"; return <article key={family.name} className={`group overflow-hidden rounded-3xl border border-[#E3EAF2] bg-white transition hover:-translate-y-1 hover:shadow-[0_18px_55px_rgba(15,36,68,.09)] ${index < 2 ? "lg:col-span-1" : ""}`}><FamilyVisual slugs={family.slugs} name={family.name}/><div className="p-6"><p className="text-xs font-bold uppercase tracking-[.14em]" style={{color:family.color}}>{family.name}</p><h3 className="mt-3 text-xl font-bold text-[#102A43]">{family.headline}</h3><p className="mt-3 text-sm leading-6 text-[#5F6C7B]">{family.body}</p><ul className="mt-5 grid gap-2 sm:grid-cols-2">{family.points.map(point => <li key={point} className="flex items-start gap-2 text-xs leading-5 text-[#334E68]"><Check className="mt-0.5 h-3.5 w-3.5 shrink-0" style={{color:family.color}}/>{point}</li>)}</ul><Link href={href} className="mt-6 inline-flex items-center gap-2 text-sm font-bold" style={{color:family.color}}>Explore {family.name.replace("™","")} <ArrowRight className="h-4 w-4"/></Link></div></article>})}</div></div></section>

    <section className="px-4 py-20 sm:px-6 lg:px-8"><div className="mx-auto overflow-hidden rounded-[32px] border border-[#DCE9E1] bg-gradient-to-br from-[#F2FBF8] to-[#F3F7FF] p-7 sm:p-10"><div className="grid gap-10 lg:grid-cols-[1.12fr_.88fr] lg:items-center"><div><p className="text-xs font-bold uppercase tracking-[.18em] text-[#087F6B]">Featured Platform</p><h2 className="mt-3 text-3xl font-bold text-[#102A43] md:text-4xl">Phoseon Nexus II™ UV LED Curing Systems</h2><p className="mt-4 text-[#5F6C7B]">High-power UV LED curing for printing, packaging and production-line applications.</p><div className="mt-7 grid grid-cols-2 gap-3">{[{a:"Smart",b:"DataHub real-time monitoring",i:MonitorCog},{a:"Unique",b:"High diode count and redundancy",i:Sparkles},{a:"Reliable",b:">60,000 hour expected diode life",i:ShieldCheck},{a:"Assured",b:"5-year full-system warranty",i:BadgeCheck}].map(({a,b,i:Icon}) => <div key={a} className="rounded-2xl border border-white bg-white/90 p-4"><Icon className="h-5 w-5 text-[#6BBF3A]"/><p className="mt-3 font-bold text-[#102A43]">{a}</p><p className="mt-1 text-xs leading-5 text-[#5F6C7B]">{b}</p></div>)}</div></div><div className="relative h-80 rounded-3xl border border-white bg-white shadow-[0_20px_60px_rgba(15,36,68,.10)]">{nexus && productImage(nexus) ? <Image src={productImage(nexus)} alt="Phoseon Nexus II UV LED curing system" fill sizes="(max-width:1024px) 100vw, 40vw" className="object-contain p-8"/> : null}</div></div><div className="mt-10 grid gap-5 md:grid-cols-2"><div className="rounded-2xl border border-[#DCE7E1] bg-white p-6"><div className="flex items-center gap-3"><ThermometerSun className="h-6 w-6 text-[#6BBF3A]"/><h3 className="text-lg font-bold text-[#102A43]">Air-Cooled</h3></div><ul className="mt-5 space-y-2 text-sm text-[#5F6C7B]">{["Web width: 300–600 mm","No chiller or fan blower needed","Up to 720 ft/min print speed","Up to 70% less kWh consumption","Quick press retrofit"].map(x=><li key={x} className="flex gap-2"><Check className="mt-0.5 h-4 w-4 shrink-0 text-[#6BBF3A]"/>{x}</li>)}</ul></div><div className="rounded-2xl border border-[#DCE7E1] bg-white p-6"><div className="flex items-center gap-3"><Droplets className="h-6 w-6 text-[#1E5BFF]"/><h3 className="text-lg font-bold text-[#102A43]">Water-Cooled</h3></div><ul className="mt-5 space-y-2 text-sm text-[#5F6C7B]">{["Web width: 300–675 mm","Higher UV dose","Up to 1050 ft/min print speed","Up to 60% less kWh consumption","Quick press retrofit"].map(x=><li key={x} className="flex gap-2"><Check className="mt-0.5 h-4 w-4 shrink-0 text-[#1E5BFF]"/>{x}</li>)}</ul></div></div><div className="mt-8 flex flex-col gap-3 sm:flex-row">{nexus && <Link href={productHref(nexus)} className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#087F6B] px-6 py-3.5 text-sm font-bold text-white">View Phoseon Nexus II <ArrowRight className="h-4 w-4"/></Link>}<a href={inquiryMailto(locale,{subject:"Phoseon Nexus II Retrofit Inquiry",context:"Press model / web width / line speed"})} className="inline-flex items-center justify-center rounded-xl border border-[#BFD5CC] bg-white px-6 py-3.5 text-sm font-bold text-[#087F6B]">Ask About Retrofit</a></div></div></section>

    <section className="bg-[#F7FAFC] px-4 py-20 sm:px-6 lg:px-8"><div className="mx-auto max-w-7xl"><p className="text-xs font-bold uppercase tracking-[.18em] text-[#6BBF3A]">Application Industries</p><div className="mt-3 flex items-end justify-between gap-5"><div><h2 className="text-3xl font-bold text-[#102A43] md:text-4xl">Where Phoseon Fits Best</h2><p className="mt-3 max-w-3xl text-[#5F6C7B]">High-performance UV LED curing across printing, coatings, electronics, fiber and industrial production.</p></div><Link href="/applications" className="hidden items-center gap-2 text-sm font-bold text-[#087F6B] sm:inline-flex">View Applications <ArrowRight className="h-4 w-4"/></Link></div><div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">{industries.map(item=>{const Icon=item.icon;return <Link href="/applications" key={item.title} className="group rounded-2xl border border-[#E3EAF2] bg-white p-6 transition hover:-translate-y-1 hover:shadow-lg"><Icon className="h-6 w-6 text-[#6BBF3A]" strokeWidth={1.7}/><h3 className="mt-5 font-bold text-[#102A43] group-hover:text-[#087F6B]">{item.title}</h3><p className="mt-2 text-sm text-[#5F6C7B]">{item.detail}</p></Link>})}</div></div></section>

    <section className="px-4 py-20 sm:px-6 lg:px-8"><div className="mx-auto max-w-7xl"><p className="text-xs font-bold uppercase tracking-[.18em] text-[#6BBF3A]">Industrial Reliability</p><h2 className="mt-3 text-3xl font-bold text-[#102A43] md:text-4xl">Why Choose Phoseon UV LED?</h2><div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">{why.map(item=>{const Icon=item.icon;return <article key={item.title} className="rounded-2xl border border-[#E3EAF2] p-6"><Icon className="h-7 w-7 text-[#087F6B]" strokeWidth={1.7}/><h3 className="mt-5 font-bold text-[#102A43]">{item.title}</h3><p className="mt-3 text-sm leading-6 text-[#5F6C7B]">{item.body}</p></article>})}</div></div></section>

    <FinalCta heading="Need Help Selecting a Phoseon UV LED System?" body="Tell us your material, curing width, line speed, cooling preference and production process. ETIA can recommend the right Phoseon direction." primary={{ label: "Talk to an Engineer", href: engineerMail }} secondary={{ label: "Request Product Recommendation", href: inquiryMailto(locale, { subject: "Phoseon Product Recommendation", context: "Material / curing width / line speed / cooling" }) }} />
  </div>;
}
