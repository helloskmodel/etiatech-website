// Cookie-consent state shared across the banner, Analytics, and tracking.
// Analytics / GTM must not load until the visitor has explicitly accepted.
// The choice is stored in localStorage and broadcast via window events so the
// banner, the Analytics loader, and the "Cookie settings" re-opener stay in
// sync without a page reload.

export const CONSENT_KEY = "etia-cookie-consent";
export type Consent = "accepted" | "rejected";

// Fired when the visitor makes (or changes) a choice. detail = the new value.
export const CONSENT_CHANGE_EVENT = "etia-consent-change";
// Fired to re-open the banner (e.g. from the footer "Cookie settings" link).
export const CONSENT_OPEN_EVENT = "etia-consent-open";

export function getConsent(): Consent | null {
  if (typeof window === "undefined") return null;
  try {
    const v = localStorage.getItem(CONSENT_KEY);
    return v === "accepted" || v === "rejected" ? v : null;
  } catch {
    return null;
  }
}

export function hasAnalyticsConsent(): boolean {
  return getConsent() === "accepted";
}

export function setConsent(value: Consent): void {
  const prior = getConsent();
  try {
    localStorage.setItem(CONSENT_KEY, value);
  } catch {
    /* ignore */
  }
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent(CONSENT_CHANGE_EVENT, { detail: value }));
    // Withdrawing consent after analytics already loaded this session: reload
    // so the GA/GTM scripts and their cookies are cleared.
    if (prior === "accepted" && value === "rejected") {
      window.location.reload();
    }
  }
}

export function openConsent(): void {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event(CONSENT_OPEN_EVENT));
  }
}
