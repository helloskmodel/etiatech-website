import Link from "next/link";
import Image from "next/image";
import CaseStudyCarousel from "@/components/CaseStudyCarousel";
import HeroBackdrop from "@/components/HeroBackdrop";
import { heroBannerImages } from "@/components/caseStudies";

const whyEtia = [
  {
    icon: "🧠",
    title: "Deep Application Expertise",
    desc: "20 years of validated industry cases across 10 industries. From medical device bonding to AI-data-center photonics packaging — we've proven the process so you don't have to.",
  },
  {
    icon: "📦",
    title: "Local Supply & Fast Delivery",
    desc: "Equipment and consumables in local stock. No long lead times, no import surprises — the system you need, when you need it.",
  },
  {
    icon: "🔧",
    title: "In-House Repair Factory",
    desc: "Our own repair facility with a trained technical team handles maintenance, extended warranty, and urgent repairs — minimizing downtime on your production line.",
  },
  {
    icon: "💼",
    title: "Full-Process Consulting Service",
    desc: "From initial selection and application validation to troubleshooting and lifecycle management — our engineers are your partners at every stage of the process.",
  },
];

const BASE = "https://etiatech-1303055923.cos.ap-singapore.myqcloud.com/IMAGE/homepageproduct";

const techRoutes = [
  {
    label: "UV LED SPOT CURING SYSTEMS",
    brands: ["OmniCure®"],
    desc: "UV LED spot curing systems are ideal for precision adhesive spot curing applications.",
    img: `${BASE}/HOME%20PAGE%20PRODUCT-LEFT1-UV%20LED%20CURING.png`,
    group: "single",
  },
  {
    label: "UV LED AIR-COOLED SYSTEMS",
    brands: ["Phoseon®", "OmniCure®"],
    desc: "Air-cooled UV LED curing systems allow for easy and cost-effective integration into automated systems without a separate chiller.",
    img: `${BASE}/HOME%20PAGE%20PRODUCT-LEFT%202-UV%20LED%20AIR-COOLED.png`,
    group: "single",
  },
  {
    label: "UV LED WATER-COOLED SYSTEMS",
    brands: ["Phoseon®", "NobleLight®"],
    desc: "Water-cooled UV LED curing systems for environments with extreme temperatures and debris. Ideal for heat-sensitive substrates.",
    img: `${BASE}/HOME%20PAGE%20PRODUCT-LEFT%203-UV-LED%20WATER-COOLED%20SYSTEM.png`,
    group: "single",
  },
  {
    label: "UV LAMP SPOT CURING SYSTEMS",
    brands: ["OmniCure®"],
    desc: "UV lamp spot curing systems are ideal for precision adhesive spot curing for broad spectrum applications.",
    img: `${BASE}/HOME%20PAGE%20PRODUCT-LEFT4-UV%20LAMP%20SPOT%20CURING%20SYSTEM.png`,
    group: "broad",
  },
  {
    label: "MICROWAVE UV CURING SYSTEMS",
    brands: ["Fusion®"],
    desc: "Microwave UV curing systems use electrodeless bulbs offering longer life, consistent output and less heat. Ideal for broad spectrum and UVC applications.",
    img: `${BASE}/HOME%20PAGE%20PRODUCT-LEFT5-MICROWAVE%20UV%20CURING.png`,
    group: "broad",
  },
  {
    label: "MERCURY ARC LAMPS",
    brands: ["NobleLight®"],
    desc: "Broad spectrum medium pressure mercury arc lamps in various lengths and power classes. Ideal for replacement lamps.",
    img: `${BASE}/HOME%20PAGE%20PRODUCT-LEFT6-MERCURY%20UVC%20LAMPS.png`,
    group: "broad",
  },
];

export default function Home() {
  return (
    <>
      {/* HERO — left-aligned, banner-ready (swap the section background for a banner image later) */}
      <section className="py-20 md:py-28 relative overflow-hidden" style={{ background: "#0f2444" }}>
        <HeroBackdrop images={heroBannerImages} />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl text-left">
            <p className="text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: "#44B549" }}>
              Authorized Distributor · Genuine Products Guaranteed
            </p>
            <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-4">
              Trusted Expertise.<br />
              <span style={{ color: "#44B549" }}>Responsive Solutions.</span>
            </h1>
            <p className="text-base text-gray-200 mb-8 leading-relaxed">
              ETIA turns 20 years of hands-on UV curing experience into practical support across product selection, process validation, troubleshooting, maintenance, and in-house repair.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/product" className="px-6 py-3 rounded font-semibold text-white hover:opacity-90 transition-all" style={{ background: "#1A56DB" }}>
                Explore Products →
              </Link>
              <a href="mailto:guoren_wang@etia-tech.com?subject=Engineering%20Inquiry" className="px-6 py-3 rounded font-semibold text-white border border-white/30 hover:border-white/60 transition-all">
                Talk to an Engineer
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* WHY ETIA — light */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-semibold tracking-widest uppercase mb-2" style={{ color: "#44B549" }}>Why ETIA</p>
          <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: "#1A56DB" }}>
            ETIA — 20 Years of UV Curing Expertise,<br />Delivered in Every Sale, Every Visit, Every Fix.
          </h2>
          <p className="text-gray-500 max-w-2xl mb-12">
            Rooted in engineering excellence, ETIA partners with the world&apos;s leading UV curing brands to deliver solutions that are proven, reliable, and backed end-to-end — from selection to support.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyEtia.map((item) => (
              <div key={item.title} className="rounded-xl p-6 border border-gray-100 hover:border-[#1A56DB]/30 hover:shadow-md transition-all bg-gray-50">
                <div className="text-3xl mb-4">{item.icon}</div>
                <h3 className="font-semibold text-base mb-2" style={{ color: "#1A56DB" }}>{item.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FULL SPECTRUM — light gray */}
      <section className="py-20" style={{ background: "#f0f4f8" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-semibold tracking-widest uppercase mb-2" style={{ color: "#44B549" }}>UV Curing Technology</p>
          <h2 className="text-3xl md:text-4xl font-bold mb-2" style={{ color: "#1A56DB" }}>The Full Spectrum of UV Curing Solutions</h2>
          <p className="text-gray-500 mb-6">200–600 nm · 6 Technology Routes · 4 World-Class Brands</p>

          {/* Spectrum bar */}
          <div className="rounded-full h-3 mb-1 overflow-hidden" style={{ background: "linear-gradient(to right, #1e1b4b, #4c1d95, #1d4ed8, #0ea5e9, #22c55e, #eab308, #f59e0b)" }} />
          <div className="relative h-4 text-xs text-gray-400 mb-3">
            <span className="absolute" style={{ left: "0%" }}>VUV</span>
            <span className="absolute" style={{ left: "13%" }}>UVC</span>
            <span className="absolute" style={{ left: "26%" }}>UVB</span>
            <span className="absolute" style={{ left: "40%", transform: "translateX(-50%)" }}>UVA</span>
            <span className="absolute" style={{ left: "72%", transform: "translateX(-50%)" }}>Visible</span>
          </div>

          {/* Group labels — 3 left (single wavelength / UVA), 3 right (broad spectrum / Visible) */}
          <div className="flex gap-2 mb-6 text-sm font-semibold text-center">
            <div className="flex-1 py-2 rounded-lg border" style={{ background: "#1A56DB0D", color: "#1A56DB", borderColor: "#1A56DB30" }}>
              Single Wavelength · 365–405 nm (UVA)
            </div>
            <div className="flex-1 py-2 rounded-lg border" style={{ background: "#44B5490D", color: "#44B549", borderColor: "#44B54930" }}>
              Broad Spectrum · 200–600 nm (UV + Visible)
            </div>
          </div>

          {/* 6 product cards — horizontal, image + title only */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {techRoutes.map((t) => (
              <div key={t.label} className="rounded-xl overflow-hidden border border-gray-200 bg-white shadow-sm hover:shadow-md transition-all flex flex-col">
                {/* Green header */}
                <div className="px-3 py-2 text-white text-xs font-bold leading-tight" style={{ background: "#44B549" }}>
                  {t.label}
                </div>
                {/* Product image */}
                <div className="bg-gray-50 relative flex-1" style={{ minHeight: "120px" }}>
                  <Image
                    src={t.img}
                    alt={t.label}
                    fill
                    sizes="(max-width: 768px) 50vw, 16vw"
                    className="object-contain p-3"
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <Link href="/product" className="inline-flex items-center gap-2 px-6 py-3 rounded font-semibold text-white hover:opacity-90 transition-all" style={{ background: "#1A56DB" }}>
              View All Products →
            </Link>
          </div>
        </div>
      </section>

      {/* CASE STUDIES — white */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-semibold tracking-widest uppercase mb-2" style={{ color: "#44B549" }}>Case Studies</p>
          <h2 className="text-3xl md:text-4xl font-bold mb-3" style={{ color: "#1A56DB" }}>Where Performance Is Proven</h2>
          <p className="text-gray-500 mb-10">See how our UV curing systems deliver where precision and reliability matter most.</p>
          <CaseStudyCarousel />
          <div className="mt-10 text-center">
            <Link href="/application" className="inline-flex items-center gap-2 px-6 py-3 rounded font-semibold border-2 border-[#1A56DB] text-[#1A56DB] hover:bg-[#1A56DB] hover:text-white transition-all">
              Explore All Applications →
            </Link>
          </div>
        </div>
      </section>

      {/* CTA BANNER — dark */}
      <section className="py-16" style={{ background: "#1A56DB" }}>
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Need help selecting the right UV curing system?
          </h2>
          <p className="text-gray-300 mb-8">
            Our engineers are ready to help — from spot to area, lamp to LED, selection to validation.
          </p>
          <a href="mailto:guoren_wang@etia-tech.com?subject=Engineering%20Inquiry" className="px-8 py-3 rounded font-semibold text-white hover:opacity-90 transition-all" style={{ background: "#44B549" }}>
            Talk to ETIA Engineers →
          </a>
        </div>
      </section>
    </>
  );
}
