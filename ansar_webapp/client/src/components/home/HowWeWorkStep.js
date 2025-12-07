import React from 'react';
import { motion } from 'framer-motion';
import { FaHeart } from 'react-icons/fa';

const HowWeWorkStep = ({ step, ICONS }) => {
  const Icon = ICONS[step.icon] || FaHeart;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0, duration: 0.5 }}
      className="relative flex flex-col items-center"
    >
      {/* Step number with gradient background */}
      <div className="relative mb-10 z-20">
        <motion.div
          whileHover={{ y: -5, scale: 1.05 }}
          className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${step.color} text-white flex items-center justify-center text-2xl font-bold shadow-lg transform rotate-3 hover:rotate-6 transition-all duration-300`}
        >
          <div className="absolute inset-0 bg-white opacity-0 hover:opacity-20 transition-opacity duration-300 rounded-2xl"></div>
          {step.step}
        </motion.div>
        
        {/* Small icon at the corner */}
        <div className={`absolute -bottom-2 -right-2 w-10 h-10 rounded-full ${step.bgLight} flex items-center justify-center shadow-md ${step.textColor}`}>
          <Icon className={step.textColor} size={24} />
        </div>
      </div>
      
      {/* Connecting dots for mobile */}
      <div className="lg:hidden h-10 border-l-2 border-dashed border-primary-200 my-2"></div>
      
      {/* Content card */}
      <motion.div
        whileHover={{ y: -8, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
        className="bg-white rounded-xl p-6 shadow-md border border-gray-100 hover:border-primary-100 transition-all h-full w-full z-10"
      >
        <div className={`w-12 h-1 ${step.bgLight} mb-4 rounded-full`}></div>
        <h3 className={`text-xl font-bold mb-3 ${step.textColor}`}>{step.title}</h3>
        <p className="text-gray-600 text-sm leading-relaxed">{step.description}</p>
        
        {/* Step marker */}
        <div className="flex items-center mt-4 pt-4 border-t border-gray-100">
          <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white bg-gradient-to-r ${step.color}`}>
            {step.step}
          </div>
          <div className="ml-2 text-xs font-medium text-gray-500">Step {step.step} of 4</div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default HowWeWorkStep;