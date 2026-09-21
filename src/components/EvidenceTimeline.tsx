import React from 'react';
import { VerificationResult } from '../types/verification';
import { Calendar, ExternalLink, Clock } from 'lucide-react';

interface EvidenceTimelineProps {
  timeline: VerificationResult['timeline'];
}

export const EvidenceTimeline: React.FC<EvidenceTimelineProps> = ({ timeline }) => {
  if (!timeline || timeline.length === 0) {
    return null;
  }

  return (
    <div className="glass-card rounded-2xl p-6 border border-slate-800 bg-slate-900/80 my-6 shadow-xl">
      <div className="flex items-center space-x-2 mb-6">
        <Clock className="w-5 h-5 text-indigo-400" />
        <h3 className="font-bold text-lg text-white">Chronological Evidence Timeline</h3>
      </div>

      <div className="relative pl-6 border-l-2 border-slate-800 space-y-6">
        {timeline.map((item, idx) => (
          <div key={idx} className="relative group">
            {/* Dot */}
            <div className="absolute -left-[31px] top-1.5 w-4 h-4 rounded-full bg-slate-950 border-2 border-indigo-500 group-hover:scale-125 transition-transform" />

            <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <div className="flex items-center space-x-2">
                  <span className="text-xs font-black text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded border border-indigo-500/20">
                    {item.year}
                  </span>
                  <span className="text-xs font-bold text-slate-300">{item.source}</span>
                </div>
                <p className="text-sm font-medium text-slate-200 mt-1">{item.summary}</p>
              </div>

              {item.url && (
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-1 text-xs text-indigo-400 hover:text-indigo-300 self-start sm:self-auto"
                >
                  <span>Source</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
