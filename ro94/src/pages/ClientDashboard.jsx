import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext';
import { db } from '../firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';

import {
  CheckCircle2,
  Clock,
  FileText,
  CreditCard,
  ArrowUpRight,
  Loader2,
  LayoutDashboard,
  ShieldCheck,
  Plus
} from 'lucide-react';

export default function ClientDashboard() {
  const { isDarkMode } = useTheme();
  const { currentUser } = useAuth();

  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({ active: 0, completed: 0 });

  // --- MODERN STYLE CONFIG ---
  // We use "Zinc" for a clean, professional, architectural gray.
  const theme = {
    bg: isDarkMode ? 'bg-zinc-950' : 'bg-zinc-50',
    textMain: isDarkMode ? 'text-zinc-100' : 'text-zinc-900',
    textSub: isDarkMode ? 'text-zinc-400' : 'text-zinc-500',
    card: isDarkMode ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-zinc-200',
    cardHover: 'hover:border-zinc-300 hover:shadow-sm transition-all duration-200',
    accent: 'text-indigo-600 bg-indigo-50',
  };

  useEffect(() => {
    async function fetchData() {
      if (!currentUser) return;
      try {
        setLoading(true);
        const appsRef = collection(db, 'applications');
        const q = query(appsRef, where("userId", "==", currentUser.uid));
        const querySnapshot = await getDocs(q);

        const appsList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        // Sort by date (newest first) - assuming 'createdAt' exists
        appsList.sort((a, b) => (b.createdAt?.seconds || 0) - (a.createdAt?.seconds || 0));

        setApplications(appsList);
        setStats({
          active: appsList.filter(a => a.status !== 'Approved').length,
          completed: appsList.filter(a => a.status === 'Approved').length
        });
      } catch (error) {
        console.error("Fetch error:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [currentUser]);

  if (loading) return (
    <div className={`flex items-center justify-center min-h-screen ${theme.bg}`}>
      <Loader2 className="animate-spin text-zinc-400" size={24} />
    </div>
  );

  return (
    <main className={`flex-1 min-h-screen ${theme.bg} p-6 md:p-12 transition-colors duration-300`}>
      <div className="max-w-7xl mx-auto space-y-12">

        {/* --- HEADER --- */}
        <div>
          <h1 className={`text-3xl font-semibold tracking-tight ${theme.textMain}`}>Overview</h1>
          <p className={`mt-2 ${theme.textSub}`}>Welcome back, here is your account summary.</p>
        </div>

        {/* --- BENTO GRID --- */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">

          {/* STATS AREA (Span 8) */}
          <div className="md:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
            <StatCard
              icon={<CheckCircle2 size={24} />}
              label="Completed"
              value={stats.completed}
              theme={theme}
            />
            <StatCard
              icon={<Clock size={24} />}
              label="In Progress"
              value={stats.active}
              theme={theme}
            />
            <StatCard
              icon={<FileText size={24} />}
              label="Documents"
              value="0"
              theme={theme}
            />
            <StatCard
              icon={<CreditCard size={24} />}
              label="Pending Fees"
              value="$0.00"
              theme={theme}
            />
          </div>

          {/* PROFILE CARD (Span 4) */}
          <div className={`md:col-span-4 ${theme.card} border rounded-2xl p-8 flex flex-col justify-between h-full`}>
            <div>
              <div className={`w-16 h-16 rounded-full flex items-center justify-center text-2xl font-medium mb-6 ${isDarkMode ? 'bg-zinc-800 text-zinc-300' : 'bg-zinc-100 text-zinc-600'}`}>
                {currentUser?.email?.[0].toUpperCase()}
              </div>
              <h3 className={`text-lg font-medium ${theme.textMain} truncate`}>{currentUser?.email}</h3>
              <p className={`text-sm ${theme.textSub}`}>Client Account</p>

              <div className="mt-8 space-y-2">
                <p className="text-xs uppercase tracking-widest font-semibold text-zinc-400">USER ID</p>
                <p className={`font-mono text-xs ${theme.textSub}`}>{currentUser?.uid}</p>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-dashed border-zinc-200 dark:border-zinc-700 flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
              <span className={`text-sm font-medium ${theme.textMain}`}>Active Status</span>
            </div>
          </div>
        </div>

        {/* --- RECENT APPLICATIONS --- */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className={`text-lg font-semibold ${theme.textMain}`}>Recent Applications</h2>
            {/* <button className="text-sm font-medium text-indigo-600 hover:text-indigo-700">View All</button> */}
          </div>

          <div className="space-y-3">
            {applications.length > 0 ? (
              applications.map((app) => (
                <Link
                  key={app.id}
                  to={`/client/applications/${app.id}`}
                  className={`${theme.card} group border rounded-xl p-5 flex items-center justify-between transition-all hover:border-zinc-400 dark:hover:border-zinc-600`}
                >
                  <div className="flex items-center gap-5">
                    <div className={`p-3 rounded-lg ${isDarkMode ? 'bg-zinc-800 text-zinc-400' : 'bg-zinc-100 text-zinc-500'} group-hover:bg-zinc-900 group-hover:text-white dark:group-hover:bg-zinc-100 dark:group-hover:text-black transition-colors`}>
                      <LayoutDashboard size={20} />
                    </div>
                    <div>
                      <h4 className={`font-medium ${theme.textMain}`}>{app.type || "Application Request"}</h4>
                      <p className={`text-xs ${theme.textSub} mt-0.5`}>
                        Ref: <span className="font-mono">{app.id.substring(0, 8)}...</span>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-6">
                    <div className="text-right hidden sm:block">
                      <p className={`text-xs ${theme.textSub}`}>Submitted</p>
                      <p className={`text-sm font-medium ${theme.textMain}`}>
                        {app.createdAt ? new Date(app.createdAt.seconds * 1000).toLocaleDateString() : 'N/A'}
                      </p>
                    </div>
                    <StatusBadge status={app.status} />
                    <ArrowUpRight className="text-zinc-300 group-hover:text-zinc-600 dark:group-hover:text-zinc-200" size={20} />
                  </div>
                </Link>
              ))
            ) : (
              <div className={`border-2 border-dashed border-zinc-200 dark:border-zinc-800 rounded-xl p-12 text-center`}>
                <p className={`${theme.textSub}`}>No applications found.</p>
              </div>
            )}
          </div>
        </div>

      </div>
    </main>
  );
}

// --- SUB-COMPONENTS ---

function StatCard({ icon, label, value, theme }) {
  return (
    <div className={`${theme.card} border rounded-xl p-6 flex flex-col justify-between h-40 hover:shadow-lg hover:shadow-zinc-200/50 dark:hover:shadow-black/20 transition-all`}>
      <div className={`self-start p-3 rounded-full ${theme.bg}`}>
        {React.cloneElement(icon, { size: 20, className: theme.textMain })}
      </div>
      <div>
        <h3 className={`text-3xl font-semibold tracking-tight ${theme.textMain} mb-1`}>{value}</h3>
        <p className={`text-sm font-medium ${theme.textSub}`}>{label}</p>
      </div>
    </div>
  );
}

function StatusBadge({ status }) {
  const isApproved = status === 'Approved';
  const isPending = status === 'Pending' || !status;

  return (
    <span className={`px-3 py-1 rounded-full text-xs font-medium border
           ${isApproved ? 'bg-emerald-50 text-emerald-700 border-emerald-100' : ''}
           ${isPending ? 'bg-zinc-50 text-zinc-600 border-zinc-200' : ''}
           ${status === 'Rejected' ? 'bg-red-50 text-red-700 border-red-100' : ''}
        `}>
      {status || 'Pending'}
    </span>
  );
}