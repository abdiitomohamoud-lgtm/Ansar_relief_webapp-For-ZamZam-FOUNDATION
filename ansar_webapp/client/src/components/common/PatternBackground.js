import React from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import Patterns from './Patterns';

/**
 * A component that renders a decorative pattern background or overlay.
 * This uses CSS classes rather than SVG components for lighter weight implementation.
 */
const PatternBackground = ({
  pattern = 'islamic',
  color = 'primary',
  opacity = 0.05,
  animate = true,
  positionClasses = 'absolute inset-0',
  className = '',
  style = {},
  zIndex = '-z-10'
}) => {
  // Get the appropriate pattern component
  const PatternComponent = Patterns[pattern] || Patterns.islamic;
  
  // Color classes
  const colorClasses = {
    primary: 'text-primary-500',
    blue: 'text-blue-500',
    indigo: 'text-indigo-500',
    purple: 'text-purple-500',
    cyan: 'text-cyan-500',
    green: 'text-green-500',
    emerald: 'text-emerald-500',
    red: 'text-red-500',
    pink: 'text-pink-500',
    orange: 'text-orange-500',
    amber: 'text-amber-500',
    yellow: 'text-yellow-500',
    gray: 'text-gray-500',
    white: 'text-white',
    black: 'text-black'
  };

  // Animation variants
  const patternVariants = animate ? {
    initial: {
      opacity: 0,
      scale: 0.95,
      rotate: -2
    },
    animate: {
      opacity: opacity,
      scale: 1,
      rotate: 0,
      transition: {
        duration: 1.2,
        ease: [0.25, 0.1, 0.25, 1]
      }
    }
  } : {
    initial: { opacity },
    animate: { opacity }
  };

  return (
    <motion.div
      className={`${positionClasses} overflow-hidden ${zIndex} pointer-events-none ${className}`}
      style={style}
      initial="initial"
      animate="animate"
      variants={patternVariants}
    >
      <div className={`w-full h-full ${colorClasses[color]} pattern-container`}>
        <PatternComponent className="pattern-svg" />
      </div>
    </motion.div>
  );
};

PatternBackground.propTypes = {
  pattern: PropTypes.oneOf([
    'islamic', 'arabesque', 'geometric', 'floral', 
    'mosaic', 'stars', 'hexagon', 'dots', 'grid'
  ]),
  color: PropTypes.oneOf([
    'primary', 'blue', 'indigo', 'purple', 'cyan', 
    'green', 'emerald', 'red', 'pink', 'orange', 
    'amber', 'yellow', 'gray', 'white', 'black'
  ]),
  opacity: PropTypes.number,
  animate: PropTypes.bool,
  positionClasses: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.object,
  zIndex: PropTypes.string
};

export default PatternBackground; 