import axios from 'axios';
import { EvidenceItem } from '../types/verification';

export async function fetchWikidata(query: string): Promise<EvidenceItem[]> {
  try {
    // 1. Search Wikidata Entity
    const searchUrl = `https://www.wikidata.org/w/api.php?action=wbsearchentities&search=${encodeURIComponent(query)}&language=en&format=json&origin=*`;
    const searchRes = await axios.get(searchUrl, { timeout: 5000 });
    const entities = searchRes.data?.search || [];

    if (entities.length === 0) return [];

    const topEntity = entities[0];
    const entityId = topEntity.id;
    const label = topEntity.label || query;
    const description = topEntity.description || '';

    // 2. SPARQL claim/property query for top entity
    const sparqlQuery = `
      SELECT ?propLabel ?valLabel WHERE {
        wd:${entityId} ?p ?val .
        ?prop wikibase:directClaim ?p .
        SERVICE wikibase:label { bd:serviceParam wikibase:language "en". }
      } LIMIT 10
    `;

    const sparqlUrl = `https://query.wikidata.org/sparql?query=${encodeURIComponent(sparqlQuery)}&format=json`;
    let propertiesText = description;

    try {
      const sparqlRes = await axios.get(sparqlUrl, {
        headers: { 'Accept': 'application/sparql-results+json', 'User-Agent': 'RealityCheckAI/1.0' },
        timeout: 4000
      });
      const bindings = sparqlRes.data?.results?.bindings || [];
      const propPairs = bindings
        .map((b: any) => `${b.propLabel?.value || 'Property'}: ${b.valLabel?.value || 'Value'}`)
        .filter((str: string) => !str.includes('http') && str.length < 80)
        .slice(0, 5);

      if (propPairs.length > 0) {
        propertiesText += ` Structured properties: ${propPairs.join(' | ')}`;
      }
    } catch {
      // SPARQL optional fallback
    }

    const item: EvidenceItem = {
      id: `wd-${entityId}`,
      source: 'Wikidata',
      sourceType: 'REFERENCE',
      title: `${label} (${entityId}) - Structured Knowledge Base`,
      publisher: 'Wikimedia Wikidata Foundation',
      date: new Date().getFullYear().toString(),
      year: new Date().getFullYear(),
      snippet: `Entity ${entityId} [${label}]: ${propertiesText || 'Structured record stored in Wikidata graph.'}`,
      url: `https://www.wikidata.org/wiki/${entityId}`,
      datasetId: entityId,
      relationship: 'CONTEXT',
      relevance: 0.85
    };

    return [item];
  } catch (error) {
    console.warn('Wikidata API error:', error);
    return [];
  }
}
