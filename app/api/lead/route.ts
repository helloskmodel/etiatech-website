// Lead capture endpoint for the OmniCure landing pages.
// Validates the payload, forwards it to the configured delivery webhook,
// and returns 200.

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

// Where to deliver captured leads. Set LEAD_WEBHOOK_URL in the Vercel project
// env to a Slack/Teams incoming webhook, a Zapier/Make hook, or any endpoint
// that accepts a JSON POST. When unset, leads are only logged — so the form
// keeps working with or without delivery configured.
const LEAD_WEBHOOK_URL = process.env.LEAD_WEBHOOK_URL;

type LeadPayload = {
  name?: unknown;
  company?: unknown;
  phone?: unknown;
  model?: unknown;
  message?: unknown;
  page?: unknown;
  lang?: unknown;
};

const str = (v: unknown, max = 500) =>
  typeof v === "string" ? v.trim().slice(0, max) : "";

export async function POST(request: Request) {
  let body: LeadPayload;
  try {
    body = (await request.json()) as LeadPayload;
  } catch {
    return Response.json({ error: "bad_request" }, { status: 400 });
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

  console.log("[lead]", lead);
  await deliver(lead);

  return Response.json({ ok: true }, { status: 200 });
}

// Push the lead to the configured delivery webhook. Delivery failures are
// logged but never surfaced to the visitor — the lead is already captured in
// the server logs, so acknowledging the submission is the right UX either way.
async function deliver(lead: Record<string, string>) {
  if (!LEAD_WEBHOOK_URL) return;
  try {
    const res = await fetch(LEAD_WEBHOOK_URL, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        text: `New OmniCure lead: ${lead.name} (${lead.phone})`,
        lead,
      }),
    });
    if (!res.ok) {
      console.error("[lead] delivery failed", res.status);
    }
  } catch (err) {
    console.error("[lead] delivery error", err);
  }
}
