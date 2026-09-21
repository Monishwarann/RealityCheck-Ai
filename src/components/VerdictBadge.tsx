import React from 'react';
import { VerdictType } from '../types/verification';
import { CheckCircle2, AlertTriangle, XCircle, HelpCircle, ShieldAlert } from 'lucide-react';

interface VerdictBadgeProps {
  verdict: VerdictType;
  confidence: number;
}

export const VerdictBadge: React.FC<VerdictBadgeProps> = ({ verdict, confidence }) => {
  const getBadgeDetails = () => {
    switch (verdict) {
      case 'SUPPORTED':
        return {
          color: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30 glow-emerald',
          icon: CheckCircle2,
          bgGlow: 'from-emerald-500/20 via-emerald-600/10 to-transparent',
          text: 'SUPPORTED',
          desc: 'High concordance across verified open empirical sources.'
        };
      case 'MOSTLY SUPPORTED':
        return {
          color: 'bg-teal-500/10 text-teal-300 border-teal-500/30',
          icon: CheckCircle2,
          bgGlow: 'from-teal-500/20 via-teal-600/10 to-transparent',
          text: 'MOSTLY SUPPORTED',
          desc: 'Substantial support found with minor contextual qualifications.'
        };
      case 'PARTIALLY SUPPORTED':
        return {
          color: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
          icon: AlertTriangle,
          bgGlow: 'from-amber-500/20 via-amber-600/10 to-transparent',
          text: 'PARTIALLY SUPPORTED',
          desc: 'Evidence confirms specific subsets or demographics of the claim.'
        };
      case 'CONTRADICTED':
        return {
          color: 'bg-rose-500/10 text-rose-400 border-rose-500/30',
          icon: XCircle,
          bgGlow: 'from-rose-500/20 via-rose-600/10 to-transparent',
          text: 'CONTRADICTED',
          desc: 'Primary official datasets or peer-reviewed literature directly contradict this claim.'
        };
      case 'INSUFFICIENT EVIDENCE':
      default:
        return {
          color: 'bg-slate-500/10 text-slate-300 border-slate-500/30',
          icon: HelpCircle,
          bgGlow: 'from-slate-500/20 via-slate-600/10 to-transparent',
          text: 'INSUFFICIENT EVIDENCE',
          desc: 'Lack of verified public datasets or peer-reviewed literature to confirm or refute.'
        };
    }
  };

  const details = getBadgeDetails();
  const Icon = details.icon;

  return (
    <div className={`relative overflow-hidden rounded-2xl p-6 border ${details.color} bg-slate-900/90 shadow-xl`}>
      <div className={`absolute inset-0 bg-gradient-to-r ${details.bgGlow} opacity-50 pointer-events-none`} />
      
      <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-start space-x-4">
          <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 shadow-inner">
            <Icon className="w-8 h-8" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-xs font-bold uppercase tracking-widest text-slate-400">VERDICT ASSESSMENT</span>
            </div>
            <h2 className="text-2xl font-black tracking-tight mt-0.5">{details.text}</h2>
            <p className="text-xs text-slate-300 mt-1 max-w-xl">{details.desc}</p>
          </div>
        </div>

        {/* Confidence Dial / Progress */}
        <div className="flex items-center space-x-4 bg-slate-950/60 px-5 py-3 rounded-xl border border-slate-800 self-stretch md:self-auto justify-between">
          <div>
            <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">CONFIDENCE</div>
            <div className="text-2xl font-black text-white">{confidence}%</div>
          </div>
          <div className="w-16 h-2 bg-slate-800 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full transition-all duration-1000"
              style={{ width: `${confidence}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
