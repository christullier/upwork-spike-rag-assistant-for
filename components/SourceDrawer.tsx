"use client";

import { useEffect } from "react";
import { formatDate } from "@/data/documents";
import type { ResolvedCitation } from "@/lib/compose";
import Badge from "./Badge";

export default function SourceDrawer({
  citation,
  onClose,
}: {
  citation: ResolvedCitation | null;
  onClose: () => void;
}) {
  useEffect(() => {
    if (!citation) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [citation, onClose]);

  if (!citation) return null;
  const { doc, chunk } = citation;

  return (
    <>
      <button
        type="button"
        className="drawer-overlay"
        aria-label="Close source"
        onClick={onClose}
      />
      <aside
        className="source-drawer"
        role="dialog"
        aria-modal="true"
        aria-labelledby="source-title"
      >
        <div className="drawer-head">
          <div>
            <div className="eyebrow" style={{ marginBottom: 3 }}>
              Source
            </div>
            <div className="drawer-meta">
              <Badge tone="outline">{doc.type}</Badge>
              <span>
                Page {chunk.page} of {doc.pages}
              </span>
            </div>
          </div>
          <button
            type="button"
            className="drawer-close"
            onClick={onClose}
            aria-label="Close source drawer"
            autoFocus
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path
                d="m2 2 10 10M12 2 2 12"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>

        <div className="drawer-body">
          <h2 className="drawer-title" id="source-title">
            {doc.title}
          </h2>
          <div className="drawer-meta">
            <span>{doc.pages} pages</span>
            <span aria-hidden="true">·</span>
            <span>Added {formatDate(doc.added)}</span>
            {doc.signed ? (
              <>
                <span aria-hidden="true">·</span>
                <span>Signed {formatDate(doc.signed)}</span>
              </>
            ) : null}
          </div>

          <p className="drawer-note">{doc.summary}</p>

          <blockquote className="quote-block">{chunk.text}</blockquote>

          <div className="drawer-section">
            <div className="panel-title">Citation object</div>
            <dl className="drawer-kv">
              <dt>Document</dt>
              <dd>{doc.id}</dd>
              <dt>Chunk</dt>
              <dd>{chunk.id}</dd>
              <dt>Page</dt>
              <dd>{chunk.page}</dd>
            </dl>
            <p className="drawer-note">
              This is the object the answer is built from. In production the same
              fields come from a pgvector row, and the Claude prompt receives the
              passage with its document id and page.
            </p>
          </div>
        </div>
      </aside>
    </>
  );
}
