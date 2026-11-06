import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { TrendingUp, Award, Calculator, ShieldCheck, ArrowRight, Sparkles } from 'lucide-react';

export const CommissionScreen: React.FC = () => {
  const { user, formatMoney, setCurrentScreen, setActiveRoom, language } = useApp();
  const [calcBalance, setCalcBalance] = useState(100);

  const tiers = [
    { level: 'VIP 1', platform: 'Alibaba', rate: '4%', min: 20, orders: 25, dailyEst: 20 * 0.04 * 25 * 0.15 },
    { level: 'VIP 2', platform: 'Amazon', rate: '8%', min: 100, orders: 25, dailyEst: 100 * 0.08 * 25 * 0.15 },
    { level: 'VIP 3', platform: 'AliExpress', rate: '12%', min: 300, orders: 25, dailyEst: 300 * 0.12 * 25 * 0.15 },
    { level: 'VIP 4', platform: 'Global Direct', rate: '15%', min: 800, orders: 30, dailyEst: 800 * 0.15 * 30 * 0.15 },
    { level: 'VIP 5', platform: 'Crown Merchant', rate: '18%', min: 2000, orders: 35, dailyEst: 2000 * 0.18 * 35 * 0.15 },
  ];

  // Dynamic estimated commission for selected calculator balance
  const activeRate = calcBalance >= 300 ? 0.12 : calcBalance >= 100 ? 0.08 : 0.04;
  const estimatedDaily = (calcBalance * activeRate * 0.85);

  return (
    <div className="space-y-6 pb-20">
      
      {/* Commission Analytics Header Card */}
      <div className="rounded-3xl bg-gradient-to-br from-blue-700 via-blue-800 to-indigo-900 text-white p-6 sm:p-8 shadow-xl shadow-blue-900/15 relative overflow-hidden">
        <div className="absolute right-0 top-0 w-64 h-64 bg-white/5 rounded-full blur-2xl pointer-events-none" />
        
        <div className="flex items-center justify-between relative z-10 mb-4">
          <div className="flex items-center gap-2 text-xs font-semibold text-blue-200">
            <TrendingUp className="w-4 h-4 text-amber-300" />
            <span>{language === 'bn' ? 'কমিশন ও আর্থিক রিপোর্ট' : 'Commission Financial Report'}</span>
          </div>
          <span className="text-xs px-2.5 py-1 rounded-full bg-amber-400 text-slate-900 font-bold">
            VIP {user.vipLevel} Active
          </span>
        </div>

        <div className="relative z-10">
          <span className="text-xs text-blue-200">{language === 'bn' ? 'সর্বমোট অর্জিত কমিশন' : 'Total Accumulated Commission'}</span>
          <div className="text-3xl sm:text-4xl font-extrabold text-white mt-1 font-mono">
            {formatMoney(user.totalCommission)}
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3 mt-6 pt-5 border-t border-white/15 relative z-10 text-center">
          <div>
            <span className="text-[11px] text-blue-200 block">{language === 'bn' ? 'আজকের কমিশন' : "Today's Profit"}</span>
            <span className="text-sm sm:text-base font-bold text-emerald-300 font-mono">
              +{formatMoney(user.todayCommission)}
            </span>
          </div>
          <div>
            <span className="text-[11px] text-blue-200 block">{language === 'bn' ? 'গতকালের কমিশন' : 'Yesterday'}</span>
            <span className="text-sm sm:text-base font-bold text-white font-mono">
              +{formatMoney(user.yesterdayCommission)}
            </span>
          </div>
          <div>
            <span className="text-[11px] text-blue-200 block">{language === 'bn' ? 'টিম কমিশন' : 'Team Rebate'}</span>
            <span className="text-sm sm:text-base font-bold text-amber-300 font-mono">
              +{formatMoney(user.teamCommission)}
            </span>
          </div>
        </div>

      </div>

      {/* Interactive Daily Profit Calculator */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs">
        <div className="flex items-center gap-2 mb-4">
          <div className="p-2 rounded-xl bg-blue-50 text-blue-600">
            <Calculator className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-slate-900 text-sm">
              {language === 'bn' ? 'দৈনিক সম্ভাব্য কমিশন ক্যালকুলেটর' : 'Daily Commission Profit Calculator'}
            </h3>
            <p className="text-xs text-slate-500">
              {language === 'bn' ? 'ব্যালেন্স অনুযায়ী ২৫টি অর্ডারে সম্ভাব্য আয় হিসাব করুন' : 'Estimate your 25 daily orders return based on balance'}
            </p>
          </div>
        </div>

        {/* Input slider & presets */}
        <div className="space-y-4 bg-slate-50 p-4 rounded-2xl border border-slate-100">
          <div>
            <div className="flex items-center justify-between text-xs font-semibold text-slate-700 mb-2">
              <span>{language === 'bn' ? 'আপনার ব্যালেন্স নির্বাচন করুন:' : 'Select Wallet Balance:'}</span>
              <span className="font-mono text-sm text-blue-700 font-bold">{formatMoney(calcBalance)}</span>
            </div>
            <input 
              type="range"
              min="20"
              max="1000"
              step="10"
              value={calcBalance}
              onChange={(e) => setCalcBalance(Number(e.target.value))}
              className="w-full accent-blue-600 cursor-pointer"
            />
          </div>

          <div className="flex gap-2">
            {[20, 50, 100, 300, 500].map((preset) => (
              <button
                key={preset}
                onClick={() => setCalcBalance(preset)}
                className={`flex-1 py-1.5 rounded-lg text-xs font-semibold font-mono border transition-all cursor-pointer ${
                  calcBalance === preset
                    ? 'bg-blue-600 text-white border-blue-600'
                    : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-100'
                }`}
              >
                ${preset}
              </button>
            ))}
          </div>

          {/* Result Banner */}
          <div className="pt-3 border-t border-slate-200 flex items-center justify-between">
            <div>
              <span className="text-[11px] text-slate-500 block">
                {language === 'bn' ? `প্রযোজ্য কমিশন হার (${(activeRate * 100).toFixed(0)}%)` : `Applied Tier Rate (${(activeRate * 100).toFixed(0)}%)`}
              </span>
              <span className="text-xs font-bold text-slate-800">
                {calcBalance >= 300 ? 'AliExpress VIP 3' : calcBalance >= 100 ? 'Amazon VIP 2' : 'Alibaba VIP 1'}
              </span>
            </div>
            <div className="text-right">
              <span className="text-[11px] text-slate-500 block">{language === 'bn' ? '২৫টি অর্ডারে আনুমানিক দৈনিক লাভ:' : 'Est. Daily Profit on 25 Orders:'}</span>
              <span className="text-base font-extrabold text-emerald-600 font-mono">
                +{formatMoney(estimatedDaily)}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Official VIP Tier Table */}
      <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs">
        <div className="p-5 border-b border-slate-100">
          <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
            <Award className="w-4 h-4 text-amber-500" />
            <span>{language === 'bn' ? 'অফিসিয়াল VIP লেভেল ও কমিশন কাঠামো' : 'Official VIP Commission Structure'}</span>
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            {language === 'bn' ? 'সকল লেভেলেই প্রতিদিন ২৫টি নিশ্চিত অর্ডারের সুযোগ রয়েছে' : 'Each level includes guaranteed 25 daily orders quota'}
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 border-b border-slate-100 font-semibold">
              <tr>
                <th className="py-3 px-4">{language === 'bn' ? 'লেভেল' : 'Tier'}</th>
                <th className="py-3 px-4">{language === 'bn' ? 'প্ল্যাটফর্ম' : 'Platform'}</th>
                <th className="py-3 px-4">{language === 'bn' ? 'কমিশন' : 'Rate'}</th>
                <th className="py-3 px-4">{language === 'bn' ? 'সর্বনিম্ন ব্যালেন্স' : 'Min Balance'}</th>
                <th className="py-3 px-4">{language === 'bn' ? 'দৈনিক অর্ডার' : 'Orders'}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {tiers.map((t, idx) => (
                <tr key={idx} className={t.level === `VIP ${user.vipLevel}` ? 'bg-blue-50/50 font-semibold' : ''}>
                  <td className="py-3.5 px-4 font-bold text-blue-900 flex items-center gap-1.5">
                    {t.level}
                    {t.level === `VIP ${user.vipLevel}` && (
                      <span className="text-[10px] px-1.5 py-0.2 rounded bg-blue-600 text-white">Active</span>
                    )}
                  </td>
                  <td className="py-3.5 px-4 font-medium">{t.platform}</td>
                  <td className="py-3.5 px-4 font-mono font-bold text-emerald-600">{t.rate}</td>
                  <td className="py-3.5 px-4 font-mono">{formatMoney(t.min)}</td>
                  <td className="py-3.5 px-4 font-mono">{t.orders} {language === 'bn' ? 'টি' : ''}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Multi-Tier Team Referral Reward Plan */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-3xl border border-blue-100 p-6">
        <div className="flex items-center gap-2 mb-3">
          <Sparkles className="w-5 h-5 text-blue-600" />
          <h4 className="font-bold text-slate-900 text-sm">
            {language === 'bn' ? 'টিম ইনভাইট ৩-লেভেল রিবেট বোনাস' : '3-Tier Team Invitation Rebates'}
          </h4>
        </div>
        <p className="text-xs text-slate-600 mb-4">
          {language === 'bn' 
            ? 'বন্ধুদের আমন্ত্রণ জানিয়ে তাদের প্রতিদিনের মোট কমিশন থেকে অতিরিক্ত প্যাসিভ ইনকাম অর্জন করুন।'
            : 'Invite peers to earn recurring lifetime commission dividends on every completed order.'}
        </p>

        <div className="grid grid-cols-3 gap-3 text-center">
          <div className="bg-white p-3.5 rounded-2xl border border-blue-100 shadow-xs">
            <span className="text-[11px] text-slate-500 font-semibold block">{language === 'bn' ? 'লেভেল ১ (সরাসরি)' : 'Tier 1 Direct'}</span>
            <span className="text-xl font-black text-blue-700 font-mono mt-1 block">১০%</span>
            <span className="text-[10px] text-slate-400">{language === 'bn' ? 'কমিশন রিবেট' : 'Daily Rebate'}</span>
          </div>
          <div className="bg-white p-3.5 rounded-2xl border border-blue-100 shadow-xs">
            <span className="text-[11px] text-slate-500 font-semibold block">{language === 'bn' ? 'লেভেল ২ (পরোক্ষ)' : 'Tier 2'}</span>
            <span className="text-xl font-black text-indigo-700 font-mono mt-1 block">৫%</span>
            <span className="text-[10px] text-slate-400">{language === 'bn' ? 'কমিশন রিবেট' : 'Daily Rebate'}</span>
          </div>
          <div className="bg-white p-3.5 rounded-2xl border border-blue-100 shadow-xs">
            <span className="text-[11px] text-slate-500 font-semibold block">{language === 'bn' ? 'লেভেল ৩ (টিম)' : 'Tier 3'}</span>
            <span className="text-xl font-black text-sky-700 font-mono mt-1 block">২%</span>
            <span className="text-[10px] text-slate-400">{language === 'bn' ? 'কমিশন রিবেট' : 'Daily Rebate'}</span>
          </div>
        </div>
      </div>

    </div>
  );
};
