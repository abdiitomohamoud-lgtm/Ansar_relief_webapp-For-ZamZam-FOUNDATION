import React from 'react';
import { motion } from 'framer-motion';
import { FaQuoteRight } from 'react-icons/fa';

const TestimonialCard = ({ testimonial }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-lg p-6 shadow-lg relative"
    >
      <div className="absolute top-4 right-4 text-primary-200">
        <FaQuoteRight size={24} />
      </div>
      
      <p className="text-gray-700 italic mb-6 relative z-10">"{testimonial.quote}"</p>
      
      <div className="flex items-center mt-auto">
        <img
          src={testimonial.image}
          alt={testimonial.name}
          className="w-16 h-16 rounded-full mr-4 object-cover border-4 border-white shadow-md"
        />
        <div>
          <h3 className="font-bold text-lg text-gray-800">{testimonial.name}</h3>
          <p className="text-gray-600 text-sm">{testimonial.role}</p>
        </div>
      </div>
      
      <motion.div 
        className="absolute -bottom-2 -right-2 w-12 h-12 rounded-full bg-primary-100 z-0"
        animate={{ 
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      />
    </motion.div>
  );
};

export default TestimonialCard; 