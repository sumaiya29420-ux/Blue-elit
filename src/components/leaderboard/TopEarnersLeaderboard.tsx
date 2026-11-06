import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { AffiliateEarner } from '../../types';
import { TOP_EARNERS } from '../../data/mockData';
import { 
  Trophy, 
  Crown, 
  Flame, 
  ShieldCheck, 
  CheckCircle2, 
  TrendingUp, 
  Users, 
  Zap, 
  ArrowUpRight, 
  Search, 
  X,
  ExternalLink,
  Clock,
  Sparkles
} from 'lucide-react';

interface TopEarnersLeaderboardProps {
  compact?: boolean;
  onNavigateToGrab?: () => void;
}

type Timeframe = 'today' | 'week' | 'all';
type PlatformFilter = 'all' | 'aliexpress' | 'amazon' | 'alibaba';

export const TopEarnersLeaderboard: React.FC<TopEarnersLeaderboardProps> = ({ 
  compact = false,
  onNavigateToGrab
}) => {
  const { user, formatMoney, language, setCurrentScreen, playChime } = useApp();

  const [timeframe, setTimeframe] = useState<Timeframe>('today');
  const [platformFilter, setPlatformFilter] = useState<PlatformFilter>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedEarner, setSelectedEarner] = useState<AffiliateEarner | null>(null);
  const [cheersState, setCheersState] = useState<Record<string, number>>(() => {
    const initial: Record<string, number> = {};
    TOP_EARNERS.forEach(e => {
      initial[e.id] = e.cheersCount;
    });
    return initial;
  });
  const [cheeredIds, setCheeredIds] = useState<Record<string, boolean>>({});

  // Filter and sort earners
  const filteredEarners = useMemo(() => {
    return TOP_EARNERS.filter(earner => {
      // Platform filter
      if (platformFilter !== 'all' && earner.platform !== platformFilter) {
        return false;
      }
      // Search filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const matchName = earner.username.toLowerCase().includes(query);
        const matchPhone = earner.phoneMasked.toLowerCase().includes(query);
        if (!matchName && !matchPhone) return false;
      }
      return true;
    }).sort((a, b) => {
      if (timeframe === 'today') return b.dailyEarnings - a.dailyEarnings;
      if (timeframe === 'week') return b.weeklyEarnings - a.weeklyEarnings;
      return b.allTimeEarnings - a.allTimeEarnings;
    });
  }, [timeframe, platformFilter, searchQuery]);

  // Top 3 Podium Earners
  const podiumTop3 = useMemo(() => {
    return filteredEarners.slice(0, 3);
  }, [filteredEarners]);

  // Remaining Earners (Rank 4+)
  const restEarners = useMemo(() => {
    return filteredEarners.slice(3, compact ? 6 : 10);
  }, [filteredEarners, compact]);

  // Get active earning amount based on selected timeframe
  const getEarningAmount = (earner: AffiliateEarner) => {
    if (timeframe === 'today') return earner.dailyEarnings;
    if (timeframe === 'week') return earner.weeklyEarnings;
    return earner.allTimeEarnings;
  };

  // Cheer / Clap handler with audio chime
  const handleCheer = (e: React.MouseEvent, earnerId: string) => {
    e.stopPropagation();
    playChime();
    setCheersState(prev => ({
      ...prev,
      [earnerId]: (prev[earnerId] || 0) + 1
    }));
    setCheeredIds(prev => ({
      ...prev,
      [earnerId]: true
    }));
    setTimeout(() => {
      setCheeredIds(prev => ({
        ...prev,
        [earnerId]: false
      }));
    }, 1500);
  };

  // Logged-in user's simulated standing
  const userCurrentEarnings = timeframe === 'today' 
    ? user.todayCommission 
    : timeframe === 'week' 
      ? user.todayCommission * 4.8 
      : user.totalCommission;

  const userSimulatedRank = 14;
  const rawGap = (filteredEarners[filteredEarners.length - 1]?.dailyEarnings || 50) - user.todayCommission;
  const gapToTop10 = Math.max(15.2, Number(rawGap.toFixed(2)));

  return (
    <div className="space-y-6">
      
      {/* Leaderboard Header with Trust Stats */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-blue-600 mb-1">
            <Trophy className="w-4 h-4 text-amber-500" />
            <span className="uppercase tracking-wider">
              {language === 'bn' ? 'অফিসিয়াল অ্যাফিলিয়েট সম্মাননা' : 'Verified Affiliate Rankings'}
            </span>
            <span aria-hidden="true" className="text-slate-300">·</span>
            <span className="text-slate-500 font-normal">
              {language === 'bn' ? 'প্রতি ১০ মিনিটে আপডেট' : 'Updated every 10m'}
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
            {language === 'bn' ? 'শীর্ষ উপার্জনকারী লিডারবোর্ড' : 'Top Earners Leaderboard'}
          </h2>
          <p className="text-xs text-slate-500 mt-1 max-w-xl">
            {language === 'bn' 
              ? 'আমাদের ভেরিফাইড হাই-পারফর্মিং অ্যাফিলিয়েটদের তালিকা। ১০০% নিয়মিত পেমেন্ট ও দৈনিক ২৫টি অর্ডার কোটা সম্পন্নকারী মেম্বারদের লাইভ পারফরম্যান্স।'
              : 'Live showcase of elite affiliates completing daily 25-order quotas and earning top cashback rebates across merchant networks.'}
          </p>
        </div>

        {/* Global Today Distribution Proof Metric */}
        <div className="flex items-center gap-3 p-3 rounded-2xl bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 text-xs text-slate-700 shrink-0">
          <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold shadow-xs">
            <TrendingUp className="w-5 h-5" />
          </div>
          <div>
            <div className="text-[11px] text-slate-500">
              {language === 'bn' ? 'আজকের মোট কমিশন বিতরণ' : 'Total Distributed Today'}
            </div>
            <div className="text-sm font-bold text-blue-900 font-mono tabular-nums">
              {formatMoney(3480.50)}
            </div>
          </div>
        </div>
      </div>

      {/* Control Strip: Timeframe Switcher & Platform Filter Buttons */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white p-3 rounded-2xl border border-slate-200">
        
        {/* Timeframe Segmented Control (Functional Buttons) */}
        <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-xl">
          <button
            type="button"
            onClick={() => setTimeframe('today')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer whitespace-nowrap ${
              timeframe === 'today'
                ? 'bg-white text-blue-700 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            {language === 'bn' ? 'আজকের সেরা' : "Today's Top"}
          </button>
          <button
            type="button"
            onClick={() => setTimeframe('week')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer whitespace-nowrap ${
              timeframe === 'week'
                ? 'bg-white text-blue-700 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            {language === 'bn' ? 'এই সপ্তাহের' : 'This Week'}
          </button>
          <button
            type="button"
            onClick={() => setTimeframe('all')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer whitespace-nowrap ${
              timeframe === 'all'
                ? 'bg-white text-blue-700 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            {language === 'bn' ? 'সর্বকালের সেরা' : 'All-Time'}
          </button>
        </div>

        {/* Platform Selection Buttons & Quick Search */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
          
          <button
            type="button"
            onClick={() => setPlatformFilter('all')}
            className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all cursor-pointer whitespace-nowrap ${
              platformFilter === 'all'
                ? 'bg-slate-900 text-white'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            {language === 'bn' ? 'সকল রুম' : 'All Rooms'}
          </button>

          <button
            type="button"
            onClick={() => setPlatformFilter('aliexpress')}
            className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
              platformFilter === 'aliexpress'
                ? 'bg-sky-600 text-white'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            <span>🚀</span>
            <span>AliExpress (12%)</span>
          </button>

          <button
            type="button"
            onClick={() => setPlatformFilter('amazon')}
            className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
              platformFilter === 'amazon'
                ? 'bg-indigo-600 text-white'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            <span>📦</span>
            <span>Amazon (8%)</span>
          </button>

          <button
            type="button"
            onClick={() => setPlatformFilter('alibaba')}
            className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
              platformFilter === 'alibaba'
                ? 'bg-blue-600 text-white'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            <span>🛍️</span>
            <span>Alibaba (4%)</span>
          </button>

          {/* Search Box */}
          <div className="relative min-w-[140px] sm:min-w-[180px]">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={language === 'bn' ? 'নাম বা ফোন খুঁজুন...' : 'Search affiliate...'}
              className="w-full pl-8 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:bg-white transition-all"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-0.5 cursor-pointer"
              >
                <X className="w-3 h-3" />
              </button>
            )}
          </div>

        </div>

      </div>

      {/* Podium Top 3 Cards Showcase (Gold 1st, Silver 2nd, Bronze 3rd) */}
      {podiumTop3.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-stretch pt-2">
          
          {/* Rank 2 (Silver) */}
          {podiumTop3[1] && (
            <div 
              onClick={() => setSelectedEarner(podiumTop3[1])}
              className="order-2 md:order-1 bg-white rounded-3xl border border-slate-200 hover:border-slate-400 p-5 shadow-sm hover:shadow-lg transition-all flex flex-col justify-between cursor-pointer group relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-slate-100/60 rounded-full blur-2xl pointer-events-none" />
              
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="flex items-center gap-1.5 text-xs font-bold text-slate-600 bg-slate-100 px-2.5 py-1 rounded-xl">
                    <Trophy className="w-3.5 h-3.5 text-slate-400" />
                    <span>#2 Silver Rank</span>
                  </span>
                  <span className="text-[11px] font-semibold text-slate-500 flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    {podiumTop3[1].verifiedMethod}
                  </span>
                </div>

                <div className="flex items-center gap-3 mt-2">
                  <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${podiumTop3[1].avatarColor} text-white flex items-center justify-center font-bold text-lg shadow-md`}>
                    {podiumTop3[1].username.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                      {podiumTop3[1].username}
                    </h3>
                    <div className="text-xs text-slate-500 font-mono flex items-center gap-2">
                      <span>{podiumTop3[1].phoneMasked}</span>
                      <span aria-hidden="true">·</span>
                      <span className="text-indigo-600 font-medium">VIP {podiumTop3[1].vipLevel}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-4 p-3 rounded-2xl bg-slate-50 border border-slate-100 space-y-1.5">
                  <div className="text-[11px] text-slate-500">
                    {timeframe === 'today' ? (language === 'bn' ? 'আজকের কমিশন আয়' : "Today's Commission") : (language === 'bn' ? 'মোট কমিশন' : 'Total Commission')}
                  </div>
                  <div className="text-2xl font-extrabold text-slate-900 font-mono tabular-nums">
                    {formatMoney(getEarningAmount(podiumTop3[1]))}
                  </div>
                  <div className="text-[11px] text-slate-500 flex items-center gap-2 pt-1 border-t border-slate-200/60">
                    <span>{language === 'bn' ? 'কোটা:' : 'Orders:'} {podiumTop3[1].ordersCompletedToday}/25</span>
                    <span aria-hidden="true">·</span>
                    <span className="text-emerald-600 font-medium">{language === 'bn' ? 'স্ট্রিক:' : 'Streak:'} {podiumTop3[1].streakDays}d</span>
                  </div>
                </div>

                <p className="text-xs text-slate-500 mt-3 line-clamp-1">
                  {language === 'bn' ? podiumTop3[1].badgeNoteBn : podiumTop3[1].badgeNoteEn}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                <button
                  type="button"
                  onClick={(e) => handleCheer(e, podiumTop3[1].id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                    cheeredIds[podiumTop3[1].id]
                      ? 'bg-amber-100 text-amber-700 scale-105'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                  }`}
                >
                  <Flame className="w-3.5 h-3.5 text-amber-500" />
                  <span>{cheersState[podiumTop3[1].id]}</span>
                  <span className="text-[10px] text-slate-500">{language === 'bn' ? 'চিয়ার' : 'Cheer'}</span>
                </button>

                <span className="text-xs font-semibold text-blue-600 flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                  {language === 'bn' ? 'প্রোফাইল' : 'Profile'} <ArrowUpRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          )}

          {/* Rank 1 (Gold / Champion Center Stage) */}
          {podiumTop3[0] && (
            <div 
              onClick={() => setSelectedEarner(podiumTop3[0])}
              className="order-1 md:order-2 bg-gradient-to-b from-amber-50/70 via-white to-amber-50/30 rounded-3xl border-2 border-amber-300 hover:border-amber-400 p-5 sm:p-6 shadow-lg shadow-amber-500/10 hover:shadow-xl transition-all flex flex-col justify-between cursor-pointer group relative overflow-hidden md:-translate-y-2"
            >
              <div className="absolute -top-12 -right-12 w-32 h-32 bg-amber-200/40 rounded-full blur-2xl pointer-events-none" />

              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="flex items-center gap-1.5 text-xs font-bold text-amber-900 bg-amber-200/80 px-3 py-1 rounded-xl shadow-xs">
                    <Crown className="w-4 h-4 text-amber-600 fill-amber-500" />
                    <span>#1 Gold Champion</span>
                  </span>
                  <span className="text-[11px] font-semibold text-emerald-700 flex items-center gap-1 bg-emerald-50 px-2 py-0.5 rounded-lg border border-emerald-200">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    {podiumTop3[0].verifiedMethod} Verified
                  </span>
                </div>

                <div className="flex items-center gap-3.5 mt-3">
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${podiumTop3[0].avatarColor} text-white flex items-center justify-center font-black text-xl shadow-md border-2 border-amber-300 relative`}>
                    {podiumTop3[0].username.charAt(0)}
                    <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-amber-400 rounded-full flex items-center justify-center text-[10px] text-slate-900 font-bold border border-white">
                      👑
                    </span>
                  </div>
                  <div>
                    <h3 className="font-extrabold text-slate-900 text-base group-hover:text-amber-700 transition-colors">
                      {podiumTop3[0].username}
                    </h3>
                    <div className="text-xs text-slate-600 font-mono flex items-center gap-2">
                      <span>{podiumTop3[0].phoneMasked}</span>
                      <span aria-hidden="true">·</span>
                      <span className="text-amber-700 font-bold">VIP {podiumTop3[0].vipLevel} Master</span>
                    </div>
                  </div>
                </div>

                <div className="mt-4 p-4 rounded-2xl bg-amber-100/60 border border-amber-200/70 space-y-1.5">
                  <div className="text-[11px] font-semibold text-amber-900 flex items-center justify-between">
                    <span>
                      {timeframe === 'today' ? (language === 'bn' ? 'আজকের অর্জিত প্রফিট' : "Today's Champion Earnings") : (language === 'bn' ? 'সর্বোচ্চ উপার্জন' : 'Record Earnings')}
                    </span>
                    <span className="text-[10px] bg-amber-200 text-amber-900 px-1.5 py-0.5 rounded font-mono font-bold">
                      {podiumTop3[0].platformName}
                    </span>
                  </div>
                  <div className="text-3xl font-black text-amber-950 font-mono tabular-nums tracking-tight">
                    {formatMoney(getEarningAmount(podiumTop3[0]))}
                  </div>
                  <div className="text-xs text-amber-800 flex items-center justify-between pt-1.5 border-t border-amber-200/60">
                    <span className="font-medium">
                      {language === 'bn' ? 'কোটা পূর্ণ:' : 'Daily Quota:'} 25/25 ({podiumTop3[0].completionRate})
                    </span>
                    <span className="font-bold flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                      {podiumTop3[0].streakDays} {language === 'bn' ? 'দিনের রেকর্ড' : 'Day Streak'}
                    </span>
                  </div>
                </div>

                <p className="text-xs text-slate-600 font-medium mt-3 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>{language === 'bn' ? podiumTop3[0].badgeNoteBn : podiumTop3[0].badgeNoteEn}</span>
                </p>
              </div>

              <div className="mt-5 pt-3 border-t border-amber-200/60 flex items-center justify-between">
                <button
                  type="button"
                  onClick={(e) => handleCheer(e, podiumTop3[0].id)}
                  className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    cheeredIds[podiumTop3[0].id]
                      ? 'bg-amber-500 text-white scale-105'
                      : 'bg-amber-200/80 hover:bg-amber-300 text-amber-900'
                  }`}
                >
                  <Flame className="w-4 h-4 text-amber-600 fill-amber-500" />
                  <span>{cheersState[podiumTop3[0].id]}</span>
                  <span>{language === 'bn' ? 'অভিনন্দন জানান' : 'Cheer'}</span>
                </button>

                <span className="text-xs font-bold text-amber-800 flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                  {language === 'bn' ? 'সার্টিফিকেট ও প্রমাণ' : 'Proof & Details'} <ArrowUpRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          )}

          {/* Rank 3 (Bronze) */}
          {podiumTop3[2] && (
            <div 
              onClick={() => setSelectedEarner(podiumTop3[2])}
              className="order-3 bg-white rounded-3xl border border-slate-200 hover:border-amber-600/40 p-5 shadow-sm hover:shadow-lg transition-all flex flex-col justify-between cursor-pointer group relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-amber-700/5 rounded-full blur-2xl pointer-events-none" />

              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="flex items-center gap-1.5 text-xs font-bold text-amber-800 bg-amber-100/70 px-2.5 py-1 rounded-xl">
                    <Trophy className="w-3.5 h-3.5 text-amber-700" />
                    <span>#3 Bronze Rank</span>
                  </span>
                  <span className="text-[11px] font-semibold text-slate-500 flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    {podiumTop3[2].verifiedMethod}
                  </span>
                </div>

                <div className="flex items-center gap-3 mt-2">
                  <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${podiumTop3[2].avatarColor} text-white flex items-center justify-center font-bold text-lg shadow-md`}>
                    {podiumTop3[2].username.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                      {podiumTop3[2].username}
                    </h3>
                    <div className="text-xs text-slate-500 font-mono flex items-center gap-2">
                      <span>{podiumTop3[2].phoneMasked}</span>
                      <span aria-hidden="true">·</span>
                      <span className="text-blue-600 font-medium">VIP {podiumTop3[2].vipLevel}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-4 p-3 rounded-2xl bg-slate-50 border border-slate-100 space-y-1.5">
                  <div className="text-[11px] text-slate-500">
                    {timeframe === 'today' ? (language === 'bn' ? 'আজকের কমিশন আয়' : "Today's Commission") : (language === 'bn' ? 'মোট কমিশন' : 'Total Commission')}
                  </div>
                  <div className="text-2xl font-extrabold text-slate-900 font-mono tabular-nums">
                    {formatMoney(getEarningAmount(podiumTop3[2]))}
                  </div>
                  <div className="text-[11px] text-slate-500 flex items-center gap-2 pt-1 border-t border-slate-200/60">
                    <span>{language === 'bn' ? 'কোটা:' : 'Orders:'} {podiumTop3[2].ordersCompletedToday}/25</span>
                    <span aria-hidden="true">·</span>
                    <span className="text-emerald-600 font-medium">{language === 'bn' ? 'স্ট্রিক:' : 'Streak:'} {podiumTop3[2].streakDays}d</span>
                  </div>
                </div>

                <p className="text-xs text-slate-500 mt-3 line-clamp-1">
                  {language === 'bn' ? podiumTop3[2].badgeNoteBn : podiumTop3[2].badgeNoteEn}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                <button
                  type="button"
                  onClick={(e) => handleCheer(e, podiumTop3[2].id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                    cheeredIds[podiumTop3[2].id]
                      ? 'bg-amber-100 text-amber-700 scale-105'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                  }`}
                >
                  <Flame className="w-3.5 h-3.5 text-amber-500" />
                  <span>{cheersState[podiumTop3[2].id]}</span>
                  <span className="text-[10px] text-slate-500">{language === 'bn' ? 'চিয়ার' : 'Cheer'}</span>
                </button>

                <span className="text-xs font-semibold text-blue-600 flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                  {language === 'bn' ? 'প্রোফাইল' : 'Profile'} <ArrowUpRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          )}

        </div>
      )}

      {/* "Your Current Standing" Motivation & Competition Card */}
      <div className="rounded-3xl bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white p-5 sm:p-6 shadow-md border border-blue-800/40 relative overflow-hidden">
        <div className="absolute right-0 top-0 w-64 h-full bg-blue-500/10 blur-3xl pointer-events-none" />
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-10">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center font-bold text-lg text-white shrink-0">
              {user.username.charAt(0)}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-white text-sm sm:text-base">{user.username} (You)</span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-400 text-slate-950 font-mono">
                  Rank #{userSimulatedRank}
                </span>
              </div>
              <p className="text-xs text-blue-200 mt-0.5">
                {language === 'bn' 
                  ? `আজকের কমিশন: ${formatMoney(userCurrentEarnings)} • ${user.todayOrdersCount}/25 সম্পন্ন` 
                  : `Current earnings: ${formatMoney(userCurrentEarnings)} • ${user.todayOrdersCount}/25 orders finished`}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 sm:justify-end">
            <div className="text-left sm:text-right hidden sm:block">
              <div className="text-[11px] text-blue-200">
                {language === 'bn' ? 'টপ ১০-এ প্রবেশ করতে দরকার' : 'Gap to Top 10'}
              </div>
              <div className="text-xs font-bold text-amber-300 font-mono">
                +{formatMoney(Number(gapToTop10))}
              </div>
            </div>

            <button
              type="button"
              onClick={() => {
                if (onNavigateToGrab) onNavigateToGrab();
                else setCurrentScreen('room-alibaba');
              }}
              className="py-2.5 px-4 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-500 text-white shadow-md shadow-blue-600/30 transition-all flex items-center gap-2 cursor-pointer shrink-0"
            >
              <Zap className="w-3.5 h-3.5" />
              <span>{language === 'bn' ? 'অর্ডার গ্র্যাব করে র‍্যাঙ্ক বাড়ান' : 'Grab Orders & Climb Rank'}</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Ranks 4 to 10+ Table / List */}
      <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs">
        <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-900 text-sm">
              {language === 'bn' ? 'র‍্যাঙ্কিং তালিকা (র‍্যাঙ্ক ৪ - ৮+)' : 'Contender Rankings (Ranks 4 - 8+)'}
            </span>
            <span className="text-xs text-slate-400">
              ({filteredEarners.length} {language === 'bn' ? 'অ্যাফিলিয়েট সক্রিয়' : 'active affiliates'})
            </span>
          </div>

          <span className="text-xs text-slate-500 font-mono">
            {timeframe === 'today' ? '24h Cycle' : timeframe === 'week' ? '7d Total' : 'Lifetime'}
          </span>
        </div>

        {restEarners.length === 0 ? (
          <div className="p-8 text-center text-xs text-slate-500">
            {language === 'bn' ? 'কোনো অ্যাফিলিয়েট পাওয়া যায়নি।' : 'No affiliates found matching your criteria.'}
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {restEarners.map((earner) => {
              const amount = getEarningAmount(earner);

              return (
                <div
                  key={earner.id}
                  onClick={() => setSelectedEarner(earner)}
                  className="p-3 sm:p-4 hover:bg-blue-50/40 transition-colors flex items-center justify-between gap-3 cursor-pointer group"
                >
                  {/* Rank & Profile */}
                  <div className="flex items-center gap-3 sm:gap-4 min-w-0">
                    <span className="w-7 text-center font-mono font-bold text-slate-400 group-hover:text-blue-600 text-sm">
                      #{earner.rank}
                    </span>

                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${earner.avatarColor} text-white flex items-center justify-center font-bold text-sm shrink-0 shadow-xs`}>
                      {earner.username.charAt(0)}
                    </div>

                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-900 text-xs sm:text-sm truncate group-hover:text-blue-600 transition-colors">
                          {earner.username}
                        </span>
                        <span className="text-[10px] font-semibold text-slate-500 px-1.5 py-0.2 rounded bg-slate-100 hidden sm:inline-block">
                          VIP {earner.vipLevel}
                        </span>
                      </div>
                      <div className="text-[11px] text-slate-500 flex items-center gap-2 font-mono">
                        <span>{earner.phoneMasked}</span>
                        <span aria-hidden="true">·</span>
                        <span className="text-emerald-600 font-medium">{earner.verifiedMethod}</span>
                      </div>
                    </div>
                  </div>

                  {/* Quota & Stats (Desktop) */}
                  <div className="hidden md:flex items-center gap-6 text-xs text-slate-600 text-right">
                    <div>
                      <div className="text-[10px] text-slate-400">{language === 'bn' ? 'দৈনিক অর্ডার' : 'Daily Orders'}</div>
                      <div className="font-mono font-medium">{earner.ordersCompletedToday}/25</div>
                    </div>
                    <div>
                      <div className="text-[10px] text-slate-400">{language === 'bn' ? 'অ্যাক্টিভ টিম' : 'Active Team'}</div>
                      <div className="font-mono font-medium">{earner.teamSize} {language === 'bn' ? 'জন' : 'mbrs'}</div>
                    </div>
                  </div>

                  {/* Earnings & Cheer CTA */}
                  <div className="flex items-center gap-3 shrink-0 text-right">
                    <div>
                      <div className="text-[10px] text-slate-400">
                        {timeframe === 'today' ? (language === 'bn' ? 'আজকের কমিশন' : 'Commission') : (language === 'bn' ? 'মোট কমিশন' : 'Total')}
                      </div>
                      <div className="text-sm sm:text-base font-extrabold text-blue-700 font-mono tabular-nums">
                        {formatMoney(amount)}
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={(e) => handleCheer(e, earner.id)}
                      className={`p-2 rounded-xl text-xs transition-all cursor-pointer ${
                        cheeredIds[earner.id]
                          ? 'bg-amber-100 text-amber-700 scale-110'
                          : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
                      }`}
                      title={language === 'bn' ? 'চিয়ার করুন' : 'Send Cheer'}
                    >
                      <Flame className="w-4 h-4 text-amber-500" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>

      {/* Real-time Verified Payout Ticker */}
      <div className="rounded-2xl bg-slate-900 text-white p-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2.5">
          <div className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <span className="font-medium text-slate-200">
            {language === 'bn' 
              ? 'সাম্প্রতিক উইথড্র: তানভীর হোসেন bKash-এ ৳১৮,০০০ সফলভাবে ক্যাশআউট সম্পন্ন করেছেন (১০ মিনিট আগে)' 
              : 'Recent Verified Payout: Tanvir Hossain cashed out ৳18,000 via bKash (10m ago)'}
          </span>
        </div>
        <div className="flex items-center gap-3 text-slate-400 shrink-0 font-mono text-[11px]">
          <span>TxID: BK9X00481</span>
          <span>·</span>
          <span className="text-emerald-400 font-semibold">100% Guaranteed</span>
        </div>
      </div>

      {/* Affiliate Detailed Proof Modal */}
      {selectedEarner && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-md w-full border border-slate-200 shadow-2xl p-6 relative overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setSelectedEarner(null)}
              className="absolute top-4 right-4 p-1.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Modal Header Badge */}
            <div className="flex items-center gap-2 mb-4">
              <span className="text-xs font-bold px-2.5 py-1 rounded-xl bg-blue-100 text-blue-800 flex items-center gap-1">
                <Trophy className="w-3.5 h-3.5 text-blue-600" />
                Rank #{selectedEarner.rank} Verified Affiliate
              </span>
              <span className="text-xs text-emerald-700 font-semibold flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                KYC & Payment Verified
              </span>
            </div>

            {/* Avatar & Name */}
            <div className="flex items-center gap-3.5 pb-4 border-b border-slate-100">
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${selectedEarner.avatarColor} text-white flex items-center justify-center font-black text-xl shadow-md`}>
                {selectedEarner.username.charAt(0)}
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900">{selectedEarner.username}</h3>
                <p className="text-xs text-slate-500 font-mono">{selectedEarner.phoneMasked} • VIP {selectedEarner.vipLevel}</p>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  {language === 'bn' ? 'যোগদান:' : 'Joined:'} {selectedEarner.joinedDate}
                </p>
              </div>
            </div>

            {/* Performance Grid */}
            <div className="grid grid-cols-2 gap-2.5 my-4">
              <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100">
                <div className="text-[11px] text-slate-500">{language === 'bn' ? 'আজকের কমিশন' : "Today's Profit"}</div>
                <div className="text-base font-extrabold text-blue-700 font-mono tabular-nums mt-0.5">
                  {formatMoney(selectedEarner.dailyEarnings)}
                </div>
              </div>
              <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100">
                <div className="text-[11px] text-slate-500">{language === 'bn' ? 'সর্বমোট কমিশন' : 'Lifetime Profit'}</div>
                <div className="text-base font-extrabold text-amber-600 font-mono tabular-nums mt-0.5">
                  {formatMoney(selectedEarner.allTimeEarnings)}
                </div>
              </div>
              <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100">
                <div className="text-[11px] text-slate-500">{language === 'bn' ? 'দৈনিক অর্ডার সম্পন্ন' : 'Orders Today'}</div>
                <div className="text-sm font-bold text-slate-800 font-mono mt-0.5">
                  {selectedEarner.ordersCompletedToday} / {selectedEarner.dailyQuota}
                </div>
              </div>
              <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100">
                <div className="text-[11px] text-slate-500">{language === 'bn' ? 'টিম সদস্য' : 'Team Members'}</div>
                <div className="text-sm font-bold text-slate-800 font-mono mt-0.5">
                  {selectedEarner.teamSize} {language === 'bn' ? 'জন' : 'Affiliates'}
                </div>
              </div>
            </div>

            {/* Verified Payout Proof Snippet */}
            <div className="p-3.5 rounded-2xl bg-emerald-50/70 border border-emerald-200 text-xs text-emerald-950 mb-4 space-y-1">
              <div className="font-bold flex items-center justify-between text-emerald-900">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  {language === 'bn' ? 'সাম্প্রতিক ভেরিফাইড পেমেন্ট' : 'Verified Payout Record'}
                </span>
                <span className="font-mono text-[11px] text-emerald-700">{selectedEarner.recentPayoutTime}</span>
              </div>
              <p className="text-[11px] text-emerald-800">
                {language === 'bn' 
                  ? `${formatMoney(selectedEarner.recentPayoutAmount)} সরাসরি ${selectedEarner.verifiedMethod} ওয়ালেটে সফলভাবে স্থানান্তর সম্পন্ন হয়েছে।`
                  : `${formatMoney(selectedEarner.recentPayoutAmount)} successfully disbursed to verified ${selectedEarner.verifiedMethod} account.`}
              </p>
            </div>

            {/* Modal Actions */}
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={(e) => handleCheer(e, selectedEarner.id)}
                className="flex-1 py-2.5 px-4 rounded-xl text-xs font-bold bg-amber-500 hover:bg-amber-600 text-white shadow-md shadow-amber-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Flame className="w-4 h-4 fill-white" />
                <span>
                  {language === 'bn' ? `চিয়ার করুন (${cheersState[selectedEarner.id]})` : `Send Cheer (${cheersState[selectedEarner.id]})`}
                </span>
              </button>

              <button
                type="button"
                onClick={() => setSelectedEarner(null)}
                className="py-2.5 px-4 rounded-xl text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer"
              >
                {language === 'bn' ? 'বন্ধ করুন' : 'Close'}
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
