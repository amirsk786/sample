import { createContext, useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { api } from '../services/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initializeAuth = async () => {
      const storedToken = localStorage.getItem('token');
      if (storedToken) {
        try {
          // Set token in API instance
          api.setAuthToken(storedToken);
          // Verify token is still valid
          await api.auth.verifyToken();
          setToken(storedToken);
          setIsAuthenticated(true);
        } catch (error) {
          console.error('Token validation failed:', error);
          localStorage.removeItem('token');
        }
      }
      setLoading(false);
    };

    initializeAuth();
  }, []);

  const login = async (credentials) => {
    const response = await api.auth.login(credentials);
    const newToken = response.token;
    
    // Set token in localStorage and API instance
    localStorage.setItem('token', newToken);
    api.setAuthToken(newToken);
    
    setToken(newToken);
    setIsAuthenticated(true);
    
    return response;
  };

  const logout = () => {
    localStorage.removeItem('token');
    api.setAuthToken(null);
    setToken(null);
    setIsAuthenticated(false);
  };

  const value = {
    isAuthenticated,
    token,
    loading,
    login,
    logout
  };

  if (loading) {
    return null;
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};