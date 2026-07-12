// Insights (blog) content loader. Articles are authored as Markdown files in
// content/insights/ using the naming convention <slug>.<locale>.md
// (e.g. uv-curing-for-cpo.en.md and the optional uv-curing-for-cpo.zh.md).
// This module is server-only (it reads the filesystem at build time) — import
// it from Server Components / route files, never from a "use client" module.
import fs from "node:fs";
import path from "node:path";
import { marked } from "marked";
import type { Metadata } from "next";

marked.setOptions({ gfm: true, breaks: false });

const DIR = path.join(process.cwd(), "content", "insights");
const FILE_RE = /^(.+)\.(en|zh|vi|th)\.md$/;
type Loc = "en" | "zh" | "vi" | "th";

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
  locales: {
    en: ArticleLocaleContent;
    zh?: ArticleLocaleContent;
    vi?: ArticleLocaleContent;
    th?: ArticleLocaleContent;
  };
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

  const bySlug = new Map<string, Partial<Record<Loc, string>>>();
  for (const f of files) {
    const m = FILE_RE.exec(f);
    if (!m) continue;
    const [, slug, loc] = m;
    const entry = bySlug.get(slug) ?? {};
    entry[loc as Loc] = f;
    bySlug.set(slug, entry);
  }

  const articles: Article[] = [];
  for (const [slug, entry] of bySlug) {
    if (!entry.en) continue; // English is the canonical source
    const en = readLocale(entry.en);
    const rawEnBody = fs.readFileSync(path.join(DIR, entry.en), "utf8");
    const locales: Article["locales"] = { en: en.content };
    for (const loc of ["zh", "vi", "th"] as const) {
      if (entry[loc]) locales[loc] = readLocale(entry[loc]!).content;
    }
    articles.push({
      slug,
      date: en.fm.date ?? "",
      tags: en.fm.tags ?? [],
      author: en.fm.author ?? "ETIA Technology",
      cover: en.fm.cover || undefined,
      readingMinutes: Math.max(1, Math.round(wordCount(rawEnBody) / 200)),
      locales,
    });
  }

  articles.sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0));
  return (cache = articles);
}

export function getArticle(slug: string): Article | undefined {
  return getAllArticles().find((a) => a.slug === slug);
}

// Card payload for the index views — only the per-locale title/description are
// needed (not the rendered HTML body), so the client bundle stays small.
export function getArticleCards() {
  return getAllArticles().map((a) => {
    const locales: Record<string, { title: string; description: string }> = {
      en: { title: a.locales.en.title, description: a.locales.en.description },
    };
    for (const loc of ["zh", "vi", "th"] as const) {
      const c = a.locales[loc];
      if (c) locales[loc] = { title: c.title, description: c.description };
    }
    return {
      slug: a.slug,
      date: a.date,
      tags: a.tags,
      author: a.author,
      cover: a.cover,
      readingMinutes: a.readingMinutes,
      locales,
    };
  });
}

// Locale content with graceful fallback to English.
export function articleContent(a: Article, locale: "en" | "zh" | "vi" | "th"): ArticleLocaleContent {
  return (locale !== "en" && a.locales[locale]) || a.locales.en;
}

// Which locales this article has real (non-fallback) content for — used to
// build hreflang groups and per-locale sitemap entries.
export function articleLocales(a: Article): ("en" | "zh" | "vi" | "th")[] {
  return (["en", "zh", "vi", "th"] as const).filter((l) => a.locales[l]);
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
        url: "https://www.etiatech.com/logo/etia-tech.png",
      },
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": `${SITE}/insights/${a.slug}` },
    keywords: a.tags.join(", "),
  };
}

// ── SEO ──────────────────────────────────────────────────────────────────
type InsightLocale = "en" | "zh" | "vi" | "th";
const PREFIX: Record<InsightLocale, string> = { en: "", zh: "/zh", vi: "/vi", th: "/th" };
const OG_LOCALE: Record<InsightLocale, string> = { en: "en_US", zh: "zh_CN", vi: "vi_VN", th: "th_TH" };

// hreflang group for a path, listing only the locales that actually exist for
// it (reciprocal + identical across all members). en is x-default.
function insightHreflang(path: string, locales: InsightLocale[]): Record<string, string> {
  const langs: Record<string, string> = {};
  for (const l of locales) langs[l === "zh" ? "zh-Hans" : l] = `${SITE}${PREFIX[l]}${path}`;
  langs["x-default"] = `${SITE}${path}`;
  return langs;
}

const INDEX_META: Record<InsightLocale, { title: string; description: string }> = {
  en: {
    title: "Insights — UV Curing Guides & Analysis | ETIA Technology",
    description:
      "Technical guides, troubleshooting and application know-how for UV curing across photonics, medical, automotive and electronics manufacturing — from ETIA Technology.",
  },
  zh: {
    title: "UV固化技术洞察与应用指南 | ETIA Technology",
    description: "OmniCure UV固化系统的选型、故障排查与应用工艺指南——覆盖光电子、医疗、汽车与电子制造，由 ETIA 授权代理提供。",
  },
  vi: {
    title: "Kiến thức & Hướng dẫn UV Curing | ETIA Technology",
    description: "Hướng dẫn kỹ thuật, khắc phục sự cố và ứng dụng UV curing cho photonics, y tế, ô tô và điện tử — từ ETIA, nhà phân phối ủy quyền.",
  },
  th: {
    title: "ความรู้และคู่มือ UV Curing | ETIA Technology",
    description: "คู่มือเทคนิค การแก้ปัญหา และการใช้งาน UV curing สำหรับโฟโตนิกส์ การแพทย์ ยานยนต์ และอิเล็กทรอนิกส์ — จาก ETIA ตัวแทนจำหน่ายที่ได้รับอนุญาต",
  },
};

export function insightsIndexMetadata(locale: InsightLocale): Metadata {
  const m = INDEX_META[locale];
  return {
    title: m.title,
    description: m.description,
    alternates: {
      canonical: `${SITE}${PREFIX[locale]}/insights`,
      languages: insightHreflang("/insights", ["en", "zh", "vi", "th"]),
    },
    openGraph: { title: m.title, description: m.description, url: `${SITE}${PREFIX[locale]}/insights`, type: "website", locale: OG_LOCALE[locale] },
  };
}

export function insightsDetailMetadata(slug: string, locale: InsightLocale): Metadata {
  const a = getArticle(slug);
  if (!a) return { title: "UV Curing Insights — ETIA Technology" };
  const c = articleContent(a, locale);
  const url = `${SITE}${PREFIX[locale]}/insights/${slug}`;
  return {
    title: `${c.title} | ETIA Technology`,
    description: c.description,
    keywords: a.tags,
    alternates: { canonical: url, languages: insightHreflang(`/insights/${slug}`, articleLocales(a)) },
    openGraph: {
      type: "article",
      title: c.title,
      description: c.description,
      url,
      locale: OG_LOCALE[locale],
      publishedTime: a.date,
      ...(a.cover ? { images: [a.cover] } : {}),
    },
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
