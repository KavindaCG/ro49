import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import { useTheme } from "../contexts/ThemeContext";

import { 
  ArrowLeft, 
  User, 
  UserPen, 
  Send, 
  FileText, 
  RefreshCcw, 
  Eye, 
  Trash2, 
  Upload, 
  AlertCircle 
} from "lucide-react";

export default function ClientProfile() {
  const { id } = useParams(); 
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("documents");
  const { isDarkMode } = useTheme();

  // Mock Data
  const clientData = {
    name: "JOHN DOE",
    id: id || "ROC-001",
    broker: "Agent Smith",
    status: "Active",
    personal: {
      nic: "901234567V",
      passport: "N123456",
      address: "Colombo, Sri Lanka",
    },
    job: {
      company: "Doha Const.",
      role: "Heavy Vehicle Driver",
    },
  };

  return (
    <div className={`min-h-screen flex transition-colors duration-300 ${isDarkMode ? 'bg-[#09090b] text-zinc-100' : 'bg-gray-50 text-gray-900'}`}>
      <Sidebar />

      <main className="ml-64 flex-1 min-h-screen overflow-auto">
        <div className="pt-20 pr-12 pb-12 pl-8"> {/* Adjusted padding */}
          <Header />
        
          {/* 1. Back Button */}
          <motion.button 
            whileHover={{ x: -4 }}
            onClick={() => navigate(-1)}
            className={`flex items-center gap-2 px-5 py-2.5 mb-8 rounded-full text-sm font-medium shadow-sm border transition-all
              ${isDarkMode 
                ? 'bg-[#18181b] border-zinc-800 text-zinc-300 hover:bg-zinc-800' 
                : 'bg-white border-gray-200 text-gray-600 hover:shadow-md'
              }`}
          >
            <ArrowLeft size={16} />
            <span>Back to List</span>
          </motion.button>

          {/* 2. Profile Header Section */}
          <div className="flex flex-col xl:flex-row justify-between items-start xl:items-end gap-6 mb-12">
            
            {/* Left: Avatar & Info */}
            <div className="flex items-center gap-8">
              {/* Avatar */}
              <div className="relative group">
                <div className={`w-28 h-28 rounded-full border-[6px] flex items-center justify-center shadow-xl overflow-hidden
                  ${isDarkMode ? 'border-[#18181b] bg-zinc-800' : 'border-white bg-gray-100'}`}>
                   <img 
                     src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${clientData.id}`} 
                     alt="Avatar"
                     className="w-full h-full object-cover"
                   />
                </div>
                <div className={`absolute bottom-2 right-2 w-6 h-6 rounded-full border-4 
                  ${clientData.status === 'Active' ? 'bg-green-500' : 'bg-gray-400'}
                  ${isDarkMode ? 'border-[#09090b]' : 'border-white'}`}>
                </div>
              </div>
              
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-4">
                  <h1 className={`text-5xl font-bold tracking-tighter ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    {clientData.name}
                  </h1>
                  <span className={`px-3 py-1 text-xs font-bold uppercase rounded-full tracking-wider border
                    ${isDarkMode 
                      ? 'bg-green-500/10 text-green-400 border-green-500/20' 
                      : 'bg-green-100 text-green-700 border-green-200'}`}>
                    {clientData.status}
                  </span>
                </div>
                
                <div className={`flex items-center gap-6 font-medium text-sm ${isDarkMode ? 'text-zinc-500' : 'text-gray-500'}`}>
                  <p className="flex items-center gap-2">
                    <span className="uppercase tracking-wide text-xs font-bold opacity-70">Client ID</span>
                    <span className={`px-2 py-0.5 rounded-md ${isDarkMode ? 'bg-zinc-800 text-zinc-200' : 'bg-gray-100 text-gray-900'}`}>
                      {clientData.id}
                    </span>
                  </p>
                  <div className={`w-px h-4 ${isDarkMode ? 'bg-zinc-800' : 'bg-gray-300'}`}></div>
                  <p className="flex items-center gap-2">
                    <span className="uppercase tracking-wide text-xs font-bold opacity-70">Broker</span>
                    <span className={isDarkMode ? 'text-zinc-200' : 'text-gray-900'}>{clientData.broker}</span>
                  </p>
                </div>
              </div>
            </div>

            {/* Right: Floating Action Bar */}
            <div className={`flex items-center gap-1 p-1.5 rounded-2xl border shadow-lg
              ${isDarkMode 
                ? 'bg-[#18181b] border-zinc-800 shadow-black/40' 
                : 'bg-white border-gray-200/60 shadow-gray-200/50'}`}>
              <ActionButton icon={UserPen} label="Edit" isDarkMode={isDarkMode} />
              <div className={`w-px h-8 mx-1 ${isDarkMode ? 'bg-zinc-800' : 'bg-gray-100'}`}></div>
              <ActionButton icon={Send} label="Alert" isDarkMode={isDarkMode} />
              <div className={`w-px h-8 mx-1 ${isDarkMode ? 'bg-zinc-800' : 'bg-gray-100'}`}></div>
              <ActionButton icon={FileText} label="CV" isDarkMode={isDarkMode} />
              <div className={`w-px h-8 mx-1 ${isDarkMode ? 'bg-zinc-800' : 'bg-gray-100'}`}></div>
              <ActionButton icon={RefreshCcw} label="Refund" isDarkMode={isDarkMode} />
            </div>
          </div>

          {/* 3. Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* --- LEFT COLUMN: Client Summary Card --- */}
            <div className={`rounded-[2rem] p-8 h-fit border shadow-xl
              ${isDarkMode 
                ? 'bg-[#18181b] border-zinc-800 shadow-black/20' 
                : 'bg-white border-gray-100 shadow-gray-200/40'}`}>
              
              <h2 className={`text-xl font-bold mb-8 flex items-center gap-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                <User size={20} className={isDarkMode ? 'text-zinc-500' : 'text-gray-400'} />
                Client Summary
              </h2>
              
              <div className="space-y-8">
                {/* Personal Info */}
                <div>
                  <h3 className={`text-xs font-bold uppercase tracking-widest mb-4 ml-1 ${isDarkMode ? 'text-zinc-500' : 'text-gray-400'}`}>
                    Personal Info
                  </h3>
                  <div className={`space-y-4 p-4 rounded-2xl border
                    ${isDarkMode ? 'bg-zinc-900/50 border-zinc-800' : 'bg-gray-50/50 border-gray-100'}`}>
                    <InfoRow label="NIC" value={clientData.personal.nic} isDarkMode={isDarkMode} />
                    <InfoRow label="Passport" value={clientData.personal.passport} isDarkMode={isDarkMode} />
                    <InfoRow label="Address" value={clientData.personal.address} isDarkMode={isDarkMode} />
                  </div>
                </div>

                {/* Target Job */}
                <div>
                  <h3 className={`text-xs font-bold uppercase tracking-widest mb-4 ml-1 ${isDarkMode ? 'text-zinc-500' : 'text-gray-400'}`}>
                    Target Job
                  </h3>
                  <div className={`space-y-4 p-4 rounded-2xl border
                    ${isDarkMode ? 'bg-zinc-900/50 border-zinc-800' : 'bg-gray-50/50 border-gray-100'}`}>
                    <InfoRow label="Company" value={clientData.job.company} isDarkMode={isDarkMode} />
                    <InfoRow label="Role" value={clientData.job.role} isDarkMode={isDarkMode} />
                  </div>
                </div>
              </div>
            </div>

            {/* --- RIGHT COLUMN: Detailed Tabs Card --- */}
            <div className={`lg:col-span-2 rounded-[2rem] p-8 min-h-[600px] border shadow-xl flex flex-col
              ${isDarkMode 
                ? 'bg-[#18181b] border-zinc-800 shadow-black/20' 
                : 'bg-white border-gray-100 shadow-gray-200/40'}`}>
              
              <div className="flex items-center justify-between mb-8">
                 <h2 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Detailed Records</h2>
                 <button className="text-sm font-medium text-blue-600 hover:underline">View History</button>
              </div>

              {/* Tabs */}
              <div className={`flex p-1 gap-1 rounded-2xl w-fit mb-8 ${isDarkMode ? 'bg-zinc-900' : 'bg-gray-100/80'}`}>
                <TabButton active={activeTab === "documents"} onClick={() => setActiveTab("documents")} isDarkMode={isDarkMode}>
                  Documents
                </TabButton>
                <TabButton active={activeTab === "applications"} onClick={() => setActiveTab("applications")} isDarkMode={isDarkMode}>
                  Applications
                </TabButton>
                <TabButton active={activeTab === "finance"} onClick={() => setActiveTab("finance")} isDarkMode={isDarkMode}>
                  Finance
                </TabButton>
              </div>

              {/* Content */}
              <div className="flex-1">
                {activeTab === "documents" && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }} 
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-3"
                  >
                    {/* List Header */}
                    <div className={`grid grid-cols-12 px-4 pb-2 text-xs font-bold uppercase tracking-wider
                      ${isDarkMode ? 'text-zinc-500' : 'text-gray-400'}`}>
                      <div className="col-span-1">#</div>
                      <div className="col-span-5">File Name</div>
                      <div className="col-span-3">Status</div>
                      <div className="col-span-3 text-right">Actions</div>
                    </div>

                    {/* Doc Items */}
                    <DocItem 
                      number="01" 
                      name="Passport_Front_Page.pdf" 
                      tag="EXP: 2028" 
                      tagStyle={isDarkMode ? "bg-blue-500/10 text-blue-400 border-blue-500/20" : "bg-blue-50 text-blue-700 border-blue-100"}
                      isDarkMode={isDarkMode}
                    >
                        <DocAction icon={Eye} label="Preview" isDarkMode={isDarkMode} />
                        <DocAction icon={Trash2} label="Remove" isDestructive isDarkMode={isDarkMode} />
                    </DocItem>

                    <DocItem 
                      number="02" 
                      name="Police_Clearance_Report.pdf" 
                      tag="Valid" 
                      tagStyle={isDarkMode ? "bg-green-500/10 text-green-400 border-green-500/20" : "bg-green-50 text-green-700 border-green-100"}
                      isDarkMode={isDarkMode}
                    >
                        <DocAction icon={Eye} label="Preview" isDarkMode={isDarkMode} />
                        <DocAction icon={Trash2} label="Remove" isDestructive isDarkMode={isDarkMode} />
                    </DocItem>

                    <DocItem 
                      number="03" 
                      name="Medical_Certificate.pdf" 
                      tag="Missing" 
                      tagStyle={isDarkMode ? "bg-red-500/10 text-red-400 border-red-500/20" : "bg-red-50 text-red-700 border-red-100"}
                      hasAlert
                      isDarkMode={isDarkMode}
                    >
                      <button className={`flex items-center gap-2 px-4 py-1.5 rounded-lg text-xs font-bold transition-all shadow-md
                        ${isDarkMode ? 'bg-zinc-200 text-zinc-900 hover:bg-white' : 'bg-gray-900 hover:bg-black text-white'}`}>
                        <Upload size={12} />
                        <span>UPLOAD</span>
                      </button>
                    </DocItem>

                  </motion.div>
                )}

                {activeTab !== "documents" && (
                  <div className={`flex flex-col items-center justify-center h-full gap-4 ${isDarkMode ? 'text-zinc-600' : 'text-gray-400'}`}>
                    <div className={`w-16 h-16 rounded-full flex items-center justify-center ${isDarkMode ? 'bg-zinc-900' : 'bg-gray-50'}`}>
                       <AlertCircle size={32} className="opacity-20" />
                    </div>
                    <p>No records found for {activeTab}.</p>
                  </div>
                )}
              </div>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}

// --- Sub-Components ---

function InfoRow({ label, value, isDarkMode }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between text-sm gap-1">
      <span className={`font-medium ${isDarkMode ? 'text-zinc-500' : 'text-gray-500'}`}>{label}</span>
      <span className={`font-semibold text-right ${isDarkMode ? 'text-zinc-200' : 'text-gray-900'}`}>{value}</span>
    </div>
  );
}

function ActionButton({ icon: Icon, label, isDarkMode }) {
  return (
    <button className={`flex flex-col items-center justify-center w-16 py-2 gap-1.5 rounded-xl transition-all group
      ${isDarkMode 
        ? 'text-zinc-500 hover:text-blue-400 hover:bg-blue-500/10' 
        : 'text-gray-400 hover:text-blue-600 hover:bg-blue-50'
      }`}>
      <Icon size={20} strokeWidth={1.5} className="group-hover:scale-110 transition-transform" />
      <span className="text-[10px] font-bold leading-none">{label}</span>
    </button>
  );
}

function TabButton({ children, active, onClick, isDarkMode }) {
  return (
    <button 
      onClick={onClick}
      className={`px-6 py-2 rounded-xl text-sm font-bold transition-all ${
        active 
        ? (isDarkMode ? "bg-[#18181b] text-white shadow-sm ring-1 ring-white/10" : "bg-white text-gray-900 shadow-sm ring-1 ring-black/5")
        : (isDarkMode ? "text-zinc-500 hover:text-zinc-300" : "text-gray-500 hover:text-gray-900")
      }`}
    >
      {children}
    </button>
  );
}

function DocItem({ number, name, tag, tagStyle, hasAlert, children, isDarkMode }) {
  return (
    <div className={`group grid grid-cols-12 items-center p-4 border rounded-xl transition-all duration-200
      ${isDarkMode 
        ? 'bg-[#18181b] border-zinc-800 hover:border-zinc-700' 
        : 'bg-white border-gray-100 hover:border-gray-300 hover:shadow-md'
      }`}>
      <div className={`col-span-1 text-xs font-bold ${isDarkMode ? 'text-zinc-600 group-hover:text-zinc-400' : 'text-gray-300 group-hover:text-gray-500'}`}>{number}</div>
      <div className={`col-span-5 text-sm font-semibold truncate pr-4 ${isDarkMode ? 'text-zinc-300 group-hover:text-white' : 'text-gray-700 group-hover:text-gray-900'}`}>{name}</div>
      <div className="col-span-3">
         <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wide border ${tagStyle}`}>
          {hasAlert && <AlertCircle size={10} />}
          {tag}
        </span>
      </div>
      <div className="col-span-3 flex items-center justify-end gap-2 opacity-60 group-hover:opacity-100 transition-opacity">
        {children}
      </div>
    </div>
  );
}

function DocAction({ icon: Icon, label, isDestructive, isDarkMode }) {
  return (
    <button 
      className={`p-2 rounded-lg transition-colors ${
        isDestructive 
        ? (isDarkMode ? "text-zinc-500 hover:text-red-400 hover:bg-red-500/10" : "text-gray-400 hover:text-red-600 hover:bg-red-50")
        : (isDarkMode ? "text-zinc-500 hover:text-blue-400 hover:bg-blue-500/10" : "text-gray-400 hover:text-blue-600 hover:bg-blue-50")
      }`}
      title={label}
    >
      <Icon size={16} />
    </button>
  );
}