import React from 'react';
import PropTypes from 'prop-types';

const Badge = ({ children, variant = 'primary', size = 'md', className = '' }) => {
  const getVariantClasses = () => {
    switch (variant) {
      case 'primary':
        return 'bg-primary-100 text-primary-800';
      case 'secondary':
        return 'bg-secondary-100 text-secondary-800';
      case 'success':
        return 'bg-green-100 text-green-800';
      case 'danger':
        return 'bg-red-100 text-red-800';
      case 'warning':
        return 'bg-yellow-100 text-yellow-800';
      case 'info':
        return 'bg-blue-100 text-blue-800';
      case 'light':
        return 'bg-gray-100 text-gray-800';
      case 'dark':
        return 'bg-gray-800 text-white';
      default:
        return 'bg-primary-100 text-primary-800';
    }
  };
  
  const getSizeClasses = () => {
    switch (size) {
      case 'sm':
        return 'text-xs px-2 py-0.5';
      case 'md':
        return 'text-sm px-2.5 py-0.5';
      case 'lg':
        return 'text-base px-3 py-1';
      default:
        return 'text-sm px-2.5 py-0.5';
    }
  };
  
  return (
    <span
      className={`inline-flex items-center font-medium rounded-full ${getVariantClasses()} ${getSizeClasses()} ${className}`}
    >
      {children}
    </span>
  );
};

Badge.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf([
    'primary',
    'secondary',
    'success',
    'danger',
    'warning',
    'info',
    'light',
    'dark'
  ]),
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  className: PropTypes.string
};

export default Badge; 