import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  User, 
  Award, 
  Lock, 
  ShieldCheck, 
  Globe, 
  DollarSign, 
  Volume2, 
  VolumeX, 
  LogOut, 
  KeyRound, 
  ChevronRight,
  FileCheck2,
  CheckCircle2,
  Wallet
} from 'lucide-react';

export const ProfileScreen: React.FC = () => {
  const { 
    user, 
    formatMoney, 
    language, 
    setLanguage, 
    currency, 
    setCurrency, 
    soundEnabled, 
    setSoundEnabled, 
    logout,
    setCurrentScreen 
  } = useApp();

  const [showPinModal, setShowPinModal] = useState(false);
  const [newPin, setNewPin] = useState('');
  const [pinNotice, setPinNotice] = useState('');

  const handleUpdatePin = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPin.length !== 4) {
      setPinNotice(language === 'bn' ? 'পিন অবশ্যই ৪ সংখ্যার হতে হবে।' : 'PIN must be 4 digits.');
      return;
    }
    user.pinCode = newPin;
    setPinNotice(language === 'bn' ? 'ট্রানজেকশন পিন সফলভাবে আপডেট হয়েছে!' : 'Transaction PIN updated successfully!');
    setTimeout(() => {
      setShowPinModal(false);
      setPinNotice('');
      setNewPin('');
    }, 1500);
  };

  return (
    <div className="space-y-6 pb-20">
      
      {/* User Hero Identity Card */}
      <div className="rounded-3xl bg-gradient-to-br from-blue-700 via-blue-800 to-indigo-900 text-white p-6 sm:p-8 shadow-xl shadow-blue-900/15 relative overflow-hidden">
        <div className="absolute right-0 top-0 w-64 h-64 bg-white/10 rounded-full blur-2xl pointer-events-none" />
        
        <div className="flex items-center gap-4 relative z-10">
          <div className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center font-bold text-2xl text-white shadow-lg">
            {user.username.charAt(0)}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-bold text-white tracking-tight">{user.username}</h2>
              <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-amber-400 text-slate-900 flex items-center gap-1 shadow-xs">
                <Award className="w-3 h-3" /> VIP {user.vipLevel}
              </span>
            </div>
            <p className="text-xs text-blue-200 font-mono mt-0.5">{user.phone}</p>
            <span className="text-[10px] text-blue-300 font-mono block">ID: {user.id}</span>
          </div>
        </div>

        {/* 2-col balance details */}
        <div className="grid grid-cols-2 gap-3 mt-6 pt-5 border-t border-white/15 relative z-10">
          <div className="bg-white/10 backdrop-blur-xs p-3.5 rounded-2xl border border-white/10">
            <span className="text-[11px] text-blue-200 block">{language === 'bn' ? 'ওয়ালেট ব্যালেন্স' : 'Wallet Balance'}</span>
            <span className="text-xl font-bold font-mono text-white mt-0.5 block">{formatMoney(user.balance)}</span>
          </div>
          <div className="bg-white/10 backdrop-blur-xs p-3.5 rounded-2xl border border-white/10">
            <span className="text-[11px] text-blue-200 block">{language === 'bn' ? 'মোট কমিশন আয়' : 'Total Profit'}</span>
            <span className="text-xl font-bold font-mono text-amber-300 mt-0.5 block">+{formatMoney(user.totalCommission)}</span>
          </div>
        </div>

      </div>

      {/* Account & Security Section */}
      <div className="bg-white rounded-3xl border border-slate-200 p-5 shadow-xs space-y-2">
        <h3 className="font-bold text-slate-900 text-sm px-2 mb-3 flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-blue-600" />
          <span>{language === 'bn' ? 'অ্যাকাউন্ট নিরাপত্তা ও পিন' : 'Account Security & PIN'}</span>
        </h3>

        {/* Change Transaction PIN */}
        <button
          type="button"
          onClick={() => setShowPinModal(true)}
          className="w-full flex items-center justify-between p-3 rounded-2xl hover:bg-slate-50 text-slate-800 transition-colors cursor-pointer"
        >
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-blue-50 text-blue-600">
              <KeyRound className="w-4 h-4" />
            </div>
            <div className="text-left">
              <span className="text-xs font-bold block">{language === 'bn' ? 'উইথড্র ট্রানজেকশন পিন' : 'Transaction PIN'}</span>
              <span className="text-[11px] text-slate-500">
                {language === 'bn' ? '৪ ডিজিট নিরাপত্তা কোড পরিবর্তন করুন' : 'Change 4-digit withdrawal security PIN'}
              </span>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-400" />
        </button>

        {/* Bind Wallet / Account */}
        <button
          type="button"
          onClick={() => setCurrentScreen('withdraw')}
          className="w-full flex items-center justify-between p-3 rounded-2xl hover:bg-slate-50 text-slate-800 transition-colors cursor-pointer"
        >
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-emerald-50 text-emerald-600">
              <Wallet className="w-4 h-4" />
            </div>
            <div className="text-left">
              <span className="text-xs font-bold block">{language === 'bn' ? 'পেমেন্ট মেথড ম্যানেজমেন্ট' : 'Payment Method Binding'}</span>
              <span className="text-[11px] text-slate-500">
                {language === 'bn' ? 'বিকাশ, নগদ বা ইউএসডিটি ওয়ালেট সেট করুন' : 'Manage bKash, Nagad, or USDT address'}
              </span>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-400" />
        </button>

      </div>

      {/* Preferences Section */}
      <div className="bg-white rounded-3xl border border-slate-200 p-5 shadow-xs space-y-2">
        <h3 className="font-bold text-slate-900 text-sm px-2 mb-3">
          {language === 'bn' ? 'অ্যাপ্লিকেশন সেটিংস' : 'Preferences'}
        </h3>

        {/* Language switch */}
        <div className="flex items-center justify-between p-3 rounded-2xl hover:bg-slate-50 transition-colors">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-slate-100 text-slate-700">
              <Globe className="w-4 h-4" />
            </div>
            <div>
              <span className="text-xs font-bold text-slate-800 block">{language === 'bn' ? 'ভাষা নির্বাচন (Language)' : 'Language'}</span>
              <span className="text-[11px] text-slate-500">{language === 'bn' ? 'বাংলা ও ইংরেজি সাপোর্ট' : 'Bangla and English'}</span>
            </div>
          </div>
          <div className="flex p-1 bg-slate-100 rounded-xl">
            <button
              onClick={() => setLanguage('bn')}
              className={`px-3 py-1 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                language === 'bn' ? 'bg-blue-600 text-white' : 'text-slate-600'
              }`}
            >
              বাংলা
            </button>
            <button
              onClick={() => setLanguage('en')}
              className={`px-3 py-1 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                language === 'en' ? 'bg-blue-600 text-white' : 'text-slate-600'
              }`}
            >
              EN
            </button>
          </div>
        </div>

        {/* Currency switch */}
        <div className="flex items-center justify-between p-3 rounded-2xl hover:bg-slate-50 transition-colors">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-slate-100 text-slate-700">
              <DollarSign className="w-4 h-4" />
            </div>
            <div>
              <span className="text-xs font-bold text-slate-800 block">{language === 'bn' ? 'মুদ্রা (Currency)' : 'Currency'}</span>
              <span className="text-[11px] text-slate-500">BDT (৳) / USD ($)</span>
            </div>
          </div>
          <div className="flex p-1 bg-slate-100 rounded-xl">
            <button
              onClick={() => setCurrency('BDT')}
              className={`px-3 py-1 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                currency === 'BDT' ? 'bg-blue-600 text-white' : 'text-slate-600'
              }`}
            >
              ৳ BDT
            </button>
            <button
              onClick={() => setCurrency('USD')}
              className={`px-3 py-1 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                currency === 'USD' ? 'bg-blue-600 text-white' : 'text-slate-600'
              }`}
            >
              $ USD
            </button>
          </div>
        </div>

        {/* Sound toggle */}
        <div className="flex items-center justify-between p-3 rounded-2xl hover:bg-slate-50 transition-colors">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-slate-100 text-slate-700">
              {soundEnabled ? <Volume2 className="w-4 h-4 text-blue-600" /> : <VolumeX className="w-4 h-4" />}
            </div>
            <div>
              <span className="text-xs font-bold text-slate-800 block">{language === 'bn' ? 'অর্ডার সাউন্ড ইফেক্ট' : 'Order Grabbing Sound'}</span>
              <span className="text-[11px] text-slate-500">{soundEnabled ? (language === 'bn' ? 'সক্রিয় (Active)' : 'Active') : (language === 'bn' ? 'নিষ্ক্রিয় (Muted)' : 'Muted')}</span>
            </div>
          </div>
          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className={`w-11 h-6 rounded-full transition-colors p-1 cursor-pointer ${
              soundEnabled ? 'bg-blue-600' : 'bg-slate-300'
            }`}
          >
            <div className={`w-4 h-4 rounded-full bg-white transition-transform ${soundEnabled ? 'translate-x-5' : ''}`} />
          </button>
        </div>

      </div>

      {/* Logout Button */}
      <button
        type="button"
        onClick={logout}
        className="w-full py-3.5 px-4 rounded-2xl bg-slate-100 hover:bg-rose-50 text-slate-700 hover:text-rose-600 font-bold text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer border border-slate-200 hover:border-rose-200"
      >
        <LogOut className="w-4 h-4" />
        <span>{language === 'bn' ? 'অ্যাকাউন্ট থেকে লগআউট করুন' : 'Sign Out'}</span>
      </button>

      {/* Security PIN Change Modal */}
      {showPinModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl border border-slate-200 max-w-sm w-full p-6 shadow-2xl space-y-4">
            <h3 className="font-bold text-slate-900 text-base">
              {language === 'bn' ? 'ট্রানজেকশন পিন পরিবর্তন' : 'Update Transaction PIN'}
            </h3>
            <p className="text-xs text-slate-500">
              {language === 'bn' ? 'উইথড্র করার জন্য আপনার ৪ সংখ্যার গোপন পিন সেট করুন।' : 'Set your 4-digit secret PIN required for withdrawals.'}
            </p>

            {pinNotice && (
              <div className="p-3 bg-blue-50 text-blue-700 rounded-xl text-xs font-medium">
                {pinNotice}
              </div>
            )}

            <form onSubmit={handleUpdatePin} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  {language === 'bn' ? 'নতুন ৪ ডিজিট পিন' : 'New 4-Digit PIN'}
                </label>
                <input
                  type="password"
                  maxLength={4}
                  value={newPin}
                  onChange={(e) => setNewPin(e.target.value)}
                  placeholder="••••"
                  required
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-center tracking-widest font-mono text-lg font-bold text-slate-900"
                />
              </div>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setShowPinModal(false)}
                  className="flex-1 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-50"
                >
                  {language === 'bn' ? 'বাতিল' : 'Cancel'}
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-xs"
                >
                  {language === 'bn' ? 'সংরক্ষণ করুন' : 'Save PIN'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
