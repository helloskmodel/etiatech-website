// Lead capture endpoint.
//
// Delivery is plain SMTP through ETIA's own mailbox — no third-party sending
// service. (It used to go through Resend, whose default sender
// `onboarding@resend.dev` can only deliver to the Resend account owner's own
// address; pointed at Omnicure@etia-tech.com it was rejected, the request
// returned 502, and the form silently fell back to mailto — so leads were lost
// with nobody noticing. Sending from the mailbox that actually owns the domain
// removes that whole class of failure.)
//
// Required env vars (set them in the Vercel project):
//   SMTP_HOST      e.g. smtp.exmail.qq.com  (腾讯企业邮) / smtp.qiye.aliyun.com
//   SMTP_PORT      465 (implicit TLS) or 587 (STARTTLS)
//   SMTP_USER      the full mailbox address used to log in
//   SMTP_PASS      mailbox password or provider-issued app/authorization code
// Optional:
//   SMTP_SECURE    "true"/"false" — defaults to true when port is 465
//   LEAD_FROM_EMAIL  defaults to SMTP_USER. Most providers REJECT a From that
//                    differs from the authenticated mailbox, so only set this
//                    if your provider allows the alias.
//   LEAD_TO_EMAIL    recipients, comma-separated (default Omnicure@etia-tech.com)
//   LEAD_WEBHOOK_URL if set, the lead is POSTed here INSTEAD of emailed
//                    (kept for a future CRM/企业微信 hook; unset by default)
//
// With nothing configured this returns 503 and the form tells the visitor to
// email or message us directly — it never pretends the lead was delivered.
//
// Privacy: lead contact details are NOT logged on the happy path — only a
// redacted summary. The full lead is logged only if a configured delivery
// fails, as a last-resort recovery record.

import nodemailer from "nodemailer";

import { clientIp, foreignOrigin, rateLimited } from "../rateLimit";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

type LeadPayload = {
  name?: unknown;
  company?: unknown;
  phone?: unknown;
  email?: unknown;
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

  const host = process.env.SMTP_HOST;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  if (!host || !user || !pass) return "unconfigured";

  const port = Number(process.env.SMTP_PORT) || 465;
  // Port 465 is implicit TLS; 587 upgrades via STARTTLS. Providers differ, so
  // allow an explicit override, but default from the port so the common cases
  // need no extra config.
  const secure = process.env.SMTP_SECURE
    ? process.env.SMTP_SECURE === "true"
    : port === 465;

  const transport = nodemailer.createTransport({
    host,
    port,
    secure,
    auth: { user, pass },
    // Serverless: every request is a cold connection, so don't pool. Keep the
    // timeouts well inside the function's own limit — a hung SMTP handshake
    // must surface as a clear error, not as a killed function with no log.
    pool: false,
    connectionTimeout: 8000,
    greetingTimeout: 8000,
    socketTimeout: 10_000,
  });

  const to = process.env.LEAD_TO_EMAIL || "Omnicure@etia-tech.com";
  const text = Object.entries(lead)
    .filter(([, v]) => v)
    .map(([k, v]) => `${k}: ${v}`)
    .join("\n");

  try {
    await transport.sendMail({
      // Default to the authenticated mailbox: nearly every provider rejects a
      // From it doesn't own, and that rejection is exactly how the previous
      // setup lost every lead.
      from: process.env.LEAD_FROM_EMAIL || user,
      to: to.split(",").map((s) => s.trim()).filter(Boolean),
      // So sales can just hit Reply and land in the customer's inbox.
      replyTo: lead.email || undefined,
      subject: `网站询盘 — ${lead.name}${lead.company ? ` / ${lead.company}` : ""}${
        lead.model ? ` (${lead.model})` : ""
      }`,
      text,
    });
  } finally {
    transport.close();
  }
  return "sent";
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
    email: str(body.email, 160),
    model: str(body.model, 40),
    message: str(body.message, 2000),
    page: str(body.page, 80),
    lang: str(body.lang, 8),
  };

  try {
    const outcome = await deliver(lead);
    if (outcome === "unconfigured") {
      console.warn("[lead] no delivery configured — set SMTP_HOST / SMTP_USER / SMTP_PASS in the Vercel project");
      return Response.json({ error: "not_configured" }, { status: 503 });
    }
    console.log("[lead] delivered", { page: lead.page, lang: lead.lang, model: lead.model });
    return Response.json({ ok: true }, { status: 200 });
  } catch (err) {
    // Delivery was configured but failed. Log the full lead as a recovery
    // record — this is the only copy that exists.
    console.error("[lead] delivery FAILED — recover manually:", lead, err);
    // Surface a coarse reason so a single curl against this endpoint says what
    // is wrong. The previous version returned a bare 502, which is why nobody
    // could tell a missing API key from a rejected sender.
    const reason =
      err instanceof Error
        ? /auth|535|password|credential/i.test(err.message)
          ? "smtp_auth_rejected"
          : /timeout|ETIMEDOUT|ECONNREFUSED|ENOTFOUND|EAI_AGAIN/i.test(err.message)
            ? "smtp_unreachable"
            : /from|sender|553|550/i.test(err.message)
              ? "smtp_sender_rejected"
              : "smtp_error"
        : "smtp_error";
    return Response.json({ error: "delivery_failed", reason }, { status: 502 });
  }
}
