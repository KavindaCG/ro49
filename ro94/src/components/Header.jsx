import React from "react";
import { Search, Plus, Download, Bell, ChevronDown } from "lucide-react";
import { useTheme } from "../contexts/ThemeContext";
import ThemeToggle from "./ThemeToggle"; // We'll create this component

export default function Header() {
  const { isDarkMode } = useTheme();

  return (
    // Updated: Added dark mode classes for all background, border, and text elements
    <header className={`fixed top-0 left-64 right-0 z-30 flex items-center justify-between px-6 py-4 
      ${isDarkMode 
        ? 'bg-gray-900/80 backdrop-blur-2xl border-gray-700/30 ring-gray-600/30 shadow-lg shadow-black/20' 
        : 'bg-white/10 backdrop-blur-2xl border-white/20 ring-white/30 shadow-lg shadow-black/5'
      } border-b ring-1`}>
      
      {/* Left: Search (Command Palette Style) */}
      <div className="flex-1 max-w-md">
        {/* Search could be added here if needed */}
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-4">
        {/* Theme Toggle Button */}
        <ThemeToggle />
        
        {/* Primary Action - Updated for dark mode */}
        {/* <button className={`flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-lg shadow-sm transition-all hover:shadow-md
          ${isDarkMode 
            ? 'text-white bg-blue-600 hover:bg-blue-700' 
            : 'text-white bg-gray-900 hover:bg-black'
          }`}>
          <Plus size={16} />
          <span>New Client</span>
        </button> */}

        {/* Export Button - Added for better UX */}
        {/* <button className={`flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-lg transition-colors
          ${isDarkMode 
            ? 'text-gray-300 border border-gray-600 hover:bg-gray-800' 
            : 'text-gray-700 border border-gray-300 hover:bg-gray-100'
          }`}>
          <Download size={16} />
          <span>Export</span>
        </button> */}

        {/* Divider - Updated for dark mode */}
        <div className={`h-6 w-px ${isDarkMode ? 'bg-gray-600' : 'bg-white/30'} mx-1`}></div>

        {/* Notifications - Updated for dark mode */}
        <button className={`relative p-2 rounded-lg transition-colors
          ${isDarkMode 
            ? 'text-gray-400 hover:text-gray-200 hover:bg-gray-800' 
            : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
          }`}>
          <Bell size={20} />
          {/* Notification Dot */}
          <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 
            ${isDarkMode ? 'border-gray-900' : 'border-white/80'}"></span>
        </button>

        {/* Profile Dropdown - Updated for dark mode */}
        <div className={`flex items-center gap-2 cursor-pointer p-1.5 rounded-lg transition-colors
          ${isDarkMode 
            ? 'hover:bg-gray-800' 
            : 'hover:bg-white/20'
          }`}>
          <img 
            src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" 
            alt="User" 
            className={`w-8 h-8 rounded-full border
              ${isDarkMode 
                ? 'bg-gray-800 border-gray-700' 
                : 'bg-white/30 border-white/50'
              }`}
          />
          <ChevronDown size={14} className={isDarkMode ? 'text-gray-400' : 'text-gray-500'} />
        </div>
      </div>
    </header>
  );
}