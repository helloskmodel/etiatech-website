// Shared case-study image + banner helpers.
//
// The case-study CONTENT now lives in data/caseStudiesCn.ts (the finalized
// EN / ZH / TH / VI set). This module only keeps the COS image-URL helpers,
// the per-page hero banners, and the CaseStudy type still referenced by a few
// product helpers.

import { caseStudiesCn } from "@/data/caseStudiesCn";

export type MaterialRow = { application: string; system: string; category: string; notes: string };

export type CaseStudy = {
  id: string;
  industry: string; // broad taxonomy (drives the chip color)
  sector: string; // concise detailed application name shown on the card chip
  company: string;
  title: string;
  image?: string; // filename under IMAGE/casestudies/ in the COS bucket
  overview?: string;
  challenge: string;
  solution: string;
  materials?: { rows: MaterialRow[]; disclaimer?: string };
  benefits?: string[];
  results?: string;
  marketContext?: string;
  keywords: string[];
  metric: string;
  metricLabel: string;
  source: string;
};

// Case study hero images live in the COS bucket under "IMAGE/case studies "
// (note: a space inside the folder name AND a trailing space — encoded as
// %20). Filenames are appended URL-encoded by caseStudyImage().
const CASE_IMG_BASE =
  "https://etiatech-1303055923.cos.ap-singapore.myqcloud.com/IMAGE/case%20studies%20";

export function caseStudyImage(c: CaseStudy): string {
  return c.image ? `${CASE_IMG_BASE}/${encodeURIComponent(c.image)}` : "";
}

// Builds a case-studies bucket URL from a raw filename (used for hero banners
// that reuse case-study photography). Filename is URL-encoded.
export function caseImageUrl(filename: string): string {
  return `${CASE_IMG_BASE}/${encodeURIComponent(filename)}`;
}

// Some banner photos live under the /IMAGE/application/ bucket instead.
const APP_IMG_BASE =
  "https://etiatech-1303055923.cos.ap-singapore.myqcloud.com/IMAGE/application";
export function appImageUrl(filename: string): string {
  return `${APP_IMG_BASE}/${encodeURIComponent(filename)}`;
}

// Purpose-made wide hero banners (1926×600, compressed) under /IMAGE/logo/.
const BANNER_BASE =
  "https://etiatech-1303055923.cos.ap-singapore.myqcloud.com/IMAGE/logo";
export function bannerUrl(filename: string): string {
  return `${BANNER_BASE}/${encodeURIComponent(filename)}`;
}

// Per-page hero background banner (blurred, lightened case-study photo).
// Change a filename here to swap that page's banner — no component edits needed.
export const PAGE_BANNERS = {
  omnicure: bannerUrl("BANNER-OMNICURE.jpg"),
  phoseon: bannerUrl("BANNER-PHOSEON.jpg"),
  applications: bannerUrl("BANNER-APPLICATION.jpg"),
  insights: bannerUrl("BANNER-INSIGHT.jpg"),
  support: bannerUrl("BANNER-SALES AND SUPPORT.jpg"),
} as const;

// Representative case-study photo reused as a page-hero banner background,
// sourced from the finalized case-study set.
export const heroBannerImage = caseStudiesCn[0]?.image ?? "";

// Rotating banner set for the brand-landing hero backdrop.
export const heroBannerImages: string[] = caseStudiesCn
  .slice(0, 3)
  .map((c) => c.image)
  .filter(Boolean);
