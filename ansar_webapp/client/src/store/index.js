import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import authReducer from './slices/authSlice';
import profileReducer from './slices/profileSlice';
import cartReducer from './slices/cartSlice';

/**
 * Configure and create the Redux store
 * Combines all reducers and sets up middleware
 */
export const store = configureStore({
  reducer: {
    auth: authReducer,
    profile: profileReducer,
    cart: cartReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types
        ignoredActions: ['profile/updateProfile', 'profile/updatePreferences'],
        // Ignore these field paths in the state
        ignoredPaths: [
          'profile.data.createdAt',
          'profile.data.updatedAt',
          'profile.lastUpdated',
          'cart.metadata.lastUpdated'
        ]
      }
    }),
  devTools: process.env.NODE_ENV !== 'production'
});

// Setup listeners for RTK-Query
setupListeners(store.dispatch);

/**
 * Initialize core services
 * @param {Object} services - Service instances to initialize
 */
export const initializeServices = async (services) => {
  try {
    // Initialize auth state
    const isAuthenticated = await services.authService.validateSession();
    
    if (isAuthenticated) {
      // Load user profile
      await services.userProfileService.initialize();
      
      // Load user cart
      await services.cartService.initialize();
    } else {
      // Load guest cart
      await services.cartService.loadGuestCart();
    }
  } catch (error) {
    console.error('Error initializing services:', error);
  }
};

/**
 * Reset store state
 * Used during logout or when clearing application state
 */
export const resetStore = () => {
  store.dispatch({ type: 'auth/logoutSuccess' });
  store.dispatch({ type: 'profile/resetProfile' });
  store.dispatch({ type: 'cart/clearCart' });
};

export default store;