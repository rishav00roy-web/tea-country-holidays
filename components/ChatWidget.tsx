"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

interface Message {
  role: "user" | "assistant";
  text: string;
}

const GREETING: Message = {
  role: "assistant",
  text: "Namaste! I am your Tea Country Holidays concierge assistant. Ask me anything about our North-East travel packages, best seasons to visit, or how to contact our team.",
};

const SUGGESTIONS = [
  "🌿 What tour packages do you offer?",
  "🗓️ Best season to visit North-East India?",
  "📱 How do I contact the team to book?",
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
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
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

      if (!res.body) throw new Error("No response body received.");

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      const chunks: string[] = [];

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        chunks.push(decoder.decode(value, { stream: true }));
        const assembled = chunks.join("");
        setMessages((prev) => {
          const copy = [...prev];
          copy[copy.length - 1] = { role: "assistant", text: assembled };
          return copy;
        });
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Something went wrong. Please try again.";
      setError(message);
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
    <div className="fixed right-4 sm:right-6 bottom-24 z-[45]">
      {/* ── FAB Button ───────────────────────────────────────────── */}
      {!isOpen && (
        <button
          aria-label="Open Concierge Chat"
          onClick={() => setIsOpen(true)}
          className="relative group w-14 h-14 rounded-full bg-gradient-to-br from-[#20463C] to-[#152B25] border-2 border-[#C7A045] text-[#E8CE8B] flex items-center justify-center shadow-xl hover:scale-105 transition-all duration-200"
          title="Chat with Concierge"
        >
          <LeafMark size={24} />
          <span className="absolute top-0 right-0 w-3.5 h-3.5 bg-emerald-500 border-2 border-[#152B25] rounded-full animate-pulse" />
        </button>
      )}

      {/* ── Chat Modal Panel ────────────────────────────────────── */}
      {isOpen && (
        <div
          role="dialog"
          aria-label="Tea Country Holidays chat"
          className="relative w-[360px] sm:w-[380px] max-w-[calc(100vw-32px)] h-[520px] max-h-[calc(100vh-110px)] bg-[#F8F3E6] rounded-2xl border border-[#C7A045]/40 shadow-2xl flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200"
        >
          {/* Header */}
          <header className="relative bg-gradient-to-br from-[#20463C] to-[#152B25] p-4 text-[#F8F3E6] overflow-hidden shrink-0">
            {/* Background Branch SVG */}
            <svg
              className="absolute right-[-6px] top-[-8px] w-[130px] h-[90px] text-[#E8CE8B] opacity-15 pointer-events-none"
              viewBox="0 0 130 90"
              fill="none"
            >
              <path
                d="M128 4C90 8 60 22 44 46c-10 14-14 28-30 34"
                stroke="currentColor"
                strokeWidth="1.1"
              />
              <path d="M84 14c-3 6-2 11 4 14" stroke="currentColor" strokeWidth="1" />
              <path d="M62 32c-3 6-2 11 4 14" stroke="currentColor" strokeWidth="1" />
              <path d="M42 52c-3 6-2 11 4 14" stroke="currentColor" strokeWidth="1" />
            </svg>

            <div className="flex items-center justify-between relative z-10">
              <div>
                <p className="text-[10px] tracking-[2px] uppercase text-[#E8CE8B] font-medium opacity-90">
                  Tea Country Holidays
                </p>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <h3 className="text-lg font-serif text-[#F8F3E6] font-semibold tracking-wide">
                    Concierge Desk
                  </h3>
                </div>
              </div>

              <div className="flex items-center gap-1">
                <button
                  aria-label="Reset conversation"
                  onClick={handleReset}
                  className="p-1.5 text-[#E8CE8B] hover:text-white transition rounded-full hover:bg-white/10 min-w-[44px] min-h-[44px] flex items-center justify-center"
                  title="Reset conversation"
                >
                  <RefreshIcon />
                </button>
                <button
                  aria-label="Close chat"
                  onClick={() => setIsOpen(false)}
                  className="p-1 text-[#E8CE8B] hover:text-white text-2xl leading-none transition rounded-full hover:bg-white/10 px-2 min-w-[44px] min-h-[44px] flex items-center justify-center"
                  title="Close"
                >
                  ×
                </button>
              </div>
            </div>

            {/* Divider */}
            <div className="flex items-center gap-2 mt-3 text-[#C7A045] relative z-10">
              <span className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-[#C7A045]/40 to-transparent" />
              <LeafMark size={11} />
              <span className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-[#C7A045]/40 to-transparent" />
            </div>
          </header>

          {/* Messages Feed */}
          <div
            ref={scrollRef}
            className="flex-1 overflow-y-auto p-3.5 space-y-3 bg-[#F8F3E6]"
          >
            {messages.map((m, i) => (
              <div
                key={i}
                className={`flex items-start gap-2 ${
                  m.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                {m.role === "assistant" && (
                  <div className="w-6 h-6 rounded-full bg-[#152B25] text-[#E8CE8B] flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                    <LeafMark size={12} />
                  </div>
                )}
                <div
                  className={`p-3 text-[13px] leading-relaxed shadow-sm max-w-[82%] ${
                    m.role === "assistant"
                      ? "bg-[#FFFDF8] text-[#20342C] border border-[#EEE4CB] border-l-2 border-l-[#C7A045] rounded-tr-xl rounded-br-xl rounded-bl-xl"
                      : "bg-gradient-to-br from-[#20463C] to-[#152B25] text-[#F8F3E6] rounded-tl-xl rounded-bl-xl rounded-br-xl"
                  }`}
                >
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

            {/* Quick Suggestion Chips */}
            {messages.length === 1 && !isSending && (
              <div className="mt-2 p-3 bg-white/80 border border-[#C7A045]/30 rounded-xl space-y-1.5">
                <p className="text-[10px] font-semibold uppercase tracking-wider text-[#6B5520]">
                  Suggested Questions:
                </p>
                <div className="flex flex-col gap-1.5">
                  {SUGGESTIONS.map((sugg, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSend(sugg)}
                      className="text-left bg-[#EEE4CB]/60 hover:bg-[#C7A045] hover:text-[#152B25] text-[#20342C] px-3 py-1.5 rounded-lg text-xs transition-colors font-medium border border-[#8C7134]/20"
                    >
                      {sugg}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {error && (
              <p className="text-xs text-red-700 text-center bg-red-50 p-2 rounded-lg border border-red-200">
                {error}
              </p>
            )}
          </div>

          {/* Input Area */}
          <div className="p-3 bg-[#F8F3E6] border-t border-[#EEE4CB] flex items-center gap-2 shrink-0">
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask about tours, regions, seasons..."
              disabled={isSending}
              className="flex-1 bg-transparent border-b border-[#8C7134] focus:border-[#C7A045] outline-none px-2 py-1.5 text-base text-[#20342C] placeholder-[#6B5520] italic"
            />
            <button
              onClick={() => handleSend()}
              disabled={isSending || !input.trim()}
              aria-label="Send message"
              className="w-11 h-11 rounded-full border border-[#C7A045] bg-[#EEE4CB] text-[#8C7134] hover:bg-[#C7A045] hover:text-[#152B25] flex items-center justify-center shrink-0 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <LeafMark size={14} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// ── Text Formatter ──────────────────────────────────────────────────────
function FormattedText({ text }: { text: string }) {
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
              <span className="absolute left-0 text-[#C7A045] font-bold">•</span>
            )}
            {renderInlineFormatting(content)}
          </div>
        );
      })}
    </div>
  );
}

function renderInlineFormatting(text: string) {
  const parts = text.split(
    /(\*\*.*?\*\*|\/holidays|\/hotels|\/faq|\/blogs|https:\/\/wa\.me\/\d+)/g
  );

  return parts.map((part, index) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={index} className="font-semibold text-[#152B25]">
          {part.slice(2, -2)}
        </strong>
      );
    }
    if (
      part === "/holidays" ||
      part === "/hotels" ||
      part === "/faq" ||
      part === "/blogs"
    ) {
      return (
        <Link
          key={index}
          href={part}
          className="text-[#8C7134] underline font-medium hover:text-[#20463C] transition-colors"
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
          className="text-emerald-700 underline font-medium hover:text-emerald-900 transition-colors"
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
    <span className="inline-flex gap-1 items-center h-3.5 px-1">
      <span className="w-1.5 h-1.5 rounded-full bg-[#C7A045] animate-bounce" />
      <span className="w-1.5 h-1.5 rounded-full bg-[#C7A045] animate-bounce [animation-delay:0.15s]" />
      <span className="w-1.5 h-1.5 rounded-full bg-[#C7A045] animate-bounce [animation-delay:0.3s]" />
    </span>
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

function RefreshIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8" />
      <path d="M21 3v5h-5" />
    </svg>
  );
}
