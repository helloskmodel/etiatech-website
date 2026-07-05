"use client";
import Script from "next/script";

// Google Analytics 4. The measurement ID is read from NEXT_PUBLIC_GA_ID
// (set it in the Vercel project env, e.g. G-XXXXXXXXXX). When unset, this
// renders nothing — so the site works with or without analytics configured.
const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

export default function Analytics() {
  if (!GA_ID) return null;
  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
      <Script id="ga4-init" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${GA_ID}');`}
      </Script>
    </>
  );
}
