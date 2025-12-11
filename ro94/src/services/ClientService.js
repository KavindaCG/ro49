class ClientService {
  constructor(apiBaseUrl) {
    this.apiBaseUrl = apiBaseUrl || 'https://api.example.com';
  }

  async getAllClients() {
    try {
      const response = await fetch(`${this.apiBaseUrl}/clients`);
      if (!response.ok) throw new Error('Failed to fetch clients');
      return await response.json();
    } catch (error) {
      console.error('Error fetching clients:', error);
      throw error;
    }
  }

  // Add more client-related methods here
}

export default ClientService;
