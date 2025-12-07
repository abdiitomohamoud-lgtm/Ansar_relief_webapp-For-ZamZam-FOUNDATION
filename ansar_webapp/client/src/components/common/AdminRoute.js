import React from 'react';
import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import PrivateRoute from './PrivateRoute';
import { useAuth } from '../../store/hooks';
import LoadingScreen from './LoadingScreen';

/**
 * AdminRoute component for protecting admin-only routes
 * Extends PrivateRoute with admin role requirement
 * 
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components to render
 * @param {string[]} [props.permissions] - Additional permissions required
 * @param {boolean} [props.requireSuperAdmin] - Whether super admin role is required
 */
const AdminRoute = ({ children, permissions = [], requireSuperAdmin = false }) => {
  const { user, loading } = useAuth();

  // Show loading screen while checking admin status
  if (loading) {
    return <LoadingScreen message="Checking admin access..." />;
  }

  // Check for super admin requirement
  if (requireSuperAdmin && user?.role !== 'super_admin') {
    return (
      <Navigate 
        to="/unauthorized" 
        state={{ 
          message: 'This page requires super admin access',
        }} 
        replace 
      />
    );
  }

  // Check for admin or super admin role
  if (!user?.role || !['admin', 'super_admin'].includes(user.role)) {
    return (
      <Navigate 
        to="/unauthorized" 
        state={{ 
          message: 'This page requires admin access',
        }} 
        replace 
      />
    );
  }

  return (
    <PrivateRoute permissions={permissions}>
      {children}
    </PrivateRoute>
  );
};

AdminRoute.propTypes = {
  children: PropTypes.node.isRequired,
  permissions: PropTypes.arrayOf(PropTypes.string),
  requireSuperAdmin: PropTypes.bool
};

export default AdminRoute;