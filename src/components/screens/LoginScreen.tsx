import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ShieldCheck, Phone, Lock, UserPlus, ArrowRight, CheckCircle2 } from 'lucide-react';

export const LoginScreen: React.FC = () => {
  const { login, language } = useApp();
  const [isRegister, setIsRegister] = useState(false);
  const [phone, setPhone] = useState('01712345678');
  const [password, setPassword] = useState('******');
  const [inviteCode, setInviteCode] = useState('VIP9928');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(phone);
  };

  const handleQuickDemo = () => {
    login('01712-345678');
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center py-8 px-4">
      <div className="w-full max-w-md bg-white rounded-3xl border border-slate-200 shadow-xl shadow-blue-900/5 p-6 sm:p-8">
        
        {/* Brand Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-blue-700 to-sky-500 text-white flex items-center justify-center font-bold text-3xl mx-auto shadow-lg shadow-blue-600/25 mb-4">
            B
          </div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            {isRegister 
              ? (language === 'bn' ? 'নতুন অ্যাকাউন্ট খুলুন' : 'Create New Account')
              : (language === 'bn' ? 'অ্যাকাউন্টে লগইন করুন' : 'Sign In to BlueOrder')}
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            {language === 'bn' 
              ? 'দৈনিক ২৫টি অর্ডারে ৪% থেকে ১২% পর্যন্ত নিশ্চিত কমিশন'
              : 'Earn 4% to 12% guaranteed commission on 25 daily orders'}
          </p>
        </div>

        {/* Tab switch */}
        <div className="flex p-1 bg-slate-100 rounded-xl mb-6">
          <button
            type="button"
            onClick={() => setIsRegister(false)}
            className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
              !isRegister ? 'bg-white text-blue-700 shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            {language === 'bn' ? 'লগইন (Sign In)' : 'Sign In'}
          </button>
          <button
            type="button"
            onClick={() => setIsRegister(true)}
            className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
              isRegister ? 'bg-white text-blue-700 shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            {language === 'bn' ? 'নিবন্ধন (Sign Up)' : 'Sign Up'}
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              {language === 'bn' ? 'মোবাইল নম্বর' : 'Mobile Number'}
            </label>
            <div className="relative flex items-center">
              <span className="absolute left-3 text-xs font-semibold text-slate-500 border-r border-slate-200 pr-2">
                +880
              </span>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="17XXXXXXXX"
                required
                className="w-full pl-20 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-all text-slate-900"
              />
              <Phone className="w-4 h-4 text-slate-400 absolute right-3 pointer-events-none" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              {language === 'bn' ? 'পাসওয়ার্ড' : 'Password'}
            </label>
            <div className="relative flex items-center">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-all text-slate-900"
              />
              <Lock className="w-4 h-4 text-slate-400 absolute right-3 pointer-events-none" />
            </div>
          </div>

          {isRegister && (
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                {language === 'bn' ? 'ইনভাইট কোড (অপশনাল)' : 'Invitation Code (Optional)'}
              </label>
              <div className="relative flex items-center">
                <input
                  type="text"
                  value={inviteCode}
                  onChange={(e) => setInviteCode(e.target.value)}
                  placeholder="VIP9928"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-all text-slate-900 font-mono"
                />
                <UserPlus className="w-4 h-4 text-slate-400 absolute right-3 pointer-events-none" />
              </div>
            </div>
          )}

          <button
            type="submit"
            className="w-full py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm transition-all shadow-md shadow-blue-600/25 flex items-center justify-center gap-2 cursor-pointer mt-2"
          >
            <span>{isRegister ? (language === 'bn' ? 'অ্যাকাউন্ট তৈরি করুন' : 'Register Now') : (language === 'bn' ? 'লগইন করুন' : 'Sign In')}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Quick Demo Login Shortcut */}
        <div className="mt-6 pt-5 border-t border-slate-100 text-center">
          <p className="text-xs text-slate-500 mb-3">
            {language === 'bn' ? 'অ্যাপটি অবিলম্বে পরীক্ষা করতে ডেমো অ্যাকাউন্টে প্রবেশ করুন:' : 'Quickly test the platform with ready demo VIP account:'}
          </p>
          <button
            type="button"
            onClick={handleQuickDemo}
            className="w-full py-2.5 px-4 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-700 font-semibold text-xs border border-blue-200 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <CheckCircle2 className="w-4 h-4 text-blue-600" />
            <span>{language === 'bn' ? '১-ক্লিকে ডেমো অ্যাকাউন্টে প্রবেশ করুন ($৩৪৫ ব্যালেন্স)' : '1-Click Demo Login ($345 Balance)'}</span>
          </button>
        </div>

        {/* Security badge */}
        <div className="mt-6 flex items-center justify-center gap-2 text-xs text-slate-400">
          <ShieldCheck className="w-4 h-4 text-emerald-500" />
          <span>SSL 256-Bit Encrypted & Verified Server</span>
        </div>

      </div>
    </div>
  );
};
