import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Users, 
  Copy, 
  Check, 
  QrCode, 
  Share2, 
  Sparkles, 
  Award,
  TrendingUp,
  UserCheck
} from 'lucide-react';

export const InviteScreen: React.FC = () => {
  const { user, formatMoney, language } = useApp();
  const [copiedCode, setCopiedCode] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  const inviteLink = `https://blueorder.pro/register?ref=${user.inviteCode}`;

  const copyCode = () => {
    navigator.clipboard.writeText(user.inviteCode);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const copyLink = () => {
    navigator.clipboard.writeText(inviteLink);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const teamMembers = [
    { name: 'Rafiqul I.', phone: '01819-***421', level: 'Level 1 (10%)', date: '2026-11-05', todayOrders: '25/25', earned: 3.20 },
    { name: 'Tanvir Ahmed', phone: '01711-***882', level: 'Level 1 (10%)', date: '2026-11-04', todayOrders: '25/25', earned: 4.10 },
    { name: 'Kamrul Hasan', phone: '01923-***105', level: 'Level 2 (5%)', date: '2026-11-03', todayOrders: '22/25', earned: 1.85 },
    { name: 'Sumon Mia', phone: '01684-***790', level: 'Level 3 (2%)', date: '2026-11-02', todayOrders: '25/25', earned: 0.95 },
  ];

  return (
    <div className="space-y-6 pb-20">
      
      {/* Title */}
      <div>
        <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
          <Users className="w-5 h-5 text-indigo-600" />
          <span>{language === 'bn' ? 'বন্ধু আমন্ত্রণ ও টিম কমিশন' : 'Invite Friends & Team Rebates'}</span>
        </h2>
        <p className="text-xs text-slate-500">
          {language === 'bn' 
            ? '৩-লেভেল আজীবন কমিশন রিবেটের মাধ্যমে প্রতিদিন প্যাসিভ ইনকাম নিশ্চিত করুন' 
            : 'Earn 3-tier lifetime dividends from your team members daily orders'}
        </p>
      </div>

      {/* Main Invite Hero Card */}
      <div className="rounded-3xl bg-gradient-to-br from-indigo-700 via-blue-700 to-sky-700 text-white p-6 sm:p-8 shadow-xl shadow-blue-900/15 relative overflow-hidden">
        <div className="absolute right-0 top-0 w-64 h-64 bg-white/10 rounded-full blur-2xl pointer-events-none" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 relative z-10">
          <div className="text-center sm:text-left space-y-2">
            <span className="text-xs font-semibold text-blue-200 uppercase tracking-wider flex items-center justify-center sm:justify-start gap-1">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" /> {language === 'bn' ? 'টিম লিডার প্রোগ্রাম' : 'Team Leader Program'}
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-white">
              {language === 'bn' ? '১০% + ৫% + ২% কমিশন শেয়ারিং' : '10% + 5% + 2% Tier Commission'}
            </h3>
            <p className="text-xs text-blue-100 max-w-sm">
              {language === 'bn' 
                ? 'আপনার আমন্ত্রিত বন্ধুরা প্রতিদিন যত অর্ডার কমিশন আয় করবেন, তার একটি শতাংশ সরাসরি আপনার ওয়ালেটে আসবে।' 
                : 'Every time your downline members complete daily orders, you receive automated passive rebate.'}
            </p>
          </div>

          {/* Clean stylized QR Code */}
          <div className="bg-white p-4 rounded-2xl shadow-lg text-slate-900 flex flex-col items-center shrink-0">
            <div className="w-28 h-28 bg-slate-100 rounded-xl p-2 flex items-center justify-center border border-slate-200">
              <QrCode className="w-24 h-24 text-blue-900" />
            </div>
            <span className="text-[10px] font-mono font-bold text-slate-600 mt-2">SCAN TO JOIN</span>
          </div>
        </div>

        {/* Copy Invite Code & Link Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-6 pt-5 border-t border-white/20 relative z-10">
          
          {/* Invite Code Box */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-3 border border-white/20 flex items-center justify-between">
            <div>
              <span className="text-[10px] text-blue-200 block">{language === 'bn' ? 'আমার ইনভাইট কোড:' : 'Invite Code:'}</span>
              <span className="font-mono font-black text-white text-base tracking-widest">{user.inviteCode}</span>
            </div>
            <button
              onClick={copyCode}
              className="py-1.5 px-3 rounded-xl bg-white text-blue-800 text-xs font-bold hover:bg-blue-50 transition-colors flex items-center gap-1 cursor-pointer shadow-xs"
            >
              {copiedCode ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedCode ? (language === 'bn' ? 'কপি হয়েছে' : 'Copied') : (language === 'bn' ? 'কোড কপি' : 'Copy')}</span>
            </button>
          </div>

          {/* Invite Link Box */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-3 border border-white/20 flex items-center justify-between">
            <div className="min-w-0 flex-1 mr-2">
              <span className="text-[10px] text-blue-200 block">{language === 'bn' ? 'রেফারেল লিঙ্ক:' : 'Referral Link:'}</span>
              <span className="font-mono text-xs text-white truncate block opacity-90">{inviteLink}</span>
            </div>
            <button
              onClick={copyLink}
              className="py-1.5 px-3 rounded-xl bg-amber-400 text-slate-900 text-xs font-bold hover:bg-amber-300 transition-colors flex items-center gap-1 cursor-pointer shadow-xs shrink-0"
            >
              {copiedLink ? <Check className="w-3.5 h-3.5" /> : <Share2 className="w-3.5 h-3.5" />}
              <span>{copiedLink ? (language === 'bn' ? 'কপি হয়েছে' : 'Copied') : (language === 'bn' ? 'লিঙ্ক কপি' : 'Share')}</span>
            </button>
          </div>

        </div>

      </div>

      {/* Team Performance Stats Strip */}
      <div className="grid grid-cols-3 gap-3">
        <div className="bg-white p-4 rounded-3xl border border-slate-200 text-center shadow-xs">
          <span className="text-[11px] text-slate-500 font-medium block">{language === 'bn' ? 'মোট টিম মেম্বার' : 'Team Members'}</span>
          <span className="text-xl sm:text-2xl font-black text-slate-900 font-mono mt-0.5 block">{user.teamCount}</span>
          <span className="text-[10px] text-emerald-600 font-semibold">{language === 'bn' ? '১৪ জন সক্রিয়' : '14 Active'}</span>
        </div>

        <div className="bg-white p-4 rounded-3xl border border-slate-200 text-center shadow-xs">
          <span className="text-[11px] text-slate-500 font-medium block">{language === 'bn' ? 'আজকের টিম রিবেট' : "Today's Rebate"}</span>
          <span className="text-xl sm:text-2xl font-black text-emerald-600 font-mono mt-0.5 block">
            +{formatMoney(12.33)}
          </span>
          <span className="text-[10px] text-slate-400">{language === 'bn' ? 'অটো ক্রেডিট' : 'Auto Credited'}</span>
        </div>

        <div className="bg-white p-4 rounded-3xl border border-slate-200 text-center shadow-xs">
          <span className="text-[11px] text-slate-500 font-medium block">{language === 'bn' ? 'মোট টিম ইনকাম' : 'Total Rebate'}</span>
          <span className="text-xl sm:text-2xl font-black text-blue-700 font-mono mt-0.5 block">
            +{formatMoney(user.teamCommission)}
          </span>
          <span className="text-[10px] text-slate-400">{language === 'bn' ? 'লাইফটাইম' : 'Lifetime'}</span>
        </div>
      </div>

      {/* 3 Tier Rebate Explanation Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <div className="bg-white p-4 rounded-2xl border border-blue-200 shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="font-bold text-xs text-blue-900">{language === 'bn' ? 'লেভেল ১ (সরাসরি)' : 'Tier 1 (Direct)'}</span>
            <span className="font-mono font-black text-blue-600 text-sm">১০%</span>
          </div>
          <p className="text-xs text-slate-500">
            {language === 'bn' ? 'আপনার লিঙ্কের মাধ্যমে সরাসরি যোগদানকারী সকল সদস্যের প্রতিদিনের ২৫টি অর্ডারের কমিশনের ১০% পাবেন।' : '10% of all commission earned by your directly invited members.'}
          </p>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-indigo-200 shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="font-bold text-xs text-indigo-900">{language === 'bn' ? 'লেভেল ২ (সেকেন্ডারি)' : 'Tier 2 (Secondary)'}</span>
            <span className="font-mono font-black text-indigo-600 text-sm">৫%</span>
          </div>
          <p className="text-xs text-slate-500">
            {language === 'bn' ? 'লেভেল ১ সদস্যদের দ্বারা আমন্ত্রিত সদস্যদের কমিশনের ৫% কমিশন স্বয়ংক্রিয়ভাবে পাবেন।' : '5% commission earned by members invited by your tier 1 team.'}
          </p>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-sky-200 shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="font-bold text-xs text-sky-900">{language === 'bn' ? 'লেভেল ৩ (টিম রিবেট)' : 'Tier 3 (Extended)'}</span>
            <span className="font-mono font-black text-sky-600 text-sm">২%</span>
          </div>
          <p className="text-xs text-slate-500">
            {language === 'bn' ? 'লেভেল ২ সদস্যদের নিচের সদস্যদের দৈনিক অর্ডার আয়ের ২% আপনার ওয়ালেটে জমা হবে।' : '2% continuous commission from third tier sub-members.'}
          </p>
        </div>
      </div>

      {/* Team Member List */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
            <UserCheck className="w-4 h-4 text-blue-600" />
            <span>{language === 'bn' ? 'টিম মেম্বারদের সাম্প্রতিক অগ্রগতি' : 'Recent Downline Activity'}</span>
          </h3>
          <span className="text-xs text-slate-400 font-mono">18 Members</span>
        </div>

        <div className="divide-y divide-slate-100">
          {teamMembers.map((m, idx) => (
            <div key={idx} className="py-3 flex items-center justify-between text-xs">
              <div className="space-y-0.5">
                <span className="font-bold text-slate-900 block">{m.name}</span>
                <span className="text-[11px] text-slate-400 font-mono">{m.phone} · {m.level}</span>
              </div>
              <div className="text-right space-y-0.5">
                <span className="font-mono font-semibold text-slate-700 block">{m.todayOrders} {language === 'bn' ? 'অর্ডার' : 'Orders'}</span>
                <span className="font-mono font-bold text-emerald-600 text-xs">+{formatMoney(m.earned)}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
