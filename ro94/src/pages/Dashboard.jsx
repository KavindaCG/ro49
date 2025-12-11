import React from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import StatCard from '../components/StatCard';
import ProgressCard from '../components/ProgressCard';
import SimpleDonutChart from '../components/charts/SimpleDonutChart';
import { useTheme } from '../contexts/ThemeContext';

export default function Dashboard() {
  const { isDarkMode } = useTheme();

  return (
    <div className={`min-h-screen flex ${isDarkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-900'}`}>
      <Sidebar />
      
      <main className="ml-64 flex-1 min-h-screen overflow-auto pt-20">
        <Header />
        
        {/* Content container */}
        <div className="max-w-7xl mx-auto px-6 py-8">
          {/* Welcome section */}
          <div className="mb-10">
            <h1 className={`text-3xl font-semibold tracking-tight mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Dashboard
            </h1>
            <p className={`text-base ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              Overview of clients, applications, and performance metrics
            </p>
          </div>
          
          {/* Stats grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <StatCard 
              title="Total Clients" 
              value="10"
              trend="+2 this month"
              icon="👥"
              darkMode={isDarkMode}
            />
            <StatCard 
              title="Applications" 
              value="32"
              trend="+12% from last month"
              icon="📄"
              darkMode={isDarkMode}
            />
            <StatCard 
              title="Total Refunds" 
              value="$23,456"
              trend="Processing"
              icon="💰"
              darkMode={isDarkMode}
            />
          </div>
          
          {/* Charts and metrics grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <div className={`rounded-2xl shadow-sm p-6 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
              <div className="flex justify-between items-center mb-6">
                <h3 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  Processing Timeline
                </h3>
                <span className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-400'}`}>
                  Last 30 days
                </span>
              </div>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>
                      Document Completion
                    </span>
                    <span className={isDarkMode ? 'font-medium text-gray-100' : 'font-medium'}>94%</span>
                  </div>
                  <div className={`h-2 rounded-full overflow-hidden ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                    <div className="h-full bg-blue-500 rounded-full" style={{ width: '94%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>
                      Broker Performance
                    </span>
                    <span className={isDarkMode ? 'font-medium text-gray-100' : 'font-medium'}>89.5%</span>
                  </div>
                  <div className={`h-2 rounded-full overflow-hidden ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                    <div className="h-full bg-green-500 rounded-full" style={{ width: '89.5%' }}></div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className={`rounded-2xl shadow-sm p-6 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
              <div className="flex justify-between items-center mb-6">
                <h3 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  Avg. Processing Time
                </h3>
                <span className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-400'}`}>
                  Current period
                </span>
              </div>
              <div className="flex items-end gap-4">
                <div className={`text-5xl font-light tracking-tight ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  4
                </div>
                <div className="mb-2">
                  <div className={`text-lg font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    days
                  </div>
                  <div className="text-sm text-green-600">-1 day from last period</div>
                </div>
              </div>
              <div className={`mt-6 pt-6 ${isDarkMode ? 'border-gray-700' : 'border-gray-100'} border-t`}>
                <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  Goal: Reduce to 3 days by next quarter
                </div>
              </div>
            </div>
          </div>
          
          {/* Cases overview */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <div className={`rounded-2xl shadow-sm p-6 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
                <div className="flex justify-between items-center mb-6">
                  <h3 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    Cases Overview
                  </h3>
                  <button className={`text-sm font-medium ${isDarkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-700'}`}>
                    View all →
                  </button>
                </div>
                <SimpleDonutChart
                  title="Cases by Status"
                  labels={['Active', 'Completed', 'On Hold', 'Rejected']}
                  series={[12, 32, 5, 3]}
                  darkMode={isDarkMode}
                />
              </div>
            </div>
            
            <div className={`rounded-2xl shadow-sm p-6 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
              <h3 className={`text-lg font-semibold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                Quick Actions
              </h3>
              <div className="space-y-3">
                <button className={`w-full text-left p-4 rounded-xl transition-colors
                  ${isDarkMode 
                    ? 'border-gray-700 hover:border-gray-600 hover:bg-gray-700' 
                    : 'border-gray-100 hover:border-gray-200 hover:bg-gray-50'
                  } border`}>
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center
                      ${isDarkMode ? 'bg-blue-900/30' : 'bg-blue-50'}`}>
                      <span className={isDarkMode ? 'text-blue-400' : 'text-blue-600'}>📋</span>
                    </div>
                    <div>
                      <div className={`font-medium ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>
                        New Application
                      </div>
                      <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                        Start processing a new case
                      </div>
                    </div>
                  </div>
                </button>
                
                <button className={`w-full text-left p-4 rounded-xl transition-colors
                  ${isDarkMode 
                    ? 'border-gray-700 hover:border-gray-600 hover:bg-gray-700' 
                    : 'border-gray-100 hover:border-gray-200 hover:bg-gray-50'
                  } border`}>
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center
                      ${isDarkMode ? 'bg-green-900/30' : 'bg-green-50'}`}>
                      <span className={isDarkMode ? 'text-green-400' : 'text-green-600'}>📊</span>
                    </div>
                    <div>
                      <div className={`font-medium ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>
                        Generate Report
                      </div>
                      <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                        Export monthly analytics
                      </div>
                    </div>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}