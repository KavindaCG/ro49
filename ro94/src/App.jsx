import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import AllClients from './pages/AllClients';
import Finance from './pages/Finance';
import LoginSignup from './pages/LoginSignup';
import ClientDetails from './pages/ClientDetails';
import ApplicationDetails from './pages/ApplicationDetails';
import Settings from './pages/Settings';
import { ThemeProvider } from './contexts/ThemeContext';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-4 text-red-600 bg-white dark:bg-gray-900 dark:text-red-400">
          <h2>Something went wrong</h2>
          <p>{this.state.error?.message}</p>
        </div>
      );
    }

    return this.props.children;
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuthenticated: true, // This should be managed by your auth service
    };
  }

  render() {
    const { isAuthenticated } = this.state;

    if (!isAuthenticated) {
      return <Navigate to="/login" replace />;
    }

    return (
      <ThemeProvider>
        <ErrorBoundary>
          <BrowserRouter>
            <div className="app-container min-h-screen bg-gray-50 dark:bg-gray-900">
              <Routes>
                <Route path="/" element={<Navigate to="/dashboard" replace />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/clients" element={<AllClients />} />
                <Route path="/finance" element={<Finance />} />
                <Route path="/login" element={<LoginSignup />} />
                <Route path="/client/:id" element={<ClientDetails />} />
                <Route path="/ApplicationDetails/:id" element={<ApplicationDetails />} />
                <Route path="/Settings" element={<Settings />} />
              </Routes>
            </div>
          </BrowserRouter>
        </ErrorBoundary>
      </ThemeProvider>
    );
  }
}

export default App;