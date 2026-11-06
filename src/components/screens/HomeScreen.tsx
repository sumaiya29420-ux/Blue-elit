import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  ArrowDownLeft, 
  ArrowUpRight, 
  Users, 
  FileText, 
  Zap, 
  ChevronRight, 
  ShieldCheck, 
  Award,
  Sparkles,
  TrendingUp,
  Clock,
  Trophy
} from 'lucide-react';
import { PLATFORMS, BANNER_IMAGE } from '../../data/mockData';
import { PlatformTier } from '../../types';
import { TopEarnersLeaderboard } from '../leaderboard/TopEarnersLeaderboard';
import { DailyMissions } from '../DailyMissions';

export const HomeScreen: React.FC = () => {
  const { 
    user, 
    setCurrentScreen, 
    setActiveRoom, 
    formatMoney, 
    language 
  } = useApp();

  const handleEnterRoom = (platform: PlatformTier) => {
    setActiveRoom(platform);
    if (platform.id === 'alibaba') setCurrentScreen('room-alibaba');
    else if (platform.id === 'amazon') setCurrentScreen('room-amazon');
    else setCurrentScreen('room-aliexpress');
  };

  const progressPercent = Math.min(100, Math.round((user.todayOrdersCount / user.dailyOrderLimit) * 100));

  return (
    <div className="space-y-6 pb-20">
      
      {/* Wallet Balance Hero Card (Deep Royal Blue & Modern White) */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-700 via-blue-800 to-indigo-900 text-white p-6 sm:p-8 shadow-xl shadow-blue-900/15">
        
        {/* Background glow & subtle geometric shapes */}
        <div className="absolute -right-16 -top-16 w-56 h-56 rounded-full bg-sky-400/15 blur-3xl pointer-events-none" />
        <div className="absolute right-4 bottom-2 text-white/5 font-black text-8xl pointer-events-none select-none">
          25
        </div>

        {/* Top Header of Card */}
        <div className="flex items-center justify-between relative z-10">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center font-bold text-lg text-white">
              {user.username.charAt(0)}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-semibold text-white tracking-tight">{user.username}</span>
                <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-amber-400/90 text-slate-900 flex items-center gap-1 shadow-xs">
                  <Award className="w-3 h-3" /> VIP {user.vipLevel}
                </span>
              </div>
              <p className="text-xs text-blue-200 mt-0.5 font-mono">{user.phone}</p>
            </div>
          </div>
          <button 
            onClick={() => setCurrentScreen('profile')}
            className="text-xs px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-blue-100 transition-colors border border-white/10 cursor-pointer"
          >
            {language === 'bn' ? 'প্রোফাইল' : 'Profile'}
          </button>
        </div>

        {/* Balance Display */}
        <div className="mt-6 relative z-10">
          <div className="text-xs font-medium text-blue-200 flex items-center gap-1.5">
            <span>{language === 'bn' ? 'মোট উপলব্ধ ব্যালেন্স' : 'Available Wallet Balance'}</span>
            <span className="text-[10px] px-1.5 py-0.2 bg-emerald-500/30 text-emerald-300 rounded border border-emerald-400/30 font-mono">LIVE</span>
          </div>
          <div className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white mt-1 font-mono">
            {formatMoney(user.balance)}
          </div>
        </div>

        {/* 3-Col Quick Stats */}
        <div className="grid grid-cols-3 gap-2 mt-6 pt-5 border-t border-white/15 relative z-10 text-center">
          <div>
            <div className="text-[11px] text-blue-200">{language === 'bn' ? 'আজকের কমিশন' : "Today's Profit"}</div>
            <div className="text-sm sm:text-base font-bold text-white mt-0.5 font-mono">
              +{formatMoney(user.todayCommission)}
            </div>
          </div>
          <div>
            <div className="text-[11px] text-blue-200">{language === 'bn' ? 'মোট কমিশন আয়' : 'Total Profit'}</div>
            <div className="text-sm sm:text-base font-bold text-amber-300 mt-0.5 font-mono">
              +{formatMoney(user.totalCommission)}
            </div>
          </div>
          <div>
            <div className="text-[11px] text-blue-200">{language === 'bn' ? 'অর্ডার কোটা' : 'Daily Orders'}</div>
            <div className="text-sm sm:text-base font-bold text-sky-200 mt-0.5 font-mono">
              {user.todayOrdersCount} / {user.dailyOrderLimit}
            </div>
          </div>
        </div>

        {/* Daily Quota Progress Bar */}
        <div className="mt-4 relative z-10">
          <div className="flex items-center justify-between text-xs text-blue-200 mb-1">
            <span>{language === 'bn' ? 'দৈনিক ২৫টি অর্ডারের অগ্রগতি:' : 'Daily 25-Orders Progress:'}</span>
            <span className="font-semibold text-white font-mono">{progressPercent}%</span>
          </div>
          <div className="w-full h-2 rounded-full bg-blue-950/60 overflow-hidden border border-white/10">
            <div 
              className="h-full bg-gradient-to-r from-sky-400 to-amber-300 rounded-full transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

      </div>

      {/* 5 Quick Actions Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        <button
          onClick={() => setCurrentScreen('deposit')}
          className="flex flex-col items-center justify-center p-3 rounded-2xl bg-white border border-slate-200 hover:border-blue-300 hover:shadow-md hover:shadow-blue-500/10 transition-all group cursor-pointer"
        >
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center group-hover:scale-105 transition-transform mb-1.5">
            <ArrowDownLeft className="w-5 h-5" />
          </div>
          <span className="text-xs font-semibold text-slate-800">{language === 'bn' ? 'ডিপোজিট' : 'Deposit'}</span>
          <span className="text-[10px] text-slate-400">{language === 'bn' ? 'বিকাশ/নগদ' : 'Instant'}</span>
        </button>

        <button
          onClick={() => setCurrentScreen('withdraw')}
          className="flex flex-col items-center justify-center p-3 rounded-2xl bg-white border border-slate-200 hover:border-blue-300 hover:shadow-md hover:shadow-blue-500/10 transition-all group cursor-pointer"
        >
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center group-hover:scale-105 transition-transform mb-1.5">
            <ArrowUpRight className="w-5 h-5" />
          </div>
          <span className="text-xs font-semibold text-slate-800">{language === 'bn' ? 'উইথড্র' : 'Withdraw'}</span>
          <span className="text-[10px] text-slate-400">{language === 'bn' ? 'দ্রুত পেমেন্ট' : 'Fast Pay'}</span>
        </button>

        <button
          onClick={() => setCurrentScreen('leaderboard')}
          className="flex flex-col items-center justify-center p-3 rounded-2xl bg-white border border-amber-200 hover:border-amber-400 hover:shadow-md hover:shadow-amber-500/10 transition-all group cursor-pointer"
        >
          <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center group-hover:scale-105 transition-transform mb-1.5">
            <Trophy className="w-5 h-5 text-amber-500" />
          </div>
          <span className="text-xs font-semibold text-slate-800">{language === 'bn' ? 'টপ আর্নার্স' : 'Top Earners'}</span>
          <span className="text-[10px] text-amber-600 font-bold">{language === 'bn' ? 'লিডারবোর্ড' : 'Rankings'}</span>
        </button>

        <button
          onClick={() => setCurrentScreen('invite')}
          className="flex flex-col items-center justify-center p-3 rounded-2xl bg-white border border-slate-200 hover:border-blue-300 hover:shadow-md hover:shadow-blue-500/10 transition-all group cursor-pointer"
        >
          <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center group-hover:scale-105 transition-transform mb-1.5">
            <Users className="w-5 h-5" />
          </div>
          <span className="text-xs font-semibold text-slate-800">{language === 'bn' ? 'টিম ইনভাইট' : 'Team'}</span>
          <span className="text-[10px] text-indigo-500 font-semibold">১০% রিবেট</span>
        </button>

        <button
          onClick={() => setCurrentScreen('records')}
          className="flex flex-col items-center justify-center p-3 rounded-2xl bg-white border border-slate-200 hover:border-blue-300 hover:shadow-md hover:shadow-blue-500/10 transition-all group cursor-pointer col-span-2 sm:col-span-1"
        >
          <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center group-hover:scale-105 transition-transform mb-1.5">
            <FileText className="w-5 h-5" />
          </div>
          <span className="text-xs font-semibold text-slate-800">{language === 'bn' ? 'অর্ডার হিস্ট্রি' : 'Records'}</span>
          <span className="text-[10px] text-slate-400">{language === 'bn' ? 'সব তালিকা' : 'History'}</span>
        </button>
      </div>

      {/* Live Payout News Bulletin */}
      <div className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-blue-50/70 border border-blue-100 text-xs text-blue-900">
        <div className="p-1 rounded-lg bg-blue-600 text-white shrink-0">
          <Sparkles className="w-3.5 h-3.5" />
        </div>
        <div className="overflow-hidden whitespace-nowrap">
          <div className="inline-block animate-marquee font-medium">
            🔥 {language === 'bn' 
              ? 'ইউজার 018*** আলিবাবা থেকে ৳৩৮০ কমিশন আয় করেছেন • ইউজার 017*** আমাজন থেকে ৳১,৫২০ সফলভাবে উইথড্র করেছেন • নতুন সদস্যদের প্রথম ডিপোজিটে ১০% ওয়েলকাম বোনাস চালু রয়েছে!' 
              : 'User 018*** earned ৳380 commission on Alibaba • User 017*** withdrew ৳1,520 via Nagad • 10% Welcome Bonus on 1st deposit!'}
          </div>
        </div>
      </div>

      {/* Daily Affiliate Missions & Tasks */}
      <DailyMissions onNavigateToRoom={() => handleEnterRoom(PLATFORMS[0])} />

      {/* Promotional Hero Banner */}
      <div className="relative rounded-3xl overflow-hidden border border-slate-200 shadow-sm bg-slate-900">
        <img 
          src={BANNER_IMAGE} 
          alt="Modern E-Commerce Logistics" 
          className="w-full h-44 sm:h-52 object-cover opacity-90 hover:scale-102 transition-transform duration-500"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-900/40 to-transparent flex flex-col justify-end p-5 text-white">
          <span className="text-xs font-semibold text-sky-400 uppercase tracking-wider flex items-center gap-1.5">
            <TrendingUp className="w-3.5 h-3.5" /> {language === 'bn' ? 'গ্লোবাল ই-কমার্স নেটওয়ার্ক' : 'Global Fulfillment Network'}
          </span>
          <h2 className="text-lg sm:text-xl font-bold mt-1 text-white">
            {language === 'bn' ? 'প্রতিদিন ২৫টি নিশ্চিত অর্ডারে সর্বোচ্চ কমিশন লাভ করুন' : 'Guaranteed Daily 25 Order Quotas with Maximum Return'}
          </h2>
          <p className="text-xs text-slate-300 mt-1 line-clamp-1">
            {language === 'bn' ? 'আলিবাবা ৪%, আমাজন ৮%, আলিএক্সপ্রেস ১২% কমিশন রেট সরাসরি আপনার একাউন্টে।' : 'Alibaba 4%, Amazon 8%, AliExpress 12% real-time matching.'}
          </p>
        </div>
      </div>

      {/* Commission Rooms Section Header */}
      <div className="flex items-center justify-between pt-2">
        <div>
          <h3 className="text-base font-bold text-slate-900">
            {language === 'bn' ? 'অর্ডার গ্র্যাবিং কমিশন রুম' : 'Commission Order Rooms'}
          </h3>
          <p className="text-xs text-slate-500">
            {language === 'bn' ? 'আপনার লেভেল অনুযায়ী যেকোনো রুমে প্রবেশ করুন' : 'Select a merchant room based on your VIP level'}
          </p>
        </div>
        <button 
          onClick={() => setCurrentScreen('commission')}
          className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1 cursor-pointer"
        >
          {language === 'bn' ? 'কমিশন চার্ট' : 'Tier Rules'} <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* The 3 Main Commission Platform Cards (Alibaba 4%, Amazon 8%, AliExpress 12%) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {PLATFORMS.map((platform) => {
          const isEligible = user.balance >= platform.minBalance;

          return (
            <div
              key={platform.id}
              className="bg-white rounded-3xl border border-slate-200 hover:border-blue-400 hover:shadow-xl hover:shadow-blue-500/10 transition-all p-5 flex flex-col justify-between group"
            >
              <div>
                {/* Header row */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2.5">
                    <span className="text-2xl">{platform.logo}</span>
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm">
                        {language === 'bn' ? platform.name : platform.englishName}
                      </h4>
                      <span className="text-xs text-slate-500 flex items-center gap-1">
                        <Clock className="w-3 h-3 text-slate-400" />
                        {language === 'bn' ? 'দৈনিক ২৫টি অর্ডার' : '25 Daily Orders'}
                      </span>
                    </div>
                  </div>
                  <div className={`px-2.5 py-1 rounded-xl text-xs font-bold ${platform.badgeColor} shadow-sm`}>
                    {platform.commissionPercentText}
                  </div>
                </div>

                {/* Details box */}
                <div className="bg-slate-50 rounded-2xl p-3 space-y-2 border border-slate-100 mb-4">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-500">{language === 'bn' ? 'কমিশন হার:' : 'Commission Rate:'}</span>
                    <span className="font-bold text-blue-600 font-mono text-sm">{platform.commissionPercentText}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-500">{language === 'bn' ? 'সর্বনিম্ন ব্যালেন্স:' : 'Min Required:'}</span>
                    <span className="font-semibold text-slate-900 font-mono">{formatMoney(platform.minBalance)}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-500">{language === 'bn' ? 'দৈনিক লিমিট:' : 'Daily Limit:'}</span>
                    <span className="font-semibold text-slate-700">২৫টি অর্ডার</span>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <button
                type="button"
                onClick={() => handleEnterRoom(platform)}
                className={`w-full py-2.5 px-4 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                  isEligible
                    ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-600/20'
                    : 'bg-slate-100 text-slate-400 hover:bg-slate-200'
                }`}
              >
                <Zap className="w-3.5 h-3.5" />
                <span>
                  {language === 'bn'
                    ? `${platform.commissionPercentText} রুমে প্রবেশ করুন`
                    : `Enter ${platform.commissionPercentText} Room`}
                </span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          );
        })}
      </div>

      {/* Top Earners Leaderboard Section */}
      <div className="pt-4 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center font-bold shadow-xs">
              <Trophy className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">
                {language === 'bn' ? 'শীর্ষ উপার্জনকারী লিডারবোর্ড' : 'Top Earners Leaderboard'}
              </h3>
              <p className="text-xs text-slate-500">
                {language === 'bn' ? 'আজকের সেরা পারফর্মার ও কমিশন চ্যাম্পিয়নদের তালিকা' : "Today's top performers and commission champions"}
              </p>
            </div>
          </div>
          <button 
            type="button"
            onClick={() => setCurrentScreen('leaderboard')}
            className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1 cursor-pointer"
          >
            {language === 'bn' ? 'সম্পূর্ণ র‍্যাঙ্কিং ও প্রাইজ পুল' : 'Full Rankings & Prizes'} <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <TopEarnersLeaderboard 
          compact={true} 
          onNavigateToGrab={() => handleEnterRoom(PLATFORMS[0])} 
        />
      </div>

      {/* Trust & Guarantee Banner */}
      <div className="rounded-2xl bg-white border border-slate-200 p-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-600">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-blue-600 shrink-0" />
          <span>
            {language === 'bn' 
              ? 'অটোমেটিক মার্চেন্ট ম্যাচিং সিস্টেমের মাধ্যমে ১০০% নিরাপদ ও তাত্ক্ষণিক ব্যালেন্স জমা।' 
              : '100% Automated merchant pairing engine with instant commission credit.'}
          </span>
        </div>
        <div className="flex items-center gap-4 text-slate-400 shrink-0 font-medium">
          <span>bKash</span>
          <span>·</span>
          <span>Nagad</span>
          <span>·</span>
          <span>USDT TRC-20</span>
        </div>
      </div>

    </div>
  );
};
