import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  ArrowDownLeft, 
  Copy, 
  Check, 
  Upload, 
  ShieldCheck, 
  Clock, 
  CheckCircle2, 
  AlertCircle 
} from 'lucide-react';

interface PaymentChannel {
  id: string;
  name: string;
  logo: string;
  type: string;
  number: string;
  instruction: string;
}

export const DepositScreen: React.FC = () => {
  const { handleDeposit, formatMoney, language, setCurrentScreen } = useApp();

  const channels: PaymentChannel[] = [
    {
      id: 'bkash',
      name: 'bKash (বিকাশ)',
      logo: '🌸',
      type: 'Send Money (Personal)',
      number: '01798-445566',
      instruction: 'বিকাশ অ্যাপ থেকে "Send Money" অপশন সিলেক্ট করে নিচের নাম্বারে টাকা পাঠান।'
    },
    {
      id: 'nagad',
      name: 'Nagad (নগদ)',
      logo: '🟠',
      type: 'Send Money (Personal)',
      number: '01889-112233',
      instruction: 'নগদ অ্যাপ অথবা *167# ডায়াল করে নিচের নাম্বারে টাকা সেন্ড মানি করুন।'
    },
    {
      id: 'rocket',
      name: 'Rocket (রকেট)',
      logo: '🚀',
      type: 'Send Money',
      number: '01911-778899-2',
      instruction: 'রকেট একাউন্ট থেকে পার্সোনাল নম্বরে ফান্ড ট্রান্সফার করুন।'
    },
    {
      id: 'usdt',
      name: 'USDT (TRC-20)',
      logo: '💲',
      type: 'Crypto Wallet',
      number: 'TX7mQp59VbK92rTaN4kXh79100ZLa1q9e8',
      instruction: 'Binance বা TrustWallet থেকে TRC-20 নেটওয়ার্কে USDT ট্রান্সফার করুন।'
    }
  ];

  const [selectedChannel, setSelectedChannel] = useState<PaymentChannel>(channels[0]);
  const [amountUsd, setAmountUsd] = useState(50);
  const [txId, setTxId] = useState('');
  const [senderNumber, setSenderNumber] = useState('');
  const [copied, setCopied] = useState(false);
  const [uploadedFileName, setUploadedFileName] = useState('');
  const [successNotice, setSuccessNotice] = useState(false);
  const [errorNotice, setErrorNotice] = useState('');

  const quickAmounts = [20, 50, 100, 250, 500];

  const handleCopy = () => {
    navigator.clipboard.writeText(selectedChannel.number);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!txId.trim()) {
      setErrorNotice(language === 'bn' ? 'অনুগ্রহ করে ট্রানজেকশন আইডি (TxID) প্রদান করুন।' : 'Please enter Transaction ID.');
      return;
    }
    if (amountUsd < 10) {
      setErrorNotice(language === 'bn' ? 'সর্বনিম্ন ডিপোজিট $১০ (৳১,২০০)।' : 'Minimum deposit is $10.');
      return;
    }

    setErrorNotice('');
    handleDeposit(selectedChannel.name, amountUsd, txId);
    setSuccessNotice(true);
    setTxId('');
    setUploadedFileName('');
    setTimeout(() => {
      setSuccessNotice(false);
      setCurrentScreen('home');
    }, 2500);
  };

  const handleFakeUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setUploadedFileName(e.target.files[0].name);
    }
  };

  return (
    <div className="space-y-6 pb-20">
      
      {/* Header */}
      <div>
        <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
          <ArrowDownLeft className="w-5 h-5 text-emerald-600" />
          <span>{language === 'bn' ? 'ব্যালেন্স রিচার্জ / ডিপোজিট' : 'Deposit & Recharge Balance'}</span>
        </h2>
        <p className="text-xs text-slate-500">
          {language === 'bn' 
            ? 'বিকাশ, নগদ, রকেট অথবা ইউএসডিটি দিয়ে তাৎক্ষণিক ব্যালেন্স যোগ করুন' 
            : 'Instant wallet top-up via local bKash/Nagad/Rocket or USDT'}
        </p>
      </div>

      {/* Success Notification */}
      {successNotice && (
        <div className="bg-emerald-600 text-white p-4 rounded-2xl shadow-lg shadow-emerald-600/20 flex items-center gap-3">
          <CheckCircle2 className="w-6 h-6 shrink-0" />
          <div className="text-xs">
            <h4 className="font-bold text-sm">
              {language === 'bn' ? 'ডিপোজিট সফল হয়েছে!' : 'Deposit Successful!'}
            </h4>
            <p className="text-emerald-100">
              {language === 'bn' 
                ? `আপনার ওয়ালেটে ${formatMoney(amountUsd)} যুক্ত করা হয়েছে। হোম পেজে ফিরে যাচ্ছি...` 
                : `${formatMoney(amountUsd)} credited to your wallet balance. Redirecting...`}
            </p>
          </div>
        </div>
      )}

      {errorNotice && (
        <div className="bg-rose-50 text-rose-700 p-3.5 rounded-2xl border border-rose-200 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
          <span>{errorNotice}</span>
        </div>
      )}

      {/* Payment Channels Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {channels.map((channel) => {
          const isSelected = selectedChannel.id === channel.id;
          return (
            <button
              key={channel.id}
              type="button"
              onClick={() => setSelectedChannel(channel)}
              className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer ${
                isSelected
                  ? 'bg-blue-50/80 border-blue-600 shadow-xs'
                  : 'bg-white border-slate-200 hover:border-slate-300'
              }`}
            >
              <div className="text-2xl mb-1.5">{channel.logo}</div>
              <h4 className="font-bold text-slate-900 text-xs">{channel.name}</h4>
              <span className="text-[10px] text-slate-500 block truncate">{channel.type}</span>
            </button>
          );
        })}
      </div>

      {/* Account Info Box to Copy */}
      <div className="bg-white rounded-3xl border border-slate-200 p-5 space-y-4 shadow-xs">
        <div>
          <span className="text-xs font-semibold text-slate-500 block mb-1">
            {language === 'bn' ? `${selectedChannel.name} প্রাপ্তকারী অ্যাকাউন্ট / ঠিকানা:` : `${selectedChannel.name} Receiving Address / Number:`}
          </span>
          <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 border border-slate-200">
            <span className="font-mono font-bold text-blue-900 text-sm select-all">
              {selectedChannel.number}
            </span>
            <button
              type="button"
              onClick={handleCopy}
              className="flex items-center gap-1.5 py-1.5 px-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold transition-all cursor-pointer shadow-xs"
            >
              {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? (language === 'bn' ? 'কপি হয়েছে' : 'Copied') : (language === 'bn' ? 'কপি করুন' : 'Copy')}</span>
            </button>
          </div>
        </div>

        <p className="text-xs text-blue-700 bg-blue-50/80 p-3 rounded-xl border border-blue-100 flex items-start gap-2">
          <Clock className="w-4 h-4 shrink-0 text-blue-600 mt-0.5" />
          <span>{selectedChannel.instruction}</span>
        </p>
      </div>

      {/* Deposit Amount & Submission Form */}
      <form onSubmit={handleSubmit} className="bg-white rounded-3xl border border-slate-200 p-6 space-y-5 shadow-xs">
        
        {/* Quick Amount Selector */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-2">
            {language === 'bn' ? 'রিচার্জের পরিমাণ নির্বাচন করুন' : 'Select Deposit Amount'}
          </label>
          <div className="grid grid-cols-5 gap-2">
            {quickAmounts.map((amt) => (
              <button
                key={amt}
                type="button"
                onClick={() => setAmountUsd(amt)}
                className={`py-2 px-1 rounded-xl text-xs font-bold font-mono transition-all border cursor-pointer ${
                  amountUsd === amt
                    ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                ${amt}
              </button>
            ))}
          </div>
          <div className="mt-2 text-right">
            <span className="text-xs text-slate-500 font-mono">
              = {formatMoney(amountUsd)}
            </span>
          </div>
        </div>

        {/* Sender Mobile Number or Wallet */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1.5">
            {language === 'bn' ? 'প্রেরক নম্বর / ওয়ালেট (যেখান থেকে টাকা পাঠিয়েছেন)' : 'Sender Account / Phone Number'}
          </label>
          <input
            type="text"
            value={senderNumber}
            onChange={(e) => setSenderNumber(e.target.value)}
            placeholder="017XXXXXXXX"
            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-all text-slate-900"
          />
        </div>

        {/* Transaction ID */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1.5">
            {language === 'bn' ? 'ট্রানজেকশন আইডি (TxID / TrxID)' : 'Transaction ID (TxID)'} *
          </label>
          <input
            type="text"
            value={txId}
            onChange={(e) => setTxId(e.target.value)}
            placeholder="e.g. BK9A440XJ2 অথবা 0x88f4b1..."
            required
            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-all font-mono text-slate-900"
          />
        </div>

        {/* Screenshot Upload Simulator */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1.5">
            {language === 'bn' ? 'পেমেন্ট স্লিপ / স্ক্রিনশট আপলোড (অপশনাল)' : 'Payment Slip / Receipt Screenshot'}
          </label>
          <label className="border-2 border-dashed border-slate-200 hover:border-blue-400 rounded-2xl p-4 flex flex-col items-center justify-center cursor-pointer transition-colors bg-slate-50/50">
            <Upload className="w-5 h-5 text-blue-600 mb-1" />
            <span className="text-xs text-slate-600 font-medium">
              {uploadedFileName || (language === 'bn' ? 'ফাইল সিলেক্ট করতে এখানে ক্লিক করুন' : 'Click to choose receipt file')}
            </span>
            <input 
              type="file" 
              accept="image/*" 
              className="hidden" 
              onChange={handleFakeUpload}
            />
          </label>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-3.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-md shadow-blue-600/25 transition-all flex items-center justify-center gap-2 cursor-pointer"
        >
          <CheckCircle2 className="w-4 h-4" />
          <span>{language === 'bn' ? `ডিপোজিট রিকোয়েস্ট নিশ্চিত করুন (${formatMoney(amountUsd)})` : `Confirm Deposit (${formatMoney(amountUsd)})`}</span>
        </button>

      </form>

      {/* Safety Notice */}
      <div className="flex items-center gap-2 text-xs text-slate-400 justify-center">
        <ShieldCheck className="w-4 h-4 text-emerald-500" />
        <span>{language === 'bn' ? 'অটো-ভেরিফিকেশন সিস্টেম ৩-৫ মিনিটের মধ্যে ব্যালেন্স নিশ্চিত করে।' : 'Auto-verification activates balance in 3-5 minutes.'}</span>
      </div>

    </div>
  );
};
