import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SOLUTIONS, getSolution, solutionApplications } from "@/components/solutions";
import SolutionLandingView from "@/components/SolutionLandingView";

const SITE = "https://www.etiatech.com";

export function generateStaticParams() {
  return SOLUTIONS.map((s) => ({ slug: s.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const s = getSolution(slug);
  if (!s) return { title: "Industry Solutions — ETIA Technology" };
  return {
    title: `${s.label.en} UV Curing Solutions — ${s.label.zh} | ETIA`,
    description: s.blurb.en.slice(0, 160),
    alternates: { canonical: `${SITE}/solutions/${s.id}` },
  };
}

export default async function SolutionPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const s = getSolution(slug);
  if (!s) notFound();

  const applications = solutionApplications(s);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Solutions", item: `${SITE}/solutions` },
          { "@type": "ListItem", position: 2, name: s.label.en, item: `${SITE}/solutions/${s.id}` },
        ],
      },
      ...(applications.length
        ? [{
            "@type": "ItemList",
            name: `UV curing applications in ${s.label.en}`,
            numberOfItems: applications.length,
            itemListElement: applications.map((a, i) => ({
              "@type": "ListItem",
              position: i + 1,
              name: a.title,
              url: `${SITE}/applications/${a.slug}`,
            })),
          }]
        : []),
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <SolutionLandingView solution={s} />
    </>
  );
}
