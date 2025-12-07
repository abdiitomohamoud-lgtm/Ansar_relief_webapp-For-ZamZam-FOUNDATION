import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FaHandHoldingHeart, FaWater, FaUtensils, FaMosque, FaGraduationCap, FaHome, FaUserFriends, FaHandshake } from 'react-icons/fa';
import { FaRegCalendarCheck, FaPaw, FaGlobeAfrica } from 'react-icons/fa';

const SadaqahDetails = () => {

  const { id } = useParams();
  const [amount, setAmount] = useState('');
  const [customAmount, setCustomAmount] = useState('');

  // Extract base category from id (e.g., general-1 -> general)
  const getBaseCategory = (id) => {
    if (!id) return 'general';
    const match = id.match(/^(general|water|food|mosque|education|housing|orphans|community|immediate|periodic|kafarat|aqiqah|specific)/);
    return match ? match[1] : 'general';
  };

  const categories = {
    general: {
      title: 'General Sadaqah',
      description: 'Make a general donation to support our various humanitarian projects.',
      icon: <FaHandHoldingHeart className="text-4xl" />,
      color: 'bg-blue-500',
      impact: 'Your donation will help us provide essential support to communities in need.',
      suggestedAmounts: [10, 25, 50, 100, 250]
    },
    water: {
      title: 'Water Sadaqah',
      description: 'Help provide clean water to communities in need.',
      icon: <FaWater className="text-4xl" />,
      color: 'bg-cyan-500',
      impact: 'Your donation will help provide clean water access to communities.',
      suggestedAmounts: [20, 50, 100, 200, 500]
    },
    food: {
      title: 'Food Sadaqah',
      description: 'Support food security programs and provide meals to those in need.',
      icon: <FaUtensils className="text-4xl" />,
      color: 'bg-orange-500',
      impact: 'Your donation will help provide food to families in need.',
      suggestedAmounts: [15, 30, 60, 120, 300]
    },
    mosque: {
      title: 'Mosque Sadaqah',
      description: 'Contribute to the construction and maintenance of mosques.',
      icon: <FaMosque className="text-4xl" />,
      color: 'bg-green-500',
      impact: 'Your donation will help maintain and improve mosque facilities.',
      suggestedAmounts: [50, 100, 200, 500, 1000]
    },
    education: {
      title: 'Education Sadaqah',
      description: 'Support educational initiatives and help students in need.',
      icon: <FaGraduationCap className="text-4xl" />,
      color: 'bg-purple-500',
      impact: 'Your donation will help provide education to students in need.',
      suggestedAmounts: [25, 50, 100, 250, 500]
    },
    housing: {
      title: 'Housing Sadaqah',
      description: 'Help provide shelter to families in need.',
      icon: <FaHome className="text-4xl" />,
      color: 'bg-red-500',
      impact: 'Your donation will help provide shelter to families in need.',
      suggestedAmounts: [100, 250, 500, 1000, 2500]
    },
    orphans: {
      title: 'Orphan Support',
      description: 'Support orphan care programs and education.',
      icon: <FaUserFriends className="text-4xl" />,
      color: 'bg-yellow-500',
      impact: 'Your donation will help support orphan care and education.',
      suggestedAmounts: [30, 60, 120, 300, 600]
    },
    community: {
      title: 'Community Development',
      description: 'Support community development and social welfare programs.',
      icon: <FaHandshake className="text-4xl" />,
      color: 'bg-indigo-500',
      impact: 'Your donation will help support community development initiatives.',
      suggestedAmounts: [40, 80, 160, 400, 800]
    },
    immediate: {
      title: 'Immediate Needs',
      description: 'Support urgent and emergency needs for vulnerable communities.',
      icon: <FaHandHoldingHeart className="text-4xl" />,
      color: 'bg-pink-500',
      impact: 'Your donation will help us respond quickly to urgent needs.',
      suggestedAmounts: [20, 50, 100, 200, 500]
    },
    periodic: {
      title: 'Periodic Sadaqah',
      description: 'Make a recurring donation to support ongoing projects.',
      icon: <FaRegCalendarCheck className="text-4xl" />,
      color: 'bg-teal-500',
      impact: 'Your donation will provide sustained support for those in need.',
      suggestedAmounts: [10, 25, 50, 100, 250]
    },
    kafarat: {
      title: 'Kafarat & Fidyah',
      description: 'Fulfill religious obligations and support those in need.',
      icon: <FaHandshake className="text-4xl" />,
      color: 'bg-gray-500',
      impact: 'Your donation will help fulfill Kafarat and Fidyah requirements.',
      suggestedAmounts: [5, 10, 20, 50, 100]
    },
    aqiqah: {
      title: 'Aqiqah & Sacrifice',
      description: 'Support Aqiqah and sacrificial giving for families.',
      icon: <FaPaw className="text-4xl" />,
      color: 'bg-yellow-700',
      impact: 'Your donation will help families fulfill Aqiqah and sacrificial obligations.',
      suggestedAmounts: [100, 200, 400, 800, 1600]
    },
    specific: {
      title: 'Special Projects',
      description: 'Support specific and unique charitable projects.',
      icon: <FaGlobeAfrica className="text-4xl" />,
      color: 'bg-indigo-700',
      impact: 'Your donation will help fund special projects for communities.',
      suggestedAmounts: [50, 100, 250, 500, 1000]
    }
  };

  const baseCategory = getBaseCategory(id);
  const category = categories[baseCategory] || categories.general;

  const handleAmountSelect = (value) => {
    setAmount(value);
    setCustomAmount('');
  };

  const handleCustomAmountChange = (e) => {
    setCustomAmount(e.target.value);
    setAmount('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const donationAmount = amount || customAmount;
    // In a real app, process the donation
    console.log('Processing donation:', donationAmount);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className={`${category.color} rounded-lg p-8 text-white mb-8`}>
          <div className="flex items-center justify-center mb-4">
            {category.icon}
          </div>
          <h1 className="text-3xl font-bold text-center mb-4">{category.title}</h1>
          <p className="text-center text-lg">{category.description}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-2xl font-semibold mb-4">Your Impact</h2>
            <p className="text-gray-600 mb-6">{category.impact}</p>
            
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold mb-4">Suggested Amounts</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {category.suggestedAmounts.map((value) => (
                  <button
                    key={value}
                    onClick={() => handleAmountSelect(value)}
                    className={`p-3 rounded-lg border ${
                      amount === value
                        ? 'border-blue-500 bg-blue-50 text-blue-700'
                        : 'border-gray-300 hover:border-blue-500'
                    }`}
                  >
                    ${value}
                  </button>
                ))}
              </div>
              
              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Custom Amount
                </label>
                <input
                  type="number"
                  value={customAmount}
                  onChange={handleCustomAmountChange}
                  className="w-full rounded-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                  placeholder="Enter custom amount"
                />
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-4">Make Your Donation</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  className="w-full rounded-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  required
                  className="w-full rounded-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone
                </label>
                <input
                  type="tel"
                  required
                  className="w-full rounded-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Payment Method
                </label>
                <select
                  required
                  className="w-full rounded-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                >
                  <option value="">Select payment method</option>
                  <option value="credit">Credit Card</option>
                  <option value="debit">Debit Card</option>
                  <option value="bank">Bank Transfer</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700"
              >
                Donate Now
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SadaqahDetails; 