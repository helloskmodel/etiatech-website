import type { Metadata } from "next";
import { getArticleCards, insightsIndexMetadata } from "@/components/insights";
import InsightsIndexView, { type ArticleCard } from "@/components/InsightsIndexView";
import LocalizedChrome from "@/components/LocalizedChrome";

export const metadata: Metadata = insightsIndexMetadata("th");

export default function InsightsThPage() {
  return (
    <LocalizedChrome locale="th">
      <InsightsIndexView articles={getArticleCards() as ArticleCard[]} />
    </LocalizedChrome>
  );
}
