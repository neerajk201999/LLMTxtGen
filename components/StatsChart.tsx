import React from 'react';
import { RadialBarChart, RadialBar, ResponsiveContainer, Tooltip } from 'recharts';
import { Activity } from 'lucide-react';

const data = [
  { name: 'Readability', uv: 95, fill: '#38bdf8' },
  { name: 'Structure', uv: 100, fill: '#818cf8' },
  { name: 'Context', uv: 90, fill: '#c084fc' },
  { name: 'Discoverability', uv: 85, fill: '#2dd4bf' },
];

interface StatsChartProps {
  isDark?: boolean;
}

export const StatsChart: React.FC<StatsChartProps> = ({ isDark = true }) => {
  return (
    <div className="h-full min-h-[300px] w-full bg-mosaic-tile rounded-sm border border-mosaic-border p-5 flex flex-col relative overflow-hidden transition-colors duration-300">
      <div className="flex items-center justify-between mb-4 border-b border-mosaic-border pb-2">
        <div className="flex items-center gap-2">
           <Activity className="w-4 h-4 text-brand-600 dark:text-brand-400" />
           <h4 className="font-mono text-xs uppercase tracking-widest text-slate-500 dark:text-slate-400">GEO Score</h4>
        </div>
        <span className="text-xs font-mono text-brand-600 dark:text-brand-500">92/100</span>
      </div>
      
      <div className="flex-1 relative">
        <ResponsiveContainer width="100%" height="100%">
          <RadialBarChart 
            innerRadius="30%" 
            outerRadius="100%" 
            barSize={8} 
            data={data}
            startAngle={180} 
            endAngle={0}
          >
            <RadialBar
              label={{ position: 'insideStart', fill: isDark ? '#fff' : '#0f172a', fontSize: '10px', fontWeight: 'bold' }}
              background={{ fill: isDark ? '#1e293b' : '#e2e8f0' }}
              dataKey="uv"
              cornerRadius={0} // Sharp corners
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: isDark ? '#020617' : '#ffffff', 
                borderColor: isDark ? '#334155' : '#cbd5e1', 
                color: isDark ? '#f8fafc' : '#0f172a',
                borderRadius: '2px', 
                fontSize: '12px',
                boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
              }}
              itemStyle={{ color: isDark ? '#f8fafc' : '#0f172a' }}
              cursor={{fill: 'transparent'}}
            />
          </RadialBarChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-2 text-[10px] font-mono text-slate-500 uppercase">
        <div className="flex items-center gap-1.5"><div className="w-1.5 h-1.5 bg-sky-400"></div>Readability</div>
        <div className="flex items-center gap-1.5"><div className="w-1.5 h-1.5 bg-indigo-400"></div>Structure</div>
        <div className="flex items-center gap-1.5"><div className="w-1.5 h-1.5 bg-purple-400"></div>Context</div>
        <div className="flex items-center gap-1.5"><div className="w-1.5 h-1.5 bg-teal-400"></div>Discovery</div>
      </div>
    </div>
  );
};