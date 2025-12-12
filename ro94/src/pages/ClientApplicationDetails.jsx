import React, { useState } from 'react';
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
  RefreshCw,
  ArrowUpRight,
  CreditCard,
  X,
  Save,
  Send,
  Download
} from 'lucide-react';

export default function ClientApplicationDetails() {
  const { isDarkMode } = useTheme();
  const { id } = useParams();

  // --- MODAL STATE ---
  const [activeModal, setActiveModal] = useState(null); // 'note', 'schedule', 'email', 'print', 'status' or null

  // --- MOCK DATA ---
  const clientData = {
    name: 'John Doe',
    appType: 'RO94 ADMIN SYSTEM',
    totalAmount: 5517.62,
    paidAmount: 1300.26,
    currency: '$',
    currentStage: 2,
    stages: [
      { id: 1, label: 'Registration', status: 'Completed', date: 'Dec 1', isComplete: true },
      { id: 2, label: 'Documents', status: 'In Progress', detail: '3/5 uploaded', isComplete: false },
      { id: 3, label: 'Processing', status: 'Pending', detail: 'Est. 5 Days', isComplete: false },
      { id: 4, label: 'Completion', status: 'Locked', detail: '-', isComplete: false },
    ]
  };

  // --- STYLING VARIABLES ---
  const pageBg = isDarkMode ? 'bg-slate-950' : 'bg-gray-50';
  const textMain = isDarkMode ? 'text-white' : 'text-slate-900';
  const textSub = isDarkMode ? 'text-slate-400' : 'text-slate-500';
  
  const cardBase = isDarkMode 
    ? 'bg-slate-900 border-slate-800' 
    : 'bg-white border-gray-100 shadow-sm';

  const paymentPercentage = ((clientData.paidAmount / clientData.totalAmount) * 100).toFixed(2);

  return (
    <div className={`min-h-screen flex ${pageBg} font-sans transition-colors duration-300`}>
      <Sidebar />

      <main className="ml-64 flex-1 min-h-screen overflow-auto py-10">
        <div className="max-w-6xl mx-auto px-8">
          
          {/* 1. BREADCRUMB */}
          <div className="flex items-center gap-3 mb-6">
            <Link to="/applications" className={`p-2 rounded-full border transition-all ${isDarkMode ? 'border-slate-800 hover:bg-slate-800 text-slate-400' : 'border-gray-200 hover:bg-white text-slate-500 hover:shadow-sm'}`}>
              <ChevronLeft size={18} />
            </Link>
            <span className={`text-sm font-medium ${textSub}`}>Back to Applications</span>
          </div>

          {/* 2. HEADER */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
            <div>
              <h1 className={`text-3xl font-bold tracking-tight mb-1 ${textMain}`}>
                {clientData.name}
              </h1>
              <div className="flex items-center gap-3">
                <span className={`text-sm ${textSub}`}>{clientData.appType}</span>
                <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wide border ${isDarkMode ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' : 'bg-blue-50 text-blue-600 border-blue-100'}`}>
                  Stage {clientData.currentStage}
                </span>
              </div>
            </div>
            
            <div className="flex gap-3">
               <button className={`px-4 py-2 rounded-lg text-sm font-medium border transition-colors ${isDarkMode ? 'border-slate-700 hover:bg-slate-800 text-white' : 'border-gray-200 bg-white hover:bg-gray-50 text-slate-700'}`}>
                 View Profile
               </button>
               <button className="px-4 py-2 rounded-lg text-sm font-medium bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-500/20 transition-all">
                 Edit Application
               </button>
            </div>
          </div>

          {/* 3. PROGRESS STEPPER */}
          <div className={`${cardBase} border rounded-2xl p-8 mb-8`}>
            <div className="flex items-center justify-between mb-8">
               <h3 className={`text-lg font-bold ${textMain}`}>Timeline</h3>
               <span className={`text-xs ${textSub}`}>Last updated: Today, 10:30 AM</span>
            </div>
            
            <div className="relative px-4">
              <div className={`absolute top-5 left-0 w-full h-0.5 ${isDarkMode ? 'bg-slate-800' : 'bg-gray-100'}`}></div>
              <div className="absolute top-5 left-0 h-0.5 bg-blue-600 transition-all duration-1000" style={{ width: '35%' }}></div>

              <div className="relative flex justify-between">
                {clientData.stages.map((stage) => {
                  const isActive = stage.id === clientData.currentStage;
                  const isPast = stage.id < clientData.currentStage;

                  return (
                    <div key={stage.id} className="flex flex-col items-center group cursor-default">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold border-[3px] z-10 transition-all duration-300
                        ${isPast 
                          ? 'bg-emerald-500 border-emerald-500 text-white' 
                          : isActive 
                            ? 'bg-white border-blue-600 text-blue-600 shadow-[0_0_0_4px_rgba(37,99,235,0.1)] scale-110' 
                            : isDarkMode ? 'bg-slate-900 border-slate-700 text-slate-600' : 'bg-white border-gray-200 text-gray-300'
                        }`}
                      >
                        {isPast ? <Check size={16} strokeWidth={3} /> : stage.id}
                      </div>
                      <div className="text-center mt-4 space-y-1">
                        <p className={`text-sm font-bold transition-colors ${isActive ? 'text-blue-600' : textMain}`}>
                          {stage.label}
                        </p>
                        <p className={`text-xs font-medium ${isActive ? 'text-blue-500' : textSub}`}>
                           {isPast ? stage.date : isActive ? stage.detail : stage.status}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* 4. GRID LAYOUT */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* PAYMENT CARD */}
            <div className={`lg:col-span-1 ${cardBase} border rounded-2xl p-6 flex flex-col justify-between`}>
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className={`p-2 rounded-lg ${isDarkMode ? 'bg-slate-800 text-slate-300' : 'bg-gray-50 text-slate-500'}`}>
                    <CreditCard size={20} />
                  </div>
                  <span className={`px-2 py-1 rounded text-xs font-bold ${paymentPercentage === '100.00' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
                    {paymentPercentage}% Paid
                  </span>
                </div>

                <p className={`text-sm font-medium ${textSub} mb-1`}>Total Paid</p>
                <div className="flex items-baseline gap-1 mb-6">
                   <h2 className={`text-3xl font-bold ${textMain}`}>
                     {clientData.currency}{clientData.paidAmount.toLocaleString()}
                   </h2>
                   <span className={`text-sm ${textSub}`}>
                     / {clientData.totalAmount.toLocaleString()}
                   </span>
                </div>

                <div className="space-y-2 mb-8">
                   <div className={`h-2 w-full rounded-full overflow-hidden ${isDarkMode ? 'bg-slate-800' : 'bg-gray-100'}`}>
                      <div className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full" style={{ width: `${paymentPercentage}%` }}></div>
                   </div>
                   <div className="flex justify-between text-xs font-medium text-slate-500">
                      <span>Paid</span>
                      <span>{clientData.currency}{(clientData.totalAmount - clientData.paidAmount).toLocaleString()} Remaining</span>
                   </div>
                </div>
              </div>

              <button className={`w-full py-3 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all active:scale-[0.98]
                ${isDarkMode 
                  ? 'bg-slate-800 hover:bg-slate-700 text-white' 
                  : 'bg-slate-900 hover:bg-slate-800 text-white shadow-lg shadow-slate-900/10'}`}
              >
                <Plus size={18} />
                Record Payment
              </button>
            </div>

            {/* QUICK ACTIONS GRID */}
            <div className="lg:col-span-2 space-y-4">
              <h3 className={`text-sm font-bold uppercase tracking-wider ${textSub} mb-4`}>Quick Actions</h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <ActionCard 
                  onClick={() => setActiveModal('note')}
                  icon={<FileText size={20} />} 
                  label="Add Note" 
                  desc="Internal logs & memos"
                  color="text-purple-600 bg-purple-500/10"
                  isDarkMode={isDarkMode} cardBase={cardBase}
                />
                <ActionCard 
                  onClick={() => setActiveModal('schedule')}
                  icon={<Calendar size={20} />} 
                  label="Schedule" 
                  desc="Set appointments"
                  color="text-blue-600 bg-blue-500/10"
                  isDarkMode={isDarkMode} cardBase={cardBase}
                />
                <ActionCard 
                  onClick={() => setActiveModal('email')}
                  icon={<Mail size={20} />} 
                  label="Send Email" 
                  desc="Notify the client"
                  color="text-orange-600 bg-orange-500/10"
                  isDarkMode={isDarkMode} cardBase={cardBase}
                />
                <ActionCard 
                  onClick={() => setActiveModal('print')}
                  icon={<Printer size={20} />} 
                  label="Print Report" 
                  desc="Export PDF summary"
                  color="text-emerald-600 bg-emerald-500/10"
                  isDarkMode={isDarkMode} cardBase={cardBase}
                />
              </div>

              <div 
                onClick={() => setActiveModal('status')}
                className={`${cardBase} border rounded-xl p-4 flex items-center justify-between group cursor-pointer hover:border-blue-500 transition-colors`}
              >
                 <div className="flex items-center gap-4">
                    <div className={`p-2.5 rounded-lg ${isDarkMode ? 'bg-slate-800 text-slate-400' : 'bg-gray-100 text-slate-600'}`}>
                       <RefreshCw size={20} className="group-hover:rotate-180 transition-transform duration-500" />
                    </div>
                    <div>
                       <h4 className={`font-bold ${textMain}`}>Change Status</h4>
                       <p className={`text-xs ${textSub}`}>Current: In Progress</p>
                    </div>
                 </div>
                 <ArrowUpRight size={20} className={`${textSub} group-hover:text-blue-500`} />
              </div>

            </div>
          </div>
        </div>
      </main>

      {/* --- POPUP MODAL --- */}
      {activeModal && (
        <ActionModal 
          type={activeModal} 
          onClose={() => setActiveModal(null)} 
          isDarkMode={isDarkMode}
          clientName={clientData.name}
        />
      )}
    </div>
  );
}

// --- SUB-COMPONENT: Action Card ---
const ActionCard = ({ icon, label, desc, color, isDarkMode, cardBase, onClick }) => (
  <button 
    onClick={onClick}
    className={`${cardBase} border rounded-xl p-4 flex items-start gap-4 text-left transition-all duration-200 hover:-translate-y-1 hover:shadow-md group`}
  >
    <div className={`p-3 rounded-xl ${color}`}>
      {icon}
    </div>
    <div>
      <h4 className={`font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'} group-hover:text-blue-600 transition-colors`}>
        {label}
      </h4>
      <p className={`text-xs ${isDarkMode ? 'text-slate-400' : 'text-slate-500'} mt-0.5`}>
        {desc}
      </p>
    </div>
  </button>
);

// --- SUB-COMPONENT: Modal ---
const ActionModal = ({ type, onClose, isDarkMode, clientName }) => {
  const bgModal = isDarkMode ? 'bg-slate-900 border-slate-700' : 'bg-white border-gray-100';
  const textMain = isDarkMode ? 'text-white' : 'text-slate-900';
  const inputBg = isDarkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-gray-50 border-gray-200 text-slate-900';

  const modalConfig = {
    note: { title: 'Add Internal Note', icon: <FileText size={20} /> },
    schedule: { title: 'Schedule Appointment', icon: <Calendar size={20} /> },
    email: { title: 'Send Email', icon: <Mail size={20} /> },
    print: { title: 'Export PDF Report', icon: <Download size={20} /> },
    status: { title: 'Change Application Status', icon: <RefreshCw size={20} /> },
  };

  const { title, icon } = modalConfig[type];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className={`${bgModal} w-full max-w-lg rounded-2xl border shadow-2xl p-6 transform transition-all scale-100`}>
        
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-lg ${isDarkMode ? 'bg-slate-800 text-blue-400' : 'bg-blue-50 text-blue-600'}`}>
              {icon}
            </div>
            <h3 className={`text-xl font-bold ${textMain}`}>{title}</h3>
          </div>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-slate-800 text-gray-500 transition-colors">
            <X size={20} />
          </button>
        </div>

        {/* Content Body Based on Type */}
        <div className="space-y-4">
          
          {type === 'note' && (
            <>
              <div>
                <label className="text-xs font-bold uppercase text-slate-500 mb-1.5 block">Note Title</label>
                <input type="text" placeholder="e.g. Document verification call" className={`w-full p-3 rounded-xl border outline-none focus:ring-2 focus:ring-blue-500 ${inputBg}`} />
              </div>
              <div>
                <label className="text-xs font-bold uppercase text-slate-500 mb-1.5 block">Description</label>
                <textarea rows="4" placeholder="Enter note details..." className={`w-full p-3 rounded-xl border outline-none focus:ring-2 focus:ring-blue-500 ${inputBg}`}></textarea>
              </div>
              <button className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl flex items-center justify-center gap-2 mt-2">
                <Save size={18} /> Save Note
              </button>
            </>
          )}

          {type === 'schedule' && (
            <>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold uppercase text-slate-500 mb-1.5 block">Date</label>
                  <input type="date" className={`w-full p-3 rounded-xl border outline-none focus:ring-2 focus:ring-blue-500 ${inputBg}`} />
                </div>
                <div>
                  <label className="text-xs font-bold uppercase text-slate-500 mb-1.5 block">Time</label>
                  <input type="time" className={`w-full p-3 rounded-xl border outline-none focus:ring-2 focus:ring-blue-500 ${inputBg}`} />
                </div>
              </div>
              <div>
                <label className="text-xs font-bold uppercase text-slate-500 mb-1.5 block">Event Type</label>
                <select className={`w-full p-3 rounded-xl border outline-none focus:ring-2 focus:ring-blue-500 ${inputBg}`}>
                  <option>Document Review</option>
                  <option>Visa Interview</option>
                  <option>General Follow-up</option>
                </select>
              </div>
              <button className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl flex items-center justify-center gap-2 mt-2">
                <Calendar size={18} /> Set Appointment
              </button>
            </>
          )}

          {type === 'email' && (
            <>
               <div>
                <label className="text-xs font-bold uppercase text-slate-500 mb-1.5 block">Recipient</label>
                <input type="text" value={clientName} readOnly className={`w-full p-3 rounded-xl border opacity-70 cursor-not-allowed ${inputBg}`} />
              </div>
              <div>
                <label className="text-xs font-bold uppercase text-slate-500 mb-1.5 block">Subject</label>
                <input type="text" placeholder="Regarding your application..." className={`w-full p-3 rounded-xl border outline-none focus:ring-2 focus:ring-blue-500 ${inputBg}`} />
              </div>
              <div>
                <label className="text-xs font-bold uppercase text-slate-500 mb-1.5 block">Message</label>
                <textarea rows="4" className={`w-full p-3 rounded-xl border outline-none focus:ring-2 focus:ring-blue-500 ${inputBg}`}></textarea>
              </div>
              <button className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl flex items-center justify-center gap-2 mt-2">
                <Send size={18} /> Send Email
              </button>
            </>
          )}

          {type === 'print' && (
            <>
              <p className={`text-sm ${isDarkMode ? 'text-slate-400' : 'text-slate-600'} mb-4`}>
                Select the sections you want to include in the exported PDF report for <strong>{clientName}</strong>.
              </p>
              
              <div className="space-y-3 mb-6">
                {['Client Profile Info', 'Payment History', 'Stage Timeline', 'Uploaded Documents List'].map((item) => (
                  <label key={item} className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer hover:border-blue-500 transition-colors ${inputBg}`}>
                    <input type="checkbox" defaultChecked className="w-4 h-4 text-blue-600 rounded" />
                    <span className={`text-sm font-medium ${textMain}`}>{item}</span>
                  </label>
                ))}
              </div>

              <button className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl flex items-center justify-center gap-2">
                <Download size={18} /> Download PDF
              </button>
            </>
          )}

          {type === 'status' && (
             <>
             <p className={`text-sm ${isDarkMode ? 'text-slate-400' : 'text-slate-600'} mb-4`}>
               Update the current stage of this application. This may trigger email notifications to the client.
             </p>
             
             <div className="grid grid-cols-1 gap-3 mb-4">
               {['Registration', 'Documents', 'Processing', 'Completed', 'On Hold', 'Cancelled'].map((status) => (
                 <label key={status} className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer hover:border-blue-500 transition-colors ${inputBg}`}>
                   <span className={`text-sm font-medium ${textMain}`}>{status}</span>
                   <input type="radio" name="status" className="w-4 h-4 text-blue-600" />
                 </label>
               ))}
             </div>

             <button className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl flex items-center justify-center gap-2">
               <RefreshCw size={18} /> Update Status
             </button>
           </>
          )}

        </div>
      </div>
    </div>
  );
};