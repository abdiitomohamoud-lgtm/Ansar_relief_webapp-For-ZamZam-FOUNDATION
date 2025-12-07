import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  FaLinkedin, 
  FaTwitter, 
  FaEnvelope, 
  FaUserAlt, 
  FaClock, 
  FaMapMarkerAlt 
} from 'react-icons/fa';

// Import board member images
import boardMember1 from '../../assets/images/about/board-member-1.jpg';
import boardMember2 from '../../assets/images/about/board-member-2.jpg';
import boardMember3 from '../../assets/images/about/board-member-3.jpg';

// Map of board member images
const boardMemberImages = {
  'Dr. Abdullah Khan': boardMember1,
  'Fatima Rahman': boardMember2,
  'Mohammad Siddiq': boardMember3,
  // Add fallback for any other board members
  default: boardMember1
};

const BoardMember = ({ 
  name, 
  position, 
  image, 
  description, 
  linkedin,
  twitter,
  email,
  bio,
  years = null,
  location = null,
  delay = 0 
}) => {
  // Use the mapped image or fallback to default
  const memberImage = boardMemberImages[name] || boardMemberImages.default;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
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
              src={memberImage}
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
        
        {/* Additional info */}
        <div className="flex flex-wrap justify-center gap-3 mb-3">
          {years && (
            <div className="inline-flex items-center text-xs text-gray-500">
              <FaClock className="mr-1" size={12} />
              <span>{years} years</span>
            </div>
          )}
          
          {location && (
            <div className="inline-flex items-center text-xs text-gray-500">
              <FaMapMarkerAlt className="mr-1" size={12} />
              <span>{location}</span>
            </div>
          )}
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
              <FaLinkedin size={16} />
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
              <FaTwitter size={16} />
            </a>
          )}
          
          {email && (
            <a 
              href={`mailto:${email}`}
              className="w-8 h-8 rounded-full bg-gray-200 text-gray-600 flex items-center justify-center hover:bg-gray-300 transition-colors duration-300"
              aria-label={`Email ${name}`}
            >
              <FaEnvelope size={16} />
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

export default BoardMember; 