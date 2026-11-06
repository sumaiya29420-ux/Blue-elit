import React from 'react';
import { useApp } from '../context/AppContext';
import { Volume2, VolumeX, Eye, Smartphone, Globe, DollarSign } from 'lucide-react';
import { ScreenId } from '../types';

export const Header: React.FC = () => {
  const { 
    currentScreen, 
    setCurrentScreen, 
    viewMode, 
    setViewMode, 
    language, 
    setLanguage, 
    currency, 
    setCurrency, 
    soundEnabled, 
    setSoundEnabled 
  } = useApp();

  const navLinks: { id: ScreenId; labelBn: string; labelEn: string }[] = [
    { id: 'home', labelBn: 'হোম', labelEn: 'Home' },
    { id: 'leaderboard', labelBn: 'লিডারবোর্ড', labelEn: 'Leaderboard' },
    { id: 'room-alibaba', labelBn: 'আলিবাবা (৪%)', labelEn: 'Alibaba (4%)' },
    { id: 'room-amazon', labelBn: 'আমাজন (৮%)', labelEn: 'Amazon (8%)' },
    { id: 'room-aliexpress', labelBn: 'আলিএক্সপ্রেস (১২%)', labelEn: 'AliExpress (12%)' },
    { id: 'records', labelBn: 'অর্ডার রেকর্ড', labelEn: 'Records' },
    { id: 'invite', labelBn: 'টিম ইনভাইট', labelEn: 'Invite' },
    { id: 'support', labelBn: 'সাপোর্ট', labelEn: 'Support' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        
        {/* Zone 1: Brand Wordmark (Single text element) */}
        <div 
          onClick={() => { setCurrentScreen('home'); setViewMode('interactive'); }}
          className="cursor-pointer flex items-center gap-2 select-none shrink-0"
        >
          <div className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold text-lg shadow-md shadow-blue-500/20">
            B
          </div>
          <div>
            <span className="text-lg font-bold tracking-tight text-blue-900 leading-none">
              BlueOrder<span className="text-blue-600">Pro</span>
            </span>
            <div className="text-[10px] text-blue-600 font-medium tracking-wider uppercase">
              {language === 'bn' ? 'কমিশন প্ল্যাটফর্ম' : 'Commission Platform'}
            </div>
          </div>
        </div>

        {/* Zone 2: Navigation Links (Single-line, concise) */}
        <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-slate-600">
          {navLinks.map(link => {
            const isActive = currentScreen === link.id && viewMode === 'interactive';
            return (
              <button
                key={link.id}
                onClick={() => {
                  setCurrentScreen(link.id);
                  setViewMode('interactive');
                }}
                className={`transition-colors whitespace-nowrap cursor-pointer py-1 ${
                  isActive 
                    ? 'text-blue-600 font-semibold border-b-2 border-blue-600' 
                    : 'text-slate-600 hover:text-blue-600'
                }`}
              >
                {language === 'bn' ? link.labelBn : link.labelEn}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: Primary Utility Controls */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          
          {/* Toggle All Screens Gallery vs Single App View */}
          <button
            onClick={() => setViewMode(viewMode === 'interactive' ? 'gallery' : 'interactive')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              viewMode === 'gallery'
                ? 'bg-blue-600 text-white shadow-sm shadow-blue-600/30'
                : 'bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200'
            }`}
            title={language === 'bn' ? 'সবগুলো স্ক্রিন একসঙ্গে দেখুন' : 'View all screens overview'}
          >
            {viewMode === 'gallery' ? (
              <>
                <Smartphone className="w-3.5 h-3.5" />
                <span className="whitespace-nowrap">{language === 'bn' ? 'অ্যাপ মোড' : 'App Mode'}</span>
              </>
            ) : (
              <>
                <Eye className="w-3.5 h-3.5" />
                <span className="whitespace-nowrap">{language === 'bn' ? 'একসঙ্গে সব স্ক্রিন' : 'All Screens'}</span>
              </>
            )}
          </button>

          {/* Currency Switcher */}
          <button
            onClick={() => setCurrency(currency === 'BDT' ? 'USD' : 'BDT')}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-medium bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer"
            title="Switch Currency (BDT / USD)"
          >
            <DollarSign className="w-3.5 h-3.5 text-blue-600" />
            <span className="font-semibold">{currency}</span>
          </button>

          {/* Language Switcher */}
          <button
            onClick={() => setLanguage(language === 'bn' ? 'en' : 'bn')}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-medium bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer"
            title="Language"
          >
            <Globe className="w-3.5 h-3.5 text-blue-600" />
            <span>{language === 'bn' ? 'EN' : 'বাং'}</span>
          </button>

          {/* Sound Mute/Unmute */}
          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className="p-1.5 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors cursor-pointer"
            title={soundEnabled ? 'Sound On' : 'Sound Muted'}
          >
            {soundEnabled ? <Volume2 className="w-4 h-4 text-blue-600" /> : <VolumeX className="w-4 h-4 text-slate-400" />}
          </button>
        </div>

      </div>
    </header>
  );
};
