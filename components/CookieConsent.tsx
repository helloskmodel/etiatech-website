"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

const STORAGE_KEY = "etia-cookie-consent";

export default function CookieConsent() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    try {
      if (!localStorage.getItem(STORAGE_KEY)) setShow(true);
    } catch {
      /* localStorage unavailable — show banner */
      setShow(true);
    }
  }, []);

  const decide = (value: "accepted" | "rejected") => {
    try {
      localStorage.setItem(STORAGE_KEY, value);
    } catch {
      /* ignore */
    }
    setShow(false);
  };

  if (!show) return null;

  return (
    <div className="fixed bottom-0 inset-x-0 z-[60] p-3 sm:p-4">
      <div className="max-w-5xl mx-auto rounded-xl border border-gray-200 bg-white shadow-xl px-5 py-4 flex flex-col md:flex-row md:items-center gap-4">
        <div className="flex-1">
          <p className="text-sm font-semibold mb-1" style={{ color: "#1A56DB" }}>We value your privacy</p>
          <p className="text-xs text-gray-500 leading-relaxed">
            We use cookies to keep the site working, remember your preferences, and understand how it&apos;s used. See our{" "}
            <Link href="/cookies" className="font-medium hover:underline" style={{ color: "#1A56DB" }}>Cookie Policy</Link> and{" "}
            <Link href="/privacy" className="font-medium hover:underline" style={{ color: "#1A56DB" }}>Privacy Policy</Link>.
          </p>
        </div>
        <div className="flex gap-3 flex-shrink-0">
          <button
            onClick={() => decide("rejected")}
            className="px-4 py-2 rounded text-sm font-semibold border border-gray-300 text-gray-600 hover:border-gray-400 transition-all"
          >
            Necessary only
          </button>
          <button
            onClick={() => decide("accepted")}
            className="px-4 py-2 rounded text-sm font-semibold text-white hover:opacity-90 transition-all"
            style={{ background: "#1A56DB" }}
          >
            Accept all
          </button>
        </div>
      </div>
    </div>
  );
}
