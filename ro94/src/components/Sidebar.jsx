import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  LayoutDashboard, 
  Users, 
  FileText, 
  PieChart, 
  CreditCard, 
  Settings, 
  LogOut,
  User,
  Briefcase // Import Briefcase icon
} from "lucide-react";
import { useTheme } from "../contexts/ThemeContext";

export default function Sidebar() {
  const navigate = useNavigate();
  const { isDarkMode } = useTheme();
  
  const links = [
    { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { to: "/applications", label: "Applications", icon: Briefcase }, // Added Applications link
    { to: "/clients", label: "All Clients", icon: Users },
    { to: "/client-details", label: "Client Details", icon: FileText },
    { to: "/brokers", label: "Brokers", icon: PieChart },
    { to: "/finance", label: "Finance", icon: CreditCard },
  ];

  const handleSettingsClick = () => {
    navigate("/settings");
  };

  return (
    <aside className={`fixed inset-y-0 left-0 flex flex-col w-64 px-4 py-8 z-20
      ${isDarkMode 
        ? 'bg-gray-900 border-gray-700' 
        : 'bg-white border-gray-200'
      } border-r`}>
      
      {/* Logo Area */}
      <div className="flex items-center gap-3 px-2 mb-10">
        <div className={`flex items-center justify-center w-8 h-8 rounded-lg 
          ${isDarkMode ? 'bg-blue-600' : 'bg-black'} 
          text-white font-bold text-sm`}>
          R
        </div>
        <span className={`text-lg font-bold tracking-tight
          ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          RO94
        </span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-2">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            end
            className="relative flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-colors outline-none focus-visible:ring-2 focus-visible:ring-gray-400"
          >
            {({ isActive }) => (
              <>
                {isActive && (
                  <motion.div
                    layoutId="active-pill"
                    className={`absolute inset-0 rounded-md border
                      ${isDarkMode 
                        ? 'bg-gray-800 border-gray-600/50' 
                        : 'bg-gray-100 border-gray-200/50'
                      }`}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}

                {/* Icon & Text */}
                <span className={`relative z-10 flex items-center gap-3 
                  ${isActive 
                    ? isDarkMode ? 'text-white' : 'text-gray-900'
                    : isDarkMode ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-gray-900'
                  }`}>
                  <link.icon size={18} />
                  <span>{link.label}</span>
                </span>
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Footer Actions */}
      <div className={`mt-auto pt-6 space-y-1
        ${isDarkMode ? 'border-gray-700' : 'border-gray-100'} border-t`}>
        
        {/* Settings button */}
        <motion.button
          onClick={handleSettingsClick}
          whileHover={{ x: 4 }}
          className={`flex items-center gap-3 w-full px-3 py-2 rounded-md text-sm transition-colors
            ${isDarkMode 
              ? 'text-gray-400 hover:bg-gray-800 hover:text-white' 
              : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
            }`}
        >
          <Settings size={18} />
          <span>Settings</span>
        </motion.button>
        
        {/* Logout button */}
        <motion.button
          whileHover={{ x: 4 }}
          className={`flex items-center gap-3 w-full px-3 py-2 rounded-md text-sm transition-colors
            ${isDarkMode 
              ? 'text-gray-400 hover:bg-red-900/20 hover:text-red-400' 
              : 'text-gray-500 hover:bg-red-50 hover:text-red-600'
            }`}
        >
          <LogOut size={18} />
          <span>Logout</span>
        </motion.button>

        {/* User Profile */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex items-center gap-3 mt-6 px-2"
        >
          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold border
            ${isDarkMode 
              ? 'bg-gray-800 border-gray-700 text-gray-300' 
              : 'bg-gray-100 border-gray-200 text-gray-600'
            }`}>
            JD
          </div>
          <div className="flex flex-col">
            <span className={`text-sm font-medium
              ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              John Doe
            </span>
            <span className={`text-xs
              ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              Admin
            </span>
          </div>
        </motion.div>
      </div>
    </aside>
  );
}