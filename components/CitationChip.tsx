import type { ResolvedCitation } from "@/lib/compose";

export default function CitationChip({
  citation,
  conflict = false,
  onClick,
}: {
  citation: ResolvedCitation;
  conflict?: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      className={`citation-chip${conflict ? " is-conflict" : ""}`}
      onClick={onClick}
      title={`Open source: ${citation.doc.title}, page ${citation.chunk.page}`}
    >
      <svg
        className="chip-icon"
        width="12"
        height="14"
        viewBox="0 0 12 14"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M1 1.5h6.2L10.5 5v7.5H1V1.5Z"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinejoin="round"
        />
        <path d="M7 1.5V5h3.4" stroke="currentColor" strokeWidth="1.2" />
      </svg>
      <span className="chip-doc">{citation.doc.shortTitle}</span>
      <span className="chip-page">p. {citation.chunk.page}</span>
    </button>
  );
}
