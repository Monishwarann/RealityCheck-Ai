import { EvidenceItem, SourceType, RelationshipType } from '../types/verification';

export function normalizeEvidence(
  rawItem: any,
  index: number,
  sourceName: string,
  sourceType: SourceType,
  currentTimestampStr: string
): EvidenceItem {
  const id = rawItem.id || `E${String(index).padStart(3, '0')}`;
  const traceTag = `[E${index}]`;

  return {
    id,
    traceTag,
    source: rawItem.source || sourceName,
    sourceType: rawItem.sourceType || sourceType,
    title: rawItem.title || `${sourceName} Data Record`,
    publisher: rawItem.publisher || sourceName,
    author: rawItem.author,
    date: rawItem.date || new Date().getFullYear().toString(),
    year: rawItem.year || (rawItem.date ? parseInt(rawItem.date.substring(0, 4)) : new Date().getFullYear()),
    snippet: rawItem.snippet || 'Retrieved live evidence record.',
    url: rawItem.url || '#',
    doi: rawItem.doi,
    datasetId: rawItem.datasetId || id,
    relationship: (rawItem.relationship as RelationshipType) || 'SUPPORTS',
    relevance: rawItem.relevance || 0.9,
    isPrimary: rawItem.isPrimary ?? (sourceType === 'OFFICIAL DATA'),
    retrievedAt: currentTimestampStr
  };
}
