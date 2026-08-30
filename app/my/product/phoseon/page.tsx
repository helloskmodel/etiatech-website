import Link from "next/link";
import type { Metadata } from "next";
import { getDict } from "../../dictionaries";

export const metadata: Metadata = {
  title: "Sistem UV LED Curing Phoseon | ETIA",
  description: "UV LED curing berkuasa tinggi Phoseon — FireJet/FireEdge penyejukan udara dan FireLine/VeriCure/Nexus II penyejukan air untuk percetakan dan barisan industri. Dibekal dan disokong oleh ETIA di Malaysia, Thailand dan Vietnam.",
};

export default function PhoseonPage() {
  const dict = getDict("my");
  const t = dict.productPages.phoseon;
  const cta = dict.cta;

  return (
    <div className="min-h-screen bg-white text-[#102038]">
      {/* Hero */}
      <section className="bg-gradient-to-br from-[#1A3DAD] to-[#142f86] text-white py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="mb-6">
            <span className="inline-block bg-white/20 text-white px-4 py-2 rounded-full text-sm font-semibold mb-6">
              {t.hero.eyebrow}
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
            <span className="block">{t.hero.h1Line1}</span>
            <span className="text-[#4CAF3E]">{t.hero.h1Line2}</span>
          </h1>
          <div className="flex flex-col sm:flex-row gap-4 mt-8">
            <a href="#applications" className="inline-flex items-center justify-center gap-2 bg-[#4CAF3E] hover:bg-[#3d8a2f] text-white font-bold py-3 px-6 rounded-lg transition">
              {t.hero.ctaPrimary}
            </a>
            <a href="mailto:sales@etia-tech.com?subject=Phoseon%20Inquiry" className="inline-flex items-center justify-center gap-2 bg-white/20 hover:bg-white/30 text-white font-bold py-3 px-6 rounded-lg border border-white/40 transition">
              {t.hero.ctaSecondary}
            </a>
          </div>
        </div>
      </section>

      {/* Platform Overview */}
      <section className="bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12" style={{ color: "#1A3DAD" }}>
            {t.productFamilies}
          </h2>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* Platform Features */}
            <div>
              <h3 className="text-xl font-bold mb-6" style={{ color: "#4CAF3E" }}>
                {t.featuredPlatform}
              </h3>
              <div className="space-y-4">
                {[
                  { icon: "⚡", label: t.highUvEnergy, desc: "Tenaga UV maksimum untuk aplikasi industri" },
                  { icon: "🎯", label: t.controlledIntensity, desc: "Kawal intensiti output dengan tepat" },
                  { icon: "♻️", label: t.efficientOperation, desc: "LED cekap tenaga, mengurangkan kos operasi" },
                  { icon: "🔗", label: t.productionIntegration, desc: "Integrasi mulus dengan barisan pengeluaran" },
                ].map((item, i) => (
                  <div key={i} className="flex gap-4">
                    <span className="text-2xl flex-shrink-0">{item.icon}</span>
                    <div>
                      <p className="font-semibold text-gray-900">{item.label}</p>
                      <p className="text-sm text-gray-600">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Specifications */}
            <div>
              <h3 className="text-xl font-bold mb-6" style={{ color: "#4CAF3E" }}>
                Spesifikasi Utama
              </h3>
              <div className="space-y-4">
                {[
                  { label: t.airAndWaterCooled, value: "Penyejukan udara & air" },
                  { label: t.webWidths, value: "Lebar web dapat pilih" },
                  { label: t.warranty, value: "Perlindungan komprehensif" },
                  { label: t.ultraHighDose, value: "Dos UV tinggi" },
                  { label: t.scalableFormFactor, value: "Dapat disesuaikan skala" },
                  { label: t.convectionOptions, value: "Pilihan pendingin" },
                ].map((spec, i) => (
                  <div key={i} className="pb-3 border-b border-gray-200 last:border-0">
                    <p className="text-sm text-gray-600">{spec.label}</p>
                    <p className="font-semibold text-gray-900">{spec.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Key Stats */}
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <p className="text-sm text-gray-600 mb-2">Jangka Hayat Diod</p>
              <p className="text-2xl font-bold text-[#4CAF3E]">{t.diodeLife}</p>
            </div>
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <p className="text-sm text-gray-600 mb-2">Kelajuan Cetak</p>
              <p className="text-2xl font-bold text-[#4CAF3E]">{t.printSpeed}</p>
            </div>
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <p className="text-sm text-gray-600 mb-2">Retrofit Mesin</p>
              <p className="text-lg font-bold text-[#4CAF3E]">{t.quickRetrofit}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Applications */}
      <section id="applications" className="bg-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12" style={{ color: "#1A3DAD" }}>
            {t.wherePhoseonFits}
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: t.printingPackaging, icon: "🖨️" },
              { title: t.industrialCoatings, icon: "🎨" },
              { title: t.fiberCable, icon: "🔗" },
              { title: t.adhesivesConverting, icon: "🔧" },
            ].map((app, i) => (
              <div key={i} className="p-6 bg-gray-50 rounded-lg border border-gray-200 text-center hover:shadow-md transition">
                <p className="text-4xl mb-3">{app.icon}</p>
                <p className="font-semibold text-gray-900">{app.title}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Retrofit & Support */}
      <section className="bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Retrofit */}
            <div className="bg-white p-8 rounded-lg border border-gray-200">
              <h3 className="text-xl font-bold mb-4" style={{ color: "#1A3DAD" }}>
                Retrofit Mesin Cetak
              </h3>
              <p className="text-gray-700 mb-6">
                Tingkatkan mesin cetak lama anda dengan teknologi UV LED Phoseon. Retrofit pantas, downtime minimum.
              </p>
              <a href="mailto:sales@etia-tech.com?subject=Retrofit%20Inquiry" className="text-[#1A3DAD] font-semibold hover:underline">
                {t.askAboutRetrofit} →
              </a>
            </div>

            {/* Support */}
            <div className="bg-white p-8 rounded-lg border border-gray-200">
              <h3 className="text-xl font-bold mb-4" style={{ color: "#1A3DAD" }}>
                Sokongan Teknikal
              </h3>
              <p className="text-gray-700 mb-6">
                Pasukan ETIA siap membantu dengan pemilihan sistem, pemasangan, dan penyelenggaraan jangka panjang.
              </p>
              <a href="mailto:sales@etia-tech.com" className="text-[#1A3DAD] font-semibold hover:underline">
                Hubungi kami →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: "#1A3DAD" }} className="text-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Siap untuk UV LED Phoseon?</h2>
          <p className="text-lg text-white/90 mb-8">
            Beritahu kami tentang aplikasi anda — lebar web, kelajuan barisan, persekitaran operasi, dan keperluan khusus.
          </p>
          <a
            href="mailto:sales@etia-tech.com"
            className="inline-block bg-[#4CAF3E] hover:bg-[#3d8a2f] text-white font-bold py-3 px-8 rounded-lg transition"
          >
            {cta.contactUs}
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
