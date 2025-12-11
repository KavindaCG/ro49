import React from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import { useTheme } from '../contexts/ThemeContext';

export default function LoginSignup() {
  const { isDarkMode } = useTheme();

  return (
    <div className={`min-h-screen flex ${isDarkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-900'}`}>
      <Sidebar />
      <main className="ml-64 flex-1 min-h-screen overflow-auto pt-20">
        <Header />
        <div className="max-w-2xl mx-auto px-6 py-10">
          <h1 className="text-2xl font-bold mb-4">Login / Signup</h1>
          <p className="text-sm text-gray-500">
            This is a placeholder login/signup page wired to the <code>/login</code> route.
          </p>
        </div>
      </main>
    </div>
  );
}
