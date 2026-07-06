import type { Metadata } from "next";
import Link from "next/link";
import { marketApps } from "@/components/markets";
import { localizeApp, localizeIndustry, appSlug, type App } from "@/components/applicationNotes";
import { isThLocale, getAppDict, thIndustryLabel, type ThLocale } from "../../dictionaries";
import { appContentTh } from "../../appContentTh";

const SITE = "https://www.etiatech.com";

function industryLabel(industry: string, l: ThLocale): string {
  if (l === "th") return thIndustryLabel(industry, l);
  if (l === "zh") return localizeIndustry(industry, "zh");
  return industry;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const l: ThLocale = isThLocale(lang) ? lang : "th";
  const a = getAppDict(l);
  return {
    title: `${a.heading} | ETIA Thailand`,
    description: a.subheading,
    alternates: {
      canonical: `${SITE}/th/${l}/application`,
      languages: {
        th: `${SITE}/th/th/application`,
        en: `${SITE}/th/en/application`,
        zh: `${SITE}/th/zh/application`,
        "x-default": `${SITE}/th/th/application`,
      },
    },
  };
}

export default async function ThailandApplications({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const l: ThLocale = isThLocale(lang) ? lang : "th";
  const a = getAppDict(l);

  // Group the scoped apps by industry, preserving catalog order.
  const scoped = marketApps("th");
  const byIndustry = new Map<string, App[]>();
  for (const app of scoped) {
    const arr = byIndustry.get(app.industry) ?? [];
    arr.push(app);
    byIndustry.set(app.industry, arr);
  }

  return (
    <section className="py-14 md:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-3" style={{ color: "#1A3DAD" }}>
          {a.heading}
        </h1>
        <p className="text-gray-500 max-w-2xl mb-12">{a.subheading}</p>

        <div className="space-y-12">
          {[...byIndustry.entries()].map(([industry, list]) => (
            <div key={industry}>
              <div className="flex items-center gap-3 mb-5 pb-2 border-b border-gray-100">
                <span className="w-2.5 h-2.5 rounded-full" style={{ background: "#4CAF3E" }} />
                <h2 className="text-lg font-bold text-gray-800">{industryLabel(industry, l)}</h2>
                <span className="text-xs text-gray-400">({list.length})</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {list.map((app) => {
                  const loc = localizeApp(app, l);
                  const th = l === "th" ? appContentTh[app.id] : undefined;
                  return (
                    <Link
                      key={app.id}
                      href={`/th/${l}/application/${appSlug(app)}`}
                      className="group rounded-xl border border-gray-100 shadow-sm hover:shadow-md hover:border-[#1A3DAD] transition-all p-5 flex flex-col"
                    >
                      <p className="text-xs font-semibold text-gray-400 mb-1">{app.subCategory}</p>
                      <h3 className="text-base font-bold text-gray-800 group-hover:text-[#1A3DAD] mb-2">
                        {th?.title ?? loc.title}
                      </h3>
                      <p className="text-sm text-gray-500 line-clamp-3 flex-1">{th?.challenge ?? loc.challenge}</p>
                      <p className="mt-3 text-xs font-semibold" style={{ color: app ? "#1A3DAD" : undefined }}>
                        {app.recommended}
                      </p>
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
