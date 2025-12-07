import React from 'react';
import { 
  FaHeart, 
  FaShieldAlt, 
  FaStar, 
  FaUsers, 
  FaGlobe, 
  FaHandshake 
} from 'react-icons/fa';

const Values = () => {
  const values = [
    {
      title: 'Compassion',
      description: 'We act with kindness and empathy, recognizing the dignity and worth of every person we serve.',
      icon: <FaHeart className="h-8 w-8 text-white" />
    },
    {
      title: 'Integrity',
      description: 'We uphold the highest ethical standards, ensuring transparency, honesty, and accountability in all our actions.',
      icon: <FaShieldAlt className="h-8 w-8 text-white" />
    },
    {
      title: 'Excellence',
      description: 'We strive for the highest quality in all our programs and services, continuously learning and improving.',
      icon: <FaStar className="h-8 w-8 text-white" />
    },
    {
      title: 'Respect',
      description: 'We honor the cultures, beliefs, and perspectives of the communities we serve and work with.',
      icon: <FaUsers className="h-8 w-8 text-white" />
    },
    {
      title: 'Sustainability',
      description: 'We implement solutions that create lasting impact and empower communities to become self-sufficient.',
      icon: <FaGlobe className="h-8 w-8 text-white" />
    },
    {
      title: 'Collaboration',
      description: 'We partner with local communities, organizations, and stakeholders to maximize our collective impact.',
      icon: <FaHandshake className="h-8 w-8 text-white" />
    }
  ];

  return (
    <div className="bg-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <h2 className="text-base text-primary-600 font-semibold tracking-wide uppercase">Our Values</h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Guiding Principles That Drive Our Work
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
            These core values form the foundation of our organization and guide every decision we make.
          </p>
        </div>

        <div className="mt-16">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {values.map((value, index) => (
              <div key={index} className="pt-6">
                <div className="flow-root bg-gray-50 rounded-lg px-6 pb-8">
                  <div className="-mt-6">
                    <div>
                      <span className="inline-flex items-center justify-center p-3 bg-primary-500 rounded-md shadow-lg">
                        {value.icon}
                      </span>
                    </div>
                    <h3 className="mt-8 text-lg font-medium text-gray-900 tracking-tight">{value.title}</h3>
                    <p className="mt-5 text-base text-gray-500">
                      {value.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Values; 