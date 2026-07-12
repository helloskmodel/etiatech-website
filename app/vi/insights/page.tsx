import type { Metadata } from "next";
import { getArticleCards, insightsIndexMetadata } from "@/components/insights";
import InsightsIndexView, { type ArticleCard } from "@/components/InsightsIndexView";
import LocalizedChrome from "@/components/LocalizedChrome";

export const metadata: Metadata = insightsIndexMetadata("vi");

export default function InsightsViPage() {
  return (
    <LocalizedChrome locale="vi">
      <InsightsIndexView articles={getArticleCards() as ArticleCard[]} />
    </LocalizedChrome>
  );
}
