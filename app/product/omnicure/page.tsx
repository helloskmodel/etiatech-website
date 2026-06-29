import Link from "next/link";

const benefits = [
  { icon: "⚡", title: "Faster Production", desc: "Cure in seconds, not hours. Eliminate thermal oven bottlenecks and run inline at full line speed." },
  { icon: "🎯", title: "Improved Quality", desc: "Repeatable, validated UV dose every cycle — fewer rejects, less rework, lower warranty cost." },
  { icon: "💰", title: "Reduced Cost", desc: "Up to 80% reduction in processing cost. No VOC disposal, no warm-up time. LEDs use a fraction of the power." },
  { icon: "🔒", title: "Total Control", desc: "Closed-loop feedback, NFC access lock, and I4.0 data logging — full traceability for GMP and ISO audits." },
];

const productFamilies = [
  {
    category: "UV SPOT CURING SYSTEMS",
    families: [
      { type: "S SERIES · LAMP-BASED · 200W HG", name: "UV Lamp Spot\nCuring Systems", models: ["S2000 Elite", "S1500 Pro", "R2000 Radiometer", "S2E Network Module", "S Series Light Guide"], bg: "#1A56DB" },
      { type: "LX SERIES · LED BASED · SINGLE WAVELENGTH", name: "UV LED Spot\nCuring Systems", models: ["LX500 V2", "LS200 Radiometer", "UV LED Heads (V3)"], bg: "#44B549" },
    ],
  },
  {
    category: "UV AREA CURING SYSTEMS",
    families: [
      { type: "AC LARGE · AIR-COOLED LED · >75MM WIDTH", name: "Air-Cooled UV LED\nLarge-Area Curing", models: ["ACT", "AC8", "AC8-HD", "ACN225-F", "AC UVC LED – 275nm"], bg: "#1A56DB" },
      { type: "AC SMALL · AIR-COOLED LED · UP TO 240MM", name: "Air-Cooled UV LED\nSmall-Area Curing", models: ["AC2", "AC6", "AC5"], bg: "#44B549" },
    ],
  },
];

const uvCuringBenefits = [
  { icon: "⚡", title: "Speed", desc: "UV curing converts liquid formulations to solid materials in seconds — eliminating thermal ovens, long cure queues, and handling delays." },
  { icon: "🌿", title: "Clean & Safe", desc: "UV curable materials are 100% solid with no solvents — zero VOC emissions, no hazardous waste disposal, and no fumes in the clean room." },
  { icon: "🔬", title: "Precision", desc: "Spectral output, peak irradiance, and energy dose precisely determine the physical properties of the cured material. The right equipment controls all three." },
];

export default function OmniCurePage() {
  return (
    <>
      {/* Breadcrumb */}
      <div className="border-b border-gray-200 py-3 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-xs text-gray-400">
          <Link href="/product" className="hover:text-[#1A56DB]">Products</Link>
          <span className="mx-2">›</span>
          <span style={{ color: "#1A56DB" }}>OmniCure®</span>
        </div>
      </div>

      {/* Hero — dark */}
      <section className="py-20 relative overflow-hidden" style={{ background: "linear-gradient(135deg, #0a1628 0%, #0f2444 100%)" }}>
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "radial-gradient(circle at 70% 50%, #1A56DB 0%, transparent 60%)" }} />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: "#44B549" }}>
            OmniCure® UV Curing Systems · Authorized Distributor
          </p>
          <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight mb-6">
            Precision Cures.<br /><span style={{ color: "#44B549" }}>Supreme Control.</span>
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl mb-10 leading-relaxed">
            Advanced UV curing systems for modern manufacturing and assembly — validated processes, zero compromise.
          </p>
          <div className="flex flex-wrap gap-4 mb-16">
            <a href="#products" className="px-6 py-3 rounded font-semibold text-white hover:opacity-90" style={{ background: "#1A56DB" }}>Explore Products ↓</a>
            <Link href="/contact" className="px-6 py-3 rounded font-semibold text-white border border-white/30 hover:border-white/60 transition-all">Talk to Engineers</Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { val: "±5%", label: "Irradiance Stability", sub: "Closed-Loop Feedback" },
              { val: "50,000h", label: "LED Lifespan", sub: "Production-proven" },
              { val: "30 ms", label: "Precision Shutter", sub: "Exact dose every time" },
              { val: "I 4.0", label: "Industry 4.0 Ready", sub: "PLC · Ethernet · NFC" },
            ].map((s) => (
              <div key={s.label} className="rounded-lg p-4 border border-white/10" style={{ background: "rgba(255,255,255,0.05)" }}>
                <p className="text-2xl font-bold" style={{ color: "#44B549" }}>{s.val}</p>
                <p className="text-sm text-white font-medium">{s.label}</p>
                <p className="text-xs text-gray-400">{s.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why OmniCure — light */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-semibold tracking-widest uppercase mb-2" style={{ color: "#44B549" }}>Why OmniCure</p>
          <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: "#1A56DB" }}>What OmniCure Delivers for You</h2>
          <p className="text-gray-500 max-w-2xl mb-10">OmniCure UV curing systems give manufacturers measurable, real-world results — from the first cure to the millionth.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {benefits.map((b) => (
              <div key={b.title} className="rounded-xl p-5 border border-gray-100 hover:border-[#1A56DB]/30 hover:shadow-md transition-all bg-gray-50">
                <div className="text-2xl mb-3">{b.icon}</div>
                <h3 className="font-semibold uppercase text-sm mb-2" style={{ color: "#1A56DB" }}>{b.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Product Range — light gray */}
      <section id="products" className="py-20" style={{ background: "#f0f4f8" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-semibold tracking-widest uppercase mb-2" style={{ color: "#44B549" }}>OmniCure Product Range</p>
          <h2 className="text-3xl md:text-4xl font-bold mb-2" style={{ color: "#1A56DB" }}>2 Technology Routes.<br />4 Product Families.</h2>
          <div className="w-12 h-1 rounded mb-10" style={{ background: "#44B549" }} />
          {productFamilies.map((group) => (
            <div key={group.category} className="mb-8">
              <span className="inline-block text-xs font-bold px-3 py-1 rounded mb-4 text-white" style={{ background: "#1A56DB" }}>{group.category}</span>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {group.families.map((fam) => (
                  <div key={fam.name} className="rounded-xl p-6 text-white" style={{ background: fam.bg }}>
                    <p className="text-xs opacity-70 mb-2 font-medium tracking-wider">{fam.type}</p>
                    <h3 className="text-xl font-bold mb-4 whitespace-pre-line">{fam.name}</h3>
                    <div className="flex flex-wrap gap-2">
                      {fam.models.map((m) => (
                        <span key={m} className="text-xs px-2 py-1 rounded bg-white/15 border border-white/20">{m}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
          <div className="mt-8 text-center text-sm text-gray-500">
            Not sure which system is right for you?{" "}
            <Link href="/contact" className="hover:underline font-medium" style={{ color: "#1A56DB" }}>Talk to ETIA Engineers →</Link>
          </div>
        </div>
      </section>

      {/* Why UV Curing — white */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-semibold tracking-widest uppercase mb-2" style={{ color: "#44B549" }}>UV Curing Technology</p>
          <h2 className="text-3xl font-bold mb-4" style={{ color: "#1A56DB" }}>Why UV Curing?</h2>
          <div className="w-10 h-1 rounded mb-8" style={{ background: "#44B549" }} />
          <p className="text-gray-500 max-w-2xl mb-10">UV curing is a photochemical process that converts liquid formulations — adhesives, coatings, inks — into fully solid materials instantly when exposed to high-intensity UV energy.</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {uvCuringBenefits.map((b) => (
              <div key={b.title} className="rounded-xl p-6 border border-gray-100 bg-gray-50">
                <div className="text-3xl mb-3">{b.icon}</div>
                <h3 className="font-semibold mb-2" style={{ color: "#1A56DB" }}>{b.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA — dark */}
      <section className="py-16" style={{ background: "#0a1628" }}>
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Need help selecting the right system?</h2>
          <p className="text-gray-300 mb-8">Our UV curing engineers are ready to help you find the best solution for your process — from spot to area, lamp to LED.</p>
          <Link href="/contact" className="px-8 py-3 rounded font-semibold text-white hover:opacity-90" style={{ background: "#44B549" }}>Talk to ETIA Engineers →</Link>
        </div>
      </section>
    </>
  );
}
