"use client";
import { useState } from "react";

function ContactForm({ type, fields }: { type: string; fields: string[] }) {
  const [submitted, setSubmitted] = useState(false);
  if (submitted) {
    return (
      <div className="rounded-2xl p-8 text-center border border-gray-100 bg-white">
        <div className="text-4xl mb-3">✅</div>
        <p className="font-semibold" style={{ color: "#1A56DB" }}>Message Sent!</p>
        <p className="text-gray-500 text-sm mt-1">We'll get back to you within 1 business day.</p>
      </div>
    );
  }
  return (
    <form
      className="flex flex-col gap-4"
      onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="text-xs text-gray-500 block mb-1">Name *</label>
          <input type="text" required placeholder="Your name"
            className="w-full px-3 py-2 rounded-lg border border-gray-200 bg-white text-gray-800 text-sm focus:outline-none focus:border-[#1A56DB] placeholder-gray-300" />
        </div>
        <div>
          <label className="text-xs text-gray-500 block mb-1">Company</label>
          <input type="text" placeholder="Company name"
            className="w-full px-3 py-2 rounded-lg border border-gray-200 bg-white text-gray-800 text-sm focus:outline-none focus:border-[#1A56DB] placeholder-gray-300" />
        </div>
      </div>
      <div>
        <label className="text-xs text-gray-500 block mb-1">Email *</label>
        <input type="email" required placeholder="your@email.com"
          className="w-full px-3 py-2 rounded-lg border border-gray-200 bg-white text-gray-800 text-sm focus:outline-none focus:border-[#1A56DB] placeholder-gray-300" />
      </div>
      {fields.map((f) => (
        <div key={f}>
          <label className="text-xs text-gray-500 block mb-1">{f}</label>
          <select className="w-full px-3 py-2 rounded-lg border border-gray-200 bg-white text-gray-600 text-sm focus:outline-none focus:border-[#1A56DB]">
            <option value="">Select…</option>
            {f === "Industry" && ["Medical Device", "Automotive", "Electronics", "Cable & Fiber", "Precision Optics", "UV Printing", "Wood Coatings", "Metal Coatings", "Aerospace", "Other"].map((o) => <option key={o}>{o}</option>)}
            {f === "Request Type" && ["Equipment Repair", "Radiometer Calibration", "Preventive Maintenance", "Spare Parts", "Other"].map((o) => <option key={o}>{o}</option>)}
          </select>
        </div>
      ))}
      <div>
        <label className="text-xs text-gray-500 block mb-1">Message *</label>
        <textarea required rows={4} placeholder="Describe your requirements…"
          className="w-full px-3 py-2 rounded-lg border border-gray-200 bg-white text-gray-800 text-sm focus:outline-none focus:border-[#1A56DB] placeholder-gray-300 resize-none" />
      </div>
      <button type="submit" className="w-full py-3 rounded-lg font-semibold text-white hover:opacity-90 transition-all" style={{ background: "#1A56DB" }}>
        Submit →
      </button>
    </form>
  );
}

export default function ContactPage() {
  return (
    <>
      {/* Hero */}
      <section className="py-20 relative overflow-hidden" style={{ background: "linear-gradient(135deg, #1241a3 0%, #1A56DB 100%)" }}>
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "radial-gradient(circle at 70% 50%, #1A56DB 0%, transparent 60%)" }} />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: "#44B549" }}>Sales & Support</p>
          <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-4">
            Expert Guidance.<br />
            <span style={{ color: "#44B549" }}>We&apos;re Here to Help.</span>
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-8">
            From product selection and process advice to custom solutions and equipment service, ETIA's team helps customers get the right answer and keep production moving.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {["Sales Inquiry", "Service & Repair", "Global Contacts"].map((label, i) => (
              <a key={label} href={["#sales", "#service", "#global"][i]}
                className="text-xs px-4 py-2 rounded-full border border-white/30 text-gray-300 hover:border-white/60 hover:text-white transition-all">
                {label}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Part 1 — Sales Inquiry */}
      <section id="sales" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Left: description */}
            <div>
              <p className="text-xs font-semibold tracking-widest uppercase mb-2" style={{ color: "#44B549" }}>Part 1</p>
              <h2 className="text-3xl font-bold mb-4" style={{ color: "#1A56DB" }}>Sales Inquiry</h2>
              <div className="w-10 h-1 rounded mb-6" style={{ background: "#44B549" }} />
              <p className="text-gray-500 mb-8 leading-relaxed">
                Looking for the right UV curing system? Our engineers will evaluate your application, recommend the best solution, and support you through the entire selection process.
              </p>
              <div className="flex flex-col gap-4">
                {[
                  { icon: "🔬", title: "Product Inquiry", desc: "Explore OmniCure, Phoseon, Fusion and NobleLight systems matched to your process." },
                  { icon: "⚗️", title: "Application Consulting", desc: "Validate your UV curing process — from adhesive selection to dose and irradiance testing." },
                  { icon: "🛠️", title: "Custom Engineering", desc: "Need a non-standard configuration? We engineer bespoke solutions for complex production lines." },
                ].map((item) => (
                  <div key={item.title} className="flex gap-4">
                    <div className="text-2xl mt-0.5">{item.icon}</div>
                    <div>
                      <p className="font-semibold text-sm mb-1" style={{ color: "#1A56DB" }}>{item.title}</p>
                      <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-8 p-4 rounded-xl border border-gray-100 bg-gray-50">
                <p className="text-xs text-gray-400 mb-1">Direct Email</p>
                <a href="mailto:support@etiatech.com" className="font-semibold hover:underline" style={{ color: "#44B549" }}>
                  support@etiatech.com
                </a>
              </div>
            </div>
            {/* Right: form */}
            <div className="rounded-2xl p-8 border border-gray-100 bg-gray-50">
              <h3 className="font-semibold text-lg mb-6" style={{ color: "#1A56DB" }}>Send a Sales Inquiry</h3>
              <ContactForm type="sales" fields={["Industry"]} />
            </div>
          </div>
        </div>
      </section>

      {/* Part 2 — Service & Repair */}
      <section id="service" className="py-20" style={{ background: "#f0f4f8" }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Left: description */}
            <div>
              <p className="text-xs font-semibold tracking-widest uppercase mb-2" style={{ color: "#44B549" }}>Part 2</p>
              <h2 className="text-3xl font-bold mb-4" style={{ color: "#1A56DB" }}>Service & Repair</h2>
              <div className="w-10 h-1 rounded mb-6" style={{ background: "#44B549" }} />
              <p className="text-gray-500 mb-8 leading-relaxed">
                Our in-house repair factory and certified technicians keep your UV curing equipment running at peak performance — minimizing downtime and maximizing production reliability.
              </p>
              <div className="flex flex-col gap-4">
                {[
                  { icon: "⚙️", title: "Equipment Repair", desc: "Fast diagnosis and repair of OmniCure, Phoseon, and all supported UV systems. Urgent production issues are prioritized." },
                  { icon: "📡", title: "Radiometer Calibration", desc: "NIST-traceable calibration for R2000, LS200 and third-party radiometers. Calibration certificate provided." },
                  { icon: "🔩", title: "Preventive Maintenance", desc: "Scheduled maintenance programs to extend equipment life and prevent unexpected failures on production lines." },
                ].map((item) => (
                  <div key={item.title} className="flex gap-4">
                    <div className="text-2xl mt-0.5">{item.icon}</div>
                    <div>
                      <p className="font-semibold text-sm mb-1" style={{ color: "#1A56DB" }}>{item.title}</p>
                      <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-8 p-4 rounded-xl border border-gray-100 bg-white">
                <p className="text-xs text-gray-400 mb-1">Service Email</p>
                <a href="mailto:support@etiatech.com" className="font-semibold hover:underline" style={{ color: "#44B549" }}>
                  support@etiatech.com
                </a>
              </div>
            </div>
            {/* Right: form */}
            <div className="rounded-2xl p-8 border border-gray-100 bg-white">
              <h3 className="font-semibold text-lg mb-6" style={{ color: "#1A56DB" }}>Submit a Service Request</h3>
              <ContactForm type="service" fields={["Request Type"]} />
            </div>
          </div>
        </div>
      </section>

      {/* Part 3 — Global Contacts */}
      <section id="global" className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-semibold tracking-widest uppercase mb-2" style={{ color: "#44B549" }}>Part 3</p>
          <h2 className="text-3xl font-bold mb-4" style={{ color: "#1A56DB" }}>Global Contacts</h2>
          <div className="w-10 h-1 rounded mb-10" style={{ background: "#44B549" }} />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {[
              { region: "China", flag: "🇨🇳", phone: "+86 10 0000 0000", email: "support@etiatech.com" },
              { region: "Hong Kong", flag: "🇭🇰", phone: "+852 0000 0000", email: "support@etiatech.com" },
              { region: "Thailand", flag: "🇹🇭", phone: "+66 2 000 0000", email: "support@etiatech.com" },
              { region: "Vietnam", flag: "🇻🇳", phone: "+84 28 0000 0000", email: "support@etiatech.com" },
            ].map((c) => (
              <div key={c.region} className="rounded-xl border border-gray-100 bg-gray-50 p-5 hover:shadow-md transition-all">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-2xl">{c.flag}</span>
                  <span className="font-bold" style={{ color: "#1A56DB" }}>{c.region}</span>
                </div>
                <p className="text-sm text-gray-600 mb-1">📞 {c.phone}</p>
                <a href={`mailto:${c.email}`} className="text-xs hover:underline" style={{ color: "#44B549" }}>{c.email}</a>
              </div>
            ))}
          </div>
          <p className="text-xs text-gray-400 mt-6">* Phone numbers to be confirmed. Contact us by email for immediate response.</p>
        </div>
      </section>

      {/* Bottom strip */}
      <section className="py-16" style={{ background: "#1A56DB" }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          {[
            { icon: "⚡", title: "Fast Response", desc: "Within 1 business day" },
            { icon: "🔧", title: "Expert Engineers", desc: "20 years of UV curing expertise" },
            { icon: "📦", title: "Local Stock", desc: "Ready for immediate delivery" },
          ].map((item) => (
            <div key={item.title}>
              <div className="text-3xl mb-2">{item.icon}</div>
              <p className="font-semibold text-white">{item.title}</p>
              <p className="text-gray-400 text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
