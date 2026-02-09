
import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import { getDailyAction } from '../services/geminiService';
import { Category, UserProfile } from '../types';
import { Sparkles, Trophy, Flame, Share2 } from 'lucide-react';
import confetti from 'https://cdn.skypack.dev/canvas-confetti';

interface HomeProps {
  user: UserProfile;
  onLockedFeature: () => void;
}

const Home: React.FC<HomeProps> = ({ user, onLockedFeature }) => {
  const [dailyAction, setDailyAction] = useState<any>(null);
  const [completed, setCompleted] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadAction = async () => {
      setLoading(true);
      const action = await getDailyAction(Category.SELF);
      setDailyAction(action);
      setLoading(false);
    };
    loadAction();
  }, []);

  const handleComplete = () => {
    if (!completed) {
      setCompleted(true);
      confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#F472B6', '#FCE7F3', '#FDE68A']
      });
    }
  };

  const shareAction = () => {
    const text = `I just completed my daily micro-action on 'She Goes'! Today's win: ${dailyAction?.action}`;
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div className="flex flex-col space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <Header user={user} />

      {/* Streak Counter */}
      <div className="px-6">
        <div className="bg-[#FCE7F3] dark:bg-[#3d1a2b] rounded-3xl p-6 flex items-center justify-between shadow-sm overflow-hidden relative border border-white/20 dark:border-pink-500/10">
          <div className="absolute -right-4 -top-4 w-24 h-24 bg-white/20 rounded-full blur-2xl"></div>
          <div>
            <h3 className="text-[#F472B6] text-sm font-semibold uppercase tracking-widest">Momentum</h3>
            <p className="text-3xl font-bold text-gray-800 dark:text-gray-100 flex items-center gap-2 mt-1">
              {user.streak} <span className="text-sm font-normal text-gray-500 dark:text-gray-400">days streak</span>
              <Flame className="text-orange-400 fill-orange-400" size={24} />
            </p>
          </div>
          <button className="bg-white/80 dark:bg-gray-800/80 p-3 rounded-2xl shadow-sm text-[#F472B6]">
            <Trophy size={24} />
          </button>
        </div>
      </div>

      {/* Daily Micro Action */}
      <div className="px-6">
        <h2 className="playfair text-2xl text-gray-800 dark:text-gray-100 mb-4">Today's Micro-Action</h2>
        <div className={`relative overflow-hidden p-8 rounded-[2rem] shadow-xl transition-all duration-500 transform border border-gray-100 dark:border-gray-800 ${completed ? 'bg-green-50 dark:bg-green-900/20' : 'bg-white dark:bg-gray-800'}`}>
           {loading ? (
             <div className="flex flex-col items-center py-12">
               <div className="w-10 h-10 border-4 border-[#F472B6]/20 border-t-[#F472B6] rounded-full animate-spin"></div>
               <p className="text-gray-400 text-sm mt-4 italic">Gemini is curating your day...</p>
             </div>
           ) : (
             <>
               <div className="flex items-start justify-between mb-6">
                 <div className="bg-[#FCE7F3] dark:bg-pink-900/30 p-2 rounded-xl">
                   <Sparkles className="text-[#F472B6]" size={20} />
                 </div>
                 <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400 bg-gray-50 dark:bg-gray-900 px-3 py-1 rounded-full border border-gray-100 dark:border-gray-800">
                    Category: Self
                 </span>
               </div>
               
               <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 leading-snug mb-3">
                 {dailyAction?.action}
               </h3>
               <p className="text-gray-500 dark:text-gray-400 text-sm mb-8 italic">
                 "{dailyAction?.why}"
               </p>

               <div className="flex gap-3">
                 <button
                   onClick={handleComplete}
                   disabled={completed}
                   className={`flex-1 py-4 rounded-2xl font-bold transition-all transform active:scale-95 ${
                     completed 
                     ? 'bg-green-100 text-green-600 dark:bg-green-900/40 dark:text-green-400' 
                     : 'bg-[#F472B6] text-white shadow-lg hover:shadow-[#F472B6]/40'
                   }`}
                 >
                   {completed ? 'Success!' : 'Mark as Done'}
                 </button>
                 {completed && (
                   <button 
                    onClick={shareAction}
                    className="p-4 bg-white dark:bg-gray-700 border border-gray-100 dark:border-gray-600 rounded-2xl text-gray-600 dark:text-gray-300 shadow-sm"
                   >
                     <Share2 size={24} />
                   </button>
                 )}
               </div>
             </>
           )}
        </div>
      </div>

      {/* Quick Links */}
      <div className="px-6 pb-12">
        <h2 className="playfair text-2xl text-gray-800 dark:text-gray-100 mb-4">Focus Areas</h2>
        <div className="grid grid-cols-2 gap-4">
          {[
            { label: 'Travel Bucket', count: 12, color: 'bg-blue-50 dark:bg-blue-900/20', icon: '✈️' },
            { label: 'Career Growth', count: 5, color: 'bg-purple-50 dark:bg-purple-900/20', icon: '💼' },
            { label: 'Self Identity', count: 8, color: 'bg-pink-50 dark:bg-pink-900/20', icon: '🌸' },
            { label: 'Money Mindset', count: 3, color: 'bg-yellow-50 dark:bg-yellow-900/20', icon: '💰' }
          ].map((item, idx) => (
            <div key={idx} className={`${item.color} p-6 rounded-3xl flex flex-col items-start gap-4 shadow-sm border border-white/50 dark:border-gray-800 cursor-pointer transition-transform active:scale-95`} onClick={onLockedFeature}>
              <span className="text-3xl">{item.icon}</span>
              <div>
                <p className="text-gray-800 dark:text-gray-100 font-bold">{item.label}</p>
                <p className="text-gray-500 dark:text-gray-400 text-xs font-medium">{item.count} Actions Pending</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
