import Link from "next/link";
import Badge from "@/components/Badge";

const rows = [
  {
    demo: "JSON chunks in data/documents.ts",
    production: "pgvector rows in Supabase",
    change:
      "Same fields: chunk id, document id, page, text. Add an embedding column and an index.",
  },
  {
    demo: "BM25 in lib/retrieve.ts",
    production: "Embedding search, top 20, then a rerank",
    change:
      "The retrieve() contract stays: a question goes in, five passages with scores come out.",
  },
  {
    demo: "Authored answers in data/answers.ts",
    production: "Claude API call with a citation-first prompt",
    change:
      "The prompt receives the same passages and must return { text, citations }. A citation check rejects a page that is not in the context.",
  },
  {
    demo: "Static export on Cloudflare Pages",
    production: "Next server on a Node host plus Supabase Auth",
    change:
      "Pages, routes and components stay. Add a session, row-level security and two API routes.",
  },
  {
    demo: "Browser state on /documents",
    production: "Ingestion job: parse, chunk, embed, upsert",
    change:
      "The table columns stay. The job writes file status, chunk count and the last index time.",
  },
];

export default function HowPage() {
  return (
    <div className="page shell">
      <div className="page-head">
        <div>
          <div className="eyebrow">Production map</div>
          <h1>Small demo. Production shape.</h1>
          <p className="lede">
            The demo is static, so it runs anywhere and needs no key. The parts that
            matter in production keep the same shape: chunk schema, citation object
            and test set.
          </p>
        </div>
        <Badge tone="outline">No server · no database · no key</Badge>
      </div>

      <div className="card flow-card">
        <div className="panel-title">Production path</div>
        <div className="flow" aria-label="Production pipeline">
          <span className="flow-step">PDF / DOCX</span>
          <span className="flow-arrow" aria-hidden="true">→</span>
          <span className="flow-step">Parse + chunk</span>
          <span className="flow-arrow" aria-hidden="true">→</span>
          <span className="flow-step">Embeddings</span>
          <span className="flow-arrow" aria-hidden="true">→</span>
          <span className="flow-step accent">pgvector</span>
          <span className="flow-arrow" aria-hidden="true">→</span>
          <span className="flow-step">Top-k + rerank</span>
          <span className="flow-arrow" aria-hidden="true">→</span>
          <span className="flow-step accent">Claude</span>
          <span className="flow-arrow" aria-hidden="true">→</span>
          <span className="flow-step">Answer + citations</span>
        </div>
      </div>

      <div className="how-grid">
        <div>
          <div className="card">
            <div className="table-wrap">
              <table className="map-table">
                <thead>
                  <tr>
                    <th>Demo part</th>
                    <th>Production part</th>
                    <th>Why the change is small</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((row) => (
                    <tr key={row.demo}>
                      <td data-label="Demo part">{row.demo}</td>
                      <td data-label="Production part">{row.production}</td>
                      <td className="muted" data-label="Why small">
                        {row.change}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="admin-note">
              The demo runs on Cloudflare Pages as static files. No server, no
              database, no key.
            </div>
          </div>

          <div className="card side-card" style={{ marginTop: 16 }}>
            <div className="eyebrow" style={{ marginBottom: 4 }}>
              The hard question
            </div>
            <h2>Contracts that contradict each other</h2>
            <p>
              A contract is evidence, not a row to overwrite. The assistant keeps
              every version and makes the rule visible.
            </p>
            <div className="why-list">
              <div className="why-item">
                <span className="why-num">1</span>
                <span>
                  <strong>Keep both clauses.</strong> The older contract stays in the
                  index and in the answer. The archive never hides a signed version.
                </span>
              </div>
              <div className="why-item">
                <span className="why-num">2</span>
                <span>
                  <strong>Group by clause.</strong> Notice period, deposit, fees and
                  pets each become a comparable field with a number and a date.
                </span>
              </div>
              <div className="why-item">
                <span className="why-num">3</span>
                <span>
                  <strong>Apply a rule, not a guess.</strong> The later signature date
                  governs by default. A clause can name a different rule, and that
                  rule wins.
                </span>
              </div>
              <div className="why-item">
                <span className="why-num">4</span>
                <span>
                  <strong>Show both values.</strong> The answer carries a Conflict
                  badge, both sources and the rule that was applied.
                </span>
              </div>
              <div className="why-item">
                <span className="why-num">5</span>
                <span>
                  <strong>Log the decision.</strong> A person can review the conflict
                  and add a note. The note becomes part of the audit trail.
                </span>
              </div>
            </div>
          </div>
        </div>

        <div>
          <div className="card side-card">
            <h2>What is real here</h2>
            <div className="why-list">
              <div className="why-item">
                <span className="why-num">✓</span>
                <span>
                  <strong>Retrieval.</strong> 45 chunks, BM25 scoring and page
                  metadata, in the browser.
                </span>
              </div>
              <div className="why-item">
                <span className="why-num">✓</span>
                <span>
                  <strong>Citations.</strong> Document title, page and the exact
                  passage, in a drawer.
                </span>
              </div>
              <div className="why-item">
                <span className="why-num">✓</span>
                <span>
                  <strong>Conflict handling.</strong> Two deposits, one later
                  signature, both clauses visible.
                </span>
              </div>
              <div className="why-item">
                <span className="why-num">✓</span>
                <span>
                  <strong>Evaluation.</strong> 12 citation tests, 10 pass and 2 known
                  gaps.
                </span>
              </div>
            </div>
            <div className="plain-note">
              The answer text is authored in this demo. The Claude API writes it in
              production from the passages that the retrieval step returns.
            </div>
            <div style={{ marginTop: 12 }}>
              <Link className="rail-link" href="/eval">
                Open the evaluation
                <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>

          <div className="card side-card">
            <h2>Access and teams</h2>
            <p>
              Access control is out of the demo. In production, Supabase row-level
              security maps a user to a team, and a team maps to a document set.
              Files use signed URLs.
            </p>
            <div className="plain-note">
              Login, upload rights and delete rights are separate roles. The admin
              page shows the actions; the production API checks the role before each
              write.
            </div>
          </div>

          <div className="card side-card">
            <h2>The next step</h2>
            <p>
              Connect a small real corpus first: 20 to 50 documents, a test set and a
              score. Then add the ingestion queue and the team rules.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
