import React from 'react';
import PropTypes from 'prop-types';
import './Patterns.css';

// Import pattern SVGs
import { ReactComponent as IslamicPattern } from '../../assets/patterns/islamic-pattern.svg';
import { ReactComponent as IslamicStarPattern } from '../../assets/patterns/islamic-star.svg';
import { ReactComponent as ArabesquePattern } from '../../assets/patterns/arabesque.svg';
import { ReactComponent as GeometricPattern } from '../../assets/patterns/geometric.svg';
import { ReactComponent as FloralPattern } from '../../assets/patterns/floral.svg';
import { ReactComponent as HexagonPattern } from '../../assets/patterns/hexagon.svg';
import { ReactComponent as DotsPattern } from '../../assets/patterns/dots.svg';
import { ReactComponent as GridPattern } from '../../assets/patterns/grid.svg';
import { ReactComponent as MosaicPattern } from '../../assets/patterns/mosaic.svg';

/**
 * A reusable pattern component that applies decorative Islamic/Arabesque patterns
 * as a background or overlay to other components.
 */
const Pattern = ({
  type = 'islamic',
  opacity = 0.1,
  color = 'currentColor',
  className = '',
  animate = false,
  hoverEffect = false,
  style = {},
  ...props
}) => {
  // Select the pattern component based on type
  const getPatternComponent = () => {
    switch (type) {
      case 'islamic':
        return IslamicPattern;
      case 'islamic-star':
        return IslamicStarPattern;
      case 'arabesque':
        return ArabesquePattern;
      case 'geometric':
        return GeometricPattern;
      case 'floral':
        return FloralPattern;
      case 'hexagon':
        return HexagonPattern;
      case 'dots':
        return DotsPattern;
      case 'grid':
        return GridPattern;
      case 'mosaic':
        return MosaicPattern;
      default:
        return IslamicPattern;
    }
  };

  const PatternComponent = getPatternComponent();
  
  const containerClasses = `
    pattern-container
    ${className}
    ${animate ? 'pattern-animate' : ''}
    ${hoverEffect ? 'pattern-hover-effect' : ''}
  `.trim();

  const patternStyles = {
    color,
    ...style
  };

  return (
    <div 
      className={containerClasses}
      style={patternStyles} 
      {...props}
    >
      <PatternComponent className="pattern-svg" style={{ opacity }} />
    </div>
  );
};

Pattern.propTypes = {
  /** Type of pattern to display */
  type: PropTypes.oneOf([
    'islamic', 'islamic-star', 'arabesque', 'geometric', 
    'floral', 'hexagon', 'dots', 'grid', 'mosaic'
  ]),
  /** Opacity level of the pattern (0-1) */
  opacity: PropTypes.number,
  /** Color of the pattern (CSS color value) */
  color: PropTypes.string,
  /** Additional classes to apply */
  className: PropTypes.string,
  /** Whether to animate the pattern */
  animate: PropTypes.bool,
  /** Whether to apply hover effect */
  hoverEffect: PropTypes.bool,
  /** Additional inline styles */
  style: PropTypes.object
};

export default Pattern; 