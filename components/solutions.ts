import { apps, type App } from "@/components/applicationNotes";
import { applicationsData } from "@/data/applicationsData";
import type { Solution } from "@/components/solutionsMeta";

// Data lookups for the industry solution pages. The solution metadata itself
// lives in solutionsMeta.ts, which stays free of data imports so Nav can read
// the menu labels without pulling the application datasets into the client
// bundle on every page.
export { SOLUTIONS, getSolution, type Solution, type SolutionId } from "@/components/solutionsMeta";

// The live /applications/{slug} pages for a solution, in the order listed.
// Silently drops a slug that no longer exists in applicationsData so a renamed
// application can never 404 the whole solution page.
export function solutionApplications(s: Solution) {
  return s.applicationSlugs
    .map((slug) => applicationsData.find((a) => a.slug === slug))
    .filter((a): a is NonNullable<typeof a> => Boolean(a));
}

// Application notes for a solution. These have no individual URLs — next.config
// redirects /application/:path* to /applications — so callers render them as
// content, not links.
export function solutionNotes(s: Solution): App[] {
  return apps.filter((a) => s.noteIndustries.includes(a.industry));
}
