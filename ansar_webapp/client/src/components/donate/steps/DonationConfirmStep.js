import React from 'react';
import { motion } from 'framer-motion';
import { FaRegCheckCircle, FaRedo } from 'react-icons/fa';

const DonationConfirmStep = ({
  customAmount,
  selectedAmount,
  selectedCategory,
  selectedSubcategory,
  donationType,
  periodicType,
  paymentMethod,
  onClose,
  navigateToDonate,
  resetForm
}) => {
  const amount = customAmount ? parseFloat(customAmount) : selectedAmount || 0;
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="space-y-5"
    >
      <div className="bg-gradient-to-r from-green-50 to-green-100 p-5 rounded border border-green-200 text-center">
        <FaRegCheckCircle className="inline-block text-green-600 mb-2" size={38} />
        <h4 className="text-lg font-bold text-green-800 mb-2">Thank You for Your Donation</h4>
        <p className="text-sm text-green-700">
          Your donation is being processed
        </p>
      </div>
      
      <div className="bg-white p-4 rounded border border-gray-200 shadow-sm">
        <div className="flex justify-between items-center mb-3 pb-2 border-b border-gray-100">
          <span className="text-sm font-medium text-gray-600">Total Amount:</span>
          <span className="text-xl font-bold text-primary-700">
            ${amount.toLocaleString()}
          </span>
        </div>
        
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-600">Category:</span>
            <span className="font-medium capitalize">{selectedCategory}</span>
          </div>
          
          {selectedSubcategory && (
            <div className="flex justify-between">
              <span className="text-gray-600">Subcategory:</span>
              <span className="font-medium">{selectedSubcategory}</span>
            </div>
          )}
          
          <div className="flex justify-between">
            <span className="text-gray-600">Type:</span>
            <span className="font-medium capitalize">{donationType.replace(/-/g, ' ')}</span>
          </div>
          
          {donationType === 'periodic' && (
            <div className="flex justify-between">
              <span className="text-gray-600">Frequency:</span>
              <span className="font-medium capitalize">{periodicType.replace(/-/g, ' ')}</span>
            </div>
          )}
          
          <div className="flex justify-between">
            <span className="text-gray-600">Payment:</span>
            <span className="font-medium">
              {paymentMethod === 'card' ? 'Credit Card' : 'Bank Transfer'}
            </span>
          </div>
        </div>
      </div>

      <div className="bg-white p-4 rounded border border-gray-200 text-center">
        <p className="text-sm text-gray-600 mb-3">
          A confirmation email has been sent to your registered email address.
        </p>
        
        <div className="text-xs text-gray-500 mb-3">
          <p>Transaction ID: QAT-{Math.floor(Math.random() * 1000000).toString().padStart(6, '0')}</p>
          <p>Date: {new Date().toLocaleDateString()}</p>
        </div>
      </div>

      <div className="text-center space-y-4">
        <p className="text-sm text-gray-600">
          Thank you for your generosity! Your donation makes a difference.
        </p>
        
        <div className="flex gap-3">
          <button
            onClick={resetForm}
            className="flex-1 py-3 px-4 text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 rounded border border-gray-200 flex items-center justify-center"
          >
            <FaRedo className="mr-2" /> New Donation
          </button>
          
          <button
            onClick={onClose}
            className="flex-1 py-3 px-4 text-sm bg-primary-600 hover:bg-primary-700 text-white rounded flex items-center justify-center"
          >
            Close
          </button>
        </div>
        
        <button
          onClick={navigateToDonate}
          className="text-primary-600 text-sm hover:text-primary-800 underline"
        >
          View all donations
        </button>
      </div>
    </motion.div>
  );
};

export default DonationConfirmStep; 