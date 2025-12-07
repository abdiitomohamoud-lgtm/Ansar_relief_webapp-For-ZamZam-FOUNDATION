import React from 'react';
import { FaExclamationTriangle } from 'react-icons/fa';

const ErrorMessage = ({ 
  message = 'An error occurred. Please try again.',
  variant = 'danger',
  className = ''
}) => {
  // Define variant classes
  const variantClasses = {
    danger: 'bg-red-100 text-red-800 border-red-200',
    warning: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    info: 'bg-blue-100 text-blue-800 border-blue-200'
  };
  
  // Get appropriate variant class
  const alertClass = variantClasses[variant] || variantClasses.danger;
  
  return (
    <div className={`flex items-center p-4 mb-4 rounded-lg border ${alertClass} ${className}`}>
      <FaExclamationTriangle className="mr-2 flex-shrink-0" />
      <div>{message}</div>
    </div>
  );
};

export default ErrorMessage; 