// src/pages/Finance.jsx
import React, { useState } from 'react'; // Add useState import
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';

export default function Finance() {
  // Add state for active filter
  const [activeFilter, setActiveFilter] = useState('all');

  // Add payments data array
  const paymentsData = [
    {
      id: 1,
      initials: 'JD',
      name: 'John Doe',
      reference: 'RAC401',
      date: 'Dec 2, 2025',
      amount: '$2,500',
      status: 'completed',
      bgColor: 'bg-blue-100',
      textColor: 'text-blue-600',
      statusColor: 'text-green-600'
    },
    {
      id: 2,
      initials: 'RK',
      name: 'Robert Kim',
      reference: 'NAP000',
      date: 'Dec 1, 2025',
      amount: '$1,800',
      status: 'pending',
      bgColor: 'bg-purple-100',
      textColor: 'text-purple-600',
      statusColor: 'text-yellow-600'
    },
    {
      id: 3,
      initials: 'SJ',
      name: 'Sarah Johnson',
      reference: 'RMB500',
      date: 'Nov 30, 2025',
      amount: '$3,200',
      status: 'overdue',
      bgColor: 'bg-green-100',
      textColor: 'text-green-600',
      statusColor: 'text-red-600'
    },
    {
      id: 4,
      initials: 'MJ',
      name: 'Michael Jordan',
      reference: 'BAL023',
      date: 'Nov 28, 2025',
      amount: '$4,500',
      status: 'completed',
      bgColor: 'bg-blue-100',
      textColor: 'text-blue-600',
      statusColor: 'text-green-600'
    },
    {
      id: 5,
      initials: 'EC',
      name: 'Emma Clark',
      reference: 'TEC789',
      date: 'Nov 25, 2025',
      amount: '$1,200',
      status: 'pending',
      bgColor: 'bg-purple-100',
      textColor: 'text-purple-600',
      statusColor: 'text-yellow-600'
    }
  ];

  // Filter payments based on active filter
  const filteredPayments = paymentsData.filter(payment => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'pending') return payment.status === 'pending';
    return true;
  });

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 flex">
      <Sidebar />
      
      <main className="ml-64 flex-1 min-h-screen overflow-auto pt-20">
        <Header />
        
        {/* Content container */}
        <div className="max-w-7xl mx-auto px-6 py-8">
          {/* Page header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">FINANCE</h1>
            <p className="text-gray-600">Track and manage all financial activities</p>
          </div>

          {/* Stats Grid - 4 cards in a row */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {/* Total Revenue Card */}
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-6 text-white shadow-lg">
                <div className="flex items-center gap-2 mb-2">
                <div className="bg-blue-200 p-1 rounded-md">
                    <svg className="w-7 h-7 text-blue-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </div>
                <div className="text-sm font-medium opacity-90">Total Revenue</div>
                </div>
                <div className="text-3xl font-bold mb-4">$54,820</div>
                <div className="text-sm opacity-80">+12.5% from last month</div>
            </div>

            {/* Completed Payments Card */}
            <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl p-6 text-white shadow-lg">
                <div className="flex items-center gap-2 mb-2">
                    <div className="bg-green-200 p-1 rounded-md">
                        <svg className="w-7 h-7 text-green-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                <div className="text-sm font-medium opacity-90">Completed Payments</div>
                </div>
                <div className="text-3xl font-bold mb-4">$43,160</div>
                <div className="text-sm opacity-80">+18.7% from last month</div>
            </div>

            {/* Pending Payments Card */}
            <div className="bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-2xl p-6 text-white shadow-lg">
                <div className="flex items-center gap-2 mb-2">
                    <div className="bg-yellow-200 p-1 rounded-md">
                        <svg className="w-7 h-7 text-yellow-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                <div className="text-sm font-medium opacity-90">Pending Payments</div>
                </div>
                <div className="text-3xl font-bold mb-4">$8,450</div>
                <div className="text-sm opacity-80">+5.2% from last month</div>
            </div>

            {/* Overdue Amount Card */}
            <div className="bg-gradient-to-br from-red-500 to-red-600 rounded-2xl p-6 text-white shadow-lg">
                <div className="flex items-center gap-2 mb-2">
                    <div className="bg-red-200 p-1 rounded-md">
                        <svg className="w-7 h-7 text-red-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.998-.833-2.768 0L4.342 16.5c-.77.833.192 2.5 1.732 2.5z" />
                        </svg>
                    </div>
                <div className="text-sm font-medium opacity-90">Overdue Amount</div>
                </div>
                <div className="text-3xl font-bold mb-4">$3,210</div>
                <div className="text-sm opacity-80">-8.3% from last month</div>
            </div>
            </div>
          {/* Main Content Area - 2 columns */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column */}
            <div className="space-y-8">
              {/* Quick Actions Grid */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
                <div className="grid grid-cols-2 gap-4">
                  <button className="bg-white rounded-xl p-5 shadow-sm border border-gray-200 hover:shadow-md transition-shadow text-center">
                    <div className="text-2xl mb-2">💰</div>
                    <div className="font-medium text-gray-900">Record Payment</div>
                  </button>
                  
                  <button className="bg-white rounded-xl p-5 shadow-sm border border-gray-200 hover:shadow-md transition-shadow text-center">
                    <div className="text-2xl mb-2">📄</div>
                    <div className="font-medium text-gray-900">Generate Invoice</div>
                  </button>
                  
                  <button className="bg-white rounded-xl p-5 shadow-sm border border-gray-200 hover:shadow-md transition-shadow text-center">
                    <div className="text-2xl mb-2">👥</div>
                    <div className="font-medium text-gray-900">Broker Commission</div>
                  </button>
                  
                  <button className="bg-white rounded-xl p-5 shadow-sm border border-gray-200 hover:shadow-md transition-shadow text-center">
                    <div className="text-2xl mb-2">📊</div>
                    <div className="font-medium text-gray-900">Financial Reports</div>
                  </button>
                </div>
              </div>

            {/* Payment Methods */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-6">Payment Status</h3>
                
                <div className="space-y-4">
                  {/* Cash */}
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600">Cash</span>
                      <span className="font-medium">$2,500</span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full bg-green-500 rounded-full" style={{ width: '65%' }}></div>
                    </div>
                  </div>

                  {/* Bank Transfer */}
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600">Bank Transfer</span>
                      <span className="font-medium">$1,800</span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full bg-blue-500 rounded-full" style={{ width: '45%' }}></div>
                    </div>
                  </div>

                  {/* Check */}
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600">Check</span>
                      <span className="font-medium">$2,200</span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full bg-purple-500 rounded-full" style={{ width: '55%' }}></div>
                    </div>
                  </div>
                </div>

                {/* Legend */}
                <div className="mt-8 pt-6 border-t border-gray-200">
                  <div className="flex space-x-6 text-sm">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                      <span className="text-gray-600">Cash</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                      <span className="text-gray-600">Bank Transfer</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 rounded-full bg-purple-500"></div>
                      <span className="text-gray-600">Check</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-8">
              
              {/* Recent Payments - MODIFIED SECTION ONLY */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-semibold text-gray-900">Recent Payments</h3>
                  {/* filter section - NOW WORKING */}
                  <div className="flex bg-gray-400/80 px-0.5 py-0.25 rounded-lg items-center justify-center text-md font-medium">
                    <button
                      onClick={() => setActiveFilter('all')}
                      className={`px-3 py-0.5 rounded-md items-center text-center my-1 mx-1 transition-colors duration-200 ${
                        activeFilter === 'all' 
                          ? 'bg-blue-600 text-white' 
                          : 'hover:bg-gray-300/50 text-white'
                      }`}
                    >
                      <p className="pt-1">All</p>
                    </button>
                    <button
                      onClick={() => setActiveFilter('pending')}
                      className={`px-3 py-0.5 rounded-md items-center text-center my-1 mx-1 transition-colors duration-200 ${
                        activeFilter === 'pending' 
                          ? 'bg-blue-600 text-white' 
                          : 'hover:bg-gray-300/50 text-white'
                      }`}
                    >
                      <p className="pt-1">Pending</p>
                    </button>
                  </div>
                </div>
                
                <div className="space-y-4">
                  {/* Render filtered payments */}
                  {filteredPayments.map((payment) => (
                    <div key={payment.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                      <div className="flex items-center space-x-4">
                        <div className={`w-10 h-10 rounded-full ${payment.bgColor} flex items-center justify-center ${payment.textColor} font-bold`}>
                          {payment.initials}
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">{payment.name}</div>
                          <div className="text-sm text-gray-500">{payment.reference} • {payment.date}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-gray-900">{payment.amount}</div>
                        <div className={`text-sm font-medium capitalize ${payment.statusColor}`}>
                          {payment.status}
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  {/* Show message if no payments match filter */}
                  {filteredPayments.length === 0 && (
                    <div className="text-center py-8 text-gray-500">
                      No {activeFilter} payments found
                    </div>
                  )}
                  
                  <button className="w-full text-white bg-blue-700 py-3 px-4 rounded-lg hover:bg-blue-800 transition-colors duration-200 font-medium flex items-center justify-center gap-2">
                    View All Payments
                    <span>→</span>
                  </button>
                </div>
              </div>
              
            </div>
          </div>

          {/* Additional Stats Bar */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-200">
              <div className="text-sm text-gray-600 mb-2">Average Payment</div>
              <div className="text-2xl font-bold text-gray-900">$1,850</div>
            </div>
            
            <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-200">
              <div className="text-sm text-gray-600 mb-2">Pending Approvals</div>
              <div className="text-2xl font-bold text-gray-900">12</div>
            </div>
            
            <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-200">
              <div className="text-sm text-gray-600 mb-2">Successful Transactions</div>
              <div className="text-2xl font-bold text-gray-900">89%</div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}