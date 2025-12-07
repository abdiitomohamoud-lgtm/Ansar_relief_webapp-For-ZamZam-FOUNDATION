import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

/**
 * Unauthorized component displayed when user lacks required permissions
 */
const Unauthorized = ({ defaultMessage = 'You do not have permission to access this page' }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const message = location.state?.message || defaultMessage;

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-lg w-full">
        <div className="bg-white rounded-lg shadow-lg p-8 text-center">
          {/* Warning Icon */}
          <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg 
              className="w-8 h-8 text-yellow-600" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" 
              />
            </svg>
          </div>

          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            Access Denied
          </h1>

          <p className="text-gray-600 mb-6">
            {message}
          </p>

          {/* Show required roles/permissions if provided */}
          {location.state?.requiredRoles && (
            <div className="mb-4">
              <p className="text-sm text-gray-500 mb-2">Required Roles:</p>
              <div className="flex flex-wrap gap-2 justify-center">
                {location.state.requiredRoles.map(role => (
                  <span 
                    key={role}
                    className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs"
                  >
                    {role}
                  </span>
                ))}
              </div>
            </div>
          )}

          {location.state?.requiredPermissions && (
            <div className="mb-6">
              <p className="text-sm text-gray-500 mb-2">Required Permissions:</p>
              <div className="flex flex-wrap gap-2 justify-center">
                {location.state.requiredPermissions.map(permission => (
                  <span 
                    key={permission}
                    className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs"
                  >
                    {permission}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate(-1)}
              className="px-6 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors"
            >
              Go Back
            </button>
            <button
              onClick={() => navigate('/')}
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
            >
              Home Page
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

Unauthorized.propTypes = {
  defaultMessage: PropTypes.string
};

export default Unauthorized;