import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const EnhancedBoardMember = ({ 
  name, 
  position, 
  image, 
  description, 
  linkedin,
  twitter,
  email,
  bio,
  delay = 0 
}) => {
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
      {/* Pattern background */}
      <div className="absolute inset-0 pattern-islamic opacity-0 group-hover:opacity-5 transition-opacity duration-500" style={{color: 'var(--primary-600)'}}></div>
      
      {/* Decorative element */}
      <div className="absolute -top-12 -right-12 w-24 h-24 bg-primary-100 rounded-full opacity-0 group-hover:opacity-70 transition-all duration-500"></div>
      
      <div className="flex flex-col items-center relative z-10">
        {/* Image container with hover effects */}
        <div className="relative mb-4 overflow-hidden">
          <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-primary-50 shadow-md transform group-hover:scale-105 transition-all duration-500">
            <img
              src={image}
              alt={name}
              className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110"
            />
          </div>
          
          {/* Decorative ring */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: delay + 0.3, duration: 0.5 }}
            className="absolute -inset-2 border-2 border-primary-200 rounded-full opacity-30 group-hover:opacity-100 transition-all duration-500"
          />
        </div>
        
        {/* Name with animated underline */}
        <h3 className="text-xl font-bold text-gray-800 text-center mb-1 relative">
          {name}
          <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 group-hover:w-full h-0.5 bg-primary-300 transition-all duration-300"></span>
        </h3>
        
        {/* Position with badge styling */}
        <div className="mb-3">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary-50 text-primary-700">
            {position}
          </span>
        </div>
        
        {/* Description */}
        <p className="text-gray-600 text-center mb-4">{description}</p>
        
        {/* Social media & contact links */}
        <div className="flex space-x-2 mb-4">
          {linkedin && (
            <a 
              href={linkedin} 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center hover:bg-blue-700 transition-colors duration-300"
              aria-label={`${name}'s LinkedIn profile`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z"/>
              </svg>
            </a>
          )}
          
          {twitter && (
            <a 
              href={twitter} 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-full bg-blue-400 text-white flex items-center justify-center hover:bg-blue-500 transition-colors duration-300"
              aria-label={`${name}'s Twitter profile`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                <path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z"/>
              </svg>
            </a>
          )}
          
          {email && (
            <a 
              href={`mailto:${email}`}
              className="w-8 h-8 rounded-full bg-gray-200 text-gray-600 flex items-center justify-center hover:bg-gray-300 transition-colors duration-300"
              aria-label={`Email ${name}`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
              </svg>
            </a>
          )}
        </div>
        
        {/* Bio link */}
        {bio && (
          <div className="mt-auto">
            <Link 
              to={bio} 
              className="inline-flex items-center px-3 py-1.5 rounded-md bg-primary-50 text-primary-700 hover:bg-primary-100 transition-colors duration-300 text-sm font-medium"
            >
              View Full Bio
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1.5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </Link>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default EnhancedBoardMember; 