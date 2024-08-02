// src/services/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api/v1', // Update with your backend URL
  withCredentials: true,
});

export default api;
