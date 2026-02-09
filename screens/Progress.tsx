
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { TrendingUp, Award, Zap, ArrowUpRight } from 'lucide-react';

const data = [
  { name: 'Mon', count: 4 },
  { name: 'Tue', count: 7 },
  { name: 'Wed', count: 5 },
  { name: 'Thu', count: 9 },
  { name: 'Fri', count: 12 },
  { name: 'Sat', count: 6 },
  { name: 'Sun', count: 8 },
];

const Progress: React.FC = () => {
  return (
    <div className="flex flex-col space-y-8 p-6 animate-in fade-in duration-700">
      <div className="pt-6">
        <h1 className="playfair text-3xl text-gray-800">Your Evolution</h1>
        <p className="text-gray-500 mt-1">You've completed 45 actions this month.</p>
      </div>

      {/* Main Stat Card */}
      <div className="bg-white rounded-[2.5rem] p-8 shadow-xl border border-gray-50 relative overflow-hidden">
        <div className="absolute right-0 top-0 w-32 h-32 bg-[#FCE7F3] rounded-full blur-[60px] opacity-60"></div>
        <div className="flex items-center justify-between mb-8">
          <div>
            <h3 className="text-4xl font-bold text-gray-800">82%</h3>
            <p className="text-sm font-semibold text-gray-400 uppercase tracking-widest">Consistency Score</p>
          </div>
          <div className="p-4 bg-green-50 text-green-500 rounded-2xl">
            <TrendingUp size={32} />
          </div>
        </div>

        <div className="h-48 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#9CA3AF', fontSize: 12 }} />
              <Tooltip 
                cursor={{ fill: '#FCE7F3', radius: 10 }}
                contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
              />
              <Bar dataKey="count" radius={[10, 10, 10, 10]}>
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={index === 4 ? '#F472B6' : '#FCE7F3'} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Grid of Badges */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-[#E0E7FF] p-6 rounded-3xl flex flex-col gap-4 shadow-sm">
          <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-indigo-500">
            <Zap size={24} />
          </div>
          <div>
            <p className="text-indigo-900 font-bold">Flow Master</p>
            <p className="text-indigo-600 text-xs font-medium">10 actions in 1 day</p>
          </div>
        </div>
        <div className="bg-[#FEF3C7] p-6 rounded-3xl flex flex-col gap-4 shadow-sm">
          <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-amber-500">
            <Award size={24} />
          </div>
          <div>
            <p className="text-amber-900 font-bold">Unstoppable</p>
            <p className="text-amber-600 text-xs font-medium">30-day streak</p>
          </div>
        </div>
      </div>

      {/* Weekly Summary */}
      <div className="bg-gray-900 rounded-[2.5rem] p-8 text-white relative overflow-hidden mb-8">
        <div className="absolute top-0 right-0 w-40 h-40 bg-[#F472B6] opacity-10 blur-3xl"></div>
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-lg font-bold">Weekly Insights</h4>
          <ArrowUpRight className="text-[#F472B6]" />
        </div>
        <p className="text-gray-400 text-sm leading-relaxed mb-6">
          You're most active in the <span className="text-white font-bold">Self Discovery</span> category. Try focusing more on your <span className="text-white font-bold">Money Mindset</span> this week to balance your growth.
        </p>
        <button className="w-full py-4 bg-white/10 border border-white/20 rounded-2xl font-bold text-sm hover:bg-white/20 transition-colors">
          View Detailed Summary
        </button>
      </div>
    </div>
  );
};

export default Progress;
