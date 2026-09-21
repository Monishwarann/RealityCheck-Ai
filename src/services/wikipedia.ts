import axios from 'axios';
import { EvidenceItem } from '../types/verification';

export async function fetchWikipedia(query: string): Promise<EvidenceItem[]> {
  try {
    // 1. Search Wikipedia articles
    const searchUrl = `https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(query)}&utf8=&format=json&origin=*`;
    const searchRes = await axios.get(searchUrl, { timeout: 5000 });
    const searchResults = searchRes.data?.query?.search || [];

    if (searchResults.length === 0) return [];

    const topArticle = searchResults[0];
    const pageTitle = topArticle.title;

    // 2. Fetch page summary extract
    const summaryUrl = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(pageTitle)}`;
    const summaryRes = await axios.get(summaryUrl, { timeout: 5000 });

    const extract = summaryRes.data?.extract || topArticle.snippet.replace(/<[^>]+>/g, '');
    const pageUrl = summaryRes.data?.content_urls?.desktop?.page || `https://en.wikipedia.org/wiki/${encodeURIComponent(pageTitle)}`;

    const item: EvidenceItem = {
      id: `wiki-${summaryRes.data?.pageid || topArticle.pageid || 1}`,
      source: 'Wikipedia',
      sourceType: 'REFERENCE',
      title: pageTitle,
      publisher: 'Wikimedia Foundation',
      date: summaryRes.data?.timestamp ? summaryRes.data.timestamp.substring(0, 10) : new Date().getFullYear().toString(),
      year: summaryRes.data?.timestamp ? parseInt(summaryRes.data.timestamp.substring(0, 4)) : new Date().getFullYear(),
      snippet: extract.length > 350 ? extract.substring(0, 350) + '...' : extract,
      url: pageUrl,
      relationship: 'CONTEXT',
      relevance: 0.8
    };

    return [item];
  } catch (error) {
    console.warn('Wikipedia API error:', error);
    return [];
  }
}
