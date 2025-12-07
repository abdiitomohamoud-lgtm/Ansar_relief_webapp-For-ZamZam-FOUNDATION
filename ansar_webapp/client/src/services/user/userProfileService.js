import axios from 'axios';
import { store } from '../../store';
import { 
  updateProfile, 
  updatePreferences, 
  setLoading, 
  setError 
} from '../../store/slices/profileSlice';

/**
 * UserProfileService handles all user profile operations
 */
class UserProfileService {
  constructor() {
    this.baseURL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';
  }

  /**
   * Get current user's profile
   * @returns {Promise<Object>} User profile data
   */
  async getProfile() {
    try {
      store.dispatch(setLoading(true));
      const response = await axios.get(`${this.baseURL}/user/profile`);
      store.dispatch(updateProfile(response.data));
      return response.data;
    } catch (error) {
      store.dispatch(setError(error.response?.data?.message || 'Failed to load profile'));
      throw error;
    } finally {
      store.dispatch(setLoading(false));
    }
  }

  /**
   * Update user profile
   * @param {Object} updates - Profile updates
   * @returns {Promise<Object>} Updated profile data
   */
  async updateProfile(updates) {
    try {
      store.dispatch(setLoading(true));
      
      // Optimistic update
      const currentProfile = store.getState().profile.data;
      store.dispatch(updateProfile({ ...currentProfile, ...updates }));

      const response = await axios.put(`${this.baseURL}/user/profile`, updates);
      store.dispatch(updateProfile(response.data));
      return response.data;
    } catch (error) {
      // Rollback on failure
      store.dispatch(updateProfile(store.getState().profile.data));
      store.dispatch(setError(error.response?.data?.message || 'Failed to update profile'));
      throw error;
    } finally {
      store.dispatch(setLoading(false));
    }
  }

  /**
   * Update user preferences
   * @param {Object} preferences - User preferences
   * @returns {Promise<Object>} Updated preferences
   */
  async updatePreferences(preferences) {
    try {
      store.dispatch(setLoading(true));
      
      // Optimistic update
      const currentPreferences = store.getState().profile.preferences;
      store.dispatch(updatePreferences({ ...currentPreferences, ...preferences }));

      const response = await axios.put(`${this.baseURL}/user/preferences`, preferences);
      store.dispatch(updatePreferences(response.data));
      return response.data;
    } catch (error) {
      // Rollback on failure
      store.dispatch(updatePreferences(store.getState().profile.preferences));
      store.dispatch(setError(error.response?.data?.message || 'Failed to update preferences'));
      throw error;
    } finally {
      store.dispatch(setLoading(false));
    }
  }

  /**
   * Upload profile image
   * @param {File} imageFile - Image file to upload
   * @returns {Promise<Object>} Updated profile data
   */
  async uploadProfileImage(imageFile) {
    try {
      store.dispatch(setLoading(true));
      
      const formData = new FormData();
      formData.append('image', imageFile);

      const response = await axios.post(`${this.baseURL}/user/profile/image`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      store.dispatch(updateProfile(response.data));
      return response.data;
    } catch (error) {
      store.dispatch(setError(error.response?.data?.message || 'Failed to upload image'));
      throw error;
    } finally {
      store.dispatch(setLoading(false));
    }
  }

  /**
   * Delete profile image
   * @returns {Promise<Object>} Updated profile data
   */
  async deleteProfileImage() {
    try {
      store.dispatch(setLoading(true));
      const response = await axios.delete(`${this.baseURL}/user/profile/image`);
      store.dispatch(updateProfile(response.data));
      return response.data;
    } catch (error) {
      store.dispatch(setError(error.response?.data?.message || 'Failed to delete image'));
      throw error;
    } finally {
      store.dispatch(setLoading(false));
    }
  }

  /**
   * Get user activity history
   * @param {Object} params - Query parameters
   * @param {number} params.page - Page number
   * @param {number} params.limit - Items per page
   * @returns {Promise<Object>} Activity history data
   */
  async getActivityHistory(params = { page: 1, limit: 10 }) {
    try {
      const response = await axios.get(`${this.baseURL}/user/activity`, { params });
      return response.data;
    } catch (error) {
      console.error('Failed to fetch activity history:', error);
      throw error;
    }
  }

  /**
   * Initialize profile service
   * Loads initial profile data
   */
  async initialize() {
    try {
      await this.getProfile();
    } catch (error) {
      console.error('Failed to initialize profile:', error);
    }
  }
}

export const userProfileService = new UserProfileService();