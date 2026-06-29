"use client";
import { useState } from "react";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <>
      {/* Hero */}
      <section className="py-20 relative overflow-hidden" style={{ background: "linear-gradient(135deg, #0a1628 0%, #0f2444 100%)" }}>
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "radial-gradient(circle at 70% 50%, #1B3D8F 0%, transparent 60%)" }} />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: "#44B549" }}>Sales & Support</p>
          <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-4">Talk to an Engineer</h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Tell us about your application — our UV curing engineers will help you find the right solution.
          </p>
        </div>
      </section>

      {/* Get in Touch — 3 cards */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-xs font-semibold tracking-widest uppercase mb-2" style={{ color: "#44B549" }}>Get in Touch</p>
          <h2 className="text-center text-2xl font-bold mb-10" style={{ color: "#1B3D8F" }}>How can we help you?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: "✉️",
                title: "Email Us",
                desc: "Send us a message and we'll respond within 1 business day.",
                action: "support@etiatech.com",
                href: "mailto:support@etiatech.com",
                cta: "Send Email →",
              },
              {
                icon: "💬",
                title: "Fill Out a Form",
                desc: "Describe your application and we'll match the right solution.",
                action: null,
                href: "#form",
                cta: "Go to Form ↓",
              },
              {
                icon: "🔧",
                title: "Equipment Support",
                desc: "Repair, calibration, or urgent production issue? We prioritize fast response.",
                action: null,
                href: "#form",
                cta: "Request Service ↓",
              },
            ].map((card) => (
              <div key={card.title} className="rounded-2xl border border-gray-100 bg-gray-50 p-6 flex flex-col hover:shadow-md transition-all">
                <div className="text-4xl mb-4">{card.icon}</div>
                <h3 className="font-bold text-lg mb-2" style={{ color: "#1B3D8F" }}>{card.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-4 flex-1">{card.desc}</p>
                <a
                  href={card.href}
                  className="inline-block text-sm font-semibold hover:underline"
                  style={{ color: "#44B549" }}
                >
                  {card.cta}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What are you looking for? */}
      <section className="py-16" style={{ background: "#f0f4f8" }}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center mb-10">
            <div>
              <p className="text-xs font-semibold tracking-widest uppercase mb-2" style={{ color: "#44B549" }}>Services</p>
              <h2 className="text-2xl font-bold mb-3" style={{ color: "#1B3D8F" }}>What are you looking for?</h2>
              <p className="text-gray-500 text-sm leading-relaxed">
                Tell us your need and we'll connect you with the right team for the fastest response.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              {
                icon: "⚙️",
                title: "Equipment Service & Repair",
                desc: "Keep your UV curing equipment in optimal condition with our in-house repair service. We'll contact you upon receipt of your request.",
              },
              {
                icon: "📡",
                title: "Radiometer Calibration",
                desc: "Regular radiometer calibration ensures your irradiance readings remain accurate and your process stays validated.",
              },
              {
                icon: "💼",
                title: "Process Consulting",
                desc: "From application selection to full process validation — our engineers are your partners at every stage.",
              },
              {
                icon: "📦",
                title: "Spare Parts & Consumables",
                desc: "Light guides, UV LED heads, replacement lamps and accessories. Local stock for immediate delivery.",
              },
              {
                icon: "🎓",
                title: "Training & Application Support",
                desc: "Hands-on technical training and application support to maximize your process performance.",
              },
              {
                icon: "🔍",
                title: "Product Selection",
                desc: "Not sure which system is right for your application? Our engineers will evaluate and recommend the best match.",
              },
            ].map((item) => (
              <div key={item.title} className="rounded-xl bg-white border border-gray-100 p-5 hover:shadow-md transition-all">
                <div className="text-2xl mb-3">{item.icon}</div>
                <h3 className="font-semibold mb-2 text-sm" style={{ color: "#1B3D8F" }}>{item.title}</h3>
                <p className="text-gray-500 text-xs leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section id="form" className="py-16 bg-white">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-semibold tracking-widest uppercase mb-2" style={{ color: "#44B549" }}>Contact Form</p>
          <h2 className="text-2xl font-bold mb-8" style={{ color: "#1B3D8F" }}>Send Us a Message</h2>
          {submitted ? (
            <div className="rounded-2xl p-10 text-center border border-gray-100 bg-gray-50">
              <div className="text-5xl mb-4">✅</div>
              <h3 className="font-bold text-lg mb-2" style={{ color: "#1B3D8F" }}>Message Sent!</h3>
              <p className="text-gray-500 text-sm">We'll get back to you within 1 business day.</p>
            </div>
          ) : (
            <div className="rounded-2xl p-8 border border-gray-100 bg-gray-50">
              <form
                className="flex flex-col gap-4"
                onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs text-gray-500 block mb-1">Name *</label>
                    <input
                      type="text"
                      required
                      className="w-full px-3 py-2 rounded-lg border border-gray-200 bg-white text-gray-800 text-sm focus:outline-none focus:border-[#1B3D8F] placeholder-gray-300"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-gray-500 block mb-1">Company</label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 rounded-lg border border-gray-200 bg-white text-gray-800 text-sm focus:outline-none focus:border-[#1B3D8F] placeholder-gray-300"
                      placeholder="Company name"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-xs text-gray-500 block mb-1">Email *</label>
                  <input
                    type="email"
                    required
                    className="w-full px-3 py-2 rounded-lg border border-gray-200 bg-white text-gray-800 text-sm focus:outline-none focus:border-[#1B3D8F] placeholder-gray-300"
                    placeholder="your@email.com"
                  />
                </div>
                <div>
                  <label className="text-xs text-gray-500 block mb-1">Type of Request</label>
                  <select className="w-full px-3 py-2 rounded-lg border border-gray-200 bg-white text-gray-600 text-sm focus:outline-none focus:border-[#1B3D8F]">
                    <option value="">Select request type</option>
                    {["Product Selection", "Equipment Service & Repair", "Radiometer Calibration", "Spare Parts & Consumables", "Process Consulting", "Training & Application Support", "Other"].map((t) => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-xs text-gray-500 block mb-1">Industry / Application</label>
                  <select className="w-full px-3 py-2 rounded-lg border border-gray-200 bg-white text-gray-600 text-sm focus:outline-none focus:border-[#1B3D8F]">
                    <option value="">Select your industry</option>
                    {["Medical Device", "Automotive", "Electronics", "Cable & Fiber", "Precision Optics", "UV Printing", "Wood Coatings", "Metal Coatings", "Aerospace", "Other"].map((ind) => (
                      <option key={ind} value={ind}>{ind}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-xs text-gray-500 block mb-1">Message *</label>
                  <textarea
                    required
                    rows={5}
                    className="w-full px-3 py-2 rounded-lg border border-gray-200 bg-white text-gray-800 text-sm focus:outline-none focus:border-[#1B3D8F] placeholder-gray-300 resize-none"
                    placeholder="Describe your application, process requirements, or questions..."
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-3 rounded-lg font-semibold text-white hover:opacity-90 transition-all"
                  style={{ background: "#1B3D8F" }}
                >
                  Send Message →
                </button>
              </form>
            </div>
          )}
        </div>
      </section>

      {/* Bottom strip */}
      <section className="py-16" style={{ background: "#0a1628" }}>
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
