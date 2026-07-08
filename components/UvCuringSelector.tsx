import Link from "next/link";
import { FlaskConical, Scan, Gauge, Factory, Target, Layers3, Wind, Droplets, Zap, Sun, ArrowRight } from "lucide-react";

// Educational, application-driven UV curing system selector.
// Placed on the Applications page after the application notes, before the CTA.

const steps = [
  {
    n: "1",
    icon: FlaskConical,
    title: "Match the Material",
    label: "Adhesive · Ink · Coating · Potting · Marking",
    copy: "Start with the material formulation. UV adhesives, inks, and coatings cure only when the photoinitiator absorbs enough energy at the correct wavelength.",
    decide: [
      ["Known LED-curable material", "UV LED"],
      ["Unknown or broad-spectrum formulation", "UV Lamp / Microwave UV"],
    ] as [string, string][],
  },
  {
    n: "2",
    icon: Scan,
    title: "Define the Cure Area",
    label: "Spot · Line · Area · Wide Web",
    copy: "The required curing area determines the system format. A small adhesive dot needs a different light source than a large coating, printing, or web process.",
    decide: [
      ["Small adhesive point", "Spot Curing"],
      ["Small or medium surface", "Area Curing"],
      ["Large surface or web", "Large Area UV LED / Microwave UV"],
    ] as [string, string][],
  },
  {
    n: "3",
    icon: Gauge,
    title: "Check Intensity & Dose",
    label: "Power at surface · Exposure time · Process window",
    copy: "Peak irradiance is the UV power reaching the surface. Energy density, also called dose, is the total UV energy delivered over exposure time.",
    formula: "Dose = Intensity × Exposure Time",
    note: "Higher power alone does not always mean better curing. The right process window depends on wavelength, intensity, time, distance, and material response.",
  },
  {
    n: "4",
    icon: Factory,
    title: "Consider Production Environment",
    label: "Heat · Speed · Space · Cooling · Automation",
    copy: "The best UV curing system must fit the production line, not only the lab test. Consider heat sensitivity, available space, cooling method, duty cycle, and integration requirements.",
    decide: [
      ["Compact automation", "Air-cooled UV LED"],
      ["High-output continuous process", "Water-cooled UV LED"],
      ["Existing lamp process", "Lamp replacement or lamp-based curing"],
    ] as [string, string][],
  },
];

const recommendations = [
  { icon: Target, title: "Precision Spot Curing", products: "OmniCure S2000 Elite / LX500", best: "Medical device bonding, electronics assembly, optical bonding, small adhesive dots, and controlled spot curing.", accent: "#1A56DB", soft: "#EEF3FF", href: "/product/omnicure/s2000" },
  { icon: Layers3, title: "Small Area LED Curing", products: "OmniCure AC Series", best: "Small-area bonding, coatings, marking, automated assembly, and low-heat UV LED curing.", accent: "#0E9AA7", soft: "#E9F7F8", href: "/product/systems/ac8" },
  { icon: Wind, title: "Air-Cooled UV LED Curing", products: "Phoseon FireJet / FireEdge", best: "Printing, labels, packaging, container decoration, digital inkjet, and easy integration into production equipment.", accent: "#6BBF3A", soft: "#F1FBEC", href: "/product/phoseon" },
  { icon: Droplets, title: "Water-Cooled Large Area Curing", products: "Phoseon FireLine / Nexus II / VeriCure", best: "High-speed production, large curing area, wide-web processes, harsh environments, and high-output continuous operation.", accent: "#087F6B", soft: "#EAF6F3", href: "/product/systems/vericure" },
];

const quickGuide: [string, string][] = [
  ["Low heat on substrate", "UV LED"],
  ["Known LED-curable adhesive", "UV LED Spot or Area"],
  ["Unknown formulation", "Broad-spectrum UV Lamp"],
  ["Small adhesive dot", "Spot Curing"],
  ["Large surface or coating", "Area Curing"],
  ["High-speed web process", "Large Area UV LED / Microwave UV"],
  ["Compact machine integration", "Air-cooled UV LED"],
  ["High-output continuous line", "Water-cooled UV LED"],
  ["Existing lamp process", "Lamp system or replacement lamp"],
  ["Need process validation", "Talk to ETIA engineer"],
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
          <p className="mt-6 leading-7 text-[#5F6C7B]">A reliable UV curing process depends on more than selecting the highest power system. The right equipment should match the material chemistry, photoinitiator response, curing area, working distance, production speed, and integration environment.</p>
          <p className="mt-4 leading-7 text-[#5F6C7B]">For most applications, three parameters matter most: <span className="font-semibold text-[#102A43]">spectral output</span>, <span className="font-semibold text-[#102A43]">peak irradiance</span>, and <span className="font-semibold text-[#102A43]">energy density</span>. These determine whether the UV source can activate the formulation, deliver enough power at the cure surface, and provide the total dose required for full cure.</p>
        </div>
      </div>

      {/* 2 · Simplified spectrum visual */}
      <div className="mx-auto max-w-7xl px-4 pt-16 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-[#E6EAF0] bg-[#FAFBFC] p-6 sm:p-10">
          {/* spectrum bar */}
          <div className="relative">
            <div className="flex h-14 overflow-hidden rounded-full text-[11px] font-bold text-white shadow-inner">
              <div className="flex items-center justify-center" style={{ width: "20%", background: "#4C1D95" }}>UVC</div>
              <div className="flex items-center justify-center" style={{ width: "15%", background: "#6D28D9" }}>UVB</div>
              <div className="flex items-center justify-center" style={{ width: "35%", background: "linear-gradient(90deg,#4F46E5,#3B82F6)" }}>UVA</div>
              <div className="flex items-center justify-center" style={{ width: "30%", background: "linear-gradient(90deg,#22C55E,#84CC16)" }}>Visible</div>
            </div>
            {/* wavelength ticks */}
            <div className="mt-2 flex text-[11px] font-medium text-[#7B8794]">
              <div style={{ width: "20%" }}>200 nm</div>
              <div style={{ width: "15%" }}>280 nm</div>
              <div style={{ width: "35%" }}>315 nm</div>
              <div style={{ width: "30%" }} className="flex justify-between"><span>400 nm</span><span>400 nm+</span></div>
            </div>
            {/* UV LED marker — sits in the UVA band (365–405 nm) */}
            <div className="absolute -top-3 flex -translate-x-1/2 flex-col items-center" style={{ left: "52%" }}>
              <span className="rounded-full bg-[#1A56DB] px-2.5 py-0.5 text-[10px] font-bold text-white shadow">365 / 385 / 395 / 405 nm</span>
              <span className="mt-0.5 h-4 w-0.5 bg-[#1A56DB]" />
            </div>
          </div>

          {/* two path pills */}
          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            <div className="flex items-center gap-3 rounded-2xl border border-[#D9E4F5] bg-white px-4 py-3">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#EEF3FF] text-[#1A56DB]"><Zap className="h-5 w-5" /></span>
              <div><p className="text-sm font-bold text-[#1A56DB]">UV LED</p><p className="text-xs text-[#5F6C7B]">Single wavelength · 365 / 385 / 395 / 405 nm</p></div>
            </div>
            <div className="flex items-center gap-3 rounded-2xl border border-[#D6E7DF] bg-white px-4 py-3">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#EAF6F0] text-[#087F6B]"><Sun className="h-5 w-5" /></span>
              <div><p className="text-sm font-bold text-[#087F6B]">UV Lamp / Microwave UV</p><p className="text-xs text-[#5F6C7B]">Broad spectrum · 200–600 nm</p></div>
            </div>
          </div>

          {/* two explanatory cards */}
          <div className="mt-6 grid gap-5 md:grid-cols-2">
            <div className="rounded-2xl border-l-4 border border-[#E6EAF0] bg-white p-6" style={{ borderLeftColor: "#1A56DB" }}>
              <h3 className="text-lg font-bold text-[#1A56DB]">UV LED</h3>
              <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-[#7B8794]">Single wavelength · Efficient · Long life</p>
              <p className="mt-4 leading-7 text-[#5F6C7B]">Best when the material is LED-compatible and the process requires low heat, stable output, instant on/off, and long operating life.</p>
            </div>
            <div className="rounded-2xl border-l-4 border border-[#E6EAF0] bg-white p-6" style={{ borderLeftColor: "#087F6B" }}>
              <h3 className="text-lg font-bold text-[#087F6B]">UV Lamp / Broad Spectrum UV</h3>
              <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-[#7B8794]">Flexible wavelength coverage · Proven process</p>
              <p className="mt-4 leading-7 text-[#5F6C7B]">Best when the formulation requires broad-spectrum UV output, the material chemistry is older or unknown, or wider wavelength coverage is needed.</p>
            </div>
          </div>
        </div>
      </div>

      {/* 3 · Four-step selector */}
      <div className="mx-auto max-w-7xl px-4 pt-20 sm:px-6 lg:px-8">
        <div className="grid gap-5 md:grid-cols-2">
          {steps.map((s) => {
            const Icon = s.icon;
            return (
              <div key={s.n} className="rounded-3xl border border-[#E6EAF0] bg-[#FAFBFC] p-7 sm:p-8">
                <div className="flex items-center gap-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#1A56DB] text-white"><Icon className="h-5 w-5" strokeWidth={1.8} /></span>
                  <h3 className="text-xl font-bold text-[#102A43]">{s.n}. {s.title.replace(/^\d+\.\s*/, "")}</h3>
                </div>
                <p className="mt-4 text-[11px] font-bold uppercase tracking-wide text-[#1A56DB]">{s.label}</p>
                <p className="mt-3 leading-7 text-[#5F6C7B]">{s.copy}</p>
                {s.formula && (
                  <div className="mt-5 rounded-xl bg-[#102A43] px-4 py-3 text-center font-mono text-sm font-semibold text-white">{s.formula}</div>
                )}
                {s.note && <p className="mt-4 text-sm leading-6 text-[#7B8794]">{s.note}</p>}
                {s.decide && (
                  <div className="mt-5 space-y-2">
                    {s.decide.map(([cond, res]) => (
                      <div key={cond} className="flex items-center justify-between gap-3 rounded-xl border border-[#E6EAF0] bg-white px-4 py-2.5 text-sm">
                        <span className="text-[#5F6C7B]">{cond}</span>
                        <span className="flex items-center gap-1 font-semibold text-[#1A56DB]"><ArrowRight className="h-3.5 w-3.5" />{res}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* 4 · Recommended system direction */}
      <div className="mx-auto max-w-7xl px-4 pt-24 sm:px-6 lg:px-8">
        <p className="text-xs font-bold uppercase tracking-[.18em] text-[#44B549]">Recommendation</p>
        <h2 className="mt-3 text-3xl font-bold tracking-tight text-[#102A43] md:text-4xl">Recommended System Direction</h2>
        <p className="mt-3 max-w-3xl text-[#5F6C7B]">Use the application requirement to narrow the right technology family.</p>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {recommendations.map((r) => {
            const Icon = r.icon;
            return (
              <Link key={r.title} href={r.href} className="group flex flex-col rounded-3xl border border-[#E6EAF0] bg-white p-6 transition hover:-translate-y-1 hover:shadow-[0_18px_50px_rgba(15,36,68,.09)]" style={{ borderTopColor: r.accent, borderTopWidth: 3 }}>
                <span className="flex h-11 w-11 items-center justify-center rounded-2xl" style={{ background: r.soft, color: r.accent }}><Icon className="h-5 w-5" strokeWidth={1.8} /></span>
                <h3 className="mt-5 text-lg font-bold leading-snug text-[#102A43]">{r.title}</h3>
                <p className="mt-2 text-sm font-semibold" style={{ color: r.accent }}>{r.products}</p>
                <p className="mt-3 flex-1 text-sm leading-6 text-[#5F6C7B]">{r.best}</p>
                <span className="mt-5 inline-flex items-center gap-1 text-sm font-bold" style={{ color: r.accent }}>Explore <ArrowRight className="h-4 w-4" /></span>
              </Link>
            );
          })}
        </div>
      </div>

      {/* 5 · Quick selection guide */}
      <div className="mx-auto max-w-4xl px-4 pt-24 sm:px-6 lg:px-8">
        <p className="text-xs font-bold uppercase tracking-[.18em] text-[#44B549]">At a Glance</p>
        <h2 className="mt-3 text-3xl font-bold tracking-tight text-[#102A43] md:text-4xl">Quick Selection Guide</h2>
        <div className="mt-8 overflow-hidden rounded-2xl border border-[#E6EAF0]">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-[#F4F6F9] text-left text-[#102A43]">
                <th className="px-5 py-3 font-bold">Requirement</th>
                <th className="px-5 py-3 font-bold">Better Direction</th>
              </tr>
            </thead>
            <tbody>
              {quickGuide.map(([req, dir], i) => (
                <tr key={req} className={`border-t border-[#EDEFF3] ${i % 2 === 1 ? "bg-[#FAFBFC]" : "bg-white"}`}>
                  <td className="px-5 py-3 text-[#5F6C7B]">{req}</td>
                  <td className="px-5 py-3 font-semibold text-[#102A43]">{dir}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 6 · Final CTA */}
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
