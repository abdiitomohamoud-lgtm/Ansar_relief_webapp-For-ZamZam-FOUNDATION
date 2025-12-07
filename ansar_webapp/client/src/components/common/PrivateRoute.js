import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../store/hooks';
import LoadingScreen from './LoadingScreen';
import PropTypes from 'prop-types';

/**
 * PrivateRoute component for protecting routes that require authentication
 * Redirects to login if user is not authenticated
 * 
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components to render when authenticated
 * @param {string[]} [props.roles] - Optional roles required to access the route
 * @param {string[]} [props.permissions] - Optional permissions required to access the route
 */
const PrivateRoute = ({ children, roles = [], permissions = [] }) => {
  const location = useLocation();
  const { isAuthenticated, user, loading } = useAuth();

  // Show loading screen while checking auth status
  if (loading) {
    return <LoadingScreen message="Checking authentication..." />;
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return (
      <Navigate 
        to="/login" 
        state={{ 
          from: location.pathname,
          message: 'Please log in to access this page'
        }} 
        replace 
      />
    );
  }

  // Check roles if specified
  if (roles.length > 0 && !roles.some(role => user?.roles?.includes(role))) {
    return (
      <Navigate 
        to="/unauthorized" 
        state={{ 
          message: 'You do not have the required role to access this page',
          requiredRoles: roles
        }} 
        replace 
      />
    );
  }

  // Check permissions if specified
  if (permissions.length > 0 && !permissions.every(perm => user?.permissions?.includes(perm))) {
    return (
      <Navigate 
        to="/unauthorized" 
        state={{ 
          message: 'You do not have the required permissions to access this page',
          requiredPermissions: permissions
        }} 
        replace 
      />
    );
  }

  // Render protected route content
  return children;
};

PrivateRoute.propTypes = {
  children: PropTypes.node.isRequired,
  roles: PropTypes.arrayOf(PropTypes.string),
  permissions: PropTypes.arrayOf(PropTypes.string)
};

export default PrivateRoute;