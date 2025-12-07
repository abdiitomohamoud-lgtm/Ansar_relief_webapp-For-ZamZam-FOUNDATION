import React from 'react';
import { motion } from 'framer-motion';
import { FaArrowRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const ProgramCard = ({ program, ICONS }) => {
  const Icon = ICONS[program.icon] || FaArrowRight;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0, duration: 0.3 }}
      className="group perspective"
    >
      <Link
        to={program.link}
        className={`flex flex-col items-center justify-center p-6 bg-white rounded-2xl ${program.border} shadow-sm hover:shadow-xl ${program.shadow} transition-all duration-300 group-hover:translate-y-[-8px] group-hover:rotate-3 h-full relative overflow-hidden backdrop-blur-sm`}
      >
        {/* Background decoration */}
        <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${program.color} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`}></div>
        
        {/* Background circles */}
        <div className={`absolute -top-20 -right-20 w-40 h-40 rounded-full ${program.bgLight} opacity-0 group-hover:opacity-30 transition-all duration-500 delay-100`}></div>
        <div className={`absolute -bottom-24 -left-24 w-48 h-48 rounded-full ${program.bgLight} opacity-0 group-hover:opacity-30 transition-all duration-500`}></div>
        
        {/* Icon with glow effect */}
        <div className={`w-20 h-20 rounded-2xl mb-4 flex items-center justify-center text-white bg-gradient-to-br ${program.color} transform group-hover:scale-110 transition-all duration-300 shadow-lg group-hover:rotate-3 relative overflow-hidden z-10`}>
          <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl bg-white/30"></div>
          <div className="relative z-10">
            <Icon size={24} />
          </div>
        </div>
        
        {/* Content */}
        <span className={`text-base font-bold text-gray-800 ${program.textHover} transition-colors duration-300 mb-1`}>{program.title}</span>
        <span className="text-xs text-gray-500 opacity-0 group-hover:opacity-100 transition-all duration-300 delay-100">{program.description}</span>
        <div className={`w-10 h-0.5 bg-gradient-to-r ${program.color} mt-3 opacity-0 group-hover:opacity-100 transition-all duration-300`}></div>
        
        {/* Arrow indicator */}
        <div className={`absolute bottom-4 right-4 w-5 h-5 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 delay-200 ${program.textHover}`}>
          <FaArrowRight size={10} />
        </div>
      </Link>
    </motion.div>
  );
};

export default ProgramCard;