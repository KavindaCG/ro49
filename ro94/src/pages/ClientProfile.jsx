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
    <div className={`min-h-screen flex ${isDarkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-900'}`}>
      <Sidebar />

      <main className="ml-64 flex-1 min-h-screen overflow-auto pt-24 pr-12 pb-12">
      
        {/* 1. Back Button */}
        <motion.button 
          whileHover={{ x: -4 }}
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 px-5 py-2.5 mb-8 bg-white border border-gray-200 text-gray-600 rounded-full text-sm font-medium shadow-sm hover:shadow-md transition-all"
        >
          <ArrowLeft size={16} />
          <span>Back to List</span>
        </motion.button>

        {/* 2. Profile Header Section */}
        <div className="flex flex-col xl:flex-row justify-between items-start xl:items-end gap-6 mb-12">
          
          {/* Left: Avatar & Info */}
          <div className="flex items-center gap-8">
            {/* Avatar - Modernized with ring and shadow */}
            <div className="relative group">
              <div className="w-28 h-28 rounded-full border-[6px] border-white bg-gray-100 flex items-center justify-center text-gray-800 shadow-xl overflow-hidden">
                 {/* Placeholder Avatar Image or Icon */}
                 <img 
                   src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${clientData.id}`} 
                   alt="Avatar"
                   className="w-full h-full object-cover"
                 />
              </div>
              {/* Status Dot */}
              <div className="absolute bottom-2 right-2 w-6 h-6 bg-green-500 border-4 border-white rounded-full"></div>
            </div>
            
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-4">
                <h1 className="text-5xl font-bold tracking-tighter text-gray-900">
                  {clientData.name}
                </h1>
                <span className="px-3 py-1 bg-green-100 text-green-700 border border-green-200 text-xs font-bold uppercase rounded-full tracking-wider shadow-sm">
                  {clientData.status}
                </span>
              </div>
              
              <div className="flex items-center gap-6 text-gray-500 font-medium text-sm">
                <p className="flex items-center gap-2">
                  <span className="uppercase tracking-wide text-xs text-gray-400 font-bold">Client ID</span>
                  <span className="text-gray-900 bg-gray-100 px-2 py-0.5 rounded-md">{clientData.id}</span>
                </p>
                <div className="w-px h-4 bg-gray-300"></div>
                <p className="flex items-center gap-2">
                  <span className="uppercase tracking-wide text-xs text-gray-400 font-bold">Broker</span>
                  <span className="text-gray-900">{clientData.broker}</span>
                </p>
              </div>
            </div>
          </div>

          {/* Right: Modern Floating Action Bar */}
          <div className="flex items-center gap-1 bg-white p-1.5 rounded-2xl border border-gray-200/60 shadow-lg shadow-gray-200/50">
            <ActionButton icon={UserPen} label="Edit" />
            <div className="w-px h-8 bg-gray-100 mx-1"></div>
            <ActionButton icon={Send} label="Alert" />
            <div className="w-px h-8 bg-gray-100 mx-1"></div>
            <ActionButton icon={FileText} label="CV" />
            <div className="w-px h-8 bg-gray-100 mx-1"></div>
            <ActionButton icon={RefreshCcw} label="Refund" />
          </div>
        </div>

        {/* 3. Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* --- LEFT COLUMN: Client Summary Card --- */}
          {/* Updated: White card, subtle border, shadow, cleaner typography */}
          <div className="bg-white rounded-[2rem] p-8 h-fit border border-gray-100 shadow-xl shadow-gray-200/40">
            <h2 className="text-xl font-bold text-gray-900 mb-8 flex items-center gap-2">
              <User size={20} className="text-gray-400" />
              Client Summary
            </h2>
            
            <div className="space-y-8">
              {/* Personal Info */}
              <div>
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4 ml-1">Personal Info</h3>
                <div className="space-y-4 bg-gray-50/50 p-4 rounded-2xl border border-gray-100">
                  <InfoRow label="NIC" value={clientData.personal.nic} />
                  <InfoRow label="Passport" value={clientData.personal.passport} />
                  <InfoRow label="Address" value={clientData.personal.address} />
                </div>
              </div>

              {/* Target Job */}
              <div>
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4 ml-1">Target Job</h3>
                <div className="space-y-4 bg-gray-50/50 p-4 rounded-2xl border border-gray-100">
                  <InfoRow label="Company" value={clientData.job.company} />
                  <InfoRow label="Role" value={clientData.job.role} />
                </div>
              </div>
            </div>
          </div>

          {/* --- RIGHT COLUMN: Detailed Tabs Card --- */}
          {/* Updated: White card, matching shadow/border style */}
          <div className="lg:col-span-2 bg-white rounded-[2rem] p-8 min-h-[600px] border border-gray-100 shadow-xl shadow-gray-200/40 flex flex-col">
            <div className="flex items-center justify-between mb-8">
               <h2 className="text-xl font-bold text-gray-900">Detailed Records</h2>
               <button className="text-sm font-medium text-blue-600 hover:underline">View History</button>
            </div>

            {/* Modern Tabs */}
            <div className="flex p-1 gap-1 bg-gray-100/80 rounded-2xl w-fit mb-8">
              <TabButton active={activeTab === "documents"} onClick={() => setActiveTab("documents")}>
                Documents
              </TabButton>
              <TabButton active={activeTab === "applications"} onClick={() => setActiveTab("applications")}>
                Applications
              </TabButton>
              <TabButton active={activeTab === "finance"} onClick={() => setActiveTab("finance")}>
                Finance
              </TabButton>
            </div>

            {/* Tab Content Area */}
            <div className="flex-1">
              {activeTab === "documents" && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }} 
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-3"
                >
                  {/* Header for list */}
                  <div className="grid grid-cols-12 px-4 pb-2 text-xs font-bold text-gray-400 uppercase tracking-wider">
                    <div className="col-span-1">#</div>
                    <div className="col-span-5">File Name</div>
                    <div className="col-span-3">Status</div>
                    <div className="col-span-3 text-right">Actions</div>
                  </div>

                  {/* Doc 1 */}
                  <DocItem 
                    number="01" 
                    name="Passport_Front_Page.pdf" 
                    tag="EXP: 2028" 
                    tagStyle="bg-blue-50 text-blue-700 border-blue-100"
                  >
                     <DocAction icon={Eye} label="Preview" />
                     <DocAction icon={Trash2} label="Remove" isDestructive />
                  </DocItem>

                  {/* Doc 2 */}
                  <DocItem 
                    number="02" 
                    name="Police_Clearance_Report.pdf" 
                    tag="Valid" 
                    tagStyle="bg-green-50 text-green-700 border-green-100"
                  >
                     <DocAction icon={Eye} label="Preview" />
                     <DocAction icon={Trash2} label="Remove" isDestructive />
                  </DocItem>

                  {/* Doc 3 (Missing) */}
                  <DocItem 
                    number="03" 
                    name="Medical_Certificate.pdf" 
                    tag="Missing" 
                    tagStyle="bg-red-50 text-red-700 border-red-100"
                    hasAlert
                  >
                    <button className="flex items-center gap-2 px-4 py-1.5 bg-gray-900 hover:bg-black text-white rounded-lg text-xs font-bold transition-all shadow-md hover:shadow-lg">
                      <Upload size={12} />
                      <span>UPLOAD</span>
                    </button>
                  </DocItem>

                </motion.div>
              )}

              {activeTab !== "documents" && (
                <div className="flex flex-col items-center justify-center h-full text-gray-400 gap-4">
                  <div className="w-16 h-16 rounded-full bg-gray-50 flex items-center justify-center">
                     <AlertCircle size={32} className="opacity-20" />
                  </div>
                  <p>No records found for {activeTab}.</p>
                </div>
              )}
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}

// --- Sub-Components ---

function InfoRow({ label, value }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between text-sm gap-1">
      <span className="font-medium text-gray-500">{label}</span>
      <span className="font-semibold text-gray-900 text-right">{value}</span>
    </div>
  );
}

function ActionButton({ icon: Icon, label }) {
  return (
    <button className="flex flex-col items-center justify-center w-16 py-2 gap-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all group">
      <Icon size={20} strokeWidth={1.5} className="group-hover:scale-110 transition-transform" />
      <span className="text-[10px] font-bold leading-none">{label}</span>
    </button>
  );
}

function TabButton({ children, active, onClick }) {
  return (
    <button 
      onClick={onClick}
      className={`px-6 py-2 rounded-xl text-sm font-bold transition-all ${
        active 
        ? "bg-white text-gray-900 shadow-sm ring-1 ring-black/5" 
        : "text-gray-500 hover:text-gray-900"
      }`}
    >
      {children}
    </button>
  );
}

function DocItem({ number, name, tag, tagStyle, hasAlert, children }) {
  return (
    <div className="group grid grid-cols-12 items-center p-4 bg-white border border-gray-100 rounded-xl hover:border-gray-300 hover:shadow-md transition-all duration-200">
      <div className="col-span-1 text-xs font-bold text-gray-300 group-hover:text-gray-500">{number}</div>
      <div className="col-span-5 text-sm font-semibold text-gray-700 group-hover:text-gray-900 truncate pr-4">{name}</div>
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

function DocAction({ icon: Icon, label, isDestructive }) {
  return (
    <button 
      className={`p-2 rounded-lg transition-colors ${
        isDestructive 
        ? "text-gray-400 hover:text-red-600 hover:bg-red-50" 
        : "text-gray-400 hover:text-blue-600 hover:bg-blue-50"
      }`}
      title={label}
    >
      <Icon size={16} />
    </button>
  );
}