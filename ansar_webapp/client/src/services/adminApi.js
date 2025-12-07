import axios from 'axios';

const api = axios.create({
  baseURL: '/api/admin',
  withCredentials: true,
});

// Add JWT token to headers if available
api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export const fetchUsers = () => api.get('/users');
export const createUser = data => api.post('/users', data);
export const updateUser = (id, data) => api.put(`/users/${id}`, data);
export const deleteUser = id => api.delete(`/users/${id}`);

// Campaigns CRUD
export const fetchCampaigns = () => api.get('/campaigns');
export const createCampaign = data => api.post('/campaigns', data);
export const updateCampaign = (id, data) => api.put(`/campaigns/${id}`, data);
export const deleteCampaign = id => api.delete(`/campaigns/${id}`);

// Categories CRUD
export const fetchCategories = () => api.get('/categories');
export const createCategory = data => api.post('/categories', data);
export const updateCategory = (id, data) => api.put(`/categories/${id}`, data);
export const deleteCategory = id => api.delete(`/categories/${id}`);

// Volunteers CRUD
export const fetchVolunteers = () => api.get('/volunteers');
export const createVolunteer = data => api.post('/volunteers', data);
export const updateVolunteer = (id, data) => api.put(`/volunteers/${id}`, data);
export const deleteVolunteer = id => api.delete(`/volunteers/${id}`);

// Messages CRUD
export const fetchMessages = () => api.get('/messages');
export const replyMessage = (id, data) => api.post(`/messages/${id}/reply`, data);
export const deleteMessage = id => api.delete(`/messages/${id}`);

// Settings
export const fetchSettings = () => api.get('/settings');
export const updateSettings = data => api.put('/settings', data);

export default api;
