import React from "react";
import { MoreHorizontal } from "lucide-react";

export default function ProgressCard({ title, percent = 0 }) {
  // Clamp value between 0 and 100
  const p = Math.max(0, Math.min(100, Math.round(percent)));
  
  // Dimensions
  const size = 100; // Slightly smaller for a tighter look
  const strokeWidth = 5; // Thinner, more elegant stroke
  const center = size / 2;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (p / 100) * circumference;

  return (
    <div className="flex flex-col justify-between p-5 bg-white border border-gray-200 rounded-xl hover:border-gray-300 transition-colors h-full">
      
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-sm font-medium text-gray-500">{title}</h3>
          <p className="text-xs text-gray-400 mt-1">Last 30 days</p>
        </div>
        <button className="text-gray-400 hover:text-gray-600">
          <MoreHorizontal size={16} />
        </button>
      </div>

      {/* The Chart */}
      <div className="flex items-center gap-6">
        <div className="relative">
          <svg width={size} height={size} className="transform -rotate-90">
            {/* Background Track */}
            <circle
              cx={center}
              cy={center}
              r={radius}
              fill="none"
              stroke="#F3F4F6" // gray-100
              strokeWidth={strokeWidth}
            />
            {/* Progress Arc */}
            <circle
              cx={center}
              cy={center}
              r={radius}
              fill="none"
              stroke="#111827" // gray-900 (Black)
              strokeWidth={strokeWidth}
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={offset}
              style={{ transition: "stroke-dashoffset 1s cubic-bezier(0.4, 0, 0.2, 1)" }}
            />
          </svg>
          
          {/* Centered Percentage */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-xl font-bold text-gray-900 tracking-tight">
              {p}%
            </span>
          </div>
        </div>

        {/* Text Context (Optional side info) */}
        <div className="flex flex-col justify-center space-y-1">
          <div className="flex items-center gap-2 text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full w-fit">
            On Track
          </div>
          <span className="text-xs text-gray-400">
            Target: 100%
          </span>
        </div>
      </div>
    </div>
  );
}