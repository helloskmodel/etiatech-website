import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllArticles, getArticle, articleJsonLd, articleBreadcrumbJsonLd, insightsDetailMetadata } from "@/components/insights";
import ArticleView from "@/components/ArticleView";

export function generateStaticParams() {
  return getAllArticles().map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  return insightsDetailMetadata(slug, "en");
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const a = getArticle(slug);
  if (!a) notFound();

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd(a)) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleBreadcrumbJsonLd(a)) }} />
      <ArticleView article={a} />
    </>
  );
}
