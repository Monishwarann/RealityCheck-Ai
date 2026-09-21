import axios from 'axios';
import { EvidenceItem } from '../types/verification';

export async function fetchOpenAlex(query: string): Promise<EvidenceItem[]> {
  try {
    const url = `https://api.openalex.org/works?search=${encodeURIComponent(query)}&per_page=3`;
    const res = await axios.get(url, {
      headers: { 'User-Agent': 'RealityCheckAI/1.0 (mailto:admin@realitycheck.ai)' },
      timeout: 5000
    });

    const results = res.data?.results || [];

    return results.map((work: any, idx: number) => {
      const title = work.display_name || work.title || 'Academic Paper';
      const year = work.publication_year || new Date().getFullYear();
      const date = work.publication_date || year.toString();
      const authorships = work.authorships ? work.authorships.map((a: any) => a.author?.display_name).slice(0, 3).join(', ') : 'Researchers';
      const venue = work.primary_location?.source?.display_name || 'Academic Venue';
      const doi = work.doi ? work.doi.replace('https://doi.org/', '') : undefined;
      const citationCount = work.cited_by_count || 0;

      return {
        id: `openalex-${work.id || idx}`,
        source: 'OpenAlex API',
        sourceType: 'ACADEMIC RESEARCH',
        title,
        publisher: venue,
        author: authorships,
        date,
        year,
        snippet: `Published in ${venue} (${year}). Cited by ${citationCount} papers. Authors: ${authorships}.`,
        url: work.doi || work.id || '#',
        doi,
        datasetId: work.id,
        relationship: 'SUPPORTS',
        relevance: 0.88,
        isPrimary: true
      };
    });
  } catch (error) {
    console.warn('OpenAlex API error:', error);
    return [];
  }
}
