import React from 'react';
import PropTypes from 'prop-types';

const Skeleton = ({ 
  variant = 'text', 
  width, 
  height, 
  count = 1,
  className = '',
  circle = false,
  animation = 'pulse'
}) => {
  const baseClasses = 'bg-gray-200 rounded';
  const animationClasses = {
    pulse: 'animate-pulse',
    wave: 'skeleton-wave',
    none: ''
  };
  
  const getVariantClasses = () => {
    if (circle) return 'rounded-full';
    
    switch (variant) {
      case 'text':
        return 'h-4 w-full';
      case 'rectangular':
        return '';
      case 'rounded':
        return 'rounded-md';
      case 'circular':
        return 'rounded-full';
      default:
        return '';
    }
  };
  
  const style = {
    width: width,
    height: height || (variant === 'text' ? '1rem' : undefined)
  };
  
  const renderSkeleton = (key) => (
    <span
      key={key}
      className={`${baseClasses} ${getVariantClasses()} ${animationClasses[animation]} ${className}`}
      style={style}
    ></span>
  );
  
  return (
    <>
      {Array.from({ length: count }, (_, index) => renderSkeleton(index))}
    </>
  );
};

Skeleton.propTypes = {
  variant: PropTypes.oneOf(['text', 'rectangular', 'rounded', 'circular']),
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  count: PropTypes.number,
  className: PropTypes.string,
  circle: PropTypes.bool,
  animation: PropTypes.oneOf(['pulse', 'wave', 'none'])
};

// Additional components
const SkeletonText = (props) => (
  <Skeleton variant="text" {...props} />
);

const SkeletonCard = ({ header, lines = 3, ...props }) => (
  <div className="border rounded-lg overflow-hidden">
    {header && (
      <div className="p-4 border-b">
        <Skeleton variant="text" width="60%" height="1.5rem" {...props} />
      </div>
    )}
    <div className="p-4 space-y-2">
      {Array.from({ length: lines }, (_, i) => (
        <Skeleton 
          key={i} 
          variant="text" 
          width={`${Math.floor(Math.random() * 40) + 60}%`} 
          {...props} 
        />
      ))}
    </div>
  </div>
);

SkeletonCard.propTypes = {
  header: PropTypes.bool,
  lines: PropTypes.number,
  ...Skeleton.propTypes
};

export { SkeletonText, SkeletonCard };
export default Skeleton; 