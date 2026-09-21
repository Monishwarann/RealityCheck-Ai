import React, { useState } from 'react';
import { Search, Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';
import { PRESET_CLAIMS } from '../services/demoData';

interface HeroProps {
  onVerify: (claim: string) => void;
  isLoading: boolean;
}

export const Hero: React.FC<HeroProps> = ({ onVerify, isLoading }) => {
  const [claimText, setClaimText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (claimText.trim()) {
      onVerify(claimText.trim());
    }
  };

  const handleSelectPreset = (preset: string) => {
    setClaimText(preset);
    onVerify(preset);
  };

  return (
    <section className="relative overflow-hidden py-12 md:py-20">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-600/15 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-indigo-600/10 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 text-center space-y-6 relative z-10">
        {/* Hackathon Badge */}
        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-slate-700 shadow-inner">
          <ShieldCheck className="w-4 h-4 text-blue-400" />
          <span className="text-xs font-semibold text-slate-200">
            Multi-Source Empirical Verification Platform
          </span>
        </div>

        {/* Title */}
        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white leading-tight">
          Verify Claims. Explore Evidence.{' '}
          <span className="bg-gradient-to-r from-blue-400 via-indigo-300 to-cyan-400 bg-clip-text text-transparent">
            Think Critically.
          </span>
        </h1>

        <p className="text-base sm:text-lg text-slate-400 max-w-2xl mx-auto font-normal">
          RealityCheck AI retrieves non-hallucinated evidence across 10 free open datasets (World Bank, PubMed, data.gov.in, Crossref, Wikidata, Wikipedia, GDELT) to deliver transparent factual assessments.
        </p>

        {/* Claim Input Box */}
        <form onSubmit={handleSubmit} className="max-w-3xl mx-auto mt-6">
          <div className="relative glass-card rounded-2xl p-2 border border-slate-700/80 shadow-2xl focus-within:border-blue-500/80 transition-all">
            <div className="flex items-center space-x-3 px-3">
              <Search className="w-6 h-6 text-slate-400 shrink-0" />
              <input
                type="text"
                value={claimText}
                onChange={(e) => setClaimText(e.target.value)}
                placeholder="Enter a factual claim to verify (e.g., India's literacy rate is above 80%)..."
                className="w-full py-3.5 bg-transparent text-slate-100 placeholder-slate-500 text-sm md:text-base focus:outline-none"
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={isLoading || !claimText.trim()}
                className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 hover:from-blue-500 hover:to-indigo-500 disabled:opacity-50 text-white font-bold text-sm flex items-center space-x-2 transition-all shadow-lg shadow-blue-500/25 shrink-0"
              >
                {isLoading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Verifying...</span>
                  </>
                ) : (
                  <>
                    <span>Verify Claim</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </div>
        </form>

        {/* Example Claims */}
        <div className="pt-4 space-y-2">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
            Try Preset Example Claims:
          </span>
          <div className="flex flex-wrap justify-center gap-2 max-w-3xl mx-auto">
            {PRESET_CLAIMS.map((preset, idx) => (
              <button
                key={idx}
                onClick={() => handleSelectPreset(preset)}
                className="text-xs font-medium px-3.5 py-1.5 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-slate-300 border border-slate-800 hover:border-slate-700 transition-all flex items-center space-x-1.5"
              >
                <Sparkles className="w-3 h-3 text-blue-400" />
                <span>"{preset}"</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
