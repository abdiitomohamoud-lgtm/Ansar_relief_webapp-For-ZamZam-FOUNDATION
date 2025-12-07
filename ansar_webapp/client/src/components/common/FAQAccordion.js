import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const FAQAccordion = ({ faqItems }) => {
  const [activeIndex, setActiveIndex] = useState(null);
  
  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };
  
  return (
    <div className="space-y-4">
      {faqItems.map((item, index) => (
        <div key={index} className="border border-gray-200 rounded-md overflow-hidden">
          <button
            className={`w-full p-4 text-left flex justify-between items-center ${
              activeIndex === index ? 'bg-primary-50' : 'bg-white hover:bg-gray-50'
            } transition-colors duration-200`}
            onClick={() => toggleAccordion(index)}
          >
            <span className="font-medium text-gray-800">{item.question}</span>
            <svg
              className={`w-5 h-5 text-primary-600 transform transition-transform duration-300 ${
                activeIndex === index ? 'rotate-180' : 'rotate-0'
              }`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          
          <AnimatePresence>
            {activeIndex === index && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="p-4 bg-white border-t border-gray-200">
                  <p className="text-gray-600">{item.answer}</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
};

export default FAQAccordion; 