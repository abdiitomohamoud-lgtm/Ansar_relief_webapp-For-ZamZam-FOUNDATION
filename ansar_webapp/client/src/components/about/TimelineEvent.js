import React from 'react';
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';

// Import timeline images
import timeline2005 from '../../assets/images/about/timeline-2005.jpg';
import timeline2010 from '../../assets/images/about/timeline-2010.jpg';
import timeline2015 from '../../assets/images/about/timeline-2015.jpg';
import timeline2020 from '../../assets/images/about/timeline-2020.jpg';

// Map of timeline images by year
const timelineImages = {
  2005: timeline2005,
  2010: timeline2010,
  2015: timeline2015,
  2020: timeline2020,
  // Add fallback for any other years
  default: timeline2005
};

const TimelineEvent = ({ year, title, description, image, isLeft, delay = 0 }) => {
  // Use the mapped image or fallback to default
  const timelineImage = timelineImages[year] || timelineImages.default;

  return (
    <motion.div
      initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay }}
      className={`flex items-center justify-center mb-8 ${isLeft ? 'flex-row' : 'flex-row-reverse'}`}
    >
      <div className="w-1/2 px-4">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <img
            src={timelineImage}
            alt={`${year} - ${title}`}
            className="w-full h-48 object-cover"
          />
          <div className="p-6">
            <div className="inline-block px-4 py-2 bg-primary-100 text-primary-600 rounded-full text-sm font-semibold mb-4">
              {year}
            </div>
            <h3 className="text-xl font-semibold mb-2">{title}</h3>
            <p className="text-gray-600">{description}</p>
          </div>
        </div>
      </div>
      
      <div className="w-12 flex flex-col items-center">
        <div className="w-4 h-4 rounded-full bg-primary-600"></div>
        <div className="w-1 flex-1 bg-primary-200"></div>
      </div>
      
      <div className="w-1/2 px-4"></div>
    </motion.div>
  );
};

TimelineEvent.propTypes = {
  year: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  isLeft: PropTypes.bool.isRequired,
  delay: PropTypes.number
};

export default TimelineEvent; 