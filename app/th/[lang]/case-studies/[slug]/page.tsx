import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { marketCases } from "@/components/markets";
import { localizeCase } from "@/components/caseStudies";
import { thMailto } from "../../../thContact";
import { isThLocale, getCaseDict, getDict, type ThLocale } from "../../../dictionaries";
import { caseContentTh } from "../../../caseContentTh";

const SITE = "https://www.etiatech.com";
const caseSlugTh = (id: string) => id.toLowerCase();

export const dynamicParams = false;
export function generateStaticParams() {
  return marketCases("th").map((c) => ({ slug: caseSlugTh(c.id) }));
}

function findCase(slug: string) {
  return marketCases("th").find((c) => caseSlugTh(c.id) === slug);
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}): Promise<Metadata> {
  const { lang, slug } = await params;
  const l: ThLocale = isThLocale(lang) ? lang : "th";
  const c = findCase(slug);
  if (!c) return {};
  const loc = localizeCase(c, l);
  const th = l === "th" ? caseContentTh[c.id] : undefined;
  return {
    title: th?.seoTitle ?? `${loc.title} | ETIA Thailand`,
    description: th?.metaDescription ?? loc.overview,
    keywords: th?.keywords ?? c.keywords,
    alternates: {
      canonical: `${SITE}/th/${l}/case-studies/${slug}`,
      languages: {
        th: `${SITE}/th/th/case-studies/${slug}`,
        en: `${SITE}/th/en/case-studies/${slug}`,
        zh: `${SITE}/th/zh/case-studies/${slug}`,
        "x-default": `${SITE}/th/th/case-studies/${slug}`,
      },
    },
  };
}

export default async function ThailandCaseDetail({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang, slug } = await params;
  const l: ThLocale = isThLocale(lang) ? lang : "th";
  const c = findCase(slug);
  if (!c) notFound();

  const a = getCaseDict(l);
  const d = getDict(l);
  const loc = localizeCase(c, l);
  const th = l === "th" ? caseContentTh[c.id] : undefined;

  const title = th?.title ?? loc.title;
  const overview = th?.overview ?? loc.overview;
  const challenge = th?.challenge ?? loc.challenge;
  const solution = th?.solution ?? loc.solution;
  const benefits = th?.benefits ?? loc.benefits;
  const marketContext = th?.marketContext ?? loc.marketContext;

  const Section = ({ label, body }: { label: string; body?: string }) =>
    body ? (
      <section>
        <h2 className="text-sm font-bold uppercase tracking-wide text-gray-400 mb-1">{label}</h2>
        <p className="text-gray-700 leading-relaxed">{body}</p>
      </section>
    ) : null;

  return (
    <article className="py-12 md:py-16 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link href={`/th/${l}#case-studies`} className="text-sm font-medium text-gray-500 hover:text-[#1A56DB]">
          {a.back}
        </Link>

        <p className="mt-6 text-xs font-semibold uppercase tracking-wide" style={{ color: "#44B549" }}>{c.sector}</p>
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight mt-1 mb-4">{title}</h1>

        <div className="rounded-xl border border-gray-100 bg-gray-50 p-5 mb-8">
          <p className="text-2xl font-bold" style={{ color: "#1A56DB" }}>{c.metric}</p>
          <p className="text-sm text-gray-500">{c.metricLabel}</p>
        </div>

        <div className="space-y-6">
          <Section label={a.overview} body={overview} />
          <Section label={a.challenge} body={challenge} />
          <Section label={a.solution} body={solution} />
          {benefits && benefits.length > 0 && (
            <section>
              <h2 className="text-sm font-bold uppercase tracking-wide text-gray-400 mb-1">{a.benefit}</h2>
              <ul className="list-disc pl-5 space-y-1 text-gray-700">
                {benefits.map((b, i) => (
                  <li key={i}>{b}</li>
                ))}
              </ul>
            </section>
          )}
          <Section label={a.marketContext} body={marketContext} />
        </div>

        <div className="mt-10">
          <a
            href={thMailto(l, { subject: "Thailand Case Study Inquiry", context: title })}
            className="inline-block text-sm font-semibold text-white rounded px-5 py-2.5 hover:opacity-90"
            style={{ background: "#1A56DB" }}
          >
            {d.hero.cta} →
          </a>
        </div>
      </div>
    </article>
  );
}
