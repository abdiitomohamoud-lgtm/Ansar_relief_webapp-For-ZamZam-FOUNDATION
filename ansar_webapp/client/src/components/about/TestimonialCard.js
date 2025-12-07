import React from 'react';
import { motion } from 'framer-motion';

const TestimonialCard = ({ quote, author, role, image, delay = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
      className="bg-white p-6 rounded-xl shadow-md relative"
    >
      {/* Decorative quote icon */}
      <div className="absolute -top-4 -left-2 text-primary-200 opacity-50">
        <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path d="M9.983 3v7.391c0 5.704-3.731 9.57-8.983 10.609l-.995-2.151c2.432-.917 3.995-3.638 3.995-5.849h-4v-10h9.983zm14.017 0v7.391c0 5.704-3.748 9.571-9 10.609l-.996-2.151c2.433-.917 3.996-3.638 3.996-5.849h-3.983v-10h9.983z"/>
        </svg>
      </div>
      
      <div className="pt-6">
        <p className="text-gray-700 italic mb-6">"{quote}"</p>
        
        <div className="flex items-center">
          <div className="flex-shrink-0 mr-3">
            <img 
              src={image} 
              alt={author} 
              className="w-12 h-12 rounded-full object-cover border-2 border-primary-100"
            />
          </div>
          <div>
            <p className="text-gray-900 font-semibold">{author}</p>
            <p className="text-gray-500 text-sm">{role}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default TestimonialCard; 