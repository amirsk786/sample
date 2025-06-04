const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

class Api {
  constructor() {
    this.baseUrl = BASE_URL;
  }

  async fetchWithAuth(endpoint, options = {}) {
    const token = localStorage.getItem('token');
    const headers = {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    };

    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      ...options,
      headers,
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({
        message: 'An error occurred'
      }));
      throw new Error(error.message || 'Request failed');
    }

    return response.json();
  }

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
    }),
    updateAccommodation: (tripId, accommodationData) => 
      api.fetchWithAuth(`/api/trips/${tripId}/accommodation`, {
        method: 'PUT',
        body: JSON.stringify(accommodationData)
      }),
    
    updateTransportation: (tripId, transportationData) => 
      api.fetchWithAuth(`/api/trips/${tripId}/transportation`, {
        method: 'PUT',
        body: JSON.stringify(transportationData)
      }),
  };
}

export const api = new Api();