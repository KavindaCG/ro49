import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import { useTheme } from '../contexts/ThemeContext';

// --- MODAL COMPONENT ---
function AddClientModal({ isOpen, onClose }) {
  // Form State
  const [formData, setFormData] = useState({
    fullName: '',
    registerDate: new Date().toISOString().slice(0, 16),
    idType: 'id',
    idNumber: '',
    address: '',
    phone: '',
    whatsapp: '',
    targetCountry: '',
    companyName: '',
    jobPosition: '',
    isMarried: false,
  });

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  return (
    // OVERLAY: Fixed position, High Z-Index to cover sidebar, Black opacity, Blur effect
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fade-in">
      
      {/* MODAL CONTENT CONTAINER */}
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto flex flex-col relative animate-scale-up">
        
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-100 sticky top-0 bg-white z-10">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Add New Client</h2>
            <p className="text-sm text-gray-500 mt-1">Create a comprehensive client profile</p>
          </div>
          <button 
            onClick={onClose} 
            className="p-2 rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Scrollable Form Content */}
        <div className="p-6 space-y-8 flex-1 overflow-y-auto custom-scrollbar">
          
          {/* Section 1: Personal Information */}
          <section>
            <div className="flex items-center gap-2 mb-4">
              <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
              <h3 className="text-lg font-semibold text-gray-800">Personal Information</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Full Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name <span className="text-red-500">*</span></label>
                <div className="relative">
                  <span className="absolute left-3 top-3 text-gray-400">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
                  </span>
                  <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} placeholder="Enter full legal name" className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition" />
                </div>
              </div>

              {/* Register Date */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Register Date & Time <span className="text-red-500">*</span></label>
                <div className="relative">
                  <span className="absolute left-3 top-3 text-gray-400">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                  </span>
                  <input type="datetime-local" name="registerDate" value={formData.registerDate} onChange={handleChange} className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition" />
                </div>
              </div>

              {/* Identification Type */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Identification Type <span className="text-red-500">*</span></label>
                <div className="flex gap-4">
                  <label className={`flex items-center gap-2 px-4 py-2 rounded-lg border cursor-pointer transition ${formData.idType === 'id' ? 'border-blue-500 bg-blue-50 text-blue-700' : 'border-gray-200 text-gray-600'}`}>
                    <input type="radio" name="idType" value="id" checked={formData.idType === 'id'} onChange={handleChange} className="text-blue-600 focus:ring-blue-500" />
                    <span>ID Number</span>
                  </label>
                  <label className={`flex items-center gap-2 px-4 py-2 rounded-lg border cursor-pointer transition ${formData.idType === 'passport' ? 'border-blue-500 bg-blue-50 text-blue-700' : 'border-gray-200 text-gray-600'}`}>
                    <input type="radio" name="idType" value="passport" checked={formData.idType === 'passport'} onChange={handleChange} className="text-blue-600 focus:ring-blue-500" />
                    <span>Passport</span>
                  </label>
                </div>
              </div>

              {/* ID Number */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">ID Number <span className="text-red-500">*</span></label>
                <div className="relative">
                  <span className="absolute left-3 top-3 text-gray-400">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"></path></svg>
                  </span>
                  <input type="text" name="idNumber" value={formData.idNumber} onChange={handleChange} placeholder="123456789V" className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition" />
                </div>
              </div>

              {/* Residential Address */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Residential Address <span className="text-red-500">*</span></label>
                <div className="relative">
                  <span className="absolute left-3 top-3 text-gray-400">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                  </span>
                  <input type="text" name="address" value={formData.address} onChange={handleChange} placeholder="Street address, City, Province" className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition" />
                </div>
              </div>
            </div>
          </section>

          <hr className="border-gray-100" />

          {/* Section 2: Contact Information */}
          <section>
            <div className="flex items-center gap-2 mb-4">
              <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
              <h3 className="text-lg font-semibold text-gray-800">Contact Information</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Phone */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number <span className="text-red-500">*</span></label>
                <div className="relative">
                  <span className="absolute left-3 top-3 text-gray-400">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
                  </span>
                  <input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="+94 77 123 4567" className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition" />
                </div>
              </div>
              {/* WhatsApp */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">WhatsApp Number <span className="text-red-500">*</span></label>
                <div className="relative">
                  <span className="absolute left-3 top-3 text-gray-400">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path></svg>
                  </span>
                  <input type="tel" name="whatsapp" value={formData.whatsapp} onChange={handleChange} placeholder="+94 77 123 4567" className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition" />
                </div>
              </div>
            </div>
          </section>

          <hr className="border-gray-100" />

          {/* Section 3: Employment Details */}
          <section>
            <div className="flex items-center gap-2 mb-4">
              <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
              <h3 className="text-lg font-semibold text-gray-800">Employment Details</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Target Country */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Target Country <span className="text-red-500">*</span></label>
                <div className="relative">
                  <span className="absolute left-3 top-3 text-gray-400">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                  </span>
                  <input type="text" name="targetCountry" value={formData.targetCountry} onChange={handleChange} placeholder="UAE, Saudi Arabia, Qatar..." className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition" />
                </div>
              </div>
              {/* Company Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Company Name <span className="text-red-500">*</span></label>
                <div className="relative">
                  <span className="absolute left-3 top-3 text-gray-400">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path></svg>
                  </span>
                  <input type="text" name="companyName" value={formData.companyName} onChange={handleChange} placeholder="Enter company name" className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition" />
                </div>
              </div>
              {/* Job Position */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Job Position <span className="text-red-500">*</span></label>
                <div className="relative">
                  <span className="absolute left-3 top-3 text-gray-400">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                  </span>
                  <input type="text" name="jobPosition" value={formData.jobPosition} onChange={handleChange} placeholder="Driver, Cook, Helper, etc." className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition" />
                </div>
              </div>
            </div>
          </section>

          <hr className="border-gray-100" />

          {/* Section 4: Marital Status */}
          <section>
            <div className="flex items-center gap-2 mb-4">
              <svg className="w-5 h-5 text-pink-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>
              <h3 className="text-lg font-semibold text-gray-800">Marital Status</h3>
            </div>
            
            <div className="border border-gray-200 rounded-lg p-4">
              <label className="flex items-center gap-3 cursor-pointer">
                <input type="checkbox" name="isMarried" checked={formData.isMarried} onChange={handleChange} className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500 border-gray-300" />
                <span className="text-gray-700 font-medium">Client is married</span>
              </label>
            </div>
          </section>

        </div>

        {/* Footer Actions */}
        <div className="p-6 border-t border-gray-100 flex justify-end gap-3 bg-gray-50 rounded-b-xl sticky bottom-0 bg-gray-50 z-10">
          <button onClick={onClose} className="px-6 py-2.5 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-100 transition">
            Cancel
          </button>
          <button className="px-6 py-2.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition flex items-center gap-2 shadow-sm shadow-blue-200">
             <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path></svg>
             Add Client
          </button>
        </div>

      </div>
    </div>
  );
}

// --- PAGE COMPONENT ---
export default function AddClient() {
  const navigate = useNavigate();
  const { isDarkMode } = useTheme();

  const handleClose = () => {
    navigate('/clients');
  };

  return (
    <div className={`min-h-screen flex ${isDarkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-900'}`}>
      <Sidebar />

      <main className="ml-64 flex-1 min-h-screen overflow-auto pt-20">
        <Header />
        
        {/* Render modal */}
        <AddClientModal isOpen={true} onClose={handleClose} />
      </main>
    </div>
  );
}