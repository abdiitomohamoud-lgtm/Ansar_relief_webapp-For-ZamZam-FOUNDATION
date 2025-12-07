import React from 'react';
import { motion } from 'framer-motion';
import { predefinedAmounts } from '../donationData';

const DonationAmountStep = ({
  selectedAmount,
  setSelectedAmount,
  customAmount,
  setCustomAmount,
  selectedCategory,
  selectedSubcategory,
  categories,
  errors
}) => {
  const handleCustomAmountChange = (e) => {
    const value = e.target.value;
    // Allow empty string or numbers
    if (value === '' || /^\d+(\.\d{0,2})?$/.test(value)) {
      setCustomAmount(value);
      setSelectedAmount(0); // Reset selected amount when typing custom amount
    }
  };

  const displayAmount = customAmount 
    ? parseFloat(customAmount || 0).toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 2 })
    : selectedAmount.toLocaleString();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="space-y-4"
    >
      <div className="flex justify-between items-center mb-1">
        <h4 className="text-base font-semibold text-gray-800">Select an amount:</h4>
        {errors.amount && (
          <span className="text-xs text-red-500">{errors.amount}</span>
        )}
      </div>
      
      <div className="grid grid-cols-4 gap-3 mb-4">
        {predefinedAmounts.map((value) => (
          <motion.button
            key={value}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            aria-pressed={selectedAmount === value && !customAmount}
            className={`py-3 px-2 rounded border text-sm font-medium transition-all
              ${selectedAmount === value && !customAmount
                ? 'border-primary-600 bg-primary-50 text-primary-700'
                : 'border-gray-200 hover:border-primary-300 text-gray-700'}`}
            onClick={() => {
              setSelectedAmount(value);
              setCustomAmount('');
            }}
          >
            ${value.toLocaleString()}
          </motion.button>
        ))}
      </div>

      <div className="mb-4">
        <label htmlFor="customAmount" className="block text-sm font-medium text-gray-700 mb-2">
          Or enter custom amount:
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <span className="text-gray-500 text-sm">$</span>
          </div>
          <input
            id="customAmount"
            type="text"
            inputMode="decimal"
            min="5"
            className={`block w-full pl-8 pr-4 py-3 text-sm rounded border ${
              errors.amount ? 'border-red-500 bg-red-50' : 'border-gray-300'
            } focus:ring-1 focus:ring-primary-500 focus:border-primary-500`}
            placeholder="Enter amount (min $5)"
            value={customAmount}
            onChange={handleCustomAmountChange}
          />
        </div>
        {customAmount && parseFloat(customAmount) < 5 && (
          <p className="text-red-500 text-xs mt-1">Minimum donation amount is $5</p>
        )}
      </div>
      
      <div className="bg-gray-50 p-4 rounded border border-gray-200 space-y-2">
        <div className="flex justify-between items-center border-b border-gray-200 pb-2 mb-2">
          <span className="text-sm font-medium text-gray-700">Selected Amount:</span>
          <span className="text-lg font-bold text-primary-700">
            ${displayAmount}
          </span>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium text-gray-700">Category:</span>
          <span className="text-sm font-medium text-gray-900">
            {selectedCategory ? categories[selectedCategory].name : '-'} 
          </span>
        </div>
        
        {selectedSubcategory && (
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-gray-700">Subcategory:</span>
            <span className="text-sm font-medium text-gray-900">
              {selectedSubcategory}
            </span>
          </div>
        )}
      </div>
      
      <div className="bg-blue-50 p-4 rounded border border-blue-100 flex items-start">
        <svg className="h-5 w-5 text-blue-500 mr-2 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <p className="text-sm text-blue-700">
          Your donation will help us continue our mission to provide aid where it's needed most. Thank you for your generosity!
        </p>
      </div>
    </motion.div>
  );
};

export default DonationAmountStep; 