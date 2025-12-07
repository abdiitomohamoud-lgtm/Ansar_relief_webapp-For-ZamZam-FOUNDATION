import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaSearch, FaFilter, FaHeart, FaArrowRight, FaHandHoldingHeart } from 'react-icons/fa';
import CampaignCard from '../../components/campaigns/CampaignCard';

const CampaignsPage = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [navbarHeight, setNavbarHeight] = useState(80);
  const [pageContent, setPageContent] = useState(null);

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
    
    // Fetch campaigns from API
    fetch('/api/campaigns')
      .then(res => res.json())
      .then(data => {
        setCampaigns(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));

    // Fetch static page content from API
    fetch('/api/campaigns-page-content')
      .then(res => res.json())
      .then(setPageContent);

    // Set document title
    document.title = "Our Campaigns | Ansar Organization";
    
    // Scroll to top on page load
    window.scrollTo(0, 0);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Use dynamic content if available, fallback to static
  const categories = pageContent?.filters?.categories || [
    'all',
    'Emergency Relief',
    'Water',
    'Orphans',
    'Seasonal',
    'Education',
    'Masjid',
    'Food'
  ];

  const filteredCampaigns = campaigns.filter(campaign => {
    const matchesSearch = campaign.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         campaign.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         campaign.location.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory === 'all' || campaign.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="campaigns-page">
      {/* Spacer to ensure content is below navbar */}
      <div className="h-[120px] md:h-[160px] lg:h-[200px]"></div>
      {/* Hero Section with increased top spacing */}
      <section 
        className="relative bg-gradient-to-r from-primary-800 to-primary-900 text-white py-[12rem] mt-[30px] pt-32" 
      >
        {/* Decorative elements */}
        <div className="absolute top-32 right-32 w-96 h-96 bg-primary-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-48 left-32 w-96 h-96 bg-indigo-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        {/* Pattern overlay */}
        <div className="absolute inset-0 pattern-islamic" style={{color: 'rgba(255,255,255,0.04)'}}></div>
        {/* Background image with overlay */}
        <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{backgroundImage: `url('${pageContent?.hero?.backgroundImage || '/images/campaigns/hero/campaign-hero.jpg'}')`}}>
          <div className="absolute inset-0 bg-gradient-to-r from-primary-900/95 to-primary-800/85"></div>
        </div>
        {/* Content */}
        <div className="container mx-auto px-4 md:px-6 relative z-10 pt-12">
          <div className="max-w-3xl pt-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="pt-16 md:pt-20"
            >
              <div className="inline-flex items-center gap-2 mb-5 mt-10 bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-full text-white text-sm font-medium">
                <span className="flex h-2 w-2 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary-300"></span>
                </span>
                {pageContent?.hero?.badge || 'Make a difference today'}
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-10 leading-tight mt-8">
                {pageContent?.hero?.headline || 'Our '}<span className="text-primary-300">Campaigns</span> & <span className="text-primary-300">Initiatives</span>
              </h1>
              <p className="text-xl text-white/90 mb-12 max-w-2xl">
                {pageContent?.hero?.subheading || 'Join us in making a lasting impact through our diverse range of campaigns and initiatives that transform lives and communities.'}
              </p>
              <div className="flex flex-wrap gap-4 pb-12">
                <Link 
                  to="/donate" 
                  className="btn-primary group flex items-center"
                >
                  {pageContent?.hero?.ctaDonate || 'Donate Now'}
                  <FaArrowRight className="ml-2 group-hover:ml-3 transition-all" />
                </Link>
                <Link 
                  to="/volunteer" 
                  className="btn-secondary group flex items-center"
                >
                  {pageContent?.hero?.ctaVolunteer || 'Volunteer'}
                  <FaArrowRight className="ml-2 group-hover:ml-3 transition-all" />
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Campaign Section */}
      <section id="campaigns" className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          {/* Campaign Stats */}
          <div className="mb-16 grid grid-cols-2 md:grid-cols-4 gap-6">
            {(pageContent?.stats || [
              { value: '35+', label: 'Countries Served' },
              { value: '120+', label: 'Active Projects' },
              { value: '10K+', label: 'Donors Worldwide' },
              { value: '$5M+', label: 'Funds Distributed' }
            ]).map((stat, idx) => (
              <motion.div 
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 * (idx + 1) }}
                className="bg-white rounded-xl shadow-md p-6 border border-gray-100"
              >
                <div className="text-3xl md:text-4xl font-bold text-primary-600 mb-2">{stat.value}</div>
                <div className="text-gray-600 text-sm">{stat.label}</div>
              </motion.div>
            ))}
          </div>

          {/* Filters and Search */}
          <div className="flex flex-col md:flex-row justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 md:mb-0">{pageContent?.filters?.heading || 'Find a Campaign'}</h2>
            <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
              <div className="relative w-full md:w-64">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaSearch className="text-gray-400" />
                </div>
                <input
                  type="text"
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                  placeholder={pageContent?.filters?.searchPlaceholder || 'Search campaigns'}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="relative w-full md:w-auto">
                <button className="flex items-center justify-center gap-2 w-full md:w-auto px-4 py-2 border border-gray-300 rounded-md bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                  <FaFilter className="text-gray-400" />
                  <span>{pageContent?.filters?.filterButton || 'Filter'}</span>
                </button>
              </div>
            </div>
          </div>
          {/* Category Pills */}
          <div className="flex overflow-x-auto pb-4 mb-8 max-w-full scrollbar-hide">
            <div className="flex space-x-2">
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                    selectedCategory === category
                      ? 'bg-primary-600 text-white shadow-md'
                      : 'bg-white text-gray-800 hover:bg-gray-100 border border-gray-200'
                  }`}
                >
                  {category === 'all' ? (pageContent?.filters?.allLabel || 'All Campaigns') : category}
                </button>
              ))}
            </div>
          </div>

          {/* Campaign Cards */}
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="flex flex-col items-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600 mb-4"></div>
                <p className="text-primary-600 font-medium">Loading campaigns...</p>
              </div>
            </div>
          ) : (
            <motion.div 
              variants={container}
              initial="hidden"
              animate="show"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filteredCampaigns.length > 0 ? (
                filteredCampaigns.map(campaign => (
                  <motion.div key={campaign.id || campaign._id} variants={item}>
                    <CampaignCard campaign={campaign} />
                  </motion.div>
                ))
              ) : (
                <div className="col-span-3 text-center py-16 bg-white rounded-xl shadow-sm border border-gray-100">
                  <div className="text-gray-500 mb-4">{pageContent?.noResults?.message || 'No campaigns found matching your criteria'}</div>
                  <button 
                    onClick={() => {
                      setSearchTerm('');
                      setSelectedCategory('all');
                    }}
                    className="text-primary-600 hover:text-primary-700 font-medium hover:underline"
                  >
                    {pageContent?.noResults?.clearFilters || 'Clear filters'}
                  </button>
                </div>
              )}
            </motion.div>
          )}
          
          {/* Call to Action */}
          <div className="mt-16 text-center">
            <div className="bg-white p-8 rounded-xl shadow-md border border-gray-100 max-w-3xl mx-auto">
              <h3 className="text-2xl font-bold mb-4">{pageContent?.ctaBottom?.heading || "Can't find what you're looking for?"}</h3>
              <p className="text-gray-600 mb-8">
                {pageContent?.ctaBottom?.subtext || 'We have many more initiatives and ways to help. Contact us to discuss how you can make an impact.'}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link 
                  to="/contact" 
                  className="px-6 py-3 bg-primary-100 text-primary-700 rounded-md font-medium hover:bg-primary-200 transition-colors"
                >
                  {pageContent?.ctaBottom?.contact || 'Contact Us'}
                </Link>
                <Link 
                  to="/initiatives" 
                  className="px-6 py-3 bg-primary-600 text-white rounded-md font-medium hover:bg-primary-700 transition-colors"
                >
                  {pageContent?.ctaBottom?.initiatives || 'View All Initiatives'}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CampaignsPage;