import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaCreditCard, FaPaypal, FaMoneyBillWave } from 'react-icons/fa';
import { TbCurrencyRiyal } from 'react-icons/tb';

const DonateForm = ({ category, onDonationComplete }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    amount: '',
    fullName: '',
    email: '',
    phone: '',
    paymentMethod: '',
    isAnonymous: false,
    message: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const validateStep = () => {
    if (step === 1 && (!formData.amount || isNaN(formData.amount) || parseFloat(formData.amount) <= 0)) {
      setError('Please enter a valid donation amount');
      return false;
    }

    if (step === 2) {
      if (!formData.fullName.trim()) {
        setError('Full name is required');
        return false;
      }
      if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) {
        setError('Valid email is required');
        return false;
      }
      if (!formData.phone.trim()) {
        setError('Phone number is required');
        return false;
      }
    }

    if (step === 3 && !formData.paymentMethod) {
      setError('Please select a payment method');
      return false;
    }

    setError('');
    return true;
  };

  const handleNext = () => {
    if (validateStep()) {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    setStep(step - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateStep()) return;

    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      onDonationComplete && onDonationComplete(formData);
    }, 1500);
  };

  const amounts = [10, 50, 100, 500, 1000];

  return (
    <div className="bg-white rounded-xl shadow-xl overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-700 px-6 py-4">
        <h2 className="text-white text-xl font-bold">
          {category ? `Donate to ${category}` : 'Make a Donation'}
        </h2>
        <div className="flex mt-4">
          {[1, 2, 3].map((stepNumber) => (
            <div
              key={stepNumber}
              className="flex items-center"
            >
              <div
                className={`rounded-full h-8 w-8 flex items-center justify-center font-bold text-sm 
                  ${step >= stepNumber ? 'bg-white text-primary-600' : 'bg-primary-400 text-white'}`}
              >
                {stepNumber}
              </div>
              {stepNumber < 3 && (
                <div
                  className={`h-1 w-12 mx-1 
                    ${step > stepNumber ? 'bg-white' : 'bg-primary-400'}`}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Form Content */}
      <div className="px-6 py-8">
        {error && (
          <div className="bg-red-50 text-red-600 px-4 py-3 rounded-lg mb-4">
            {error}
          </div>
        )}

        <form onSubmit={step === 3 ? handleSubmit : (e) => e.preventDefault()}>
          {/* Step 1: Amount */}
          {step === 1 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="text-lg font-semibold mb-4">Select Donation Amount</h3>

              <div className="grid grid-cols-3 gap-3 mb-6">
                {amounts.map(amount => (
                  <button
                    key={amount}
                    type="button"
                    className={`py-2 px-4 rounded-lg border-2 font-medium transition-colors
                      ${formData.amount === amount.toString()
                        ? 'border-primary-600 bg-primary-50 text-primary-700'
                        : 'border-gray-200 hover:border-primary-300 hover:bg-primary-50'}`}
                    onClick={() => setFormData({ ...formData, amount: amount.toString() })}
                  >
                    QAR {amount}
                  </button>
                ))}
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">
                  Custom Amount (QAR)
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <TbCurrencyRiyal className="text-gray-500" />
                  </div>
                  <input
                    type="number"
                    name="amount"
                    value={formData.amount}
                    onChange={handleInputChange}
                    className="block w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
                    placeholder="Enter amount"
                  />
                </div>
              </div>
            </motion.div>
          )}

          {/* Step 2: Personal Info */}
          {step === 2 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="text-lg font-semibold mb-4">Your Information</h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className="block w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
                    placeholder="Your full name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="block w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
                    placeholder="Your email address"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="block w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
                    placeholder="Your phone number"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Message (Optional)
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows="3"
                    className="block w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
                    placeholder="Add a message (optional)"
                  ></textarea>
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="isAnonymous"
                    name="isAnonymous"
                    checked={formData.isAnonymous}
                    onChange={handleInputChange}
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                  />
                  <label htmlFor="isAnonymous" className="ml-2 block text-sm text-gray-700">
                    Make my donation anonymous
                  </label>
                </div>
              </div>
            </motion.div>
          )}

          {/* Step 3: Payment */}
          {step === 3 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="text-lg font-semibold mb-4">Payment Method</h3>

              <div className="space-y-3 mb-6">
                {[
                  { id: 'credit-card', name: 'Credit Card', icon: <FaCreditCard /> },
                  { id: 'paypal', name: 'PayPal', icon: <FaPaypal /> },
                  { id: 'bank-transfer', name: 'Bank Transfer', icon: <FaMoneyBillWave /> }
                ].map(method => (
                  <div
                    key={method.id}
                    className={`border-2 rounded-lg p-4 flex items-center cursor-pointer transition-all ${formData.paymentMethod === method.id
                        ? 'border-primary-600 bg-primary-50'
                        : 'border-gray-200 hover:border-primary-300'
                      }`}
                    onClick={() => setFormData({ ...formData, paymentMethod: method.id })}
                  >
                    <div className={`text-xl ${formData.paymentMethod === method.id ? 'text-primary-600' : 'text-gray-500'}`}>
                      {method.icon}
                    </div>
                    <span className="ml-3 font-medium">{method.name}</span>
                    {formData.paymentMethod === method.id && (
                      <div className="ml-auto">
                        <div className="h-5 w-5 bg-primary-600 rounded-full flex items-center justify-center">
                          <div className="h-2 w-2 bg-white rounded-full"></div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <div className="bg-gray-50 p-4 rounded-lg mb-6">
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">Donation Amount:</span>
                  <span className="font-semibold">QAR {formData.amount}</span>
                </div>
                <div className="flex justify-between font-bold text-lg">
                  <span>Total:</span>
                  <span>QAR {formData.amount}</span>
                </div>
              </div>
            </motion.div>
          )}

          {/* Form Navigation */}
          <div className="flex justify-between mt-8">
            {step > 1 ? (
              <button
                type="button"
                onClick={handleBack}
                className="px-6 py-3 text-gray-700 font-medium border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Back
              </button>
            ) : (
              <div></div>
            )}

            {step < 3 ? (
              <button
                type="button"
                onClick={handleNext}
                className="px-6 py-3 bg-primary-600 text-white font-medium rounded-lg hover:bg-primary-700 transition-colors"
              >
                Next
              </button>
            ) : (
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-3 bg-primary-600 text-white font-medium rounded-lg hover:bg-primary-700 transition-colors flex items-center"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </>
                ) : (
                  'Complete Donation'
                )}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default DonateForm; 