import { motion } from 'framer-motion';

const Card = ({
  children,
  variant = 'default',
  hover = true,
  className = '',
  onClick,
  ...props
}) => {
  const baseStyles = 'bg-white rounded-xl overflow-hidden';
  
  const variants = {
    default: 'shadow-md',
    elevated: 'shadow-lg',
    bordered: 'border border-gray-200',
    flat: '',
  };

  const hoverStyles = hover
    ? 'hover:shadow-lg transition-shadow duration-300'
    : '';

  return (
    <motion.div
      whileHover={hover ? { y: -2 } : {}}
      transition={{ duration: 0.2 }}
      className={`
        ${baseStyles}
        ${variants[variant]}
        ${hoverStyles}
        ${className}
      `}
      onClick={onClick}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export const CardHeader = ({ children, className = '', ...props }) => (
  <div
    className={`px-6 py-4 border-b border-gray-100 ${className}`}
    {...props}
  >
    {children}
  </div>
);

export const CardBody = ({ children, className = '', ...props }) => (
  <div className={`px-6 py-4 ${className}`} {...props}>
    {children}
  </div>
);

export const CardFooter = ({ children, className = '', ...props }) => (
  <div
    className={`px-6 py-4 border-t border-gray-100 ${className}`}
    {...props}
  >
    {children}
  </div>
);

export default Card; 