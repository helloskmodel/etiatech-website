import Link from "next/link";
import { thMailto } from "./thContact";
import { getAuthDict, type ThLocale } from "./dictionaries";

export type Tri3 = { th: string; en: string; zh: string };
export const pick3 = (t: Tri3, l: ThLocale) => t[l];

// Shared shell for the Thailand SEM landing pages. Renders the same hero /
// authorized-distributor / quote-CTA chrome as the rest of the /th site so the
// pages stay visually consistent. Body content is passed as children; pages
// currently pass placeholder blocks to be filled in later.
export default function LandingShell({
  lang,
  eyebrow,
  title,
  subtitle,
  children,
}: {
  lang: ThLocale;
  eyebrow: string;
  title: string;
  subtitle: string;
  children?: React.ReactNode;
}) {
  const auth = getAuthDict(lang);
  return (
    <>
      {/* Hero */}
      <section className="py-16 md:py-24" style={{ background: "#0f2444" }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: "#4CAF3E" }}>
            {eyebrow}
          </p>
          <h1 className="text-3xl md:text-5xl font-bold text-white leading-tight mb-4">{title}</h1>
          <p className="text-base text-gray-200 mb-6 leading-relaxed max-w-2xl">{subtitle}</p>
          <p className="inline-flex items-center gap-2 text-sm font-semibold text-white rounded px-3 py-1.5 mb-6" style={{ background: "#2e7d3280", border: "1px solid #4CAF3E" }}>
            ✓ {auth.badge}
          </p>
          <div>
            <a
              href={thMailto(lang, { subject: "Request a Quote — Thailand", context: title })}
              className="inline-block px-6 py-3 rounded font-semibold text-white hover:opacity-90"
              style={{ background: "#1A3DAD" }}
            >
              {auth.requestQuote} →
            </a>
          </div>
        </div>
      </section>

      {/* Body */}
      <section className="py-14 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {children ?? (
            <div className="rounded-xl border border-dashed border-gray-300 bg-gray-50 p-10 text-center text-gray-400">
              {/* PLACEHOLDER — content to be filled in */}
              เนื้อหาเพิ่มเติมเร็ว ๆ นี้ · Content coming soon · 内容即将补充
            </div>
          )}
          <div className="mt-10">
            <Link href={`/th/${lang}`} className="text-sm font-medium text-[#1A3DAD] hover:underline">
              ← ETIA Thailand
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
