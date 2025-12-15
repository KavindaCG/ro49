import React from 'react';
import {
  Users,
  FileText,
  CreditCard,
  Plus,
  Download,
  Clock,
  ChevronRight,
  MoreHorizontal
} from 'lucide-react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import StatCard from '../components/StatCard';
import SimpleDonutChart from '../components/charts/SimpleDonutChart';
import { useTheme } from '../contexts/ThemeContext';

export default function Dashboard() {
  const { isDarkMode } = useTheme();

  return (
    <div className={`min-h-screen flex font-sans transition-colors duration-300
      ${isDarkMode ? 'bg-[#09090b] text-zinc-100' : 'bg-gray-50 text-gray-900'}`}>

      <Sidebar />
      <Header />

      {/* Added pt-24 to account for fixed header + breathing room */}
      <main className="flex-1 min-h-screen overflow-auto pt-24 px-4 md:px-8 pb-12">
        <div className="max-w-[1600px] mx-auto">

          {/* Section: Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 md:mb-10">
            <div>
              <h1 className={`text-2xl md:text-3xl font-bold tracking-tight ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                Dashboard
              </h1>
              <p className="mt-1 text-sm md:text-base text-gray-500 dark:text-zinc-400">
                Overview of your client portfolio and performance.
              </p>
            </div>

            {/* Action Button */}
            <button className={`
              self-start md:self-auto
              flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg border transition-all
              ${isDarkMode
                ? 'bg-zinc-900 border-zinc-800 text-zinc-300 hover:bg-zinc-800'
                : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50 hover:border-gray-300 shadow-sm'
              }
            `}>
              Last 30 Days <ChevronRight size={14} />
            </button>
          </div>

          {/* Section: Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-8">
            <StatCard
              title="Total Clients"
              value="842"
              note="+12% vs last month"
              icon={Users}
              isDarkMode={isDarkMode}
            />
            <StatCard
              title="Active Applications"
              value="32"
              note="+4 new today"
              icon={FileText}
              isDarkMode={isDarkMode}
            />
            <StatCard
              title="Total Revenue"
              value="$23,456"
              note="Processing"
              icon={CreditCard}
              isDarkMode={isDarkMode}
            />
          </div>

          {/* Section: Bento Grid Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">

            {/* 1. Processing Timeline */}
            <div className={`p-6 rounded-2xl border shadow-sm transition-colors
              ${isDarkMode
                ? 'bg-[#18181b] border-zinc-800'
                : 'bg-white border-gray-200'
              }`}>
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-semibold text-gray-900 dark:text-white">Processing Metrics</h3>
                <button className="text-gray-400 hover:text-gray-600 dark:hover:text-zinc-200">
                  <MoreHorizontal size={18} />
                </button>
              </div>

              <div className="space-y-6">
                <div className="group">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-500 dark:text-zinc-500 font-medium">Document Verification</span>
                    <span className="text-gray-900 dark:text-white font-bold">94%</span>
                  </div>
                  <div className="h-2 w-full bg-gray-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-600 rounded-full w-[94%]" />
                  </div>
                </div>

                <div className="group">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-500 dark:text-zinc-500 font-medium">Broker Response Rate</span>
                    <span className="text-gray-900 dark:text-white font-bold">89.5%</span>
                  </div>
                  <div className="h-2 w-full bg-gray-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                    <div className="h-full bg-gray-900 dark:bg-white rounded-full w-[89.5%]" />
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-gray-100 dark:border-zinc-800">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-xl">
                      <Clock size={20} />
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">4.2 days</div>
                      <div className="text-xs font-medium text-gray-500 uppercase tracking-wide">Avg Turnaround</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 2. Cases Donut Chart */}
            <div className={`p-6 rounded-2xl border shadow-sm transition-colors
              ${isDarkMode
                ? 'bg-[#18181b] border-zinc-800'
                : 'bg-white border-gray-200'
              }`}>
              <SimpleDonutChart
                title="Case Distribution"
                labels={['Processing', 'Completed', 'On Hold', 'Rejected']}
                series={[12, 32, 5, 3]}
              />
            </div>

            {/* 3. Quick Actions */}
            <div className="flex flex-col gap-4">
              {/* Tile 1 */}
              <button className="flex-1 p-6 text-left rounded-2xl bg-gradient-to-br from-blue-600 to-blue-700 text-white shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30 transition-all hover:-translate-y-1 border border-transparent">
                <div className="bg-white/20 w-10 h-10 rounded-lg flex items-center justify-center mb-4 backdrop-blur-sm">
                  <Plus size={20} />
                </div>
                <h3 className="text-lg font-bold">New Application</h3>
                <p className="text-blue-100 text-sm mt-1">Start a new client case</p>
              </button>

              {/* Tile 2 */}
              <button className={`flex-1 p-6 text-left rounded-2xl border transition-all group shadow-sm
                 ${isDarkMode
                  ? 'bg-[#18181b] border-zinc-800 hover:border-zinc-700'
                  : 'bg-white border-gray-200 hover:border-gray-300 hover:shadow-md'
                }`}>
                <div className="flex justify-between items-start mb-4">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors
                      ${isDarkMode
                      ? 'bg-zinc-800 text-zinc-400 group-hover:bg-white group-hover:text-black'
                      : 'bg-gray-100 text-gray-600 group-hover:bg-black group-hover:text-white'
                    }`}>
                    <Download size={20} />
                  </div>
                </div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">Generate Report</h3>
                <p className="text-gray-500 text-sm mt-1">Export monthly analytics</p>
              </button>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}