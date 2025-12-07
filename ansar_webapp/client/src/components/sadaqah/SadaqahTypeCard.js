import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  FaArrowRight, FaHeart, FaHandHoldingHeart, FaUsers, FaCalendarAlt, 
  FaRegCalendarCheck, FaUtensils, FaHandshake, FaWater, FaMosque,
  FaGraduationCap, FaHorse, FaPaw, FaClock, FaMoneyBillWave, FaChevronRight
} from 'react-icons/fa';

const iconMap = {
  FaHeart,
  FaHandHoldingHeart,
  FaUsers,
  FaCalendarAlt,
  FaRegCalendarCheck,
  FaUtensils,
  FaHandshake,
  FaWater,
  FaMosque,
  FaGraduationCap,
  FaCow: FaHorse,
  FaSheep: FaPaw,
  FaHandHeart: FaHeart
};

const SadaqahTypeCard = ({ option, fixedAmount = false }) => {
  // Get correct icon
  const Icon = iconMap[option.iconName] || FaHandHoldingHeart;
  
  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };
  
  return (
    <motion.div
      whileHover={{ y: -10 }}
      transition={{ duration: 0.4, ease: [0.6, 0.05, -0.01, 0.9] }}
      className="rounded-xl overflow-hidden bg-white shadow-lg border border-gray-100 h-full flex flex-col group hover:shadow-2xl transform-gpu"
    >
      {/* Top image */}
      <div className="relative h-56 overflow-hidden">
        <img 
          src={option.image} 
          alt={option.title} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          onError={(e) => {
            // Prevent repeated requests for missing image
            e.target.src = "";
          }}
        />
        
        {/* Gradient overlay with enhanced colors */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300"></div>
        
        {/* Tag if periodic with improved styling */}
        {option.isPeriodic && (
          <div className="absolute top-3 right-3 bg-primary-500 text-white text-xs font-medium px-3 py-1.5 rounded-full shadow-lg transform group-hover:scale-105 transition-transform">
            <span className="flex items-center gap-1">
              <span className="animate-pulse">●</span> Recurring
            </span>
          </div>
        )}
        
        {/* Fixed amount tag with improved styling */}
        {fixedAmount && option.amount && !option.customAmount && (
          <div className="absolute top-3 right-3 bg-primary-500 text-white text-xs font-medium px-3 py-1.5 rounded-full shadow-lg transform group-hover:scale-105 transition-transform">
            {formatCurrency(option.amount)}{option.perDay ? '/day' : ''}
          </div>
        )}
        
        {/* Custom amount tag with improved styling */}
        {fixedAmount && option.customAmount && (
          <div className="absolute top-3 right-3 bg-primary-500 text-white text-xs font-medium px-3 py-1.5 rounded-full shadow-lg transform group-hover:scale-105 transition-transform">
            Custom Amount
          </div>
        )}
        
        {/* Interval tag with improved styling */}
        {option.interval && (
          <div className="absolute top-3 right-3 bg-primary-500 text-white text-xs font-medium px-3 py-1.5 rounded-full shadow-lg transform group-hover:scale-105 transition-transform">
            {option.interval.charAt(0).toUpperCase() + option.interval.slice(1)}
          </div>
        )}
        
        {/* Day information with improved styling */}
        {(option.day || option.days) && (
          <div className="absolute bottom-3 left-3 text-white text-sm font-medium bg-black/50 backdrop-blur-sm px-3 py-1 rounded-lg">
            <span className="flex items-center gap-1.5">
              <FaRegCalendarCheck size={14} />
              {option.day ? 
                `Every ${option.day}` : 
                (option.days ? `Every ${option.days.join(' & ')}` : '')
              }
            </span>
          </div>
        )}
      </div>
      
      {/* Content with improved styling */}
      <div className="p-6 flex-grow flex flex-col">
        {/* Icon with animated hover effect */}
        <div className="w-14 h-14 rounded-full bg-primary-100 flex items-center justify-center mb-4 group-hover:bg-primary-200 transition-colors duration-300 shadow-md transform group-hover:scale-110 transition-transform">
          <Icon className="text-primary-600" size={24} />
        </div>
        
        {/* Title & Description with improved typography */}
        <h3 className="font-bold text-xl text-gray-800 mb-3 group-hover:text-primary-600 transition-colors">{option.title}</h3>
        <p className="text-gray-600 mb-6 leading-relaxed">{option.description}</p>
        
        {/* Amount indicator for fixed amount sadaqah types with improved design */}
        {fixedAmount && option.amount && !option.customAmount && (
          <div className="mt-auto mb-4 bg-primary-50 p-3 rounded-lg text-center group-hover:bg-primary-100 transition-colors duration-300 shadow-sm">
            <span className="text-primary-600 font-bold text-lg">{formatCurrency(option.amount)}</span>
            {option.perDay && <span className="text-primary-600 text-sm ml-1">per day</span>}
          </div>
        )}
        
        {/* Custom amount note with improved design */}
        {fixedAmount && option.customAmount && (
          <div className="mt-auto mb-4 bg-primary-50 p-3 rounded-lg text-center group-hover:bg-primary-100 transition-colors duration-300 shadow-sm">
            <span className="text-primary-600 text-sm">Custom amount based on your intention</span>
          </div>
        )}
        
        {/* CTA Button with enhanced hover effect */}
        <Link 
          to={`/sadaqah/${option.id}`} 
          className="mt-auto flex items-center justify-center gap-2 bg-primary-500 hover:bg-primary-600 text-white py-3 px-5 rounded-md font-medium transition-all duration-300 group-hover:shadow-lg"
        >
          <span className="group-hover:translate-x-[-4px] transition-transform duration-300">
            {option.cta || "Donate Now"}
          </span>
          <FaChevronRight className="text-white/80 group-hover:translate-x-1 transition-transform duration-300" size={14} />
        </Link>
      </div>
    </motion.div>
  );
};

export default SadaqahTypeCard; 