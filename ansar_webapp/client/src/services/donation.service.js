import axios from 'axios';
import axiosInstance from '../utils/axiosConfig';

/**
 * Service for donation related API calls
 */
const donationService = {
  /**
   * Get all donations (admin only)
   * @param {Object} params - Query parameters
   * @returns {Promise} - API response
   */
  getDonations: (params = {}) => {
    return axiosInstance.get('/admin/donations', { params });
  },

  /**
   * Get a specific donation by ID
   * @param {string} id - Donation ID
   * @returns {Promise} - API response
   */
  getDonationById: (id) => {
    return axiosInstance.get(`/admin/donations/${id}`);
  },

  /**
   * Get donations for the logged in user
   * @returns {Promise} - API response
   */
  getUserDonations: () => {
    return axiosInstance.get('/user/donations');
  },

  /**
   * Create a new donation
   * @param {Object} donationData - Donation data
   * @returns {Promise} - API response
   */
  createDonation: (donationData) => {
    return axiosInstance.post('/donations', donationData);
  },

  /**
   * Process a payment for a donation
   * @param {Object} paymentData - Payment data
   * @returns {Promise} - API response
   */
  processPayment: (paymentData) => {
    return axiosInstance.post('/donations/payment', paymentData);
  },

  /**
   * Update donation status (admin only)
   * @param {string} id - Donation ID
   * @param {Object} updateData - Update data
   * @returns {Promise} - API response
   */
  updateDonation: (id, updateData) => {
    return axiosInstance.put(`/admin/donations/${id}`, updateData);
  },

  /**
   * Delete a donation (admin only)
   * @param {string} id - Donation ID
   * @returns {Promise} - API response
   */
  deleteDonation: (id) => {
    return axiosInstance.delete(`/admin/donations/${id}`);
  },

  /**
   * Get donation statistics
   * @returns {Promise} - API response
   */
  getDonationStats: () => {
    return axiosInstance.get('/donations/stats');
  }
};

export default donationService; 