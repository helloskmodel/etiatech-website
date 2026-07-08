import Image from "next/image";
import { ClipboardCheck, Settings2, LifeBuoy } from "lucide-react";

const IMG = "https://etiatech-1303055923.cos.ap-singapore.myqcloud.com/IMAGE/logo";

const serviceCards = [
  { title: "Genuine Products", img: `${IMG}/etiaservice-geniue%20product.png` },
  { title: "Application-Driven Solution", img: `${IMG}/etiaservice-application-drive%20solution.png` },
  { title: "Local Supply Chain", img: `${IMG}/etiaservice-local%20supply%20chain.png` },
  { title: "Long-Term Service", img: `${IMG}/etiaservice-long%20term%20service.png` },
];

const lifecycle = [
  {
    icon: ClipboardCheck,
    phase: "Before Purchase",
    title: "Selection & Application Review",
    lead: "We help customers choose the right UV curing system before purchase.",
    points: ["Application discussion", "UV curing requirement review", "Adhesive and material consideration", "Working distance and exposure area review", "Product and accessory recommendation", "OmniCure®, Phoseon, UV spot curing, UV LED, and area curing selection support"],
    accent: "#1A56DB",
  },
  {
    icon: Settings2,
    phase: "During Implementation",
    title: "Setup & Training",
    lead: "We support the transition from equipment delivery to production use.",
    points: ["Installation guidance", "System setup support", "Operator training", "Light guide and accessory setup", "Process discussion", "Safety and maintenance reminders"],
    accent: "#0E9AA7",
  },
  {
    icon: LifeBuoy,
    phase: "After Sales",
    title: "Service & Reliability",
    lead: "We stay with customers after the system is installed.",
    points: ["Online technical service", "Onsite troubleshooting", "Maintenance guidance", "Repair support", "Spare parts and consumables coordination", "Long-term technical communication"],
    accent: "#087F6B",
  },
];

const supported = [
  "Medical device bonding", "Catheter bonding", "PCB and electronics assembly", "Automotive electronics",
  "CPO / photonics packaging", "Optical bonding", "Adhesive curing", "Component assembly", "Precision manufacturing",
];

export default function SalesSupportContent() {
  return (
    <>
      {/* ETIA Service Commitment */}
      <section className="bg-white py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-bold uppercase tracking-[.18em] text-[#44B549]">ETIA Service Commitment</p>
          <h2 className="mt-3 max-w-3xl text-3xl font-bold tracking-tight text-[#102A43] md:text-4xl">Service means more than supplying equipment</h2>
          <div className="mt-5 grid max-w-4xl gap-4 text-[#5F6C7B]">
            <p className="leading-7">At ETIA, service means more than supplying equipment. We support UV curing customers with <span className="font-semibold text-[#102A43]">genuine products</span>, <span className="font-semibold text-[#102A43]">application-driven solutions</span>, a <span className="font-semibold text-[#102A43]">dependable local supply chain</span>, and <span className="font-semibold text-[#102A43]">long-term service</span>.</p>
            <p className="leading-7">From product selection and application review to local stock support, online technical service, onsite troubleshooting, maintenance, and repair support, ETIA helps manufacturers build reliable UV curing processes for medical devices, electronics, automotive, PCB, CPO, optics, and precision assembly.</p>
          </div>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {serviceCards.map((c) => (
              <div key={c.title} className="flex flex-col items-center rounded-3xl border border-[#E6EAF0] bg-[#FAFBFC] p-6 text-center">
                <div className="relative h-24 w-24">
                  <Image src={c.img} alt={c.title} fill sizes="96px" className="object-contain" />
                </div>
                <h3 className="mt-4 font-bold text-[#102A43]">{c.title}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Support Across the Full Equipment Lifecycle */}
      <section className="bg-[#F6F8FB] py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-bold uppercase tracking-[.18em] text-[#44B549]">Full Lifecycle</p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-[#102A43] md:text-4xl">Support Across the Full Equipment Lifecycle</h2>
          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {lifecycle.map((phase) => {
              const Icon = phase.icon;
              return (
                <div key={phase.phase} className="flex flex-col rounded-3xl border border-[#E6EAF0] bg-white p-7" style={{ borderTopColor: phase.accent, borderTopWidth: 3 }}>
                  <span className="flex h-11 w-11 items-center justify-center rounded-2xl text-white" style={{ background: phase.accent }}><Icon className="h-5 w-5" strokeWidth={1.8} /></span>
                  <p className="mt-5 text-xs font-bold uppercase tracking-wide" style={{ color: phase.accent }}>{phase.phase}</p>
                  <h3 className="mt-1 text-xl font-bold text-[#102A43]">{phase.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-[#5F6C7B]">{phase.lead}</p>
                  <ul className="mt-5 space-y-2.5">
                    {phase.points.map((pt) => (
                      <li key={pt} className="flex items-start gap-2.5 text-sm leading-6 text-[#334E68]">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: phase.accent }} />
                        {pt}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* What We Support */}
      <section className="bg-white py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-bold uppercase tracking-[.18em] text-[#44B549]">What We Support</p>
          <h2 className="mt-3 max-w-3xl text-3xl font-bold tracking-tight text-[#102A43] md:text-4xl">Applications across industrial and life science</h2>
          <p className="mt-4 max-w-3xl leading-7 text-[#5F6C7B]">ETIA supports UV curing customers across a wide range of industrial and life science applications.</p>
          <div className="mt-8 flex flex-wrap gap-2.5">
            {supported.map((a) => (
              <span key={a} className="rounded-full border border-[#1A56DB]/20 bg-[#1A56DB]/[.06] px-4 py-2 text-sm font-semibold text-[#1A56DB]">{a}</span>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
