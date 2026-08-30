import Link from "next/link";
import type { Metadata } from "next";
import { myCaseStudies } from "../caseStudiesData";
import { getDict } from "../dictionaries";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const caseStudy = myCaseStudies.find((c) => c.slug === slug);

  return {
    title: caseStudy ? `${caseStudy.title} | ETIA` : "Kajian Kes | ETIA",
    description: caseStudy?.overview[0] || "Kajian kes UV curing",
  };
}

export default async function CaseDetailPage({ params }: Props) {
  const { slug } = await params;
  const caseStudy = myCaseStudies.find((c) => c.slug === slug);
  const dict = getDict("my");

  if (!caseStudy) {
    return (
      <div className="min-h-screen bg-white text-[#102038]">
        <div className="max-w-4xl mx-auto py-16 px-4 text-center">
          <h1 className="text-2xl font-bold mb-4">Kajian Kes tidak dijumpai</h1>
          <Link href="/my/cases" className="text-[#1A3DAD] hover:underline">
            Kembali ke Kajian Kes
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-[#102038]">
      {/* Hero */}
      <section className="bg-gradient-to-br from-[#1A3DAD] to-[#142f86] text-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <p className="text-sm text-white/80 mb-3 uppercase tracking-wide">
            {caseStudy.industry}
          </p>
          <h1 className="text-3xl md:text-4xl font-bold leading-tight mb-4">
            {caseStudy.title}
          </h1>
          <Link
            href="/my/cases"
            className="text-white/90 hover:text-white transition"
          >
            ← Kembali ke Kajian Kes
          </Link>
        </div>
      </section>

      {/* Content */}
      <section className="bg-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Overview */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6" style={{ color: "#1A3DAD" }}>
              Gambaran Aplikasi
            </h2>
            <div className="space-y-4 text-gray-700">
              {caseStudy.overview.map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
          </div>

          {/* Challenge */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6" style={{ color: "#1A3DAD" }}>
              {dict.caseStudies.sections.challenge}
            </h2>
            <ul className="space-y-3 text-gray-700">
              {caseStudy.challenge.map((item, i) => (
                <li key={i} className="flex gap-3">
                  <span className="text-[#4CAF3E] font-bold flex-shrink-0 mt-1">
                    •
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Solution */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6" style={{ color: "#1A3DAD" }}>
              Penyelesaian
            </h2>
            <div className="space-y-4 text-gray-700">
              {caseStudy.solution.map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
          </div>

          {/* Benefits */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6" style={{ color: "#1A3DAD" }}>
              {dict.caseStudies.sections.benefits}
            </h2>
            <ul className="space-y-3 text-gray-700">
              {caseStudy.benefits.map((benefit, i) => (
                <li key={i} className="flex gap-3">
                  <span
                    className="text-[#4CAF3E] font-bold flex-shrink-0 mt-1"
                    style={{ color: "#4CAF3E" }}
                  >
                    ✓
                  </span>
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* System Used */}
          <div className="mb-12 p-6 bg-gray-50 rounded-lg border border-gray-200">
            <h3
              className="font-bold mb-3"
              style={{ color: "#4CAF3E" }}
            >
              {dict.caseStudies.sections.systemUsed}
            </h3>
            <p className="text-gray-700">{caseStudy.systemUsed}</p>
          </div>

          {/* Engineer Tip */}
          <div className="mb-12 p-6 bg-blue-50 rounded-lg border border-blue-200">
            <h3 className="font-bold mb-3" style={{ color: "#1A3DAD" }}>
              Tip Jurutera
            </h3>
            <p className="text-gray-700 italic">{caseStudy.engineerTip}</p>
          </div>

          {/* ETIA Support */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6" style={{ color: "#1A3DAD" }}>
              {dict.caseStudies.sections.support}
            </h2>
            <p className="text-gray-700">{caseStudy.etiaSupport}</p>
          </div>

          {/* CTA */}
          <div
            style={{ background: "#1A3DAD" }}
            className="text-white p-8 rounded-lg text-center mb-8"
          >
            <h3 className="text-xl font-bold mb-3">{caseStudy.cta}</h3>
            <a
              href="mailto:sales@etia-tech.com"
              className="inline-block bg-[#4CAF3E] hover:bg-[#3d8a2f] text-white font-bold py-3 px-8 rounded-lg transition"
            >
              {dict.cta.talkToEngineer}
            </a>
          </div>

          {/* Related Cases */}
          <div className="pt-8 border-t">
            <h3 className="text-lg font-bold mb-4">
              {dict.caseStudies.sections.related}
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              {myCaseStudies.slice(0, 2).map((c) => (
                <Link
                  key={c.id}
                  href={`/my/cases/${c.slug}`}
                  className="p-4 bg-gray-50 rounded-lg hover:shadow-md transition border border-gray-200"
                >
                  <p className="text-sm text-gray-500 mb-2">{c.industry}</p>
                  <p className="font-semibold text-gray-900 hover:text-[#1A3DAD]">
                    {c.title}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
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
