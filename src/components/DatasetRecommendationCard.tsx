import React from 'react';
import { RecommendedDataset } from '../types/verification';
import { Database, ExternalLink, Sparkles } from 'lucide-react';

interface DatasetRecommendationCardProps {
  recommendations: RecommendedDataset[];
}

export const DatasetRecommendationCard: React.FC<DatasetRecommendationCardProps> = ({ recommendations }) => {
  if (!recommendations || recommendations.length === 0) return null;

  return (
    <div className="glass-card rounded-2xl p-6 border border-slate-800 bg-slate-900/80 shadow-xl my-6 space-y-4">
      <div className="flex items-center space-x-2 text-indigo-400 border-b border-slate-800 pb-3">
        <Sparkles className="w-5 h-5 text-indigo-400" />
        <h3 className="font-bold text-base text-white">RECOMMENDED LIVE DATASETS</h3>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {recommendations.map((rec, idx) => (
          <div key={idx} className="bg-slate-950 p-4 rounded-xl border border-slate-800/80 flex flex-col justify-between space-y-2">
            <div>
              <div className="flex items-center space-x-1.5 text-xs font-bold text-indigo-300">
                <Database className="w-3.5 h-3.5 text-indigo-400" />
                <span>{rec.name}</span>
              </div>
              <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">{rec.reason}</p>
            </div>

            <a
              href={rec.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-1 text-xs font-semibold text-blue-400 hover:text-blue-300 pt-2 border-t border-slate-900"
            >
              <span>Explore Dataset</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};
