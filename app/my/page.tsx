import Link from "next/link";
import type { Metadata } from "next";
import { getDict } from "./dictionaries";
import type { MyLocale } from "./dictionaries";

const lang: MyLocale = "my";

export const metadata: Metadata = {
  title: "ETIA Technology | Pengedar Sistem & Penyelesaian UV Curing",
  description: "Pengedar sah OmniCure UV curing di Asia Tenggara — Malaysia, Thailand, Vietnam, Singapura dan Indonesia. 20 tahun kepakaran aplikasi, stok tempatan dan pembaikan dalaman merentasi 10 industri.",
  robots: {
    index: process.env.SITE_MY_PUBLISHED === "true",
    follow: process.env.SITE_MY_PUBLISHED === "true",
  },
};

export default function MalaysiaHome() {
  const dict = getDict(lang);

  return (
    <div className="min-h-screen bg-white text-[#102038]">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#1A3DAD] to-[#142f86] text-white py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="mb-6">
            <span className="inline-block bg-white/20 text-white px-4 py-2 rounded-full text-sm font-semibold mb-6">
              {dict.home.eyebrow}
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
            <span className="block">{dict.home.h1Line1}</span>
            <span className="text-[#4CAF3E]">{dict.home.h1Line2}</span>
          </h1>
          <p className="text-lg text-white/90 mb-8 max-w-3xl">
            Pengetahuan UV curing yang praktikal merentasi bidang perubatan, elektronik, fotonik, automotif dan pembuatan industri.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a href="/my/product" className="inline-flex items-center justify-center gap-2 bg-[#4CAF3E] hover:bg-[#3d8a2f] text-white font-bold py-3 px-6 rounded-lg transition">
              {dict.cta.exploreProducts}
            </a>
            <a href="mailto:sales@etia-tech.com?subject=UV%20Curing%20Inquiry" className="inline-flex items-center justify-center gap-2 bg-white/20 hover:bg-white/30 text-white font-bold py-3 px-6 rounded-lg border border-white/40 transition">
              {dict.cta.talkToEngineer}
            </a>
          </div>
        </div>
      </section>

      {/* Trust Bar */}
      <section className="bg-white border-b border-gray-100 py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto text-center text-sm text-gray-600 space-y-2 sm:space-y-0">
          <div className="text-sm">
            {dict.home.ticker.join(" · ")}
          </div>
        </div>
      </section>

      {/* Why ETIA */}
      <section className="bg-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12" style={{ color: "#1A3DAD" }}>
            {dict.home.why.heading}
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {dict.home.why.items.map((card, i) => (
              <div key={i} className="rounded-lg p-6 bg-gray-50 border border-gray-100">
                <h3 className="font-bold mb-3" style={{ color: "#4CAF3E" }}>{card.title}</h3>
                <p className="text-gray-700">{card.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-2" style={{ color: "#1A3DAD" }}>
            {dict.home.brands.heading}
          </h2>
          <p className="text-gray-600 mb-12">{dict.home.brands.eyebrow}</p>

          <div className="grid md:grid-cols-2 gap-8">
            {/* OmniCure */}
            <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100">
              <h3 className="text-xl font-bold mb-3" style={{ color: "#4CAF3E" }}>
                {dict.home.brands.omnicure.title}
              </h3>
              <p className="text-gray-700 mb-6">{dict.home.brands.omnicure.body}</p>
              <a href="/my/product/omnicure" className="inline-flex text-[#1A3DAD] font-semibold hover:underline">
                {dict.home.brands.omnicure.cta} →
              </a>
            </div>

            {/* Phoseon */}
            <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100">
              <h3 className="text-xl font-bold mb-3" style={{ color: "#4CAF3E" }}>
                {dict.home.brands.phoseon.title}
              </h3>
              <p className="text-gray-700 mb-6">{dict.home.brands.phoseon.body}</p>
              <a href="/my/product/phoseon" className="inline-flex text-[#1A3DAD] font-semibold hover:underline">
                {dict.home.brands.phoseon.cta} →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Cases */}
      <section className="bg-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-3" style={{ color: "#1A3DAD" }}>
            {dict.caseStudies.heading}
          </h2>
          <p className="text-gray-600 mb-12">{dict.caseStudies.sub}</p>
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {dict.home.cases.items.slice(0, 2).map((c, i) => (
              <a key={i} href="/my/cases" className="group bg-gray-50 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition border border-gray-100">
                <div className="h-40 bg-gradient-to-br from-[#1A3DAD] to-[#142f86]" />
                <div className="p-6">
                  <p className="text-sm text-gray-500 mb-2">{c.industry}</p>
                  <p className="font-semibold text-gray-900 group-hover:text-[#1A3DAD] line-clamp-2">{c.title}</p>
                </div>
              </a>
            ))}
          </div>
          <div className="text-center">
            <a href="/my/cases" className="inline-flex text-[#1A3DAD] font-semibold hover:underline">
              {dict.caseStudies.all} →
            </a>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: "#1A3DAD" }} className="text-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">{dict.home.closingCta.heading}</h2>
          <p className="text-lg text-white/90 mb-8">{dict.home.closingCta.body}</p>
          <a href="mailto:sales@etia-tech.com" className="inline-flex items-center justify-center gap-2 bg-[#4CAF3E] hover:bg-[#3d8a2f] text-white font-bold py-3 px-8 rounded-lg transition">
            {dict.cta.sendApplication}
          </a>
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
              <a href="/my/privacy" className="hover:text-white">{dict.footer.privacyPolicy}</a>
              <a href="/my/terms" className="hover:text-white">{dict.footer.termsOfUse}</a>
              <a href="/my/contact" className="hover:text-white">{dict.footer.contact}</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
