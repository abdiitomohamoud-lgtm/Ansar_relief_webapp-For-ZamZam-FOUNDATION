import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  summary: {
    subtotal: 0,
    tax: 0,
    shipping: 0,
    total: 0
  },
  metadata: {
    itemCount: 0,
    lastUpdated: null
  },
  checkout: {
    step: 'cart', // cart, shipping, payment, confirmation
    shippingAddress: null,
    paymentMethod: null
  },
  loading: false,
  error: null
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
      state.error = null;
    },

    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },

    setCartItems: (state, action) => {
      state.items = action.payload;
      state.metadata.itemCount = action.payload.reduce((total, item) => total + item.quantity, 0);
      state.metadata.lastUpdated = new Date().toISOString();
      state.error = null;
      
      // Recalculate summary
      const subtotal = action.payload.reduce((total, item) => total + (item.price * item.quantity), 0);
      const tax = subtotal * 0.1; // 10% tax
      const shipping = subtotal > 100 ? 0 : 10; // Free shipping over $100

      state.summary = {
        subtotal,
        tax,
        shipping,
        total: subtotal + tax + shipping
      };
    },

    addItem: (state, action) => {
      const { item, quantity = 1 } = action.payload;
      const existingItem = state.items.find(i => i.id === item.id);

      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        state.items.push({ ...item, quantity });
      }

      state.metadata.itemCount += quantity;
      state.metadata.lastUpdated = new Date().toISOString();
    },

    updateItemQuantity: (state, action) => {
      const { itemId, quantity } = action.payload;
      const item = state.items.find(i => i.id === itemId);

      if (item) {
        const diff = quantity - item.quantity;
        item.quantity = quantity;
        state.metadata.itemCount += diff;
        state.metadata.lastUpdated = new Date().toISOString();
      }
    },

    removeItem: (state, action) => {
      const itemId = action.payload;
      const item = state.items.find(i => i.id === itemId);
      
      if (item) {
        state.metadata.itemCount -= item.quantity;
        state.items = state.items.filter(i => i.id !== itemId);
        state.metadata.lastUpdated = new Date().toISOString();
      }
    },

    clearCart: (state) => {
      state.items = [];
      state.metadata.itemCount = 0;
      state.metadata.lastUpdated = new Date().toISOString();
      state.summary = initialState.summary;
      state.checkout = initialState.checkout;
      state.error = null;
    },

    setCheckoutStep: (state, action) => {
      state.checkout.step = action.payload;
    },

    setShippingAddress: (state, action) => {
      state.checkout.shippingAddress = action.payload;
    },

    setPaymentMethod: (state, action) => {
      state.checkout.paymentMethod = action.payload;
    },

    resetCheckout: (state) => {
      state.checkout = initialState.checkout;
    },

    clearError: (state) => {
      state.error = null;
    }
  }
});

// Action creators
export const {
  setLoading,
  setError,
  setCartItems,
  addItem,
  updateItemQuantity,
  removeItem,
  clearCart,
  setCheckoutStep,
  setShippingAddress,
  setPaymentMethod,
  resetCheckout,
  clearError
} = cartSlice.actions;

// Selectors
export const selectCartItems = (state) => state.cart.items;
export const selectCartSummary = (state) => state.cart.summary;
export const selectItemCount = (state) => state.cart.metadata.itemCount;
export const selectLastUpdated = (state) => state.cart.metadata.lastUpdated;
export const selectCheckoutStep = (state) => state.cart.checkout.step;
export const selectShippingAddress = (state) => state.cart.checkout.shippingAddress;
export const selectPaymentMethod = (state) => state.cart.checkout.paymentMethod;
export const selectCartLoading = (state) => state.cart.loading;
export const selectCartError = (state) => state.cart.error;

// Memoized selectors
export const selectCartTotal = (state) => state.cart.summary.total;
export const selectHasItems = (state) => state.cart.items.length > 0;
export const selectIsCheckingOut = (state) => state.cart.checkout.step !== 'cart';

export default cartSlice.reducer;