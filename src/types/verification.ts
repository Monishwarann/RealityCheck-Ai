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
  id: string;
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

export interface VerificationResult {
  id: string;
  claim: string;
  category: ClaimCategory;
  verdict: VerdictType;
  confidence: number; // 0 to 100
  summary: string;
  extractedEntities: {
    entities: string[];
    dates: string[];
    locations: string[];
    numbers: string[];
    keywords: string[];
  };
  supportingEvidence: EvidenceItem[];
  contradictingEvidence: EvidenceItem[];
  contextEvidence: EvidenceItem[];
  academicEvidence: EvidenceItem[];
  newsEvidence: EvidenceItem[];
  factChecks: FactCheckItem[];
  backgroundEvidence: EvidenceItem[];
  sourcesUsed: {
    name: string;
    type: SourceType;
    status: 'Connected' | 'Searching' | 'No results' | 'Rate limited' | 'Error' | 'Demo fallback';
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
  timestamp: string;
  isDemo?: boolean;
}

export interface SourceInfo {
  id: string;
  name: string;
  description: string;
  dataType: string;
  sourceType: SourceType;
  icon: string;
  baseUrl: string;
  priorityCategories: ClaimCategory[];
}
