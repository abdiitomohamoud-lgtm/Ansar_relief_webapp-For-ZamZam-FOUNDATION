import React from 'react';
import PropTypes from 'prop-types';

const Progress = ({ value, max, variant = 'primary', height = 'h-2', showLabel = false, className = '' }) => {
  const percentage = Math.min(Math.round((value / max) * 100), 100);
  
  const getVariantClasses = () => {
    switch (variant) {
      case 'primary':
        return 'bg-primary-600';
      case 'secondary':
        return 'bg-secondary-600';
      case 'success':
        return 'bg-green-600';
      case 'danger':
        return 'bg-red-600';
      case 'warning':
        return 'bg-yellow-500';
      case 'info':
        return 'bg-blue-500';
      default:
        return 'bg-primary-600';
    }
  };
  
  return (
    <div className={`w-full ${className}`}>
      <div className={`w-full bg-gray-200 rounded-full overflow-hidden ${height}`}>
        <div
          className={`${getVariantClasses()} rounded-full transition-all duration-500 ease-out`}
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
      
      {showLabel && (
        <div className="flex justify-between mt-1 text-xs text-gray-500">
          <span>{percentage}% Complete</span>
          <span>${value.toLocaleString()} of ${max.toLocaleString()}</span>
        </div>
      )}
    </div>
  );
};

Progress.propTypes = {
  value: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  variant: PropTypes.oneOf(['primary', 'secondary', 'success', 'danger', 'warning', 'info']),
  height: PropTypes.string,
  showLabel: PropTypes.bool,
  className: PropTypes.string
};

export default Progress; 