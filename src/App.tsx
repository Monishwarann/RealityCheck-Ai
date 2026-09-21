import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HomePage } from './pages/HomePage';
import { VerifyPage } from './pages/VerifyPage';
import { SourceExplorerPage } from './pages/SourceExplorerPage';
import { HistoryPage } from './pages/HistoryPage';
import { HowItWorksPage } from './pages/HowItWorksPage';
import { AboutPage } from './pages/AboutPage';
import { VerificationResult } from './types/verification';
import { verifyClaim } from './services/verificationEngine';
import axios from 'axios';

export const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('home');
  const [isDemoMode, setIsDemoMode] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [currentResult, setCurrentResult] = useState<VerificationResult | null>(null);
  const [history, setHistory] = useState<VerificationResult[]>([]);

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
    try {
      let result: VerificationResult;
      // Try backend API first, fallback to client verification service
      try {
        const res = await axios.post('/api/verify', { claim, isDemoMode }, { timeout: 10000 });
        result = res.data;
      } catch {
        result = await verifyClaim(claim, isDemoMode);
      }

      setCurrentResult(result);
      saveHistoryItem(result);
      setActiveTab('verify');
    } catch (error) {
      console.error('Verification failed:', error);
      alert('An error occurred while verifying the claim. Please try again.');
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

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-slate-950/90 py-8 mt-12 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-2">
            <span className="font-bold text-slate-300">REALITYCHECK AI</span>
            <span>— Transparent Evidence Verification</span>
          </div>
          <div>
            <span>Powered by 10 Free Open Data Repositories</span>
          </div>
        </div>
      </footer>
    </div>
  );
};
