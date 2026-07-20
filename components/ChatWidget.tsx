"use client";

import { useEffect, useRef, useState, CSSProperties } from "react";
import Link from "next/link";

// ── Design tokens ────────────────────────────────────────────────────────
const TOKENS: CSSProperties & Record<string, string> = {
  "--tch-green-deep": "#152B25",
  "--tch-green-mid": "#20463C",
  "--tch-gold": "#C7A045",
  "--tch-gold-soft": "#E8CE8B",
  "--tch-gold-dim": "#8C7134",
  "--tch-cream": "#F8F3E6",
  "--tch-cream-dim": "#EEE4CB",
  "--tch-ink": "#20342C",
  "--tch-font-display": "var(--font-kentish, 'Playfair Display', 'Georgia', serif)",
  "--tch-font-body": "var(--font-inter, 'DM Sans', system-ui, sans-serif)",
};

const NOISE_URI =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='120' height='120' filter='url(%23n)' opacity='0.5'/%3E%3C/svg%3E";

interface Message {
  role: "user" | "assistant";
  text: string;
}

const GREETING: Message = {
  role: "assistant",
  text: "Namaste! I am your Tea Country Holidays assistant. I can help with details about our North-East experiences, tour packages, best travel seasons, and contact options. How may I assist you today?",
};

const SUGGESTIONS = [
  "🌿 What tour packages do you offer?",
  "🗓️ Best season to visit North-East India?",
  "📱 How do I reach out to book a trip?",
];

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([GREETING]);
  const [input, setInput] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) inputRef.current?.focus();
  }, [isOpen]);

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, isSending]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape" && isOpen) setIsOpen(false);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen]);

  async function handleSend(textToSend?: string) {
    const text = (textToSend || input).trim();
    if (!text || isSending) return;

    setError(null);
    setInput("");
    const nextMessages: Message[] = [...messages, { role: "user", text }];
    setMessages([...nextMessages, { role: "assistant", text: "" }]);
    setIsSending(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: text,
          history: nextMessages.slice(0, -1),
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Something went wrong.");
      }

      if (!res.body) throw new Error("No response body stream received.");

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let assembled = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        assembled += decoder.decode(value, { stream: true });
        setMessages((prev) => {
          const copy = [...prev];
          copy[copy.length - 1] = { role: "assistant", text: assembled };
          return copy;
        });
      }
    } catch (err: any) {
      setError(err.message || "Something went wrong. Please try again.");
      setMessages((prev) => prev.slice(0, -1));
    } finally {
      setIsSending(false);
    }
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }

  function handleReset() {
    setMessages([GREETING]);
    setError(null);
    setInput("");
  }

  return (
    <div style={TOKENS} className="tch-root">
      {!isOpen && (
        <button
          aria-label="Open Concierge Chat"
          onClick={() => setIsOpen(true)}
          className="tch-fab-wrap"
          title="Chat with Concierge"
        >
          <SteamCurl style={{ left: 10 }} delay="0s" />
          <SteamCurl style={{ left: 26 }} delay="1.3s" />
          <span className="tch-fab-ring" />
          <span className="tch-fab-core">
            <LeafMark />
          </span>
          <span className="tch-badge-dot" />
        </button>
      )}

      {isOpen && (
        <div
          className="tch-panel"
          role="dialog"
          aria-label="Tea Country Holidays chat"
        >
          <CornerFlourish className="tch-corner-tl" />

          <header className="tch-header">
            <BranchDecor className="tch-branch" />
            <div className="flex items-center justify-between">
              <div>
                <p className="tch-kicker">Tea Country Holidays</p>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <p className="tch-title">Concierge Desk</p>
                </div>
              </div>
              <div className="flex items-center gap-1 z-10">
                <button
                  aria-label="Reset conversation"
                  onClick={handleReset}
                  className="tch-icon-btn"
                  title="Reset conversation"
                >
                  <RefreshIcon />
                </button>
                <button
                  aria-label="Close chat"
                  onClick={() => setIsOpen(false)}
                  className="tch-close"
                  title="Close"
                >
                  ×
                </button>
              </div>
            </div>
            <div className="tch-divider mt-2">
              <span /> <LeafMark size={11} /> <span />
            </div>
          </header>

          <div ref={scrollRef} className="tch-messages">
            {messages.map((m, i) => (
              <div key={i} className={`tch-bubble-row ${m.role}`}>
                {m.role === "assistant" && (
                  <span className="tch-avatar">
                    <LeafMark size={12} />
                  </span>
                )}
                <div className={`tch-bubble ${m.role}`}>
                  {m.text ? (
                    <FormattedText text={m.text} />
                  ) : isSending && i === messages.length - 1 ? (
                    <TypingDots />
                  ) : (
                    ""
                  )}
                </div>
              </div>
            ))}

            {/* Quick Suggestion Chips when only greeting exists */}
            {messages.length === 1 && !isSending && (
              <div className="tch-suggestions">
                <p className="tch-sugg-title">Quick Questions:</p>
                <div className="flex flex-col gap-1.5">
                  {SUGGESTIONS.map((sugg, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSend(sugg)}
                      className="tch-sugg-chip"
                    >
                      {sugg}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {error && <p className="tch-error">{error}</p>}
          </div>

          <div className="tch-input-row">
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask about tours, regions, seasons..."
              disabled={isSending}
              className="tch-input"
            />
            <button
              onClick={() => handleSend()}
              disabled={isSending || !input.trim()}
              aria-label="Send message"
              className="tch-send"
            >
              <LeafMark size={14} />
            </button>
          </div>
          <CornerFlourish className="tch-corner-br" flip />
        </div>
      )}

      <style jsx>{`
        .tch-root {
          position: fixed;
          right: 20px;
          bottom: 80px; /* Elevated to sit nicely above FloatingActionBar */
          z-index: 60;
          font-family: var(--tch-font-body);
        }

        /* ── FAB: rotating gold seal ─────────────────────────────── */
        .tch-fab-wrap {
          position: relative;
          width: 64px;
          height: 64px;
          border: none;
          background: none;
          cursor: pointer;
          padding: 0;
        }
        .tch-fab-ring {
          position: absolute;
          inset: 0;
          border-radius: 50%;
          background: conic-gradient(
            from 0deg,
            var(--tch-gold-dim),
            var(--tch-gold-soft),
            var(--tch-gold-dim) 50%,
            var(--tch-gold-soft) 75%,
            var(--tch-gold-dim)
          );
          animation: tch-spin 9s linear infinite;
          box-shadow: 0 8px 22px rgba(21, 43, 37, 0.4);
        }
        .tch-fab-core {
          position: absolute;
          inset: 4px;
          border-radius: 50%;
          background: radial-gradient(
            circle at 32% 28%,
            var(--tch-green-mid),
            var(--tch-green-deep) 75%
          );
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--tch-gold-soft);
          transition: transform 0.2s ease;
        }
        .tch-fab-wrap:hover .tch-fab-core {
          transform: scale(1.06);
        }
        .tch-badge-dot {
          position: absolute;
          top: 2px;
          right: 2px;
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: #10b981;
          border: 2px solid var(--tch-green-deep);
        }
        @keyframes tch-spin {
          to {
            transform: rotate(360deg);
          }
        }

        /* ── Panel ────────────────────────────────────────────────── */
        .tch-panel {
          position: relative;
          width: 372px;
          max-width: calc(100vw - 32px);
          height: 540px;
          max-height: calc(100vh - 120px);
          background: var(--tch-cream);
          border-radius: 4px 18px 18px 18px;
          box-shadow:
            0 22px 60px rgba(21, 43, 37, 0.32),
            0 0 0 1px var(--tch-gold-dim);
          display: flex;
          flex-direction: column;
          overflow: hidden;
          transform-origin: bottom right;
          animation: tch-unfurl 0.38s cubic-bezier(0.19, 1, 0.22, 1);
        }
        @keyframes tch-unfurl {
          from {
            opacity: 0;
            transform: scale(0.9) translateY(12px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }

        .tch-corner-tl {
          position: absolute;
          top: 0;
          left: 0;
          width: 46px;
          height: 46px;
          color: var(--tch-gold-soft);
          opacity: 0.55;
          pointer-events: none;
          z-index: 2;
        }
        .tch-corner-br {
          position: absolute;
          bottom: 46px;
          right: 0;
          width: 40px;
          height: 40px;
          color: var(--tch-gold);
          opacity: 0.4;
          pointer-events: none;
        }

        /* ── Header ───────────────────────────────────────────────── */
        .tch-header {
          position: relative;
          background: linear-gradient(
            160deg,
            var(--tch-green-mid),
            var(--tch-green-deep) 80%
          );
          padding: 16px 16px 14px 20px;
          overflow: hidden;
        }
        .tch-branch {
          position: absolute;
          right: -6px;
          top: -8px;
          width: 130px;
          height: 90px;
          color: var(--tch-gold-soft);
          opacity: 0.16;
          pointer-events: none;
        }
        .tch-kicker {
          position: relative;
          margin: 0;
          font-size: 10px;
          letter-spacing: 2.2px;
          text-transform: uppercase;
          color: var(--tch-gold-soft);
          opacity: 0.85;
        }
        .tch-title {
          position: relative;
          margin: 0;
          font-family: var(--tch-font-display);
          font-size: 20px;
          color: var(--tch-cream);
          letter-spacing: 0.2px;
        }
        .tch-divider {
          position: relative;
          display: flex;
          align-items: center;
          gap: 8px;
          color: var(--tch-gold);
        }
        .tch-divider span {
          height: 1px;
          flex: 1;
          background: linear-gradient(
            90deg,
            transparent,
            var(--tch-gold-dim) 20%,
            var(--tch-gold-dim) 80%,
            transparent
          );
        }
        .tch-icon-btn {
          background: none;
          border: none;
          color: var(--tch-gold-soft);
          cursor: pointer;
          padding: 4px;
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0.8;
          transition: opacity 0.15s;
        }
        .tch-icon-btn:hover {
          opacity: 1;
        }
        .tch-close {
          background: none;
          border: none;
          color: var(--tch-gold-soft);
          font-size: 22px;
          line-height: 1;
          cursor: pointer;
          padding: 2px 4px;
          opacity: 0.85;
          transition: opacity 0.15s;
        }
        .tch-close:hover {
          opacity: 1;
        }

        /* ── Messages ─────────────────────────────────────────────── */
        .tch-messages {
          flex: 1;
          overflow-y: auto;
          padding: 16px 14px;
          display: flex;
          flex-direction: column;
          gap: 12px;
          background-color: var(--tch-cream);
          background-image: url("${NOISE_URI}"),
            repeating-linear-gradient(
              135deg,
              rgba(199, 160, 69, 0.05) 0px,
              rgba(199, 160, 69, 0.05) 1px,
              transparent 1px,
              transparent 13px
            );
          background-blend-mode: multiply, normal;
        }

        .tch-bubble-row {
          display: flex;
          align-items: flex-end;
          gap: 7px;
        }
        .tch-bubble-row.user {
          justify-content: flex-end;
        }
        .tch-avatar {
          width: 22px;
          height: 22px;
          border-radius: 50%;
          background: var(--tch-green-deep);
          color: var(--tch-gold-soft);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          margin-bottom: 2px;
        }

        .tch-bubble {
          max-width: 82%;
          padding: 10px 13px;
          font-size: 13.5px;
          line-height: 1.55;
          box-shadow: 0 2px 6px rgba(21, 43, 37, 0.08);
        }
        .tch-bubble.assistant {
          background: #fffdf8;
          color: var(--tch-ink);
          border: 1px solid var(--tch-cream-dim);
          border-left: 2.5px solid var(--tch-gold);
          border-radius: 4px 14px 14px 14px;
          min-height: 18px;
        }
        .tch-bubble.user {
          background: linear-gradient(
            160deg,
            var(--tch-green-mid),
            var(--tch-green-deep)
          );
          color: var(--tch-cream);
          border-radius: 14px 4px 14px 14px;
        }

        /* ── Suggestions ──────────────────────────────────────────── */
        .tch-suggestions {
          margin-top: 4px;
          padding: 10px 12px;
          background: rgba(255, 253, 248, 0.7);
          border: 1px dashed var(--tch-gold-soft);
          border-radius: 10px;
        }
        .tch-sugg-title {
          margin: 0 0 6px;
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 1px;
          color: var(--tch-gold-dim);
          font-weight: 600;
        }
        .tch-sugg-chip {
          text-align: left;
          background: var(--tch-cream-dim);
          border: 1px solid var(--tch-gold-soft);
          color: var(--tch-ink);
          padding: 6px 10px;
          border-radius: 6px;
          font-size: 12px;
          cursor: pointer;
          transition: all 0.15s ease;
        }
        .tch-sugg-chip:hover {
          background: var(--tch-gold-soft);
          color: var(--tch-green-deep);
          transform: translateX(2px);
        }

        .tch-error {
          color: #9a3b2f;
          font-size: 12px;
          text-align: center;
          margin: 4px 0 0;
        }

        /* ── Input ────────────────────────────────────────────────── */
        .tch-input-row {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 12px 14px 14px;
          background: var(--tch-cream);
          border-top: 1px solid var(--tch-cream-dim);
        }
        .tch-input {
          flex: 1;
          border: none;
          border-bottom: 1px solid var(--tch-gold-dim);
          background: transparent;
          padding: 6px 2px;
          font-size: 13.5px;
          font-style: italic;
          color: var(--tch-ink);
          outline: none;
          font-family: var(--tch-font-body);
        }
        .tch-input:focus {
          border-bottom-color: var(--tch-gold);
        }
        .tch-input::placeholder {
          color: var(--tch-gold-dim);
        }
        .tch-send {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          border: 1px solid var(--tch-gold);
          background: var(--tch-cream-dim);
          color: var(--tch-gold-dim);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          flex-shrink: 0;
          transition: all 0.15s ease;
        }
        .tch-send:not(:disabled):hover {
          background: var(--tch-gold);
          color: var(--tch-green-deep);
        }
        .tch-send:disabled {
          opacity: 0.4;
          cursor: default;
        }

        @media (max-width: 420px) {
          .tch-root {
            right: 12px;
            bottom: 76px;
          }
          .tch-panel {
            width: calc(100vw - 24px);
            height: calc(100vh - 100px);
          }
        }
      `}</style>
    </div>
  );
}

// ── Lightweight Rich Formatter ──────────────────────────────────────────
function FormattedText({ text }: { text: string }) {
  // Parse simple bold, links, linebreaks
  const lines = text.split("\n");

  return (
    <div className="space-y-1.5">
      {lines.map((line, lIdx) => {
        if (!line.trim()) return <div key={lIdx} className="h-1" />;

        const isBullet = line.trim().startsWith("- ") || line.trim().startsWith("* ");
        const content = isBullet ? line.trim().substring(2) : line;

        return (
          <div key={lIdx} className={isBullet ? "pl-3 relative" : ""}>
            {isBullet && (
              <span className="absolute left-0 text-amber-600 font-bold">•</span>
            )}
            {renderInlineFormatting(content)}
          </div>
        );
      })}
    </div>
  );
}

function renderInlineFormatting(text: string) {
  // Regex to match bold **text**, paths like /holidays, /hotels, /faq, /blogs or WhatsApp links
  const parts = text.split(/(\*\*.*?\*\*|\/holidays|\/hotels|\/faq|\/blogs|https:\/\/wa\.me\/\d+)/g);

  return parts.map((part, index) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={index} className="font-semibold text-emerald-950">
          {part.slice(2, -2)}
        </strong>
      );
    }
    if (part === "/holidays" || part === "/hotels" || part === "/faq" || part === "/blogs") {
      return (
        <Link
          key={index}
          href={part}
          className="text-amber-700 underline font-medium hover:text-amber-900"
        >
          {part === "/holidays"
            ? "Tour Packages"
            : part === "/hotels"
            ? "Boutique Hotels"
            : part === "/blogs"
            ? "Travel Guides"
            : "FAQs"}
        </Link>
      );
    }
    if (part.startsWith("https://wa.me/")) {
      return (
        <a
          key={index}
          href={part}
          target="_blank"
          rel="noopener noreferrer"
          className="text-emerald-700 underline font-medium hover:text-emerald-900"
        >
          WhatsApp Us
        </a>
      );
    }
    return part;
  });
}

function TypingDots() {
  return (
    <span className="tch-typing">
      <i />
      <i />
      <i />
      <style jsx>{`
        .tch-typing {
          display: inline-flex;
          gap: 4px;
          align-items: center;
          height: 14px;
        }
        .tch-typing i {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: var(--tch-gold);
          display: inline-block;
          animation: tch-bob 1.1s ease-in-out infinite;
        }
        .tch-typing i:nth-child(2) {
          animation-delay: 0.15s;
        }
        .tch-typing i:nth-child(3) {
          animation-delay: 0.3s;
        }
        @keyframes tch-bob {
          0%,
          60%,
          100% {
            transform: translateY(0);
            opacity: 0.5;
          }
          30% {
            transform: translateY(-4px);
            opacity: 1;
          }
        }
      `}</style>
    </span>
  );
}

function SteamCurl({
  style,
  delay,
}: {
  style?: CSSProperties;
  delay: string;
}) {
  return (
    <svg
      className="tch-steam"
      style={{
        position: "absolute",
        top: -16,
        width: 14,
        height: 22,
        ...style,
      }}
      viewBox="0 0 14 22"
      fill="none"
    >
      <path
        d="M3 21c3-3-3-5 0-8s-3-5 0-8"
        stroke="var(--tch-gold-soft)"
        strokeWidth="1.3"
        strokeLinecap="round"
      />
      <style jsx>{`
        .tch-steam {
          animation: tch-rise 3.2s ease-in-out infinite;
          animation-delay: ${delay};
          opacity: 0;
        }
        @keyframes tch-rise {
          0% {
            opacity: 0;
            transform: translateY(4px);
          }
          25% {
            opacity: 0.75;
          }
          80% {
            opacity: 0;
            transform: translateY(-10px);
          }
          100% {
            opacity: 0;
            transform: translateY(-10px);
          }
        }
      `}</style>
    </svg>
  );
}

function LeafMark({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path
        d="M5 19C5 10 11 5 19 5c0 8-5 14-14 14Z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
      <path
        d="M5 19c3-5 6-8 12-12"
        stroke="currentColor"
        strokeWidth="1.1"
        strokeLinecap="round"
      />
    </svg>
  );
}

function BranchDecor({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 130 90" fill="none">
      <path
        d="M128 4C90 8 60 22 44 46c-10 14-14 28-30 34"
        stroke="currentColor"
        strokeWidth="1.1"
      />
      <path d="M84 14c-3 6-2 11 4 14" stroke="currentColor" strokeWidth="1" />
      <path d="M62 32c-3 6-2 11 4 14" stroke="currentColor" strokeWidth="1" />
      <path d="M42 52c-3 6-2 11 4 14" stroke="currentColor" strokeWidth="1" />
      <path d="M108 8c-2 5-1 9 4 11" stroke="currentColor" strokeWidth="1" />
    </svg>
  );
}

function CornerFlourish({
  className,
  flip,
}: {
  className?: string;
  flip?: boolean;
}) {
  return (
    <svg
      className={className}
      viewBox="0 0 46 46"
      fill="none"
      style={flip ? { transform: "scaleX(-1)" } : undefined}
    >
      <path d="M2 30C2 12 12 2 30 2" stroke="currentColor" strokeWidth="1" />
      <path
        d="M2 22C2 10 10 2 22 2"
        stroke="currentColor"
        strokeWidth="0.8"
        opacity="0.6"
      />
      <circle cx="2" cy="30" r="1.6" fill="currentColor" />
    </svg>
  );
}

function RefreshIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8" />
      <path d="M21 3v5h-5" />
    </svg>
  );
}
