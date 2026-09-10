import type { Metadata } from "next";
import CaseStudiesIndexView from "@/components/CaseStudiesIndexView";
import { languageAlternates } from "@/components/localePageSeo";

const SITE = "https://www.etiatech.com";

export const metadata: Metadata = {
  title: "UV Curing Case Studies — OmniCure Applications | ETIA Technology",
  description:
    "ETIA UV Curing case studies: how OmniCure S2000 Elite, LX500 and AC Large solve real production challenges across medical, automotive, electronics, photonics and fiber manufacturing.",
  alternates: { canonical: `${SITE}/case-studies`, languages: languageAlternates("/case-studies") },
  // Withdrawn for now: unlinked, out of the sitemap, not indexed. The URLs
  // still resolve so nothing already indexed 404s.
  robots: { index: false, follow: false },
};

export default function CaseStudiesPage() {
  return <CaseStudiesIndexView />;
}
