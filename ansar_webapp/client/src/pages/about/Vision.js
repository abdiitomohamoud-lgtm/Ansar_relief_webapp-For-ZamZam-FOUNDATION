import React from 'react';

const Vision = () => {
  return (
    <div className="bg-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <h2 className="text-base text-primary-600 font-semibold tracking-wide uppercase">Our Vision</h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            A World of Dignity, Justice, and Opportunity
          </p>
        </div>

        <div className="mt-10">
          <div className="prose prose-lg mx-auto text-gray-500">
            <div className="relative py-10 px-6 sm:px-10 bg-gradient-to-r from-primary-50 to-primary-100 rounded-xl shadow-sm overflow-hidden">
              <div className="relative z-10">
                <p className="text-xl font-medium text-primary-800 text-center">
                  We envision a world where every person lives with dignity, has access to basic necessities, 
                  and is empowered to reach their full potential regardless of race, religion, gender, or nationality.
                </p>
              </div>
              <div className="absolute inset-0 pattern2 opacity-10"></div>
            </div>
            
            <div className="mt-12">
              <h3 className="text-xl font-semibold text-gray-800 mb-6">Our Vision Encompasses:</h3>
              
              <ul className="space-y-6">
                <li className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-6 w-6 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="ml-3">
                    <strong className="text-gray-800">Communities free from poverty and suffering</strong> - Where basic needs 
                    are met and people have the resources to live healthy, productive lives.
                  </p>
                </li>
                
                <li className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-6 w-6 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="ml-3">
                    <strong className="text-gray-800">Self-sufficient and resilient societies</strong> - Capable of responding 
                    to challenges and able to sustain their development independently.
                  </p>
                </li>
                
                <li className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-6 w-6 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="ml-3">
                    <strong className="text-gray-800">Equal opportunities for all</strong> - Regardless of background, 
                    with access to education, healthcare, and economic opportunities.
                  </p>
                </li>
                
                <li className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-6 w-6 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="ml-3">
                    <strong className="text-gray-800">A culture of compassion and generosity</strong> - Where people are 
                    empowered to help others and make a positive difference in the world.
                  </p>
                </li>
              </ul>
            </div>
            
            <p className="mt-10">
              This vision guides all of our activities and decisions, keeping us focused on creating lasting positive 
              change in the world. We believe that by working together with communities, donors, and partners, we can 
              help bring this vision closer to reality.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Vision; 