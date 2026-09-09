"use client";
import { useEffect, useState, useSyncExternalStore } from "react";
import { getConsent, CONSENT_CHANGE_EVENT, CONSENT_OPEN_EVENT } from "@/components/consent";

const subscribe = (onChange: () => void) => {
  window.addEventListener(CONSENT_CHANGE_EVENT, onChange);
  return () => window.removeEventListener(CONSENT_CHANGE_EVENT, onChange);
};

// Is the cookie-consent banner currently on screen?
//
// The banner is fixed to the bottom of the viewport, so anything else anchored
// there (the floating chat button) has to move out of its way — otherwise the
// banner covers it and eats the tap, which is exactly when a first-time
// visitor might want to ask a question. Both the banner and whatever dodges it
// read this one hook, so the two can't drift apart.
export function useConsentBannerVisible(): boolean {
  // Server snapshot says "decided" so the banner never renders in server HTML;
  // the client re-reads right after hydration and shows it on a first visit.
  const decided = useSyncExternalStore(subscribe, () => getConsent() !== null, () => true);
  // Re-opened from the footer "Cookie settings" link.
  const [reopened, setReopened] = useState(false);

  useEffect(() => {
    const open = () => setReopened(true);
    // Making a choice closes the banner again, re-opened or not.
    const close = () => setReopened(false);
    window.addEventListener(CONSENT_OPEN_EVENT, open);
    window.addEventListener(CONSENT_CHANGE_EVENT, close);
    return () => {
      window.removeEventListener(CONSENT_OPEN_EVENT, open);
      window.removeEventListener(CONSENT_CHANGE_EVENT, close);
    };
  }, []);

  return !decided || reopened;
}
