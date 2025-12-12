import React from "react";
import { ArrowUpRight, ArrowDownRight, TrendingUp } from "lucide-react";

export default function StatCard({ title, value, note, icon: Icon, isDarkMode }) {
  const isPositive = note?.includes("+") || note?.includes("%");

  return (
    <div className={`group relative p-6 rounded-2xl transition-all duration-300 ease-out border shadow-sm hover:-translate-y-1
      ${isDarkMode 
        ? 'bg-[#18181b] border-zinc-800 hover:shadow-black/20' 
        : 'bg-white border-gray-200 hover:border-gray-300 hover:shadow-lg hover:shadow-gray-200/50'
      }`}>
      
      <div className="flex flex-col h-full justify-between">
        <div className="flex justify-between items-start mb-4">
          <div className={`p-2.5 rounded-xl transition-colors
            ${isDarkMode 
              ? 'bg-zinc-800 text-white' 
              : 'bg-gray-100 text-gray-900 group-hover:bg-gray-900 group-hover:text-white'
            }`}>
            {Icon ? <Icon size={20} strokeWidth={2} /> : <TrendingUp size={20} />}
          </div>
          
          {note && (
            <div className={`flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full border
              ${isPositive 
                ? (isDarkMode 
                    ? 'text-emerald-400 bg-emerald-950/30 border-emerald-900' 
                    : 'text-emerald-700 bg-emerald-50 border-emerald-100')
                : (isDarkMode 
                    ? 'text-zinc-400 bg-zinc-800 border-zinc-700' 
                    : 'text-gray-500 bg-gray-100 border-gray-200')
              }`}>
              {isPositive ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
              {note}
            </div>
          )}
        </div>

        <div>
          <h3 className={`text-sm font-medium tracking-tight mb-1
            ${isDarkMode ? 'text-zinc-400' : 'text-gray-500'}`}>
            {title}
          </h3>
          <span className={`text-3xl font-bold tracking-tighter block
            ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            {value}
          </span>
        </div>
      </div>
    </div>
  );
}