// src/pages/ApplicationDetails.jsx
import React from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';

export default function ApplicationDetails() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 flex">
      <Sidebar />
      
      <main className="ml-64 flex-1 min-h-screen overflow-auto pt-20">
        <Header />
        
        {/* Content container */}
        <div className="px-6 py-8">
          {/* Top Welcome Section - Blue header */}
          <div className="mb-6">
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-8 text-white">
              <div className="flex justify-between items-start mb-8">
                <div>
                  <h1 className="text-3xl font-bold mb-2">Hi, John Doe</h1>
                  <p className="text-blue-100 text-lg">Welcome to R094 ADMIN SYSTEM</p>
                </div>
              </div>
            </div>
          </div>

            {/* Main Content Grid - 2 columns */}
            <div className="px-5">
            
                {/* Application Progress Card */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 my-5 p-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-8">Application Progress</h2>
                
                    <div className="relative py-4">
                        {/* Gray background line (full width) */}
                        <div className="absolute rounded-full left-0 right-0 top-12 h-3 bg-gray-300"></div>
                        
                        {/* Blue highlight line (from start to stage 2) */}
                        <div className="absolute mt-0.5 mx-1 rounded-full left-0 top-12 h-2 bg-blue-600" style={{ width: '50%' }}></div>
                        
                        <div className="flex justify-between relative z-10">
                            {/* Stage 1 */}
                            <div className="flex flex-col items-center w-1/4">
                            {/* Circle */}
                            <div className="w-20 h-20 rounded-full bg-green-500 border-4 border-white shadow-xl flex items-center justify-center mb-4">
                                <span className="text-white font-bold text-lg">1</span>
                            </div>
                            
                            {/* Stage Details */}
                            <div className="text-center">
                                <h3 className="text-lg font-bold text-gray-900 mb-1">Stage 1: Registration</h3>
                                <div className="text-sm text-gray-600">Completed - Dec 1, 2025</div>
                            </div>
                            </div>

                            {/* Stage 2 */}
                            <div className="flex flex-col items-center w-1/4">
                            {/* Circle */}
                            <div className="w-20 h-20 rounded-full bg-blue-600 border-4 border-white shadow-lg flex items-center justify-center mb-4">
                                <span className="text-white font-bold text-lg">2</span>
                            </div>
                            
                            {/* Stage Details */}
                            <div className="text-center">
                                <h3 className="text-lg font-bold text-gray-900 mb-1">Stage 2: Documents</h3>
                                <div className="text-sm text-gray-600">In Progress - 3/5 docs uploaded</div>
                            </div>
                            </div>

                            {/* Stage 3 */}
                            <div className="flex flex-col items-center w-1/4">
                            {/* Circle */}
                            <div className="w-20 h-20 rounded-full bg-gray-300 border-4 border-white shadow-lg flex items-center justify-center mb-4">
                                <span className="text-gray-600 font-bold text-lg">3</span>
                            </div>
                            
                            {/* Stage Details */}
                            <div className="text-center">
                                <h3 className="text-lg font-bold text-gray-900 mb-1">Stage 3: Processing</h3>
                                <div className="text-sm text-gray-600">Pending</div>
                            </div>
                            </div>

                            {/* Stage 4 */}
                            <div className="flex flex-col items-center w-1/4">
                            {/* Circle */}
                            <div className="w-20 h-20 rounded-full bg-gray-300 border-4 border-white shadow-lg flex items-center justify-center mb-4">
                                <span className="text-gray-600 font-bold text-lg">4</span>
                            </div>
                            
                            {/* Stage Details */}
                            <div className="text-center">
                                <h3 className="text-lg font-bold text-gray-900 mb-1">Stage 4: Completion</h3>
                                <div className="text-sm text-gray-600">Not Started</div>
                            </div>
                            </div>
                        </div>
                    </div>
                </div>
            

            
            
              {/* Payment Card */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 my-5 p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Payment Summary</h2>
                
                <div className="bg-gray-50 rounded-2xl shadow-sm border border-gray-200 my-5 p-8">
                {/* Total Paid */}
                <div className="mb-6">
                  <div className="text-4xl font-bold text-gray-900 mb-2">$ 1,300.26</div>
                  <div className="text-gray-600 mb-4">Total Paid 23.57% of $ 5,517.62</div>
                  
                  {/* Progress bar */}
                  <div className="h-4 bg-gray-200 rounded-full overflow-hidden mb-2">
                    <div className="h-full bg-blue-600 rounded-full" style={{ width: '23.57%' }}></div>
                  </div>
                  <div className="text-right text-sm text-gray-500">23.57%</div>
                </div>
                
                {/* Payment Details */}
                <div className="space-y-4 mb-8">
                  <div className="flex justify-between items-center p-4 bg-blue-100 rounded-lg shadow-md">
                    <div className="text-gray-700 font-medium">Paid:</div>
                    <div className="text-2xl font-bold text-gray-900">$ 1,300.26</div>
                  </div>
                  
                  <div className="flex justify-between items-center p-4 bg-gray-100 rounded-lg shadow-md">
                    <div className="text-gray-700 font-medium">Total Due:</div>
                    <div className="text-2xl font-bold text-gray-900">$ 4,217.36</div>
                  </div>
                </div>
                
                {/* Record Payment Button */}
                <button className="w-1/2 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-bold text-lg transition-colors">
                  Record New Payment
                </button>
                </div>
              </div>

              {/* Quick Actions Card */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 my-5 p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Quick Actions</h2>
                
                <div className="grid grid-cols-2 gap-5 px-5">
                  <button className="p-5 bg-blue-200 hover:bg-blue-300 rounded-xl border border-blue-200 transition-colors">
                    <div className="text-4xl mb-3">📝</div>
                    <div className="font-semibold text-gray-900">Add Note</div>
                  </button>
                  
                  <button className="p-5 bg-green-200 hover:bg-green-300 rounded-xl border border-green-200 transition-colors">
                    <div className="text-4xl mb-3">📧</div>
                    <div className="font-semibold text-gray-900">Send Email</div>
                  </button>
                  
                  <button className="p-5 bg-purple-200 hover:bg-purple-300 rounded-xl border border-purple-200 transition-colors">
                    <div className="text-4xl mb-3">📅</div>
                    <div className="font-semibold text-gray-900">Schedule</div>
                  </button>
                  
                  <button className="p-5 bg-yellow-200 hover:bg-yellow-300 rounded-xl border border-yellow-200 transition-colors">
                    <div className="text-4xl mb-3">📊</div>
                    <div className="font-semibold text-gray-900">Print Report</div>
                  </button>
                  
                  <button className="p-5 bg-red-200 hover:bg-red-300 rounded-xl border border-red-200 transition-colors col-span-2">
                    <div className="text-4xl mb-3">🔄</div>
                    <div className="font-semibold text-gray-900">Change Status</div>
                  </button>
                </div>
              </div>
            
          </div>
        </div>
      </main>
    </div>
  );
}