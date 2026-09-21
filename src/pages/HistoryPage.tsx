import React from 'react';
import { VerificationResult } from '../types/verification';
import { History, Trash2, ArrowRight, ShieldCheck, Clock } from 'lucide-react';

interface HistoryPageProps {
  history: VerificationResult[];
  onSelectResult: (result: VerificationResult) => void;
  onDeleteHistoryItem: (id: string) => void;
  onClearHistory: () => void;
}

export const HistoryPage: React.FC<HistoryPageProps> = ({
  history,
  onSelectResult,
  onDeleteHistoryItem,
  onClearHistory
}) => {
  if (history.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-4 animate-fade-in">
        <div className="w-16 h-16 bg-slate-900 rounded-full flex items-center justify-center mx-auto text-slate-500 border border-slate-800">
          <History className="w-8 h-8" />
        </div>
        <h2 className="text-xl font-bold text-white">No Verification History</h2>
        <p className="text-sm text-slate-400">Verifications you run will automatically be saved locally for quick reference.</p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10 space-y-8 animate-fade-in">
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <div className="space-y-1">
          <div className="flex items-center space-x-2 text-indigo-400">
            <History className="w-5 h-5" />
            <span className="text-xs font-bold uppercase tracking-wider">SAVED VERIFICATIONS</span>
          </div>
          <h1 className="text-3xl font-extrabold text-white">Verification History</h1>
        </div>

        <button
          onClick={onClearHistory}
          className="text-xs font-semibold text-rose-400 hover:text-rose-300 px-3 py-1.5 rounded-lg bg-rose-500/10 border border-rose-500/20 transition-colors"
        >
          Clear All History
        </button>
      </div>

      <div className="space-y-4">
        {history.map((item) => (
          <div
            key={item.id}
            className="glass-card glass-card-hover rounded-2xl p-5 border border-slate-800 bg-slate-900/60 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
          >
            <div className="space-y-2 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <span className={`text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full border ${
                  item.verdict === 'SUPPORTED' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' :
                  item.verdict === 'MOSTLY SUPPORTED' ? 'bg-teal-500/10 text-teal-300 border-teal-500/30' :
                  item.verdict === 'PARTIALLY SUPPORTED' ? 'bg-amber-500/10 text-amber-400 border-amber-500/30' :
                  item.verdict === 'CONTRADICTED' ? 'bg-rose-500/10 text-rose-400 border-rose-500/30' :
                  'bg-slate-500/10 text-slate-300 border-slate-500/30'
                }`}>
                  {item.verdict}
                </span>

                <span className="text-xs text-slate-400 flex items-center space-x-1">
                  <Clock className="w-3 h-3 text-slate-500" />
                  <span>{new Date(item.timestamp).toLocaleDateString()}</span>
                </span>

                <span className="text-xs text-slate-400">
                  {item.sourcesUsed.filter(s => s.status === 'Connected').length} sources evaluated
                </span>
              </div>

              <h3 className="font-bold text-base text-white line-clamp-2">"{item.claim}"</h3>
            </div>

            <div className="flex items-center space-x-3 shrink-0">
              <button
                onClick={() => onSelectResult(item)}
                className="px-4 py-2 rounded-xl bg-blue-600/20 hover:bg-blue-600/30 text-blue-300 font-semibold text-xs border border-blue-500/30 transition-all flex items-center space-x-1.5"
              >
                <span>View Full Report</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={() => onDeleteHistoryItem(item.id)}
                className="p-2 rounded-xl text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
                title="Delete history item"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
