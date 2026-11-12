import { findAuthoredAnswer } from "@/data/answers";
import {
  chunks,
  documentById,
  type Chunk,
  type DocumentRecord,
} from "@/data/documents";
import { findConflicts, findConflict, type ConflictGroup } from "./conflicts";
import { retrieve } from "./retrieve";

export type ResolvedCitation = {
  chunk: Chunk;
  doc: DocumentRecord;
};

export type ComposedAnswer = {
  questionId?: string;
  text: string;
  citations: ResolvedCitation[];
  conflict: ConflictGroup | null;
  authored: boolean;
  gap: boolean;
};

const chunkById = new Map(chunks.map((chunk) => [chunk.id, chunk]));

export function resolveChunk(chunkId: string): ResolvedCitation | null {
  const chunk = chunkById.get(chunkId);
  if (!chunk) return null;
  const doc = documentById[chunk.docId];
  if (!doc) return null;
  return { chunk, doc };
}

function excerpt(text: string, limit = 240): string {
  if (text.length <= limit) return text;
  const cut = text.slice(0, limit);
  const stop = Math.max(cut.lastIndexOf(". "), cut.lastIndexOf("; "));
  return `${stop > 80 ? cut.slice(0, stop + 1) : cut.trimEnd()}…`;
}

export function composeAnswer(question: string): ComposedAnswer {
  const authored = findAuthoredAnswer(question);

  if (authored) {
    const citations = authored.cites
      .map((cite) => resolveChunk(cite.chunkId))
      .filter((cite): cite is ResolvedCitation => cite !== null);
    const conflict = authored.conflictKey ? findConflict(authored.conflictKey) : null;
    return {
      questionId: authored.id,
      text: authored.text,
      citations,
      conflict: conflict?.conflict ? conflict : null,
      authored: true,
      gap: Boolean(authored.gap),
    };
  }

  const hits = retrieve(question, 5);
  if (hits.length === 0) {
    return {
      text: "No passage in the demo archive matches this question. Try one of the suggested questions, or open Documents to see what the archive holds.",
      citations: [],
      conflict: null,
      authored: false,
      gap: true,
    };
  }

  const citations = hits.slice(0, 2).map((hit) => ({
    chunk: hit.chunk,
    doc: documentById[hit.chunk.docId],
  }));
  const first = citations[0];
  const second = citations[1];

  let text = `The closest passage is in ${first.doc.title}, page ${first.chunk.page}: “${excerpt(
    first.chunk.text,
  )}”`;
  if (second) {
    text += ` A second passage from ${second.doc.shortTitle}, page ${second.chunk.page}, adds: “${excerpt(
      second.chunk.text,
      160,
    )}”`;
  }
  text +=
    " This answer is composed from the retrieved passages. In production, the Claude API writes the answer from the same sources.";

  const conflict =
    findConflicts(citations.map((citation) => citation.chunk)).find((group) => group.conflict) ??
    null;

  return {
    text,
    citations,
    conflict,
    authored: false,
    gap: false,
  };
}
