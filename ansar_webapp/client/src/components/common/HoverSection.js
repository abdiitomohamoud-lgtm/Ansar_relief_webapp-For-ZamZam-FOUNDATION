import React from 'react';
import PropTypes from 'prop-types';

const HoverSection = ({ children, className, theme = 'blue', pattern = 'none' }) => {
  // Theme color mapping
  const themeColors = {
    blue: {
      hover: 'hover:bg-blue-50',
      border: 'group-hover:border-blue-200',
      shadow: 'group-hover:shadow-blue-100'
    },
    green: {
      hover: 'hover:bg-green-50',
      border: 'group-hover:border-green-200',
      shadow: 'group-hover:shadow-green-100'
    },
    cyan: {
      hover: 'hover:bg-cyan-50',
      border: 'group-hover:border-cyan-200',
      shadow: 'group-hover:shadow-cyan-100'
    },
    red: {
      hover: 'hover:bg-red-50',
      border: 'group-hover:border-red-200',
      shadow: 'group-hover:shadow-red-100'
    },
    amber: {
      hover: 'hover:bg-amber-50',
      border: 'group-hover:border-amber-200',
      shadow: 'group-hover:shadow-amber-100'
    }
  };

  const colors = themeColors[theme] || themeColors.blue;

  return (
    <div className={`group rounded-xl border border-gray-200 transition-all duration-300 ${colors.hover} hover:shadow-lg ${colors.shadow} ${className}`}>
      {children}
    </div>
  );
};

HoverSection.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  theme: PropTypes.oneOf(['blue', 'green', 'cyan', 'red', 'amber']),
  pattern: PropTypes.oneOf(['none', 'dots', 'lines', 'grid'])
};

export default HoverSection; 