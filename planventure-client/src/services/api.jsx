const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const handleResponse = async (response) => {
  if (response.status === 401) {
    localStorage.removeItem('token');
    window.location.href = '/login';
    throw new Error('Session expired. Please login again.');
  }

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error || 'Request failed');
  }

  return data;
};

export const api = {
  auth: {
    login: async (credentials) => {
      const response = await fetch(`${BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });
      return handleResponse(response);
    },

    register: async (userData) => {
      const response = await fetch(`${BASE_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
      return handleResponse(response);
    },
  }
};

export default api;