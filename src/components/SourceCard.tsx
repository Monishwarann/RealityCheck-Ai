import React from 'react';
import { ApiStatusBadge } from './ApiStatusBadge';
import { ExternalLink, Database, Server } from 'lucide-react';

interface SourceCardProps {
  source: {
    id: string;
    name: string;
    description: string;
    dataType: string;
    sourceType: string;
    baseUrl: string;
    status: 'Connected' | 'Searching' | 'No results' | 'Rate limited' | 'Error' | 'Demo fallback';
  };
}

export const SourceCard: React.FC<SourceCardProps> = ({ source }) => {
  return (
    <div className="glass-card glass-card-hover rounded-2xl p-5 border border-slate-800 bg-slate-900/60 flex flex-col justify-between space-y-4">
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <div className="p-2.5 rounded-xl bg-blue-600/10 border border-blue-500/20 text-blue-400">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-base text-white">{source.name}</h3>
              <span className="text-[10px] font-extrabold uppercase text-slate-400">{source.sourceType}</span>
            </div>
          </div>
          <ApiStatusBadge status={source.status} />
        </div>

        <p className="text-xs text-slate-300 leading-relaxed">{source.description}</p>

        <div className="bg-slate-950/80 p-2.5 rounded-xl border border-slate-800/80 text-[11px] text-slate-400 flex items-center justify-between">
          <span className="font-semibold text-slate-300">Data Type:</span>
          <span>{source.dataType}</span>
        </div>
      </div>

      <div className="pt-2 border-t border-slate-800 flex justify-end">
        <a
          href={source.baseUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center space-x-1.5 text-xs font-semibold text-blue-400 hover:text-blue-300 transition-colors"
        >
          <span>Open Repository</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>
    </div>
  );
};
