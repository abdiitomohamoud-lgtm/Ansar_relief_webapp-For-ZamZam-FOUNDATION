import React, { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import PropTypes from 'prop-types';
import { 
  FaUsers, FaGlobe, FaProjectDiagram, FaHandshake, 
  FaHeart, FaShieldAlt, FaStar, FaHandHoldingHeart,
  FaAmbulance, FaWater, FaGraduationCap, FaHospital,
  FaLinkedin, FaTwitter, FaDownload, FaFileAlt
} from 'react-icons/fa';

// Icon mapping to convert string icon names to actual components
const iconMap = {
  FaUsers,
  FaGlobe,
  FaProjectDiagram,
  FaHandshake,
  FaHeart,
  FaShieldAlt,
  FaStar,
  FaHandHoldingHeart,
  FaAmbulance,
  FaWater,
  FaGraduationCap,
  FaHospital,
  FaLinkedin,
  FaTwitter,
  FaDownload,
  FaFileAlt
};

const StatCard = ({ icon: iconProp, value, label, description, prefix = '', suffix = '', duration = 2, delay = 0 }) => {
  const [count, setCount] = useState(0);
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: true, margin: "-50px 0px" });
  
  // Determine which icon to use
  const Icon = typeof iconProp === 'string' ? iconMap[iconProp] || FaUsers : iconProp;
  if (!Icon) {
    console.warn('StatCard: Unknown icon', iconProp);
  } else {
    // Debug: log icon mapping
    // Remove or comment out after debugging
    console.log('StatCard icon:', iconProp, Icon);
  }
  
  useEffect(() => {
    if (isInView) {
      let startTime;
      const numericValue = parseInt(value.replace(/,/g, '').replace(/[^0-9.-]+/g, ''));
      
      const animateCount = (timestamp) => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
        const currentCount = Math.floor(progress * numericValue);
        
        setCount(currentCount);
        
        if (progress < 1) {
          requestAnimationFrame(animateCount);
        } else {
          setCount(numericValue);
        }
      };
      
      requestAnimationFrame(animateCount);
    }
  }, [isInView, value, duration]);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ delay, duration: 0.5 }}
      whileHover={{ 
        y: -10,
        boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
      }}
      className="relative overflow-hidden bg-white rounded-xl p-6 shadow-lg transform transition-all duration-500 group border border-gray-100"
    >
      {/* Background decoration - pulsing gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      {/* Pattern overlay */}
      <div className="absolute inset-0 pattern-islamic opacity-0 group-hover:opacity-5 transition-opacity duration-500" style={{color: 'var(--primary-600)'}}></div>
      
      <div className="relative flex items-start">
        {/* Icon with animated container */}
      <motion.div
          initial={{ scale: 0, rotate: -10 }}
          animate={isInView ? { scale: 1, rotate: 0 } : { scale: 0, rotate: -10 }}
          transition={{ 
            delay: delay + 0.2, 
            type: "spring", 
            stiffness: 200 
          }}
          className="relative mr-4 flex-shrink-0"
        >
          <div className="w-16 h-16 rounded-2xl bg-primary-100 flex items-center justify-center group-hover:bg-primary-200 transition-colors duration-300 shadow-md group-hover:shadow-lg">
            {Icon ? (
              <Icon className="text-3xl text-primary-600 group-hover:scale-110 transition-transform duration-300" />
            ) : (
              <FaUsers className="text-3xl text-primary-600 group-hover:scale-110 transition-transform duration-300" />
            )}
        </div>
          
          {/* Decorative ring */}
          <div className="absolute -inset-1 border-2 border-primary-200 rounded-2xl opacity-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300" />
      </motion.div>
      
        <div className="flex-grow">
          {/* Value with counter animation */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
        transition={{ delay: delay + 0.3 }}
            className="relative flex items-baseline"
      >
            {prefix && <span className="text-xl font-semibold text-primary-600 mr-1">{prefix}</span>}
            <span className="text-4xl font-bold text-gray-900 mb-1">{count.toLocaleString()}</span>
            {suffix && <span className="text-xl font-semibold text-primary-600 ml-1">{suffix}</span>}
      </motion.div>
      
      {/* Label */}
      <motion.div
        initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ delay: delay + 0.4 }}
            className="relative text-lg font-medium text-gray-800 group-hover:text-gray-900 transition-colors duration-300"
      >
        {label}
      </motion.div>
          
          {/* Description */}
          {description && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ delay: delay + 0.5 }}
              className="relative text-sm text-gray-600 mt-1 group-hover:text-gray-700 transition-colors duration-300"
            >
              {description}
            </motion.div>
          )}
        </div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-24 h-24 bg-primary-100 rounded-bl-full opacity-0 group-hover:opacity-20 transition-all duration-500 transform translate-x-8 -translate-y-8 group-hover:translate-x-4 group-hover:-translate-y-4" />
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-primary-100 rounded-tr-full opacity-0 group-hover:opacity-20 transition-all duration-500 transform -translate-x-8 translate-y-8 group-hover:-translate-x-4 group-hover:translate-y-4" />
      
      {/* Floating dots decoration */}
      <div className="absolute bottom-4 right-4 w-2 h-2 rounded-full bg-primary-400 opacity-0 group-hover:opacity-60 transition-all duration-500 animate-ping" />
      <div className="absolute top-4 left-4 w-2 h-2 rounded-full bg-primary-400 opacity-0 group-hover:opacity-60 transition-all duration-500 animate-ping animation-delay-2000" />
    </motion.div>
  );
};

StatCard.propTypes = {
  icon: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.elementType
  ]).isRequired,
  value: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  description: PropTypes.string,
  prefix: PropTypes.string,
  suffix: PropTypes.string,
  duration: PropTypes.number,
  delay: PropTypes.number
};

export default StatCard;