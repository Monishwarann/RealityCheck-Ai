import { VerificationResult, EvidenceItem, FactCheckItem } from '../types/verification';

export const PRESET_CLAIMS = [
  "India's literacy rate is above 80%.",
  "India's population is above 1.4 billion.",
  "Electric vehicles produce zero lifetime emissions.",
  "This scientific treatment reduces disease risk.",
  "Global temperature has increased since the 19th century."
];

export const DEMO_VERIFICATIONS: Record<string, VerificationResult> = {
  "india's literacy rate is above 80%.": {
    id: "demo-literacy-1",
    claim: "India's literacy rate is above 80%.",
    category: "Government statistics",
    verdict: "PARTIALLY SUPPORTED",
    confidence: 78,
    summary: "According to World Bank Open Data (2022) and data.gov.in official statistics, India's overall adult literacy rate is recorded at approximately 77.7% to 78.1%, while youth literacy (ages 15-24) exceeds 90%. While male literacy surpasses 84.7%, the national aggregate remains slightly under the 80% mark, making the claim partially accurate depending on demographic focus.",
    extractedEntities: {
      entities: ["India", "Ministry of Education", "NSSO"],
      dates: ["2022", "2023"],
      locations: ["India"],
      numbers: ["80%", "77.7%", "84.7%", "70.3%"],
      keywords: ["literacy rate", "education statistics", "census", "adult literacy"]
    },
    supportingEvidence: [
      {
        id: "wb-lit-1",
        source: "World Bank Open Data",
        sourceType: "OFFICIAL DATA",
        title: "Literacy rate, adult total (% of people ages 15 and above) - India",
        publisher: "World Bank Development Research Group",
        date: "2022",
        year: 2022,
        snippet: "India's adult literacy rate stood at 77.7% according to the latest national statistical data compiled by World Bank indicators, showing steady increase from 69.3% in 2011.",
        url: "https://data.worldbank.org/indicator/SE.ADT.LITR.ZS?locations=IN",
        datasetId: "SE.ADT.LITR.ZS",
        relationship: "SUPPORTS",
        relevance: 0.95,
        isPrimary: true
      },
      {
        id: "datagov-lit-2",
        source: "data.gov.in",
        sourceType: "OFFICIAL DATA",
        title: "National Statistical Office (NSO) Education Survey Report",
        publisher: "Ministry of Statistics and Programme Implementation, Govt of India",
        date: "2023",
        year: 2023,
        snippet: "Key Indicators of Household Social Consumption on Education in India: National literacy rate reached 77.7%. Male literacy stood at 84.7%, while female literacy reached 70.3%. Youth literacy (15-24 years) reached 91.66%.",
        url: "https://data.gov.in/resource/literacy-rate-person-male-and-female-india",
        datasetId: "DGI-EDU-2023-LIT",
        relationship: "SUPPORTS",
        relevance: 0.98,
        isPrimary: true
      },
      {
        id: "wiki-lit-3",
        source: "Wikipedia",
        sourceType: "REFERENCE",
        title: "Literacy in India - Census & State breakdown",
        publisher: "Wikimedia Foundation",
        date: "2024",
        year: 2024,
        snippet: "Kerala remains the most literate state in India with 96.2% literacy rate, followed by Mizoram (91.33%). Multiple urban zones report literacy above 88%, whereas national overall aggregate averages 77.7%.",
        url: "https://en.wikipedia.org/wiki/Literacy_in_India",
        relationship: "CONTEXT",
        relevance: 0.85
      }
    ],
    contradictingEvidence: [
      {
        id: "nso-lit-diff",
        source: "EU Open Data Portal",
        sourceType: "OPEN DATASET",
        title: "Global Education Development Index - South Asia Focus",
        publisher: "UNESCO Institute for Statistics / EU Data",
        date: "2021",
        year: 2021,
        snippet: "Overall aggregate adult (15+) literacy rate for India is measured at 74.4% in harmonized international baseline datasets, which is beneath the 80% threshold.",
        url: "https://data.europa.eu/data/datasets/global-education-statistics-2021",
        relationship: "CONTRADICTS",
        relevance: 0.88,
        isPrimary: true
      }
    ],
    contextEvidence: [
      {
        id: "wd-lit-4",
        source: "Wikidata",
        sourceType: "REFERENCE",
        title: "India (Q668) - Literacy Rate Property P2250",
        publisher: "Wikidata SPARQL Endpoint",
        date: "2023",
        year: 2023,
        snippet: "Entity Q668 property P2250 (literacy rate): 77.7% (point in time: 2020), determination method: census sampling.",
        url: "https://www.wikidata.org/wiki/Q668",
        relationship: "CONTEXT",
        relevance: 0.82
      }
    ],
    academicEvidence: [
      {
        id: "openalex-lit-5",
        source: "OpenAlex API",
        sourceType: "ACADEMIC RESEARCH",
        title: "Decadal Trajectory of Educational Attainment and Literacy Rate Disparities in India",
        publisher: "Journal of Development Studies",
        author: "R. Sharma et al.",
        date: "2023-05-14",
        year: 2023,
        snippet: "Empirical analysis shows India's urban male literacy rate exceeded 88%, while rural female literacy stands at 65.4%, yielding a weighted national mean of 77.8%.",
        url: "https://openalex.org/W312849201",
        doi: "10.1080/00220388.2023.2198001",
        relationship: "SUPPORTS",
        relevance: 0.91
      },
      {
        id: "crossref-lit-6",
        source: "Crossref API",
        sourceType: "ACADEMIC RESEARCH",
        title: "Socio-Economic Determinants of Youth vs Adult Literacy Gaps in Post-2015 India",
        publisher: "International Journal of Educational Development",
        author: "A. Mukhopadhyay & S. Bannerjee",
        date: "2022-11-01",
        year: 2022,
        snippet: "Youth literacy (age 15-24) surpassed 90% in 2021, driven by Samagra Shiksha Abhiyan, whereas total adult literacy remains constrained at ~77.7%.",
        url: "https://doi.org/10.1016/j.ijedudev.2022.102682",
        doi: "10.1016/j.ijedudev.2022.102682",
        relationship: "CONTEXT",
        relevance: 0.87
      }
    ],
    newsEvidence: [
      {
        id: "gdelt-lit-7",
        source: "GDELT",
        sourceType: "NEWS REPORT",
        title: "India Education Report 2023: Literacy Rate Climbs to 77.7% with Youth Leading the Way",
        publisher: "The Hindu / GDELT News Index",
        date: "2023-09-08",
        year: 2023,
        snippet: "International Literacy Day coverage highlights NSO findings showing national literacy reaching 77.7%, with several southern states topping 90%.",
        url: "https://www.thehindu.com/news/national/india-literacy-rate-nso-survey-report/article6728410.ece",
        relationship: "SUPPORTS",
        relevance: 0.89
      }
    ],
    factChecks: [
      {
        publisher: "FactCheck.org",
        rating: "Mixture / Partially True",
        reviewedClaim: "Claim that India has achieved over 80% national literacy in 2023.",
        date: "2023-10-12",
        url: "https://www.factcheck.org/2023/10/india-literacy-rate-claim-check/",
        title: "Evaluation of National Education Literacy Metrics in India"
      }
    ],
    backgroundEvidence: [],
    sourcesUsed: [
      { name: "data.gov.in", type: "OFFICIAL DATA", status: "Connected", itemCount: 2, responseTimeMs: 140 },
      { name: "World Bank", type: "OFFICIAL DATA", status: "Connected", itemCount: 1, responseTimeMs: 190 },
      { name: "OpenAlex", type: "ACADEMIC RESEARCH", status: "Connected", itemCount: 1, responseTimeMs: 210 },
      { name: "Crossref", type: "ACADEMIC RESEARCH", status: "Connected", itemCount: 1, responseTimeMs: 185 },
      { name: "GDELT", type: "NEWS REPORT", status: "Connected", itemCount: 1, responseTimeMs: 310 },
      { name: "Wikidata", type: "REFERENCE", status: "Connected", itemCount: 1, responseTimeMs: 120 },
      { name: "Wikipedia", type: "REFERENCE", status: "Connected", itemCount: 1, responseTimeMs: 95 },
      { name: "EU Open Data", type: "OPEN DATASET", status: "Connected", itemCount: 1, responseTimeMs: 230 },
      { name: "Google Fact Check", type: "FACT CHECK", status: "Connected", itemCount: 1, responseTimeMs: 175 },
      { name: "PubMed", type: "ACADEMIC RESEARCH", status: "No results", itemCount: 0, responseTimeMs: 160 }
    ],
    timeline: [
      { year: 2011, source: "Census of India", summary: "National adult literacy recorded at 69.3%.", relationship: "CONTEXT", url: "https://data.gov.in" },
      { year: 2021, source: "EU Open Data Portal", summary: "UNESCO international baseline estimates India literacy at 74.4%.", relationship: "CONTRADICTS", url: "https://data.europa.eu" },
      { year: 2022, source: "World Bank Open Data", summary: "World Bank indicator shows adult literacy rate reaching 77.7%.", relationship: "SUPPORTS", url: "https://data.worldbank.org" },
      { year: 2023, source: "data.gov.in / NSO", summary: "National Statistical Office publishes 77.7% national literacy (Male: 84.7%, Female: 70.3%).", relationship: "SUPPORTS", url: "https://data.gov.in" },
      { year: 2024, source: "Wikipedia / Ministry of Education", summary: "Youth literacy (15-24 years) confirmed above 91.66%, while total adult remains 77.7%.", relationship: "CONTEXT", url: "https://en.wikipedia.org" }
    ],
    timestamp: new Date().toISOString(),
    isDemo: true
  },

  "india's population is above 1.4 billion.": {
    id: "demo-pop-1",
    claim: "India's population is above 1.4 billion.",
    category: "Demographics",
    verdict: "SUPPORTED",
    confidence: 96,
    summary: "UN Population Division estimates and World Bank Open Data confirm that India surpassed 1.40 billion people in late 2021 / early 2022, reaching an estimated 1.428 billion to 1.44 billion by 2023-2024, officially making India the world's most populous nation.",
    extractedEntities: {
      entities: ["India", "United Nations Population Division", "World Bank"],
      dates: ["2022", "2023", "2024"],
      locations: ["India"],
      numbers: ["1.4 billion", "1.428 billion", "1.44 billion"],
      keywords: ["population", "demographics", "census", "UN DESA"]
    },
    supportingEvidence: [
      {
        id: "wb-pop-1",
        source: "World Bank Open Data",
        sourceType: "OFFICIAL DATA",
        title: "Population, total - India",
        publisher: "World Bank Open Data API",
        date: "2023",
        year: 2023,
        snippet: "India total population reached 1,428,627,663 (1.428 billion) in 2023 according to official World Bank demographic indicator SP.POP.TOTL.",
        url: "https://data.worldbank.org/indicator/SP.POP.TOTL?locations=IN",
        datasetId: "SP.POP.TOTL",
        relationship: "SUPPORTS",
        relevance: 0.99,
        isPrimary: true
      },
      {
        id: "wd-pop-2",
        source: "Wikidata",
        sourceType: "REFERENCE",
        title: "India (Q668) - Population Property P1082",
        publisher: "Wikidata SPARQL",
        date: "2023",
        year: 2023,
        snippet: "Wikidata P1082 (population): 1,428,627,663 as of 2023, source: United Nations Department of Economic and Social Affairs.",
        url: "https://www.wikidata.org/wiki/Q668",
        relationship: "SUPPORTS",
        relevance: 0.96
      },
      {
        id: "gdelt-pop-3",
        source: "GDELT",
        sourceType: "NEWS REPORT",
        title: "UN Data Confirms India Population Surpasses 1.4 Billion Benchmark",
        publisher: "Reuters / GDELT",
        date: "2023-04-19",
        year: 2023,
        snippet: "United Nations Population Fund (UNFPA) State of World Population Report confirms India's population crossed 1.428 billion, overtaking China.",
        url: "https://www.reuters.com/world/india/india-overtakes-china-worlds-most-populous-nation-un-swop-2023/",
        relationship: "SUPPORTS",
        relevance: 0.97
      }
    ],
    contradictingEvidence: [],
    contextEvidence: [],
    academicEvidence: [],
    newsEvidence: [],
    factChecks: [],
    backgroundEvidence: [],
    sourcesUsed: [
      { name: "World Bank", type: "OFFICIAL DATA", status: "Connected", itemCount: 1, responseTimeMs: 120 },
      { name: "Wikidata", type: "REFERENCE", status: "Connected", itemCount: 1, responseTimeMs: 90 },
      { name: "GDELT", type: "NEWS REPORT", status: "Connected", itemCount: 1, responseTimeMs: 240 }
    ],
    timeline: [
      { year: 2020, source: "World Bank", summary: "India population reaches 1.39 billion.", relationship: "CONTEXT", url: "https://data.worldbank.org" },
      { year: 2022, source: "UN DESA", summary: "India population crosses 1.40 billion threshold.", relationship: "SUPPORTS", url: "https://un.org/desa" },
      { year: 2023, source: "World Bank & Wikidata", summary: "Population recorded at 1.428 billion.", relationship: "SUPPORTS", url: "https://data.worldbank.org" }
    ],
    timestamp: new Date().toISOString(),
    isDemo: true
  },

  "electric vehicles produce zero emissions.": {
    id: "demo-ev-1",
    claim: "Electric vehicles produce zero emissions.",
    category: "Environment",
    verdict: "MOSTLY SUPPORTED",
    confidence: 82,
    summary: "Electric vehicles (EVs) produce ZERO tailpipe (direct) emissions during operation. However, lifecycle analyses published in academic and environmental literature (OpenAlex, Crossref) demonstrate that EVs generate indirect emissions during electricity generation, battery manufacturing, and grid charging, depending on the energy grid mix.",
    extractedEntities: {
      entities: ["Electric Vehicles", "IEA", "EPA"],
      dates: ["2023"],
      locations: ["Global"],
      numbers: ["0 g/km tailpipe", "50%", "70%"],
      keywords: ["electric vehicles", "tailpipe emissions", "lifecycle emissions", "carbon footprint"]
    },
    supportingEvidence: [
      {
        id: "wiki-ev-1",
        source: "Wikipedia",
        sourceType: "REFERENCE",
        title: "Electric Vehicle Environmental Footprint & Direct Emissions",
        publisher: "Wikimedia Foundation",
        date: "2023",
        year: 2023,
        snippet: "Electric battery vehicles have zero direct tailpipe carbon dioxide or particulate emissions during driving.",
        url: "https://en.wikipedia.org/wiki/Electric_vehicle",
        relationship: "SUPPORTS",
        relevance: 0.92
      }
    ],
    contradictingEvidence: [
      {
        id: "crossref-ev-2",
        source: "Crossref API",
        sourceType: "ACADEMIC RESEARCH",
        title: "Comparative Lifecycle Greenhouse Gas Emissions of Battery Electric vs Internal Combustion Engine Vehicles",
        publisher: "Environmental Science & Technology",
        author: "M. Hawkins et al.",
        date: "2023-01-15",
        year: 2023,
        snippet: "While EVs produce zero tailpipe emissions, lifetime manufacturing and grid-power emissions range between 40-120 g CO2-eq/km, significantly lower than combustion engines (220 g/km) but not absolute zero.",
        url: "https://doi.org/10.1021/acs.est.2c06910",
        doi: "10.1021/acs.est.2c06910",
        relationship: "CONTRADICTS",
        relevance: 0.96,
        isPrimary: true
      }
    ],
    contextEvidence: [],
    academicEvidence: [],
    newsEvidence: [],
    factChecks: [
      {
        publisher: "PolitiFact",
        rating: "Mostly True / Context Needed",
        reviewedClaim: "Claim that driving an EV results in zero carbon emissions.",
        date: "2023-05-18",
        url: "https://www.politifact.com/factchecks/2023/may/18/ev-emissions-claim/",
        title: "Do EVs really produce zero emissions?"
      }
    ],
    backgroundEvidence: [],
    sourcesUsed: [
      { name: "Crossref", type: "ACADEMIC RESEARCH", status: "Connected", itemCount: 1, responseTimeMs: 150 },
      { name: "Wikipedia", type: "REFERENCE", status: "Connected", itemCount: 1, responseTimeMs: 80 },
      { name: "Google Fact Check", type: "FACT CHECK", status: "Connected", itemCount: 1, responseTimeMs: 140 }
    ],
    timeline: [
      { year: 2020, source: "IEA Report", summary: "EV direct tailpipe emissions evaluated at 0 g/km.", relationship: "SUPPORTS", url: "https://iea.org" },
      { year: 2023, source: "Environmental Science & Tech", summary: "Lifecycle analysis shows 50-70% lower emissions than gas cars, though manufacturing emissions exist.", relationship: "CONTRADICTS", url: "https://doi.org/10.1021/acs.est.2c06910" }
    ],
    timestamp: new Date().toISOString(),
    isDemo: true
  },

  "global temperature has increased since the 19th century.": {
    id: "demo-climate-1",
    claim: "Global temperature has increased since the 19th century.",
    category: "Environment",
    verdict: "SUPPORTED",
    confidence: 99,
    summary: "Overwhelming scientific consensus documented across PubMed, OpenAlex, Crossref, NASA GISS, and IPCC reports verifies that global average surface temperature has increased by approximately 1.1°C to 1.3°C since the pre-industrial period (1850-1900).",
    extractedEntities: {
      entities: ["IPCC", "NASA GISS", "NOAA"],
      dates: ["1850-1900", "2023"],
      locations: ["Global"],
      numbers: ["1.1°C", "1.3°C", "19th century"],
      keywords: ["global warming", "surface temperature", "pre-industrial", "climate change"]
    },
    supportingEvidence: [
      {
        id: "pubmed-climate-1",
        source: "PubMed API",
        sourceType: "ACADEMIC RESEARCH",
        title: "Global Surface Temperature Trends and Anthropogenic Drivers Since 1850",
        publisher: "NCBI / Nature Climate Change",
        author: "K. Trenberth et al.",
        date: "2023-02-10",
        year: 2023,
        snippet: "Instrumental temperature records confirm global mean surface temperature rose 1.15°C above pre-industrial 19th century baseline (1850-1900).",
        url: "https://pubmed.ncbi.nlm.nih.gov/36781204/",
        doi: "10.1038/s41558-023-01590-w",
        relationship: "SUPPORTS",
        relevance: 0.99,
        isPrimary: true
      },
      {
        id: "openalex-climate-2",
        source: "OpenAlex API",
        sourceType: "ACADEMIC RESEARCH",
        title: "IPCC Sixth Assessment Report: Physical Science Basis Summary",
        publisher: "Cambridge University Press / IPCC",
        date: "2022",
        year: 2022,
        snippet: "It is unequivocal that human influence has warmed the atmosphere, ocean and land by 1.1°C compared to 1850-1900.",
        url: "https://openalex.org/W3198547289",
        relationship: "SUPPORTS",
        relevance: 0.98,
        isPrimary: true
      }
    ],
    contradictingEvidence: [],
    contextEvidence: [],
    academicEvidence: [],
    newsEvidence: [],
    factChecks: [],
    backgroundEvidence: [],
    sourcesUsed: [
      { name: "PubMed", type: "ACADEMIC RESEARCH", status: "Connected", itemCount: 1, responseTimeMs: 140 },
      { name: "OpenAlex", type: "ACADEMIC RESEARCH", status: "Connected", itemCount: 1, responseTimeMs: 160 }
    ],
    timeline: [
      { year: 1880, source: "NASA GISS", summary: "Instrumental global temperature recording established baseline.", relationship: "CONTEXT", url: "https://nasa.gov" },
      { year: 2022, source: "IPCC AR6", summary: "Confirmed 1.1°C increase over pre-industrial 19th century baseline.", relationship: "SUPPORTS", url: "https://ipcc.ch" }
    ],
    timestamp: new Date().toISOString(),
    isDemo: true
  }
};
