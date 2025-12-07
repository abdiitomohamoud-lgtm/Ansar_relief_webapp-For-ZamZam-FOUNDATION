import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaArrowRight, FaHeart, FaHandHoldingHeart, FaUsers, FaCalendarAlt, FaRegCalendarCheck, FaMapMarkerAlt, FaUserFriends } from 'react-icons/fa';

const iconMap = {
  FaHeart,
  FaHandHoldingHeart,
  FaUsers,
  FaCalendarAlt,
  FaRegCalendarCheck,
  FaWater: FaHeart,
  FaMosque: FaHeart,
  FaGraduationCap: FaHeart
};

const DonationCard = ({ option }) => {
  // Calculate percentage raised
  const percentageRaised = option.goal ? Math.min(Math.round((option.raised / option.goal) * 100), 100) : 0;
  
  // Get correct icon
  const Icon = iconMap[option.iconName] || FaHeart;
  
  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  // Determine status label and color
  const getStatusInfo = () => {
    if (percentageRaised < 30) {
      return { label: 'Just Started', color: 'bg-yellow-500' };
    } else if (percentageRaised < 70) {
      return { label: 'In Progress', color: 'bg-blue-500' };
    } else if (percentageRaised < 100) {
      return { label: 'Almost There', color: 'bg-green-500' };
    } else {
      return { label: 'Goal Reached', color: 'bg-primary-600' };
    }
  };

  const statusInfo = getStatusInfo();

  return (
    <motion.div
      whileHover={{ y: -10 }}
      transition={{ duration: 0.4, ease: [0.6, 0.05, -0.01, 0.9] }}
      className="rounded-xl overflow-hidden bg-white shadow-lg border border-gray-100 h-full flex flex-col group hover:shadow-2xl transform-gpu"
    >
      {/* Image with enhanced overlay */}
      <div className="relative h-52 overflow-hidden">
        <img 
          src={option.image} 
          alt={option.title} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          onError={(e) => {
            // Prevent repeated requests for missing image
            e.target.src = "";
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent opacity-80 group-hover:opacity-70 transition-opacity duration-300"></div>
        
        {/* Status badge */}
        <div className={`absolute top-3 right-3 ${statusInfo.color} text-white text-xs font-semibold px-3 py-1.5 rounded-full shadow-md transform group-hover:scale-105 transition-transform`}>
          {statusInfo.label}
        </div>
        
        {/* Icon overlay with enhanced styling */}
        <div className="absolute top-3 left-3 bg-white rounded-full p-2.5 shadow-md transform group-hover:scale-110 transition-transform">
          <Icon className="text-primary-600" size={20} />
        </div>
      </div>
      
      {/* Content with enhanced styling */}
      <div className="p-5 flex-grow flex flex-col">
        <h3 className="font-bold text-xl text-gray-800 mb-2 group-hover:text-primary-600 transition-colors">{option.title}</h3>
        <p className="text-gray-600 mb-4 leading-relaxed line-clamp-2">{option.description}</p>
        
        {/* Additional info grid */}
        {option.goal && (
          <div className="grid grid-cols-2 gap-2 mb-4 mt-auto">
            <div className="bg-gray-50 p-2 rounded-lg flex items-center gap-2">
              <FaMapMarkerAlt className="text-primary-400" />
              <span className="text-sm text-gray-700">{option.location || 'Multiple Locations'}</span>
            </div>
            <div className="bg-gray-50 p-2 rounded-lg flex items-center gap-2">
              <FaUserFriends className="text-primary-400" />
              <span className="text-sm text-gray-700">{option.donors || '120'} Donors</span>
            </div>
          </div>
        )}
        
        {/* Progress bar with enhanced styling */}
        {option.goal && (
          <div className="mt-auto mb-4">
            <div className="flex justify-between items-center text-sm mb-1.5">
              <span className="text-gray-700 font-medium">{formatCurrency(option.raised)} raised</span>
              <span className="text-gray-500">of {formatCurrency(option.goal)}</span>
            </div>
            <div className="w-full h-2.5 bg-gray-200 rounded-full overflow-hidden relative">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${percentageRaised}%` }}
                transition={{ duration: 1, delay: 0.2 }}
                className={`h-full rounded-full ${
                  percentageRaised < 30 ? 'bg-yellow-500' : 
                  percentageRaised < 70 ? 'bg-blue-500' : 
                  'bg-green-500'
                }`}
              />
              <div className="absolute top-0 left-0 right-0 bottom-0 overflow-hidden">
                <div className="h-full w-full opacity-20 bg-stripes"></div>
              </div>
            </div>
            <div className="flex justify-between text-sm mt-1.5">
              <span className="text-primary-600 font-medium">
                {percentageRaised}% Complete
              </span>
              {option.daysLeft && (
                <span className="text-gray-500">
                  {option.daysLeft} days left
                </span>
              )}
            </div>
          </div>
        )}
        
        {/* CTA Button with enhanced hover effect */}
        <Link 
          to={`/sadaqah/${option.id}`} 
          className="flex items-center justify-center gap-2 bg-primary-500 hover:bg-primary-600 text-white py-3 px-5 rounded-md font-medium transition-all duration-300 group-hover:shadow-lg"
        >
          <span className="group-hover:translate-x-[-4px] transition-transform duration-300">
            {option.cta || "Donate Now"}
          </span>
          <FaArrowRight className="text-white/80 group-hover:translate-x-1 transition-transform duration-300" size={14} />
        </Link>
      </div>
    </motion.div>
  );
};

export default DonationCard; 