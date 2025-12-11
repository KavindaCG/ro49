// Centralized service initialization
import ClientService from './ClientService';

// Get environment variables from Vite's import.meta.env
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://api.example.com';

// Create a singleton instance of the ClientService
const clientService = new ClientService(API_BASE_URL);

// Add services to a global object for easy access in development
if (import.meta.env.DEV) {
  window.__SERVICES__ = {
    clientService,
  };
  console.log('Services initialized in development mode');
}

// Export the service instance
export { clientService };

export default {
  clientService,
};
