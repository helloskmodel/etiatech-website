import Link from "next/link";
import { getApplicationsForProduct } from "@/data/applicationsData";

export default function RelatedApplications({ productSlug, limit = 3 }: { productSlug: string; limit?: number }) {
  const applications = getApplicationsForProduct(productSlug, limit);
  if (!applications.length) return null;
  return (
    <section className="border-t border-gray-100 bg-[#f6f8fb] py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-[#41A62A]">Related Applications</p>
        <h2 className="mb-3 text-2xl font-bold text-[#1A56DB] md:text-3xl">See this system in practical UV curing processes</h2>
        <p className="mb-8 max-w-2xl text-sm leading-relaxed text-gray-500">Application-driven guidance covering the customer challenge, recommended configuration, expected benefits, and ETIA support.</p>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {applications.map((application) => {
            const industry = application.industry.length > 2
              ? [application.industry[0], application.industry[application.industry.length - 1]]
              : application.industry;
            return (
              <Link key={application.slug} href={`/applications/${application.slug}`} className="group rounded-xl border border-gray-200 bg-white p-6 transition-all hover:border-[#1A56DB]/30 hover:shadow-md">
                <p className="text-[10px] font-bold uppercase tracking-widest text-[#41A62A]">Application Case Study</p>
                <h3 className="mt-2 text-lg font-bold leading-snug text-gray-900 transition-colors group-hover:text-[#1A56DB]">{application.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-500">{application.relatedSummary || application.subtitle}</p>
                <dl className="mt-5 space-y-3 border-t border-gray-100 pt-4">
                  <div><dt className="text-[10px] font-bold uppercase tracking-wide text-gray-400">Industry</dt><dd className="mt-1 text-xs font-medium text-gray-700">{industry.join(" · ")}</dd></div>
                  <div><dt className="text-[10px] font-bold uppercase tracking-wide text-gray-400">Application Point</dt><dd className="mt-1 text-xs font-medium text-gray-700">{application.applicationPoints.slice(0, 2).join(" · ")}</dd></div>
                  <div><dt className="text-[10px] font-bold uppercase tracking-wide text-gray-400">Recommended Product</dt><dd className="mt-1 text-xs font-medium text-gray-700">{application.recommendedProducts.join(" · ")}</dd></div>
                </dl>
                <p className="mt-5 text-xs font-semibold text-[#1A56DB]">Read application →</p>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
