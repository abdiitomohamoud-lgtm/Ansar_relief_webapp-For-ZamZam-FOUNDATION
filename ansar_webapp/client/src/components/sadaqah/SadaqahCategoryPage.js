import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaArrowRight, FaUsers, FaHeart, FaChevronRight } from 'react-icons/fa';

const SadaqahCategoryPage = ({
  title,
  description,
  headerImage,
  colorScheme,
  icon: Icon,
  projects,
  donationOptions
}) => {
  const [selectedAmount, setSelectedAmount] = useState('');
  const [customAmount, setCustomAmount] = useState('');
  const [activeTab, setActiveTab] = useState('projects');

  const handleDonateClick = () => {
    const donationAmount = selectedAmount === 'custom' ? customAmount : selectedAmount;
    
    if (!donationAmount || isNaN(parseFloat(donationAmount)) || parseFloat(donationAmount) <= 0) {
      alert('Please enter a valid donation amount');
      return;
    }
    
    window.location.href = `/sadaqah?amount=${donationAmount}&category=${encodeURIComponent(title)}`;
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className={`relative bg-gradient-to-r ${colorScheme.gradient} text-white overflow-hidden`}>
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-20 pattern-islamic"></div>
        
        {/* Header Image */}
        {headerImage && (
          <div className="absolute inset-0 opacity-20">
            <img 
              src={headerImage} 
              alt={title} 
              className="w-full h-full object-cover"
            />
          </div>
        )}

        <div className="container mx-auto px-4 py-20 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm mb-6">
              <Icon className="text-3xl text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">{title}</h1>
            <p className="text-xl md:text-2xl text-white/80 mb-8 max-w-3xl mx-auto">
              {description}
            </p>
            <button 
              onClick={() => document.getElementById('donate-section').scrollIntoView({ behavior: 'smooth' })}
              className={`px-8 py-3 ${colorScheme.bg} text-white rounded-full font-medium shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 transform inline-flex items-center`}
            >
              <FaHeart className="mr-2" /> Donate Now
              <FaChevronRight className="ml-2" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16">
        {/* Tabs */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex bg-white rounded-full shadow-md p-1">
            <button
              className={`px-6 py-2 rounded-full font-medium transition-all ${
                activeTab === 'projects' 
                  ? `${colorScheme.bg} text-white` 
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
              onClick={() => setActiveTab('projects')}
            >
              Projects
            </button>
            <button
              className={`px-6 py-2 rounded-full font-medium transition-all ${
                activeTab === 'donate' 
                  ? `${colorScheme.bg} text-white` 
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
              onClick={() => setActiveTab('donate')}
            >
              Donate
            </button>
          </div>
        </div>

        {/* Projects Tab */}
        {activeTab === 'projects' && (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {projects.map((project, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all"
              >
                <div className="h-48 overflow-hidden">
                  <img
                    src={project.image || '/images/campaigns/water.jpg'}
                    alt={project.title}
                    className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <h3 className={`text-xl font-bold mb-2 ${colorScheme.text}`}>{project.title}</h3>
                  <p className="text-gray-600 mb-4">{project.description}</p>
                  
                  {/* Progress Bar */}
                  <div className="mb-4">
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600">Raised: ${project.raised.toLocaleString()}</span>
                      <span className={`font-medium ${colorScheme.text}`}>{project.progress}%</span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className={`h-full ${colorScheme.bg} rounded-full`}
                        style={{ width: `${project.progress}%` }}
                      ></div>
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      Goal: ${project.goal.toLocaleString()}
                    </div>
                  </div>
                  
                  {/* Impact */}
                  <div className="flex items-center mb-4">
                    <FaUsers className="text-gray-400 mr-2" />
                    <span className="text-sm text-gray-600">{project.impact}</span>
                  </div>
                  
                  <button 
                    className={`w-full py-2 ${colorScheme.border} border-2 rounded-lg text-center ${colorScheme.text} font-medium ${colorScheme.hover} hover:text-white transition-colors`}
                    onClick={() => setActiveTab('donate')}
                  >
                    Support This Project
                  </button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Donate Tab */}
        {activeTab === 'donate' && (
          <div id="donate-section" className="max-w-2xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className={`${colorScheme.bg} text-white p-6 text-center`}>
              <h2 className="text-2xl font-bold mb-2">Make a Donation</h2>
              <p>Your support makes a difference</p>
            </div>
            
            <div className="p-8">
              <div className="mb-6">
                <h3 className="text-lg font-medium text-gray-800 mb-4">Select an amount:</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {donationOptions.map((option, index) => (
                    <button
                      key={index}
                      className={`p-3 rounded-lg border-2 text-center transition-all hover:shadow-md ${
                        selectedAmount === option.amount.toString()
                          ? `${colorScheme.border} ${colorScheme.text} font-medium`
                          : 'border-gray-200 text-gray-600 hover:border-gray-300'
                      }`}
                      onClick={() => setSelectedAmount(option.amount.toString())}
                    >
                      <div className="text-lg font-bold">${option.amount}</div>
                      <div className="text-xs text-gray-500 mt-1">{option.impact}</div>
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="mb-8">
                <label className="flex items-center text-gray-600 cursor-pointer">
                  <input
                    type="radio"
                    className="form-radio h-5 w-5 text-primary-600"
                    checked={selectedAmount === 'custom'}
                    onChange={() => setSelectedAmount('custom')}
                  />
                  <span className="ml-2 text-lg">Custom amount:</span>
                </label>
                
                <div className="mt-3 relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-600">$</span>
                  <input
                    type="number"
                    className={`block w-full pl-8 pr-12 py-3 border-2 rounded-lg focus:outline-none focus:ring-0 ${
                      selectedAmount === 'custom' 
                        ? `focus:${colorScheme.border}` 
                        : 'border-gray-200 focus:border-gray-300'
                    }`}
                    placeholder="Enter amount"
                    value={customAmount}
                    onChange={(e) => {
                      setCustomAmount(e.target.value);
                      setSelectedAmount('custom');
                    }}
                  />
                  <span className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 text-sm">USD</span>
                </div>
              </div>
              
              <button
                onClick={handleDonateClick}
                className={`w-full py-4 ${colorScheme.bg} text-white rounded-lg font-medium shadow-md hover:shadow-lg flex items-center justify-center ${colorScheme.hover} transition-all`}
              >
                <FaHeart className="mr-2" />
                Proceed to Donate
                <FaArrowRight className="ml-2" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SadaqahCategoryPage; 