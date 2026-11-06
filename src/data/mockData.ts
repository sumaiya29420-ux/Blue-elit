import { PlatformTier, OrderItem, TransactionRecord, AffiliateEarner } from '../types';

export const BANNER_IMAGE = '/src/assets/images/banner_ecommerce_blue_1793945104721.jpg';
export const ALIBABA_PRODUCT_IMG = '/src/assets/images/product_smartwatch_alibaba_1793945105399.jpg';
export const AMAZON_PRODUCT_IMG = '/src/assets/images/product_headphones_amazon_1793945105439.jpg';
export const ALIEXPRESS_PRODUCT_IMG = '/src/assets/images/product_drone_aliexpress_1793945106780.jpg';

export const PLATFORMS: PlatformTier[] = [
  {
    id: 'alibaba',
    name: 'আলিবাবা (Alibaba VIP 1)',
    englishName: 'Alibaba VIP 1',
    logo: '🛍️',
    commissionRate: 0.04,
    commissionPercentText: '4%',
    minBalance: 20,
    dailyOrdersLimit: 25,
    badgeColor: 'bg-blue-600 text-white',
    bgGradient: 'from-blue-600 to-sky-500',
    description: 'সর্বনিম্ন ব্যালেন্স $২০ (৳২,৪০০) • ৪% দৈনিক ক্যাশব্যাক কমিশন'
  },
  {
    id: 'amazon',
    name: 'আমাজন (Amazon VIP 2)',
    englishName: 'Amazon VIP 2',
    logo: '📦',
    commissionRate: 0.08,
    commissionPercentText: '8%',
    minBalance: 100,
    dailyOrdersLimit: 25,
    badgeColor: 'bg-indigo-600 text-white',
    bgGradient: 'from-indigo-600 to-blue-600',
    description: 'সর্বনিম্ন ব্যালেন্স $১০০ (৳১২,০০০) • ৮% হাই ভ্যালু কমিশন'
  },
  {
    id: 'aliexpress',
    name: 'আলিএক্সপ্রেস (AliExpress VIP 3)',
    englishName: 'AliExpress VIP 3',
    logo: '🚀',
    commissionRate: 0.12,
    commissionPercentText: '12%',
    minBalance: 300,
    dailyOrdersLimit: 25,
    badgeColor: 'bg-sky-600 text-white',
    bgGradient: 'from-sky-600 to-blue-800',
    description: 'সর্বনিম্ন ব্যালেন্স $৩০০ (৳৩৬,০০০) • ১২% প্রিমিয়াম সর্বোচ্চ কমিশন'
  }
];

export const SAMPLE_PRODUCTS = [
  {
    platform: 'alibaba' as const,
    titleBn: 'জেনিত্থ স্যাফায়ার ব্লুটুথ স্মার্টওয়াচ প্রো সিরিজ ৯',
    titleEn: 'Zenith Sapphire Bluetooth Smartwatch Pro Series 9',
    image: ALIBABA_PRODUCT_IMG,
    categoryBn: 'ইলেকট্রনিক্স গ্যাজেট',
    categoryEn: 'Electronics Gadgets',
    price: 45.00
  },
  {
    platform: 'alibaba' as const,
    titleBn: 'মেটালিক ব্লু স্মার্ট ফিটনেস ট্র্যাকার ভি৮',
    titleEn: 'Metallic Blue Smart Fitness Tracker V8',
    image: ALIBABA_PRODUCT_IMG,
    categoryBn: 'স্মার্ট পরিধানযোগ্য',
    categoryEn: 'Smart Wearables',
    price: 38.50
  },
  {
    platform: 'amazon' as const,
    titleBn: 'সনি ডব্লিউএইচ অ্যাক্টিভ নয়েজ ক্যানসেলিং হেডফোন',
    titleEn: 'Sony WH Studio Noise Cancelling ANC Headphones',
    image: AMAZON_PRODUCT_IMG,
    categoryBn: 'অডিও ও সাউন্ড সিস্টেম',
    categoryEn: 'Audio & Sound System',
    price: 92.00
  },
  {
    platform: 'amazon' as const,
    titleBn: 'মিডনাইট ব্লু প্রফেশনাল স্টুডিও ওয়্যারলেস হেডসেট',
    titleEn: 'Midnight Blue Studio Wireless Headset Hi-Res',
    image: AMAZON_PRODUCT_IMG,
    categoryBn: 'লাক্সারি গ্যাজেট',
    categoryEn: 'Luxury Gadgets',
    price: 110.00
  },
  {
    platform: 'aliexpress' as const,
    titleBn: 'এ্যারোহক কে৪ আল্ট্রা লাইট ৪কে কোয়াডকপ্টার ড্রোন',
    titleEn: 'Aerohawk K4 Ultra-Lite 4K Quadcopter Gimbal Drone',
    image: ALIEXPRESS_PRODUCT_IMG,
    categoryBn: 'হাই-টেক রোবোটিক্স',
    categoryEn: 'Hi-Tech Robotics',
    price: 165.00
  },
  {
    platform: 'aliexpress' as const,
    titleBn: 'কোবাল্ট ব্লু মিনি ব্রাশলেস মোটর জিপিএস ড্রোন',
    titleEn: 'Cobalt Blue Mini Brushless GPS Aerial Drone',
    image: ALIEXPRESS_PRODUCT_IMG,
    categoryBn: 'ড্রোন ও ক্যামেরা',
    categoryEn: 'Drones & Cameras',
    price: 180.00
  }
];

export const INITIAL_ORDERS: OrderItem[] = [
  {
    id: 'ord_101',
    orderNumber: 'ALB-20261105-8831',
    platform: 'alibaba',
    platformName: 'Alibaba 4%',
    productTitle: 'জেনিত্থ স্যাফায়ার ব্লুটুথ স্মার্টওয়াচ প্রো সিরিজ ৯',
    productImage: ALIBABA_PRODUCT_IMG,
    category: 'ইলেকট্রনিক্স গ্যাজেট',
    price: 45.00,
    commissionRate: 0.04,
    commissionAmount: 1.80,
    timestamp: '2026-11-05 21:15',
    status: 'completed'
  },
  {
    id: 'ord_102',
    orderNumber: 'AMZ-20261105-4429',
    platform: 'amazon',
    platformName: 'Amazon 8%',
    productTitle: 'সনি ডব্লিউএইচ অ্যাক্টিভ নয়েজ ক্যানসেলিং হেডফোন',
    productImage: AMAZON_PRODUCT_IMG,
    category: 'অডিও ও সাউন্ড সিস্টেম',
    price: 92.00,
    commissionRate: 0.08,
    commissionAmount: 7.36,
    timestamp: '2026-11-05 20:45',
    status: 'completed'
  },
  {
    id: 'ord_103',
    orderNumber: 'ALX-20261105-1952',
    platform: 'aliexpress',
    platformName: 'AliExpress 12%',
    productTitle: 'এ্যারোহক কে৪ আল্ট্রা লাইট ৪কে কোয়াডকপ্টার ড্রোন',
    productImage: ALIEXPRESS_PRODUCT_IMG,
    category: 'হাই-টেক রোবোটিক্স',
    price: 165.00,
    commissionRate: 0.12,
    commissionAmount: 19.80,
    timestamp: '2026-11-05 19:30',
    status: 'completed'
  },
  {
    id: 'ord_104',
    orderNumber: 'ALB-20261105-9920',
    platform: 'alibaba',
    platformName: 'Alibaba 4%',
    productTitle: 'মেটালিক ব্লু স্মার্ট ফিটনেস ট্র্যাকার ভি৮',
    productImage: ALIBABA_PRODUCT_IMG,
    category: 'স্মার্ট পরিধানযোগ্য',
    price: 38.50,
    commissionRate: 0.04,
    commissionAmount: 1.54,
    timestamp: '2026-11-05 18:10',
    status: 'completed'
  }
];

export const INITIAL_TRANSACTIONS: TransactionRecord[] = [
  {
    id: 'tx_301',
    type: 'deposit',
    method: 'bKash (বিকাশ)',
    amount: 50.00,
    fee: 0,
    status: 'approved',
    timestamp: '2026-11-05 14:20',
    txId: 'BK9A440XJ2',
    accountNumber: '017XXXXXXXX'
  },
  {
    id: 'tx_302',
    type: 'withdraw',
    method: 'Nagad (নগদ)',
    amount: 25.00,
    fee: 0.50,
    status: 'approved',
    timestamp: '2026-11-04 18:35',
    accountNumber: '019XXXXXXXX'
  },
  {
    id: 'tx_303',
    type: 'deposit',
    method: 'USDT (TRC-20)',
    amount: 100.00,
    fee: 0,
    status: 'approved',
    timestamp: '2026-11-03 11:10',
    txId: '0x88f4b1...e98c'
  }
];

export const FAQS = [
  {
    qBn: 'অর্ডার গ্র্যাবিং কীভাবে কাজ করে এবং কমিশন কত?',
    qEn: 'How does order grabbing work and what is the commission?',
    aBn: 'প্রতিদিন সর্বোচ্চ ২৫টি অর্ডার সম্পন্ন করতে পারবেন। আলিবাবা রুমে ৪%, আমাজন রুমে ৮% এবং আলিএক্সপ্রেস রুমে ১২% কমিশন সরাসরি আপনার ব্যালেন্সে যুক্ত হবে।',
    aEn: 'You can grab up to 25 orders daily. Alibaba room offers 4%, Amazon offers 8%, and AliExpress offers 12% commission instantly credited to your wallet balance.'
  },
  {
    qBn: 'ডিপোজিট কীভাবে সম্পন্ন করব (বিকাশ, নগদ, রকেট, ইউএসডিটি)?',
    qEn: 'How to deposit funds via bKash, Nagad, Rocket, or USDT?',
    aBn: 'ডিপোজিট পেজে যান, পেমেন্ট মেথড সিলেক্ট করুন, প্রদত্ত নাম্বারে সেন্ড মানি করে ট্রানজেকশন আইডি (TxID) সাবমিট করুন। ৩ থেকে ৫ মিনিটের মধ্যে ব্যালেন্স যুক্ত হবে।',
    aEn: 'Navigate to Deposit page, choose your preferred method, send funds to the verified account, and submit the Transaction ID. Funds are credited within 3-5 minutes.'
  },
  {
    qBn: 'উইথড্র করার নিয়ম ও সময়সীমা কত?',
    qEn: 'What are the withdrawal rules and processing times?',
    aBn: 'সর্বনিম্ন উইথড্র $১০ বা ৳১,২০০। প্রতিদিন সকাল ১০টা থেকে রাত ১০টা পর্যন্ত উইথড্র দেওয়া যায়। সাধারণত ১৫ থেকে ৩০ মিনিটের মধ্যে টাকা বিকাশ/নগদ/ওয়ালেটে পৌঁছে যায়।',
    aEn: 'Minimum withdrawal is $10 (approx ৳1,200). Requests are processed daily between 10:00 AM and 10:00 PM, typically arriving in 15-30 minutes.'
  },
  {
    qBn: 'রেফারেল ও টিম কমিশন কীভাবে আয় করব?',
    qEn: 'How does the referral and multi-tier team commission work?',
    aBn: 'আপনার ইনভাইট কোড শেয়ার করুন। লেভেল ১ মেম্বার থেকে ১০%, লেভেল ২ থেকে ৫% এবং লেভেল ৩ থেকে ২% তাদের দৈনিক কমিশন আয়ের উপর লাইফটাইম পাবেন।',
    aEn: 'Share your referral code/link. You earn a lifetime rebate of 10% from Level 1, 5% from Level 2, and 2% from Level 3 team daily commission earnings.'
  }
];

export const TOP_EARNERS: AffiliateEarner[] = [
  {
    id: 'earner_1',
    rank: 1,
    username: 'Tanvir Hossain',
    phoneMasked: '01712-***892',
    avatarColor: 'from-amber-400 to-amber-600',
    vipLevel: 3,
    platform: 'aliexpress',
    platformName: 'AliExpress 12%',
    dailyEarnings: 184.50, // ~$184.50 (৳22,140)
    weeklyEarnings: 940.00,
    allTimeEarnings: 5820.00,
    ordersCompletedToday: 25,
    dailyQuota: 25,
    totalOrdersCompleted: 1420,
    teamSize: 148,
    streakDays: 42,
    verifiedMethod: 'bKash',
    recentPayoutAmount: 150.00,
    recentPayoutTime: '১০ মিনিট আগে (10m ago)',
    badgeNoteBn: 'টানা ৪২ দিন ২৫/২৫ অর্ডার সম্পন্ন',
    badgeNoteEn: '42-Day 25/25 Order Streak Leader',
    cheersCount: 382,
    joinedDate: '১৫ আগস্ট ২০২৪',
    completionRate: '১০০%'
  },
  {
    id: 'earner_2',
    rank: 2,
    username: 'Shamim Reza',
    phoneMasked: '01824-***301',
    avatarColor: 'from-slate-400 to-slate-600',
    vipLevel: 3,
    platform: 'aliexpress',
    platformName: 'AliExpress 12%',
    dailyEarnings: 162.20,
    weeklyEarnings: 820.50,
    allTimeEarnings: 4910.00,
    ordersCompletedToday: 25,
    dailyQuota: 25,
    totalOrdersCompleted: 1210,
    teamSize: 96,
    streakDays: 28,
    verifiedMethod: 'Nagad',
    recentPayoutAmount: 120.00,
    recentPayoutTime: '২৫ মিনিট আগে (25m ago)',
    badgeNoteBn: '৯৬ জন অ্যাক্টিভ টিম লিডার',
    badgeNoteEn: 'Elite 96-Member Team Captain',
    cheersCount: 294,
    joinedDate: '২৮ সেপ্টেম্বর ২০২৪',
    completionRate: '১০০%'
  },
  {
    id: 'earner_3',
    rank: 3,
    username: 'Farhana Akter',
    phoneMasked: '01911-***512',
    avatarColor: 'from-amber-600 to-amber-800',
    vipLevel: 2,
    platform: 'amazon',
    platformName: 'Amazon 8%',
    dailyEarnings: 138.80,
    weeklyEarnings: 745.00,
    allTimeEarnings: 4200.00,
    ordersCompletedToday: 25,
    dailyQuota: 25,
    totalOrdersCompleted: 980,
    teamSize: 64,
    streakDays: 19,
    verifiedMethod: 'USDT',
    recentPayoutAmount: 130.00,
    recentPayoutTime: '১ ঘণ্টা আগে (1h ago)',
    badgeNoteBn: 'আমাজন ৮% রুমে দ্রুততম গ্র্যাবার',
    badgeNoteEn: 'Fastest Grabber in Amazon 8%',
    cheersCount: 241,
    joinedDate: '১০ অক্টোবর ২০২৪',
    completionRate: '১০০%'
  },
  {
    id: 'earner_4',
    rank: 4,
    username: 'Arifur Rahman',
    phoneMasked: '01678-***914',
    avatarColor: 'from-blue-500 to-indigo-600',
    vipLevel: 2,
    platform: 'amazon',
    platformName: 'Amazon 8%',
    dailyEarnings: 112.40,
    weeklyEarnings: 610.00,
    allTimeEarnings: 3350.00,
    ordersCompletedToday: 24,
    dailyQuota: 25,
    totalOrdersCompleted: 820,
    teamSize: 42,
    streakDays: 14,
    verifiedMethod: 'bKash',
    recentPayoutAmount: 85.00,
    recentPayoutTime: '২ ঘণ্টা আগে (2h ago)',
    badgeNoteBn: 'টপ টিম কমিশন পারফর্মার',
    badgeNoteEn: 'Top Tier-1 Referral Rebate Earner',
    cheersCount: 189,
    joinedDate: '৫ নভেম্বর ২০২৪',
    completionRate: '৯৬%'
  },
  {
    id: 'earner_5',
    rank: 5,
    username: 'Nusrat Jahan',
    phoneMasked: '01733-***640',
    avatarColor: 'from-purple-500 to-pink-600',
    vipLevel: 2,
    platform: 'amazon',
    platformName: 'Amazon 8%',
    dailyEarnings: 98.60,
    weeklyEarnings: 530.20,
    allTimeEarnings: 2980.00,
    ordersCompletedToday: 25,
    dailyQuota: 25,
    totalOrdersCompleted: 750,
    teamSize: 38,
    streakDays: 11,
    verifiedMethod: 'Nagad',
    recentPayoutAmount: 90.00,
    recentPayoutTime: '৩ ঘণ্টা আগে (3h ago)',
    badgeNoteBn: 'অটো রিকমেন্ডেড গ্র্যাব চ্যাম্পিয়ন',
    badgeNoteEn: 'Auto-Dispatch Speed Record',
    cheersCount: 165,
    joinedDate: '১৫ নভেম্বর ২০২৪',
    completionRate: '১০০%'
  },
  {
    id: 'earner_6',
    rank: 6,
    username: 'Rakibul Islam',
    phoneMasked: '01815-***228',
    avatarColor: 'from-emerald-500 to-teal-600',
    vipLevel: 1,
    platform: 'alibaba',
    platformName: 'Alibaba 4%',
    dailyEarnings: 74.50,
    weeklyEarnings: 410.00,
    allTimeEarnings: 2190.00,
    ordersCompletedToday: 25,
    dailyQuota: 25,
    totalOrdersCompleted: 610,
    teamSize: 31,
    streakDays: 9,
    verifiedMethod: 'bKash',
    recentPayoutAmount: 60.00,
    recentPayoutTime: '৪ ঘণ্টা আগে (4h ago)',
    badgeNoteBn: 'আলিবাবা রুমে দৈনিক ২৫ অর্ডার সম্পূর্ণ',
    badgeNoteEn: 'Alibaba VIP 1 Master Graber',
    cheersCount: 142,
    joinedDate: '১ ডিসেম্বর ২০২৪',
    completionRate: '১০০%'
  },
  {
    id: 'earner_7',
    rank: 7,
    username: 'Mehdi Hasan',
    phoneMasked: '01920-***771',
    avatarColor: 'from-sky-500 to-blue-600',
    vipLevel: 1,
    platform: 'alibaba',
    platformName: 'Alibaba 4%',
    dailyEarnings: 68.20,
    weeklyEarnings: 375.00,
    allTimeEarnings: 1840.00,
    ordersCompletedToday: 23,
    dailyQuota: 25,
    totalOrdersCompleted: 530,
    teamSize: 22,
    streakDays: 7,
    verifiedMethod: 'Rocket',
    recentPayoutAmount: 50.00,
    recentPayoutTime: '৫ ঘণ্টা আগে (5h ago)',
    badgeNoteBn: '৭ দিনের অবিরাম প্রফিট স্ট্রিক',
    badgeNoteEn: '7-Day Unbroken Profit Streak',
    cheersCount: 118,
    joinedDate: '১২ ডিসেম্বর ২০২৪',
    completionRate: '৯২%'
  },
  {
    id: 'earner_8',
    rank: 8,
    username: 'Shakil Ahmed',
    phoneMasked: '01552-***490',
    avatarColor: 'from-indigo-500 to-purple-600',
    vipLevel: 1,
    platform: 'alibaba',
    platformName: 'Alibaba 4%',
    dailyEarnings: 59.80,
    weeklyEarnings: 320.00,
    allTimeEarnings: 1560.00,
    ordersCompletedToday: 22,
    dailyQuota: 25,
    totalOrdersCompleted: 440,
    teamSize: 19,
    streakDays: 6,
    verifiedMethod: 'bKash',
    recentPayoutAmount: 45.00,
    recentPayoutTime: '৬ ঘণ্টা আগে (6h ago)',
    badgeNoteBn: 'দ্রুত বর্ধনশীল নতুন অ্যাফিলিয়েট',
    badgeNoteEn: 'Rising Star Affiliate Member',
    cheersCount: 97,
    joinedDate: '২০ ডিসেম্বর ২০২৪',
    completionRate: '৮৮%'
  }
];
