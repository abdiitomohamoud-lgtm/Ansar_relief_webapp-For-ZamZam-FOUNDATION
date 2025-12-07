import React from 'react';
import { motion } from 'framer-motion';

const ImpactStat = ({ number, label, delay = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay }}
      className="text-center bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-all"
    >
      <motion.div
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ delay: delay + 0.2, type: 'spring' }}
      >
        <motion.h3 
          className="text-4xl md:text-5xl font-bold text-primary-600 mb-2"
          animate={{ 
            opacity: [0.7, 1, 0.7],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut"
          }}
        >
          {number}
        </motion.h3>
        <p className="text-gray-600 font-medium">{label}</p>
      </motion.div>
      
      <motion.div
        className="mt-4 w-16 h-1 bg-primary-500 mx-auto rounded-full"
        initial={{ width: 0 }}
        whileInView={{ width: 64 }}
        viewport={{ once: true }}
        transition={{ delay: delay + 0.4, duration: 0.8 }}
      />
    </motion.div>
  );
};

export default ImpactStat; 