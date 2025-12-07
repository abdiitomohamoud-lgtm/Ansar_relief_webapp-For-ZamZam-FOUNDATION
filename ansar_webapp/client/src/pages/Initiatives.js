import React from 'react';
import MainLayout from '../layouts/MainLayout';
import { motion } from 'framer-motion';
import { FaHandsHelping, FaWater, FaBook, FaHome, FaHeart, FaMosque } from 'react-icons/fa';

// Import mock data
import initiativesPageData from '../data/initiativesPageData.json';

const iconMap = {
  FaWater: <FaWater className="text-blue-500" size={24} />,
  FaBook: <FaBook className="text-green-500" size={24} />,
  FaHome: <FaHome className="text-purple-500" size={24} />,
  FaHeart: <FaHeart className="text-red-500" size={24} />,
  FaMosque: <FaMosque className="text-yellow-500" size={24} />,
  FaHandsHelping: <FaHandsHelping className="text-indigo-500" size={24} />
};

const Initiatives = () => {
  // Using mock data directly
  const initiatives = initiativesPageData.initiatives || [];

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-primary-600 to-primary-800 rounded-2xl p-8 mb-12 text-white">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">{initiativesPageData.hero?.title || 'Our Initiatives'}</h1>
            <p className="text-xl mb-8 opacity-90">
              {initiativesPageData.hero?.description || 'Discover the impactful programs and initiatives that are transforming communities around the world.'}
            </p>
          </motion.div>
        </div>

        {/* Initiatives Grid */}
        <div className="mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Current Initiatives</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Explore our ongoing projects that are making a real difference in people's lives.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {initiatives.map((initiative, index) => (
              <motion.div
                key={initiative.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                whileHover={{ y: -8 }}
                className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-300"
              >
                <div className="p-6">
                  <div className={`w-16 h-16 rounded-full bg-${initiative.color}-100 flex items-center justify-center mb-6`}>
                    {iconMap[initiative.icon] || iconMap.FaHandsHelping}
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-3">{initiative.title}</h3>
                  <p className="text-gray-600 mb-6">{initiative.description}</p>
                  <button className="text-primary-600 font-medium hover:text-primary-700 flex items-center transition-colors">
                    Learn More
                    <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Impact Section */}
        <div className="bg-gradient-to-r from-gray-50 to-white rounded-2xl p-8 mb-12 border border-gray-100">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-3xl font-bold text-gray-800 mb-6">{initiativesPageData.impact?.title || 'Making a Lasting Impact'}</h2>
                <p className="text-gray-600 mb-6">
                  {initiativesPageData.impact?.description || 'Our initiatives are designed to create sustainable change in communities. We focus on long-term solutions that empower people to improve their own lives.'}
                </p>
                <ul className="space-y-4 mb-8">
                  {initiativesPageData.impact?.features?.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <div className="flex-shrink-0 h-6 w-6 rounded-full bg-primary-100 flex items-center justify-center mt-1">
                        <svg className="h-4 w-4 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <p className="ml-3 text-gray-700">{feature}</p>
                    </li>
                  ))}
                </ul>
                <button className="px-6 py-3 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700 transition-colors shadow-md">
                  {initiativesPageData.impact?.cta || 'View Our Impact Report'}
                </button>
              </motion.div>
            </div>
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-gray-200 border-2 border-dashed rounded-xl w-full h-96 flex items-center justify-center text-gray-500"
            >
              Impact Visualization
            </motion.div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center py-12">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold text-gray-800 mb-6">{initiativesPageData.cta?.title || 'Support Our Initiatives'}</h2>
            <p className="text-gray-600 max-w-2xl mx-auto mb-8">
              {initiativesPageData.cta?.description || 'Your support helps us continue and expand our vital work in communities around the world.'}
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              {initiativesPageData.cta?.buttons?.map((button, index) => (
                <button 
                  key={index}
                  className={`px-8 py-4 ${button.type === 'primary' ? 'bg-primary-600 text-white hover:bg-primary-700' : 'bg-white text-primary-600 border border-primary-200 hover:bg-primary-50'} rounded-lg font-medium transition-colors shadow-lg`}
                >
                  {button.text}
                </button>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Initiatives;