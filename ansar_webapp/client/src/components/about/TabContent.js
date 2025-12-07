import React from 'react';
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';

const TabContent = ({ title, description, children, className = '' }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className={`space-y-12 ${className}`}
    >
      <div className="text-center mb-12">
        <motion.h2 
          className="text-4xl font-bold text-gray-900 mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {title}
        </motion.h2>
        <motion.p 
          className="text-lg text-gray-600 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          {description}
        </motion.p>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="relative"
      >
        {/* Decorative background elements */}
        <div className="absolute inset-0 grid grid-cols-2 -z-10">
          <div className="bg-gradient-to-br from-primary-50 via-transparent to-transparent opacity-30"></div>
          <div className="bg-gradient-to-bl from-primary-50 via-transparent to-transparent opacity-30"></div>
        </div>

        {/* Content wrapper */}
        <div className="relative">
          {children}
        </div>
      </motion.div>
    </motion.div>
  );
};

TabContent.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  className: PropTypes.string
};

export default TabContent; 