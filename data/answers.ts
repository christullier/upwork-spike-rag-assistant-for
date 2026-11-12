import type { ClauseKey } from "@/lib/conflicts";

export type AnswerCitation = {
  docId: string;
  page: number;
  chunkId: string;
};

export type AnswerSpec = {
  id: string;
  question: string;
  text: string;
  cites: AnswerCitation[];
  conflictKey?: ClauseKey;
  gap?: boolean;
};

export const answers: AnswerSpec[] = [
  {
    id: "q1",
    question: "What is the notice period for the Wola contract?",
    text: "The signed agreement that applies to the Wola flat sets a notice period of 60 days. Either party can end the agreement with written notice. The older draft gives 30 days, but agreement B was signed on 4 November 2025 and replaces it. The 60-day period applies to both flats from 1 December 2025.",
    cites: [{ docId: "contract-signed-b-2025-11", page: 2, chunkId: "cb-2" }],
  },
  {
    id: "q2",
    question: "Which contract applies to the Mokotów flat?",
    text: "Signed agreement B applies to the Mokotów flat. Schedule 1 lists Puławska 14 in Mokotów and Kasprzaka 22 in Wola under the same agreement. Agreement B was signed on 4 November 2025. Clause 12 says that it replaces draft agreement A from 11 March 2025 and governs both flats from 1 December 2025.",
    cites: [
      { docId: "contract-signed-b-2025-11", page: 1, chunkId: "cb-1" },
      { docId: "contract-signed-b-2025-11", page: 3, chunkId: "cb-4" },
    ],
  },
  {
    id: "q3",
    question: "What is the average price per square metre in Q3 2026?",
    text: "The average asking price in Warsaw in Q3 2026 was 16 400 PLN per square metre. That is 6.8 percent more than in Q3 2025. The middle 50 percent of transactions were between 13 800 and 19 600 PLN per square metre. A typical two-room flat of 48 square metres costs about 787 000 PLN at the average price.",
    cites: [
      { docId: "market-report-q3-2026", page: 7, chunkId: "mr-7" },
      { docId: "market-report-q3-2026", page: 1, chunkId: "mr-1" },
    ],
  },
  {
    id: "q4",
    question: "Can a tenant keep a dog?",
    text: "A tenant may keep a dog only with the written consent of the owner. The tenant sends a written request with the animal, its size and its breed. The owner may refuse without a reason. Consent may set conditions, such as a professional carpet clean at handover or a pet deposit. No consent is given for animals that need a permit.",
    cites: [{ docId: "lease-template-2024", page: 3, chunkId: "lt-5" }],
  },
  {
    id: "q5",
    question: "What commission does the agency charge?",
    text: "The agency charges 2.5 percent of the final transaction price plus 23 percent VAT. The minimum commission is 6 000 PLN net. On a flat at 890 000 PLN the commission is 22 250 PLN net, or 27 367.50 PLN with VAT. The fee is stated in the listing agreement before the client signs.",
    cites: [{ docId: "agency-fee-policy", page: 1, chunkId: "fp-1" }],
  },
  {
    id: "q6",
    question: "Do the two contracts agree on the deposit?",
    text: "No. The two contracts do not agree. Draft A sets a deposit of two months, equal to 11 800 PLN. Signed agreement B sets a deposit of three months, equal to 17 700 PLN. Both clauses remain in the archive. Rule applied: the contract with the later signature date governs, so agreement B applies. Draft A stays visible for audit.",
    cites: [
      { docId: "contract-draft-a-2025-03", page: 2, chunkId: "ca-2" },
      { docId: "contract-signed-b-2025-11", page: 2, chunkId: "cb-2" },
    ],
    conflictKey: "deposit",
  },
  {
    id: "q7",
    question: "What is the deposit under the signed contract?",
    text: "The signed agreement sets the deposit at three months' rent, equal to 17 700 PLN for Mokotów 14. The agency holds the deposit in a separate client account. It returns the deposit within 30 days after handover, after the final meter reading and the damage check.",
    cites: [{ docId: "contract-signed-b-2025-11", page: 2, chunkId: "cb-2" }],
  },
  {
    id: "q8",
    question: "How long does a flat stay on the market in Q3 2026?",
    text: "The average time from listing to a signed preliminary contract was 90 days in Q3 2026. That is down from 104 days in Q2. Flats priced within 3 percent of the district average sold in 61 days. Flats priced more than 10 percent above the average stayed on market for 140 days or more.",
    cites: [
      { docId: "market-report-q3-2026", page: 7, chunkId: "mr-8" },
      { docId: "market-report-q3-2026", page: 1, chunkId: "mr-1" },
    ],
  },
  {
    id: "q9",
    question: "What is the price of the Mokotów flat?",
    text: "The asking price for the Mokotów flat at Puławska 14 is 1 180 000 PLN. The flat has 62 square metres, which gives 19 032 PLN per square metre. It has three rooms on the fourth floor and a balcony. The flat is vacant and can be viewed from 2 November 2026.",
    cites: [{ docId: "listing-mokotow-14", page: 1, chunkId: "mk-1" }],
  },
  {
    id: "q10",
    question: "Does the Wola flat include parking?",
    text: "Yes. The price of the Wola flat includes a parking space in the underground garage and a storage unit of 4 square metres. The parking space is number 27 on level minus one. The monthly building charge is 620 PLN and the parking space costs 90 PLN per month.",
    cites: [
      { docId: "listing-wola-22", page: 1, chunkId: "wo-2" },
      { docId: "listing-wola-22", page: 1, chunkId: "wo-1" },
    ],
  },
  {
    id: "q11",
    question: "What is the fixed penalty for a late rent payment?",
    text: "The demo archive does not contain a fixed penalty for a late rent payment. The lease template says that a payment more than 14 days late permits a written reminder and then termination, but it sets no penalty amount. This is a gap in the demo corpus, not a retrieval error.",
    cites: [],
    gap: true,
  },
  {
    id: "q12",
    question: "What is the energy rating of the Mokotów building?",
    text: "The demo archive does not give an energy rating for the Mokotów building. The listing sheet covers the layout, charges and legal notes, but it has no energy certificate. The Wola listing gives class B, so this looks like a missing document for Mokotów. The answer shows no citation because no passage supports it.",
    cites: [],
    gap: true,
  },
];

function normalize(question: string): string {
  return question.toLowerCase().replace(/\s+/g, " ").replace(/[?.!]+$/g, "").trim();
}

export const answerByQuestion: Record<string, AnswerSpec> = Object.fromEntries(
  answers.map((answer) => [normalize(answer.question), answer]),
);

export function findAuthoredAnswer(question: string): AnswerSpec | undefined {
  return answerByQuestion[normalize(question)];
}
