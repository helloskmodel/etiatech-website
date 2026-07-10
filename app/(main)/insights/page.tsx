import type { Metadata } from "next";
import { getAllArticles } from "@/components/insights";
import InsightsIndexView, { type ArticleCard } from "@/components/InsightsIndexView";

export const metadata: Metadata = {
  title: "Insights — UV Curing Guides & Analysis | ETIA Technology",
  description:
    "Technical guides, market analysis and application know-how for UV curing across photonics, medical, automotive, electronics and industrial manufacturing — from ETIA Technology.",
  alternates: { canonical: "https://www.etiatech.com/insights" },
  openGraph: {
    type: "website",
    url: "https://www.etiatech.com/insights",
    siteName: "ETIA Technology",
    title: "Insights — UV Curing Guides & Analysis | ETIA Technology",
    description:
      "Technical guides, market analysis and application know-how for UV curing across photonics, medical, automotive, electronics and industrial manufacturing — from ETIA Technology.",
  },
};

export default function InsightsPage() {
  // Strip rendered HTML for the index payload — only card metadata is needed.
  const articles: ArticleCard[] = getAllArticles().map((a) => ({
    slug: a.slug,
    date: a.date,
    tags: a.tags,
    author: a.author,
    cover: a.cover,
    readingMinutes: a.readingMinutes,
    locales: {
      en: { title: a.locales.en.title, description: a.locales.en.description },
      ...(a.locales.zh ? { zh: { title: a.locales.zh.title, description: a.locales.zh.description } } : {}),
    },
  }));

  return <InsightsIndexView articles={articles} />;
}
