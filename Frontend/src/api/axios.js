import axios from 'axios';
import { logger } from '../lib/logger';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 20000,
});

// Attach admin token if available
api.interceptors.request.use(
  (config) => {
    try {
      const token = localStorage.getItem('adminToken') || localStorage.getItem('authToken');
      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (err) {
      logger.debug('Error attaching token to request', err);
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response handler: centralize error handling and handle 401
api.interceptors.response.use(
  (response) => response,
  (error) => {
    logger.error('API error', error?.response?.status, error?.message || error);
    if (error.response?.status === 401) {
      try {
        localStorage.removeItem('adminToken');
        localStorage.removeItem('authToken');
      } catch (e) {
        logger.debug('Error clearing tokens on 401', e);
      }
      // Optional: redirect to admin login
      if (typeof window !== 'undefined') {
        window.location.href = '/admin/login';
      }
    }
    return Promise.reject(error);
  }
);

export default api;
