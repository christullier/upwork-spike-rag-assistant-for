import { chunks, documentById, type Chunk } from "@/data/documents";

export type RetrievedChunk = {
  chunk: Chunk;
  score: number;
};

const STOPWORDS = new Set(
  "the a an and or of to in on for is are was were be been being what which who whom how does do did with at by from that this these those it its as if can may must not no any two per about tell me please i we you your there their than then into over under".split(
    " ",
  ),
);

const K1 = 1.4;
const B = 0.75;

function tokenize(text: string): string[] {
  return text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim()
    .split(/\s+/)
    .filter((word) => word.length > 1 && !STOPWORDS.has(word));
}

const indexed = chunks.map((chunk) => {
  const tokens = tokenize(chunk.text);
  const tf = new Map<string, number>();
  for (const token of tokens) tf.set(token, (tf.get(token) ?? 0) + 1);
  const doc = documentById[chunk.docId];
  return {
    chunk,
    tf,
    length: tokens.length,
    titleTokens: new Set(tokenize(`${doc.title} ${doc.shortTitle}`)),
  };
});

const averageLength =
  indexed.reduce((sum, item) => sum + item.length, 0) / Math.max(indexed.length, 1);
const documentFrequency = new Map<string, number>();
for (const item of indexed) {
  for (const token of item.tf.keys()) {
    documentFrequency.set(token, (documentFrequency.get(token) ?? 0) + 1);
  }
}

function idf(term: string): number {
  const df = documentFrequency.get(term) ?? 0;
  return Math.log(1 + (indexed.length - df + 0.5) / (df + 0.5));
}

export function retrieve(query: string, k = 5): RetrievedChunk[] {
  const terms = Array.from(new Set(tokenize(query)));
  if (terms.length === 0) return [];

  const results = indexed.map((item) => {
    let score = 0;
    for (const term of terms) {
      const frequency = item.tf.get(term) ?? 0;
      if (frequency === 0) continue;
      const norm = frequency + K1 * (1 - B + (B * item.length) / averageLength);
      score += idf(term) * ((frequency * (K1 + 1)) / norm);
      if (item.titleTokens.has(term)) score += 1.1;
    }
    return { chunk: item.chunk, score };
  });

  return results
    .filter((result) => result.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, k);
}
