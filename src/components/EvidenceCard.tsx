import React from 'react';
import { EvidenceItem } from '../types/verification';
import { ExternalLink, Info, Calendar, Building, FileText, CheckCircle, XCircle, HelpCircle } from 'lucide-react';

interface EvidenceCardProps {
  item: EvidenceItem;
  onWhyThisSource: (item: EvidenceItem) => void;
}

export const EvidenceCard: React.FC<EvidenceCardProps> = ({ item, onWhyThisSource }) => {
  const getRelationshipBadge = () => {
    switch (item.relationship) {
      case 'SUPPORTS':
        return {
          bg: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
          icon: CheckCircle,
          label: 'SUPPORTS CLAIM'
        };
      case 'CONTRADICTS':
        return {
          bg: 'bg-rose-500/10 text-rose-400 border-rose-500/30',
          icon: XCircle,
          label: 'CONTRADICTS CLAIM'
        };
      case 'CONTEXT':
      default:
        return {
          bg: 'bg-blue-500/10 text-blue-400 border-blue-500/30',
          icon: HelpCircle,
          label: 'CONTEXTUAL BACKGROUND'
        };
    }
  };

  const getSourceTypeBadge = () => {
    switch (item.sourceType) {
      case 'OFFICIAL DATA':
        return 'bg-purple-500/20 text-purple-300 border-purple-500/30';
      case 'ACADEMIC RESEARCH':
        return 'bg-blue-500/20 text-blue-300 border-blue-500/30';
      case 'FACT CHECK':
        return 'bg-amber-500/20 text-amber-300 border-amber-500/30';
      case 'NEWS REPORT':
        return 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30';
      case 'OPEN DATASET':
        return 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30';
      default:
        return 'bg-slate-500/20 text-slate-300 border-slate-500/30';
    }
  };

  const rel = getRelationshipBadge();
  const RelIcon = rel.icon;

  return (
    <div className="glass-card glass-card-hover rounded-2xl p-5 border border-slate-800 bg-slate-900/60 flex flex-col justify-between space-y-4">
      <div className="space-y-3">
        {/* Header Tags */}
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center space-x-2">
            <span className={`text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full border ${getSourceTypeBadge()}`}>
              {item.sourceType}
            </span>
            <span className="text-xs font-semibold text-slate-300 flex items-center space-x-1">
              <Building className="w-3.5 h-3.5 text-slate-400" />
              <span>{item.source}</span>
            </span>
          </div>

          <div className={`flex items-center space-x-1 px-2.5 py-0.5 rounded-full border text-[10px] font-bold ${rel.bg}`}>
            <RelIcon className="w-3 h-3" />
            <span>{rel.label}</span>
          </div>
        </div>

        {/* Title */}
        <h3 className="font-bold text-base text-slate-100 line-clamp-2 leading-snug">
          {item.title}
        </h3>

        {/* Snippet Quote */}
        <div className="bg-slate-950/70 p-3 rounded-xl border border-slate-800/80 text-xs text-slate-300 leading-relaxed font-sans italic relative">
          <span className="text-blue-500 font-serif text-lg leading-none select-none">“</span>
          {item.snippet}
          <span className="text-blue-500 font-serif text-lg leading-none select-none">”</span>
        </div>

        {/* Metadata Details */}
        <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400 pt-1">
          {item.publisher && (
            <div className="flex items-center space-x-1">
              <FileText className="w-3.5 h-3.5 text-slate-500" />
              <span>{item.publisher}</span>
            </div>
          )}
          {item.date && (
            <div className="flex items-center space-x-1">
              <Calendar className="w-3.5 h-3.5 text-slate-500" />
              <span>{item.date}</span>
            </div>
          )}
          {item.doi && (
            <div className="text-[11px] font-mono bg-slate-800/80 px-2 py-0.5 rounded text-blue-300">
              DOI: {item.doi}
            </div>
          )}
        </div>
      </div>

      {/* Action Footer */}
      <div className="flex items-center justify-between pt-3 border-t border-slate-800/80">
        <button
          onClick={() => onWhyThisSource(item)}
          className="flex items-center space-x-1.5 text-xs font-semibold text-blue-400 hover:text-blue-300 transition-colors"
        >
          <Info className="w-3.5 h-3.5" />
          <span>Why this source?</span>
        </button>

        <a
          href={item.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-blue-600/20 hover:bg-blue-600/40 text-blue-300 text-xs font-semibold border border-blue-500/30 transition-all shadow-sm"
        >
          <span>View Source</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>
    </div>
  );
};
