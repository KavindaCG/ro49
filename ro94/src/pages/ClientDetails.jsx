import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import { useTheme } from "../contexts/ThemeContext";
import {
  Search,
  Filter,
  ArrowUpDown,
  Plus,
  Pencil,
  Trash2,
  X
} from "lucide-react";

// Mock Data
const INITIAL_DATA = [
  { id: "ROC-001", name: "John Doe", email: "john@example.com", avatar: "JD" },
  { id: "ROC-002", name: "Jane Silva", email: "jane@example.com", avatar: "JS" },
  { id: "ROC-003", name: "Kamal Perera", email: "kamal@test.lk", avatar: "KP" },
  { id: "ROC-004", name: "John Doe", email: "john@example.com", avatar: "JD" },
  { id: "ROC-005", name: "John Doe", email: "john@example.com", avatar: "JD" },
  { id: "ROC-006", name: "John Doe", email: "john@example.com", avatar: "JD" },
];

export default function ClientDetails() {
  const navigate = useNavigate();
  const { isDarkMode } = useTheme();

  const [clients, setClients] = useState(INITIAL_DATA);
  const [selectedClients, setSelectedClients] = useState([]);

  // --- MODAL STATE ---
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentClient, setCurrentClient] = useState(null);

  // --- ACTIONS ---

  const handleViewProfile = (clientId) => {
    navigate(`/clients/${clientId}`);
  };

  const handleDelete = (e, clientId) => {
    e.stopPropagation();
    if (window.confirm("Are you sure you want to delete this client?")) {
      setClients((prev) => prev.filter((c) => c.id !== clientId));
      setSelectedClients((prev) => prev.filter((id) => id !== clientId));
    }
  };

  const handleEdit = (e, client) => {
    e.stopPropagation();
    setCurrentClient({ ...client });
    setIsModalOpen(true);
  };

  const handleSave = () => {
    setClients(clients.map((c) => (c.id === currentClient.id ? currentClient : c)));
    setIsModalOpen(false);
    setCurrentClient(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentClient({ ...currentClient, [name]: value });
  };

  // --- SELECTION LOGIC ---
  const toggleSelect = (id) => {
    if (selectedClients.includes(id)) {
      setSelectedClients(selectedClients.filter((clientId) => clientId !== id));
    } else {
      setSelectedClients([...selectedClients, id]);
    }
  };

  const toggleSelectAll = () => {
    if (selectedClients.length === clients.length) {
      setSelectedClients([]);
    } else {
      setSelectedClients(clients.map((c) => c.id));
    }
  };

  return (
    <div className={`min-h-screen flex transition-colors duration-300 ${isDarkMode ? 'bg-[#09090b] text-zinc-100' : 'bg-gray-50 text-gray-900'}`}>
      <Sidebar />

      <main className="flex-1 min-h-screen overflow-auto pt-16 md:pt-20 pb-12 transition-all duration-300">
        <Header />

        <div className="max-w-[1600px] mx-auto px-4 md:px-8">
          {/* Page Header */}
          <div className="flex flex-col gap-6 mb-8 mt-6">
            <h1 className={`text-2xl md:text-3xl font-bold tracking-tight ${isDarkMode ? 'text-white' : 'text-zinc-900'}`}>
              Client Details
            </h1>

            {/* Toolbar Area */}
            <div className="flex flex-col xl:flex-row justify-between items-stretch xl:items-center gap-4">
              <div className="relative w-full xl:max-w-sm">
                <Search className={`absolute left-3 top-1/2 -translate-y-1/2 ${isDarkMode ? 'text-zinc-500' : 'text-gray-400'}`} size={18} />
                <input
                  type="text"
                  placeholder="Search for a Client"
                  className={`w-full pl-10 pr-4 py-2.5 rounded-xl text-sm outline-none transition-all border
                      ${isDarkMode
                      ? 'bg-[#18181b] border-zinc-800 text-white focus:border-blue-500/50 focus:bg-zinc-900'
                      : 'bg-white border-gray-200 text-gray-900 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10'
                    }`}
                />
              </div>

              <div className="flex flex-wrap items-center gap-2 md:gap-4">
                <button className={`flex-1 md:flex-none flex justify-center items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-colors border
                    ${isDarkMode ? 'bg-[#18181b] border-zinc-800 text-zinc-300 hover:bg-zinc-800' : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'}`}>
                  <span>Filter</span>
                  <Filter size={16} />
                </button>
                <button className={`flex-1 md:flex-none flex justify-center items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-colors border
                    ${isDarkMode ? 'bg-[#18181b] border-zinc-800 text-zinc-300 hover:bg-zinc-800' : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'}`}>
                  <span>Sort</span>
                  <ArrowUpDown size={16} />
                </button>
                <button className={`flex-1 md:flex-none flex justify-center items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all shadow-sm hover:shadow-md whitespace-nowrap
                    ${isDarkMode
                    ? 'bg-zinc-100 text-zinc-900 hover:bg-white'
                    : 'bg-gray-900 text-white hover:bg-black'
                  }`}>
                  <span>Add New</span>
                  <Plus size={16} />
                </button>
              </div>
            </div>
          </div>

          {/* --- MOBILE CARD VIEW --- */}
          <div className="md:hidden space-y-4 mb-4">
            <AnimatePresence>
              {clients.map((client) => (
                <motion.div
                  key={client.id}
                  layout
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, height: 0 }}
                  className={`p-4 rounded-2xl border shadow-sm ${isDarkMode ? 'bg-[#18181b] border-zinc-800' : 'bg-white border-gray-200'}`}
                >
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-3">
                      <div
                        onClick={() => handleViewProfile(client.id)}
                        className={`w-10 h-10 rounded-full border flex items-center justify-center text-xs font-bold shadow-sm overflow-hidden
                              ${isDarkMode ? 'bg-zinc-800 border-zinc-700 text-zinc-300' : 'bg-white border-gray-200 text-gray-700'}`}>
                        <img
                          src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${client.id}`}
                          alt="avatar"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <h4 className={`font-semibold ${isDarkMode ? 'text-zinc-200' : 'text-gray-900'}`}>{client.name}</h4>
                        <p className={`text-xs font-mono ${isDarkMode ? 'text-zinc-500' : 'text-gray-500'}`}>{client.id}</p>
                      </div>
                    </div>
                    <div className="flex gap-1">
                      <button onClick={(e) => handleEdit(e, client)} className={`p-2 rounded-lg ${isDarkMode ? 'text-zinc-400' : 'text-gray-400'}`}><Pencil size={16} /></button>
                      <button onClick={(e) => handleDelete(e, client.id)} className={`p-2 rounded-lg text-red-500`}><Trash2 size={16} /></button>
                    </div>
                  </div>
                  <div className="text-sm">
                    <div className="flex justify-between items-center p-2 rounded-lg bg-gray-50 dark:bg-zinc-900/50">
                      <span className={isDarkMode ? 'text-zinc-500' : 'text-gray-500'}>Email</span>
                      <span className={`text-xs ${isDarkMode ? 'text-zinc-300' : 'text-gray-700'}`}>{client.email}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Table Section (Desktop) */}
          <div className={`hidden md:block w-full rounded-2xl overflow-hidden border shadow-sm transition-colors
              ${isDarkMode ? 'bg-[#18181b] border-zinc-800' : 'bg-white border-gray-200'}`}>

            {/* Table Header */}
            <div className={`grid grid-cols-12 gap-4 px-6 py-4 border-b text-sm font-semibold
                ${isDarkMode
                ? 'bg-zinc-900/50 border-zinc-800 text-zinc-400'
                : 'bg-gray-50 border-gray-100 text-gray-500'
              }`}>
              <div className="col-span-1 flex items-center">
                <input
                  type="checkbox"
                  checked={clients.length > 0 && selectedClients.length === clients.length}
                  onChange={toggleSelectAll}
                  className="w-4 h-4 rounded border-gray-400 text-gray-900 focus:ring-gray-900 cursor-pointer"
                />
              </div>
              <div className="col-span-2">Client ID</div>
              <div className="col-span-4">Name</div>
              <div className="col-span-3">Email</div>
              <div className="col-span-2 text-right pr-4">Actions</div>
            </div>

            {/* Table Rows */}
            <div className={`divide-y ${isDarkMode ? 'divide-zinc-800' : 'divide-gray-100'}`}>
              <AnimatePresence>
                {clients.map((client) => (
                  <motion.div
                    key={client.id}
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -20, height: 0 }}
                    className={`grid grid-cols-12 gap-4 px-6 py-4 items-center transition-colors group cursor-default
                        ${isDarkMode
                        ? selectedClients.includes(client.id) ? "bg-zinc-800/80" : "hover:bg-zinc-800/40"
                        : selectedClients.includes(client.id) ? "bg-gray-50" : "hover:bg-gray-50"
                      }`}
                  >
                    {/* Checkbox */}
                    <div className="col-span-1 flex items-center">
                      <input
                        type="checkbox"
                        checked={selectedClients.includes(client.id)}
                        onChange={() => toggleSelect(client.id)}
                        onClick={(e) => e.stopPropagation()}
                        className="w-4 h-4 rounded border-gray-300 text-gray-900 focus:ring-gray-900 cursor-pointer"
                      />
                    </div>

                    {/* ID */}
                    <div className={`col-span-2 text-sm font-mono
                        ${isDarkMode ? 'text-zinc-500' : 'text-gray-500'}`}>
                      {client.id}
                    </div>

                    {/* Name & Avatar */}
                    <div
                      onClick={() => handleViewProfile(client.id)}
                      className="col-span-4 flex items-center gap-3 cursor-pointer"
                    >
                      <div className={`w-9 h-9 rounded-full border flex items-center justify-center text-xs font-bold shadow-sm overflow-hidden
                          ${isDarkMode ? 'bg-zinc-800 border-zinc-700 text-zinc-300' : 'bg-white border-gray-200 text-gray-700'}`}>
                        <img
                          src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${client.id}`}
                          alt="avatar"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <span className={`text-sm font-medium transition-colors
                          ${isDarkMode ? 'text-zinc-200 hover:text-blue-400' : 'text-gray-900 hover:text-blue-600'}`}>
                        {client.name}
                      </span>
                    </div>

                    {/* Email */}
                    <div className={`col-span-3 text-sm underline decoration-gray-300 underline-offset-4
                        ${isDarkMode ? 'text-zinc-500 decoration-zinc-700' : 'text-gray-600'}`}>
                      {client.email}
                    </div>

                    {/* Actions */}
                    <div className={`col-span-2 flex items-center justify-end gap-2 ${isDarkMode ? 'text-zinc-500' : 'text-gray-400'}`}>
                      <button
                        onClick={(e) => handleEdit(e, client)}
                        className={`p-2 rounded-lg transition-all
                            ${isDarkMode ? 'hover:text-blue-400 hover:bg-blue-500/10' : 'hover:text-blue-600 hover:bg-blue-50'}`}
                        title="Edit Client"
                      >
                        <Pencil size={16} />
                      </button>
                      <button
                        onClick={(e) => handleDelete(e, client.id)}
                        className={`p-2 rounded-lg transition-all
                            ${isDarkMode ? 'hover:text-red-400 hover:bg-red-500/10' : 'hover:text-red-600 hover:bg-red-50'}`}
                        title="Delete Client"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

              {clients.length === 0 && (
                <div className={`p-12 text-center text-sm ${isDarkMode ? 'text-zinc-600' : 'text-gray-500'}`}>
                  No clients found.
                </div>
              )}
            </div>
          </div>

        </div>

        {/* --- EDIT MODAL --- */}
        {isModalOpen && currentClient && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
            <div className={`rounded-2xl shadow-2xl w-full max-w-md p-6 relative animate-in fade-in zoom-in duration-200 border
              ${isDarkMode ? 'bg-[#18181b] border-zinc-800' : 'bg-white border-transparent'}`}>

              {/* Modal Header */}
              <div className="flex justify-between items-center mb-6">
                <h2 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  Edit Client Details
                </h2>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className={`transition-colors ${isDarkMode ? 'text-zinc-500 hover:text-zinc-300' : 'text-gray-400 hover:text-gray-600'}`}
                >
                  <X size={20} />
                </button>
              </div>

              {/* Edit Form */}
              <div className="space-y-5">

                {/* Client ID (Read Only) */}
                <div>
                  <label className={`block text-xs font-bold uppercase mb-1 ${isDarkMode ? 'text-zinc-500' : 'text-gray-500'}`}>
                    Client ID
                  </label>
                  <div className={`w-full px-3 py-2 border rounded-lg text-sm font-mono
                    ${isDarkMode
                      ? 'bg-zinc-900 border-zinc-800 text-zinc-500'
                      : 'bg-gray-100 border-gray-200 text-gray-500'}`}>
                    {currentClient.id}
                  </div>
                </div>

                {/* Name Input */}
                <div>
                  <label className={`block text-xs font-bold uppercase mb-1 ${isDarkMode ? 'text-zinc-500' : 'text-gray-500'}`}>
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={currentClient.name}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all
                      ${isDarkMode
                        ? 'bg-zinc-900 border-zinc-700 text-white placeholder:text-zinc-600'
                        : 'bg-white border-gray-200 text-gray-900'}`}
                    placeholder="Enter full name"
                  />
                </div>

                {/* Email Input */}
                <div>
                  <label className={`block text-xs font-bold uppercase mb-1 ${isDarkMode ? 'text-zinc-500' : 'text-gray-500'}`}>
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={currentClient.email}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all
                      ${isDarkMode
                        ? 'bg-zinc-900 border-zinc-700 text-white placeholder:text-zinc-600'
                        : 'bg-white border-gray-200 text-gray-900'}`}
                    placeholder="name@example.com"
                  />
                </div>

              </div>

              {/* Modal Actions */}
              <div className={`flex items-center justify-end gap-3 mt-8 pt-4 border-t 
                ${isDarkMode ? 'border-zinc-800' : 'border-gray-100'}`}>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors
                    ${isDarkMode ? 'text-zinc-400 hover:bg-zinc-800' : 'text-gray-600 hover:bg-gray-100'}`}
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className={`px-6 py-2 text-sm font-medium rounded-lg shadow-lg transition-all transform active:scale-95
                    ${isDarkMode
                      ? 'bg-zinc-100 text-zinc-900 hover:bg-white shadow-zinc-900/20'
                      : 'bg-gray-900 text-white hover:bg-black shadow-gray-200'}`}
                >
                  Save Changes
                </button>
              </div>

            </div>
          </div>
        )}

      </main>
    </div>
  );
}