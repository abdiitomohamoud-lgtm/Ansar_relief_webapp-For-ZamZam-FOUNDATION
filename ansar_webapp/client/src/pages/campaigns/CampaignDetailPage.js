import React, { useState, useEffect } from 'react';
import { useDonation } from '../../contexts/DonationContext';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaArrowLeft, FaHeart, FaShare, FaMapMarkerAlt, FaClock } from 'react-icons/fa';

const CampaignDetailPage = () => {
  const { id } = useParams();
  const { openQuickDonateWithUrgentNeed } = useDonation();
  const [campaign, setCampaign] = useState(null);
  const [loading, setLoading] = useState(true);
  const [donationAmount, setDonationAmount] = useState(100);
  const [activeTab, setActiveTab] = useState('about');

  const fallbackImage = "/images/campaigns/hero/hero-bg.jpg";

  useEffect(() => {
    const fetchCampaignDetails = async () => {
      setLoading(true);
      try {
        const response = await fetch(`/api/campaign-page/campaigns/${id}`);
        if (!response.ok) {
          throw new Error('Campaign not found');
        }
        const data = await response.json();
        setCampaign(data);
      } catch (error) {
        console.error('Error fetching campaign details:', error);
        setCampaign(null);
      } finally {
        setLoading(false);
      }
    };
    fetchCampaignDetails();
  }, [id]);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-600"></div>
    </div>;
  }

  if (!campaign) {
    return <div className="min-h-screen flex items-center justify-center text-red-600 font-semibold">Campaign not found or failed to load.</div>;
  }

  const percentRaised = (campaign.raised / campaign.goal) * 100;

  return (
    <div className="container mx-auto px-4 py-12 pt-20">
      {/* Back Button */}
      <Link to="/campaigns" className="inline-flex items-center text-green-600 mb-6 hover:text-green-700 transition">
        <FaArrowLeft className="mr-2" /> Back to Campaigns
      </Link>

      {/* Campaign Header */}
      <div className="relative rounded-lg overflow-hidden mb-8">
        <img 
          src={campaign.image} 
          alt={campaign.title} 
          className="w-full h-80 object-cover"
          onError={e => { e.target.onerror = null; e.target.src = fallbackImage; }}
        />
        <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black to-transparent p-6">
          <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium">
            {campaign.category}
          </span>
          <h1 className="text-3xl md:text-4xl font-bold text-white mt-2">{campaign.title}</h1>
        </div>
      </div>

      {/* Campaign Content */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left Column - Campaign Details */}
        <div className="md:col-span-2">
          {/* Tabs */}
          <div className="border-b mb-6">
            <nav className="flex -mb-px">
              {['about', 'updates', 'gallery'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`mr-8 py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab 
                      ? 'border-green-500 text-green-600' 
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </nav>
          </div>

          {/* Tab Content */}
          {activeTab === 'about' && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="prose max-w-none bg-white rounded-lg shadow-md p-8 border border-gray-100"
            >
              {campaign.longDescription ? (
                <div className="text-gray-800 text-base leading-relaxed" dangerouslySetInnerHTML={{ __html: campaign.longDescription }} />
              ) : (
                <p className="text-lg text-gray-700 font-medium mb-4">{campaign.description || campaign.details}</p>
              )}
              <div className="flex flex-wrap items-center mt-8 gap-6">
                <div className="flex items-center text-gray-600 text-base">
                  <FaMapMarkerAlt className="mr-2 text-green-500" />
                  <span className="font-semibold">{campaign.location}</span>
                </div>
                <div className="flex items-center text-gray-600 text-base">
                  <FaClock className="mr-2 text-green-500" />
                  <span className="font-semibold">{campaign.daysLeft} days left</span>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'updates' && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <div className="space-y-6">
                {campaign.updates.map((update, index) => (
                  <div key={index} className="border-l-4 border-green-500 pl-4 py-2">
                    <div className="text-sm text-gray-500">{update.date}</div>
                    <div className="mt-1">{update.content}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === 'gallery' && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {campaign.gallery.map((image, index) => (
                  <div key={index} className="rounded-lg overflow-hidden">
                    <img src={image} alt={`Gallery ${index + 1}`} className="w-full h-48 object-cover" />
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </div>

        {/* Right Column - Donation Section */}
        <div>
          <div className="bg-white rounded-lg shadow p-6 sticky top-20">
            <div className="mb-4">
              <div className="flex justify-between mb-2">
                <span className="font-semibold">${campaign.raised.toLocaleString()} raised</span>
                <span>of ${campaign.goal.toLocaleString()}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-green-500 h-2 rounded-full" 
                  style={{ width: `${percentRaised}%` }}
                ></div>
              </div>
              <div className="flex justify-between mt-2 text-sm text-gray-600">
                <span>{campaign.donors} donors</span>
                <span>{campaign.daysLeft} days left</span>
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select donation amount
              </label>
              <div className="grid grid-cols-3 gap-2 mb-4">
                {[50, 100, 250, 500].map((amount) => (
                  <button
                    key={amount}
                    type="button"
                    onClick={() => setDonationAmount(amount)}
                    className={`py-2 px-4 rounded-md text-sm font-medium ${
                      donationAmount === amount
                        ? 'bg-green-100 text-green-700 border border-green-500'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    ${amount}
                  </button>
                ))}
                <button
                  type="button"
                  onClick={() => setDonationAmount('custom')}
                  className={`py-2 px-4 rounded-md text-sm font-medium ${
                    donationAmount === 'custom'
                      ? 'bg-green-100 text-green-700 border border-green-500'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Custom
                </button>
              </div>

              {donationAmount === 'custom' && (
                <div className="mb-4">
                  <div className="relative mt-1 rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <span className="text-gray-500 sm:text-sm">$</span>
                    </div>
                    <input
                      type="text"
                      className="focus:ring-green-500 focus:border-green-500 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md"
                      placeholder="0.00"
                    />
                  </div>
                </div>
              )}

              <button
                className="w-full bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-md font-medium transition"
                onClick={() => openQuickDonateWithUrgentNeed(campaign)}
              >
                Donate Now
              </button>
            </div>

            <div className="flex space-x-2 mb-4">
              <button className="flex-1 flex justify-center items-center py-2 px-4 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50">
                <FaHeart className="mr-2 text-red-500" /> Save
              </button>
              <button className="flex-1 flex justify-center items-center py-2 px-4 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50">
                <FaShare className="mr-2 text-blue-500" /> Share
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CampaignDetailPage;