import React from 'react';
import { useApp } from '../../context/AppContext';
import { ScreenId } from '../../types';
import { 
  Smartphone, 
  ExternalLink, 
  Layers, 
  CheckCircle2, 
  Sparkles, 
  Zap, 
  ArrowDownLeft, 
  ArrowUpRight, 
  Users, 
  Headphones, 
  User, 
  FileText, 
  TrendingUp,
  LogIn,
  Trophy
} from 'lucide-react';

import { LoginScreen } from './LoginScreen';
import { HomeScreen } from './HomeScreen';
import { OrderGrabRoomScreen } from './OrderGrabRoomScreen';
import { CommissionScreen } from './CommissionScreen';
import { RecordsScreen } from './RecordsScreen';
import { DepositScreen } from './DepositScreen';
import { WithdrawScreen } from './WithdrawScreen';
import { InviteScreen } from './InviteScreen';
import { SupportScreen } from './SupportScreen';
import { ProfileScreen } from './ProfileScreen';
import { LeaderboardScreen } from './LeaderboardScreen';

interface ScreenCardMeta {
  id: ScreenId;
  forcedPlatformId?: 'alibaba' | 'amazon' | 'aliexpress';
  titleBn: string;
  titleEn: string;
  descriptionBn: string;
  descriptionEn: string;
  icon: React.FC<{ className?: string }>;
  tag: string;
  component: React.ReactNode;
}

export const AllScreensGallery: React.FC = () => {
  const { setCurrentScreen, setViewMode, language } = useApp();

  const handleOpenScreen = (screenId: ScreenId) => {
    setCurrentScreen(screenId);
    setViewMode('interactive');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const screenList: ScreenCardMeta[] = [
    {
      id: 'login',
      titleBn: '১. লগইন ও নিবন্ধন স্ক্রিন',
      titleEn: '1. Login & Register Screen',
      descriptionBn: 'ফোন নম্বর, পাসওয়ার্ড ও ১-ক্লিক ডেমো লগইন সুবিধা',
      descriptionEn: 'Phone auth, password, invite code & instant demo access',
      icon: LogIn,
      tag: 'Auth',
      component: <LoginScreen />
    },
    {
      id: 'home',
      titleBn: '২. হোম ড্যাশবোর্ড ও দৈনিক মিশন',
      titleEn: '2. Home Dashboard & Daily Missions',
      descriptionBn: 'ওয়ালেট ব্যালেন্স, ২৫টি অর্ডারের অগ্রগতি, দৈনিক অ্যাফিলিয়েট মিশন ও ৩টি কমিশন রুম',
      descriptionEn: 'Live wallet balance, 25-order quota, daily missions & merchant rooms',
      icon: Layers,
      tag: 'Core',
      component: <HomeScreen />
    },
    {
      id: 'room-alibaba',
      forcedPlatformId: 'alibaba',
      titleBn: '৩. আলিবাবা ৪% কমিশন রুম (Alibaba VIP 1)',
      titleEn: '3. Alibaba 4% Commission Room (VIP 1)',
      descriptionBn: 'আলিবাবা প্রোডাক্ট, ৪% কমিশন ও ২৫টি দৈনিক অর্ডার',
      descriptionEn: 'Alibaba merchandise, 4% rate & daily quota',
      icon: Zap,
      tag: 'VIP 1',
      component: <OrderGrabRoomScreen forcedPlatformId="alibaba" />
    },
    {
      id: 'room-amazon',
      forcedPlatformId: 'amazon',
      titleBn: '৪. আমাজন ৮% কমিশন রুম (Amazon VIP 2)',
      titleEn: '4. Amazon 8% Commission Room (VIP 2)',
      descriptionBn: 'আমাজন স্টুডিও প্রোডাক্ট ও ৮% উচ্চ কমিশন',
      descriptionEn: 'Amazon electronics, 8% high-value cashback',
      icon: Zap,
      tag: 'VIP 2',
      component: <OrderGrabRoomScreen forcedPlatformId="amazon" />
    },
    {
      id: 'room-aliexpress',
      forcedPlatformId: 'aliexpress',
      titleBn: '৫. আলিএক্সপ্রেস ১২% কমিশন রুম (AliExpress VIP 3)',
      titleEn: '5. AliExpress 12% Commission Room (VIP 3)',
      descriptionBn: 'আলিএক্সপ্রেস ৪কে ড্রোন গ্যাজেট ও ১২% সর্বোচ্চ কমিশন',
      descriptionEn: 'AliExpress robotics, 12% maximum return',
      icon: Zap,
      tag: 'VIP 3',
      component: <OrderGrabRoomScreen forcedPlatformId="aliexpress" />
    },
    {
      id: 'commission',
      titleBn: '৬. কমিশন ও আর্থিক রিপোর্ট',
      titleEn: '6. Commission Financial Analytics',
      descriptionBn: 'দৈনিক প্রফিট ক্যালকুলেটর ও অফিসিয়াল VIP লেভেল টেবিল',
      descriptionEn: 'Accumulated earnings, profit calculator & tier table',
      icon: TrendingUp,
      tag: 'Finance',
      component: <CommissionScreen />
    },
    {
      id: 'records',
      titleBn: '৭. অর্ডার রেকর্ড ও হিস্ট্রি',
      titleEn: '7. Order Records & History',
      descriptionBn: 'সম্পন্ন, অপেক্ষমাণ ও স্থগিত অর্ডারের বিস্তারিত তালিকা',
      descriptionEn: 'Completed, pending, and frozen order cards',
      icon: FileText,
      tag: 'History',
      component: <RecordsScreen />
    },
    {
      id: 'deposit',
      titleBn: '৮. ডিপোজিট ও ব্যালেন্স রিচার্জ',
      titleEn: '8. Deposit & Recharge',
      descriptionBn: 'বিকাশ, নগদ, রকেট, ইউএসডিটি ও TxID ভেরিফিকেশন',
      descriptionEn: 'bKash, Nagad, Rocket, USDT deposit with TxID',
      icon: ArrowDownLeft,
      tag: 'Recharge',
      component: <DepositScreen />
    },
    {
      id: 'withdraw',
      titleBn: '৯. উইথড্র ও টাকা উত্তোলন',
      titleEn: '9. Withdraw & Cash Out',
      descriptionBn: '৪ ডিজিট ট্রানজেকশন পিন সিকিউরিটি ও দ্রুত ক্যাশআউট',
      descriptionEn: '4-digit PIN verification, 2% fee, fast payout',
      icon: ArrowUpRight,
      tag: 'Payout',
      component: <WithdrawScreen />
    },
    {
      id: 'invite',
      titleBn: '১০. টিম ইনভাইট ও ৩-লেভেল রিবেট',
      titleEn: '10. Invite Friends & Team Rebates',
      descriptionBn: 'ইনভাইট কোড, কিউআর কোড এবং ১০%+৫%+২% কমিশন শেয়ারিং',
      descriptionEn: 'Referral code, QR, and 10%+5%+2% dividend network',
      icon: Users,
      tag: 'Rebate',
      component: <InviteScreen />
    },
    {
      id: 'support',
      titleBn: '১১. কাস্টমার সাপোর্ট ও লাইভ চ্যাট',
      titleEn: '11. 24/7 Live Customer Care',
      descriptionBn: '২৪/৭ অটো-চ্যাট বট, টেলিগ্রাম ও হোয়াটসঅ্যাপ চ্যানেল',
      descriptionEn: 'Interactive live chat, FAQs, Telegram & WhatsApp',
      icon: Headphones,
      tag: 'Support',
      component: <SupportScreen />
    },
    {
      id: 'profile',
      titleBn: '১২. ইউজার প্রোফাইল ও সেটিংস',
      titleEn: '12. User Profile & Account Settings',
      descriptionBn: 'ভিআইপি স্ট্যাটাস, পিন পরিবর্তন ও ভাষা/মুদ্রা কন্ট্রোল',
      descriptionEn: 'VIP tier, PIN update, language & currency controls',
      icon: User,
      tag: 'Profile',
      component: <ProfileScreen />
    },
    {
      id: 'leaderboard',
      titleBn: '১৩. শীর্ষ উপার্জনকারী লিডারবোর্ড',
      titleEn: '13. Top Earners Leaderboard',
      descriptionBn: 'পোডিয়াম ৩ চ্যাম্পিয়ন, ভেরিফাইড পেমেন্ট ও চিয়ার ইন্টারঅ্যাকশন',
      descriptionEn: 'Podium champions, verified payout proofs, and cheer competition',
      icon: Trophy,
      tag: 'Rankings',
      component: <LeaderboardScreen />
    }
  ];

  return (
    <div className="space-y-8 pb-24">
      
      {/* Top Banner Explaining the All-Screens Gallery */}
      <div className="rounded-3xl bg-gradient-to-r from-blue-700 via-blue-800 to-indigo-900 text-white p-6 sm:p-8 shadow-xl shadow-blue-900/15">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1.5 text-center sm:text-left">
            <span className="text-xs font-semibold text-blue-200 uppercase tracking-wider flex items-center justify-center sm:justify-start gap-1.5">
              <Sparkles className="w-4 h-4 text-amber-300" />
              {language === 'bn' ? 'সম্পূর্ণ অ্যাপ স্ক্রিন গ্যালারি ভিউ' : 'All App Screens Gallery Overview'}
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
              {language === 'bn' 
                ? 'অ্যাপের সবগুলো স্ক্রিন একসঙ্গে পরিদর্শন করুন' 
                : 'Inspect Every Screen of BlueOrder Pro'}
            </h1>
            <p className="text-xs text-blue-100 max-w-xl">
              {language === 'bn'
                ? 'লগইন, হোম, টপ আর্নার্স লিডারবোর্ড, আলিবাবা (৪%), আমাজন (৮%), আলিএক্সপ্রেস (১২%), দৈনিক ২৫টি অর্ডার, কমিশন, ডিপোজিট, উইথড্র, রেকর্ড, ইনভাইট ও সাপোর্ট।'
                : 'Login, Home, Top Earners Leaderboard, Alibaba 4%, Amazon 8%, AliExpress 12%, 25 Daily Orders, Commission, Deposit, Withdraw, Records, Team Invite, Customer Support, and Profile.'}
            </p>
          </div>
          <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-2xl border border-white/20 shrink-0">
            <Smartphone className="w-5 h-5 text-amber-300" />
            <span className="text-xs font-bold font-mono">13 Live Screens</span>
          </div>
        </div>
      </div>

      {/* Grid of All Screens */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {screenList.map((screen) => {
          const Icon = screen.icon;
          return (
            <div
              key={screen.id + (screen.forcedPlatformId || '')}
              className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-lg shadow-blue-900/5 hover:border-blue-400 transition-all flex flex-col"
            >
              {/* Screen Header Bar */}
              <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-xs">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-slate-900 text-sm">
                        {language === 'bn' ? screen.titleBn : screen.titleEn}
                      </h3>
                      <span className="text-[10px] px-2 py-0.5 rounded-md bg-blue-50 text-blue-700 font-bold border border-blue-200">
                        {screen.tag}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500 line-clamp-1">
                      {language === 'bn' ? screen.descriptionBn : screen.descriptionEn}
                    </p>
                  </div>
                </div>

                {/* Jump to interactive full screen button */}
                <button
                  type="button"
                  onClick={() => handleOpenScreen(screen.id)}
                  className="py-1.5 px-3 rounded-xl bg-white hover:bg-blue-50 text-blue-700 font-bold text-xs border border-slate-200 hover:border-blue-300 shadow-xs transition-all flex items-center gap-1.5 cursor-pointer shrink-0"
                >
                  <span>{language === 'bn' ? 'সরাসরি চালান' : 'Open'}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Smartphone Frame Container for each screen */}
              <div className="p-4 sm:p-6 bg-slate-100/60 overflow-y-auto max-h-[620px] flex-1">
                <div className="max-w-md mx-auto bg-white rounded-2xl border border-slate-200 p-4 shadow-sm">
                  {screen.component}
                </div>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};
