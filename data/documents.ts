export type DocType =
  | "Listing"
  | "Contract"
  | "Template"
  | "Market report"
  | "Policy"
  | "Checklist";

export type DocumentRecord = {
  id: string;
  title: string;
  shortTitle: string;
  type: DocType;
  pages: number;
  added: string;
  signed?: string;
  summary: string;
};

export type Chunk = {
  id: string;
  docId: string;
  page: number;
  text: string;
};

export const documents: DocumentRecord[] = [
  {
    id: "listing-mokotow-14",
    title: "Listing sheet — Mokotów, Puławska 14",
    shortTitle: "Mokotów 14",
    type: "Listing",
    pages: 2,
    added: "2026-11-02",
    summary:
      "Three-room flat, 62 m², fourth floor with a balcony and a lift. Asking price 1 180 000 PLN.",
  },
  {
    id: "listing-wola-22",
    title: "Listing sheet — Wola, Kasprzaka 22",
    shortTitle: "Wola 22",
    type: "Listing",
    pages: 2,
    added: "2026-11-04",
    summary:
      "Two-room flat, 48 m², seventh floor with a parking space and a storage unit. Asking price 890 000 PLN.",
  },
  {
    id: "contract-draft-a-2025-03",
    title: "Draft management agreement A — Mokotów 14",
    shortTitle: "Draft A · Mar 2025",
    type: "Contract",
    pages: 5,
    added: "2026-10-19",
    signed: "2025-03-11",
    summary:
      "Draft agreement for the Mokotów flat. Notice period 30 days, deposit 2 months. Signed 11 March 2025 and later replaced by agreement B.",
  },
  {
    id: "contract-signed-b-2025-11",
    title: "Signed management agreement B — Mokotów 14 and Wola 22",
    shortTitle: "Agreement B · Nov 2025",
    type: "Contract",
    pages: 3,
    added: "2026-10-19",
    signed: "2025-11-04",
    summary:
      "Signed agreement for both flats. Notice period 60 days, deposit 3 months. Signed 4 November 2025, supersedes draft A.",
  },
  {
    id: "lease-template-2024",
    title: "Residential lease template 2024",
    shortTitle: "Lease template",
    type: "Template",
    pages: 4,
    added: "2026-09-30",
    summary:
      "Standard agency lease. Deposit, rent indexation, pets on written consent and handover duties.",
  },
  {
    id: "market-report-q3-2026",
    title: "Warsaw residential market report — Q3 2026",
    shortTitle: "Market report Q3",
    type: "Market report",
    pages: 9,
    added: "2026-10-08",
    summary:
      "Average price 16 400 PLN/m², average time on market 90 days, district price table and a 12-month forecast.",
  },
  {
    id: "agency-fee-policy",
    title: "Agency fee policy 2026",
    shortTitle: "Fee policy",
    type: "Policy",
    pages: 2,
    added: "2026-01-15",
    summary:
      "Commission 2.5% of the transaction price plus 23% VAT, with a minimum fee of 6 000 PLN.",
  },
  {
    id: "handover-checklist",
    title: "Handover checklist — managed flats",
    shortTitle: "Handover checklist",
    type: "Checklist",
    pages: 1,
    added: "2026-02-21",
    summary:
      "Keys, meter readings, damage photos and document handover for a new tenancy.",
  },
];

export const chunks: Chunk[] = [
  // Mokotów listing, 5 chunks
  {
    id: "mk-1",
    docId: "listing-mokotow-14",
    page: 1,
    text: "Listing sheet for a three-room flat at Puławska 14 in Mokotów, Warsaw. The flat has 62 square metres on the fourth floor of a seven-storey building with a lift. The asking price is 1 180 000 PLN, which gives 19 032 PLN per square metre. The flat is vacant and can be viewed from 2 November 2026.",
  },
  {
    id: "mk-2",
    docId: "listing-mokotow-14",
    page: 1,
    text: "Room layout: a living room of 24 square metres with a south-facing balcony, two bedrooms of 13 and 11 square metres, a separate kitchen of 8 square metres, a bathroom and a small hall. The seller replaced the windows in 2023. The kitchen has built-in appliances from 2022 and the bathroom has a bathtub and a washing machine connection.",
  },
  {
    id: "mk-3",
    docId: "listing-mokotow-14",
    page: 1,
    text: "Finishes: oak-engineered floor in the living room and bedrooms, ceramic tiles in the kitchen and bathroom, and painted walls. The flat has a gas boiler for heating and hot water. Monthly building charges are 780 PLN and include the lift, cleaning, repairs and a reserve fund. The owner pays 190 PLN per month for a parking space in the courtyard.",
  },
  {
    id: "mk-4",
    docId: "listing-mokotow-14",
    page: 2,
    text: "The balcony is 5 square metres and faces south. The building has a quiet inner courtyard, a bicycle room and a video entry system. The nearest metro station is Wilanowska, eight minutes on foot. A primary school, a pharmacy and a grocery shop are within 400 metres. The flat comes with a storage room of 3 square metres in the basement.",
  },
  {
    id: "mk-5",
    docId: "listing-mokotow-14",
    page: 2,
    text: "Legal and financial notes: the flat has a land registry entry with no mortgage. The seller bought it in 2014 and pays personal income tax on a sale before five years. The price includes the storage room but not the furniture. The agency commission is 2.5 percent plus VAT. The seller asks for a deposit of 5 percent on signing the preliminary contract.",
  },

  // Wola listing, 5 chunks
  {
    id: "wo-1",
    docId: "listing-wola-22",
    page: 1,
    text: "Listing sheet for a two-room flat at Kasprzaka 22 in Wola, Warsaw. The flat has 48 square metres on the seventh floor of a nine-storey building completed in 2019. The asking price is 890 000 PLN, which gives 18 542 PLN per square metre. The flat is rented until 31 January 2027 and the buyer must keep the current lease.",
  },
  {
    id: "wo-2",
    docId: "listing-wola-22",
    page: 1,
    text: "The price includes a parking space in the underground garage and a storage unit of 4 square metres. The parking space is number 27 on level minus one. The building has two lifts, a children's play area and a shared terrace on the roof. The monthly building charge is 620 PLN and the parking space costs 90 PLN per month.",
  },
  {
    id: "wo-3",
    docId: "listing-wola-22",
    page: 1,
    text: "Room layout: a living room with an open kitchen of 23 square metres, one bedroom of 14 square metres, a bathroom of 6 square metres and a hall. The windows face east and the flat is quiet. The kitchen has a fridge, an oven, a hob and a dishwasher. The bathroom has a walk-in shower. Furniture can stay for 25 000 PLN.",
  },
  {
    id: "wo-4",
    docId: "listing-wola-22",
    page: 2,
    text: "Building and area: the building has a concierge from 7:00 to 19:00, a package room and CCTV in the garage. The nearest tram stop is 200 metres away and the Rondo Daszyńskiego metro station is 900 metres away. There is a supermarket on the ground floor and a park 600 metres away. The flat has a fibre internet connection.",
  },
  {
    id: "wo-5",
    docId: "listing-wola-22",
    page: 2,
    text: "Legal and energy notes: the flat has a separate land registry entry and no mortgage. The energy performance certificate is class B, issued in 2019. The current rent is 4 200 PLN per month plus building charges. The tenant has paid a deposit of 8 400 PLN. The seller will transfer the deposit to the buyer at completion and the lease continues on the same terms.",
  },

  // Draft agreement A, 7 chunks
  {
    id: "ca-1",
    docId: "contract-draft-a-2025-03",
    page: 1,
    text: "Draft management agreement A between the owner, Halina Nowak, and the agency, Cytadela Estates sp. z o.o., for the flat at Puławska 14, Mokotów, Warsaw. The agreement covers marketing, viewings, tenant screening, lease preparation and rent collection. The owner gives the agency the right to sign a lease on her behalf. The draft is dated 11 March 2025.",
  },
  {
    id: "ca-2",
    docId: "contract-draft-a-2025-03",
    page: 2,
    text: "Term and deposit. The agreement starts on 1 April 2025 and ends on 31 March 2027. The tenant pays a deposit of two months' rent, equal to 11 800 PLN, before handover. The deposit covers unpaid rent, damage beyond normal use and unpaid utility bills. The agency holds the deposit in a separate client account and returns it within 30 days after the tenant leaves.",
  },
  {
    id: "ca-3",
    docId: "contract-draft-a-2025-03",
    page: 3,
    text: "Rent and charges. The monthly rent is 5 900 PLN, payable by the fifth day of each month. The tenant also pays building charges of 780 PLN and uses the parking space for 190 PLN per month. Late payment carries interest at the statutory rate. The owner pays property tax and the agency pays for the standard listing package. Utility meters are read at handover.",
  },
  {
    id: "ca-4",
    docId: "contract-draft-a-2025-03",
    page: 4,
    text: "Termination and notice period. Either party may end the agreement with a notice period of 30 days, given in writing. A notice sent by email counts only when the other party confirms receipt. If the tenant breaks the lease early, the deposit covers the rent until a new tenant is found, but not more than two months. The agency keeps its commission in that case.",
  },
  {
    id: "ca-5",
    docId: "contract-draft-a-2025-03",
    page: 4,
    text: "Repairs and access. The tenant reports faults in writing within 48 hours. The owner repairs the structure, roof, windows and heating system. The tenant repairs small faults below 300 PLN and keeps the flat clean. The owner or the agency may inspect the flat twice a year with seven days' notice and at a reasonable hour. Emergency access does not need notice.",
  },
  {
    id: "ca-6",
    docId: "contract-draft-a-2025-03",
    page: 5,
    text: "Assignment and subletting. The tenant may not sublet the flat or assign the lease without the written consent of the owner. Short stays through booking platforms are not permitted. A guest may stay for more than 14 days only with written notice to the agency. A breach of this clause is a serious breach and permits termination with immediate effect.",
  },
  {
    id: "ca-7",
    docId: "contract-draft-a-2025-03",
    page: 5,
    text: "Signatures. The owner signed this draft on 11 March 2025 in Warsaw. The agency signed on the same day. The draft refers to a lease that was not attached at signing. The parties agreed that a final version would follow after the tenant was chosen. This draft was replaced by signed agreement B on 4 November 2025. The agency archive keeps the draft for audit.",
  },

  // Signed agreement B, 6 chunks
  {
    id: "cb-1",
    docId: "contract-signed-b-2025-11",
    page: 1,
    text: "Signed management agreement B between the owner, Halina Nowak, and the agency, Cytadela Estates sp. z o.o. Schedule 1 lists two flats: Puławska 14 in Mokotów and Kasprzaka 22 in Wola. The agreement covers marketing, viewings, tenant screening, lease preparation, rent collection and handover. The owner gives the agency the right to sign leases for both flats. Signed in Warsaw on 4 November 2025.",
  },
  {
    id: "cb-2",
    docId: "contract-signed-b-2025-11",
    page: 2,
    text: "Term, notice and deposit. The agreement starts on 1 December 2025 and runs for three years, to 30 November 2028. Either party may end it with a written notice period of 60 days. The tenant pays a deposit of three months' rent, equal to 17 700 PLN for Mokotów 14. The agency holds each deposit in a separate client account and returns it within 30 days after handover.",
  },
  {
    id: "cb-3",
    docId: "contract-signed-b-2025-11",
    page: 2,
    text: "Rent and indexation. The monthly rent for Mokotów 14 is 6 350 PLN and the building charge is 820 PLN. The rent for Wola 22 is 4 200 PLN and the building charge is 620 PLN. Rent may rise once every 12 months by the change in the consumer price index, but not more than 7 percent. The agency gives 30 days' written notice of a rise.",
  },
  {
    id: "cb-4",
    docId: "contract-signed-b-2025-11",
    page: 3,
    text: "Effect and signatures. This agreement replaces draft agreement A signed on 11 March 2025. It applies to both flats from 1 December 2025. If a lease signed before that date gives a different notice period or deposit, this agreement governs from the start date. The owner and the agency signed on 4 November 2025. The later signature date makes this the controlling document.",
  },
  {
    id: "cb-5",
    docId: "contract-signed-b-2025-11",
    page: 3,
    text: "Duties of the agency. The agency markets each flat, screens tenants, prepares the lease and collects rent. The agency sends the owner a monthly statement by the tenth day of the next month. The agency keeps records for six years and reports repairs above 1 500 PLN before work starts. The owner keeps the right to refuse a tenant with a written reason.",
  },
  {
    id: "cb-6",
    docId: "contract-signed-b-2025-11",
    page: 3,
    text: "Disputes and governing law. The agreement is governed by Polish law. The parties first try to settle a dispute in writing within 21 days. If they do not settle it, the court in Warsaw has jurisdiction. A change to the agreement needs the signature of both parties. If one clause is invalid, the other clauses stay in force. The agreement is in Polish and English.",
  },

  // Lease template, 6 chunks
  {
    id: "lt-1",
    docId: "lease-template-2024",
    page: 1,
    text: "Residential lease template for agency use in Warsaw. The lease is between the owner and the tenant and starts on the handover date. It states the address, the floor area, the number of rooms and the furniture included. The tenant uses the flat only as a home and may not run a business there without written consent. The template follows the Polish Civil Code.",
  },
  {
    id: "lt-2",
    docId: "lease-template-2024",
    page: 2,
    text: "Rent and payment. The tenant pays rent by the tenth day of each month to the agency client account. The first payment is due on the handover date. Building charges and utilities are separate. The tenant sends a photo of each meter on the first day of the month. A payment that is more than 14 days late permits a written reminder and then termination with one month's notice.",
  },
  {
    id: "lt-3",
    docId: "lease-template-2024",
    page: 2,
    text: "Rent indexation. The owner may increase the rent once in 12 months. The increase may follow the consumer price index or the market rent for a similar flat in the same district. The owner gives the tenant 30 days' written notice. The tenant may accept the new rent or end the lease with one month's notice before the increase starts. The agency records each increase in the lease file.",
  },
  {
    id: "lt-4",
    docId: "lease-template-2024",
    page: 3,
    text: "Deposit. The tenant pays a deposit of three months' rent before handover. The deposit covers unpaid rent, damage beyond normal use and unpaid bills. The agency holds the deposit in a client account and does not use it as rent. The agency returns the deposit within 30 days after handover, after the final meter reading and the damage check. The tenant receives a written statement of deductions.",
  },
  {
    id: "lt-5",
    docId: "lease-template-2024",
    page: 3,
    text: "Pets. A tenant may keep a dog, a cat or another small pet only with the written consent of the owner. The tenant sends the request in writing and names the animal, its size and its breed. The owner may refuse without a reason. Consent may set conditions, such as a professional carpet clean at handover or a pet deposit. No consent is given for animals that need a permit.",
  },
  {
    id: "lt-6",
    docId: "lease-template-2024",
    page: 4,
    text: "Maintenance, inspections and end of lease. The tenant keeps the flat clean and reports faults within 48 hours. The owner repairs the structure and the fixed installations. The agency inspects the flat once a year with seven days' notice. At the end of the lease the tenant returns all keys and pays the final bills. The flat must be in the same condition, with normal wear accepted.",
  },

  // Market report, 10 chunks
  {
    id: "mr-1",
    docId: "market-report-q3-2026",
    page: 1,
    text: "Warsaw residential market report for the third quarter of 2026. The average asking price in Warsaw is 16 400 PLN per square metre, 6.8 percent more than in the third quarter of 2025. The average time on market is 90 days. The report uses 4 300 closed transactions and 11 200 active listings. Prices are nominal and include VAT where the seller is a company.",
  },
  {
    id: "mr-2",
    docId: "market-report-q3-2026",
    page: 2,
    text: "Supply. At the end of September 2026 there were 11 200 active listings in Warsaw, 4 percent fewer than in June. New supply in the quarter was 3 100 flats, below the five-year average of 3 800. The number of completed new-build flats rose to 2 700. The report notes that owners withdraw flats from the market when they do not get their price, which keeps the listing count low.",
  },
  {
    id: "mr-3",
    docId: "market-report-q3-2026",
    page: 3,
    text: "Demand. Mortgage applications rose 9 percent from the second quarter. The average mortgage rate was 6.1 percent in September. Cash buyers were 38 percent of transactions, mostly for flats below 700 000 PLN. The number of foreign buyers stayed at 3 percent of transactions. Viewings per listing rose from 4.2 to 5.1, which shows more serious buyers and fewer casual viewings.",
  },
  {
    id: "mr-4",
    docId: "market-report-q3-2026",
    page: 4,
    text: "Rents. The average rent in Warsaw was 4 950 PLN per month for a two-room flat, 3.2 percent more than a year before. Rents rose fastest in Wola and Praga, where new offices opened. The gross rental yield was 4.4 percent in the centre and 5.1 percent in outer districts. The report warns that rising service charges reduce the net yield for older buildings.",
  },
  {
    id: "mr-5",
    docId: "market-report-q3-2026",
    page: 5,
    text: "District prices, PLN per square metre: Śródmieście 22 400, Mokotów 18 900, Żoliborz 17 200, Wola 17 600, Ochota 16 100, Praga Południe 14 800, Białołęka 12 100. Wola had the highest price growth at 9.4 percent. Białołęka had the lowest at 3.1 percent. Mokotów kept the second-highest price and the shortest time on market for flats with three rooms.",
  },
  {
    id: "mr-6",
    docId: "market-report-q3-2026",
    page: 6,
    text: "New-build pipeline. Developers started 3 900 flats in the quarter, 12 percent more than a year before. Most new projects are in Wola, Białołęka and Praga. The average price of a new flat is 18 200 PLN per square metre. Completion is expected in 2028 for most projects. The report notes delays in permits and a shortage of construction workers as the main risks.",
  },
  {
    id: "mr-7",
    docId: "market-report-q3-2026",
    page: 7,
    text: "Price levels. The average price in Warsaw is 16 400 PLN per square metre. The middle 50 percent of transactions fall between 13 800 and 19 600 PLN. The cheapest 10 percent are below 12 100 PLN and the most expensive 10 percent are above 22 400 PLN. A typical two-room flat of 48 square metres costs about 787 000 PLN at the average price.",
  },
  {
    id: "mr-8",
    docId: "market-report-q3-2026",
    page: 7,
    text: "Time on market. The average time from listing to signed preliminary contract is 90 days, down from 104 days in the second quarter. Flats priced within 3 percent of the district average sell in 61 days. Flats priced more than 10 percent above the average stay on market for 140 days or more. Well-presented flats on lower floors sell faster than the report expected.",
  },
  {
    id: "mr-9",
    docId: "market-report-q3-2026",
    page: 8,
    text: "Forecast. The report expects asking prices to rise 4 to 6 percent in the next 12 months. Supply will stay below demand in the centre and in Wola. Rents will rise 3 to 5 percent. The main risks are a rise in mortgage rates, a slower economy and a change in the buyer support programme. The forecast assumes no major change in interest rates before mid-2027.",
  },
  {
    id: "mr-10",
    docId: "market-report-q3-2026",
    page: 9,
    text: "Methodology and sources. The report uses closed transaction data from the agency network, land registry records and listing portals. The sample is 4 300 transactions between July and September 2026. Asking prices are weighted by floor area. The report removes duplicate listings and flats above 200 square metres. Figures are rounded. The next report will be published in January 2027.",
  },

  // Fee policy, 4 chunks
  {
    id: "fp-1",
    docId: "agency-fee-policy",
    page: 1,
    text: "Agency commission. The standard commission is 2.5 percent of the final transaction price plus 23 percent VAT. The minimum commission is 6 000 PLN net. For a flat at 890 000 PLN the commission is 22 250 PLN net and 27 367.50 PLN with VAT. The commission is written in the listing agreement and in the offer before the client signs. No commission is charged to a buyer who is not the client.",
  },
  {
    id: "fp-2",
    docId: "agency-fee-policy",
    page: 1,
    text: "Payment and split. The seller pays the commission at the notarial deed or within seven days of the deed. If the sale does not complete because the buyer withdraws, the agency invoices 30 percent of the commission for work done. If the seller withdraws without a legal reason, the full commission is due. A cooperating agency shares the commission equally unless the listing agreement says otherwise.",
  },
  {
    id: "fp-3",
    docId: "agency-fee-policy",
    page: 2,
    text: "Marketing package. Professional photos, a floor plan, a virtual tour and portal promotion cost 1 200 PLN net. The fee is due at the start of marketing and is not refunded. The agency may recommend a home-staging service from a partner. The client pays the partner directly. The agency does not add a mark-up to third-party invoices, and the client receives the original invoice.",
  },
  {
    id: "fp-4",
    docId: "agency-fee-policy",
    page: 2,
    text: "Exclusivity and refunds. An exclusive listing runs for 90 days and may be extended in writing. If the owner sells through another agency during the exclusive period, the full commission is still due. The commission is refunded only if the agency made a material error in the listing agreement. A complaint must be sent in writing within 14 days of the invoice. The policy follows the agency code of conduct.",
  },

  // Handover checklist, 2 chunks
  {
    id: "hc-1",
    docId: "handover-checklist",
    page: 1,
    text: "Handover checklist, part one. Count all keys, including the building entrance, the flat door, the mailbox and the storage room. Read and photograph the cold water, hot water, electricity and gas meters. Test every light switch, socket, tap and drain. Take dated photos of each room, the meter faces and any damage. Write the meter values in the handover protocol and ask the tenant to sign.",
  },
  {
    id: "hc-2",
    docId: "handover-checklist",
    page: 1,
    text: "Handover checklist, part two. Give the tenant the lease, the building rules, the waste collection schedule and the contact for repairs. Confirm the deposit and the first rent payment. Give the warranty cards for appliances and the instructions for the heating system. Check that the flat is clean and that all furniture on the inventory is present. Both parties sign two copies of the protocol.",
  },
];

export const documentById: Record<string, DocumentRecord> = Object.fromEntries(
  documents.map((doc) => [doc.id, doc]),
);

export const chunksByDoc: Record<string, Chunk[]> = chunks.reduce(
  (acc, chunk) => {
    acc[chunk.docId] = acc[chunk.docId] ?? [];
    acc[chunk.docId].push(chunk);
    return acc;
  },
  {} as Record<string, Chunk[]>,
);

export function chunksForDoc(docId: string): Chunk[] {
  return chunksByDoc[docId] ?? [];
}

export function formatDate(iso: string): string {
  return new Date(`${iso}T12:00:00Z`).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}
