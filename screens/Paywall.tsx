
import React from 'react';
import { X, Check, Crown, Sparkles, ShieldCheck, Zap } from 'lucide-react';

interface PaywallProps {
  onClose: () => void;
  onSubscribe: () => void;
}

const Paywall: React.FC<PaywallProps> = ({ onClose, onSubscribe }) => {
  const features = [
    { title: 'Advanced AI Actions', desc: 'Personalized multi-step growth journeys.', icon: Sparkles },
    { title: 'Streak Protection', desc: 'Never lose your progress with 3 freeze days.', icon: ShieldCheck },
    { title: 'Deep Insights', desc: 'Weekly PDF of your psychological progress.', icon: Zap },
    { title: 'Exclusive Themes', desc: 'Minimalist, Dark Mode, and Rose Gold.', icon: Crown }
  ];

  return (
    <div className="h-full w-full bg-[#FFF9FA] flex flex-col p-8 animate-in slide-in-from-bottom duration-500 overflow-y-auto">
      <div className="flex justify-end mb-4">
        <button onClick={onClose} className="p-2 bg-gray-100 rounded-full text-gray-500">
          <X size={20} />
        </button>
      </div>

      <div className="flex flex-col items-center text-center mb-12">
        <div className="w-20 h-20 bg-[#FCE7F3] rounded-[2rem] flex items-center justify-center text-[#F472B6] mb-6 shadow-lg rotate-3">
          <Crown size={40} />
        </div>
        <h1 className="playfair text-4xl text-gray-800 mb-2">Unlock Your Best Self</h1>
        <p className="text-gray-500 font-medium">Join 50k+ women becoming unstoppable.</p>
      </div>

      <div className="space-y-6 mb-12">
        {features.map((f, i) => {
          const Icon = f.icon;
          return (
            <div key={i} className="flex items-start gap-4">
              <div className="p-2 bg-white rounded-xl shadow-sm border border-gray-50 text-[#F472B6]">
                <Icon size={20} />
              </div>
              <div>
                <h4 className="font-bold text-gray-800">{f.title}</h4>
                <p className="text-gray-400 text-xs">{f.desc}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-2 gap-4 mb-8">
        <button className="flex flex-col items-center p-6 bg-white border border-gray-100 rounded-3xl shadow-sm transition-all hover:border-[#F472B6] active:scale-95 group">
          <span className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-2">Monthly</span>
          <span className="text-2xl font-black text-gray-800">$9.99</span>
          <span className="text-[10px] text-[#F472B6] mt-2 font-bold opacity-0 group-hover:opacity-100 transition-opacity uppercase">Select Plan</span>
        </button>
        <button className="flex flex-col items-center p-6 bg-[#F472B6] border border-[#F472B6] rounded-3xl shadow-xl shadow-[#F472B6]/30 transition-all active:scale-95 relative overflow-hidden">
          <div className="absolute top-2 right-2 bg-white text-[#F472B6] text-[8px] font-black px-2 py-0.5 rounded-full uppercase">Best Value</div>
          <span className="text-xs text-white/80 font-bold uppercase tracking-wider mb-2">Yearly</span>
          <span className="text-2xl font-black text-white">$69.99</span>
          <span className="text-[10px] text-white/60 mt-2 font-medium">$5.83 / mo</span>
        </button>
      </div>

      <button 
        onClick={onSubscribe}
        className="w-full h-16 bg-gray-900 text-white rounded-2xl font-bold text-lg shadow-xl mb-4 transition-all active:scale-95 flex items-center justify-center gap-2"
      >
        Start 7-Day Free Trial
      </button>
      
      <p className="text-[10px] text-center text-gray-400 font-medium">
        Recurring billing. Cancel anytime. <br />
        By subscribing, you agree to our <span className="underline">Terms</span> & <span className="underline">Privacy</span>.
      </p>
      
      <div className="mt-8 flex justify-center">
        <button onClick={onClose} className="text-xs font-bold text-gray-400 hover:text-gray-600 transition-colors">
          Continue with free version
        </button>
      </div>
    </div>
  );
};

export default Paywall;
