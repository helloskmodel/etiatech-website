# Page Layout Standard — Hero · Trust Bar · CTA Bar

**The Home page (`components/HomeView.tsx`) is the single source of truth.**
Every top-level page — including future **Thailand** and **Vietnam** pages — must
follow this standard so the site reads as one system. Copy the class strings
below verbatim; do not invent new colors, spacings, or font sizes.

---

## 1. Section order (top to bottom)

```
<Nav>            ← global, do not change
1. HERO          ← light background + left copy + right panel
2. TRUST BAR     ← dark-blue strip, full width  (component: <TrustStrip/>)
   … page body sections …
3. CTA BAR       ← dark-blue centered call-to-action, near the footer
<Footer>         ← global, do not change
```

Every page has **exactly one** Hero, **one** Trust Bar directly under it, and
**one** CTA Bar just before the footer.

---

## 2. Color tokens (the only blues/greens allowed)

| Token | Hex | Use |
| --- | --- | --- |
| ETIA Blue (deep) | `#143C96` | H1, primary button, trust/CTA gradient start |
| Blue (bright) | `#1F63D6` | gradient end, hover |
| Brand Blue | `#1A56DB` | OmniCure accent, nav active, links |
| Blue (deep CTA) | `#123C94` | brand-page gradient end |
| Green (primary) | `#41A62A` | "Talk to an Engineer" button |
| Green (bright) | `#44B549` | eyebrow accents, check icons |
| Green (light) | `#8BE172` | check icons on blue backgrounds |
| Body text | `#667085` / `#5F6C7B` | paragraphs |
| Heading ink | `#102A43` | dark headings on light bg |

> ❌ **Never use `#0f2444` (dark navy).** It has been removed site-wide. All dark
> bands are the blue gradient `from-[#143C96] to-[#1F63D6]`.

---

## 3. HERO

**Two-column on desktop: copy on the left, a panel on the right.** Light
background. Same font sizes on every page.

### Wrapper
```tsx
<section className="relative overflow-hidden border-b border-[#D9E4EA] bg-gradient-to-br from-white via-[#EEF6FF] to-[#F1FAEF]">
  <div className="relative mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 md:py-24 lg:grid-cols-[1.05fr_.95fr] lg:items-center lg:px-8">
    <div> …LEFT COPY… </div>
    <div> …RIGHT PANEL… </div>
  </div>
</section>
```

### Left copy — fixed order & type scale
| Element | Classes |
| --- | --- |
| Eyebrow **pill badge** | `inline-flex items-center gap-2 rounded-full border border-[#41A62A]/20 bg-white px-3 py-1.5 text-xs font-bold text-[#41A62A] shadow-sm` + `<BadgeCheck className="h-4 w-4"/>` |
| H1 | `mt-6 max-w-4xl text-4xl font-bold leading-[1.08] tracking-tight text-[#143C96] md:text-6xl` (put the second phrase in `<span className="text-[#41A62A]">…</span>`) |
| Sub-paragraph | `mt-6 max-w-3xl text-base leading-7 text-[#667085] md:text-lg` |
| Button row | `mt-8 flex flex-col gap-3 sm:flex-row` |
| — Primary button | `inline-flex items-center justify-center gap-2 rounded-xl bg-[#143C96] px-6 py-3.5 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-[#1F63D6]` + `<ArrowRight className="h-4 w-4"/>` |
| — Secondary button (outline) | `inline-flex items-center justify-center rounded-xl border border-[#D4DFEC] bg-white px-6 py-3.5 text-sm font-bold text-[#143C96] transition hover:-translate-y-0.5 hover:border-[#143C96] hover:text-[#1F63D6]` |

> Do **not** add an in-hero checkmark row. Trust points live in the Trust Bar
> below (section 4), not inside the hero.

### Right panel — one fixed size on every page
```tsx
<div className="relative min-h-[410px] rounded-[32px] border border-white/80 bg-white/75 p-5 shadow-[0_25px_80px_rgba(20,60,150,.12)] backdrop-blur sm:p-8">
  … product image / carousel / technology selector …
</div>
```
- **Footprint is identical on every page:** `min-h-[410px]`, `rounded-[32px]`,
  `p-5 sm:p-8`, and it fills the `.95fr` column (**no `max-w-*` cap**).
- What goes *inside* can differ by page (Home = product carousel; brand pages =
  technology selector) — but the **panel box size stays the same**.

### Brand accent swap
Brand pages keep the same structure and swap the accent color only:
`#41A62A → brand green` for Phoseon, `#41A62A/#143C96 → #1A56DB` for OmniCure.
Font sizes, spacings, grid ratio, and panel size never change.

---

## 4. TRUST BAR  →  use the shared component

Rendered directly after the Hero. **Do not hand-roll it — import the component:**
```tsx
import TrustStrip from "@/components/TrustStrip";
…
</section>   {/* end Hero */}
<TrustStrip />
```

Spec (already implemented in `components/TrustStrip.tsx`):
- Wrapper: `bg-gradient-to-r from-[#143C96] to-[#1F63D6] px-4 py-5 text-white sm:px-6 lg:px-8`
- Grid: `mx-auto grid max-w-7xl gap-3 text-center text-xs font-bold sm:grid-cols-5 sm:text-sm`
- Item: `inline-flex items-center justify-center gap-2` + `<Check className="h-4 w-4 text-[#8BE172]"/>`
- **Standard content** (Home / Applications / Phoseon / Sales & Support / **TH / VI**):
  `Genuine Products · Application-Driven Solution · Local Supply Chain · Long-Term Service`

### Brand variant (OmniCure only)
Same dark-blue bar, brand-specific line instead of the 5 items:
```tsx
<section className="bg-gradient-to-r from-[#143C96] to-[#1F63D6] px-4 py-5 text-white sm:px-6 lg:px-8">
  <div className="mx-auto flex max-w-7xl flex-col items-center gap-3 text-center md:flex-row md:justify-between md:text-left">
    <p className="text-sm font-semibold">ETIA is an authorized distributor of OmniCure® products.</p>
    <div className="flex flex-wrap justify-center gap-4 text-xs font-semibold text-blue-100">
      {["Genuine Products","Official Supply Channel","Local Installation Support"].map((i)=>(
        <span key={i} className="inline-flex items-center gap-1.5"><BadgeCheck className="h-4 w-4 text-[#8BE172]"/>{i}</span>
      ))}
    </div>
    <p className="text-xs text-blue-200">Authorized by Excelitas Canada Inc.</p>
  </div>
</section>
```

---

## 5. CTA BAR  (bottom of every page, before the footer)

```tsx
<section className="bg-gradient-to-r from-[#143C96] to-[#1F63D6] px-4 py-16 text-white sm:px-6 lg:px-8">
  <div className="mx-auto max-w-4xl text-center">
    <Zap className="mx-auto h-9 w-9 text-[#8BE172]" />
    <h2 className="mt-5 text-3xl font-bold md:text-4xl">…question-style heading…</h2>
    <p className="mx-auto mt-5 max-w-3xl leading-7 text-blue-100">…one supporting sentence…</p>
    <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
      <a href={engineerMail} className="rounded-xl bg-[#41A62A] px-7 py-3.5 text-sm font-bold text-white">Talk to an Engineer</a>
      <a href="/contact" className="rounded-xl border border-white/35 bg-white/10 px-7 py-3.5 text-sm font-bold text-white">Request Product Recommendation</a>
    </div>
  </div>
</section>
```
- Gradient, icon color, heading/subtitle sizes, and button styles are **fixed**.
- Primary button = green solid; secondary = white outline on the blue.
- Links: "Talk to an Engineer" → `inquiryMailto(locale, …)`; secondary → `/contact`
  (the Sales & Support page). **`/sales-support` does not exist — never link to it.**

---

## 6. Images

- Application / case photos are **16:9**. Frame them with
  `aspect-video` + `object-cover` (see `components/ApplicationCard.tsx`).
- All remote images come from the COS bucket
  `etiatech-1303055923.cos.ap-singapore.myqcloud.com` and **must** use
  `next/image` (optimization is already configured in `next.config.ts`).
  Never use a raw `<img>` for COS assets — `next/image` auto-resizes the
  multi-MB originals to right-sized WebP.

---

## 7. Localization (Thailand / Vietnam)

- Localized pages live under `app/th`, `app/vi`, `app/zh`. Wrap copy in the
  `t({ en, zh, vi, th }, locale)` helper (`components/LocaleContext.tsx`).
- **Reuse the shared pieces** — `<TrustStrip/>`, the hero wrapper classes above,
  and the CTA block — so a TH/VI page is automatically on-standard. Only the
  translated strings change; never the layout classes, colors, or sizes.
- Keep part numbers, model names, and `®` marks unchanged across all languages.

---

## 8. Quick checklist for a new page (e.g. TH / VI)

- [ ] Hero uses the exact wrapper + grid ratio `lg:grid-cols-[1.05fr_.95fr]`
- [ ] Eyebrow is a **pill badge**, not plain text
- [ ] H1 `text-4xl md:text-6xl`, sub `text-base md:text-lg`
- [ ] Right panel is `min-h-[410px] rounded-[32px] p-5 sm:p-8`, no width cap
- [ ] No in-hero checkmark row
- [ ] `<TrustStrip/>` immediately after the hero
- [ ] Bottom CTA block matches section 5 exactly
- [ ] All photos 16:9 via `next/image`
- [ ] No `#0f2444` anywhere

---

## 9. Application Landing Pages — data-driven, already locked

**Every application page is one template + one data record. This is what keeps
FORMAT, STRUCTURE and SEO identical across all of them — and across languages.**

| Layer | File | Rule |
| --- | --- | --- |
| Template (FORMAT/STRUCTURE) | `components/ApplicationCaseStudyView.tsx` | one component renders **all** application pages |
| Route + SEO + JSON-LD | `app/(main)/applications/[slug]/page.tsx` | `generateStaticParams`, `generateMetadata`, `TechArticle` + `BreadcrumbList` JSON-LD — all generated from data |
| Content (DATA) | `data/applicationsData.js` | one object per application |
| Card on the index | `components/ApplicationCard.tsx` | one card component for all |

### The one rule
> **To add or localize an application, add/translate a DATA record — never
> hand-write a page and never fork the template.** A new page that bypasses
> `ApplicationCaseStudyView` is a bug, not a feature. (The old `/th/[lang]`
> microsite drifted precisely because it forked the layout; it was retired.)

### Required data schema (every record must have all keys)
```js
{
  slug: "uv-...-bonding",              // URL segment, kebab-case
  title: "…",                          // H1
  subtitle: "…",                       // hero sub-paragraph
  pageType: "Application Case Study",
  industryCategory: "Medical Device Assembly", // must match APPLICATION_CATEGORIES
  industry: ["…", "…"],                // meta column + JSON-LD articleSection
  applicationPoints: ["…", "…"],       // "Application" meta column
  technology: ["…", "…"],              // "Technology" meta column
  recommendedProducts: ["…", "…"],     // "Recommended Product" meta column
  image: "https://etiatech-1303055923.cos.ap-singapore.myqcloud.com/IMAGE/application/NN-name.jpg", // 16:9, COS
  // full body content fields (partA/partB/sections) as used by the template
  seo: {
    title: "… | Product | ETIA",       // <title> + OG title
    description: "…",                  // meta description + OG description
    urlSlug: "applications/<slug>",    // canonical path (no leading slash)
    keywords: ["…", "…"],              // meta keywords + JSON-LD keywords
  },
}
```

### SEO is automatic — do not hand-roll it
For each record the route file already emits, identically for every page:
`title`, `description`, `keywords`, `alternates.canonical`, OpenGraph (article,
image), plus `TechArticle` and `BreadcrumbList` JSON-LD. You only fill the
`seo` fields in data; the structure is fixed.

### Localizing application pages (TH / VI)
- **Do not** create `app/th/applications/...` as separate hand-built pages.
- Add translated fields to each data record (e.g. `title_th`, `subtitle_th`, …)
  **or** a parallel localized dataset, and render through the **same**
  `ApplicationCaseStudyView` with the active locale. Same template → same
  FORMAT/STRUCTURE/SEO in every language, by construction.

### Checklist to add one application
- [ ] New object in `data/applicationsData.js` with **all** schema keys
- [ ] `image` is a real 16:9 COS URL (verify it returns HTTP 200)
- [ ] `industryCategory` matches an existing `APPLICATION_CATEGORIES` value
- [ ] `seo.urlSlug` === `applications/<slug>`
- [ ] Did **not** create a page file or edit the template
- [ ] `next build` regenerates the page under `/applications/<slug>`
