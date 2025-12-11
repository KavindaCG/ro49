// src/pages/LoginSignup.jsx
import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';

export default function LoginSignup() {

  // Form state
  const [form, setForm] = useState({
    name: "",
    contact: "",
    address: "",
    email: "",
    broker: ""
  });

  // Message state
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  // Handle input change
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  // Handle submit
  const handleSubmit = () => {
    if (!form.name || !form.contact || !form.address || !form.email || !form.broker) {
      setError("⚠️ Please fill all fields!");
      setMessage(null);
      return;
    }

    setError(null);
    setMessage("✅ Client registration successful!");

    // Clear form after success
    setForm({
      name: "",
      contact: "",
      address: "",
      email: "",
      broker: ""
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 flex">
      <Sidebar />

      <main className="ml-64 flex-1 min-h-screen overflow-auto pt-20">
        <Header />

        <div className="max-w-4xl mx-auto px-6 py-8">

          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Client Registration</h1>
            <p className="text-gray-600">Client register new clients</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200">

            <div className="p-6 space-y-4">

              {/* Success Message */}
              {message && (
                <div className="p-3 bg-green-100 text-green-800 rounded-lg border border-green-300">
                  {message}
                </div>
              )}

              {/* Error Message */}
              {error && (
                <div className="p-3 bg-red-100 text-red-800 rounded-lg border border-red-300">
                  {error}
                </div>
              )}

              {/* FORM FIELDS */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Client Name
                </label>
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  type="text"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg 
                  focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                  placeholder="Name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Contact No.
                </label>
                <input
                  name="contact"
                  value={form.contact}
                  onChange={handleChange}
                  type="tel"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg 
                  focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                  placeholder="+94 xx xxx xxx"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Client Address
                </label>
                <input
                  name="address"
                  value={form.address}
                  onChange={handleChange}
                  type="text"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg 
                  focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                  placeholder="No.xx, Street, Town."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  type="email"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg 
                  focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                  placeholder="@gmail.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Broker Name
                </label>
                <input
                  name="broker"
                  value={form.broker}
                  onChange={handleChange}
                  type="text"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg 
                  focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                  placeholder="Broker name"
                />
              </div>

              <button
                onClick={handleSubmit}
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium 
                hover:bg-blue-700 transition-colors mt-4"
              >
                Create Client Account
              </button>

            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
