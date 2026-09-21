import axios from 'axios';
import { EvidenceItem } from '../types/verification';

export async function fetchDataGovIndia(query: string, apiKey?: string): Promise<EvidenceItem[]> {
  try {
    const key = apiKey || process.env.VITE_DATAGOV_INDIA_API_KEY;
    
    // Open catalog query fallback / endpoint
    const url = `https://api.data.gov.in/catalog/search?format=json&keywords=${encodeURIComponent(query)}&limit=3${key ? `&api-key=${key}` : ''}`;
    
    const res = await axios.get(url, { timeout: 5000 });
    const records = res.data?.records || res.data?.target_bucket || [];

    return records.map((rec: any, idx: number) => {
      const title = rec.title || rec.resource_title || 'Government of India Open Dataset';
      const ministry = rec.org?.join(', ') || rec.ministry || 'Ministry of Statistics & Programme Implementation';
      const year = rec.created ? parseInt(rec.created.substring(0, 4)) : new Date().getFullYear();
      const desc = rec.desc || rec.description || `Official statistics catalog entry from data.gov.in for ${query}.`;

      return {
        id: `dgi-${idx}`,
        source: 'data.gov.in',
        sourceType: 'OFFICIAL DATA',
        title,
        publisher: ministry,
        date: rec.created ? rec.created.substring(0, 10) : year.toString(),
        year,
        snippet: `${desc} Source: ${ministry}, Govt of India.`,
        url: rec.url || 'https://data.gov.in',
        datasetId: rec.index_name || `DGI-${idx}`,
        relationship: 'SUPPORTS',
        relevance: 0.95,
        isPrimary: true
      };
    });
  } catch (error) {
    console.warn('data.gov.in API warning:', error);
    return [];
  }
}
