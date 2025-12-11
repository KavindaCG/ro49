// src/pages/Settings.jsx
import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';

export default function Settings() {
  const [activeTab, setActiveTab] = useState('user-management');

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 flex">
      <Sidebar />
      
      <main className="ml-64 flex-1 min-h-screen overflow-auto pt-20">
        <Header />
        
        {/* Content container */}
        <div className="max-w-7xl mx-auto px-6 py-8">
          {/* Page header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Settings</h1>
            <p className="text-gray-600">Configure system settings and preferences</p>
          </div>

          {/* Tabs Navigation */}
          <div className="mb-8">
            <div className="flex space-x-1 bg-gray-100 p-1 rounded-xl">
              <button
                onClick={() => setActiveTab('user-management')}
                className={`flex-1 px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                  activeTab === 'user-management'
                    ? 'bg-white text-blue-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                User Management
              </button>
              
              <button
                onClick={() => setActiveTab('backup-settings')}
                className={`flex-1 px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                  activeTab === 'backup-settings'
                    ? 'bg-white text-blue-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Backup Settings
              </button>
              
              <button
                onClick={() => setActiveTab('activity-logs')}
                className={`flex-1 px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                  activeTab === 'activity-logs'
                    ? 'bg-white text-blue-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Activity Logs
              </button>
              
              <button
                onClick={() => setActiveTab('notification-settings')}
                className={`flex-1 px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                  activeTab === 'notification-settings'
                    ? 'bg-white text-blue-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Notification Settings
              </button>
            </div>
          </div>

          {/* Tab Content */}
          <div>
            {/* User Management Tab */}
            {activeTab === 'user-management' && (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
                <div className="flex justify-between items-center mb-8">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">User Management</h2>
                    <p className="text-gray-600">Manage admin and member users</p>
                  </div>
                  <button className="flex bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors">
                    <svg className="w-6 h-6 mr-2 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <circle cx="12" cy="12" r="9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M12 8v8M8 12h8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>                    
                    Add New User
                  </button>
                </div>

                {/* Active Users Stats */}
                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Active Users</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-blue-50 p-6 rounded-xl">
                      <div className="text-3xl font-bold text-blue-600 mb-2">2</div>
                      <div className="text-gray-600">Admin Users</div>
                    </div>
                    <div className="bg-green-50 p-6 rounded-xl">
                      <div className="text-3xl font-bold text-green-600 mb-2">10</div>
                      <div className="text-gray-600">Member Users</div>
                    </div>
                    <div className="bg-purple-50 p-6 rounded-xl">
                      <div className="text-3xl font-bold text-purple-600 mb-2">11</div>
                      <div className="text-gray-600">Total Users</div>
                    </div>
                  </div>
                </div>

                {/* Users List */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-6">Users List</h3>
                  
                  <div className="space-y-6">
                    {/* Admin User */}
                    <div className="flex items-center justify-between p-6 bg-gray-50 rounded-xl border border-gray-200">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-lg">
                          A
                        </div>
                        <div>
                          <div className="font-bold text-gray-900">Admin User</div>
                          <div className="text-gray-600">admin@cx64.k</div>
                        </div>
                      </div>
                      
                      <div className=" items-center space-x-6">
                        <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-lg font-medium">
                          Admin
                        </div>
                        <div className="text-right ">
                          
                          <div className="text-sm text-gray-500">Last active: Today</div>
                        </div>
                        <button className="text-blue-600 hover:text-blue-800 font-medium">
                          Edit
                        </button>
                      </div>
                    </div>

                    {/* Member User 1 */}
                    <div className="flex items-center justify-between p-6 bg-gray-50 rounded-xl border border-gray-200">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center text-green-600 font-bold text-lg">
                          M
                        </div>
                        <div>
                          <div className="font-bold text-gray-900">Johnson</div>
                          <div className="text-gray-600">johnson@cx64.k</div>
                        </div>
                      </div>
                      
                      <div className=" items-center space-x-6">
                        <div className="inline-flex items-center px-4 py-2 bg-green-100 text-green-800 rounded-lg font-medium">
                          Member
                        </div>
                        <div className="text-right">
                          
                          <div className="text-sm text-gray-500">Last active: 2 days ago</div>
                        </div>
                        <button className="text-blue-600 hover:text-blue-800 font-medium">
                          Edit
                        </button>
                      </div>
                    </div>

                    {/* Member User 2 */}
                    <div className="flex items-center justify-between p-6 bg-gray-50 rounded-xl border border-gray-200">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center text-green-600 font-bold text-lg">
                          M
                        </div>
                        <div>
                          <div className="font-bold text-gray-900">Sarah Nish</div>
                          <div className="text-gray-600">sarah@cx64.k</div>
                        </div>
                      </div>
                      
                      <div className=" items-center space-x-6">
                        <div className="inline-flex items-center px-4 py-2 bg-green-100 text-green-800 rounded-lg font-medium">
                          Member
                        </div>
                        <div className="text-right">
                          
                          <div className="text-sm text-gray-500">Last active: 1 week ago</div>
                        </div>
                        <button className="text-blue-600 hover:text-blue-800 font-medium">
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
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Backup Settings</h2>
                  <p className="text-gray-600">Configure automatic backup schedules</p>
                </div>

                {/* Backup Status Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  {/* Weekly Backup */}
                  <div className="bg-green-200 p-6 rounded-xl border border-blue-200">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-gray-900">Weekly Backup</h3>
                      <div className="inline-flex items-center px-3 py-1 bg-green-400 text-green-800 rounded-full text-sm font-medium">
                        Last Backup Successful
                        </div>                      
                    </div>
                    <div className="space-y-4">
                      <div>
                        <div className="text-sm text-gray-500 mb-1">Last Backup</div>
                        <div className="text-lg font-semibold text-gray-900">December 05 • 10:02 AM</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-500 mb-1">Schedule</div>
                        <div className="text-lg font-semibold text-gray-900">Every Sunday • 02:00 AM</div>

                      </div>
                    </div>
                  </div>

                  {/* Daily Backup */}
                  <div className="bg-green-200 p-6 rounded-xl border border-green-200">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-gray-900">Daily Backup</h3>
                      <div className="inline-flex items-center px-3 py-1 bg-green-400 text-green-800 rounded-full text-sm font-medium">
                        Last Backup Successful
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <div className="text-sm text-gray-500 mb-1">Last Backup</div>
                        <div className="text-lg font-semibold text-gray-900">November 30 • 23:00 PM</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-500 mb-1">Schedule</div>
                        <div className="text-lg font-semibold text-gray-900">Every Day • 23:00 (11 PM)</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Schedule Settings */}
                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-gray-900 mb-6">Backup Schedule Configuration</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Daily Backup Schedule */}
                    <div className="bg-gray-50 p-6 rounded-xl">
                      <h4 className="font-semibold text-gray-900 mb-4">Daily Backup Schedule</h4>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm text-gray-600 mb-2">Time</label>
                          <div className="flex items-center space-x-2">
                            <select className="flex-1 px-4 py-3 border border-gray-300 rounded-lg bg-white">
                              <option>02:00 AM</option>
                              <option>06:00 AM</option>
                              <option>12:00 PM</option>
                              <option>06:00 PM</option>
                              <option>11:00 PM</option>
                            </select>
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm text-gray-600 mb-2">Frequency</label>
                          <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-lg">
                            Every Day
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Weekly Backup Schedule */}
                    <div className="bg-gray-50 p-6 rounded-xl">
                      <h4 className="font-semibold text-gray-900 mb-4">Weekly Backup Schedule</h4>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm text-gray-600 mb-2">Day & Time</label>
                          <div className="flex items-center space-x-2">
                            <select className="flex-1 px-4 py-3 border border-gray-300 rounded-lg bg-white">
                              <option>Sunday</option>
                              <option>Monday</option>
                              <option>Tuesday</option>
                              <option>Wednesday</option>
                              <option>Thursday</option>
                              <option>Friday</option>
                              <option>Saturday</option>
                            </select>
                            <select className="flex-1 px-4 py-3 border border-gray-300 rounded-lg bg-white">
                              <option>23:00</option>
                              <option>00:00</option>
                              <option>01:00</option>
                              <option>02:00</option>
                              <option>03:00</option>
                            </select>
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm text-gray-600 mb-2">Frequency</label>
                          <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-lg">
                            Every Week
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                
                {/* Manual Backup Actions */}
                <div className="flex space-x-4">
                  <button className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                    Backup Now
                  </button>
                  <button className="flex-1 bg-white border border-gray-300 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors">
                    Restore Now
                  </button>
                </div>
              </div>
            )}

            {/* Activity Logs Tab */}
            {activeTab === 'activity-logs' && (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Activity Logs</h2>
                  <p className="text-gray-600">View system activity and user actions</p>
                </div>
                <div className="text-center py-12 text-gray-500">
                  Activity Logs content will be displayed here
                </div>
              </div>
            )}

            {/* Notification Settings Tab */}
            {activeTab === 'notification-settings' && (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Notification Settings</h2>
                  <p className="text-gray-600">Configure notification preferences</p>
                </div>
                <div className="text-center py-12 text-gray-500">
                  Notification Settings content will be displayed here
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}