import React from "react";
import { ArrowUpRight, TrendingUp } from "lucide-react";

export default function StatCard({ title, value, note }) {
  const isPositive = note?.includes("+") || note?.includes("%");

  return (
    <div className="group relative p-6 rounded-xl transition-all duration-200
      bg-white dark:bg-gray-800 
      border border-gray-200 dark:border-gray-700 
      hover:border-gray-300 dark:hover:border-gray-600 
      hover:shadow-sm dark:hover:shadow-gray-900/30">
      
      {/* Top Row: Title & Icon */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
          {title}
        </h3>
        
        {/* Icon */}
        <div className="p-2 rounded-lg transition-colors
          bg-gray-50 dark:bg-gray-700 
          text-gray-400 dark:text-gray-500
          group-hover:text-gray-900 dark:group-hover:text-gray-300
          group-hover:bg-gray-100 dark:group-hover:bg-gray-600">
          <TrendingUp size={18} />
        </div>
      </div>

      {/* Middle: The Big Number */}
      <div className="flex items-baseline gap-2">
        <span className="text-3xl font-bold tracking-tight
          text-gray-900 dark:text-white">
          {value}
        </span>
      </div>

      {/* Bottom: The Note/Trend */}
      {note && (
        <div className="mt-4 flex items-center gap-2">
          {isPositive ? (
            <span className="inline-flex items-center gap-1 text-xs font-medium rounded-full px-2 py-1 border
              text-emerald-600 dark:text-emerald-400
              bg-emerald-50 dark:bg-emerald-900/30
              border-emerald-100 dark:border-emerald-800">
              <ArrowUpRight size={12} />
              {note}
            </span>
          ) : (
            <span className="text-xs text-gray-500 dark:text-gray-400">
              {note}
            </span>
          )}
        </div>
      )}
    </div>
  );
}