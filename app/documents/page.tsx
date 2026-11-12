"use client";

import { useEffect, useState } from "react";
import Badge from "@/components/Badge";
import ProgressBar from "@/components/ProgressBar";
import {
  chunks,
  chunksForDoc,
  documents,
  formatDate,
  type DocType,
} from "@/data/documents";

type AdminDoc = {
  id: string;
  title: string;
  shortTitle: string;
  type: DocType;
  pages: number;
  chunks: number;
  added: string;
  status: "Indexed" | "Indexing";
};

type Job = {
  kind: "upload" | "reindex";
  progress: number;
};

const uploadedDoc: AdminDoc = {
  id: "listing-zoliborz-08",
  title: "Listing sheet — Żoliborz, Mickiewicza 8",
  shortTitle: "Żoliborz 8",
  type: "Listing",
  pages: 2,
  chunks: 6,
  added: "2026-11-12",
  status: "Indexed",
};

function initialDocs(): AdminDoc[] {
  return documents.map((doc) => ({
    id: doc.id,
    title: doc.title,
    shortTitle: doc.shortTitle,
    type: doc.type,
    pages: doc.pages,
    chunks: chunksForDoc(doc.id).length,
    added: doc.added,
    status: "Indexed",
  }));
}

function shortDate(iso: string): string {
  return new Date(`${iso}T12:00:00Z`).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });
}

function fileLabel(type: DocType): string {
  if (type === "Checklist") return "MD";
  if (type === "Template") return "DOC";
  return "PDF";
}

export default function DocumentsPage() {
  const [docs, setDocs] = useState<AdminDoc[]>(initialDocs);
  const [job, setJob] = useState<Job | null>(null);
  const [confirmId, setConfirmId] = useState<string | null>(null);
  const [note, setNote] = useState<string | null>(null);
  const [lastIndex, setLastIndex] = useState("12 Nov 2026, 09:42");

  const totalChunks = docs.reduce((sum, doc) => sum + doc.chunks, 0);
  const isBusy = job !== null;
  const hasUpload = docs.some((doc) => doc.id === uploadedDoc.id);

  useEffect(() => {
    if (!job) return;

    if (job.progress >= 100) {
      const finish = window.setTimeout(() => {
        if (job.kind === "upload") {
          setDocs((previous) =>
            previous.some((doc) => doc.id === uploadedDoc.id)
              ? previous
              : [...previous, uploadedDoc],
          );
          setNote(
            "Upload complete. 6 chunks indexed from listing-zoliborz-08.pdf.",
          );
        } else {
          setDocs((previous) =>
            previous.map((doc) => ({
              ...doc,
              chunks: doc.chunks + 1,
              status: "Indexed",
            })),
          );
          setNote(
            "Re-index complete. Parser v2 added one section chunk to each document.",
          );
        }
        setLastIndex(
          new Date().toLocaleString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          }),
        );
        setJob(null);
      }, 260);
      return () => window.clearTimeout(finish);
    }

    const step = job.kind === "upload" ? 9 : 2;
    const tick = window.setTimeout(() => {
      setJob((current) =>
        current
          ? { ...current, progress: Math.min(100, current.progress + step) }
          : null,
      );
    }, 45);
    return () => window.clearTimeout(tick);
  }, [job]);

  function removeDoc(doc: AdminDoc) {
    setDocs((previous) => previous.filter((item) => item.id !== doc.id));
    setConfirmId(null);
    setNote(
      `Removed ${doc.shortTitle}. ${doc.chunks} chunks left the index; the new total is ${
        totalChunks - doc.chunks
      }.`,
    );
  }

  return (
    <div className="page shell">
      <div className="page-head">
        <div>
          <div className="eyebrow">Admin · demo state</div>
          <h1>Document archive.</h1>
          <p className="lede">
            Eight source files, one index. Upload, re-index and delete change the
            table and the chunk total. In production these actions start signed
            ingestion jobs and write to Supabase.
          </p>
        </div>
        <Badge tone="green">Index healthy</Badge>
      </div>

      <div className="stat-grid">
        <div className="stat">
          <div className="stat-label">Documents</div>
          <div className="stat-value">{docs.length}</div>
          <div className="stat-sub">PDF, DOCX and Markdown</div>
        </div>
        <div className="stat">
          <div className="stat-label">Indexed chunks</div>
          <div className="stat-value">{totalChunks}</div>
          <div className="stat-sub">{chunks.length} chunks in the base corpus</div>
        </div>
        <div className="stat">
          <div className="stat-label">Last index</div>
          <div className="stat-value" style={{ fontSize: 23, lineHeight: 1.5 }}>
            {lastIndex}
          </div>
          <div className="stat-sub">Parser v2 · 768-dimension embeddings in production</div>
        </div>
      </div>

      <div className="card">
        <div className="admin-toolbar">
          <div>
            <span className="panel-title">Documents</span>
            <span className="rail-note" style={{ marginLeft: 8 }}>
              {docs.length} files · {totalChunks} chunks
            </span>
          </div>
          <div className="toolbar-actions">
            <button
              type="button"
              className="btn btn-primary"
              disabled={isBusy || hasUpload}
              onClick={() => {
                setNote(null);
                setJob({ kind: "upload", progress: 0 });
              }}
              title={hasUpload ? "The sample upload is already in the table" : undefined}
            >
              <svg width="13" height="13" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <path
                  d="M7 9.5V2m0 0L4 5m3-3 3 3M2 11.5h10"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Upload
            </button>
            <button
              type="button"
              className="btn"
              disabled={isBusy || docs.length === 0}
              onClick={() => {
                setNote(null);
                setJob({ kind: "reindex", progress: 0 });
              }}
            >
              <svg width="13" height="13" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <path
                  d="M12 7a5 5 0 1 1-1.6-3.7M12 2v3.2H8.8"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Re-index
            </button>
          </div>
        </div>

        {job ? (
          <div className="job">
            <ProgressBar
              value={job.progress}
              label={
                job.kind === "upload"
                  ? "Uploading listing-zoliborz-08.pdf and indexing 6 chunks"
                  : `Re-indexing ${docs.length} documents with parser v2`
              }
            />
          </div>
        ) : null}

        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Document</th>
                <th className="col-hide-sm">Type</th>
                <th className="col-hide-xs">Pages</th>
                <th>Chunks</th>
                <th className="col-hide-sm">Added</th>
                <th>Status</th>
                <th aria-label="Actions" />
              </tr>
            </thead>
            <tbody>
              {docs.map((doc) => (
                <tr key={doc.id}>
                  <td>
                    <div className="doc-cell">
                      <span className="doc-icon" aria-hidden="true">
                        {fileLabel(doc.type)}
                      </span>
                      <span style={{ minWidth: 0 }}>
                        <span className="doc-name">{doc.shortTitle}</span>
                        <span className="doc-sub" style={{ display: "block" }}>
                          {doc.id}
                        </span>
                      </span>
                    </div>
                  </td>
                  <td className="col-hide-sm">
                    <Badge tone="outline">{doc.type}</Badge>
                  </td>
                  <td className="num col-hide-xs">{doc.pages}</td>
                  <td className="num">{doc.chunks}</td>
                  <td className="col-hide-sm num">{shortDate(doc.added)}</td>
                  <td>
                    <Badge tone="green">{doc.status}</Badge>
                  </td>
                  <td style={{ textAlign: "right", whiteSpace: "nowrap" }}>
                    {confirmId === doc.id ? (
                      <span style={{ display: "inline-flex", gap: 4 }}>
                        <button
                          type="button"
                          className="btn btn-danger btn-sm"
                          onClick={() => removeDoc(doc)}
                        >
                          Remove
                        </button>
                        <button
                          type="button"
                          className="btn btn-quiet btn-sm"
                          onClick={() => setConfirmId(null)}
                        >
                          Cancel
                        </button>
                      </span>
                    ) : (
                      <button
                        type="button"
                        className="btn btn-quiet btn-sm"
                        onClick={() => setConfirmId(doc.id)}
                        disabled={isBusy}
                      >
                        Delete
                      </button>
                    )}
                  </td>
                </tr>
              ))}
              {docs.length === 0 ? (
                <tr>
                  <td colSpan={7} className="empty-note">
                    The index is empty. Use Upload to add the sample listing, or
                    reload the page to restore the base corpus.
                  </td>
                </tr>
              ) : null}
            </tbody>
          </table>
        </div>

        <div className={note ? "admin-note" : "admin-note muted"}>
          {note ??
            "Demo state only: a page refresh restores the base corpus. A production upload writes the file, its chunks and its embedding to Supabase."}
        </div>

        <div className="admin-foot">
          <span>Chunk schema: id · docId · page · text</span>
          <span>{formatDate("2026-11-12")} · demo build</span>
        </div>
      </div>
    </div>
  );
}
