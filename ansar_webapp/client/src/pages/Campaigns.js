import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import LoadingSpinner from '../components/common/LoadingSpinner';
import campaignsData from '../data/campaigns';

const Campaigns = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const campaigns = campaignsData;
  const [filters, setFilters] = useState({
    category: 'all',
    sortBy: 'recent'
  });
  
  const calculateProgress = (raised, goal) => {
    return Math.min((raised / goal) * 100, 100);
  };

  const filteredCampaigns = campaigns?.filter(campaign => {
    if (filters.category === 'all') return true;
    return campaign.category.slug === filters.category;
  }) || [];

  const sortedCampaigns = [...filteredCampaigns].sort((a, b) => {
    if (filters.sortBy === 'recent') {
      return new Date(b.startDate) - new Date(a.startDate);
    } else if (filters.sortBy === 'popular') {
      return b.raised - a.raised;
    } else if (filters.sortBy === 'ending-soon') {
      if (!a.endDate && !b.endDate) return 0;
      if (!a.endDate) return 1;
      if (!b.endDate) return -1;
      return new Date(a.endDate) - new Date(b.endDate);
    } else if (filters.sortBy === 'progress') {
      const progressA = calculateProgress(a.raised, a.goal);
      const progressB = calculateProgress(b.raised, b.goal);
      return progressB - progressA;
    }
    return 0;
  });

  // Categories based on mock data
  const categories = [
    { id: 'all', name: 'All Campaigns' },
    { id: 'emergency', name: 'Emergency Relief' },
    { id: 'water', name: 'Water & Sanitation' },
    { id: 'education', name: 'Education' },
    { id: 'orphans', name: 'Orphan Support' },
    { id: 'family', name: 'Family Support' }
  ];

  // Sort options
  const sortOptions = [
    { id: 'recent', name: 'Most Recent' },
    { id: 'popular', name: 'Most Popular' },
    { id: 'ending-soon', name: 'Ending Soon' },
    { id: 'progress', name: 'Progress' }
  ];

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Since we're using mock data, we don't need loading or error states
  // But we'll keep the structure in case we want to add real API calls later

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section with margin-top */}
      <div style={{ marginTop: '110px' }} className="relative bg-primary-700 py-20 mb-6 box-content">
        <div className="absolute inset-0 pattern2 opacity-10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl font-extrabold text-white sm:text-4xl lg:text-5xl">
            Current Campaigns
          </h1>
          <p className="mt-4 text-xl text-primary-100 max-w-3xl mx-auto">
            Support humanitarian causes around the world. Your donation brings hope and relief to those in need.
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white shadow rounded-lg p-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0">
            <div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <select
                  id="category"
                  name="category"
                  value={filters.category}
                  onChange={handleFilterChange}
                  className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md"
                >
                  {categories.map(category => (
                    <option key={category.id} value={category.id}>{category.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="sortBy" className="block text-sm font-medium text-gray-700 mb-1">Sort By</label>
                <select
                  id="sortBy"
                  name="sortBy"
                  value={filters.sortBy}
                  onChange={handleFilterChange}
                  className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md"
                >
                  {sortOptions.map(option => (
                    <option key={option.id} value={option.id}>{option.name}</option>
                  ))}
                </select>
              </div>
            </div>
            <p className="text-sm text-gray-500">
              Showing <span className="font-semibold">{sortedCampaigns.length}</span> campaigns
            </p>
          </div>
        </div>
      </div>

      {/* Campaigns Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {sortedCampaigns.length === 0 ? (
          <div className="text-center py-12">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="mt-2 text-lg font-medium text-gray-900">No campaigns found</h3>
            <p className="mt-1 text-sm text-gray-500">Try changing your filters or check back later for new campaigns.</p>
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
            {sortedCampaigns.map((campaign) => (
              <div key={campaign.id} className="bg-white overflow-hidden shadow rounded-lg animate-fade-in hover-scale">
                <div className="h-48 w-full relative">
                  <img
                    className="h-full w-full object-cover"
                    src={campaign.image || 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80'}
                    alt={campaign.title}
                  />
                  {campaign.isUrgent && (
                    <div className="absolute top-2 left-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded">
                      Urgent
                    </div>
                  )}
                </div>
                <div className="px-4 py-5 sm:p-6">
                  <h3 className="text-lg font-medium text-gray-900 line-clamp-2">
                    {campaign.title}
                  </h3>
                  <p className="mt-3 text-sm text-gray-500 line-clamp-3">
                    {campaign.description}
                  </p>
                  
                  <div className="mt-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-primary-600 font-medium">
                        ${campaign.raised || 0} raised
                      </span>
                      <span className="text-gray-500">
                        ${campaign.goal || 0} goal
                      </span>
                    </div>
                    <div className="mt-2 relative pt-1">
                      <div className="overflow-hidden h-2 text-xs flex rounded bg-primary-100">
                        <div 
                          style={{ width: `${calculateProgress(campaign.raised, campaign.goal)}%` }} 
                          className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-primary-600"
                        ></div>
                      </div>
                    </div>
                    <div className="mt-4 flex justify-between text-sm text-gray-500">
                      <div>{Math.floor(campaign.raised / 100) || 0} donors</div>
                      <div>
                        {campaign.endDate 
                          ? Math.ceil((new Date(campaign.endDate) - new Date()) / (1000 * 60 * 60 * 24))
                          : 'Ongoing'}
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-5">
                    <Link
                      to={`/campaigns/${campaign.id}`}
                      className="block w-full px-4 py-2 border border-transparent text-center text-base font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                    >
                      Donate Now
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* CTA Section */}
      <div className="bg-primary-700 mt-12">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
          <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            <span className="block">Ready to make a difference?</span>
            <span className="block text-primary-200">Start your own fundraising campaign.</span>
          </h2>
          <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
            <div className="inline-flex rounded-md shadow">
              <a
                href="#"
                className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-primary-600 bg-white hover:bg-primary-50"
              >
                Start a Campaign
              </a>
            </div>
            <div className="ml-3 inline-flex rounded-md shadow">
              <a
                href="#"
                className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary-800 hover:bg-primary-900"
              >
                Learn More
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Campaigns; 