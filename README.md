# RealityCheck AI 🔍

> **Transparent, Evidence-Based Claim Verification Platform using Hybrid Groq + Gemini AI and 10+ Live Open Data APIs.**

RealityCheck AI is a production-grade web application designed to verify user-submitted claims against real-time external datasets. Traditional AI chatbots suffer from hallucinations because they generate facts from internal model memory. RealityCheck AI reverses this model: **AI is used strictly to parse claims and analyze retrieved live evidence, while open empirical data repositories serve as the sole source of truth.**

---

## 🏗️ System Architecture

RealityCheck AI employs a **Hybrid Groq + Google Gemini AI Pipeline** for maximum performance and rigorous reasoning over external data:

```
USER CLAIM ➔ GROQ (Claim Extraction) ➔ SOURCE ROUTER ➔ LIVE OPEN APIs ➔ GROQ (Evidence Normalization) ➔ GEMINI (Deep Evidence Analysis) ➔ GROQ (Structured Verdict) ➔ ORIGINAL SOURCES
```

1. **Groq AI Orchestrator**: Uses `llama-3.3-70b-versatile` to extract entities, metrics, target dates, numerical values, and domain categories. Normalizes raw API data into canonical evidence objects (`E001`, `E002`).
2. **Google Gemini 1.5 Flash**: Performs deep reasoning **strictly** over the retrieved live evidence JSON payload. It compares claimed values against reported metrics without relying on pre-trained internal knowledge.
3. **Failover Protocol**: Automatically falls back if an AI provider or external data API is rate-limited or unavailable.

---

## 🌐 10+ Live Open Data Connectors

RealityCheck AI executes concurrent live API requests across 10+ free, public repositories:

- **World Bank Open Data**: Country-level macroeconomic, demographic, literacy, and CO2 indicators.
- **PubMed NCBI API**: Peer-reviewed medical, biological, and clinical research abstracts.
- **data.gov.in**: Government of India official open statistics and census records.
- **OpenAlex API**: 250M+ scientific publications, author metadata, and citation graphs.
- **Crossref REST API**: Scholarly publication DOIs and academic journal metadata.
- **Wikidata SPARQL / REST**: Structured entity graphs, properties, and historical metrics.
- **Wikipedia REST API**: Contextual background summaries and reference links.
- **GDELT 2.0 DOC API**: Real-time international media coverage and news monitoring.
- **EU Open Data Portal**: European Union open data catalog.
- **Google Fact Check Tools API**: Third-party publisher ratings and reviewed claims.
- **WHO Global Health Observatory**: International health indicators and mortality data.

---

## ⚡ Core Features

- **Numerical Validation Engine**: Mathematically calculates variance ($\Delta$) between claimed values and reported live API metrics.
- **Source Conflict Alert**: Highlights `⚠ CONFLICTING LIVE EVIDENCE` when datasets disagree across survey years or methodologies.
- **Real-Time Proof Panel**: Displays live server timestamps and dynamic source status metrics (`Queried`, `Responding`, `Relevant`).
- **Interactive Traceability**: Trace tags (`[E1]`, `[E2]`) link every conclusion directly to original dataset URLs.
- **Zero Mock Data**: Never uses fake citations, sample results, or fabricated statistics.

---

## 🛠️ Quick Start & Installation

```bash
# 1. Clone repository
git clone https://github.com/Monishwarann/RealityCheck-Ai.git
cd RealityCheck-Ai

# 2. Install dependencies
npm install

# 3. Setup environment variables in .env
PORT=3001
GROQ_API_KEY=your_groq_api_key_here
GOOGLE_FACT_CHECK_API_KEY=your_google_factcheck_api_key_here
GEMINI_API_KEY=your_optional_gemini_key_here

# 4. Start backend & frontend concurrently
npm run dev
```

Open **`http://localhost:5173`** to use the platform.

---

## 🔌 API Endpoints

- `POST /api/verify`: Executes live claim verification pipeline.
- `GET /api/sources/status`: Returns health status for all 10 open data connectors.
- `GET /api/sources/probe`: Performs live latency probes against public APIs.

---

## 📜 License

This project is licensed under the **[MIT License](LICENSE)** - see the [LICENSE](LICENSE) file for details.
