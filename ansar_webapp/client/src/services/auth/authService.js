import axios from 'axios';
import { secureTokenService } from './secureTokenService';
import { store } from '../../store';
import { loginSuccess, loginFailure, logoutSuccess } from '../../store/slices/authSlice';

/**
 * AuthService handles all authentication-related operations
 */
class AuthService {
  constructor() {
    this.baseURL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';
  }

  /**
   * Login user with email and password
   * @param {Object} credentials - User credentials
   * @param {string} credentials.email - User email
   * @param {string} credentials.password - User password
   * @returns {Promise<Object>} User data
   */
  async login(credentials) {
    try {
      const response = await axios.post(`${this.baseURL}/auth/login`, credentials);
      const { token, user } = response.data;

      // Set token in HTTP-only cookie
      await secureTokenService.setToken(token);

      // Update Redux store
      store.dispatch(loginSuccess(user));

      return user;
    } catch (error) {
      store.dispatch(loginFailure(error.response?.data?.message || 'Login failed'));
      throw error;
    }
  }

  /**
   * Login with Google OAuth
   * @param {string} credential - Google OAuth credential
   * @returns {Promise<Object>} User data
   */
  async loginWithGoogle(credential) {
    try {
      const response = await axios.post(`${this.baseURL}/auth/google`, { credential });
      const { token, user } = response.data;

      await secureTokenService.setToken(token);
      store.dispatch(loginSuccess(user));

      return user;
    } catch (error) {
      store.dispatch(loginFailure(error.response?.data?.message || 'Google login failed'));
      throw error;
    }
  }

  /**
   * Register new user
   * @param {Object} userData - User registration data
   * @returns {Promise<Object>} User data
   */
  async register(userData) {
    try {
      const response = await axios.post(`${this.baseURL}/auth/register`, userData);
      const { token, user } = response.data;

      await secureTokenService.setToken(token);
      store.dispatch(loginSuccess(user));

      return user;
    } catch (error) {
      store.dispatch(loginFailure(error.response?.data?.message || 'Registration failed'));
      throw error;
    }
  }

  /**
   * Logout current user
   * @returns {Promise<void>}
   */
  async logout() {
    try {
      // Clear token cookie
      await secureTokenService.clearToken();

      // Clear server-side session
      await axios.post(`${this.baseURL}/auth/logout`);

      // Update Redux store
      store.dispatch(logoutSuccess());
    } catch (error) {
      console.error('Logout error:', error);
      // Still clear local state even if server request fails
      store.dispatch(logoutSuccess());
    }
  }

  /**
   * Request password reset
   * @param {string} email - User email
   * @returns {Promise<Object>} Response data
   */
  async requestPasswordReset(email) {
    const response = await axios.post(`${this.baseURL}/auth/forgot-password`, { email });
    return response.data;
  }

  /**
   * Reset password with token
   * @param {string} token - Reset token
   * @param {string} newPassword - New password
   * @returns {Promise<Object>} Response data
   */
  async resetPassword(token, newPassword) {
    const response = await axios.post(`${this.baseURL}/auth/reset-password`, {
      token,
      password: newPassword
    });
    return response.data;
  }

  /**
   * Change password for logged in user
   * @param {string} currentPassword - Current password
   * @param {string} newPassword - New password
   * @returns {Promise<Object>} Response data
   */
  async changePassword(currentPassword, newPassword) {
    const response = await axios.post(`${this.baseURL}/auth/change-password`, {
      currentPassword,
      newPassword
    });
    return response.data;
  }

  /**
   * Initialize auth service
   */
  initialize() {
    // Setup axios interceptors for token refresh
    secureTokenService.setupInterceptors();
  }
}

export const authService = new AuthService();