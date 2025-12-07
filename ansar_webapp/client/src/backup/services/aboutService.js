import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || '/api';

// Get organization information
export const getOrganizationInfo = async () => {
  try {
    const response = await axios.get(`${API_URL}/organization/info`);
    return response.data;
  } catch (error) {
    console.error('Error fetching organization info:', error);
    throw error;
  }
};

// Get board members
export const getBoardMembers = async () => {
  try {
    const response = await axios.get(`${API_URL}/organization/board-members`);
    return response.data;
  } catch (error) {
    console.error('Error fetching board members:', error);
    throw error;
  }
};

// Get organization values
export const getOrganizationValues = async () => {
  try {
    const response = await axios.get(`${API_URL}/organization/values`);
    return response.data;
  } catch (error) {
    console.error('Error fetching organization values:', error);
    throw error;
  }
};

// Get timeline events
export const getTimelineEvents = async () => {
  try {
    const response = await axios.get(`${API_URL}/organization/timeline`);
    return response.data;
  } catch (error) {
    console.error('Error fetching timeline events:', error);
    throw error;
  }
};

// Get reports and publications
export const getReports = async (limit = null) => {
  try {
    const url = limit ? `${API_URL}/reports?limit=${limit}` : `${API_URL}/reports`;
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error('Error fetching reports:', error);
    throw error;
  }
};

// Get certifications and awards
export const getCertifications = async (limit = null) => {
  try {
    const url = limit ? `${API_URL}/certifications?limit=${limit}` : `${API_URL}/certifications`;
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error('Error fetching certifications:', error);
    throw error;
  }
};

// Get testimonials
export const getTestimonials = async (limit = null) => {
  try {
    const url = limit ? `${API_URL}/testimonials?limit=${limit}` : `${API_URL}/testimonials`;
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error('Error fetching testimonials:', error);
    throw error;
  }
};

// Get statistics
export const getStatistics = async () => {
  try {
    const response = await axios.get(`${API_URL}/organization/statistics`);
    return response.data;
  } catch (error) {
    console.error('Error fetching statistics:', error);
    throw error;
  }
};

// Get FAQs
export const getFAQs = async (category = 'about') => {
  try {
    const response = await axios.get(`${API_URL}/faqs?category=${category}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching FAQs:', error);
    throw error;
  }
};

// Download report
export const downloadReport = async (reportId) => {
  try {
    const response = await axios.get(`${API_URL}/reports/${reportId}/download`, {
      responseType: 'blob'
    });
    
    // Create a download link and trigger it
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', response.headers['content-disposition']?.split('filename=')[1] || 'report.pdf');
    document.body.appendChild(link);
    link.click();
    link.remove();
    
    return true;
  } catch (error) {
    console.error('Error downloading report:', error);
    throw error;
  }
};

export default {
  getOrganizationInfo,
  getBoardMembers,
  getOrganizationValues,
  getTimelineEvents,
  getReports,
  getCertifications,
  getTestimonials,
  getFAQs,
  downloadReport
};