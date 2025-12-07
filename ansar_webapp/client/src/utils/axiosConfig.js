import axios from 'axios';

// Base URL for API requests
const baseURL = process.env.REACT_APP_API_URL || '/api';

// Create axios instance with default config
const axiosInstance = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Get auth token from localStorage (from user object, token, or authToken key)
export const getAuthToken = () => {
  // Try to get token from user object
  const user = localStorage.getItem('user');
  if (user) {
    try {
      const parsed = JSON.parse(user);
      if (parsed.token) return parsed.token;
    } catch (e) {}
  }
  // Fallback to token key
  const token = localStorage.getItem('token');
  if (token) return token;
  // Fallback to authToken key (used by some login flows)
  const authToken = localStorage.getItem('authToken');
  if (authToken) return authToken;
  return null;
};

// Set auth token for future requests
export const setAuthToken = (token) => {
  if (token) {
    localStorage.setItem('token', token);
    axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    localStorage.removeItem('token');
    delete axiosInstance.defaults.headers.common['Authorization'];
  }
};

// Add request interceptor to include auth token
axiosInstance.interceptors.request.use(
  (config) => {
    const token = getAuthToken();
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Add response interceptor to handle common errors
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle 401 Unauthorized errors (token expired or invalid)
    if (error.response && error.response.status === 401) {
      // Only redirect if user is not logged in
      const user = localStorage.getItem('user');
      if (!user) {
        localStorage.removeItem('token');
        if (window.location.pathname !== '/login' && window.location.pathname !== '/admin/login') {
          window.location.href = '/login';
        }
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;