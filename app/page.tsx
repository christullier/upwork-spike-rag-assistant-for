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
  text: "Choose a suggested prompt below. Each answer shows the document and the page, and a click on a citation opens the exact passage. In production the Claude API writes the answer from retrieved passages. In this demo the answers are authored, so the citations stay exact.",
};

export default function ChatPage() {
  const [messages, setMessages] = useState<ChatMessage[]>([welcome]);
  const [pending, setPending] = useState(false);
  const [drawer, setDrawer] = useState<ResolvedCitation | null>(null);
  const messagesRef = useRef<HTMLDivElement>(null);
  const timers = useRef<number[]>([]);
  const nextId = useRef(1);

  useEffect(() => {
    const element = messagesRef.current;
    if (element) element.scrollTop = element.scrollHeight;
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
          <strong>Demo mode.</strong> Each prompt opens an authored answer with
          exact citations. In production, retrieval selects the passages and the
          Claude API writes the answer.
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

          <div className="messages" aria-live="polite" ref={messagesRef}>
            {messages.map((message) => (
              <Message
                key={message.id}
                message={message}
                onOpenSource={(citation) => setDrawer(citation)}
              />
            ))}
          </div>

          <div className="prompt-tray" aria-label="Suggested prompts">
            <div className="prompt-head">
              <span className="panel-title">Suggested prompts</span>
              <span className="rail-note">6 of 12 test questions</span>
            </div>
            <div className="prompt-grid">
              {suggestedQuestions.map((question, index) => (
                <button
                  key={question.id}
                  type="button"
                  className="prompt"
                  onClick={() => ask(question.question)}
                  disabled={pending}
                >
                  <span className="prompt-num">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="prompt-text">{question.question}</span>
                  <svg
                    className="prompt-arrow"
                    width="12"
                    height="12"
                    viewBox="0 0 14 14"
                    fill="none"
                    aria-hidden="true"
                  >
                    <path
                      d="M2 7h9.5M8 3.5 11.5 7 8 10.5"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              ))}
            </div>
            <p className="prompt-foot">
              Demo mode: each prompt uses an authored answer. The cited pages are
              exact.
            </p>
          </div>
        </section>

        <aside className="rail">
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

          <div className="rail-card card">
            <div className="rail-head">
              <span className="panel-title">Quality check</span>
            </div>
            <p className="rail-foot">
              12 citation tests. 10 pass and 2 known gaps. The test set becomes the
              regression suite.
            </p>
            <div style={{ marginTop: 10 }}>
              <Link className="rail-link" href="/eval">
                See the evaluation
                <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </aside>
      </div>

      <SourceDrawer citation={drawer} onClose={closeDrawer} />
    </div>
  );
}
