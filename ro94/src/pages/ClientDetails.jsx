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
  X // Added X icon for closing modal
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

  // 1. Navigate to Profile Page
  const handleViewProfile = (clientId) => {
    navigate(`/clients/${clientId}`);
  };

  // 2. Handle Delete
  const handleDelete = (e, clientId) => {
    e.stopPropagation(); 
    if (window.confirm("Are you sure you want to delete this client?")) {
      setClients((prev) => prev.filter((c) => c.id !== clientId));
      setSelectedClients((prev) => prev.filter((id) => id !== clientId));
    }
  };

  // 3. Handle Edit (Opens Modal)
  const handleEdit = (e, client) => {
    e.stopPropagation(); 
    setCurrentClient({ ...client }); // Create a copy to avoid direct mutation
    setIsModalOpen(true);
  };

  // 4. Handle Save (Updates State)
  const handleSave = () => {
    setClients(clients.map((c) => (c.id === currentClient.id ? currentClient : c)));
    setIsModalOpen(false);
    setCurrentClient(null);
  };

  // 5. Handle Input Change inside Modal
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
    <div className={`min-h-screen flex ${isDarkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-900'}`}>
      <Sidebar />

      <main className="ml-64 flex-1 min-h-screen overflow-auto pt-20">
        <Header />
      
      {/* Page Header */}
      <div className="flex flex-col gap-6 mb-8 px-8">
        <h1 className="text-3xl font-medium tracking-tight text-black">
          CLIENT DETAILS
        </h1>

        {/* Toolbar Area */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="Search for a Client" 
              className="w-full pl-10 pr-4 py-2.5 bg-gray-200/60 border-transparent focus:bg-white focus:ring-2 focus:ring-gray-200 rounded-full text-sm outline-none transition-all"
            />
          </div>

          <div className="flex items-center gap-6">
            <button className="flex items-center gap-2 text-gray-500 hover:text-gray-900 transition-colors text-sm font-medium">
              <span>Filter</span>
              <Filter size={18} />
            </button>
            <button className="flex items-center gap-2 text-gray-500 hover:text-gray-900 transition-colors text-sm font-medium">
              <span>Sort</span>
              <ArrowUpDown size={18} />
            </button>
            <button className="flex items-center gap-2 px-5 py-2.5 bg-gray-400 hover:bg-gray-800 text-white rounded-full text-sm font-medium transition-colors shadow-sm">
              <span>Add New</span>
              <Plus size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Table Section */}
      <div className="px-8 pb-12">
        <div className="w-full bg-white rounded-lg overflow-hidden border border-gray-100 shadow-sm">
          
          {/* Table Header */}
          <div className="grid grid-cols-12 gap-4 px-6 py-4 bg-gray-200/50 border-b border-gray-200 text-sm font-semibold text-gray-700">
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
          <div className="divide-y divide-gray-100">
            <AnimatePresence>
              {clients.map((client) => (
                <motion.div 
                  key={client.id}
                  layout
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -20, height: 0 }}
                  className={`grid grid-cols-12 gap-4 px-6 py-4 items-center hover:bg-gray-50 transition-colors group ${
                    selectedClients.includes(client.id) ? "bg-gray-50" : ""
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
                  <div className="col-span-2 text-sm text-gray-600 font-medium uppercase">
                    {client.id}
                  </div>

                  {/* Name & Avatar */}
                  <div 
                    onClick={() => handleViewProfile(client.id)}
                    className="col-span-4 flex items-center gap-3 cursor-pointer"
                  >
                    <div className="w-9 h-9 rounded-full bg-white border border-gray-200 flex items-center justify-center text-xs font-bold text-gray-700 shadow-sm overflow-hidden">
                      <img 
                          src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${client.id}`} 
                          alt="avatar"
                          className="w-full h-full object-cover"
                      />
                    </div>
                    <span className="text-sm font-medium text-gray-900 hover:text-blue-600 transition-colors">
                      {client.name}
                    </span>
                  </div>

                  {/* Email */}
                  <div className="col-span-3 text-sm text-gray-600 underline decoration-gray-300 underline-offset-4">
                    {client.email}
                  </div>

                  {/* Actions */}
                  <div className="col-span-2 flex items-center justify-end gap-3 text-gray-400">
                    <button 
                      onClick={(e) => handleEdit(e, client)}
                      className="p-1.5 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-all"
                      title="Edit Client"
                    >
                      <Pencil size={18} />
                    </button>
                    <button 
                      onClick={(e) => handleDelete(e, client.id)}
                      className="p-1.5 hover:text-red-600 hover:bg-red-50 rounded-md transition-all"
                      title="Delete Client"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
            
            {clients.length === 0 && (
              <div className="p-8 text-center text-gray-500 text-sm">
                No clients found.
              </div>
            )}
          </div>
        </div>
      </div>

      {/* --- EDIT MODAL --- */}
      {isModalOpen && currentClient && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md p-6 relative animate-in fade-in zoom-in duration-200">
            
            {/* Modal Header */}
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-900">Edit Client Details</h2>
              <button 
                onClick={() => setIsModalOpen(false)} 
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Edit Form */}
            <div className="space-y-5">
              
              {/* Client ID (Read Only) */}
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">
                    Client ID
                </label>
                <div className="w-full px-3 py-2 bg-gray-100 border border-gray-200 rounded-lg text-gray-500 text-sm font-mono">
                    {currentClient.id}
                </div>
              </div>

              {/* Name Input */}
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">
                    Full Name
                </label>
                <input 
                  type="text" 
                  name="name" 
                  value={currentClient.name} 
                  onChange={handleInputChange} 
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-gray-900 transition-all"
                  placeholder="Enter full name"
                />
              </div>

              {/* Email Input */}
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">
                    Email Address
                </label>
                <input 
                  type="email" 
                  name="email" 
                  value={currentClient.email} 
                  onChange={handleInputChange} 
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-gray-900 transition-all"
                  placeholder="name@example.com"
                />
              </div>

            </div>

            {/* Modal Actions */}
            <div className="flex items-center justify-end gap-3 mt-8 pt-4 border-t border-gray-100">
              <button 
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={handleSave}
                className="px-6 py-2 text-sm font-medium text-white bg-gray-900 hover:bg-black rounded-lg shadow-lg shadow-gray-200 transition-all transform active:scale-95"
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