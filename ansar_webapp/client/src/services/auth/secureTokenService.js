import axios from 'axios';

/**
 * SecureTokenService handles token management using HTTP-only cookies
 * for improved security over localStorage
 */
class SecureTokenService {
  constructor() {
    this.baseURL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';
  }

  /**
   * Set authentication token via HTTP-only cookie
   * @param {string} token - JWT token
   * @returns {Promise} Response from token endpoint
   */
  async setToken(token) {
    try {
      const response = await axios.post(`${this.baseURL}/auth/set-token`, { token });
      return response.data;
    } catch (error) {
      console.error('Error setting token:', error);
      throw error;
    }
  }

  /**
   * Get current session status
   * Token is automatically included in request via HTTP-only cookie
   * @returns {Promise<boolean>} Whether session is valid
   */
  async validateSession() {
    try {
      const response = await axios.get(`${this.baseURL}/auth/validate-session`);
      return response.data.valid;
    } catch (error) {
      console.error('Error validating session:', error);
      return false;
    }
  }

  /**
   * Clear authentication token cookie
   * @returns {Promise} Response from clear token endpoint
   */
  async clearToken() {
    try {
      const response = await axios.post(`${this.baseURL}/auth/clear-token`);
      return response.data;
    } catch (error) {
      console.error('Error clearing token:', error);
      throw error;
    }
  }

  /**
   * Refresh the current token
   * @returns {Promise<string>} New token
   */
  async refreshToken() {
    try {
      const response = await axios.post(`${this.baseURL}/auth/refresh-token`);
      return response.data.token;
    } catch (error) {
      console.error('Error refreshing token:', error);
      throw error;
    }
  }

  /**
   * Configure axios interceptors for token refresh
   */
  setupInterceptors() {
    // Response interceptor
    axios.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;

        // If error is 401 and we haven't already tried refreshing
        if (error.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;

          try {
            // Attempt token refresh
            await this.refreshToken();
            
            // Retry original request
            return axios(originalRequest);
          } catch (refreshError) {
            // If refresh fails, clear token and throw error
            await this.clearToken();
            throw refreshError;
          }
        }

        return Promise.reject(error);
      }
    );
  }
}

export const secureTokenService = new SecureTokenService();