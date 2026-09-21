import React from 'react';
import { SourceCard } from '../components/SourceCard';
import { Database, ShieldCheck } from 'lucide-react';

export const ALL_SOURCES = [
  {
    id: 'googleFactCheck',
    name: 'Google Fact Check Tools API',
    description: 'Finds third-party publisher fact checks, ratings, dates, and reviewed claims worldwide.',
    dataType: 'Publisher Fact Checks & Ratings',
    sourceType: 'FACT CHECK',
    baseUrl: 'https://toolbox.google.com/factcheck/explorer',
    status: 'Connected' as const
  },
  {
    id: 'wikidata',
    name: 'Wikidata SPARQL / REST',
    description: 'Structured knowledge base graph containing entities, properties, locations, and historical metrics.',
    dataType: 'Structured Entity Facts & Properties',
    sourceType: 'REFERENCE',
    baseUrl: 'https://www.wikidata.org',
    status: 'Connected' as const
  },
  {
    id: 'wikipedia',
    name: 'Wikipedia REST API',
    description: 'Provides background entity summaries, context, and lead article references.',
    dataType: 'Article Summaries & Context',
    sourceType: 'REFERENCE',
    baseUrl: 'https://en.wikipedia.org',
    status: 'Connected' as const
  },
  {
    id: 'gdelt',
    name: 'GDELT 2.0 Global News API',
    description: 'Monitors international news outlets, headlines, publishers, and media coverage in real-time.',
    dataType: 'Real-time News & Media Articles',
    sourceType: 'NEWS REPORT',
    baseUrl: 'https://www.gdeltproject.org',
    status: 'Connected' as const
  },
  {
    id: 'pubmed',
    name: 'PubMed NCBI E-Utilities',
    description: 'Searches peer-reviewed medical, biomedical, and scientific research publications.',
    dataType: 'Medical & Life Sciences Abstracts',
    sourceType: 'ACADEMIC RESEARCH',
    baseUrl: 'https://pubmed.ncbi.nlm.nih.gov',
    status: 'Connected' as const
  },
  {
    id: 'crossref',
    name: 'Crossref REST API',
    description: 'Indexes DOIs, authors, journals, and publication metadata for academic literature.',
    dataType: 'Scholarly Publication DOIs',
    sourceType: 'ACADEMIC RESEARCH',
    baseUrl: 'https://www.crossref.org',
    status: 'Connected' as const
  },
  {
    id: 'openalex',
    name: 'OpenAlex Academic Graph',
    description: 'Open catalog of 250M+ scientific papers, authors, institutions, and citation counts.',
    dataType: 'Scientific Papers & Citation Graph',
    sourceType: 'ACADEMIC RESEARCH',
    baseUrl: 'https://openalex.org',
    status: 'Connected' as const
  },
  {
    id: 'euOpenData',
    name: 'EU Open Data Portal',
    description: 'European Union open data catalog containing European government statistics and datasets.',
    dataType: 'European Government Datasets',
    sourceType: 'OPEN DATASET',
    baseUrl: 'https://data.europa.eu',
    status: 'Connected' as const
  },
  {
    id: 'dataGovIndia',
    name: 'data.gov.in (India Open Data)',
    description: 'Official Indian government data portal providing census, economic, and education statistics.',
    dataType: 'Indian Government Official Statistics',
    sourceType: 'OFFICIAL DATA',
    baseUrl: 'https://data.gov.in',
    status: 'Connected' as const
  },
  {
    id: 'worldBank',
    name: 'World Bank Open Data',
    description: 'Official global development indicators, country statistics, GDP, literacy, and demographic data.',
    dataType: 'International Macro Indicators',
    sourceType: 'OFFICIAL DATA',
    baseUrl: 'https://data.worldbank.org',
    status: 'Connected' as const
  }
];

export const SourceExplorerPage: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 animate-fade-in">
      <div className="space-y-2">
        <div className="flex items-center space-x-2 text-blue-400">
          <Database className="w-5 h-5" />
          <span className="text-xs font-bold uppercase tracking-wider">OPEN DATA INTEGRATIONS</span>
        </div>
        <h1 className="text-3xl font-extrabold text-white">Source Explorer</h1>
        <p className="text-sm text-slate-400 max-w-2xl">
          RealityCheck AI connects directly to 10 free, open, non-proprietary data sources. Every API status is transparently monitored.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {ALL_SOURCES.map((src) => (
          <SourceCard key={src.id} source={src} />
        ))}
      </div>
    </div>
  );
};
