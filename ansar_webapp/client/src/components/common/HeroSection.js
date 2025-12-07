import React from 'react';
import { motion } from 'framer-motion';

const HeroSection = ({ 
  title, 
  subtitle, 
  backgroundImage, 
  overlayOpacity = 0.6, 
  height = "lg",
  buttonText,
  buttonLink
}) => {
  // Set the height based on the prop
  const heightClasses = {
    sm: "h-64",
    md: "h-96",
    lg: "h-[32rem]",
    xl: "h-[40rem]"
  };
  
  return (
    <div 
      className={`relative ${heightClasses[height] || heightClasses.lg} flex items-center justify-center overflow-hidden`}
    >
      {/* Background image */}
      <div 
        className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      ></div>
      
      {/* Dark overlay */}
      <div 
        className="absolute inset-0 bg-black"
        style={{ opacity: overlayOpacity }}
      ></div>
      
      {/* Pattern overlay */}
      <div className="absolute inset-0 pattern-stars opacity-20" style={{ color: "#ffffff" }}></div>
      
      {/* Content */}
      <div className="container mx-auto px-4 relative z-10 text-center">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6"
        >
          {title}
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto"
        >
          {subtitle}
        </motion.p>
        
        {buttonText && buttonLink && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-10"
          >
            <a 
              href={buttonLink}
              className="bg-primary-600 hover:bg-primary-700 text-white font-bold py-3 px-8 rounded-full shadow-lg transition-colors duration-200"
            >
              {buttonText}
            </a>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default HeroSection; 