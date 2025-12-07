import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaRegClock, FaUsers, FaHandHoldingHeart, FaCheck } from 'react-icons/fa';

const AlaqraboonDonation = () => {
  const [selectedPackage, setSelectedPackage] = useState(null);

  const packages = [
    {
      id: 'mercy',
      name: 'Mercy Package',
      amount: 50,
      color: 'blue',
      items: [
        { name: 'Mercy Family', amount: 20 },
        { name: 'Poor Family', amount: 15 },
        { name: 'Student Support', amount: 15 }
      ]
    },
    {
      id: 'popular',
      name: 'Popular Package',
      amount: 150,
      color: 'green',
      popular: true,
      items: [
        { name: 'Mercy Family', amount: 50 },
        { name: 'Poor Family', amount: 50 },
        { name: 'Student Support', amount: 50 }
      ]
    },
    {
      id: 'khair',
      name: 'Al Khair Package',
      amount: 250,
      color: 'purple',
      items: [
        { name: 'Mercy Family', amount: 100 },
        { name: 'Poor Family', amount: 75 },
        { name: 'Student Support', amount: 75 }
      ]
    }
  ];

  const getColorClasses = (color) => {
    const colors = {
      blue: {
        bg: 'bg-blue-600',
        hover: 'hover:bg-blue-700',
        text: 'text-blue-600',
        light: 'bg-blue-50'
      },
      green: {
        bg: 'bg-green-600',
        hover: 'hover:bg-green-700',
        text: 'text-green-600',
        light: 'bg-green-50'
      },
      purple: {
        bg: 'bg-purple-600',
        hover: 'hover:bg-purple-700',
        text: 'text-purple-600',
        light: 'bg-purple-50'
      }
    };
    return colors[color];
  };

  return (
    <section className="bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900">Alaqraboon Periodic Donation</h2>
          <p className="mt-4 text-lg text-gray-600">
            Make a lasting impact with regular monthly donations to support continuous charitable work
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {packages.map((pkg) => {
            const colors = getColorClasses(pkg.color);
            return (
              <motion.div
                key={pkg.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className={`relative bg-white rounded-xl shadow-lg overflow-hidden ${
                  selectedPackage === pkg.id ? 'ring-2 ring-blue-500' : ''
                }`}
              >
                {pkg.popular && (
                  <div className="absolute top-0 right-0 mt-4 mr-4">
                    <span className="bg-yellow-400 text-yellow-900 text-xs font-bold px-3 py-1 rounded-full">
                      Most Popular
                    </span>
                  </div>
                )}
                <div className={`${colors.bg} p-6 text-white`}>
                  <h3 className="text-xl font-bold">{pkg.name}</h3>
                  <div className="mt-2">
                    <span className="text-3xl font-bold">{pkg.amount}</span>
                    <span className="text-sm ml-1">QAR</span>
                  </div>
                  <div className="text-sm mt-1 text-white/80">per month</div>
                </div>

                <div className="p-6">
                  <ul className="space-y-4 mb-6">
                    {pkg.items.map((item, index) => (
                      <li key={index} className="flex items-start">
                        <div className={`${colors.light} p-2 rounded-full mr-3`}>
                          <FaCheck className={colors.text} />
                        </div>
                        <div>
                          <span className="font-medium">{item.name}</span>
                          <span className="block text-sm text-gray-500">
                            {item.amount} QAR monthly
                          </span>
                        </div>
                      </li>
                    ))}
                  </ul>

                  <button
                    onClick={() => setSelectedPackage(pkg.id)}
                    className={`w-full ${colors.bg} ${
                      colors.hover
                    } text-white py-3 rounded-lg font-medium transition-colors flex items-center justify-center ${
                      selectedPackage === pkg.id ? 'ring-2 ring-offset-2 ring-blue-500' : ''
                    }`}
                  >
                    <FaHandHoldingHeart className="mr-2" />
                    Select Package
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-600 mb-4">
            Your donation will be processed monthly until you choose to cancel
          </p>
          <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
            <FaRegClock />
            <span>Recurring monthly donation</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AlaqraboonDonation; 