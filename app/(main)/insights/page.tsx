import type { Metadata } from "next";
import { getArticleCards, insightsIndexMetadata } from "@/components/insights";
import InsightsIndexView, { type ArticleCard } from "@/components/InsightsIndexView";

export const metadata: Metadata = insightsIndexMetadata("en");

export default function InsightsPage() {
  return <InsightsIndexView articles={getArticleCards() as ArticleCard[]} />;
}
