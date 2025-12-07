import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  FaHandHoldingHeart,
  FaGlobeAfrica,
  FaBookReader,
  FaHospital,
  FaBreadSlice,
  FaUsers,
  FaArrowRight
} from 'react-icons/fa';

const GeneralSadaqah = () => {
  // Donation options
  const donationOptions = [
    { value: 10, label: '$10' },
    { value: 25, label: '$25' },
    { value: 50, label: '$50' },
    { value: 100, label: '$100' },
    { value: 250, label: '$250' },
    { value: 500, label: '$500' },
    { value: 1000, label: '$1000' },
    { value: 'custom', label: 'Custom Amount' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#8B1F4B] to-[#4B1F8B]">
        {/* Background Patterns */}
        <div className="absolute inset-0 pattern-islamic-star opacity-[0.03]"></div>
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-[#8B1F4B]/90 via-[#6B1F6B]/90 to-[#4B1F8B]/90"></div>
          <div className="absolute inset-0 bg-noise opacity-20"></div>
        </div>
        
        {/* Main Content */}
        <div className="container mx-auto px-4 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            <div className="mb-8 inline-block">
              <div className="relative">
                <div className="w-20 h-20 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center mx-auto border-2 border-white/20">
                  <FaHandHoldingHeart className="text-4xl text-white" />
                </div>
              </div>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              General Sadaqah
            </h1>
            <p className="text-xl text-white/90 mb-8">
              Your contribution helps us reach those most in need across our various humanitarian programs
            </p>
          </motion.div>
        </div>
      </section>

      {/* Donation Form Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-xl overflow-hidden">
            <div className="md:flex">
              <div className="md:w-1/2 bg-gradient-to-br from-[#8B1F4B] to-[#4B1F8B] p-8 text-white">
                <h2 className="text-2xl font-bold mb-6">Your Sadaqah Makes a Difference</h2>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <div className="flex-shrink-0 h-6 w-6 text-[#FF9F9F]">
                      <FaGlobeAfrica className="h-6 w-6" />
                    </div>
                    <p className="ml-3">Support humanitarian aid in crisis regions</p>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0 h-6 w-6 text-[#FF9F9F]">
                      <FaBookReader className="h-6 w-6" />
                    </div>
                    <p className="ml-3">Fund educational programs for underserved communities</p>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0 h-6 w-6 text-[#FF9F9F]">
                      <FaHospital className="h-6 w-6" />
                    </div>
                    <p className="ml-3">Provide healthcare services to those in need</p>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0 h-6 w-6 text-[#FF9F9F]">
                      <FaBreadSlice className="h-6 w-6" />
                    </div>
                    <p className="ml-3">Distribute food to communities facing hunger</p>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0 h-6 w-6 text-[#FF9F9F]">
                      <FaUsers className="h-6 w-6" />
                    </div>
                    <p className="ml-3">Support orphans and vulnerable children</p>
                  </li>
                </ul>
              </div>
              <div className="md:w-1/2 p-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Make Your Donation</h2>
                <form>
                  <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-medium mb-2">Select Amount</label>
                    <div className="grid grid-cols-4 gap-2">
                      {donationOptions.map((option) => (
                        <button
                          key={option.value}
                          type="button"
                          className="bg-gray-100 hover:bg-[#8B1F4B] hover:text-white py-2 px-4 rounded-md text-gray-800 hover:text-white transition-colors"
                        >
                          {option.label}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-medium mb-2">Custom Amount</label>
                    <input
                      type="number"
                      className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#8B1F4B] focus:border-transparent"
                      placeholder="Enter amount"
                    />
                  </div>
                  <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-medium mb-2">Donation Type</label>
                    <div className="flex space-x-4">
                      <label className="inline-flex items-center">
                        <input type="radio" className="form-radio text-[#8B1F4B]" name="donation_type" value="one_time" defaultChecked />
                        <span className="ml-2">One-time</span>
                      </label>
                      <label className="inline-flex items-center">
                        <input type="radio" className="form-radio text-[#8B1F4B]" name="donation_type" value="monthly" />
                        <span className="ml-2">Monthly</span>
                      </label>
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-[#8B1F4B] hover:bg-[#6B1839] text-white py-3 px-4 rounded-md transition-colors flex items-center justify-center"
                  >
                    Proceed to Payment
                    <FaArrowRight className="ml-2" />
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Statistics */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Your Impact</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Through your generous Sadaqah contributions, we've been able to make a real difference
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-md text-center">
              <div className="text-4xl font-bold text-[#8B1F4B] mb-2">50,000+</div>
              <p className="text-gray-600">People Helped</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md text-center">
              <div className="text-4xl font-bold text-[#8B1F4B] mb-2">25+</div>
              <p className="text-gray-600">Countries Reached</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md text-center">
              <div className="text-4xl font-bold text-[#8B1F4B] mb-2">100+</div>
              <p className="text-gray-600">Active Projects</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md text-center">
              <div className="text-4xl font-bold text-[#8B1F4B] mb-2">95%</div>
              <p className="text-gray-600">Funds to Beneficiaries</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto bg-gradient-to-br from-[#8B1F4B] to-[#4B1F8B] rounded-xl p-8 md:p-12 text-white text-center">
            <h2 className="text-3xl font-bold mb-4">Join Our Monthly Sadaqah Program</h2>
            <p className="text-xl mb-8 max-w-3xl mx-auto">
              Make a lasting impact by becoming a monthly donor. Your regular support helps us plan and implement sustainable solutions.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link 
                to="/donate?type=sadaqah&recurring=true"
                className="px-6 py-3 bg-white text-[#8B1F4B] rounded-lg font-medium hover:bg-gray-100 transition-colors"
              >
                Become a Monthly Donor
              </Link>
              <Link
                to="/contact"
                className="px-6 py-3 border-2 border-white text-white rounded-lg font-medium hover:bg-white/10 transition-colors"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default GeneralSadaqah; 