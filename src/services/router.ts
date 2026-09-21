import { ClaimCategory } from '../types/verification';

export interface SourcePriority {
  sourceId: string;
  name: string;
  priority: number; // 1 (highest) to 10
}

export function detectCategory(claim: string): ClaimCategory {
  const text = claim.toLowerCase();

  if (text.includes('literacy') || text.includes('gdp') || text.includes('census') || text.includes('government') || text.includes('stat')) {
    if (text.includes('india') || text.includes('indian')) return 'Government statistics';
    if (text.includes('eu') || text.includes('europe')) return 'Government statistics';
    return 'Government statistics';
  }

  if (text.includes('medical') || text.includes('disease') || text.includes('treatment') || text.includes('vaccine') || text.includes('clinical') || text.includes('cancer') || text.includes('virus')) {
    return 'Medical';
  }

  if (text.includes('scientific') || text.includes('physics') || text.includes('chemistry') || text.includes('biology') || text.includes('quantum') || text.includes('molecule') || text.includes('study')) {
    return 'Science';
  }

  if (text.includes('population') || text.includes('demographic') || text.includes('birth rate') || text.includes('mortality') || text.includes('migration')) {
    return 'Demographics';
  }

  if (text.includes('emission') || text.includes('temperature') || text.includes('climate') || text.includes('warming') || text.includes('environment') || text.includes('carbon') || text.includes('electric vehicle')) {
    return 'Environment';
  }

  if (text.includes('gdp') || text.includes('inflation') || text.includes('economy') || text.includes('trade') || text.includes('unemployment')) {
    return 'Economics';
  }

  if (text.includes('education') || text.includes('school') || text.includes('university') || text.includes('degree')) {
    return 'Education';
  }

  if (text.includes('century') || text.includes('war') || text.includes('history') || text.includes('ancient') || text.includes('revolution')) {
    return 'Historical claim';
  }

  if (text.includes('technology') || text.includes('ai') || text.includes('software') || text.includes('algorithm') || text.includes('digital')) {
    return 'Technology';
  }

  if (text.includes('political') || text.includes('election') || text.includes('minister') || text.includes('president') || text.includes('law')) {
    return 'Political/public claim';
  }

  if (text.includes('geography') || text.includes('river') || text.includes('mountain') || text.includes('border') || text.includes('capital')) {
    return 'Geography';
  }

  return 'General fact';
}

export function getPrioritizedSources(category: ClaimCategory, isIndiaContext: boolean): string[] {
  switch (category) {
    case 'Medical':
      return ['pubmed', 'crossref', 'openalex', 'gdelt', 'wikipedia'];
    
    case 'Science':
    case 'Technology':
      return ['pubmed', 'crossref', 'openalex', 'gdelt', 'wikipedia', 'wikidata'];

    case 'Government statistics':
    case 'Demographics':
      if (isIndiaContext) {
        return ['dataGovIndia', 'worldBank', 'gdelt', 'wikidata', 'wikipedia'];
      }
      return ['worldBank', 'euOpenData', 'gdelt', 'wikidata', 'wikipedia'];

    case 'Economics':
    case 'Finance':
      return ['worldBank', 'euOpenData', 'gdelt', 'wikidata', 'wikipedia'];

    case 'Environment':
      return ['pubmed', 'crossref', 'openalex', 'worldBank', 'gdelt', 'wikipedia'];

    case 'Political/public claim':
      return ['googleFactCheck', 'gdelt', 'wikidata', 'wikipedia', 'worldBank'];

    default:
      return ['wikidata', 'wikipedia', 'gdelt', 'googleFactCheck', 'worldBank', 'crossref', 'openalex'];
  }
}
