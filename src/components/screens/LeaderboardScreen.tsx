import React from 'react';
import { useApp } from '../../context/AppContext';
import { TopEarnersLeaderboard } from '../leaderboard/TopEarnersLeaderboard';
import { 
  Trophy, 
  Crown, 
  Sparkles, 
  ArrowLeft, 
  ShieldCheck, 
  Zap, 
  Award,
  Users,
  CheckCircle2
} from 'lucide-react';

export const LeaderboardScreen: React.FC = () => {
  const { setCurrentScreen, language, formatMoney } = useApp();

  return (
    <div className="space-y-6 pb-24">
      
      {/* Top Navigation & Breadcrumb */}
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={() => setCurrentScreen('home')}
          className="flex items-center gap-2 text-xs font-semibold text-slate-600 hover:text-blue-600 transition-colors cursor-pointer p-1"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{language === 'bn' ? 'হোমে ফিরে যান' : 'Back to Home'}</span>
        </button>

        <button
          type="button"
          onClick={() => setCurrentScreen('room-alibaba')}
          className="py-1.5 px-3 rounded-xl bg-blue-50 text-blue-700 hover:bg-blue-100 font-bold text-xs flex items-center gap-1.5 border border-blue-200 transition-all cursor-pointer"
        >
          <Zap className="w-3.5 h-3.5" />
          <span>{language === 'bn' ? 'অর্ডার রুম খুলুন' : 'Open Order Room'}</span>
        </button>
      </div>

      {/* Monthly Prize Pool & Trust Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-amber-500 via-amber-600 to-indigo-900 text-white p-6 sm:p-8 shadow-xl shadow-amber-900/15">
        <div className="absolute right-0 top-0 w-80 h-full bg-white/10 blur-3xl pointer-events-none" />
        
        <div className="relative z-10 max-w-2xl space-y-2">
          <span className="text-xs font-extrabold uppercase tracking-widest text-amber-200 flex items-center gap-1.5">
            <Crown className="w-4 h-4 fill-amber-300" />
            {language === 'bn' ? 'মাসিক শীর্ষ পারফর্মার অ্যাওয়ার্ড পুল' : 'Monthly Affiliate Championship Reward'}
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            {language === 'bn' 
              ? 'সেরা ৩ জন অ্যাফিলিয়েটের জন্য ৳৫০,০০০ অতিরিক্ত বোনাস পুল' 
              : '$400 Extra Prize Pool for Monthly Top 3 Champions'}
          </h1>
          <p className="text-xs sm:text-sm text-amber-100/90 leading-relaxed">
            {language === 'bn'
              ? 'প্রতি মাসের শেষে লিডারবোর্ডের শীর্ষ ৩ জন সদস্যকে অতিরিক্ত নগদ বোনাস বিকাশ, নগদ বা ইউএসডিটিতে সরাসরি প্রদান করা হয়।'
              : 'At the end of every calendar month, top 3 affiliates on the leaderboard receive guaranteed bonus prizes directly disbursed to their verified wallets.'}
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-3 text-xs font-semibold">
            <div className="flex items-center gap-1.5 bg-black/20 backdrop-blur-xs px-3 py-1.5 rounded-xl border border-white/20">
              <span>🥇 ১ম স্থান: {formatMoney(200)}</span>
            </div>
            <div className="flex items-center gap-1.5 bg-black/20 backdrop-blur-xs px-3 py-1.5 rounded-xl border border-white/20">
              <span>🥈 ২য় স্থান: {formatMoney(120)}</span>
            </div>
            <div className="flex items-center gap-1.5 bg-black/20 backdrop-blur-xs px-3 py-1.5 rounded-xl border border-white/20">
              <span>🥉 ৩য় স্থান: {formatMoney(80)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Leaderboard Component */}
      <TopEarnersLeaderboard onNavigateToGrab={() => setCurrentScreen('room-alibaba')} />

      {/* How to Rank Higher Guide (Trust & Motivation) */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 space-y-4 shadow-xs">
        <div className="flex items-center gap-2">
          <Award className="w-5 h-5 text-blue-600" />
          <h3 className="font-bold text-slate-900 text-base">
            {language === 'bn' ? 'কীভাবে লিডারবোর্ডের শীর্ষে পৌঁছাবেন?' : 'How to Climb to the Top of the Leaderboard?'}
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-1.5">
            <div className="text-xs font-bold text-blue-600 font-mono">STEP 01</div>
            <h4 className="font-bold text-slate-900 text-sm">
              {language === 'bn' ? 'প্রতিদিন ২৫টি অর্ডার কোটা পূর্ণ করুন' : 'Complete Daily 25 Orders Quota'}
            </h4>
            <p className="text-xs text-slate-500">
              {language === 'bn'
                ? 'প্রতিটি সফল অর্ডার গ্র্যাবে আলিবাবা, আমাজন ও আলিএক্সপ্রেস থেকে নিশ্চিত ৪% থেকে ১২% ক্যাশব্যাক জমা হয়।'
                : 'Fulfill all 25 daily orders across Alibaba, Amazon, and AliExpress rooms to maximize daily cashback.'}
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-1.5">
            <div className="text-xs font-bold text-blue-600 font-mono">STEP 02</div>
            <h4 className="font-bold text-slate-900 text-sm">
              {language === 'bn' ? 'VIP লেভেল আপগ্রেড করুন' : 'Upgrade Merchant VIP Level'}
            </h4>
            <p className="text-xs text-slate-500">
              {language === 'bn'
                ? 'ব্যালেন্স $১০০+ বা $৩০০+ এ উন্নীত করে আমাজন ৮% বা আলিএক্সপ্রেস ১২% হাই-ভ্যালু কমিশন রুমে অংশ নিন।'
                : 'Boost your balance to enter Amazon 8% or AliExpress 12% rooms for substantially higher commissions.'}
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-1.5">
            <div className="text-xs font-bold text-blue-600 font-mono">STEP 03</div>
            <h4 className="font-bold text-slate-900 text-sm">
              {language === 'bn' ? 'টিম রেফারেল রিবেট বৃদ্ধি করুন' : 'Expand Affiliate Referral Team'}
            </h4>
            <p className="text-xs text-slate-500">
              {language === 'bn'
                ? 'আপনার টিম মেম্বারদের দৈনিক আয়ের উপর ১০% + ৫% + ২% প্যাসিভ রিবেট স্বয়ংক্রিয়ভাবে ব্যালেন্সে যুক্ত হয়।'
                : 'Earn 10% Level 1, 5% Level 2, and 2% Level 3 perpetual rebates on all invited members orders.'}
            </p>
          </div>
        </div>
      </div>

    </div>
  );
};
