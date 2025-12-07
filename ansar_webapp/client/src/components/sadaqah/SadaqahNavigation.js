import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  FaHeart,
  FaHandHoldingHeart,
  FaWater,
  FaUtensils,
  FaCalendarAlt,
  FaMosque,
  FaHandsHelping,
  FaUserFriends,
  FaGraduationCap,
  FaHome,
  FaHospital,
  FaBook,
  FaPrayingHands,
  FaMoneyBillWave,
  FaRegClock,
  FaStar,
  FaGift,
  FaArrowRight
} from 'react-icons/fa';
import './SadaqahNavigation.css';
import '../../styles/patterns.css';

const SadaqahNavigation = () => {
  const [activeCategory, setActiveCategory] = useState(null);
  const [hoveredItem, setHoveredItem] = useState(null);

  const categories = [
    {
      id: 'immediate',
      title: 'Immediate Needs',
      icon: FaHandHoldingHeart,
      color: 'emerald',
      items: [
        { id: 'food', title: 'Food Aid', icon: FaUtensils },
        { id: 'water', title: 'Water Relief', icon: FaWater },
        { id: 'shelter', title: 'Emergency Shelter', icon: FaHome },
        { id: 'medical', title: 'Medical Aid', icon: FaHospital }
      ]
    },
    {
      id: 'regular',
      title: 'Regular Sadaqah',
      icon: FaRegClock,
      color: 'blue',
      items: [
        { id: 'daily', title: 'Daily Sadaqah', icon: FaCalendarAlt },
        { id: 'friday', title: 'Friday Sadaqah', icon: FaMosque },
        { id: 'monthly', title: 'Monthly Support', icon: FaHandsHelping }
      ]
    },
    {
      id: 'special',
      title: 'Special Cases',
      icon: FaStar,
      color: 'purple',
      items: [
        { id: 'orphans', title: 'Orphan Care', icon: FaUserFriends },
        { id: 'education', title: 'Education Support', icon: FaGraduationCap },
        { id: 'quran', title: 'Quran Teaching', icon: FaBook }
      ]
    }
  ];

  return (
    <nav className="bg-white shadow-lg relative overflow-hidden">
      {/* Background Patterns */}
      <div className="absolute inset-0 pattern-islamic-star pattern-opacity-10"></div>
      <div className="absolute inset-0 pattern-mosque pattern-opacity-5"></div>
      
      <div className="container mx-auto px-4 py-6 relative z-10">
        {/* Main Navigation */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {categories.map((category) => (
            <motion.div
              key={category.id}
              className={`relative rounded-xl overflow-hidden hover-grow ${
                activeCategory === category.id ? 'ring-2 ring-offset-2' : ''
              } ring-${category.color}-500`}
              onMouseEnter={() => setActiveCategory(category.id)}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              {/* Card Background with Pattern */}
              <div className={`absolute inset-0 bg-gradient-to-br from-${category.color}-500 to-${category.color}-700`}></div>
              <div className="absolute inset-0 pattern-islamic-weave pattern-opacity-10"></div>
              
              {/* Content */}
              <div className="relative p-6">
                <div className="flex items-center mb-4">
                  <div className={`w-12 h-12 rounded-full bg-white/10 flex items-center justify-center backdrop-blur-sm`}>
                    <category.icon className="text-2xl text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white ml-4">{category.title}</h3>
        </div>
                
                <div className="space-y-3">
                  {category.items.map((item) => (
                  <Link
                      key={item.id}
                      to={`/sadaqah/${category.id}/${item.id}`}
                      className="flex items-center p-3 rounded-lg bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-all group"
                      onMouseEnter={() => setHoveredItem(item.id)}
                      onMouseLeave={() => setHoveredItem(null)}
                    >
                      <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                        <item.icon className="text-white text-lg" />
                    </div>
                      <span className="text-white font-medium ml-3 flex-grow">{item.title}</span>
                      <FaArrowRight className={`text-white transform transition-transform ${
                        hoveredItem === item.id ? 'translate-x-0 opacity-100' : '-translate-x-4 opacity-0'
                      }`} />
                  </Link>
              ))}
                </div>
          </div>
            </motion.div>
          ))}
    </div>

        {/* Quick Actions */}
        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
          <Link
            to="/sadaqah/calculate"
            className="flex items-center justify-center p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-all group hover-grow"
          >
            <FaMoneyBillWave className="text-gray-600 mr-2 group-hover:text-emerald-500 transition-colors" />
            <span className="font-medium text-gray-700">Calculate Zakat</span>
          </Link>
          
          <Link
            to="/sadaqah/recurring"
            className="flex items-center justify-center p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-all group hover-grow"
          >
            <FaRegClock className="text-gray-600 mr-2 group-hover:text-blue-500 transition-colors" />
            <span className="font-medium text-gray-700">Set Up Monthly</span>
          </Link>
          
          <Link
            to="/sadaqah/special-projects"
            className="flex items-center justify-center p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-all group hover-grow"
          >
            <FaStar className="text-gray-600 mr-2 group-hover:text-purple-500 transition-colors" />
            <span className="font-medium text-gray-700">Special Projects</span>
          </Link>
          
        <Link
            to="/sadaqah/gift"
            className="flex items-center justify-center p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-all group hover-grow"
        >
            <FaGift className="text-gray-600 mr-2 group-hover:text-pink-500 transition-colors" />
            <span className="font-medium text-gray-700">Gift Sadaqah</span>
        </Link>
    </div>

        {/* Inspirational Quote */}
        <div className="mt-8 p-6 rounded-xl bg-gradient-to-r from-gray-900 to-gray-800 relative overflow-hidden">
          <div className="absolute inset-0 pattern-islamic-star pattern-opacity-10"></div>
          <div className="relative z-10">
            <FaPrayingHands className="text-3xl text-white/80 mb-4" />
            <blockquote className="text-white/90 text-lg font-medium italic mb-4">
              "The believer's shade on the Day of Resurrection will be their charity."
            </blockquote>
            <cite className="text-white/70 block">- Prophet Muhammad (ﷺ)</cite>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default SadaqahNavigation; 