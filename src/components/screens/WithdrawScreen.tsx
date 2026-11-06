import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  ArrowUpRight, 
  Lock, 
  ShieldCheck, 
  Clock, 
  CheckCircle2, 
  AlertCircle,
  CreditCard
} from 'lucide-react';

export const WithdrawScreen: React.FC = () => {
  const { user, formatMoney, handleWithdraw, transactions, language } = useApp();

  const methods = [
    { id: 'bkash', name: 'bKash (বিকাশ)', icon: '🌸' },
    { id: 'nagad', name: 'Nagad (নগদ)', icon: '🟠' },
    { id: 'rocket', name: 'Rocket (রকেট)', icon: '🚀' },
    { id: 'bank', name: 'Bank Transfer (ব্যাংক)', icon: '🏦' },
    { id: 'usdt', name: 'USDT TRC-20', icon: '💲' },
  ];

  const [selectedMethod, setSelectedMethod] = useState(methods[0].name);
  const [accountNumber, setAccountNumber] = useState('01712-345678');
  const [withdrawAmountUsd, setWithdrawAmountUsd] = useState(50);
  const [pin, setPin] = useState('');
  const [alertNotice, setAlertNotice] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const fee = Number((withdrawAmountUsd * 0.02).toFixed(2));
  const netArrival = Math.max(0, Number((withdrawAmountUsd - fee).toFixed(2)));

  const handleMax = () => {
    setWithdrawAmountUsd(Math.floor(user.balance));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setAlertNotice(null);

    const result = handleWithdraw(selectedMethod, withdrawAmountUsd, accountNumber, pin);
    if (result.success) {
      setAlertNotice({ type: 'success', message: result.message });
      setPin('');
    } else {
      setAlertNotice({ type: 'error', message: result.message });
    }
  };

  const withdrawHistory = transactions.filter(t => t.type === 'withdraw');

  return (
    <div className="space-y-6 pb-20">
      
      {/* Header */}
      <div>
        <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
          <ArrowUpRight className="w-5 h-5 text-blue-600" />
          <span>{language === 'bn' ? 'ব্যালেন্স উত্তোলন / উইথড্র' : 'Withdraw Earnings'}</span>
        </h2>
        <p className="text-xs text-slate-500">
          {language === 'bn' 
            ? 'বিকাশ, নগদ, রকেট অথবা সরাসরি ব্যাংকে দ্রুত টাকা উত্তোলন করুন' 
            : 'Fast withdrawals processed directly to bKash, Nagad, Rocket, or USDT'}
        </p>
      </div>

      {/* Available Balance Strip */}
      <div className="bg-gradient-to-r from-blue-700 to-indigo-800 text-white p-5 rounded-3xl shadow-lg shadow-blue-900/15 flex items-center justify-between">
        <div>
          <span className="text-xs text-blue-200 block">{language === 'bn' ? 'উত্তোলনযোগ্য ব্যালেন্স:' : 'Withdrawable Balance:'}</span>
          <span className="text-2xl sm:text-3xl font-extrabold font-mono text-white mt-0.5 block">
            {formatMoney(user.balance)}
          </span>
        </div>
        <div className="text-right">
          <span className="text-xs text-blue-200 block">{language === 'bn' ? 'স্থগিত ব্যালেন্স:' : 'Frozen Funds:'}</span>
          <span className="text-sm font-semibold font-mono text-blue-200">
            {formatMoney(user.frozenBalance)}
          </span>
        </div>
      </div>

      {/* Feedback Banner */}
      {alertNotice && (
        <div className={`p-4 rounded-2xl text-xs flex items-center gap-3 ${
          alertNotice.type === 'success' 
            ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' 
            : 'bg-rose-50 text-rose-800 border border-rose-200'
        }`}>
          {alertNotice.type === 'success' 
            ? <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" /> 
            : <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />}
          <span className="font-medium">{alertNotice.message}</span>
        </div>
      )}

      {/* Form Card */}
      <form onSubmit={handleSubmit} className="bg-white rounded-3xl border border-slate-200 p-6 space-y-5 shadow-xs">
        
        {/* Method selection */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-2">
            {language === 'bn' ? 'উইথড্র চ্যানেল নির্বাচন করুন' : 'Select Payout Channel'}
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {methods.map((m) => {
              const isSelected = selectedMethod === m.name;
              return (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => setSelectedMethod(m.name)}
                  className={`p-3 rounded-2xl border text-left text-xs font-semibold transition-all cursor-pointer flex items-center gap-2 ${
                    isSelected
                      ? 'bg-blue-50 text-blue-700 border-blue-600 shadow-xs'
                      : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <span className="text-lg">{m.icon}</span>
                  <span className="truncate">{m.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Account Number */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1.5">
            {language === 'bn' ? `${selectedMethod} অ্যাকাউন্ট / ফোন নম্বর` : `${selectedMethod} Account Number / Wallet`}
          </label>
          <input
            type="text"
            value={accountNumber}
            onChange={(e) => setAccountNumber(e.target.value)}
            placeholder="01XXXXXXXXX"
            required
            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-all font-mono text-slate-900"
          />
        </div>

        {/* Withdrawal Amount */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="text-xs font-semibold text-slate-700">
              {language === 'bn' ? 'উত্তোলনের পরিমাণ (USD)' : 'Withdrawal Amount (USD)'}
            </label>
            <button
              type="button"
              onClick={handleMax}
              className="text-xs font-bold text-blue-600 hover:text-blue-700 cursor-pointer"
            >
              {language === 'bn' ? 'সর্বোচ্চ তুলুন (Max)' : 'Max'}
            </button>
          </div>
          <div className="relative flex items-center">
            <span className="absolute left-3 text-sm font-bold text-slate-400 font-mono">$</span>
            <input
              type="number"
              min="10"
              max={user.balance}
              step="1"
              value={withdrawAmountUsd}
              onChange={(e) => setWithdrawAmountUsd(Number(e.target.value))}
              required
              className="w-full pl-8 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-all font-mono font-bold text-slate-900"
            />
          </div>
          <div className="text-right text-xs text-slate-500 font-mono mt-1">
            = {formatMoney(withdrawAmountUsd)}
          </div>
        </div>

        {/* 4-Digit Transaction Security PIN */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="text-xs font-semibold text-slate-700">
              {language === 'bn' ? '৪ ডিজিট ট্রানজেকশন পিন' : '4-Digit Transaction PIN'} *
            </label>
            <span className="text-[11px] text-slate-400 font-mono">
              (Default Demo PIN: 1234)
            </span>
          </div>
          <div className="relative flex items-center">
            <input
              type="password"
              maxLength={4}
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              placeholder="••••"
              required
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-all tracking-widest font-mono text-slate-900"
            />
            <Lock className="w-4 h-4 text-slate-400 absolute right-3 pointer-events-none" />
          </div>
        </div>

        {/* Calculation summary */}
        <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100 space-y-2 text-xs">
          <div className="flex items-center justify-between text-slate-600">
            <span>{language === 'bn' ? 'সার্ভিস চার্জ (২%):' : 'Service Fee (2%):'}</span>
            <span className="font-mono text-slate-800">{formatMoney(fee)}</span>
          </div>
          <div className="flex items-center justify-between font-bold text-slate-900 pt-1 border-t border-slate-200">
            <span>{language === 'bn' ? 'প্রকৃত প্রাপ্তি (Net Receive):' : 'Net Amount Received:'}</span>
            <span className="font-mono text-emerald-600 text-sm font-extrabold">{formatMoney(netArrival)}</span>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-3.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-md shadow-blue-600/25 transition-all flex items-center justify-center gap-2 cursor-pointer"
        >
          <ArrowUpRight className="w-4 h-4" />
          <span>{language === 'bn' ? 'উইথড্র রিকোয়েস্ট নিশ্চিত করুন' : 'Confirm Withdrawal Request'}</span>
        </button>

      </form>

      {/* Withdrawal History Card */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-4">
        <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
          <Clock className="w-4 h-4 text-blue-600" />
          <span>{language === 'bn' ? 'সাম্প্রতিক উইথড্র রেকর্ড' : 'Recent Withdrawal Records'}</span>
        </h3>

        {withdrawHistory.length === 0 ? (
          <p className="text-xs text-slate-400 text-center py-4">
            {language === 'bn' ? 'এখনো কোনো উইথড্র হিস্ট্রি নেই' : 'No withdrawal history yet'}
          </p>
        ) : (
          <div className="divide-y divide-slate-100">
            {withdrawHistory.map((tx) => (
              <div key={tx.id} className="py-3 flex items-center justify-between text-xs">
                <div>
                  <span className="font-bold text-slate-800 block">{tx.method}</span>
                  <span className="text-[11px] text-slate-400 font-mono">{tx.timestamp} · {tx.accountNumber}</span>
                </div>
                <div className="text-right">
                  <span className="font-mono font-bold text-slate-900 block">
                    -{formatMoney(tx.amount)}
                  </span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    tx.status === 'approved' 
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' 
                      : 'bg-amber-50 text-amber-700 border border-amber-200'
                  }`}>
                    {tx.status === 'approved' ? (language === 'bn' ? 'অনুমোদিত' : 'Approved') : (language === 'bn' ? 'প্রক্রিয়াধীন' : 'Pending')}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Rules Notice */}
      <div className="flex items-center gap-2 text-xs text-slate-400 justify-center">
        <ShieldCheck className="w-4 h-4 text-emerald-500" />
        <span>{language === 'bn' ? 'প্রতিদিন সকাল ১০:০০ - রাত ১০:০০ পর্যন্ত উইথড্র সাপোর্ট খোলা থাকে।' : 'Withdrawal hours: 10:00 AM – 10:00 PM Daily.'}</span>
      </div>

    </div>
  );
};
