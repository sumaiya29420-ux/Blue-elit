import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Zap, 
  CheckCircle2, 
  ShieldCheck, 
  Clock, 
  RotateCcw, 
  DollarSign, 
  Layers, 
  X,
  PackageCheck,
  Sparkles
} from 'lucide-react';
import { PLATFORMS, SAMPLE_PRODUCTS } from '../../data/mockData';
import { OrderItem, PlatformTier } from '../../types';

interface OrderGrabRoomScreenProps {
  forcedPlatformId?: 'alibaba' | 'amazon' | 'aliexpress';
}

export const OrderGrabRoomScreen: React.FC<OrderGrabRoomScreenProps> = ({ forcedPlatformId }) => {
  const { 
    user, 
    activeRoom, 
    setActiveRoom, 
    formatMoney, 
    submitGrabbedOrder, 
    resetDailyOrders,
    language 
  } = useApp();

  const currentPlatform: PlatformTier = 
    PLATFORMS.find(p => p.id === forcedPlatformId) || 
    activeRoom || 
    PLATFORMS[0];

  const [isGrabbing, setIsGrabbing] = useState(false);
  const [matchingStep, setMatchingStep] = useState('');
  const [matchedOrder, setMatchedOrder] = useState<OrderItem | null>(null);
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [lastCommission, setLastCommission] = useState(0);

  const remainingOrders = Math.max(0, user.dailyOrderLimit - user.todayOrdersCount);
  const isCompletedAll = remainingOrders === 0;

  const handleStartGrab = () => {
    if (isCompletedAll) return;
    setIsGrabbing(true);

    const steps = language === 'bn' 
      ? [
          'গ্লোবাল ক্লাউড সার্ভারের সাথে সংযোগ হচ্ছে...',
          `${currentPlatform.name} মার্চেন্ট পুলে অর্ডার স্ক্যান করা হচ্ছে...`,
          'হাই-কমিশন প্রোডাক্ট অর্ডার ম্যাচ সম্পন্ন!'
        ]
      : [
          'Connecting to global cloud server...',
          `Scanning merchant pool on ${currentPlatform.englishName}...`,
          'High-commission order successfully matched!'
        ];

    setMatchingStep(steps[0]);

    setTimeout(() => {
      setMatchingStep(steps[1]);
    }, 600);

    setTimeout(() => {
      setMatchingStep(steps[2]);
    }, 1200);

    setTimeout(() => {
      setIsGrabbing(false);
      
      // Pick suitable sample product for this platform
      const candidates = SAMPLE_PRODUCTS.filter(p => p.platform === currentPlatform.id);
      const product = candidates.length > 0 ? candidates[Math.floor(Math.random() * candidates.length)] : SAMPLE_PRODUCTS[0];
      
      // Calculate realistic order price and commission
      const basePrice = product.price + Number((Math.random() * 15).toFixed(2));
      const commAmount = Number((basePrice * currentPlatform.commissionRate).toFixed(2));
      
      const newOrder: OrderItem = {
        id: `ord_${Date.now()}`,
        orderNumber: `${currentPlatform.id.toUpperCase().slice(0, 3)}-${new Date().toISOString().slice(0, 10).replace(/-/g, '')}-${Math.floor(1000 + Math.random() * 9000)}`,
        platform: currentPlatform.id,
        platformName: `${currentPlatform.englishName} (${currentPlatform.commissionPercentText})`,
        productTitle: language === 'bn' ? product.titleBn : product.titleEn,
        productImage: product.image,
        category: language === 'bn' ? product.categoryBn : product.categoryEn,
        price: basePrice,
        commissionRate: currentPlatform.commissionRate,
        commissionAmount: commAmount,
        timestamp: new Date().toISOString().replace('T', ' ').slice(0, 16),
        status: 'completed'
      };

      setMatchedOrder(newOrder);
    }, 1800);
  };

  const handleConfirmOrder = () => {
    if (!matchedOrder) return;
    submitGrabbedOrder(matchedOrder);
    setLastCommission(matchedOrder.commissionAmount);
    setMatchedOrder(null);
    setShowSuccessToast(true);
    setTimeout(() => setShowSuccessToast(false), 3000);
  };

  return (
    <div className="space-y-6 pb-20">
      
      {/* Platform Switcher Tabs */}
      <div className="flex p-1 bg-slate-200/70 rounded-2xl gap-1">
        {PLATFORMS.map((platform) => {
          const isSelected = platform.id === currentPlatform.id;
          return (
            <button
              key={platform.id}
              onClick={() => setActiveRoom(platform)}
              className={`flex-1 py-2.5 px-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                isSelected
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/25'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
              }`}
            >
              <span>{platform.logo}</span>
              <span className="whitespace-nowrap">
                {platform.id === 'alibaba' ? 'Alibaba 4%' : platform.id === 'amazon' ? 'Amazon 8%' : 'AliExpress 12%'}
              </span>
            </button>
          );
        })}
      </div>

      {/* Main Commission Room Card */}
      <div className={`rounded-3xl bg-gradient-to-br ${currentPlatform.bgGradient} text-white p-6 sm:p-8 shadow-xl shadow-blue-900/15 relative overflow-hidden`}>
        <div className="absolute -right-12 -top-12 w-48 h-48 rounded-full bg-white/10 blur-2xl pointer-events-none" />
        
        {/* Header */}
        <div className="flex items-center justify-between relative z-10 mb-6">
          <div className="flex items-center gap-3">
            <span className="text-3xl p-2.5 rounded-2xl bg-white/15 backdrop-blur-md">
              {currentPlatform.logo}
            </span>
            <div>
              <h2 className="text-xl font-extrabold text-white">
                {language === 'bn' ? currentPlatform.name : currentPlatform.englishName}
              </h2>
              <p className="text-xs text-blue-100 mt-0.5">
                {currentPlatform.description}
              </p>
            </div>
          </div>
          <div className="text-right">
            <span className="text-xs text-blue-200 block">{language === 'bn' ? 'কমিশন রেট' : 'Commission'}</span>
            <span className="text-2xl font-black text-amber-300 font-mono">
              {currentPlatform.commissionPercentText}
            </span>
          </div>
        </div>

        {/* 25 Orders Daily Quota Tracker Card */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20 relative z-10">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <PackageCheck className="w-4 h-4 text-amber-300" />
              <span className="text-xs font-semibold text-white">
                {language === 'bn' ? 'দৈনিক ২৫টি অর্ডারের অবস্থা' : 'Daily 25 Orders Status'}
              </span>
            </div>
            <span className="text-xs font-mono font-bold text-amber-300">
              {user.todayOrdersCount} / {user.dailyOrderLimit}
            </span>
          </div>

          {/* Progress Bar */}
          <div className="w-full h-3 rounded-full bg-black/20 overflow-hidden p-0.5">
            <div 
              className="h-full bg-gradient-to-r from-amber-400 to-emerald-400 rounded-full transition-all duration-300"
              style={{ width: `${(user.todayOrdersCount / user.dailyOrderLimit) * 100}%` }}
            />
          </div>

          <div className="flex items-center justify-between text-[11px] text-blue-100 mt-2">
            <span>{language === 'bn' ? `অবশিষ্ট অর্ডার: ${remainingOrders}টি` : `Remaining Orders: ${remainingOrders}`}</span>
            <span>{language === 'bn' ? 'আজকের কমিশন: ' : "Today's Profit: "} <b className="font-mono text-white">{formatMoney(user.todayCommission)}</b></span>
          </div>
        </div>

        {/* Central Grab Action Button */}
        <div className="mt-8 text-center relative z-10">
          {isCompletedAll ? (
            <div className="bg-white/15 backdrop-blur-md rounded-2xl p-4 border border-white/20 text-center space-y-2">
              <CheckCircle2 className="w-8 h-8 text-amber-300 mx-auto" />
              <h4 className="font-bold text-white text-base">
                {language === 'bn' ? 'আজকের ২৫টি অর্ডার সম্পন্ন হয়েছে!' : 'All 25 Orders Completed Today!'}
              </h4>
              <p className="text-xs text-blue-100">
                {language === 'bn' ? 'আপনার দৈনিক কমিশন ব্যালেন্সে যুক্ত করা হয়েছে। আগামীকাল আবার নতুন ২৫টি অর্ডার পাওয়া যাবে।' : 'All commissions have been added to your balance. Quota refreshes daily.'}
              </p>
              <button
                onClick={resetDailyOrders}
                className="mt-2 py-2 px-4 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-900 text-xs font-bold transition-all flex items-center justify-center gap-1.5 mx-auto cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>{language === 'bn' ? 'ডেমো রিসেট (পুনরায় ২৫টি অর্ডার করুন)' : 'Reset Demo (Order Again)'}</span>
              </button>
            </div>
          ) : (
            <button
              onClick={handleStartGrab}
              disabled={isGrabbing}
              className={`w-full sm:w-auto min-w-[280px] py-4 px-8 rounded-2xl font-extrabold text-base transition-all shadow-xl flex items-center justify-center gap-3 mx-auto cursor-pointer ${
                isGrabbing
                  ? 'bg-amber-400/80 text-slate-900 cursor-wait'
                  : 'bg-amber-400 hover:bg-amber-300 text-slate-900 hover:scale-102 active:scale-98 shadow-amber-400/30'
              }`}
            >
              <Zap className={`w-5 h-5 ${isGrabbing ? 'animate-spin' : ''}`} />
              <span>
                {isGrabbing
                  ? matchingStep
                  : (language === 'bn' ? `অর্ডার সংগ্রহ করুন (${currentPlatform.commissionPercentText} কমিশন)` : `Grab Order (${currentPlatform.commissionPercentText})`)}
              </span>
            </button>
          )}

          {!isCompletedAll && !isGrabbing && (
            <p className="text-xs text-blue-200 mt-3 flex items-center justify-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-300" />
              <span>{language === 'bn' ? 'অ্যালগরিদম মার্চেন্ট অটোমেটিক পেয়ারিং সক্রিয়' : 'Merchant auto-pairing engine active'}</span>
            </p>
          )}
        </div>

      </div>

      {/* Success Notification Alert */}
      {showSuccessToast && (
        <div className="bg-emerald-500 text-white p-4 rounded-2xl shadow-lg shadow-emerald-500/20 flex items-center justify-between animate-bounce">
          <div className="flex items-center gap-2.5">
            <CheckCircle2 className="w-5 h-5 shrink-0" />
            <span className="text-sm font-semibold">
              {language === 'bn' 
                ? `অভিনন্দন! +${formatMoney(lastCommission)} কমিশন আপনার ওয়ালেটে যুক্ত হয়েছে!` 
                : `Success! +${formatMoney(lastCommission)} commission credited to your wallet!`}
            </span>
          </div>
          <Sparkles className="w-5 h-5 text-amber-200" />
        </div>
      )}

      {/* Order Grabbing Modal */}
      {matchedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
          <div className="bg-white rounded-3xl border border-slate-200 max-w-md w-full p-6 shadow-2xl relative animate-in fade-in zoom-in-95 duration-200">
            
            {/* Modal close */}
            <button
              onClick={() => setMatchedOrder(null)}
              className="absolute right-4 top-4 text-slate-400 hover:text-slate-600 p-1 rounded-full hover:bg-slate-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Title */}
            <div className="text-center mb-4">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold mb-2">
                <Sparkles className="w-3.5 h-3.5" />
                {matchedOrder.platformName}
              </div>
              <h3 className="text-lg font-bold text-slate-900">
                {language === 'bn' ? 'অর্ডার সফলভাবে ম্যাচ হয়েছে!' : 'Order Matched Successfully!'}
              </h3>
              <p className="text-xs text-slate-500 font-mono">
                {matchedOrder.orderNumber}
              </p>
            </div>

            {/* Product Card */}
            <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100 flex items-center gap-4 mb-5">
              <img
                src={matchedOrder.productImage}
                alt={matchedOrder.productTitle}
                className="w-20 h-20 rounded-xl object-cover bg-white border border-slate-200 shadow-xs shrink-0"
                referrerPolicy="no-referrer"
              />
              <div className="min-w-0 flex-1">
                <span className="text-[11px] font-semibold text-blue-600 uppercase tracking-wide">
                  {matchedOrder.category}
                </span>
                <h4 className="font-bold text-slate-900 text-sm line-clamp-2 mt-0.5">
                  {matchedOrder.productTitle}
                </h4>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-xs text-slate-500">{language === 'bn' ? 'অর্ডারের মূল্য:' : 'Order Price:'}</span>
                  <span className="text-sm font-bold text-slate-900 font-mono">
                    {formatMoney(matchedOrder.price)}
                  </span>
                </div>
              </div>
            </div>

            {/* Financial Commission Summary */}
            <div className="space-y-2.5 bg-blue-50/70 rounded-2xl p-4 border border-blue-100 mb-6 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-slate-600">{language === 'bn' ? 'কমিশন হার:' : 'Commission Rate:'}</span>
                <span className="font-bold text-blue-700 font-mono">
                  {(matchedOrder.commissionRate * 100).toFixed(0)}%
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-600">{language === 'bn' ? 'প্রাপ্ত ক্যাশব্যাক কমিশন:' : 'Commission Profit:'}</span>
                <span className="font-extrabold text-emerald-600 font-mono text-sm">
                  +{formatMoney(matchedOrder.commissionAmount)}
                </span>
              </div>
              <div className="pt-2 border-t border-blue-200 flex items-center justify-between font-semibold">
                <span className="text-slate-800">{language === 'bn' ? 'মোট ফেরতযোগ্য ব্যালেন্স:' : 'Total Return Balance:'}</span>
                <span className="text-blue-900 font-mono">
                  {formatMoney(matchedOrder.price + matchedOrder.commissionAmount)}
                </span>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setMatchedOrder(null)}
                className="flex-1 py-3 rounded-xl border border-slate-200 text-slate-700 font-semibold text-xs hover:bg-slate-50 transition-colors cursor-pointer"
              >
                {language === 'bn' ? 'বাতিল' : 'Cancel'}
              </button>
              <button
                type="button"
                onClick={handleConfirmOrder}
                className="flex-2 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md shadow-blue-600/20 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>
                  {language === 'bn' 
                    ? `অর্ডার জমা দিন (+${formatMoney(matchedOrder.commissionAmount)})` 
                    : `Submit (+${formatMoney(matchedOrder.commissionAmount)})`}
                </span>
              </button>
            </div>

          </div>
        </div>
      )}

      {/* Room Rules & Information Section */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 space-y-4">
        <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
          <Layers className="w-4 h-4 text-blue-600" />
          <span>{language === 'bn' ? 'অর্ডার গ্র্যাবিং নিয়মাবলি ও নির্দেশিকা' : 'Order Grabbing Rules & Instructions'}</span>
        </h3>
        <ul className="text-xs text-slate-600 space-y-2.5">
          <li className="flex items-start gap-2">
            <span className="text-blue-600 font-bold">•</span>
            <span>
              {language === 'bn' 
                ? 'প্রতি অ্যাকাউন্টে প্রতিদিন সর্বোচ্চ ২৫টি অর্ডার সম্পন্ন করার কোটা প্রদান করা হয়।' 
                : 'Each user is allocated a daily quota of 25 merchant orders to fulfill.'}
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-600 font-bold">•</span>
            <span>
              {language === 'bn' 
                ? 'আলিবাবা রুমে ৪%, আমাজন রুমে ৮% এবং আলিএক্সপ্রেস রুমে ১২% কমিশন সরাসরি মূল ব্যালেন্সে ক্রেডিট হয়।' 
                : 'Alibaba room yields 4%, Amazon yields 8%, and AliExpress yields 12% instant cashback.'}
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-600 font-bold">•</span>
            <span>
              {language === 'bn' 
                ? 'অর্ডার সাবমিট করার সাথে সাথে প্রোডাক্টের আসল মূল্য ও কমিশন কোনো ধরনের বিলম্ব ছাড়াই ওয়ালেটে ফিরে আসে।' 
                : 'Order principal and commission immediately return to your wallet upon confirmation.'}
            </span>
          </li>
        </ul>
      </div>

    </div>
  );
};
