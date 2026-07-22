import { GoogleGenAI } from "@google/genai";

export const runtime = "nodejs";

// Lazy initialization of GoogleGenAI client
function getGenAIClient() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return null;
  }
  return new GoogleGenAI({ apiKey });
}

const MODEL = "gemini-3.5-flash-lite";

// Dynamic system prompt with exact internal links & brand info
const SYSTEM_PROMPT = `You are the website concierge assistant for Tea Country Holidays, an IATA-accredited boutique travel agency based in Guwahati, Assam, founded by Manami.

Your job is ONLY to help visitors understand the site and the company:
- What Tea Country Holidays does: We specialize in authentic, immersive travel experiences across North-East India (Meghalaya, Assam tea estates & Kaziranga, Arunachal Pradesh including Mechuka Valley & Tawang, Sikkim, Nagaland, Majuli Island) as well as curated domestic (Kerala, Rajasthan, Kashmir, Ladakh, Goa) and international destinations (Bhutan, Nepal).
- How to get in touch: Connect directly via WhatsApp or Phone at +91 8826048272 (or link https://wa.me/918826048272), email, or through our website contact forms. Office: G.S. Road, Christian Basti, Guwahati, Assam 781005.
- General FAQs: We offer both boutique private customized tours and small group departures. Packages include boutique stays, private transfers, guided excursions, and regional activities. Best season for North-East India travel is October through April.
- Where to find things on the site: Tour Packages (/holidays), Boutique Hotels (/hotels), Travel Guides & Stories (/blogs), and FAQs (/faq). Use these exact paths (/holidays, /hotels, /blogs, /faq) when recommending site sections so they format as direct clickable links for the visitor.

You do NOT:
- Build day-by-day itineraries, suggest detailed custom trip schedules, or calculate estimated costs.
- Quote exact prices or confirm live availability.
- Make or imply any direct booking commitments.
For any of the above, inform the visitor to reach out directly via WhatsApp (+91 8826048272) or the website contact form, where our team will assist them personally.

Tone: Warm, welcoming ("Namaste!"), concise, like a luxury boutique travel outfit — elegant, clear, not corporate, not chatty. 2-4 sentences per answer unless the visitor explicitly asks for a list.

If asked something unrelated to Tea Country Holidays or travel in North-East India and our featured destinations, politely explain that it's outside your scope and point them to our contact page.`;

// In-memory rate limiting per IP
const WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const MAX_REQUESTS = 15;
const hits = new Map<string, { windowStart: number; count: number }>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const record = hits.get(ip);
  if (!record || now - record.windowStart > WINDOW_MS) {
    hits.set(ip, { windowStart: now, count: 1 });
    return false;
  }
  record.count += 1;
  return record.count > MAX_REQUESTS;
}

// Cleanup stale entries
if (typeof setInterval !== "undefined") {
  const timer = setInterval(() => {
    const now = Date.now();
    for (const [ip, record] of hits) {
      if (now - record.windowStart > WINDOW_MS) hits.delete(ip);
    }
  }, WINDOW_MS);
  if (timer && typeof timer === "object" && "unref" in timer) {
    (timer as { unref: () => void }).unref();
  }
}

export async function POST(req: Request) {
  try {
    const ai = getGenAIClient();
    if (!ai) {
      return new Response(
        JSON.stringify({
          error: "Gemini API key is not configured. Please add GEMINI_API_KEY to your .env.local file or server environment.",
        }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }

    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";

    if (isRateLimited(ip)) {
      return new Response(
        JSON.stringify({
          error: "Too many messages — please wait a few minutes and try again.",
        }),
        { status: 429, headers: { "Content-Type": "application/json" } }
      );
    }

    const { message, history } = await req.json();

    if (!message || typeof message !== "string" || !message.trim()) {
      return new Response(JSON.stringify({ error: "Message is required." }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    if (message.length > 800) {
      return new Response(
        JSON.stringify({
          error: "That message is a bit long — could you shorten it?",
        }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Retain up to 6 prior turns for conversation continuity
    const priorTurns = Array.isArray(history) ? history.slice(-6) : [];
    const contents = [
      ...priorTurns
        .filter((t: { text?: string; role?: string }) => t && typeof t.text === "string")
        .map((t: { text: string; role?: string }) => ({
          role: t.role === "user" ? "user" : "model",
          parts: [{ text: t.text }],
        })),
      { role: "user", parts: [{ text: message }] },
    ];

    const stream = await ai.models.generateContentStream({
      model: MODEL,
      contents,
      config: {
        systemInstruction: SYSTEM_PROMPT,
        temperature: 0.4,
        maxOutputTokens: 350,
      },
    });

    const encoder = new TextEncoder();
    const body = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of stream) {
            const text = chunk.text;
            if (text) controller.enqueue(encoder.encode(text));
          }
        } catch (err) {
          console.error("Gemini stream chunk error:", err);
          controller.enqueue(
            encoder.encode("\n\n[Sorry, something went wrong processing your request.]")
          );
        } finally {
          controller.close();
        }
      },
    });

    return new Response(body, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-cache",
      },
    });
  } catch (err) {
    console.error("Chat API error:", err);
    return new Response(
      JSON.stringify({ error: "Something went wrong. Please try again." }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
