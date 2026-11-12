export type TestQuestion = {
  id: string;
  question: string;
  expected: Array<{ docId: string; page: number }>;
  note?: string;
  knownGap?: boolean;
  suggested?: boolean;
};

export const testQuestions: TestQuestion[] = [
  {
    id: "q1",
    question: "What is the notice period for the Wola contract?",
    expected: [{ docId: "contract-signed-b-2025-11", page: 2 }],
    suggested: true,
  },
  {
    id: "q2",
    question: "Which contract applies to the Mokotów flat?",
    expected: [{ docId: "contract-signed-b-2025-11", page: 3 }],
    suggested: true,
  },
  {
    id: "q3",
    question: "What is the average price per square metre in Q3 2026?",
    expected: [{ docId: "market-report-q3-2026", page: 7 }],
    suggested: true,
  },
  {
    id: "q4",
    question: "Can a tenant keep a dog?",
    expected: [{ docId: "lease-template-2024", page: 3 }],
    suggested: true,
  },
  {
    id: "q5",
    question: "What commission does the agency charge?",
    expected: [{ docId: "agency-fee-policy", page: 1 }],
    suggested: true,
  },
  {
    id: "q6",
    question: "Do the two contracts agree on the deposit?",
    expected: [
      { docId: "contract-draft-a-2025-03", page: 2 },
      { docId: "contract-signed-b-2025-11", page: 2 },
    ],
    note: "Pass only when both contracts appear.",
    suggested: true,
  },
  {
    id: "q7",
    question: "What is the deposit under the signed contract?",
    expected: [{ docId: "contract-signed-b-2025-11", page: 2 }],
  },
  {
    id: "q8",
    question: "How long does a flat stay on the market in Q3 2026?",
    expected: [{ docId: "market-report-q3-2026", page: 7 }],
  },
  {
    id: "q9",
    question: "What is the price of the Mokotów flat?",
    expected: [{ docId: "listing-mokotow-14", page: 1 }],
  },
  {
    id: "q10",
    question: "Does the Wola flat include parking?",
    expected: [{ docId: "listing-wola-22", page: 1 }],
  },
  {
    id: "q11",
    question: "What is the fixed penalty for a late rent payment?",
    expected: [{ docId: "lease-template-2024", page: 4 }],
    note: "No fixed penalty clause in the demo corpus.",
    knownGap: true,
  },
  {
    id: "q12",
    question: "What is the energy rating of the Mokotów building?",
    expected: [{ docId: "listing-mokotow-14", page: 2 }],
    note: "No energy certificate in the demo corpus.",
    knownGap: true,
  },
];

export const suggestedQuestions = testQuestions.filter((question) => question.suggested);
