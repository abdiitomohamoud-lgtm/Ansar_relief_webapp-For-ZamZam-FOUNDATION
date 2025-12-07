import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { FaEdit, FaTrash, FaPlus, FaSearch, FaFilter, FaSort, FaEye, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import staticCampaigns from '../../data/campaigns';

const CampaignManagement = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [sortField, setSortField] = useState('createdAt');
  const [sortDirection, setSortDirection] = useState('desc');
  const [filterActive, setFilterActive] = useState('all');
  const [selectedCampaign, setSelectedCampaign] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const itemsPerPage = 10;

  useEffect(() => {
    fetchCampaigns();
  }, [currentPage, sortField, sortDirection, filterActive]);

  const fetchCampaigns = async () => {
    try {
      setLoading(true);
      
      const params = {
        page: currentPage,
        limit: itemsPerPage,
        sort: `${sortDirection === 'desc' ? '-' : ''}${sortField}`,
      };
      
      if (filterActive !== 'all') {
        params.isActive = filterActive === 'active';
      }
      
      if (searchTerm) {
        params.search = searchTerm;
      }
      
      const response = await axios.get('/api/admin/campaigns', { params });
      
      setCampaigns(response.data.data);
      setTotalPages(Math.ceil(response.data.total / itemsPerPage));
      setLoading(false);
    } catch (err) {
      console.error('Error fetching campaigns:', err);
      setError('Failed to load campaigns. Please try again.');
      setLoading(false);
      
      // Fallback to static data for demo purposes
      setCampaigns(staticCampaigns.slice(0, itemsPerPage));
      setTotalPages(Math.ceil(staticCampaigns.length / itemsPerPage));
      console.log('Using fallback static campaign data');
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setCurrentPage(1);
    fetchCampaigns();
  };

  const handleSort = (field) => {
    setSortDirection(sortField === field && sortDirection === 'asc' ? 'desc' : 'asc');
    setSortField(field);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/admin/campaigns/${id}`);
      setCampaigns(campaigns.filter(campaign => campaign.id !== id));
      setShowDeleteModal(false);
      setSelectedCampaign(null);
    } catch (err) {
      console.error('Error deleting campaign:', err);
      setError('Failed to delete campaign. Please try again.');
    }
  };

  const confirmDelete = (campaign) => {
    setSelectedCampaign(campaign);
    setShowDeleteModal(true);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleFilterChange = (filter) => {
    setFilterActive(filter);
    setCurrentPage(1);
  };

  const renderSortIcon = (field) => {
    if (sortField !== field) return <FaSort className="ml-1 text-gray-400" />;
    return sortDirection === 'asc' ? 
      <FaSort className="ml-1 text-primary-600" /> : 
      <FaSort className="ml-1 text-primary-600 transform rotate-180" />;
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Campaign Management</h1>
        <Link
          to="/admin/campaigns/new"
          className="bg-primary-600 hover:bg-primary-700 text-white py-2 px-4 rounded-md flex items-center"
        >
          <FaPlus className="mr-2" /> Add Campaign
        </Link>
      </div>

      {/* Search and Filter */}
      <div className="bg-white rounded-lg shadow-md p-4 mb-6">
        <div className="flex flex-col md:flex-row justify-between gap-4">
          <form onSubmit={handleSearch} className="flex-1">
            <div className="relative">
              <input
                type="text"
                placeholder="Search campaigns..."
                className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <FaSearch className="absolute left-3 top-3 text-gray-400" />
              <button
                type="submit"
                className="absolute right-2 top-2 bg-primary-600 text-white p-1 rounded-md"
              >
                Search
              </button>
            </div>
          </form>
          
          <div className="flex items-center gap-2">
            <span className="text-gray-600 flex items-center">
              <FaFilter className="mr-2" /> Filter:
            </span>
            <select
              value={filterActive}
              onChange={(e) => handleFilterChange(e.target.value)}
              className="border rounded-md px-2 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="all">All</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6" role="alert">
          <p>{error}</p>
        </div>
      )}

      {/* Campaigns Table */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort('title')}
                >
                  <div className="flex items-center">
                    Title {renderSortIcon('title')}
                  </div>
                </th>
                <th 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort('goal')}
                >
                  <div className="flex items-center">
                    Goal {renderSortIcon('goal')}
                  </div>
                </th>
                <th 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort('raised')}
                >
                  <div className="flex items-center">
                    Raised {renderSortIcon('raised')}
                  </div>
                </th>
                <th 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort('endDate')}
                >
                  <div className="flex items-center">
                    End Date {renderSortIcon('endDate')}
                  </div>
                </th>
                <th 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Status
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {loading ? (
                Array(5).fill(0).map((_, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4"></div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="h-4 bg-gray-200 rounded animate-pulse w-1/2"></div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="h-4 bg-gray-200 rounded animate-pulse w-1/2"></div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="h-4 bg-gray-200 rounded animate-pulse w-1/2"></div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="h-4 bg-gray-200 rounded animate-pulse w-1/3"></div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <div className="h-4 bg-gray-200 rounded animate-pulse w-full"></div>
                    </td>
                  </tr>
                ))
              ) : campaigns.length === 0 ? (
                <tr>
                  <td colSpan="6" className="px-6 py-4 text-center text-gray-500">
                    No campaigns found.
                  </td>
                </tr>
              ) : (
                campaigns.map((campaign) => (
                  <tr key={campaign.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-10 w-10 flex-shrink-0">
                          <img 
                            className="h-10 w-10 rounded-md object-cover" 
                            src={campaign.image || '/images/campaigns/default.jpg'} 
                            alt={campaign.title} 
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = '/images/campaigns/default.jpg';
                            }}
                          />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{campaign.title}</div>
                          <div className="text-sm text-gray-500">{campaign.slug}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">${campaign.goal.toLocaleString()}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">${campaign.raised.toLocaleString()}</div>
                      <div className="w-24 bg-gray-200 rounded-full h-2.5">
                        <div 
                          className="bg-primary-600 h-2.5 rounded-full" 
                          style={{ width: `${Math.min(100, (campaign.raised / campaign.goal) * 100)}%` }}
                        ></div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {campaign.endDate ? new Date(campaign.endDate).toLocaleDateString() : 'No end date'}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        campaign.isActive 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {campaign.isActive ? 'Active' : 'Inactive'}
                      </span>
                      {campaign.isUrgent && (
                        <span className="ml-2 px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                          Urgent
                        </span>
                      )}
                      {campaign.isFeatured && (
                        <span className="ml-2 px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                          Featured
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <Link 
                        to={`/campaigns/${campaign.slug}`} 
                        className="text-indigo-600 hover:text-indigo-900 mr-3"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <FaEye />
                      </Link>
                      <Link 
                        to={`/admin/campaigns/edit/${campaign.id}`} 
                        className="text-blue-600 hover:text-blue-900 mr-3"
                      >
                        <FaEdit />
                      </Link>
                      <button
                        onClick={() => confirmDelete(campaign)}
                        className="text-red-600 hover:text-red-900"
                      >
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
            <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-gray-700">
                  Showing <span className="font-medium">{(currentPage - 1) * itemsPerPage + 1}</span> to{' '}
                  <span className="font-medium">
                    {Math.min(currentPage * itemsPerPage, campaigns.length)}
                  </span>{' '}
                  of <span className="font-medium">{campaigns.length}</span> results
                </p>
              </div>
              <div>
                <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className={`relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium ${
                      currentPage === 1 
                        ? 'text-gray-300 cursor-not-allowed' 
                        : 'text-gray-500 hover:bg-gray-50'
                    }`}
                  >
                    <span className="sr-only">Previous</span>
                    <FaChevronLeft className="h-5 w-5" aria-hidden="true" />
                  </button>
                  
                  {[...Array(totalPages)].map((_, i) => (
                    <button
                      key={i}
                      onClick={() => handlePageChange(i + 1)}
                      className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                        currentPage === i + 1
                          ? 'z-10 bg-primary-50 border-primary-500 text-primary-600'
                          : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                      }`}
                    >
                      {i + 1}
                    </button>
                  ))}
                  
                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className={`relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium ${
                      currentPage === totalPages 
                        ? 'text-gray-300 cursor-not-allowed' 
                        : 'text-gray-500 hover:bg-gray-50'
                    }`}
                  >
                    <span className="sr-only">Next</span>
                    <FaChevronRight className="h-5 w-5" aria-hidden="true" />
                  </button>
                </nav>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && selectedCampaign && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>

            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                    <FaTrash className="h-5 w-5 text-red-600" aria-hidden="true" />
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">Delete Campaign</h3>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        Are you sure you want to delete the campaign "{selectedCampaign.title}"? This action cannot be undone.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={() => handleDelete(selectedCampaign.id)}
                >
                  Delete
                </button>
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={() => setShowDeleteModal(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CampaignManagement;