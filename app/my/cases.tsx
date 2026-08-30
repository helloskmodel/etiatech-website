import Link from "next/link";
import type { Metadata } from "next";
import { getDict } from "./dictionaries";
import type { MyLocale } from "./dictionaries";

const lang: MyLocale = "my";

export const metadata: Metadata = {
  title: "Kajian Kes UV Curing | ETIA Technology",
  description: "Terokai aplikasi pengeluaran sebenar — lihat sistemnya, prosesnya dan hasilnya di merata-rata industri.",
  robots: {
    index: process.env.SITE_MY_PUBLISHED === "true",
    follow: process.env.SITE_MY_PUBLISHED === "true",
  },
};

export default function MalaysiaCases() {
  const dict = getDict(lang);

  const cases = dict.home.cases.items;

  return (
    <div className="min-h-screen bg-white text-[#102038]">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#1A3DAD] to-[#142f86] text-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
            {dict.caseStudies.heading}
          </h1>
          <p className="text-lg text-white/90 max-w-3xl">
            {dict.caseStudies.sub}
          </p>
        </div>
      </section>

      {/* Cases Grid */}
      <section className="bg-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-6">
            {cases.map((c, i) => (
              <a
                key={i}
                href={`/my/cases/${slugify(c.title)}`}
                className="group bg-gray-50 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition border border-gray-100"
              >
                <div className="h-40 bg-gradient-to-br from-[#1A3DAD] to-[#142f86]" />
                <div className="p-6">
                  <p className="text-sm text-gray-500 mb-2">{c.industry}</p>
                  <p className="font-semibold text-gray-900 group-hover:text-[#1A3DAD] line-clamp-2">
                    {c.title}
                  </p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: "#1A3DAD" }} className="text-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">
            Perlukan bantuan memilih sistem UV curing yang tepat?
          </h2>
          <p className="text-lg text-white/90 mb-8">
            Beritahu kami aplikasi, pelekat, kawasan curing, panjang gelombang dan keperluan pengeluaran anda.
          </p>
          <a
            href="mailto:sales@etia-tech.com"
            className="inline-flex items-center justify-center gap-2 bg-[#4CAF3E] hover:bg-[#3d8a2f] text-white font-bold py-3 px-8 rounded-lg transition"
          >
            {dict.cta.talkToEngineer}
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

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}
