import { formatDate } from "@/data/documents";
import type { ConflictGroup } from "@/lib/conflicts";
import type { ResolvedCitation } from "@/lib/compose";
import Badge from "./Badge";
import CitationChip from "./CitationChip";

export type ChatMessage = {
  id: string;
  role: "user" | "assistant";
  text: string;
  citations?: ResolvedCitation[];
  conflict?: ConflictGroup | null;
  authored?: boolean;
  gap?: boolean;
  pending?: boolean;
  system?: boolean;
};

function ConflictPanel({ conflict }: { conflict: ConflictGroup }) {
  return (
    <div className="conflict-panel">
      <div className="conflict-head">
        <Badge tone="danger">Conflict</Badge>
        <span>
          {conflict.label} differs between {conflict.values.length} contracts
        </span>
      </div>
      <div className="conflict-values">
        {conflict.values.map((value) => {
          const isWinner = conflict.winner?.doc.id === value.doc.id;
          return (
            <div
              key={value.doc.id}
              className={`conflict-value${isWinner ? " winner" : ""}`}
            >
              <div className="conflict-doc">{value.doc.shortTitle}</div>
              <div className="conflict-number">{value.value}</div>
              <div className="conflict-date">
                {value.doc.signed ? `Signed ${formatDate(value.doc.signed)}` : "No signature"}
                {isWinner ? <Badge tone="green" className="eval-tag">Applies</Badge> : null}
              </div>
            </div>
          );
        })}
      </div>
      <p className="conflict-rule">
        {conflict.rule} The older clause stays visible for audit.
      </p>
    </div>
  );
}

export default function Message({
  message,
  onOpenSource,
}: {
  message: ChatMessage;
  onOpenSource: (citation: ResolvedCitation) => void;
}) {
  if (message.role === "user") {
    return (
      <div className="message user">
        <div className="user-bubble">{message.text}</div>
      </div>
    );
  }

  return (
    <div className="message assistant">
      <div className="avatar" aria-hidden="true">
        C
      </div>
      <div className="message-main">
        <div className="message-name">
          Archive assistant
          {message.system ? null : message.authored ? (
            <Badge tone="neutral">Authored answer</Badge>
          ) : (
            <Badge tone="green">Retrieved</Badge>
          )}
        </div>

        {message.pending ? (
          <div className="typing" aria-label="The assistant writes an answer">
            <span />
            <span />
            <span />
          </div>
        ) : (
          <>
            <p className="message-text">{message.text}</p>
            {message.conflict ? <ConflictPanel conflict={message.conflict} /> : null}

            {message.citations && message.citations.length > 0 ? (
              <div className="sources">
                <div className="sources-label">
                  Sources · {message.citations.length}
                </div>
                <div className="chip-row">
                  {message.citations.map((citation) => (
                    <CitationChip
                      key={`${citation.chunk.id}-${citation.chunk.page}`}
                      citation={citation}
                      conflict={Boolean(message.conflict)}
                      onClick={() => onOpenSource(citation)}
                    />
                  ))}
                </div>
              </div>
            ) : null}

            {message.gap ? (
              <p className="answer-note">
                No citation: no passage in the demo archive supports this answer.
              </p>
            ) : null}
            {!message.authored && !message.system ? (
              <p className="answer-note">
                Demo mode: retrieval is real. The Claude API writes this answer in
                production.
              </p>
            ) : null}
          </>
        )}
      </div>
    </div>
  );
}
