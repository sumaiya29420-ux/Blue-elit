import React, { useState, useEffect, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { DailyMission, MissionCategory, ScreenId } from '../types';
import { 
  Target, 
  Gift, 
  CheckCircle2, 
  ArrowRight, 
  Zap, 
  Users, 
  Trophy, 
  Clock, 
  Sparkles, 
  Copy, 
  Check, 
  Calendar,
  Flame,
  ChevronRight,
  TrendingUp,
  Award
} from 'lucide-react';

interface DailyMissionsProps {
  onNavigateToRoom?: () => void;
}

export const DailyMissions: React.FC<DailyMissionsProps> = ({ onNavigateToRoom }) => {
  const { 
    user, 
    setCurrentScreen, 
    formatMoney, 
    language, 
    claimMissionReward,
    playChime 
  } = useApp();

  const [activeCategory, setActiveCategory] = useState<MissionCategory>('all');
  const [copiedCode, setCopiedCode] = useState(false);
  const [justClaimedId, setJustClaimedId] = useState<string | null>(null);
  const [streakCheckedIn, setStreakCheckedIn] = useState<boolean>(() => {
    return localStorage.getItem('blueorder_streak_checked_today') === 'true';
  });
  const [cheerTaskCompleted, setCheerTaskCompleted] = useState<boolean>(() => {
    return localStorage.getItem('blueorder_mission_cheer_done') === 'true';
  });
  const [rulesTaskCompleted, setRulesTaskCompleted] = useState<boolean>(() => {
    return localStorage.getItem('blueorder_mission_rules_done') === 'true';
  });
  const [inviteShared, setInviteShared] = useState<boolean>(() => {
    return localStorage.getItem('blueorder_mission_invite_done') === 'true';
  });

  // Claimed mission IDs persisted in localStorage
  const [claimedMissionIds, setClaimedMissionIds] = useState<string[]>(() => {
    const saved = localStorage.getItem('blueorder_claimed_missions');
    return saved ? JSON.parse(saved) : ['msn_vip_holder']; // VIP holder claimed or initial
  });

  // Daily countdown timer to 00:00:00 (resets in X hours)
  const [timeLeft, setTimeLeft] = useState<{ hours: number; minutes: number; seconds: number }>({
    hours: 7,
    minutes: 24,
    seconds: 40
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const midnight = new Date(now);
      midnight.setHours(24, 0, 0, 0);
      const diff = midnight.getTime() - now.getTime();
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / 1000 / 60) % 60);
      const seconds = Math.floor((diff / 1000) % 60);
      setTimeLeft({ hours, minutes, seconds });
    };

    calculateTimeLeft();
    const interval = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(interval);
  }, []);

  const saveClaimed = (newClaimed: string[]) => {
    setClaimedMissionIds(newClaimed);
    localStorage.setItem('blueorder_claimed_missions', JSON.stringify(newClaimed));
  };

  // Define the master missions based on live state
  const missions: DailyMission[] = useMemo(() => {
    const ordersDone = user.todayOrdersCount;

    return [
      {
        id: 'msn_attendance',
        category: 'engagement',
        titleBn: 'দৈনিক অ্যাটেনডেন্স ও স্ট্রিক বোনাস',
        titleEn: 'Daily Check-In & Streak Reward',
        descriptionBn: 'প্রতিদিন অ্যাপে প্রবেশ করে অ্যাফিলিয়েট স্ট্রিক চালু রাখুন এবং ইনস্ট্যান্ট বোনাস নিন',
        descriptionEn: 'Check in daily to maintain your active affiliate streak and collect instant cash',
        rewardUsd: 0.50,
        currentProgress: streakCheckedIn ? 1 : 0,
        targetProgress: 1,
        unitBn: 'দিন',
        unitEn: 'day',
        actionLabelBn: 'চেক-ইন করুন',
        actionLabelEn: 'Check In',
        actionType: 'checkin',
        isCompleted: streakCheckedIn,
        isClaimed: claimedMissionIds.includes('msn_attendance')
      },
      {
        id: 'msn_orders_5',
        category: 'orders',
        titleBn: 'প্রথম ৫টি প্রোডাক্ট অর্ডার সম্পন্ন করুন',
        titleEn: 'Complete 5 Merchant Orders',
        descriptionBn: 'আলিবাবা, আমাজন বা আলিএক্সপ্রেস রুমে যেকোনো ৫টি অর্ডার কমপ্লিট করুন',
        descriptionEn: 'Grab and complete 5 product orders in any merchant commission room',
        rewardUsd: 1.00,
        currentProgress: Math.min(ordersDone, 5),
        targetProgress: 5,
        unitBn: 'অর্ডার',
        unitEn: 'orders',
        actionLabelBn: 'অর্ডার রুমে যান',
        actionLabelEn: 'Go to Orders',
        targetScreen: 'room-alibaba',
        actionType: 'grab_orders',
        isCompleted: ordersDone >= 5,
        isClaimed: claimedMissionIds.includes('msn_orders_5')
      },
      {
        id: 'msn_orders_15',
        category: 'orders',
        titleBn: '১৫টি অর্ডার মাইলস্টোন অর্জন করুন',
        titleEn: 'Reach 15 Daily Orders Milestone',
        descriptionBn: '১৫টি অর্ডার সম্পন্ন করে উচ্চ কমিশনের সাথে অতিরিক্ত প্রফিট আনলক করুন',
        descriptionEn: 'Process 15 merchant orders today to unlock higher milestone payouts',
        rewardUsd: 2.50,
        currentProgress: Math.min(ordersDone, 15),
        targetProgress: 15,
        unitBn: 'অর্ডার',
        unitEn: 'orders',
        actionLabelBn: 'অর্ডার গ্র্যাব করুন',
        actionLabelEn: 'Grab Orders',
        targetScreen: 'room-amazon',
        actionType: 'grab_orders',
        isCompleted: ordersDone >= 15,
        isClaimed: claimedMissionIds.includes('msn_orders_15')
      },
      {
        id: 'msn_orders_25',
        category: 'orders',
        titleBn: 'সম্পূর্ণ দৈনিক ২৫টি কোটা সম্পন্ন করুন (১০০%)',
        titleEn: 'Complete 100% Daily 25 Orders Quota',
        descriptionBn: 'দৈনিক ২৫টি অর্ডারের সম্পূর্ণ কোটা শেষ করে এলিট চ্যাম্পিয়ন বোনাস লাভ করুন',
        descriptionEn: 'Finish all 25 daily guaranteed orders to claim elite champion reward',
        rewardUsd: 5.00,
        currentProgress: Math.min(ordersDone, 25),
        targetProgress: 25,
        unitBn: 'অর্ডার',
        unitEn: 'orders',
        actionLabelBn: 'কোটা শেষ করুন',
        actionLabelEn: 'Finish Quota',
        targetScreen: 'room-aliexpress',
        actionType: 'grab_orders',
        isCompleted: ordersDone >= 25,
        isClaimed: claimedMissionIds.includes('msn_orders_25')
      },
      {
        id: 'msn_invite_share',
        category: 'affiliate',
        titleBn: 'অ্যাফিলিয়েট টিম ইনভাইট শেয়ার করুন',
        titleEn: 'Share Affiliate Invite Link',
        descriptionBn: 'আপনার ৩-লেভেল রেফারেল লিঙ্ক বন্ধুদের সাথে শেয়ার করে টিম বোনাস সক্রিয় করুন',
        descriptionEn: 'Share your 3-level rebate referral link or invite code with friends',
        rewardUsd: 1.20,
        currentProgress: inviteShared ? 1 : 0,
        targetProgress: 1,
        unitBn: 'শেয়ার',
        unitEn: 'share',
        actionLabelBn: 'লিঙ্ক কপি করুন',
        actionLabelEn: 'Copy Code',
        targetScreen: 'invite',
        actionType: 'invite',
        isCompleted: inviteShared,
        isClaimed: claimedMissionIds.includes('msn_invite_share')
      },
      {
        id: 'msn_team_size',
        category: 'affiliate',
        titleBn: '১৫+ অ্যাক্টিভ টিম সদস্য বজায় রাখুন',
        titleEn: 'Maintain 15+ Active Team Network',
        descriptionBn: 'আপনার টিমে ১৫ জনের বেশি সদস্য থাকলে এই দৈনিক নেটওয়ার্ক ডিভিডেন্ড পাবেন',
        descriptionEn: 'Receive daily affiliate management dividend for maintaining 15+ team members',
        rewardUsd: 2.00,
        currentProgress: Math.min(user.teamCount, 15),
        targetProgress: 15,
        unitBn: 'সদস্য',
        unitEn: 'members',
        actionLabelBn: 'টিম ড্যাশবোর্ড',
        actionLabelEn: 'View Team',
        targetScreen: 'invite',
        actionType: 'invite',
        isCompleted: user.teamCount >= 15,
        isClaimed: claimedMissionIds.includes('msn_team_size')
      },
      {
        id: 'msn_cheer_leaderboard',
        category: 'engagement',
        titleBn: 'টপ আর্নার্স লিডারবোর্ডে চিয়ার করুন',
        titleEn: 'Cheer a Leaderboard Champion',
        descriptionBn: 'শীর্ষ উপার্জনকারী লিডারবোর্ডের যেকোনো পোডিয়াম আর্নারকে উৎসাহ দিয়ে চিয়ার দিন',
        descriptionEn: 'Send a cheer to any top earner or podium champion on the leaderboard',
        rewardUsd: 0.30,
        currentProgress: cheerTaskCompleted ? 1 : 0,
        targetProgress: 1,
        unitBn: 'চিয়ার',
        unitEn: 'cheer',
        actionLabelBn: 'লিডারবোর্ড দেখুন',
        actionLabelEn: 'Cheer Now',
        targetScreen: 'leaderboard',
        actionType: 'cheer',
        isCompleted: cheerTaskCompleted,
        isClaimed: claimedMissionIds.includes('msn_cheer_leaderboard')
      },
      {
        id: 'msn_rules_guide',
        category: 'engagement',
        titleBn: 'ভিআইপি কমিশন চার্ট ও রুলস পর্যালোচনা',
        titleEn: 'Review VIP Commission Rules',
        descriptionBn: '৪%, ৮%, ১২% মার্চেন্ট কমিশন চার্ট ও প্রফিট ক্যালকুলেটর পৃষ্ঠাটি পড়ুন',
        descriptionEn: 'Check the official VIP level tiers, daily limits, and profit rules page',
        rewardUsd: 0.40,
        currentProgress: rulesTaskCompleted ? 1 : 0,
        targetProgress: 1,
        unitBn: 'ভিউ',
        unitEn: 'view',
        actionLabelBn: 'চার্ট দেখুন',
        actionLabelEn: 'Read Rules',
        targetScreen: 'commission',
        actionType: 'rules',
        isCompleted: rulesTaskCompleted,
        isClaimed: claimedMissionIds.includes('msn_rules_guide')
      },
      {
        id: 'msn_vip_holder',
        category: 'orders',
        titleBn: 'ভিআইপি ২ ব্যালেন্স হোল্ডার বোনাস ($১০০+)',
        titleEn: 'VIP 2 Balance Holder Reward ($100+)',
        descriptionBn: 'ওয়ালেটে $১০০ (৳১২,০০০) বা তার বেশি ব্যালেন্স ধরে রেখে ৮% রুমে কমিশন নিশ্চিত রাখুন',
        descriptionEn: 'Maintain $100+ wallet balance required for Amazon VIP 2 8% commission room',
        rewardUsd: 1.50,
        currentProgress: user.balance >= 100 ? 100 : Math.round(user.balance),
        targetProgress: 100,
        unitBn: 'USD',
        unitEn: 'USD',
        actionLabelBn: 'ডিপোজিট করুন',
        actionLabelEn: 'Deposit',
        targetScreen: 'deposit',
        actionType: 'vip_balance',
        isCompleted: user.balance >= 100,
        isClaimed: claimedMissionIds.includes('msn_vip_holder')
      }
    ];
  }, [
    user.todayOrdersCount, 
    user.teamCount, 
    user.balance, 
    streakCheckedIn, 
    cheerTaskCompleted, 
    rulesTaskCompleted, 
    inviteShared, 
    claimedMissionIds
  ]);

  // Filtered by category tab
  const filteredMissions = useMemo(() => {
    if (activeCategory === 'all') return missions;
    return missions.filter(m => m.category === activeCategory);
  }, [missions, activeCategory]);

  // Stats calculation
  const totalCompleted = missions.filter(m => m.isCompleted).length;
  const totalMissions = missions.length;
  const progressPercent = Math.round((totalCompleted / totalMissions) * 100);

  // Unclaimed completed missions
  const claimableMissions = missions.filter(m => m.isCompleted && !m.isClaimed);
  const totalClaimableRewardUsd = claimableMissions.reduce((acc, m) => acc + m.rewardUsd, 0);

  // Claim single mission
  const handleClaim = (mission: DailyMission) => {
    if (!mission.isCompleted || mission.isClaimed) return;
    claimMissionReward(mission.rewardUsd, `Mission: ${mission.titleEn}`);
    const nextClaimed = [...claimedMissionIds, mission.id];
    saveClaimed(nextClaimed);
    setJustClaimedId(mission.id);
    setTimeout(() => setJustClaimedId(null), 2500);
  };

  // Claim all claimable
  const handleClaimAll = () => {
    if (claimableMissions.length === 0) return;
    playChime();
    const totalBonus = claimableMissions.reduce((acc, m) => acc + m.rewardUsd, 0);
    claimMissionReward(totalBonus, 'All Daily Missions Reward');
    const newClaimed = [...claimedMissionIds, ...claimableMissions.map(m => m.id)];
    saveClaimed(newClaimed);
  };

  // 1-Click Check In Handler
  const handleCheckInNow = () => {
    setStreakCheckedIn(true);
    localStorage.setItem('blueorder_streak_checked_today', 'true');
    playChime();
  };

  // Handle Action Button click
  const handleAction = (mission: DailyMission) => {
    if (mission.actionType === 'checkin') {
      handleCheckInNow();
      return;
    }

    if (mission.actionType === 'invite') {
      navigator.clipboard?.writeText(user.inviteCode);
      setInviteShared(true);
      localStorage.setItem('blueorder_mission_invite_done', 'true');
      setCopiedCode(true);
      playChime();
      setTimeout(() => setCopiedCode(false), 2000);
      if (mission.targetScreen) {
        setTimeout(() => setCurrentScreen(mission.targetScreen!), 500);
      }
      return;
    }

    if (mission.actionType === 'cheer') {
      setCheerTaskCompleted(true);
      localStorage.setItem('blueorder_mission_cheer_done', 'true');
      if (mission.targetScreen) setCurrentScreen(mission.targetScreen);
      return;
    }

    if (mission.actionType === 'rules') {
      setRulesTaskCompleted(true);
      localStorage.setItem('blueorder_mission_rules_done', 'true');
      if (mission.targetScreen) setCurrentScreen(mission.targetScreen);
      return;
    }

    if (mission.targetScreen) {
      if (mission.actionType === 'grab_orders' && onNavigateToRoom) {
        onNavigateToRoom();
      } else {
        setCurrentScreen(mission.targetScreen);
      }
    }
  };

  // 7-Day Streak Calendar Mockup
  const streakDays = [
    { day: 1, reward: 0.20, label: 'Day 1', done: true },
    { day: 2, reward: 0.30, label: 'Day 2', done: true },
    { day: 3, reward: 0.50, label: 'Day 3', done: streakCheckedIn, current: !streakCheckedIn },
    { day: 4, reward: 0.80, label: 'Day 4', done: false },
    { day: 5, reward: 1.00, label: 'Day 5', done: false },
    { day: 6, reward: 1.50, label: 'Day 6', done: false },
    { day: 7, reward: 3.00, label: 'Day 7', done: false, mega: true }
  ];

  return (
    <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      
      {/* Top Banner / Summary Strip */}
      <div className="bg-gradient-to-r from-blue-700 via-blue-800 to-indigo-900 text-white p-5 sm:p-6 relative overflow-hidden">
        {/* Glow & subtle decorative elements */}
        <div className="absolute right-0 top-0 w-64 h-64 bg-sky-400/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -left-12 -bottom-12 w-48 h-48 bg-amber-400/10 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold text-blue-200 mb-1">
                <Target className="w-4 h-4 text-amber-300" />
                <span className="uppercase tracking-wider">
                  {language === 'bn' ? 'অতিরিক্ত অ্যাফিলিয়েট প্রফিট' : 'Bonus Affiliate Program'}
                </span>
                <span aria-hidden="true" className="text-blue-300">·</span>
                <span className="text-blue-100 flex items-center gap-1 font-mono">
                  <Clock className="w-3.5 h-3.5 text-blue-200" />
                  {language === 'bn' ? 'রিসেট হতে বাকি:' : 'Resets in:'} {String(timeLeft.hours).padStart(2, '0')}:{String(timeLeft.minutes).padStart(2, '0')}:{String(timeLeft.seconds).padStart(2, '0')}
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight flex items-center gap-2">
                <span>{language === 'bn' ? 'দৈনিক অ্যাফিলিয়েট মিশন ও বোনাস' : 'Daily Affiliate Missions'}</span>
                <span className="text-xs font-bold px-2 py-0.5 rounded-lg bg-amber-400/90 text-slate-950 font-mono">
                  +100% Guaranteed
                </span>
              </h2>
              <p className="text-xs text-blue-100 mt-1 max-w-xl">
                {language === 'bn' 
                  ? 'প্রতিদিনের সহজ টাস্ক ও অর্ডার সম্পন্ন করে অতিরিক্ত কমিশন সরাসরি আপনার মূল ওয়ালেটে জমা করুন।' 
                  : 'Complete quick affiliate tasks, order milestones, and team shares to earn instant cash bonuses directly into your live wallet.'}
              </p>
            </div>

            {/* Claim All CTA if available */}
            {claimableMissions.length > 0 && (
              <div className="shrink-0 flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleClaimAll}
                  className="py-2.5 px-4 rounded-xl text-xs font-bold bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 shadow-lg shadow-amber-500/25 transition-all flex items-center gap-2 cursor-pointer animate-pulse"
                >
                  <Gift className="w-4 h-4" />
                  <span>
                    {language === 'bn'
                      ? `সব বোনাস ক্লেইম করুন (${formatMoney(totalClaimableRewardUsd)})`
                      : `Claim All Available (${formatMoney(totalClaimableRewardUsd)})`}
                  </span>
                </button>
              </div>
            )}
          </div>

          {/* Overall Progress Bar */}
          <div className="mt-5 pt-4 border-t border-white/15">
            <div className="flex items-center justify-between text-xs text-blue-100 mb-1.5">
              <div className="flex items-center gap-2 font-medium">
                <span>{language === 'bn' ? 'আজকের মিশন সম্পন্ন:' : "Today's Completed Missions:"}</span>
                <span className="font-bold text-white font-mono tabular-nums">{totalCompleted} / {totalMissions}</span>
              </div>
              <div className="text-right">
                <span className="text-amber-300 font-bold font-mono tabular-nums">{progressPercent}%</span>
              </div>
            </div>
            <div className="w-full h-2 rounded-full bg-blue-950/60 overflow-hidden border border-white/10">
              <div 
                className="h-full bg-gradient-to-r from-sky-300 via-amber-300 to-emerald-400 rounded-full transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* 7-Day Attendance Check-In Strip */}
      <div className="p-4 sm:p-5 bg-slate-50 border-b border-slate-200">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center font-bold">
              <Calendar className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-xs sm:text-sm font-bold text-slate-900">
                {language === 'bn' ? '৭ দিনের নিয়মিত অ্যাটেনডেন্স স্ট্রিক' : '7-Day Check-in Streak Rewards'}
              </h3>
              <p className="text-[11px] text-slate-500">
                {language === 'bn' 
                  ? 'টানা ৭ দিন চেক-ইন করলে ৭ম দিনে মেগা সারপ্রাইজ বক্স ($৩.০০)' 
                  : 'Maintain a 7-day daily streak to unlock the $3.00 (৳360) Mega Mystery Bonus'}
              </p>
            </div>
          </div>

          <div>
            {!streakCheckedIn ? (
              <button
                type="button"
                onClick={handleCheckInNow}
                className="py-1.5 px-3.5 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white shadow-xs transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                <span>{language === 'bn' ? 'আজকের চেক-ইন করুন (+৳৬০)' : 'Check In Now (+$0.50)'}</span>
              </button>
            ) : (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>{language === 'bn' ? 'আজকের চেক-ইন সম্পন্ন' : 'Checked In Today'}</span>
              </span>
            )}
          </div>
        </div>

        {/* 7 Day Pills */}
        <div className="grid grid-cols-7 gap-1.5 sm:gap-2">
          {streakDays.map((item) => (
            <div
              key={item.day}
              className={`p-2 rounded-xl text-center border transition-all ${
                item.done
                  ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
                  : item.current
                    ? 'bg-blue-50 border-blue-300 text-blue-900 ring-2 ring-blue-500/20 shadow-xs'
                    : item.mega
                      ? 'bg-amber-50/70 border-amber-200 text-amber-900'
                      : 'bg-white border-slate-200 text-slate-600 opacity-80'
              }`}
            >
              <div className="text-[10px] font-semibold flex items-center justify-center gap-0.5">
                {item.done ? (
                  <Check className="w-3 h-3 text-emerald-600" />
                ) : (
                  <span>{item.label}</span>
                )}
              </div>
              <div className="text-xs font-bold font-mono mt-0.5 tabular-nums">
                +{formatMoney(item.reward)}
              </div>
              <div className="text-[9px] mt-0.5 text-slate-400 font-medium">
                {item.done ? (language === 'bn' ? 'অর্জিত' : 'Done') : item.mega ? '🎁 Mega' : (language === 'bn' ? 'দিন ' + item.day : 'D' + item.day)}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Filter Tabs Strip */}
      <div className="px-4 sm:px-6 pt-4 pb-2 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        {/* Category Filter Buttons (Functional) */}
        <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-xl overflow-x-auto">
          <button
            type="button"
            onClick={() => setActiveCategory('all')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer whitespace-nowrap ${
              activeCategory === 'all'
                ? 'bg-white text-blue-700 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            {language === 'bn' ? 'সকল মিশন' : 'All Missions'} ({missions.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveCategory('orders')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer whitespace-nowrap ${
              activeCategory === 'orders'
                ? 'bg-white text-blue-700 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            {language === 'bn' ? 'অর্ডার টাস্ক' : 'Order Grabbing'}
          </button>
          <button
            type="button"
            onClick={() => setActiveCategory('affiliate')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer whitespace-nowrap ${
              activeCategory === 'affiliate'
                ? 'bg-white text-blue-700 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            {language === 'bn' ? 'টিম ও রেফারেল' : 'Affiliate Team'}
          </button>
          <button
            type="button"
            onClick={() => setActiveCategory('engagement')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer whitespace-nowrap ${
              activeCategory === 'engagement'
                ? 'bg-white text-blue-700 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            {language === 'bn' ? 'কমিউনিটি' : 'Engagement'}
          </button>
        </div>

        {/* Live Reward Badge & Notification */}
        <div className="flex items-center gap-2 text-xs text-slate-500">
          <span>{language === 'bn' ? 'মোট আনলকযোগ্য বোনাস:' : 'Total Bonus Available:'}</span>
          <span className="font-extrabold text-blue-700 font-mono tabular-nums">
            {formatMoney(missions.reduce((sum, m) => sum + m.rewardUsd, 0))}
          </span>
        </div>
      </div>

      {/* Mission Items List */}
      <div className="p-4 sm:p-6 divide-y divide-slate-100">
        {filteredMissions.map((mission) => {
          const itemProgressPercent = Math.min(
            100, 
            Math.round((mission.currentProgress / mission.targetProgress) * 100)
          );
          const isClaimableNow = mission.isCompleted && !mission.isClaimed;
          const isClaimed = mission.isClaimed;

          return (
            <div 
              key={mission.id}
              className={`py-4 first:pt-0 last:pb-0 transition-colors ${
                justClaimedId === mission.id ? 'bg-amber-50/50 rounded-2xl p-3 -mx-3' : ''
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                
                {/* Left Side: Icon & Details */}
                <div className="flex items-start gap-3 min-w-0 flex-1">
                  <div className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 font-bold shadow-xs ${
                    isClaimed
                      ? 'bg-emerald-50 text-emerald-600'
                      : isClaimableNow
                        ? 'bg-amber-100 text-amber-700 animate-bounce'
                        : mission.category === 'orders'
                          ? 'bg-blue-50 text-blue-600'
                          : mission.category === 'affiliate'
                            ? 'bg-indigo-50 text-indigo-600'
                            : 'bg-sky-50 text-sky-600'
                  }`}>
                    {isClaimed ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                    ) : isClaimableNow ? (
                      <Gift className="w-5 h-5 text-amber-600" />
                    ) : mission.category === 'orders' ? (
                      <Zap className="w-5 h-5" />
                    ) : mission.category === 'affiliate' ? (
                      <Users className="w-5 h-5" />
                    ) : (
                      <Sparkles className="w-5 h-5" />
                    )}
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h4 className="font-bold text-slate-900 text-sm">
                        {language === 'bn' ? mission.titleBn : mission.titleEn}
                      </h4>
                      <span className="text-xs font-extrabold text-amber-600 font-mono tabular-nums">
                        +{formatMoney(mission.rewardUsd)}
                      </span>
                    </div>

                    <p className="text-xs text-slate-500 mt-0.5 line-clamp-1">
                      {language === 'bn' ? mission.descriptionBn : mission.descriptionEn}
                    </p>

                    {/* Progress Bar & Status Text */}
                    <div className="mt-2.5 flex items-center gap-3 max-w-md">
                      <div className="flex-1 h-1.5 rounded-full bg-slate-100 overflow-hidden">
                        <div 
                          className={`h-full rounded-full transition-all duration-300 ${
                            isClaimed 
                              ? 'bg-emerald-500' 
                              : isClaimableNow
                                ? 'bg-amber-500'
                                : 'bg-blue-600'
                          }`}
                          style={{ width: `${itemProgressPercent}%` }}
                        />
                      </div>
                      <span className="text-[11px] font-mono font-medium text-slate-500 shrink-0 tabular-nums">
                        {mission.currentProgress} / {mission.targetProgress} {language === 'bn' ? mission.unitBn : mission.unitEn}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Right Side: Action CTA or Claim Button */}
                <div className="shrink-0 flex items-center sm:justify-end">
                  {isClaimed ? (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      <span>{language === 'bn' ? 'সংগৃহীত' : 'Claimed'}</span>
                    </span>
                  ) : isClaimableNow ? (
                    <button
                      type="button"
                      onClick={() => handleClaim(mission)}
                      className="py-2 px-4 rounded-xl text-xs font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-md shadow-amber-500/20 transition-all flex items-center gap-1.5 cursor-pointer hover:scale-102"
                    >
                      <Gift className="w-3.5 h-3.5 text-slate-950" />
                      <span>
                        {language === 'bn' 
                          ? `ক্লেইম করুন (+${formatMoney(mission.rewardUsd)})` 
                          : `Claim (+${formatMoney(mission.rewardUsd)})`}
                      </span>
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => handleAction(mission)}
                      className="py-2 px-3.5 rounded-xl text-xs font-semibold bg-slate-100 hover:bg-blue-50 text-slate-700 hover:text-blue-700 border border-slate-200 hover:border-blue-200 transition-all flex items-center gap-1.5 cursor-pointer"
                    >
                      {mission.actionType === 'invite' && (
                        <Copy className="w-3 h-3 text-slate-500" />
                      )}
                      <span>
                        {copiedCode && mission.actionType === 'invite'
                          ? (language === 'bn' ? 'কপি হয়েছে!' : 'Copied!')
                          : (language === 'bn' ? mission.actionLabelBn : mission.actionLabelEn)}
                      </span>
                      <ChevronRight className="w-3 h-3" />
                    </button>
                  )}
                </div>

              </div>
            </div>
          );
        })}
      </div>

      {/* Footer Info Strip */}
      <div className="p-3 sm:p-4 bg-slate-50 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-500">
        <div className="flex items-center gap-2">
          <Award className="w-4 h-4 text-amber-500 shrink-0" />
          <span>
            {language === 'bn'
              ? 'সকল মিশন প্রতিদিন রাত ১২:০০ টায় অটোমেটিক নতুন করে রিফ্রেশ হয়।'
              : 'All daily missions and reward quotas refresh automatically at 00:00 midnight.'}
          </span>
        </div>
        <div className="flex items-center gap-2 font-medium text-blue-600">
          <TrendingUp className="w-3.5 h-3.5" />
          <span>
            {language === 'bn' ? 'কমিশন সরাসরি ওয়ালেটে জমা হয়' : 'Direct live wallet credit'}
          </span>
        </div>
      </div>

    </div>
  );
};
