import React, { useState, useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import LoadingSpinner from '../common/LoadingSpinner';

/**
 * AdminRoute component
 * Protects routes that should only be accessible to admin users
 */
const AdminRoute = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState(null);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const checkAdminStatus = async () => {
      try {
        // Get the token from local storage
        const token = localStorage.getItem('token');

        if (!token) {
          setIsAdmin(false);
          setLoading(false);
          return;
        }

        // Call the API to check if user is admin
        const response = await axios.get('/api/auth/profile', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        // Check if the user is an admin
        setIsAdmin(response.data.data.user.isAdmin === true);
        setLoading(false);
      } catch (error) {
        console.error('Error checking admin status:', error);
        setIsAdmin(false);
        setLoading(false);
        
        // For development/demo purposes only - remove in production
        if (process.env.NODE_ENV === 'development') {
          console.log('Development mode: Allowing admin access');
          setIsAdmin(true);
          setLoading(false);
        }
      }
    };

    checkAdminStatus();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <LoadingSpinner size="lg" />
        <p className="ml-3 text-lg font-medium text-gray-700">Checking admin credentials...</p>
      </div>
    );
  }

  if (!isAdmin) {
    // Redirect to admin login if not an admin
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  // Render children if user is an admin
  return children;
};

export default AdminRoute;
 