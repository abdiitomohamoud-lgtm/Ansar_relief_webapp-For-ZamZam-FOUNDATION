import axios from 'axios';
import { getAuthHeader } from '../utils/axiosConfig';

const API_URL = '/api';

/**
 * Campaign Service
 * Handles all API calls related to campaigns
 */
class CampaignService {
  /**
   * Get all campaigns
   * @param {Object} params - Query parameters
   * @returns {Promise} - API response
   */
  getAllCampaigns(params = {}) {
    return axios.get(`${API_URL}/campaigns`, { params });
  }

  /**
   * Get featured campaigns
   * @param {number} limit - Number of campaigns to return
   * @returns {Promise} - API response
   */
  getFeaturedCampaigns(limit = 6) {
    return axios.get(`${API_URL}/campaigns`, { 
      params: { 
        isFeatured: true,
        limit
      } 
    });
  }

  /**
   * Get urgent campaigns
   * @param {number} limit - Number of campaigns to return
   * @returns {Promise} - API response
   */
  getUrgentCampaigns(limit = 6) {
    return axios.get(`${API_URL}/campaigns`, { 
      params: { 
        isUrgent: true,
        limit
      } 
    });
  }

  /**
   * Get campaigns by category
   * @param {string} categoryId - Category ID
   * @param {Object} params - Additional query parameters
   * @returns {Promise} - API response
   */
  getCampaignsByCategory(categoryId, params = {}) {
    return axios.get(`${API_URL}/campaigns`, { 
      params: { 
        category: categoryId,
        ...params
      } 
    });
  }

  /**
   * Get a campaign by ID or slug
   * @param {string} idOrSlug - Campaign ID or slug
   * @returns {Promise} - API response
   */
  getCampaign(idOrSlug) {
    return axios.get(`${API_URL}/campaigns/${idOrSlug}`);
  }

  /**
   * Get campaign donations
   * @param {string} campaignId - Campaign ID
   * @param {Object} params - Query parameters
   * @returns {Promise} - API response
   */
  getCampaignDonations(campaignId, params = {}) {
    return axios.get(`${API_URL}/campaigns/${campaignId}/donations`, { params });
  }

  /**
   * Get campaign updates
   * @param {string} campaignId - Campaign ID
   * @param {Object} params - Query parameters
   * @returns {Promise} - API response
   */
  getCampaignUpdates(campaignId, params = {}) {
    return axios.get(`${API_URL}/campaigns/${campaignId}/updates`, { params });
  }

  // Admin methods

  /**
   * Get all campaigns (admin)
   * @param {Object} params - Query parameters
   * @returns {Promise} - API response
   */
  getAdminCampaigns(params = {}) {
    return axios.get(`${API_URL}/admin/campaigns`, { 
      params,
      headers: getAuthHeader() 
    });
  }

  /**
   * Get a campaign by ID (admin)
   * @param {string} id - Campaign ID
   * @returns {Promise} - API response
   */
  getAdminCampaign(id) {
    return axios.get(`${API_URL}/admin/campaigns/${id}`, { 
      headers: getAuthHeader() 
    });
  }

  /**
   * Create a new campaign
   * @param {Object} campaignData - Campaign data
   * @returns {Promise} - API response
   */
  createCampaign(campaignData) {
    return axios.post(`${API_URL}/admin/campaigns`, campaignData, { 
      headers: getAuthHeader() 
    });
  }

  /**
   * Update a campaign
   * @param {string} id - Campaign ID
   * @param {Object} campaignData - Campaign data
   * @returns {Promise} - API response
   */
  updateCampaign(id, campaignData) {
    return axios.put(`${API_URL}/admin/campaigns/${id}`, campaignData, { 
      headers: getAuthHeader() 
    });
  }

  /**
   * Delete a campaign
   * @param {string} id - Campaign ID
   * @returns {Promise} - API response
   */
  deleteCampaign(id) {
    return axios.delete(`${API_URL}/admin/campaigns/${id}`, { 
      headers: getAuthHeader() 
    });
  }

  /**
   * Upload campaign image
   * @param {string} campaignId - Campaign ID
   * @param {FormData} formData - Form data with image
   * @returns {Promise} - API response
   */
  uploadCampaignImage(campaignId, formData) {
    return axios.post(`${API_URL}/admin/campaigns/${campaignId}/image`, formData, {
      headers: {
        ...getAuthHeader(),
        'Content-Type': 'multipart/form-data'
      }
    });
  }

  /**
   * Toggle campaign active status
   * @param {string} id - Campaign ID
   * @param {boolean} isActive - Active status
   * @returns {Promise} - API response
   */
  toggleCampaignStatus(id, isActive) {
    return axios.patch(`${API_URL}/admin/campaigns/${id}/status`, { isActive }, { 
      headers: getAuthHeader() 
    });
  }

  /**
   * Toggle campaign featured status
   * @param {string} id - Campaign ID
   * @param {boolean} isFeatured - Featured status
   * @returns {Promise} - API response
   */
  toggleCampaignFeatured(id, isFeatured) {
    return axios.patch(`${API_URL}/admin/campaigns/${id}/featured`, { isFeatured }, { 
      headers: getAuthHeader() 
    });
  }

  /**
   * Toggle campaign urgent status
   * @param {string} id - Campaign ID
   * @param {boolean} isUrgent - Urgent status
   * @returns {Promise} - API response
   */
  toggleCampaignUrgent(id, isUrgent) {
    return axios.patch(`${API_URL}/admin/campaigns/${id}/urgent`, { isUrgent }, { 
      headers: getAuthHeader() 
    });
  }
}

export default new CampaignService();