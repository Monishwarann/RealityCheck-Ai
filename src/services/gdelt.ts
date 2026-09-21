import axios from 'axios';
import { EvidenceItem } from '../types/verification';

export async function fetchGDELT(query: string): Promise<EvidenceItem[]> {
  try {
    const cleanQuery = query.replace(/[^\w\s]/gi, '').split(' ').slice(0, 5).join(' ');
    const url = `https://api.gdeltproject.org/api/v2/doc/doc?query=${encodeURIComponent(cleanQuery)}&mode=artlist&maxrecords=5&format=json`;

    const res = await axios.get(url, { timeout: 6000 });
    const articles = res.data?.articles || [];

    return articles.map((art: any, idx: number) => {
      const seendate = art.seendate || '';
      const year = seendate.length >= 4 ? parseInt(seendate.substring(0, 4)) : new Date().getFullYear();
      const dateFormatted = seendate.length >= 8 ? `${seendate.substring(0, 4)}-${seendate.substring(4, 6)}-${seendate.substring(6, 8)}` : year.toString();

      return {
        id: `gdelt-${idx}`,
        source: 'GDELT',
        sourceType: 'NEWS REPORT',
        title: art.title || 'Global News Article',
        publisher: art.domain || art.source || 'GDELT Global News Index',
        date: dateFormatted,
        year,
        snippet: `Coverage from ${art.domain || 'news media'} regarding "${cleanQuery}". Language: ${art.language || 'English'}.`,
        url: art.url || '#',
        relationship: 'CONTEXT',
        relevance: 0.75
      };
    });
  } catch (error) {
    console.warn('GDELT API error:', error);
    return [];
  }
}
