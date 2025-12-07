import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

export const approachService = {
  getApproachBySlug: async (slug) => {
    const response = await axios.get(`${API_URL}/approach/${slug}`);
    return response.data;
  }
};
