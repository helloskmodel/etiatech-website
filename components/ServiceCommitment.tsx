import { BadgeCheck } from "lucide-react";

const PROMISE = "Genuine Supply Channels. Application-Driven Support. Local Support. Long-Term Service.";

export default function ServiceCommitment({ compact = false }: { compact?: boolean }) {
  if (compact) {
    return (
      <div className="mt-4 border-t border-gray-200 pt-4">
        <div className="flex items-start gap-2">
          <BadgeCheck className="mt-0.5 shrink-0 text-[#44B549]" size={17} aria-hidden="true" />
          <div>
            <p className="text-xs font-semibold text-[#1A56DB]">ETIA Service Commitment</p>
            <p className="mt-1 text-xs leading-relaxed text-gray-500">{PROMISE}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <section aria-labelledby="service-commitment-title" className="bg-white pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-2xl border border-[#1A56DB]/15 bg-[#f6f9ff] px-6 py-8 md:px-10 md:py-10">
          <div className="absolute inset-y-0 left-0 w-1.5 bg-[#44B549]" aria-hidden="true" />
          <div className="flex flex-col gap-5 md:flex-row md:items-start">
            <BadgeCheck className="shrink-0 text-[#44B549]" size={38} strokeWidth={1.8} aria-hidden="true" />
            <div>
              <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-[#44B549]">Our Promise to Customers</p>
              <h2 id="service-commitment-title" className="text-2xl font-bold text-[#1A56DB] md:text-3xl">ETIA Service Commitment</h2>
              <p className="mt-3 text-base font-semibold leading-relaxed text-gray-800 md:text-lg">{PROMISE}</p>
              <p className="mt-4 max-w-4xl text-sm leading-7 text-gray-600 md:text-base">
                As an authorized OmniCure® distributor, ETIA supports customers from product selection to installation, training, troubleshooting, and long-term service — helping manufacturers build reliable UV curing processes with confidence.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
