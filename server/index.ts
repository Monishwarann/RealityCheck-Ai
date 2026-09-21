import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import axios from 'axios';
import { verifyClaim } from '../src/services/verificationEngine';
import { VerificationResult } from '../src/types/verification';
import { PRESET_CLAIMS } from '../src/services/demoData';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// In-memory verification history and cache store
const verificationHistory: VerificationResult[] = [];
const cacheStore: Map<string, { timestamp: number; data: VerificationResult }> = new Map();
const CACHE_TTL_MS = 1000 * 60 * 15; // 15 minutes cache TTL

// Rate limiting map
const ipRateLimitMap: Map<string, { count: number; resetTime: number }> = new Map();

const rateLimiter = (req: Request, res: Response, next: () => void) => {
  const ip = req.ip || '127.0.0.1';
  const now = Date.now();
  const windowMs = 60 * 1000; // 1 minute
  const maxRequests = 30;

  let limitInfo = ipRateLimitMap.get(ip);
  if (!limitInfo || now > limitInfo.resetTime) {
    limitInfo = { count: 1, resetTime: now + windowMs };
    ipRateLimitMap.set(ip, limitInfo);
  } else {
    limitInfo.count++;
  }

  if (limitInfo.count > maxRequests) {
    return res.status(429).json({ error: 'Too many requests. Please wait a minute before verifying another claim.' });
  }

  next();
};

app.use(rateLimiter);

// GET /api/health
app.get('/api/health', (_req: Request, res: Response) => {
  return res.json({
    status: 'healthy',
    service: 'RealityCheck AI Fact Verification Engine',
    uptimeSeconds: Math.floor(process.uptime()),
    timestamp: new Date().toISOString()
  });
});

// GET /api/preset-claims
app.get('/api/preset-claims', (_req: Request, res: Response) => {
  return res.json({
    presets: PRESET_CLAIMS
  });
});

// POST /api/verify
app.post('/api/verify', async (req: Request, res: Response) => {
  try {
    const { claim, isDemoMode, forceRefresh } = req.body;
    if (!claim || typeof claim !== 'string' || claim.trim().length === 0) {
      return res.status(400).json({ error: 'Claim text is required and must be non-empty.' });
    }

    const cleanClaim = claim.trim();
    const cacheKey = `${cleanClaim.toLowerCase()}_demo_${Boolean(isDemoMode)}`;

    // Check cache
    if (!forceRefresh && cacheStore.has(cacheKey)) {
      const cached = cacheStore.get(cacheKey)!;
      if (Date.now() - cached.timestamp < CACHE_TTL_MS) {
        return res.json(cached.data);
      }
    }

    // Execute verification engine
    const result = await verifyClaim(cleanClaim, Boolean(isDemoMode));

    // Save to cache
    cacheStore.set(cacheKey, { timestamp: Date.now(), data: result });

    // Save to history
    const existingIdx = verificationHistory.findIndex(h => h.claim.toLowerCase() === cleanClaim.toLowerCase());
    if (existingIdx !== -1) {
      verificationHistory.splice(existingIdx, 1);
    }
    verificationHistory.unshift(result);
    if (verificationHistory.length > 50) verificationHistory.pop();

    return res.json(result);
  } catch (error: any) {
    console.error('Error during claim verification:', error);
    return res.status(500).json({
      error: 'Internal server error during evidence verification pipeline.',
      details: error.message || String(error)
    });
  }
});

// GET /api/history
app.get('/api/history', (_req: Request, res: Response) => {
  return res.json(verificationHistory);
});

// DELETE /api/history/:id
app.delete('/api/history/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  const idx = verificationHistory.findIndex(h => h.id === id);
  if (idx !== -1) {
    verificationHistory.splice(idx, 1);
  }
  return res.json({ success: true, remaining: verificationHistory.length });
});

// DELETE /api/history
app.delete('/api/history', (_req: Request, res: Response) => {
  verificationHistory.length = 0;
  return res.json({ success: true, message: 'Verification history cleared.' });
});

// GET /api/sources/status
app.get('/api/sources/status', (_req: Request, res: Response) => {
  const sources = [
    { id: 'googleFactCheck', name: 'Google Fact Check Tools API', dataType: 'Publisher Fact Checks & Ratings', sourceType: 'FACT CHECK', baseUrl: 'https://toolbox.google.com/factcheck/explorer', status: 'Connected' },
    { id: 'wikidata', name: 'Wikidata SPARQL / REST', dataType: 'Structured Entity Facts & Properties', sourceType: 'REFERENCE', baseUrl: 'https://www.wikidata.org', status: 'Connected' },
    { id: 'wikipedia', name: 'Wikipedia REST API', dataType: 'Article Summaries & Context', sourceType: 'REFERENCE', baseUrl: 'https://en.wikipedia.org', status: 'Connected' },
    { id: 'gdelt', name: 'GDELT 2.0 Global News API', dataType: 'Real-time News & Media Articles', sourceType: 'NEWS REPORT', baseUrl: 'https://www.gdeltproject.org', status: 'Connected' },
    { id: 'pubmed', name: 'PubMed NCBI E-Utilities', dataType: 'Medical & Life Sciences Abstracts', sourceType: 'ACADEMIC RESEARCH', baseUrl: 'https://pubmed.ncbi.nlm.nih.gov', status: 'Connected' },
    { id: 'crossref', name: 'Crossref REST API', dataType: 'Scholarly Publication DOIs', sourceType: 'ACADEMIC RESEARCH', baseUrl: 'https://www.crossref.org', status: 'Connected' },
    { id: 'openalex', name: 'OpenAlex Academic Graph', dataType: 'Scientific Papers & Citation Graph', sourceType: 'ACADEMIC RESEARCH', baseUrl: 'https://openalex.org', status: 'Connected' },
    { id: 'euOpenData', name: 'EU Open Data Portal', dataType: 'European Government Datasets', sourceType: 'OPEN DATASET', baseUrl: 'https://data.europa.eu', status: 'Connected' },
    { id: 'dataGovIndia', name: 'data.gov.in (India Open Data)', dataType: 'Indian Government Official Statistics', sourceType: 'OFFICIAL DATA', baseUrl: 'https://data.gov.in', status: 'Connected' },
    { id: 'worldBank', name: 'World Bank Open Data', dataType: 'International Macro Indicators', sourceType: 'OFFICIAL DATA', baseUrl: 'https://data.worldbank.org', status: 'Connected' }
  ];
  return res.json(sources);
});

// GET /api/sources/probe - Live health probe to public APIs
app.get('/api/sources/probe', async (_req: Request, res: Response) => {
  const probeTargets = [
    { id: 'wikipedia', url: 'https://en.wikipedia.org/api/rest_v1/page/summary/India' },
    { id: 'wikidata', url: 'https://www.wikidata.org/w/api.php?action=wbsearchentities&search=India&language=en&format=json&origin=*' },
    { id: 'worldBank', url: 'https://api.worldbank.org/v2/country/IN/indicator/SP.POP.TOTL?format=json' },
    { id: 'pubmed', url: 'https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi?db=pubmed&term=covid&retmode=json&retmax=1' },
    { id: 'crossref', url: 'https://api.crossref.org/works?query=science&rows=1' },
    { id: 'openalex', url: 'https://api.openalex.org/works?search=climate&per_page=1' }
  ];

  const results = await Promise.allSettled(probeTargets.map(async (t) => {
    const t0 = Date.now();
    try {
      await axios.get(t.url, { timeout: 4000 });
      return { id: t.id, status: 'Connected', latencyMs: Date.now() - t0 };
    } catch {
      return { id: t.id, status: 'Rate limited / Fallback', latencyMs: Date.now() - t0 };
    }
  }));

  const probeStatus = results.map(r => r.status === 'fulfilled' ? r.value : { id: 'unknown', status: 'Error', latencyMs: 0 });
  return res.json({ probeTimestamp: new Date().toISOString(), results: probeStatus });
});

app.listen(PORT, () => {
  console.log(`RealityCheck AI Backend API Server listening on port ${PORT}`);
});
