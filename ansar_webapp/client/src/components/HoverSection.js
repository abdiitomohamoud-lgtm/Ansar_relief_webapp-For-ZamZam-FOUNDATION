import React from 'react';

export const HoverSection = ({ children, theme = 'default', className = '' }) => {
  const themeStyles = {
    default: 'hover:bg-gray-50',
    primary: 'hover:bg-primary-50',
    success: 'hover:bg-green-50',
    danger: 'hover:bg-red-50',
    warning: 'hover:bg-yellow-50',
    info: 'hover:bg-blue-50'
  };

  return (
    <div className={`transition-all duration-300 ${themeStyles[theme]} ${className}`}>
      {children}
    </div>
  );
}; 