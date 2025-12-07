import axios from 'axios';
import { store } from '../../store';
import { 
  setCartItems, 
  setLoading, 
  setError, 
  clearCart 
} from '../../store/slices/cartSlice';

/**
 * CartService handles all shopping cart operations
 * Manages both guest and authenticated user carts
 */
class CartService {
  constructor() {
    this.baseURL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';
    this.GUEST_CART_KEY = 'guest_cart';
  }

  /**
   * Initialize cart based on auth status
   * @returns {Promise<void>}
   */
  async initialize() {
    const isAuthenticated = store.getState().auth.isAuthenticated;
    if (isAuthenticated) {
      await this.loadUserCart();
    } else {
      await this.loadGuestCart();
    }
  }

  /**
   * Load authenticated user's cart
   * @returns {Promise<Object>} Cart data
   */
  async loadUserCart() {
    try {
      store.dispatch(setLoading(true));
      const response = await axios.get(`${this.baseURL}/cart`);
      store.dispatch(setCartItems(response.data.items));
      return response.data;
    } catch (error) {
      store.dispatch(setError(error.response?.data?.message || 'Failed to load cart'));
      throw error;
    } finally {
      store.dispatch(setLoading(false));
    }
  }

  /**
   * Load guest cart from localStorage
   * @returns {Promise<Object>} Cart data
   */
  async loadGuestCart() {
    try {
      const guestCart = localStorage.getItem(this.GUEST_CART_KEY);
      const cartData = guestCart ? JSON.parse(guestCart) : { items: [] };
      store.dispatch(setCartItems(cartData.items));
      return cartData;
    } catch (error) {
      console.error('Error loading guest cart:', error);
      store.dispatch(setCartItems([]));
      return { items: [] };
    }
  }

  /**
   * Add item to cart
   * @param {Object} item - Item to add
   * @param {number} quantity - Quantity to add
   * @returns {Promise<Object>} Updated cart data
   */
  async addItem(item, quantity = 1) {
    try {
      store.dispatch(setLoading(true));
      const isAuthenticated = store.getState().auth.isAuthenticated;

      if (isAuthenticated) {
        const response = await axios.post(`${this.baseURL}/cart/items`, {
          itemId: item.id,
          quantity
        });
        store.dispatch(setCartItems(response.data.items));
        return response.data;
      } else {
        // Handle guest cart
        const cart = await this.loadGuestCart();
        const existingItem = cart.items.find(i => i.id === item.id);

        if (existingItem) {
          existingItem.quantity += quantity;
        } else {
          cart.items.push({ ...item, quantity });
        }

        localStorage.setItem(this.GUEST_CART_KEY, JSON.stringify(cart));
        store.dispatch(setCartItems(cart.items));
        return cart;
      }
    } catch (error) {
      store.dispatch(setError(error.response?.data?.message || 'Failed to add item'));
      throw error;
    } finally {
      store.dispatch(setLoading(false));
    }
  }

  /**
   * Update item quantity
   * @param {string} itemId - Item ID
   * @param {number} quantity - New quantity
   * @returns {Promise<Object>} Updated cart data
   */
  async updateItemQuantity(itemId, quantity) {
    try {
      store.dispatch(setLoading(true));
      const isAuthenticated = store.getState().auth.isAuthenticated;

      if (isAuthenticated) {
        const response = await axios.put(`${this.baseURL}/cart/items/${itemId}`, {
          quantity
        });
        store.dispatch(setCartItems(response.data.items));
        return response.data;
      } else {
        // Handle guest cart
        const cart = await this.loadGuestCart();
        const item = cart.items.find(i => i.id === itemId);
        
        if (item) {
          item.quantity = quantity;
          localStorage.setItem(this.GUEST_CART_KEY, JSON.stringify(cart));
          store.dispatch(setCartItems(cart.items));
        }
        
        return cart;
      }
    } catch (error) {
      store.dispatch(setError(error.response?.data?.message || 'Failed to update item'));
      throw error;
    } finally {
      store.dispatch(setLoading(false));
    }
  }

  /**
   * Remove item from cart
   * @param {string} itemId - Item ID to remove
   * @returns {Promise<Object>} Updated cart data
   */
  async removeItem(itemId) {
    try {
      store.dispatch(setLoading(true));
      const isAuthenticated = store.getState().auth.isAuthenticated;

      if (isAuthenticated) {
        const response = await axios.delete(`${this.baseURL}/cart/items/${itemId}`);
        store.dispatch(setCartItems(response.data.items));
        return response.data;
      } else {
        // Handle guest cart
        const cart = await this.loadGuestCart();
        cart.items = cart.items.filter(i => i.id !== itemId);
        localStorage.setItem(this.GUEST_CART_KEY, JSON.stringify(cart));
        store.dispatch(setCartItems(cart.items));
        return cart;
      }
    } catch (error) {
      store.dispatch(setError(error.response?.data?.message || 'Failed to remove item'));
      throw error;
    } finally {
      store.dispatch(setLoading(false));
    }
  }

  /**
   * Clear entire cart
   * @returns {Promise<void>}
   */
  async clearCart() {
    try {
      store.dispatch(setLoading(true));
      const isAuthenticated = store.getState().auth.isAuthenticated;

      if (isAuthenticated) {
        await axios.delete(`${this.baseURL}/cart`);
      } else {
        localStorage.removeItem(this.GUEST_CART_KEY);
      }

      store.dispatch(clearCart());
    } catch (error) {
      store.dispatch(setError(error.response?.data?.message || 'Failed to clear cart'));
      throw error;
    } finally {
      store.dispatch(setLoading(false));
    }
  }

  /**
   * Merge guest cart with user cart after login
   * @returns {Promise<Object>} Updated cart data
   */
  async mergeGuestCart() {
    try {
      const guestCart = await this.loadGuestCart();
      
      if (guestCart.items.length) {
        const response = await axios.post(`${this.baseURL}/cart/merge`, guestCart);
        localStorage.removeItem(this.GUEST_CART_KEY);
        store.dispatch(setCartItems(response.data.items));
        return response.data;
      }
      
      return this.loadUserCart();
    } catch (error) {
      console.error('Error merging guest cart:', error);
      return this.loadUserCart();
    }
  }

  /**
   * Handle cart transition during login
   * @returns {Promise<void>}
   */
  async handleLoginTransition() {
    await this.mergeGuestCart();
  }

  /**
   * Handle cart transition during logout
   * @returns {Promise<void>}
   */
  async handleLogoutTransition() {
    store.dispatch(clearCart());
    localStorage.removeItem(this.GUEST_CART_KEY);
  }
}

export const cartService = new CartService();