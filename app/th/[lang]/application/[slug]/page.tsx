import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { marketApps } from "@/components/markets";
import { localizeApp, appSlug } from "@/components/applicationNotes";
import { thMailto } from "../../../thContact";
import { isThLocale, getAppDict, getDict, type ThLocale } from "../../../dictionaries";
import { appContentTh } from "../../../appContentTh";

const SITE = "https://www.etiatech.com";

// Only the scoped Thailand applications are reachable under /th.
export const dynamicParams = false;
export function generateStaticParams() {
  return marketApps("th").map((a) => ({ slug: appSlug(a) }));
}

function findApp(slug: string) {
  return marketApps("th").find((a) => appSlug(a) === slug);
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}): Promise<Metadata> {
  const { lang, slug } = await params;
  const l: ThLocale = isThLocale(lang) ? lang : "th";
  const app = findApp(slug);
  if (!app) return {};
  const loc = localizeApp(app, l);
  const th = l === "th" ? appContentTh[app.id] : undefined;
  return {
    title: th?.seoTitle ?? `${loc.title} | ETIA Thailand`,
    description: th?.metaDescription ?? loc.intro,
    keywords: th?.keywords,
    alternates: {
      canonical: `${SITE}/th/${l}/application/${slug}`,
      languages: {
        th: `${SITE}/th/th/application/${slug}`,
        en: `${SITE}/th/en/application/${slug}`,
        zh: `${SITE}/th/zh/application/${slug}`,
        "x-default": `${SITE}/th/th/application/${slug}`,
      },
    },
  };
}

export default async function ThailandApplicationDetail({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang, slug } = await params;
  const l: ThLocale = isThLocale(lang) ? lang : "th";
  const app = findApp(slug);
  if (!app) notFound();

  const a = getAppDict(l);
  const d = getDict(l);
  const loc = localizeApp(app, l);
  // Thai pages render the Thailand team's landing-page copy; en/zh render the
  // full application note. Any Thai note without supplied copy falls back to
  // English with the pending-translation notice.
  const th = l === "th" ? appContentTh[app.id] : undefined;
  const title = th?.title ?? loc.title;
  const challenge = th?.challenge ?? loc.challenge;
  const highlights = th?.highlights ?? loc.highlights;
  const recommended = app.recommended;
  const showPending = l === "th" && !th;

  return (
    <article className="py-12 md:py-16 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link href={`/th/${l}/application`} className="text-sm font-medium text-gray-500 hover:text-[#1A56DB]">
          {a.back}
        </Link>

        <p className="mt-6 text-xs font-semibold uppercase tracking-wide" style={{ color: "#44B549" }}>
          {app.subCategory}
        </p>
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight mt-1 mb-4">{title}</h1>

        {showPending && (
          <p className="text-xs bg-amber-50 border border-amber-200 text-amber-800 rounded px-3 py-2 mb-6">
            {a.pendingTh}
          </p>
        )}

        <div className="space-y-6">
          <section>
            <h2 className="text-sm font-bold uppercase tracking-wide text-gray-400 mb-1">{a.challenge}</h2>
            <p className="text-gray-700 leading-relaxed">{challenge}</p>
          </section>

          {/* en/zh carry separate solution + benefit fields; Thai landing copy
              folds these into challenge + highlights, so only show when present. */}
          {!th && (
            <>
              <section>
                <h2 className="text-sm font-bold uppercase tracking-wide text-gray-400 mb-1">{a.solution}</h2>
                <p className="text-gray-700 leading-relaxed">{loc.solution}</p>
              </section>
              <section>
                <h2 className="text-sm font-bold uppercase tracking-wide text-gray-400 mb-1">{a.benefit}</h2>
                <p className="text-gray-700 leading-relaxed">{loc.benefit}</p>
              </section>
            </>
          )}

          {highlights?.length > 0 && (
            <ul className="list-disc pl-5 space-y-1 text-gray-700">
              {highlights.map((h, i) => (
                <li key={i}>{h}</li>
              ))}
            </ul>
          )}
        </div>

        <div className="mt-10 rounded-xl border border-gray-100 bg-gray-50 p-5">
          <p className="text-xs font-semibold uppercase tracking-wide text-gray-400 mb-1">{a.recommended}</p>
          <p className="text-lg font-bold" style={{ color: "#1A56DB" }}>{recommended}</p>
          <a
            href={thMailto(l, { subject: "Thailand Application Inquiry", context: `${title} — ${recommended}` })}
            className="mt-4 inline-block text-sm font-semibold text-white rounded px-5 py-2.5 hover:opacity-90"
            style={{ background: "#1A56DB" }}
          >
            {d.hero.cta} →
          </a>
        </div>
      </div>
    </article>
  );
}
