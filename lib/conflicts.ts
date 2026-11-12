import {
  chunks as allChunks,
  documentById,
  formatDate,
  type Chunk,
  type DocumentRecord,
} from "@/data/documents";

export type ClauseKey = "notice_period" | "deposit" | "commission" | "pets";

export type ClauseValue = {
  chunk: Chunk;
  doc: DocumentRecord;
  value: string;
  number: number | null;
};

export type ConflictGroup = {
  key: ClauseKey;
  label: string;
  values: ClauseValue[];
  conflict: boolean;
  winner: ClauseValue | null;
  rule: string;
};

const WORD_NUMBERS: Record<string, number> = {
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
  seven: 7,
  eight: 8,
  nine: 9,
  ten: 10,
  twelve: 12,
};

type Clause = {
  label: string;
  scope: "contract" | "any";
  match: RegExp;
  read: (text: string) => { value: string; number: number | null } | null;
};

const CLAUSES: Record<ClauseKey, Clause> = {
  notice_period: {
    label: "Notice period",
    scope: "contract",
    match: /notice period of (\d+)\s*days?/i,
    read: (text) => {
      const found = text.match(/notice period of (\d+)\s*days?/i);
      return found ? { value: `${found[1]} days`, number: Number(found[1]) } : null;
    },
  },
  deposit: {
    label: "Deposit",
    scope: "contract",
    match: /deposit of ([a-z0-9-]+) months?/i,
    read: (text) => {
      const found = text.match(/deposit of ([a-z0-9-]+) months?/i);
      if (!found) return null;
      const months = WORD_NUMBERS[found[1].toLowerCase()] ?? Number(found[1]);
      if (!Number.isFinite(months)) return null;
      return { value: `${months} months`, number: months };
    },
  },
  commission: {
    label: "Commission",
    scope: "any",
    match: /commission is ([\d.]+) percent/i,
    read: (text) => {
      const found = text.match(/commission is ([\d.]+) percent/i);
      return found ? { value: `${found[1]}%`, number: Number(found[1]) } : null;
    },
  },
  pets: {
    label: "Pets",
    scope: "any",
    match: /pets?/i,
    read: (text) => {
      if (!/pets?/i.test(text)) return null;
      const consent = /written consent/i.test(text);
      return { value: consent ? "Written consent" : "No consent", number: consent ? 1 : 0 };
    },
  },
};

function buildGroup(key: ClauseKey, source: Chunk[]): ConflictGroup | null {
  const clause = CLAUSES[key];
  const seen = new Set<string>();
  const values: ClauseValue[] = [];

  for (const chunk of source) {
    const doc = documentById[chunk.docId];
    if (!doc) continue;
    if (clause.scope === "contract" && doc.type !== "Contract") continue;
    if (seen.has(doc.id)) continue;
    if (!clause.match.test(chunk.text)) continue;
    const read = clause.read(chunk.text);
    if (!read) continue;
    seen.add(doc.id);
    values.push({ chunk, doc, value: read.value, number: read.number });
  }

  if (values.length < 2) return null;

  const distinct = new Set(values.map((value) => value.number));
  const conflict = distinct.size > 1;
  const signed = values
    .filter((value) => value.doc.signed)
    .sort((a, b) => (a.doc.signed ?? "").localeCompare(b.doc.signed ?? ""));
  const ordered = signed.length === values.length ? signed : values;
  const winner = conflict && signed.length > 0 ? signed[signed.length - 1] : null;

  const rule = winner
    ? `The contract with the later signature date governs: ${winner.doc.shortTitle}, signed ${formatDate(
        winner.doc.signed ?? "",
      )}.`
    : "No later signature decides this group. A person must review it.";

  return { key, label: clause.label, values: ordered, conflict, winner, rule };
}

export function findConflicts(source: Chunk[] = allChunks): ConflictGroup[] {
  return (Object.keys(CLAUSES) as ClauseKey[])
    .map((key) => buildGroup(key, source))
    .filter((group): group is ConflictGroup => group !== null);
}

export function findConflict(key: ClauseKey, source: Chunk[] = allChunks): ConflictGroup | null {
  return buildGroup(key, source);
}
