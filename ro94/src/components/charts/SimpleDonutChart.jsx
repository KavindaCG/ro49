import React from "react";
import { motion } from "framer-motion";

export default function SimpleDonutChartV2({ 
  title = "Device usage", 
  labels = ["Desktop", "Mobile", "Tablet"], 
  series = [55, 35, 10] 
}) {
  const total = series.reduce((a, b) => a + b, 0);
  
  const size = 200;
  const strokeWidth = 6;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  const lightModeColors = ["#09090b", "#52525b", "#d4d4d8"];
  const darkModeColors = ["#60a5fa", "#a855f7", "#f59e0b"];

  let accumulatedPercent = 0;

  const arcs = series.map((value, i) => {
    const percent = value / total;
    const dashArray = (percent * circumference) - 2; 
    const offset = circumference - (accumulatedPercent * circumference);
    
    accumulatedPercent += percent;

    return {
      value,
      label: labels[i],
      lightColor: lightModeColors[i % lightModeColors.length],
      darkColor: darkModeColors[i % darkModeColors.length],
      dashArray,
      offset,
      percentDisplay: Math.round(percent * 100)
    };
  });

  const mainSegment = arcs.reduce((prev, current) => (prev.value > current.value) ? prev : current);

  return (
    <div className="p-6 rounded-xl h-full flex flex-col
      bg-white dark:bg-gray-800 
      border border-gray-200 dark:border-gray-700">
      
      <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-6">
        {title}
      </h3>

      <div className="relative flex justify-center items-center mb-8">
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="transform -rotate-90">
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="#f4f4f5"
            className="dark:stroke-gray-700"
            strokeWidth={strokeWidth}
          />
            
          {arcs.map((arc, i) => (
            <motion.circle
              key={i}
              cx={size / 2}
              cy={size / 2}
              r={radius}
              fill="none"
              stroke="currentColor"
              className={`text-[${arc.lightColor}] dark:text-[${arc.darkColor}]`}
              strokeWidth={strokeWidth}
              strokeDasharray={`${arc.dashArray} ${circumference}`}
              initial={{ strokeDashoffset: circumference + arc.offset }}
              animate={{ strokeDashoffset: arc.offset }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            />
          ))}
        </svg>
        
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <span className="text-3xl font-bold tracking-tight leading-none
            text-gray-900 dark:text-white">
            {mainSegment.percentDisplay}%
          </span>
          <span className="text-xs font-medium mt-1
            text-gray-500 dark:text-gray-400">
            {mainSegment.label}
          </span>
        </div>
      </div>

      <div className="flex items-center justify-center gap-6 pt-4 mt-auto
        border-t border-gray-100 dark:border-gray-700">
        {arcs.map((arc, i) => (
          <div key={i} className="flex flex-col items-center">
            <div className="flex items-center gap-2 mb-1">
              {/* Light mode dot */}
              <span 
                style={{ backgroundColor: arc.lightColor }}
                className="w-2 h-2 rounded-full dark:hidden"
              />
              
              {/* Dark mode dot */}
              <span 
                style={{ backgroundColor: arc.darkColor }}
                className="hidden w-2 h-2 rounded-full dark:block"
              />
              
              <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
                {arc.label}
              </span>
            </div>
            <span className="text-lg font-bold text-gray-900 dark:text-white">
              {arc.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}