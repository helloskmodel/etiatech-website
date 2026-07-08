import { Zap } from "lucide-react";

type CtaLink = { label: string; href: string };

/**
 * Site-standard closing CTA band (matches the Sales & Support page):
 * navy gradient rounded card, Zap accent, green primary button, white outline secondary.
 * Callers pass already-localized strings so this stays i18n-agnostic.
 */
export default function FinalCta({
  heading,
  body,
  primary,
  secondary,
}: {
  heading: string;
  body: string;
  primary: CtaLink;
  secondary?: CtaLink;
}) {
  return (
    <section className="px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="overflow-hidden rounded-[32px] bg-gradient-to-br from-[#143C96] to-[#1F63D6] px-6 py-14 text-center text-white sm:px-10">
          <Zap className="mx-auto h-9 w-9 text-[#8BE172]" />
          <h2 className="mx-auto mt-5 max-w-2xl text-3xl font-bold md:text-4xl">{heading}</h2>
          <p className="mx-auto mt-5 max-w-3xl leading-7 text-blue-100">{body}</p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <a href={primary.href} className="inline-flex items-center justify-center rounded-xl bg-[#41A62A] px-7 py-3.5 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-[#3A9D3F]">{primary.label}</a>
            {secondary && (
              <a href={secondary.href} className="inline-flex items-center justify-center rounded-xl border border-white/35 bg-white/10 px-7 py-3.5 text-sm font-bold text-white transition hover:border-white/70">{secondary.label}</a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
