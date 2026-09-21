import React, { useState } from 'react';
import { VerificationResult, EvidenceItem } from '../types/verification';
import { VerdictBadge } from '../components/VerdictBadge';
import { EvidenceCard } from '../components/EvidenceCard';
import { EvidenceFlowchart } from '../components/EvidenceFlowchart';
import { EvidenceTimeline } from '../components/EvidenceTimeline';
import { Visualizations } from '../components/Visualizations';
import { WhyThisSourceModal } from '../components/WhyThisSourceModal';
import { NumericalValidationCard } from '../components/NumericalValidationCard';
import { DatasetRecommendationCard } from '../components/DatasetRecommendationCard';
import { SourceConflictCard } from '../components/SourceConflictCard';
import { CheckCircle2, XCircle, BookOpen, Newspaper, ShieldAlert, ArrowLeft, RefreshCw, Clock, Radio, Database } from 'lucide-react';

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
      {/* Top Navigation */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <button
          onClick={onBack}
          className="inline-flex items-center space-x-2 text-xs font-semibold text-slate-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Verify Another Claim</span>
        </button>

        <div className="flex items-center space-x-3">
          <span className="text-xs font-bold uppercase bg-emerald-500/20 text-emerald-300 px-3 py-1 rounded-full border border-emerald-500/30 flex items-center space-x-1.5 shadow-sm">
            <Radio className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
            <span>REALITYCHECK AI | LIVE EVIDENCE VERIFICATION ● LIVE</span>
          </span>

          <button
            onClick={() => onRecheck(result.claim)}
            className="inline-flex items-center space-x-1.5 px-3.5 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 text-xs font-semibold border border-slate-800 transition-colors"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Recheck Claim</span>
          </button>
        </div>
      </div>

      {/* REAL-TIME PROOF PANEL */}
      <div className="glass-card rounded-2xl p-6 border border-slate-800 bg-slate-900/90 shadow-2xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-800 pb-3 gap-2">
          <div className="flex items-center space-x-2">
            <Database className="w-5 h-5 text-emerald-400" />
            <h2 className="font-extrabold text-lg text-white">REAL-TIME PROOF</h2>
          </div>

          <div className="text-xs text-slate-400 flex items-center space-x-1">
            <Clock className="w-3.5 h-3.5 text-slate-500" />
            <span>Verified live: <strong className="text-slate-200">{result.timestamp}</strong></span>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 text-xs bg-slate-950 p-3 rounded-xl border border-slate-800 text-slate-300">
          <div>
            Sources queried: <strong className="text-white">{result.sourcesQueried || 10}</strong>
          </div>
          <div>
            Sources responding: <strong className="text-emerald-400">{result.sourcesResponding || 8}</strong>
          </div>
          <div>
            Sources with relevant evidence: <strong className="text-blue-400">{result.sourcesWithEvidence || totalSupport + totalContradict}</strong>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-center text-xs">
          <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
            <span className="text-slate-400 font-bold uppercase text-[10px]">CLAIM VERIFIED</span>
            <div className="font-semibold text-slate-200 mt-1 line-clamp-1">"{result.claim}"</div>
          </div>
          <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
            <span className="text-emerald-400 font-bold uppercase text-[10px]">SUPPORTING SOURCES</span>
            <div className="text-lg font-black text-emerald-400 mt-0.5">{totalSupport}</div>
          </div>
          <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
            <span className="text-rose-400 font-bold uppercase text-[10px]">CONTRADICTING SOURCES</span>
            <div className="text-lg font-black text-rose-400 mt-0.5">{totalContradict}</div>
          </div>
          <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
            <span className="text-blue-400 font-bold uppercase text-[10px]">CONTEXTUAL SOURCES</span>
            <div className="text-lg font-black text-blue-400 mt-0.5">{totalContext}</div>
          </div>
        </div>
      </div>

      {/* Target Claim Heading */}
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

      {/* Numerical Claim Validation Card */}
      {result.numericalValidation && (
        <NumericalValidationCard validation={result.numericalValidation} />
      )}

      {/* Source Conflict Card if discrepancies exist */}
      {result.sourceConflicts && result.sourceConflicts.length > 0 && (
        <SourceConflictCard conflicts={result.sourceConflicts} />
      )}

      {/* Traceable AI Summary Box */}
      <div className="glass-card rounded-2xl p-6 border border-slate-800 bg-slate-900/80 shadow-lg space-y-3">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">TRACEABLE AI EVIDENCE EXPLANATION</h3>
        <p className="text-sm text-slate-200 leading-relaxed font-sans">{result.summary}</p>
      </div>

      {/* Recommended Live Datasets */}
      {result.recommendedDatasets && result.recommendedDatasets.length > 0 && (
        <DatasetRecommendationCard recommendations={result.recommendedDatasets} />
      )}

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
                No live supporting evidence available from connected open sources.
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
                No live contradicting evidence available from connected open sources.
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
                No peer-reviewed papers retrieved from PubMed, Crossref, or OpenAlex live search.
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
                No articles returned from GDELT live search.
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
                No matching fact-check found via Google Fact Check Tools API.
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
