export type ClaimCategory =
  | 'General fact'
  | 'Political/public claim'
  | 'Science'
  | 'Medical'
  | 'Economics'
  | 'Finance'
  | 'Environment'
  | 'Education'
  | 'Demographics'
  | 'Government statistics'
  | 'Historical claim'
  | 'Technology'
  | 'Geography';

export type VerdictType =
  | 'SUPPORTED'
  | 'MOSTLY SUPPORTED'
  | 'PARTIALLY SUPPORTED'
  | 'CONTRADICTED'
  | 'INSUFFICIENT EVIDENCE';

export type SourceType =
  | 'OFFICIAL DATA'
  | 'ACADEMIC RESEARCH'
  | 'FACT CHECK'
  | 'NEWS REPORT'
  | 'REFERENCE'
  | 'OPEN DATASET';

export type RelationshipType = 'SUPPORTS' | 'CONTRADICTS' | 'CONTEXT';

export interface EvidenceItem {
  id: string; // e.g., "E1", "E2"
  traceTag?: string; // e.g., "[E1]"
  source: string; // e.g. "World Bank", "PubMed", "Wikidata"
  sourceType: SourceType;
  title: string;
  publisher?: string;
  author?: string;
  date?: string; // YYYY or YYYY-MM-DD
  year?: number;
  snippet: string;
  url: string;
  doi?: string;
  datasetId?: string;
  relationship: RelationshipType;
  relevance: number; // 0 to 1
  isPrimary?: boolean;
  retrievedAt?: string; // Real-time timestamp e.g. "21 September 2026 21:42:18 IST"
  metadata?: Record<string, any>;
}

export interface FactCheckItem {
  publisher: string;
  rating: string;
  reviewedClaim: string;
  date: string;
  url: string;
  title?: string;
}

export interface NumericalValidation {
  claimedValue: string;
  reportedValue: string;
  metricName: string;
  countryOrLocation: string;
  unit: string;
  year?: number;
  difference: string;
  sourceName: string;
  sourceUrl: string;
  hasYearSpecified: boolean;
}

export interface RecommendedDataset {
  name: string;
  reason: string;
  url: string;
}

export interface SourceConflict {
  sourceA: string;
  valueA: string;
  yearA: string;
  sourceB: string;
  valueB: string;
  yearB: string;
  reason: string;
  urlA: string;
  urlB: string;
}

export interface VerificationResult {
  id: string;
  claim: string;
  category: ClaimCategory;
  verdict: VerdictType;
  confidence: number; // 0 to 100
  summary: string; // AI explanation with [E1], [E2] trace tags
  extractedEntities: {
    entities: string[];
    dates: string[];
    locations: string[];
    numbers: string[];
    keywords: string[];
  };
  numericalValidation?: NumericalValidation;
  recommendedDatasets?: RecommendedDataset[];
  sourceConflicts?: SourceConflict[];
  supportingEvidence: EvidenceItem[];
  contradictingEvidence: EvidenceItem[];
  contextEvidence: EvidenceItem[];
  academicEvidence: EvidenceItem[];
  newsEvidence: EvidenceItem[];
  factChecks: FactCheckItem[];
  backgroundEvidence: EvidenceItem[];
  sourcesQueried: number;
  sourcesResponding: number;
  sourcesWithEvidence: number;
  sourcesUsed: {
    name: string;
    type: SourceType;
    status: 'SEARCHING' | 'FOUND' | 'NO RESULTS' | 'RATE LIMITED' | 'API ERROR' | 'DEMO FALLBACK' | 'Connected';
    itemCount: number;
    responseTimeMs?: number;
  }[];
  timeline: {
    year: number;
    source: string;
    summary: string;
    relationship: RelationshipType;
    url: string;
  }[];
  timestamp: string; // Real-time timestamp e.g. "21 September 2026 21:42:18 IST"
  isDemo: boolean;
}

export interface SourceInfo {
  id: string;
  name: string;
  description: string;
  dataType: string;
  sourceType: SourceType;
  baseUrl: string;
  priorityCategories: ClaimCategory[];
}
