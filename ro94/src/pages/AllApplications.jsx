import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import { useTheme } from '../contexts/ThemeContext';
import { 
  Briefcase, 
  CheckCircle, 
  Clock, 
  DollarSign, 
  CreditCard, 
  Search, 
  ChevronDown, 
  Download, 
  Plus,
  FileText,
  Edit2,
  Trash2,
  Eye
} from 'lucide-react';

const AllApplications = () => {
  const { isDarkMode } = useTheme();

  // --- STATE ---
  const [searchTerm, setSearchTerm] = useState('');
  const [openDropdown, setOpenDropdown] = useState(null); 
  const [filters, setFilters] = useState({
    status: 'All Statuses',
    payment: 'All Payments',
    process: 'All Process',
    country: 'All Countries'
  });

  // --- MOCK DATA ---
  const [applications, setApplications] = useState([
    { 
      id: 'APP-001', 
      clientId: 'CL-045', 
      name: 'Sandesh Nawarathne', 
      docName: 'Work Visa Application.pdf', 
      docStatus: 'Approved', 
      paymentStatus: 'Completed', 
      processStatus: 'Completed', 
      country: 'UAE' 
    },
    { 
      id: 'APP-002', 
      clientId: 'CL-046', 
      name: 'John Doe', 
      docName: 'Residency Permit.pdf', 
      docStatus: 'Processing', 
      paymentStatus: 'Partial', 
      processStatus: 'In Progress', 
      country: 'Qatar' 
    },
    { 
      id: 'APP-003', 
      clientId: 'CL-047', 
      name: 'Sarah Smith', 
      docName: 'Medical Report.pdf', 
      docStatus: 'Submitted', 
      paymentStatus: 'Pending', 
      processStatus: 'Not Started', 
      country: 'Saudi Arabia' 
    },
    { 
      id: 'APP-004', 
      clientId: 'CL-048', 
      name: 'Michael Brown', 
      docName: 'Police Clearance.pdf', 
      docStatus: 'Rejected', 
      paymentStatus: 'Not Set', 
      processStatus: 'Cancelled', 
      country: 'Kuwait' 
    },
    { 
      id: 'APP-005', 
      clientId: 'CL-049', 
      name: 'Emily Davis', 
      docName: 'Employment Contract.pdf', 
      docStatus: 'Draft', 
      paymentStatus: 'Pending', 
      processStatus: 'Not Started', 
      country: 'UAE' 
    },
  ]);

  // --- STATS DATA ---
  const stats = [
    { label: 'TOTAL', value: applications.length, sub: 'Applications', icon: <Briefcase size={22} />, color: 'blue' },
    { label: 'APPROVED', value: applications.filter(a => a.docStatus === 'Approved').length, sub: 'Successful', icon: <CheckCircle size={22} />, color: 'emerald' },
    { label: 'PROCESSING', value: applications.filter(a => a.docStatus === 'Processing').length, sub: 'In progress', icon: <Clock size={22} />, color: 'blue' },
    { label: 'TOTAL VALUE', value: '$12,450', sub: 'Expected', icon: <DollarSign size={22} />, color: 'purple' },
    { label: 'COLLECTED', value: '$8,200', sub: 'Paid', icon: <CreditCard size={22} />, color: 'emerald' },
  ];

  // --- DROPDOWN OPTIONS ---
  const filterOptions = {
    status: ['All Statuses', 'Draft', 'Submitted', 'Processing', 'Approved', 'Rejected'],
    payment: ['All Payments', 'Not Set', 'Pending', 'Partial', 'Completed'],
    process: ['All Process', 'Not Started', 'In Progress', 'Completed', 'Cancelled'],
    country: ['All Countries', 'UAE', 'Qatar', 'Saudi Arabia', 'Kuwait'] 
  };

  // --- HANDLERS ---
  const toggleDropdown = (name) => {
    setOpenDropdown(openDropdown === name ? null : name);
  };

  const handleFilterSelect = (type, value) => {
    setFilters({ ...filters, [type]: value });
    setOpenDropdown(null);
  };

  const handleDelete = (id) => {
    if(window.confirm("Are you sure you want to delete this application?")) {
      setApplications(applications.filter(app => app.id !== id));
    }
  };

  // --- HELPER: GET STATUS COLORS (THEME AWARE) ---
  const getStatusColor = (status, isDark) => {
    const lightColors = {
      'Approved': 'bg-emerald-100 text-emerald-700',
      'Completed': 'bg-emerald-100 text-emerald-700',
      'Processing': 'bg-blue-100 text-blue-700',
      'In Progress': 'bg-blue-100 text-blue-700',
      'Submitted': 'bg-indigo-100 text-indigo-700',
      'Rejected': 'bg-red-100 text-red-700',
      'Draft': 'bg-gray-100 text-gray-700',
      'Partial': 'bg-amber-100 text-amber-700',
      'Pending': 'bg-orange-100 text-orange-700',
      'Not Set': 'bg-gray-100 text-gray-500',
      'Not Started': 'bg-gray-100 text-gray-600',
      'Cancelled': 'bg-red-50 text-red-600'
    };

    const darkColors = {
      'Approved': 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20',
      'Completed': 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20',
      'Processing': 'bg-blue-500/10 text-blue-400 border border-blue-500/20',
      'In Progress': 'bg-blue-500/10 text-blue-400 border border-blue-500/20',
      'Submitted': 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20',
      'Rejected': 'bg-red-500/10 text-red-400 border border-red-500/20',
      'Draft': 'bg-zinc-800 text-zinc-400 border border-zinc-700',
      'Partial': 'bg-amber-500/10 text-amber-400 border border-amber-500/20',
      'Pending': 'bg-orange-500/10 text-orange-400 border border-orange-500/20',
      'Not Set': 'bg-zinc-800 text-zinc-500 border border-zinc-700',
      'Not Started': 'bg-zinc-800 text-zinc-500 border border-zinc-700',
      'Cancelled': 'bg-red-900/20 text-red-400 border border-red-900/30'
    };

    return isDark 
      ? darkColors[status] || 'bg-zinc-800 text-zinc-400'
      : lightColors[status] || 'bg-gray-100 text-gray-600';
  };

  // Helper for icon colors in stats
  const getIconStyles = (color, isDark) => {
    const styles = {
      blue: isDark ? 'bg-blue-500/10 text-blue-400' : 'bg-blue-100 text-blue-600',
      emerald: isDark ? 'bg-emerald-500/10 text-emerald-400' : 'bg-emerald-100 text-emerald-600',
      purple: isDark ? 'bg-purple-500/10 text-purple-400' : 'bg-purple-100 text-purple-600',
    };
    return styles[color] || (isDark ? 'bg-zinc-800 text-zinc-400' : 'bg-gray-100 text-gray-600');
  };

  return (
    <div className={`min-h-screen flex transition-colors duration-300 ${isDarkMode ? 'bg-[#09090b] text-zinc-100' : 'bg-gray-50 text-gray-900'}`}>
      <Sidebar />

      <main className="ml-64 flex-1 min-h-screen overflow-auto pt-20 font-sans relative">
        <Header />

        <div className="p-8 max-w-[1600px] mx-auto space-y-6">

          {/* 1. PAGE HEADER */}
          <div className="flex justify-between items-center">
            <div>
              <h1 className={`text-3xl font-bold tracking-tight ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Applications</h1>
              <p className={`mt-1 ${isDarkMode ? 'text-zinc-400' : 'text-slate-500'}`}>Track and manage all job applications</p>
            </div>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg font-medium flex items-center gap-2 shadow-sm transition-colors hover:shadow-blue-500/20">
              <Plus size={20} />
              New Application
            </button>
          </div>

          {/* 2. STATS CARDS */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {stats.map((stat, index) => (
              <div key={index} className={`p-5 rounded-2xl border shadow-sm flex flex-col justify-between h-32 transition-all duration-200
                ${isDarkMode 
                  ? 'bg-[#18181b] border-zinc-800 hover:border-zinc-700' 
                  : 'bg-white border-gray-100 hover:shadow-md'
                }`}>
                <div className="flex justify-between items-start">
                  <div>
                    <p className={`text-[11px] font-bold uppercase tracking-wider mb-1 ${isDarkMode ? 'text-zinc-500' : 'text-slate-400'}`}>
                      {stat.label}
                    </p>
                    <h3 className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                      {stat.value}
                    </h3>
                  </div>
                  <div className={`p-3 rounded-xl ${getIconStyles(stat.color, isDarkMode)}`}>
                    {stat.icon}
                  </div>
                </div>
                <p className={`text-sm font-medium ${isDarkMode ? 'text-zinc-500' : 'text-slate-400'}`}>
                  {stat.sub}
                </p>
              </div>
            ))}
          </div>

          {/* 3. FILTERS BAR */}
          <div className={`p-3 rounded-2xl border shadow-sm flex flex-wrap items-center gap-3 transition-colors
            ${isDarkMode ? 'bg-[#18181b] border-zinc-800' : 'bg-white border-gray-100'}`}>
            
            <div className="relative flex-1 min-w-[300px]">
              <Search className={`absolute left-4 top-1/2 -translate-y-1/2 ${isDarkMode ? 'text-zinc-500' : 'text-slate-400'}`} size={19} />
              <input 
                type="text" 
                placeholder="Search by name, position, company, passport..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`w-full pl-11 pr-4 py-2.5 border rounded-xl text-sm outline-none transition-all
                  ${isDarkMode 
                    ? 'bg-zinc-900/50 border-zinc-800 focus:bg-zinc-900 focus:border-blue-500/50 text-zinc-100 placeholder:text-zinc-600' 
                    : 'bg-gray-50/50 border-transparent focus:bg-white focus:border-blue-100 focus:ring-4 focus:ring-blue-500/10 text-slate-900 placeholder:text-slate-400'
                  }`}
              />
            </div>

            <FilterDropdown 
              label={filters.status} 
              options={filterOptions.status} 
              isOpen={openDropdown === 'status'} 
              onToggle={() => toggleDropdown('status')} 
              onSelect={(val) => handleFilterSelect('status', val)} 
              isDarkMode={isDarkMode}
            />
            <FilterDropdown 
              label={filters.payment} 
              options={filterOptions.payment} 
              isOpen={openDropdown === 'payment'} 
              onToggle={() => toggleDropdown('payment')} 
              onSelect={(val) => handleFilterSelect('payment', val)} 
              isDarkMode={isDarkMode}
            />
            <FilterDropdown 
              label={filters.process} 
              options={filterOptions.process} 
              isOpen={openDropdown === 'process'} 
              onToggle={() => toggleDropdown('process')} 
              onSelect={(val) => handleFilterSelect('process', val)} 
              isDarkMode={isDarkMode}
            />
            <FilterDropdown 
              label={filters.country} 
              options={filterOptions.country} 
              isOpen={openDropdown === 'country'} 
              onToggle={() => toggleDropdown('country')} 
              onSelect={(val) => handleFilterSelect('country', val)} 
              isDarkMode={isDarkMode}
            />
          </div>

          {/* 4. APPLICATIONS TABLE */}
          <div className={`rounded-2xl border shadow-sm overflow-hidden transition-colors
            ${isDarkMode ? 'bg-[#18181b] border-zinc-800' : 'bg-white border-gray-100'}`}>
            
            <div className={`px-8 py-6 border-b flex justify-between items-center
              ${isDarkMode ? 'border-zinc-800 bg-[#18181b]' : 'border-gray-100 bg-white'}`}>
              <div>
                <h3 className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Applications List</h3>
                <p className={`text-sm mt-1 ${isDarkMode ? 'text-zinc-500' : 'text-slate-500'}`}>{applications.length} applications found</p>
              </div>
              <button className={`flex items-center gap-2 px-4 py-2 border rounded-lg text-sm font-medium transition-colors
                ${isDarkMode 
                  ? 'border-zinc-700 text-zinc-300 hover:bg-zinc-800' 
                  : 'border-gray-200 text-slate-600 hover:bg-gray-50'
                }`}>
                <Download size={16} />
                Export
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className={`border-b text-xs uppercase font-semibold tracking-wider
                    ${isDarkMode 
                      ? 'bg-zinc-900/50 border-zinc-800 text-zinc-500' 
                      : 'bg-gray-50/50 border-gray-100 text-slate-500'
                    }`}>
                    <th className="px-6 py-4">Client ID</th>
                    <th className="px-6 py-4">Client Name</th>
                    <th className="px-6 py-4">Document</th>
                    <th className="px-6 py-4">Doc Status</th>
                    <th className="px-6 py-4">Payment</th>
                    <th className="px-6 py-4">Process</th>
                    <th className="px-6 py-4">Country</th>
                    <th className="px-6 py-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className={`divide-y text-sm ${isDarkMode ? 'divide-zinc-800 text-zinc-300' : 'divide-gray-100 text-slate-700'}`}>
                  {applications.map((app) => (
                    <tr key={app.id} className={`transition-colors group
                      ${isDarkMode ? 'hover:bg-zinc-800/50' : 'hover:bg-slate-50/60'}`}>
                      
                      <td className={`px-6 py-4 font-mono ${isDarkMode ? 'text-zinc-500' : 'text-slate-500'}`}>
                        {app.clientId}
                      </td>
                      
                      <td className={`px-6 py-4 font-medium ${isDarkMode ? 'text-zinc-200' : 'text-slate-900'}`}>
                        <div className="flex items-center gap-3">
                           <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold
                             ${isDarkMode ? 'bg-zinc-800 text-zinc-400' : 'bg-slate-100 text-slate-500'}`}>
                             {app.name.substring(0,2).toUpperCase()}
                           </div>
                           {app.name}
                        </div>
                      </td>
                      
                      <td className="px-6 py-4">
                        <div className={`flex items-center gap-2 ${isDarkMode ? 'text-zinc-400' : 'text-slate-600'}`}>
                          <FileText size={16} className={isDarkMode ? 'text-blue-400' : 'text-blue-400'} />
                          <span className="truncate max-w-[150px]">{app.docName}</span>
                        </div>
                      </td>
                      
                      <td className="px-6 py-4">
                        <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${getStatusColor(app.docStatus, isDarkMode)}`}>
                          {app.docStatus}
                        </span>
                      </td>
                      
                      <td className="px-6 py-4">
                        <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${getStatusColor(app.paymentStatus, isDarkMode)}`}>
                          {app.paymentStatus}
                        </span>
                      </td>
                      
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                           <div className={`w-2 h-2 rounded-full 
                             ${app.processStatus === 'Completed' ? 'bg-emerald-500' : 
                               app.processStatus === 'In Progress' ? 'bg-blue-500' : 
                               isDarkMode ? 'bg-zinc-700' : 'bg-gray-300'}`}></div>
                           {app.processStatus}
                        </div>
                      </td>
                      
                      <td className={`px-6 py-4 ${isDarkMode ? 'text-zinc-400' : 'text-slate-600'}`}>
                        {app.country}
                      </td>
                      
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <ActionButton icon={Eye} isDarkMode={isDarkMode} color="blue" />
                          <ActionButton icon={Edit2} isDarkMode={isDarkMode} color="emerald" />
                          <ActionButton icon={Trash2} isDarkMode={isDarkMode} color="red" onClick={() => handleDelete(app.id)} />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              
              {applications.length === 0 && (
                 <div className={`p-12 text-center ${isDarkMode ? 'text-zinc-600' : 'text-slate-500'}`}>
                    No applications found matching your criteria.
                 </div>
              )}
            </div>
          </div>

        </div>
      </main>
    </div>
  );
};

// --- SUBCOMPONENTS ---

const ActionButton = ({ icon: Icon, isDarkMode, color, onClick }) => {
  // Mapping for hover colors
  const hoverColors = {
    blue: isDarkMode ? 'hover:text-blue-400 hover:bg-blue-500/10' : 'hover:text-blue-600 hover:bg-blue-50',
    emerald: isDarkMode ? 'hover:text-emerald-400 hover:bg-emerald-500/10' : 'hover:text-emerald-600 hover:bg-emerald-50',
    red: isDarkMode ? 'hover:text-red-400 hover:bg-red-500/10' : 'hover:text-red-600 hover:bg-red-50'
  };

  return (
    <button 
      onClick={onClick}
      className={`p-2 rounded-lg transition-all ${isDarkMode ? 'text-zinc-500' : 'text-slate-400'} ${hoverColors[color]}`}
    >
      <Icon size={16} />
    </button>
  );
};

const FilterDropdown = ({ label, options, isOpen, onToggle, onSelect, isDarkMode }) => {
  return (
    <div className="relative min-w-[160px]">
      <button 
        onClick={onToggle}
        className={`w-full flex items-center justify-between px-4 py-2.5 rounded-xl border text-sm font-medium transition-all 
          ${isDarkMode 
            ? isOpen 
              ? 'border-transparent ring-2 ring-blue-500/50 bg-zinc-900 text-blue-400' 
              : 'border-transparent bg-zinc-900 hover:bg-zinc-800 text-zinc-300'
            : isOpen 
              ? 'border-transparent ring-2 ring-blue-500 bg-white text-blue-600' 
              : 'border-transparent bg-white hover:bg-gray-50 text-slate-600 shadow-sm'
          }`}
      >
        {label}
        <ChevronDown size={16} className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className={`absolute top-full mt-2 left-0 w-full min-w-[180px] rounded-xl shadow-xl border py-2 z-20 animate-in fade-in zoom-in-95 duration-100
          ${isDarkMode ? 'bg-[#18181b] border-zinc-800 shadow-black/50' : 'bg-white border-gray-100'}`}>
          {options.map((option) => (
            <button
              key={option}
              onClick={() => onSelect(option)}
              className={`w-full text-left px-4 py-2 text-sm transition-colors 
                ${label === option 
                  ? 'bg-blue-600 text-white' 
                  : isDarkMode 
                    ? 'text-zinc-400 hover:bg-zinc-800 hover:text-white' 
                    : 'text-slate-600 hover:bg-gray-50'
                }`}
            >
              {option}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllApplications;