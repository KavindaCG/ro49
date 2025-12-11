import React, { useState } from 'react';
import Sidebar from '../components/Sidebar'; // Adjust path if necessary
import Header from '../components/Header';   // Adjust path if necessary
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
  FileText 
} from 'lucide-react';

const AllApplications = () => {
  const { isDarkMode } = useTheme();

  // --- STATE ---
  const [searchTerm, setSearchTerm] = useState('');
  
  // Dropdown States
  const [openDropdown, setOpenDropdown] = useState(null); // 'status', 'payment', 'process', 'country'
  const [filters, setFilters] = useState({
    status: 'All Statuses',
    payment: 'All Payments',
    process: 'All Process',
    country: 'All Countries'
  });

  // --- DATA MOCKUPS ---
  const stats = [
    { label: 'TOTAL', value: '0', sub: 'Applications', icon: <Briefcase size={20} />, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'APPROVED', value: '0', sub: 'Successful', icon: <CheckCircle size={20} />, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { label: 'PROCESSING', value: '0', sub: 'In progress', icon: <Clock size={20} />, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'TOTAL VALUE', value: '$0', sub: 'Expected', icon: <DollarSign size={20} />, color: 'text-purple-600', bg: 'bg-purple-50' },
    { label: 'COLLECTED', value: '$0', sub: 'Paid', icon: <CreditCard size={20} />, color: 'text-emerald-600', bg: 'bg-emerald-50' },
  ];

  // Options based on your images
  const filterOptions = {
    status: ['All Statuses', 'Draft', 'Submitted', 'Processing', 'Approved', 'Rejected'],
    payment: ['All Payments', 'Not Set', 'Pending', 'Partial', 'Completed'],
    process: ['All Process', 'Not Started', 'In Progress', 'Completed', 'Cancelled'],
    country: ['All Countries', 'UAE', 'Qatar', 'Saudi Arabia', 'Kuwait'] // Generic examples added
  };

  // --- HANDLERS ---
  const toggleDropdown = (name) => {
    setOpenDropdown(openDropdown === name ? null : name);
  };

  const handleFilterSelect = (type, value) => {
    setFilters({ ...filters, [type]: value });
    setOpenDropdown(null);
  };

  return (
    <div className={`min-h-screen flex ${isDarkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-900'}`}>
      <Sidebar />

      <main className="ml-64 flex-1 min-h-screen overflow-auto pt-20 transition-all duration-300 font-sans relative">
        <Header />

        <div className="p-8 max-w-[1600px] mx-auto space-y-6">

          {/* 1. PAGE HEADER */}
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Applications</h1>
              <p className="text-slate-500 mt-1">Track and manage all job applications</p>
            </div>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg font-medium flex items-center gap-2 shadow-sm transition-colors">
              <Plus size={18} />
              New Application
            </button>
          </div>

          {/* 2. STATS CARDS */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {stats.map((stat, index) => (
              <div key={index} className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm flex flex-col justify-between h-32">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">{stat.label}</p>
                    <h3 className="text-3xl font-bold text-slate-900">{stat.value}</h3>
                  </div>
                  <div className={`p-2.5 rounded-lg ${stat.bg} ${stat.color}`}>
                    {stat.icon}
                  </div>
                </div>
                <p className="text-sm text-slate-400 font-medium">{stat.sub}</p>
              </div>
            ))}
          </div>

          {/* 3. FILTERS BAR */}
          <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex flex-wrap items-center gap-4">
            
            {/* Search */}
            <div className="relative flex-1 min-w-[300px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input 
                type="text" 
                placeholder="Search by name, position, company, passport..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-transparent focus:bg-white focus:border-blue-100 focus:ring-4 focus:ring-blue-500/10 rounded-lg text-sm outline-none transition-all"
              />
            </div>

            {/* Custom Dropdowns */}
            <FilterDropdown 
              label={filters.status} 
              options={filterOptions.status} 
              isOpen={openDropdown === 'status'}
              onToggle={() => toggleDropdown('status')}
              onSelect={(val) => handleFilterSelect('status', val)}
            />

            <FilterDropdown 
              label={filters.payment} 
              options={filterOptions.payment} 
              isOpen={openDropdown === 'payment'}
              onToggle={() => toggleDropdown('payment')}
              onSelect={(val) => handleFilterSelect('payment', val)}
            />

            <FilterDropdown 
              label={filters.process} 
              options={filterOptions.process} 
              isOpen={openDropdown === 'process'}
              onToggle={() => toggleDropdown('process')}
              onSelect={(val) => handleFilterSelect('process', val)}
            />

            <FilterDropdown 
              label={filters.country} 
              options={filterOptions.country} 
              isOpen={openDropdown === 'country'}
              onToggle={() => toggleDropdown('country')}
              onSelect={(val) => handleFilterSelect('country', val)}
            />
          </div>

          {/* 4. APPLICATIONS LIST (Empty State) */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm min-h-[500px] flex flex-col">
            
            {/* List Header */}
            <div className="p-6 border-b border-gray-100 flex justify-between items-center">
              <div>
                <h3 className="text-lg font-bold text-slate-900">Applications List</h3>
                <p className="text-sm text-slate-500">0 applications</p>
              </div>
              <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-slate-600 hover:bg-gray-50 text-sm font-medium transition-colors">
                <Download size={16} />
                Export
              </button>
            </div>

            {/* Empty Body */}
            <div className="flex-1 flex flex-col items-center justify-center text-center p-12">
              <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                <FileText className="text-gray-300" size={32} />
              </div>
              <h4 className="text-slate-900 font-medium mb-1">No applications found</h4>
              <p className="text-slate-400 text-sm max-w-xs">
                Try adjusting your search or filters to find what you're looking for.
              </p>
            </div>

          </div>

        </div>
      </main>
    </div>
  );
};

// --- HELPER COMPONENT FOR CUSTOM DROPDOWNS ---
const FilterDropdown = ({ label, options, isOpen, onToggle, onSelect }) => {
  return (
    <div className="relative min-w-[160px]">
      <button 
        onClick={onToggle}
        className={`w-full flex items-center justify-between px-4 py-2.5 rounded-lg border text-sm font-medium transition-all ${
          isOpen 
            ? 'border-blue-500 ring-4 ring-blue-500/10 bg-white text-blue-600' 
            : 'border-transparent bg-gray-50 text-slate-600 hover:bg-gray-100'
        }`}
      >
        {label}
        <ChevronDown size={16} className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute top-full mt-2 left-0 w-full min-w-[180px] bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-20 animate-in fade-in zoom-in-95 duration-100">
          {options.map((option) => (
            <button
              key={option}
              onClick={() => onSelect(option)}
              className={`w-full text-left px-4 py-2 text-sm transition-colors ${
                label === option 
                  ? 'bg-blue-600 text-white' 
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