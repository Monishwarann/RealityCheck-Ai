import React from 'react';
import { Info, ShieldCheck, Heart, Code2, Globe } from 'lucide-react';

export const AboutPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 space-y-8 animate-fade-in">
      <div className="space-y-3">
        <div className="flex items-center space-x-2 text-blue-400">
          <Info className="w-5 h-5" />
          <span className="text-xs font-bold uppercase tracking-wider">PROJECT VISION</span>
        </div>
        <h1 className="text-3xl font-extrabold text-white">About RealityCheck AI</h1>
        <p className="text-sm text-slate-300 leading-relaxed">
          RealityCheck AI is built to provide an open, transparent, evidence-first platform for verifying factual claims. In an era of digital misinformation and opaque AI models, RealityCheck AI enforces strict traceability: every conclusion must link to open, public data sources.
        </p>
      </div>

      <div className="glass-card rounded-2xl p-6 border border-slate-800 bg-slate-900/60 space-y-4">
        <h3 className="font-bold text-lg text-white flex items-center space-x-2">
          <ShieldCheck className="w-5 h-5 text-emerald-400" />
          <span>Core Non-Hallucination Guarantees</span>
        </h3>
        <ul className="space-y-2 text-xs text-slate-300 list-disc list-inside">
          <li><strong>Zero Fabricated Citations:</strong> Never invents URLs, DOIs, or study titles.</li>
          <li><strong>Open Data Only:</strong> Uses only free/open endpoints without paywalls.</li>
          <li><strong>Conflicting Evidence Transparency:</strong> Explicitly highlights disagreements between sources.</li>
          <li><strong>Date Recency Preference:</strong> Prioritizes fresh statistics for changing numerical metrics.</li>
          <li><strong>Preserve Uncertainty:</strong> Returns "INSUFFICIENT EVIDENCE" when factual data is lacking.</li>
        </ul>
      </div>

      <div className="glass-card rounded-2xl p-6 border border-slate-800 bg-slate-900/60 space-y-2 text-xs text-slate-400">
        <div className="flex items-center space-x-2 text-white font-bold">
          <Code2 className="w-4 h-4 text-blue-400" />
          <span>Tech Stack</span>
        </div>
        <p>Frontend: React + Vite + TypeScript + Tailwind CSS + Lucide Icons + Recharts</p>
        <p>Backend: Express / Node.js + Open API Connectors (World Bank, PubMed, Wikidata, data.gov.in, GDELT, Crossref, OpenAlex, EU Open Data, Google Fact Check)</p>
      </div>
    </div>
  );
};
