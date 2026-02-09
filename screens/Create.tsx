
import React, { useState } from 'react';
import { X, Sparkles, ChevronRight } from 'lucide-react';
import { Category } from '../types';

interface CreateProps {
  onClose: () => void;
}

const Create: React.FC<CreateProps> = ({ onClose }) => {
  const [step, setStep] = useState(1);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<Category>(Category.DREAM);

  const categories = [
    { type: Category.DREAM, icon: '✨', description: 'Bucket list items and big visions' },
    { type: Category.CAREER, icon: '🚀', description: 'Business and professional growth' },
    { type: Category.TRAVEL, icon: '🌍', description: 'Exploring the world solo or together' },
    { type: Category.MONEY, icon: '💎', description: 'Building wealth and abundance' },
    { type: Category.SELF, icon: '🧘', description: 'Mental health and identity' }
  ];

  const handleNext = () => {
    if (step === 1) setStep(2);
    else {
      // Logic to save
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-[#FDF2F2] z-[60] flex flex-col p-6 animate-in slide-in-from-bottom duration-500 fill-mode-forwards">
      <div className="flex items-center justify-between mb-8">
        <button onClick={onClose} className="p-2 glass rounded-full text-gray-500">
          <X size={24} />
        </button>
        <div className="flex items-center gap-1">
          <div className={`w-8 h-1.5 rounded-full ${step >= 1 ? 'bg-[#F472B6]' : 'bg-gray-200'}`}></div>
          <div className={`w-8 h-1.5 rounded-full ${step >= 2 ? 'bg-[#F472B6]' : 'bg-gray-200'}`}></div>
        </div>
        <div className="w-10"></div>
      </div>

      <div className="flex-1 flex flex-col">
        {step === 1 ? (
          <div className="animate-in fade-in duration-300">
            <h1 className="playfair text-4xl text-gray-800 mb-2">What's your next big step?</h1>
            <p className="text-gray-500 mb-8">Choose a category for your new journey.</p>
            
            <div className="space-y-4 overflow-y-auto max-h-[60vh] pr-2">
              {categories.map((cat) => (
                <button
                  key={cat.type}
                  onClick={() => setCategory(cat.type)}
                  className={`w-full flex items-center gap-5 p-5 rounded-[2rem] border transition-all duration-300 active:scale-[0.97] ${
                    category === cat.type 
                    ? 'bg-white border-[#F472B6] shadow-xl ring-4 ring-[#F472B6]/10' 
                    : 'bg-white/40 border-transparent text-gray-400'
                  }`}
                >
                  <span className="text-3xl">{cat.icon}</span>
                  <div className="text-left">
                    <p className={`font-bold ${category === cat.type ? 'text-[#F472B6]' : 'text-gray-600'}`}>{cat.type}</p>
                    <p className="text-xs text-gray-400 font-medium">{cat.description}</p>
                  </div>
                  {category === cat.type && <ChevronRight className="ml-auto text-[#F472B6]" />}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="animate-in slide-in-from-right duration-300">
            <h1 className="playfair text-4xl text-gray-800 mb-2">Define your goal</h1>
            <p className="text-gray-500 mb-8">What exactly are you going to achieve?</p>

            <div className="bg-white rounded-[2rem] p-6 shadow-xl border border-white">
              <textarea
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                autoFocus
                placeholder="e.g., Start a side hustle in graphic design..."
                className="w-full min-h-[150px] text-2xl font-semibold text-gray-800 placeholder-gray-200 resize-none border-none focus:ring-0"
              />
              <div className="flex items-center gap-2 mt-4 text-[#F472B6] bg-[#FCE7F3] w-fit px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest">
                <Sparkles size={14} />
                Gemini AI Optimized
              </div>
            </div>
          </div>
        )}
      </div>

      <button
        onClick={handleNext}
        disabled={step === 2 && !title}
        className={`w-full h-16 rounded-2xl text-white font-bold text-lg shadow-xl transition-all active:scale-95 flex items-center justify-center gap-2 ${
          step === 2 && !title ? 'bg-gray-300 opacity-50' : 'bg-[#F472B6]'
        }`}
      >
        {step === 1 ? 'Next' : 'Create My Journey'}
      </button>
    </div>
  );
};

export default Create;
