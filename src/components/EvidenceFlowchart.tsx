import React from 'react';
import { VerdictType } from '../types/verification';
import { ArrowRight, Layers, Zap, Cpu, Globe, CheckCircle2, ShieldCheck } from 'lucide-react';

interface EvidenceFlowchartProps {
  claim: string;
  verdict: VerdictType;
  supportingCount: number;
  contradictingCount: number;
  contextCount: number;
}

export const EvidenceFlowchart: React.FC<EvidenceFlowchartProps> = ({
  claim,
  verdict,
  supportingCount,
  contradictingCount,
  contextCount
}) => {
  return (
    <div className="glass-card rounded-2xl p-6 border border-slate-800 bg-slate-900/80 my-6 shadow-xl overflow-x-auto">
      <div className="flex items-center space-x-2 mb-4">
        <Layers className="w-5 h-5 text-blue-400" />
        <h3 className="font-bold text-lg text-white">Hybrid Groq + Gemini Pipeline Architecture</h3>
      </div>

      <div className="min-w-[850px] flex items-center justify-between gap-3 py-4 text-xs">
        {/* Step 1: User Claim */}
        <div className="flex-1 bg-slate-950 p-3.5 rounded-xl border border-slate-800 text-center shadow-md">
          <span className="text-[10px] font-extrabold uppercase text-blue-400 tracking-wider">1. USER CLAIM</span>
          <p className="text-[11px] font-semibold text-slate-200 mt-1 line-clamp-2">"{claim}"</p>
        </div>

        <ArrowRight className="w-4 h-4 text-slate-600 shrink-0" />

        {/* Step 2: Groq Routing */}
        <div className="flex-1 bg-slate-950 p-3.5 rounded-xl border border-amber-500/30 text-center shadow-md">
          <div className="flex items-center justify-center space-x-1 text-amber-400">
            <Zap className="w-3.5 h-3.5" />
            <span className="text-[10px] font-extrabold uppercase tracking-wider">2. GROQ ROUTER</span>
          </div>
          <p className="text-[10px] text-slate-400 mt-1">Claim Extraction & Domain Routing</p>
        </div>

        <ArrowRight className="w-4 h-4 text-slate-600 shrink-0" />

        {/* Step 3: Live API Clusters */}
        <div className="flex-1 bg-slate-950 p-3.5 rounded-xl border border-emerald-500/30 text-center shadow-md">
          <div className="flex items-center justify-center space-x-1 text-emerald-400">
            <Globe className="w-3.5 h-3.5" />
            <span className="text-[10px] font-extrabold uppercase tracking-wider">3. LIVE OPEN APIs</span>
          </div>
          <div className="flex flex-wrap justify-center gap-1 mt-1">
            <span className="text-[9px] bg-slate-800 px-1 py-0.5 rounded text-slate-300">World Bank</span>
            <span className="text-[9px] bg-slate-800 px-1 py-0.5 rounded text-slate-300">PubMed</span>
            <span className="text-[9px] bg-slate-800 px-1 py-0.5 rounded text-slate-300">data.gov.in</span>
            <span className="text-[9px] bg-slate-800 px-1 py-0.5 rounded text-slate-300">+8 APIs</span>
          </div>
        </div>

        <ArrowRight className="w-4 h-4 text-slate-600 shrink-0" />

        {/* Step 4: Groq Normalizer */}
        <div className="flex-1 bg-slate-950 p-3.5 rounded-xl border border-amber-500/30 text-center shadow-md">
          <div className="flex items-center justify-center space-x-1 text-amber-400">
            <Zap className="w-3.5 h-3.5" />
            <span className="text-[10px] font-extrabold uppercase tracking-wider">4. GROQ CLEANUP</span>
          </div>
          <p className="text-[10px] text-slate-400 mt-1">Trace Tagging & Deduplication</p>
        </div>

        <ArrowRight className="w-4 h-4 text-slate-600 shrink-0" />

        {/* Step 5: Gemini Deep Analysis */}
        <div className="flex-1 bg-slate-950 p-3.5 rounded-xl border border-blue-500/40 text-center shadow-md">
          <div className="flex items-center justify-center space-x-1 text-blue-400">
            <Cpu className="w-3.5 h-3.5" />
            <span className="text-[10px] font-extrabold uppercase tracking-wider">5. GEMINI ANALYSIS</span>
          </div>
          <p className="text-[10px] text-slate-400 mt-1">Deep Evidence Comparison</p>
        </div>

        <ArrowRight className="w-4 h-4 text-slate-600 shrink-0" />

        {/* Step 6: Final Verdict */}
        <div className="flex-1 bg-gradient-to-br from-blue-900/40 to-slate-950 p-3.5 rounded-xl border border-blue-500/40 text-center shadow-lg">
          <span className="text-[10px] font-extrabold uppercase text-blue-400 tracking-wider">6. VERDICT</span>
          <p className="text-xs font-black text-white mt-1 uppercase">{verdict}</p>
        </div>
      </div>
    </div>
  );
};
