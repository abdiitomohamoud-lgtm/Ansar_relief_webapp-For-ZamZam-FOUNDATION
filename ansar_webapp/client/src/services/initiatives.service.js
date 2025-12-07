import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const initiativesService = {
  /**
   * Get all initiatives with optional filters
   */
  getInitiatives: async (params = {}) => {
    const response = await axios.get(`${API_URL}/initiatives`, { params });
    return response.data;
  },

  /**
   * Get initiative by slug
   */
  getInitiativeBySlug: async (slug) => {
    const response = await axios.get(`${API_URL}/initiatives/${slug}`);
    return response.data;
  },

  /**
   * Get initiatives page data including metadata
   */
  getInitiativesPageData: async () => {
    const response = await axios.get(`${API_URL}/initiatives-page`);
    return response.data;
  },

  /**
   * Create new initiative (admin only)
   */
  createInitiative: async (data) => {
    const response = await axios.post(`${API_URL}/initiatives`, data);
    return response.data;
  },

  /**
   * Update initiative (admin only)
   */
  updateInitiative: async (id, data) => {
    const response = await axios.put(`${API_URL}/initiatives/${id}`, data);
    return response.data;
  },

  /**
   * Delete initiative (admin only)
   */
  deleteInitiative: async (id) => {
    const response = await axios.delete(`${API_URL}/initiatives/${id}`);
    return response.data;
  }
};

export default initiativesService;
