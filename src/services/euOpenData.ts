import axios from 'axios';
import { EvidenceItem } from '../types/verification';

export async function fetchEUOpenData(query: string): Promise<EvidenceItem[]> {
  try {
    const url = `https://data.europa.eu/api/hub/store/search?q=${encodeURIComponent(query)}&limit=3`;
    const res = await axios.get(url, { timeout: 5000 });
    const datasets = res.data?.result?.results || res.data?.results || [];

    return datasets.map((ds: any, idx: number) => {
      const title = ds.title?.en || ds.title || 'European Open Dataset';
      const publisher = ds.publisher?.name || ds.organisation_name || 'European Union Open Data Portal';
      const year = ds.issued ? parseInt(ds.issued.substring(0, 4)) : new Date().getFullYear();
      const desc = ds.description?.en || ds.description || 'Open dataset published by European Union data portal.';
      const dsId = ds.id || ds.name || `eu-ds-${idx}`;

      return {
        id: `eu-${dsId}`,
        source: 'EU Open Data Portal',
        sourceType: 'OPEN DATASET',
        title,
        publisher,
        date: ds.issued ? ds.issued.substring(0, 10) : year.toString(),
        year,
        snippet: desc.length > 250 ? desc.substring(0, 250) + '...' : desc,
        url: `https://data.europa.eu/data/datasets/${dsId}`,
        datasetId: dsId,
        relationship: 'CONTEXT',
        relevance: 0.82,
        isPrimary: true
      };
    });
  } catch (error) {
    console.warn('EU Open Data API error:', error);
    return [];
  }
}
