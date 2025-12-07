import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaCreditCard, FaPaypal, FaApplePay, FaGooglePay, FaCalendarAlt, FaChevronRight } from 'react-icons/fa';

const SadaqahDonateForm = ({ sadaqahOption }) => {
  // State for form handling
  const [amount, setAmount] = useState(sadaqahOption.amount || 10);
  const [isRecurring, setIsRecurring] = useState(sadaqahOption.isPeriodic || false);
  const [interval, setInterval] = useState(sadaqahOption.interval || 'monthly');
  const [donorInfo, setDonorInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
  });
  const [currentStep, setCurrentStep] = useState(1);

  // Predefined donation amounts
  const donationAmounts = [10, 25, 50, 100, 250, 500];

  // Handle amount change
  const handleAmountChange = (e) => {
    setAmount(Number(e.target.value));
  };

  // Handle custom amount input
  const handleCustomAmountChange = (e) => {
    const value = e.target.value.replace(/[^0-9]/g, '');
    setAmount(value === '' ? 0 : Number(value));
  };

  // Handle donor info change
  const handleDonorInfoChange = (e) => {
    const { name, value } = e.target;
    setDonorInfo({
      ...donorInfo,
      [name]: value
    });
  };

  // Move to next step
  const handleNextStep = (e) => {
    e.preventDefault();
    setCurrentStep(2);
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Donation submitted', {
      amount,
      isRecurring,
      interval,
      donorInfo
    });
    // Here you would typically submit to your backend
    alert('Thank you for your donation! This would normally process your payment.');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-white p-6 rounded-xl shadow-lg max-w-md mx-auto"
    >
      <h2 className="text-2xl font-bold text-gray-800 mb-4">{sadaqahOption.title}</h2>
      
      {currentStep === 1 ? (
        <form onSubmit={handleNextStep}>
          {/* Amount Selection */}
          <div className="mb-6">
            <label className="block text-gray-700 font-medium mb-2">
              Donation Amount
            </label>
            
            {sadaqahOption.customAmount ? (
              <>
                <div className="grid grid-cols-3 gap-2 mb-3">
                  {donationAmounts.map((amt) => (
                    <button
                      key={amt}
                      type="button"
                      className={`py-2 px-3 rounded-lg text-center transition-colors duration-200 ${
                        amount === amt
                          ? 'bg-primary-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                      onClick={() => setAmount(amt)}
                    >
                      ${amt}
                    </button>
                  ))}
                </div>
                
                <div className="mt-3">
                  <label className="block text-gray-600 text-sm mb-1">Custom Amount</label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">$</span>
                    <input
                      type="text"
                      value={amount}
                      onChange={handleCustomAmountChange}
                      className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
                      placeholder="Enter amount"
                    />
                  </div>
                </div>
              </>
            ) : (
              <div className="bg-gray-100 p-4 rounded-lg text-center">
                <span className="text-2xl font-bold text-primary-600">${sadaqahOption.amount}</span>
                {sadaqahOption.isPeriodic && (
                  <span className="text-gray-500 ml-1">/{sadaqahOption.interval}</span>
                )}
              </div>
            )}
          </div>
          
          {/* Donation Frequency */}
          {sadaqahOption.customAmount && (
            <div className="mb-6">
              <label className="block text-gray-700 font-medium mb-2">
                Donation Frequency
              </label>
              
              <div className="flex items-center mb-3">
                <input
                  id="one-time"
                  type="radio"
                  checked={!isRecurring}
                  onChange={() => setIsRecurring(false)}
                  className="w-4 h-4 text-primary-600 focus:ring-primary-500"
                />
                <label htmlFor="one-time" className="ml-2 text-gray-700">
                  One-time donation
                </label>
              </div>
              
              <div className="flex items-center">
                <input
                  id="recurring"
                  type="radio"
                  checked={isRecurring}
                  onChange={() => setIsRecurring(true)}
                  className="w-4 h-4 text-primary-600 focus:ring-primary-500"
                />
                <label htmlFor="recurring" className="ml-2 text-gray-700">
                  Recurring donation
                </label>
              </div>
              
              {isRecurring && (
                <div className="mt-3 pl-6">
                  <label className="block text-gray-600 text-sm mb-1">Frequency</label>
                  <select
                    value={interval}
                    onChange={(e) => setInterval(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
                  >
                    <option value="weekly">Weekly</option>
                    <option value="monthly">Monthly</option>
                    <option value="quarterly">Quarterly</option>
                    <option value="yearly">Yearly</option>
                  </select>
                </div>
              )}
            </div>
          )}
          
          <button
            type="submit"
            className="w-full bg-primary-600 hover:bg-primary-700 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-300 flex items-center justify-center"
          >
            Next Step
            <FaChevronRight className="ml-2" />
          </button>
        </form>
      ) : (
        <form onSubmit={handleSubmit}>
          {/* Personal Information */}
          <div className="space-y-4 mb-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="firstName" className="block text-gray-700 font-medium mb-1">
                  First Name
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={donorInfo.firstName}
                  onChange={handleDonorInfoChange}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
                  required
                />
              </div>
              <div>
                <label htmlFor="lastName" className="block text-gray-700 font-medium mb-1">
                  Last Name
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={donorInfo.lastName}
                  onChange={handleDonorInfoChange}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
                  required
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="email" className="block text-gray-700 font-medium mb-1">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={donorInfo.email}
                onChange={handleDonorInfoChange}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
                required
              />
            </div>
            
            <div>
              <label htmlFor="phone" className="block text-gray-700 font-medium mb-1">
                Phone
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={donorInfo.phone}
                onChange={handleDonorInfoChange}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
              />
            </div>
          </div>
          
          {/* Payment Summary */}
          <div className="bg-gray-50 p-4 rounded-lg mb-6">
            <div className="flex justify-between mb-2">
              <span className="text-gray-600">Donation Amount:</span>
              <span className="font-medium">${amount}</span>
            </div>
            
            {isRecurring && (
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">Frequency:</span>
                <span className="font-medium flex items-center">
                  <FaCalendarAlt className="mr-1 text-gray-500" size={14} />
                  {interval.charAt(0).toUpperCase() + interval.slice(1)}
                </span>
              </div>
            )}
            
            <div className="pt-2 mt-2 border-t border-gray-200">
              <div className="flex justify-between">
                <span className="font-medium">Total:</span>
                <span className="font-bold text-primary-600">${amount}</span>
              </div>
            </div>
          </div>
          
          {/* Payment Options */}
          <div className="mb-6">
            <div className="text-center mb-4">
              <div className="flex justify-center space-x-3 text-gray-400 mb-2">
                <FaCreditCard size={24} />
                <FaPaypal size={24} />
                <FaApplePay size={24} />
                <FaGooglePay size={24} />
              </div>
              <p className="text-gray-500 text-sm">
                Secure payment processing. Your information is protected.
              </p>
            </div>
          </div>
          
          <div className="flex space-x-3">
            <button
              type="button"
              onClick={() => setCurrentStep(1)}
              className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-3 px-4 rounded-lg transition-colors duration-300"
            >
              Back
            </button>
            <button
              type="submit"
              className="flex-1 bg-primary-600 hover:bg-primary-700 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-300"
            >
              Donate Now
            </button>
          </div>
        </form>
      )}
    </motion.div>
  );
};

export default SadaqahDonateForm; 