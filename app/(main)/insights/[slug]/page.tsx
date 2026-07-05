import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllArticles, getArticle, articleJsonLd, articleBreadcrumbJsonLd } from "@/components/insights";
import ArticleView from "@/components/ArticleView";

export function generateStaticParams() {
  return getAllArticles().map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const a = getArticle(slug);
  if (!a) return { title: "Insights — ETIA Technology" };
  const c = a.locales.en;
  const url = `https://www.etiatech.com/insights/${a.slug}`;
  return {
    title: `${c.title} | ETIA Technology`,
    description: c.description,
    keywords: a.tags,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      title: c.title,
      description: c.description,
      url,
      publishedTime: a.date,
      ...(a.cover ? { images: [a.cover] } : {}),
    },
  };
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
