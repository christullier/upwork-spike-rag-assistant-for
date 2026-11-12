"use client";

import { useEffect, useState } from "react";
import Badge from "@/components/Badge";
import ProgressBar from "@/components/ProgressBar";
import { documentById } from "@/data/documents";
import { testQuestions, type TestQuestion } from "@/data/questions";
import { composeAnswer } from "@/lib/compose";

type Result = {
  passed: boolean;
  status: "pass" | "fail" | "gap";
  matched: number;
};

function evaluate(question: TestQuestion): Result {
  const answer = composeAnswer(question.question);
  const matched = question.expected.filter((expected) =>
    answer.citations.some(
      (citation) =>
        citation.doc.id === expected.docId && citation.chunk.page === expected.page,
    ),
  ).length;
  const passed = matched === question.expected.length;
  return {
    passed,
    status: passed ? "pass" : answer.citations.length === 0 ? "gap" : "fail",
    matched,
  };
}

export default function EvalPage() {
  const [results, setResults] = useState<Record<string, Result>>({});
  const [running, setRunning] = useState(false);

  useEffect(() => {
    if (!running) return;
    const next = testQuestions.find((question) => !results[question.id]);
    if (!next) {
      setRunning(false);
      return;
    }
    const timer = window.setTimeout(() => {
      setResults((previous) => ({ ...previous, [next.id]: evaluate(next) }));
    }, 110);
    return () => window.clearTimeout(timer);
  }, [running, results]);

  const done = Object.keys(results).length;
  const passCount = testQuestions.filter((question) => results[question.id]?.passed).length;
  const complete = done === testQuestions.length;
  const scoreLabel =
    done === 0 && !running ? "12" : `${passCount} / ${testQuestions.length}`;

  function runAll() {
    setResults({});
    setRunning(true);
  }

  return (
    <div className="page shell">
      <div className="page-head">
        <div>
          <div className="eyebrow">Evaluation · 12 questions</div>
          <h1>Measure the answer.</h1>
          <p className="lede">
            Each question passes only when the answer cites the expected document
            and page. The same set becomes the regression suite after every
            re-index.
          </p>
        </div>
        <Badge tone="outline">Citation-level scoring</Badge>
      </div>

      <div className="card eval-summary">
        <div style={{ minWidth: 200 }}>
          <div className="score-block">
            <span className={`score-big${done === 0 ? " idle" : ""}`}>{scoreLabel}</span>
            <span className="score-caption">
              {done === 0
                ? "questions ready"
                : running
                  ? "questions pass so far"
                  : "questions pass"}
            </span>
          </div>
          <div className="eval-bar">
            <ProgressBar
              value={complete ? (passCount / testQuestions.length) * 100 : (done / testQuestions.length) * 100}
            />
          </div>
          <p className="summary-note">
            {done === 0
              ? "Run the set to compare each citation with the expected source."
              : complete
                ? passCount === testQuestions.length
                  ? "Every answer cites the expected source."
                  : `${passCount} pass · ${testQuestions.length - passCount} known gaps. The failing rows stay in the set.`
                : "Citation match on document id and page. No wording score."}
          </p>
        </div>

        <div className="eval-actions">
          <button
            type="button"
            className="btn btn-primary"
            onClick={runAll}
            disabled={running}
          >
            {running ? (
              "Running…"
            ) : (
              <>
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                  <path d="M3 1.8 10 6l-7 4.2V1.8Z" fill="currentColor" />
                </svg>
                Run all 12
              </>
            )}
          </button>
        </div>
      </div>

      <div className="card">
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th className="col-hide-xs">#</th>
                <th>Question</th>
                <th>Expected source</th>
                <th>Result</th>
                <th className="col-hide-xs">Score</th>
              </tr>
            </thead>
            <tbody>
              {testQuestions.map((question, index) => {
                const result = results[question.id];
                return (
                  <tr key={question.id}>
                    <td className="col-hide-xs">
                      <span className="q-num">{String(index + 1).padStart(2, "0")}</span>
                    </td>
                    <td>
                      <div className="q-cell">
                        <span className="q-num q-inline">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <span>
                          {question.question}
                          {question.note ? (
                            <small
                              style={{
                                display: "block",
                                color: "var(--muted)",
                                fontSize: 10.5,
                              }}
                            >
                              {question.note}
                            </small>
                          ) : null}
                        </span>
                      </div>
                    </td>
                    <td>
                      <div className="expected">
                        {question.expected.map((expected) => (
                          <span key={`${expected.docId}-${expected.page}`}>
                            {documentById[expected.docId]?.shortTitle ?? expected.docId}
                            <span className="muted"> · p. {expected.page}</span>
                            <br />
                          </span>
                        ))}
                        {question.knownGap ? (
                          <Badge tone="amber" className="eval-tag">
                            Known gap
                          </Badge>
                        ) : null}
                      </div>
                    </td>
                    <td>
                      {!result ? (
                        <span className="result result-idle">
                          <span className="result-dot" />
                          {running && !results[question.id] ? "Waiting" : "Not run"}
                        </span>
                      ) : result.passed ? (
                        <span className="result result-pass">
                          <span className="result-dot" />
                          Pass
                        </span>
                      ) : result.status === "gap" ? (
                        <span className="result result-fail">
                          <span className="result-dot" />
                          No citation
                        </span>
                      ) : (
                        <span className="result result-fail">
                          <span className="result-dot" />
                          Wrong source
                        </span>
                      )}
                    </td>
                    <td className="eval-score col-hide-xs">
                      {result ? (result.passed ? "1.0" : "0.0") : "—"}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="admin-foot">
          <span>
            Pass rule: every expected document id and page appears in the answer
            citations.
          </span>
          <span>
            {complete
              ? `${passCount} / ${testQuestions.length} · run complete`
              : `${testQuestions.length} questions · not scored`}
          </span>
        </div>
      </div>

      <div className="eval-explain">
        <div className="mini-card">
          <h3>Twelve questions, six risks</h3>
          <p>
            Prices, dates, notice periods, deposits, pets and one direct conflict.
            The set covers the questions an agent asks in a viewing or a handover.
          </p>
        </div>
        <div className="mini-card">
          <h3>Two deliberate gaps</h3>
          <p>
            Questions 11 and 12 have no supporting passage in the demo corpus. The
            test reports them as gaps instead of hiding them. A wider corpus closes
            them.
          </p>
        </div>
        <div className="mini-card">
          <h3>One suite, two jobs</h3>
          <p>
            The same cases score the demo and guard production. Run the set after
            each ingestion change and block a deploy when the score falls.
          </p>
        </div>
      </div>
    </div>
  );
}
