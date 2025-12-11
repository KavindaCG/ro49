import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
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

  // --- MOCK DATA FOR DEMO ---
  // In a real app, fetch this data using the 'id'
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
      case 'Active': return 'bg-emerald-50 text-emerald-700 ring-1 ring-inset ring-emerald-600/20';
      case 'Pending': return 'bg-amber-50 text-amber-700 ring-1 ring-inset ring-amber-600/20';
      default: return 'bg-slate-100 text-slate-600 ring-1 ring-inset ring-slate-500/10';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50/50 ml-64 pt-24 pb-12 transition-all duration-300 font-sans">
      <div className="max-w-[1200px] mx-auto px-8">

        {/* NAVIGATION BACK */}
        <button 
          onClick={() => navigate(-1)} 
          className="flex items-center gap-2 text-slate-500 hover:text-slate-800 transition-colors mb-6 group"
        >
          <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
          <span className="text-sm font-medium">Back to Brokers</span>
        </button>

        {/* --- TOP SECTION: PROFILE & STATS --- */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          
          {/* 1. BROKER PROFILE CARD */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 lg:col-span-1">
            <div className="flex flex-col items-center text-center pb-6 border-b border-gray-100">
              <div className="w-24 h-24 rounded-full bg-slate-100 border-2 border-white shadow-lg flex items-center justify-center text-2xl font-bold text-slate-600 mb-4">
                {brokerInfo.name.substring(0, 2).toUpperCase()}
              </div>
              <h1 className="text-xl font-bold text-slate-900">{brokerInfo.name}</h1>
              <p className="text-sm text-slate-500 font-mono mt-1">{brokerInfo.id}</p>
              <div className="mt-3">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 ring-1 ring-inset ring-emerald-600/20">
                  {brokerInfo.status}
                </span>
              </div>
            </div>
            
            <div className="pt-6 space-y-4">
              <div className="flex items-center gap-3 text-sm text-slate-600">
                <Mail size={16} className="text-slate-400" />
                {brokerInfo.email}
              </div>
              <div className="flex items-center gap-3 text-sm text-slate-600">
                <Phone size={16} className="text-slate-400" />
                {brokerInfo.phone}
              </div>
              <div className="flex items-center gap-3 text-sm text-slate-600">
                <MapPin size={16} className="text-slate-400" />
                {brokerInfo.location}
              </div>
              <div className="flex items-center gap-3 text-sm text-slate-600">
                <Calendar size={16} className="text-slate-400" />
                Joined {brokerInfo.joinDate}
              </div>
            </div>
          </div>

          {/* 2. STATS GRID */}
          <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Total Clients Card */}
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex flex-col justify-between relative overflow-hidden group">
              <div className="absolute right-0 top-0 w-24 h-24 bg-blue-50 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110"></div>
              <div>
                <p className="text-sm font-medium text-slate-500 mb-1">Total Referred Clients</p>
                <h3 className="text-3xl font-bold text-slate-900">{totalClients}</h3>
              </div>
              <div className="mt-4 flex items-center gap-2 text-sm text-blue-600 font-medium">
                <Users size={18} />
                <span>Lifetime referrals</span>
              </div>
            </div>

            {/* Active Clients Card */}
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex flex-col justify-between relative overflow-hidden group">
               <div className="absolute right-0 top-0 w-24 h-24 bg-emerald-50 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110"></div>
              <div>
                <p className="text-sm font-medium text-slate-500 mb-1">Active Clients</p>
                <h3 className="text-3xl font-bold text-slate-900">{activeClients}</h3>
              </div>
              <div className="mt-4 flex items-center gap-2 text-sm text-emerald-600 font-medium">
                <CheckCircle2 size={18} />
                <span>{activityRate}% Retention Rate</span>
              </div>
            </div>

            {/* Commission Card */}
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex flex-col justify-between relative overflow-hidden group">
               <div className="absolute right-0 top-0 w-24 h-24 bg-violet-50 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110"></div>
              <div>
                <p className="text-sm font-medium text-slate-500 mb-1">Total Commission Earned</p>
                <h3 className="text-3xl font-bold text-slate-900">{brokerInfo.totalEarnings}</h3>
              </div>
              <div className="mt-4 flex items-center gap-2 text-sm text-violet-600 font-medium">
                <Briefcase size={18} />
                <span>{brokerInfo.tier}</span>
              </div>
            </div>

            {/* Pending Actions Card */}
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex flex-col justify-between relative overflow-hidden group">
               <div className="absolute right-0 top-0 w-24 h-24 bg-amber-50 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110"></div>
              <div>
                <p className="text-sm font-medium text-slate-500 mb-1">Pending Approvals</p>
                <h3 className="text-3xl font-bold text-slate-900">{totalClients - activeClients}</h3>
              </div>
              <div className="mt-4 flex items-center gap-2 text-sm text-amber-600 font-medium">
                <Clock size={18} />
                <span>Action Required</span>
              </div>
            </div>

          </div>
        </div>

        {/* --- BOTTOM SECTION: CLIENT LIST --- */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="px-6 py-5 border-b border-gray-100 flex justify-between items-center">
            <h3 className="font-bold text-slate-800">Referral History</h3>
            <button className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1">
              View All <ExternalLink size={14} />
            </button>
          </div>
          
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/50 text-xs text-slate-500 uppercase border-b border-gray-100">
                <th className="px-6 py-4 font-semibold">Client Name</th>
                <th className="px-6 py-4 font-semibold">Joined Date</th>
                <th className="px-6 py-4 font-semibold">Investment Value</th>
                <th className="px-6 py-4 font-semibold text-center">Current Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {referredClients.map((client) => (
                <tr key={client.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className="text-sm font-medium text-slate-900">{client.name}</span>
                      <span className="text-xs text-slate-400 font-mono">{client.id}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600">
                    {client.date}
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-900 font-medium">
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
  );
};

export default BrokerDetails;