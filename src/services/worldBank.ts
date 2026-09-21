import axios from 'axios';
import { EvidenceItem } from '../types/verification';

export async function fetchWorldBank(query: string): Promise<EvidenceItem[]> {
  try {
    // Determine country code and indicator from query
    let country = 'IN'; // Default to India if mentioned or general
    if (query.toLowerCase().includes('global') || query.toLowerCase().includes('world')) {
      country = 'WLD';
    } else if (query.toLowerCase().includes('china')) {
      country = 'CN';
    } else if (query.toLowerCase().includes('united states') || query.toLowerCase().includes('us')) {
      country = 'US';
    } else if (query.toLowerCase().includes('europe')) {
      country = 'EUU';
    }

    let indicator = 'SP.POP.TOTL'; // default total population
    let indicatorName = 'Total Population';

    if (query.toLowerCase().includes('literacy')) {
      indicator = 'SE.ADT.LITR.ZS';
      indicatorName = 'Adult Literacy Rate (% of people ages 15+)';
    } else if (query.toLowerCase().includes('gdp')) {
      indicator = 'NY.GDP.MKTP.CD';
      indicatorName = 'GDP (Current US$)';
    } else if (query.toLowerCase().includes('emission') || query.toLowerCase().includes('co2')) {
      indicator = 'EN.ATM.CO2E.PC';
      indicatorName = 'CO2 emissions (metric tons per capita)';
    } else if (query.toLowerCase().includes('poverty')) {
      indicator = 'SI.POV.NAHC';
      indicatorName = 'Poverty Headcount Ratio';
    }

    const url = `https://api.worldbank.org/v2/country/${country}/indicator/${indicator}?format=json&per_page=5`;
    const res = await axios.get(url, { timeout: 5000 });

    const data = res.data?.[1] || [];
    const validData = data.filter((item: any) => item.value !== null).slice(0, 2);

    return validData.map((item: any, idx: number) => {
      const year = parseInt(item.date) || new Date().getFullYear();
      const val = typeof item.value === 'number' ? item.value.toLocaleString(undefined, { maximumFractionDigits: 2 }) : item.value;
      const countryName = item.country?.value || country;

      return {
        id: `wb-${indicator}-${item.date}-${idx}`,
        source: 'World Bank Open Data',
        sourceType: 'OFFICIAL DATA',
        title: `${indicatorName} - ${countryName} (${item.date})`,
        publisher: 'World Bank Development Research Group',
        date: item.date,
        year,
        snippet: `World Bank indicator ${indicator} records ${indicatorName} for ${countryName} in ${item.date} at: ${val}.`,
        url: `https://data.worldbank.org/indicator/${indicator}?locations=${country}`,
        datasetId: indicator,
        relationship: 'SUPPORTS',
        relevance: 0.96,
        isPrimary: true
      };
    });
  } catch (error) {
    console.warn('World Bank API error:', error);
    return [];
  }
}
