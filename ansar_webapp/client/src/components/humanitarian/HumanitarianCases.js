import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaHandHoldingHeart, FaArrowRight, FaRegClock } from 'react-icons/fa';

const HumanitarianCases = () => {
  const [selectedAmount, setSelectedAmount] = useState(null);
  const [customAmount, setCustomAmount] = useState('');

  const predefinedAmounts = [50, 100, 150, 200, 500, 1000];

  const handleAmountSelect = (amount) => {
    setSelectedAmount(amount);
    setCustomAmount('');
  };

  const handleCustomAmountChange = (e) => {
    const value = e.target.value;
    if (value === '' || /^\d*$/.test(value)) {
      setCustomAmount(value);
      setSelectedAmount(null);
    }
  };

  return (
    <section className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900">Humanitarian Cases</h2>
          <p className="mt-4 text-lg text-gray-600">
            Support our humanitarian cases and make a difference in people's lives
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left Column - Donation Selection */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="mb-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Select Amount</h3>
              <div className="grid grid-cols-3 gap-3">
                {predefinedAmounts.map((amount) => (
                  <button
                    key={amount}
                    onClick={() => handleAmountSelect(amount)}
                    className={`py-3 px-4 rounded-lg text-center transition-colors ${
                      selectedAmount === amount
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-900 hover:bg-blue-50'
                    }`}
                  >
                    {amount} QAR
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Or enter custom amount
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={customAmount}
                  onChange={handleCustomAmountChange}
                  placeholder="Enter amount"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500">
                  QAR
                </span>
              </div>
            </div>

            <button className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center">
              <FaHandHoldingHeart className="mr-2" />
              Donate Now
            </button>
          </div>

          {/* Right Column - Statistics and Info */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-xl font-bold text-gray-900">Current Cases</h3>
                  <p className="text-gray-600">Active humanitarian needs</p>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-blue-600">1,234</div>
                  <div className="text-sm text-gray-500">Total cases</div>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">Overall Progress</span>
                    <span className="text-blue-600 font-medium">65%</span>
                  </div>
                  <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-600 rounded-full" style={{ width: '65%' }}></div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 pt-4">
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <div className="text-2xl font-bold text-gray-900">892</div>
                    <div className="text-sm text-gray-600">Active Cases</div>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <div className="text-2xl font-bold text-gray-900">342</div>
                    <div className="text-sm text-gray-600">Completed</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl shadow-lg p-6 text-white">
              <h3 className="text-lg font-semibold mb-2">Latest Update</h3>
              <p className="text-blue-100 mb-4">
                Emergency relief campaign launched for affected areas
              </p>
              <div className="flex items-center text-sm text-blue-200">
                <FaRegClock className="mr-2" />
                <span>Updated 2 hours ago</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HumanitarianCases; 