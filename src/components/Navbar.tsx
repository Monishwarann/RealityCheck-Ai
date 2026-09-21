import React from 'react';
import { ShieldCheck, Database, History, Info, HelpCircle, ToggleLeft, ToggleRight, Sparkles, Radio } from 'lucide-react';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isDemoMode: boolean;
  setIsDemoMode: (val: boolean) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab, isDemoMode, setIsDemoMode }) => {
  const navItems = [
    { id: 'home', label: 'Home', icon: ShieldCheck },
    { id: 'history', label: 'History', icon: History },
    { id: 'sources', label: 'Source Explorer', icon: Database },
    { id: 'how-it-works', label: 'How It Works', icon: HelpCircle },
    { id: 'about', label: 'About', icon: Info },
  ];

  return (
    <header className="sticky top-0 z-40 glass-card border-b border-slate-800/80 bg-slate-950/90 backdrop-blur-xl">
      {/* Top Mode Status Banner */}
      <div className={`py-1 text-center text-[11px] font-extrabold tracking-wider uppercase flex items-center justify-center space-x-2 ${
        isDemoMode
          ? 'bg-amber-500/20 text-amber-300 border-b border-amber-500/30'
          : 'bg-emerald-500/20 text-emerald-300 border-b border-emerald-500/30'
      }`}>
        <Radio className="w-3.5 h-3.5 animate-pulse" />
        <span>
          {isDemoMode ? 'DEMO DATA — NOT LIVE' : 'REALITYCHECK AI | LIVE EVIDENCE VERIFICATION ● LIVE'}
        </span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <div 
          onClick={() => setActiveTab('home')}
          className="flex items-center space-x-3 cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-500 to-cyan-400 p-0.5 shadow-lg shadow-blue-500/20 group-hover:scale-105 transition-transform">
            <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
              <ShieldCheck className="w-6 h-6 text-blue-400 group-hover:text-blue-300 transition-colors" />
            </div>
          </div>
          <div>
            <div className="flex items-center space-x-1.5">
              <span className="font-extrabold text-xl tracking-tight bg-gradient-to-r from-white via-slate-100 to-slate-400 bg-clip-text text-transparent">
                REALITYCHECK
              </span>
              <span className="text-xs font-semibold uppercase px-1.5 py-0.5 rounded bg-blue-500/20 text-blue-400 border border-blue-500/30">
                AI
              </span>
            </div>
            <p className="text-[10px] text-slate-400 tracking-wide">Multi-Source Fact Verification</p>
          </div>
        </div>

        {/* Desktop Nav links */}
        <nav className="hidden md:flex items-center space-x-1 bg-slate-900/60 p-1 rounded-full border border-slate-800">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center space-x-2 px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-500/20'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Demo / Live Toggle */}
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2 bg-slate-900/80 px-3 py-1.5 rounded-xl border border-slate-800">
            <Sparkles className={`w-4 h-4 ${isDemoMode ? 'text-amber-400 animate-pulse' : 'text-emerald-400'}`} />
            <span className="text-xs font-medium text-slate-300">
              {isDemoMode ? 'Demo Mode' : 'Live Data API'}
            </span>
            <button
              onClick={() => setIsDemoMode(!isDemoMode)}
              className="text-slate-400 hover:text-white transition-colors focus:outline-none"
              title="Toggle Live vs Demo Data"
            >
              {isDemoMode ? (
                <ToggleLeft className="w-6 h-6 text-amber-400" />
              ) : (
                <ToggleRight className="w-6 h-6 text-emerald-400" />
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
