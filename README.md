# CiteRight — RAG demo for a real estate archive

A small, working demo of a document assistant for a real estate agency. It shows
the parts that decide whether a RAG product is trustworthy: cited answers,
contract conflicts and a citation-level evaluation.

## What the demo shows

- **Chat with six suggested prompts.** Answers come from 8 sample documents (45
  chunks) and carry chips with the document title, page and quoted passage. The
  demo has no free-text box.
- **Contract conflicts.** Two agreements give a different deposit (2 months and 3
  months) and a different notice period (30 and 60 days). The answer shows both
  clauses, adds a **Conflict** badge and applies the later-signature rule.
- **Evaluation.** 12 test questions run in one click. A question passes only when
  its answer cites the expected document and page. The result is 10 passes and 2
  deliberate known gaps.
- **Document admin.** Upload, re-index and delete actions change the table, the
  chunk total and the last index time (in browser state).
- **Production map.** A short page maps each demo part to its production part:
  pgvector, embeddings plus rerank, the Claude API, Supabase and an ingestion job.

The demo runs in **Demo mode**: the six prompts use authored answer texts with
exact citations. In production, retrieval selects the passages and the Claude API
writes the answer. The BM25 scorer in `lib/retrieve.ts` is the retrieval layer
that pgvector replaces. No API key, server, database or login is needed.

## Routes

| Route | Page |
|---|---|
| `/` | Chat with six suggested prompts and a source drawer |
| `/documents` | Document table with upload, re-index and delete |
| `/eval` | 12-question evaluation with pass count |
| `/how` | Production map and conflict policy |

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Build

```bash
npm run build
```

Next.js is set to `output: "export"` and writes static files to `out/`. The
`out/` folder deploys to Cloudflare Pages with no environment variables:

- Build command: `npm run build`
- Output directory: `out`

No server code, no API key and no database are in this repo. The chunk schema
(`id`, `docId`, `page`, `text`), the citation object and the test set are the same
shapes that the production version uses.
