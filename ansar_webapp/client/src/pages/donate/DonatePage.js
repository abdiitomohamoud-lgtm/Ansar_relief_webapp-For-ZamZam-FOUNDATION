import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  FaHandHoldingHeart, 
  FaChevronRight, 
  FaArrowRight, 
  FaHeart, 
  FaCheckCircle,
  FaGraduationCap,
  FaHospital,
  FaHome,
  FaWater,
  FaHandHoldingUsd,
  FaHandsHelping,
  FaCalendarAlt,
  FaMosque,
  FaBreadSlice,
  FaChild,
  FaTshirt,
  FaPrayingHands,
  FaRegHeart,
  FaUsers,
  FaLandmark,
  FaMoneyBill,
  FaHeartbeat,
  FaGift
} from 'react-icons/fa';

const DonatePage = () => {
  const [navbarHeight, setNavbarHeight] = useState(60);
  const [donationType, setDonationType] = useState('single');
  const [donationAmount, setDonationAmount] = useState(100);
  const [donationCategory, setDonationCategory] = useState('education');
  const [customAmount, setCustomAmount] = useState('');
  
  useEffect(() => {
    // Get actual navbar height for precise calculations
    const navbar = document.querySelector('header') || document.querySelector('nav');
    if (navbar) {
      setNavbarHeight(navbar.offsetHeight);
    }
    
    // Initialize event listener for resize to update navbar height
    const handleResize = () => {
      const navbar = document.querySelector('header') || document.querySelector('nav');
      if (navbar) {
        setNavbarHeight(navbar.offsetHeight);
      }
    };

    window.addEventListener('resize', handleResize);
    
    // Set document title
    document.title = "Donate | Ansar Organization";
    
    // Scroll to top on page load
    window.scrollTo(0, 0);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleAmountChange = (amount) => {
    setDonationAmount(amount);
    setCustomAmount('');
  };

  const handleCustomAmountChange = (e) => {
    const value = e.target.value;
    // Only allow numbers
    if (value === '' || /^\d+$/.test(value)) {
      setCustomAmount(value);
      if (value !== '') {
        setDonationAmount(parseInt(value, 10));
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Redirect to checkout with donation parameters
    window.location.href = `/checkout?amount=${donationAmount}&type=${donationType}&category=${donationCategory}`;
  };

  const donationCategories = [
    { id: 'education', name: 'Educational Support', icon: <FaGraduationCap className="text-2xl" />, color: 'purple' },
    { id: 'health', name: 'Health Support', icon: <FaHospital className="text-2xl" />, color: 'red' },
    { id: 'orphans', name: "Orphans' Needs", icon: <FaHeart className="text-2xl" />, color: 'pink' },
    { id: 'water', name: 'Water and Wells', icon: <FaWater className="text-2xl" />, color: 'blue' },
    { id: 'housing', name: 'Housing Support', icon: <FaHome className="text-2xl" />, color: 'green' },
    { id: 'income', name: 'Economic Empowerment', icon: <FaHandHoldingUsd className="text-2xl" />, color: 'yellow' },
    { id: 'relief', name: 'Relief Support', icon: <FaHandsHelping className="text-2xl" />, color: 'orange' },
    { id: 'sadaqa', name: 'Sadaqah', icon: <FaHandHoldingHeart className="text-2xl" />, color: 'teal' }
  ];

  return (
    <div className="donate-page">
      {/* Hero Section */}
      <section 
        className="relative bg-primary-900 overflow-hidden" 
        style={{ 
          marginTop: `${navbarHeight}px`,
          paddingTop: "6rem",
          paddingBottom: "6rem"
        }}
      >
        {/* Decorative elements */}
        <div className="absolute top-20 right-20 w-72 h-72 bg-primary-600 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-1000"></div>
        <div className="absolute top-40 left-20 w-80 h-80 bg-indigo-600 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-40 right-40 w-64 h-64 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-3000"></div>
        
        {/* Background image with overlay */}
        <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{backgroundImage: `url('https://images.unsplash.com/photo-1593113630400-ea4288922497?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')`}}>
          <div className="absolute inset-0 bg-gradient-to-r from-primary-900/95 to-primary-800/80"></div>
        </div>
        
        {/* Content */}
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="max-w-3xl">
            <span className="inline-block px-3 py-1 text-sm font-medium bg-primary-700/50 text-white rounded-full mb-6">
              Make a Difference Today
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Your Generosity,<br />
              <span className="text-primary-300">Their Hope</span>
            </h1>
            <p className="text-xl text-white/80 mb-8 max-w-2xl">
              Your donation can transform lives, create opportunities, and bring hope to those in need. Join us in making a positive impact around the world.
            </p>
          </div>
        </div>
      </section>

      {/* Donation Form Section */}
      <section className="py-16 bg-white" id="donation-form">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="bg-white rounded-xl shadow-xl overflow-hidden">
              <div className="p-8 border-b border-gray-100">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Make Your Donation</h2>
                <p className="text-gray-600">Choose how you want to make a difference</p>
              </div>
              
              <form onSubmit={handleSubmit} className="p-8">
                {/* Donation Type */}
                <div className="mb-8">
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Donation Type
                  </label>
                  <div className="flex rounded-md overflow-hidden border border-gray-300">
                    <button 
                      type="button"
                      className={`flex-1 py-3 text-center font-medium transition-colors ${donationType === 'single' ? 'bg-primary-600 text-white' : 'bg-gray-50 text-gray-600 hover:bg-gray-100'}`}
                      onClick={() => setDonationType('single')}
                    >
                      Single Donation
                    </button>
                    <button 
                      type="button"
                      className={`flex-1 py-3 text-center font-medium transition-colors ${donationType === 'periodic' ? 'bg-primary-600 text-white' : 'bg-gray-50 text-gray-600 hover:bg-gray-100'}`}
                      onClick={() => setDonationType('periodic')}
                    >
                      Periodic Donation
                    </button>
                  </div>
                </div>
                
                {/* Donation Amount */}
                <div className="mb-8">
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Donation Amount
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
                    {[50, 100, 300, 500].map((amount) => (
                      <button
                        key={amount}
                        type="button"
                        className={`py-3 rounded-md font-medium transition-colors ${
                          donationAmount === amount && customAmount === ''
                            ? 'bg-primary-600 text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                        onClick={() => handleAmountChange(amount)}
                      >
                        ${amount}
                      </button>
                    ))}
                  </div>
                  <div className="mt-3">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Custom Amount
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <span className="text-gray-500">$</span>
                      </div>
                      <input
                        type="text"
                        className="block w-full pl-8 pr-3 py-3 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                        placeholder="Enter custom amount"
                        value={customAmount}
                        onChange={handleCustomAmountChange}
                      />
                    </div>
                  </div>
                </div>
                
                {/* Donation Category */}
                <div className="mb-8">
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Choose Where Your Money Goes
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
                    {donationCategories.map((category) => (
                      <button
                        key={category.id}
                        type="button"
                        className={`flex flex-col items-center p-4 rounded-lg border-2 transition-colors ${
                          donationCategory === category.id
                            ? 'border-primary-600 bg-primary-50'
                            : 'border-gray-200 hover:border-primary-300 hover:bg-gray-50'
                        }`}
                        onClick={() => setDonationCategory(category.id)}
                      >
                        {category.icon}
                        <span className="mt-2 text-sm font-medium">{category.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
                
                {/* Periodic Options - Show only if periodic donation is selected */}
                {donationType === 'periodic' && (
                  <div className="mb-8">
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Donation Frequency
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                      {['Daily', 'Weekly', 'Monthly', 'Every Friday', 'Yearly'].map((frequency) => (
                        <button
                          key={frequency}
                          type="button"
                          className="py-2 px-3 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                        >
                          {frequency}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
                
                {/* Call to Action */}
                <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                  <p className="text-gray-600 text-sm">
                    Your donation will be used to support those most in need.
                  </p>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    className="px-8 py-3 bg-primary-600 text-white rounded-md font-medium hover:bg-primary-700 transition-colors shadow-md flex items-center justify-center"
                  >
                    Proceed to Payment
                    <FaArrowRight className="ml-2" />
                  </motion.button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Current Campaigns Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Current Campaigns</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Join our efforts to make a difference in these urgent causes. Your support can help us reach our goals faster.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Campaign 1 */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow">
              <div className="h-48 bg-cover bg-center" style={{backgroundImage: `url('https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?auto=format&fit=crop&w=800&q=80')`}}>
                <div className="h-full w-full bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
                  <span className="bg-primary-600 text-white text-xs font-bold px-2 py-1 rounded-md">Ongoing</span>
                </div>
              </div>
              <div className="p-5">
                <h3 className="font-bold text-gray-900 text-lg mb-2">Gaza Emergency Relief</h3>
                <p className="text-gray-600 text-sm mb-4">Support families affected by conflict with food, shelter, and medical aid.</p>
                
                <div className="mb-3">
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div className="bg-primary-600 h-2.5 rounded-full" style={{width: '67%'}}></div>
                  </div>
                  <div className="flex justify-between text-xs mt-1">
                    <span className="text-gray-500">$67,500 raised</span>
                    <span className="font-medium text-gray-700">$100,000 goal</span>
                  </div>
                </div>
                
                <Link to="/campaigns/gaza-relief">
                  <button className="w-full py-2 px-4 bg-primary-600 hover:bg-primary-700 text-white rounded-md transition-colors text-sm font-medium flex items-center justify-center">
                    Donate Now <FaChevronRight className="ml-2" />
                  </button>
                </Link>
              </div>
            </div>
            
            {/* Campaign 2 */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow">
              <div className="h-48 bg-cover bg-center" style={{backgroundImage: `url('https://images.unsplash.com/photo-1503428593586-e225b39bddfe?auto=format&fit=crop&w=800&q=80')`}}>
                <div className="h-full w-full bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
                  <span className="bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded-md">Urgent</span>
                </div>
              </div>
              <div className="p-5">
                <h3 className="font-bold text-gray-900 text-lg mb-2">Empowering Poor Families</h3>
                <p className="text-gray-600 text-sm mb-4">Help families break the cycle of poverty through economic empowerment.</p>
                
                <div className="mb-3">
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div className="bg-primary-600 h-2.5 rounded-full" style={{width: '34%'}}></div>
                  </div>
                  <div className="flex justify-between text-xs mt-1">
                    <span className="text-gray-500">$34,151 raised</span>
                    <span className="font-medium text-gray-700">$90,090 goal</span>
                  </div>
                </div>
                
                <Link to="/campaigns/family-empowerment">
                  <button className="w-full py-2 px-4 bg-primary-600 hover:bg-primary-700 text-white rounded-md transition-colors text-sm font-medium flex items-center justify-center">
                    Donate Now <FaChevronRight className="ml-2" />
                  </button>
                </Link>
              </div>
            </div>
            
            {/* Campaign 3 */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow">
              <div className="h-48 bg-cover bg-center" style={{backgroundImage: `url('https://images.unsplash.com/photo-1594708767771-a5f3382c22cd?auto=format&fit=crop&w=800&q=80')`}}>
                <div className="h-full w-full bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
                  <span className="bg-green-600 text-white text-xs font-bold px-2 py-1 rounded-md">Featured</span>
                </div>
              </div>
              <div className="p-5">
                <h3 className="font-bold text-gray-900 text-lg mb-2">Furqan: Education Initiative</h3>
                <p className="text-gray-600 text-sm mb-4">Support education for children through schools, supplies, and teacher training.</p>
                
                <div className="mb-3">
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div className="bg-primary-600 h-2.5 rounded-full" style={{width: '52%'}}></div>
                  </div>
                  <div className="flex justify-between text-xs mt-1">
                    <span className="text-gray-500">$78,500 raised</span>
                    <span className="font-medium text-gray-700">$150,000 goal</span>
                  </div>
                </div>
                
                <Link to="/campaigns/furqan-education">
                  <button className="w-full py-2 px-4 bg-primary-600 hover:bg-primary-700 text-white rounded-md transition-colors text-sm font-medium flex items-center justify-center">
                    Donate Now <FaChevronRight className="ml-2" />
                  </button>
                </Link>
              </div>
            </div>
            
            {/* Campaign 4 */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow">
              <div className="h-48 bg-cover bg-center" style={{backgroundImage: `url('https://images.unsplash.com/photo-1626006634815-67566a32793c?auto=format&fit=crop&w=800&q=80')`}}>
                <div className="h-full w-full bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
                  <span className="bg-purple-600 text-white text-xs font-bold px-2 py-1 rounded-md">New</span>
                </div>
              </div>
              <div className="p-5">
                <h3 className="font-bold text-gray-900 text-lg mb-2">Embrace the Blessings</h3>
                <p className="text-gray-600 text-sm mb-4">Multiply your rewards by supporting our various charitable initiatives.</p>
                
                <div className="mb-3">
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div className="bg-primary-600 h-2.5 rounded-full" style={{width: '23%'}}></div>
                  </div>
                  <div className="flex justify-between text-xs mt-1">
                    <span className="text-gray-500">$23,000 raised</span>
                    <span className="font-medium text-gray-700">$100,000 goal</span>
                  </div>
                </div>
                
                <Link to="/campaigns/embrace-blessings">
                  <button className="w-full py-2 px-4 bg-primary-600 hover:bg-primary-700 text-white rounded-md transition-colors text-sm font-medium flex items-center justify-center">
                    Donate Now <FaChevronRight className="ml-2" />
                  </button>
                </Link>
              </div>
            </div>
          </div>
          
          <div className="text-center mt-10">
            <Link to="/campaigns" className="inline-flex items-center text-primary-600 hover:text-primary-700 font-medium">
              View all campaigns <FaChevronRight className="ml-1" />
            </Link>
          </div>
        </div>
      </section>
      
      {/* Periodic Charity Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Periodic Charity</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Set up regular donations to ensure continuous support for causes you care about.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {/* Periodic Option 1 */}
              <div className="rounded-xl bg-gradient-to-br from-primary-50 to-primary-100 p-6 hover:shadow-md transition-shadow border border-primary-200">
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 bg-primary-600 rounded-full flex items-center justify-center text-white">
                    <FaCalendarAlt size={24} />
                  </div>
                </div>
                <h3 className="font-bold text-center text-gray-900 mb-2">Daily Sadaqa</h3>
                <p className="text-sm text-gray-600 text-center mb-4">
                  Automatic daily donations to support a different need every day.
                </p>
                <Link to="/sadaqah/periodic/daily">
                  <button className="w-full py-2 bg-white text-primary-600 hover:bg-primary-600 hover:text-white border border-primary-600 rounded-md transition-colors text-sm font-medium">
                    Subscribe Now
                  </button>
                </Link>
              </div>
              
              {/* Periodic Option 2 */}
              <div className="rounded-xl bg-gradient-to-br from-amber-50 to-amber-100 p-6 hover:shadow-md transition-shadow border border-amber-200">
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 bg-amber-500 rounded-full flex items-center justify-center text-white">
                    <FaCalendarAlt size={24} />
                  </div>
                </div>
                <h3 className="font-bold text-center text-gray-900 mb-2">Monday & Thursday</h3>
                <p className="text-sm text-gray-600 text-center mb-4">
                  Donate on these blessed days for increased rewards.
                </p>
                <Link to="/sadaqah/periodic/monday-thursday">
                  <button className="w-full py-2 bg-white text-amber-500 hover:bg-amber-500 hover:text-white border border-amber-500 rounded-md transition-colors text-sm font-medium">
                    Subscribe Now
                  </button>
                </Link>
              </div>
              
              {/* Periodic Option 3 */}
              <div className="rounded-xl bg-gradient-to-br from-green-50 to-green-100 p-6 hover:shadow-md transition-shadow border border-green-200">
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center text-white">
                    <FaCalendarAlt size={24} />
                  </div>
                </div>
                <h3 className="font-bold text-center text-gray-900 mb-2">Weekly Sadaqa</h3>
                <p className="text-sm text-gray-600 text-center mb-4">
                  Make a difference every week with consistent support.
                </p>
                <Link to="/sadaqah/periodic/weekly">
                  <button className="w-full py-2 bg-white text-green-600 hover:bg-green-600 hover:text-white border border-green-600 rounded-md transition-colors text-sm font-medium">
                    Subscribe Now
                  </button>
                </Link>
              </div>
              
              {/* Periodic Option 4 */}
              <div className="rounded-xl bg-gradient-to-br from-blue-50 to-blue-100 p-6 hover:shadow-md transition-shadow border border-blue-200">
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-white">
                    <FaCalendarAlt size={24} />
                  </div>
                </div>
                <h3 className="font-bold text-center text-gray-900 mb-2">Friday Sadaqah</h3>
                <p className="text-sm text-gray-600 text-center mb-4">
                  Special donations every Friday for enhanced blessings.
                </p>
                <Link to="/sadaqah/periodic/friday">
                  <button className="w-full py-2 bg-white text-blue-600 hover:bg-blue-600 hover:text-white border border-blue-600 rounded-md transition-colors text-sm font-medium">
                    Subscribe Now
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Donation Fields Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Donation Fields</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Choose a project you wish to fund. Your support can transform lives in various ways.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Field 1 */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 hover:shadow-md transition-shadow flex flex-col">
              <div className="h-56 bg-cover bg-center" style={{backgroundImage: `url('https://images.unsplash.com/photo-1479142506502-19b3a3b7ff33?auto=format&fit=crop&w=800&q=80')`}}></div>
              <div className="p-6 flex-grow">
                <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center text-primary-600 mb-4">
                  <FaMosque size={20} />
                </div>
                <h3 className="font-bold text-gray-900 text-xl mb-3">Mosques</h3>
                <p className="text-gray-600 mb-4">
                  Support the construction and maintenance of mosques around the world.
                </p>
              </div>
              <div className="p-6 pt-0">
                <Link to="/projects/mosques" className="inline-flex items-center text-primary-600 hover:text-primary-700 font-medium">
                  View Projects <FaChevronRight className="ml-1" />
                </Link>
              </div>
            </div>
            
            {/* Field 2 */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 hover:shadow-md transition-shadow flex flex-col">
              <div className="h-56 bg-cover bg-center" style={{backgroundImage: `url('https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=800&q=80')`}}></div>
              <div className="p-6 flex-grow">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mb-4">
                  <FaWater size={20} />
                </div>
                <h3 className="font-bold text-gray-900 text-xl mb-3">Water</h3>
                <p className="text-gray-600 mb-4">
                  Provide clean water access through wells, distribution networks, and purification systems.
                </p>
              </div>
              <div className="p-6 pt-0">
                <Link to="/projects/water" className="inline-flex items-center text-primary-600 hover:text-primary-700 font-medium">
                  View Projects <FaChevronRight className="ml-1" />
                </Link>
              </div>
            </div>
            
            {/* Field 3 */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 hover:shadow-md transition-shadow flex flex-col">
              <div className="h-56 bg-cover bg-center" style={{backgroundImage: `url('https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=800&q=80')`}}></div>
              <div className="p-6 flex-grow">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center text-red-600 mb-4">
                  <FaHeartbeat size={20} />
                </div>
                <h3 className="font-bold text-gray-900 text-xl mb-3">Health</h3>
                <p className="text-gray-600 mb-4">
                  Support medical clinics, equipment, medications, and healthcare professionals.
                </p>
              </div>
              <div className="p-6 pt-0">
                <Link to="/projects/health" className="inline-flex items-center text-primary-600 hover:text-primary-700 font-medium">
                  View Projects <FaChevronRight className="ml-1" />
                </Link>
              </div>
            </div>
            
            {/* Field 4 */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 hover:shadow-md transition-shadow flex flex-col">
              <div className="h-56 bg-cover bg-center" style={{backgroundImage: `url('https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=800&q=80')`}}></div>
              <div className="p-6 flex-grow">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 mb-4">
                  <FaGraduationCap size={20} />
                </div>
                <h3 className="font-bold text-gray-900 text-xl mb-3">Education</h3>
                <p className="text-gray-600 mb-4">
                  Fund schools, learning materials, scholarships, and educational programs.
                </p>
              </div>
              <div className="p-6 pt-0">
                <Link to="/projects/education" className="inline-flex items-center text-primary-600 hover:text-primary-700 font-medium">
                  View Projects <FaChevronRight className="ml-1" />
                </Link>
              </div>
            </div>
            
            {/* Field 5 */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 hover:shadow-md transition-shadow flex flex-col">
              <div className="h-56 bg-cover bg-center" style={{backgroundImage: `url('https://images.unsplash.com/photo-1531206715517-5c0ba140b2b8?auto=format&fit=crop&w=800&q=80')`}}></div>
              <div className="p-6 flex-grow">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-green-600 mb-4">
                  <FaMoneyBill size={20} />
                </div>
                <h3 className="font-bold text-gray-900 text-xl mb-3">Income Generation</h3>
                <p className="text-gray-600 mb-4">
                  Help establish businesses, provide training, and create sustainable livelihoods.
                </p>
              </div>
              <div className="p-6 pt-0">
                <Link to="/projects/income" className="inline-flex items-center text-primary-600 hover:text-primary-700 font-medium">
                  View Projects <FaChevronRight className="ml-1" />
                </Link>
              </div>
            </div>
            
            {/* Field 6 */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 hover:shadow-md transition-shadow flex flex-col">
              <div className="h-56 bg-cover bg-center" style={{backgroundImage: `url('https://images.unsplash.com/photo-1469571486292-b53601021a68?auto=format&fit=crop&w=800&q=80')`}}></div>
              <div className="p-6 flex-grow">
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center text-orange-600 mb-4">
                  <FaHandsHelping size={20} />
                </div>
                <h3 className="font-bold text-gray-900 text-xl mb-3">Relief</h3>
                <p className="text-gray-600 mb-4">
                  Provide emergency assistance to those affected by conflicts and natural disasters.
                </p>
              </div>
              <div className="p-6 pt-0">
                <Link to="/projects/relief" className="inline-flex items-center text-primary-600 hover:text-primary-700 font-medium">
                  View Projects <FaChevronRight className="ml-1" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Community Initiatives Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Community Initiatives</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Learn more about our social innovation projects that make a lasting impact.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Initiative 1 */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 flex flex-col md:flex-row hover:shadow-lg transition-shadow">
              <div className="md:w-2/5 bg-cover bg-center h-64 md:h-auto" style={{backgroundImage: `url('https://images.unsplash.com/photo-1513885535751-8b9238bd345a?auto=format&fit=crop&w=800&q=80')`}}></div>
              <div className="md:w-3/5 p-6">
                <div className="flex items-center space-x-2 mb-4">
                  <FaGift className="text-primary-600" />
                  <h3 className="font-bold text-gray-900 text-xl">Gift</h3>
                </div>
                <h4 className="text-primary-600 font-medium mb-3">Give Happiness, Spread Love</h4>
                <p className="text-gray-600 mb-4">
                  Extend the joy of giving with meaningful gifts that impact lives. Whether it's for a wedding, graduation, or birthday, your gift can help a widow, educate a child, or provide water to a village.
                </p>
                <Link to="/initiatives/gift" className="inline-flex items-center text-primary-600 hover:text-primary-700 font-medium">
                  Learn More <FaChevronRight className="ml-1" />
                </Link>
              </div>
            </div>
            
            {/* Initiative 2 */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 flex flex-col md:flex-row hover:shadow-lg transition-shadow">
              <div className="md:w-2/5 bg-cover bg-center h-64 md:h-auto" style={{backgroundImage: `url('https://images.unsplash.com/photo-1469571486292-b53601021a68?auto=format&fit=crop&w=800&q=80')`}}></div>
              <div className="md:w-3/5 p-6">
                <div className="flex items-center space-x-2 mb-4">
                  <FaRegHeart className="text-primary-600" />
                  <h3 className="font-bold text-gray-900 text-xl">Thawab</h3>
                </div>
                <h4 className="text-primary-600 font-medium mb-3">Donate on Behalf of Loved Ones</h4>
                <p className="text-gray-600 mb-4">
                  Choose a charity project and donate its value as a reward for someone you love, whether in memory of someone who has passed away or in honor of someone living.
                </p>
                <Link to="/initiatives/thawab" className="inline-flex items-center text-primary-600 hover:text-primary-700 font-medium">
                  Learn More <FaChevronRight className="ml-1" />
                </Link>
              </div>
            </div>
            
            {/* Initiative 3 */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 flex flex-col md:flex-row hover:shadow-lg transition-shadow">
              <div className="md:w-2/5 bg-cover bg-center h-64 md:h-auto" style={{backgroundImage: `url('https://images.unsplash.com/photo-1542810634-71277d95dcbb?auto=format&fit=crop&w=800&q=80')`}}></div>
              <div className="md:w-3/5 p-6">
                <div className="flex items-center space-x-2 mb-4">
                  <FaChild className="text-primary-600" />
                  <h3 className="font-bold text-gray-900 text-xl">Omniaty</h3>
                </div>
                <h4 className="text-primary-600 font-medium mb-3">Make an Orphan's Wish Come True</h4>
                <p className="text-gray-600 mb-4">
                  Every child has dreams. Help orphaned children achieve their wishes by contributing to their education, health, or recreational needs.
                </p>
                <Link to="/initiatives/omniaty" className="inline-flex items-center text-primary-600 hover:text-primary-700 font-medium">
                  Learn More <FaChevronRight className="ml-1" />
                </Link>
              </div>
            </div>
            
            {/* Initiative 4 */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 flex flex-col md:flex-row hover:shadow-lg transition-shadow">
              <div className="md:w-2/5 bg-cover bg-center h-64 md:h-auto" style={{backgroundImage: `url('https://images.unsplash.com/photo-1559027615-cd4628902d4a?auto=format&fit=crop&w=800&q=80')`}}></div>
              <div className="md:w-3/5 p-6">
                <div className="flex items-center space-x-2 mb-4">
                  <FaHandHoldingHeart className="text-primary-600" />
                  <h3 className="font-bold text-gray-900 text-xl">Charity Meter</h3>
                </div>
                <h4 className="text-primary-600 font-medium mb-3">Track Your Impact</h4>
                <p className="text-gray-600 mb-4">
                  See the real difference your donations make. Our charity meter provides transparent tracking of how your contributions help those in need.
                </p>
                <Link to="/initiatives/charity-meter" className="inline-flex items-center text-primary-600 hover:text-primary-700 font-medium">
                  Learn More <FaChevronRight className="ml-1" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Why Donate With Us Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Donate With Us</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                We're committed to transparency, efficiency, and maximum impact with every donation.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Reason 1 */}
              <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center text-primary-600 mb-6 mx-auto">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="font-bold text-xl text-center text-gray-900 mb-3">Trust & Transparency</h3>
                <p className="text-gray-600 text-center">
                  We maintain rigorous transparency with detailed financial reports and project updates. 95% of your donation goes directly to beneficiaries.
                </p>
              </div>
              
              {/* Reason 2 */}
              <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center text-primary-600 mb-6 mx-auto">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="font-bold text-xl text-center text-gray-900 mb-3">Global Reach, Local Impact</h3>
                <p className="text-gray-600 text-center">
                  With operations in over 40 countries, we collaborate with local partners to ensure culturally sensitive and sustainable solutions.
                </p>
              </div>
              
              {/* Reason 3 */}
              <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center text-primary-600 mb-6 mx-auto">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="font-bold text-xl text-center text-gray-900 mb-3">Sustainable Development</h3>
                <p className="text-gray-600 text-center">
                  We focus on long-term solutions that empower communities to become self-sufficient, breaking the cycle of poverty.
                </p>
              </div>
            </div>
            
            <div className="mt-12 bg-white p-8 rounded-xl shadow-md border border-gray-100">
              <div className="flex flex-col md:flex-row items-center justify-between">
                <div className="md:w-2/3 mb-6 md:mb-0 md:pr-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">Our Promise To You</h3>
                  <p className="text-gray-600 mb-4">
                    When you donate with Ansar, you're not just giving money – you're creating lasting change. We promise to be good stewards of your generosity, maximizing impact and maintaining the highest ethical standards.
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <div className="flex items-center">
                      <FaCheckCircle className="text-green-500 mr-2" />
                      <span className="text-sm text-gray-700">Secure Transactions</span>
                    </div>
                    <div className="flex items-center">
                      <FaCheckCircle className="text-green-500 mr-2" />
                      <span className="text-sm text-gray-700">Detailed Reporting</span>
                    </div>
                    <div className="flex items-center">
                      <FaCheckCircle className="text-green-500 mr-2" />
                      <span className="text-sm text-gray-700">Tax Deductible</span>
                    </div>
                    <div className="flex items-center">
                      <FaCheckCircle className="text-green-500 mr-2" />
                      <span className="text-sm text-gray-700">Field Verification</span>
                    </div>
                  </div>
                </div>
                <div className="md:w-1/3">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => document.getElementById('donation-form').scrollIntoView({ behavior: 'smooth' })}
                    className="w-full bg-primary-600 hover:bg-primary-700 text-white font-medium px-6 py-4 rounded-lg shadow-md transition-colors flex items-center justify-center"
                  >
                    <FaHandHoldingHeart className="mr-2" /> Make Your Donation Now
                  </motion.button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DonatePage; 