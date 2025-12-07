import React from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';

/**
 * A reusable component for section headings with consistent styling
 */
const SectionHeading = ({
  title,
  subtitle,
  tag,
  align = 'center',
  titleColor = 'blue',
  tagColor = 'blue',
  className = '',
  showDivider = true,
  size = 'default'
}) => {
  const getTitleColorClasses = (color) => {
    const colors = {
      blue: 'from-blue-600 to-indigo-600',
      cyan: 'from-cyan-600 to-blue-600',
      purple: 'from-purple-600 to-indigo-600',
      red: 'from-red-600 to-rose-600',
      green: 'from-green-600 to-emerald-600',
      pink: 'from-pink-600 to-rose-600',
      indigo: 'from-indigo-600 to-purple-600',
      orange: 'from-orange-600 to-amber-600',
      emerald: 'from-emerald-600 to-green-600',
      gray: 'from-gray-700 to-gray-800',
      primary: 'from-primary-600 to-primary-700',
    };
    return colors[color] || colors.blue;
  };

  const getTitleGlowColor = (color) => {
    const glowColors = {
      blue: 'blue-400',
      cyan: 'cyan-400',
      purple: 'purple-400',
      red: 'red-400',
      green: 'green-400',
      pink: 'pink-400',
      indigo: 'indigo-400',
      orange: 'orange-400',
      emerald: 'emerald-400',
      gray: 'gray-400',
      primary: 'primary-400',
    };
    return glowColors[color] || glowColors.blue;
  };

  const getTagColorClasses = (color) => {
    const colors = {
      blue: 'bg-blue-100 text-blue-700 border-blue-200',
      cyan: 'bg-cyan-100 text-cyan-700 border-cyan-200',
      purple: 'bg-purple-100 text-purple-700 border-purple-200',
      red: 'bg-red-100 text-red-700 border-red-200',
      green: 'bg-green-100 text-green-700 border-green-200',
      pink: 'bg-pink-100 text-pink-700 border-pink-200',
      indigo: 'bg-indigo-100 text-indigo-700 border-indigo-200',
      orange: 'bg-orange-100 text-orange-700 border-orange-200',
      emerald: 'bg-emerald-100 text-emerald-700 border-emerald-200',
      gray: 'bg-gray-100 text-gray-700 border-gray-200',
      primary: 'bg-primary-100 text-primary-700 border-primary-200',
    };
    return colors[color] || colors.blue;
  };

  const alignmentClasses = {
    center: 'text-center mx-auto',
    left: 'text-left',
    right: 'text-right ml-auto'
  };

  const titleSizeClasses = {
    small: 'text-2xl md:text-3xl',
    default: 'text-3xl md:text-4xl',
    large: 'text-4xl md:text-5xl',
  };

  // Animation variants
  const headingVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.6,
        ease: [0.25, 0.1, 0.25, 1]
      }
    }
  };

  const tagVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { 
        duration: 0.4,
        ease: "easeOut"
      }
    }
  };

  const dividerVariants = {
    hidden: { width: 0, opacity: 0 },
    visible: { 
      width: "6rem", 
      opacity: 1,
      transition: { 
        duration: 0.8,
        ease: "easeInOut",
        delay: 0.2
      }
    }
  };

  const subtitleVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.5,
        ease: "easeOut",
        delay: 0.3
      }
    }
  };

  const glowColor = getTitleGlowColor(titleColor);

  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      className={`mb-16 ${alignmentClasses[align]} ${className}`}
    >
      {tag && (
        <motion.div 
          variants={tagVariants}
          className={`inline-block ${getTagColorClasses(tagColor)} px-4 py-1.5 rounded-full text-sm font-semibold tracking-wider mb-4 shadow-sm border`}
        >
          {tag}
        </motion.div>
      )}
      
      <motion.h2 
        variants={headingVariants}
        className={`${titleSizeClasses[size]} font-extrabold text-gray-900 mb-5 leading-tight tracking-tight`}
      >
        <span className={`bg-clip-text text-transparent bg-gradient-to-r ${getTitleColorClasses(titleColor)} filter drop-shadow-sm`} style={{ textShadow: `0 0 25px rgba(var(--tw-color-${glowColor}-rgb), 0.15)` }}>
          {title}
        </span>
      </motion.h2>
      
      {showDivider && (
        <motion.div 
          variants={dividerVariants}
          className={`h-1.5 bg-gradient-to-r ${getTitleColorClasses(titleColor)} ${align === 'center' ? 'mx-auto' : ''} ${align === 'right' ? 'ml-auto' : ''} mb-6 rounded-full shadow-sm`}
          style={{ 
            maxWidth: '6rem',
            boxShadow: `0 0 10px rgba(var(--tw-color-${glowColor}-rgb), 0.3)` 
          }}
        ></motion.div>
      )}
      
      {subtitle && (
        <motion.p 
          variants={subtitleVariants}
          className={`mt-5 text-lg text-gray-600 max-w-2xl leading-relaxed font-medium ${align === 'center' ? 'mx-auto text-center' : ''}`}
        >
          {subtitle}
        </motion.p>
      )}
    </motion.div>
  );
};

SectionHeading.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  tag: PropTypes.string,
  align: PropTypes.oneOf(['center', 'left', 'right']),
  titleColor: PropTypes.oneOf([
    'blue', 'cyan', 'purple', 'red', 'green', 
    'pink', 'indigo', 'orange', 'emerald', 'gray', 'primary'
  ]),
  tagColor: PropTypes.oneOf([
    'blue', 'cyan', 'purple', 'red', 'green', 
    'pink', 'indigo', 'orange', 'emerald', 'gray', 'primary'
  ]),
  className: PropTypes.string,
  showDivider: PropTypes.bool,
  size: PropTypes.oneOf(['small', 'default', 'large'])
};

export default SectionHeading; 