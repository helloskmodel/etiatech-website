// Conversion tracking helper for the OmniCure landing pages.
// Pushes to GTM's dataLayer AND calls gtag if present. No-ops safely when
// neither is configured (env vars unset) or during SSR.
// Compliance: no-ops unless the visitor has accepted cookies.

import { hasAnalyticsConsent } from "@/components/consent";

type Params = Record<string, unknown>;

type Win = Window & {
  dataLayer?: unknown[];
  gtag?: (...args: unknown[]) => void;
};

export function track(event: string, params: Params = {}): void {
  if (typeof window === "undefined") return;
  if (!hasAnalyticsConsent()) return;
  const w = window as Win;
  w.dataLayer = w.dataLayer || [];
  w.dataLayer.push({ event, ...params });
  if (typeof w.gtag === "function") {
    w.gtag("event", event, params);
  }
}
