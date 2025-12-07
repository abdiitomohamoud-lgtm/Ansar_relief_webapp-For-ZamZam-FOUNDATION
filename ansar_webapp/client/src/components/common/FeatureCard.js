import React from 'react';
import { motion } from 'framer-motion';
import { FaArrowRight } from 'react-icons/fa';

const FeatureCard = ({
  icon: Icon,
  title,
  description,
  bgColor = 'bg-blue-500',
  onClick,
  className = ''
}) => {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className={`relative overflow-hidden rounded-xl ${className}`}
      onClick={onClick}
    >
      <div className={`${bgColor} p-6 transition-shadow duration-300 hover:shadow-xl cursor-pointer group`}>
        {/* Icon Container */}
        <div className="bg-white rounded-full w-12 h-12 flex items-center justify-center mb-4 shadow-md">
          <Icon className={`text-xl ${bgColor.replace('bg-', 'text-')}`} />
        </div>

        {/* Content */}
        <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
        <p className="text-white/90 mb-6">{description}</p>

        {/* Hover Arrow */}
        <div className="absolute bottom-6 right-6 transform translate-x-full opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300">
          <FaArrowRight className="text-white text-xl" />
        </div>
      </div>
    </motion.div>
  );
};

export default FeatureCard; 