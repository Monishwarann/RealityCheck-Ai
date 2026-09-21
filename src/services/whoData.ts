import axios from 'axios';
import { EvidenceItem } from '../types/verification';

export async function fetchWHOData(query: string): Promise<EvidenceItem[]> {
  try {
    const text = query.toLowerCase();
    let indicatorCode = 'WHOSIS_000001'; // Life expectancy at birth
    let indicatorTitle = 'Life Expectancy at Birth (years)';

    if (text.includes('health') || text.includes('disease') || text.includes('mortality') || text.includes('treatment') || text.includes('covid') || text.includes('vaccine')) {
      indicatorCode = 'WHOSIS_000001';
      indicatorTitle = 'Global Health & Life Expectancy Statistics';
    }

    const url = `https://ghoapi.azureedge.net/api/${indicatorCode}`;
    const res = await axios.get(url, { timeout: 4000 });
    const values = res.data?.value || [];

    if (values.length === 0) return [];

    const topVal = values[values.length - 1]; // Latest record
    const year = topVal.TimeDim || new Date().getFullYear();
    const numericVal = topVal.NumericValue ? topVal.NumericValue.toFixed(1) : topVal.Value || 'N/A';
    const country = topVal.SpatialDim || 'Global';

    return [{
      id: `who-${indicatorCode}`,
      source: 'World Health Organization (WHO)',
      sourceType: 'OFFICIAL DATA',
      title: `WHO Indicator: ${indicatorTitle}`,
      publisher: 'World Health Organization Global Health Observatory',
      date: year.toString(),
      year: parseInt(year) || new Date().getFullYear(),
      snippet: `WHO Global Health Observatory indicator ${indicatorCode} records ${indicatorTitle} at: ${numericVal} (${country}, ${year}).`,
      url: `https://data.who.int/indicators/${indicatorCode}`,
      datasetId: indicatorCode,
      relationship: 'SUPPORTS',
      relevance: 0.94,
      isPrimary: true
    }];
  } catch (error) {
    console.warn('WHO API warning:', error);
    return [];
  }
}
