import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaMapMarkerAlt, FaChartLine, FaArrowRight, FaCalendarAlt } from 'react-icons/fa';

const InitiativeCard = ({ initiative }) => {
  return (
    <motion.div
      whileHover={{ 
        y: -5,
        boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)'
      }}
      className="bg-white rounded-lg overflow-hidden shadow-md transition-all duration-300 h-full flex flex-col group hover-lift"
    >
      <div className="relative">
        <img 
          src={initiative.image} 
          alt={initiative.title} 
          className="w-full h-52 object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute top-0 inset-x-0 h-24 bg-gradient-to-b from-black/50 to-transparent z-10"></div>
        <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-black/70 to-transparent z-10"></div>
        <div className="absolute top-4 right-4 z-20">
          <span className="badge-primary px-3 py-1 text-xs font-medium">
            {initiative.status}
          </span>
        </div>
        <div className="absolute bottom-4 left-4 z-20">
          <span className="flex items-center text-white text-xs">
            <FaCalendarAlt className="mr-1" />
            Started 2023
          </span>
        </div>
      </div>
      
      <div className="p-5 flex-grow flex flex-col">
        <h3 className="font-bold text-xl mb-2 text-gray-800 group-hover:text-primary-600 transition-colors">
          {initiative.title}
        </h3>
        
        <p className="text-gray-600 mb-4 flex-grow">
          {initiative.description}
        </p>
        
        <div className="grid grid-cols-2 gap-2 mb-4">
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center mr-2">
              <FaChartLine className="text-primary-600" />
            </div>
            <span className="text-sm text-gray-700">{initiative.impact}</span>
          </div>
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center mr-2">
              <FaMapMarkerAlt className="text-primary-600" />
            </div>
            <span className="text-sm text-gray-700">{initiative.location}</span>
          </div>
        </div>
        
        {/* Progress bar */}
        <div className="mb-4">
          <div className="flex justify-between text-sm mb-1">
            <span className="text-gray-600">Progress</span>
            <span className="font-medium">75%</span>
          </div>
          <div className="progress-bar">
            <div className="bg-primary-500 h-full rounded-full" style={{ width: '75%' }}></div>
          </div>
        </div>
        
        {/* Determine the correct detail page for the initiative */}
        {(() => {
          // Map initiative categories/titles to explicit paths (case-insensitive, trimmed, exact match only)
          const categoryLinks = {
            // Projects categories
            'water': '/projects/categories/water',
            'clean water initiative': '/projects/categories/water',
            'education': '/projects/categories/education',
            'education support program': '/projects/categories/education',
            'health': '/projects/categories/health',
            'healthcare': '/projects/categories/health',
            'healthcare access program': '/projects/categories/health',
            'relief': '/projects/categories/relief',
            'community': '/projects/categories/relief', // closest match for community development
            'community development': '/projects/categories/relief',
            'mosques': '/projects/categories/mosques',
            'mosque': '/projects/categories/mosques',
            'mosque construction': '/projects/categories/mosques',
            'income': '/projects/categories/income',
            'housing': '/projects/categories/housing',
            'food': '/projects/categories/relief', // map food security to relief
            'food security program': '/projects/categories/relief',
            'library': '/projects/categories/education', // map libraries to education
            'community libraries': '/projects/categories/education',
            'partnership': '/projects/categories/relief', // map partnerships to relief
            'strategic partnerships': '/projects/categories/relief',
            // Sponsorship categories
            'orphan': '/sponsorship/categories/orphan',
            'orphan support program': '/sponsorship/orphan',
            'student sponsorship': '/sponsorship/student',
            'family sponsorship': '/sponsorship/family',
            'teacher sponsorship': '/sponsorship/teacher',
            'special needs sponsorship': '/sponsorship/special-needs',
          };

          const cat = initiative.category && typeof initiative.category === 'object' ? initiative.category.name : initiative.category;
          const catKey = cat ? String(cat).trim().toLowerCase() : '';
          const titleKey = initiative.title ? String(initiative.title).trim().toLowerCase() : '';
          const link = categoryLinks[catKey] || categoryLinks[titleKey];

          if (link) {
            return (
              <Link 
                to={link}
                className="mt-2 inline-flex items-center justify-center px-4 py-2 border border-primary-600 text-primary-600 rounded hover:bg-primary-50 transition-colors w-full group"
              >
                Learn More
                <FaArrowRight className="ml-2 transform transition-transform group-hover:translate-x-1" />
              </Link>
            );
          } else {
            // Log for debugging
            if (cat || titleKey) {
              // eslint-disable-next-line no-console
              console.warn('No matching detail page for initiative:', { category: cat, title: initiative.title });
            }
            return (
              <button
                className="mt-2 inline-flex items-center justify-center px-4 py-2 border border-gray-300 text-gray-400 rounded bg-gray-100 cursor-not-allowed w-full group"
                title="No detail page available for this initiative."
                disabled
              >
                Learn More
                <FaArrowRight className="ml-2 transform transition-transform" />
              </button>
            );
          }
        })()}
      </div>
    </motion.div>
  );
};

export default InitiativeCard; 