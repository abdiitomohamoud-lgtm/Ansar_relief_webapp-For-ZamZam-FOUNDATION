import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaDollarSign, FaUsers, FaHeart, FaHandHoldingHeart } from 'react-icons/fa';

const LiveFundraising = () => {
  const [donations, setDonations] = useState([]);
  const [stats, setStats] = useState({
    totalRaised: 0,
    donors: 0,
    avgDonation: 0,
    campaignsSupported: 0
  });

  useEffect(() => {
    // Mock data for live donations
    const mockDonations = [
      { id: 1, name: 'Ahmed M.', amount: 50, campaign: 'Gaza Emergency Appeal', time: '2 minutes ago' },
      { id: 2, name: 'Sara K.', amount: 100, campaign: 'Clean Water for Schools', time: '5 minutes ago' },
      { id: 3, name: 'Anonymous', amount: 75, campaign: 'Orphan Sponsorship', time: '8 minutes ago' },
      { id: 4, name: 'Mohammed A.', amount: 200, campaign: 'Yemen Crisis Fund', time: '12 minutes ago' },
      { id: 5, name: 'Fatima J.', amount: 25, campaign: 'Medical Aid for Gaza', time: '15 minutes ago' },
      { id: 6, name: 'Anonymous', amount: 150, campaign: 'School Rebuilding Project', time: '18 minutes ago' }
    ];

    setDonations(mockDonations);

    // Set mock statistics
    setStats({
      totalRaised: 245780,
      donors: 3842,
      avgDonation: 64,
      campaignsSupported: 15
    });

    // Simulate new donations coming in
    const interval = setInterval(() => {
      const newDonation = {
        id: Math.random().toString(36).substr(2, 9),
        name: Math.random() > 0.3 ? `${['Ahmed', 'Sara', 'Mohammed', 'Fatima', 'Yusuf', 'Amina'][Math.floor(Math.random() * 6)]} ${['M', 'K', 'A', 'J', 'S', 'R'][Math.floor(Math.random() * 6)]}.` : 'Anonymous',
        amount: Math.floor(Math.random() * 200) + 10,
        campaign: ['Gaza Emergency Appeal', 'Clean Water for Schools', 'Orphan Sponsorship', 'Yemen Crisis Fund', 'Medical Aid for Gaza', 'School Rebuilding Project'][Math.floor(Math.random() * 6)],
        time: 'just now'
      };

      setDonations(prevDonations => {
        const updatedDonations = [newDonation, ...prevDonations.slice(0, 5)];
        return updatedDonations;
      });

      // Update the stats
      setStats(prev => ({
        ...prev,
        totalRaised: prev.totalRaised + newDonation.amount,
        donors: prev.donors + 1,
        avgDonation: Math.floor((prev.totalRaised + newDonation.amount) / (prev.donors + 1))
      }));
    }, 12000); // Add a new donation every 12 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-16 bg-gradient-to-b from-green-50 to-white relative overflow-hidden">
      <div className="absolute inset-0 pattern-dots pattern-opacity-5"></div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1.5 bg-green-50 text-green-600 rounded-full text-sm font-medium mb-4 shadow-sm">
            Live Fundraising
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Watch Generosity in <span className="text-green-600">Real-Time</span>
          </h2>
          <p className="text-gray-600 max-w-3xl mx-auto">
            See donations as they come in and join our generous community in making a difference.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
          {/* Live Donations Feed */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
              <h3 className="text-xl font-bold mb-6 flex items-center text-gray-800">
                <span className="inline-block w-3 h-3 bg-green-500 rounded-full mr-2 animate-pulse"></span>
                Live Donations Feed
              </h3>

              <div className="space-y-4 max-h-96 overflow-y-auto pr-2 custom-scrollbar">
                {donations.map((donation, index) => (
                  <motion.div
                    key={donation.id}
                    initial={index === 0 ? { opacity: 0, y: -20 } : { opacity: 1, y: 0 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="flex items-center p-3 rounded-lg border border-gray-100 hover:border-green-100 hover:bg-green-50/30 transition-colors"
                  >
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mr-3">
                      <FaDollarSign className="text-green-600" />
                    </div>
                    <div className="flex-grow">
                      <p className="font-medium text-gray-800">{donation.name}</p>
                      <p className="text-sm text-gray-500">Donated to {donation.campaign}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-green-600">${donation.amount}</p>
                      <p className="text-xs text-gray-500">{donation.time}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Stats */}
          <div>
            <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100 mb-8">
              <h3 className="text-xl font-bold mb-6 text-gray-800">Current Statistics</h3>

              <div className="space-y-5">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-600 flex items-center">
                      <FaDollarSign className="mr-2 text-green-500" />
                      Total Raised
                    </span>
                    <span className="text-2xl font-bold text-gray-800">${stats.totalRaised.toLocaleString()}</span>
                  </div>
                  <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-green-500"
                      initial={{ width: '0%' }}
                      animate={{ width: '85%' }}
                      transition={{ duration: 2 }}
                    ></motion.div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-600 flex items-center">
                      <FaUsers className="mr-2 text-blue-500" />
                      Total Donors
                    </span>
                    <span className="text-2xl font-bold text-gray-800">{stats.donors.toLocaleString()}</span>
                  </div>
                  <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-blue-500"
                      initial={{ width: '0%' }}
                      animate={{ width: '65%' }}
                      transition={{ duration: 2 }}
                    ></motion.div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-600 flex items-center">
                      <FaHeart className="mr-2 text-red-500" />
                      Average Donation
                    </span>
                    <span className="text-2xl font-bold text-gray-800">${stats.avgDonation}</span>
                  </div>
                  <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-red-500"
                      initial={{ width: '0%' }}
                      animate={{ width: '50%' }}
                      transition={{ duration: 2 }}
                    ></motion.div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-600 flex items-center">
                      <FaHandHoldingHeart className="mr-2 text-purple-500" />
                      Campaigns
                    </span>
                    <span className="text-2xl font-bold text-gray-800">{stats.campaignsSupported}</span>
                  </div>
                  <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-purple-500"
                      initial={{ width: '0%' }}
                      animate={{ width: '70%' }}
                      transition={{ duration: 2 }}
                    ></motion.div>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-center">
              <Link
                to="/donate"
                className="inline-flex items-center justify-center w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white py-3 px-6 rounded-lg transition-colors shadow-md hover:shadow-lg font-medium"
              >
                Join Our Donors
                <FaHeart className="ml-2" size={14} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LiveFundraising; 