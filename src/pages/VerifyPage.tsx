import React, { useState } from 'react';
import { VerificationResult, EvidenceItem } from '../types/verification';
import { VerdictBadge } from '../components/VerdictBadge';
import { EvidenceCard } from '../components/EvidenceCard';
import { EvidenceFlowchart } from '../components/EvidenceFlowchart';
import { EvidenceTimeline } from '../components/EvidenceTimeline';
import { Visualizations } from '../components/Visualizations';
import { WhyThisSourceModal } from '../components/WhyThisSourceModal';
import { CheckCircle2, XCircle, BookOpen, Newspaper, ShieldAlert, Layers, ArrowLeft, RefreshCw } from 'lucide-react';

interface VerifyPageProps {
  result: VerificationResult;
  onBack: () => void;
  onRecheck: (claim: string) => void;
}

export const VerifyPage: React.FC<VerifyPageProps> = ({ result, onBack, onRecheck }) => {
  const [selectedSourceForAudit, setSelectedSourceForAudit] = useState<EvidenceItem | null>(null);
  const [activeTab, setActiveTab] = useState<'supporting' | 'contradicting' | 'academic' | 'news' | 'factchecks' | 'background'>('supporting');

  const totalSupport = result.supportingEvidence.length;
  const totalContradict = result.contradictingEvidence.length;
  const totalContext = result.contextEvidence.length + result.backgroundEvidence.length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fade-in">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <button
          onClick={onBack}
          className="inline-flex items-center space-x-2 text-xs font-semibold text-slate-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Verify Another Claim</span>
        </button>

        <div className="flex items-center space-x-3">
          {result.isDemo && (
            <span className="text-xs font-bold uppercase bg-amber-500/20 text-amber-300 px-3 py-1 rounded-full border border-amber-500/30">
              DEMO DATASET
            </span>
          )}
          <button
            onClick={() => onRecheck(result.claim)}
            className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 text-xs font-semibold border border-slate-800 transition-colors"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Recheck Claim</span>
          </button>
        </div>
      </div>

      {/* Claim Title */}
      <div className="space-y-2">
        <div className="flex items-center space-x-2">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-400">TARGET CLAIM</span>
          <span className="text-xs font-semibold px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-400">
            {result.category}
          </span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-white leading-snug">
          "{result.claim}"
        </h1>
      </div>

      {/* Verdict & Confidence Badge */}
      <VerdictBadge verdict={result.verdict} confidence={result.confidence} />

      {/* Neutral Summary Box */}
      <div className="glass-card rounded-2xl p-6 border border-slate-800 bg-slate-900/80 shadow-lg space-y-2">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">EVIDENCE SYNTHESIS SUMMARY</h3>
        <p className="text-sm text-slate-200 leading-relaxed font-sans">{result.summary}</p>
      </div>

      {/* Pipeline Flowchart */}
      <EvidenceFlowchart
        claim={result.claim}
        verdict={result.verdict}
        supportingCount={totalSupport}
        contradictingCount={totalContradict}
        contextCount={totalContext}
      />

      {/* Recharts Analytics */}
      <Visualizations result={result} />

      {/* Categorized Evidence Tabs */}
      <div className="space-y-6 pt-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-2 overflow-x-auto">
          <div className="flex items-center space-x-2 min-w-max">
            <button
              onClick={() => setActiveTab('supporting')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'supporting'
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Supporting Evidence ({result.supportingEvidence.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('contradicting')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'contradicting'
                  ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <XCircle className="w-4 h-4 text-rose-400" />
              <span>Contradicting / Conflicting ({result.contradictingEvidence.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('academic')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'academic'
                  ? 'bg-blue-500/20 text-blue-300 border border-blue-500/40 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <BookOpen className="w-4 h-4 text-blue-400" />
              <span>Academic ({result.academicEvidence.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('news')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'news'
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Newspaper className="w-4 h-4 text-cyan-400" />
              <span>News Coverage ({result.newsEvidence.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('factchecks')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'factchecks'
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <ShieldAlert className="w-4 h-4 text-amber-400" />
              <span>Existing Fact Checks ({result.factChecks.length})</span>
            </button>
          </div>
        </div>

        {/* Tab Content Display */}
        {activeTab === 'supporting' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {result.supportingEvidence.length > 0 ? (
              result.supportingEvidence.map((item) => (
                <EvidenceCard key={item.id} item={item} onWhyThisSource={setSelectedSourceForAudit} />
              ))
            ) : (
              <div className="col-span-2 text-center py-10 text-slate-500 text-sm">
                No direct supporting datasets found for this claim.
              </div>
            )}
          </div>
        )}

        {activeTab === 'contradicting' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {result.contradictingEvidence.length > 0 ? (
              result.contradictingEvidence.map((item) => (
                <EvidenceCard key={item.id} item={item} onWhyThisSource={setSelectedSourceForAudit} />
              ))
            ) : (
              <div className="col-span-2 text-center py-10 text-slate-500 text-sm">
                No direct contradicting datasets found for this claim.
              </div>
            )}
          </div>
        )}

        {activeTab === 'academic' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {result.academicEvidence.length > 0 ? (
              result.academicEvidence.map((item) => (
                <EvidenceCard key={item.id} item={item} onWhyThisSource={setSelectedSourceForAudit} />
              ))
            ) : (
              <div className="col-span-2 text-center py-10 text-slate-500 text-sm">
                No peer-reviewed papers retrieved from PubMed, Crossref, or OpenAlex.
              </div>
            )}
          </div>
        )}

        {activeTab === 'news' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {result.newsEvidence.length > 0 ? (
              result.newsEvidence.map((item) => (
                <EvidenceCard key={item.id} item={item} onWhyThisSource={setSelectedSourceForAudit} />
              ))
            ) : (
              <div className="col-span-2 text-center py-10 text-slate-500 text-sm">
                No media articles returned from GDELT search.
              </div>
            )}
          </div>
        )}

        {activeTab === 'factchecks' && (
          <div className="space-y-4">
            {result.factChecks.length > 0 ? (
              result.factChecks.map((fc, idx) => (
                <div key={idx} className="glass-card p-4 rounded-xl border border-slate-800 bg-slate-900/60 flex items-center justify-between">
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="font-bold text-sm text-white">{fc.publisher}</span>
                      <span className="text-xs font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                        {fc.rating}
                      </span>
                    </div>
                    <p className="text-xs text-slate-300 mt-1">Reviewed: "{fc.reviewedClaim}"</p>
                  </div>
                  <a
                    href={fc.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-semibold text-blue-400 hover:text-blue-300"
                  >
                    View Fact Check
                  </a>
                </div>
              ))
            ) : (
              <div className="text-center py-10 text-slate-500 text-sm">
                No pre-existing third-party fact checks found via Google Fact Check Tools API.
              </div>
            )}
          </div>
        )}
      </div>

      {/* Chronological Timeline */}
      <EvidenceTimeline timeline={result.timeline} />

      {/* Source Transparency Modal */}
      <WhyThisSourceModal
        item={selectedSourceForAudit}
        onClose={() => setSelectedSourceForAudit(null)}
      />
    </div>
  );
};
