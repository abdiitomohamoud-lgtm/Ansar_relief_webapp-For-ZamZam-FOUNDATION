import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaCreditCard, FaUniversity, FaCheckCircle, FaClock, FaMoon, FaCalendarDay, FaCalendarAlt } from 'react-icons/fa';

const DonationForm = ({ initialAmount = '', initialDonationType = 'sadaqah' }) => {
  const [donationType, setDonationType] = useState(initialDonationType);
  const [amount, setAmount] = useState('');
  const [customAmount, setCustomAmount] = useState('');
  const [donationFrequency, setDonationFrequency] = useState('once');
  const [paymentMethod, setPaymentMethod] = useState('credit_card');
  const [formStep, setFormStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  
  // Set initial amount when component mounts or props change
  useEffect(() => {
    if (initialAmount) {
      // Check if initialAmount matches a predefined amount
      const predefinedAmount = predefinedAmounts.find(amt => amt.toString() === initialAmount);
      
      if (predefinedAmount) {
        setAmount(initialAmount);
      } else {
        setAmount('custom');
        setCustomAmount(initialAmount);
      }
    }
  }, [initialAmount]);
  
  const donationTypes = [
    { id: 'sadaqah', label: 'General Sadaqah', description: 'Contribute to various charitable causes' },
    { id: 'food', label: 'Feed the Poor', description: 'Provide meals for those in need' },
    { id: 'water', label: 'Water Projects', description: 'Support clean water initiatives' },
    { id: 'medical', label: 'Medical Relief', description: 'Help fund medical care and supplies' },
    { id: 'education', label: 'Education', description: 'Support educational initiatives' },
    { id: 'orphans', label: 'Orphan Support', description: 'Help provide for orphaned children' }
  ];
  
  const predefinedAmounts = [10, 25, 50, 100, 250, 500];
  
  const handleAmountClick = (amt) => {
    setAmount(amt.toString());
    setCustomAmount('');
  };
  
  const handleCustomAmountChange = (e) => {
    const value = e.target.value;
    // Only allow numeric input with up to 2 decimal places
    if (/^\d*\.?\d{0,2}$/.test(value) || value === '') {
      setCustomAmount(value);
      setAmount('custom');
    }
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation
    if (!donationType) {
      alert('Please select a donation type');
      return;
    }
    
    const finalAmount = amount === 'custom' ? parseFloat(customAmount) : parseFloat(amount);
    
    if (isNaN(finalAmount) || finalAmount <= 0) {
      alert('Please enter a valid donation amount');
      return;
    }
    
    // Show loading state
    setIsSubmitting(true);
    
    // Mock API call
    try {
      // This would be replaced with an actual API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Success
      setIsComplete(true);
    } catch (error) {
      console.error('Error processing donation:', error);
      alert('There was an error processing your donation. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const nextStep = () => {
    if (formStep === 1) {
      // Validate step 1
      const finalAmount = amount === 'custom' ? parseFloat(customAmount) : parseFloat(amount);
      if (!donationType || isNaN(finalAmount) || finalAmount <= 0) {
        alert('Please select a donation type and enter a valid amount');
        return;
      }
    }
    
    setFormStep(formStep + 1);
  };
  
  const prevStep = () => {
    setFormStep(formStep - 1);
  };
  
  // Main content based on step
  const renderFormContent = () => {
    if (isComplete) {
      return (
        <div className="text-center py-8">
          <div className="mb-6 flex justify-center">
            <div className="bg-green-100 p-4 rounded-full">
              <FaCheckCircle className="text-green-600 text-5xl" />
            </div>
          </div>
          <h3 className="text-2xl font-bold text-gray-800 mb-3">Thank You for Your Donation!</h3>
          <p className="text-gray-600 mb-6">
            Your contribution will help make a real difference in the lives of those in need.
          </p>
          <p className="text-primary-600 font-medium">
            A confirmation has been sent to your email address.
          </p>
          
          <button 
            onClick={() => {
              setIsComplete(false);
              setFormStep(1);
              setAmount('');
              setCustomAmount('');
              setDonationFrequency('once');
            }}
            className="mt-8 px-6 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors"
          >
            Make Another Donation
          </button>
        </div>
      );
    }
    
    switch(formStep) {
      case 1:
        return (
          <>
            <div className="mb-8">
              <label className="block text-gray-700 font-medium mb-3">
                Select Donation Type
              </label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {donationTypes.map((type) => (
                  <button
                    key={type.id}
                    type="button"
                    className={`p-4 border rounded-md text-left transition-colors ${
                      donationType === type.id
                        ? 'border-primary-500 bg-primary-50 text-primary-700'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => setDonationType(type.id)}
                  >
                    <div className="font-medium">{type.label}</div>
                    <div className="text-sm text-gray-500">{type.description}</div>
                  </button>
                ))}
              </div>
            </div>
            
            <div className="mb-8">
              <label className="block text-gray-700 font-medium mb-3">
                Select Amount
              </label>
              <div className="grid grid-cols-3 gap-3 mb-4">
                {predefinedAmounts.map((amt) => (
                  <button
                    key={amt}
                    type="button"
                    className={`py-3 border rounded-md font-medium transition-colors ${
                      amount === amt.toString()
                        ? 'border-primary-500 bg-primary-50 text-primary-700'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => handleAmountClick(amt)}
                  >
                    ${amt}
                  </button>
                ))}
              </div>
              
              <div className="relative">
                <input
                  type="text"
                  className={`w-full p-3 border rounded-md transition-colors ${
                    amount === 'custom'
                      ? 'border-primary-500'
                      : 'border-gray-200'
                  }`}
                  placeholder="Enter custom amount"
                  value={customAmount}
                  onChange={handleCustomAmountChange}
                  onFocus={() => setAmount('custom')}
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-500">$</span>
                </div>
              </div>
            </div>
            
            <div className="mb-8">
              <label className="block text-gray-700 font-medium mb-3">
                Donation Frequency
              </label>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                <button
                  type="button"
                  className={`p-3 border rounded-md flex items-center gap-2 transition-colors ${
                    donationFrequency === 'once'
                      ? 'border-primary-500 bg-primary-50 text-primary-700'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => setDonationFrequency('once')}
                >
                  <FaCheckCircle />
                  <span>One Time</span>
                </button>
                
                <button
                  type="button"
                  className={`p-3 border rounded-md flex items-center gap-2 transition-colors ${
                    donationFrequency === 'daily'
                      ? 'border-primary-500 bg-primary-50 text-primary-700'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => setDonationFrequency('daily')}
                >
                  <FaCalendarDay />
                  <span>Daily</span>
                </button>
                
                <button
                  type="button"
                  className={`p-3 border rounded-md flex items-center gap-2 transition-colors ${
                    donationFrequency === 'weekly'
                      ? 'border-primary-500 bg-primary-50 text-primary-700'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => setDonationFrequency('weekly')}
                >
                  <FaClock />
                  <span>Weekly</span>
                </button>
                
                <button
                  type="button"
                  className={`p-3 border rounded-md flex items-center gap-2 transition-colors ${
                    donationFrequency === 'monthly'
                      ? 'border-primary-500 bg-primary-50 text-primary-700'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => setDonationFrequency('monthly')}
                >
                  <FaCalendarAlt />
                  <span>Monthly</span>
                </button>
              </div>
            </div>
            
            <div className="text-right">
              <button
                type="button"
                className="px-6 py-3 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors"
                onClick={nextStep}
              >
                Continue to Payment
              </button>
            </div>
          </>
        );
        
      case 2:
        return (
          <>
            <div className="mb-6 p-4 bg-gray-50 rounded-md">
              <h3 className="text-lg font-medium text-gray-800 mb-2">Donation Summary</h3>
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">Type:</span>
                <span className="font-medium">{donationTypes.find(t => t.id === donationType)?.label}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">Amount:</span>
                <span className="font-medium">${amount === 'custom' ? customAmount : amount}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Frequency:</span>
                <span className="font-medium capitalize">{donationFrequency}</span>
              </div>
            </div>
            
            <div className="mb-8">
              <label className="block text-gray-700 font-medium mb-3">
                Select Payment Method
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
                <button
                  type="button"
                  className={`p-4 border rounded-md flex items-center gap-3 transition-colors ${
                    paymentMethod === 'credit_card'
                      ? 'border-primary-500 bg-primary-50 text-primary-700'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => setPaymentMethod('credit_card')}
                >
                  <FaCreditCard className="text-xl" />
                  <div>
                    <div className="font-medium">Credit Card</div>
                    <div className="text-sm text-gray-500">Pay with Visa, Mastercard, etc.</div>
                  </div>
                </button>
                
                <button
                  type="button"
                  className={`p-4 border rounded-md flex items-center gap-3 transition-colors ${
                    paymentMethod === 'bank_transfer'
                      ? 'border-primary-500 bg-primary-50 text-primary-700'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => setPaymentMethod('bank_transfer')}
                >
                  <FaUniversity className="text-xl" />
                  <div>
                    <div className="font-medium">Bank Transfer</div>
                    <div className="text-sm text-gray-500">Pay directly from your bank account</div>
                  </div>
                </button>
              </div>
              
              {/* Credit Card Payment Form */}
              {paymentMethod === 'credit_card' && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-gray-700 text-sm font-medium mb-1" htmlFor="name">
                      Cardholder Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      className="w-full p-3 border border-gray-300 rounded-md"
                      placeholder="John Doe"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-gray-700 text-sm font-medium mb-1" htmlFor="card_number">
                      Card Number
                    </label>
                    <input
                      type="text"
                      id="card_number"
                      className="w-full p-3 border border-gray-300 rounded-md"
                      placeholder="**** **** **** ****"
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-700 text-sm font-medium mb-1" htmlFor="expiry">
                        Expiry Date
                      </label>
                      <input
                        type="text"
                        id="expiry"
                        className="w-full p-3 border border-gray-300 rounded-md"
                        placeholder="MM/YY"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-gray-700 text-sm font-medium mb-1" htmlFor="cvc">
                        CVC
                      </label>
                      <input
                        type="text"
                        id="cvc"
                        className="w-full p-3 border border-gray-300 rounded-md"
                        placeholder="123"
                      />
                    </div>
                  </div>
                </div>
              )}
              
              {/* Bank Transfer Form */}
              {paymentMethod === 'bank_transfer' && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-gray-700 text-sm font-medium mb-1" htmlFor="account_name">
                      Account Holder Name
                    </label>
                    <input
                      type="text"
                      id="account_name"
                      className="w-full p-3 border border-gray-300 rounded-md"
                      placeholder="John Doe"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-gray-700 text-sm font-medium mb-1" htmlFor="account_number">
                      Account Number
                    </label>
                    <input
                      type="text"
                      id="account_number"
                      className="w-full p-3 border border-gray-300 rounded-md"
                      placeholder="Account Number"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-gray-700 text-sm font-medium mb-1" htmlFor="routing_number">
                      Routing Number
                    </label>
                    <input
                      type="text"
                      id="routing_number"
                      className="w-full p-3 border border-gray-300 rounded-md"
                      placeholder="Routing Number"
                    />
                  </div>
                </div>
              )}
            </div>
            
            <div className="flex justify-between">
              <button
                type="button"
                className="px-6 py-3 border border-gray-300 bg-white text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
                onClick={prevStep}
              >
                Back
              </button>
              
              <button
                type="submit"
                className="px-6 py-3 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Processing...' : 'Complete Donation'}
              </button>
            </div>
          </>
        );
        
      default:
        return null;
    }
  };
  
  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden">
      {/* Form header with progress */}
      {!isComplete && (
        <div className="bg-gray-50 p-4 border-b border-gray-200">
          <div className="flex justify-between mb-2">
            <h3 className="text-xl font-bold text-gray-800">
              {formStep === 1 ? 'Donation Details' : 'Payment Information'}
            </h3>
            <span className="text-gray-500">Step {formStep} of 2</span>
          </div>
          
          <div className="w-full bg-gray-200 rounded-full h-1.5 mb-1">
            <div 
              className="bg-primary-500 h-1.5 rounded-full transition-all duration-300"
              style={{ width: `${(formStep / 2) * 100}%` }}
            ></div>
          </div>
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="p-6">
        {renderFormContent()}
      </form>
    </div>
  );
};

export default DonationForm; 