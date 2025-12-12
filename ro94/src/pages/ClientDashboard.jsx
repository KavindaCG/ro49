import React from 'react';
import { Link } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { useTheme } from '../contexts/ThemeContext';

import {
  CheckCircle,
  Clock,
  FileText,
  User,
  ArrowUpRight,
  CreditCard,
  Calendar
} from 'lucide-react';

export default function ClientDashboard() {
  const { isDarkMode } = useTheme();

  // --- STYLE CONFIGURATION ---
  // Using more refined shades for a modern look
  const pageBg = isDarkMode ? 'bg-slate-950' : 'bg-gray-50';
  
  // Cards: Clean white/dark slate with subtle borders
  const cardBg = isDarkMode 
    ? 'bg-slate-900 border-slate-800' 
    : 'bg-white border-gray-100';
    
  const cardHover = isDarkMode 
    ? 'hover:border-slate-700' 
    : 'hover:border-blue-100 hover:shadow-md';

  // Text
  const textHeading = isDarkMode ? 'text-white' : 'text-slate-900';
  const textSub = isDarkMode ? 'text-slate-400' : 'text-slate-500';
  const textLabel = isDarkMode ? 'text-slate-500' : 'text-slate-400';

  // Icon Containers (Soft colorful backgrounds)
  const iconBoxBase = "w-10 h-10 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110 duration-300";

  return (
    <div className={`min-h-screen flex ${pageBg} font-sans transition-colors duration-300`}>
      
      <Sidebar />

      <main className="ml-64 flex-1 min-h-screen overflow-auto py-10">
        <div className="max-w-6xl mx-auto px-8">
          
          <header className="mb-10">
            <h1 className={`text-3xl font-bold tracking-tight ${textHeading}`}>Overview</h1>
            <p className={`mt-1 ${textSub}`}>Welcome back, here is your latest activity.</p>
          </header>

          {/* --- TOP SECTION: GRID LAYOUT --- */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
            
            {/* LEFT COLUMN: 2x2 STATS GRID */}
            <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-5">
              
              {/* Card 1: Completed */}
              <div className={`${cardBg} ${cardHover} border rounded-2xl p-6 relative flex flex-col justify-between h-44 transition-all duration-300 group`}>
                <div className="flex justify-between items-start">
                  <div className={`${iconBoxBase} bg-emerald-500/10 text-emerald-600`}>
                    <CheckCircle size={20} />
                  </div>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${isDarkMode ? 'bg-slate-800' : 'bg-gray-50'}`}>
                    <ArrowUpRight className={textSub} size={16} />
                  </div>
                </div>
                <div>
                  <span className={`text-xs font-semibold uppercase tracking-wider ${textLabel}`}>Status</span>
                  <h3 className={`text-2xl font-bold mt-1 ${textHeading}`}>Completed</h3>
                  <p className={`text-sm mt-1 ${textSub}`}>Stage 1 of 4</p>
                </div>
              </div>

              {/* Card 2: Documents */}
              <div className={`${cardBg} ${cardHover} border rounded-2xl p-6 relative flex flex-col justify-between h-44 transition-all duration-300 group`}>
                <div className="flex justify-between items-start">
                  <div className={`${iconBoxBase} bg-blue-500/10 text-blue-600`}>
                    <FileText size={20} />
                  </div>
                  <span className="text-sm font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded-full">60%</span>
                </div>
                <div>
                  <span className={`text-xs font-semibold uppercase tracking-wider ${textLabel}`}>Documents</span>
                  <div className="flex items-baseline gap-1 mt-1">
                    <h3 className={`text-2xl font-bold ${textHeading}`}>3</h3>
                    <span className={`text-lg ${textSub}`}>/ 5</span>
                  </div>
                  <p className={`text-sm mt-1 ${textSub}`}>Files uploaded</p>
                </div>
              </div>

              {/* Card 3: Payment */}
              <div className={`${cardBg} ${cardHover} border rounded-2xl p-6 relative flex flex-col justify-between h-44 transition-all duration-300 group`}>
                <div className="flex justify-between items-start">
                  <div className={`${iconBoxBase} bg-amber-500/10 text-amber-600`}>
                    <CreditCard size={20} />
                  </div>
                  <div className="bg-amber-100 rounded-full p-1.5">
                    <Clock className="text-amber-600" size={14} />
                  </div>
                </div>
                <div>
                  <span className={`text-xs font-semibold uppercase tracking-wider ${textLabel}`}>Payment</span>
                  <h3 className={`text-2xl font-bold mt-1 ${textHeading}`}>$2,500 <span className="text-base font-normal text-gray-400">/ $5k</span></h3>
                  <p className={`text-sm mt-1 ${textSub}`}>50% Paid</p>
                </div>
              </div>

              {/* Card 4: Expiry */}
              <div className={`${cardBg} ${cardHover} border rounded-2xl p-6 relative flex flex-col justify-between h-44 transition-all duration-300 group`}>
                <div className="flex justify-between items-start">
                  <div className={`${iconBoxBase} bg-rose-500/10 text-rose-600`}>
                    <Calendar size={20} />
                  </div>
                  <span className="text-xs font-bold text-rose-600 bg-rose-50 px-2 py-1 rounded-full">7 days left</span>
                </div>
                <div>
                  <span className={`text-xs font-semibold uppercase tracking-wider ${textLabel}`}>Expiry</span>
                  <h3 className={`text-2xl font-bold mt-1 ${textHeading}`}>Dec 10</h3>
                  <p className={`text-sm mt-1 ${textSub}`}>Passport renewal</p>
                </div>
              </div>

            </div>

            {/* RIGHT COLUMN: PROFILE CARD */}
            <div className={`lg:col-span-1 ${cardBg} border rounded-2xl p-8 flex flex-col items-center justify-center text-center relative shadow-sm`}>
              <div className="relative group cursor-pointer">
                <div className={`w-28 h-28 rounded-full flex items-center justify-center mb-5 transition-transform duration-500 group-hover:scale-105 ${isDarkMode ? 'bg-slate-800 text-slate-400' : 'bg-gradient-to-br from-gray-100 to-gray-200 text-gray-400'}`}>
                  <User size={56} />
                </div>
                <div className={`absolute bottom-2 right-2 w-4 h-4 rounded-full border-2 ${isDarkMode ? 'border-slate-900 bg-emerald-500' : 'border-white bg-emerald-500'}`}></div>
              </div>
              
              <h2 className={`text-2xl font-bold mb-1 ${textHeading}`}>John Doe</h2>
              <p className={`text-sm ${textSub} mb-1`}>john@example.com</p>
              <p className={`text-sm font-medium ${isDarkMode ? 'text-slate-300' : 'text-slate-600'} mb-8`}>+94 77 123 4567</p>

              <div className={`w-full py-4 px-6 rounded-xl text-left ${isDarkMode ? 'bg-slate-800' : 'bg-gray-50'}`}>
                <div className="flex justify-between items-center mb-1">
                  <p className={`text-xs font-bold uppercase tracking-wider ${textLabel}`}>Client ID</p>
                  <span className={`text-[10px] px-2 py-0.5 rounded font-mono ${isDarkMode ? 'bg-slate-700 text-slate-300' : 'bg-white border text-slate-600'}`}>RO94</span>
                </div>
                <p className={`text-sm font-semibold mb-3 ${textHeading}`}>CL-2025-001</p>
                
                <p className={`text-xs font-bold uppercase tracking-wider mb-1 ${textLabel}`}>Current Stage</p>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
                  <p className={`text-sm font-medium ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`}>Document Processing</p>
                </div>
              </div>
            </div>

          </div>

          {/* --- BOTTOM SECTION: APPLICATIONS LIST --- */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className={`text-xl font-bold ${textHeading}`}>Active Applications</h2>
              <button className={`text-sm font-medium hover:underline ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`}>View All</button>
            </div>
            
            <div className="space-y-3">
              {[
                { id: '01', name: 'Home Loan Application', status: 'Pending', date: 'Today, 10:23 AM' },
                { id: '02', name: 'Vehicle Lease', status: 'Approved', date: 'Yesterday, 2:30 PM' },
                { id: '03', name: 'Business Grant', status: 'Review', date: 'Dec 08, 2025' }
              ].map((app) => (
                <Link
                  key={app.id}
                  to={`/client/applications/${app.id}`}
                  className={`${cardBg} border rounded-xl p-5 flex items-center justify-between hover:scale-[1.01] hover:shadow-sm transition-all duration-200 cursor-pointer group`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${isDarkMode ? 'bg-slate-800 text-slate-400' : 'bg-gray-100 text-gray-500'} group-hover:bg-blue-600 group-hover:text-white transition-colors`}>
                      <FileText size={20} />
                    </div>
                    <div>
                      <h4 className={`font-semibold ${textHeading}`}>{app.name}</h4>
                      <p className={`text-xs ${textSub}`}>{app.date} • ID: {app.id}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium 
                      ${app.status === 'Approved' ? 'bg-emerald-100 text-emerald-700' : 
                        app.status === 'Pending' ? 'bg-amber-100 text-amber-700' : 
                        'bg-blue-100 text-blue-700'}`}>
                        {app.status}
                     </span>
                    <ArrowUpRight className={`${textSub} group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform`} size={18} />
                  </div>
                </Link>
              ))}
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}