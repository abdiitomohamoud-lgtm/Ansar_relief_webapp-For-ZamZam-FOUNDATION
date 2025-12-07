import React from 'react';
import { motion } from 'framer-motion';
import { FaHeart } from 'react-icons/fa';

const UrgentCaseCard = ({ kase, openQuickDonateWithUrgentNeed }) => {
  return (
    <motion.div
      key={kase.id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0, duration: 0.5 }}
      whileHover={{ y: -8, transition: { duration: 0.3 } }}
      className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 hover:border-red-100 transition-all duration-300 group"
    >
      <div className="relative h-48 overflow-hidden">
        <div className="absolute top-0 left-0 bg-gradient-to-r from-red-600 to-red-500 text-white px-3 py-1 z-10 rounded-br-lg font-medium shadow-md">
          Urgent
        </div>
        <img 
          src={kase.image} 
          alt={kase.title} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <h3 className="text-white font-bold text-lg group-hover:text-red-100 transition-colors">{kase.title}</h3>
        </div>
      </div>
      
      <div className="p-5 bg-white relative">
        <div className="absolute -top-6 right-6 w-12 h-12 bg-red-600 rounded-full shadow-lg flex items-center justify-center transform group-hover:rotate-12 transition-transform">
          <FaHeart className="text-white" size={16} />
        </div>
        
        <p className="text-gray-600 text-sm mb-4 line-clamp-2 h-10">
          {kase.description}
        </p>
        
        <div className="mb-4">
          <div className="flex justify-between text-sm mb-1">
            <span className="font-medium">Amount Needed:</span>
            <span className="text-red-600 font-bold">${kase.amount}</span>
          </div>
          <div className="flex justify-between text-sm mb-2">
            <span className="font-medium">Remaining:</span>
            <span className="text-red-600 font-bold">${kase.remaining}</span>
          </div>
          <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-red-600 to-red-500 rounded-full shadow-inner" 
              style={{ width: `${((kase.amount - kase.remaining) / kase.amount) * 100}%` }}
            ></div>
          </div>
        </div>
        
        <button
          type="button"
          className="block w-full bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 text-white text-center py-3 rounded-lg transition-all font-medium shadow-md hover:shadow-lg group-hover:translate-y-0.5"
          onClick={() => openQuickDonateWithUrgentNeed(kase)}
        >
          Donate Now
        </button>
      </div>
    </motion.div>
  );
};

export default UrgentCaseCard;