import React from 'react';
import { useParams, Link } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { useTheme } from '../contexts/ThemeContext';
import { 
  ChevronLeft, 
  Check, 
  Plus, 
  FileText, 
  Calendar, 
  Mail, 
  Printer, 
  RefreshCw 
} from 'lucide-react';

export default function ClientApplicationDetails() {
  const { isDarkMode } = useTheme();
  const { id } = useParams(); // Use this to fetch specific client/app data

  // --- MOCK DATA (Matches screenshot image_c9731a.png) ---
  const clientData = {
    name: 'John Doe',
    appType: 'RO94 ADMIN SYSTEM',
    totalAmount: 5517.62,
    paidAmount: 1300.26,
    currency: '$',
    currentStage: 2, // 1=Registration, 2=Documents, 3=Processing, 4=Completion
    stages: [
      { id: 1, label: 'Registration', status: 'Completed - Dec 1, 2025', isComplete: true },
      { id: 2, label: 'Documents', status: 'In Progress - 3/5 docs uploaded', isComplete: false },
      { id: 3, label: 'Processing', status: 'Pending', isComplete: false },
      { id: 4, label: 'Completion', status: 'Not Started', isComplete: false },
    ]
  };

  // --- THEME STYLES ---
  const bgPage = isDarkMode ? 'bg-slate-950' : 'bg-white';
  const textMain = isDarkMode ? 'text-white' : 'text-slate-900';
  const textSub = isDarkMode ? 'text-slate-400' : 'text-slate-500';
  
  // Grey Containers (Matches the grey blocks in your screenshot)
  const containerBg = isDarkMode ? 'bg-slate-900' : 'bg-gray-200';
  const actionBtnHover = isDarkMode ? 'hover:bg-slate-800' : 'hover:bg-gray-300';
  const progressBarBg = isDarkMode ? 'bg-slate-700' : 'bg-white';

  // Calculate percentage for Payment Bar
  const paymentPercentage = ((clientData.paidAmount / clientData.totalAmount) * 100).toFixed(2);

  return (
    <div className={`min-h-screen flex ${bgPage} font-sans transition-colors duration-300`}>
      <Sidebar />

      <main className="ml-64 flex-1 min-h-screen overflow-auto py-8">
        <div className="max-w-5xl mx-auto px-8">
          
          {/* 1. HEADER SECTION (Matches "Hi, John Doe" block) */}
          <div className={`${containerBg} rounded-xl p-8 mb-8`}>
            <h1 className={`text-3xl font-bold mb-1 ${textMain}`}>Hi, {clientData.name}</h1>
            <p className={`text-sm ${textSub}`}>Welcome to {clientData.appType}</p>
          </div>

          {/* 2. PROGRESS STEPPER */}
          <div className="mb-10">
            <h2 className={`text-xl font-bold mb-8 ${textMain}`}>Application Progress</h2>
            
            <div className="relative flex items-center justify-between px-4 md:px-12">
              {/* Background Line */}
              <div className={`absolute top-5 left-0 w-full h-1 ${isDarkMode ? 'bg-slate-800' : 'bg-gray-200'} -z-0`}></div>
              
              {/* Active Line (Dynamic width based on stage) */}
              <div 
                className="absolute top-5 left-0 h-1 bg-slate-900 -z-0 transition-all duration-1000 dark:bg-slate-500" 
                style={{ width: '30%' }} 
              ></div>

              {clientData.stages.map((stage, index) => {
                // Determine styling based on active stage
                const isActive = stage.id === clientData.currentStage;
                const isPast = stage.id < clientData.currentStage;
                
                return (
                  <div key={stage.id} className="relative flex flex-col items-center z-10">
                    {/* Circle Node */}
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold border-4 transition-all
                      ${isPast 
                        ? 'bg-slate-400 border-slate-400 text-white' // Completed grey
                        : isActive 
                          ? 'bg-white border-slate-300 text-slate-700 shadow-sm' // Active white
                          : 'bg-white border-gray-200 text-gray-300' // Future empty
                      }`}
                    >
                      {isPast ? <Check size={16} /> : stage.id}
                    </div>

                    {/* Labels */}
                    <div className="text-center mt-3 w-32">
                      <p className={`text-xs font-bold uppercase ${textMain}`}>Stage {stage.id}:</p>
                      <p className={`text-sm font-bold leading-tight ${textMain}`}>{stage.label}</p>
                      <p className={`text-[10px] mt-1 font-medium ${textSub} leading-tight`}>
                        {stage.status}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 3. PAYMENT SECTION (Matches "$ 1,300.26" block) */}
          <div className={`${containerBg} rounded-xl p-8 mb-10`}>
            <div className="mb-2">
              <h2 className={`text-3xl font-bold ${textMain}`}>
                {clientData.currency} {clientData.paidAmount.toLocaleString()}
              </h2>
              <p className={`text-sm font-semibold mt-1 ${textSub}`}>
                Total Paid {paymentPercentage}% of {clientData.currency} {clientData.totalAmount.toLocaleString()}
              </p>
            </div>

            {/* Progress Bar Container */}
            <div className="relative w-full mt-4 mb-6">
              {/* Label above thumb */}
              <div 
                className="absolute -top-6 text-xs font-bold text-slate-600 dark:text-slate-400 transition-all"
                style={{ left: `${paymentPercentage}%`, transform: 'translateX(-50%)' }}
              >
                {paymentPercentage}%
              </div>

              {/* Bar Track */}
              <div className={`w-full h-3 rounded-full ${progressBarBg}`}>
                {/* Bar Fill */}
                <div 
                  className="h-full rounded-full bg-slate-600 relative"
                  style={{ width: `${paymentPercentage}%` }}
                >
                  {/* Thumb Circle */}
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-5 h-5 bg-slate-600 border-4 border-gray-200 rounded-full shadow-sm"></div>
                </div>
              </div>
              
              <div className="flex justify-between mt-2 text-xs font-medium text-slate-500">
                <span>Paid: {clientData.currency} {clientData.paidAmount.toLocaleString()}</span>
                <span>Total: {clientData.currency} {clientData.totalAmount.toLocaleString()}</span>
              </div>
            </div>

            {/* Record Payment Button */}
            <button className={`flex items-center gap-2 px-6 py-3 rounded-lg font-bold text-white transition-transform active:scale-95
              ${isDarkMode ? 'bg-slate-700 hover:bg-slate-600' : 'bg-gray-600 hover:bg-gray-700'}`}
            >
              <div className="bg-white/20 rounded-full p-0.5">
                <Plus size={16} />
              </div>
              Record New Payment
            </button>
          </div>

          {/* 4. QUICK ACTIONS GRID */}
          <div>
            <h2 className={`text-xl font-bold mb-4 ${textMain}`}>Quick Actions</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <ActionButton 
                label="Add Note" 
                bg={containerBg} 
                text={textMain} 
                hover={actionBtnHover} 
                icon={<FileText size={20} className="opacity-50" />}
              />
              <ActionButton 
                label="Schedule" 
                bg={containerBg} 
                text={textMain} 
                hover={actionBtnHover} 
                icon={<Calendar size={20} className="opacity-50" />}
              />
              <ActionButton 
                label="Send Email" 
                bg={containerBg} 
                text={textMain} 
                hover={actionBtnHover} 
                icon={<Mail size={20} className="opacity-50" />}
              />
              <ActionButton 
                label="Print Report" 
                bg={containerBg} 
                text={textMain} 
                hover={actionBtnHover} 
                icon={<Printer size={20} className="opacity-50" />}
              />
              
              {/* Full Width Button */}
              <div className={`md:col-span-2 ${containerBg} rounded-lg p-4 flex items-center justify-center gap-3 cursor-pointer transition-colors ${actionBtnHover}`}>
                {/* Checkbox-like box */}
                <div className={`w-5 h-5 rounded border ${isDarkMode ? 'border-slate-600' : 'border-gray-400'}`}></div>
                <span className={`text-lg font-bold ${textMain}`}>Change Status</span>
              </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}

// --- SUB-COMPONENT: Action Button ---
const ActionButton = ({ label, bg, text, hover, icon }) => (
  <div className={`${bg} rounded-lg p-4 flex items-center gap-4 cursor-pointer transition-colors ${hover}`}>
    {/* Square Icon placeholder matching screenshot */}
    <div className={`w-10 h-10 rounded flex items-center justify-center ${text === 'text-white' ? 'bg-white/10' : 'bg-white/50'}`}>
       {icon}
    </div>
    <span className={`text-lg font-bold ${text}`}>{label}</span>
  </div>
);