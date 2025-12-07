import React from 'react';

const ProgressBar = ({ percentage, height = 8, color = 'primary' }) => {
  // Define color classes based on the color prop
  const colorClasses = {
    primary: 'bg-primary-600',
    secondary: 'bg-secondary-600',
    success: 'bg-green-600',
    danger: 'bg-red-600',
    warning: 'bg-yellow-500',
    info: 'bg-blue-500'
  };
  
  // Get the appropriate color class
  const barColorClass = colorClasses[color] || colorClasses.primary;
  
  return (
    <div className="w-full bg-gray-200 rounded-full overflow-hidden" style={{ height: `${height}px` }}>
      <div 
        className={`${barColorClass} transition-all duration-500 ease-out`}
        style={{ width: `${percentage}%`, height: '100%' }}
        role="progressbar"
        aria-valuenow={percentage}
        aria-valuemin="0"
        aria-valuemax="100"
      />
    </div>
  );
};

export default ProgressBar; 