import React from 'react';
import { EvidenceItem } from '../types/verification';
import { X, ShieldCheck, CheckCircle2, AlertCircle, Calendar, Link2, Info } from 'lucide-react';

interface WhyThisSourceModalProps {
  item: EvidenceItem | null;
  onClose: () => void;
}

export const WhyThisSourceModal: React.FC<WhyThisSourceModalProps> = ({ item, onClose }) => {
  if (!item) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-lg glass-card rounded-2xl p-6 border border-slate-700 bg-slate-900 shadow-2xl space-y-5">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center space-x-2">
            <Info className="w-5 h-5 text-blue-400" />
            <h3 className="font-bold text-lg text-white">Source Audit & Transparency</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="space-y-4 text-xs">
          <div>
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">SOURCE NAME</label>
            <div className="text-base font-bold text-white">{item.source}</div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
              <label className="text-[10px] font-bold text-slate-400 uppercase">CLASSIFICATION</label>
              <div className="text-sm font-semibold text-blue-300 mt-0.5">{item.sourceType}</div>
            </div>
            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
              <label className="text-[10px] font-bold text-slate-400 uppercase">TIER / STATUS</label>
              <div className="text-sm font-semibold text-emerald-300 mt-0.5">
                {item.isPrimary ? 'Primary Official Source' : 'Secondary Reference'}
              </div>
            </div>
          </div>

          <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 space-y-1.5">
            <label className="text-[10px] font-bold text-slate-400 uppercase">RETRIEVAL RATIONALE</label>
            <p className="text-slate-300 leading-relaxed">
              Retrieved automatically via {item.source} open API because the claim domain matched structured repositories requiring factual cross-referencing.
            </p>
          </div>

          <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 space-y-1.5">
            <label className="text-[10px] font-bold text-slate-400 uppercase">RELATIONSHIP EVALUATION</label>
            <div className="flex items-center space-x-2 text-slate-200">
              <span className="font-semibold text-blue-400">{item.relationship}</span>
              <span>— Relevance Score: {Math.round(item.relevance * 100)}%</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="pt-2 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs transition-colors"
          >
            Close Audit
          </button>
        </div>
      </div>
    </div>
  );
};
