import Link from "next/link";
import Image from "next/image";

const PROMO = "https://etiatech-1303055923.cos.ap-singapore.myqcloud.com/IMAGE/PROMOTION";
const VIDEO = "https://etiatech-1303055923.cos.ap-singapore.myqcloud.com/VIDEO/OMNICURE%202000%20ENLIGH%20VERSION%20.mp4";

const img = {
  intro: `${PROMO}/PROMOTION-OMNICURE%20S2000%20ELITE%20-INTRODUCTION.webp`,
  lcd: `${PROMO}/PRODMOTION-OMNICURE%20S2000%20ELITE%20-LCD%20SCREEN%20AND%20TOUCH%20SCREEN%20UI.webp`,
  lamp: `${PROMO}/PROMOTION-%20OMNICURE%20S2000%20ELITE%20-LAMP.webp`,
  loop: `${PROMO}/PROMOTION-OMNICURE%202000%20ELITE-LOOP%20FEEDBACK.webp`,
  remote: `${PROMO}/PROMOTION-OMNICURE%202000%20ELITE-REMOTE%20CONTROL.webp`,
  calibration: `${PROMO}/PROMOTION-OMNICURE%20S2000%20ELITE%20-CALIBRATION%20AND%20RADIOMETRY.webp`,
  stepcure: `${PROMO}/PROMOTION-OMNICURE-2000%20ELITE%20-STEPCURE%202.0%20WITH%20PLC%20CONTROL.webp`,
};

const heroStats = [
  { val: "30 W/cm²", label: "Peak Irradiance" },
  { val: "±5%", label: "CLF Stability" },
  { val: "30 ms", label: "Shutter" },
  { val: "I 4.0", label: "PLC · NFC · Web UI" },
];

const benefits = [
  { icon: "⚡", title: "Highest Irradiance", desc: "Up to 30 W/cm² peak irradiance drives faster cure cycles and reliable bonding even with low-sensitivity adhesives." },
  { icon: "🎯", title: "Repeatable Process", desc: "Closed-Loop Feedback maintains ±5% irradiance stability across the lamp's entire service life — no recalibration between runs." },
  { icon: "⏱️", title: "Exact Dose", desc: "30 ms precision electromechanical shutter prevents over-cure and ensures validated dose delivery on every single exposure." },
  { icon: "💡", title: "Smart Lamp Management", desc: "Intelli-Lamp® tracks lamp hours and output trend, alerting you before intensity drops affect production quality." },
  { icon: "🔗", title: "Industry 4.0 Ready", desc: "PLC, Ethernet, NFC, and Web UI connect seamlessly into modern automated manufacturing lines — zero integration headaches." },
];

const features = [
  {
    no: "Feature 01",
    title: "Closed-Loop Feedback (CLF)",
    desc: "Real-time irradiance monitoring and automatic output compensation maintain set-point intensity within ±5% — even as the lamp ages. Eliminates the need for manual re-calibration and guarantees batch-to-batch process consistency required in validated manufacturing environments.",
    tags: ["±5% Stability", "Auto Compensation", "No Recalibration"],
    image: img.loop,
  },
  {
    no: "Feature 02",
    title: "30 ms Precision Shutter",
    desc: "The electromechanical shutter actuates in just 30 milliseconds, delivering precisely controlled UV energy doses. Critical for processes where over-exposure causes stress cracking, shrinkage, or delamination — such as optical bonding and catheter assembly.",
    tags: ["30 ms Actuation", "Zero Over-Cure", "Electromechanical"],
    image: img.calibration,
  },
  {
    no: "Feature 03",
    title: "StepCure® 2.0",
    desc: "Programme up to multiple intensity steps within a single cure cycle — ramp up, hold, ramp down — with full PLC synchronisation. Ideal for stress-sensitive assemblies, multi-component substrates, and processes requiring a tack-free surface cure followed by a deep bulk cure.",
    tags: ["Multi-Step Profiles", "PLC Sync", "Industry 4.0"],
    image: img.stepcure,
  },
  {
    no: "Feature 04",
    title: "Intelli-Lamp® Technology",
    desc: "Embedded lamp intelligence logs cumulative operating hours and tracks output degradation over time. The system alerts operators when lamp replacement is approaching — enabling planned maintenance rather than unplanned downtime. Lamp exchange data is automatically logged.",
    tags: ["Hour Tracking", "Output Monitoring", "Predictive Alert"],
    image: img.lamp,
  },
  {
    no: "Feature 05",
    title: "Intelli-Tap™ NFC + Web UI",
    desc: "Contactless NFC keycard technology locks cure parameters to prevent unauthorised modification. Each operator's access level is configurable. Combined with full Web UI remote monitoring from any browser — the S2000 Elite meets GMP and ISO process security requirements without friction.",
    tags: ["NFC Keycard", "Web UI", "GMP Compliant"],
    image: img.remote,
  },
];

const specs: { param: string; value: string; verify?: boolean }[] = [
  { param: "Peak Irradiance", value: "Up to 30 W/cm²" },
  { param: "Light Source", value: "200W Mercury (Hg) short-arc lamp, broad spectrum" },
  { param: "Spectral Output", value: "320–500 nm (UVA + visible)" },
  { param: "Shutter", value: "Electromechanical precision shutter, 30 ms actuation" },
  { param: "Irradiance Control", value: "Closed-Loop Feedback (CLF), ±5% stability" },
  { param: "Cure Modes", value: "Timer / Energy (dose) / StepCure® 2.0 multi-step" },
  { param: "Lamp Intelligence", value: "Intelli-Lamp® — hour tracking, output monitoring, replacement alert" },
  { param: "Access Control", value: "Intelli-Tap™ NFC keycard (configurable access levels)" },
  { param: "Connectivity", value: "Ethernet (TCP/IP), USB, RS-232, PLC I/O" },
  { param: "Remote Monitoring", value: "Web UI — browser-based, no software installation" },
  { param: "Display", value: '4.3" colour touchscreen LCD' },
  { param: "Light Guide", value: "All OmniCure S Series liquid light guides" },
  { param: "Radiometer", value: "OmniCure R2000 NIST-traceable radiometer" },
  { param: "Operating Voltage", value: "100–240V AC, 50/60 Hz", verify: true },
  { param: "Dimensions (W×D×H)", value: "Fill from official Datasheet", verify: true },
  { param: "Weight", value: "Fill from official Datasheet", verify: true },
  { param: "Certifications", value: "CE — verify additional (UL/CSA/RoHS)", verify: true },
];

const accessories = [
  { icon: "📏", title: "R2000 Radiometer", desc: "NIST-traceable UV radiometer — measures irradiance (W/cm²) and dose (mJ/cm²) at point of cure. Essential for process validation and regulatory compliance.", cta: "View R2000 Radiometer →" },
  { icon: "🔗", title: "S2E Network Module", desc: "Ethernet connectivity module for seamless integration with legacy automation systems. Enables remote monitoring and control without replacing existing PLC setups.", cta: "View S2E Module →" },
  { icon: "💡", title: "S Series Light Guides", desc: "Liquid light guides in various lengths and tip diameters — single branch and multi-branch configurations. Delivers UV energy precisely to the cure point.", cta: "View Light Guides →" },
  { icon: "🔭", title: "Collimating Adaptors", desc: "Extends working distance while maintaining irradiance uniformity. Ideal for applications requiring standoff clearance from sensitive components.", cta: "Enquire →" },
  { icon: "🎯", title: "Spot Size Adaptors", desc: "Adjusts the cure spot diameter to match bond line geometry. Available in multiple aperture sizes for precision spotting on small components.", cta: "Enquire →" },
];

const applications = [
  { icon: "🏥", title: "Medical Devices", desc: "Catheter tip bonding, needle assembly, sensor encapsulation, surgical instrument bonding — where validated, repeatable processes are regulatory requirements.", bg: "linear-gradient(135deg, #0d9488 0%, #0f766e 100%)" },
  { icon: "💻", title: "Electronics", desc: "PCB conformal coating cure, component bonding, display assembly, wire tacking — high throughput with precise dose control for every board.", bg: "linear-gradient(135deg, #1A56DB 0%, #1241a3 100%)" },
  { icon: "🔋", title: "EV Battery & Automotive", desc: "Battery tab bonding, cell assembly, sensor potting, connector sealing — demanding cure specs in high-volume EV production lines.", bg: "linear-gradient(135deg, #44B549 0%, #166534 100%)" },
];

export default function S2000ElitePage() {
  return (
    <>
      {/* Breadcrumb */}
      <div className="border-b border-gray-200 py-3 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-xs text-gray-400">
          <Link href="/product" className="hover:text-[#1A56DB]">Products</Link>
          <span className="mx-2">›</span>
          <Link href="/product/omnicure" className="hover:text-[#1A56DB]">OmniCure®</Link>
          <span className="mx-2">›</span>
          <span style={{ color: "#1A56DB" }}>S2000 Elite</span>
        </div>
      </div>

      {/* Hero — dark */}
      <section className="py-12 relative overflow-hidden" style={{ background: "linear-gradient(135deg, #0a1628 0%, #0f2444 100%)" }}>
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "radial-gradient(circle at 75% 40%, #1A56DB 0%, transparent 60%)" }} />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <p className="text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: "#44B549" }}>
              OmniCure® S Series · Lamp-Based UV Spot Curing
            </p>
            <h1 className="text-3xl md:text-4xl font-bold text-white leading-tight mb-2">S2000 Elite</h1>
            <p className="text-lg md:text-xl font-semibold mb-3" style={{ color: "#44B549" }}>Maximum Power. Total Control.</p>
            <p className="text-base text-gray-300 max-w-xl mb-6 leading-relaxed line-clamp-2">
              The industry&apos;s most advanced lamp-based UV spot curing system — up to 30 W/cm² with closed-loop precision for medical, electronics, and EV manufacturing.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
              {heroStats.map((s) => (
                <div key={s.label} className="rounded-lg p-3 border border-white/10" style={{ background: "rgba(255,255,255,0.05)" }}>
                  <p className="text-xl font-bold" style={{ color: "#44B549" }}>{s.val}</p>
                  <p className="text-xs text-gray-400 leading-tight mt-0.5">{s.label}</p>
                </div>
              ))}
            </div>
            <div className="flex flex-wrap gap-4">
              <Link href="/contact" className="px-6 py-3 rounded font-semibold text-white hover:opacity-90 transition-all" style={{ background: "#1A56DB" }}>Request a Quote</Link>
              <Link href="/contact" className="px-6 py-3 rounded font-semibold text-white border border-white/30 hover:border-white/60 transition-all">⬇ Download Datasheet</Link>
            </div>
          </div>
          <div className="rounded-2xl bg-white/95 relative" style={{ height: "340px" }}>
            <Image src={img.intro} alt="OmniCure S2000 Elite UV spot curing system" fill sizes="(max-width: 1024px) 100vw, 40vw" className="object-contain p-6" priority />
          </div>
        </div>
      </section>

      {/* Product Overview — white */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-xs font-semibold tracking-widest uppercase mb-2" style={{ color: "#44B549" }}>Product Overview</p>
            <h2 className="text-3xl md:text-4xl font-bold mb-6" style={{ color: "#1A56DB" }}>Built for Validated Manufacturing</h2>
            <div className="w-12 h-1 rounded mb-6" style={{ background: "#44B549" }} />
            <p className="text-gray-500 mb-5 leading-relaxed">
              The OmniCure S2000 Elite is the flagship lamp-based UV spot curing system, engineered for manufacturers who demand the highest irradiance output and uncompromising process control. Delivering up to 30 W/cm² through a 200W mercury short-arc lamp, the S2000 Elite produces broad-spectrum UV energy across 320–500 nm — covering virtually every photoinitiator chemistry in use today.
            </p>
            <p className="text-gray-500 leading-relaxed">
              Closed-Loop Feedback technology continuously monitors and adjusts output, maintaining irradiance within ±5% of set point throughout the lamp&apos;s lifetime. Combined with a 30 ms precision electromechanical shutter, the S2000 Elite ensures every exposure delivers an exact, repeatable UV dose — critical for validated medical device and electronics manufacturing processes.
            </p>
          </div>
          <div className="rounded-2xl border border-gray-100 bg-gray-50 relative" style={{ height: "440px" }}>
            <Image src={img.lcd} alt="OmniCure S2000 Elite LCD touchscreen interface" fill sizes="(max-width: 1024px) 100vw, 40vw" className="object-contain p-6" />
          </div>
        </div>
      </section>

      {/* Product Video — dark */}
      <section className="py-16" style={{ background: "#0a1628" }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-xs font-semibold tracking-widest uppercase mb-2" style={{ color: "#44B549" }}>Product Video</p>
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">See the S2000 Elite in Action</h2>
          <div className="rounded-2xl overflow-hidden shadow-xl border border-white/10">
            <video controls preload="metadata" poster={img.intro} className="w-full bg-black" style={{ aspectRatio: "16 / 9" }}>
              <source src={VIDEO} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      </section>

      {/* Key Benefits — light gray */}
      <section className="py-20" style={{ background: "#f0f4f8" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-semibold tracking-widest uppercase mb-2" style={{ color: "#44B549" }}>Key Benefits</p>
          <h2 className="text-3xl md:text-4xl font-bold mb-2" style={{ color: "#1A56DB" }}>Why the S2000 Elite?</h2>
          <div className="w-12 h-1 rounded mb-10" style={{ background: "#44B549" }} />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
            {benefits.map((b) => (
              <div key={b.title} className="rounded-xl p-5 border border-gray-100 bg-white hover:border-[#1A56DB]/30 hover:shadow-md transition-all">
                <div className="text-2xl mb-3">{b.icon}</div>
                <h3 className="font-semibold text-sm mb-2" style={{ color: "#1A56DB" }}>{b.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technology — white, alternating feature blocks */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-semibold tracking-widest uppercase mb-2" style={{ color: "#44B549" }}>Technology</p>
          <h2 className="text-3xl md:text-4xl font-bold mb-2" style={{ color: "#1A56DB" }}>5 Technologies That Set the S2000 Elite Apart</h2>
          <div className="w-12 h-1 rounded mb-12" style={{ background: "#44B549" }} />
          <div className="flex flex-col gap-12">
            {features.map((f, i) => (
              <div key={f.no} className="grid lg:grid-cols-2 gap-8 items-center">
                <div className={`rounded-2xl border border-gray-100 bg-gray-50 relative ${i % 2 === 1 ? "lg:order-2" : ""}`} style={{ height: "360px" }}>
                  <Image src={f.image} alt={f.title} fill sizes="(max-width: 1024px) 100vw, 40vw" className="object-contain p-6" />
                </div>
                <div className={i % 2 === 1 ? "lg:order-1" : ""}>
                  <span className="inline-block text-xs font-bold px-3 py-1 rounded mb-3 text-white" style={{ background: "#44B549" }}>{f.no}</span>
                  <h3 className="text-2xl font-bold mb-4" style={{ color: "#1A56DB" }}>{f.title}</h3>
                  <p className="text-gray-500 leading-relaxed mb-5">{f.desc}</p>
                  <div className="flex flex-wrap gap-2">
                    {f.tags.map((t) => (
                      <span key={t} className="text-xs font-medium px-3 py-1 rounded-full border" style={{ borderColor: "#1A56DB", color: "#1A56DB", background: "#1A56DB10" }}>{t}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Specifications — light gray */}
      <section className="py-20" style={{ background: "#f0f4f8" }}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-semibold tracking-widest uppercase mb-2" style={{ color: "#44B549" }}>Specifications</p>
          <h2 className="text-3xl md:text-4xl font-bold mb-2" style={{ color: "#1A56DB" }}>Technical Specifications · S2000 Elite</h2>
          <div className="w-12 h-1 rounded mb-6" style={{ background: "#44B549" }} />
          <p className="text-gray-500 mb-6 max-w-2xl">
            Full technical specifications. For complete dimensional drawings and installation data, download the official datasheet.
          </p>
          <Link href="/contact" className="inline-block px-5 py-2.5 rounded font-semibold text-white hover:opacity-90 transition-all mb-4" style={{ background: "#1A56DB" }}>
            📄 Download Datasheet (PDF)
          </Link>
          <p className="text-xs text-gray-400 mb-8">
            Note: Values marked ⚠ Verify should be confirmed against the official OmniCure datasheet before publishing.
          </p>
          <div className="rounded-2xl overflow-hidden border border-gray-200 bg-white">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-white" style={{ background: "#1A56DB" }}>
                  <th className="text-left font-semibold px-5 py-3 w-1/3">Parameter</th>
                  <th className="text-left font-semibold px-5 py-3">Specification</th>
                </tr>
              </thead>
              <tbody>
                {specs.map((s, i) => (
                  <tr key={s.param} className={i % 2 === 1 ? "bg-gray-50" : "bg-white"}>
                    <td className="px-5 py-3 font-medium text-gray-700 align-top">{s.param}</td>
                    <td className="px-5 py-3 text-gray-500">
                      {s.verify && <span className="font-semibold mr-1" style={{ color: "#d97706" }}>⚠ Verify</span>}
                      {s.value}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Accessories — white */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-semibold tracking-widest uppercase mb-2" style={{ color: "#44B549" }}>Accessories</p>
          <h2 className="text-3xl md:text-4xl font-bold mb-2" style={{ color: "#1A56DB" }}>Compatible Accessories</h2>
          <div className="w-12 h-1 rounded mb-4" style={{ background: "#44B549" }} />
          <p className="text-gray-500 max-w-2xl mb-10">Complete your S2000 Elite system with OmniCure-approved accessories for measurement, connectivity, and light delivery.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {accessories.map((a) => (
              <div key={a.title} className="rounded-xl p-6 border border-gray-100 bg-gray-50 hover:shadow-md hover:border-[#1A56DB]/30 transition-all flex flex-col">
                <div className="text-2xl mb-3">{a.icon}</div>
                <h3 className="font-semibold mb-2" style={{ color: "#1A56DB" }}>{a.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-4 flex-1">{a.desc}</p>
                <Link href="/contact" className="text-sm font-medium hover:underline" style={{ color: "#1A56DB" }}>{a.cta}</Link>
              </div>
            ))}
            <div className="rounded-xl p-6 border-2 border-dashed border-[#1A56DB]/30 bg-[#1A56DB]/5 flex flex-col">
              <div className="text-2xl mb-3">💬</div>
              <h3 className="font-semibold mb-2" style={{ color: "#1A56DB" }}>Not sure what you need?</h3>
              <p className="text-gray-500 text-sm leading-relaxed mb-4 flex-1">Our engineers will recommend the right accessories for your application, working distance, and light guide configuration.</p>
              <a href="mailto:support@etiatech.com?subject=Engineering%20Inquiry" className="text-sm font-medium hover:underline" style={{ color: "#1A56DB" }}>Talk to an Engineer →</a>
            </div>
          </div>
        </div>
      </section>

      {/* Applications — light gray */}
      <section className="py-20" style={{ background: "#f0f4f8" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-semibold tracking-widest uppercase mb-2" style={{ color: "#44B549" }}>Applications</p>
          <h2 className="text-3xl md:text-4xl font-bold mb-2" style={{ color: "#1A56DB" }}>Industries We Serve</h2>
          <div className="w-12 h-1 rounded mb-4" style={{ background: "#44B549" }} />
          <p className="text-gray-500 max-w-2xl mb-10">The S2000 Elite&apos;s combination of high irradiance, validated dose control, and Industry 4.0 connectivity makes it the system of choice across demanding manufacturing sectors.</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {applications.map((a) => (
              <div key={a.title} className="rounded-2xl overflow-hidden border border-gray-100 bg-white shadow-sm hover:shadow-md transition-all">
                <div className="h-40 flex items-center justify-center text-6xl" style={{ background: a.bg }}>{a.icon}</div>
                <div className="p-6">
                  <h3 className="font-bold text-lg mb-2" style={{ color: "#1A56DB" }}>{a.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{a.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA — dark */}
      <section className="py-16" style={{ background: "#0a1628" }}>
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Ready to specify the S2000 Elite?</h2>
          <p className="text-gray-300 mb-8">Our UV curing engineers will match irradiance, light guide, and dose control to your exact process — from selection to validation.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/contact" className="px-8 py-3 rounded font-semibold text-white hover:opacity-90 transition-all" style={{ background: "#44B549" }}>Request a Quote →</Link>
            <Link href="/product/omnicure" className="px-8 py-3 rounded font-semibold text-white border border-white/30 hover:border-white/60 transition-all">Back to OmniCure</Link>
          </div>
        </div>
      </section>
    </>
  );
}
