"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState, type ComponentType } from "react";
import {
  ArrowRight,
  BadgeCheck,
  Boxes,
  Check,
  CircuitBoard,
  Crosshair,
  Gauge,
  Layers3,
  Lightbulb,
  Microscope,
  PackageCheck,
  ScanLine,
  Settings,
  ShieldCheck,
  Sparkles,
  Wrench,
  Zap,
} from "lucide-react";
import { inquiryMailto, SALES_EMAIL } from "@/components/contact";
import { useLocale, t } from "@/components/LocaleContext";
import {
  localizeProduct,
  popularityRank,
  productHref,
  productHighlights,
  productImage,
  products,
} from "@/components/productCatalog";
import { LAMP, LAMP_PATHS } from "@/components/omnicure/s2000Lamp";
import FinalCta from "@/components/FinalCta";
import { getApplicationsForProduct } from "@/data/applicationsData";

type RouteId = "all" | "lamp-spot" | "led-spot" | "large-area" | "small-area";

const order = [
  "s2000-elite", "s1500-pro", "r2000", "s-series-light-guides",
  "lx500", "v3-led-heads", "ls200",
  "ac2", "ac4", "ac5", "ac7", "ac8", "ac8-hd", "ac9225", "ac9225-f",
  "s2e-network-module",
];

const categoryBySlug: Record<string, Exclude<RouteId, "all">> = {
  "s2000-elite": "lamp-spot",
  "s1500-pro": "lamp-spot",
  r2000: "lamp-spot",
  "s-series-light-guides": "lamp-spot",
  "s2e-network-module": "lamp-spot",
  lx500: "led-spot",
  "v3-led-heads": "led-spot",
  ls200: "led-spot",
  ac2: "small-area",
  ac4: "small-area",
  ac5: "small-area",
  ac7: "large-area",
  ac8: "large-area",
  "ac8-hd": "large-area",
  ac9225: "large-area",
  "ac9225-f": "large-area",
};

const routes: Array<{
  id: Exclude<RouteId, "all">;
  eyebrow: string;
  title: string;
  body: string;
  bestFor: string[];
  featured?: string;
  color: string;
  soft: string;
  icon: ComponentType<{ className?: string; strokeWidth?: number }>;
}> = [
  {
    id: "lamp-spot",
    eyebrow: "UV Lamp Spot Curing",
    title: "High-Intensity Spot Curing",
    body: "Broad-spectrum UV output for precise adhesive bonding and established production processes.",
    bestFor: ["Medical devices", "Optical adhesives", "Existing S2000 processes"],
    featured: "S2000 Elite",
    color: "#1A56DB",
    soft: "#F3F7FF",
    icon: Crosshair,
  },
  {
    id: "led-spot",
    eyebrow: "UV LED Spot Curing",
    title: "LED Precision, Flexible Control",
    body: "Wavelength-specific LED spot curing with long life, modular control and low maintenance.",
    bestFor: ["Automated assembly", "Electronics", "Process development"],
    featured: "LX500 V2",
    color: "#2F80ED",
    soft: "#F3F8FF",
    icon: Zap,
  },
  {
    id: "large-area",
    eyebrow: "UV LED Air-Cooled Large-Area",
    title: "Uniform Exposure for Wider Areas",
    body: "Scalable UV LED curing for fixtures, larger bonding zones and production assemblies.",
    bestFor: ["Displays", "EV components", "Coatings and industrial adhesives"],
    featured: "AC8 Series",
    color: "#087F6B",
    soft: "#F2FBF8",
    icon: ScanLine,
  },
  {
    id: "small-area",
    eyebrow: "UV LED Air-Cooled Small-Area",
    title: "Compact Curing, Controlled Zones",
    body: "Compact area curing for small components, controlled windows and laboratory workflows.",
    bestFor: ["Precision parts", "R&D", "Compact production cells"],
    featured: "AC5 Series",
    color: "#25A970",
    soft: "#F2FBF8",
    icon: Layers3,
  },
];

const applicationCards = [
  { title: "Medical Device Bonding", detail: "Catheters · Needles · Sensors", icon: Microscope },
  { title: "Electronics Assembly", detail: "PCB components · Encapsulation", icon: CircuitBoard },
  { title: "Optics & Photonics", detail: "Transceivers · Fiber arrays · PIC", icon: Sparkles },
  { title: "Automotive & EV", detail: "LiDAR · Cameras · Battery components", icon: Gauge },
  { title: "Laboratory & Life Science", detail: "Testing · Controlled curing", icon: Boxes },
  { title: "Industrial Adhesives", detail: "Bonding · Sealing · Coatings", icon: Settings },
];

const services = [
  { title: "Genuine Product Supply", body: "Authorized supply channel for OmniCure systems, lamps and accessories.", icon: PackageCheck },
  { title: "Application-Driven Selection", body: "Match UV technology to your adhesive, substrate, cure area and cycle time.", icon: Crosshair },
  { title: "Local Installation Support", body: "Setup, operation and process optimization support for production teams.", icon: Wrench },
  { title: "Maintenance & Repair", body: "Troubleshooting, spare parts and repair coordination to reduce downtime.", icon: ShieldCheck },
];

export default function OmniCureBrandLanding() {
  const { locale } = useLocale();
  const [activeRoute, setActiveRoute] = useState<RouteId>("all");
  const allProducts = useMemo(() => products
    .filter((product) => product.brandId === "omnicure")
    .sort((a, b) => {
      const ai = order.indexOf(a.slug);
      const bi = order.indexOf(b.slug);
      return (ai < 0 ? 999 : ai) - (bi < 0 ? 999 : bi) || popularityRank(a.slug) - popularityRank(b.slug);
    }), []);
  const visibleProducts = activeRoute === "all"
    ? allProducts
    : allProducts.filter((product) => categoryBySlug[product.slug] === activeRoute);
  const mailto = inquiryMailto(locale, { subject: "OmniCure Engineering Inquiry", context: "OmniCure technology selection" });

  const [showOrder, setShowOrder] = useState(false);
  const [orderQty, setOrderQty] = useState<Record<string, number>>({});
  const orderLines = LAMP.parts.filter(([code]) => (orderQty[code] ?? 0) > 0);
  const orderTotal = orderLines.reduce((sum, [code]) => sum + (orderQty[code] ?? 0), 0);
  const orderMailto = `mailto:${SALES_EMAIL}?subject=${encodeURIComponent("OmniCure S2000 Elite Lamp Order")}&body=${encodeURIComponent(["OmniCure S2000 Elite Lamp — Order Request", "", ...orderLines.map(([code, desc]) => `${code} x ${orderQty[code]}  — ${desc}`), "", "Company / contact / phone:", "Delivery location / country:", "", "Thank you!"].join("\n"))}`;

  function chooseRoute(id: Exclude<RouteId, "all">) {
    setActiveRoute(id);
    document.getElementById("omnicure-products")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <div className="bg-white text-[#14213D]">
      <section className="relative overflow-hidden border-b border-[#D9E4EA] bg-gradient-to-br from-white via-[#EEF6FF] to-[#F1FAEF]">
        <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-[#1F63D6]/10 blur-3xl" />
        <div className="absolute -bottom-40 left-1/3 h-80 w-80 rounded-full bg-[#63C94A]/10 blur-3xl" />
        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-24 lg:px-8">
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#41A62A]/20 bg-white px-3 py-1.5 text-xs font-bold text-[#41A62A] shadow-sm">
              <BadgeCheck className="h-4 w-4" /> Authorized OmniCure® Distributor
            </div>
            <h1 className="max-w-3xl text-4xl font-bold leading-[1.08] tracking-tight text-[#143C96] md:text-6xl">{t({ en: "OmniCure UV Curing Solutions", zh: "OmniCure UV 光固化解决方案", th: "โซลูชัน UV Curing ของ OmniCure", vi: "Giải pháp UV Curing OmniCure" }, locale)}<span className="mt-2 block text-2xl font-bold text-[#41A62A] md:text-4xl">{t({ en: "Precision Cures. Supreme Control.", zh: "精准固化，卓越掌控。", th: "การบ่มที่แม่นยำ ควบคุมเหนือระดับ", vi: "Đóng rắn chính xác. Kiểm soát tối ưu." }, locale)}</span></h1>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a href="#choose-technology" className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#41A62A] px-6 py-3.5 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-[#358B22]">Choose Your Technology <ArrowRight className="h-4 w-4" /></a>
              <a href={mailto} className="inline-flex items-center justify-center rounded-xl border border-[#D4DFEC] bg-white px-6 py-3.5 text-sm font-bold text-[#143C96] transition hover:border-[#143C96] hover:text-[#1F63D6]">Talk to an Engineer</a>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-r from-[#143C96] to-[#1F63D6] px-4 py-5 text-white sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-3 text-center md:flex-row md:justify-between md:text-left">
          <p className="text-sm font-semibold">ETIA is an authorized distributor of OmniCure® products.</p>
          <div className="flex flex-wrap justify-center gap-4 text-xs font-semibold text-blue-100">{["Genuine Products", "Application-Driven Solution", "Local Supply Chain", "Long-Term Service"].map((item) => <span key={item} className="inline-flex items-center gap-1.5"><BadgeCheck className="h-4 w-4 text-[#8BE172]" />{item}</span>)}</div>
          <p className="text-xs text-blue-200">Authorized by Excelitas Canada Inc.</p>
        </div>
      </section>

      <section id="choose-technology" className="scroll-mt-20 px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs font-bold uppercase tracking-[.18em] text-[#44B549]">Technology Selector</p>
          <div className="mt-3 flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
            <div><h2 className="text-3xl font-bold text-[#102A43] md:text-4xl">Choose by Technology</h2><p className="mt-3 max-w-3xl text-[#5F6C7B]">Select the curing method that best matches your adhesive, curing area, production speed and process control requirements.</p></div>
            <div className="flex rounded-xl border border-[#E3EAF2] bg-[#F7FAFC] p-1 text-xs font-semibold"><span className="rounded-lg bg-white px-3 py-2 text-[#1A56DB] shadow-sm">Spot · Focused energy</span><span className="px-3 py-2 text-[#087F6B]">Area · Uniform exposure</span></div>
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {routes.map((route) => {
              const Icon = route.icon;
              return <button key={route.id} onClick={() => chooseRoute(route.id)} className="group flex flex-col rounded-2xl border border-[#E3EAF2] bg-white p-5 text-left transition hover:-translate-y-1 hover:shadow-[0_18px_50px_rgba(15,36,68,.09)]" style={{ borderTopColor: route.color, borderTopWidth: 4 }}>
                <span className="flex h-10 w-10 items-center justify-center rounded-xl" style={{ color: route.color, background: route.soft }}><Icon className="h-5 w-5" strokeWidth={1.8} /></span>
                <p className="mt-4 text-[11px] font-bold uppercase tracking-[.1em]" style={{ color: route.color }}>{route.eyebrow}</p>
                <h3 className="mt-1.5 text-base font-bold leading-snug text-[#102A43]">{route.title}</h3>
                <p className="mt-2 flex-1 text-xs leading-5 text-[#5F6C7B]">{route.body}</p>
                {route.featured && <p className="mt-3 text-[11px] text-[#7B8794]">Featured: <span className="font-semibold text-[#102A43]">OmniCure {route.featured}</span></p>}
                <span className="mt-3 inline-flex items-center gap-1 text-xs font-bold" style={{ color: route.color }}>View matching products <ArrowRight className="h-3.5 w-3.5" /></span>
              </button>;
            })}
          </div>
        </div>
      </section>

      <section id="omnicure-products" className="scroll-mt-20 bg-[#F7FAFC] px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs font-bold uppercase tracking-[.18em] text-[#44B549]">OmniCure Product Family</p>
          <div className="mt-3 flex flex-col justify-between gap-5 lg:flex-row lg:items-end"><div><h2 className="text-3xl font-bold text-[#102A43] md:text-4xl">Find Your OmniCure System</h2><p className="mt-3 max-w-2xl text-[#5F6C7B]">All systems are shown on one page. Filter by curing route, then open the detailed product page.</p></div><div className="flex flex-wrap gap-2"><button onClick={() => setActiveRoute("all")} className={`rounded-full border px-4 py-2 text-xs font-bold transition ${activeRoute === "all" ? "border-[#1A56DB] bg-[#1A56DB] text-white" : "border-[#D9E3EE] bg-white text-[#5F6C7B]"}`}>All Products ({allProducts.length})</button>{routes.map((route) => <button key={route.id} onClick={() => setActiveRoute(route.id)} className="rounded-full border bg-white px-4 py-2 text-xs font-bold transition" style={activeRoute === route.id ? { background: route.color, borderColor: route.color, color: "white" } : { borderColor: "#D9E3EE", color: "#5F6C7B" }}>{route.id === "lamp-spot" ? "Lamp Spot" : route.id === "led-spot" ? "LED Spot" : route.id === "large-area" ? "Large Area" : "Small Area"}</button>)}</div></div>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {visibleProducts.map((raw) => {
              const product = localizeProduct(raw, locale);
              // The S Series light-guides slot is repurposed as the S2000 Elite
              // replacement-lamp card, linking straight to the lamp landing page.
              const isLamp = raw.slug === "s-series-light-guides";
              const cardHref = isLamp ? LAMP_PATHS.en : productHref(product);
              const cardName = isLamp ? LAMP.name : product.name;
              const cardImg = isLamp ? LAMP.heroImage : productImage(product);
              const cardCategory = isLamp ? "Replacement Lamp" : (categoryBySlug[product.slug]?.replaceAll("-", " ") ?? product.tech);
              const highlights = isLamp ? [] : (productHighlights[product.slug] ?? []);
              const related = isLamp ? [] : getApplicationsForProduct(product.slug, 1);
              return <Link key={product.slug} href={cardHref} className="group flex min-h-[390px] flex-col overflow-hidden rounded-2xl border border-[#E3EAF2] bg-white transition hover:-translate-y-1 hover:border-[#B9CCE2] hover:shadow-[0_16px_45px_rgba(15,36,68,.09)]">
                <div className="relative h-48 border-b border-[#EEF2F6] bg-white p-4">{cardImg ? <Image src={cardImg} alt={cardName} fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw" className="object-contain p-5 transition duration-300 group-hover:scale-105" /> : <span className="absolute inset-0 flex items-center justify-center font-bold text-[#1A56DB]">OmniCure</span>}</div>
                <div className="flex flex-1 flex-col p-5"><p className="text-[10px] font-bold uppercase tracking-[.12em] text-[#1A56DB]">{cardCategory}</p><h3 className="mt-2 text-base font-bold leading-snug text-[#102A43] group-hover:text-[#1A56DB]">{cardName}</h3>{isLamp && <p className="mt-4 line-clamp-2 text-xs leading-5 text-[#7B8794]">Genuine spare lamp · Part No. {LAMP.primaryCode}</p>}{highlights.length > 0 && <div className="mt-4 flex flex-wrap gap-1.5">{highlights.slice(0, 2).map((item) => <span key={item} className="rounded-full bg-[#F3F7FF] px-2.5 py-1 text-[10px] font-semibold text-[#1A56DB]">{item}</span>)}</div>}{related.length > 0 && <p className="mt-4 line-clamp-2 text-xs leading-5 text-[#7B8794]">Application: {related[0].title}</p>}<span className="mt-auto inline-flex items-center gap-1.5 pt-5 text-sm font-bold text-[#1A56DB]">{isLamp ? "Order lamp" : "View product"} <ArrowRight className="h-4 w-4" /></span></div>
              </Link>;
            })}
          </div>
        </div>
      </section>

      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-8 overflow-hidden rounded-[32px] border border-[#DCE9EE] bg-gradient-to-br from-[#F3F7FF] to-[#F2FBF8] p-7 sm:p-10 lg:grid-cols-[1.2fr_.8fr] lg:items-center">
          <div><p className="text-xs font-bold uppercase tracking-[.18em] text-[#087F6B]">Critical Consumable</p><h2 className="mt-3 text-3xl font-bold text-[#102A43] md:text-4xl">Need a Replacement Lamp for Your S2000?</h2><p className="mt-5 max-w-3xl leading-7 text-[#5F6C7B]">The S2000 lamp is critical for curing performance and production continuity. ETIA supplies genuine replacement lamps and can verify compatibility before ordering.</p><div className="mt-7 flex flex-col gap-3 sm:flex-row"><button type="button" onClick={() => { const next = !showOrder; setShowOrder(next); if (next) setTimeout(() => document.getElementById("s2000-order")?.scrollIntoView({ behavior: "smooth", block: "center" }), 60); }} className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#1A56DB] to-[#087F6B] px-6 py-3.5 text-sm font-bold text-white transition hover:-translate-y-0.5">{showOrder ? "Hide Order Form" : "Order S2000 Lamp"} <ArrowRight className="h-4 w-4" /></button><a href={inquiryMailto(locale, { subject: "S2000 Lamp Compatibility Check", context: "System model / serial number / lamp photo" })} className="inline-flex items-center justify-center rounded-xl border border-[#BFD2DD] bg-white px-6 py-3.5 text-sm font-bold text-[#102A43]">Check Compatibility</a></div><p className="mt-4 text-xs text-[#7B8794]">Send us your system model, serial number or lamp photo for compatibility support.</p></div>
          <Link href={LAMP_PATHS.en} className="relative block h-72 rounded-3xl border border-white bg-white shadow-[0_20px_55px_rgba(15,36,68,.10)]"><Image src={LAMP.heroImage} alt={LAMP.name} fill sizes="(max-width: 1024px) 100vw, 36vw" className="object-contain p-8" /></Link>
        </div>
        {showOrder && <div id="s2000-order" className="mx-auto mt-6 max-w-7xl scroll-mt-24 rounded-[28px] border border-[#DCE9EE] bg-white p-6 shadow-[0_18px_50px_rgba(15,36,68,.08)] sm:p-8">
          <div><h3 className="text-xl font-bold text-[#102A43]">S2000 Elite Lamp — Quick Order</h3><p className="mt-1 text-sm text-[#5F6C7B]">Enter the quantities you need and send the order straight to our sales team by email. Genuine OmniCure® lamps.</p></div>
          <div className="mt-6 space-y-3">{LAMP.parts.map(([code, desc]) => <div key={code} className="flex flex-col gap-3 rounded-2xl border border-[#E3EAF2] bg-[#F9FBFD] p-4 sm:flex-row sm:items-center sm:justify-between">
            <div><p className="font-mono text-sm font-bold text-[#1A56DB]">{code}</p><p className="mt-0.5 text-xs text-[#5F6C7B]">{desc}</p></div>
            <div className="flex items-center gap-3"><label htmlFor={`qty-${code}`} className="text-xs font-bold uppercase tracking-wider text-[#7B8794]">Qty</label><input id={`qty-${code}`} type="number" min={0} inputMode="numeric" value={orderQty[code] ?? ""} onChange={(e) => setOrderQty((q) => ({ ...q, [code]: Math.max(0, parseInt(e.target.value, 10) || 0) }))} placeholder="0" className="w-24 rounded-lg border border-[#D4DFEC] px-3 py-2 text-sm font-semibold text-[#102A43] outline-none focus:border-[#1A56DB]" /></div>
          </div>)}</div>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center"><a href={orderTotal > 0 ? orderMailto : undefined} aria-disabled={orderTotal === 0} className={`inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-sm font-bold text-white transition ${orderTotal > 0 ? "bg-gradient-to-r from-[#1A56DB] to-[#087F6B] hover:-translate-y-0.5" : "pointer-events-none bg-[#B9C6D6]"}`}>Send Order by Email <ArrowRight className="h-4 w-4" /></a><p className="text-xs text-[#7B8794]">{orderTotal > 0 ? `${orderTotal} lamp${orderTotal > 1 ? "s" : ""} selected — opens your email app to ${SALES_EMAIL}.` : "Enter a quantity above to enable the order email."}</p></div>
        </div>}
      </section>

      <section className="bg-[#F7FAFC] px-4 py-20 sm:px-6 lg:px-8"><div className="mx-auto max-w-7xl"><p className="text-xs font-bold uppercase tracking-[.18em] text-[#44B549]">Applications</p><div className="mt-3 flex items-end justify-between gap-5"><div><h2 className="text-3xl font-bold text-[#102A43] md:text-4xl">Built for Demanding Applications</h2><p className="mt-3 max-w-3xl text-[#5F6C7B]">Precision bonding, assembly and curing processes across advanced manufacturing industries.</p></div><Link href="/applications" className="hidden items-center gap-2 text-sm font-bold text-[#1A56DB] sm:inline-flex">View Applications <ArrowRight className="h-4 w-4" /></Link></div><div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">{applicationCards.map((item) => { const Icon = item.icon; return <Link key={item.title} href="/applications" className="group rounded-2xl border border-[#E3EAF2] bg-white p-4 text-center transition hover:-translate-y-1 hover:shadow-lg"><span className="mx-auto flex h-10 w-10 items-center justify-center rounded-xl bg-[#F3F7FF] text-[#1A56DB]"><Icon className="h-5 w-5" strokeWidth={1.7} /></span><h3 className="mt-3 text-sm font-bold leading-snug text-[#102A43] group-hover:text-[#1A56DB]">{item.title}</h3><p className="mt-1 text-[11px] leading-4 text-[#5F6C7B]">{item.detail}</p></Link>; })}</div></div></section>


      <FinalCta heading="Not Sure Which OmniCure System Fits Your Process?" body="Tell us your adhesive, substrate, curing area, cycle time and production requirements. ETIA can help recommend the right UV curing solution." primary={{ label: "Talk to an Engineer", href: mailto }} secondary={{ label: "Request Product Recommendation", href: inquiryMailto(locale, { subject: "OmniCure Product Recommendation", context: "Adhesive / substrate / curing area / cycle time" }) }} />
    </div>
  );
}
