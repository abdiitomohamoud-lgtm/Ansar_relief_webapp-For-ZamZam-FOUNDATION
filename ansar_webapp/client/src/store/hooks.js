import { useDispatch, useSelector } from 'react-redux';

/**
 * Hook to access auth state
 * @returns {Object} Auth state and helper methods
 */
export const useAuth = () => {
  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth);

  return {
    ...auth,
    isAuthenticated: auth.isAuthenticated,
    user: auth.user,
    loading: auth.loading,
    error: auth.error
  };
};

/**
 * Hook to access profile state
 * @returns {Object} Profile state and helper methods
 */
export const useProfile = () => {
  const dispatch = useDispatch();
  const profile = useSelector(state => state.profile);

  return {
    ...profile,
    data: profile.data,
    preferences: profile.preferences,
    stats: profile.stats,
    loading: profile.loading,
    error: profile.error,
    lastUpdated: profile.lastUpdated
  };
};

/**
 * Hook to access cart state
 * @returns {Object} Cart state and helper methods
 */
export const useCart = () => {
  const dispatch = useDispatch();
  const cart = useSelector(state => state.cart);

  return {
    ...cart,
    items: cart.items,
    summary: cart.summary,
    itemCount: cart.metadata.itemCount,
    loading: cart.loading,
    error: cart.error,
    isCheckingOut: cart.checkout.step !== 'cart',
    checkoutStep: cart.checkout.step,
    shippingAddress: cart.checkout.shippingAddress,
    paymentMethod: cart.checkout.paymentMethod,
    hasItems: cart.items.length > 0,
    total: cart.summary.total
  };
};

/**
 * Hook to access combined auth and profile state
 * @returns {Object} Combined auth and profile state
 */
export const useUser = () => {
  const auth = useAuth();
  const profile = useProfile();

  return {
    isAuthenticated: auth.isAuthenticated,
    user: auth.user,
    profile: profile.data,
    preferences: profile.preferences,
    loading: auth.loading || profile.loading,
    error: auth.error || profile.error
  };
};

/**
 * Hook to access checkout state
 * @returns {Object} Checkout state and helper methods
 */
export const useCheckout = () => {
  const cart = useCart();
  
  return {
    step: cart.checkoutStep,
    shippingAddress: cart.shippingAddress,
    paymentMethod: cart.paymentMethod,
    summary: cart.summary,
    total: cart.total,
    isComplete: cart.checkoutStep === 'confirmation',
    canProceed: cart.hasItems && !cart.loading && !cart.error
  };
};

export default {
  useAuth,
  useProfile,
  useCart,
  useUser,
  useCheckout
};