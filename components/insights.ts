// Insights (blog) content loader. Articles are authored as Markdown files in
// content/insights/ using the naming convention <slug>.<locale>.md
// (e.g. uv-curing-for-cpo.en.md and the optional uv-curing-for-cpo.zh.md).
// This module is server-only (it reads the filesystem at build time) — import
// it from Server Components / route files, never from a "use client" module.
import fs from "node:fs";
import path from "node:path";
import { marked } from "marked";

marked.setOptions({ gfm: true, breaks: false });

const DIR = path.join(process.cwd(), "content", "insights");
const FILE_RE = /^(.+)\.(en|zh)\.md$/;

export type ArticleLocaleContent = {
  title: string;
  description: string;
  html: string; // rendered Markdown body
};

export type Article = {
  slug: string;
  date: string; // ISO yyyy-mm-dd
  tags: string[];
  author: string;
  cover?: string;
  readingMinutes: number;
  locales: { en: ArticleLocaleContent; zh?: ArticleLocaleContent };
};

type Frontmatter = {
  title?: string;
  description?: string;
  date?: string;
  tags?: string[];
  author?: string;
  cover?: string;
};

// Minimal, dependency-free frontmatter parser. Supports:
//   key: value          → string (quotes optional)
//   tags: [a, b, c]      → string[]
function parseFrontmatter(raw: string): { data: Frontmatter; body: string } {
  const m = /^---\s*\n([\s\S]*?)\n---\s*\n?([\s\S]*)$/.exec(raw);
  if (!m) return { data: {}, body: raw };
  const data: Record<string, string | string[]> = {};
  for (const line of m[1].split("\n")) {
    const kv = /^([A-Za-z0-9_]+)\s*:\s*(.*)$/.exec(line.trim());
    if (!kv) continue;
    const key = kv[1];
    let val = kv[2].trim();
    if (val.startsWith("[") && val.endsWith("]")) {
      data[key] = val
        .slice(1, -1)
        .split(",")
        .map((s) => s.trim().replace(/^["']|["']$/g, ""))
        .filter(Boolean);
    } else {
      data[key] = val.replace(/^["']|["']$/g, "");
    }
  }
  return { data: data as Frontmatter, body: m[2] };
}

function readLocale(file: string): { fm: Frontmatter; content: ArticleLocaleContent } {
  const raw = fs.readFileSync(path.join(DIR, file), "utf8");
  const { data, body } = parseFrontmatter(raw);
  return {
    fm: data,
    content: {
      title: data.title ?? "",
      description: data.description ?? "",
      html: marked.parse(body) as string,
    },
  };
}

function wordCount(md: string): number {
  return md.split(/\s+/).filter(Boolean).length;
}

let cache: Article[] | null = null;

// All published articles, newest first. English (.en.md) is required per slug;
// the .zh.md file is optional and merged in when present.
export function getAllArticles(): Article[] {
  if (cache) return cache;
  let files: string[] = [];
  try {
    files = fs.readdirSync(DIR);
  } catch {
    return (cache = []);
  }

  const bySlug = new Map<string, { en?: string; zh?: string }>();
  for (const f of files) {
    const m = FILE_RE.exec(f);
    if (!m) continue;
    const [, slug, loc] = m;
    const entry = bySlug.get(slug) ?? {};
    entry[loc as "en" | "zh"] = f;
    bySlug.set(slug, entry);
  }

  const articles: Article[] = [];
  for (const [slug, entry] of bySlug) {
    if (!entry.en) continue; // English is the canonical source
    const en = readLocale(entry.en);
    const zh = entry.zh ? readLocale(entry.zh) : null;
    const rawEnBody = fs.readFileSync(path.join(DIR, entry.en), "utf8");
    articles.push({
      slug,
      date: en.fm.date ?? "",
      tags: en.fm.tags ?? [],
      author: en.fm.author ?? "ETIA Technology",
      cover: en.fm.cover || undefined,
      readingMinutes: Math.max(1, Math.round(wordCount(rawEnBody) / 200)),
      locales: { en: en.content, ...(zh ? { zh: zh.content } : {}) },
    });
  }

  articles.sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0));
  return (cache = articles);
}

export function getArticle(slug: string): Article | undefined {
  return getAllArticles().find((a) => a.slug === slug);
}

// Locale content with graceful fallback to English.
export function articleContent(a: Article, locale: "en" | "zh" | "vi" | "th"): ArticleLocaleContent {
  return (locale === "zh" && a.locales.zh) || a.locales.en;
}

const SITE = "https://www.etiatech.com";

export function articleJsonLd(a: Article) {
  const c = a.locales.en;
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: c.title,
    description: c.description,
    ...(a.cover ? { image: a.cover } : {}),
    datePublished: a.date,
    dateModified: a.date,
    author: { "@type": "Organization", name: a.author },
    publisher: {
      "@type": "Organization",
      name: "ETIA Technology",
      logo: {
        "@type": "ImageObject",
        url: "https://etiatech-1303055923.cos.ap-singapore.myqcloud.com/IMAGE/logo/ETIALOGO.jpg",
      },
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": `${SITE}/insights/${a.slug}` },
    keywords: a.tags.join(", "),
  };
}

export function articleBreadcrumbJsonLd(a: Article) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE },
      { "@type": "ListItem", position: 2, name: "Insights", item: `${SITE}/insights` },
      { "@type": "ListItem", position: 3, name: a.locales.en.title, item: `${SITE}/insights/${a.slug}` },
    ],
  };
}
