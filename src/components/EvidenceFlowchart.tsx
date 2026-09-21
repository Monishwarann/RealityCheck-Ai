import React from 'react';
import { VerdictType } from '../types/verification';
import { ArrowRight, Layers, Cpu, CheckCircle2, ShieldCheck } from 'lucide-react';

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
        <h3 className="font-bold text-lg text-white">Evidence Evaluation Pipeline</h3>
      </div>

      <div className="min-w-[700px] flex items-center justify-between gap-4 py-4">
        {/* Step 1: Claim */}
        <div className="flex-1 bg-slate-950 p-4 rounded-xl border border-slate-800 text-center relative shadow-md">
          <span className="text-[10px] font-bold uppercase text-blue-400 tracking-wider">1. INPUT CLAIM</span>
          <p className="text-xs font-semibold text-slate-200 mt-2 line-clamp-3">"{claim}"</p>
        </div>

        <ArrowRight className="w-5 h-5 text-slate-600 shrink-0" />

        {/* Step 2: Multi-Source Routing */}
        <div className="flex-1 bg-slate-950 p-4 rounded-xl border border-slate-800 text-center shadow-md">
          <span className="text-[10px] font-bold uppercase text-indigo-400 tracking-wider">2. OPEN SOURCE RETRIEVAL</span>
          <div className="flex flex-wrap justify-center gap-1 mt-2">
            <span className="text-[9px] bg-slate-800 px-1.5 py-0.5 rounded text-slate-300">World Bank</span>
            <span className="text-[9px] bg-slate-800 px-1.5 py-0.5 rounded text-slate-300">PubMed</span>
            <span className="text-[9px] bg-slate-800 px-1.5 py-0.5 rounded text-slate-300">data.gov.in</span>
            <span className="text-[9px] bg-slate-800 px-1.5 py-0.5 rounded text-slate-300">+7 Open APIs</span>
          </div>
        </div>

        <ArrowRight className="w-5 h-5 text-slate-600 shrink-0" />

        {/* Step 3: Evidence Classification */}
        <div className="flex-1 bg-slate-950 p-4 rounded-xl border border-slate-800 text-center shadow-md">
          <span className="text-[10px] font-bold uppercase text-cyan-400 tracking-wider">3. CLASSIFIED EVIDENCE</span>
          <div className="flex justify-around items-center mt-2 text-xs font-bold">
            <span className="text-emerald-400">{supportingCount} Support</span>
            <span className="text-rose-400">{contradictingCount} Contradict</span>
            <span className="text-blue-400">{contextCount} Context</span>
          </div>
        </div>

        <ArrowRight className="w-5 h-5 text-slate-600 shrink-0" />

        {/* Step 4: Verdict Synthesis */}
        <div className="flex-1 bg-gradient-to-br from-blue-900/40 to-slate-950 p-4 rounded-xl border border-blue-500/40 text-center shadow-lg">
          <div className="flex items-center justify-center space-x-1 text-blue-400">
            <Cpu className="w-3.5 h-3.5" />
            <span className="text-[10px] font-bold uppercase tracking-wider">4. VERDICT SYNTHESIS</span>
          </div>
          <p className="text-sm font-black text-white mt-1 uppercase tracking-tight">{verdict}</p>
        </div>
      </div>
    </div>
  );
};
