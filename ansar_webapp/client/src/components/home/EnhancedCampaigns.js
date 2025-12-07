import React, { useState, useEffect } from 'react';
import { useDonation } from '../../contexts/DonationContext';
import { Link } from 'react-router-dom';
import { FaArrowRight, FaHeart, FaShieldAlt, FaClock, FaBookmark, FaRegBookmark, FaTag, FaUser, FaChartLine, FaImage, FaCalendarAlt, FaMapMarkerAlt, FaRegLightbulb } from 'react-icons/fa';
import { CgSpinner } from 'react-icons/cg';
import { motion, AnimatePresence } from 'framer-motion';

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15
    }
  }
};

// Enhanced shimmer effect component
const ShimmerEffect = ({ active }) => (
  <motion.div 
    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
    initial={{ x: '-100%', opacity: 0 }}
    animate={active ? { 
      x: ['-100%', '100%'], 
      opacity: [0, 1, 0] 
    } : { x: '-100%', opacity: 0 }}
    transition={{ 
      duration: 1.8,
      repeat: active ? Infinity : 0,
      repeatDelay: 0.5
    }}
  />
);

const EnhancedCampaigns = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [savedCampaigns, setSavedCampaigns] = useState({});
  const [hoveredCard, setHoveredCard] = useState(null);
  const { openQuickDonateWithUrgentNeed } = useDonation();

  // Function to get reliable image paths from available images
  const getImagePath = (id) => {
    const availableImages = {
      1: '/images/sample/campaigns/earthquake-relief.jpg',
      2: '/images/sample/campaigns/clean-water.jpg',
      3: '/images/sample/campaigns/healthcare.jpg',
      4: '/images/sample/campaigns/education.jpg',
      5: '/images/sample/campaigns/food-security.jpg'
    };
    
    return availableImages[id] || availableImages[5];
  };

  // Mock data fetching - Replace with actual API call
  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        // Simulated API call delay
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Mock data
        const mockCampaigns = [
          {
            id: 'gaza2024',
            title: 'Children of Syria Relief Program',
            description: 'Provide essential support to Syrian children affected by the ongoing crisis. Our program includes food, shelter, medical care, and educational resources.',
            image: getImagePath(1),
            fallbackImage: getImagePath(5),
            raised: 45000,
            goal: 100000,
            donorsCount: 326,
            daysLeft: 21,
            licenseNumber: 'LIC-2023-1456',
            category: 'Emergency Relief',
            urgency: 'High',
            color: 'primary',
            location: 'Syria'
          },
          {
            id: 'clean-water-23',
            title: 'Clean Water for Yemen',
            description: 'Help provide clean drinking water to communities in Yemen suffering from water shortages. We are building wells and water purification systems.',
            image: getImagePath(2),
            fallbackImage: getImagePath(5),
            raised: 28500,
            goal: 75000,
            donorsCount: 198,
            daysLeft: 45,
            licenseNumber: 'LIC-2023-1789',
            category: 'Water & Sanitation',
            urgency: 'Medium',
            color: 'cyan',
            location: 'Yemen'
          },
          {
            id: 'ramadan-2024',
            title: 'Gaza Emergency Fund',
            description: 'Urgent support needed for families in Gaza during the current humanitarian crisis. Your donation provides food, medicine, and shelter.',
            image: getImagePath(3),
            fallbackImage: getImagePath(5),
            raised: 86000,
            goal: 150000,
            donorsCount: 723,
            daysLeft: 14,
            licenseNumber: 'LIC-2023-2201',
            category: 'Emergency Relief',
            urgency: 'Critical',
            color: 'accent',
            location: 'Gaza'
          },
          {
            id: 'education-2024',
            title: 'Orphans Education Program',
            description: 'Support orphans with educational materials, school fees, and mentorship programs. Help build a brighter future for vulnerable children.',
            image: getImagePath(4),
            fallbackImage: getImagePath(5),
            raised: 32400,
            goal: 60000,
            donorsCount: 245,
            daysLeft: 60,
            licenseNumber: 'LIC-2023-1923',
            category: 'Education',
            urgency: 'Medium',
            color: 'emerald',
            location: 'Multiple Countries'
          }
        ];
        
        setCampaigns(mockCampaigns);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching campaigns:', error);
        setLoading(false);
      }
    };
    
    fetchCampaigns();
  }, []);

  const toggleSavedCampaign = (id, e) => {
    e.preventDefault();
    e.stopPropagation();
    setSavedCampaigns(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  // Get urgency badge style
  const getUrgencyBadgeStyle = (urgency) => {
    switch(urgency) {
      case 'Critical':
        return 'bg-red-600 text-white';
      case 'High':
        return 'bg-orange-500 text-white';
      case 'Medium':
        return 'bg-yellow-500 text-gray-900';
      default:
        return 'bg-green-500 text-white';
    }
  };

  // Calculate percentage for progress bar
  const calculateProgress = (raised, goal) => {
    return Math.min(100, (raised / goal) * 100);
  };

  // Get card gradient based on campaign color
  const getCardGradient = (color) => {
    switch(color) {
      case 'primary':
        return 'from-primary-600 to-primary-400';
      case 'accent':
        return 'from-accent-600 to-accent-400';
      case 'cyan':
        return 'from-cyan-600 to-cyan-400';
      case 'emerald':
        return 'from-emerald-600 to-emerald-400';
      default:
        return 'from-primary-600 to-primary-400';
    }
  };

  // Get card accent color
  const getCardAccent = (color) => {
    switch(color) {
      case 'primary':
        return 'border-primary-500 text-primary-700 dark:text-primary-300';
      case 'accent':
        return 'border-accent-500 text-accent-700 dark:text-accent-300';
      case 'cyan':
        return 'border-cyan-500 text-cyan-700 dark:text-cyan-300';
      case 'emerald':
        return 'border-emerald-500 text-emerald-700 dark:text-emerald-300';
      default:
        return 'border-primary-500 text-primary-700 dark:text-primary-300';
    }
  };

  return (
    <section className="py-24 relative overflow-hidden bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      {/* Background decorative elements */}
      <div className="absolute inset-0 pattern-dotted opacity-5 dark:opacity-10"></div>
      <div className="absolute -top-20 -right-20 w-80 h-80 bg-primary-200/30 dark:bg-primary-900/20 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-accent-200/30 dark:bg-accent-900/20 rounded-full blur-3xl"></div>
      
      {/* Decorative floating elements */}
      <motion.div 
        className="absolute top-40 right-10 w-24 h-24 pattern-hexagon opacity-10 dark:opacity-15 rounded-xl"
        animate={{
          y: [0, -15, 0],
          rotate: [0, 10, 0],
          opacity: [0.1, 0.15, 0.1]
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      <motion.div 
        className="absolute bottom-20 left-10 w-32 h-32 pattern-mosaic opacity-10 dark:opacity-15 rounded-xl"
        animate={{
          y: [0, 15, 0],
          rotate: [0, -5, 0],
          opacity: [0.1, 0.15, 0.1]
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="inline-flex items-center justify-center mb-4 space-x-2"
          >
            <span className="h-px w-12 bg-accent-500"></span>
            <span className="text-accent-700 dark:text-accent-300 font-medium px-4 py-1.5 bg-accent-50 dark:bg-accent-900/30 rounded-full text-sm">Make a Difference</span>
            <span className="h-px w-12 bg-accent-500"></span>
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold mb-5 bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-200 bg-clip-text text-transparent"
          >
            Featured Campaigns
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-2xl mx-auto text-gray-800 dark:text-gray-200 text-lg mb-6"
          >
            Join our mission to create positive change. Your support makes a real difference in the lives of those who need it most.
          </motion.p>
          
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "120px" }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="h-1 bg-gradient-to-r from-accent-500 to-primary-500 rounded-full mx-auto"
          />
        </div>
        
        {loading ? (
          <div className="flex flex-col justify-center items-center py-20">
            <motion.div
              animate={{ 
                rotate: 360,
                borderRadius: ["50% 50% 50% 50%", "60% 40% 60% 40%", "40% 60% 40% 60%", "50% 50% 50% 50%"] 
              }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="w-16 h-16 border-4 border-primary-600 border-t-transparent rounded-full"
            ></motion.div>
            <p className="mt-4 text-gray-700 dark:text-gray-300">Loading campaigns...</p>
          </div>
        ) : (
          <>
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-10"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {campaigns.map(campaign => (
                <motion.div
                  key={campaign.id}
                  className="group bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl border border-gray-100 dark:border-gray-700 transition-all duration-300 flex flex-col"
                  variants={cardVariants}
                  onMouseEnter={() => setHoveredCard(campaign.id)}
                  onMouseLeave={() => setHoveredCard(null)}
                  whileHover={{ 
                    y: -12,
                    boxShadow: "0 25px 35px -5px rgba(0, 0, 0, 0.15), 0 10px 15px -6px rgba(0, 0, 0, 0.1)"
                  }}
                >
                  <div className="relative overflow-hidden">
                    {/* Overlay gradient */}
                    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-black/70 via-black/40 to-transparent z-10"></div>
                    
                    {/* License badge */}
                    <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-30">
                      <span className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm text-gray-900 dark:text-white px-4 py-1.5 rounded-full text-xs font-semibold flex items-center shadow-lg border border-gray-200 dark:border-gray-700">
                        <FaShieldAlt className="mr-1.5 text-primary-600 dark:text-primary-400" />
                        License: {campaign.licenseNumber}
                      </span>
                    </div>
                    
                    {/* Bookmark button */}
                    <button
                      onClick={(e) => toggleSavedCampaign(campaign.id, e)}
                      className="absolute top-4 right-4 z-20 bg-white/90 dark:bg-gray-800/90 p-2.5 rounded-full shadow-lg border border-gray-200 dark:border-gray-700 text-gray-800 dark:text-gray-200 hover:text-accent-600 dark:hover:text-accent-400 transition-colors"
                    >
                      {savedCampaigns[campaign.id] ? 
                        <FaBookmark className="text-accent-600 dark:text-accent-400" size={16} /> : 
                        <FaRegBookmark size={16} />
                      }
                    </button>
                    
                    {/* Campaign image */}
                    <motion.img
                      src={campaign.image}
                      alt={campaign.title}
                      className="w-full h-80 object-cover transition-transform duration-700"
                      initial={{ scale: 1 }}
                      animate={{ scale: hoveredCard === campaign.id ? 1.07 : 1 }}
                      onError={(e) => {
                        e.target.src = campaign.fallbackImage;
                      }}
                    />
                    
                    {/* Urgency badge */}
                    <div className="absolute bottom-4 left-4 z-20">
                      <span className={`px-4 py-2 text-sm font-medium ${getUrgencyBadgeStyle(campaign.urgency)} rounded-lg shadow-lg flex items-center`}>
                        <span className="inline-block w-2 h-2 bg-white rounded-full mr-2 animate-pulse"></span>
                        {campaign.urgency} Need
                      </span>
                    </div>
                    
                    {/* Category badge */}
                    <div className="absolute bottom-4 right-4 z-20">
                      <span className="bg-white/90 dark:bg-gray-800/90 text-gray-900 dark:text-gray-100 px-4 py-2 rounded-lg text-sm font-medium shadow-lg backdrop-blur-sm">
                        {campaign.category}
                      </span>
                    </div>
                  </div>
                  
                  <div className="p-7 flex-1 flex flex-col">
                    {/* Location */}
                    <div className="flex items-center mb-4 text-sm font-medium text-gray-700 dark:text-gray-300">
                      <FaMapMarkerAlt className="mr-1.5 text-accent-600 dark:text-accent-400" size={14} />
                      <span>{campaign.location}</span>
                    </div>
                    
                    {/* Title */}
                    <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white leading-tight">
                      {campaign.title}
                    </h3>
                    
                    {/* Description */}
                    <p className="text-gray-800 dark:text-gray-200 mb-6 flex-1 leading-relaxed">
                      {campaign.description}
                    </p>
                    
                    {/* Progress section */}
                    <div className="mb-5">
                      <div className="flex justify-between text-base mb-2 font-semibold">
                        <motion.span 
                          className="text-gray-900 dark:text-white"
                          animate={{ 
                            scale: hoveredCard === campaign.id ? [1, 1.05, 1] : 1
                          }}
                          transition={{ duration: 0.5, repeat: hoveredCard === campaign.id ? Infinity : 0, repeatDelay: 2 }}
                        >
                          ${campaign.raised.toLocaleString()}
                        </motion.span>
                        <span className="text-gray-700 dark:text-gray-300">of ${campaign.goal.toLocaleString()}</span>
                      </div>
                      
                      <div className="w-full h-3 bg-gray-100 dark:bg-gray-700 rounded-full mb-2 overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${calculateProgress(campaign.raised, campaign.goal)}%` }}
                          transition={{ duration: 1, delay: 0.2 }}
                          className={`bg-gradient-to-r ${getCardGradient(campaign.color)} h-full rounded-full relative`}
                        >
                          <ShimmerEffect active={hoveredCard === campaign.id} />
                        </motion.div>
                      </div>
                      
                      <div className="text-sm font-semibold text-right text-gray-800 dark:text-gray-200">
                        {calculateProgress(campaign.raised, campaign.goal).toFixed(0)}% Funded
                      </div>
                    </div>
                    
                    {/* Stats grid */}
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-3.5 flex items-center justify-center shadow-sm">
                        <FaUser className={`mr-2 ${getCardAccent(campaign.color)}`} size={16} />
                        <span className="text-base text-gray-800 dark:text-gray-100 font-semibold">{campaign.donorsCount} Donors</span>
                      </div>
                      <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-3.5 flex items-center justify-center shadow-sm">
                        <FaClock className={`mr-2 ${getCardAccent(campaign.color)}`} size={16} />
                        <span className="text-base text-gray-800 dark:text-gray-100 font-semibold">{campaign.daysLeft} Days Left</span>
                      </div>
                    </div>
                    
                    {/* CTA Buttons */}
                    <div className="grid grid-cols-5 gap-3">
                      <button
                        type="button"
                        onClick={e => {
                          e.preventDefault();
                          e.stopPropagation();
                          openQuickDonateWithUrgentNeed(campaign);
                        }}
                        className="col-span-4 py-3.5 rounded-xl bg-gradient-to-r from-gray-900 to-gray-800 dark:from-gray-700 dark:to-gray-600 text-white text-center font-bold shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden group"
                      >
                        <span className="relative z-10 flex items-center justify-center">
                          Donate Now <FaHeart className="ml-2 text-accent-500 dark:text-accent-400 group-hover:scale-110 transition-transform" />
                        </span>
                        <motion.div 
                          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                          initial={{ x: '-100%' }}
                          animate={{ x: '100%' }}
                          transition={{ 
                            duration: 1.5, 
                            repeat: Infinity, 
                            repeatDelay: 1 
                          }}
                        />
                      </button>
                      <Link 
                        to={`/campaigns/${campaign.id}`} 
                        className={`col-span-1 flex items-center justify-center py-3.5 rounded-xl bg-gray-100 dark:bg-gray-700 ${getCardAccent(campaign.color)} hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors shadow-lg`}
                      >
                        <FaRegLightbulb size={18} />
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
            
            <motion.div 
              className="mt-16 text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Link 
                to="/campaigns" 
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white dark:bg-gray-800 text-gray-900 dark:text-white font-semibold rounded-xl border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-xl transition duration-300 group"
              >
                <span>View All Campaigns</span>
                <motion.span
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <FaArrowRight />
                </motion.span>
              </Link>
            </motion.div>
          </>
        )}
      </div>
    </section>
  );
};

export default EnhancedCampaigns; 