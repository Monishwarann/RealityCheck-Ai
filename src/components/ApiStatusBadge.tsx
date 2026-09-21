import React from 'react';
import { Wifi, Loader2, AlertTriangle, XCircle, Sparkles } from 'lucide-react';

interface ApiStatusBadgeProps {
  status: 'Connected' | 'Searching' | 'No results' | 'Rate limited' | 'Error' | 'Demo fallback';
}

export const ApiStatusBadge: React.FC<ApiStatusBadgeProps> = ({ status }) => {
  const getDetails = () => {
    switch (status) {
      case 'Connected':
        return { bg: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30', icon: Wifi, label: '● Connected' };
      case 'Searching':
        return { bg: 'bg-blue-500/10 text-blue-400 border-blue-500/30', icon: Loader2, label: '● Searching...' };
      case 'No results':
        return { bg: 'bg-slate-500/10 text-slate-400 border-slate-500/30', icon: Wifi, label: '○ No results' };
      case 'Rate limited':
        return { bg: 'bg-amber-500/10 text-amber-400 border-amber-500/30', icon: AlertTriangle, label: '▲ Rate limited' };
      case 'Demo fallback':
        return { bg: 'bg-purple-500/10 text-purple-300 border-purple-500/30', icon: Sparkles, label: '★ Demo Cached' };
      case 'Error':
      default:
        return { bg: 'bg-rose-500/10 text-rose-400 border-rose-500/30', icon: XCircle, label: '✕ Error' };
    }
  };

  const details = getDetails();

  return (
    <span className={`inline-flex items-center space-x-1 px-2.5 py-1 rounded-full text-xs font-bold border ${details.bg}`}>
      <span>{details.label}</span>
    </span>
  );
};
