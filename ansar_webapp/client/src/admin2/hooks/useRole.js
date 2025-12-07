
import { useSelector, shallowEqual } from 'react-redux';

/**
 * useRole - Returns the current user's role from Redux, with fallback to localStorage.
 * Optimized for performance, extensible for real-time updates.
 * @returns {string} role
 */
export function useRole() {
  // Prefer Redux state for role
  const role = useSelector(
    state => state.auth?.user?.role,
    shallowEqual
  );
  if (role) return role;

  // Fallback: localStorage (legacy/SSR)
  try {
    const user = JSON.parse(localStorage.getItem('user'));
    return user?.role || 'guest';
  } catch {
    return 'guest';
  }
}
