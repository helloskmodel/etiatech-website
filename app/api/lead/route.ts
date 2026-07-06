// Lead capture endpoint for the OmniCure landing pages.
// Validates the payload and returns 200. Delivery is not wired up yet.

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

  // TODO: connect email/CRM delivery (e.g. email to the Thailand sales
  // director, or push into the CRM). For now we accept and acknowledge.
  console.log("[lead]", lead);

  return Response.json({ ok: true }, { status: 200 });
}
