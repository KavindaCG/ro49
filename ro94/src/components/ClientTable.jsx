import React from 'react';

function StatusPill({ status }) {
  const map = {
    'Doc Processing': 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300',
    Active: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300',
    Pending: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300',
    Completed: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300',
    Failed: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300',
    Registration: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300',
    'Return Docs': 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300',
  };
  const cls = map[status] || 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
  return <span className={`px-3 py-1 rounded-full text-sm font-medium ${cls}`}>{status}</span>;
}

export default function ClientTable({ data = [] }) {
  return (
    <div className="w-full">
      <table className="min-w-full text-left text-sm">
        {/* The key is using dark: prefix for ALL dark mode styles */}
        <thead className="bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
          <tr>
            <th className="px-4 py-3 text-xs font-medium text-gray-400 dark:text-gray-500 uppercase tracking-wide">
              <input type="checkbox" className="rounded border-gray-300 dark:border-gray-600 dark:bg-gray-700" />
            </th>
            <th className="px-4 py-3 text-xs font-medium text-gray-400 dark:text-gray-500 uppercase tracking-wide">Client ID</th>
            <th className="px-4 py-3 text-xs font-medium text-gray-400 dark:text-gray-500 uppercase tracking-wide">Name</th>
            <th className="px-4 py-3 text-xs font-medium text-gray-400 dark:text-gray-500 uppercase tracking-wide">Email</th>
            <th className="px-4 py-3 text-xs font-medium text-gray-400 dark:text-gray-500 uppercase tracking-wide">Broker</th>
            <th className="px-4 py-3 text-xs font-medium text-gray-400 dark:text-gray-500 uppercase tracking-wide">Stage</th>
            <th className="px-4 py-3 text-xs font-medium text-gray-400 dark:text-gray-500 uppercase tracking-wide">Status</th>
            <th className="px-4 py-3 text-xs font-medium text-gray-400 dark:text-gray-500 uppercase tracking-wide">Actions</th>
          </tr>
        </thead>

        <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-100 dark:divide-gray-700">
          {data.map((c) => (
            <tr key={c.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
              <td className="px-4 py-4">
                <input type="checkbox" className="rounded border-gray-300 dark:border-gray-600 dark:bg-gray-700" />
              </td>

              <td className="px-4 py-4 text-sm font-medium text-gray-700 dark:text-gray-300">{c.id}</td>

              <td className="px-4 py-4 flex items-center gap-3 text-sm">
                <div className="w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center text-gray-600 dark:text-gray-400">
                  👤
                </div>
                <div className="text-gray-900 dark:text-white">{c.name}</div>
              </td>

              <td className="px-4 py-4 text-sm text-gray-600 dark:text-gray-400">{c.email}</td>

              <td className="px-4 py-4 text-sm text-gray-700 dark:text-gray-300">{c.broker}</td>

              <td className="px-4 py-4 text-sm text-gray-700 dark:text-gray-300">{c.stage}</td>

              <td className="px-4 py-4">
                <StatusPill status={c.status} />
              </td>

              <td className="px-4 py-4 text-sm">
                <div className="flex gap-2">
                  <button className="px-3 py-1 rounded-full border text-sm border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                    View
                  </button>
                  <button className="px-3 py-1 rounded-full border text-sm border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                    Edit
                  </button>
                </div>
              </td>
            </tr>
          ))}

          {data.length === 0 && (
            <tr>
              <td colSpan="8" className="px-6 py-8 text-center text-gray-400 dark:text-gray-500">
                No clients found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}