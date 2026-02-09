
import React, { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, CheckCircle } from 'lucide-react';
import { supabase } from '../../services/supabaseClient';
import HibiscusLoader from '../../components/HibiscusLoader';

interface LoginProps {
  onNavigate: () => void;
}

const Login: React.FC<LoginProps> = ({ onNavigate }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [resetSent, setResetSent] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResetSent(false);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) setError(error.message);
    setLoading(false);
  };

  const handleForgotPassword = async () => {
    if (!email) {
      setError("Please enter your email address first.");
      return;
    }
    setLoading(true);
    setError(null);
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: window.location.origin,
    });
    
    if (error) {
      setError(error.message);
    } else {
      setResetSent(true);
    }
    setLoading(false);
  };

  if (loading) return <HibiscusLoader />;

  return (
    <div className="min-h-screen bg-[#FFF9FA] flex flex-col p-6 items-center animate-in fade-in slide-in-from-bottom duration-500 overflow-y-auto">
      <style>{`
        @keyframes soft-bloom {
          0%, 100% { transform: scale(1) rotate(0deg); }
          50% { transform: scale(1.1) rotate(5deg); }
        }
        .animate-soft-bloom {
          animation: soft-bloom 4s ease-in-out infinite;
        }
      `}</style>
      
      <div className="w-full max-w-sm flex flex-col items-center">
        {/* Animated Flower Illustration */}
        <div className="w-36 h-36 bg-[#FCE7F3] rounded-full flex items-center justify-center mb-6 shadow-inner border-4 border-white overflow-hidden">
          <div className="text-7xl animate-soft-bloom">🌺</div>
        </div>

        <h1 className="playfair text-3xl md:text-4xl text-gray-800 text-center mb-2">Welcome back!</h1>
        <p className="text-gray-400 text-sm mb-8 text-center px-4">Your journey of doing continues here.</p>

        {/* Social Logins - Moved up and made fully responsive */}
        <div className="w-full flex flex-col items-center mb-8">
          <div className="flex flex-wrap justify-center gap-3 md:gap-4 mb-8 w-full max-w-full overflow-hidden px-2">
            {[
              { id: 'google', icon: 'https://www.svgrepo.com/show/355037/google.svg' },
              { id: 'x', icon: 'https://www.svgrepo.com/show/513089/twitter-x.svg' },
              { id: 'apple', icon: 'https://www.svgrepo.com/show/511330/apple.svg' }
            ].map((provider) => (
              <button 
                key={provider.id} 
                type="button"
                className="flex-shrink-0 p-3 md:p-4 bg-white rounded-2xl border border-gray-100 shadow-md transition-all active:scale-90 hover:shadow-lg flex items-center justify-center w-14 h-14 md:w-16 md:h-16"
              >
                <img src={provider.icon} alt={provider.id} className="w-6 h-6 md:w-7 md:h-7 object-contain" />
              </button>
            ))}
          </div>

          <div className="flex items-center gap-4 w-full px-4 mb-4">
            <div className="h-[1px] flex-1 bg-pink-100"></div>
            <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest whitespace-nowrap">Or use email</span>
            <div className="h-[1px] flex-1 bg-pink-100"></div>
          </div>
        </div>

        {/* Form Fields */}
        <form onSubmit={handleLogin} className="w-full space-y-4">
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="email"
              placeholder="Email"
              className="w-full h-14 pl-12 pr-4 bg-white border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#F472B6]/20 transition-all shadow-sm text-gray-800"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              className="w-full h-14 pl-12 pr-12 bg-white border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#F472B6]/20 transition-all shadow-sm text-gray-800"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required={!resetSent}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 p-2"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          <button 
            type="button" 
            onClick={handleForgotPassword}
            className="w-full text-right text-[#F472B6] text-[10px] font-black uppercase tracking-widest pt-1 mb-2 hover:opacity-70 transition-opacity"
          >
            Forgot Password?
          </button>

          {error && (
            <div className="animate-in fade-in zoom-in duration-300">
              <p className="text-red-500 text-[10px] text-center font-medium bg-red-50 py-2 px-4 rounded-xl border border-red-100">
                {error}
              </p>
            </div>
          )}

          {resetSent && (
            <div className="animate-in slide-in-from-top-2 fade-in duration-500">
              <div className="flex items-center gap-2 bg-green-50 border border-green-100 text-green-600 p-3 rounded-xl text-[10px] font-bold">
                <CheckCircle size={14} />
                Reset link sent to your email!
              </div>
            </div>
          )}

          <button
            type="submit"
            className="w-full h-16 bg-[#F472B6] text-white rounded-2xl font-bold text-lg shadow-xl shadow-[#F472B6]/20 transition-all active:scale-95 transform hover:-translate-y-0.5"
          >
            Log In
          </button>
        </form>

        <div className="mt-8 mb-8 flex flex-col items-center">
          <p className="text-gray-400 text-xs">
            Don't have an account?{' '}
            <button onClick={onNavigate} className="text-[#F472B6] font-black underline underline-offset-4">Sign Up</button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
