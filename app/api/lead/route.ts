// Lead capture endpoint for the OmniCure landing pages.
//
// Delivery is configured with env vars, first match wins:
//   LEAD_WEBHOOK_URL                — POST the lead as JSON (Zapier/Make/Slack/CRM webhook)
//   RESEND_API_KEY + LEAD_TO_EMAIL  — email via the Resend API
//                                     (optional LEAD_FROM_EMAIL, default onboarding@resend.dev)
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
  model?: unknown;
  message?: unknown;
  page?: unknown;
  lang?: unknown;
  website?: unknown; // honeypot — humans never fill this hidden field
};

const str = (v: unknown, max = 500) =>
  typeof v === "string" ? v.trim().slice(0, max) : "";

async function deliver(lead: Record<string, string>): Promise<"sent" | "unconfigured"> {
  const webhook = process.env.LEAD_WEBHOOK_URL;
  if (webhook) {
    const res = await fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type: "etiatech-lead", ...lead }),
    });
    if (!res.ok) throw new Error(`webhook ${res.status}`);
    return "sent";
  }

  const resendKey = process.env.RESEND_API_KEY;
  const to = process.env.LEAD_TO_EMAIL;
  if (resendKey && to) {
    const text = Object.entries(lead)
      .filter(([, v]) => v)
      .map(([k, v]) => `${k}: ${v}`)
      .join("\n");
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${resendKey}` },
      body: JSON.stringify({
        from: process.env.LEAD_FROM_EMAIL || "onboarding@resend.dev",
        to: to.split(",").map((s) => s.trim()),
        subject: `New lead — ${lead.name}${lead.model ? ` (${lead.model})` : ""} via ${lead.page || "landing page"}`,
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
  // Name and phone are the minimum needed to follow up.
  if (!name || !phone) {
    return Response.json({ error: "missing_fields" }, { status: 422 });
  }

  const lead = {
    name,
    company: str(body.company, 160),
    phone,
    model: str(body.model, 40),
    message: str(body.message, 2000),
    page: str(body.page, 80),
    lang: str(body.lang, 8),
  };

  try {
    const outcome = await deliver(lead);
    if (outcome === "unconfigured") {
      console.warn("[lead] no delivery configured (LEAD_WEBHOOK_URL or RESEND_API_KEY+LEAD_TO_EMAIL) — client falls back to mailto");
      return Response.json({ error: "not_configured" }, { status: 503 });
    }
    console.log("[lead] delivered", { page: lead.page, lang: lead.lang, model: lead.model });
    return Response.json({ ok: true }, { status: 200 });
  } catch (err) {
    // Delivery was configured but failed: log the full lead as a recovery
    // record, and let the client fall back to mailto.
    console.error("[lead] delivery FAILED — recover manually:", lead, err);
    return Response.json({ error: "delivery_failed" }, { status: 502 });
  }
}
