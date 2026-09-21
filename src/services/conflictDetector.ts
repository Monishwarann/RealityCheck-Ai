import { EvidenceItem, SourceConflict } from '../types/verification';

export function detectEvidenceConflicts(evidence: EvidenceItem[]): SourceConflict[] {
  const conflicts: SourceConflict[] = [];

  const supporting = evidence.filter(e => e.relationship === 'SUPPORTS');
  const contradicting = evidence.filter(e => e.relationship === 'CONTRADICTS');

  if (supporting.length > 0 && contradicting.length > 0) {
    const s = supporting[0];
    const c = contradicting[0];

    conflicts.push({
      sourceA: s.source,
      valueA: s.snippet.substring(0, 60),
      yearA: String(s.year || 2023),
      sourceB: c.source,
      valueB: c.snippet.substring(0, 60),
      yearB: String(c.year || 2022),
      reason: 'Different data collection years, survey methodologies, or demographic boundaries.',
      urlA: s.url,
      urlB: c.url
    });
  }

  return conflicts;
}
