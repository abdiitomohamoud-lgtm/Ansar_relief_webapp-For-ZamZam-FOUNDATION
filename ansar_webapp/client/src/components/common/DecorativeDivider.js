import React from 'react';
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';

const DecorativeDivider = ({ 
  color = 'primary', 
  withIcon = true, 
  pattern = 'arabesque',
  className = ''
}) => {
  const getColorClass = () => {
    switch (color) {
      case 'primary':
        return 'bg-primary-500';
      case 'secondary':
        return 'bg-secondary-500';
      case 'accent':
        return 'bg-accent-500';
      case 'white':
        return 'bg-white';
      default:
        return 'bg-primary-500';
    }
  };

  const getIconColor = () => {
    switch (color) {
      case 'primary':
        return 'text-primary-500 border-primary-200';
      case 'secondary':
        return 'text-secondary-500 border-secondary-200';
      case 'accent':
        return 'text-accent-500 border-accent-200';
      case 'white':
        return 'text-white border-white/30';
      default:
        return 'text-primary-500 border-primary-200';
    }
  };

  const getPatternClass = () => {
    switch (pattern) {
      case 'arabesque':
        return 'pattern-arabesque';
      case 'geometric':
        return 'pattern-geometric';
      case 'islamic-star':
        return 'pattern-islamic-star';
      case 'dots':
        return 'pattern-dots';
      default:
        return 'pattern-arabesque';
    }
  };

  const lineVariants = {
    hidden: { width: 0 },
    visible: { 
      width: '100%',
      transition: { duration: 1, ease: "easeOut" }
    }
  };

  return (
    <div className={`flex items-center justify-center py-8 ${className}`}>
      <div className="flex items-center w-full max-w-4xl">
        <motion.div 
          className={`h-px flex-1 ${getColorClass()} opacity-30`}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={lineVariants}
        />
        
        {withIcon && (
          <div className="mx-4 relative">
            <div className={`w-12 h-12 rounded-full border-2 ${getIconColor()} flex items-center justify-center bg-white`}>
              <div className={`w-8 h-8 rounded-full ${getPatternClass()} opacity-30 absolute inset-0 m-auto`}></div>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={getIconColor().split(' ')[0]}>
                <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 8V16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M8 12H16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>
        )}
        
        <motion.div 
          className={`h-px flex-1 ${getColorClass()} opacity-30`}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={lineVariants}
        />
      </div>
    </div>
  );
};

DecorativeDivider.propTypes = {
  color: PropTypes.oneOf(['primary', 'secondary', 'accent', 'white']),
  withIcon: PropTypes.bool,
  pattern: PropTypes.oneOf(['arabesque', 'geometric', 'islamic-star', 'dots']),
  className: PropTypes.string
};

export default DecorativeDivider; 