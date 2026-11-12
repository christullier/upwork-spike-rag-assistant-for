"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import Message, { type ChatMessage } from "@/components/Message";
import SourceDrawer from "@/components/SourceDrawer";
import Badge from "@/components/Badge";
import { chunks, documents } from "@/data/documents";
import { suggestedQuestions } from "@/data/questions";
import { composeAnswer, type ResolvedCitation } from "@/lib/compose";

const welcome: ChatMessage = {
  id: "welcome",
  role: "assistant",
  system: true,
  text: "Ask about a price, a clause or a document. I retrieve the closest passages from the archive and show the document and page for each answer. In production the Claude API writes the answer from these passages. Here the twelve test answers are authored, so the citations stay exact.",
};

export default function ChatPage() {
  const [messages, setMessages] = useState<ChatMessage[]>([welcome]);
  const [input, setInput] = useState("");
  const [pending, setPending] = useState(false);
  const [drawer, setDrawer] = useState<ResolvedCitation | null>(null);
  const endRef = useRef<HTMLDivElement>(null);
  const timers = useRef<number[]>([]);
  const nextId = useRef(1);

  useEffect(() => {
    endRef.current?.scrollIntoView({ block: "nearest" });
  }, [messages]);

  useEffect(() => {
    return () => {
      timers.current.forEach((timer) => window.clearTimeout(timer));
    };
  }, []);

  const ask = useCallback(
    (raw: string) => {
      const question = raw.trim();
      if (!question || pending) return;
      setPending(true);
      setInput("");

      const userMessage: ChatMessage = {
        id: `user-${nextId.current++}`,
        role: "user",
        text: question,
      };
      const placeholderId = `answer-${nextId.current++}`;

      setMessages((previous) => [
        ...previous,
        userMessage,
        { id: placeholderId, role: "assistant", text: "", pending: true },
      ]);

      const timer = window.setTimeout(() => {
        const answer = composeAnswer(question);
        setMessages((previous) =>
          previous.map((message) =>
            message.id === placeholderId
              ? {
                  id: placeholderId,
                  role: "assistant",
                  text: answer.text,
                  citations: answer.citations,
                  conflict: answer.conflict,
                  authored: answer.authored,
                  gap: answer.gap,
                }
              : message,
          ),
        );
        setPending(false);
      }, 520);
      timers.current.push(timer);
    },
    [pending],
  );

  function reset() {
    timers.current.forEach((timer) => window.clearTimeout(timer));
    timers.current = [];
    setPending(false);
    setInput("");
    setMessages([welcome]);
  }

  const closeDrawer = useCallback(() => setDrawer(null), []);

  return (
    <div className="page shell">
      <div className="page-head">
        <div>
          <div className="eyebrow">Internal assistant · Warsaw portfolio</div>
          <h1>Ask the archive.</h1>
          <p className="lede">
            Listings, contracts and market reports in one place. Every answer
            carries the document and the page, and the archive keeps both sides of
            a contradiction.
          </p>
        </div>
        <Badge tone="green">{chunks.length} passages indexed</Badge>
      </div>

      <div className="demo-banner">
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          aria-hidden="true"
          style={{ flexShrink: 0, marginTop: 2 }}
        >
          <circle cx="8" cy="8" r="6.6" stroke="currentColor" strokeWidth="1.3" />
          <path d="M8 7.2v4M8 4.7v.2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
        <span>
          <strong>Demo mode.</strong> Retrieval is real: BM25 runs over{" "}
          {chunks.length} chunks in your browser. The answer text is authored; in
          production the Claude API writes it from the same passages.
        </span>
      </div>

      <div className="chat-layout">
        <section className="chat-card card" aria-label="Chat with the archive">
          <div className="chat-top">
            <div className="agent-id">
              <span className="agent-mark" aria-hidden="true">
                C
              </span>
              <span>
                Archive assistant
                <small>8 documents · listings, contracts, reports</small>
              </span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
              <Badge tone="green">Index ready</Badge>
              <button type="button" className="btn btn-quiet btn-sm" onClick={reset}>
                Reset
              </button>
            </div>
          </div>

          <div className="messages" aria-live="polite">
            {messages.map((message) => (
              <Message
                key={message.id}
                message={message}
                onOpenSource={(citation) => setDrawer(citation)}
              />
            ))}
            <div ref={endRef} />
          </div>

          <form
            className="composer"
            onSubmit={(event) => {
              event.preventDefault();
              ask(input);
            }}
          >
            <div className="composer-row">
              <textarea
                value={input}
                onChange={(event) => setInput(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" && !event.shiftKey) {
                    event.preventDefault();
                    ask(input);
                  }
                }}
                placeholder="Ask the archive…"
                aria-label="Your question"
                rows={1}
              />
              <button
                type="submit"
                className="btn btn-primary send-btn"
                disabled={pending || input.trim().length === 0}
              >
                Send
                <svg width="13" height="13" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                  <path
                    d="M2 7h9.5M8 3.5 11.5 7 8 10.5"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
            <div className="composer-hint">
              <span>Enter to send · Shift + Enter for a new line</span>
              <span>Answers cite the source document and page</span>
            </div>
          </form>
        </section>

        <aside className="rail">
          <div className="rail-card card">
            <div className="rail-head">
              <span className="panel-title">Try asking</span>
              <span className="rail-note">6 of 12 tests</span>
            </div>
            <div className="suggest-list">
              {suggestedQuestions.map((question, index) => (
                <button
                  key={question.id}
                  type="button"
                  className="suggest"
                  onClick={() => ask(question.question)}
                  disabled={pending}
                >
                  <span className="suggest-num">{String(index + 1).padStart(2, "0")}</span>
                  <span>{question.question}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="rail-card card">
            <div className="rail-head">
              <span className="panel-title">The corpus</span>
            </div>
            <div className="corpus-stats">
              <div className="corpus-stat">
                <b>{documents.length}</b>
                <span>Documents</span>
              </div>
              <div className="corpus-stat">
                <b>{chunks.length}</b>
                <span>Chunks</span>
              </div>
              <div className="corpus-stat">
                <b>2</b>
                <span>Contracts</span>
              </div>
              <div className="corpus-stat">
                <b>12</b>
                <span>Test questions</span>
              </div>
            </div>
            <p className="rail-foot">
              Listing sheets, two agreements, a lease template, a market report, the
              fee policy and a handover checklist.
            </p>
            <div style={{ marginTop: 10 }}>
              <Link className="rail-link" href="/documents">
                Open the document table
                <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>

          <div className="rail-card card">
            <div className="rail-head">
              <span className="panel-title">Conflict rule</span>
            </div>
            <p className="rail-foot">
              Two contracts can both stay in the archive. When clauses differ, the
              later signature date governs, and the older clause stays visible with
              a Conflict badge.
            </p>
          </div>
        </aside>
      </div>

      <SourceDrawer citation={drawer} onClose={closeDrawer} />
    </div>
  );
}
