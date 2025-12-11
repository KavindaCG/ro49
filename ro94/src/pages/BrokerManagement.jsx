import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import hook for navigation
import { Link } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import { useTheme } from '../contexts/ThemeContext';

import { 
  Search, 
  Filter, 
  Users, 
  TrendingUp, 
  DollarSign, 
  ArrowUpRight, 
  ChevronDown, 
  Plus,
  Edit2,     
  Trash2,    
  X          
} from 'lucide-react';

const BrokerManagement = () => {
  const navigate = useNavigate(); // Initialize navigation
  const { isDarkMode } = useTheme();

  // 1. Broker Data State
  const [brokers, setBrokers] = useState([
    { id: 'ROB-001', name: 'Agent A', email: 'a@example.com', location: 'Sri Lanka', performance: 'STAGE 2', status: 'Active' },
    { id: 'ROB-002', name: 'Agent K', email: 'k@example.com', location: 'USA', performance: 'STAGE 1', status: 'Hold' },
    { id: 'ROB-003', name: 'Agent Z', email: 'z@example.com', location: 'Australia', performance: 'STAGE 2', status: 'Active' },
    { id: 'ROB-004', name: 'Agent M', email: 'm@example.com', location: 'Germany', performance: 'STAGE 3', status: 'Hold' },
    { id: 'ROB-005', name: 'Agent X', email: 'x@example.com', location: 'Japan', performance: 'STAGE 2', status: 'Active' },
  ]);

  // State for Modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentBroker, setCurrentBroker] = useState(null);

  // --- ACTIONS ---

  // 1. Navigate to Details Page
  const handleViewProfile = (id) => {
    navigate(`/brokers/${id}`);
  };

  // 2. Delete Broker
  const handleDelete = (e, id) => {
    e.stopPropagation(); // Stop row click from triggering navigation
    if (window.confirm("Are you sure you want to delete this broker?")) {
      setBrokers(brokers.filter((broker) => broker.id !== id));
    }
  };

  // 3. Open Edit Modal
  const handleEditClick = (e, broker) => {
    e.stopPropagation(); // Stop row click from triggering navigation
    setCurrentBroker({ ...broker }); 
    setIsModalOpen(true);
  };

  // 4. Handle Input Change (Modal)
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentBroker({ ...currentBroker, [name]: value });
  };

  // 5. Save Changes
  const handleSave = () => {
    setBrokers(brokers.map((b) => (b.id === currentBroker.id ? currentBroker : b)));
    setIsModalOpen(false);
    setCurrentBroker(null);
  };

  // Styles Logic (Only Active/Hold)
  const getStatusStyles = (status) => {
    if (status === 'Active') return 'bg-emerald-50 text-emerald-700 ring-1 ring-inset ring-emerald-600/20';
    if (status === 'Hold') return 'bg-amber-50 text-amber-700 ring-1 ring-inset ring-amber-600/20';
    return 'bg-gray-50 text-gray-600 ring-1 ring-inset ring-gray-500/10';
  };

  return (
    <div className={`min-h-screen flex ${isDarkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-900'}`}>
      <Sidebar />

      <main className="ml-64 flex-1 min-h-screen overflow-auto pt-20 transition-all duration-300 font-sans relative">
        <Header />
      
      <div className="p-8 max-w-[1600px] mx-auto">
        {/* HEADER */}
        <div className="flex justify-between items-end mb-8">
            <div>
                <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Broker Management</h1>
                <p className="text-slate-500 mt-1">Manage your agents, track performance, and monitor commissions.</p>
            </div>
            <div className="text-sm text-slate-400">
                Last updated: Today, 10:43 AM
            </div>
        </div>

        {/* STATS CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <StatCard title="Top Performer" value="Agent Smith" sub="15 Active Clients" trend="+12.5%" icon={<Users size={20} className="text-blue-600" />} color="bg-blue-50" />
          <StatCard title="Total Commission Due" value="$150,240" sub="Pending for 3 Brokers" trend="+8.2%" icon={<DollarSign size={20} className="text-emerald-600" />} color="bg-emerald-50" />
          <StatCard title="Avg Success Rate" value="85.4%" sub="Based on last 30 days" trend="+2.1%" icon={<TrendingUp size={20} className="text-violet-600" />} color="bg-violet-50" />
        </div>

        {/* TOOLBAR */}
        <div className="flex flex-wrap items-center justify-between mb-6 gap-4">
          <div className="relative flex-1 max-w-sm group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" size={20} />
            <input type="text" placeholder="Search brokers..." className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-lg text-slate-700 focus:ring-2 focus:ring-blue-100 outline-none shadow-sm" />
          </div>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 text-slate-600 font-medium rounded-lg hover:bg-gray-50 shadow-sm"><Filter size={18} /> Filter</button>
            <button className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-medium rounded-lg flex items-center gap-2 shadow-md"><Plus size={18} /> Add Broker</button>
          </div>
        </div>

        {/* BROKER TABLE */}
        <div className="bg-white rounded-xl overflow-hidden border border-gray-200 shadow-sm">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50/50 border-b border-gray-100 text-left">
                <th className="px-6 py-4 w-12"><input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500" /></th>
                <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Broker ID</th>
                <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Agent Details</th>
                <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Location</th>
                <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Performance</th>
                <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {brokers.map((broker) => (
                <tr key={broker.id} className="hover:bg-slate-50/80 transition-colors group">
                  {/* Checkbox */}
                  <td className="px-6 py-4"><input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500" /></td>
                  
                  {/* ID */}
                  <td className="px-6 py-4 text-sm font-mono text-slate-500">{broker.id}</td>
                  
                  {/* CLICKABLE PROFILE AREA */}
                  <td className="px-6 py-4">
                    <div 
                        onClick={() => handleViewProfile(broker.id)}
                        className="flex items-center gap-3 cursor-pointer group/profile"
                    >
                      <div className="w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 font-bold text-xs border border-slate-200 group-hover/profile:border-blue-300 transition-colors">
                          {broker.name.substring(0,2).toUpperCase()}
                      </div>
                      <div className="flex flex-col">
                          <Link to={`/brokers/${broker.id}`} onClick={(e) => e.stopPropagation()} className="text-sm font-medium text-gray-900 hover:underline">
                            {broker.name}
                          </Link>
                          <span className="text-xs text-slate-500">{broker.email}</span>
                      </div>
                    </div>
                  </td>

                  {/* Location */}
                  <td className="px-6 py-4 text-sm text-slate-600">{broker.location}</td>
                  
                  {/* Performance */}
                  <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="h-1.5 w-16 bg-gray-100 rounded-full overflow-hidden"><div className="h-full bg-blue-500 rounded-full" style={{width: '60%'}}></div></div>
                        <span className="text-xs font-medium text-slate-600">{broker.performance}</span>
                      </div>
                  </td>

                  {/* Status */}
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusStyles(broker.status)}`}>{broker.status}</span>
                  </td>
                  
                  {/* ACTIONS COLUMN */}
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button 
                        onClick={(e) => handleEditClick(e, broker)}
                        className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors"
                        title="Edit Broker"
                      >
                        <Edit2 size={16} />
                      </button>
                      <button 
                        onClick={(e) => handleDelete(e, broker.id)}
                        className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                        title="Delete Broker"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {brokers.length === 0 && <div className="p-8 text-center text-slate-500">No brokers found.</div>}
        </div>
      </div>

      {/* --- EDIT MODAL --- */}
      {isModalOpen && currentBroker && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md p-6 relative animate-in fade-in zoom-in duration-200">
            
            {/* Modal Header */}
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-slate-900">Edit Broker</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X size={20} />
              </button>
            </div>

            {/* Edit Form */}
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Name</label>
                <input 
                  type="text" 
                  name="name" 
                  value={currentBroker.name} 
                  onChange={handleInputChange} 
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-slate-700"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Email</label>
                <input 
                  type="email" 
                  name="email" 
                  value={currentBroker.email} 
                  onChange={handleInputChange} 
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-slate-700"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Location</label>
                  <input 
                    type="text" 
                    name="location" 
                    value={currentBroker.location} 
                    onChange={handleInputChange} 
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-slate-700"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Status</label>
                  <select 
                    name="status" 
                    value={currentBroker.status} 
                    onChange={handleInputChange} 
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-slate-700 bg-white"
                  >
                    <option value="Active">Active</option>
                    <option value="Hold">Hold</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="flex items-center justify-end gap-3 mt-8">
              <button 
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50 rounded-lg border border-transparent hover:border-slate-200 transition-all"
              >
                Cancel
              </button>
              <button 
                onClick={handleSave}
                className="px-4 py-2 text-sm font-medium text-white bg-slate-900 hover:bg-slate-800 rounded-lg shadow-sm transition-all"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

    </main>
  </div>
  );
};

// Stat Card Component
const StatCard = ({ title, value, sub, trend, icon, color }) => (
  <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-[0_2px_10px_-4px_rgba(6,81,237,0.1)] hover:shadow-md transition-shadow">
    <div className="flex justify-between items-start mb-4">
      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${color}`}>{icon}</div>
      <div className="flex items-center gap-1 text-emerald-600 bg-emerald-50 px-2 py-1 rounded-md text-xs font-bold"><ArrowUpRight size={14} /> {trend}</div>
    </div>
    <div><h3 className="text-slate-500 text-sm font-medium mb-1">{title}</h3><p className="text-2xl font-bold text-slate-900 tracking-tight">{value}</p></div>
    <div className="mt-4 pt-4 border-t border-gray-50 flex items-center justify-between"><span className="text-xs text-slate-400 font-medium">{sub}</span><button className="text-slate-400 hover:text-blue-600 transition-colors"><ArrowUpRight size={18} /></button></div>
  </div>
);

export default BrokerManagement;