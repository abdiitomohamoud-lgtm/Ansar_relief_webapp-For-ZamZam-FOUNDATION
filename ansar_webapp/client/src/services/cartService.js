// Update item quantity in cart
import axios from '../utils/axiosConfig';

export const updateCartItemQuantity = async (itemId, quantity) => {
  debugCartToken('updateCartItemQuantity');
  const res = await axios.post('/cart/update', { itemId, quantity });
  return res.data;
};


// Debug: log token and function name for all cartService API calls
const debugCartToken = (fnName) => {
  let token = null;
  try {
    token = localStorage.getItem('authToken') || localStorage.getItem('token');
  } catch (e) {}
  console.log(`[cartService] ${fnName} called. authToken:`, token);
};

export const getCart = async () => {
  debugCartToken('getCart');
  const res = await axios.get('/cart');
  return res.data;
};

export const addToCart = async (item) => {
  debugCartToken('addToCart');
  const res = await axios.post('/cart/add', { item });
  return res.data;
};

export const removeFromCart = async (itemId) => {
  debugCartToken('removeFromCart');
  const res = await axios.delete(`/cart/remove/${itemId}`);
  return res.data;
};

export const clearCart = async () => {
  debugCartToken('clearCart');
  const res = await axios.post('/cart/clear');
  return res.data;
};

export const getCartStats = async () => {
  debugCartToken('getCartStats');
  const res = await axios.get('/cart/stats');
  return res.data;
};
