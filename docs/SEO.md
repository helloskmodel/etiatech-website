# SEO Strategy & Handoff

Working doc for the ETIA Technology website SEO effort. Read this first when
starting an SEO session — it captures what's built, the keyword foundation, and
the prioritized roadmap.

---

## 1. Site at a glance

- **Business:** ETIA Technology — B2B distributor of UV curing equipment
  (Excelitas brands: **OmniCure®, Phoseon®, Fusion UV®, Noblelight®**).
  Territories: Asia-Pacific (esp. Vietnam, Thailand, China).
- **Stack:** Next.js 16 App Router · React 19 · TypeScript · Tailwind v4 ·
  Vercel · Tencent COS (images/PDFs). **SSG-first** (static pages, JSON-LD).
- **i18n:** Four locales — **EN / ZH / VI / TH**. EN is unprefixed; the others
  live under `/zh`, `/vi`, `/th` and are hreflang-linked to each other.
- **No CMS/DB** — all content lives in typed `.ts` data files.

---

## 2. Keyword foundation — the 6 canonical UV technologies

**Single source of truth:** `components/productCatalog.ts` →
`TECH_ROUTES` + `techRouteFor(product)`. Every product maps to exactly one of
these six (or "Accessories"). Use these **exact** names everywhere and as the
primary SEO keyword set. Each has a stable `id` for future URLs.

| # | `id` | English | 中文 | Products |
|---|------|---------|------|----------|
| 1 | `uv-lamp-spot-curing` | UV Lamp Spot Curing System | UV 灯点光源固化系统 | 2 |
| 2 | `uv-led-spot-curing` | UV LED Spot Curing System | UV LED 点光源固化系统 | 3 |
| 3 | `air-cooled-uv-led-large-area-curing` | Air-Cooled UV LED Large Area Curing System | 风冷 UV LED 大面积固化系统 | 11 |
| 4 | `air-cooled-uv-led-small-area-curing` | Air-Cooled UV LED Small Area Curing System | 风冷 UV LED 小面积固化系统 | 6 |
| 5 | `water-cooled-uv-led-large-area-curing` | Water-Cooled UV LED Large Area Curing System | 水冷 UV LED 大面积固化系统 | 9 |
| 6 | `microwave-uv-curing` | Microwave UV Curing System | 微波 UV 固化系统 | 4 |

Accessories (radiometers, light guides, network module) → no technology tag.

To change a name, edit **only** `TECH_ROUTES` — it propagates to every page and
card automatically.

---

## 3. SEO architecture already in place

- **Individual landing pages** (each on its own indexable URL, no modals):
  - `/applications/[slug]` — 18 published application notes, in all four
    locales. `TechArticle` + `BreadcrumbList` JSON-LD, canonical, OpenGraph.
  - `/solutions/[slug]` — 6 industry pages (optical modules, optical fibre,
    semiconductor, automotive, medical device, scientific instruments).
  - `/insights/[slug]` — knowledge articles from `content/insights/*.md`, per
    locale, with a real publish date as `lastModified`.
  - `/case-studies/[slug]` — **withdrawn**: `noindex, nofollow`, unlinked, and
    out of the sitemap. See the diagnosis log in §8 before changing this.
- **Product pages:** `/product` (hub), `/product/technology/[slug]` (by
  technology), `/product/[brand]` (shop grid), `/product/systems/[slug]`
  (detail, `Product` + `Breadcrumb` JSON-LD), `/consumables[/machine]`
  (part-number searches).
- **Legacy URLs:** `/application/*`, `/industries/*`, `/en/*` and the retired
  country landing pages all 308 — see `next.config.ts` and
  `components/legacyApplicationRedirects.ts`. The `app/(main)/application/`
  route still exists in the tree but is unreachable: redirects are matched
  before the filesystem.
- **Infra:** `app/sitemap.ts` (all pages), `app/robots.ts`. Pre-filled inquiry
  `mailto:` CTAs (`components/contact.ts`).

---

## 4. SEO roadmap — the journey (prioritized)

1. **Technology hub pages `/technology/[route]`** — one indexable page per
   canonical technology (6 pages). The strongest play for the 6 keywords. Each:
   H1 = the exact name, intro, products in that route, related applications +
   cases, CTA, `CollectionPage`/`ItemList` JSON-LD. The `id`s are already
   stable slugs, ready to become these URLs. Add to sitemap + internal links.
2. **Faceted product discovery** — let products be found by a few tags
   (technology + industry + brand). Filtered `/product` views or tag pages.
3. **Metadata polish** — keyword-targeted `title`/`description` templates on
   every route; verify canonical everywhere; per-page OG images.
4. **Internal linking graph** — cross-link technology ↔ product ↔ application ↔
   case study (partly done; hub pages complete the graph).
5. **Organization / LocalBusiness JSON-LD** — distributor entity, territories,
   authorized-distributor status. `FAQPage` where relevant.
6. **Freshness signal** — homepage "News/Insights" strip (deferred until 3+
   pieces are ready) for a regular publishing cadence.
7. **Datasheets** — "Download Datasheet (PDF)" buttons once the COS PDF links
   are provided (engagement + dwell time).
8. **Core Web Vitals** — audit LCP/CLS on key templates.
9. ~~**Multilingual SEO** — `hreflang` when VN/TH activate.~~ **Done** — all
   four locales ship reciprocal hreflang, enforced by `validate:seo`.

---

## 5. Standing constraints (MUST follow)

- **Emails:** sales = `sales@etia-tech.com`; service/repair =
  `guoren_wang@etia-tech.com`. **Never** use `support@etiatech.com`.
- **Four locales (EN/ZH/VI/TH)** via `t()`/`LangText`; keep every locale's
  hreflang group reciprocal.
- **Dev branch:** whichever branch the task assigns. Don't push elsewhere
  without permission. Each task: implement → build → validate → commit → PR.
- **Never break a redirect's topical match.** A retired URL must point at a page
  about the *same subject*. Many-to-one redirects onto an index page are read by
  Google as soft 404s and the old URL is dropped, losing everything it ranked
  for. See `components/legacyApplicationRedirects.ts`.
- Do **not** put the model identifier in commits, PRs, or code.

---

## 6. File map

| Area | Files |
|------|-------|
| Technology taxonomy (source of truth) | `components/productCatalog.ts` (`TECH_ROUTES`, `techRouteFor`) |
| Product catalog | `components/productCatalog.ts` (+ `.zh`) |
| Application notes (live, 18) | `data/applicationsData.js` (+ `.zh.ts`) |
| Application notes (retired 62) | `components/applicationNotes.ts` (+ `.zh`) — content kept for reference; the route is redirected |
| Legacy URL map | `components/legacyApplicationRedirects.ts` |
| Case studies (10, withdrawn) | `components/caseStudies.ts` (+ `.zh`); `caseSlug`/`getCaseBySlug` |
| Product ↔ app/case matching | `components/productApplications.ts` (`brandsForCase`, `techRoutesForCase`, `productForAppNote`) |
| App-note page | `app/application/[slug]/page.tsx` + `components/AppNoteView.tsx` |
| Case-study page | `app/case-studies/[slug]/page.tsx` + `components/CaseStudyPageView.tsx` |
| Product listings | `components/SystemsIndexView.tsx`, `BrandLandingView.tsx`, `ProductDetailView.tsx` |
| Crawl infra | `app/sitemap.ts`, `app/robots.ts`, `next.config.ts` (redirects) |
| SEO validation | `scripts/validate-seo.mjs`, `scripts/validate-legacy-redirects.mjs` |

---

## 7. Validation (run these before every SEO push)

Build and start the site (`npm run build && npm start`), then:

| Command | Checks |
|---------|--------|
| `npm run validate:seo` | sitemap is valid XML; every URL 200s exactly once; self-referencing canonicals; no noindex in the sitemap; reciprocal hreflang groups; **every `<image:loc>` absolute and resolving**; no off-site URLs |
| `npm run validate:redirects` | every legacy `/application/[slug]` 308s to the destination the map declares, and that destination 200s |
| `npm run validate:i18n` | locale files carry the same keys |

---

## 8. Diagnosis log — 2026-09-14 impression drop

Search Console showed impressions falling away over 2026-09-07 → 09-14, the week
of the #240–#253 restructure. Three distinct causes, two now fixed:

1. **Sitemap rejected as invalid (fixed).** 21 of the 135 `<image:loc>` entries
   were site-relative paths (`/images/infrared/...`) because `productImage()`
   returns a relative path for photos stored in the repo, and `app/sitemap.ts`
   emitted it verbatim. Search Console reported "sitemap is readable, but has
   errors → Invalid URL". Fixed by absolutizing in `app/sitemap.ts`
   (`absoluteUrl()`); the same fix went into `productJsonLd()`. `validate:seo`
   now fails on any relative or non-resolving image URL.

2. **62 indexed URLs redirected onto a generic index (fixed).** The old
   `/application/[slug]` notes were all sent to `/applications` by one
   `/application/:path*` catch-all. Google treats that as a soft 404 — the URLs
   are dropped rather than passing their ranking signals on, and they appear
   under "Page with redirect". 59 of the 62 are now mapped one-to-one to the
   live page on the same subject (`components/legacyApplicationRedirects.ts`);
   the remaining 3 are aerospace notes with no live equivalent yet.

3. **24 case-study URLs withdrawn (open decision, NOT reversed).** All
   `/case-studies` pages went `noindex, nofollow`, were unlinked, and left the
   sitemap (205 → 238 URLs overall, but these 24 were removed). They were
   deliberately withdrawn, so nothing was changed here — but they are indexed
   pages taken off the board, and they account for the largest single block of
   lost impressions. Decide whether the withdrawal is permanent: if it is, the
   pages should 301 to their closest live equivalent rather than sit on
   `noindex`; if not, restore them to the sitemap.

**Still to do (needs the site owner):** resubmit `sitemap.xml` in Search Console
once the sitemap fix is deployed, then use the URL Inspection tool on a few of
the remapped `/application/...` URLs to get them recrawled.
