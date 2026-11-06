import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { FileText, CheckCircle2, Clock, AlertCircle, ShoppingBag } from 'lucide-react';
import { OrderStatus } from '../../types';

export const RecordsScreen: React.FC = () => {
  const { orders, formatMoney, setCurrentScreen, language } = useApp();
  const [filter, setFilter] = useState<'all' | OrderStatus>('all');

  const filteredOrders = filter === 'all' 
    ? orders 
    : orders.filter(o => o.status === filter);

  return (
    <div className="space-y-5 pb-20">
      
      {/* Page Title & Stats */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-slate-900">
            {language === 'bn' ? 'অর্ডার রেকর্ড ও হিস্ট্রি' : 'Order Records & History'}
          </h2>
          <p className="text-xs text-slate-500">
            {language === 'bn' ? `মোট ${orders.length}টি অর্ডার সংরক্ষিত রয়েছে` : `Total ${orders.length} orders logged`}
          </p>
        </div>
        <button
          onClick={() => setCurrentScreen('room-alibaba')}
          className="text-xs font-semibold px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white transition-colors cursor-pointer shadow-xs"
        >
          {language === 'bn' ? '+ নতুন অর্ডার গ্র্যাব' : '+ Grab Order'}
        </button>
      </div>

      {/* Filter Tabs (Interactive Segmented Buttons) */}
      <div className="flex p-1 bg-slate-100 rounded-2xl gap-1">
        {[
          { id: 'all', labelBn: 'সবগুলো', labelEn: 'All' },
          { id: 'completed', labelBn: 'সম্পন্ন', labelEn: 'Completed' },
          { id: 'pending', labelBn: 'অপেক্ষমাণ', labelEn: 'Pending' },
          { id: 'frozen', labelBn: 'স্থগিত', labelEn: 'Frozen' }
        ].map((tab) => {
          const isActive = filter === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setFilter(tab.id as 'all' | OrderStatus)}
              className={`flex-1 py-2 text-xs font-semibold rounded-xl transition-all cursor-pointer ${
                isActive
                  ? 'bg-white text-blue-700 shadow-xs'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              {language === 'bn' ? tab.labelBn : tab.labelEn}
            </button>
          );
        })}
      </div>

      {/* Orders List */}
      {filteredOrders.length === 0 ? (
        <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center space-y-3">
          <ShoppingBag className="w-12 h-12 text-slate-300 mx-auto" />
          <h4 className="font-bold text-slate-800 text-sm">
            {language === 'bn' ? 'কোনো অর্ডার রেকর্ড পাওয়া যায়নি' : 'No order records found'}
          </h4>
          <p className="text-xs text-slate-500 max-w-xs mx-auto">
            {language === 'bn' 
              ? 'কমিশন রুমে গিয়ে অর্ডার গ্র্যাব করুন এবং তাত্ক্ষণিক কমিশন উপভোগ করুন।' 
              : 'Enter a commission room to grab orders and start earning guaranteed returns.'}
          </p>
          <button
            onClick={() => setCurrentScreen('room-alibaba')}
            className="mt-2 py-2.5 px-5 rounded-xl bg-blue-600 text-white text-xs font-bold hover:bg-blue-700 transition-colors cursor-pointer"
          >
            {language === 'bn' ? 'অর্ডার রুম খুলুন' : 'Open Order Room'}
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredOrders.map((order) => {
            const isCompleted = order.status === 'completed';
            const isPending = order.status === 'pending';

            return (
              <div
                key={order.id}
                className="bg-white rounded-2xl border border-slate-200 hover:border-blue-300 hover:shadow-md transition-all p-4 space-y-3"
              >
                {/* Top Row: Platform & Order ID */}
                <div className="flex items-center justify-between text-xs pb-2 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-blue-700 font-mono">
                      {order.platform.toUpperCase()}
                    </span>
                    <span className="text-slate-400 font-mono text-[11px]">
                      {order.orderNumber}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 font-medium">
                    {isCompleted && (
                      <span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full text-[10px] font-bold flex items-center gap-1 border border-emerald-200">
                        <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                        {language === 'bn' ? 'সম্পন্ন' : 'Completed'}
                      </span>
                    )}
                    {isPending && (
                      <span className="text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full text-[10px] font-bold flex items-center gap-1 border border-amber-200">
                        <Clock className="w-3 h-3 text-amber-600" />
                        {language === 'bn' ? 'প্রক্রিয়াধীন' : 'Pending'}
                      </span>
                    )}
                    {!isCompleted && !isPending && (
                      <span className="text-rose-700 bg-rose-50 px-2 py-0.5 rounded-full text-[10px] font-bold flex items-center gap-1 border border-rose-200">
                        <AlertCircle className="w-3 h-3 text-rose-600" />
                        {language === 'bn' ? 'স্থগিত' : 'Frozen'}
                      </span>
                    )}
                  </div>
                </div>

                {/* Middle Row: Product Photo & Name */}
                <div className="flex items-center gap-3">
                  <img
                    src={order.productImage}
                    alt={order.productTitle}
                    className="w-16 h-16 rounded-xl object-cover bg-slate-50 border border-slate-100 shrink-0"
                    referrerPolicy="no-referrer"
                  />
                  <div className="min-w-0 flex-1">
                    <span className="text-[10px] font-bold text-blue-600 uppercase tracking-wide">
                      {order.category}
                    </span>
                    <h4 className="text-xs sm:text-sm font-semibold text-slate-900 line-clamp-1 mt-0.5">
                      {order.productTitle}
                    </h4>
                    <span className="text-[11px] text-slate-400 font-mono block mt-1">
                      {order.timestamp}
                    </span>
                  </div>
                </div>

                {/* Bottom Row: Financial Values */}
                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs bg-slate-50/80 -mx-4 -mb-4 p-3 rounded-b-2xl">
                  <div>
                    <span className="text-slate-500 block text-[10px]">{language === 'bn' ? 'অর্ডার মূল্য:' : 'Amount:'}</span>
                    <span className="font-bold text-slate-800 font-mono">
                      {formatMoney(order.price)}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[10px]">{language === 'bn' ? 'কমিশন হার:' : 'Rate:'}</span>
                    <span className="font-bold text-blue-600 font-mono">
                      {(order.commissionRate * 100).toFixed(0)}%
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-slate-500 block text-[10px]">{language === 'bn' ? 'অর্জিত কমিশন:' : 'Commission:'}</span>
                    <span className="font-extrabold text-emerald-600 font-mono text-sm">
                      +{formatMoney(order.commissionAmount)}
                    </span>
                  </div>
                </div>

              </div>
            );
          })}
        </div>
      )}

    </div>
  );
};
