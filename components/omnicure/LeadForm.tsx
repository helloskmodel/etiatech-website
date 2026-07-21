"use client";
import { useState } from "react";
import { BRAND, MODELS, getCopy, type FormLang } from "./copy";
import { track } from "./track";
import ServiceCommitment from "@/components/ServiceCommitment";
import { localeSalesEmail } from "@/components/contact";

// Inquiries POST to /api/lead (server-side delivery to email/CRM, configured
// via env — see that route). If the API is not configured or fails, we fall
// back to opening the visitor's mail client (mailto), so a lead is never
// silently dropped. The mailto recipient follows the visitor's country
// (see localeSalesEmail).

export default function LeadForm({
  lang,
  page,
  compact = false,
  showModel = true,
}: {
  lang: FormLang;
  page: string;
  compact?: boolean;
  showModel?: boolean;
}) {
  const c = getCopy(lang).form;
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [err, setErr] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const payload = {
      name: String(fd.get("name") || "").trim(),
      company: String(fd.get("company") || "").trim(),
      phone: String(fd.get("phone") || "").trim(),
      model: String(fd.get("model") || ""),
      message: String(fd.get("message") || "").trim(),
      website: String(fd.get("website") || ""), // honeypot
      page,
      lang,
    };
    if (!payload.name || !payload.phone) {
      setErr(c.required);
      setStatus("error");
      return;
    }
    setErr("");
    setStatus("sending");
    track("generate_lead", { page, lang, model: payload.model });

    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        setStatus("done");
        return;
      }
    } catch {
      /* network error — fall through to mailto */
    }

    // Server delivery unavailable: hand off to the visitor's mail client.
    const subject = `Quote request — ${page}`;
    const body = [
      `Name: ${payload.name}`,
      payload.company && `Company: ${payload.company}`,
      `Phone: ${payload.phone}`,
      payload.model && `Model: ${payload.model}`,
      payload.message && `Message: ${payload.message}`,
      `Page: ${page} · Lang: ${lang}`,
    ]
      .filter(Boolean)
      .join("\n");
    window.location.assign(`mailto:${localeSalesEmail(lang)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`);
    setStatus("done");
  }

  if (status === "done") {
    return (
      <div className="rounded-xl bg-white p-6 shadow-lg border border-gray-100 text-center">
        <div className="text-3xl mb-2">✅</div>
        <p className="font-bold text-gray-900 mb-1">{c.thanksTitle}</p>
        <p className="text-sm text-gray-600">{c.thanksBody}</p>
      </div>
    );
  }

  const field = "w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#1A3DAD]";
  return (
    <form onSubmit={onSubmit} className={`relative rounded-xl bg-white p-5 sm:p-6 shadow-lg border border-gray-100 ${compact ? "" : ""}`}>
      <p className="font-bold text-gray-900 mb-4">{c.heading}</p>
      {/* Honeypot: hidden from humans, bots that fill it are silently dropped. */}
      <div aria-hidden="true" className="absolute -left-[9999px] top-auto h-px w-px overflow-hidden">
        <label htmlFor={`website-${page}`}>Website</label>
        <input id={`website-${page}`} name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>
      <div className="space-y-3">
        <div>
          <label htmlFor={`name-${page}`} className="block text-xs font-medium text-gray-600 mb-1">{c.name} *</label>
          <input id={`name-${page}`} name="name" required className={field} />
        </div>
        <div>
          <label htmlFor={`company-${page}`} className="block text-xs font-medium text-gray-600 mb-1">{c.company}</label>
          <input id={`company-${page}`} name="company" className={field} />
        </div>
        <div>
          <label htmlFor={`phone-${page}`} className="block text-xs font-medium text-gray-600 mb-1">{c.phone} *</label>
          <input id={`phone-${page}`} name="phone" type="tel" required className={field} />
        </div>
        {showModel && (
          <div>
            <label htmlFor={`model-${page}`} className="block text-xs font-medium text-gray-600 mb-1">{c.model}</label>
            <select id={`model-${page}`} name="model" defaultValue={MODELS[0]} className={field}>
              {MODELS.map((m) => (
                <option key={m} value={m}>{m}</option>
              ))}
            </select>
          </div>
        )}
        {!compact && (
          <div>
            <label htmlFor={`message-${page}`} className="block text-xs font-medium text-gray-600 mb-1">{c.message}</label>
            <textarea id={`message-${page}`} name="message" rows={3} className={field} />
          </div>
        )}
      </div>
      {status === "error" && err && <p className="text-xs text-red-600 mt-2">{err}</p>}
      <button
        type="submit"
        disabled={status === "sending"}
        className="mt-4 w-full rounded-lg px-5 py-3 text-sm font-bold text-white hover:opacity-90 disabled:opacity-60"
        style={{ background: BRAND.green }}
      >
        {status === "sending" ? "…" : c.submit}
      </button>
      <p className="mt-3 text-[11px] leading-4 text-gray-400">{c.consent}</p>
      <ServiceCommitment compact />
    </form>
  );
}
