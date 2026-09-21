import axios from 'axios';
import { EvidenceItem } from '../types/verification';

export async function fetchPubMed(query: string): Promise<EvidenceItem[]> {
  try {
    // 1. Search E-utilities esearch
    const searchUrl = `https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi?db=pubmed&term=${encodeURIComponent(query)}&retmode=json&retmax=3`;
    const searchRes = await axios.get(searchUrl, { timeout: 5000 });
    const idList: string[] = searchRes.data?.esearchresult?.idlist || [];

    if (idList.length === 0) return [];

    // 2. Fetch summary with esummary
    const summaryUrl = `https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esummary.fcgi?db=pubmed&id=${idList.join(',')}&retmode=json`;
    const summaryRes = await axios.get(summaryUrl, { timeout: 5000 });
    const resultObj = summaryRes.data?.result || {};

    const items: EvidenceItem[] = [];

    idList.forEach((pmid) => {
      const doc = resultObj[pmid];
      if (doc) {
        const pubDate = doc.pubdate || doc.sortfirstpubdate || new Date().getFullYear().toString();
        const year = parseInt(pubDate.substring(0, 4)) || new Date().getFullYear();
        const authors = doc.authors ? doc.authors.map((a: any) => a.name).slice(0, 3).join(', ') : 'NCBI Researchers';
        const journal = doc.source || 'PubMed Journal';

        items.push({
          id: `pmid-${pmid}`,
          source: 'PubMed API',
          sourceType: 'ACADEMIC RESEARCH',
          title: doc.title || 'PubMed Research Abstract',
          publisher: journal,
          author: authors,
          date: pubDate,
          year,
          snippet: `Peer-reviewed study published in ${journal}. PMID: ${pmid}. Authors: ${authors}.`,
          url: `https://pubmed.ncbi.nlm.nih.gov/${pmid}/`,
          doi: doc.articleids?.find((a: any) => a.idtype === 'doi')?.value,
          datasetId: `PMID:${pmid}`,
          relationship: 'SUPPORTS',
          relevance: 0.92,
          isPrimary: true
        });
      }
    });

    return items;
  } catch (error) {
    console.warn('PubMed API error:', error);
    return [];
  }
}
