import type { Metadata } from "next";
import { getDict } from "../dictionaries";

export const metadata: Metadata = {
  title: "Hubungi Kami | ETIA Technology",
  description: "Hubungi jurutera ETIA untuk pertanyaan jualan, servis, pembaikan peralatan dan sokongan aplikasi UV curing.",
  robots: {
    index: process.env.SITE_MY_PUBLISHED === "true",
    follow: process.env.SITE_MY_PUBLISHED === "true",
  },
};

export default function ContactPage() {
  const dict = getDict("my");
  const t = dict.contactPage;

  return (
    <div className="min-h-screen bg-white text-[#102038]">
      {/* Hero */}
      <section className="bg-gradient-to-br from-[#1A3DAD] to-[#142f86] text-white py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <p className="text-sm font-semibold text-[#4CAF3E] mb-4 uppercase tracking-wide">
            {t.eyebrow}
          </p>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
            {t.h1}
          </h1>
          <p className="text-lg text-white/90 max-w-3xl">
            {t.intro}
          </p>
        </div>
      </section>

      {/* Sales Section */}
      <section className="bg-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-4" style={{ color: "#1A3DAD" }}>
            {t.sales.heading}
          </h2>
          <p className="text-gray-700 mb-12">
            {t.sales.body}
          </p>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {t.sales.cards.map((card, i) => (
              <div key={i} className="p-6 bg-gray-50 rounded-lg border border-gray-200">
                <h3 className="font-bold text-lg mb-3" style={{ color: "#4CAF3E" }}>
                  {card.title}
                </h3>
                <p className="text-gray-700 text-sm">
                  {card.body}
                </p>
              </div>
            ))}
          </div>

          <div className="bg-blue-50 p-8 rounded-lg border border-blue-200">
            <p className="text-sm text-gray-600 mb-2">
              {t.sales.directEmailLabel}
            </p>
            <a
              href="mailto:sales@etia-tech.com"
              className="text-[#1A3DAD] font-semibold text-lg hover:underline"
            >
              sales@etia-tech.com
            </a>
            <p className="text-xs text-gray-500 mt-3">
              Respons biasanya dalam 1 hari bekerja
            </p>
          </div>
        </div>
      </section>

      {/* Service Section */}
      <section className="bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-4" style={{ color: "#1A3DAD" }}>
            {t.service.heading}
          </h2>
          <p className="text-gray-700 mb-12">
            {t.service.body}
          </p>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {t.service.cards.map((card, i) => (
              <div key={i} className="p-6 bg-white rounded-lg border border-gray-200">
                <h3 className="font-bold text-lg mb-3" style={{ color: "#4CAF3E" }}>
                  {card.title}
                </h3>
                <p className="text-gray-700 text-sm">
                  {card.body}
                </p>
              </div>
            ))}
          </div>

          <div className="bg-green-50 p-8 rounded-lg border border-green-200">
            <p className="text-sm text-gray-600 mb-2">
              {t.service.serviceEmailLabel}
            </p>
            <a
              href="mailto:service@etia-tech.com"
              className="text-[#1A3DAD] font-semibold text-lg hover:underline"
            >
              service@etia-tech.com
            </a>
            <p className="text-xs text-gray-500 mt-3">
              Untuk keadaan mendesak, hubungi terus
            </p>
          </div>
        </div>
      </section>

      {/* Commitments */}
      <section className="bg-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            {t.commitments.map((item, i) => (
              <div key={i} className="text-center">
                <h3 className="font-bold text-lg mb-2" style={{ color: "#1A3DAD" }}>
                  {item.title}
                </h3>
                <p className="text-gray-600" style={{ color: "#4CAF3E" }}>
                  {item.sub}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Global Offices */}
      <section className="bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-4" style={{ color: "#1A3DAD" }}>
            {t.global.heading}
          </h2>
          <p className="text-gray-600 mb-12">
            Pejabat di {t.global.regions}
          </p>

          <div className="grid md:grid-cols-2 gap-6 mb-12">
            <div className="p-6 bg-white rounded-lg border border-gray-200">
              <p className="font-bold mb-2" style={{ color: "#1A3DAD" }}>
                Malaysia
              </p>
              <p className="text-sm text-gray-600 mb-3">
                ETIA Technology Sdn. Bhd.
              </p>
              <a
                href="mailto:sales@etia-tech.com"
                className="text-[#1A3DAD] font-semibold hover:underline"
              >
                sales@etia-tech.com
              </a>
            </div>

            <div className="p-6 bg-white rounded-lg border border-gray-200">
              <p className="font-bold mb-2" style={{ color: "#1A3DAD" }}>
                Thailand
              </p>
              <p className="text-sm text-gray-600 mb-3">
                ETIA (Thailand) Co., Ltd.
              </p>
              <a
                href="mailto:sales@etia-tech.com"
                className="text-[#1A3DAD] font-semibold hover:underline"
              >
                sales@etia-tech.com
              </a>
            </div>

            <div className="p-6 bg-white rounded-lg border border-gray-200">
              <p className="font-bold mb-2" style={{ color: "#1A3DAD" }}>
                Vietnam
              </p>
              <p className="text-sm text-gray-600 mb-3">
                ETIA Vietnam Co., Ltd.
              </p>
              <a
                href="mailto:sales@etia-tech.com"
                className="text-[#1A3DAD] font-semibold hover:underline"
              >
                sales@etia-tech.com
              </a>
            </div>

            <div className="p-6 bg-white rounded-lg border border-gray-200">
              <p className="font-bold mb-2" style={{ color: "#1A3DAD" }}>
                Hong Kong
              </p>
              <p className="text-sm text-gray-600 mb-3">
                ETIA-TECH (ASIA) Co., Limited
              </p>
              <a
                href="mailto:sales@etia-tech.com"
                className="text-[#1A3DAD] font-semibold hover:underline"
              >
                sales@etia-tech.com
              </a>
            </div>
          </div>

          <p className="text-xs text-gray-500 mb-8">
            {t.global.phoneNote}
          </p>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: "#1A3DAD" }} className="text-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Siap berbincang dengan ETIA?</h2>
          <p className="text-lg text-white/90 mb-8">
            E-mel terus kepada kami dengan perincian aplikasi anda — lebar web, kelajuan barisan, persekitaran operasi dan keperluan khusus.
          </p>
          <a
            href="mailto:sales@etia-tech.com"
            className="inline-block bg-[#4CAF3E] hover:bg-[#3d8a2f] text-white font-bold py-3 px-8 rounded-lg transition"
          >
            Hubungi Kami
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
