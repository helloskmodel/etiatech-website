import Link from "next/link";
import type { Metadata } from "next";
import { getDict } from "../../dictionaries";

export const metadata: Metadata = {
  title: "Sistem UV Curing OmniCure — Pengedar Sah | ETIA",
  description: "Sistem UV curing berketepatan tinggi OmniCure untuk pemasangan, bonding, peranti perubatan dan elektronik. ETIA membekalkan sistem asli, lampu, sokongan aplikasi dan servis.",
  robots: {
    index: process.env.SITE_MY_PUBLISHED === "true",
    follow: process.env.SITE_MY_PUBLISHED === "true",
  },
};

export default function OmniCurePage() {
  const dict = getDict("my");
  const t = dict.productPages.omnicure;

  return (
    <div className="min-h-screen bg-white text-[#102038]">
      {/* Hero */}
      <section className="bg-gradient-to-br from-[#1A3DAD] to-[#142f86] text-white py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="mb-6">
            <span className="inline-block bg-white/20 text-white px-4 py-2 rounded-full text-sm font-semibold mb-6">
              {t.eyebrow}
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
            <span className="block">{t.h1Line1}</span>
            <span className="text-[#4CAF3E]">{t.h1Line2}</span>
          </h1>
          <div className="flex flex-col sm:flex-row gap-4 mt-8">
            <a href="#selector" className="inline-flex items-center justify-center gap-2 bg-[#4CAF3E] hover:bg-[#3d8a2f] text-white font-bold py-3 px-6 rounded-lg transition">
              {t.ctaPrimary}
            </a>
            <a href="mailto:sales@etia-tech.com?subject=OmniCure%20Inquiry" className="inline-flex items-center justify-center gap-2 bg-white/20 hover:bg-white/30 text-white font-bold py-3 px-6 rounded-lg border border-white/40 transition">
              {t.ctaSecondary}
            </a>
          </div>
        </div>
      </section>

      {/* Technology Selector */}
      <section id="selector" className="bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-3" style={{ color: "#1A3DAD" }}>
            {t.technologySelector}
          </h2>
          <p className="text-gray-600 mb-12">{t.chooseByTechnology}</p>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Spot Curing */}
            <div className="bg-white rounded-lg p-8 border border-gray-200 hover:shadow-lg transition">
              <h3 className="text-xl font-bold mb-4" style={{ color: "#4CAF3E" }}>
                {t.spotCuring}
              </h3>
              <p className="text-gray-700 mb-6">{t.highIntensitySpot}</p>
              <a href="/my/product/omnicure#products" className="text-[#1A3DAD] font-semibold hover:underline">
                {t.viewMatching} →
              </a>
            </div>

            {/* Area Curing */}
            <div className="bg-white rounded-lg p-8 border border-gray-200 hover:shadow-lg transition">
              <h3 className="text-xl font-bold mb-4" style={{ color: "#4CAF3E" }}>
                {t.areaCuring}
              </h3>
              <p className="text-gray-700 mb-6">{t.uniformExposure}</p>
              <a href="/my/product/omnicure#products" className="text-[#1A3DAD] font-semibold hover:underline">
                {t.viewMatching} →
              </a>
            </div>

            {/* LED Precision */}
            <div className="bg-white rounded-lg p-8 border border-gray-200 hover:shadow-lg transition">
              <h3 className="text-xl font-bold mb-4" style={{ color: "#4CAF3E" }}>
                {t.ledPrecision}
              </h3>
              <p className="text-gray-700 mb-6">{t.compactCuring}</p>
              <a href="/my/product/omnicure#products" className="text-[#1A3DAD] font-semibold hover:underline">
                {t.viewMatching} →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Product Family */}
      <section id="products" className="bg-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-3" style={{ color: "#1A3DAD" }}>
            {t.productFamily}
          </h2>
          <p className="text-gray-600 mb-12">{t.findYourSystem}</p>

          <div className="space-y-4 mb-12">
            <div className="p-6 bg-gray-50 rounded-lg border border-gray-200">
              <p className="text-gray-700 mb-4">{t.allProducts}</p>
              <a href="mailto:sales@etia-tech.com" className="text-[#1A3DAD] font-semibold hover:underline">
                {t.viewProduct}
              </a>
            </div>
          </div>

          {/* Key Features */}
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="space-y-4">
              <h3 className="font-bold text-lg" style={{ color: "#1A3DAD" }}>
                Ciri-Ciri Utama
              </h3>
              <div className="space-y-3">
                {[
                  { label: t.closedLoopFeedback, desc: "Stabiliti output ±5%" },
                  { label: t.realTimeCalibration, desc: "Boleh dijejak NIST" },
                  { label: t.airCooled, desc: "Penyejukan udara standard" },
                  { label: t.adjoinableHeads, desc: "Fleksibel konfigurasi" },
                ].map((item, i) => (
                  <div key={i} className="pb-4 border-b border-gray-200 last:border-0">
                    <p className="font-semibold text-gray-900">{item.label}</p>
                    <p className="text-sm text-gray-600">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-bold text-lg" style={{ color: "#1A3DAD" }}>
                Sokongan & Sumber
              </h3>
              <div className="space-y-3">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <p className="font-semibold mb-2">{t.productLiterature}</p>
                  <a href="mailto:sales@etia-tech.com" className="text-[#1A3DAD] text-sm hover:underline">
                    Minta lembar data →
                  </a>
                </div>
                <div className="p-4 bg-green-50 rounded-lg">
                  <p className="font-semibold mb-2">{t.lampReplacement}</p>
                  <a href="mailto:sales@etia-tech.com" className="text-[#1A3DAD] text-sm hover:underline">
                    {t.checkCompatibility} →
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div style={{ background: "#1A3DAD" }} className="text-white p-12 rounded-lg text-center">
            <h3 className="text-2xl font-bold mb-4">Perlukan sistem yang tepat?</h3>
            <p className="text-white/90 mb-6">Jurutera ETIA siap membantu memilih solusi OmniCure untuk aplikasi anda.</p>
            <a
              href="mailto:sales@etia-tech.com"
              className="inline-block bg-[#4CAF3E] hover:bg-[#3d8a2f] text-white font-bold py-3 px-8 rounded-lg transition"
            >
              {t.ctaSecondary}
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <p className="font-semibold text-white mb-2">ETIA Technology Malaysia</p>
            <p className="text-sm">{dict.footer.tagline}</p>
          </div>
          <div className="border-t border-gray-700 pt-8 text-sm text-gray-400">
            <p>{dict.footer.rights}</p>
            <div className="mt-4 flex gap-6">
              <a href="/my/privacy" className="hover:text-white">
                {dict.footer.privacyPolicy}
              </a>
              <a href="/my/terms" className="hover:text-white">
                {dict.footer.termsOfUse}
              </a>
              <a href="/my/contact" className="hover:text-white">
                {dict.footer.contact}
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
