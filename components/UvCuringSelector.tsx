import Link from "next/link";
import { Crosshair, Layers3, ScanLine, Lightbulb, Sun, Radio, ArrowRight } from "lucide-react";

// Educational, application-driven UV curing overview.
// Placed on the Applications page after the application notes, before the CTA.
// Full-spectrum view: the six UV curing technologies ETIA supplies, shown in a
// single row, followed by an at-a-glance selection guide and a final CTA.

const technologies = [
  {
    icon: Crosshair,
    name: "UV LED Spot Curing",
    spec: "365 / 385 / 395 / 405 nm",
    body: "Wavelength-specific spot curing for adhesive dots, precision bonding and automated assembly.",
    accent: "#1A56DB",
    soft: "#EEF3FF",
    href: "/product/omnicure",
  },
  {
    icon: Layers3,
    name: "UV LED Small-Area Curing",
    spec: "Air-cooled · Compact",
    body: "Small-area LED exposure for coatings, marking and low-heat curing in compact machines.",
    accent: "#2F80ED",
    soft: "#EEF6FF",
    href: "/product/systems",
  },
  {
    icon: ScanLine,
    name: "UV LED Large-Area Curing",
    spec: "Air / Water-cooled · Wide",
    body: "Uniform, high-output LED curing for wide-web, printing, coatings and continuous production.",
    accent: "#087F6B",
    soft: "#EAF6F3",
    href: "/product/phoseon",
  },
  {
    icon: Lightbulb,
    name: "UV Lamp Spot Curing",
    spec: "Broad spectrum · High intensity",
    body: "High-intensity broad-spectrum spot curing for demanding, established production processes.",
    accent: "#7A5AF8",
    soft: "#F1EEFF",
    href: "/product/omnicure/s2000",
  },
  {
    icon: Sun,
    name: "UV Lamp Flood / Area Curing",
    spec: "Broad spectrum · Flood",
    body: "Broad-spectrum flood curing for larger surfaces, potting, sealing and mixed formulations.",
    accent: "#0E9AA7",
    soft: "#E9F7F8",
    href: "/product/systems",
  },
  {
    icon: Radio,
    name: "Microwave UV Curing",
    spec: "Broad spectrum · High dose",
    body: "High-dose broad-spectrum curing for high-speed web, coatings and continuous line processes.",
    accent: "#6BBF3A",
    soft: "#F1FBEC",
    href: "/product/systems",
  },
];

export default function UvCuringSelector() {
  return (
    <section id="uv-curing-selector" className="bg-white">
      {/* 1 · Intro */}
      <div className="mx-auto max-w-7xl px-4 pt-24 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <p className="text-xs font-bold uppercase tracking-[.18em] text-[#44B549]">UV Curing System Selection</p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-[#102A43] md:text-5xl">How to Choose the Right UV Curing System</h2>
          <p className="mt-5 text-lg font-semibold text-[#1A56DB]">Start from your application, then match wavelength, intensity, cure area, and production needs.</p>
          <p className="mt-6 leading-7 text-[#5F6C7B]">ETIA covers the full spectrum of UV curing — from single-wavelength UV LED to broad-spectrum UV lamp and microwave UV. The right equipment should match the material chemistry, curing area, working distance, production speed, and integration environment.</p>
        </div>
      </div>

      {/* 2 · Full-spectrum: six UV curing technologies in one row */}
      <div className="mx-auto max-w-7xl px-4 pt-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {technologies.map((tech) => {
            const Icon = tech.icon;
            return (
              <Link
                key={tech.name}
                href={tech.href}
                className="group flex flex-col rounded-2xl border border-[#E6EAF0] bg-[#FAFBFC] p-5 transition hover:-translate-y-1 hover:border-[#D4DFEC] hover:bg-white hover:shadow-[0_16px_44px_rgba(15,36,68,.08)]"
                style={{ borderTopColor: tech.accent, borderTopWidth: 3 }}
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-2xl" style={{ background: tech.soft, color: tech.accent }}>
                  <Icon className="h-5 w-5" strokeWidth={1.8} />
                </span>
                <h3 className="mt-4 text-sm font-bold leading-snug text-[#102A43]">{tech.name}</h3>
                <p className="mt-1 text-[11px] font-semibold uppercase tracking-wide" style={{ color: tech.accent }}>{tech.spec}</p>
                <p className="mt-3 flex-1 text-xs leading-5 text-[#5F6C7B]">{tech.body}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-xs font-bold" style={{ color: tech.accent }}>Explore <ArrowRight className="h-3.5 w-3.5" /></span>
              </Link>
            );
          })}
        </div>
      </div>

      {/* 4 · Final CTA */}
      <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-[32px] bg-gradient-to-br from-[#143C96] to-[#1F63D6] px-6 py-14 text-center text-white sm:px-10">
          <h2 className="mx-auto max-w-2xl text-3xl font-bold md:text-4xl">Not sure which system fits your process?</h2>
          <p className="mx-auto mt-5 max-w-3xl leading-7 text-blue-100">ETIA helps evaluate your material, wavelength requirement, curing area, working distance, production speed, and integration environment — then recommends a UV curing system that fits your application.</p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link href="/contact" className="inline-flex items-center justify-center rounded-xl bg-[#44B549] px-7 py-3.5 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-[#3A9D3F]">Talk to an Engineer</Link>
            <Link href="/product/systems" className="inline-flex items-center justify-center rounded-xl border border-white/35 bg-white/10 px-7 py-3.5 text-sm font-bold text-white transition hover:border-white/70">View UV Curing Systems</Link>
          </div>
        </div>
      </div>
    </section>
  );
}
