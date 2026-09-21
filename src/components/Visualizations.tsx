import React from 'react';
import { VerificationResult } from '../types/verification';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import { BarChart3, PieChart as PieIcon } from 'lucide-react';

interface VisualizationsProps {
  result: VerificationResult;
}

export const Visualizations: React.FC<VisualizationsProps> = ({ result }) => {
  const pieData = [
    { name: 'Supporting', value: result.supportingEvidence.length, color: '#10b981' },
    { name: 'Contradicting', value: result.contradictingEvidence.length, color: '#f43f5e' },
    { name: 'Context', value: result.contextEvidence.length + result.backgroundEvidence.length, color: '#3b82f6' },
  ].filter(d => d.value > 0);

  const sourceTypeCounts: Record<string, number> = {};
  [
    ...result.supportingEvidence,
    ...result.contradictingEvidence,
    ...result.contextEvidence,
    ...result.academicEvidence,
    ...result.newsEvidence,
    ...result.backgroundEvidence
  ].forEach(item => {
    sourceTypeCounts[item.sourceType] = (sourceTypeCounts[item.sourceType] || 0) + 1;
  });

  const barData = Object.keys(sourceTypeCounts).map(type => ({
    name: type,
    count: sourceTypeCounts[type]
  }));

  if (pieData.length === 0 && barData.length === 0) {
    return null;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
      {/* Evidence Distribution */}
      <div className="glass-card rounded-2xl p-5 border border-slate-800 bg-slate-900/80 shadow-xl flex flex-col justify-between">
        <div className="flex items-center space-x-2 mb-4">
          <PieIcon className="w-5 h-5 text-emerald-400" />
          <h3 className="font-bold text-base text-white">Evidence Stance Breakdown</h3>
        </div>

        <div className="h-52 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                innerRadius={45}
                outerRadius={75}
                paddingAngle={4}
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{ backgroundColor: '#090d16', borderColor: '#334155', borderRadius: '12px', color: '#fff' }}
              />
              <Legend verticalAlign="bottom" height={36} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Source Type Distribution */}
      <div className="glass-card rounded-2xl p-5 border border-slate-800 bg-slate-900/80 shadow-xl flex flex-col justify-between">
        <div className="flex items-center space-x-2 mb-4">
          <BarChart3 className="w-5 h-5 text-indigo-400" />
          <h3 className="font-bold text-base text-white">Source Category Breakdown</h3>
        </div>

        <div className="h-52 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={barData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <XAxis dataKey="name" stroke="#64748b" fontSize={10} tickLine={false} />
              <YAxis stroke="#64748b" fontSize={10} tickLine={false} />
              <Tooltip
                contentStyle={{ backgroundColor: '#090d16', borderColor: '#334155', borderRadius: '12px', color: '#fff' }}
              />
              <Bar dataKey="count" fill="#6366f1" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
