import React from 'react';
import { Loader2, CheckCircle2, XCircle, AlertTriangle, Radio } from 'lucide-react';

interface SourceStatusItem {
  name: string;
  status: 'SEARCHING' | 'FOUND' | 'NO RESULTS' | 'RATE LIMITED' | 'API ERROR' | 'DEMO FALLBACK' | 'Connected';
  itemCount: number;
}

interface RealTimeStatusModalProps {
  isOpen: boolean;
  claim: string;
  sources: SourceStatusItem[];
}

export const RealTimeStatusModal: React.FC<RealTimeStatusModalProps> = ({ isOpen, claim, sources }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-xl glass-card rounded-2xl p-6 border border-emerald-500/40 bg-slate-900 shadow-2xl space-y-6">
        {/* Header */}
        <div className="flex items-center space-x-3 border-b border-slate-800 pb-4">
          <div className="relative flex items-center justify-center">
            <Radio className="w-6 h-6 text-emerald-400 animate-pulse" />
          </div>
          <div>
            <h3 className="font-extrabold text-lg text-white">REAL-TIME VERIFICATION ● Extracting claim...</h3>
            <p className="text-xs text-slate-400">Executing live API queries across open data repositories</p>
          </div>
        </div>

        {/* Target Claim */}
        <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-xs text-slate-200 font-semibold italic">
          "{claim}"
        </div>

        {/* Live Connectors Progress List */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-h-72 overflow-y-auto pr-1">
          {sources.map((src, idx) => {
            const isSearching = src.status === 'SEARCHING';
            const isFound = src.status === 'FOUND' || src.status === 'Connected';
            const isNoResults = src.status === 'NO RESULTS';
            const isError = src.status === 'API ERROR';
            const isRateLimit = src.status === 'RATE LIMITED';

            return (
              <div
                key={idx}
                className="flex items-center justify-between p-2.5 rounded-xl bg-slate-950/80 border border-slate-800/80 text-xs"
              >
                <span className="font-semibold text-slate-300">{src.name}</span>

                <div className="flex items-center space-x-1.5">
                  {isSearching && (
                    <span className="text-blue-400 flex items-center space-x-1 font-bold">
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      <span>SEARCHING...</span>
                    </span>
                  )}
                  {isFound && (
                    <span className="text-emerald-400 flex items-center space-x-1 font-bold">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>✓ {src.itemCount > 0 ? `${src.itemCount} items` : 'FOUND'}</span>
                    </span>
                  )}
                  {isNoResults && (
                    <span className="text-slate-500 font-semibold">○ No results</span>
                  )}
                  {isError && (
                    <span className="text-rose-400 flex items-center space-x-1 font-semibold">
                      <XCircle className="w-3.5 h-3.5" />
                      <span>⚠ API ERROR</span>
                    </span>
                  )}
                  {isRateLimit && (
                    <span className="text-amber-400 flex items-center space-x-1 font-semibold">
                      <AlertTriangle className="w-3.5 h-3.5" />
                      <span>⚠ RATE LIMITED</span>
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-center text-xs font-bold text-emerald-400 pt-2 border-t border-slate-800 flex items-center justify-center space-x-1.5">
          <Loader2 className="w-4 h-4 animate-spin text-emerald-400" />
          <span>LIVE EVIDENCE COLLECTING...</span>
        </div>
      </div>
    </div>
  );
};
