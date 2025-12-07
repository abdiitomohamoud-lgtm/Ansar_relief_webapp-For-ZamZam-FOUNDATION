import React from 'react';
import { motion } from 'framer-motion';
import { FaMapMarkerAlt, FaDownload, FaRegClock, FaUsers, FaHandHoldingHeart } from 'react-icons/fa';

const HumanitarianMap = () => {
  const recentNeeds = [
    {
      title: 'Emergency Medical Aid',
      location: 'Central District',
      time: '2 hours ago',
      icon: FaHandHoldingHeart,
      color: 'red'
    },
    {
      title: 'Food Distribution',
      location: 'Eastern Region',
      time: '5 hours ago',
      icon: FaUsers,
      color: 'blue'
    },
    {
      title: 'Education Support',
      location: 'Western District',
      time: '1 day ago',
      icon: FaMapMarkerAlt,
      color: 'green'
    }
  ];

  const stats = [
    {
      value: '150+',
      label: 'Active Cases',
      color: 'blue'
    },
    {
      value: '45',
      label: 'Locations',
      color: 'green'
    },
    {
      value: '24/7',
      label: 'Support',
      color: 'purple'
    }
  ];

  return (
    <section className="bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900">Humanitarian Needs in Your Area</h2>
          <p className="mt-4 text-lg text-gray-600">
            Use our interactive map to find and support humanitarian needs in your local community
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Map Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-xl shadow-lg overflow-hidden"
          >
            <div className="p-6">
              <div className="relative aspect-w-16 aspect-h-9 mb-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <FaMapMarkerAlt className="text-6xl text-blue-500 mb-4" />
                    <p className="text-gray-600">Interactive map coming soon</p>
                  </div>
                </div>
                {/* Map overlay elements */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
                <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg px-4 py-2 shadow-lg">
                  <div className="flex items-center space-x-2 text-sm">
                    <FaMapMarkerAlt className="text-blue-500" />
                    <span className="font-medium text-gray-900">Your Location</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Download Our App</h3>
                  <p className="text-sm text-gray-600">Available for iOS and Android</p>
                </div>
                <div className="flex space-x-4">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center px-4 py-2 bg-black text-white rounded-lg"
                  >
                    <img src="/images/app-store.png" alt="App Store" className="h-6" />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center px-4 py-2 bg-black text-white rounded-lg"
                  >
                    <img src="/images/google-play.png" alt="Google Play" className="h-6" />
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Recent Needs & Stats */}
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-xl shadow-lg p-6"
            >
              <h3 className="text-xl font-bold text-gray-900 mb-6">Recent Needs</h3>
              <div className="space-y-6">
                {recentNeeds.map((need, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start space-x-4"
                  >
                    <div className={`flex-shrink-0 w-10 h-10 bg-${need.color}-100 rounded-xl flex items-center justify-center`}>
                      <need.icon className={`text-${need.color}-500`} />
                    </div>
                    <div className="flex-grow">
                      <h4 className="text-lg font-medium text-gray-900">{need.title}</h4>
                      <p className="text-sm text-gray-600">{need.location}</p>
                      <div className="flex items-center mt-1 text-sm text-gray-500">
                        <FaRegClock className="mr-1" />
                        <span>{need.time}</span>
                      </div>
                    </div>
                    <button className={`flex-shrink-0 text-${need.color}-500 hover:text-${need.color}-600`}>
                      <FaHandHoldingHeart className="text-xl" />
                    </button>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-xl shadow-lg p-6"
            >
              <h3 className="text-xl font-bold text-gray-900 mb-6">Statistics</h3>
              <div className="grid grid-cols-3 gap-4">
                {stats.map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    className="text-center"
                  >
                    <div className={`text-3xl font-bold text-${stat.color}-500 mb-1`}>
                      {stat.value}
                    </div>
                    <div className="text-sm text-gray-600">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HumanitarianMap; 