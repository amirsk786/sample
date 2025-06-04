import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

class Api {
  constructor() {
    this.axios = axiosInstance;
    
    // Add response interceptor for handling token expiration
    this.axios.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) {
          localStorage.removeItem('token');
          window.location.href = '/login';
        }
        return Promise.reject(error);
      }
    );
  }

  setAuthToken(token) {
    if (token) {
      this.axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
      delete this.axios.defaults.headers.common['Authorization'];
    }
  }

  auth = {
    login: async (credentials) => {
      const response = await this.axios.post('/auth/login', credentials);
      return response.data;
    },
    
    register: async (userData) => {
      const response = await this.axios.post('/auth/register', userData);
      return response.data;
    },
    
    verifyToken: async () => {
      const response = await this.axios.get('/auth/verify');
      return response.data;
    }
  };
}

export const api = new Api();