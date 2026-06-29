import Link from "next/link";

const whyEtia = [
  {
    icon: "🧠",
    title: "Deep Application Expertise",
    desc: "20 years of validated industry cases across 9 industries. From medical device bonding to EV battery encapsulation — we've proven the process so you don't have to.",
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

const techRoutes = [
  { name: "UV LED Spot Curing Systems", brands: ["OmniCure®"], desc: "Precision adhesive spot curing for electronics, medical devices, and opto-electronics." },
  { name: "UV LED Air-Cooled Systems", brands: ["Phoseon®", "OmniCure®"], desc: "Easy integration into automated systems without a separate chiller." },
  { name: "UV LED Water-Cooled Systems", brands: ["Phoseon®", "NobleLight®"], desc: "Designed for extreme temperature environments. Ideal for heat-sensitive substrates." },
  { name: "UV Lamp Spot Curing Systems", brands: ["OmniCure®"], desc: "Broad spectrum adhesive spot curing for a wide range of applications." },
  { name: "Microwave UV Curing Systems", brands: ["Fusion UV®"], desc: "Electrodeless bulbs for longer life, consistent output, and high-power broad spectrum." },
  { name: "Mercury Arc Lamps", brands: ["NobleLight®"], desc: "Broad spectrum replacement lamps for printing, wood coating, and UV curing processes." },
];

const industries = [
  { name: "Medical Device", icon: "🏥", count: 10 },
  { name: "Automotive", icon: "🚗", count: 7 },
  { name: "Electronics", icon: "💡", count: 8 },
  { name: "Cable & Fiber", icon: "🔌", count: 5 },
  { name: "Precision Optics", icon: "🔬", count: 3 },
  { name: "UV Printing", icon: "🖨️", count: 3 },
  { name: "Wood Coatings", icon: "🪵", count: 4 },
  { name: "Metal Coatings", icon: "⚙️", count: 3 },
  { name: "Aerospace", icon: "✈️", count: 3 },
];

export default function Home() {
  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden" style={{ background: "linear-gradient(135deg, #0a1628 0%, #0f2444 60%, #0a1628 100%)" }}>
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "radial-gradient(circle at 25% 50%, #3b82f6 0%, transparent 55%)" }} />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-36">
          <p className="text-xs font-semibold tracking-widest text-[#3b82f6] uppercase mb-4">
            Authorized Distributor · Genuine Products Guaranteed
          </p>
          <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight mb-6">
            Your UV Curing Partner —<br />
            <span className="text-[#3b82f6]">From Selection to Support.</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-2xl mb-10 leading-relaxed">
            ETIA combines 20 years of application expertise with local stock, in-house repair, and a professional team — so your line runs faster, smarter, and never stops.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/product"
              className="px-6 py-3 rounded font-semibold text-white transition-all hover:opacity-90"
              style={{ background: "#2563eb" }}
            >
              Explore Products →
            </Link>
            <Link
              href="/contact"
              className="px-6 py-3 rounded font-semibold text-white border border-white/30 hover:border-white/60 transition-all"
            >
              Talk to an Engineer
            </Link>
          </div>

          {/* Stats bar */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { val: "20+", label: "Years Experience" },
              { val: "9", label: "Industries Served" },
              { val: "51", label: "Application Workstations" },
              { val: "4", label: "World-Class Brands" },
            ].map((s) => (
              <div key={s.label} className="rounded-lg p-4 border border-white/10" style={{ background: "rgba(255,255,255,0.05)" }}>
                <p className="text-3xl font-bold text-[#3b82f6]">{s.val}</p>
                <p className="text-xs text-gray-400 mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY ETIA */}
      <section className="py-20" style={{ background: "#0d1f3c" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-semibold tracking-widest text-[#3b82f6] uppercase mb-2">Why ETIA</p>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            20 Years of UV Curing —<br />Built Into Every Sale, Every Visit, Every Fix.
          </h2>
          <p className="text-gray-400 max-w-2xl mb-12">
            Rooted in engineering excellence, ETIA partners with the world&apos;s leading UV curing brands to deliver solutions that are validated, reliable, and backed end-to-end.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyEtia.map((item) => (
              <div
                key={item.title}
                className="rounded-xl p-6 border border-white/10 hover:border-[#3b82f6]/40 transition-all"
                style={{ background: "rgba(255,255,255,0.04)" }}
              >
                <div className="text-3xl mb-4">{item.icon}</div>
                <h3 className="text-white font-semibold text-base mb-2">{item.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FULL SPECTRUM */}
      <section className="py-20" style={{ background: "#0a1628" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-semibold tracking-widest text-[#3b82f6] uppercase mb-2">UV Curing Technology</p>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">The Full Spectrum of UV Curing Solutions</h2>
          <p className="text-gray-400 mb-6">200–600 nm · 6 Technology Routes · 4 World-Class Brands</p>

          {/* Spectrum bar */}
          <div className="rounded-full h-3 mb-3 overflow-hidden" style={{ background: "linear-gradient(to right, #1e1b4b, #4c1d95, #1d4ed8, #0ea5e9, #22c55e, #eab308, #f59e0b)" }} />
          <div className="flex justify-between text-xs text-gray-500 mb-10">
            <span>VUV</span><span>UVC</span><span>UVB</span><span>UVA</span><span>Visible</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {techRoutes.map((t) => (
              <div
                key={t.name}
                className="rounded-xl p-5 border border-white/10 hover:border-[#3b82f6]/40 transition-all"
                style={{ background: "rgba(255,255,255,0.04)" }}
              >
                <h3 className="text-white font-semibold mb-2">{t.name}</h3>
                <p className="text-gray-400 text-sm mb-3 leading-relaxed">{t.desc}</p>
                <div className="flex flex-wrap gap-2">
                  {t.brands.map((b) => (
                    <span key={b} className="text-xs px-2 py-1 rounded-full border border-[#3b82f6]/40 text-[#3b82f6]">{b}</span>
                  ))}
                </div>
                <p className="text-xs text-gray-500 mt-3 italic">*Custom Engineering Solutions Available</p>
              </div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link
              href="/product"
              className="inline-flex items-center gap-2 px-6 py-3 rounded font-semibold text-white hover:opacity-90 transition-all"
              style={{ background: "#2563eb" }}
            >
              View All Products →
            </Link>
          </div>
        </div>
      </section>

      {/* APPLICATIONS PREVIEW */}
      <section className="py-20" style={{ background: "#0d1f3c" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-semibold tracking-widest text-[#3b82f6] uppercase mb-2">Applications</p>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">9 Industries · 51 Application Workstations</h2>
          <p className="text-gray-400 mb-10">
            Browse UV curing solutions validated across the most demanding manufacturing environments.
          </p>
          <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-9 gap-3">
            {industries.map((ind) => (
              <Link
                key={ind.name}
                href="/application"
                className="flex flex-col items-center gap-2 p-4 rounded-xl border border-white/10 hover:border-[#3b82f6]/50 hover:bg-white/5 transition-all group text-center"
              >
                <span className="text-3xl">{ind.icon}</span>
                <span className="text-xs text-gray-300 group-hover:text-white leading-tight">{ind.name}</span>
                <span className="text-xs text-[#3b82f6]">{ind.count} apps</span>
              </Link>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link
              href="/application"
              className="inline-flex items-center gap-2 px-6 py-3 rounded font-semibold border border-[#3b82f6] text-[#3b82f6] hover:bg-[#3b82f6] hover:text-white transition-all"
            >
              Explore All Applications →
            </Link>
          </div>
        </div>
      </section>

      {/* CTA BANNER */}
      <section className="py-16" style={{ background: "#1e3a5f" }}>
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Need help selecting the right UV curing system?
          </h2>
          <p className="text-gray-300 mb-8">
            Our engineers are ready to help — from spot to area, lamp to LED, selection to validation.
          </p>
          <Link
            href="/contact"
            className="px-8 py-3 rounded font-semibold text-white hover:opacity-90 transition-all"
            style={{ background: "#2563eb" }}
          >
            Talk to ETIA Engineers →
          </Link>
        </div>
      </section>
    </>
  );
}
