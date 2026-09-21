import React from 'react';
import { HelpCircle, ShieldCheck, Database, Cpu, CheckCircle2, AlertTriangle, Layers, FileText } from 'lucide-react';

export const HowItWorksPage: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10 space-y-12 animate-fade-in">
      <div className="space-y-3 text-center">
        <div className="inline-flex items-center space-x-2 text-blue-400 bg-blue-500/10 px-3.5 py-1.5 rounded-full border border-blue-500/20">
          <HelpCircle className="w-4 h-4" />
          <span className="text-xs font-bold uppercase tracking-wider">METHODOLOGY & ARCHITECTURE</span>
        </div>
        <h1 className="text-4xl font-extrabold text-white">How RealityCheck AI Works</h1>
        <p className="text-base text-slate-400 max-w-2xl mx-auto">
          Unlike chatbots that guess or generate unsupported text, RealityCheck AI executes a multi-stage evidence evaluation pipeline using strictly free, open empirical data sources.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="glass-card rounded-2xl p-6 border border-slate-800 bg-slate-900/60 space-y-3">
          <div className="p-3 bg-blue-600/10 rounded-xl w-max text-blue-400 border border-blue-500/20">
            <FileText className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-lg text-white">1. Claim Extraction & Keyword Tagging</h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            The input query is decomposed to extract key factual assertions, numbers, dates, locations, and specific statistical metrics.
          </p>
        </div>

        <div className="glass-card rounded-2xl p-6 border border-slate-800 bg-slate-900/60 space-y-3">
          <div className="p-3 bg-indigo-600/10 rounded-xl w-max text-indigo-400 border border-indigo-500/20">
            <Database className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-lg text-white">2. Intelligent Source Routing</h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            Claims are categorized into domains (Medical, Science, Economics, Demographics, Government Statistics) to prioritize domain-specific APIs (PubMed, World Bank, data.gov.in, OpenAlex, GDELT).
          </p>
        </div>

        <div className="glass-card rounded-2xl p-6 border border-slate-800 bg-slate-900/60 space-y-3">
          <div className="p-3 bg-purple-600/10 rounded-xl w-max text-purple-400 border border-purple-500/20">
            <Layers className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-lg text-white">3. Multi-Source Parallel Retrieval</h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            Requests are sent simultaneously to up to 10 open endpoints. Results are sanitized, normalized, and mapped with direct publication links and DOIs.
          </p>
        </div>

        <div className="glass-card rounded-2xl p-6 border border-slate-800 bg-slate-900/60 space-y-3">
          <div className="p-3 bg-emerald-600/10 rounded-xl w-max text-emerald-400 border border-emerald-500/20">
            <Cpu className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-lg text-white">4. Non-Hallucinated Verdict Calculation</h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            Verdicts (Supported, Mostly Supported, Partially Supported, Contradicted, Insufficient Evidence) are computed strictly from concordant empirical evidence metrics.
          </p>
        </div>
      </div>
    </div>
  );
};
