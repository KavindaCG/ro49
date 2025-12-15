import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
    Plus,
    Edit2,
    Trash2,
    X
} from 'lucide-react';

const BrokerManagement = () => {
    const navigate = useNavigate();
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
    const [modalMode, setModalMode] = useState('edit'); // 'edit' or 'add'

    // --- HELPER: Generate Next ID ---
    const getNextBrokerId = () => {
        if (brokers.length === 0) return 'ROB-001';
        const ids = brokers.map(b => parseInt(b.id.split('-')[1]));
        const maxId = Math.max(...ids);
        const nextId = maxId + 1;
        return `ROB-${String(nextId).padStart(3, '0')}`;
    };

    // --- ACTIONS ---

    const handleViewProfile = (id) => {
        navigate(`/brokers/${id}`);
    };

    const handleDelete = (e, id) => {
        e.stopPropagation();
        if (window.confirm("Are you sure you want to delete this broker?")) {
            setBrokers(brokers.filter((broker) => broker.id !== id));
        }
    };

    const handleEditClick = (e, broker) => {
        e.stopPropagation();
        setModalMode('edit');
        setCurrentBroker({ ...broker });
        setIsModalOpen(true);
    };

    const handleAddClick = () => {
        const newId = getNextBrokerId();
        setModalMode('add');
        setCurrentBroker({
            id: newId,
            name: '',
            email: '',
            location: '',
            performance: 'STAGE 1',
            status: 'Active'
        });
        setIsModalOpen(true);
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCurrentBroker({ ...currentBroker, [name]: value });
    };

    const handleSave = () => {
        if (!currentBroker.name || !currentBroker.email) {
            alert("Please fill in Name and Email");
            return;
        }

        let finalBrokerData = { ...currentBroker };

        if (modalMode === 'add') {
            const name = finalBrokerData.name.trim();
            if (!name.toLowerCase().startsWith('agent ')) {
                finalBrokerData.name = `Agent ${name}`;
            }
        }

        if (modalMode === 'add') {
            setBrokers([...brokers, finalBrokerData]);
        } else {
            setBrokers(brokers.map((b) => (b.id === finalBrokerData.id ? finalBrokerData : b)));
        }

        setIsModalOpen(false);
        setCurrentBroker(null);
    };

    const getStatusStyles = (status) => {
        if (status === 'Active') return isDarkMode ? 'bg-emerald-500/10 text-emerald-400 ring-1 ring-inset ring-emerald-500/20' : 'bg-emerald-50 text-emerald-700 ring-1 ring-inset ring-emerald-600/20';
        if (status === 'Hold') return isDarkMode ? 'bg-amber-500/10 text-amber-400 ring-1 ring-inset ring-amber-500/20' : 'bg-amber-50 text-amber-700 ring-1 ring-inset ring-amber-600/20';
        return isDarkMode ? 'bg-zinc-800 text-zinc-400 ring-1 ring-inset ring-zinc-700' : 'bg-gray-50 text-gray-600 ring-1 ring-inset ring-gray-500/10';
    };

    return (
        <div className={`min-h-screen flex transition-colors duration-300 ${isDarkMode ? 'bg-[#09090b] text-zinc-100' : 'bg-gray-50 text-gray-900'}`}>
            <Sidebar />

            <main className="flex-1 min-h-screen overflow-auto pt-16 md:pt-20 pb-12 transition-all duration-300">
                <div className="max-w-[1600px] mx-auto px-4 md:px-8 mt-6">
                    <Header />

                    {/* HEADER */}
                    <div className="flex flex-col md:flex-row md:justify-between md:items-end mb-8 gap-2">
                        <div>
                            <h1 className={`text-2xl md:text-3xl font-bold tracking-tight ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Broker Management</h1>
                            <p className={`mt-1 text-sm md:text-base ${isDarkMode ? 'text-zinc-400' : 'text-slate-500'}`}>Manage your agents, track performance, and monitor commissions.</p>
                        </div>
                        <div className={`text-sm ${isDarkMode ? 'text-zinc-500' : 'text-slate-400'}`}>
                            Last updated: Today, 10:43 AM
                        </div>
                    </div>

                    {/* STATS CARDS */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-8">
                        <StatCard
                            title="Top Performer"
                            value="Agent Smith"
                            sub="15 Active Clients"
                            trend="+12.5%"
                            icon={<Users size={20} className={isDarkMode ? "text-blue-400" : "text-blue-600"} />}
                            color={isDarkMode ? "bg-blue-500/10" : "bg-blue-50"}
                            isDarkMode={isDarkMode}
                        />
                        <StatCard
                            title="Total Commission Due"
                            value="$150,240"
                            sub="Pending for 3 Brokers"
                            trend="+8.2%"
                            icon={<DollarSign size={20} className={isDarkMode ? "text-emerald-400" : "text-emerald-600"} />}
                            color={isDarkMode ? "bg-emerald-500/10" : "bg-emerald-50"}
                            isDarkMode={isDarkMode}
                        />
                        <StatCard
                            title="Avg Success Rate"
                            value="85.4%"
                            sub="Based on last 30 days"
                            trend="+2.1%"
                            icon={<TrendingUp size={20} className={isDarkMode ? "text-violet-400" : "text-violet-600"} />}
                            color={isDarkMode ? "bg-violet-500/10" : "bg-violet-50"}
                            isDarkMode={isDarkMode}
                        />
                    </div>

                    {/* TOOLBAR */}
                    <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center justify-between mb-6 gap-4">
                        <div className="relative flex-1 w-full sm:max-w-sm group">
                            <Search className={`absolute left-3 top-1/2 -translate-y-1/2 transition-colors ${isDarkMode ? 'text-zinc-500 group-focus-within:text-blue-400' : 'text-slate-400 group-focus-within:text-blue-500'}`} size={20} />
                            <input
                                type="text"
                                placeholder="Search brokers..."
                                className={`w-full pl-10 pr-4 py-2.5 border rounded-lg outline-none shadow-sm transition-all
                            ${isDarkMode
                                        ? 'bg-[#18181b] border-zinc-800 text-white focus:border-blue-500/50 focus:bg-zinc-900'
                                        : 'bg-white border-gray-200 text-slate-700 focus:ring-2 focus:ring-blue-100'
                                    }`}
                            />
                        </div>
                        <div className="flex items-center gap-3">
                            <button className={`flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2.5 border font-medium rounded-lg shadow-sm transition-colors
                        ${isDarkMode
                                    ? 'bg-[#18181b] border-zinc-800 text-zinc-300 hover:bg-zinc-800'
                                    : 'bg-white border-gray-200 text-slate-600 hover:bg-gray-50'
                                }`}>
                                <Filter size={18} /> Filter
                            </button>
                            <button
                                onClick={handleAddClick}
                                className={`flex-1 sm:flex-none px-5 py-2.5 font-medium rounded-lg flex items-center justify-center gap-2 shadow-md transition-colors whitespace-nowrap
                            ${isDarkMode
                                        ? 'bg-zinc-100 text-zinc-900 hover:bg-white'
                                        : 'bg-slate-900 text-white hover:bg-slate-800'
                                    }`}
                            >
                                <Plus size={18} /> Add Broker
                            </button>
                        </div>
                    </div>

                    {/* MOBILE CARD VIEW */}
                    <div className="md:hidden space-y-4 mb-4">
                        {brokers.map((broker) => (
                            <div key={broker.id} className={`p-4 rounded-xl border shadow-sm ${isDarkMode ? 'bg-[#18181b] border-zinc-800' : 'bg-white border-gray-200'}`}>
                                <div className="flex justify-between items-start mb-3">
                                    <div
                                        onClick={() => handleViewProfile(broker.id)}
                                        className="flex items-center gap-3 cursor-pointer"
                                    >
                                        <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-xs border transition-colors
                            ${isDarkMode
                                                ? 'bg-zinc-800 text-zinc-400 border-zinc-700'
                                                : 'bg-slate-100 text-slate-500 border-slate-200'
                                            }`}>
                                            {broker.name.replace('Agent ', '').substring(0, 2).toUpperCase()}
                                        </div>
                                        <div>
                                            <h4 className={`font-semibold ${isDarkMode ? 'text-zinc-200' : 'text-gray-900'}`}>{broker.name}</h4>
                                            <p className={`text-xs font-mono opacity-60 ${isDarkMode ? 'text-zinc-400' : 'text-slate-500'}`}>{broker.id}</p>
                                        </div>
                                    </div>
                                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium uppercase tracking-wide ${getStatusStyles(broker.status)}`}>{broker.status}</span>
                                </div>

                                <div className="grid grid-cols-2 gap-3 mb-4 text-sm">
                                    <div className={`p-2 rounded-lg ${isDarkMode ? 'bg-zinc-900/50' : 'bg-gray-50'}`}>
                                        <div className={`text-xs opacity-60 mb-1 ${isDarkMode ? 'text-zinc-500' : 'text-slate-500'}`}>Location</div>
                                        <div className={isDarkMode ? 'text-zinc-300' : 'text-slate-700'}>{broker.location}</div>
                                    </div>
                                    <div className={`p-2 rounded-lg ${isDarkMode ? 'bg-zinc-900/50' : 'bg-gray-50'}`}>
                                        <div className={`text-xs opacity-60 mb-1 ${isDarkMode ? 'text-zinc-500' : 'text-slate-500'}`}>Performance</div>
                                        <div className={isDarkMode ? 'text-zinc-300' : 'text-slate-700'}>{broker.performance}</div>
                                    </div>
                                </div>

                                <div className="flex items-center justify-end gap-2 pt-3 border-t border-dashed border-gray-200 dark:border-zinc-800">
                                    <button
                                        onClick={(e) => handleEditClick(e, broker)}
                                        className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg transition-colors
                                ${isDarkMode
                                                ? 'bg-zinc-800 text-zinc-300'
                                                : 'bg-gray-100 text-slate-600'
                                            }`}
                                    >
                                        <Edit2 size={12} /> Edit
                                    </button>
                                    <button
                                        onClick={(e) => handleDelete(e, broker.id)}
                                        className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg transition-colors text-red-500 bg-red-500/10`}
                                    >
                                        <Trash2 size={12} /> Delete
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* BROKER TABLE (Desktop) */}
                    <div className={`hidden md:block rounded-xl overflow-hidden border shadow-sm transition-colors
                ${isDarkMode ? 'bg-[#18181b] border-zinc-800' : 'bg-white border-gray-200'}`}>
                        <table className="w-full">
                            <thead>
                                <tr className={`border-b text-left
                            ${isDarkMode ? 'bg-zinc-900/50 border-zinc-800' : 'bg-gray-50/50 border-gray-100'}`}>
                                    <th className="px-6 py-4 w-12">
                                        <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                                    </th>
                                    <th className={`px-6 py-3 text-xs font-semibold uppercase tracking-wider ${isDarkMode ? 'text-zinc-500' : 'text-slate-500'}`}>Broker ID</th>
                                    <th className={`px-6 py-3 text-xs font-semibold uppercase tracking-wider ${isDarkMode ? 'text-zinc-500' : 'text-slate-500'}`}>Agent Details</th>
                                    <th className={`px-6 py-3 text-xs font-semibold uppercase tracking-wider ${isDarkMode ? 'text-zinc-500' : 'text-slate-500'}`}>Location</th>
                                    <th className={`px-6 py-3 text-xs font-semibold uppercase tracking-wider ${isDarkMode ? 'text-zinc-500' : 'text-slate-500'}`}>Performance</th>
                                    <th className={`px-6 py-3 text-xs font-semibold uppercase tracking-wider ${isDarkMode ? 'text-zinc-500' : 'text-slate-500'}`}>Status</th>
                                    <th className={`px-6 py-3 text-xs font-semibold uppercase tracking-wider text-right ${isDarkMode ? 'text-zinc-500' : 'text-slate-500'}`}>Actions</th>
                                </tr>
                            </thead>
                            <tbody className={`divide-y ${isDarkMode ? 'divide-zinc-800' : 'divide-gray-100'}`}>
                                {brokers.map((broker) => (
                                    <tr key={broker.id} className={`transition-colors group
                                ${isDarkMode ? 'hover:bg-zinc-800/50' : 'hover:bg-slate-50/80'}`}>
                                        <td className="px-6 py-4">
                                            <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                                        </td>
                                        <td className={`px-6 py-4 text-sm font-mono ${isDarkMode ? 'text-zinc-500' : 'text-slate-500'}`}>{broker.id}</td>
                                        <td className="px-6 py-4">
                                            <div
                                                onClick={() => handleViewProfile(broker.id)}
                                                className="flex items-center gap-3 cursor-pointer group/profile"
                                            >
                                                <div className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs border transition-colors
                                            ${isDarkMode
                                                        ? 'bg-zinc-800 text-zinc-400 border-zinc-700 group-hover/profile:border-blue-500/50'
                                                        : 'bg-slate-100 text-slate-500 border-slate-200 group-hover/profile:border-blue-300'
                                                    }`}>
                                                    {broker.name.replace('Agent ', '').substring(0, 2).toUpperCase()}
                                                </div>
                                                <div className="flex flex-col">
                                                    <Link
                                                        to={`/brokers/${broker.id}`}
                                                        onClick={(e) => e.stopPropagation()}
                                                        className={`text-sm font-medium hover:underline
                                                    ${isDarkMode ? 'text-zinc-200' : 'text-gray-900'}`}
                                                    >
                                                        {broker.name}
                                                    </Link>
                                                    <span className={`text-xs ${isDarkMode ? 'text-zinc-500' : 'text-slate-500'}`}>{broker.email}</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className={`px-6 py-4 text-sm ${isDarkMode ? 'text-zinc-400' : 'text-slate-600'}`}>{broker.location}</td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2">
                                                <div className={`h-1.5 w-16 rounded-full overflow-hidden ${isDarkMode ? 'bg-zinc-800' : 'bg-gray-100'}`}>
                                                    <div className="h-full bg-blue-500 rounded-full" style={{ width: '60%' }}></div>
                                                </div>
                                                <span className={`text-xs font-medium ${isDarkMode ? 'text-zinc-400' : 'text-slate-600'}`}>{broker.performance}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusStyles(broker.status)}`}>{broker.status}</span>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <button
                                                    onClick={(e) => handleEditClick(e, broker)}
                                                    className={`p-1.5 rounded transition-colors
                                                ${isDarkMode
                                                            ? 'text-zinc-500 hover:text-blue-400 hover:bg-blue-500/10'
                                                            : 'text-slate-400 hover:text-blue-600 hover:bg-blue-50'
                                                        }`}
                                                    title="Edit Broker"
                                                >
                                                    <Edit2 size={16} />
                                                </button>
                                                <button
                                                    onClick={(e) => handleDelete(e, broker.id)}
                                                    className={`p-1.5 rounded transition-colors
                                                ${isDarkMode
                                                            ? 'text-zinc-500 hover:text-red-400 hover:bg-red-500/10'
                                                            : 'text-slate-400 hover:text-red-600 hover:bg-red-50'
                                                        }`}
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
                        {brokers.length === 0 && <div className={`p-8 text-center ${isDarkMode ? 'text-zinc-500' : 'text-slate-500'}`}>No brokers found.</div>}
                    </div>
                </div>

                {/* --- ADD / EDIT MODAL --- */}
                {isModalOpen && currentBroker && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
                        <div className={`rounded-xl shadow-2xl w-full max-w-md p-6 relative animate-in fade-in zoom-in duration-200
                    ${isDarkMode ? 'bg-[#18181b] border border-zinc-800' : 'bg-white'}`}>

                            <div className="flex justify-between items-center mb-6">
                                <h2 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                                    {modalMode === 'add' ? 'Add New Broker' : 'Edit Broker'}
                                </h2>
                                <button onClick={() => setIsModalOpen(false)} className={`transition-colors ${isDarkMode ? 'text-zinc-500 hover:text-zinc-300' : 'text-slate-400 hover:text-slate-600'}`}>
                                    <X size={20} />
                                </button>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <label className={`block text-xs font-semibold uppercase mb-1 ${isDarkMode ? 'text-zinc-500' : 'text-slate-500'}`}>Broker ID (Auto)</label>
                                    <input
                                        type="text"
                                        value={currentBroker.id}
                                        disabled
                                        className={`w-full px-3 py-2 border rounded-lg cursor-not-allowed font-mono
                                ${isDarkMode
                                                ? 'bg-zinc-900 border-zinc-800 text-zinc-500'
                                                : 'bg-gray-50 border-gray-200 text-slate-500'
                                            }`}
                                    />
                                </div>

                                <div>
                                    <label className={`block text-xs font-semibold uppercase mb-1 ${isDarkMode ? 'text-zinc-500' : 'text-slate-500'}`}>Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={currentBroker.name}
                                        onChange={handleInputChange}
                                        placeholder={modalMode === 'add' ? "e.g. Sandesh (Auto-prefixes 'Agent')" : "Agent Name"}
                                        className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all
                                ${isDarkMode
                                                ? 'bg-zinc-900 border-zinc-700 text-white placeholder:text-zinc-600'
                                                : 'bg-white border-gray-200 text-slate-700'
                                            }`}
                                    />
                                </div>

                                <div>
                                    <label className={`block text-xs font-semibold uppercase mb-1 ${isDarkMode ? 'text-zinc-500' : 'text-slate-500'}`}>Email</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={currentBroker.email}
                                        onChange={handleInputChange}
                                        placeholder="e.g. agent@example.com"
                                        className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all
                                ${isDarkMode
                                                ? 'bg-zinc-900 border-zinc-700 text-white placeholder:text-zinc-600'
                                                : 'bg-white border-gray-200 text-slate-700'
                                            }`}
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className={`block text-xs font-semibold uppercase mb-1 ${isDarkMode ? 'text-zinc-500' : 'text-slate-500'}`}>Location</label>
                                        <input
                                            type="text"
                                            name="location"
                                            value={currentBroker.location}
                                            onChange={handleInputChange}
                                            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all
                                    ${isDarkMode
                                                    ? 'bg-zinc-900 border-zinc-700 text-white'
                                                    : 'bg-white border-gray-200 text-slate-700'
                                                }`}
                                        />
                                    </div>
                                    <div>
                                        <label className={`block text-xs font-semibold uppercase mb-1 ${isDarkMode ? 'text-zinc-500' : 'text-slate-500'}`}>Status</label>
                                        <select
                                            name="status"
                                            value={currentBroker.status}
                                            onChange={handleInputChange}
                                            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all
                                    ${isDarkMode
                                                    ? 'bg-zinc-900 border-zinc-700 text-white'
                                                    : 'bg-white border-gray-200 text-slate-700'
                                                }`}
                                        >
                                            <option value="Active">Active</option>
                                            <option value="Hold">Hold</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center justify-end gap-3 mt-8">
                                <button
                                    onClick={() => setIsModalOpen(false)}
                                    className={`px-4 py-2 text-sm font-medium rounded-lg border border-transparent transition-all
                            ${isDarkMode
                                            ? 'text-zinc-400 hover:bg-zinc-800'
                                            : 'text-slate-600 hover:bg-slate-50 hover:border-slate-200'
                                        }`}
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleSave}
                                    className={`px-4 py-2 text-sm font-medium rounded-lg shadow-sm transition-all
                            ${isDarkMode
                                            ? 'bg-zinc-100 text-zinc-900 hover:bg-white'
                                            : 'text-white bg-slate-900 hover:bg-slate-800'
                                        }`}
                                >
                                    {modalMode === 'add' ? 'Create Broker' : 'Save Changes'}
                                </button>
                            </div>
                        </div>
                    </div>
                )}

            </main>
        </div>
    );
};

const StatCard = ({ title, value, sub, trend, icon, color, isDarkMode }) => (
    <div className={`rounded-xl p-6 border shadow-[0_2px_10px_-4px_rgba(6,81,237,0.1)] transition-all hover:shadow-md
    ${isDarkMode ? 'bg-[#18181b] border-zinc-800' : 'bg-white border-gray-100'}`}>
        <div className="flex justify-between items-start mb-4">
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${color}`}>{icon}</div>
            <div className={`flex items-center gap-1 px-2 py-1 rounded-md text-xs font-bold
        ${isDarkMode ? 'bg-emerald-500/10 text-emerald-400' : 'bg-emerald-50 text-emerald-600'}`}>
                <ArrowUpRight size={14} /> {trend}
            </div>
        </div>
        <div>
            <h3 className={`text-sm font-medium mb-1 ${isDarkMode ? 'text-zinc-500' : 'text-slate-500'}`}>{title}</h3>
            <p className={`text-2xl font-bold tracking-tight ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{value}</p>
        </div>
        <div className={`mt-4 pt-4 border-t flex items-center justify-between
        ${isDarkMode ? 'border-zinc-800' : 'border-gray-50'}`}>
            <span className={`text-xs font-medium ${isDarkMode ? 'text-zinc-500' : 'text-slate-400'}`}>{sub}</span>
            <button className={`transition-colors ${isDarkMode ? 'text-zinc-600 hover:text-blue-400' : 'text-slate-400 hover:text-blue-600'}`}>
                <ArrowUpRight size={18} />
            </button>
        </div>
    </div>
);

export default BrokerManagement;