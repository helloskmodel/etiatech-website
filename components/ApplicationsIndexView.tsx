"use client";

import { useMemo, useState } from "react";
import { BadgeCheck, HeartPulse, Car, CircuitBoard, Sparkles, Cable } from "lucide-react";
import ApplicationCard from "@/components/ApplicationCard";
import TrustStrip from "@/components/TrustStrip";
import UvCuringSelector from "@/components/UvCuringSelector";
import { APPLICATION_CATEGORIES, getListedApplications } from "@/data/applicationsData";

const listedApplications = getListedApplications();

const heroIndustries = [
  { icon: HeartPulse, label: "Medical Device Assembly" },
  { icon: Car, label: "Automotive & ADAS" },
  { icon: CircuitBoard, label: "Electronics & PCB" },
  { icon: Sparkles, label: "Photonics & Packaging" },
  { icon: Cable, label: "Fiber Optic & Cable" },
];

export default function ApplicationsIndexView() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All Applications");
  const applications = useMemo(() => {
    const term = query.trim().toLowerCase();
    return listedApplications.filter((application) => {
      if (category !== "All Applications" && application.industryCategory !== category) return false;
      if (!term) return true;
      return [
      application.title,
      application.subtitle,
      application.industryCategory,
      ...application.industry,
      ...application.applicationPoints,
      ...application.technology,
      ...application.recommendedProducts,
      ].join(" ").toLowerCase().includes(term);
    });
  }, [category, query]);

  return (
    <>
      <header className="relative overflow-hidden border-b border-[#D9E4EA] bg-gradient-to-br from-white via-[#EEF6FF] to-[#F1FAEF]">
        <div className="absolute -right-36 -top-36 h-[34rem] w-[34rem] rounded-full bg-[#1F63D6]/10 blur-3xl" />
        <div className="absolute -bottom-40 left-1/3 h-96 w-96 rounded-full bg-[#63C94A]/10 blur-3xl" />
        <div className="relative mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 md:py-24 lg:grid-cols-[1.05fr_.95fr] lg:items-center lg:px-8">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-[#41A62A]/20 bg-white px-3 py-1.5 text-xs font-bold text-[#41A62A] shadow-sm"><BadgeCheck className="h-4 w-4" /> 5 Industries · 15 Application Case Studies</div>
            <h1 className="mt-6 max-w-2xl text-4xl font-bold leading-[1.08] tracking-tight text-[#143C96] md:text-6xl">Practical UV curing solutions for real production challenges</h1>
            <p className="mt-6 max-w-2xl text-base leading-7 text-[#667085] md:text-lg">Concise, application-driven guidance connecting process requirements with suitable UV technology, recommended products, and ETIA support.</p>
          </div>
          <div className="flex w-full flex-col justify-center rounded-[28px] border border-[#DCE7F5] bg-gradient-to-br from-[#F5F8FF] via-white to-[#F2FBF8] p-4 shadow-[0_24px_80px_rgba(15,36,68,.10)] sm:p-5 lg:mx-auto lg:min-h-[330px] lg:max-w-sm">
            <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full border border-white bg-white text-center shadow-[0_16px_45px_rgba(26,86,219,.16)]">
              <div><p className="text-xl font-bold text-[#143C96]">15</p><p className="mt-0.5 text-[9px] font-bold uppercase tracking-[.16em] text-[#41A62A]">Case Studies</p></div>
            </div>
            <div className="grid gap-2">
              {heroIndustries.map((ind) => {
                const Icon = ind.icon;
                return (
                  <div key={ind.label} className="flex items-center gap-2.5 rounded-xl border border-[#E3EAF2] bg-white px-3 py-2">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[#EEF6FF] text-[#143C96]"><Icon className="h-4 w-4" strokeWidth={1.8} /></span>
                    <span className="text-xs font-bold text-[#102A43]">{ind.label}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </header>

      <TrustStrip />

      <main className="bg-[#f6f8fb] py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <nav aria-label="Application industries" className="mb-8 flex gap-2 overflow-x-auto pb-2">
            {["All Applications", ...APPLICATION_CATEGORIES].map((item) => {
              const count = item === "All Applications" ? listedApplications.length : listedApplications.filter((application) => application.industryCategory === item).length;
              return (
                <button key={item} type="button" onClick={() => setCategory(item)} className={`whitespace-nowrap rounded-full border px-4 py-2 text-xs font-semibold transition-colors ${category === item ? "border-[#1A56DB] bg-[#1A56DB] text-white" : "border-gray-200 bg-white text-gray-600 hover:border-[#1A56DB] hover:text-[#1A56DB]"}`}>
                  {item} <span className="ml-1 opacity-70">{count}</span>
                </button>
              );
            })}
          </nav>
          <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <p className="text-sm font-semibold text-gray-900">{applications.length} of {listedApplications.length} application case {listedApplications.length === 1 ? "study" : "studies"}</p>
              <p className="mt-1 text-xs text-gray-500">Filter by industry, process, technology, or product.</p>
            </div>
            <label className="w-full sm:max-w-sm">
              <span className="sr-only">Search applications</span>
              <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search applications…" className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-900 outline-none focus:border-[#1A56DB] focus:ring-2 focus:ring-[#1A56DB]/15" />
            </label>
          </div>
          {applications.length ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {applications.map((application) => <ApplicationCard key={application.slug} application={application} />)}
            </div>
          ) : (
            <div className="rounded-xl border border-gray-200 bg-white p-10 text-center text-sm text-gray-500">No applications match this search.</div>
          )}
        </div>
      </main>

      <UvCuringSelector />
    </>
  );
}
