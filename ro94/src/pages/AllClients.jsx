import React, { useMemo, useState } from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
// Removed external ClientTable to ensure styling control
// import ClientTable from '../components/ClientTable'; 
import { Link } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';
import { 
  Users, 
  CheckCircle, 
  RotateCcw, 
  Search, 
  Filter, 
  ArrowUpDown, 
  Download, 
  Plus,
  MoreHorizontal,
  Eye,
  Edit
} from 'lucide-react';

export default function AllClients() {
  const { isDarkMode } = useTheme();
  
  // --- Data ---
  const initial = useMemo(
    () => [
      { id: 'ROC-001', name: 'John Doe', email: 'john@example.com', broker: 'Agent Smith', stage: 'STAGE 2', status: 'Doc Processing', avatar: 'JD' },
      { id: 'ROC-002', name: 'Jane Silva', email: 'jane@example.com', broker: 'Agent K', stage: 'STAGE 1', status: 'Registration', avatar: 'JS' },
      { id: 'ROC-003', name: 'Kamal Perera', email: 'kamal@test.lk', broker: 'Agent K', stage: 'STAGE 4', status: 'Completed', avatar: 'KP' },
      { id: 'ROC-004', name: 'John Doe', email: 'john@example.com', broker: 'Agent Smith', stage: 'STAGE 2', status: 'Return Docs', avatar: 'JD' },
      { id: 'ROC-005', name: 'John Doe', email: 'john@example.com', broker: 'Agent Smith', stage: 'STAGE 2', status: 'Completed', avatar: 'JD' },
      { id: 'ROC-006', name: 'John Doe', email: 'john@example.com', broker: 'Agent Smith', stage: 'STAGE 2', status: 'Doc Processing', avatar: 'JD' },
    ],
    []
  );

  const [clients] = useState(initial);
  const [query, setQuery] = useState('');

  // --- Stats Calculation ---
  const totalClients = clients.length;
  const completedCount = clients.filter(c => c.status === 'Completed').length;
  const returnDocsCount = clients.filter(c => c.status === 'Return Docs').length;

  // --- Configuration ---
  const stats = [
    { 
      label: 'Total Clients', 
      value: totalClients, 
      sub: 'Total Database', 
      icon: Users, 
      color: 'blue'
    },
    { 
      label: 'Completed', 
      value: completedCount, 
      sub: 'Successfully finished', 
      icon: CheckCircle, 
      color: 'emerald'
    },
    { 
      label: 'Return Docs', 
      value: returnDocsCount, 
      sub: 'Action Required', 
      icon: RotateCcw, 
      color: 'orange'
    },
  ];

  const filtered = clients.filter(
    (c) =>
      c.id.toLowerCase().includes(query.toLowerCase()) ||
      c.name.toLowerCase().includes(query.toLowerCase()) ||
      c.email.toLowerCase().includes(query.toLowerCase())
  );

  // Helper for Status Badge Colors
  const getStatusColor = (status) => {
    switch(status) {
      case 'Completed': return isDarkMode ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-emerald-100 text-emerald-700 border-emerald-200';
      case 'Doc Processing': return isDarkMode ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' : 'bg-blue-100 text-blue-700 border-blue-200';
      case 'Registration': return isDarkMode ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' : 'bg-amber-100 text-amber-700 border-amber-200';
      case 'Return Docs': return isDarkMode ? 'bg-red-500/10 text-red-400 border-red-500/20' : 'bg-red-100 text-red-700 border-red-200';
      default: return isDarkMode ? 'bg-zinc-800 text-zinc-400' : 'bg-gray-100 text-gray-600';
    }
  };

  // Helper for Icon Colors
  const getIconStyles = (color) => {
    const map = {
        blue: isDarkMode ? 'bg-blue-500/10 text-blue-400' : 'bg-blue-50 text-blue-600',
        emerald: isDarkMode ? 'bg-emerald-500/10 text-emerald-400' : 'bg-emerald-50 text-emerald-600',
        orange: isDarkMode ? 'bg-orange-500/10 text-orange-400' : 'bg-orange-50 text-orange-600'
    };
    return map[color];
  };

  return (
    <div className={`min-h-screen flex transition-colors duration-300 ${isDarkMode ? 'bg-[#09090b] text-zinc-100' : 'bg-gray-50 text-gray-900'}`}>
      <Sidebar />

      <main className="ml-64 flex-1 min-h-screen overflow-auto">
        <div className="pt-20 pb-8"> 
          <Header />

          <div className="max-w-[1600px] mx-auto px-8">
            
            {/* --- Page Header --- */}
            <div className="mb-8">
                <h1 className={`text-3xl font-bold tracking-tight ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  All Clients
                </h1>
                <p className={`mt-1 ${isDarkMode ? 'text-zinc-400' : 'text-gray-500'}`}>
                  Manage your client database and track status updates.
                </p>
            </div>

            {/* --- Stats Grid --- */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {stats.map((stat, index) => (
                <div 
                  key={index} 
                  className={`p-6 rounded-2xl border shadow-sm transition-all
                    ${isDarkMode 
                      ? 'bg-[#18181b] border-zinc-800' 
                      : 'bg-white border-gray-200 hover:shadow-md'
                    }`}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <p className={`text-sm font-medium ${isDarkMode ? 'text-zinc-500' : 'text-gray-500'}`}>
                        {stat.label}
                      </p>
                      <h3 className={`text-3xl font-bold mt-2 tracking-tight ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                        {stat.value}
                      </h3>
                      <p className={`text-xs mt-1 ${isDarkMode ? 'text-zinc-500' : 'text-gray-400'}`}>
                        {stat.sub}
                      </p>
                    </div>
                    <div className={`p-3 rounded-xl transition-colors ${getIconStyles(stat.color)}`}>
                      <stat.icon size={22} />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* --- Toolbar --- */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
              <div className="flex items-center gap-3 flex-1">
                {/* Search Input */}
                <div className="relative group w-full md:max-w-md">
                  <Search className={`absolute left-3 top-1/2 -translate-y-1/2 ${isDarkMode ? 'text-zinc-500' : 'text-gray-400'}`} size={18} />
                  <input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search clients..."
                    className={`w-full pl-10 pr-4 py-2.5 rounded-xl border text-sm outline-none transition-all
                      ${isDarkMode 
                        ? 'bg-[#18181b] border-zinc-800 text-white focus:border-blue-500/50 focus:bg-zinc-900' 
                        : 'bg-white border-gray-200 text-gray-900 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 placeholder:text-gray-400'
                      }`}
                  />
                </div>

                <button className={`hidden md:flex items-center gap-2 px-4 py-2.5 rounded-xl border text-sm font-medium transition-colors
                   ${isDarkMode ? 'bg-[#18181b] border-zinc-800 text-zinc-300 hover:bg-zinc-800' : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'}`}>
                  <Filter size={16} />
                  <span>Filter</span>
                </button>

                <button className={`hidden md:flex items-center gap-2 px-4 py-2.5 rounded-xl border text-sm font-medium transition-colors
                   ${isDarkMode ? 'bg-[#18181b] border-zinc-800 text-zinc-300 hover:bg-zinc-800' : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'}`}>
                  <ArrowUpDown size={16} />
                  <span>Sort</span>
                </button>
              </div>

              <div className="flex items-center gap-3">
                <button className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border text-sm font-medium transition-colors
                   ${isDarkMode ? 'bg-[#18181b] border-zinc-800 text-zinc-300 hover:bg-zinc-800' : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'}`}>
                  <Download size={18} />
                  <span className="hidden sm:inline">Export</span>
                </button>
                
                <Link to="/add-client" className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium transition-all shadow-sm">
                  <Plus size={18} />
                  <span>Add Client</span>
                </Link>
              </div>
            </div>

            {/* --- INLINE TABLE IMPLEMENTATION --- */}
            <div className={`rounded-2xl border overflow-hidden shadow-sm
               ${isDarkMode ? 'bg-[#18181b] border-zinc-800' : 'bg-white border-gray-200'}`}>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className={`border-b text-xs uppercase font-semibold tracking-wider
                      ${isDarkMode ? 'bg-zinc-900/50 border-zinc-800 text-zinc-500' : 'bg-gray-50/80 border-gray-100 text-gray-500'}`}>
                      <th className="px-6 py-4 w-[50px]">
                        <input type="checkbox" className="rounded border-gray-300" />
                      </th>
                      <th className="px-6 py-4">Client ID</th>
                      <th className="px-6 py-4">Name</th>
                      <th className="px-6 py-4">Email</th>
                      <th className="px-6 py-4">Broker</th>
                      <th className="px-6 py-4">Stage</th>
                      <th className="px-6 py-4">Status</th>
                      <th className="px-6 py-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className={`divide-y text-sm ${isDarkMode ? 'divide-zinc-800' : 'divide-gray-100'}`}>
                    {filtered.map((client) => (
                      <tr key={client.id} className={`group transition-colors
                        ${isDarkMode ? 'hover:bg-zinc-800/50 text-zinc-300' : 'hover:bg-gray-50 text-gray-700'}`}>
                        
                        <td className="px-6 py-4">
                          <input type="checkbox" className="rounded border-gray-300" />
                        </td>
                        
                        <td className={`px-6 py-4 font-mono ${isDarkMode ? 'text-zinc-500' : 'text-gray-500'}`}>
                          {client.id}
                        </td>
                        
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold
                              ${isDarkMode ? 'bg-zinc-800 text-zinc-400' : 'bg-gray-100 text-gray-600'}`}>
                              {client.avatar}
                            </div>
                            <span className={`font-medium ${isDarkMode ? 'text-zinc-200' : 'text-gray-900'}`}>
                              {client.name}
                            </span>
                          </div>
                        </td>
                        
                        <td className={`px-6 py-4 ${isDarkMode ? 'text-zinc-500' : 'text-gray-500'}`}>
                          {client.email}
                        </td>

                        <td className="px-6 py-4">{client.broker}</td>
                        <td className="px-6 py-4">{client.stage}</td>
                        
                        <td className="px-6 py-4">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(client.status)}`}>
                            {client.status}
                          </span>
                        </td>
                        
                        <td className="px-6 py-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button className={`p-2 rounded-lg transition-colors
                               ${isDarkMode ? 'hover:bg-zinc-800 text-zinc-400 hover:text-white' : 'hover:bg-gray-100 text-gray-400 hover:text-gray-900'}`}>
                              <Eye size={16} />
                            </button>
                            <button className={`p-2 rounded-lg transition-colors
                               ${isDarkMode ? 'hover:bg-zinc-800 text-zinc-400 hover:text-white' : 'hover:bg-gray-100 text-gray-400 hover:text-gray-900'}`}>
                              <Edit size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}