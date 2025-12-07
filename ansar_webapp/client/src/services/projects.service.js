import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

export const projectsService = {
  getProjectBySlug: async (slug) => {
    const response = await axios.get(`${API_URL}/projects/${slug}`);
    return response.data;
  }
};
