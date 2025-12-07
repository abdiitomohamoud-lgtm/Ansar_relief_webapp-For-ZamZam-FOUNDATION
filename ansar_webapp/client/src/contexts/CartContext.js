import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { useSelector } from 'react-redux';
import * as cartService from '../services/cartService';

// Initial state
const initialState = {
  cartItems: [],
  totalAmount: 0,
  itemCount: 0,
};

// Actions
const ADD_TO_CART = 'ADD_TO_CART';
const REMOVE_FROM_CART = 'REMOVE_FROM_CART';
const UPDATE_CART_ITEM_QUANTITY = 'UPDATE_CART_ITEM_QUANTITY';
const CLEAR_CART = 'CLEAR_CART';

// Helper to ensure unique id for every item
function getCartItemKey(item) {
  if (item.itemId) return item.itemId;
  // Generate a unique id if none exists
  return `${item.cardName || item.title || 'item'}-${Date.now()}-${Math.random()}`;
}

// Reducer
const cartReducer = (state, action) => {
  switch (action.type) {
    case ADD_TO_CART: {
      let { item } = action.payload;
      // Validate required fields
      if (!item.amount || (!item.cardName && !item.title)) {
        // Invalid item, skip
        return state;
      }
      // Ensure unique key
      const key = getCartItemKey(item);
      item = { ...item, itemId: key };
      const existingItemIndex = state.cartItems.findIndex(cartItem => cartItem.itemId === key);
      if (existingItemIndex !== -1) {
        // Item already exists, update quantity
        const updatedCartItems = [...state.cartItems];
        updatedCartItems[existingItemIndex] = {
          ...updatedCartItems[existingItemIndex],
          quantity: (updatedCartItems[existingItemIndex].quantity || 1) + (item.quantity || 1)
        };
        return {
          ...state,
          cartItems: updatedCartItems,
          itemCount: state.itemCount + (item.quantity || 1),
          totalAmount: calculateTotalAmount(updatedCartItems)
        };
      } else {
        // Add new item
        const newItem = {
          ...item,
          quantity: item.quantity || 1
        };
        return {
          ...state,
          cartItems: [...state.cartItems, newItem],
          itemCount: state.itemCount + (item.quantity || 1),
          totalAmount: calculateTotalAmount([...state.cartItems, newItem])
        };
      }
    }
    
    case REMOVE_FROM_CART: {
      const { id } = action.payload;
      // Remove by unique key
      const updatedCartItems = state.cartItems.filter(item => getCartItemKey(item) !== id);
      const removedItem = state.cartItems.find(item => getCartItemKey(item) === id);
      return {
        ...state,
        cartItems: updatedCartItems,
        itemCount: state.itemCount - (removedItem?.quantity || 0),
        totalAmount: calculateTotalAmount(updatedCartItems)
      };
    }
    
    case UPDATE_CART_ITEM_QUANTITY: {
      const { id, quantity } = action.payload;
      const updatedCartItems = state.cartItems.map(item => 
        (item.itemId || item.id) === id ? { ...item, quantity } : item
      );
      const oldItem = state.cartItems.find(item => (item.itemId || item.id) === id);
      return {
        ...state,
        cartItems: updatedCartItems,
        itemCount: state.itemCount + (quantity - (oldItem?.quantity || 0)),
        totalAmount: calculateTotalAmount(updatedCartItems)
      };
    }
    
    case CLEAR_CART:
      return {
        ...initialState
      };
    
    default:
      return state;
  }
};

// Helper function to calculate total amount
const calculateTotalAmount = (cartItems) => {
  return cartItems.reduce((total, item) => total + (item.amount * item.quantity), 0);
};

// Create context
const CartContext = createContext();

// Provider component
export const CartProvider = ({ children }) => {
  // Load cart from localStorage
  const loadCartFromStorage = () => {
    try {
      const storedCart = localStorage.getItem('cart');
      return storedCart ? JSON.parse(storedCart) : initialState;
    } catch (error) {
      console.error('Error loading cart from localStorage:', error);
      return initialState;
    }
  };

  // Migrate legacy cart items to always have itemId
  const migrateCartItems = (cartState) => {
    if (!cartState || !Array.isArray(cartState.cartItems)) return cartState;
    let changed = false;
    const migrated = cartState.cartItems.map(item => {
      if (!item.itemId) {
        changed = true;
        return { ...item, itemId: getCartItemKey(item) };
      }
      return item;
    });
    if (changed) {
      const newState = { ...cartState, cartItems: migrated };
      localStorage.setItem('cart', JSON.stringify(newState));
      return newState;
    }
    return cartState;
  };

  const [state, dispatch] = useReducer(cartReducer, migrateCartItems(loadCartFromStorage()));
  const authUser = useSelector(state => state.auth && state.auth.user);

  // Save cart to localStorage whenever it changes (for guests)
  useEffect(() => {
    if (!authUser) {
      localStorage.setItem('cart', JSON.stringify(state));
    }
  }, [state, authUser]);

  // Always fetch cart from backend for logged-in users on mount and when authUser changes
  useEffect(() => {
    const syncCartFromBackend = async () => {
      if (authUser) {
        try {
          const backendCart = await cartService.getCart();
          dispatch({ type: CLEAR_CART });
          if (backendCart && Array.isArray(backendCart.items)) {
            backendCart.items.forEach(item => {
              dispatch({ type: ADD_TO_CART, payload: { item } });
            });
          }
          localStorage.removeItem('cart'); // clear guest cart
        } catch (err) {
          // fallback: do nothing
        }
      } else {
        dispatch({ type: CLEAR_CART });
      }
    };
    syncCartFromBackend();
    // Optionally, return cleanup if needed
  }, [authUser]);
  
  // Action creators
  const addToCart = async (item) => {
    // Always assign a unique itemId
    if (!item.itemId) {
      item = { ...item, itemId: getCartItemKey(item) };
    }
    // Ensure all card info fields are present
    const validItem = {
      ...item,
      cardName: item.cardName || item.title || '',
      cardCategory: item.cardCategory || item.category || '',
      cardPage: item.cardPage || item.sourcePage || window.location.pathname,
      cardAmount: item.cardAmount || item.amount || 0,
      cardDescription: item.cardDescription || item.description || '',
      cardTitle: item.cardTitle || item.title || '',
      cardSubtitle: item.cardSubtitle || item.subtitle || '',
      quantity: 1 // Always add 1 when adding to cart
    };
    if (authUser) {
      try {
        await cartService.addToCart(validItem);
        // After backend update, fetch latest cart and hydrate state
        const backendCart = await cartService.getCart();
        dispatch({ type: CLEAR_CART });
        if (backendCart && Array.isArray(backendCart.items)) {
          backendCart.items.forEach(item => {
            dispatch({ type: ADD_TO_CART, payload: { item } });
          });
        }
      } catch (e) { /* handle error if needed */ }
    } else {
      // Merge logic for local cart
      const existingIndex = state.cartItems.findIndex(cartItem => cartItem.itemId === validItem.itemId);
      if (existingIndex !== -1) {
        const updatedCartItems = [...state.cartItems];
        updatedCartItems[existingIndex] = {
          ...updatedCartItems[existingIndex],
          quantity: (updatedCartItems[existingIndex].quantity || 1) + 1
        };
        dispatch({ type: CLEAR_CART });
        updatedCartItems.forEach(item => {
          dispatch({ type: ADD_TO_CART, payload: { item } });
        });
        localStorage.setItem('cart', JSON.stringify({ ...state, cartItems: updatedCartItems }));
      } else {
        dispatch({ type: ADD_TO_CART, payload: { item: validItem } });
        localStorage.setItem('cart', JSON.stringify({ ...state, cartItems: [...state.cartItems, validItem] }));
      }
    }
  };

  const removeFromCart = async (itemId) => {
    if (!itemId) return;
    if (authUser) {
      try {
        await cartService.removeFromCart(itemId);
        // After backend update, fetch latest cart and hydrate state
        const backendCart = await cartService.getCart();
        dispatch({ type: CLEAR_CART });
        if (backendCart && Array.isArray(backendCart.items)) {
          backendCart.items.forEach(item => {
            dispatch({ type: ADD_TO_CART, payload: { item } });
          });
        }
      } catch (e) { /* handle error if needed */ }
    } else {
      dispatch({ type: REMOVE_FROM_CART, payload: { id: itemId } });
      const updated = { ...state, cartItems: state.cartItems.filter(item => item.itemId !== itemId) };
      localStorage.setItem('cart', JSON.stringify(updated));
    }
  };

  const updateCartItemQuantity = async (itemId, quantity) => {
    if (!itemId) return;
    if (authUser) {
      try {
        await cartService.updateCartItemQuantity(itemId, quantity);
        // After backend update, fetch latest cart and hydrate state
        const backendCart = await cartService.getCart();
        dispatch({ type: CLEAR_CART });
        if (backendCart && Array.isArray(backendCart.items)) {
          backendCart.items.forEach(item => {
            dispatch({ type: ADD_TO_CART, payload: { item } });
          });
        }
      } catch (e) { /* handle error if needed */ }
    } else {
      dispatch({ type: UPDATE_CART_ITEM_QUANTITY, payload: { id: itemId, quantity } });
      // Optionally, sync with localStorage if needed
    }
  };

  const clearCart = async () => {
    if (authUser) {
      try {
        await cartService.clearCart();
        // After backend update, fetch latest cart and hydrate state (should be empty)
        const backendCart = await cartService.getCart();
        dispatch({ type: CLEAR_CART });
        if (backendCart && Array.isArray(backendCart.items)) {
          backendCart.items.forEach(item => {
            dispatch({ type: ADD_TO_CART, payload: { item } });
          });
        }
      } catch (e) { /* handle error if needed */ }
    } else {
      dispatch({ type: CLEAR_CART });
      localStorage.removeItem('cart');
    }
  };
  
  return (
    <CartContext.Provider
      value={{
        cartItems: state.cartItems,
        itemCount: state.itemCount,
        totalAmount: state.totalAmount,
        addToCart,
        removeFromCart,
        updateCartItemQuantity,
        clearCart
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to use the cart context
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};