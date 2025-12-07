import React from 'react';
import PropTypes from 'prop-types';
import './Patterns.css';

/**
 * A component that renders an image as a decorative pattern
 * with proper styling and hover effects.
 */
const PatternImage = ({
  src,
  alt = 'Decorative pattern',
  opacity = 0.1,
  className = '',
  hoverEffect = false,
  position = 'absolute',
  inset = 'inset-0',
  zIndex = 'z-0',
  mixBlend = '',
  style = {},
  ...props
}) => {
  // Create class string
  const containerClasses = `
    pattern-container
    ${position}
    ${inset}
    ${zIndex}
    ${mixBlend}
    ${className}
    ${hoverEffect ? 'hover-effect' : ''}
  `.trim();

  const imageClasses = `
    pattern-image
    ${mixBlend}
  `.trim();

  return (
    <div 
      className={containerClasses}
      style={style} 
      {...props}
    >
      <img 
        src={src} 
        alt={alt}
        className={imageClasses}
        style={{ opacity }}
      />
    </div>
  );
};

PatternImage.propTypes = {
  /** Source URL of the image */
  src: PropTypes.string.isRequired,
  /** Alt text for the image */
  alt: PropTypes.string,
  /** Opacity level of the pattern (0-1) */
  opacity: PropTypes.number,
  /** Additional classes to apply to container */
  className: PropTypes.string,
  /** Whether to apply hover effect */
  hoverEffect: PropTypes.bool,
  /** CSS position property */
  position: PropTypes.string,
  /** Tailwind inset class (inset-0, etc.) */
  inset: PropTypes.string,
  /** Tailwind z-index class */
  zIndex: PropTypes.string,
  /** Tailwind mix-blend class */
  mixBlend: PropTypes.string,
  /** Additional inline styles */
  style: PropTypes.object
};

export default PatternImage; 