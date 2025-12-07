import React from 'react';
import { motion } from 'framer-motion';
import { FaQuoteLeft } from 'react-icons/fa';

const TestimonialCard = ({ testimonial }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0, duration: 0.5 }}
      className="bg-white rounded-xl p-6 shadow-md border border-gray-100 hover:border-secondary-100 transition-all duration-300 h-full"
    >
      <div className="flex items-start mb-6">
        <div className="flex-shrink-0 mr-4">
          <div className="relative">
            <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-secondary-100">
              <img
                src={testimonial.image}
                alt={testimonial.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "/images/sample/avatar-placeholder.jpg";
                }}
              />
            </div>
            <div className="absolute -bottom-2 -right-2 bg-secondary-500 rounded-full p-1 shadow-md">
              <FaQuoteLeft className="text-white" size={10} />
            </div>
          </div>
        </div>
        <div>
          <h3 className="font-bold text-gray-800 text-lg">{testimonial.name}</h3>
          <p className="text-secondary-600 text-sm">{testimonial.role}</p>
          <p className="text-gray-500 text-xs">{testimonial.location}</p>
        </div>
      </div>

      <blockquote className="text-gray-600 italic relative pl-6 mb-4">
        <FaQuoteLeft className="absolute left-0 top-0 text-secondary-200" size={16} />
        <p className="leading-relaxed">"{testimonial.quote}"</p>
      </blockquote>

      <div className="flex text-amber-400">
        {[...Array(5)].map((_, i) => (
          <svg key={i} className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
    </motion.div>
  );
};

export default TestimonialCard;