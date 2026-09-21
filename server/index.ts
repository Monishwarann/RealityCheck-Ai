import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { verifyClaim } from '../src/services/verificationEngine';
import { VerificationResult } from '../src/types/verification';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// In-memory verification history store
const verificationHistory: VerificationResult[] = [];

// POST /api/verify
app.post('/api/verify', async (req: Request, res: Response) => {
  try {
    const { claim, isDemoMode } = req.body;
    if (!claim || typeof claim !== 'string' || claim.trim().length === 0) {
      return res.status(400).json({ error: 'Claim text is required.' });
    }

    const result = await verifyClaim(claim, Boolean(isDemoMode));

    // Save to history top
    verificationHistory.unshift(result);
    if (verificationHistory.length > 50) verificationHistory.pop();

    return res.json(result);
  } catch (error: any) {
    console.error('Error during verification:', error);
    return res.status(500).json({ error: 'Internal server error during verification pipeline.' });
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

// GET /api/sources/status
app.get('/api/sources/status', (_req: Request, res: Response) => {
  const sources = [
    { id: 'googleFactCheck', name: 'Google Fact Check Tools', dataType: 'Fact Checks & Publisher Ratings', sourceType: 'FACT CHECK', status: 'Connected' },
    { id: 'wikidata', name: 'Wikidata SPARQL / REST', dataType: 'Structured Entity Graphs & Properties', sourceType: 'REFERENCE', status: 'Connected' },
    { id: 'wikipedia', name: 'Wikipedia API', dataType: 'Article Summaries & Background Context', sourceType: 'REFERENCE', status: 'Connected' },
    { id: 'gdelt', name: 'GDELT 2.0 DOC API', dataType: 'Real-time Global Media & News Records', sourceType: 'NEWS REPORT', status: 'Connected' },
    { id: 'pubmed', name: 'PubMed NCBI E-Utilities', dataType: 'Medical & Life Sciences Peer-Reviewed Literature', sourceType: 'ACADEMIC RESEARCH', status: 'Connected' },
    { id: 'crossref', name: 'Crossref REST API', dataType: 'Scholarly Publication DOIs & Metadata', sourceType: 'ACADEMIC RESEARCH', status: 'Connected' },
    { id: 'openalex', name: 'OpenAlex Academic Graph', dataType: 'Papers, Institutions & Citation Metrics', sourceType: 'ACADEMIC RESEARCH', status: 'Connected' },
    { id: 'euOpenData', name: 'EU Open Data Portal', dataType: 'European Union Official Open Datasets', sourceType: 'OPEN DATASET', status: 'Connected' },
    { id: 'dataGovIndia', name: 'data.gov.in', dataType: 'Government of India Official Statistics', sourceType: 'OFFICIAL DATA', status: 'Connected' },
    { id: 'worldBank', name: 'World Bank Open Data', dataType: 'Global Economic & Development Indicators', sourceType: 'OFFICIAL DATA', status: 'Connected' }
  ];
  return res.json(sources);
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
