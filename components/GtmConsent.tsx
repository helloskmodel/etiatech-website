"use client";
import Script from "next/script";
import { useSyncExternalStore } from "react";
import { getConsent, CONSENT_CHANGE_EVENT } from "@/components/consent";

// Google Tag Manager, consent-gated exactly like Analytics.tsx: the container
// loads ONLY after the visitor accepts cookies in the consent banner, and
// starts immediately when consent is granted mid-session (via the consent
// change event). When NEXT_PUBLIC_GTM_ID is unset this renders nothing.
const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID;

const subscribe = (onChange: () => void) => {
  window.addEventListener(CONSENT_CHANGE_EVENT, onChange);
  return () => window.removeEventListener(CONSENT_CHANGE_EVENT, onChange);
};

export default function GtmConsent() {
  const accepted = useSyncExternalStore(
    subscribe,
    () => getConsent() === "accepted",
    // Server snapshot: never load GTM in server-rendered HTML.
    () => false
  );

  if (!GTM_ID || !accepted) return null;
  return (
    <Script id="gtm" strategy="afterInteractive">
      {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${GTM_ID}');`}
    </Script>
  );
}
