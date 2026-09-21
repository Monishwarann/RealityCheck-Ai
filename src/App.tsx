import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HomePage } from './pages/HomePage';
import { VerifyPage } from './pages/VerifyPage';
import { SourceExplorerPage } from './pages/SourceExplorerPage';
import { HistoryPage } from './pages/HistoryPage';
import { HowItWorksPage } from './pages/HowItWorksPage';
import { AboutPage } from './pages/AboutPage';
import { RealTimeStatusModal } from './components/RealTimeStatusModal';
import { VerificationResult } from './types/verification';
import { verifyClaim } from './services/verificationEngine';
import axios from 'axios';

export const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('home');
  const [isDemoMode, setIsDemoMode] = useState<boolean>(false); // Default: Live Data Mode!
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [currentClaimQuery, setCurrentClaimQuery] = useState<string>('');
  const [currentResult, setCurrentResult] = useState<VerificationResult | null>(null);
  const [history, setHistory] = useState<VerificationResult[]>([]);

  // Connector statuses for real-time verification modal
  const [connectorStatuses, setConnectorStatuses] = useState<{
    name: string;
    status: 'SEARCHING' | 'FOUND' | 'NO RESULTS' | 'RATE LIMITED' | 'API ERROR' | 'DEMO FALLBACK' | 'Connected';
    itemCount: number;
  }[]>([
    { name: 'Google Fact Check Tools API', status: 'SEARCHING', itemCount: 0 },
    { name: 'Wikidata SPARQL / REST', status: 'SEARCHING', itemCount: 0 },
    { name: 'Wikipedia REST API', status: 'SEARCHING', itemCount: 0 },
    { name: 'GDELT 2.0 Global News', status: 'SEARCHING', itemCount: 0 },
    { name: 'PubMed NCBI E-Utilities', status: 'SEARCHING', itemCount: 0 },
    { name: 'Crossref REST API', status: 'SEARCHING', itemCount: 0 },
    { name: 'OpenAlex Academic Graph', status: 'SEARCHING', itemCount: 0 },
    { name: 'World Bank Open Data', status: 'SEARCHING', itemCount: 0 },
    { name: 'data.gov.in (India Open Data)', status: 'SEARCHING', itemCount: 0 },
    { name: 'EU Open Data Portal', status: 'SEARCHING', itemCount: 0 },
  ]);

  // Load local history on mount
  useEffect(() => {
    const saved = localStorage.getItem('realitycheck_history');
    if (saved) {
      try {
        setHistory(JSON.parse(saved));
      } catch (e) {
        console.warn('Failed to parse saved history:', e);
      }
    }
  }, []);

  // Save history on updates
  const saveHistoryItem = (item: VerificationResult) => {
    setHistory((prev) => {
      const filtered = prev.filter((h) => h.id !== item.id && h.claim.toLowerCase() !== item.claim.toLowerCase());
      const updated = [item, ...filtered].slice(0, 30);
      localStorage.setItem('realitycheck_history', JSON.stringify(updated));
      return updated;
    });
  };

  const handleVerifyClaim = async (claim: string) => {
    setIsLoading(true);
    setCurrentClaimQuery(claim);

    // Reset progress modal states
    setConnectorStatuses([
      { name: 'Google Fact Check Tools API', status: 'SEARCHING', itemCount: 0 },
      { name: 'Wikidata SPARQL / REST', status: 'SEARCHING', itemCount: 0 },
      { name: 'Wikipedia REST API', status: 'SEARCHING', itemCount: 0 },
      { name: 'GDELT 2.0 Global News', status: 'SEARCHING', itemCount: 0 },
      { name: 'PubMed NCBI E-Utilities', status: 'SEARCHING', itemCount: 0 },
      { name: 'Crossref REST API', status: 'SEARCHING', itemCount: 0 },
      { name: 'OpenAlex Academic Graph', status: 'SEARCHING', itemCount: 0 },
      { name: 'World Bank Open Data', status: 'SEARCHING', itemCount: 0 },
      { name: 'data.gov.in (India Open Data)', status: 'SEARCHING', itemCount: 0 },
      { name: 'EU Open Data Portal', status: 'SEARCHING', itemCount: 0 },
    ]);

    try {
      let result: VerificationResult;
      // Try backend API endpoint first
      try {
        const res = await axios.post('/api/verify', { claim, isDemoMode }, { timeout: 15000 });
        result = res.data;
      } catch {
        result = await verifyClaim(claim, isDemoMode);
      }

      // Update connector statuses from result
      if (result.sourcesUsed && result.sourcesUsed.length > 0) {
        setConnectorStatuses(result.sourcesUsed.map(s => ({
          name: s.name,
          status: s.status,
          itemCount: s.itemCount
        })));
      }

      // Short delay for visual progress experience
      await new Promise(r => setTimeout(r, 600));

      setCurrentResult(result);
      saveHistoryItem(result);
      setActiveTab('verify');
    } catch (error) {
      console.error('Verification failed:', error);
      alert('An error occurred while verifying the claim. Please check network connectivity.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteHistoryItem = (id: string) => {
    setHistory((prev) => {
      const updated = prev.filter((h) => h.id !== id);
      localStorage.setItem('realitycheck_history', JSON.stringify(updated));
      return updated;
    });
  };

  const handleClearHistory = () => {
    setHistory([]);
    localStorage.removeItem('realitycheck_history');
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100 font-sans antialiased selection:bg-blue-600 selection:text-white">
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isDemoMode={isDemoMode}
        setIsDemoMode={setIsDemoMode}
      />

      <main className="flex-1">
        {activeTab === 'home' && (
          <HomePage onVerify={handleVerifyClaim} isLoading={isLoading} />
        )}

        {activeTab === 'verify' && currentResult && (
          <VerifyPage
            result={currentResult}
            onBack={() => setActiveTab('home')}
            onRecheck={handleVerifyClaim}
          />
        )}

        {activeTab === 'sources' && <SourceExplorerPage />}

        {activeTab === 'history' && (
          <HistoryPage
            history={history}
            onSelectResult={(res) => {
              setCurrentResult(res);
              setActiveTab('verify');
            }}
            onDeleteHistoryItem={handleDeleteHistoryItem}
            onClearHistory={handleClearHistory}
          />
        )}

        {activeTab === 'how-it-works' && <HowItWorksPage />}

        {activeTab === 'about' && <AboutPage />}
      </main>

      {/* Real-time Connector Status Modal during execution */}
      <RealTimeStatusModal
        isOpen={isLoading}
        claim={currentClaimQuery}
        sources={connectorStatuses}
      />

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-slate-950/90 py-8 mt-12 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-2">
            <span className="font-bold text-slate-300">REALITYCHECK AI</span>
            <span>— Real-Time Evidence Verification</span>
          </div>
          <div>
            <span>Copyright © 2026 Monishwarann. All rights reserved. | MIT License</span>
          </div>
        </div>
      </footer>
    </div>
  );
};
