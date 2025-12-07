import React from 'react';
import { Link } from 'react-router-dom';

const CTASection = ({ 
  title, 
  description, 
  primaryButtonText, 
  primaryButtonUrl, 
  secondaryButtonText, 
  secondaryButtonUrl,
  backgroundPattern
}) => {
  return (
    <section className="py-16 bg-primary-700 text-white relative overflow-hidden">
      {/* Pattern background */}
      <div className={`absolute inset-0 ${backgroundPattern || 'pattern-islamic'}`} style={{ color: 'rgba(255,255,255,0.05)' }}></div>
      
      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{title}</h2>
          <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">{description}</p>
          
          <div className="flex flex-wrap justify-center gap-4">
            <Link 
              to={primaryButtonUrl} 
              className="px-6 py-3 bg-white text-primary-700 rounded-md font-medium hover:bg-gray-100 transition-colors duration-200 shadow-md flex items-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M3.293 9.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L4.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
              {primaryButtonText}
            </Link>
            
            <Link 
              to={secondaryButtonUrl} 
              className="px-6 py-3 border-2 border-white text-white rounded-md font-medium hover:bg-white/10 transition-colors duration-200 flex items-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
              </svg>
              {secondaryButtonText}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection; 