// src/context/AuthContext.js
import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../services/api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchUser = async () => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        const response = await axios.get('/auth/verify');
        navigate('/dashboard');
        setUser(response.data);
      } catch (error) {
        console.error('User fetch failed', error);
        localStorage.removeItem('token');
      }
    }
    setLoading(false);
  };
  useEffect(() => {

    fetchUser();
  }, []);

  const login = async (email, password) => {
    try {
      const response = await axios.post('/auth/login', { email, password });
      const token = response.data.token;
      localStorage.setItem('token', token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      const verifyResponse = await axios.get('/auth/verify');
      setUser(verifyResponse.data);
      fetchUser();
      navigate('/dashboard');
    } catch (error) {
      console.error('Login failed', error.response ? error.response.data : error.message);
    }
  };

  const register = async (name, email, password) => {
    try {
      await axios.post('/auth/register', { name, email, password });
      console.log('User registered successfully');
      navigate('/login');
    } catch (error) {
      console.error('Registration failed', error.response ? error.response.data : error.message);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    delete axios.defaults.headers.common['Authorization'];
    setUser(null);
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
