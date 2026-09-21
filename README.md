# RealityCheck AI 🔍

> **Transparent, Evidence-Based Claim Verification Platform powered by Hybrid Groq + Google Gemini AI and 10+ Live Open Data Repositories.**

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Build Status](https://img.shields.io/badge/Build-Passing-emerald.svg)]()
[![Data Mode](https://img.shields.io/badge/Data%20Mode-100%25%20Live%20Only-brightgreen.svg)]()
[![AI Engine](https://img.shields.io/badge/AI-Groq%20%2B%20Gemini%20Hybrid-indigo.svg)]()

RealityCheck AI is a production-grade web platform built to verify user-submitted claims against real-time external empirical evidence. Traditional AI chatbots frequently hallucinate facts because they rely on internal model memory. RealityCheck AI enforces a strict non-hallucination mandate: **AI models act solely as claim parsers and evidence analyzers over retrieved live evidence. Open data repositories serve as the sole source of truth.**

---

## 🔒 Security Architecture & Data Protection

Security and privacy are engineered directly into the core design of RealityCheck AI:

1. **Server-Side API Key Isolation**:
   - All sensitive credentials (`GROQ_API_KEY`, `GOOGLE_FACT_CHECK_API_KEY`, `GEMINI_API_KEY`, `DATA_GOV_IN_API_KEY`) are stored **strictly on the backend server** in environment variables (`.env`).
   - No secret keys are ever bundled, exposed, or leaked into frontend client JavaScript.
2. **Backend API Proxy & CORS Restrictions**:
   - The React frontend communicates exclusively through the unified backend API layer (`/api/verify`).
   - Requests to external data providers (World Bank, PubMed, OpenAlex, GDELT) are proxied server-side to enforce strict CORS policies and prevent client IP tracking by third parties.
3. **Input Validation & Injection Defense**:
   - User claim inputs are validated, sanitized, and truncated before passing into AI prompts or API parameters.
   - Special control characters, script tags, and prompt injection attempts are stripped to ensure system integrity.
4. **Sliding Window Rate Limiting**:
   - Built-in IP rate limiter (`30 requests / minute per IP`) prevents denial-of-service (DoS) attempts, API quota exhaustion, and automated abuse.
5. **Git Push & Secret Scanning Compliance**:
   - `.env` files are automatically excluded via `.gitignore`. Documentation uses safe key placeholders (`your_groq_api_key_here`) to comply with GitHub Push Protection standards.

---

## 🏗️ Hybrid AI Pipeline Architecture

RealityCheck AI orchestrates **Groq AI** (for fast inference & structure) and **Google Gemini 1.5 Flash** (for deep evidence reasoning) in a multi-stage verification flow:

```
                   ┌────────────────────────────────┐
                   │           USER CLAIM           │
                   └───────────────┬────────────────┘
                                   │
                           ┌───────▼───────┐
                           │    GROQ AI    │  (Fast Claim Extraction & Domain Tagging)
                           └───────┬───────┘
                                   │
                   ┌───────────────▼───────────────┐
                   │     SOURCE ROUTER ENGINE      │  (Selects Relevant Open APIs)
                   └───────────────┬───────────────┘
                                   │
         ┌─────────────────────────┼─────────────────────────┐
         ▼                         ▼                         ▼
  Fact Check Cluster        Government Cluster        Academic Cluster
  • Google Fact Check       • World Bank Open Data    • PubMed NCBI
  • Wikidata SPARQL         • data.gov.in (India)     • OpenAlex Graph
  • Wikipedia API           • WHO Observatory         • Crossref DOIs
  • GDELT News              • EU Open Data Portal     
         └─────────────────────────┼─────────────────────────┘
                                   │
                   ┌───────────────▼───────────────┐
                   │    LIVE EVIDENCE RETRIEVAL    │  (100% Real API Payload)
                   └───────────────┬───────────────┘
                                   │
                           ┌───────▼───────┐
                           │    GROQ AI    │  (Evidence Deduplication & Trace Tagging)
                           └───────┬───────┘
                                   │
                           ┌───────▼───────┐
                           │   GEMINI AI   │  (Deep Reasoning over Live Evidence JSON)
                           └───────┬───────┘
                                   │
                           ┌───────▼───────┐
                           │    GROQ AI    │  (Final Verdict JSON Formatting)
                           └───────┬───────┘
                                   │
                   ┌───────────────▼───────────────┐
                   │      REAL-TIME DASHBOARD      │  (Interactive Proof & Trace Links)
                   └───────────────────────────────┘
```

### AI Pipeline Responsibilities

- **Groq Orchestrator** (`llama-3.3-70b-versatile`):
  - Extracts entities, locations, metrics, target numbers, operators (`>`, `<`, `=`), and dates.
  - Generates domain search queries and assigns priorities to open API connectors.
  - Deduplicates raw responses and formats trace tags (`[E1]`, `[E2]`, `[E3]`).
- **Gemini Deep Analyzer** (`gemini-1.5-flash`):
  - Receives **ONLY** the normalized live evidence JSON payload.
  - Instructed strictly to **never** rely on pre-trained internal knowledge for factual statements.
  - Compares claimed metrics with reported live data, checks data recency, identifies conflicts, and outputs evidence-based reasoning.
- **Failover Protocol**:
  - If Gemini is rate-limited or unconfigured, Groq automatically handles evidence reasoning and labels `"Gemini unavailable — fallback analysis"`.
  - If one external data connector fails, the pipeline logs `"⚠ Source Unavailable"` and continues processing remaining live endpoints.

---

## 🌐 Integrated 10+ Free & Open Data Sources

| Source | Category / Type | Data Description | Official Base Endpoint |
|---|---|---|---|
| **World Bank Open Data** | Official Data | Global GDP, population, literacy rate, CO2 per capita, poverty headcount | `https://data.worldbank.org` |
| **PubMed NCBI API** | Academic Research | Peer-reviewed medical, biological, clinical trial abstracts & PMIDs | `https://pubmed.ncbi.nlm.nih.gov` |
| **data.gov.in** | Official Data | Official Government of India statistics, Ministry of Education & NSO surveys | `https://data.gov.in` |
| **OpenAlex API** | Academic Research | Open catalog of 250M+ scientific papers, author networks & citation graphs | `https://openalex.org` |
| **Crossref REST API** | Academic Research | Scholarly publication DOIs, journal titles, authors, and print dates | `https://www.crossref.org` |
| **Wikidata SPARQL/REST** | Reference | Structured graph entities, properties (e.g. P1082 population, P2250 literacy) | `https://www.wikidata.org` |
| **Wikipedia REST API** | Reference | Contextual background summaries, lead extracts, and revision timestamps | `https://en.wikipedia.org` |
| **GDELT 2.0 DOC API** | News Report | Real-time global media coverage monitoring across 100+ languages | `https://www.gdeltproject.org` |
| **EU Open Data Portal** | Open Dataset | European Union government open data portal and Eurostat datasets | `https://data.europa.eu` |
| **Google Fact Check API** | Fact Check | Third-party publisher ratings, reviewed claims, and fact-check URLs | `https://toolbox.google.com/factcheck` |
| **WHO Observatory** | Official Data | World Health Organization global health, life expectancy, and mortality data | `https://data.who.int` |

---

## 🎯 Verdict Classification System

Verdicts are calculated strictly from retrieved live empirical concordances:

- 🟢 **SUPPORTED**: High concordance across verified open empirical sources (>= 85% positive evidence).
- 🟢 **MOSTLY SUPPORTED**: Substantial evidence support with minor contextual qualifications.
- 🟡 **PARTIALLY SUPPORTED**: Evidence confirms specific subsets, demographics, or state-level metrics.
- 🔴 **CONTRADICTED**: Primary official datasets or peer-reviewed literature directly refute the claim.
- ⚪ **INSUFFICIENT EVIDENCE**: Public datasets lack verifiable factual evidence for the query.

---

## 🔢 Numerical Claim Validation Engine

When a claim contains numerical metrics (e.g., *"India's population is above 1.4 billion"* or *"India's literacy rate is above 80%"*):

1. **Extraction**: Identifies claimed value, metric name, country/location, unit, and target date.
2. **Retrieval**: Queries corresponding live indicator APIs (e.g. World Bank indicator `SP.POP.TOTL`).
3. **Variance Calculation**: Computes mathematical variance ($\Delta$):
   $$\Delta = \text{Reported Live Value} - \text{Claimed Value}$$
4. **Display Card**: Renders Claimed Value vs Reported Value vs Calculated Variance alongside data year and direct API link.

---

## ⚡ Key Features

- **Real-Time Progress Modal**: Displays live connector statuses while searching (`✓ World Bank (1 indicator)`, `✓ PubMed (3 papers)`, `○ No results`).
- **Real-Time Proof Panel**: Displays server timestamp (`Verified live: 21 September 2026 22:42:18 IST`) and dynamic source metrics (`Sources queried: 11 | Responding: 9 | Relevant: 6`).
- **Source Conflict Alert**: Displays `⚠ CONFLICTING LIVE EVIDENCE` warnings when datasets report differing metrics across years or survey methodologies.
- **Dynamic Dataset Recommendations**: Suggests relevant open repositories based on claim context.
- **Recharts Visualizations**: Interactive Pie charts for stance breakdown and Bar charts for source category distribution.
- **Source Explorer**: Live monitor matrix inspecting connector statuses (`Connected`, `Searching`, `No results`, `Rate limited`, `API Error`).

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
DATA_GOV_IN_API_KEY=your_optional_datagov_india_key_here
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

**Response Payload:**
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

### `GET /api/health`
Returns backend health status, uptime, and server timestamp.

---

## ⚖️ Copyright & License

```
Copyright (c) 2026 Monishwarann. All rights reserved.
```

This software is distributed under the **[MIT License](LICENSE)**. You are free to use, modify, and distribute this codebase for open-science, educational, and research projects provided the original copyright notice is retained.
