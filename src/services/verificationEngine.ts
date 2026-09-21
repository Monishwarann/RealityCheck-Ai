import { VerificationResult, EvidenceItem, VerdictType, FactCheckItem, ClaimCategory } from '../types/verification';
import { detectCategory, getPrioritizedSources } from './router';
import { fetchGoogleFactChecks } from './googleFactCheck';
import { fetchWikidata } from './wikidata';
import { fetchWikipedia } from './wikipedia';
import { fetchGDELT } from './gdelt';
import { fetchPubMed } from './pubmed';
import { fetchCrossref } from './crossref';
import { fetchOpenAlex } from './openalex';
import { fetchEUOpenData } from './euOpenData';
import { fetchDataGovIndia } from './dataGovIndia';
import { fetchWorldBank } from './worldBank';
import { DEMO_VERIFICATIONS } from './demoData';

export async function verifyClaim(claim: string, isDemoMode: boolean = false): Promise<VerificationResult> {
  const normalizedClaimKey = claim.trim().toLowerCase();

  const demoItem = DEMO_VERIFICATIONS[normalizedClaimKey];

  // If Demo mode or pre-cached claim matches, prioritize demo result
  if ((isDemoMode || demoItem) && demoItem) {
    return {
      ...demoItem,
      timestamp: new Date().toISOString(),
      isDemo: true
    };
  }

  const category = detectCategory(claim);
  const isIndiaContext = claim.toLowerCase().includes('india') || claim.toLowerCase().includes('indian');
  const prioritizedSourceIds = getPrioritizedSources(category, isIndiaContext);

  // Extract entities & numbers
  const dates = claim.match(/\b(18|19|20)\d{2}\b/g) || [];
  const numbers = claim.match(/\b\d+(\.\d+)?%?\b/g) || [];
  const locations = [];
  if (claim.toLowerCase().includes('india')) locations.push('India');
  if (claim.toLowerCase().includes('europe') || claim.toLowerCase().includes('eu')) locations.push('Europe');
  if (claim.toLowerCase().includes('us') || claim.toLowerCase().includes('america')) locations.push('United States');

  const keywords = claim.replace(/[^\w\s]/gi, '').split(' ').filter(w => w.length > 3).slice(0, 5);

  const extractedEntities = {
    entities: [claim.split(' ')[0], locations[0] || 'Global'].filter(Boolean),
    dates,
    locations,
    numbers,
    keywords
  };

  const supportingEvidence: EvidenceItem[] = [];
  const contradictingEvidence: EvidenceItem[] = [];
  const contextEvidence: EvidenceItem[] = [];
  const academicEvidence: EvidenceItem[] = [];
  const newsEvidence: EvidenceItem[] = [];
  const factChecks: FactCheckItem[] = [];
  const backgroundEvidence: EvidenceItem[] = [];

  const sourcesUsedStatus: VerificationResult['sourcesUsed'] = [];
  const startTime = Date.now();

  // Concurrent multi-source execution
  const connectorPromises = [
    {
      name: 'Google Fact Check',
      id: 'googleFactCheck',
      fn: async () => {
        const t0 = Date.now();
        const res = await fetchGoogleFactChecks(claim);
        sourcesUsedStatus.push({
          name: 'Google Fact Check',
          type: 'FACT CHECK',
          status: res.factChecks.length > 0 ? 'Connected' : 'No results',
          itemCount: res.factChecks.length,
          responseTimeMs: Date.now() - t0
        });
        factChecks.push(...res.factChecks);
      }
    },
    {
      name: 'Wikidata',
      id: 'wikidata',
      fn: async () => {
        const t0 = Date.now();
        const res = await fetchWikidata(claim);
        sourcesUsedStatus.push({
          name: 'Wikidata',
          type: 'REFERENCE',
          status: res.length > 0 ? 'Connected' : 'No results',
          itemCount: res.length,
          responseTimeMs: Date.now() - t0
        });
        backgroundEvidence.push(...res);
      }
    },
    {
      name: 'Wikipedia',
      id: 'wikipedia',
      fn: async () => {
        const t0 = Date.now();
        const res = await fetchWikipedia(claim);
        sourcesUsedStatus.push({
          name: 'Wikipedia',
          type: 'REFERENCE',
          status: res.length > 0 ? 'Connected' : 'No results',
          itemCount: res.length,
          responseTimeMs: Date.now() - t0
        });
        backgroundEvidence.push(...res);
      }
    },
    {
      name: 'GDELT',
      id: 'gdelt',
      fn: async () => {
        const t0 = Date.now();
        const res = await fetchGDELT(claim);
        sourcesUsedStatus.push({
          name: 'GDELT',
          type: 'NEWS REPORT',
          status: res.length > 0 ? 'Connected' : 'No results',
          itemCount: res.length,
          responseTimeMs: Date.now() - t0
        });
        newsEvidence.push(...res);
      }
    },
    {
      name: 'PubMed',
      id: 'pubmed',
      fn: async () => {
        const t0 = Date.now();
        const res = await fetchPubMed(claim);
        sourcesUsedStatus.push({
          name: 'PubMed',
          type: 'ACADEMIC RESEARCH',
          status: res.length > 0 ? 'Connected' : 'No results',
          itemCount: res.length,
          responseTimeMs: Date.now() - t0
        });
        academicEvidence.push(...res);
      }
    },
    {
      name: 'Crossref',
      id: 'crossref',
      fn: async () => {
        const t0 = Date.now();
        const res = await fetchCrossref(claim);
        sourcesUsedStatus.push({
          name: 'Crossref',
          type: 'ACADEMIC RESEARCH',
          status: res.length > 0 ? 'Connected' : 'No results',
          itemCount: res.length,
          responseTimeMs: Date.now() - t0
        });
        academicEvidence.push(...res);
      }
    },
    {
      name: 'OpenAlex',
      id: 'openalex',
      fn: async () => {
        const t0 = Date.now();
        const res = await fetchOpenAlex(claim);
        sourcesUsedStatus.push({
          name: 'OpenAlex',
          type: 'ACADEMIC RESEARCH',
          status: res.length > 0 ? 'Connected' : 'No results',
          itemCount: res.length,
          responseTimeMs: Date.now() - t0
        });
        academicEvidence.push(...res);
      }
    },
    {
      name: 'World Bank',
      id: 'worldBank',
      fn: async () => {
        const t0 = Date.now();
        const res = await fetchWorldBank(claim);
        sourcesUsedStatus.push({
          name: 'World Bank',
          type: 'OFFICIAL DATA',
          status: res.length > 0 ? 'Connected' : 'No results',
          itemCount: res.length,
          responseTimeMs: Date.now() - t0
        });
        supportingEvidence.push(...res);
      }
    },
    {
      name: 'data.gov.in',
      id: 'dataGovIndia',
      fn: async () => {
        const t0 = Date.now();
        const res = await fetchDataGovIndia(claim);
        sourcesUsedStatus.push({
          name: 'data.gov.in',
          type: 'OFFICIAL DATA',
          status: res.length > 0 ? 'Connected' : 'No results',
          itemCount: res.length,
          responseTimeMs: Date.now() - t0
        });
        if (isIndiaContext && res.length > 0) supportingEvidence.push(...res);
      }
    },
    {
      name: 'EU Open Data Portal',
      id: 'euOpenData',
      fn: async () => {
        const t0 = Date.now();
        const res = await fetchEUOpenData(claim);
        sourcesUsedStatus.push({
          name: 'EU Open Data Portal',
          type: 'OPEN DATASET',
          status: res.length > 0 ? 'Connected' : 'No results',
          itemCount: res.length,
          responseTimeMs: Date.now() - t0
        });
        contextEvidence.push(...res);
      }
    }
  ];

  await Promise.allSettled(connectorPromises.map(p => p.fn()));

  // Aggregate total evidence collected
  const allCollected: EvidenceItem[] = [
    ...supportingEvidence,
    ...contradictingEvidence,
    ...contextEvidence,
    ...academicEvidence,
    ...newsEvidence,
    ...backgroundEvidence
  ];

  // If live calls yield sparse results and fallback is appropriate, enrich with demo or structured analysis
  if (allCollected.length === 0) {
    const fallbackDemo = DEMO_VERIFICATIONS[normalizedClaimKey];
    if (fallbackDemo) {
      return {
        ...fallbackDemo,
        timestamp: new Date().toISOString(),
        isDemo: true
      };
    }
  }

  // Calculate verdict based on evidence concordances
  let verdict: VerdictType = 'PARTIALLY SUPPORTED';
  let confidence = 75;

  const totalCount = allCollected.length;
  if (totalCount === 0) {
    verdict = 'INSUFFICIENT EVIDENCE';
    confidence = 30;
  } else if (supportingEvidence.length >= 2 && contradictingEvidence.length === 0) {
    verdict = 'SUPPORTED';
    confidence = 90;
  } else if (supportingEvidence.length > contradictingEvidence.length) {
    verdict = 'MOSTLY SUPPORTED';
    confidence = 82;
  } else if (contradictingEvidence.length > supportingEvidence.length) {
    verdict = 'CONTRADICTED';
    confidence = 85;
  }

  // Build timeline
  const timelineMap: Record<number, EvidenceItem> = {};
  allCollected.forEach(item => {
    if (item.year && !timelineMap[item.year]) {
      timelineMap[item.year] = item;
    }
  });

  const timeline = Object.keys(timelineMap)
    .map(Number)
    .sort((a, b) => a - b)
    .map(year => {
      const item = timelineMap[year];
      return {
        year,
        source: item.source,
        summary: item.title,
        relationship: item.relationship,
        url: item.url
      };
    });

  const summary = totalCount > 0
    ? `Verified across ${sourcesUsedStatus.filter(s => s.status === 'Connected').length} open sources (${sourcesUsedStatus.map(s => s.name).slice(0, 4).join(', ')}). Retrieved ${totalCount} primary and secondary evidence records.`
    : `Searched 10 public data repositories. Insufficient explicit empirical datasets were found matching the exact query criteria.`;

  return {
    id: `verif-${Date.now()}`,
    claim,
    category,
    verdict,
    confidence,
    summary,
    extractedEntities,
    supportingEvidence,
    contradictingEvidence,
    contextEvidence,
    academicEvidence,
    newsEvidence,
    factChecks,
    backgroundEvidence,
    sourcesUsed: sourcesUsedStatus,
    timeline,
    timestamp: new Date().toISOString(),
    isDemo: false
  };
}
