import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BiDonateHeart, BiWater, BiHealth, BiBook, BiHomeHeart, BiWorld } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';

const DonationTabs = () => {
  const [activeTab, setActiveTab] = useState('emergency');
  const navigate = useNavigate();

  const donationCategories = [
    {
      id: 'emergency',
      name: 'Emergency Relief',
      icon: <BiDonateHeart className="w-6 h-6" />,
      color: 'from-red-500 to-red-600',
      hoverColor: 'hover:from-red-600 hover:to-red-700',
      description: 'Provide immediate assistance to those affected by natural disasters and humanitarian crises.',
      campaigns: [
        {
          id: 1,
          title: 'Gaza Emergency Appeal',
          target: 1000000,
          raised: 750000,
          image: '/images/campaigns/gaza-emergency.jpg',
          slug: 'gaza-emergency-appeal'
        },
        {
          id: 2,
          title: 'Syria Earthquake Relief',
          target: 500000,
          raised: 320000,
          image: '/images/campaigns/syria-earthquake.jpg',
          slug: 'syria-earthquake-relief'
        },
        {
          id: 3,
          title: 'Yemen Crisis Fund',
          target: 750000,
          raised: 425000,
          image: '/images/campaigns/yemen-crisis.jpg',
          slug: 'yemen-crisis-fund'
        }
      ]
    },
    {
      id: 'water',
      name: 'Water & Sanitation',
      icon: <BiWater className="w-6 h-6" />,
      color: 'from-blue-500 to-blue-600',
      hoverColor: 'hover:from-blue-600 hover:to-blue-700',
      description: 'Help provide clean water, sanitation facilities, and hygiene education to communities in need.',
      campaigns: [
        {
          id: 1,
          title: 'Water Wells Project',
          target: 300000,
          raised: 210000,
          image: '/images/campaigns/water-wells.jpg',
          slug: 'water-wells-project'
        },
        {
          id: 2,
          title: 'Clean Water for Schools',
          target: 150000,
          raised: 95000,
          image: '/images/campaigns/clean-water-schools.jpg',
          slug: 'clean-water-for-schools'
        }
      ]
    },
    {
      id: 'health',
      name: 'Healthcare',
      icon: <BiHealth className="w-6 h-6" />,
      color: 'from-green-500 to-green-600',
      hoverColor: 'hover:from-green-600 hover:to-green-700',
      description: 'Support medical clinics, hospitals, and mobile healthcare services in underserved areas.',
      campaigns: [
        {
          id: 1,
          title: 'Medical Aid for Gaza',
          target: 500000,
          raised: 320000,
          image: '/images/campaigns/medical-gaza.jpg',
          slug: 'medical-aid-gaza'
        },
        {
          id: 2,
          title: 'Mobile Medical Clinics',
          target: 250000,
          raised: 125000,
          image: '/images/campaigns/mobile-clinics.jpg',
          slug: 'mobile-medical-clinics'
        }
      ]
    },
    {
      id: 'education',
      name: 'Education',
      icon: <BiBook className="w-6 h-6" />,
      color: 'from-purple-500 to-purple-600',
      hoverColor: 'hover:from-purple-600 hover:to-purple-700',
      description: 'Help build schools, provide educational materials, and support teacher training programs.',
      campaigns: [
        {
          id: 1,
          title: 'School Rebuilding Project',
          target: 400000,
          raised: 275000,
          image: '/images/campaigns/school-rebuild.jpg',
          slug: 'school-rebuilding-project'
        },
        {
          id: 2,
          title: 'Refugee Education Program',
          target: 200000,
          raised: 135000,
          image: '/images/campaigns/refugee-education.jpg',
          slug: 'refugee-education-program'
        }
      ]
    },
    {
      id: 'orphans',
      name: 'Orphan Sponsorship',
      icon: <BiHomeHeart className="w-6 h-6" />,
      color: 'from-amber-500 to-amber-600',
      hoverColor: 'hover:from-amber-600 hover:to-amber-700',
      description: 'Provide food, shelter, healthcare, and education to orphaned children worldwide.',
      campaigns: [
        {
          id: 1,
          title: 'Orphan Sponsorship Program',
          target: 600000,
          raised: 425000,
          image: '/images/campaigns/orphan-sponsorship.jpg',
          slug: 'orphan-sponsorship-program'
        },
        {
          id: 2,
          title: 'Orphanage Support Project',
          target: 300000,
          raised: 210000,
          image: '/images/campaigns/orphanage-support.jpg',
          slug: 'orphanage-support-project'
        }
      ]
    },
    {
      id: 'general',
      name: 'Where Most Needed',
      icon: <BiWorld className="w-6 h-6" />,
      color: 'from-gray-600 to-gray-700',
      hoverColor: 'hover:from-gray-700 hover:to-gray-800',
      description: 'Allow us to allocate your donation to the areas with the most urgent needs.',
      campaigns: [
        {
          id: 1,
          title: 'General Fund',
          target: 1000000,
          raised: 650000,
          image: '/images/campaigns/general-fund.jpg',
          slug: 'general-fund'
        }
      ]
    }
  ];

  const handleNavigateToCampaign = (slug) => {
    navigate(`/campaigns/${slug}`);
  };

  const activeCategory = donationCategories.find(cat => cat.id === activeTab);

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1.5 bg-primary-50 text-primary-600 rounded-full text-sm font-medium mb-4 shadow-sm">
            Make a Difference
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Choose Where to <span className="text-primary-600">Donate</span>
          </h2>
          <p className="text-gray-600 max-w-3xl mx-auto">
            Your generosity can change lives. Select a cause below to support projects that align with your values.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex flex-nowrap overflow-x-auto pb-4 mb-8 scrollbar-hide md:justify-center">
          {donationCategories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveTab(category.id)}
              className={`flex items-center px-4 py-3 mr-2 rounded-lg whitespace-nowrap transition-all duration-200 ${activeTab === category.id
                  ? `bg-gradient-to-r ${category.color} text-white shadow-md`
                  : `bg-gray-100 text-gray-700 hover:bg-gray-200`
                }`}
            >
              <span className="mr-2">{category.icon}</span>
              <span className="font-medium">{category.name}</span>
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="bg-gray-50 rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8"
          >
            <div className="flex flex-col lg:flex-row lg:items-center mb-8">
              <div className="lg:w-1/3 lg:pr-8 mb-6 lg:mb-0">
                <div className={`inline-flex p-3 rounded-full bg-gradient-to-r ${activeCategory.color} text-white mb-4 shadow-md`}>
                  {activeCategory.icon}
                </div>
                <h3 className="text-2xl font-bold mb-3">{activeCategory.name}</h3>
                <p className="text-gray-600 mb-4">{activeCategory.description}</p>
                <button
                  onClick={() => navigate(`/donate/${activeCategory.id}`)}
                  className={`bg-gradient-to-r ${activeCategory.color} ${activeCategory.hoverColor} text-white px-6 py-3 rounded-lg shadow-md transition-transform hover:scale-105 font-medium`}
                >
                  Donate to this cause
                </button>
              </div>

              <div className="lg:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-4">
                {activeCategory.campaigns.map((campaign, index) => (
                  <motion.div
                    key={campaign.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-all hover:border-primary-100 cursor-pointer"
                    onClick={() => handleNavigateToCampaign(campaign.slug)}
                  >
                    <div className="h-40 overflow-hidden">
                      <img
                        src={campaign.image}
                        alt={campaign.title}
                        className="w-full h-full object-cover transition-transform hover:scale-110 duration-500"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = "/images/sample/campaign-placeholder.jpg";
                        }}
                      />
                    </div>
                    <div className="p-4">
                      <h4 className="font-bold text-gray-800 mb-2">{campaign.title}</h4>
                      <div className="w-full bg-gray-200 rounded-full h-2.5 mb-2">
                        <div
                          className={`h-2.5 rounded-full bg-gradient-to-r ${activeCategory.color}`}
                          style={{ width: `${(campaign.raised / campaign.target) * 100}%` }}
                        ></div>
                      </div>
                      <div className="flex justify-between text-sm text-gray-600">
                        <span>Raised: ${campaign.raised.toLocaleString()}</span>
                        <span>Goal: ${campaign.target.toLocaleString()}</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="text-center">
              <a
                href={`/campaigns?category=${activeCategory.id}`}
                className="inline-flex items-center text-primary-600 hover:text-primary-700 font-medium"
              >
                <span>View all {activeCategory.name} campaigns</span>
                <svg className="ml-2 w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default DonationTabs; 