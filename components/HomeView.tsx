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
import { useLocale } from "@/components/LocaleContext";
import { caseSlug, caseStudyImage, successStories } from "@/components/caseStudies";
import { productImage, products } from "@/components/productCatalog";
import TrustStrip from "@/components/TrustStrip";

const whyCards = [
  { title: "20 Years of Application Experience", body: "Hands-on UV curing knowledge across medical, electronics, photonics, automotive and industrial manufacturing.", icon: GraduationCap },
  { title: "Authorized & Genuine Supply", body: "Genuine systems, replacement lamps and accessories through authorized supply channels.", icon: BadgeCheck },
  { title: "Local Stock & Fast Response", body: "Local equipment and consumables help reduce lead time and production risk.", icon: Warehouse },
  { title: "In-House Repair & Lifecycle Support", body: "Troubleshooting, maintenance and repair coordination to keep your process running.", icon: Wrench },
];

// OmniCure systems featured in the hero product carousel (all have COS assets).
const heroProductSlugs = ["s1500-pro", "lx500", "v3-led-heads", "ac8", "ac5", "ls200"];

const applications: Array<{ title: string; icon: ComponentType<{ className?: string; strokeWidth?: number }> }> = [
  { title: "Medical Devices", icon: HeartPulse },
  { title: "Electronics & Semiconductor", icon: CircuitBoard },
  { title: "Optics & Photonics", icon: Sparkles },
  { title: "Automotive & EV", icon: Car },
  { title: "Printing & Packaging", icon: Printer },
  { title: "Industrial Coating & Assembly", icon: Paintbrush },
];

const services = [
  { title: "Genuine Product Assurance", body: "Authorized supply of genuine systems, lamps and accessories.", icon: ShieldCheck },
  { title: "Application-Driven Selection", body: "Selection based on material, adhesive, geometry, wavelength and cycle time.", icon: Crosshair },
  { title: "Installation & Training", body: "Setup guidance, operator training and production implementation support.", icon: PackageCheck },
  { title: "Troubleshooting & Repair", body: "Local diagnosis, maintenance, repair and lifecycle coordination.", icon: Wrench },
];

function product(slug: string) {
  return products.find((item) => item.slug === slug);
}

export type HomeArticle = {
  slug: string;
  title: string;
  description: string;
  date: string;
  cover?: string;
  tag?: string;
  readingMinutes?: number;
};

export default function HomeView({ articles = [] }: { articles?: HomeArticle[] }) {
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
          <span className="inline-flex items-center gap-2 rounded-full border border-[#41A62A]/20 bg-white px-3 py-1.5 text-xs font-bold text-[#41A62A] shadow-sm"><BadgeCheck className="h-4 w-4" />Authorized Distributor · Genuine Products Guaranteed</span>
          <h1 className="mt-6 max-w-4xl text-4xl font-bold leading-[1.08] tracking-tight text-[#143C96] md:text-6xl">Your UV Curing Solution Partner <span className="text-[#41A62A]">— From Selection to Support.</span></h1>
          <p className="mt-6 max-w-3xl text-base leading-7 text-[#667085] md:text-lg">ETIA helps manufacturers select, validate, install, and maintain advanced UV curing systems for precision bonding, coating, printing, encapsulation, and high-reliability assembly.</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row"><Link href="/product/omnicure" className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#143C96] px-6 py-3.5 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-[#1F63D6]">Explore Products <ArrowRight className="h-4 w-4" /></Link><a href={engineerMail} className="inline-flex items-center justify-center rounded-xl border border-[#D4DFEC] bg-white px-6 py-3.5 text-sm font-bold text-[#143C96] transition hover:-translate-y-0.5 hover:border-[#143C96] hover:text-[#1F63D6]">Talk to an Engineer</a></div>
        </div>
        <div className="relative min-h-[410px] rounded-[32px] border border-white/80 bg-white/75 p-5 shadow-[0_25px_80px_rgba(20,60,150,.12)] backdrop-blur sm:p-8">
          <div className="absolute left-10 right-10 top-1/2 h-24 -translate-y-1/2 rounded-full bg-gradient-to-r from-[#1F63D6]/20 via-[#63C94A]/35 to-transparent blur-2xl" />
          {heroProducts.map((p, i) => <Image key={p.slug} src={productImage(p)} alt={p.name} fill priority={i === 0} sizes="(max-width: 1024px) 100vw, 46vw" className={`object-contain p-16 transition-opacity duration-700 ${i === heroIndex ? "opacity-100" : "opacity-0"}`} />)}
          {heroProducts.length > 1 && <div className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 gap-2">{heroProducts.map((p, i) => <button key={p.slug} type="button" aria-label={`Show ${p.name}`} onClick={() => setHeroIndex(i)} className={`h-2 rounded-full transition-all ${i === heroIndex ? "w-6 bg-[#143C96]" : "w-2 bg-[#143C96]/25"}`} />)}</div>}
          <div className="absolute left-4 top-5 rounded-xl border border-[#D9E4EA] bg-white px-4 py-3 shadow-lg sm:left-6"><p className="text-xs font-bold text-[#143C96]">Genuine Products</p><p className="mt-1 text-[10px] text-[#667085]">Authorized supply</p></div>
          <div className="absolute right-4 top-1/3 rounded-xl border border-[#D9E4EA] bg-white px-4 py-3 shadow-lg sm:right-6"><p className="text-xs font-bold text-[#143C96]">Application Support</p><p className="mt-1 text-[10px] text-[#667085]">Engineer-led selection</p></div>
          <div className="absolute bottom-5 left-8 rounded-xl border border-[#D9E4EA] bg-white px-4 py-3 shadow-lg"><p className="text-xs font-bold text-[#41A62A]">In-House Repair</p><p className="mt-1 text-[10px] text-[#667085]">Lifecycle support</p></div>
        </div>
      </div>
    </section>

    <TrustStrip />

    <section className="px-4 py-20 sm:px-6 lg:px-8"><div className="mx-auto max-w-7xl"><h2 className="text-3xl font-bold text-[#143C96] md:text-4xl">Why Manufacturers Choose ETIA</h2><p className="mt-4 max-w-3xl leading-7 text-[#667085]">We combine authorized supply, hands-on application experience, and local technical service to keep your UV curing process stable, repeatable, and production-ready.</p><div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">{whyCards.map(item=>{const Icon=item.icon;return <article key={item.title} className="rounded-2xl border border-[#D9E4EA] bg-white p-6 shadow-[0_10px_35px_rgba(20,60,150,.06)]"><span className="inline-flex rounded-xl bg-[#EEF6FF] p-3 text-[#143C96]"><Icon className="h-6 w-6" strokeWidth={1.7}/></span><h3 className="mt-5 font-bold text-[#143C96]">{item.title}</h3><p className="mt-3 text-sm leading-6 text-[#667085]">{item.body}</p></article>})}</div></div></section>


    <section className="px-4 py-20 sm:px-6 lg:px-8"><div className="mx-auto max-w-7xl"><p className="text-xs font-bold uppercase tracking-[.18em] text-[#41A62A]">Authorized Brand Solutions</p><h2 className="mt-3 text-3xl font-bold text-[#143C96] md:text-4xl">Authorized UV Curing Brands We Support</h2><div className="mt-10 grid gap-6 lg:grid-cols-2"><Link href="/product/omnicure" className="group grid overflow-hidden rounded-3xl border border-[#D9E4EA] bg-gradient-to-br from-white to-[#EEF6FF] sm:grid-cols-[1fr_.9fr]"><div className="p-8"><span className="text-xs font-bold uppercase tracking-[.14em] text-[#41A62A]">Precision Manufacturing</span><h3 className="mt-3 text-2xl font-bold text-[#143C96]">OmniCure UV Curing Systems</h3><p className="mt-4 text-sm leading-6 text-[#667085]">Precision UV curing for assembly, bonding, medical devices and electronics.</p><span className="mt-7 inline-flex items-center gap-2 text-sm font-bold text-[#143C96]">Explore OmniCure <ArrowRight className="h-4 w-4"/></span></div><div className="relative min-h-64 bg-white/60">{omnicureProduct&&productImage(omnicureProduct)&&<Image src={productImage(omnicureProduct)} alt="OmniCure UV curing system" fill sizes="(max-width:1024px) 100vw, 45vw" className="object-contain p-7 transition group-hover:scale-105"/>}</div></Link><Link href="/product/phoseon" className="group grid overflow-hidden rounded-3xl border border-[#D9E4EA] bg-gradient-to-br from-white to-[#F1FAEF] sm:grid-cols-[1fr_.9fr]"><div className="p-8"><span className="text-xs font-bold uppercase tracking-[.14em] text-[#41A62A]">Industrial UV LED</span><h3 className="mt-3 text-2xl font-bold text-[#143C96]">Phoseon UV LED Curing Systems</h3><p className="mt-4 text-sm leading-6 text-[#667085]">Industrial UV LED curing for inks, coatings, printing, packaging and production lines.</p><span className="mt-7 inline-flex items-center gap-2 text-sm font-bold text-[#41A62A]">Explore Phoseon <ArrowRight className="h-4 w-4"/></span></div><div className="relative min-h-64 bg-white/60">{phoseonProduct&&productImage(phoseonProduct)&&<Image src={productImage(phoseonProduct)} alt="Phoseon industrial UV LED curing system" fill sizes="(max-width:1024px) 100vw, 45vw" className="object-contain p-7 transition group-hover:scale-105"/>}</div></Link></div></div></section>

    <section className="bg-[#F1FAEF] px-4 py-20 sm:px-6 lg:px-8"><div className="mx-auto max-w-7xl"><p className="text-xs font-bold uppercase tracking-[.18em] text-[#41A62A]">Manufacturing Applications</p><h2 className="mt-3 text-3xl font-bold text-[#143C96] md:text-4xl">Built for Demanding Manufacturing Applications</h2><div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{applications.map(item=>{const Icon=item.icon;return <Link href="/applications" key={item.title} className="group flex items-center gap-4 rounded-2xl border border-[#D9E4EA] bg-white p-5 transition hover:-translate-y-1 hover:shadow-lg"><span className="rounded-xl bg-[#EEF6FF] p-3 text-[#143C96]"><Icon className="h-6 w-6" strokeWidth={1.7}/></span><span className="font-bold text-[#143C96] group-hover:text-[#41A62A]">{item.title}</span><ArrowRight className="ml-auto h-4 w-4 text-[#41A62A]"/></Link>})}</div></div></section>

    {articles.length>0&&<section className="px-4 py-20 sm:px-6 lg:px-8"><div className="mx-auto max-w-7xl"><p className="text-xs font-bold uppercase tracking-[.18em] text-[#41A62A]">Guides &amp; Insights</p><div className="mt-3 flex items-end justify-between gap-4"><div><h2 className="text-3xl font-bold text-[#143C96] md:text-4xl">UV Curing Guides &amp; Insights</h2><p className="mt-3 max-w-3xl text-[#667085]">Practical setup, maintenance and troubleshooting guides for the UV curing systems we support.</p></div><Link href="/insights" className="hidden items-center gap-2 text-sm font-bold text-[#143C96] sm:inline-flex">View all <ArrowRight className="h-4 w-4"/></Link></div><div className="mt-10 grid gap-6 md:grid-cols-3">{articles.slice(0,3).map(a=><Link key={a.slug} href={`/insights/${a.slug}`} className="group flex flex-col overflow-hidden rounded-2xl border border-[#D9E4EA] bg-white transition hover:-translate-y-1 hover:shadow-lg"><div className="relative aspect-video bg-[#EEF6FF]">{a.cover&&<Image src={a.cover} alt={a.title} fill sizes="(max-width:768px) 100vw, 33vw" className="object-cover transition group-hover:scale-105"/>}</div><div className="flex flex-1 flex-col p-6">{a.tag&&<p className="text-[10px] font-bold uppercase tracking-[.12em] text-[#41A62A]">{a.tag}</p>}<h3 className="mt-2 font-bold leading-snug text-[#143C96] group-hover:text-[#1F63D6]">{a.title}</h3><p className="mt-3 line-clamp-3 text-sm leading-6 text-[#667085]">{a.description}</p><span className="mt-5 inline-flex items-center gap-1 text-sm font-bold text-[#143C96]">Read guide <ArrowRight className="h-3.5 w-3.5"/></span></div></Link>)}</div></div></section>}

    <section className="bg-gradient-to-br from-[#143C96] to-[#1F63D6] px-4 py-20 text-white sm:px-6 lg:px-8"><div className="mx-auto max-w-7xl"><p className="text-xs font-bold uppercase tracking-[.18em] text-[#A4E78F]">Case Studies</p><div className="mt-3 flex items-end justify-between gap-4"><div><h2 className="text-3xl font-bold md:text-4xl">Where Performance Is Proven</h2><p className="mt-3 max-w-3xl text-blue-100">Real UV curing processes in precision and high-reliability manufacturing.</p></div><Link href="/applications" className="hidden items-center gap-2 text-sm font-bold text-white sm:inline-flex">View Applications <ArrowRight className="h-4 w-4"/></Link></div><div className="mt-10"><div ref={caseScrollRef} className="flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">{successStories.map(story=><Link href={`/case-studies/${caseSlug(story)}`} key={story.id} className="group w-[280px] shrink-0 snap-start overflow-hidden rounded-2xl bg-white text-[#102038] shadow-xl"><div className="relative h-40 bg-[#EEF6FF]">{caseStudyImage(story)&&<Image src={caseStudyImage(story)} alt={story.sector} fill sizes="280px" className="object-cover transition group-hover:scale-105"/>}</div><div className="p-5"><p className="text-[10px] font-bold uppercase tracking-[.12em] text-[#41A62A]">{story.sector}</p><h3 className="mt-2 line-clamp-3 font-bold leading-snug text-[#143C96]">{story.title}</h3><span className="mt-5 inline-flex items-center gap-1 text-xs font-bold text-[#143C96]">Read case <ArrowRight className="h-3.5 w-3.5"/></span></div></Link>)}</div><div className="mt-6 flex justify-end gap-3"><button type="button" aria-label="Previous case studies" onClick={()=>scrollCases(-1)} className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/40 bg-white/10 text-white transition hover:bg-white/20"><ChevronLeft className="h-5 w-5"/></button><button type="button" aria-label="Next case studies" onClick={()=>scrollCases(1)} className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/40 bg-white/10 text-white transition hover:bg-white/20"><ChevronRight className="h-5 w-5"/></button></div></div></div></section>

    <section className="px-4 py-20 sm:px-6 lg:px-8"><div className="mx-auto max-w-7xl"><p className="text-xs font-bold uppercase tracking-[.18em] text-[#41A62A]">Long-Term Support</p><h2 className="mt-3 text-3xl font-bold text-[#143C96] md:text-4xl">ETIA Service Commitment</h2><p className="mt-4 max-w-3xl text-[#667085]">Genuine products. Application-driven solutions. Local technical support. Long-term service.</p><div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">{services.map(item=>{const Icon=item.icon;return <article key={item.title} className="rounded-2xl border border-[#D9E4EA] bg-white p-6"><span className="inline-flex rounded-xl bg-[#F1FAEF] p-3 text-[#41A62A]"><Icon className="h-6 w-6" strokeWidth={1.7}/></span><h3 className="mt-5 font-bold text-[#143C96]">{item.title}</h3><p className="mt-3 text-sm leading-6 text-[#667085]">{item.body}</p></article>})}</div></div></section>

    <section className="bg-gradient-to-r from-[#143C96] to-[#1F63D6] px-4 py-16 text-white sm:px-6 lg:px-8"><div className="mx-auto max-w-4xl text-center"><Zap className="mx-auto h-9 w-9 text-[#8BE172]"/><h2 className="mt-5 text-3xl font-bold md:text-4xl">Need help choosing the right UV curing system?</h2><p className="mx-auto mt-5 max-w-3xl leading-7 text-blue-100">Tell us your application, adhesive, curing area, wavelength, and production requirements. ETIA engineers will help you find the right solution.</p><div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row"><a href={engineerMail} className="rounded-xl bg-[#41A62A] px-7 py-3.5 text-sm font-bold text-white">Talk to an Engineer</a><a href={inquiryMailto(locale,{subject:"UV Curing Application Review",context:"Application / adhesive / area / wavelength / production requirements"})} className="rounded-xl border border-white/35 bg-white/10 px-7 py-3.5 text-sm font-bold text-white">Send Your Application</a></div></div></section>
  </div>;
}
