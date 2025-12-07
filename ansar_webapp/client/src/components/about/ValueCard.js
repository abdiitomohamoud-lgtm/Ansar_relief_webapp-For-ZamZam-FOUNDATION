import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  FaStar, FaHeart, FaShieldAlt, FaHandshake, FaUsers, 
  FaGlobe, FaProjectDiagram, FaHandHoldingHeart,
  FaAmbulance, FaWater, FaGraduationCap, FaHospital,
  FaLinkedin, FaTwitter, FaDownload, FaFileAlt
} from 'react-icons/fa';

// Icon mapping to convert string icon names to actual components
const iconMap = {
  FaStar,
  FaHeart,
  FaShieldAlt,
  FaHandshake,
  FaUsers,
  FaGlobe,
  FaProjectDiagram,
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

const ValueCard = ({ 
  icon: iconProp = 'FaStar', 
  title, 
  description, 
  link, 
  iconBgColor = 'bg-primary-50', 
  iconColor = 'text-primary-600', 
  delay = 0 
}) => {
  // Determine which icon to use
  const Icon = typeof iconProp === 'string' ? iconMap[iconProp] || FaStar : iconProp;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      whileHover={{ 
        y: -10,
        boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.15)"
      }}
      className="bg-white p-6 rounded-xl shadow-lg transition-all duration-500 relative overflow-hidden border border-gray-100 h-full flex flex-col group"
    >
      {/* Background pattern */}
      <div className="absolute inset-0 pattern-arabesque opacity-0 group-hover:opacity-5 transition-opacity duration-500" style={{color: 'var(--primary-600)'}}></div>
      
      {/* Decorative corner */}
      <div className="absolute -top-10 -right-10 w-24 h-24 bg-gradient-to-br from-primary-100 to-primary-50 rounded-full opacity-0 group-hover:opacity-70 transition-opacity duration-500 transform rotate-45"></div>
      
      {/* Content */}
      <div className="flex flex-col items-center relative z-10 h-full">
        {/* Icon with animated container */}
        <motion.div
          whileHover={{ 
            rotate: [0, -10, 10, -10, 0],
            transition: { duration: 0.5 }
          }}
          className="mb-4 relative"
        >
          <div className={`${iconBgColor} p-5 rounded-xl shadow-md group-hover:shadow-lg transition-all duration-300 transform group-hover:scale-105`}>
            {Icon && <Icon size={32} className={iconColor} />}
          </div>
          
          {/* Decorative ring */}
          <div className="absolute -inset-2 border-2 border-primary-200 rounded-xl opacity-0 group-hover:opacity-100 transform scale-90 group-hover:scale-105 transition-all duration-500"></div>
        </motion.div>
        
        {/* Title with underline effect */}
        <h3 className="text-xl font-bold text-gray-800 text-center mb-3 relative">
          {title}
          <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 group-hover:w-full h-1 bg-primary-200 transition-all duration-300 rounded-full"></span>
        </h3>
        
        {/* Description */}
        <p className="text-gray-600 text-center mb-6">{description}</p>
        
        {/* Link */}
        {link && (
          <Link 
            to={link}
            className="mt-auto inline-flex items-center text-primary-600 hover:text-primary-700 font-medium text-sm transition-colors duration-300 group-hover:font-semibold"
          >
            <span>Learn more</span>
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-4 w-4 ml-1.5 transform group-hover:translate-x-1 transition-transform duration-300" 
              viewBox="0 0 20 20" 
              fill="currentColor"
            >
              <path 
                fillRule="evenodd" 
                d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" 
                clipRule="evenodd" 
              />
            </svg>
          </Link>
        )}
      </div>
    </motion.div>
  );
};

export default ValueCard; 