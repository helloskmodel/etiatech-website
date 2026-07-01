import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Cookie Policy — ETIA Technology",
  description: "How ETIA-TECH (ASIA) Co., Limited uses cookies and similar technologies on this website.",
};

const LAST_UPDATED = "29 June 2026";

const cookieTypes = [
  {
    name: "Strictly Necessary",
    purpose: "Required for the website to function — page navigation, security, and remembering your cookie choice. These cannot be switched off.",
    color: "#1A56DB",
  },
  {
    name: "Preferences",
    purpose: "Remember choices you make (such as language) to provide a more personalised experience.",
    color: "#44B549",
  },
  {
    name: "Analytics",
    purpose: "Help us understand how visitors use the site so we can improve it. These collect aggregated, anonymised information.",
    color: "#0d9488",
  },
];

export default function CookiePolicyPage() {
  return (
    <>
      {/* Hero */}
      <section className="py-12 relative overflow-hidden" style={{ background: "linear-gradient(135deg, #1241a3 0%, #1A56DB 100%)" }}>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: "#44B549" }}>Legal</p>
          <h1 className="text-3xl md:text-4xl font-bold text-white leading-tight mb-3">Cookie Policy</h1>
          <p className="text-sm text-gray-300">Last updated: {LAST_UPDATED}</p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-gray-600 text-sm leading-relaxed space-y-8">
          <p>
            This Cookie Policy explains how <strong>ETIA-TECH (ASIA) Co., Limited</strong> (Hong Kong) uses cookies and
            similar technologies on this website. It should be read together with our{" "}
            <Link href="/privacy" className="font-medium hover:underline" style={{ color: "#1A56DB" }}>Privacy Policy</Link>.
          </p>

          <div>
            <h2 className="text-lg font-bold mb-2" style={{ color: "#1A56DB" }}>What are cookies?</h2>
            <p>
              Cookies are small text files stored on your device when you visit a website. They are widely used to make
              websites work, to work more efficiently, and to provide information to the site owners.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-bold mb-4" style={{ color: "#1A56DB" }}>Types of cookies we use</h2>
            <div className="space-y-3">
              {cookieTypes.map((c) => (
                <div key={c.name} className="rounded-xl border border-gray-100 p-4 bg-gray-50">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="w-2.5 h-2.5 rounded-full" style={{ background: c.color }} />
                    <h3 className="font-semibold" style={{ color: c.color }}>{c.name}</h3>
                  </div>
                  <p className="text-gray-500">{c.purpose}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-lg font-bold mb-2" style={{ color: "#1A56DB" }}>Managing your cookies</h2>
            <p>
              When you first visit, we ask for your consent through a banner where you can accept all cookies or choose
              necessary-only. You can also control cookies through your browser settings — most browsers let you refuse or
              delete cookies. Please note that blocking some cookies may affect how the site works.
            </p>
            <p className="mt-2">
              To reset your choice on this site, clear this site&apos;s data in your browser and the consent banner will appear
              again on your next visit.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-bold mb-2" style={{ color: "#1A56DB" }}>Contact</h2>
            <p>
              Questions about this Cookie Policy? Email{" "}
              <a href="mailto:mark_tang@etia-tech.com" className="font-medium hover:underline" style={{ color: "#44B549" }}>mark_tang@etia-tech.com</a>.
            </p>
          </div>

          <div className="pt-4 border-t border-gray-100">
            <Link href="/" className="text-sm font-medium hover:underline" style={{ color: "#1A56DB" }}>← Back to Home</Link>
          </div>
        </div>
      </section>
    </>
  );
}
