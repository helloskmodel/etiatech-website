import Link from "next/link";
import Image from "next/image";
import {
  MonitorSmartphone,
  Smartphone,
  SlidersHorizontal,
  RefreshCw,
  Activity,
  Lightbulb,
  Nfc,
  Focus,
  FileText,
  Rocket,
  BookOpen,
  Power,
  Plug,
  CircleDot,
  Timer,
  Gauge,
  Lock,
  ArrowRight,
  Download,
  ShieldCheck,
  Layers,
  MapPin,
  Wrench,
} from "lucide-react";

// OmniCure S2000 Elite flagship landing page.
// Focused on buyers already searching for the S2000 Elite: features, user
// guides, setup, troubleshooting, lamp replacement, maintenance and ETIA
// support. Most H2/H3 headings carry the full "OmniCure S2000 Elite" keyword.
// Static server component + native <details> accordions = no client JS.

const PROMO = "https://etiatech-1303055923.cos.ap-singapore.myqcloud.com/IMAGE/PROMOTION";
const HERO_IMG = `${PROMO}/PROMOTION-OMNICURE%20S2000%20ELITE%20-INTRODUCTION.webp`;
const FEATURES_IMG = "https://etiatech-1303055923.cos.ap-singapore.myqcloud.com/IMAGE/product/S2000%208%20FEATUERS.png";

const DOCS = {
  brochure: "https://etiatech-1303055923.cos.ap-singapore.myqcloud.com/PDF/Brochure%20-%20OmniCure%20S2000%20Elite%20UV%20Curing%20System.pdf",
  quickStart: "https://etiatech-1303055923.cos.ap-singapore.myqcloud.com/PDF/Quick%20Start%20Guide%20-%20OmniCure%20S2000%20Elite%20UV%20Curing%20System.pdf",
  userGuide: "https://etiatech-1303055923.cos.ap-singapore.myqcloud.com/PDF/User%20Guide%20-%20OmniCure%20S2000%20Elite%20UV%20Curing%20System.pdf",
};

const CONTACT = "mailto:mark_tang@etia-tech.com?subject=OmniCure%20S2000%20Elite%20Inquiry";

const heroStats = [
  "Up to 30 / 37 W/cm² optical output",
  "Closed-Loop Feedback intensity control",
  "30 ms high-speed shutter",
  "Web UI · PLC · NFC · StepCure ready",
];

const features = [
  { icon: MonitorSmartphone, title: "OmniCure S2000 Elite Remote Control & Monitoring", body: "Remote control, management, and monitoring are available through the Web UI, allowing users to access system functions, curing profiles, system logs, and software updates from a connected device." },
  { icon: Smartphone, title: "OmniCure S2000 Elite Touchscreen User Interface", body: "The 4.3-inch LCD touchscreen provides intuitive access to system control, settings, exposure operation, and curing-related status information." },
  { icon: SlidersHorizontal, title: "OmniCure S2000 Elite StepCure PLC Control", body: "StepCure allows programmable curing sequences with PLC control, helping users manage validated production processes with repeatable exposure control." },
  { icon: RefreshCw, title: "OmniCure S2000 Elite Quick Configuration", body: "User-changeable lamp types and optical filters allow faster system configuration and reduced downtime during process changes." },
  { icon: Activity, title: "OmniCure S2000 Elite Closed-Loop Feedback CLF", body: "Closed-Loop Feedback monitors optical output and helps maintain repeatable irradiance during the curing process." },
  { icon: Lightbulb, title: "OmniCure S2000 Elite Intelli-Lamp Technology", body: "Intelli-Lamp technology tracks lamp parameters and supports lamp-life management, helping reduce unexpected downtime." },
  { icon: Nfc, title: "OmniCure S2000 Elite Intelli-Tap NFC Access Control", body: "Intelli-Tap NFC allows supervisor and administrator access control for locking, unlocking, and protecting process settings." },
  { icon: Focus, title: "OmniCure S2000 Elite Optical Performance", body: "The S2000 Elite maintains backward compatibility with the original S2000 process platform, including light guides, optical filters, radiometry accessories, and spectral output." },
];

const docCards = [
  { title: "OmniCure S2000 Elite Brochure", desc: "Product overview, key features, system compatibility, control functions, and performance benefits.", cta: "Download Brochure", href: DOCS.brochure },
  { title: "OmniCure S2000 Elite Quick Start Guide", desc: "Startup steps, light guide installation, exposure setup, lamp module installation, and optical filter installation.", cta: "Download Quick Start Guide", href: DOCS.quickStart },
  { title: "OmniCure S2000 Elite User Guide", desc: "Full operating manual covering safety, setup, calibration, Web UI, PLC integration, StepCure, maintenance, software updates, troubleshooting, and specifications.", cta: "Download User Guide", href: DOCS.userGuide },
];

const setupCards = [
  { icon: Power, title: "OmniCure S2000 Elite Startup", body: "Install the lamp module, install the optical filter, connect power, turn on the system, and allow proper warm-up before operation." },
  { icon: Plug, title: "OmniCure S2000 Elite Light Guide Installation", body: "Insert the light guide into the front light guide port until it clicks into place." },
  { icon: CircleDot, title: "OmniCure S2000 Elite Light Ring Status", body: "Use the light ring color to understand system status, including light guide detection, warm-up, Closed-Loop Feedback status, and calibration condition." },
  { icon: Timer, title: "OmniCure S2000 Elite Exposure Time Setting", body: "Set exposure time from the Run screen using the touchscreen or navigation controls." },
  { icon: Gauge, title: "OmniCure S2000 Elite Intensity Setting", body: "Set intensity from the touchscreen or navigation buttons. Calibration is required for W/cm² and W control." },
  { icon: Lock, title: "OmniCure S2000 Elite Lock and Unlock", body: "Use PIN or NFC access control to protect validated curing settings." },
];

const troubleshooting = [
  { q: "OmniCure S2000 Elite Light Guide Not Detected", a: "Check whether the light guide is fully inserted and properly seated in the light guide port. If the issue continues, contact ETIA technical support." },
  { q: "OmniCure S2000 Elite Lamp Does Not Strike", a: "Check lamp installation, filter installation, lamp housing panel, power connection, and system status. If the issue continues, contact ETIA technical support." },
  { q: "OmniCure S2000 Elite Closed-Loop Feedback Inactive", a: "Check calibration status, lamp condition, light guide connection, and filter configuration. If the issue continues, contact ETIA technical support." },
  { q: "OmniCure S2000 Elite Output Intensity Unstable", a: "Allow sufficient warm-up, verify calibration, inspect the light guide, and check lamp life status. If the issue continues, contact ETIA technical support." },
  { q: "OmniCure S2000 Elite Filter Not Recognized", a: "Check whether the optical filter cartridge is properly installed and fastened. If the filter is not properly installed, the system may not recognize it and the lamp may not strike." },
  { q: "OmniCure S2000 Elite System Locked", a: "Use the configured PIN, supervisor card, or administrator NFC card depending on the access control setup. If the issue continues, contact ETIA technical support." },
];

const supportCards = [
  { icon: Lightbulb, title: "OmniCure S2000 Elite Replacement Lamp Support", body: "Support for standard curing lamp and surface cure lamp selection.", href: "/product/omnicure/s2000-lamp", cta: "View S2000 lamps" },
  { icon: Layers, title: "OmniCure S2000 Elite Optical Filter Support", body: "Support for selecting and replacing optical band-pass filters." },
  { icon: Plug, title: "OmniCure S2000 Elite Light Guide Support", body: "Support for light guide selection, installation, cleaning, and replacement." },
  { icon: Gauge, title: "OmniCure S2000 Elite Calibration Support", body: "Support for R2000 radiometer calibration and repeatable irradiance control." },
  { icon: Wrench, title: "OmniCure S2000 Elite Maintenance & Repair Support", body: "Support for routine maintenance, troubleshooting, and repair coordination." },
];

const whyEtia = [
  { icon: ShieldCheck, title: "Genuine OmniCure Products", body: "Authorized supply of genuine OmniCure systems, lamps, filters and accessories." },
  { icon: Focus, title: "Application-Driven Selection", body: "Lamp, filter and light guide configuration matched to your curing process." },
  { icon: MapPin, title: "Local Supply & Fast Response", body: "Local stock and regional supply across China and Southeast Asia to reduce downtime." },
  { icon: Wrench, title: "Long-Term Service Support", body: "Installation training, calibration guidance, maintenance and repair for the long term." },
];

const faqs = [
  { q: "Where can I download the OmniCure S2000 Elite user guide?", a: "You can download the OmniCure S2000 Elite User Guide, Quick Start Guide and Brochure directly from the User Guides & Technical Resources section on this page, or request them from ETIA technical support." },
  { q: "How do I install the OmniCure S2000 Elite light guide?", a: "Insert the light guide into the front light guide port until it clicks into place. The light ring and system status confirm when the light guide is detected." },
  { q: "What do the OmniCure S2000 Elite light ring colors mean?", a: "The light ring color indicates system status such as light guide detection, warm-up, Closed-Loop Feedback status, and calibration condition. Full color definitions are in the OmniCure S2000 Elite User Guide." },
  { q: "Why does the OmniCure S2000 Elite lamp not strike?", a: "Check lamp installation, filter installation, the lamp housing panel, the power connection, and system status. If the optical filter is not properly installed the lamp may not strike. If the issue continues, contact ETIA technical support." },
  { q: "How do I replace the OmniCure S2000 Elite lamp?", a: "The S2000 Elite uses a user-changeable lamp module. ETIA can support standard and surface-cure lamp selection, installation guidance and genuine replacement lamps — see the OmniCure S2000 Elite Lamp Replacement & Maintenance Support section." },
  { q: "How do I install an OmniCure S2000 Elite optical filter?", a: "Install the optical filter cartridge into the filter slot and fasten it securely. If the filter is not properly installed, the system may not recognize it and the lamp may not strike." },
  { q: "Does the OmniCure S2000 Elite support PLC automation?", a: "Yes. StepCure provides programmable curing sequences with PLC control, and the system integrates into automated production lines via PLC I/O, Web UI and NFC access control." },
  { q: "Can ETIA provide OmniCure S2000 Elite troubleshooting support?", a: "Yes. ETIA provides OmniCure S2000 Elite troubleshooting, calibration guidance, maintenance and repair support across China, Thailand, Vietnam and Southeast Asia." },
];

export default function S2000View() {
  return (
    <div className="bg-white text-[#102038]">
      {/* 1 · Breadcrumb */}
      <nav aria-label="Breadcrumb" className="border-b border-[#E6EAF0] bg-white">
        <div className="mx-auto max-w-7xl px-4 py-3 text-xs text-[#5F6C7B] sm:px-6 lg:px-8">
          <Link href="/product" className="hover:text-[#143C96]">Products</Link>
          <span className="mx-2 text-[#B7C0CD]">›</span>
          <Link href="/product/omnicure" className="hover:text-[#143C96]">OmniCure</Link>
          <span className="mx-2 text-[#B7C0CD]">›</span>
          <span className="font-semibold text-[#143C96]">S2000 Elite</span>
        </div>
      </nav>

      {/* 2 · Hero */}
      <section className="relative overflow-hidden border-b border-[#E6EAF0] bg-white">
        <div className="absolute -right-36 -top-36 h-[34rem] w-[34rem] rounded-full bg-[#1F63D6]/8 blur-3xl" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 py-16 sm:px-6 md:py-20 lg:grid-cols-[1.05fr_.95fr] lg:px-8">
          <div>
            <p className="text-xs font-bold uppercase tracking-[.16em] text-[#41A62A]">OmniCure S Series · Lamp-Based UV Spot Curing</p>
            <h1 className="mt-4 text-4xl font-bold leading-[1.08] tracking-tight text-[#143C96] md:text-5xl">OmniCure S2000 Elite UV Spot Curing System</h1>
            <p className="mt-4 text-2xl font-bold text-[#41A62A] md:text-3xl">Maximum Power. Total Control.</p>
            <p className="mt-5 max-w-xl text-base leading-7 text-[#5F6C7B]">High-intensity lamp-based UV spot curing with Closed-Loop Feedback, precise shutter control, and advanced process monitoring for validated manufacturing.</p>
            <ul className="mt-7 grid gap-2.5 sm:grid-cols-2">
              {heroStats.map((s) => (
                <li key={s} className="flex items-start gap-2 text-sm font-semibold text-[#334E68]">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#41A62A]" />
                  {s}
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href={CONTACT} className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#143C96] px-6 py-3.5 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-[#1F63D6]">Request a Quote <ArrowRight className="h-4 w-4" /></a>
              <a href={DOCS.brochure} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#D4DFEC] bg-white px-6 py-3.5 text-sm font-bold text-[#143C96] transition hover:border-[#143C96]"><Download className="h-4 w-4" /> Download Brochure</a>
              <a href="#s2000-elite-support" className="inline-flex items-center justify-center rounded-xl border border-[#D4DFEC] bg-white px-6 py-3.5 text-sm font-bold text-[#143C96] transition hover:border-[#143C96]">Get Technical Support</a>
            </div>
          </div>
          <div className="relative min-h-[320px] rounded-[28px] border border-[#E6EAF0] bg-[#FAFBFC] shadow-[0_24px_80px_rgba(15,36,68,.10)] lg:min-h-[420px]">
            <Image src={HERO_IMG} alt="OmniCure S2000 Elite UV Spot Curing System with light guide" fill priority sizes="(max-width: 1024px) 100vw, 46vw" className="object-contain p-8" />
          </div>
        </div>
      </section>

      {/* 3 · Product Overview */}
      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold tracking-tight text-[#143C96] md:text-4xl">OmniCure S2000 Elite Product Overview</h2>
          <div className="mt-4 h-1 w-12 rounded bg-[#41A62A]" />
          <p className="mt-6 text-lg leading-8 text-[#5F6C7B]">The OmniCure S2000 Elite is a lamp-based UV spot curing system designed for demanding manufacturing processes that require stable optical output, repeatable dose control, fast exposure cycles, and reliable process monitoring. It is suitable for production environments where curing consistency, traceability, and uptime are critical.</p>
        </div>
      </section>

      {/* 4 · Key Features */}
      <section className="bg-[#F6F8FB] px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs font-bold uppercase tracking-[.18em] text-[#41A62A]">Key Features</p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-[#143C96] md:text-4xl">OmniCure S2000 Elite Key Features</h2>
          <div className="mt-8 overflow-hidden rounded-3xl border border-[#E6EAF0] bg-white p-4 sm:p-8">
            <div className="relative mx-auto aspect-[16/9] w-full max-w-4xl">
              <Image src={FEATURES_IMG} alt="OmniCure S2000 Elite UV Spot Curing System key features overview — Web UI, touchscreen, StepCure PLC control, Closed-Loop Feedback, Intelli-Lamp and Intelli-Tap NFC" fill sizes="(max-width: 1024px) 100vw, 60vw" className="object-contain" />
            </div>
          </div>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((f) => {
              const Icon = f.icon;
              return (
                <article key={f.title} className="flex flex-col rounded-2xl border border-[#E6EAF0] bg-white p-6">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#EEF6FF] text-[#143C96]"><Icon className="h-5 w-5" strokeWidth={1.8} /></span>
                  <h3 className="mt-4 text-base font-bold leading-snug text-[#143C96]">{f.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-[#5F6C7B]">{f.body}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5 · User Guides & Technical Resources */}
      <section id="s2000-elite-resources" className="scroll-mt-20 px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs font-bold uppercase tracking-[.18em] text-[#41A62A]">User Guides & Technical Resources</p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-[#143C96] md:text-4xl">OmniCure S2000 Elite User Guides &amp; Technical Resources</h2>
          <p className="mt-4 max-w-3xl leading-7 text-[#5F6C7B]">Find the documents and operating guidance you need for installation, setup, calibration, maintenance, and troubleshooting.</p>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {docCards.map((d, i) => {
              const Icon = i === 0 ? FileText : i === 1 ? Rocket : BookOpen;
              return (
                <article key={d.title} className="flex flex-col rounded-3xl border border-[#E6EAF0] bg-white p-7 transition hover:-translate-y-1 hover:shadow-[0_18px_50px_rgba(15,36,68,.09)]">
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#EEF6FF] text-[#143C96]"><Icon className="h-6 w-6" strokeWidth={1.7} /></span>
                  <h3 className="mt-5 text-lg font-bold leading-snug text-[#143C96]">{d.title}</h3>
                  <p className="mt-3 flex-1 text-sm leading-6 text-[#5F6C7B]">{d.desc}</p>
                  <a href={d.href} target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex items-center justify-center gap-2 rounded-xl bg-[#143C96] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#1F63D6]"><Download className="h-4 w-4" /> {d.cta}</a>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* 6 · Setup Guide */}
      <section className="bg-[#F6F8FB] px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs font-bold uppercase tracking-[.18em] text-[#41A62A]">Setup Guide</p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-[#143C96] md:text-4xl">OmniCure S2000 Elite Setup Guide</h2>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {setupCards.map((s, i) => {
              const Icon = s.icon;
              return (
                <article key={s.title} className="rounded-2xl border border-[#E6EAF0] bg-white p-6">
                  <div className="flex items-center gap-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#F1FAEF] text-[#41A62A]"><Icon className="h-5 w-5" strokeWidth={1.8} /></span>
                    <span className="text-xs font-bold text-[#B7C0CD]">Step {i + 1}</span>
                  </div>
                  <h3 className="mt-4 text-base font-bold leading-snug text-[#143C96]">{s.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-[#5F6C7B]">{s.body}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* 7 · Troubleshooting */}
      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <p className="text-xs font-bold uppercase tracking-[.18em] text-[#41A62A]">Troubleshooting</p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-[#143C96] md:text-4xl">OmniCure S2000 Elite Troubleshooting</h2>
          <div className="mt-8 divide-y divide-[#E6EAF0] overflow-hidden rounded-2xl border border-[#E6EAF0]">
            {troubleshooting.map((item) => (
              <details key={item.q} className="group bg-white open:bg-[#FAFBFC]">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-6 py-4 text-sm font-bold text-[#143C96] [&::-webkit-details-marker]:hidden">
                  {item.q}
                  <span className="shrink-0 text-lg text-[#41A62A] transition group-open:rotate-45">+</span>
                </summary>
                <p className="px-6 pb-5 text-sm leading-6 text-[#5F6C7B]">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* 8 · Lamp Replacement & Maintenance Support */}
      <section id="s2000-elite-support" className="scroll-mt-20 bg-[#F6F8FB] px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs font-bold uppercase tracking-[.18em] text-[#41A62A]">Lamp Replacement & Maintenance</p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-[#143C96] md:text-4xl">OmniCure S2000 Elite Lamp Replacement &amp; Maintenance Support</h2>
          <p className="mt-4 max-w-3xl leading-7 text-[#5F6C7B]">ETIA can support OmniCure S2000 Elite users with replacement lamps, optical filters, light guides, calibration guidance, maintenance, repair support, and troubleshooting.</p>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {supportCards.map((s) => {
              const Icon = s.icon;
              return (
                <article key={s.title} className="flex flex-col rounded-2xl border border-[#E6EAF0] bg-white p-6">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#EEF6FF] text-[#143C96]"><Icon className="h-5 w-5" strokeWidth={1.8} /></span>
                  <h3 className="mt-4 text-base font-bold leading-snug text-[#143C96]">{s.title}</h3>
                  <p className="mt-2 flex-1 text-sm leading-6 text-[#5F6C7B]">{s.body}</p>
                  {s.href && s.cta && (
                    <Link href={s.href} className="mt-4 inline-flex items-center gap-1 text-sm font-bold text-[#143C96] hover:underline">{s.cta} <ArrowRight className="h-4 w-4" /></Link>
                  )}
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* 9 · Why buy from ETIA */}
      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs font-bold uppercase tracking-[.18em] text-[#41A62A]">Why ETIA</p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-[#143C96] md:text-4xl">Why Buy OmniCure S2000 Elite from ETIA</h2>
          <p className="mt-4 max-w-3xl leading-7 text-[#5F6C7B]">ETIA supports manufacturers across China, Thailand, Vietnam, and Southeast Asia with genuine OmniCure products, application consultation, local supply, installation training, lamp replacement guidance, maintenance, repair support, and troubleshooting.</p>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {whyEtia.map((w) => {
              const Icon = w.icon;
              return (
                <article key={w.title} className="rounded-2xl border border-[#E6EAF0] bg-white p-6">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#F1FAEF] text-[#41A62A]"><Icon className="h-5 w-5" strokeWidth={1.8} /></span>
                  <h3 className="mt-4 font-bold text-[#143C96]">{w.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-[#5F6C7B]">{w.body}</p>
                </article>
              );
            })}
          </div>
          <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm font-semibold text-[#5F6C7B]">
            <Link href="/product/omnicure" className="inline-flex items-center gap-1 hover:text-[#143C96]">OmniCure brand page <ArrowRight className="h-4 w-4" /></Link>
            <Link href="/product/omnicure/s2000-lamp" className="inline-flex items-center gap-1 hover:text-[#143C96]">OmniCure S2000 lamp page <ArrowRight className="h-4 w-4" /></Link>
            <Link href="/contact" className="inline-flex items-center gap-1 hover:text-[#143C96]">Sales &amp; Support <ArrowRight className="h-4 w-4" /></Link>
          </div>
        </div>
      </section>

      {/* 10 · FAQ */}
      <section className="bg-[#F6F8FB] px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <p className="text-xs font-bold uppercase tracking-[.18em] text-[#41A62A]">FAQ</p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-[#143C96] md:text-4xl">OmniCure S2000 Elite FAQ</h2>
          <div className="mt-8 divide-y divide-[#E6EAF0] overflow-hidden rounded-2xl border border-[#E6EAF0]">
            {faqs.map((f) => (
              <details key={f.q} className="group bg-white open:bg-[#FCFDFE]">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-6 py-4 text-sm font-bold text-[#143C96] [&::-webkit-details-marker]:hidden">
                  {f.q}
                  <span className="shrink-0 text-lg text-[#41A62A] transition group-open:rotate-45">+</span>
                </summary>
                <p className="px-6 pb-5 text-sm leading-6 text-[#5F6C7B]">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* 11 · Final CTA */}
      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="overflow-hidden rounded-[32px] bg-gradient-to-br from-[#143C96] to-[#1F63D6] px-6 py-14 text-center text-white sm:px-10">
            <h2 className="mx-auto max-w-3xl text-3xl font-bold md:text-4xl">Need Help with OmniCure S2000 Elite Selection, Setup, or Troubleshooting?</h2>
            <p className="mx-auto mt-5 max-w-3xl leading-7 text-blue-100">ETIA engineers can help with OmniCure S2000 Elite product selection, lamp and filter configuration, light guide setup, calibration guidance, maintenance, repair support, and technical troubleshooting.</p>
            <div className="mt-8 flex flex-col flex-wrap justify-center gap-3 sm:flex-row">
              <a href={CONTACT} className="inline-flex items-center justify-center rounded-xl bg-[#41A62A] px-7 py-3.5 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-[#358B22]">Talk to an Engineer</a>
              <a href={CONTACT} className="inline-flex items-center justify-center rounded-xl bg-white/10 px-7 py-3.5 text-sm font-bold text-white ring-1 ring-white/35 transition hover:ring-white/70">Request a Quote</a>
              <a href={DOCS.userGuide} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/35 px-7 py-3.5 text-sm font-bold text-white transition hover:border-white/70"><Download className="h-4 w-4" /> Download OmniCure S2000 Elite User Guide</a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
