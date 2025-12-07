import axios from 'axios';

// Always attach the latest JWT from localStorage for every request
const getAuthHeaders = () => {
  const token = localStorage.getItem('authToken');
  return token ? { Authorization: `Bearer ${token}` } : {};
};
// Upload user avatar
export const uploadUserAvatar = async (file) => {
  const formData = new FormData();
  formData.append('avatar', file);
  const response = await axios.post('/api/users/profile/avatar', formData, {
    headers: { ...getAuthHeaders(), 'Content-Type': 'multipart/form-data' },
  });
  return response.data;
};
// Delete a user comment
export const deleteUserComment = async (commentId) => {
  const response = await axios.delete(`/api/user/comments/${commentId}`);
  return response.data;
};

// Update a user comment
export const updateUserComment = async (commentId, content) => {
  const response = await axios.put(`/api/user/comments/${commentId}`, { content });
  return response.data;
};


// Fetch user profile data
export const fetchUserProfile = async () => {
  const response = await axios.get('/api/users/profile/me', { headers: getAuthHeaders() });
  return response.data;
};

// Update user profile data
export const updateUserProfile = async (profileData) => {
  const response = await axios.put('/api/users/profile/me', profileData, { headers: getAuthHeaders() });
  return response.data;
};

// Fetch user comments
export const fetchUserComments = async () => {
  const response = await axios.get('/api/user/comments', { headers: getAuthHeaders() });
  return response.data;
};

// Fetch user forms (event, contact, volunteer)
export const fetchUserForms = async (type) => {
  const response = await axios.get(`/api/user/forms?type=${type}`, { headers: getAuthHeaders() });
  return response.data;
};

// Fetch user cart
export const fetchUserCart = async () => {
  const token = localStorage.getItem('authToken');
  console.log('[fetchUserCart] authToken in localStorage:', token);
  const response = await axios.get('/api/cart', { headers: getAuthHeaders() });
  return response.data;
};

// Fetch user donation history
export const fetchUserDonations = async () => {
  const response = await axios.get('/api/user/donations');
  return response.data;
};

// Fetch user wishlist
export const fetchUserWishlist = async () => {
  const response = await axios.get('/api/user/wishlist');
  return response.data;
};

// Update user password
export const updateUserPassword = async (passwordData) => {
  const response = await axios.put('/api/user/password', passwordData);
  return response.data;
};

// Delete user account
export const deleteUserAccount = async () => {
  const response = await axios.delete('/api/users/profile/me', { headers: getAuthHeaders() });
  return response.data;
};
