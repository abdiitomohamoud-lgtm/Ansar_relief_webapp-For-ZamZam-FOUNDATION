import React from 'react';

export const Progress = ({ value, max = 100, size = 'md', variant = 'primary', className = '' }) => {
  const percentage = Math.min(100, Math.max(0, (value / max) * 100));
  
  const sizeStyles = {
    sm: 'h-1',
    md: 'h-2',
    lg: 'h-3'
  };

  const variantStyles = {
    primary: 'bg-primary-600',
    success: 'bg-green-600',
    danger: 'bg-red-600',
    warning: 'bg-yellow-600',
    info: 'bg-blue-600'
  };

  return (
    <div className={`w-full bg-gray-200 rounded-full overflow-hidden ${sizeStyles[size]} ${className}`}>
      <div
        className={`${variantStyles[variant]} transition-all duration-500 ease-out`}
        style={{ width: `${percentage}%` }}
        role="progressbar"
        aria-valuenow={value}
        aria-valuemin="0"
        aria-valuemax={max}
      />
    </div>
  );
}; 