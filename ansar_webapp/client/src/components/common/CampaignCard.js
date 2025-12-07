import React from 'react';
import { Link } from 'react-router-dom';
import { FaRegClock } from 'react-icons/fa';
import ProgressBar from './ProgressBar';

const CampaignCard = ({ campaign }) => {
  // Calculate progress percentage
  const progressPercentage = campaign.goal > 0 
    ? Math.min(Math.round((campaign.raised / campaign.goal) * 100), 100) 
    : 0;
  
  // Calculate days remaining
  const calculateDaysRemaining = () => {
    if (!campaign.endDate) return null;
    
    const endDate = new Date(campaign.endDate);
    const today = new Date();
    const diffTime = endDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    return diffDays > 0 ? diffDays : 0;
  };
  
  const daysRemaining = calculateDaysRemaining();
  
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
      <Link to={`/campaigns/${campaign.slug || campaign.id}`}>
        <div className="relative h-48 overflow-hidden">
          <img 
            src={campaign.image} 
            alt={campaign.title} 
            className="w-full h-full object-cover"
          />
          {campaign.isUrgent && (
            <div className="absolute top-4 right-4 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded">
              URGENT
            </div>
          )}
        </div>
      </Link>
      
      <div className="p-5">
        <Link to={`/campaigns/${campaign.slug || campaign.id}`}>
          <h3 className="text-lg font-bold text-gray-900 mb-2 hover:text-primary-600 transition-colors">
            {campaign.title}
          </h3>
        </Link>
        
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {campaign.shortDescription || campaign.description}
        </p>
        
        <div className="mb-4">
          <ProgressBar percentage={progressPercentage} />
          
          <div className="flex justify-between mt-2 text-sm">
            <span className="font-semibold text-primary-600">
              ${campaign.raised.toLocaleString()}
              <span className="text-gray-500 font-normal"> raised</span>
            </span>
            <span className="text-gray-500">
              Goal: ${campaign.goal.toLocaleString()}
            </span>
          </div>
        </div>
        
        {daysRemaining !== null && (
          <div className="flex items-center text-sm text-gray-500">
            <FaRegClock className="mr-1" />
            <span>
              {daysRemaining === 0 
                ? 'Campaign ended' 
                : `${daysRemaining} days remaining`}
            </span>
          </div>
        )}
        
        <div className="mt-4 pt-4 border-t border-gray-100">
          <Link 
            to={`/campaigns/${campaign.slug || campaign.id}`}
            className="block w-full py-2 text-center bg-primary-600 text-white rounded hover:bg-primary-700 transition-colors"
          >
            Donate Now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CampaignCard; 