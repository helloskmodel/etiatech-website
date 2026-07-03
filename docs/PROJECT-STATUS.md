# Project Status & Handoff

Snapshot of the ETIA Technology website — what's shipped, what's in flight, and
what's pending. Pair this with **`docs/SEO.md`** (SEO strategy + roadmap).

_Last updated: 2026-07-03._

---

## 1. What this is

ETIA Technology — B2B distributor of UV curing equipment (Excelitas brands:
**OmniCure®, Phoseon®, Fusion UV®, Noblelight®**) for Asia-Pacific (esp.
Vietnam, Thailand, China).

**Stack:** Next.js 16 App Router · React 19 · TypeScript · Tailwind v4 · Vercel
· Tencent COS (images/PDFs). SSG-first, JSON-LD, bilingual **EN/ZH** (data-ready
for VN/TH). No CMS/DB — content lives in typed `.ts` files.

**Workflow:** develop on branch `claude/product-image-assets-30ar7q` → build →
commit → PR → squash/merge → resync from `main`.

---

## 2. In flight — **PR #71 (open, needs merge)**

The current branch bundles this session's work. **Merge it first** before
starting new work or a new session, so `main` has everything (incl. the docs).

- Case cards & application cards **navigate straight to landing pages** — the
  pop-up modals are removed (`CaseStudyModal` deleted).
- **Six canonical UV technologies** — single source of truth
  (`TECH_ROUTES` + `techRouteFor` in `productCatalog.ts`), EN + ZH, used on
  every case/application/product page and card. See `docs/SEO.md` §2.
- **Brand · Product · Technology SEO tickets** on all 72 landing pages
  (industry + application point were already there). Accessories filtered out
  of case-study product tickets. Terms folded into JSON-LD keywords.
- Added `docs/SEO.md` and this file.

---

## 3. Shipped (merged to `main`)

Landing-page SEO architecture and many polish passes are already live:

- **Individual landing pages** — `/application/[slug]` (62 notes),
  `/case-studies/[slug]` (10) — each indexable with JSON-LD, canonical, OG
  (PR #70). _Note: #70 merged with modals still on; PR #71 removes them._
- **Products** — `/product`, `/product/systems` (by technology),
  `/product/[brand]` shop pages, `/product/systems/[slug]` detail pages.
- Brand pages redesigned as **shop grids** (popularity order, feature tags,
  Popular badges) — PR #65–67.
- **Product taglines** from official datasheets (PR #68).
- **Pre-filled inquiry emails** on every CTA; sitemap dropped misleading
  `lastModified` (PR #69).
- Bilingual EN/ZH throughout (legal pages, spec labels, hero headlines, copy) —
  PR #54, #56, #58.
- Data/branding fixes: NobleLight chips + DRF brand (#61), product-landing
  grouping (#62), Lamp/LED spot split (#63), S2000 image (#64).
- Product images + TH/VN authorized-distributor certificates on Contact
  (#59, #60).
- Insights blog removed from nav/footer/sitemap — deferred (#57).

---

## 4. Pending / backlog

**Waiting on the user:**
- **Product datasheet PDFs** — user will upload to COS and send links → then add
  "Download Datasheet (PDF)" buttons on product pages, and roll feature
  tags/taglines to the non-OmniCure brands.
- **Homepage "News" strip** — deferred until the user prepares 3+ news pieces
  (chosen over the removed Insights blog; good for SEO freshness).

**SEO roadmap (see `docs/SEO.md` §4 for detail):**
1. **`/technology/[route]` hub pages** — one indexable page per canonical
   technology (the six `id`s are ready). Highest-priority SEO play.
2. Faceted product discovery (find products by technology/industry/brand tags).
3. Metadata polish (keyword-targeted titles/descriptions, OG images).
4. Organization/LocalBusiness JSON-LD; FAQ schema where relevant.
5. `hreflang` when VN/TH activate.

**Other open threads:**
- **VN/TH language activation** — i18n architecture is ready
  (`ACTIVE_LOCALES`), needs the translated data.
- Possible cleanup: whether to keep `/product/systems` as an entry point
  (proposed earlier, not decided).
- Distributor **OmniCure catalog** (VN + TH English brochures) were generated as
  standalone HTML and delivered to the user — not part of the site repo.

---

## 5. Standing constraints (MUST follow)

- **Emails:** sales `mark_tang@etia-tech.com`; service `guoren_wang@etia-tech.com`.
  **Never** `support@etiatech.com`.
- Bilingual **EN/ZH** via `t()`/`LangText`; keep structured for VN/TH.
- Push only to `claude/product-image-assets-30ar7q` unless told otherwise.
- Don't put the model identifier in commits/PRs/code.

---

## 6. Key files

| Area | File(s) |
|------|---------|
| Technology taxonomy (source of truth) | `components/productCatalog.ts` — `TECH_ROUTES`, `techRouteFor`, `productModel` |
| Product catalog | `components/productCatalog.ts` (+ `.zh`) |
| Application notes (62) | `components/applicationNotes.ts` (+ `.zh`) |
| Case studies (10) | `components/caseStudies.ts` (+ `.zh`) |
| Product ↔ app/case matching | `components/productApplications.ts` |
| Landing pages | `app/application/[slug]/` + `AppNoteView.tsx`; `app/case-studies/[slug]/` + `CaseStudyPageView.tsx` |
| Product listings | `SystemsIndexView.tsx`, `BrandLandingView.tsx`, `ProductDetailView.tsx` |
| Crawl infra | `app/sitemap.ts`, `app/robots.ts` |
| SEO plan | `docs/SEO.md` |

---

## 7. Starting a new (SEO) session

1. **Merge PR #71** so `main` has all the work + docs.
2. Open the new session, then: _"Read `docs/PROJECT-STATUS.md` and `docs/SEO.md`,
   then let's build the `/technology/[route]` hub pages."_
3. If the new session starts from `main`, it needs #71 merged first. If it
   continues on `claude/product-image-assets-30ar7q`, everything is already there.
