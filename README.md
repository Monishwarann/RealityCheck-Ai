# RealityCheck AI 🔍 

> **Verify claims using real-time external evidence. Transparent, traceable, and 100% non-hallucinated.**

RealityCheck AI is a production-style claim verification web application powered by a **Hybrid Groq + Google Gemini AI Architecture** integrated with **10+ free, open-data repositories**. It verifies factual assertions by collecting real-time empirical evidence, comparing claimed values against live datasets, detecting source conflicts, and presenting transparent evidence-based assessments with clickable primary source links.

---

## 🚀 Key Highlights & Philosophy

- **Zero Fabricated Evidence**: AI models are used as evidence analyzers—never as the source of factual truth.
- **100% Live Data Engine**: Queries live open endpoints (World Bank, PubMed, data.gov.in, OpenAlex, Crossref, Wikidata, Wikipedia, GDELT, WHO, EU Open Data, Google Fact Check).
- **Hybrid AI Architecture**: Combines **Groq AI** for fast claim extraction and evidence normalization with **Google Gemini 1.5 Flash** for deep evidence reasoning over retrieved evidence JSON.
- **Numerical Claim Validation**: Mathematically calculates variance ($\Delta$) between user-claimed values and reported live API metrics.
- **Source Conflict & Date Discrepancy Detection**: Identifies when data sources disagree due to differing survey years, methodologies, or population definitions.
- **Complete Traceability**: Every conclusion links to clickable trace tags (`[E1]`, `[E2]`) and original source URLs.

---

## 🏗️ System Architecture

```
                 REALITYCHECK AI
                       │
                    USER CLAIM
                       │
                    ┌──▼──┐
                    │ GROQ │ (Fast AI Orchestrator: Claim Extraction & Domain Routing)
                    └──┬──┘
                       │
             Claim + Source Routing
                       │
       ┌───────────────┼────────────────┐
       ▼               ▼                ▼
   Fact Check       Government       Research
   Wikidata         World Bank       PubMed
   GDELT            data.gov.in      Crossref
   Wikipedia        WHO              OpenAlex
       └───────────────┼────────────────┘
                       ▼
                LIVE EVIDENCE (10+ Real Open APIs)
                       │
                    ┌──▼────┐
                    │ GROQ  │ (Evidence Cleanup & Deduplication)
                    └──┬────┘
                       │
                Normalized Evidence
                       │
                  ┌────▼─────┐
                  │  GEMINI  │ (Deep Evidence Analysis over Live Evidence)
                  └────┬─────┘
                       │
              Deep Evidence Analysis
                       │
                    ┌──▼──┐
                    │ GROQ │ (Structured Response Formatting)
                    └──┬──┘
                       │
                  FINAL RESULT
                       │
          ┌────────────┼────────────┐
          ▼            ▼            ▼
      SUPPORTS     CONTRADICTED  INSUFFICIENT
          │            │            │
          └────────────┼────────────┘
                       ▼
                ORIGINAL SOURCES ([OPEN ORIGINAL SOURCE])
```

---

## 🤖 AI Responsibilities: Groq vs Gemini

### ⚡ Groq (Fast AI Orchestrator)
Powered by `llama-3.3-70b-versatile` on Groq's LPU inference engine:
1. Decomposes claims into entities, metrics, claimed numerical values, operators, and target locations.
2. Selects relevant domain sources (Medical, Science, Economics, Demographics, Government Stats).
3. Deduplicates, formats trace tags (`[E1]`, `[E2]`), and normalizes API evidence objects.
4. Assembles the final structured response payload for the frontend UI.

### 🧠 Google Gemini (Deep Evidence Analyzer)
Powered by `gemini-1.5-flash`:
1. Analyzes **ONLY** the supplied live evidence JSON payload.
2. Instructed strictly to **never** use internal pre-trained knowledge to fill in factual gaps.
3. Evaluates evidence concordance, data years, definitions, and population boundaries.
4. Produces transparent reasoning referencing trace tags (`[E1]`, `[E2]`).
5. Returns `INSUFFICIENT EVIDENCE` if retrieved live data is inadequate.

---

## 🌐 Integrated 10+ Free & Open Data Sources

| Source | Category / Type | Purpose | Base Endpoint |
|---|---|---|---|
| **World Bank Open Data** | Official Data | Global GDP, population, literacy rate, CO2 emissions indicators | `data.worldbank.org` |
| **PubMed NCBI API** | Academic Research | Peer-reviewed medical, biological & clinical research abstracts | `pubmed.ncbi.nlm.nih.gov` |
| **data.gov.in** | Official Data | Government of India official open statistics & census data | `data.gov.in` |
| **OpenAlex API** | Academic Research | Scientific literature, authors, institutions & citation graphs | `openalex.org` |
| **Crossref REST API** | Academic Research | Scholarly publication DOIs & metadata indexing | `crossref.org` |
| **Wikidata SPARQL/REST** | Reference | Structured entity graph, properties, dates, and historical values | `wikidata.org` |
| **Wikipedia REST API** | Reference | Background entity summaries, lead extracts, and context | `en.wikipedia.org` |
| **GDELT 2.0 DOC API** | News Report | Real-time international media coverage and news articles | `gdeltproject.org` |
| **EU Open Data Portal** | Open Dataset | European Union government datasets and portal metrics | `data.europa.eu` |
| **Google Fact Check API** | Fact Check | Third-party publisher ratings, reviewed claims, and dates | `toolbox.google.com` |
| **WHO Observatory** | Official Data | World Health Organization global health & mortality indicators | `data.who.int` |

---

## 🎯 Verdict Categories

- 🟢 **SUPPORTED**: High concordance across verified open empirical sources (>= 85% positive evidence).
- 🟢 **MOSTLY SUPPORTED**: Substantial evidence support with minor contextual qualifications.
- 🟡 **PARTIALLY SUPPORTED**: Evidence confirms specific subsets, demographics, or state-level metrics.
- 🔴 **CONTRADICTED**: Primary official datasets or peer-reviewed literature directly refute the claim.
- ⚪ **INSUFFICIENT EVIDENCE**: Public datasets lack verifiable factual evidence for the query.

---

## 📊 Feature Breakdown

1. **Real-Time Verification Progress Modal**: Displays live progress across all 10 connectors (`✓ Google Fact Check (2 results)`, `✓ World Bank (1 indicator)`, etc.).
2. **Real-Time Proof Panel**: Shows server timestamp (`Verified live: 21 September 2026 22:42:18 IST`) and dynamic source metrics (`Sources queried: 11 | Responding: 9 | Relevant: 6`).
3. **Numerical Claim Comparison**: Compares claimed value vs reported live API value vs calculated mathematical variance ($\Delta$).
4. **Source Discrepancy & Conflict Alert**: Displays `⚠ CONFLICTING LIVE EVIDENCE` warnings when datasets report differing metrics across years.
5. **Dynamic Dataset Recommendations**: Suggests relevant open repositories based on claim context.
6. **Recharts Visualizations**: Interactive Pie charts for stance breakdown and Bar charts for source category distribution.
7. **Source Explorer**: Live monitor matrix inspecting connector statuses (`Connected`, `Searching`, `No results`, `Rate limited`, `API Error`).

---

## 🛠️ Installation & Setup

### Prerequisites
- Node.js (v18+)
- npm / npx

### 1. Clone Repository
```bash
git clone https://github.com/Monishwarann/RealityCheck-Ai.git
cd RealityCheck-Ai
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Environment Variables
Create a `.env` file in the root directory:

```env
PORT=3001
GROQ_API_KEY=your_groq_api_key_here
GOOGLE_FACT_CHECK_API_KEY=your_google_factcheck_api_key_here
GEMINI_API_KEY=your_optional_gemini_key_here
```

### 4. Run Development Server
```bash
# Starts Express backend (port 3001) + Vite frontend (port 5173) concurrently
npm run dev
```
Open **`http://localhost:5173`** in your browser.

### 5. Build Production Bundle
```bash
npm run build
```

---

## 🔌 API Endpoints Documentation

### `POST /api/verify`
Executes real-time claim verification pipeline.

**Request Body:**
```json
{
  "claim": "India's population is above 1.4 billion."
}
```

**Response:**
```json
{
  "id": "verif-1790008500",
  "claim": "India's population is above 1.4 billion.",
  "category": "Demographics",
  "verdict": "SUPPORTED",
  "confidence": 94,
  "summary": "According to live World Bank Open Data [E1], India's population crossed 1.428 billion in 2023...",
  "numericalValidation": {
    "claimedValue": "1.4 billion",
    "reportedValue": "1,428,627,663",
    "metricName": "Total Population",
    "difference": "Δ ~ 2.1% variance from reported benchmark"
  },
  "supportingEvidence": [...],
  "sourcesQueried": 11,
  "sourcesResponding": 9,
  "timestamp": "21 September 2026 22:42:18 IST"
}
```

### `GET /api/sources/status`
Returns status for all 10 open data connectors.

### `GET /api/sources/probe`
Performs live latency probes (ms) against external public endpoints.

---

## 📜 License

Distributed under the **MIT License**. Created for national hackathons and open-science fact-checking initiatives.
