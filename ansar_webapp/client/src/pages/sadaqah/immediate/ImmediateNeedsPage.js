import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaHandHoldingHeart, FaHeart, FaUser, FaGraduationCap, FaHome, FaUtensils } from 'react-icons/fa';

const ImmediateNeedsPage = () => {
  const [navbarHeight, setNavbarHeight] = useState(60);
  const [activeCategory, setActiveCategory] = useState('all');
  
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
    document.title = "Immediate Needs | Ansar Organization";
    
    // Scroll to top on page load
    window.scrollTo(0, 0);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const categories = [
    {
      id: 'debtors',
      title: 'Debtors',
      description: 'Help those burdened by debt and financial difficulties',
      icon: FaHandHoldingHeart,
      cases: [
        {
          id: 1,
          title: 'Family Debt Relief',
          description: 'Help a family clear their accumulated medical and living expenses debt',
          amount: 5000,
          raised: 3200,
          donors: 45,
          daysLeft: 15
        },
        {
          id: 2,
          title: 'Business Recovery',
          description: 'Support a small business owner recover from financial losses',
          amount: 3000,
          raised: 1800,
          donors: 32,
          daysLeft: 20
        }
      ]
    },
    {
      id: 'widows',
      title: 'Widows',
      description: 'Support widows and their families with essential needs',
      icon: FaHeart,
      cases: [
        {
          id: 3,
          title: 'Widow Support Program',
          description: 'Monthly support for widows and their children',
          amount: 2000,
          raised: 1500,
          donors: 28,
          daysLeft: 10
        }
      ]
    },
    {
      id: 'sick',
      title: 'Sick',
      description: 'Help those in need of medical treatment and care',
      icon: FaUser,
      cases: [
        {
          id: 4,
          title: 'Medical Treatment Fund',
          description: 'Support for critical medical procedures and treatments',
          amount: 8000,
          raised: 4500,
          donors: 65,
          daysLeft: 25
        }
      ]
    },
    {
      id: 'students',
      title: 'Students',
      description: 'Support students in need of educational assistance',
      icon: FaGraduationCap,
      cases: [
        {
          id: 5,
          title: 'Student Support Fund',
          description: 'Help students continue their education',
          amount: 1500,
          raised: 900,
          donors: 22,
          daysLeft: 30
        }
      ]
    }
  ];

  const allCases = categories.flatMap(category => category.cases);

  return (
    <div className="immediate-needs-page">
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
        <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{backgroundImage: `url('https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')`}}>
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
                Support <span className="text-primary-300">Immediate Needs</span>
              </h1>
              
              <p className="text-xl text-white/90 mb-8 leading-relaxed">
                Your Sadaqah can provide immediate relief to those facing urgent challenges. Every contribution makes a direct impact on someone's life.
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

      {/* Categories Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Select a Category</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Choose a category to see specific cases that need your immediate support.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {categories.map((category) => (
              <motion.button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`p-6 rounded-xl text-left transition-all duration-300 ${
                  activeCategory === category.id 
                    ? 'bg-primary-600 text-white shadow-lg' 
                    : 'bg-white text-gray-800 hover:bg-gray-50'
                }`}
                whileHover={{ y: -5 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className={`p-4 w-16 h-16 rounded-2xl mb-4 flex items-center justify-center ${
                  activeCategory === category.id ? 'bg-white/20' : 'bg-primary-100 text-primary-600'
                }`}>
                  <category.icon size={24} />
                </div>
                <h3 className="text-xl font-bold mb-2">{category.title}</h3>
                <p className={`text-sm ${
                  activeCategory === category.id ? 'text-white/80' : 'text-gray-600'
                }`}>
                  {category.description}
                </p>
              </motion.button>
            ))}
          </div>

          {/* Cases Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {(activeCategory === 'all' ? allCases : categories.find(c => c.id === activeCategory)?.cases || []).map((caseItem) => (
              <motion.div
                key={caseItem.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
              >
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{caseItem.title}</h3>
                  <p className="text-gray-600 mb-4">{caseItem.description}</p>
                  
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm text-gray-600 mb-1">
                        <span>Raised</span>
                        <span>${caseItem.raised.toLocaleString()} / ${caseItem.amount.toLocaleString()}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-primary-600 h-2 rounded-full" 
                          style={{ width: `${(caseItem.raised / caseItem.amount) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                    
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>{caseItem.donors} donors</span>
                      <span>{caseItem.daysLeft} days left</span>
                    </div>
                    
                    <button className="w-full bg-primary-600 text-white py-2 rounded-lg font-medium hover:bg-primary-700 transition-colors">
                      Donate Now
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

export default ImmediateNeedsPage; 