// Lead capture endpoint for the OmniCure landing pages.
//
// Delivery is configured with env vars, first match wins:
//   LEAD_WEBHOOK_URL — POST the lead as JSON (Zapier/Make/Slack/CRM webhook)
//   SMTP_HOST + SMTP_USER + SMTP_PASS
//                    — send through our own company mailbox to LEAD_TO_EMAIL
//                      (default Omnicure@etia-tech.com). Optional SMTP_PORT
//                      (default 465) and LEAD_FROM_EMAIL (default SMTP_USER).
// With neither configured this returns 503 and the form falls back to the
// visitor's mail client (mailto), so no lead is ever silently dropped.
//
// Why SMTP and not a transactional email API: the previous Resend integration
// sent from the shared onboarding@resend.dev address, which only delivers to
// the API account owner's own inbox, so nothing reached the sales mailbox.
// Sending through our own mailbox makes the From address one we actually own,
// so there is no domain to verify and no third-party sending reputation in
// play.
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
  email?: unknown;
  phone?: unknown;
  model?: unknown;
  inquiryType?: unknown;
  message?: unknown;
  page?: unknown;
  lang?: unknown;
  website?: unknown; // honeypot — humans never fill this hidden field
};

const str = (v: unknown, max = 500) =>
  typeof v === "string" ? v.trim().slice(0, max) : "";

// Deliberately permissive — this only rejects what could not be an address at
// all. Anything stricter turns real overseas addresses away, and a typo
// reaching the inbox costs far less than a genuine lead refused at the form.
const looksLikeEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

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

  const host = process.env.SMTP_HOST;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  if (host && user && pass) {
    // Imported here rather than at module scope so the SMTP client is only
    // loaded when it is actually configured — it is dead weight on the cold
    // start of every other request otherwise.
    const { createTransport } = await import("nodemailer");
    const port = Number(process.env.SMTP_PORT) || 465;
    const transport = createTransport({
      host,
      port,
      // 465 is implicit TLS; 587 (and 25) start plaintext and upgrade with
      // STARTTLS, which nodemailer does automatically when secure is false.
      secure: port === 465,
      auth: { user, pass },
      // Fail fast: the caller falls back to mailto, and a hung SMTP dial
      // would otherwise burn the whole function timeout before it could.
      connectionTimeout: 8000,
      greetingTimeout: 8000,
      socketTimeout: 12000,
    });

    const text = Object.entries(lead)
      .filter(([, v]) => v)
      .map(([k, v]) => `${k}: ${v}`)
      .join("\n");

    await transport.sendMail({
      // Defaults to the authenticated mailbox: most providers reject a From
      // the account is not allowed to send as.
      from: process.env.LEAD_FROM_EMAIL || user,
      to: (process.env.LEAD_TO_EMAIL || "Omnicure@etia-tech.com")
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
      // So hitting Reply in the inbox answers the enquirer directly instead of
      // our own send-only mailbox. Only set when they actually left an address.
      ...(lead.email ? { replyTo: lead.email } : {}),
      subject: `New lead — ${lead.name}${lead.model ? ` (${lead.model})` : ""} via ${lead.page || "landing page"}`,
      text,
    });
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
  const email = str(body.email, 160);
  const phone = str(body.phone, 40);
  // A name plus ONE way to reply is the minimum needed to follow up. Email or
  // phone — not both: overseas buyers routinely leave only an email and would
  // abandon a form that demanded a phone number, while callers in our own
  // markets often leave only a number.
  if (!name || (!email && !phone)) {
    return Response.json({ error: "missing_fields" }, { status: 422 });
  }
  if (email && !looksLikeEmail(email)) {
    return Response.json({ error: "invalid_email" }, { status: 422 });
  }

  const lead = {
    name,
    company: str(body.company, 160),
    email,
    phone,
    inquiryType: str(body.inquiryType, 80),
    model: str(body.model, 40),
    message: str(body.message, 2000),
    page: str(body.page, 80),
    lang: str(body.lang, 8),
  };

  try {
    const outcome = await deliver(lead);
    if (outcome === "unconfigured") {
      console.warn("[lead] no delivery configured (LEAD_WEBHOOK_URL or SMTP_HOST+SMTP_USER+SMTP_PASS) — client falls back to mailto");
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
