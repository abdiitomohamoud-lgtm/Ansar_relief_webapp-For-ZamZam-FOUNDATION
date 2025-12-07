import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const aboutService = {
  /**
   * Fetch About page data from backend API
   */
  getAboutPageData: async () => {
    const response = await axios.get(`${API_URL}/about`);
    return response.data;
  },

  /**
   * Fetch latest news items
   */
  getLatestNews: async (limit = 3) => {
    try {
      const response = await axios.get(`${API_URL}/about/news?limit=${limit}`);
      return response.data.data.media.news;
    } catch (error) {
      console.error('Error fetching latest news:', error);
      throw error;
    }
  },

  /**
   * Fetch reports
   */
  getReports: async (type) => {
    try {
      const url = type ? `${API_URL}/about/reports?type=${type}` : `${API_URL}/about/reports`;
      const response = await axios.get(url);
      return response.data.data.transparency.reports;
    } catch (error) {
      console.error('Error fetching reports:', error);
      throw error;
    }
  },

  /**
   * Subscribe to newsletter
   */
  subscribeNewsletter: async (email) => {
    try {
      const response = await axios.post(`${API_URL}/about/subscribe`, { email });
      return response.data;
    } catch (error) {
      console.error('Error subscribing to newsletter:', error);
      throw error;
    }
  },

  /**
   * Download report
   */
  downloadReport: async (reportId) => {
    try {
      const response = await axios.get(`${API_URL}/about/reports/${reportId}/download`, {
        responseType: 'blob'
      });
      return response.data;
    } catch (error) {
      console.error('Error downloading report:', error);
      throw error;
    }
  }
};

export default aboutService;