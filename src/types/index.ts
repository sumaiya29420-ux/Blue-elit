export type Language = 'bn' | 'en';
export type Currency = 'BDT' | 'USD';

export type ScreenId = 
  | 'login'
  | 'home'
  | 'room-alibaba'
  | 'room-amazon'
  | 'room-aliexpress'
  | 'commission'
  | 'records'
  | 'deposit'
  | 'withdraw'
  | 'invite'
  | 'support'
  | 'profile'
  | 'leaderboard';

export interface AffiliateEarner {
  id: string;
  rank: number;
  username: string;
  phoneMasked: string;
  avatarColor: string;
  vipLevel: 1 | 2 | 3;
  platform: 'alibaba' | 'amazon' | 'aliexpress' | 'all';
  platformName: string;
  dailyEarnings: number; // in USD
  weeklyEarnings: number; // in USD
  allTimeEarnings: number; // in USD
  ordersCompletedToday: number;
  dailyQuota: number;
  totalOrdersCompleted: number;
  teamSize: number;
  streakDays: number;
  verifiedMethod: 'bKash' | 'Nagad' | 'Rocket' | 'USDT';
  recentPayoutAmount: number; // in USD
  recentPayoutTime: string;
  badgeNoteBn: string;
  badgeNoteEn: string;
  cheersCount: number;
  joinedDate: string;
  completionRate: string;
}

export type OrderStatus = 'completed' | 'pending' | 'frozen';

export interface OrderItem {
  id: string;
  orderNumber: string;
  platform: 'alibaba' | 'amazon' | 'aliexpress';
  platformName: string;
  productTitle: string;
  productImage: string;
  category: string;
  price: number; // in USD base
  commissionRate: number; // e.g., 0.04 for 4%
  commissionAmount: number; // in USD base
  timestamp: string;
  status: OrderStatus;
}

export interface PlatformTier {
  id: 'alibaba' | 'amazon' | 'aliexpress';
  name: string;
  englishName: string;
  logo: string;
  commissionRate: number; // 0.04, 0.08, 0.12
  commissionPercentText: string;
  minBalance: number; // in USD
  dailyOrdersLimit: number; // 25
  badgeColor: string;
  bgGradient: string;
  description: string;
}

export interface TransactionRecord {
  id: string;
  type: 'deposit' | 'withdraw' | 'commission';
  method?: string; // bKash, Nagad, Rocket, USDT, Bank
  amount: number;
  fee: number;
  status: 'approved' | 'pending' | 'rejected';
  timestamp: string;
  txId?: string;
  accountNumber?: string;
}

export interface UserProfile {
  id: string;
  username: string;
  phone: string;
  email: string;
  vipLevel: number;
  balance: number; // USD
  frozenBalance: number;
  todayCommission: number;
  yesterdayCommission: number;
  totalCommission: number;
  todayOrdersCount: number;
  dailyOrderLimit: number; // 25
  inviteCode: string;
  teamCount: number;
  teamCommission: number;
  hasPin: boolean;
  pinCode: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'support';
  text: string;
  timestamp: string;
}

export type MissionCategory = 'all' | 'orders' | 'affiliate' | 'engagement';

export interface DailyMission {
  id: string;
  category: 'orders' | 'affiliate' | 'engagement';
  titleBn: string;
  titleEn: string;
  descriptionBn: string;
  descriptionEn: string;
  rewardUsd: number;
  currentProgress: number;
  targetProgress: number;
  unitBn: string;
  unitEn: string;
  actionLabelBn: string;
  actionLabelEn: string;
  targetScreen?: ScreenId;
  actionType: 'checkin' | 'grab_orders' | 'invite' | 'cheer' | 'rules' | 'vip_balance';
  isCompleted: boolean;
  isClaimed: boolean;
}

