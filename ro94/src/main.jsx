import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';

// Initialize services
import './services/init';

class Root extends React.Component {
  render() {
    return (
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
  }
}

// Create root and render
const root = createRoot(document.getElementById('root'));
root.render(<Root />);

// Handle runtime errors
window.addEventListener('error', (event) => {
  console.error('Uncaught error:', event.error);
  // Here you can add error reporting (e.g., Sentry, LogRocket)
});

// Handle unhandled promise rejections
window.addEventListener('unhandledrejection', (event) => {
  console.error('Unhandled promise rejection:', event.reason);
  // Here you can add error reporting
});
