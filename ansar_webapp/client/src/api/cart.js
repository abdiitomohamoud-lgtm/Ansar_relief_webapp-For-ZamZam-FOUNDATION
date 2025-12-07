import axios from 'axios';


const getAuthHeaders = () => {
  const token = localStorage.getItem('authToken');
  console.log('[api/cart.js] getAuthHeaders called. authToken:', token);
  return token ? { Authorization: `Bearer ${token}` } : {};
};


export const addToCart = async (item) => {
  console.log('[api/cart.js] addToCart called');
  const response = await axios.post('/api/cart/add', { item }, { headers: getAuthHeaders() });
  return response.data;
};


export const removeFromCart = async (itemId) => {
  console.log('[api/cart.js] removeFromCart called');
  const response = await axios.delete(`/api/cart/remove/${itemId}`, { headers: getAuthHeaders() });
  return response.data;
};


export const updateCartItemQuantity = async (itemId, quantity) => {
  console.log('[api/cart.js] updateCartItemQuantity called');
  // You may need to implement this endpoint in your backend if not present
  const response = await axios.post('/api/cart/update', { itemId, quantity }, { headers: getAuthHeaders() });
  return response.data;
};


export const clearCart = async () => {
  console.log('[api/cart.js] clearCart called');
  const response = await axios.post('/api/cart/clear', {}, { headers: getAuthHeaders() });
  return response.data;
};
