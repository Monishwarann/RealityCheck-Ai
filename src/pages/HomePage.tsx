import React from 'react';
import { Hero } from '../components/Hero';
import { ShieldCheck, Database, Search, Cpu, BarChart2 } from 'lucide-react';

interface HomePageProps {
  onVerify: (claim: string) => void;
  isLoading: boolean;
}

export const HomePage: React.FC<HomePageProps> = ({ onVerify, isLoading }) => {
  return (
    <div className="space-y-16">
      <Hero onVerify={onVerify} isLoading={isLoading} />

      {/* Value Proposition Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center space-y-2 mb-10">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            Built for Fact Transparency & Source Auditability
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            A real-time fact-checking engine powered by 10 open scientific, governmental, and news repositories.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="glass-card glass-card-hover rounded-2xl p-6 border border-slate-800 bg-slate-900/60 space-y-3">
            <div className="p-3 bg-blue-600/10 rounded-xl w-max text-blue-400 border border-blue-500/20">
              <Database className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-lg text-white">10 Open Data Connectors</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Fetches facts from World Bank, PubMed, data.gov.in, OpenAlex, Crossref, Wikidata, Wikipedia, GDELT, EU Open Data, and Google Fact Check API.
            </p>
          </div>

          <div className="glass-card glass-card-hover rounded-2xl p-6 border border-slate-800 bg-slate-900/60 space-y-3">
            <div className="p-3 bg-indigo-600/10 rounded-xl w-max text-indigo-400 border border-indigo-500/20">
              <Cpu className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-lg text-white">Category Source Router</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Detects domain context (Medical, Science, Demographics, Economics, Government Stats) and prioritizes authoritative primary datasets.
            </p>
          </div>

          <div className="glass-card glass-card-hover rounded-2xl p-6 border border-slate-800 bg-slate-900/60 space-y-3">
            <div className="p-3 bg-emerald-600/10 rounded-xl w-max text-emerald-400 border border-emerald-500/20">
              <BarChart2 className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-lg text-white">Visual Timeline & Analytics</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Interactive timeline, source breakdown charts, flowcharts, and "Why this source?" audit modals for 100% transparent evaluations.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
