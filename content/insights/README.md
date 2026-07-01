# Insights — Weekly Article Workflow

This folder holds the source for the **Insights** section (`/insights`). Every
Markdown file here becomes a statically-generated, SEO-optimized article page.
Adding an article requires **no code changes** — drop the file(s), open a PR,
merge, and it publishes (and is added to `sitemap.xml`) automatically.

## 1. File naming

```
content/insights/<slug>.<locale>.md
```

- `<slug>` becomes the URL: `<slug>.en.md` → `https://www.etiatech.com/insights/<slug>`
- `<locale>` is `en` (required) or `zh` (optional).
- Use a short, keyword-rich, hyphenated slug: `uv-curing-for-co-packaged-optics`.
- The **English file is required**; the Chinese file is optional. If `zh` is
  missing, Chinese visitors see the English article with a short notice.
- Keep the same `slug` and `date` across the `.en` and `.zh` files.

## 2. Frontmatter (the `---` header)

```markdown
---
title: "Headline — keep it under ~60 characters for SEO"
description: "1–2 sentence meta description, ~150 characters. Shown in search results and on the card."
date: 2026-07-01
tags: [Photonics, UV Curing, AI Data Center]
author: ETIA Technology
cover: https://etiatech-1303055923.cos.ap-singapore.myqcloud.com/IMAGE/.../cover.png
---
```

| Field | Required | Notes |
|-------|----------|-------|
| `title` | ✅ | Page `<title>`, H1, and Article headline. |
| `description` | ✅ | Meta description + card summary. |
| `date` | ✅ | `YYYY-MM-DD`. Controls sort order (newest first) and `datePublished`. |
| `tags` | recommended | `[A, B, C]`. First 3 show on the card. Also become SEO keywords. |
| `author` | optional | Defaults to `ETIA Technology`. |
| `cover` | optional | Full image URL (upload to the COS bucket). Falls back to a branded gradient. |

## 3. Writing the body

Standard Markdown below the frontmatter: `##`/`###` headings, lists, **bold**,
`> blockquotes`, tables, images `![alt](url)`, and links.

**Internal links are important for SEO** — link to products and applications:

- Products: `[OmniCure LX500 V2](/product/systems/lx500)` or a brand page `/product/omnicure`
- Applications: `[case study](/application#AN-PHO-002)` (deep-links open that note)
- Contact: `[Talk to our engineers](mailto:mark_tang@etia-tech.com?subject=Inquiry)`

Start the body with a strong opening paragraph — no top-level `#` heading (the
`title` already renders as the H1). Use `##` for section headings.

## 4. Publish

1. Add `<slug>.en.md` (and optionally `<slug>.zh.md`).
2. Open a PR against `main`.
3. On merge, the article is live at `/insights/<slug>` and included in the sitemap.

See `uv-curing-for-co-packaged-optics.en.md` / `.zh.md` as a complete example.
