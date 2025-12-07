import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaChevronDown, FaHandHoldingHeart, FaPray, 
  FaUsers, FaHeart, FaUserInjured, 
  FaMoneyBillWave, FaUserTie, FaGraduationCap 
} from 'react-icons/fa';

const SadaqahTabs = () => {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const location = useLocation();

  const immediateNeeds = [
    { id: 'debtors', label: 'Debtors', icon: FaMoneyBillWave },
    { id: 'widows', label: 'Widows', icon: FaHeart },
    { id: 'sick', label: 'Sick', icon: FaUserInjured },
    { id: 'no-income', label: 'No Income', icon: FaUsers },
    { id: 'divorced', label: 'Divorced', icon: FaUsers },
    { id: 'limited-income', label: 'Limited Income', icon: FaUserTie },
    { id: 'student', label: 'Student', icon: FaGraduationCap }
  ];

  const sadakatKafarat = [
    { id: 'daily-sadaqa', label: 'Daily Sadaqa', icon: FaHandHoldingHeart },
    { id: 'periodic-donation', label: 'Periodic Donation', icon: FaHandHoldingHeart },
    { id: 'atonement', label: 'Atonement', icon: FaPray },
    { id: 'fasting-kafara', label: 'Fasting Kafara', icon: FaPray },
    { id: 'feed-poor', label: 'Feed the Poor', icon: FaHandHoldingHeart },
    { id: 'clothes-donation', label: 'Clothes Donation', icon: FaHandHoldingHeart },
    { id: 'aqiqah', label: 'Aqiqah', icon: FaPray },
    { id: 'vows', label: 'Vows', icon: FaPray },
    { id: 'sadaqah', label: 'Sadaqah', icon: FaHandHoldingHeart },
    { id: 'remove-affliction', label: 'Remove an affliction', icon: FaHeart },
    { id: 'sacrifice', label: 'Sacrifice', icon: FaPray },
    { id: 'zakat-calculation', label: 'Zakat Calculation', icon: FaHandHoldingHeart },
    { id: 'purge-income', label: 'Purge impure income', icon: FaHandHoldingHeart }
  ];

  const toggleDropdown = (dropdown) => {
    setActiveDropdown(activeDropdown === dropdown ? null : dropdown);
  };

  const isActiveLink = (path) => {
    return location.pathname.includes(path);
  };

  return (
    <div className="bg-white shadow-lg rounded-xl overflow-hidden">
      {/* Immediate Needs Dropdown */}
      <div className="border-b">
        <button
          onClick={() => toggleDropdown('immediate')}
          className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
        >
          <div className="flex items-center">
            <FaUsers className="text-blue-600 mr-3" />
            <span className="font-medium text-gray-900">Immediate Needs</span>
          </div>
          <FaChevronDown
            className={`text-gray-500 transition-transform ${
              activeDropdown === 'immediate' ? 'transform rotate-180' : ''
            }`}
          />
        </button>
        <AnimatePresence>
          {activeDropdown === 'immediate' && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="bg-gray-50 px-6 py-4"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {immediateNeeds.map((item) => (
                  <Link
                    key={item.id}
                    to={`/sadaqah/immediate/${item.id}`}
                    className={`flex items-center p-3 rounded-lg transition-colors ${
                      isActiveLink(`/immediate/${item.id}`)
                        ? 'bg-blue-50 text-blue-700'
                        : 'hover:bg-white text-gray-700 hover:text-blue-600'
                    }`}
                  >
                    <item.icon className={`mr-3 ${
                      isActiveLink(`/immediate/${item.id}`)
                        ? 'text-blue-600'
                        : 'text-gray-500'
                    }`} />
                    <span>{item.label}</span>
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Sadakat & Kafarat Dropdown */}
      <div>
        <button
          onClick={() => toggleDropdown('sadakat')}
          className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
        >
          <div className="flex items-center">
            <FaHandHoldingHeart className="text-green-600 mr-3" />
            <span className="font-medium text-gray-900">Sadakat & Kafarat</span>
          </div>
          <FaChevronDown
            className={`text-gray-500 transition-transform ${
              activeDropdown === 'sadakat' ? 'transform rotate-180' : ''
            }`}
          />
        </button>
        <AnimatePresence>
          {activeDropdown === 'sadakat' && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="bg-gray-50 px-6 py-4"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {sadakatKafarat.map((item) => (
                  <Link
                    key={item.id}
                    to={`/sadaqah/sadakat/${item.id}`}
                    className={`flex items-center p-3 rounded-lg transition-colors ${
                      isActiveLink(`/sadakat/${item.id}`)
                        ? 'bg-green-50 text-green-700'
                        : 'hover:bg-white text-gray-700 hover:text-green-600'
                    }`}
                  >
                    <item.icon className={`mr-3 ${
                      isActiveLink(`/sadakat/${item.id}`)
                        ? 'text-green-600'
                        : 'text-gray-500'
                    }`} />
                    <span>{item.label}</span>
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default SadaqahTabs; 