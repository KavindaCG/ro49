import React from "react";
import { motion } from "framer-motion";

export default function SimpleDonutChart({ 
  title = "Status", 
  series = [55, 35, 10],
  labels = ["Active", "Completed", "Rejected"]
}) {
  const total = series.reduce((a, b) => a + b, 0);
  const size = 160;
  const strokeWidth = 12; // Thicker, bolder stroke
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  // Modern Palette: Primary Blue, Dark Zinc, Light Zinc, Soft Gray
  const colors = ["#2563eb", "#18181b", "#71717a", "#e4e4e7"];
  const darkColors = ["#3b82f6", "#ffffff", "#a1a1aa", "#3f3f46"];

  let accumulatedPercent = 0;

  const arcs = series.map((value, i) => {
    const percent = value / total;
    const dashArray = (percent * circumference) - 4; // Gap between segments
    const offset = circumference - (accumulatedPercent * circumference);
    accumulatedPercent += percent;

    return {
      value,
      label: labels[i] || `Item ${i}`,
      color: colors[i % colors.length],
      darkColor: darkColors[i % darkColors.length],
      dashArray,
      offset,
      percentDisplay: Math.round(percent * 100)
    };
  });

  return (
    <div className="flex flex-col h-full">
      <h3 className="text-sm font-semibold text-zinc-900 dark:text-white mb-6">
        {title}
      </h3>

      <div className="flex items-center justify-between gap-8 h-full">
        {/* Chart */}
        <div className="relative flex-shrink-0">
          <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="transform -rotate-90">
             {/* Background Circle */}
            <circle cx={size/2} cy={size/2} r={radius} fill="none" strokeWidth={strokeWidth} className="stroke-zinc-100 dark:stroke-zinc-800" />
            
            {arcs.map((arc, i) => (
              <motion.circle
                key={i}
                cx={size / 2}
                cy={size / 2}
                r={radius}
                fill="none"
                stroke={arc.color}
                strokeWidth={strokeWidth}
                strokeDasharray={`${arc.dashArray} ${circumference}`}
                strokeLinecap="round"
                initial={{ strokeDashoffset: circumference + arc.offset }}
                animate={{ strokeDashoffset: arc.offset }}
                transition={{ duration: 1, delay: i * 0.1, ease: "easeOut" }}
                className="dark:hidden"
              />
            ))}
             {/* Dark Mode Arcs */}
             {arcs.map((arc, i) => (
              <motion.circle
                key={`dark-${i}`}
                cx={size / 2}
                cy={size / 2}
                r={radius}
                fill="none"
                stroke={arc.darkColor}
                strokeWidth={strokeWidth}
                strokeDasharray={`${arc.dashArray} ${circumference}`}
                strokeLinecap="round"
                initial={{ strokeDashoffset: circumference + arc.offset }}
                animate={{ strokeDashoffset: arc.offset }}
                className="hidden dark:block"
              />
            ))}
          </svg>
          
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <span className="text-2xl font-bold text-zinc-900 dark:text-white tracking-tight">
              {total}
            </span>
            <span className="text-[10px] font-medium text-zinc-400 uppercase tracking-wider">Total</span>
          </div>
        </div>

        {/* Legend */}
        <div className="flex flex-col gap-3 w-full">
          {arcs.map((arc, i) => (
            <div key={i} className="flex items-center justify-between group cursor-default">
              <div className="flex items-center gap-2">
                <span style={{ backgroundColor: arc.color }} className="w-2 h-2 rounded-full dark:hidden" />
                <span style={{ backgroundColor: arc.darkColor }} className="hidden w-2 h-2 rounded-full dark:block" />
                <span className="text-sm font-medium text-zinc-600 dark:text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-zinc-200 transition-colors">
                  {arc.label}
                </span>
              </div>
              <span className="text-sm font-bold text-zinc-900 dark:text-white">
                {arc.percentDisplay}%
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}