import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Headphones, 
  Send, 
  MessageSquare, 
  ChevronDown, 
  ChevronUp, 
  Clock, 
  ExternalLink,
  ShieldCheck,
  Bot
} from 'lucide-react';
import { FAQS } from '../../data/mockData';

export const SupportScreen: React.FC = () => {
  const { chatMessages, sendSupportMessage, language } = useApp();
  const [inputText, setInputText] = useState('');
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatMessages]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    sendSupportMessage(inputText);
    setInputText('');
  };

  const quickQuestions = language === 'bn' ? [
    'ডিপোজিট কীভাবে করব?',
    'উইথড্র কত সময় লাগে?',
    '২৫টি অর্ডার কীভাবে গ্র্যাব করব?',
    'কমিশন কীভাবে জমা হয়?'
  ] : [
    'How do I deposit funds?',
    'How fast is withdrawal?',
    'How do 25 daily orders work?',
    'When is commission credited?'
  ];

  return (
    <div className="space-y-6 pb-20">
      
      {/* Header */}
      <div>
        <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
          <Headphones className="w-5 h-5 text-blue-600" />
          <span>{language === 'bn' ? '২৪/৭ কাস্টমার সাপোর্ট ও হেল্প সেন্টার' : '24/7 Customer Care & Helpdesk'}</span>
        </h2>
        <p className="text-xs text-slate-500">
          {language === 'bn' 
            ? 'যেকোনো জিজ্ঞাসা, ডিপোজিট বা উইথড্র সহায়তার জন্য সরাসরি আমাদের সাথে যোগাযোগ করুন' 
            : 'Instant live assistance, FAQs, Telegram and WhatsApp direct channels'}
        </p>
      </div>

      {/* Direct Contact Channels Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        
        {/* Telegram Channel */}
        <a 
          href="https://t.me/telegram" 
          target="_blank" 
          rel="noreferrer"
          className="flex items-center justify-between p-4 rounded-2xl bg-gradient-to-r from-sky-500 to-blue-600 text-white shadow-md shadow-sky-500/15 hover:opacity-95 transition-all group"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center text-lg">
              ✈️
            </div>
            <div>
              <span className="font-bold text-sm block">{language === 'bn' ? 'অফিসিয়াল টেলিগ্রাম চ্যানেল' : 'Official Telegram Support'}</span>
              <span className="text-[11px] text-sky-100 font-mono">@BlueOrder_Support</span>
            </div>
          </div>
          <ExternalLink className="w-4 h-4 text-white/80 group-hover:translate-x-0.5 transition-transform" />
        </a>

        {/* WhatsApp Channel */}
        <a 
          href="https://whatsapp.com" 
          target="_blank" 
          rel="noreferrer"
          className="flex items-center justify-between p-4 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md shadow-emerald-600/15 hover:opacity-95 transition-all group"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center text-lg">
              💬
            </div>
            <div>
              <span className="font-bold text-sm block">{language === 'bn' ? 'হোয়াটসঅ্যাপ হেল্পলাইন' : 'WhatsApp Helpline'}</span>
              <span className="text-[11px] text-emerald-100 font-mono">+880 1888-999000</span>
            </div>
          </div>
          <ExternalLink className="w-4 h-4 text-white/80 group-hover:translate-x-0.5 transition-transform" />
        </a>

      </div>

      {/* Live Chat Simulator */}
      <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs flex flex-col h-[480px]">
        
        {/* Chat Header */}
        <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-xs">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-slate-900 text-xs">BlueSupport 24/7</span>
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              </div>
              <span className="text-[10px] text-slate-500 block">
                {language === 'bn' ? 'গড় রেসপন্স টাইম: ৩০ সেকেন্ড' : 'Avg. Response: 30 secs'}
              </span>
            </div>
          </div>
          <span className="text-[11px] text-blue-700 bg-blue-50 px-2 py-0.5 rounded-full font-medium border border-blue-200">
            {language === 'bn' ? 'লাইভ সাপোর্ট' : 'Online'}
          </span>
        </div>

        {/* Chat Messages Body */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-slate-50/40">
          {chatMessages.map((msg) => {
            const isUser = msg.sender === 'user';
            return (
              <div 
                key={msg.id} 
                className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}
              >
                <div 
                  className={`max-w-[82%] p-3.5 rounded-2xl text-xs leading-relaxed ${
                    isUser 
                      ? 'bg-blue-600 text-white rounded-br-xs shadow-xs' 
                      : 'bg-white text-slate-800 rounded-bl-xs border border-slate-200 shadow-xs'
                  }`}
                >
                  {msg.text}
                </div>
                <span className="text-[9px] text-slate-400 mt-1 px-1 font-mono">
                  {msg.timestamp}
                </span>
              </div>
            );
          })}
          <div ref={chatEndRef} />
        </div>

        {/* Quick Suggestion Chips */}
        <div className="px-4 py-2 bg-slate-100/70 border-t border-slate-200 flex gap-2 overflow-x-auto whitespace-nowrap">
          {quickQuestions.map((q, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => sendSupportMessage(q)}
              className="text-[11px] font-medium bg-white hover:bg-blue-50 hover:text-blue-600 text-slate-600 px-3 py-1.5 rounded-xl border border-slate-200 transition-colors shrink-0 cursor-pointer"
            >
              {q}
            </button>
          ))}
        </div>

        {/* Chat Input Bar */}
        <form onSubmit={handleSend} className="p-3 bg-white border-t border-slate-200 flex gap-2">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder={language === 'bn' ? 'আপনার মেসেজ লিখুন...' : 'Type your question...'}
            className="flex-1 px-4 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-all text-slate-900"
          />
          <button
            type="submit"
            className="py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs shadow-md shadow-blue-600/20 transition-all flex items-center gap-1.5 cursor-pointer shrink-0"
          >
            <Send className="w-3.5 h-3.5" />
            <span>{language === 'bn' ? 'পাঠান' : 'Send'}</span>
          </button>
        </form>

      </div>

      {/* Frequently Asked Questions (FAQ) Accordion */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-4">
        <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
          <MessageSquare className="w-4 h-4 text-blue-600" />
          <span>{language === 'bn' ? 'সাধারণ জিজ্ঞাসাসমূহ (FAQ)' : 'Frequently Asked Questions (FAQ)'}</span>
        </h3>

        <div className="space-y-2">
          {FAQS.map((faq, index) => {
            const isOpen = openFaqIndex === index;
            return (
              <div
                key={index}
                className="rounded-2xl border border-slate-200 overflow-hidden transition-colors"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                  className="w-full p-4 text-left flex items-center justify-between text-xs font-bold text-slate-800 bg-slate-50/50 hover:bg-slate-100/50 cursor-pointer"
                >
                  <span>{language === 'bn' ? faq.qBn : faq.qEn}</span>
                  {isOpen ? <ChevronUp className="w-4 h-4 text-blue-600" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                </button>
                {isOpen && (
                  <div className="p-4 bg-white text-xs text-slate-600 leading-relaxed border-t border-slate-100">
                    {language === 'bn' ? faq.aBn : faq.aEn}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};
