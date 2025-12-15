import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import { useTheme } from '../contexts/ThemeContext'; // Import Theme Context

export default function Finance() {
    const { isDarkMode } = useTheme(); // Access dark mode state
    const [activeFilter, setActiveFilter] = useState('all');

    // Payments Data
    const paymentsData = [
        {
            id: 1,
            initials: 'JD',
            name: 'John Doe',
            reference: 'RAC401',
            date: 'Dec 2, 2025',
            amount: '$2,500',
            status: 'completed',
            color: 'blue', // simplified for logic
        },
        {
            id: 2,
            initials: 'RK',
            name: 'Robert Kim',
            reference: 'NAP000',
            date: 'Dec 1, 2025',
            amount: '$1,800',
            status: 'pending',
            color: 'purple',
        },
        {
            id: 3,
            initials: 'SJ',
            name: 'Sarah Johnson',
            reference: 'RMB500',
            date: 'Nov 30, 2025',
            amount: '$3,200',
            status: 'overdue',
            color: 'green',
        },
        {
            id: 4,
            initials: 'MJ',
            name: 'Michael Jordan',
            reference: 'BAL023',
            date: 'Nov 28, 2025',
            amount: '$4,500',
            status: 'completed',
            color: 'blue',
        },
        {
            id: 5,
            initials: 'EC',
            name: 'Emma Clark',
            reference: 'TEC789',
            date: 'Nov 25, 2025',
            amount: '$1,200',
            status: 'pending',
            color: 'purple',
        }
    ];

    // Helper to get dynamic colors for list items
    const getPaymentStyles = (status, color) => {
        const baseColors = {
            completed: { text: 'text-green-600 dark:text-green-400' },
            pending: { text: 'text-yellow-600 dark:text-yellow-400' },
            overdue: { text: 'text-red-600 dark:text-red-400' }
        };

        // Avatar background colors
        const avatarColors = {
            blue: isDarkMode ? 'bg-blue-500/20 text-blue-400' : 'bg-blue-100 text-blue-600',
            purple: isDarkMode ? 'bg-purple-500/20 text-purple-400' : 'bg-purple-100 text-purple-600',
            green: isDarkMode ? 'bg-emerald-500/20 text-emerald-400' : 'bg-green-100 text-green-600',
        };

        return {
            statusColor: baseColors[status]?.text || 'text-gray-500',
            avatarClass: avatarColors[color] || (isDarkMode ? 'bg-zinc-800 text-zinc-400' : 'bg-gray-100 text-gray-600')
        };
    };

    const filteredPayments = paymentsData.filter(payment => {
        if (activeFilter === 'all') return true;
        if (activeFilter === 'pending') return payment.status === 'pending';
        return true;
    });

    return (
        <div className={`min-h-screen flex transition-colors duration-300 ${isDarkMode ? 'bg-[#09090b] text-zinc-100' : 'bg-gray-50 text-gray-900'}`}>
            <Sidebar />

            <main className="flex-1 min-h-screen overflow-auto pt-16 md:pt-20 pb-12 transition-all duration-300">
                <Header />

                <div className="max-w-[1600px] mx-auto px-4 md:px-8 mt-6">

                    {/* Page Header */}
                    <div className="mb-8">
                        <h1 className={`text-2xl md:text-3xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Finance</h1>
                        <p className={`text-sm md:text-base ${isDarkMode ? 'text-zinc-400' : 'text-gray-600'}`}>Track and manage all financial activities</p>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 md:gap-6 mb-8">
                        {/* Total Revenue */}
                        <div className="bg-blue-600 rounded-2xl p-6 text-white shadow-lg shadow-blue-500/20">
                            <div className="flex items-center gap-2 mb-2">
                                <div className="bg-blue-500/30 p-1.5 rounded-lg backdrop-blur-sm">
                                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                </div>
                                <div className="text-sm font-medium opacity-90">Total Revenue</div>
                            </div>
                            <div className="text-3xl font-bold mb-4">$54,820</div>
                            <div className="text-sm opacity-80">+12.5% from last month</div>
                        </div>

                        {/* Completed Payments */}
                        <div className="bg-emerald-600 rounded-2xl p-6 text-white shadow-lg shadow-emerald-500/20">
                            <div className="flex items-center gap-2 mb-2">
                                <div className="bg-emerald-500/30 p-1.5 rounded-lg backdrop-blur-sm">
                                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                </div>
                                <div className="text-sm font-medium opacity-90">Completed</div>
                            </div>
                            <div className="text-3xl font-bold mb-4">$43,160</div>
                            <div className="text-sm opacity-80">+18.7% from last month</div>
                        </div>

                        {/* Pending Payments */}
                        <div className="bg-amber-500 rounded-2xl p-6 text-white shadow-lg shadow-amber-500/20">
                            <div className="flex items-center gap-2 mb-2">
                                <div className="bg-amber-400/30 p-1.5 rounded-lg backdrop-blur-sm">
                                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                </div>
                                <div className="text-sm font-medium opacity-90">Pending</div>
                            </div>
                            <div className="text-3xl font-bold mb-4">$8,450</div>
                            <div className="text-sm opacity-80">+5.2% from last month</div>
                        </div>

                        {/* Overdue Amount */}
                        <div className="bg-red-600 rounded-2xl p-6 text-white shadow-lg shadow-red-500/20">
                            <div className="flex items-center gap-2 mb-2">
                                <div className="bg-red-500/30 p-1.5 rounded-lg backdrop-blur-sm">
                                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.998-.833-2.768 0L4.342 16.5c-.77.833.192 2.5 1.732 2.5z" /></svg>
                                </div>
                                <div className="text-sm font-medium opacity-90">Overdue</div>
                            </div>
                            <div className="text-3xl font-bold mb-4">$3,210</div>
                            <div className="text-sm opacity-80">-8.3% from last month</div>
                        </div>
                    </div>

                    {/* Main Content Area */}
                    <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 md:gap-8">

                        {/* Left Column */}
                        <div className="space-y-6 md:space-y-8">

                            {/* Quick Actions */}
                            <div>
                                <h3 className={`text-lg font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Quick Actions</h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {[
                                        { icon: '💰', label: 'Record Payment' },
                                        { icon: '📄', label: 'Generate Invoice' },
                                        { icon: '👥', label: 'Broker Commission' },
                                        { icon: '📊', label: 'Financial Reports' }
                                    ].map((action, i) => (
                                        <button key={i} className={`p-5 rounded-xl border shadow-sm transition-all hover:-translate-y-1 flex flex-col items-center justify-center text-center
                                    ${isDarkMode
                                                ? 'bg-[#18181b] border-zinc-800 hover:border-zinc-700 text-zinc-200'
                                                : 'bg-white border-gray-200 hover:shadow-md text-gray-900'}`}>
                                            <div className="text-2xl mb-2">{action.icon}</div>
                                            <div className="font-medium">{action.label}</div>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Payment Status Bars */}
                            <div className={`rounded-2xl border p-6 shadow-sm ${isDarkMode ? 'bg-[#18181b] border-zinc-800' : 'bg-white border-gray-200'}`}>
                                <h3 className={`text-lg font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Payment Status</h3>
                                <div className="space-y-6">
                                    {[
                                        { label: 'Cash', value: '$2,500', width: '65%', color: 'bg-green-500' },
                                        { label: 'Bank Transfer', value: '$1,800', width: '45%', color: 'bg-blue-500' },
                                        { label: 'Check', value: '$2,200', width: '55%', color: 'bg-purple-500' }
                                    ].map((item, i) => (
                                        <div key={i}>
                                            <div className="flex justify-between text-sm mb-2">
                                                <span className={isDarkMode ? 'text-zinc-400' : 'text-gray-600'}>{item.label}</span>
                                                <span className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{item.value}</span>
                                            </div>
                                            <div className={`h-2 rounded-full overflow-hidden ${isDarkMode ? 'bg-zinc-800' : 'bg-gray-100'}`}>
                                                <div className={`h-full rounded-full ${item.color}`} style={{ width: item.width }}></div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Right Column: Recent Payments */}
                        <div className={`rounded-2xl border p-6 shadow-sm flex flex-col h-full
                    ${isDarkMode ? 'bg-[#18181b] border-zinc-800' : 'bg-white border-gray-200'}`}>

                            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                                <h3 className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Recent Payments</h3>

                                {/* Filter Toggle */}
                                <div className={`flex p-1 rounded-lg text-sm font-medium ${isDarkMode ? 'bg-zinc-800' : 'bg-gray-200/80'}`}>
                                    <button
                                        onClick={() => setActiveFilter('all')}
                                        className={`px-3 py-1 rounded-md transition-all ${activeFilter === 'all'
                                            ? 'bg-blue-600 text-white shadow-sm'
                                            : (isDarkMode ? 'text-zinc-400 hover:text-white' : 'text-gray-600 hover:text-gray-900')
                                            }`}
                                    >
                                        All
                                    </button>
                                    <button
                                        onClick={() => setActiveFilter('pending')}
                                        className={`px-3 py-1 rounded-md transition-all ${activeFilter === 'pending'
                                            ? 'bg-blue-600 text-white shadow-sm'
                                            : (isDarkMode ? 'text-zinc-400 hover:text-white' : 'text-gray-600 hover:text-gray-900')
                                            }`}
                                    >
                                        Pending
                                    </button>
                                </div>
                            </div>

                            <div className="space-y-4 flex-1">
                                {filteredPayments.map((payment) => {
                                    const styles = getPaymentStyles(payment.status, payment.color);
                                    return (
                                        <div key={payment.id} className={`flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 rounded-xl transition-colors gap-4
                                    ${isDarkMode ? 'bg-zinc-900/50 hover:bg-zinc-900' : 'bg-gray-50 hover:bg-gray-100'}`}>
                                            <div className="flex items-center space-x-4">
                                                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm ${styles.avatarClass}`}>
                                                    {payment.initials}
                                                </div>
                                                <div>
                                                    <div className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{payment.name}</div>
                                                    <div className={`text-xs ${isDarkMode ? 'text-zinc-500' : 'text-gray-500'}`}>{payment.reference} • {payment.date}</div>
                                                </div>
                                            </div>
                                            <div className="text-left sm:text-right w-full sm:w-auto pl-[56px] sm:pl-0">
                                                <div className={`font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{payment.amount}</div>
                                                <div className={`text-xs font-medium capitalize ${styles.statusColor}`}>
                                                    {payment.status}
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}

                                {filteredPayments.length === 0 && (
                                    <div className={`text-center py-12 ${isDarkMode ? 'text-zinc-600' : 'text-gray-500'}`}>
                                        No {activeFilter} payments found
                                    </div>
                                )}
                            </div>

                            <button className="w-full mt-6 bg-blue-600 text-white py-3 px-4 rounded-xl hover:bg-blue-700 transition-colors font-medium flex items-center justify-center gap-2 shadow-lg shadow-blue-500/20">
                                View All Payments <span>→</span>
                            </button>
                        </div>

                    </div>

                    {/* Bottom Stats */}
                    <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[
                            { label: 'Average Payment', value: '$1,850' },
                            { label: 'Pending Approvals', value: '12' },
                            { label: 'Successful Transactions', value: '89%' }
                        ].map((stat, i) => (
                            <div key={i} className={`rounded-xl p-5 border shadow-sm
                        ${isDarkMode ? 'bg-[#18181b] border-zinc-800' : 'bg-white border-gray-200'}`}>
                                <div className={`text-sm mb-2 ${isDarkMode ? 'text-zinc-500' : 'text-gray-600'}`}>{stat.label}</div>
                                <div className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{stat.value}</div>
                            </div>
                        ))}
                    </div>

                </div>
            </main>
        </div >
    );
}