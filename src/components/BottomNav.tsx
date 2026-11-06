import React from 'react';
import { useApp } from '../context/AppContext';
import { Home, Zap, FileText, Users, User } from 'lucide-react';
import { ScreenId } from '../types';

export const BottomNav: React.FC = () => {
  const { currentScreen, setCurrentScreen, viewMode, setViewMode, language } = useApp();

  const tabs: { id: ScreenId; labelBn: string; labelEn: string; icon: React.FC<{ className?: string }> }[] = [
    { id: 'home', labelBn: 'হোম', labelEn: 'Home', icon: Home },
    { id: 'room-alibaba', labelBn: 'গ্র্যাব', labelEn: 'Grab', icon: Zap },
    { id: 'records', labelBn: 'রেকর্ড', labelEn: 'Records', icon: FileText },
    { id: 'invite', labelBn: 'টিম', labelEn: 'Team', icon: Users },
    { id: 'profile', labelBn: 'প্রোফাইল', labelEn: 'Profile', icon: User },
  ];

  const isRoomActive = currentScreen.startsWith('room-');

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200">
      <div className="grid grid-cols-5 items-center h-16 max-w-md mx-auto">
        {tabs.map((tab) => {
          const isActive = (tab.id === 'room-alibaba' && isRoomActive) || currentScreen === tab.id;
          const Icon = tab.icon;

          return (
            <button
              key={tab.id}
              onClick={() => {
                setCurrentScreen(tab.id);
                if (viewMode === 'gallery') setViewMode('interactive');
              }}
              className="min-h-[48px] min-w-[48px] flex flex-col items-center justify-center py-1 transition-colors group cursor-pointer"
            >
              <div
                className={`p-1 rounded-xl transition-all ${
                  isActive
                    ? 'text-blue-600 bg-blue-50 transform -translate-y-0.5'
                    : 'text-slate-500 group-hover:text-blue-600'
                }`}
              >
                <Icon className="w-5 h-5" />
              </div>
              <span
                className={`text-[11px] font-medium tracking-tight mt-0.5 whitespace-nowrap ${
                  isActive ? 'text-blue-600 font-semibold' : 'text-slate-500'
                }`}
              >
                {language === 'bn' ? tab.labelBn : tab.labelEn}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
