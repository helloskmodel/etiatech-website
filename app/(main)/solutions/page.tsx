import type { Metadata } from "next";
import { SOLUTIONS } from "@/components/solutions";
import SolutionsIndexView from "@/components/SolutionsIndexView";

const SITE = "https://www.etiatech.com";

export const metadata: Metadata = {
  title: "Industry Solutions — UV Curing by Industry | ETIA Technology",
  description:
    "UV curing solutions by industry: optical modules, semiconductor packaging, automotive interior, Class III medical devices and scientific instruments. Application-led system selection from ETIA.",
  alternates: { canonical: `${SITE}/solutions` },
};

export default function SolutionsIndexPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "UV curing industry solutions from ETIA Technology",
    numberOfItems: SOLUTIONS.length,
    itemListElement: SOLUTIONS.map((s, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: s.label.en,
      url: `${SITE}/solutions/${s.id}`,
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <SolutionsIndexView />
    </>
  );
}
