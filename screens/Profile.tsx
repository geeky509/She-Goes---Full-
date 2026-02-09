
import React, { useState, useRef, useEffect } from 'react';
import { UserProfile } from '../types';
import { CreditCard, Shield, HelpCircle, LogOut, ChevronRight, Crown, Camera, Loader2, Edit2, Check, X } from 'lucide-react';
import { supabase } from '../services/supabaseClient';

interface ProfileProps {
  user: UserProfile;
  onUpgrade: () => void;
  onProfileUpdate: () => void;
}

const Profile: React.FC<ProfileProps> = ({ user, onUpgrade, onProfileUpdate }) => {
  const [uploading, setUploading] = useState(false);
  const [isEditingName, setIsEditingName] = useState(false);
  const [newName, setNewName] = useState(user.name);
  const [isSavingName, setIsSavingName] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setNewName(user.name);
  }, [user.name]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleUpdateName = async () => {
    if (!newName.trim() || newName === user.name) {
      setIsEditingName(false);
      setNewName(user.name);
      return;
    }

    try {
      setIsSavingName(true);
      const { data: { user: authUser } } = await supabase.auth.getUser();
      if (!authUser) throw new Error('Not authenticated');

      const { error } = await supabase
        .from('profiles')
        .update({ name: newName.trim() })
        .eq('id', authUser.id);

      if (error) throw error;
      
      setIsEditingName(false);
      onProfileUpdate();
    } catch (error: any) {
      alert(error.message || 'Error updating name');
    } finally {
      setIsSavingName(false);
    }
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setUploading(true);
      const file = event.target.files?.[0];
      if (!file) return;

      const { data: { user: authUser } } = await supabase.auth.getUser();
      if (!authUser) throw new Error('Not authenticated');

      const fileExt = file.name.split('.').pop();
      const fileName = `${authUser.id}-${Math.random()}.${fileExt}`;
      const filePath = `avatars/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('avatars')
        .getPublicUrl(filePath);

      const { error: updateError } = await supabase
        .from('profiles')
        .update({ avatar: publicUrl })
        .eq('id', authUser.id);

      if (updateError) throw updateError;

      onProfileUpdate();
    } catch (error: any) {
      alert(error.message || 'Error uploading image');
    } finally {
      setUploading(false);
    }
  };

  const menuItems = [
    { label: 'Subscription', icon: CreditCard, color: 'text-blue-500', bg: 'bg-blue-50', action: onUpgrade },
    { label: 'Privacy & Security', icon: Shield, color: 'text-green-500', bg: 'bg-green-50', action: () => {} },
    { label: 'Help Center', icon: HelpCircle, color: 'text-orange-500', bg: 'bg-orange-50', action: () => {} },
    { label: 'Log Out', icon: LogOut, color: 'text-red-500', bg: 'bg-red-50', action: handleLogout }
  ];

  return (
    <div className="flex flex-col bg-[#FFF9FA] dark:bg-gray-900 min-h-full animate-in fade-in duration-500">
      <div className="bg-white dark:bg-gray-800 rounded-b-[3rem] p-12 flex flex-col items-center shadow-sm relative mb-8">
        <div className="absolute inset-0 bg-gradient-to-b from-[#FCE7F3]/30 to-transparent dark:from-[#F472B6]/5"></div>
        
        <div className="relative group cursor-pointer" onClick={handleAvatarClick}>
          <div className="w-32 h-32 rounded-full border-4 border-white dark:border-gray-700 shadow-xl overflow-hidden mb-4 relative">
            <img 
              src={user.avatar} 
              alt="Profile" 
              className={`w-full h-full object-cover transition-opacity ${uploading ? 'opacity-30' : 'opacity-100'}`}
            />
            {uploading && (
              <div className="absolute inset-0 flex items-center justify-center">
                <Loader2 className="text-[#F472B6] animate-spin" size={32} />
              </div>
            )}
            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <Camera className="text-white" size={24} />
            </div>
          </div>
          <button className="absolute bottom-4 right-0 bg-[#F472B6] text-white p-2 rounded-full shadow-lg border-2 border-white dark:border-gray-700">
            <Crown size={18} />
          </button>
        </div>
        
        <input 
          type="file" 
          ref={fileInputRef} 
          className="hidden" 
          accept="image/*" 
          onChange={handleFileChange}
        />

        {isEditingName ? (
          <div className="flex items-center gap-2 mt-2 w-full max-w-[200px] animate-in zoom-in duration-200">
            <input
              type="text"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              autoFocus
              className="w-full bg-gray-50 dark:bg-gray-700 border-b-2 border-[#F472B6] px-2 py-1 text-center text-xl font-semibold text-gray-800 dark:text-gray-100 focus:outline-none"
              onKeyDown={(e) => e.key === 'Enter' && handleUpdateName()}
            />
            <button onClick={handleUpdateName} disabled={isSavingName} className="text-green-500">
              {isSavingName ? <Loader2 size={18} className="animate-spin" /> : <Check size={18} />}
            </button>
            <button onClick={() => { setIsEditingName(false); setNewName(user.name); }} className="text-red-400">
              <X size={18} />
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-2 mt-2 group">
            <h2 className="playfair text-3xl text-gray-800 dark:text-gray-100">{user.name}</h2>
            <button 
              onClick={() => setIsEditingName(true)} 
              className="text-gray-300 group-hover:text-[#F472B6] transition-colors p-1"
            >
              <Edit2 size={16} />
            </button>
          </div>
        )}

        <p className="text-gray-400 text-sm font-medium uppercase tracking-[0.2em] mt-1">
          {user.isPremium ? 'Plus Member' : 'Free Explorer'}
        </p>
        
        {!user.isPremium && (
          <button 
            onClick={onUpgrade}
            className="mt-6 px-8 py-3 bg-[#F472B6] text-white rounded-full font-bold shadow-lg shadow-[#F472B6]/30 flex items-center gap-2 active:scale-95 transition-transform"
          >
            <Crown size={20} />
            Go Plus
          </button>
        )}
      </div>

      <div className="px-6 space-y-3">
        {menuItems.map((item, idx) => {
          const Icon = item.icon;
          return (
            <button
              key={idx}
              onClick={item.action}
              className="w-full flex items-center gap-4 p-5 bg-white dark:bg-gray-800 rounded-3xl shadow-sm border border-gray-50 dark:border-gray-700 transition-all active:scale-[0.98]"
            >
              <div className={`p-3 rounded-2xl ${item.bg} ${item.color}`}>
                <Icon size={20} />
              </div>
              <span className="font-bold text-gray-700 dark:text-gray-200">{item.label}</span>
              <ChevronRight className="ml-auto text-gray-300 dark:text-gray-600" size={20} />
            </button>
          );
        })}
      </div>

      <div className="mt-12 px-12 text-center pb-32">
        <h1 className="playfair text-xl text-[#F472B6] mb-1">She Goes</h1>
        <p className="text-gray-400 text-[10px] uppercase tracking-widest font-bold">Version 1.0.4 (Gold Edition)</p>
        <p className="text-gray-300 dark:text-gray-600 text-[10px] mt-4 leading-relaxed">
          Made with love for the dreamers.
        </p>
      </div>
    </div>
  );
};

export default Profile;
