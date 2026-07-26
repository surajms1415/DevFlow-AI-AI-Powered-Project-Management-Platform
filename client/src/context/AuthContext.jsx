import { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api';
import { useToast } from '../components/ui/Toast';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { addToast } = useToast();

  useEffect(() => {
    const initAuth = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const res = await api.post('/auth/refresh-tokens');
          localStorage.setItem('token', res.data.tokens.access.token);
          setUser(res.data.user);
        } catch (error) {
          localStorage.removeItem('token');
        }
      }
      setIsLoading(false);
    };
    initAuth();
  }, []);

  const login = async (email, password) => {
    try {
      const res = await api.post('/auth/login', { email, password });
      localStorage.setItem('token', res.data.tokens.access.token);
      setUser(res.data.user);
      addToast({ title: 'Welcome back!', type: 'success' });
      return true;
    } catch (error) {
      addToast({ title: 'Login Failed', message: error.response?.data?.message || 'Check your credentials', type: 'error' });
      return false;
    }
  };

  const register = async (userData) => {
    try {
      const res = await api.post('/auth/register', userData);
      localStorage.setItem('token', res.data.tokens.access.token);
      setUser(res.data.user);
      addToast({ title: 'Account created!', type: 'success' });
      return true;
    } catch (error) {
      addToast({ title: 'Registration Failed', message: error.response?.data?.message || 'Please try again', type: 'error' });
      return false;
    }
  };

  const logout = async () => {
    try {
      await api.post('/auth/logout');
    } catch (e) {}
    localStorage.removeItem('token');
    setUser(null);
    addToast({ title: 'Logged out', type: 'info' });
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
