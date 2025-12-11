import React from 'react';
import { useTheme } from '../contexts/ThemeContext';

const ThemeToggle = () => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
      aria-label="Toggle dark mode"
    >
      {isDarkMode ? (
        // Sun icon for light mode
        <span className="text-yellow-500">☀️</span>
      ) : (
        // Moon icon for dark mode
        <span className="text-gray-700 dark:text-gray-300">🌙</span>
      )}
    </button>
  );
};

export default ThemeToggle;