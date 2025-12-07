import React, { useState } from 'react';
import PropTypes from 'prop-types';

const Tooltip = ({ 
  children, 
  content, 
  position = 'top', 
  delay = 300,
  className = ''
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [timeoutId, setTimeoutId] = useState(null);

  const showTooltip = () => {
    const id = setTimeout(() => {
      setIsVisible(true);
    }, delay);
    setTimeoutId(id);
  };

  const hideTooltip = () => {
    clearTimeout(timeoutId);
    setIsVisible(false);
  };

  const positionClasses = {
    top: 'bottom-full left-1/2 transform -translate-x-1/2 -translate-y-2 mb-2',
    bottom: 'top-full left-1/2 transform -translate-x-1/2 translate-y-2 mt-2',
    left: 'right-full top-1/2 transform -translate-y-1/2 -translate-x-2 mr-2',
    right: 'left-full top-1/2 transform -translate-y-1/2 translate-x-2 ml-2'
  };

  const arrowClasses = {
    top: 'bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full border-t-gray-800 border-l-transparent border-r-transparent border-b-0',
    bottom: 'top-0 left-1/2 transform -translate-x-1/2 -translate-y-full border-b-gray-800 border-l-transparent border-r-transparent border-t-0',
    left: 'right-0 top-1/2 transform translate-x-full -translate-y-1/2 border-l-gray-800 border-t-transparent border-b-transparent border-r-0',
    right: 'left-0 top-1/2 transform -translate-x-full -translate-y-1/2 border-r-gray-800 border-t-transparent border-b-transparent border-l-0'
  };

  return (
    <div 
      className={`relative inline-block ${className}`}
      onMouseEnter={showTooltip}
      onMouseLeave={hideTooltip}
      onFocus={showTooltip}
      onBlur={hideTooltip}
    >
      {children}
      
      {isVisible && (
        <div className={`absolute z-50 ${positionClasses[position]}`}>
          <div className="bg-gray-800 text-white text-sm rounded py-1 px-2 whitespace-nowrap">
            {content}
            <div className={`absolute w-0 h-0 border-4 ${arrowClasses[position]}`}></div>
          </div>
        </div>
      )}
    </div>
  );
};

Tooltip.propTypes = {
  children: PropTypes.node.isRequired,
  content: PropTypes.node.isRequired,
  position: PropTypes.oneOf(['top', 'bottom', 'left', 'right']),
  delay: PropTypes.number,
  className: PropTypes.string
};

export default Tooltip; 