import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaHandshake, FaExternalLinkAlt, FaArrowRight } from 'react-icons/fa';

const Partners = ({ partners = [] }) => {
  const [activeCategory, setActiveCategory] = useState('All');

  // Extract unique categories from partners prop
  const categories = ['All', ...Array.from(new Set((partners || []).map(p => p.category).filter(Boolean)))];

  const filteredPartners = activeCategory === 'All'
    ? partners
    : partners.filter(partner => partner.category === activeCategory);

  const defaultLogo = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='60' viewBox='0 0 120 60'%3E%3Crect width='120' height='60' fill='%23f2f2f2'/%3E%3Cpath d='M60,20 L80,40 L60,40 L40,40 Z' fill='%23d1d1d1'/%3E%3Ccircle cx='60' cy='30' r='15' fill='%23e6e6e6' stroke='%23d1d1d1' stroke-width='2'/%3E%3C/svg%3E";

  return (
    <section className="py-16 bg-white relative overflow-hidden">
      {/* Background patterns and decorative elements */}
      <div className="absolute inset-0 pattern-geometric opacity-5 pattern-overlay"></div>
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-primary-100 opacity-20 blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-secondary-100 opacity-20 blur-3xl"></div>
      
      {/* Animated subtle floating shapes */}
      <motion.div 
        className="absolute top-40 right-40 w-16 h-16 rounded-islamic border-2 border-primary-200 opacity-30"
        animate={{ 
          y: [0, 15, 0],
          rotate: [0, 10, 0]
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-block relative mb-2">
            <div className="h-1 w-10 bg-primary-500 absolute -top-4 left-1/2 transform -translate-x-1/2"></div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3 font-heading relative inline-block">
              Our Partners
              <motion.div 
                className="absolute -bottom-2 left-0 h-1 bg-primary-500"
                initial={{ width: 0 }}
                whileInView={{ width: '100%' }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
              />
            </h2>
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Working together with prestigious organizations to maximize our impact around the world
          </p>
        </motion.div>
        
        {/* Category filter */}
        <div className="flex justify-center flex-wrap gap-2 mb-8">
          {categories.map((category, index) => (
            <motion.button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                activeCategory === category 
                  ? 'bg-primary-600 text-white shadow-md' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
              whileHover={{ y: -2 }}
              whileTap={{ y: 0 }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
            >
              {category}
            </motion.button>
          ))}
        </div>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
        >
          {filteredPartners.map((partner, index) => (
            <motion.div
              key={partner.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ 
                y: -5,
                boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)"
              }}
              className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 relative"
            >
              <div className="absolute top-2 right-2 bg-gray-100 text-xs px-2 py-1 rounded-full text-gray-600">
                {partner.category}
              </div>
              
              <div className="flex flex-col items-center p-6">
                <div className="w-32 h-20 flex items-center justify-center mb-4">
                  <img 
                    src={partner.logo} 
                    alt={partner.name}
                    className="max-w-full max-h-full object-contain"
                    onError={(e) => {
                      e.target.src = defaultLogo;
                    }}
                  />
                </div>
                
                <h3 className="text-lg font-semibold text-center text-gray-800 mb-2">{partner.name}</h3>
                <p className="text-sm text-gray-600 text-center mb-4 line-clamp-2">{partner.description}</p>
                
                <a 
                  href={partner.website} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="mt-auto inline-flex items-center text-sm text-primary-600 hover:text-primary-700 font-medium"
                >
                  Visit Website <FaExternalLinkAlt className="ml-1 text-xs" />
                </a>
              </div>
            </motion.div>
          ))}
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <div className="inline-flex flex-col items-center">
            <div className="mb-4 w-16 h-16 rounded-full bg-primary-50 flex items-center justify-center shadow-md">
              <FaHandshake className="text-primary-600 text-xl" />
            </div>
            <motion.button
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)"
              }}
              whileTap={{ scale: 0.98 }}
              className="bg-primary-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-primary-700 transition-colors inline-flex items-center font-medium"
            >
              Become a Partner
              <motion.div
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="ml-2"
              >
                <FaArrowRight />
              </motion.div>
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Partners;