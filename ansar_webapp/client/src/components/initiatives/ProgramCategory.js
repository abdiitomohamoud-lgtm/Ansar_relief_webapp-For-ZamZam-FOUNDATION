import React from 'react';
import { motion } from 'framer-motion';

const ProgramCategory = ({ category, isActive, onClick }) => {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`flex flex-col items-center p-6 rounded-lg transition-colors ${
        isActive
          ? 'bg-primary-600 text-white'
          : 'bg-white text-gray-800 hover:bg-gray-50'
      }`}
    >
      <div className="text-3xl mb-4">{category.icon}</div>
      <h3 className="text-lg font-semibold">{category.name}</h3>
      <p className="text-sm mt-2 opacity-80">{category.description}</p>
    </motion.button>
  );
};

export default ProgramCategory; 