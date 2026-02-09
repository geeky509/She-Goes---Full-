
import React, { useState, useEffect } from 'react';
import { Settings, Bell, Moon, Sun, X, Info, Heart, Star } from 'lucide-react';

interface HeaderProps {
  user: {
    name: string;
    avatar: string;
  };
}

const Header: React.FC<HeaderProps> = ({ user }) => {
  const [isDark, setIsDark] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  
  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening';

  useEffect(() => {
    const isDarkMode = document.documentElement.classList.contains('dark');
    setIsDark(isDarkMode);
  }, []);

  const toggleTheme = () => {
    const newDark = !isDark;
    setIsDark(newDark);
    if (newDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  return (
    <>
      <header className="flex items-center justify-between px-6 py-4 pt-8">
        <div className="flex items-center space-x-3">
          <img
            src={user.avatar}
            alt="User Profile"
            className="w-10 h-10 rounded-full border-2 border-white shadow-sm object-cover dark:border-gray-800"
          />
          <div>
            <p className="text-gray-400 text-xs font-medium uppercase tracking-wider">{greeting}</p>
            <h2 className="playfair text-xl text-gray-800 dark:text-gray-100">{user.name}</h2>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <button 
            onClick={toggleTheme}
            className="p-2 glass rounded-full text-gray-600 dark:text-gray-300 hover:bg-white/60 dark:hover:bg-gray-800/60 transition-colors shadow-sm"
            aria-label="Toggle Dark Mode"
          >
            {isDark ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <button 
            onClick={() => setShowSettings(true)}
            className="p-2 glass rounded-full text-gray-600 dark:text-gray-300 hover:bg-white/60 dark:hover:bg-gray-800/60 transition-colors shadow-sm"
          >
            <Settings size={20} />
          </button>
          <div className="relative">
            <button 
              onClick={() => setShowNotifications(true)}
              className="p-2 glass rounded-full text-gray-600 dark:text-gray-300 hover:bg-white/60 dark:hover:bg-gray-800/60 transition-colors shadow-sm"
            >
              <Bell size={20} />
            </button>
            <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-[#F472B6] border-2 border-[#FFF9FA] dark:border-gray-900 rounded-full"></span>
          </div>
        </div>
      </header>

      {/* Settings Modal */}
      {showSettings && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 animate-in fade-in duration-300">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setShowSettings(false)}></div>
          <div className="relative w-full max-w-sm glass dark:bg-gray-800 p-8 rounded-[2.5rem] shadow-2xl border border-white/20">
            <button onClick={() => setShowSettings(false)} className="absolute top-6 right-6 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
              <X size={20} className="text-gray-400" />
            </button>
            <h3 className="playfair text-2xl text-gray-800 dark:text-white mb-6">Quick Settings</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-white/50 dark:bg-gray-900/50 rounded-2xl">
                <div className="flex items-center gap-3">
                  <Info size={18} className="text-[#F472B6]" />
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-200">App Version</span>
                </div>
                <span className="text-xs text-gray-400 font-bold uppercase">v1.0.4 Gold</span>
              </div>
              <div className="flex items-center justify-between p-4 bg-white/50 dark:bg-gray-900/50 rounded-2xl">
                <div className="flex items-center gap-3">
                  <Heart size={18} className="text-red-400" />
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-200">Leave a Review</span>
                </div>
                <Star size={16} className="text-yellow-400 fill-yellow-400" />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Notifications Modal */}
      {showNotifications && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 animate-in slide-in-from-top-4 duration-300">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setShowNotifications(false)}></div>
          <div className="relative w-full max-w-sm glass dark:bg-gray-800 p-8 rounded-[2.5rem] shadow-2xl border border-white/20">
            <button onClick={() => setShowNotifications(false)} className="absolute top-6 right-6 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
              <X size={20} className="text-gray-400" />
            </button>
            <h3 className="playfair text-2xl text-gray-800 dark:text-white mb-6">Recent Wins</h3>
            <div className="space-y-4 max-h-[40vh] overflow-y-auto pr-2">
              <div className="p-4 bg-pink-50 dark:bg-pink-900/20 border border-pink-100 dark:border-pink-800/30 rounded-2xl">
                <p className="text-xs font-bold text-[#F472B6] uppercase tracking-wider mb-1">New Milestone!</p>
                <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">You've hit a 12-day streak. Keep that fire burning! 🔥</p>
                <p className="text-[10px] text-gray-400 mt-2">2 hours ago</p>
              </div>
              <div className="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800/30 rounded-2xl">
                <p className="text-xs font-bold text-blue-500 uppercase tracking-wider mb-1">Travel Goal</p>
                <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">It's time to check flight prices for your Paris trip!</p>
                <p className="text-[10px] text-gray-400 mt-2">Yesterday</p>
              </div>
            </div>
            {/* Empty state when cleared */}
            <div className="mt-6 pt-6 border-t border-gray-100 dark:border-gray-700 flex justify-center">
              <button onClick={() => setShowNotifications(false)} className="text-[10px] font-black uppercase text-[#F472B6] tracking-widest">
                Clear All Notifications
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
