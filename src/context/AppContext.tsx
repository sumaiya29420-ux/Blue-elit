import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  Language, 
  Currency, 
  ScreenId, 
  UserProfile, 
  OrderItem, 
  TransactionRecord, 
  ChatMessage,
  PlatformTier
} from '../types';
import { 
  PLATFORMS, 
  SAMPLE_PRODUCTS, 
  INITIAL_ORDERS, 
  INITIAL_TRANSACTIONS,
  ALIBABA_PRODUCT_IMG,
  AMAZON_PRODUCT_IMG,
  ALIEXPRESS_PRODUCT_IMG
} from '../data/mockData';

interface AppContextType {
  user: UserProfile;
  currentScreen: ScreenId;
  setCurrentScreen: (screen: ScreenId) => void;
  viewMode: 'interactive' | 'gallery';
  setViewMode: (mode: 'interactive' | 'gallery') => void;
  language: Language;
  setLanguage: (lang: Language) => void;
  currency: Currency;
  setCurrency: (curr: Currency) => void;
  orders: OrderItem[];
  transactions: TransactionRecord[];
  chatMessages: ChatMessage[];
  activeRoom: PlatformTier | null;
  setActiveRoom: (room: PlatformTier | null) => void;
  soundEnabled: boolean;
  setSoundEnabled: (enabled: boolean) => void;
  formatMoney: (usdAmount: number) => string;
  submitGrabbedOrder: (order: OrderItem) => void;
  handleDeposit: (method: string, amount: number, txId: string) => boolean;
  handleWithdraw: (method: string, amount: number, account: string, pin: string) => { success: boolean; message: string };
  claimMissionReward: (rewardUsd: number, title: string) => void;
  sendSupportMessage: (text: string) => void;
  resetDailyOrders: () => void;
  logout: () => void;
  login: (phone: string) => void;
  playChime: () => void;
}

const USD_TO_BDT = 120; // 1 USD = 120 BDT

const initialUser: UserProfile = {
  id: 'usr_88291',
  username: 'Emdadul VIP',
  phone: '01712-345678',
  email: 'minaemdadul400@gmail.com',
  vipLevel: 2,
  balance: 345.50, // in USD
  frozenBalance: 0,
  todayCommission: 30.50,
  yesterdayCommission: 24.80,
  totalCommission: 218.40,
  todayOrdersCount: 4, // 4 out of 25 done
  dailyOrderLimit: 25,
  inviteCode: 'VIP9928',
  teamCount: 18,
  teamCommission: 86.40,
  hasPin: true,
  pinCode: '1234'
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile>(() => {
    const saved = localStorage.getItem('blueorder_user');
    return saved ? JSON.parse(saved) : initialUser;
  });

  const [currentScreen, setCurrentScreen] = useState<ScreenId>('home');
  const [viewMode, setViewMode] = useState<'interactive' | 'gallery'>('interactive');
  const [language, setLanguage] = useState<Language>('bn');
  const [currency, setCurrency] = useState<Currency>('BDT');
  const [orders, setOrders] = useState<OrderItem[]>(() => {
    const saved = localStorage.getItem('blueorder_orders');
    return saved ? JSON.parse(saved) : INITIAL_ORDERS;
  });
  const [transactions, setTransactions] = useState<TransactionRecord[]>(() => {
    const saved = localStorage.getItem('blueorder_transactions');
    return saved ? JSON.parse(saved) : INITIAL_TRANSACTIONS;
  });
  const [activeRoom, setActiveRoom] = useState<PlatformTier | null>(PLATFORMS[0]);
  const [soundEnabled, setSoundEnabled] = useState(true);

  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: 'msg_1',
      sender: 'support',
      text: 'স্বাগতম BlueOrder Pro কাস্টমার সাপোর্টে! আমি কীভাবে আপনাকে সাহায্য করতে পারি? (Welcome to customer support!)',
      timestamp: '22:00'
    }
  ]);

  useEffect(() => {
    localStorage.setItem('blueorder_user', JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    localStorage.setItem('blueorder_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('blueorder_transactions', JSON.stringify(transactions));
  }, [transactions]);

  // Audio tone generator for satisfying cash grab
  const playChime = () => {
    if (!soundEnabled) return;
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(587.33, ctx.currentTime); // D5
      osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.15); // A5
      gain.gain.setValueAtTime(0.15, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.35);
    } catch {
      // Audio context may be restricted by browser policy before user interaction
    }
  };

  const formatMoney = (usdAmount: number): string => {
    if (currency === 'BDT') {
      const bdt = usdAmount * USD_TO_BDT;
      return `৳${bdt.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    }
    return `$${usdAmount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  const submitGrabbedOrder = (order: OrderItem) => {
    playChime();
    setOrders(prev => [order, ...prev]);
    setUser(prev => {
      const newOrdersCount = Math.min(prev.todayOrdersCount + 1, prev.dailyOrderLimit);
      const newBalance = Number((prev.balance + order.commissionAmount).toFixed(2));
      const newTodayCommission = Number((prev.todayCommission + order.commissionAmount).toFixed(2));
      const newTotalCommission = Number((prev.totalCommission + order.commissionAmount).toFixed(2));
      return {
        ...prev,
        todayOrdersCount: newOrdersCount,
        balance: newBalance,
        todayCommission: newTodayCommission,
        totalCommission: newTotalCommission
      };
    });
  };

  const handleDeposit = (method: string, amountUsd: number, txId: string): boolean => {
    const newTx: TransactionRecord = {
      id: `tx_${Date.now()}`,
      type: 'deposit',
      method,
      amount: amountUsd,
      fee: 0,
      status: 'approved',
      timestamp: new Date().toISOString().replace('T', ' ').slice(0, 16),
      txId
    };
    playChime();
    setTransactions(prev => [newTx, ...prev]);
    setUser(prev => ({
      ...prev,
      balance: Number((prev.balance + amountUsd).toFixed(2))
    }));
    return true;
  };

  const handleWithdraw = (
    method: string, 
    amountUsd: number, 
    account: string, 
    pin: string
  ): { success: boolean; message: string } => {
    if (pin !== user.pinCode) {
      return {
        success: false,
        message: language === 'bn' ? 'ভুল ট্রানজেকশন পিন! অনুগ্রহ করে সঠিক পিন দিন।' : 'Incorrect transaction PIN! Please try again.'
      };
    }
    if (amountUsd < 10) {
      return {
        success: false,
        message: language === 'bn' ? 'সর্বনিম্ন উইথড্র $১০ (৳১,২০০)।' : 'Minimum withdrawal amount is $10.'
      };
    }
    if (amountUsd > user.balance) {
      return {
        success: false,
        message: language === 'bn' ? 'অপর্যাপ্ত ব্যালেন্স! আপনার ব্যালেন্সের চেয়ে বেশি উইথড্র করা যাবে না।' : 'Insufficient balance.'
      };
    }

    const fee = Number((amountUsd * 0.02).toFixed(2)); // 2% service charge
    const newTx: TransactionRecord = {
      id: `tx_${Date.now()}`,
      type: 'withdraw',
      method,
      amount: amountUsd,
      fee,
      status: 'pending',
      timestamp: new Date().toISOString().replace('T', ' ').slice(0, 16),
      accountNumber: account
    };

    setUser(prev => ({
      ...prev,
      balance: Number((prev.balance - amountUsd).toFixed(2))
    }));
    setTransactions(prev => [newTx, ...prev]);

    return {
      success: true,
      message: language === 'bn' ? 'উইথড্র রিকোয়েস্ট সফলভাবে জমা হয়েছে! ১৫-৩০ মিনিটের মধ্যে প্রসেস হবে।' : 'Withdrawal request submitted successfully! Processing in 15-30 mins.'
    };
  };

  const claimMissionReward = (rewardUsd: number, title: string) => {
    playChime();
    setUser(prev => ({
      ...prev,
      balance: Number((prev.balance + rewardUsd).toFixed(2)),
      todayCommission: Number((prev.todayCommission + rewardUsd).toFixed(2)),
      totalCommission: Number((prev.totalCommission + rewardUsd).toFixed(2))
    }));

    const newTx: TransactionRecord = {
      id: `tx_msn_${Date.now()}`,
      type: 'commission',
      method: title || 'Daily Mission Bonus',
      amount: rewardUsd,
      fee: 0,
      status: 'approved',
      timestamp: new Date().toISOString().replace('T', ' ').slice(0, 16),
      txId: `MSN${Math.floor(100000 + Math.random() * 900000)}`
    };
    setTransactions(prev => [newTx, ...prev]);
  };

  const sendSupportMessage = (text: string) => {
    if (!text.trim()) return;
    const userMsg: ChatMessage = {
      id: `msg_${Date.now()}`,
      sender: 'user',
      text: text.trim(),
      timestamp: new Date().toTimeString().slice(0, 5)
    };
    setChatMessages(prev => [...prev, userMsg]);

    // Simulated auto-responder
    setTimeout(() => {
      let reply = 'ধন্যবাদ আপনার বার্তার জন্য। আমাদের কাস্টমার সার্ভিস প্রতিনিধি আপনার অনুরোধটি পর্যবেক্ষণ করছেন। কোনো জরুরি প্রয়োজনে আমাদের অফিসিয়াল টেলিগ্রাম বা হোয়াটসঅ্যাপ হেল্পলাইনে যোগাযোগ করতে পারেন।';
      const lower = text.toLowerCase();
      if (lower.includes('deposit') || lower.includes('ডিপোজিট') || lower.includes('টাকা') || lower.includes('bkash')) {
        reply = 'ডিপোজিট সম্পর্কিত তথ্য: বিকাশ, নগদ, রকেট বা ইউএসডিটি দিয়ে ডিপোজিট করার পর ট্রানজেকশন আইডি দিন। ৩-৫ মিনিটে আপনার ব্যালেন্স আপডেট হবে।';
      } else if (lower.includes('withdraw') || lower.includes('উইথড্র') || lower.includes('টাকা তোলা')) {
        reply = 'উইথড্র সম্পর্কিত তথ্য: প্রতিদিন সকাল ১০টা - রাত ১০টা পর্যন্ত উইথড্র দেওয়া যায়। সর্বনিম্ন উইথড্র $১০ (৳১,২০০)। ১৫-৩০ মিনিটে আপনার বিকাশ/নগদে টাকা চলে আসবে।';
      } else if (lower.includes('order') || lower.includes('অর্ডার') || lower.includes('২৫') || lower.includes('commission')) {
        reply = 'অর্ডার সম্পর্কিত তথ্য: প্রতিদিন ২৫টি অর্ডার কমপ্লিট করতে পারবেন। আলিবাবা রুমে ৪%, আমাজনে ৮% এবং আলিএক্সপ্রেসে ১২% কমিশন নিশ্চিত।';
      }

      setChatMessages(prev => [
        ...prev,
        {
          id: `msg_rep_${Date.now()}`,
          sender: 'support',
          text: reply,
          timestamp: new Date().toTimeString().slice(0, 5)
        }
      ]);
    }, 1000);
  };

  const resetDailyOrders = () => {
    setUser(prev => ({ ...prev, todayOrdersCount: 0 }));
  };

  const logout = () => {
    setCurrentScreen('login');
  };

  const login = (phone: string) => {
    setUser(prev => ({
      ...prev,
      phone: phone || prev.phone
    }));
    setCurrentScreen('home');
  };

  return (
    <AppContext.Provider
      value={{
        user,
        currentScreen,
        setCurrentScreen,
        viewMode,
        setViewMode,
        language,
        setLanguage,
        currency,
        setCurrency,
        orders,
        transactions,
        chatMessages,
        activeRoom,
        setActiveRoom,
        soundEnabled,
        setSoundEnabled,
        formatMoney,
        submitGrabbedOrder,
        handleDeposit,
        handleWithdraw,
        claimMissionReward,
        sendSupportMessage,
        resetDailyOrders,
        logout,
        login,
        playChime
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
