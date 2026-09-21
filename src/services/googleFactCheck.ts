import axios from 'axios';
import { FactCheckItem, EvidenceItem } from '../types/verification';

export async function fetchGoogleFactChecks(query: string, apiKey?: string): Promise<{ factChecks: FactCheckItem[]; evidence: EvidenceItem[] }> {
  try {
    const key = apiKey || process.env.VITE_GOOGLE_FACTCHECK_API_KEY;
    if (!key) {
      // Fallback open query structure
      return {
        factChecks: [],
        evidence: []
      };
    }

    const response = await axios.get('https://factchecktools.googleapis.com/v1alpha1/claims:search', {
      params: {
        query,
        key
      },
      timeout: 5000
    });

    const claims = response.data?.claims || [];
    const factChecks: FactCheckItem[] = [];
    const evidence: EvidenceItem[] = [];

    claims.forEach((item: any, idx: number) => {
      const claimReview = item.claimReview?.[0];
      if (claimReview) {
        const publisherName = claimReview.publisher?.name || 'Fact Check Publisher';
        const rating = claimReview.textualRating || 'Unspecified';
        const url = claimReview.url || item.text || '#';
        const title = claimReview.title || item.text || 'Fact Check Review';
        const reviewDate = claimReview.reviewDate || item.claimDate || new Date().toISOString().substring(0, 10);

        factChecks.push({
          publisher: publisherName,
          rating,
          reviewedClaim: item.text || query,
          date: reviewDate,
          url,
          title
        });

        evidence.push({
          id: `gfc-${idx}`,
          source: 'Google Fact Check',
          sourceType: 'FACT CHECK',
          title: `Fact Check: ${title}`,
          publisher: publisherName,
          date: reviewDate,
          year: parseInt(reviewDate.substring(0, 4)) || new Date().getFullYear(),
          snippet: `Publisher ${publisherName} evaluated claim "${item.text || query}" with rating: "${rating}".`,
          url,
          relationship: rating.toLowerCase().includes('true') || rating.toLowerCase().includes('correct') ? 'SUPPORTS' : rating.toLowerCase().includes('false') || rating.toLowerCase().includes('inaccurate') ? 'CONTRADICTS' : 'CONTEXT',
          relevance: 0.9
        });
      }
    });

    return { factChecks, evidence };
  } catch (error) {
    console.warn('Google Fact Check API warning:', error);
    return { factChecks: [], evidence: [] };
  }
}
