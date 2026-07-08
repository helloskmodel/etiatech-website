import { Check } from "lucide-react";

// Dark-blue trust strip shown directly under the hero on Home, Applications,
// Phoseon and Sales & Support. OmniCure uses its own authorized-distributor
// variant inline on its page.
const TRUST_ITEMS = ["Genuine Products", "Application-Driven Solution", "Local Supply Chain", "Long-Term Service"];

export default function TrustStrip() {
  return (
    <section className="bg-gradient-to-r from-[#143C96] to-[#1F63D6] px-4 py-5 text-white sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-3 text-center text-xs font-bold sm:grid-cols-4 sm:text-sm">
        {TRUST_ITEMS.map((item) => (
          <span key={item} className="inline-flex items-center justify-center gap-2">
            <Check className="h-4 w-4 text-[#8BE172]" />
            {item}
          </span>
        ))}
      </div>
    </section>
  );
}
