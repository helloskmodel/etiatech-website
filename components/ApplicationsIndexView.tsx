"use client";

import { useMemo, useState } from "react";
import ApplicationCard from "@/components/ApplicationCard";
import { APPLICATION_CATEGORIES, getListedApplications } from "@/data/applicationsData";

const listedApplications = getListedApplications();

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
      <header className="border-b border-gray-200 bg-[#0f2444] py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-[#44B549]">5 Industries · 15 Application Case Studies</p>
          <h1 className="max-w-3xl text-3xl font-bold leading-tight text-white md:text-5xl">Practical UV curing solutions for real production challenges</h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-gray-200">Concise, application-driven guidance connecting process requirements with suitable UV technology, recommended products, and ETIA support.</p>
        </div>
      </header>

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
    </>
  );
}
