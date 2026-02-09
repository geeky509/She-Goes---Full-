
import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { TrendingUp, Award, Zap, ArrowUpRight, Loader2 } from 'lucide-react';
import { supabase } from '../services/supabaseClient';

const Progress: React.FC = () => {
  const [taskCount, setTaskCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [chartData, setChartData] = useState([
    { name: 'Mon', count: 0 },
    { name: 'Tue', count: 0 },
    { name: 'Wed', count: 0 },
    { name: 'Thu', count: 0 },
    { name: 'Fri', count: 0 },
    { name: 'Sat', count: 0 },
    { name: 'Sun', count: 0 },
  ]);

  useEffect(() => {
    fetchInsights();
  }, []);

  const fetchInsights = async () => {
    setLoading(true);
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    // Fetch total completed tasks
    const { count: tasksDone } = await supabase
      .from('tasks')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', user.id)
      .eq('completed', true);

    // Fetch total micro-actions
    const { count: actionsDone } = await supabase
      .from('daily_actions')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', user.id);

    setTaskCount((tasksDone || 0) + (actionsDone || 0));

    // Simple mock distribution for now - in production you'd query by day
    setChartData([
      { name: 'Mon', count: Math.floor(Math.random() * 5) },
      { name: 'Tue', count: Math.floor(Math.random() * 10) },
      { name: 'Wed', count: Math.floor(Math.random() * 8) },
      { name: 'Thu', count: (tasksDone || 2) },
      { name: 'Fri', count: (actionsDone || 3) },
      { name: 'Sat', count: 4 },
      { name: 'Sun', count: 1 },
    ]);
    
    setLoading(false);
  };

  if (loading) return (
    <div className="flex items-center justify-center h-full">
      <Loader2 className="text-[#F472B6] animate-spin" size={48} />
    </div>
  );

  return (
    <div className="flex flex-col space-y-8 p-6 animate-in fade-in duration-700 pb-32">
      <div className="pt-6">
        <h1 className="playfair text-3xl text-gray-800 dark:text-gray-100">Your Evolution</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">You've completed {taskCount} actions in total.</p>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-[2.5rem] p-8 shadow-xl border border-gray-50 dark:border-gray-700 relative overflow-hidden">
        <div className="absolute right-0 top-0 w-32 h-32 bg-[#FCE7F3] dark:bg-pink-900/10 rounded-full blur-[60px] opacity-60"></div>
        <div className="flex items-center justify-between mb-8">
          <div>
            <h3 className="text-4xl font-bold text-gray-800 dark:text-white">{Math.min(100, Math.round((taskCount/20) * 100))}%</h3>
            <p className="text-sm font-semibold text-gray-400 uppercase tracking-widest">Growth Velocity</p>
          </div>
          <div className="p-4 bg-green-50 dark:bg-green-900/20 text-green-500 rounded-2xl">
            <TrendingUp size={32} />
          </div>
        </div>

        <div className="h-48 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#9CA3AF', fontSize: 12 }} />
              <Tooltip 
                cursor={{ fill: '#FCE7F3', radius: 10 }}
                contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
              />
              <Bar dataKey="count" radius={[10, 10, 10, 10]}>
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={index === 4 ? '#F472B6' : '#FCE7F3'} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-[#E0E7FF] dark:bg-indigo-900/20 p-6 rounded-3xl flex flex-col gap-4 shadow-sm">
          <div className="w-12 h-12 bg-white dark:bg-indigo-800 rounded-2xl flex items-center justify-center text-indigo-500">
            <Zap size={24} />
          </div>
          <div>
            <p className="text-indigo-900 dark:text-indigo-100 font-bold">Flow Master</p>
            <p className="text-indigo-600 dark:text-indigo-300 text-xs font-medium">Unlocked at 10 actions</p>
          </div>
        </div>
        <div className="bg-[#FEF3C7] dark:bg-amber-900/20 p-6 rounded-3xl flex flex-col gap-4 shadow-sm">
          <div className="w-12 h-12 bg-white dark:bg-amber-800 rounded-2xl flex items-center justify-center text-amber-500">
            <Award size={24} />
          </div>
          <div>
            <p className="text-amber-900 dark:text-amber-100 font-bold">Unstoppable</p>
            <p className="text-amber-600 dark:text-amber-300 text-xs font-medium">30-day streak path</p>
          </div>
        </div>
      </div>

      <div className="bg-gray-900 rounded-[2.5rem] p-8 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-40 h-40 bg-[#F472B6] opacity-10 blur-3xl"></div>
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-lg font-bold">Weekly Insights</h4>
          <ArrowUpRight className="text-[#F472B6]" />
        </div>
        <p className="text-gray-400 text-sm leading-relaxed mb-6">
          Your momentum is building. You've consistently shown up for <span className="text-white font-bold">Self Discovery</span>. Keep pushing into your career goals next!
        </p>
        <button onClick={fetchInsights} className="w-full py-4 bg-white/10 border border-white/20 rounded-2xl font-bold text-sm hover:bg-white/20 transition-colors">
          Refresh Statistics
        </button>
      </div>
    </div>
  );
};

export default Progress;
