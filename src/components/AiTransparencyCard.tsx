import React from 'react';
import { Zap, Cpu, Globe, ShieldCheck } from 'lucide-react';

export const AiTransparencyCard: React.FC = () => {
  return (
    <div className="glass-card rounded-2xl p-5 border border-slate-800 bg-slate-900/80 shadow-xl my-6">
      <div className="flex items-center space-x-2 text-slate-400 border-b border-slate-800 pb-3 mb-4">
        <ShieldCheck className="w-5 h-5 text-blue-400" />
        <h3 className="font-bold text-sm text-white uppercase tracking-wider">HYBRID AI ARCHITECTURE TRANSPARENCY</h3>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
        <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 flex items-start space-x-3">
          <div className="p-2 bg-amber-500/10 rounded-lg text-amber-400 border border-amber-500/20 shrink-0">
            <Zap className="w-4 h-4" />
          </div>
          <div>
            <div className="font-extrabold text-white text-sm">FAST ANALYSIS</div>
            <div className="text-amber-400 font-bold text-[11px]">Powered by Groq</div>
            <p className="text-slate-400 text-[10px] mt-1">Extracts claims, entities, metrics & normalizes live evidence.</p>
          </div>
        </div>

        <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 flex items-start space-x-3">
          <div className="p-2 bg-blue-500/10 rounded-lg text-blue-400 border border-blue-500/20 shrink-0">
            <Cpu className="w-4 h-4" />
          </div>
          <div>
            <div className="font-extrabold text-white text-sm">DEEP REASONING</div>
            <div className="text-blue-400 font-bold text-[11px]">Powered by Gemini 1.5 Flash</div>
            <p className="text-slate-400 text-[10px] mt-1">Analyzes ONLY retrieved live evidence. Zero internal knowledge hallucination.</p>
          </div>
        </div>

        <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 flex items-start space-x-3">
          <div className="p-2 bg-emerald-500/10 rounded-lg text-emerald-400 border border-emerald-500/20 shrink-0">
            <Globe className="w-4 h-4" />
          </div>
          <div>
            <div className="font-extrabold text-white text-sm">LIVE SOURCES</div>
            <div className="text-emerald-400 font-bold text-[11px]">Actual External APIs</div>
            <p className="text-slate-400 text-[10px] mt-1">World Bank, PubMed, data.gov.in, OpenAlex, Crossref, Wikidata, GDELT.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
