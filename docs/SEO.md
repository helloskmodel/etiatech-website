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
- **i18n:** Bilingual **EN / ZH** via cookie + `t()`/`LangText`. Data is
  structured so **VN/TH** can be added later (`ACTIVE_LOCALES = ["en","zh"]`).
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
  - `/application/[slug]` — 62 application notes. `TechArticle` +
    `BreadcrumbList` JSON-LD, canonical, OpenGraph. Four-tag taxonomy:
    industry / application point / UV technology / UV brand.
  - `/case-studies/[slug]` — 10 case studies. `Article` + `BreadcrumbList`
    JSON-LD. Brand + UV-technology **stickers** derived from the systems each
    case uses (`brandsForCase` / `techRoutesForCase`).
- **Product pages:**
  - `/product` (landing), `/product/systems` (grouped by the 6 technologies +
    Accessories), `/product/[brand]` (shop grid), `/product/systems/[slug]`
    (detail, `Product` + `Breadcrumb` JSON-LD).
- **Discovery:** cards on `/application`, the case grid, and the home strip
  navigate **straight to landing pages** (every click = an indexable URL) and
  show a compact brand + technology hint.
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
9. **Multilingual SEO** — `hreflang` when VN/TH activate.

---

## 5. Standing constraints (MUST follow)

- **Emails:** sales = `mark_tang@etia-tech.com`; service/repair =
  `guoren_wang@etia-tech.com`. **Never** use `support@etiatech.com`.
- **Bilingual EN/ZH** via `t()`/`LangText`; keep structured for VN/TH later.
- **Dev branch:** `claude/product-image-assets-30ar7q`. Don't push elsewhere
  without permission. Each task: implement → build → commit → PR → merge.
- Do **not** put the model identifier in commits, PRs, or code.

---

## 6. File map

| Area | Files |
|------|-------|
| Technology taxonomy (source of truth) | `components/productCatalog.ts` (`TECH_ROUTES`, `techRouteFor`) |
| Product catalog | `components/productCatalog.ts` (+ `.zh`) |
| Application notes (62) | `components/applicationNotes.ts` (+ `.zh`); `appSlug`/`getAppBySlug` |
| Case studies (10) | `components/caseStudies.ts` (+ `.zh`); `caseSlug`/`getCaseBySlug` |
| Product ↔ app/case matching | `components/productApplications.ts` (`brandsForCase`, `techRoutesForCase`, `productForAppNote`) |
| App-note page | `app/application/[slug]/page.tsx` + `components/AppNoteView.tsx` |
| Case-study page | `app/case-studies/[slug]/page.tsx` + `components/CaseStudyPageView.tsx` |
| Product listings | `components/SystemsIndexView.tsx`, `BrandLandingView.tsx`, `ProductDetailView.tsx` |
| Crawl infra | `app/sitemap.ts`, `app/robots.ts` |

---

## 7. Current state

- Open **PR #71** (branch `claude/product-image-assets-30ar7q`) bundles: modal
  removal → landing-page navigation, brand + technology stickers, the 6-tech
  canonical taxonomy (EN + ZH, all with "System"/"系统"). **Merge to deploy.**
- Pending (user): upload product PDFs to COS + send links → add datasheet
  buttons. "News" section deferred until 3+ pieces are ready.
