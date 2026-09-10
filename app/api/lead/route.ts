// Lead capture endpoint: the OmniCure landing-page quote form, and the
// inquiry basket (a list of systems and part numbers with quantities, sent
// as a quote or a sample request).
//
// Delivery is configured with env vars, first match wins:
//   LEAD_WEBHOOK_URL — POST the lead as JSON (Zapier/Make/Slack/CRM webhook)
//   RESEND_API_KEY   — email via the Resend API to LEAD_TO_EMAIL
//                      (default sales@etia-tech.com; optional LEAD_FROM_EMAIL,
//                      default onboarding@resend.dev)
// With neither configured this returns 503 and the form falls back to the
// visitor's mail client (mailto), so no lead is ever silently dropped.
//
// Privacy: lead contact details are NOT logged on the happy path — only a
// redacted summary. The full lead is logged only if a configured delivery
// fails, as a last-resort recovery record.

import { clientIp, foreignOrigin, rateLimited } from "../rateLimit";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

type LeadPayload = {
  name?: unknown;
  company?: unknown;
  phone?: unknown;
  email?: unknown;
  country?: unknown;
  model?: unknown;
  message?: unknown;
  page?: unknown;
  lang?: unknown;
  website?: unknown; // honeypot — humans never fill this hidden field
  // Inquiry basket
  kind?: unknown; // "quote" | "sample"
  items?: unknown; // [{ ref, description, qty }]
  application?: unknown;
  adhesive?: unknown;
  substrate?: unknown;
  address?: unknown;
};

type Item = { ref: string; description: string; qty: number };

// At most 60 lines, each field bounded, quantity a small positive integer.
function readItems(v: unknown): Item[] {
  if (!Array.isArray(v)) return [];
  return v.slice(0, 60).flatMap((x) => {
    if (!x || typeof x !== "object") return [];
    const o = x as Record<string, unknown>;
    const ref = str(o.ref, 60);
    if (!ref) return [];
    const qty = Math.max(1, Math.min(999, Math.round(Number(o.qty)) || 1));
    return [{ ref, description: str(o.description, 200), qty }];
  });
}

const str = (v: unknown, max = 500) =>
  typeof v === "string" ? v.trim().slice(0, max) : "";

function subjectFor(lead: Record<string, string>, items: Item[]): string {
  if (items.length) {
    const what = lead.kind === "sample" ? "Sample request" : "Quote request";
    return `${what} — ${lead.name}${lead.company ? `, ${lead.company}` : ""} (${items.length} item${items.length === 1 ? "" : "s"})`;
  }
  return `New lead — ${lead.name}${lead.model ? ` (${lead.model})` : ""} via ${lead.page || "landing page"}`;
}

async function deliver(lead: Record<string, string>, items: Item[]): Promise<"sent" | "unconfigured"> {
  const webhook = process.env.LEAD_WEBHOOK_URL;
  if (webhook) {
    const res = await fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type: "etiatech-lead", ...lead, items }),
    });
    if (!res.ok) throw new Error(`webhook ${res.status}`);
    return "sent";
  }

  const resendKey = process.env.RESEND_API_KEY;
  const to = process.env.LEAD_TO_EMAIL || "sales@etia-tech.com";
  if (resendKey) {
    const lines = Object.entries(lead)
      .filter(([, v]) => v)
      .map(([k, v]) => `${k}: ${v}`);
    if (items.length) {
      lines.push("", "Items:");
      for (const it of items) lines.push(`  ${it.qty} × ${it.ref}${it.description ? ` — ${it.description}` : ""}`);
    }
    const text = lines.join("\n");
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${resendKey}` },
      body: JSON.stringify({
        from: process.env.LEAD_FROM_EMAIL || "onboarding@resend.dev",
        to: to.split(",").map((s) => s.trim()),
        subject: subjectFor(lead, items),
        text,
      }),
    });
    if (!res.ok) throw new Error(`resend ${res.status}`);
    return "sent";
  }

  return "unconfigured";
}

export async function POST(request: Request) {
  if (foreignOrigin(request)) {
    return Response.json({ error: "forbidden" }, { status: 403 });
  }
  if (rateLimited(`lead:${clientIp(request)}`, 5, 10 * 60_000)) {
    return Response.json({ error: "rate_limited" }, { status: 429 });
  }

  let body: LeadPayload;
  try {
    body = (await request.json()) as LeadPayload;
  } catch {
    return Response.json({ error: "bad_request" }, { status: 400 });
  }

  // Honeypot hit: pretend success so bots don't adapt, deliver nothing.
  if (str(body.website)) {
    return Response.json({ ok: true }, { status: 200 });
  }

  const name = str(body.name, 120);
  const phone = str(body.phone, 40);
  const email = str(body.email, 160);
  // A name and one way to reach them is the minimum needed to follow up.
  if (!name || (!phone && !email)) {
    return Response.json({ error: "missing_fields" }, { status: 422 });
  }

  const kindRaw = str(body.kind, 10);
  const items = readItems(body.items);
  const lead = {
    kind: items.length ? (kindRaw === "sample" ? "sample" : "quote") : "",
    name,
    company: str(body.company, 160),
    email,
    phone,
    country: str(body.country, 80),
    model: str(body.model, 40),
    application: str(body.application, 300),
    adhesive: str(body.adhesive, 200),
    substrate: str(body.substrate, 200),
    address: str(body.address, 500),
    message: str(body.message, 2000),
    page: str(body.page, 80),
    lang: str(body.lang, 8),
  };

  try {
    const outcome = await deliver(lead, items);
    if (outcome === "unconfigured") {
      console.warn("[lead] no delivery configured (LEAD_WEBHOOK_URL or RESEND_API_KEY+LEAD_TO_EMAIL) — client falls back to mailto");
      return Response.json({ error: "not_configured" }, { status: 503 });
    }
    console.log("[lead] delivered", { page: lead.page, lang: lead.lang, model: lead.model, kind: lead.kind, items: items.length });
    return Response.json({ ok: true }, { status: 200 });
  } catch (err) {
    // Delivery was configured but failed: log the full lead as a recovery
    // record, and let the client fall back to mailto.
    console.error("[lead] delivery FAILED — recover manually:", lead, items, err);
    return Response.json({ error: "delivery_failed" }, { status: 502 });
  }
}
