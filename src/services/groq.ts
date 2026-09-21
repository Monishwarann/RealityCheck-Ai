import axios from 'axios';

export interface GroqExtractedClaim {
  claim: string;
  entity: string;
  metric: string;
  claimed_value: number | string | null;
  operator: string;
  country: string;
  topic: string;
  time_reference: string;
  required_sources: string[];
}

export async function extractClaimWithGroq(claimText: string): Promise<GroqExtractedClaim> {
  const apiKey = process.env.GROQ_API_KEY || process.env.VITE_GROQ_API_KEY;

  if (apiKey) {
    try {
      const response = await axios.post(
        'https://api.groq.com/openai/v1/chat/completions',
        {
          model: 'llama-3.3-70b-versatile',
          messages: [
            {
              role: 'system',
              content: `You are Groq Fast Claim Analyzer for RealityCheck AI. Decompose the input factual claim into structured JSON ONLY. Do not output markdown, prose, or explanation.`
            },
            {
              role: 'user',
              content: `Extract claim parameters for: "${claimText}".
Output format JSON ONLY:
{
  "claim": "${claimText}",
  "entity": "Primary entity",
  "metric": "Key metric or statistical indicator",
  "claimed_value": "numerical value or null",
  "operator": "> or < or = or approx",
  "country": "Country name or Global",
  "topic": "demographics | medical | science | economics | environment | government_statistics | general",
  "time_reference": "current | historical | year",
  "required_sources": ["World Bank", "data.gov.in", "PubMed"]
}`
            }
          ],
          response_format: { type: 'json_object' },
          temperature: 0.1,
          max_tokens: 350
        },
        {
          headers: {
            'Authorization': `Bearer ${apiKey}`,
            'Content-Type': 'application/json'
          },
          timeout: 4000
        }
      );

      const content = response.data?.choices?.[0]?.message?.content;
      if (content) {
        return JSON.parse(content) as GroqExtractedClaim;
      }
    } catch (error) {
      console.warn('Groq API claim extraction warning (using fallback analyzer):', error);
    }
  }

  // Fast Heuristic Fallback
  const lower = claimText.toLowerCase();
  const dates = claimText.match(/\b(18|19|20)\d{2}\b/g) || [];
  const numbers = claimText.match(/\b\d+(\.\d+)?%?\b/g) || [];
  const country = lower.includes('india') ? 'India' : lower.includes('europe') ? 'Europe' : 'Global';

  let topic = 'general';
  if (lower.includes('literacy') || lower.includes('census') || lower.includes('stat')) topic = 'government_statistics';
  else if (lower.includes('population') || lower.includes('demographic')) topic = 'demographics';
  else if (lower.includes('medical') || lower.includes('disease') || lower.includes('treatment')) topic = 'medical';
  else if (lower.includes('gdp') || lower.includes('economy')) topic = 'economics';
  else if (lower.includes('emission') || lower.includes('temperature') || lower.includes('climate')) topic = 'environment';

  return {
    claim: claimText,
    entity: claimText.split(' ')[0] || 'Target Entity',
    metric: topic === 'demographics' ? 'Total Population' : topic === 'government_statistics' ? 'Literacy Rate' : 'Statistical Metric',
    claimed_value: numbers[0] || null,
    operator: lower.includes('above') || lower.includes('greater') ? '>' : lower.includes('below') ? '<' : '=',
    country,
    topic,
    time_reference: dates[0] || 'current',
    required_sources: country === 'India' ? ['data.gov.in', 'World Bank', 'GDELT'] : ['World Bank', 'PubMed', 'Wikidata']
  };
}
