import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSecurity } from '../context/SecurityContext';

const ProtectedRoute = ({ children, roles = [] }) => {
  const { isAuthenticated, user, loading } = useSecurity();
  const location = useLocation();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    // Redirect to login page but save the attempted url
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Check if user has required role
  if (roles.length > 0 && !roles.includes(user.role)) {
    // Redirect to home page if user doesn't have required role
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute; 