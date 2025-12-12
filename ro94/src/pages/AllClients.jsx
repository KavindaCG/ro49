import React, { useMemo, useState } from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import ClientTable from '../components/ClientTable';
import { Link } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';
// 1. Import icons for the cards
import { Users, CheckCircle, RotateCcw } from 'lucide-react';

export default function AllClients() {
  const { isDarkMode } = useTheme();
  
  // sample data
  const initial = useMemo(
    () => [
      { id: 'ROC-001', name: 'John Doe', email: 'john@example.com', broker: 'Agent Smith', stage: 'STAGE 2', status: 'Doc Processing' },
      { id: 'ROC-002', name: 'Jane Silva', email: 'jane@example.com', broker: 'Agent K', stage: 'STAGE 1', status: 'Registration' },
      { id: 'ROC-003', name: 'Kamal Perera', email: 'kamal@test.lk', broker: 'Agent K', stage: 'STAGE 4', status: 'Completed' },
      { id: 'ROC-004', name: 'John Doe', email: 'john@example.com', broker: 'Agent Smith', stage: 'STAGE 2', status: 'Return Docs' },
      { id: 'ROC-005', name: 'John Doe', email: 'john@example.com', broker: 'Agent Smith', stage: 'STAGE 2', status: 'Completed' },
      { id: 'ROC-006', name: 'John Doe', email: 'john@example.com', broker: 'Agent Smith', stage: 'STAGE 2', status: 'Doc Processing' },
    ],
    []
  );

  const [clients] = useState(initial);
  const [query, setQuery] = useState('');

  // --- 2. Calculate Stats Dynamically ---
  const totalClients = clients.length;
  const completedCount = clients.filter(c => c.status === 'Completed').length;
  const returnDocsCount = clients.filter(c => c.status === 'Return Docs').length;

  // --- 3. Define Card Layout & Styles ---
  const stats = [
    { 
      label: 'TOTAL CLIENTS', 
      value: totalClients, 
      sub: 'Total Database', 
      icon: <Users size={22} />, 
      color: 'text-blue-600', 
      bg: 'bg-blue-100' 
    },
    { 
      label: 'COMPLETED', 
      value: completedCount, 
      sub: 'Successfully finished', 
      icon: <CheckCircle size={22} />, 
      color: 'text-emerald-600', 
      bg: 'bg-emerald-100' 
    },
    { 
      label: 'RETURN DOCS', 
      value: returnDocsCount, 
      sub: 'Action Required', 
      icon: <RotateCcw size={22} />, 
      color: 'text-orange-600', 
      bg: 'bg-orange-100' 
    },
  ];

  const filtered = clients.filter(
    (c) =>
      c.id.toLowerCase().includes(query.toLowerCase()) ||
      c.name.toLowerCase().includes(query.toLowerCase()) ||
      c.email.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className={`min-h-screen flex ${isDarkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-900'}`}>
      <Sidebar />

      <main className="ml-64 flex-1 min-h-screen overflow-auto pt-20">
        <Header />

        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="mb-8">
            <h1 className={`text-3xl font-semibold mb-2 tracking-tight ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              All Clients
            </h1>
            <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              Search, filter and manage your client records.
            </p>
          </div>

          {/* --- 4. Render Analytics Cards --- */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            {stats.map((stat, index) => (
              <div 
                key={index} 
                className={`p-5 rounded-2xl border shadow-sm flex flex-col justify-between h-32 hover:shadow-md transition-shadow
                  ${isDarkMode 
                    ? 'bg-gray-800 border-gray-700' 
                    : 'bg-white border-gray-200'
                  }`}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <p className={`text-[11px] font-bold uppercase tracking-wider mb-1 ${isDarkMode ? 'text-gray-400' : 'text-slate-400'}`}>
                      {stat.label}
                    </p>
                    <h3 className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                      {stat.value}
                    </h3>
                  </div>
                  <div className={`p-3 rounded-xl ${stat.bg} ${stat.color}`}>
                    {stat.icon}
                  </div>
                </div>
                <p className={`text-sm font-medium ${isDarkMode ? 'text-gray-500' : 'text-slate-400'}`}>
                  {stat.sub}
                </p>
              </div>
            ))}
          </div>

          <div className="flex items-center gap-4 mb-6">
            <div className="relative flex-1 max-w-lg">
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search for a client"
                className={`w-full py-3 pl-4 pr-10 rounded-full text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 
                  ${isDarkMode 
                    ? 'bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 focus:ring-gray-600' 
                    : 'bg-white border-gray-200 text-gray-900 focus:ring-gray-300'
                  } border`}
              />
              <div className={`absolute right-3 top-1/2 -translate-y-1/2 ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                🔍
              </div>
            </div>

            <button className={`px-4 py-2 rounded-full text-sm shadow-sm hover:bg-opacity-90
              ${isDarkMode 
                ? 'bg-gray-800 border-gray-700 text-gray-300 hover:bg-gray-700' 
                : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'
              } border`}>
              Filter ▾
            </button>
            <button className={`px-4 py-2 rounded-full text-sm shadow-sm hover:bg-opacity-90
              ${isDarkMode 
                ? 'bg-gray-800 border-gray-700 text-gray-300 hover:bg-gray-700' 
                : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'
              } border`}>
              Sort ▾
            </button>

            <div className="ml-auto flex gap-3">
              <button className={`px-4 py-2 rounded-full text-sm shadow-sm hover:bg-opacity-90
                ${isDarkMode 
                  ? 'bg-gray-800 border-gray-700 text-gray-300 hover:bg-gray-700' 
                  : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'
                } border`}>
                Export ⤓
              </button>
              <Link to="/add-client" className={`px-4 py-2 rounded-full text-sm shadow-sm hover:bg-opacity-90 flex items-center gap-2
                ${isDarkMode 
                  ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                  : 'bg-gray-900 hover:bg-black text-white'
                }`}>  
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="9" strokeWidth="2" />
                  <path d="M12 8v8M8 12h8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Add New
              </Link>
            </div>
          </div>

          <div className={`rounded-2xl shadow-sm border
            ${isDarkMode 
              ? 'bg-gray-800 border-gray-700' 
              : 'bg-white border-gray-200'
            }`}>
            <div className="overflow-x-auto">
              <ClientTable data={filtered} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}