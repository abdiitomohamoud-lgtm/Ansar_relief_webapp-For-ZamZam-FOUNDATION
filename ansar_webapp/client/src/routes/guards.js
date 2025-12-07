import { PUBLIC_ROUTES, ROUTE_PERMISSIONS, SUPER_ADMIN_ROUTES } from './constants';

/**
 * Route guard utilities for handling route protection logic
 */

/**
 * Check if user has required role
 * @param {Object} user - User object
 * @param {string[]} roles - Required roles
 * @returns {boolean} Whether user has required role
 */
export const hasRole = (user, roles = []) => {
  if (!user || !roles.length) return false;
  return roles.some(role => user.roles?.includes(role));
};

/**
 * Check if user has required permissions
 * @param {Object} user - User object
 * @param {string[]} permissions - Required permissions
 * @returns {boolean} Whether user has required permissions
 */
export const hasPermissions = (user, permissions = []) => {
  if (!user || !permissions.length) return false;
  return permissions.every(permission => user.permissions?.includes(permission));
};

/**
 * Check if user is super admin
 * @param {Object} user - User object
 * @returns {boolean} Whether user is super admin
 */
export const isSuperAdmin = (user) => {
  return user?.role === 'super_admin';
};

/**
 * Check if route requires authentication
 * @param {string} path - Route path
 * @returns {boolean} Whether route requires auth
 */
export const requiresAuth = (path) => {
  return !PUBLIC_ROUTES[path];
};

/**
 * Check if route requires super admin
 * @param {string} path - Route path
 * @returns {boolean} Whether route requires super admin
 */
export const requiresSuperAdmin = (path) => {
  return SUPER_ADMIN_ROUTES.includes(path);
};

/**
 * Get required permissions for route
 * @param {string} path - Route path
 * @returns {string[]} Required permissions
 */
export const getRequiredPermissions = (path) => {
  return ROUTE_PERMISSIONS[path] || [];
};

/**
 * Check if user can access route
 * @param {Object} user - User object
 * @param {string} path - Route path
 * @returns {Object} Access check result
 */
export const checkRouteAccess = (user, path) => {
  // Public routes are always accessible
  if (!requiresAuth(path)) {
    return { hasAccess: true };
  }

  // Check if user is authenticated
  if (!user) {
    return {
      hasAccess: false,
      redirect: PUBLIC_ROUTES.LOGIN,
      message: 'Please log in to access this page'
    };
  }

  // Check super admin requirement
  if (requiresSuperAdmin(path) && !isSuperAdmin(user)) {
    return {
      hasAccess: false,
      redirect: PUBLIC_ROUTES.UNAUTHORIZED,
      message: 'This page requires super admin access'
    };
  }

  // Check permissions
  const requiredPermissions = getRequiredPermissions(path);
  if (requiredPermissions.length && !hasPermissions(user, requiredPermissions)) {
    return {
      hasAccess: false,
      redirect: PUBLIC_ROUTES.UNAUTHORIZED,
      message: 'You do not have the required permissions to access this page',
      requiredPermissions
    };
  }

  return { hasAccess: true };
};

export default {
  hasRole,
  hasPermissions,
  isSuperAdmin,
  requiresAuth,
  requiresSuperAdmin,
  getRequiredPermissions,
  checkRouteAccess
};