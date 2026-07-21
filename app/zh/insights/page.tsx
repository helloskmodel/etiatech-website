import type { Metadata } from "next";
import { getArticleCards, insightsIndexMetadata } from "@/components/insights";
import InsightsIndexView, { type ArticleCard } from "@/components/InsightsIndexView";
import LocalizedChrome from "@/components/LocalizedChrome";

export const metadata: Metadata = insightsIndexMetadata("zh");

export default function InsightsZhPage() {
  return (
    <LocalizedChrome locale="zh">
      <InsightsIndexView articles={getArticleCards() as ArticleCard[]} />
    </LocalizedChrome>
  );
}
