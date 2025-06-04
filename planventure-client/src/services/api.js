const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

class Api {
  constructor() {
    this.baseUrl = BASE_URL;
  }

  async fetchWithAuth(endpoint, options = {}) {
    try {
      console.log(`Making request to: ${this.baseUrl}${endpoint}`);
      
      const headers = {
        'Content-Type': 'application/json',
        ...options.headers,
      };

      const token = localStorage.getItem('token');
      if (token) {
        headers.Authorization = `Bearer ${token}`;
      }

      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        ...options,
        headers,
        mode: 'cors',
        credentials: 'include'
      });

      // Log response details for debugging
      console.log(`Response status: ${response.status}`);
      console.log(`Response headers:`, Object.fromEntries(response.headers));

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({
          message: `HTTP error! status: ${response.status}`
        }));
        throw new Error(errorData.message);
      }

      return response.json();
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  }

  auth = {
    login: async (credentials) => {
      try {
        console.log('Attempting login with:', { email: credentials.email });
        return await this.fetchWithAuth('/auth/login', {
          method: 'POST',
          body: JSON.stringify(credentials)
        });
      } catch (error) {
        console.error('Login error:', error);
        throw error;
      }
    },

    register: async (userData) => {
      console.log('Attempting registration with:', { email: userData.email });
      return this.fetchWithAuth('/auth/register', {
        method: 'POST',
        body: JSON.stringify(userData)
      });
    }
  };

  trips = {
    getAll: () => this.fetchWithAuth('/api/trips'),
    getById: (id) => this.fetchWithAuth(`/api/trips/${id}`),
    create: (tripData) => this.fetchWithAuth('/api/trips', {
      method: 'POST',
      body: JSON.stringify(tripData),
    }),
    update: (id, tripData) => this.fetchWithAuth(`/api/trips/${id}`, {
      method: 'PUT',
      body: JSON.stringify(tripData)
    })
  };
}

export const api = new Api();