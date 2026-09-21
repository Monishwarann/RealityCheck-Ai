import React from 'react';
import { NumericalValidation } from '../types/verification';
import { Calculator, ExternalLink, AlertCircle, TrendingUp, CheckCircle } from 'lucide-react';

interface NumericalValidationCardProps {
  validation: NumericalValidation;
}

export const NumericalValidationCard: React.FC<NumericalValidationCardProps> = ({ validation }) => {
  return (
    <div className="glass-card rounded-2xl p-6 border border-blue-500/30 bg-slate-900/90 shadow-2xl my-6 space-y-4">
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div className="flex items-center space-x-2 text-blue-400">
          <Calculator className="w-5 h-5" />
          <h3 className="font-bold text-base text-white">Numerical Claim Comparison</h3>
        </div>

        <span className="text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30">
          {validation.sourceName}
        </span>
      </div>

      {!validation.hasYearSpecified && (
        <div className="flex items-center space-x-2 bg-amber-500/10 border border-amber-500/20 p-2.5 rounded-xl text-amber-300 text-xs">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>Note: The claim does not specify an exact year. Comparing against latest reported dataset year ({validation.year || 'Latest'}).</span>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Claimed */}
        <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-center">
          <span className="text-[10px] font-bold uppercase text-slate-400 tracking-wider">CLAIMED VALUE</span>
          <div className="text-xl font-black text-white mt-1">{validation.claimedValue}</div>
          <div className="text-[10px] text-slate-500 mt-0.5">{validation.metricName}</div>
        </div>

        {/* Reported */}
        <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-center">
          <span className="text-[10px] font-bold uppercase text-emerald-400 tracking-wider">REPORTED LIVE VALUE</span>
          <div className="text-xl font-black text-emerald-400 mt-1">{validation.reportedValue}</div>
          <div className="text-[10px] text-slate-500 mt-0.5">Year: {validation.year || 'N/A'} ({validation.countryOrLocation})</div>
        </div>

        {/* Difference */}
        <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-center">
          <span className="text-[10px] font-bold uppercase text-cyan-400 tracking-wider">CALCULATED VARIANCE</span>
          <div className="text-xl font-black text-cyan-300 mt-1">{validation.difference}</div>
          <div className="text-[10px] text-slate-500 mt-0.5">Mathematical Delta</div>
        </div>
      </div>

      <div className="flex items-center justify-between text-xs text-slate-400 pt-2 border-t border-slate-800">
        <div>
          Metric: <span className="text-slate-200 font-semibold">{validation.metricName}</span>
        </div>

        <a
          href={validation.sourceUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center space-x-1.5 text-blue-400 hover:text-blue-300 font-semibold"
        >
          <span>Open Live Source Indicator</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>
    </div>
  );
};
