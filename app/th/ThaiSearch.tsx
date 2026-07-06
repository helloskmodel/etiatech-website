"use client";
import { useState, useMemo, useRef, useEffect } from "react";
import Link from "next/link";
import type { SearchEntry } from "./searchIndex";

export type SearchLabels = {
  search: string;
  placeholder: string;
  noResults: string;
  hint: string;
  product: string;
  application: string;
  case: string;
};

const BRAND = "#1A56DB";

export default function ThaiSearch({ index, labels }: { index: SearchEntry[]; labels: SearchLabels }) {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    if (open) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const results = useMemo(() => {
    const term = q.trim().toLowerCase();
    if (!term) return [];
    // Match every whitespace-separated token (so "s2000 lamp" matches both).
    const tokens = term.split(/\s+/);
    return index.filter((e) => tokens.every((t) => e.key.includes(t))).slice(0, 12);
  }, [q, index]);

  const typeLabel = (t: SearchEntry["type"]) => (t === "product" ? labels.product : t === "application" ? labels.application : labels.case);

  return (
    <>
      <button
        type="button"
        aria-label={labels.search}
        onClick={() => setOpen(true)}
        className="p-2 rounded text-gray-500 hover:text-[#1A56DB] transition-colors"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z" />
        </svg>
      </button>

      {open && (
        <div className="fixed inset-0 z-[60] bg-black/40" onClick={() => setOpen(false)}>
          <div
            className="mx-auto mt-20 max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-2 border-b border-gray-100 px-4">
              <svg className="w-5 h-5 text-gray-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z" />
              </svg>
              <input
                ref={inputRef}
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder={labels.placeholder}
                className="w-full py-4 text-base text-gray-900 focus:outline-none"
              />
              <button type="button" onClick={() => setOpen(false)} className="text-xs font-semibold text-gray-400 hover:text-gray-700 px-2">ESC</button>
            </div>

            <div className="max-h-[60vh] overflow-y-auto">
              {q.trim() === "" ? (
                <p className="px-4 py-6 text-sm text-gray-400">{labels.hint}</p>
              ) : results.length === 0 ? (
                <p className="px-4 py-6 text-sm text-gray-400">{labels.noResults}</p>
              ) : (
                <ul className="py-2">
                  {results.map((r) => (
                    <li key={r.href + r.title}>
                      <Link
                        href={r.href}
                        onClick={() => setOpen(false)}
                        className="flex items-start gap-3 px-4 py-3 hover:bg-gray-50"
                      >
                        <span className="mt-0.5 text-[10px] font-bold uppercase tracking-wide px-2 py-0.5 rounded shrink-0" style={{ background: "#1A56DB10", color: BRAND }}>
                          {typeLabel(r.type)}
                        </span>
                        <span className="min-w-0">
                          <span className="block text-sm font-semibold text-gray-900 truncate">{r.title}</span>
                          {r.subtitle && <span className="block text-xs text-gray-500 truncate">{r.subtitle}</span>}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
