import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaHandHoldingHeart, FaCalendarAlt, FaClock, FaSun, FaMoon } from 'react-icons/fa';

const PeriodicDonationsPage = () => {
  const [navbarHeight, setNavbarHeight] = useState(60);
  const [activeFrequency, setActiveFrequency] = useState('monthly');
  
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
    document.title = "Periodic Donations | Ansar Organization";
    
    // Scroll to top on page load
    window.scrollTo(0, 0);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const frequencies = [
    { id: 'daily', title: 'Daily', icon: FaSun, description: 'Make a difference every day' },
    { id: 'weekly', title: 'Weekly', icon: FaCalendarAlt, description: 'Weekly support for ongoing projects' },
    { id: 'monthly', title: 'Monthly', icon: FaMoon, description: 'Regular monthly contributions' },
    { id: 'yearly', title: 'Yearly', icon: FaClock, description: 'Annual commitment to long-term impact' }
  ];

  const donationOptions = [
    {
      id: 1,
      title: 'Orphan Support',
      description: 'Monthly support for orphaned children',
      image: 'https://images.unsplash.com/photo-1516589178581-6cd7df1e035b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      amounts: [50, 100, 200, 500],
      impact: 'Supports education, healthcare, and daily needs'
    },
    {
      id: 2,
      title: 'Water Wells',
      description: 'Clean water access for communities',
      image: 'https://images.unsplash.com/photo-1551731409-43eb3e517a1a?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      amounts: [100, 250, 500, 1000],
      impact: 'Provides sustainable water sources'
    },
    {
      id: 3,
      title: 'Food Security',
      description: 'Regular food distribution programs',
      image: 'https://images.unsplash.com/photo-1516979187457-637abb4f9353?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      amounts: [75, 150, 300, 750],
      impact: 'Ensures consistent access to nutritious meals'
    }
  ];

  return (
    <div className="periodic-donations-page">
      {/* Hero Section */}
      <section 
        className="relative bg-primary-900 overflow-hidden" 
        style={{ 
          marginTop: `${navbarHeight}px`,
          paddingTop: "6rem",
          paddingBottom: "6rem"
        }}
      >
        {/* Background image with overlay */}
        <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{backgroundImage: `url('https://images.unsplash.com/photo-1519817650390-64a93db51149?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')`}}>
          <div className="absolute inset-0 bg-gradient-to-r from-primary-900/95 to-primary-800/80"></div>
        </div>
        
        {/* Content */}
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                <span className="text-primary-300">Periodic</span> Donations
              </h1>
              
              <p className="text-xl text-white/90 mb-8 leading-relaxed">
                Make a lasting impact through regular contributions. Choose a frequency that works for you and support ongoing projects.
              </p>
              
              <div className="flex flex-wrap gap-4">
                <Link 
                  to="/sadaqah" 
                  className="px-6 py-3 bg-white text-primary-700 rounded-lg font-medium hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center"
                >
                  <FaHandHoldingHeart className="mr-2" />
                  Back to Sadaqah
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Frequency Selection */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Choose Your Frequency</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Select how often you'd like to make your contribution
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {frequencies.map((frequency) => (
              <motion.button
                key={frequency.id}
                onClick={() => setActiveFrequency(frequency.id)}
                className={`p-6 rounded-xl text-left transition-all duration-300 ${
                  activeFrequency === frequency.id 
                    ? 'bg-primary-600 text-white shadow-lg' 
                    : 'bg-white text-gray-800 hover:bg-gray-50'
                }`}
                whileHover={{ y: -5 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className={`p-4 w-16 h-16 rounded-2xl mb-4 flex items-center justify-center ${
                  activeFrequency === frequency.id ? 'bg-white/20' : 'bg-primary-100 text-primary-600'
                }`}>
                  <frequency.icon size={24} />
                </div>
                <h3 className="text-xl font-bold mb-2">{frequency.title}</h3>
                <p className={`text-sm ${
                  activeFrequency === frequency.id ? 'text-white/80' : 'text-gray-600'
                }`}>
                  {frequency.description}
                </p>
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Donation Options */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {donationOptions.map((option) => (
              <motion.div
                key={option.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
              >
                <div className="h-48 bg-cover bg-center" style={{backgroundImage: `url('${option.image}')`}}></div>
                
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{option.title}</h3>
                  <p className="text-gray-600 mb-4">{option.description}</p>
                  
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-sm font-medium text-gray-700 mb-2">Suggested Amounts</h4>
                      <div className="flex flex-wrap gap-2">
                        {option.amounts.map((amount) => (
                          <button
                            key={amount}
                            className="px-4 py-2 bg-primary-100 text-primary-700 rounded-lg font-medium hover:bg-primary-200 transition-colors"
                          >
                            ${amount}
                          </button>
                        ))}
                      </div>
                    </div>
                    
                    <div className="text-sm text-gray-600">
                      <span className="font-medium">Impact:</span> {option.impact}
                    </div>
                    
                    <button className="w-full bg-primary-600 text-white py-2 rounded-lg font-medium hover:bg-primary-700 transition-colors">
                      Set Up {activeFrequency.charAt(0).toUpperCase() + activeFrequency.slice(1)} Donation
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default PeriodicDonationsPage; 