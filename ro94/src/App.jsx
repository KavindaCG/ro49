import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// --- Imports ---
import Sidebar from './components/Sidebar'; 
import Dashboard from './pages/AdminDashboard';
import AllApplications from './pages/AllApplications'; // Imported New Page
import AllClients from './pages/AllClients';
import AddClient from './pages/AddClient'; // Imported New Page
import ClientDetails from './pages/ClientDetails'; 
import ClientProfile from './pages/ClientProfile';
import BrokerManagement from './pages/BrokerManagement'; // Imported New Page
import BrokerDetails from './pages/BrokerDetails';
import Finance from './pages/Finance';
import LoginSignup from './pages/LoginSignup';
import ApplicationDetails from './pages/ApplicationDetails';
import Settings from './pages/Settings';
import ClientDashboard from './pages/ClientDashboard';
import ClientApplicationDetails from './pages/ClientApplicationDetails';
import { ThemeProvider } from './contexts/ThemeContext';

// Error Boundary (Unchanged)
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(error) { return { hasError: true, error }; }
  componentDidCatch(error, errorInfo) { console.error(error, errorInfo); }
  render() {
    if (this.state.hasError) return <div className="p-4 text-red-500">Error: {this.state.error?.message}</div>;
    return this.props.children;
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isAuthenticated: true };
  }

  render() {
    const { isAuthenticated } = this.state;

    if (!isAuthenticated) return <LoginSignup />;

    return (
      <ThemeProvider>
        <ErrorBoundary>
          <BrowserRouter>
            {/* Main Layout Container */}
            <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
              
              {/* SIDEBAR */}
              <Sidebar />

              {/* CONTENT AREA */}
              <div className="flex-1">
                <Routes>
                  {/* Default Redirect */}
                  <Route path="/" element={<Navigate to="/dashboard" replace />} />
                  
                  {/* Dashboard */}
                  <Route path="/dashboard" element={<Dashboard />} />

                  {/* Client-facing Dashboard (no auth restrictions) */}
                  <Route path="/client" element={<ClientDashboard />} />
                  <Route path="/client/applications/:id" element={<ClientApplicationDetails />} />

                  {/* Applications Routes */}
                  <Route path="/applications" element={<AllApplications />} />
                  <Route path="/ApplicationDetails/:id" element={<ApplicationDetails />} />

                  {/* Client Routes */}
                  <Route path="/clients" element={<AllClients />} />
                  <Route path="/add-client" element={<AddClient />} />
                  <Route path="/client-details" element={<ClientDetails />} />
                  {/* Detailed client profile */}
                  <Route path="/clients/:id" element={<ClientProfile />} />

                  {/* Broker Routes */}
                  <Route path="/brokers" element={<BrokerManagement />} />
                  <Route path="/brokers/:id" element={<BrokerDetails />} />

                  {/* Finance Routes */}
                  <Route path="/finance" element={<Finance />} />
                  
                  {/* Other Routes */}
                  <Route path="/Settings" element={<Settings />} />
                  <Route path="/login" element={<LoginSignup />} />
                </Routes>
              </div>
            </div>
          </BrowserRouter>
        </ErrorBoundary>
      </ThemeProvider>
    );
  }
}

export default App;