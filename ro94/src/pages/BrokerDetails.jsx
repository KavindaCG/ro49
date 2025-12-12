import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import { useTheme } from '../contexts/ThemeContext';

import { 
  ArrowLeft, 
  Mail, 
  MapPin, 
  Phone, 
  Calendar, 
  Users, 
  CheckCircle2, 
  Clock, 
  Briefcase,
  ExternalLink
} from 'lucide-react';

const BrokerDetails = () => {
  const { id } = useParams(); // Get broker ID from URL
  const navigate = useNavigate();
  const { isDarkMode } = useTheme();

  // --- MOCK DATA FOR DEMO ---
  const brokerInfo = {
    id: id || 'ROB-001',
    name: 'Agent Smith',
    email: 'smith@test.lk',
    phone: '+94 77 123 4567',
    location: 'Colombo, Sri Lanka',
    joinDate: 'Oct 24, 2023',
    status: 'Active',
    totalEarnings: '$45,200',
    tier: 'Gold Partner'
  };

  // Mock Clients brought by this broker
  const referredClients = [
    { id: 'ROC-101', name: 'Alice Freeman', date: '2023-12-01', status: 'Active', investment: '$5,000' },
    { id: 'ROC-102', name: 'Bob Wilson', date: '2023-12-05', status: 'Pending', investment: '$12,000' },
    { id: 'ROC-103', name: 'Charlie Davis', date: '2024-01-10', status: 'Active', investment: '$3,500' },
    { id: 'ROC-104', name: 'Diana Prince', date: '2024-01-15', status: 'Closed', investment: '$8,000' },
    { id: 'ROC-105', name: 'Evan Wright', date: '2024-02-01', status: 'Active', investment: '$10,000' },
  ];

  // --- CALCULATIONS ---
  const totalClients = referredClients.length;
  const activeClients = referredClients.filter(c => c.status === 'Active').length;
  const activityRate = Math.round((activeClients / totalClients) * 100);

  // Helper for Client Status Styles
  const getClientStatusStyle = (status) => {
    switch (status) {
      case 'Active': return isDarkMode ? 'bg-emerald-500/10 text-emerald-400 ring-1 ring-inset ring-emerald-500/20' : 'bg-emerald-50 text-emerald-700 ring-1 ring-inset ring-emerald-600/20';
      case 'Pending': return isDarkMode ? 'bg-amber-500/10 text-amber-400 ring-1 ring-inset ring-amber-500/20' : 'bg-amber-50 text-amber-700 ring-1 ring-inset ring-amber-600/20';
      default: return isDarkMode ? 'bg-zinc-800 text-zinc-400 ring-1 ring-inset ring-zinc-700' : 'bg-slate-100 text-slate-600 ring-1 ring-inset ring-slate-500/10';
    }
  };

  return (
    <div className={`min-h-screen flex transition-colors duration-300 ${isDarkMode ? 'bg-[#09090b] text-zinc-100' : 'bg-gray-50 text-gray-900'}`}>
      <Sidebar />

      <main className="ml-64 flex-1 min-h-screen overflow-auto">
        <div className="pt-20 pb-12 pl-8 pr-12">
            <Header />
            
            <div className="max-w-[1200px] mx-auto">

            {/* NAVIGATION BACK - Modernized */}
            <button 
                onClick={() => navigate(-1)} 
                className={`flex items-center gap-2 px-5 py-2.5 mb-8 rounded-full text-sm font-medium shadow-sm border transition-all group
                ${isDarkMode 
                    ? 'bg-[#18181b] border-zinc-800 text-zinc-300 hover:bg-zinc-800' 
                    : 'bg-white border-gray-200 text-slate-600 hover:text-slate-900 hover:shadow-md'
                }`}
            >
                <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                <span>Back to Brokers</span>
            </button>

            {/* --- TOP SECTION: PROFILE & STATS --- */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                
                {/* 1. BROKER PROFILE CARD */}
                <div className={`rounded-xl border shadow-sm p-6 lg:col-span-1
                    ${isDarkMode ? 'bg-[#18181b] border-zinc-800' : 'bg-white border-gray-200'}`}>
                    <div className={`flex flex-col items-center text-center pb-6 border-b
                        ${isDarkMode ? 'border-zinc-800' : 'border-gray-100'}`}>
                        <div className={`w-24 h-24 rounded-full border-2 shadow-lg flex items-center justify-center text-2xl font-bold mb-4
                            ${isDarkMode ? 'bg-zinc-800 border-zinc-700 text-zinc-400' : 'bg-slate-100 border-white text-slate-600'}`}>
                        {brokerInfo.name.substring(0, 2).toUpperCase()}
                        </div>
                        <h1 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{brokerInfo.name}</h1>
                        <p className={`text-sm font-mono mt-1 ${isDarkMode ? 'text-zinc-500' : 'text-slate-500'}`}>{brokerInfo.id}</p>
                        <div className="mt-3">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ring-1 ring-inset
                            ${isDarkMode ? 'bg-emerald-500/10 text-emerald-400 ring-emerald-500/20' : 'bg-emerald-50 text-emerald-700 ring-emerald-600/20'}`}>
                            {brokerInfo.status}
                        </span>
                        </div>
                    </div>
                    
                    <div className="pt-6 space-y-4">
                        <InfoItem icon={Mail} text={brokerInfo.email} isDarkMode={isDarkMode} />
                        <InfoItem icon={Phone} text={brokerInfo.phone} isDarkMode={isDarkMode} />
                        <InfoItem icon={MapPin} text={brokerInfo.location} isDarkMode={isDarkMode} />
                        <InfoItem icon={Calendar} text={`Joined ${brokerInfo.joinDate}`} isDarkMode={isDarkMode} />
                    </div>
                </div>

                {/* 2. STATS GRID */}
                <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* Total Clients Card */}
                <div className={`p-6 rounded-xl border shadow-sm flex flex-col justify-between relative overflow-hidden group
                    ${isDarkMode ? 'bg-[#18181b] border-zinc-800' : 'bg-white border-gray-200'}`}>
                    <div className={`absolute right-0 top-0 w-24 h-24 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110
                        ${isDarkMode ? 'bg-blue-500/10' : 'bg-blue-50'}`}></div>
                    <div>
                        <p className={`text-sm font-medium mb-1 ${isDarkMode ? 'text-zinc-500' : 'text-slate-500'}`}>Total Referred Clients</p>
                        <h3 className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{totalClients}</h3>
                    </div>
                    <div className={`mt-4 flex items-center gap-2 text-sm font-medium ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`}>
                        <Users size={18} />
                        <span>Lifetime referrals</span>
                    </div>
                </div>

                {/* Active Clients Card */}
                <div className={`p-6 rounded-xl border shadow-sm flex flex-col justify-between relative overflow-hidden group
                    ${isDarkMode ? 'bg-[#18181b] border-zinc-800' : 'bg-white border-gray-200'}`}>
                    <div className={`absolute right-0 top-0 w-24 h-24 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110
                        ${isDarkMode ? 'bg-emerald-500/10' : 'bg-emerald-50'}`}></div>
                    <div>
                        <p className={`text-sm font-medium mb-1 ${isDarkMode ? 'text-zinc-500' : 'text-slate-500'}`}>Active Clients</p>
                        <h3 className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{activeClients}</h3>
                    </div>
                    <div className={`mt-4 flex items-center gap-2 text-sm font-medium ${isDarkMode ? 'text-emerald-400' : 'text-emerald-600'}`}>
                        <CheckCircle2 size={18} />
                        <span>{activityRate}% Retention Rate</span>
                    </div>
                </div>

                {/* Commission Card */}
                <div className={`p-6 rounded-xl border shadow-sm flex flex-col justify-between relative overflow-hidden group
                    ${isDarkMode ? 'bg-[#18181b] border-zinc-800' : 'bg-white border-gray-200'}`}>
                    <div className={`absolute right-0 top-0 w-24 h-24 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110
                        ${isDarkMode ? 'bg-violet-500/10' : 'bg-violet-50'}`}></div>
                    <div>
                        <p className={`text-sm font-medium mb-1 ${isDarkMode ? 'text-zinc-500' : 'text-slate-500'}`}>Total Commission Earned</p>
                        <h3 className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{brokerInfo.totalEarnings}</h3>
                    </div>
                    <div className={`mt-4 flex items-center gap-2 text-sm font-medium ${isDarkMode ? 'text-violet-400' : 'text-violet-600'}`}>
                        <Briefcase size={18} />
                        <span>{brokerInfo.tier}</span>
                    </div>
                </div>

                {/* Pending Actions Card */}
                <div className={`p-6 rounded-xl border shadow-sm flex flex-col justify-between relative overflow-hidden group
                    ${isDarkMode ? 'bg-[#18181b] border-zinc-800' : 'bg-white border-gray-200'}`}>
                    <div className={`absolute right-0 top-0 w-24 h-24 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110
                        ${isDarkMode ? 'bg-amber-500/10' : 'bg-amber-50'}`}></div>
                    <div>
                        <p className={`text-sm font-medium mb-1 ${isDarkMode ? 'text-zinc-500' : 'text-slate-500'}`}>Pending Approvals</p>
                        <h3 className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{totalClients - activeClients}</h3>
                    </div>
                    <div className={`mt-4 flex items-center gap-2 text-sm font-medium ${isDarkMode ? 'text-amber-400' : 'text-amber-600'}`}>
                        <Clock size={18} />
                        <span>Action Required</span>
                    </div>
                </div>

                </div>
            </div>

            {/* --- BOTTOM SECTION: CLIENT LIST --- */}
            <div className={`rounded-xl border shadow-sm overflow-hidden
                ${isDarkMode ? 'bg-[#18181b] border-zinc-800' : 'bg-white border-gray-200'}`}>
                <div className={`px-6 py-5 border-b flex justify-between items-center
                    ${isDarkMode ? 'border-zinc-800' : 'border-gray-100'}`}>
                <h3 className={`font-bold ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>Referral History</h3>
                <button className="text-sm text-blue-600 hover:text-blue-500 font-medium flex items-center gap-1">
                    View All <ExternalLink size={14} />
                </button>
                </div>
                
                <table className="w-full text-left border-collapse">
                <thead>
                    <tr className={`text-xs uppercase border-b
                        ${isDarkMode ? 'bg-zinc-900/50 text-zinc-500 border-zinc-800' : 'bg-gray-50/50 text-slate-500 border-gray-100'}`}>
                    <th className="px-6 py-4 font-semibold">Client Name</th>
                    <th className="px-6 py-4 font-semibold">Joined Date</th>
                    <th className="px-6 py-4 font-semibold">Investment Value</th>
                    <th className="px-6 py-4 font-semibold text-center">Current Status</th>
                    </tr>
                </thead>
                <tbody className={`divide-y ${isDarkMode ? 'divide-zinc-800' : 'divide-gray-100'}`}>
                    {referredClients.map((client) => (
                    <tr key={client.id} className={`transition-colors
                        ${isDarkMode ? 'hover:bg-zinc-800/50' : 'hover:bg-slate-50/50'}`}>
                        <td className="px-6 py-4">
                        <div className="flex flex-col">
                            <span className={`text-sm font-medium ${isDarkMode ? 'text-zinc-200' : 'text-slate-900'}`}>{client.name}</span>
                            <span className={`text-xs font-mono ${isDarkMode ? 'text-zinc-500' : 'text-slate-400'}`}>{client.id}</span>
                        </div>
                        </td>
                        <td className={`px-6 py-4 text-sm ${isDarkMode ? 'text-zinc-400' : 'text-slate-600'}`}>
                        {client.date}
                        </td>
                        <td className={`px-6 py-4 text-sm font-medium ${isDarkMode ? 'text-zinc-200' : 'text-slate-900'}`}>
                        {client.investment}
                        </td>
                        <td className="px-6 py-4 text-center">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getClientStatusStyle(client.status)}`}>
                            {client.status}
                        </span>
                        </td>
                    </tr>
                    ))}
                </tbody>
                </table>
            </div>

            </div>
        </div>
      </main>
    </div>
  );
};

// Helper Subcomponent for Profile Info
const InfoItem = ({ icon: Icon, text, isDarkMode }) => (
    <div className={`flex items-center gap-3 text-sm ${isDarkMode ? 'text-zinc-400' : 'text-slate-600'}`}>
        <Icon size={16} className={isDarkMode ? 'text-zinc-600' : 'text-slate-400'} />
        {text}
    </div>
);

export default BrokerDetails;