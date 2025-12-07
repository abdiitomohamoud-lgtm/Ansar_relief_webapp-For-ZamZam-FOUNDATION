import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';
import { FaRegClock, FaUsers, FaTag, FaArrowRight, FaFire } from 'react-icons/fa';
import { useDonation } from '../../contexts/DonationContext';

const CampaignCard = ({ campaign }) => {
  // Calculate the percentage raised
  const percentage = Math.min(Math.round((campaign.raised / campaign.goal) * 100), 100);
  
  // Default image if the provided one fails to load
  const defaultImage = "/images/campaigns/hero/hero-bg.jpg";
  
  // Determine if campaign is urgent
  const isUrgent = campaign.isUrgent || campaign.daysLeft <= 7;
  
  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const { openQuickDonateWithUrgentNeed } = useDonation();

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      whileHover={{ 
        y: -10, 
        boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
      }}
      className="overflow-hidden rounded-xl bg-white shadow-md transition-all duration-300 h-full flex flex-col border border-gray-100"
    >
      {/* Image container with aspect ratio */}
      <div className="relative overflow-hidden h-48">
        <img 
          src={campaign.image} 
          alt={campaign.title}
          className="w-full h-full object-cover transform transition-transform duration-700 hover:scale-110"
          onError={(e) => {
            if (e.target.src.indexOf('/images/campaigns/water.jpg') === -1) {
              e.target.src = '/images/campaigns/water.jpg';
            }
          }}
        />
        
        {/* Gradient overlay for better text visibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        
        {/* Category badge */}
        <div className="absolute top-3 left-3 z-10">
          <div className="flex items-center bg-white/90 backdrop-blur-sm text-xs px-2.5 py-1 rounded-full text-gray-700 font-medium shadow-sm">
            <FaTag className="mr-1 text-primary-500" />
            {campaign.category}
          </div>
        </div>
        
        {/* Urgency badge */}
        {isUrgent && (
          <div className="absolute top-3 right-3 z-10">
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="flex items-center bg-red-500 text-white text-xs px-2.5 py-1 rounded-full font-medium shadow-sm"
            >
              <FaFire className="mr-1" />
              Urgent
            </motion.div>
          </div>
        )}
        
        {/* Days left indicator */}
        <div className="absolute bottom-3 right-3 z-10">
          <div className="flex items-center bg-black/50 backdrop-blur-sm text-xs px-2.5 py-1 rounded-full text-white">
            <FaRegClock className="mr-1" />
            {campaign.daysLeft > 0 
              ? `${campaign.daysLeft} day${campaign.daysLeft > 1 ? 's' : ''} left`
              : 'Ongoing'}
          </div>
        </div>
        
        {/* License in the bottom left */}
        <div className="absolute bottom-3 left-3 z-10">
          <div className="text-xs text-white/80">
            License: {campaign.licenseNumber}
          </div>
        </div>
      </div>
      
      {/* Card body */}
      <div className="p-4 flex-grow flex flex-col">
        <h3 className="text-lg font-bold mb-1 text-gray-800 line-clamp-2">{campaign.title}</h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{campaign.description}</p>
        
        {/* Progress bar */}
        <div className="mb-3">
          <div className="flex justify-between text-sm mb-1">
            <span className="font-medium text-gray-700">Progress</span>
            <span className="font-medium text-primary-600">{percentage}%</span>
          </div>
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-primary-500 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${percentage}%` }}
              transition={{ duration: 1, delay: 0.3 }}
            />
          </div>
        </div>
        
        {/* Raised and goal amounts */}
        <div className="flex justify-between text-sm mb-4">
          <div>
            <span className="text-gray-500 block">Raised</span>
            <span className="font-bold text-gray-800">{formatCurrency(campaign.raised)}</span>
          </div>
          <div className="text-right">
            <span className="text-gray-500 block">Goal</span>
            <span className="font-bold text-gray-800">{formatCurrency(campaign.goal)}</span>
          </div>
        </div>
        
        {/* Donors count */}
        <div className="flex items-center mb-4 mt-auto">
          <div className="flex -space-x-2 mr-2">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="w-6 h-6 rounded-full border-2 border-white overflow-hidden">
                <img 
                  src={`/images/sample/users/user-${i + 1}.jpg`} 
                  alt="Donor" 
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'%3E%3Ccircle cx='12' cy='8' r='5' fill='%23ccc'/%3E%3Cpath d='M3,21 h18 C21,12 3,12 3,21' fill='%23ccc'/%3E%3C/svg%3E";
                  }}
                />
              </div>
            ))}
            <div className="w-6 h-6 rounded-full bg-gray-100 border-2 border-white text-xs flex items-center justify-center font-bold text-gray-500">
              +{Math.floor(Math.random() * 20) + 10}
            </div>
          </div>
          <span className="text-xs text-gray-500">
            <FaUsers className="inline mr-1" />
            {Math.floor(Math.random() * 100) + 20} donors
          </span>
        </div>
        
        {/* Action buttons */}
        <div className="grid grid-cols-2 gap-2 mt-auto">
          <Link 
            to={`/campaigns/${campaign.id}`}
            className="text-center text-xs bg-gray-100 hover:bg-gray-200 px-3 py-2 rounded-lg text-gray-700 transition-colors flex items-center justify-center"
          >
            View Details
            <FaArrowRight className="ml-1 text-xs" />
          </Link>
          <button
            type="button"
            className="text-center text-xs bg-primary-500 hover:bg-primary-600 px-3 py-2 rounded-lg text-white transition-colors flex items-center justify-center"
            onClick={() => openQuickDonateWithUrgentNeed(campaign)}
          >
            Donate Now
          </button>
        </div>
      </div>
    </motion.div>
  );
};

CampaignCard.propTypes = {
  campaign: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    image: PropTypes.string,
    raised: PropTypes.number.isRequired,
    goal: PropTypes.number.isRequired,
    category: PropTypes.string.isRequired,
    daysLeft: PropTypes.number,
    licenseNumber: PropTypes.string,
    isUrgent: PropTypes.bool
  }).isRequired
};

export default CampaignCard;