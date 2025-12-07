import React from 'react';
import { Link } from 'react-router-dom';
import { FaHandHoldingHeart, FaMosque, FaUsers, FaGlobeAfrica } from 'react-icons/fa';

const Sadaqah = () => {
  const sadaqahTypes = [
    {
      title: 'General Sadaqah',
      description: 'Support our general humanitarian programs and initiatives.',
      icon: FaHandHoldingHeart,
      amount: 'Any Amount',
      link: '/sadaqah/general'
    },
    {
      title: 'Mosque Support',
      description: 'Help maintain and develop mosques in communities.',
      icon: FaMosque,
      amount: 'Any Amount',
      link: '/sadaqah/mosque'
    },
    {
      title: 'Orphan Support',
      description: 'Provide care and education for orphaned children.',
      icon: FaUsers,
      amount: 'Any Amount',
      link: '/sadaqah/orphan'
    },
    {
      title: 'Water Wells',
      description: 'Help provide clean water access to communities.',
      icon: FaGlobeAfrica,
      amount: 'Any Amount',
      link: '/sadaqah/water'
    }
  ];

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="relative h-[60vh] bg-gradient-to-br from-[#8B1F4B] to-[#4B1F8B] overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative h-full flex items-center justify-center text-center px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Give Sadaqah
            </h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              Make a difference in the lives of those in need through the act of Sadaqah.
              Your generosity helps us continue our vital humanitarian work.
            </p>
            <div className="mt-10">
              <Link 
                to="/donate?type=sadaqah"
                className="px-6 py-3 bg-white text-[#8B1F4B] rounded-lg font-medium hover:bg-gray-100 transition-colors"
              >
                Donate Now
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Sadaqah Types */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Types of Sadaqah</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {sadaqahTypes.map((type, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300"
              >
                <div className="w-12 h-12 text-[#8B1F4B] mb-4">
                  <type.icon className="w-full h-full" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{type.title}</h3>
                <p className="text-gray-600 mb-4">{type.description}</p>
                <div className="text-[#8B1F4B] font-medium">{type.amount}</div>
                <Link
                  to={type.link}
                  className="mt-4 block w-full px-4 py-2 bg-[#8B1F4B] text-white text-center rounded-lg hover:bg-[#6B1839] transition-colors"
                >
                  Donate Now
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Your Sadaqah Impact</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-[#8B1F4B] mb-2">100%</div>
              <p className="text-gray-600">Direct to Beneficiaries</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-[#8B1F4B] mb-2">50+</div>
              <p className="text-gray-600">Communities Served</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-[#8B1F4B] mb-2">1M+</div>
              <p className="text-gray-600">Lives Impacted</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-[#8B1F4B] text-white rounded-full flex items-center justify-center mx-auto mb-4">
                1
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Choose Your Sadaqah</h3>
              <p className="text-gray-600">Select the type of Sadaqah you want to give</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-[#8B1F4B] text-white rounded-full flex items-center justify-center mx-auto mb-4">
                2
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Enter Amount</h3>
              <p className="text-gray-600">Specify the amount you want to donate</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-[#8B1F4B] text-white rounded-full flex items-center justify-center mx-auto mb-4">
                3
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Complete Payment</h3>
              <p className="text-gray-600">Securely process your donation</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-[#8B1F4B] text-white rounded-xl p-8 max-w-7xl mx-auto">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Make Your Sadaqah Count</h2>
          <p className="text-lg mb-8">
            Your Sadaqah helps us provide essential support to communities in need.
            Every contribution makes a difference.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link 
              to="/donate?type=sadaqah"
              className="px-6 py-3 bg-white text-[#8B1F4B] rounded-lg font-medium hover:bg-gray-100 transition-colors"
            >
              Give Sadaqah Now
            </Link>
            <Link
              to="/about/impact"
              className="px-6 py-3 border-2 border-white text-white rounded-lg font-medium hover:bg-white/10 transition-colors"
            >
              Learn More
            </Link>
            <Link
              to="/contact"
              className="px-6 py-3 border-2 border-white text-white rounded-lg font-medium hover:bg-white/10 transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Sadaqah; 