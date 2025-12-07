import { createSlice } from '@reduxjs/toolkit';

// Helper function to get cart from localStorage
const getCartFromStorage = () => {
  const cartItems = localStorage.getItem('cartItems');
  return cartItems ? JSON.parse(cartItems) : [];
};

// Helper function to save cart to localStorage
const saveCartToStorage = (cartItems) => {
  localStorage.setItem('cartItems', JSON.stringify(cartItems));
};

// Calculate cart totals
const calculateCartTotals = (cartItems) => {
  return cartItems.reduce(
    (totals, item) => {
      totals.itemCount += 1;
      totals.subtotal += parseFloat(item.amount);
      return totals;
    },
    { itemCount: 0, subtotal: 0 }
  );
};

const initialState = {
  cartItems: getCartFromStorage(),
  ...calculateCartTotals(getCartFromStorage()),
  isCartOpen: false,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const newItem = action.payload;
      
      // Generate a unique ID for the cart item
      newItem.cartItemId = Date.now().toString();
      
      state.cartItems.push(newItem);
      
      // Recalculate totals
      const totals = calculateCartTotals(state.cartItems);
      state.itemCount = totals.itemCount;
      state.subtotal = totals.subtotal;
      
      // Save to localStorage
      saveCartToStorage(state.cartItems);
    },
    
    removeFromCart: (state, action) => {
      const itemId = action.payload;
      state.cartItems = state.cartItems.filter(item => item.cartItemId !== itemId);
      
      // Recalculate totals
      const totals = calculateCartTotals(state.cartItems);
      state.itemCount = totals.itemCount;
      state.subtotal = totals.subtotal;
      
      // Save to localStorage
      saveCartToStorage(state.cartItems);
    },
    
    updateCartItem: (state, action) => {
      const { cartItemId, amount } = action.payload;
      const item = state.cartItems.find(item => item.cartItemId === cartItemId);
      
      if (item) {
        item.amount = parseFloat(amount);
        
        // Recalculate totals
        const totals = calculateCartTotals(state.cartItems);
        state.itemCount = totals.itemCount;
        state.subtotal = totals.subtotal;
        
        // Save to localStorage
        saveCartToStorage(state.cartItems);
      }
    },
    
    clearCart: (state) => {
      state.cartItems = [];
      state.itemCount = 0;
      state.subtotal = 0;
      
      // Clear localStorage
      localStorage.removeItem('cartItems');
    },
    
    toggleCart: (state) => {
      state.isCartOpen = !state.isCartOpen;
    },
    
    setCartOpen: (state, action) => {
      state.isCartOpen = action.payload;
    }
  },
});

export const {
  addToCart,
  removeFromCart,
  updateCartItem,
  clearCart,
  toggleCart,
  setCartOpen,
} = cartSlice.actions;

export default cartSlice.reducer; 