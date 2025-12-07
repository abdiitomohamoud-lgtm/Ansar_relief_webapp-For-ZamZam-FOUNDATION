import React from 'react';
import { motion } from 'framer-motion';

<section className="relative pt-32 pb-20 md:pt-40 md:pb-28 bg-gradient-to-br from-gray-50 via-white to-gray-50">
  <div className="container mx-auto px-4">
    <div className="max-w-4xl mx-auto text-center">
      <motion.h1 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6"
      >
        Empowering Communities Through Compassion
      </motion.h1>
      <motion.p 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="text-lg md:text-xl text-gray-700 mb-8 max-w-2xl mx-auto"
      >
        Join us in making a difference. Your support helps transform lives and build stronger communities.
      </motion.p>
    </div>
  </div>
</section> 