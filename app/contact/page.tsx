export default function ContactPage() {
  return (
    <>
      {/* Hero — dark */}
      <section className="py-20" style={{ background: "linear-gradient(135deg, #0a1628 0%, #0f2444 100%)" }}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: "#44B549" }}>Contact</p>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Talk to an Engineer</h1>
          <p className="text-gray-300 text-lg">
            Tell us about your application — our UV curing engineers will help you find the right solution.
          </p>
        </div>
      </section>

      {/* Form — light */}
      <section className="py-16 bg-white">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Contact card */}
          <div className="rounded-2xl p-8 border border-gray-100 mb-8 bg-gray-50">
            <h2 className="font-semibold text-lg mb-4" style={{ color: "#1B3D8F" }}>Get in Touch</h2>
            <div className="flex items-center gap-3 mb-4">
              <span className="text-2xl">✉️</span>
              <div>
                <p className="text-xs text-gray-400 mb-0.5">Email</p>
                <a href="mailto:support@etiatech.com" className="font-medium hover:underline" style={{ color: "#44B549" }}>
                  support@etiatech.com
                </a>
              </div>
            </div>
            <p className="text-gray-500 text-sm leading-relaxed">
              We typically respond within 1 business day. For urgent production issues, please indicate in your message and we will prioritize accordingly.
            </p>
          </div>

          {/* Contact Form */}
          <div className="rounded-2xl p-8 border border-gray-100 bg-gray-50">
            <h2 className="font-semibold text-lg mb-6" style={{ color: "#1B3D8F" }}>Send Us a Message</h2>
            <form className="flex flex-col gap-4">
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
        </div>
      </section>

      {/* Dark bottom section */}
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
