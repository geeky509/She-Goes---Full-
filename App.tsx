
import React, { useState, useEffect } from 'react';
import HibiscusLoader from './components/HibiscusLoader';
import FloatingTabBar from './components/FloatingTabBar';
import Home from './screens/Home';
import Tasks from './screens/Tasks';
import Create from './screens/Create';
import Progress from './screens/Progress';
import Profile from './screens/Profile';
import Paywall from './screens/Paywall';
import Login from './screens/Auth/Login';
import SignUp from './screens/Auth/SignUp';
import { UserProfile } from './types';
import { supabase } from './services/supabaseClient';

const App: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState<any>(null);
  const [authView, setAuthView] = useState<'login' | 'signup'>('login');
  const [activeTab, setActiveTab] = useState('home');
  const [showPaywall, setShowPaywall] = useState(false);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);

  useEffect(() => {
    // Initial session check
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session) fetchProfile(session.user.id);
      setLoading(false);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session) fetchProfile(session.user.id);
      else setUserProfile(null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchProfile = async (userId: string) => {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();

    if (data) {
      setUserProfile({
        name: data.name || 'Dreamer',
        avatar: data.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${userId}`,
        streak: data.streak || 0,
        isPremium: data.premium || false
      });
    } else {
      // Fallback if no profile row exists yet
      setUserProfile({
        name: 'Dreamer',
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${userId}`,
        streak: 0,
        isPremium: false
      });
    }
  };

  if (loading) {
    return <HibiscusLoader />;
  }

  if (!session) {
    return authView === 'login' 
      ? <Login onNavigate={() => setAuthView('signup')} /> 
      : <SignUp onNavigate={() => setAuthView('login')} />;
  }

  const user = userProfile || {
    name: "Sara",
    avatar: "https://picsum.photos/seed/sara/100/100",
    streak: 12,
    isPremium: false
  };

  const renderScreen = () => {
    switch (activeTab) {
      case 'home': return <Home user={user} onLockedFeature={() => setShowPaywall(true)} />;
      case 'tasks': return <Tasks />;
      case 'create': return <Create onClose={() => setActiveTab('home')} />;
      case 'progress': return <Progress />;
      case 'profile': return <Profile user={user} onUpgrade={() => setShowPaywall(true)} onProfileUpdate={() => fetchProfile(session.user.id)} />;
      default: return <Home user={user} onLockedFeature={() => setShowPaywall(true)} />;
    }
  };

  return (
    <div className="relative h-screen w-full flex flex-col bg-[#FFF9FA] dark:bg-gray-900 transition-colors duration-300 overflow-hidden">
      <main className="flex-1 overflow-y-auto pb-24">
        {renderScreen()}
      </main>

      <FloatingTabBar activeTab={activeTab} setActiveTab={setActiveTab} />

      {showPaywall && (
        <div className="absolute inset-0 z-50">
          <Paywall onClose={() => setShowPaywall(false)} onSubscribe={() => {
            setUserProfile(prev => prev ? { ...prev, isPremium: true } : null);
            setShowPaywall(false);
          }} />
        </div>
      )}
    </div>
  );
};

export default App;
