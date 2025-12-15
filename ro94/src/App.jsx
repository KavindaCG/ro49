import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// --- Imports ---
import Sidebar from './components/Sidebar';
import Dashboard from './pages/AdminDashboard';
import AllApplications from './pages/AllApplications';
import AllClients from './pages/AllClients';
import AddClient from './pages/AddClient';
import ClientDetails from './pages/ClientDetails';
import ClientProfile from './pages/ClientProfile';
import BrokerManagement from './pages/BrokerManagement';
import BrokerDetails from './pages/BrokerDetails';
import Finance from './pages/Finance';
import LoginSignup from './pages/LoginSignup';
import ApplicationDetails from './pages/ApplicationDetails';
import Settings from './pages/Settings';
import ClientDashboard from './pages/ClientDashboard';
import ClientApplicationDetails from './pages/ClientApplicationDetails';
import { ThemeProvider } from './contexts/ThemeContext';
import { AuthProvider, useAuth } from './contexts/AuthContext';

// Error Boundary
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

// --- Protection Components ---

// 1. PrivateRoute: Checks Login AND Role
const PrivateRoute = ({ children, allowedRoles }) => {
  const { currentUser, userRole } = useAuth();

  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  // If roles are specified, check if user has permission
  if (allowedRoles && (!userRole || !allowedRoles.includes(userRole))) {
    // Redirect to the dashboard appropriate for their role
    return <Navigate to={userRole === 'admin' ? '/dashboard' : '/client'} replace />;
  }

  return children;
};

// 3. Root Dispatcher Component
const RootRedirector = () => {
  const { userRole } = useAuth();
  if (userRole === 'admin') return <Navigate to="/dashboard" replace />;
  if (userRole === 'client') return <Navigate to="/client" replace />;
  return null; // or loading
};

// 2. Admin Layout
const AdminLayout = ({ children }) => {
  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
      <Sidebar />
      <div className="flex-1">
        {children}
      </div>
    </div>
  );
};

// 3. Client Layout
const ClientLayout = ({ children }) => {
  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
      <Sidebar />
      <div className="flex-1">
        {children}
      </div>
    </div>
  );
};

// --- Main App ---

const App = () => {
  return (
    <ThemeProvider>
      <ErrorBoundary>
        <BrowserRouter>
          <AuthProvider>
            <Routes>
              {/* Public Route */}
              <Route path="/login" element={<LoginSignup />} />

              {/* Root Dispatcher: Decides where to go based on role */}
              <Route path="/" element={
                <PrivateRoute>
                  <RootRedirector />
                </PrivateRoute>
              } />

              {/* === ADMIN ROUTES === */}
              <Route path="/*" element={
                <PrivateRoute allowedRoles={['admin']}>
                  <AdminLayout>
                    <Routes>
                      {/* Default Route is handled by RootDispatcher now */}
                      <Route path="/dashboard" element={<Dashboard />} />
                      <Route path="/applications" element={<AllApplications />} />
                      <Route path="/ApplicationDetails/:id" element={<ApplicationDetails />} />
                      <Route path="/clients" element={<AllClients />} />
                      <Route path="/add-client" element={<AddClient />} />
                      <Route path="/client-details" element={<ClientDetails />} />
                      <Route path="/clients/:id" element={<ClientProfile />} />
                      <Route path="/brokers" element={<BrokerManagement />} />
                      <Route path="/brokers/:id" element={<BrokerDetails />} />
                      <Route path="/finance" element={<Finance />} />
                      <Route path="/Settings" element={<Settings />} />
                    </Routes>
                  </AdminLayout>
                </PrivateRoute>
              } />

              {/* === CLIENT ROUTES === */}
              <Route path="/client/*" element={
                <PrivateRoute allowedRoles={['client']}>
                  <ClientLayout>
                    <Routes>
                      {/* Default to client dashboard */}
                      <Route path="/" element={<ClientDashboard />} />
                      <Route path="/applications/:id" element={<ClientApplicationDetails />} />
                      <Route path="/settings" element={<Settings />} />
                    </Routes>
                  </ClientLayout>
                </PrivateRoute>
              } />

            </Routes>
          </AuthProvider>
        </BrowserRouter>
      </ErrorBoundary>
    </ThemeProvider>
  );
}

export default App;