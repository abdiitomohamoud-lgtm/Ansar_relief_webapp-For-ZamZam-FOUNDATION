import React, { useMemo, useCallback } from 'react';
import { motion } from 'framer-motion';
import { FaRegCreditCard, FaBuilding, FaHeart, FaExternalLinkAlt } from 'react-icons/fa';

const DonationReviewStep = ({
  customAmount,
  selectedAmount,
  selectedCategory,
  selectedSubcategory,
  donationType,
  periodicType,
  paymentMethod,
  setPaymentMethod,
  navigateToDonate,
  categories,
  errors
}) => {
  // Calculate amount and format it once
  const amount = useMemo(() => 
    customAmount ? parseFloat(customAmount) : selectedAmount || 0
  , [customAmount, selectedAmount]);
  
  const formattedAmount = useMemo(() => 
    amount.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 2 })
  , [amount]);
  
  // Use callbacks for event handlers
  const handlePaymentMethodChange = useCallback((method) => {
    setPaymentMethod(method);
  }, [setPaymentMethod]);
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="space-y-4"
    >
      <div className="bg-gradient-to-r from-primary-50 to-primary-100 p-4 rounded border border-primary-200 mb-2">
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium text-gray-700">Total Amount:</span>
          <span className="text-xl font-bold text-primary-700">
            ${formattedAmount}
          </span>
        </div>
      </div>
      
      <div className="bg-gray-50 p-4 rounded border border-gray-200 space-y-2">
        <div className="flex justify-between items-center border-b border-gray-200 pb-2">
          <span className="text-sm font-medium text-gray-700">Category:</span>
          <span className="text-sm font-medium text-gray-900">
            {selectedCategory ? categories[selectedCategory].name : '-'}
          </span>
        </div>
        
        <div className="flex justify-between items-center border-b border-gray-200 py-2">
          <span className="text-sm font-medium text-gray-700">Subcategory:</span>
          <span className="text-sm font-medium text-gray-900">
            {selectedSubcategory || '-'}
          </span>
        </div>
        
        <div className="flex justify-between items-center border-b border-gray-200 py-2">
          <span className="text-sm font-medium text-gray-700">Donation Type:</span>
          <span className="text-sm font-medium text-gray-900 capitalize">
            {donationType.replace(/-/g, ' ')}
          </span>
        </div>
        
        {donationType === 'periodic' && (
          <div className="flex justify-between items-center py-2">
            <span className="text-sm font-medium text-gray-700">Frequency:</span>
            <span className="text-sm font-medium text-gray-900 capitalize">
              {periodicType.replace(/-/g, ' ')}
            </span>
          </div>
        )}
      </div>
      
      <div>
        <h5 className="text-base font-semibold text-gray-700 mb-3">Payment Method:</h5>
        {errors && errors.paymentMethod && (
          <p className="text-red-500 text-xs mb-2">{errors.paymentMethod}</p>
        )}
        <div className="grid grid-cols-2 gap-3">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            aria-pressed={paymentMethod === 'card'}
            className={`flex items-center p-4 rounded border transition-all ${
              paymentMethod === 'card'
                ? 'border-primary-500 bg-primary-50 shadow-sm'
                : 'border-gray-200 hover:border-primary-300'
            }`}
            onClick={() => handlePaymentMethodChange('card')}
            type="button"
          >
            <FaRegCreditCard className={`mr-3 text-lg ${paymentMethod === 'card' ? 'text-primary-600' : 'text-gray-500'}`} />
            <span className="text-sm font-medium">Credit Card</span>
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            aria-pressed={paymentMethod === 'bank'}
            className={`flex items-center p-4 rounded border transition-all ${
              paymentMethod === 'bank'
                ? 'border-primary-500 bg-primary-50 shadow-sm'
                : 'border-gray-200 hover:border-primary-300'
            }`}
            onClick={() => handlePaymentMethodChange('bank')}
            type="button"
          >
            <FaBuilding className={`mr-3 text-lg ${paymentMethod === 'bank' ? 'text-primary-600' : 'text-gray-500'}`} />
            <span className="text-sm font-medium">Bank Transfer</span>
          </motion.button>
        </div>
      </div>
      
      <div className="p-4 bg-primary-50 rounded border border-primary-200">
        <h5 className="text-sm font-semibold text-primary-700 mb-2 flex items-center">
          <FaHeart className="mr-2 text-primary-500" /> Your Impact:
        </h5>
        <p className="text-sm text-gray-700 mb-3">
          Your donation of ${formattedAmount} can help provide essential support to those in need.
          {selectedCategory && selectedSubcategory && (
            ` Your contribution to ${categories[selectedCategory].name} - ${selectedSubcategory} will make a real difference.`
          )}
        </p>
        
        <div className="text-xs text-gray-500">
          <p>Ansar Charity is a registered 501(c)(3) non-profit organization. Your donation is tax-deductible.</p>
        </div>
      </div>
      
      <div className="text-center pt-2">
        <button
          onClick={navigateToDonate} 
          className="text-primary-600 text-sm hover:text-primary-800 underline flex items-center justify-center mx-auto"
          type="button"
        >
          Need more options? Go to full donation page <FaExternalLinkAlt className="ml-1 text-xs" />
        </button>
      </div>
    </motion.div>
  );
};

export default DonationReviewStep; 