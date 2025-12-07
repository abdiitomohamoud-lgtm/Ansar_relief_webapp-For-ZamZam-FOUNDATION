import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  FaArrowRight, FaFilter, FaSearch, FaRegClock, 
  FaHeart, FaHandHoldingHeart, FaSchool, FaHome, 
  FaWater, FaUtensils, FaMosque, FaHands
} from 'react-icons/fa';
import config from '../../utils/config';
import { DecorativeDivider } from '../../components/common';
import CampaignCard from '../../components/campaigns/CampaignCard';

const iconMap = {
  FaHandHoldingHeart: <FaHandHoldingHeart />,
  FaHeart: <FaHeart />,
  FaWater: <FaWater />,
  FaSchool: <FaSchool />,
  FaUtensils: <FaUtensils />,
  FaHome: <FaHome />,
  FaMosque: <FaMosque />,
  FaHands: <FaHands />
};

const CampaignPage = () => {
  const [content, setContent] = useState(null);
  const [categories, setCategories] = useState([]);
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const [filter, setFilter] = useState('newest');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    setLoading(true);
    Promise.all([
      fetch('/api/campaign-page/content').then(res => res.json()),
      fetch('/api/campaign-page/categories').then(res => res.json()),
      fetch('/api/campaign-page/campaigns').then(res => res.json())
    ]).then(([contentData, categoriesData, campaignsData]) => {
      setContent(contentData);
      setCategories(Array.isArray(categoriesData) ? categoriesData : []);
      setCampaigns(Array.isArray(campaignsData) ? campaignsData : []);
      setLoading(false);
    }).catch(err => {
      setLoading(false);
      console.error('Error fetching campaign page data:', err);
    });
  }, []);

  // Filtering, searching, sorting, and pagination logic
  const filteredCampaigns = Array.isArray(campaigns) ? campaigns.filter(campaign => {
    const matchesCategory = activeCategory === 'all' || campaign.category === activeCategory;
    const matchesSearch = campaign.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      campaign.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  }) : [];

  let sortedCampaigns = [...filteredCampaigns];
  if (filter === 'newest') {
    sortedCampaigns.sort((a, b) => a.id > b.id ? -1 : 1);
  } else if (filter === 'mostFunded') {
    sortedCampaigns.sort((a, b) => b.raised - a.raised);
  } else if (filter === 'endingSoon') {
    sortedCampaigns.sort((a, b) => a.daysLeft - b.daysLeft);
  } else if (filter === 'urgent') {
    sortedCampaigns.sort((a, b) => b.isUrgent - a.isUrgent);
  }

  const ITEMS_PER_PAGE = 6;
  const maxPage = Math.ceil(sortedCampaigns.length / ITEMS_PER_PAGE);
  const paginatedCampaigns = sortedCampaigns.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  useEffect(() => {
    setTotalPages(maxPage);
  }, [maxPage]);

  const handleCategoryChange = (categoryId) => {
    setActiveCategory(categoryId);
    setPage(1);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    // Try to match search input to a category name
    const matchedCategory = categories.find(cat => cat.name.toLowerCase() === searchInput.trim().toLowerCase());
    if (matchedCategory) {
      setActiveCategory(matchedCategory.id);
    }
    setSearchQuery(searchInput);
    setPage(1);
  };

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
    setPage(1);
  };

  useEffect(() => {
    // Debug: log searchQuery and campaigns on every render
    // eslint-disable-next-line no-console
    console.log('searchQuery:', searchQuery, 'campaigns:', Array.isArray(campaigns) ? campaigns.length : campaigns);
  }, [searchQuery, campaigns]);

  // On initial mount, sync searchInput with searchQuery
  useEffect(() => {
    setSearchInput(searchQuery);
  }, []);

  if (loading || !content || !content.hero) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12 mb-4 border-t-primary-600 animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Page Header with Background */}
      <div className="relative bg-gradient-to-r from-primary-800 to-primary-900 text-white">
        <div className="absolute inset-0 pattern-islamic pattern-white pattern-opacity-5"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary-700 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary-700 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
        {/* Added extra padding top here */}
        <div className="container mx-auto px-4 py-28 md:py-32 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">{content?.hero?.headline || 'Campaigns & Projects'}</h1>
            <p className="text-xl text-white/80 mb-8">{content?.hero?.subheading || ''}</p>
            {/* Search Bar */}
            <form onSubmit={handleSearchSubmit} className="flex items-center max-w-xl mx-auto bg-white/10 backdrop-blur-sm rounded-full overflow-hidden p-1 border border-white/20">
              <input
                type="text"
                placeholder="Search campaigns..."
                value={searchInput}
                onChange={(e) => {
                  setSearchInput(e.target.value);
                  // eslint-disable-next-line no-console
                  console.log('Input changed:', e.target.value);
                }}
                className="flex-1 bg-transparent py-3 px-5 text-white placeholder-white/50 focus:outline-none"
              />
              <button type="submit" className="bg-white text-primary-700 rounded-full p-3 hover:bg-primary-50 transition-colors">
                <FaSearch size={18} />
              </button>
            </form>
          </div>
        </div>
        {/* Wave Divider */}
        <div className="absolute bottom-0 left-0 right-0 h-16 overflow-hidden">
          <svg className="absolute bottom-0 fill-gray-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"></path>
          </svg>
        </div>
      </div>
      {/* Category Navigation */}
      <div className="py-8 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center md:justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 md:mb-0">Browse Categories</h2>
            <div className="flex items-center">
              <FaFilter className="text-gray-500 mr-2" />
              <select 
                value={filter}
                onChange={handleFilterChange}
                className="bg-white border border-gray-200 rounded-lg py-2 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 text-gray-700"
              >
                <option value="newest">Newest</option>
                <option value="mostFunded">Most Funded</option>
                <option value="endingSoon">Ending Soon</option>
                <option value="urgent">Urgent Needs</option>
              </select>
            </div>
          </div>
          <div className="flex flex-wrap justify-center gap-3 pb-4 overflow-x-auto no-scrollbar">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => handleCategoryChange(category.id)}
                className={`flex items-center px-5 py-3 rounded-full transition-all duration-300 ${
                  activeCategory === category.id
                    ? 'bg-primary-600 text-white shadow-md'
                    : 'bg-white text-gray-700 hover:bg-gray-100 shadow-sm'
                }`}
              >
                <span className="mr-2">{iconMap[category.icon]}</span>
                <span className="font-medium">{category.name}</span>
                {category.count && category.id !== 'all' && (
                  <span className={`ml-2 px-2 py-0.5 rounded-full text-xs ${
                    activeCategory === category.id ? 'bg-white/20' : 'bg-gray-200'
                  }`}>
                    {category.count}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>
      {/* Featured Campaigns */}
      {activeCategory === 'all' && page === 1 && (
        <section className="py-10 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold text-gray-800 mb-8">Featured Campaigns</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {campaigns.slice(0, 3).map((campaign, index) => (
                <CampaignCard key={campaign.id} campaign={campaign} />
              ))}
            </div>
          </div>
        </section>
      )}
      <DecorativeDivider color="primary" pattern="floral" />
      {/* All Campaigns */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-between items-center mb-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-1">
                {activeCategory === 'all' ? 'All Campaigns' : `${categories.find(c => c.id === activeCategory)?.name}`}
              </h2>
              <p className="text-gray-600">
                {searchQuery ? `Search results for "${searchQuery}"` : 'Showing'} {paginatedCampaigns.length} of {sortedCampaigns.length} campaigns
              </p>
            </div>
          </div>
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12 mb-4 border-t-primary-600 animate-spin"></div>
            </div>
          ) : paginatedCampaigns.length === 0 ? (
            <div className="text-center py-16 bg-gray-50 rounded-xl border border-gray-100">
              <div className="text-5xl mb-4">😕</div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">No campaigns found</h3>
              <p className="text-gray-600 mb-6">
                {searchQuery 
                  ? `No results matching "${searchQuery}"`
                  : 'There are no campaigns in this category yet'}
              </p>
              <button 
                onClick={() => {
                  setActiveCategory('all');
                  setSearchQuery('');
                }} 
                className="bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 transition-colors"
              >
                View All Campaigns
              </button>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {paginatedCampaigns.map((campaign, index) => (
                  <CampaignCard key={campaign.id} campaign={campaign} />
                ))}
              </div>
              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center mt-10">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => setPage(Math.max(1, page - 1))}
                      disabled={page === 1}
                      className={`px-4 py-2 rounded-lg ${
                        page === 1
                          ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                          : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      Previous
                    </button>
                    {[...Array(totalPages)].map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setPage(i + 1)}
                        className={`w-10 h-10 rounded-lg ${
                          page === i + 1
                            ? 'bg-primary-600 text-white'
                            : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        {i + 1}
                      </button>
                    ))}
                    <button
                      onClick={() => setPage(Math.min(totalPages, page + 1))}
                      disabled={page === totalPages}
                      className={`px-4 py-2 rounded-lg ${
                        page === totalPages
                          ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                          : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      Next
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </section>
      {/* Start Your Own Campaign CTA */}
      <section className="py-16 bg-gradient-to-r from-primary-900 to-primary-800 text-white relative overflow-hidden">
        <div className="absolute inset-0 pattern-islamic pattern-white pattern-opacity-5"></div>
        <div className="absolute top-0 left-0 w-96 h-96 bg-primary-700 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary-700 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-extrabold leading-tight mb-4">
              Ready to Make a Difference?
            </h2>
            <p className="text-lg text-white/90 mb-8">
              Start your own campaign and join our community of changemakers.
            </p>
            <Link to="/create-campaign">
              <button className="bg-white text-primary-900 px-8 py-3 rounded-full shadow-md hover:bg-gray-100 transition-colors">
                Start Your Campaign
              </button>
            </Link>
          </div>
          {/* Decorative Elements */}
          <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
            <div className="w-32 h-32 bg-primary-700 rounded-full opacity-30 animate-pulse" style={{ top: '-8rem', left: '-8rem' }}></div>
            <div className="w-32 h-32 bg-secondary-700 rounded-full opacity-30 animate-pulse" style={{ bottom: '-8rem', right: '-8rem' }}></div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CampaignPage;