import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import { useTheme } from '../contexts/ThemeContext'; // Import Theme Context

export default function Settings() {
  const { isDarkMode } = useTheme();
  const [activeTab, setActiveTab] = useState('user-management');

  // Helper for Tab Styling
  const getTabStyle = (tabName) => {
    const isActive = activeTab === tabName;
    if (isDarkMode) {
      return isActive 
        ? 'bg-[#18181b] text-blue-400 shadow-sm' 
        : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/50';
    }
    return isActive 
      ? 'bg-white text-blue-600 shadow-sm' 
      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-200/50';
  };

  return (
    <div className={`min-h-screen flex transition-colors duration-300 ${isDarkMode ? 'bg-[#09090b] text-zinc-100' : 'bg-gray-50 text-gray-900'}`}>
      <Sidebar />
      
      <main className="ml-64 flex-1 min-h-screen overflow-auto">
        <div className="pt-20 pb-12 pl-8 pr-12">
            <Header />
            
            <div className="max-w-[1600px] mx-auto">
            
            {/* Page Header */}
            <div className="mb-8">
                <h1 className={`text-3xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Settings</h1>
                <p className={isDarkMode ? 'text-zinc-400' : 'text-gray-600'}>Configure system settings and preferences</p>
            </div>

            {/* Tabs Navigation */}
            <div className="mb-8">
                <div className={`flex space-x-1 p-1 rounded-xl ${isDarkMode ? 'bg-zinc-900' : 'bg-gray-100'}`}>
                {['user-management', 'backup-settings', 'activity-logs', 'notification-settings'].map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`flex-1 px-6 py-3 rounded-lg font-medium transition-all duration-200 capitalize ${getTabStyle(tab)}`}
                    >
                        {tab.replace('-', ' ')}
                    </button>
                ))}
                </div>
            </div>

            {/* Tab Content */}
            <div>
                {/* User Management Tab */}
                {activeTab === 'user-management' && (
                <div className={`rounded-2xl shadow-sm border p-8 ${isDarkMode ? 'bg-[#18181b] border-zinc-800' : 'bg-white border-gray-200'}`}>
                    <div className="flex justify-between items-center mb-8">
                    <div>
                        <h2 className={`text-2xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>User Management</h2>
                        <p className={isDarkMode ? 'text-zinc-400' : 'text-gray-600'}>Manage admin and member users</p>
                    </div>
                    <button className="flex bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors shadow-lg shadow-blue-500/20">
                        <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <circle cx="12" cy="12" r="9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M12 8v8M8 12h8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>                    
                        Add New User
                    </button>
                    </div>

                    {/* Active Users Stats */}
                    <div className="mb-8">
                    <h3 className={`text-lg font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Active Users</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className={`p-6 rounded-xl ${isDarkMode ? 'bg-blue-500/10' : 'bg-blue-50'}`}>
                            <div className={`text-3xl font-bold mb-2 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`}>2</div>
                            <div className={isDarkMode ? 'text-blue-200' : 'text-gray-600'}>Admin Users</div>
                        </div>
                        <div className={`p-6 rounded-xl ${isDarkMode ? 'bg-emerald-500/10' : 'bg-green-50'}`}>
                            <div className={`text-3xl font-bold mb-2 ${isDarkMode ? 'text-emerald-400' : 'text-green-600'}`}>10</div>
                            <div className={isDarkMode ? 'text-emerald-200' : 'text-gray-600'}>Member Users</div>
                        </div>
                        <div className={`p-6 rounded-xl ${isDarkMode ? 'bg-purple-500/10' : 'bg-purple-50'}`}>
                            <div className={`text-3xl font-bold mb-2 ${isDarkMode ? 'text-purple-400' : 'text-purple-600'}`}>11</div>
                            <div className={isDarkMode ? 'text-purple-200' : 'text-gray-600'}>Total Users</div>
                        </div>
                    </div>
                    </div>

                    {/* Users List */}
                    <div>
                    <h3 className={`text-lg font-semibold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Users List</h3>
                    
                    <div className="space-y-6">
                        {/* Admin User */}
                        <div className={`flex items-center justify-between p-6 rounded-xl border transition-colors
                            ${isDarkMode ? 'bg-zinc-900/50 border-zinc-800' : 'bg-gray-50 border-gray-200'}`}>
                        <div className="flex items-center space-x-4">
                            <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg
                                ${isDarkMode ? 'bg-blue-500/20 text-blue-400' : 'bg-blue-100 text-blue-600'}`}>
                            A
                            </div>
                            <div>
                            <div className={`font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Admin User</div>
                            <div className={isDarkMode ? 'text-zinc-500' : 'text-gray-600'}>admin@cx64.k</div>
                            </div>
                        </div>
                        
                        <div className="flex items-center space-x-6">
                            <div className={`inline-flex items-center px-4 py-2 rounded-lg font-medium
                                ${isDarkMode ? 'bg-blue-500/10 text-blue-400' : 'bg-blue-100 text-blue-800'}`}>
                            Admin
                            </div>
                            <div className="text-right">
                                <div className={`text-sm ${isDarkMode ? 'text-zinc-500' : 'text-gray-500'}`}>Last active: Today</div>
                            </div>
                            <button className={`font-medium ${isDarkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-800'}`}>
                            Edit
                            </button>
                        </div>
                        </div>

                        {/* Member User 1 */}
                        <div className={`flex items-center justify-between p-6 rounded-xl border transition-colors
                            ${isDarkMode ? 'bg-zinc-900/50 border-zinc-800' : 'bg-gray-50 border-gray-200'}`}>
                        <div className="flex items-center space-x-4">
                            <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg
                                ${isDarkMode ? 'bg-emerald-500/20 text-emerald-400' : 'bg-green-100 text-green-600'}`}>
                            J
                            </div>
                            <div>
                            <div className={`font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Johnson</div>
                            <div className={isDarkMode ? 'text-zinc-500' : 'text-gray-600'}>johnson@cx64.k</div>
                            </div>
                        </div>
                        
                        <div className="flex items-center space-x-6">
                            <div className={`inline-flex items-center px-4 py-2 rounded-lg font-medium
                                ${isDarkMode ? 'bg-emerald-500/10 text-emerald-400' : 'bg-green-100 text-green-800'}`}>
                            Member
                            </div>
                            <div className="text-right">
                                <div className={`text-sm ${isDarkMode ? 'text-zinc-500' : 'text-gray-500'}`}>Last active: 2 days ago</div>
                            </div>
                            <button className={`font-medium ${isDarkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-800'}`}>
                            Edit
                            </button>
                        </div>
                        </div>

                        {/* Member User 2 */}
                        <div className={`flex items-center justify-between p-6 rounded-xl border transition-colors
                            ${isDarkMode ? 'bg-zinc-900/50 border-zinc-800' : 'bg-gray-50 border-gray-200'}`}>
                        <div className="flex items-center space-x-4">
                            <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg
                                ${isDarkMode ? 'bg-emerald-500/20 text-emerald-400' : 'bg-green-100 text-green-600'}`}>
                            S
                            </div>
                            <div>
                            <div className={`font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Sarah Nish</div>
                            <div className={isDarkMode ? 'text-zinc-500' : 'text-gray-600'}>sarah@cx64.k</div>
                            </div>
                        </div>
                        
                        <div className="flex items-center space-x-6">
                            <div className={`inline-flex items-center px-4 py-2 rounded-lg font-medium
                                ${isDarkMode ? 'bg-emerald-500/10 text-emerald-400' : 'bg-green-100 text-green-800'}`}>
                            Member
                            </div>
                            <div className="text-right">
                                <div className={`text-sm ${isDarkMode ? 'text-zinc-500' : 'text-gray-500'}`}>Last active: 1 week ago</div>
                            </div>
                            <button className={`font-medium ${isDarkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-800'}`}>
                            Edit
                            </button>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
                )}

                {/* Backup Settings Tab */}
                {activeTab === 'backup-settings' && (
                <div className={`rounded-2xl shadow-sm border p-8 ${isDarkMode ? 'bg-[#18181b] border-zinc-800' : 'bg-white border-gray-200'}`}>
                    <div className="mb-8">
                    <h2 className={`text-2xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Backup Settings</h2>
                    <p className={isDarkMode ? 'text-zinc-400' : 'text-gray-600'}>Configure automatic backup schedules</p>
                    </div>

                    {/* Backup Status Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    {/* Weekly Backup */}
                    <div className={`p-6 rounded-xl border ${isDarkMode ? 'bg-emerald-900/20 border-emerald-900/50' : 'bg-green-50 border-green-100'}`}>
                        <div className="flex items-center justify-between mb-4">
                        <h3 className={`text-lg font-semibold ${isDarkMode ? 'text-emerald-400' : 'text-gray-900'}`}>Weekly Backup</h3>
                        <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium
                            ${isDarkMode ? 'bg-emerald-500/20 text-emerald-400' : 'bg-green-100 text-green-800'}`}>
                            Last Backup Successful
                        </div>                      
                        </div>
                        <div className="space-y-4">
                        <div>
                            <div className={`text-sm mb-1 ${isDarkMode ? 'text-emerald-200/60' : 'text-gray-500'}`}>Last Backup</div>
                            <div className={`text-lg font-semibold ${isDarkMode ? 'text-emerald-100' : 'text-gray-900'}`}>December 05 • 10:02 AM</div>
                        </div>
                        <div>
                            <div className={`text-sm mb-1 ${isDarkMode ? 'text-emerald-200/60' : 'text-gray-500'}`}>Schedule</div>
                            <div className={`text-lg font-semibold ${isDarkMode ? 'text-emerald-100' : 'text-gray-900'}`}>Every Sunday • 02:00 AM</div>
                        </div>
                        </div>
                    </div>

                    {/* Daily Backup */}
                    <div className={`p-6 rounded-xl border ${isDarkMode ? 'bg-emerald-900/20 border-emerald-900/50' : 'bg-green-50 border-green-100'}`}>
                        <div className="flex items-center justify-between mb-4">
                        <h3 className={`text-lg font-semibold ${isDarkMode ? 'text-emerald-400' : 'text-gray-900'}`}>Daily Backup</h3>
                        <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium
                            ${isDarkMode ? 'bg-emerald-500/20 text-emerald-400' : 'bg-green-100 text-green-800'}`}>
                            Last Backup Successful
                        </div>
                        </div>
                        <div className="space-y-4">
                        <div>
                            <div className={`text-sm mb-1 ${isDarkMode ? 'text-emerald-200/60' : 'text-gray-500'}`}>Last Backup</div>
                            <div className={`text-lg font-semibold ${isDarkMode ? 'text-emerald-100' : 'text-gray-900'}`}>November 30 • 23:00 PM</div>
                        </div>
                        <div>
                            <div className={`text-sm mb-1 ${isDarkMode ? 'text-emerald-200/60' : 'text-gray-500'}`}>Schedule</div>
                            <div className={`text-lg font-semibold ${isDarkMode ? 'text-emerald-100' : 'text-gray-900'}`}>Every Day • 23:00 (11 PM)</div>
                        </div>
                        </div>
                    </div>
                    </div>

                    {/* Schedule Settings */}
                    <div className="mb-8">
                    <h3 className={`text-lg font-semibold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Backup Schedule Configuration</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Daily Backup Schedule */}
                        <div className={`p-6 rounded-xl ${isDarkMode ? 'bg-zinc-900/50' : 'bg-gray-50'}`}>
                        <h4 className={`font-semibold mb-4 ${isDarkMode ? 'text-zinc-200' : 'text-gray-900'}`}>Daily Backup Schedule</h4>
                        <div className="space-y-4">
                            <div>
                            <label className={`block text-sm mb-2 ${isDarkMode ? 'text-zinc-400' : 'text-gray-600'}`}>Time</label>
                            <div className="flex items-center space-x-2">
                                <select className={`flex-1 px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500
                                    ${isDarkMode ? 'bg-zinc-800 border-zinc-700 text-white' : 'bg-white border-gray-300'}`}>
                                <option>02:00 AM</option>
                                <option>06:00 AM</option>
                                <option>12:00 PM</option>
                                <option>06:00 PM</option>
                                <option>11:00 PM</option>
                                </select>
                            </div>
                            </div>
                            <div>
                            <label className={`block text-sm mb-2 ${isDarkMode ? 'text-zinc-400' : 'text-gray-600'}`}>Frequency</label>
                            <div className={`inline-flex items-center px-4 py-2 rounded-lg ${isDarkMode ? 'bg-blue-500/20 text-blue-400' : 'bg-blue-100 text-blue-800'}`}>
                                Every Day
                            </div>
                            </div>
                        </div>
                        </div>

                        {/* Weekly Backup Schedule */}
                        <div className={`p-6 rounded-xl ${isDarkMode ? 'bg-zinc-900/50' : 'bg-gray-50'}`}>
                        <h4 className={`font-semibold mb-4 ${isDarkMode ? 'text-zinc-200' : 'text-gray-900'}`}>Weekly Backup Schedule</h4>
                        <div className="space-y-4">
                            <div>
                            <label className={`block text-sm mb-2 ${isDarkMode ? 'text-zinc-400' : 'text-gray-600'}`}>Day & Time</label>
                            <div className="flex items-center space-x-2">
                                <select className={`flex-1 px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500
                                    ${isDarkMode ? 'bg-zinc-800 border-zinc-700 text-white' : 'bg-white border-gray-300'}`}>
                                <option>Sunday</option>
                                <option>Monday</option>
                                <option>Tuesday</option>
                                <option>Wednesday</option>
                                </select>
                                <select className={`flex-1 px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500
                                    ${isDarkMode ? 'bg-zinc-800 border-zinc-700 text-white' : 'bg-white border-gray-300'}`}>
                                <option>23:00</option>
                                <option>00:00</option>
                                <option>01:00</option>
                                </select>
                            </div>
                            </div>
                            <div>
                            <label className={`block text-sm mb-2 ${isDarkMode ? 'text-zinc-400' : 'text-gray-600'}`}>Frequency</label>
                            <div className={`inline-flex items-center px-4 py-2 rounded-lg ${isDarkMode ? 'bg-blue-500/20 text-blue-400' : 'bg-blue-100 text-blue-800'}`}>
                                Every Week
                            </div>
                            </div>
                        </div>
                        </div>
                    </div>
                    </div>

                    
                    {/* Manual Backup Actions */}
                    <div className="flex space-x-4">
                    <button className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/20">
                        Backup Now
                    </button>
                    <button className={`flex-1 border py-3 rounded-lg font-semibold transition-colors
                        ${isDarkMode ? 'bg-transparent border-zinc-700 text-white hover:bg-zinc-800' : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'}`}>
                        Restore Now
                    </button>
                    </div>
                </div>
                )}

                {/* Activity Logs Tab */}
                {activeTab === 'activity-logs' && (
                <div className={`rounded-2xl shadow-sm border p-8 ${isDarkMode ? 'bg-[#18181b] border-zinc-800' : 'bg-white border-gray-200'}`}>
                    <div className="mb-8">
                    <h2 className={`text-2xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Activity Logs</h2>
                    <p className={isDarkMode ? 'text-zinc-400' : 'text-gray-600'}>View system activity and user actions</p>
                    </div>
                    <div className={`text-center py-12 ${isDarkMode ? 'text-zinc-600' : 'text-gray-500'}`}>
                    Activity Logs content will be displayed here
                    </div>
                </div>
                )}

                {/* Notification Settings Tab */}
                {activeTab === 'notification-settings' && (
                <div className={`rounded-2xl shadow-sm border p-8 ${isDarkMode ? 'bg-[#18181b] border-zinc-800' : 'bg-white border-gray-200'}`}>
                    <div className="mb-8">
                    <h2 className={`text-2xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Notification Settings</h2>
                    <p className={isDarkMode ? 'text-zinc-400' : 'text-gray-600'}>Configure notification preferences</p>
                    </div>
                    <div className={`text-center py-12 ${isDarkMode ? 'text-zinc-600' : 'text-gray-500'}`}>
                    Notification Settings content will be displayed here
                    </div>
                </div>
                )}
            </div>
            </div>
        </div>
      </main>
    </div>
  );
}