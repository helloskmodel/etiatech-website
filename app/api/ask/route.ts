import Anthropic from "@anthropic-ai/sdk";
import { KNOWLEDGE_BASE } from "./knowledgeBase";
import { TH_CONTACTS } from "@/app/th/thContact";
import { clientIp, foreignOrigin, rateLimited } from "../rateLimit";

// The chat route talks to a live model and streams, so it must never be
// statically prerendered or cached.
export const dynamic = "force-dynamic";
export const runtime = "nodejs";
export const maxDuration = 60;

const MODEL = process.env.ANTHROPIC_MODEL || "claude-opus-4-8";
const MAX_TOKENS = 2048;
// Trim runaway histories before they reach the model.
const MAX_TURNS = 20;

type Role = "user" | "assistant";
type ChatMessage = { role: Role; content: string };

const LANG_NAME: Record<string, string> = {
  th: "Thai (ภาษาไทย)",
  en: "English",
  zh: "Chinese (简体中文)",
};

function systemPrompt(lang: string): string {
  const langName = LANG_NAME[lang] ?? "the language the customer writes in";
  const { name, phone, email } = TH_CONTACTS.sales;
  return [
    "You are \"Mark Tang\", the digital UV-curing application engineer for ETIA",
    "Technology — the authorized OmniCure distributor in Thailand",
    "(Etiatec (Thailand) Co., Ltd., appointed by Excelitas Canada Inc.). You act",
    "as a knowledgeable, friendly senior applications engineer with deep",
    "hands-on UV curing experience.",
    "",
    "YOUR JOB: help engineers, buyers, and R&D teams choose and apply the right",
    "UV curing system for their process — bonding, sealing, potting, coating,",
    "encapsulation — grounded strictly in the knowledge base provided.",
    "",
    "HARD RULES:",
    `1. Answer in ${langName}. Match the customer's language if they switch.`,
    "2. Every product name, specification, wavelength, irradiance and figure you",
    "   state MUST come from the knowledge base. NEVER invent or estimate specs,",
    "   model numbers, or performance numbers. If a detail is not in the",
    "   knowledge base, say you don't have that figure and offer to confirm it",
    "   with the ETIA team.",
    "3. ETIA Thailand is the authorized, in-stock distributor for the OmniCure UV",
    "   Spot Curing family (marked \"IN STOCK\" in the knowledge base). Prefer these",
    "   for recommendations. If an application genuinely needs another OmniCure",
    "   system, name it honestly but note it is sourced on request, and route the",
    "   customer to the sales director to arrange it.",
    "4. You cannot quote prices, lead times, or stock levels. For pricing, quotes,",
    "   RFQ/tender, delivery, on-site support or anything commercial, hand off to",
    `   the Thailand Sales Director: ${name}, tel ${phone}, email ${email}.`,
    "5. Be concise and practical. Lead with a direct recommendation, then the",
    "   short reason. Use the application notes and case studies as evidence, and",
    "   cite them by their bracketed ID (e.g. [AN-MED-001], [B1]) when relevant.",
    "6. Stay on UV curing, ETIA products, and their applications. Politely decline",
    "   unrelated requests.",
    "",
    "When you don't have enough detail about the customer's process (substrate,",
    "adhesive, throughput, geometry), ask one or two focused questions before",
    "recommending.",
  ].join("\n");
}

function sanitize(raw: unknown): ChatMessage[] {
  if (!Array.isArray(raw)) return [];
  const out: ChatMessage[] = [];
  for (const m of raw) {
    if (!m || typeof m !== "object") continue;
    const role = (m as { role?: unknown }).role;
    const content = (m as { content?: unknown }).content;
    if ((role === "user" || role === "assistant") && typeof content === "string") {
      const text = content.trim();
      if (text) out.push({ role, content: text.slice(0, 8000) });
    }
  }
  // Keep only the most recent turns and ensure it starts with a user message.
  const trimmed = out.slice(-MAX_TURNS);
  while (trimmed.length && trimmed[0].role !== "user") trimmed.shift();
  return trimmed;
}

// Abuse protection for a public model-backed endpoint: per-IP rate limit
// (burst + sustained), an origin check, and a hard payload cap. In-memory, so
// per-instance on serverless — enough to stop casual abuse and runaway loops;
// move to a shared store (e.g. Upstash) if it ever needs to be watertight.
const MAX_BODY_BYTES = 64_000;

export async function POST(request: Request) {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    // Graceful when the key isn't configured yet: the widget shows a friendly
    // fallback pointing to the sales director instead of erroring out.
    return Response.json({ error: "not_configured" }, { status: 503 });
  }

  if (foreignOrigin(request)) {
    return Response.json({ error: "forbidden" }, { status: 403 });
  }
  const ip = clientIp(request);
  if (rateLimited(`ask:burst:${ip}`, 8, 60_000) || rateLimited(`ask:sustained:${ip}`, 60, 60 * 60_000)) {
    return Response.json({ error: "rate_limited" }, { status: 429 });
  }
  const contentLength = Number(request.headers.get("content-length") ?? 0);
  if (contentLength > MAX_BODY_BYTES) {
    return Response.json({ error: "too_large" }, { status: 413 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "bad_request" }, { status: 400 });
  }

  const { messages: rawMessages, lang: rawLang } = (body ?? {}) as {
    messages?: unknown;
    lang?: unknown;
  };
  const lang = typeof rawLang === "string" && rawLang in LANG_NAME ? rawLang : "en";
  const messages = sanitize(rawMessages);
  if (!messages.length) {
    return Response.json({ error: "empty" }, { status: 400 });
  }

  const client = new Anthropic({ apiKey });

  let stream;
  try {
    stream = client.messages.stream({
      model: MODEL,
      max_tokens: MAX_TOKENS,
      system: [
        { type: "text", text: systemPrompt(lang) },
        {
          type: "text",
          text: KNOWLEDGE_BASE,
          // Cache the large knowledge base so repeat requests don't re-bill it.
          cache_control: { type: "ephemeral" },
        },
      ],
      messages,
    });
  } catch {
    return Response.json({ error: "upstream" }, { status: 502 });
  }

  const encoder = new TextEncoder();
  const readable = new ReadableStream<Uint8Array>({
    async start(controller) {
      try {
        for await (const event of stream) {
          if (
            event.type === "content_block_delta" &&
            event.delta.type === "text_delta"
          ) {
            controller.enqueue(encoder.encode(event.delta.text));
          }
        }
        const final = await stream.finalMessage();
        if (final.stop_reason === "refusal") {
          controller.enqueue(
            encoder.encode(
              "\n\n[I can't help with that request. For anything else about UV curing, I'm happy to help.]"
            )
          );
        }
      } catch {
        controller.enqueue(encoder.encode("\n\n[connection interrupted]"));
      } finally {
        controller.close();
      }
    },
  });

  return new Response(readable, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-store",
      "X-Accel-Buffering": "no",
    },
  });
}
