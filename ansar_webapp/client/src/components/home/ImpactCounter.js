import React from 'react';
import { motion } from 'framer-motion';

const ImpactCounter = ({ value, label, icon: Icon }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-xl p-6 shadow-md border border-gray-100 hover:shadow-lg transition-shadow text-center relative overflow-hidden group"
    >
      <div className="absolute top-0 right-0 w-20 h-20 bg-secondary-50 rounded-bl-full -mt-2 -mr-2 transition-transform duration-500 group-hover:scale-150"></div>
      <div className="w-16 h-16 bg-white rounded-full shadow-sm flex items-center justify-center mx-auto mb-6 relative z-10">
        <Icon className="text-secondary-600" size={28} />
      </div>
      <h3 className="text-4xl font-bold text-gray-800 mb-2">{value}</h3>
      <p className="text-gray-600 font-medium">{label}</p>
    </motion.div>
  );
};

export default ImpactCounter;