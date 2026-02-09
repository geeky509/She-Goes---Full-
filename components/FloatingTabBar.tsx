
import React from 'react';
import { Home, List, Plus, TrendingUp, User } from 'lucide-react';

interface FloatingTabBarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const FloatingTabBar: React.FC<FloatingTabBarProps> = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: 'home', icon: Home, label: 'Home' },
    { id: 'tasks', icon: List, label: 'Tasks' },
    { id: 'create', icon: Plus, label: 'Create', isFab: true },
    { id: 'progress', icon: TrendingUp, label: 'Stats' },
    { id: 'profile', icon: User, label: 'Profile' }
  ];

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[90%] max-w-md h-16 glass rounded-3xl flex items-center justify-around px-4 shadow-2xl z-40 mb-safe">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;

        if (tab.isFab) {
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className="bg-[#F472B6] text-white p-3 rounded-2xl shadow-lg -mt-12 transition-transform active:scale-95 transform hover:scale-105"
            >
              <Icon size={28} />
            </button>
          );
        }

        return (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex flex-col items-center justify-center space-y-1 transition-all duration-300 ${
              isActive ? 'text-[#F472B6] scale-110' : 'text-gray-400'
            }`}
          >
            <Icon size={isActive ? 24 : 20} strokeWidth={isActive ? 2.5 : 2} />
            <span className="text-[10px] font-medium">{tab.label}</span>
          </button>
        );
      })}
    </div>
  );
};

export default FloatingTabBar;
