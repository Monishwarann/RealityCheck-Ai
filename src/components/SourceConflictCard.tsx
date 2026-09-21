import React from 'react';
import { SourceConflict } from '../types/verification';
import { AlertTriangle, ExternalLink } from 'lucide-react';

interface SourceConflictCardProps {
  conflicts: SourceConflict[];
}

export const SourceConflictCard: React.FC<SourceConflictCardProps> = ({ conflicts }) => {
  if (!conflicts || conflicts.length === 0) return null;

  return (
    <div className="glass-card rounded-2xl p-6 border border-amber-500/40 bg-amber-500/5 shadow-2xl my-6 space-y-4">
      <div className="flex items-center space-x-2 text-amber-400 border-b border-amber-500/20 pb-3">
        <AlertTriangle className="w-5 h-5 text-amber-400" />
        <h3 className="font-extrabold text-base text-white">⚠ CONFLICTING LIVE EVIDENCE</h3>
      </div>

      {conflicts.map((c, idx) => (
        <div key={idx} className="bg-slate-950/90 p-4 rounded-xl border border-slate-800 space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="bg-slate-900 p-3 rounded-lg border border-slate-800">
              <span className="font-bold text-slate-300 block">{c.sourceA}</span>
              <div className="text-amber-300 font-bold text-sm mt-0.5">Value = {c.valueA}</div>
              <div className="text-[10px] text-slate-400">Data Year: {c.yearA}</div>
              <a
                href={c.urlA}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-1 text-blue-400 text-[11px] font-semibold mt-2"
              >
                <span>[Open Source A]</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            <div className="bg-slate-900 p-3 rounded-lg border border-slate-800">
              <span className="font-bold text-slate-300 block">{c.sourceB}</span>
              <div className="text-amber-300 font-bold text-sm mt-0.5">Value = {c.valueB}</div>
              <div className="text-[10px] text-slate-400">Data Year: {c.yearB}</div>
              <a
                href={c.urlB}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-1 text-blue-400 text-[11px] font-semibold mt-2"
              >
                <span>[Open Source B]</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          <div className="text-xs text-amber-300/90 font-medium italic">
            Possible reason for discrepancy: {c.reason}
          </div>
        </div>
      ))}
    </div>
  );
};
