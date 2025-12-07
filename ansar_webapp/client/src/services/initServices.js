import { authService } from './auth/authService';
import { userProfileService } from './user/userProfileService';
import { cartService } from './cart/cartService';
import { store } from '../store';

/**
 * Initialize all application services
 * Sets up service instances and their dependencies
 */
export const initializeServices = async () => {
  try {
    // Initialize auth service first
    authService.initialize();

    // Check if user is authenticated
    const isAuthenticated = await authService.validateSession();

    if (isAuthenticated) {
      // Initialize user profile
      await userProfileService.initialize();

      // Initialize cart with user data
      await cartService.initialize();
    } else {
      // Initialize cart with guest data
      await cartService.loadGuestCart();
    }

    // Set up auth state change handlers
    setupAuthHandlers();

    return true;
  } catch (error) {
    console.error('Error initializing services:', error);
    return false;
  }
};

/**
 * Set up handlers for auth state changes
 */
const setupAuthHandlers = () => {
  // Handle login
  store.subscribe(() => {
    const state = store.getState();
    const prevAuth = state.auth.prevIsAuthenticated;
    const currentAuth = state.auth.isAuthenticated;

    // Auth state changed from false to true (login)
    if (!prevAuth && currentAuth) {
      handleLogin();
    }
    // Auth state changed from true to false (logout)
    else if (prevAuth && !currentAuth) {
      handleLogout();
    }
  });
};

/**
 * Handle successful login
 */
const handleLogin = async () => {
  try {
    // Initialize user profile
    await userProfileService.initialize();

    // Handle cart transition
    await cartService.handleLoginTransition();
  } catch (error) {
    console.error('Error handling login:', error);
  }
};

/**
 * Handle logout
 */
const handleLogout = async () => {
  try {
    // Clear profile data
    await userProfileService.resetProfile();

    // Handle cart transition
    await cartService.handleLogoutTransition();
  } catch (error) {
    console.error('Error handling logout:', error);
  }
};

/**
 * Clean up services
 * Called when application is unmounting
 */
export const cleanupServices = async () => {
  try {
    // Clear any intervals, timeouts, or subscriptions
    authService.cleanup?.();
    userProfileService.cleanup?.();
    cartService.cleanup?.();
  } catch (error) {
    console.error('Error cleaning up services:', error);
  }
};

export default {
  initializeServices,
  cleanupServices
};