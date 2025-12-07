/**
 * Route path constants
 * Use these instead of hardcoding paths throughout the app
 */

// Public Routes
export const PUBLIC_ROUTES = {
  HOME: '/',
  ABOUT: '/about',
  EVENTS: '/events',
  LOGIN: '/login',
  REGISTER: '/register',
  FORGOT_PASSWORD: '/forgot-password',
  RESET_PASSWORD: '/reset-password',
  UNAUTHORIZED: '/unauthorized'
};

// Protected Routes
export const PROTECTED_ROUTES = {
  PROFILE: '/profile',
  DASHBOARD: '/dashboard',
  DONATE_DETAIL: '/donate/:slug',
  CART: '/cart',
  CHECKOUT: '/checkout',
  DONATIONS: {
    HISTORY: '/donations/history',
    RECURRING: '/donations/recurring'
  },
  SETTINGS: {
    ACCOUNT: '/settings/account',
    PREFERENCES: '/settings/preferences',
    NOTIFICATIONS: '/settings/notifications',
    SECURITY: '/settings/security'
  }
};

// Admin Routes
export const ADMIN_ROUTES = {
  DASHBOARD: '/admin',
  USERS: '/admin/users',
  DONATIONS: '/admin/donations',
  PROJECTS: '/admin/projects',
  SETTINGS: '/admin/settings',
  REPORTS: '/admin/reports',
  ANALYTICS: '/admin/analytics'
};

// Route Permissions
export const ROUTE_PERMISSIONS = {
  [ADMIN_ROUTES.USERS]: ['manage_users'],
  [ADMIN_ROUTES.DONATIONS]: ['manage_donations'],
  [ADMIN_ROUTES.PROJECTS]: ['manage_projects'],
  [ADMIN_ROUTES.SETTINGS]: ['manage_settings'],
  [ADMIN_ROUTES.REPORTS]: ['view_reports'],
  [ADMIN_ROUTES.ANALYTICS]: ['view_analytics']
};

// Super Admin Routes
export const SUPER_ADMIN_ROUTES = [
  ADMIN_ROUTES.SETTINGS
];

// Route Groups
export const ROUTE_GROUPS = {
  PUBLIC: Object.values(PUBLIC_ROUTES),
  PROTECTED: Object.values(PROTECTED_ROUTES).flat(),
  ADMIN: Object.values(ADMIN_ROUTES),
  SUPER_ADMIN: SUPER_ADMIN_ROUTES
};

// Helper Functions
export const isPublicRoute = (path) => ROUTE_GROUPS.PUBLIC.includes(path);
export const isProtectedRoute = (path) => ROUTE_GROUPS.PROTECTED.includes(path);
export const isAdminRoute = (path) => ROUTE_GROUPS.ADMIN.includes(path);
export const isSuperAdminRoute = (path) => ROUTE_GROUPS.SUPER_ADMIN.includes(path);

export const getRoutePermissions = (path) => ROUTE_PERMISSIONS[path] || [];

// Route Builders
export const buildDonateDetailRoute = (slug) => 
  PROTECTED_ROUTES.DONATE_DETAIL.replace(':slug', slug);

export default {
  PUBLIC_ROUTES,
  PROTECTED_ROUTES,
  ADMIN_ROUTES,
  ROUTE_PERMISSIONS,
  SUPER_ADMIN_ROUTES,
  ROUTE_GROUPS,
  isPublicRoute,
  isProtectedRoute,
  isAdminRoute,
  isSuperAdminRoute,
  getRoutePermissions,
  buildDonateDetailRoute
};