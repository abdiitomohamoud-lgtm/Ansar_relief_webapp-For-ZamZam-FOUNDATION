import React from 'react';
import { motion } from 'framer-motion';

const PartnerLogo = ({ partner, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      whileHover={{ y: -5, scale: 1.05 }}
      className="group relative"
    >
      <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 p-6 flex items-center justify-center border border-gray-100 group-hover:border-gray-200 h-32">
        <img 
          src={partner.logo}
          alt={partner.name}
          className="max-h-16 max-w-full transition-all duration-500 filter grayscale group-hover:grayscale-0 group-hover:scale-110"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "/images/sample/logo-placeholder.png";
          }}
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-gray-100 to-white opacity-0 group-hover:opacity-10 rounded-xl transition-opacity duration-300"></div>
    </motion.div>
  );
};

export default PartnerLogo;