import Link from "next/link";
import type { Metadata } from "next";
import { getHomeDict, getDict } from "./dictionaries";
import type { MyLocale } from "./dictionaries";

const lang: MyLocale = "my"; // Default to Malay

export const metadata: Metadata = {
  title: "Pengedar Sistem & Penyelesaian UV Curing | ETIA",
  description: "Pengedar sah sistem UV curing industri daripada pengilang terkemuka. 20 tahun kepakaran aplikasi merentasi 10 industri.",
  robots: {
    index: process.env.SITE_MY_PUBLISHED === "true",
    follow: process.env.SITE_MY_PUBLISHED === "true",
  },
};

export default function MalaysiaHome() {
  const dict = getHomeDict(lang);

  return (
    <div className="min-h-screen bg-white text-[#102038]">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#1A3DAD] to-[#142f86] text-white py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="mb-6">
            <span className="inline-block bg-white/20 text-white px-4 py-2 rounded-full text-sm font-semibold mb-6">
              {dict.hero.eyebrow}
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
            {dict.hero.title}
          </h1>
          <p className="text-lg text-white/90 mb-8 max-w-3xl">
            {dict.hero.subtitle}
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a href="/my/product" className="inline-flex items-center justify-center gap-2 bg-[#4CAF3E] hover:bg-[#3d8a2f] text-white font-bold py-3 px-6 rounded-lg transition">
              {dict.buttons.exploreProducts}
            </a>
            <a href="mailto:sales@etia-tech.com?subject=UV%20Curing%20Inquiry" className="inline-flex items-center justify-center gap-2 bg-white/20 hover:bg-white/30 text-white font-bold py-3 px-6 rounded-lg border border-white/40 transition">
              {dict.buttons.talkEngineer}
            </a>
          </div>
        </div>
      </section>

      {/* Trust Bar */}
      <section className="bg-white border-b border-gray-100 py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto text-center text-sm text-gray-600">
          {dict.trustBar}
        </div>
      </section>

      {/* Products Section */}
      <section className="bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-2" style={{ color: "#1A3DAD" }}>
            {dict.products.heading}
          </h2>
          <p className="text-gray-600 mb-12">{dict.products.subheading}</p>

          <div className="grid md:grid-cols-2 gap-8">
            {/* OmniCure */}
            <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100">
              <h3 className="text-xl font-bold mb-3" style={{ color: "#4CAF3E" }}>
                {dict.omnicure.heading}
              </h3>
              <p className="text-gray-700 mb-6">{dict.omnicure.desc}</p>
              <a href="/my/product/omnicure" className="inline-flex text-[#1A3DAD] font-semibold hover:underline">
                {dict.omnicure.cta} →
              </a>
            </div>

            {/* Phoseon */}
            <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100">
              <h3 className="text-xl font-bold mb-3" style={{ color: "#4CAF3E" }}>
                {dict.phoseon.heading}
              </h3>
              <p className="text-gray-700 mb-6">{dict.phoseon.desc}</p>
              <a href="/my/product/phoseon" className="inline-flex text-[#1A3DAD] font-semibold hover:underline">
                {dict.phoseon.cta} →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Why ETIA */}
      <section className="bg-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12" style={{ color: "#1A3DAD" }}>
            {dict.why.heading}
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {dict.why.cards.map((card, i) => (
              <div key={i} className="rounded-lg p-6 bg-gray-50 border border-gray-100">
                {card.title && <h3 className="font-bold mb-3" style={{ color: "#4CAF3E" }}>{card.title}</h3>}
                <p className="text-gray-700">{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cases */}
      <section className="bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-3" style={{ color: "#1A3DAD" }}>
            {dict.cases.heading}
          </h2>
          <p className="text-gray-600 mb-12">{dict.cases.subtitle}</p>
          <div className="grid md:grid-cols-2 gap-6">
            <a href="/my/cases" className="group bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition border border-gray-100">
              <div className="h-40 bg-gradient-to-br from-[#1A3DAD] to-[#142f86]" />
              <div className="p-6">
                <p className="text-sm text-gray-500 mb-2">Case Study</p>
                <p className="font-semibold text-gray-900 group-hover:text-[#1A3DAD]">Medical Device Assembly</p>
              </div>
            </a>
            <a href="/my/cases" className="group bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition border border-gray-100">
              <div className="h-40 bg-gradient-to-br from-[#4CAF3E] to-[#3d8a2f]" />
              <div className="p-6">
                <p className="text-sm text-gray-500 mb-2">Case Study</p>
                <p className="font-semibold text-gray-900 group-hover:text-[#4CAF3E]">Electronics & PCB Assembly</p>
              </div>
            </a>
          </div>
          <div className="text-center mt-8">
            <a href="/my/cases" className="inline-flex text-[#1A3DAD] font-semibold hover:underline">
              {dict.cases.all} →
            </a>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: "#1A3DAD" }} className="text-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">{dict.cta.heading}</h2>
          <p className="text-lg text-white/90 mb-8">{dict.cta.desc}</p>
          <a href="mailto:sales@etia-tech.com" className="inline-flex items-center justify-center gap-2 bg-[#4CAF3E] hover:bg-[#3d8a2f] text-white font-bold py-3 px-8 rounded-lg transition">
            {dict.cta.button}
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <p className="font-semibold text-white mb-2">ETIA Malaysia</p>
            <p className="text-sm">Authorized Distributor of UV Curing Systems</p>
          </div>
          <div className="border-t border-gray-700 pt-8 text-sm text-gray-400">
            <p>&copy; 2026 ETIA Tech. All rights reserved.</p>
            <div className="mt-4 flex gap-6">
              <a href="/my/privacy" className="hover:text-white">Privacy Policy</a>
              <a href="/my/terms" className="hover:text-white">Terms of Use</a>
              <a href="mailto:sales@etia-tech.com" className="hover:text-white">Contact</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
