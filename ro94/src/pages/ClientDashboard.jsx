import React, { useState, useEffect } from 'react'; // [NEW] Added hooks
import { Link } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { useTheme } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext'; // [NEW] Import Auth
import { db } from '../firebase'; // [NEW] Import DB
import { collection, query, where, getDocs } from 'firebase/firestore'; // [NEW] Firestore functions

import {
  CheckCircle,
  Clock,
  FileText,
  User,
  ArrowUpRight,
  CreditCard,
  Calendar,
  Loader2 // [NEW] Import Loader
} from 'lucide-react';

export default function ClientDashboard() {
  const { isDarkMode } = useTheme();
  const { currentUser } = useAuth(); // [NEW] Get current user

  // [NEW] State for dynamic data
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    activeApps: 0,
    completedApps: 0
  });

  // --- STYLE CONFIGURATION ---
  const pageBg = isDarkMode ? 'bg-slate-950' : 'bg-gray-50';
  const cardBg = isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-gray-100';
  const cardHover = isDarkMode ? 'hover:border-slate-700' : 'hover:border-blue-100 hover:shadow-md';
  const textHeading = isDarkMode ? 'text-white' : 'text-slate-900';
  const textSub = isDarkMode ? 'text-slate-400' : 'text-slate-500';
  const textLabel = isDarkMode ? 'text-slate-500' : 'text-slate-400';
  const iconBoxBase = "w-10 h-10 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110 duration-300";

  // [NEW] Fetch Real Data
  useEffect(() => {
    async function fetchData() {
      if (!currentUser) return;

      try {
        // 1. Fetch Applications for this specific user
        const appsRef = collection(db, 'applications');
        const q = query(appsRef, where("userId", "==", currentUser.uid));
        const querySnapshot = await getDocs(q);

        const appsList = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));

        setApplications(appsList);

        // 2. Calculate Stats (Simple count for now)
        setStats({
          activeApps: appsList.filter(a => a.status !== 'Completed').length,
          completedApps: appsList.filter(a => a.status === 'Completed').length
        });

      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [currentUser]);

  if (loading) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${pageBg}`}>
        <Loader2 className="animate-spin text-blue-600" size={32} />
      </div>
    );
  }

  return (
    <div className={`min-h-screen flex ${pageBg} font-sans transition-colors duration-300`}>

      {/* Note: Clients might not need the full Admin Sidebar. 
          You might want to create a specific <ClientSidebar /> later. 
          For now, we use the default one. */}
      <Sidebar />

      <main className="ml-64 flex-1 min-h-screen overflow-auto py-10">
        <div className="max-w-6xl mx-auto px-8">

          <header className="mb-10">
            <h1 className={`text-3xl font-bold tracking-tight ${textHeading}`}>Overview</h1>
            <p className={`mt-1 ${textSub}`}>Welcome back, here is your latest activity.</p>
          </header>

          {/* --- TOP SECTION: GRID LAYOUT --- */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">

            {/* LEFT COLUMN: 2x2 STATS GRID */}
            <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-5">

              {/* Card 1: Completed */}
              <div className={`${cardBg} ${cardHover} border rounded-2xl p-6 relative flex flex-col justify-between h-44 transition-all duration-300 group`}>
                <div className="flex justify-between items-start">
                  <div className={`${iconBoxBase} bg-emerald-500/10 text-emerald-600`}>
                    <CheckCircle size={20} />
                  </div>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${isDarkMode ? 'bg-slate-800' : 'bg-gray-50'}`}>
                    <ArrowUpRight className={textSub} size={16} />
                  </div>
                </div>
                <div>
                  <span className={`text-xs font-semibold uppercase tracking-wider ${textLabel}`}>Status</span>
                  <h3 className={`text-2xl font-bold mt-1 ${textHeading}`}>
                    {/* [DYNAMIC DATA] */}
                    {stats.completedApps} Completed
                  </h3>
                  <p className={`text-sm mt-1 ${textSub}`}>Applications finished</p>
                </div>
              </div>

              {/* Card 2: Documents (Placeholder Data for now) */}
              <div className={`${cardBg} ${cardHover} border rounded-2xl p-6 relative flex flex-col justify-between h-44 transition-all duration-300 group`}>
                <div className="flex justify-between items-start">
                  <div className={`${iconBoxBase} bg-blue-500/10 text-blue-600`}>
                    <FileText size={20} />
                  </div>
                  <span className="text-sm font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded-full">--%</span>
                </div>
                <div>
                  <span className={`text-xs font-semibold uppercase tracking-wider ${textLabel}`}>Documents</span>
                  <div className="flex items-baseline gap-1 mt-1">
                    <h3 className={`text-2xl font-bold ${textHeading}`}>0</h3>
                    <span className={`text-lg ${textSub}`}>/ 0</span>
                  </div>
                  <p className={`text-sm mt-1 ${textSub}`}>Files uploaded</p>
                </div>
              </div>

              {/* Card 3: Payment (Placeholder Data) */}
              <div className={`${cardBg} ${cardHover} border rounded-2xl p-6 relative flex flex-col justify-between h-44 transition-all duration-300 group`}>
                <div className="flex justify-between items-start">
                  <div className={`${iconBoxBase} bg-amber-500/10 text-amber-600`}>
                    <CreditCard size={20} />
                  </div>
                  <div className="bg-amber-100 rounded-full p-1.5">
                    <Clock className="text-amber-600" size={14} />
                  </div>
                </div>
                <div>
                  <span className={`text-xs font-semibold uppercase tracking-wider ${textLabel}`}>Payment</span>
                  <h3 className={`text-2xl font-bold mt-1 ${textHeading}`}>$0.00</h3>
                  <p className={`text-sm mt-1 ${textSub}`}>No active invoices</p>
                </div>
              </div>

              {/* Card 4: Active Apps */}
              <div className={`${cardBg} ${cardHover} border rounded-2xl p-6 relative flex flex-col justify-between h-44 transition-all duration-300 group`}>
                <div className="flex justify-between items-start">
                  <div className={`${iconBoxBase} bg-rose-500/10 text-rose-600`}>
                    <Calendar size={20} />
                  </div>
                </div>
                <div>
                  <span className={`text-xs font-semibold uppercase tracking-wider ${textLabel}`}>Active</span>
                  <h3 className={`text-2xl font-bold mt-1 ${textHeading}`}>
                    {/* [DYNAMIC DATA] */}
                    {stats.activeApps} Active
                  </h3>
                  <p className={`text-sm mt-1 ${textSub}`}>Applications in progress</p>
                </div>
              </div>

            </div>

            {/* RIGHT COLUMN: PROFILE CARD */}
            <div className={`lg:col-span-1 ${cardBg} border rounded-2xl p-8 flex flex-col items-center justify-center text-center relative shadow-sm`}>
              <div className="relative group cursor-pointer">
                <div className={`w-28 h-28 rounded-full flex items-center justify-center mb-5 transition-transform duration-500 group-hover:scale-105 ${isDarkMode ? 'bg-slate-800 text-slate-400' : 'bg-gradient-to-br from-gray-100 to-gray-200 text-gray-400'}`}>
                  {/* Show first letter of email */}
                  <span className="text-3xl font-bold">
                    {currentUser?.email ? currentUser.email[0].toUpperCase() : 'U'}
                  </span>
                </div>
                <div className={`absolute bottom-2 right-2 w-4 h-4 rounded-full border-2 ${isDarkMode ? 'border-slate-900 bg-emerald-500' : 'border-white bg-emerald-500'}`}></div>
              </div>

              {/* [DYNAMIC DATA] Show real email */}
              <h2 className={`text-xl font-bold mb-1 break-all ${textHeading}`}>
                {currentUser?.email || 'User'}
              </h2>
              <p className={`text-sm ${textSub} mb-1`}>Client Account</p>

              <div className={`w-full py-4 px-6 rounded-xl text-left mt-8 ${isDarkMode ? 'bg-slate-800' : 'bg-gray-50'}`}>
                <div className="flex justify-between items-center mb-1">
                  <p className={`text-xs font-bold uppercase tracking-wider ${textLabel}`}>User ID</p>
                </div>
                <p className={`text-xs font-mono mb-3 ${textHeading} truncate`}>
                  {currentUser?.uid}
                </p>

                <p className={`text-xs font-bold uppercase tracking-wider mb-1 ${textLabel}`}>Account Status</p>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
                  <p className={`text-sm font-medium ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`}>Active</p>
                </div>
              </div>
            </div>

          </div>

          {/* --- BOTTOM SECTION: APPLICATIONS LIST --- */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className={`text-xl font-bold ${textHeading}`}>My Applications</h2>
              {/* <button className={`text-sm font-medium hover:underline ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`}>New Application</button> */}
            </div>

            <div className="space-y-3">
              {/* [DYNAMIC DATA] Map through real applications */}
              {applications.length > 0 ? (
                applications.map((app) => (
                  <Link
                    key={app.id}
                    to={`/client/applications/${app.id}`}
                    className={`${cardBg} border rounded-xl p-5 flex items-center justify-between hover:scale-[1.01] hover:shadow-sm transition-all duration-200 cursor-pointer group`}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${isDarkMode ? 'bg-slate-800 text-slate-400' : 'bg-gray-100 text-gray-500'} group-hover:bg-blue-600 group-hover:text-white transition-colors`}>
                        <FileText size={20} />
                      </div>
                      <div>
                        {/* Assuming your application has a 'type' or 'name' field */}
                        <h4 className={`font-semibold ${textHeading}`}>{app.type || "Application"}</h4>
                        <p className={`text-xs ${textSub}`}>
                          {/* Format Firestore Timestamp if available */}
                          {app.createdAt ? new Date(app.createdAt.seconds * 1000).toLocaleDateString() : 'N/A'}
                          • ID: {app.id.slice(0, 8)}...
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium 
                        ${app.status === 'Approved' ? 'bg-emerald-100 text-emerald-700' :
                          app.status === 'Pending' ? 'bg-amber-100 text-amber-700' :
                            'bg-blue-100 text-blue-700'}`}>
                        {app.status || 'New'}
                      </span>
                      <ArrowUpRight className={`${textSub} group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform`} size={18} />
                    </div>
                  </Link>
                ))
              ) : (
                <div className={`p-10 text-center border-2 border-dashed rounded-xl ${isDarkMode ? 'border-slate-800 text-slate-500' : 'border-gray-200 text-gray-500'}`}>
                  <p>You haven't submitted any applications yet.</p>
                </div>
              )}
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}