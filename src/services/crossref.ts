import axios from 'axios';
import { EvidenceItem } from '../types/verification';

export async function fetchCrossref(query: string): Promise<EvidenceItem[]> {
  try {
    const url = `https://api.crossref.org/works?query=${encodeURIComponent(query)}&rows=3&select=DOI,title,publisher,author,published-print,published-online,URL`;
    const res = await axios.get(url, {
      headers: { 'User-Agent': 'RealityCheckAI/1.0 (mailto:admin@realitycheck.ai)' },
      timeout: 5000
    });

    const items = res.data?.message?.items || [];

    return items.map((item: any, idx: number) => {
      const title = item.title?.[0] || 'Scholarly Publication';
      const publisher = item.publisher || 'Crossref Indexed Journal';
      const authors = item.author ? item.author.map((a: any) => `${a.given || ''} ${a.family || ''}`).slice(0, 3).join(', ') : 'Scholarly Authors';
      const pubParts = item['published-print']?.['date-parts']?.[0] || item['published-online']?.['date-parts']?.[0] || [new Date().getFullYear()];
      const year = pubParts[0] || new Date().getFullYear();
      const doi = item.DOI;
      const urlLink = item.URL || (doi ? `https://doi.org/${doi}` : '#');

      return {
        id: `crossref-${idx}`,
        source: 'Crossref API',
        sourceType: 'ACADEMIC RESEARCH',
        title,
        publisher,
        author: authors,
        date: pubParts.join('-'),
        year,
        snippet: `Peer-reviewed metadata indexed by Crossref. Publisher: ${publisher}. Authors: ${authors}. DOI: ${doi || 'N/A'}.`,
        url: urlLink,
        doi,
        relationship: 'SUPPORTS',
        relevance: 0.9,
        isPrimary: true
      };
    });
  } catch (error) {
    console.warn('Crossref API error:', error);
    return [];
  }
}
