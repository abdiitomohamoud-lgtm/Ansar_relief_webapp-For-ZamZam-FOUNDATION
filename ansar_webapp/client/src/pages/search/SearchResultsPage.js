import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { 
  FaSearch, 
  FaFilter, 
  FaChevronDown, 
  FaChevronRight, 
  FaTimesCircle,
  FaDonate,
  FaGraduationCap,
  FaHospital,
  FaHome,
  FaWater,
  FaHandHoldingUsd,
  FaHandsHelping,
  FaHandHoldingHeart,
  FaCrosshairs,
  FaStar,
  FaTimes,
  FaBookOpen,
  FaHeartbeat,
  FaBreadSlice,
  FaMosque,
  FaSeedling
} from 'react-icons/fa';

// Animation variants for staggered children
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { 
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

const SearchResultsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [navbarHeight, setNavbarHeight] = useState(60);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  const [noResults, setNoResults] = useState(false);
  const [hoverIndex, setHoverIndex] = useState(null);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'

  useEffect(() => {
    // Get search query from URL
    const params = new URLSearchParams(location.search);
    const query = params.get('q') || '';
    setSearchQuery(query);

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
    document.title = `Search Results: ${query} | Ansar Organization`;
    
    // Scroll to top on page load
    window.scrollTo(0, 0);
    
    // Fetch search results
    if (query) {
      setIsLoading(true);
      fetchSearchResults(query);
    } else {
      setSearchResults([]);
      setIsLoading(false);
    }
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [location.search]);

  const fetchSearchResults = (searchQuery) => {
    // Simulating API call with timeout
    setTimeout(() => {
      // Mock search results
      const mockResults = [
        {
          id: 1,
          title: 'Clean Water Project in Africa',
          type: 'project',
          category: 'water',
          description: 'Providing clean water to communities across Africa through well construction and water purification systems.',
          image: '/images/projects/water-project.jpg',
          relevance: 98,
        },
        {
          id: 2,
          title: 'Education for Orphans',
          type: 'campaign',
          category: 'education',
          description: 'Supporting education initiatives for orphaned children to provide them with a brighter future.',
          image: '/images/campaigns/education-orphans.jpg',
          relevance: 95,
        },
        {
          id: 3,
          title: 'Emergency Medical Relief',
          type: 'project',
          category: 'health',
          description: 'Delivering essential medical supplies and healthcare services to disaster-affected areas.',
          image: '/images/projects/medical-relief.jpg',
          relevance: 92,
        },
        {
          id: 4,
          title: 'Shelter for the Homeless',
          type: 'campaign',
          category: 'shelter',
          description: 'Building homes for displaced families in conflict zones and disaster-stricken regions.',
          image: '/images/campaigns/shelter-homeless.jpg',
          relevance: 89,
        },
        {
          id: 5,
          title: 'Ramadan Food Packages',
          type: 'campaign',
          category: 'food',
          description: 'Providing nutritious food packages to families in need during the holy month of Ramadan.',
          image: '/images/campaigns/ramadan-food.jpg',
          relevance: 87,
        },
        {
          id: 6,
          title: 'Orphan Sponsorship Program',
          type: 'program',
          category: 'sponsorship',
          description: 'Support the basic needs and education of orphaned children through our sponsorship program.',
          image: '/images/programs/orphan-sponsorship.jpg',
          relevance: 85,
        },
        {
          id: 7,
          title: 'Islamic Education Centers',
          type: 'project',
          category: 'education',
          description: 'Establishing centers for Islamic education and Quran memorization in underserved communities.',
          image: '/images/projects/islamic-education.jpg',
          relevance: 82,
        },
        {
          id: 8,
          title: 'Sustainable Agriculture Initiative',
          type: 'project',
          category: 'food',
          description: 'Teaching sustainable farming techniques to communities to help them become self-sufficient.',
          image: '/images/projects/sustainable-agriculture.jpg',
          relevance: 80,
        },
        {
          id: 9,
          title: 'Winter Campaign for Refugees',
          type: 'campaign',
          category: 'shelter',
          description: 'Providing warm clothing, blankets, and heating supplies to refugees during harsh winter months.',
          image: '/images/campaigns/winter-campaign.jpg',
          relevance: 78,
        },
        {
          id: 10,
          title: 'Mosque Construction Project',
          type: 'project',
          category: 'religious',
          description: 'Building mosques in areas where Muslims lack proper places of worship.',
          image: '/images/projects/mosque-construction.jpg',
          relevance: 75,
        },
      ];

      // Filter results by search query (in a real app, this would be done server-side)
      const filteredResults = mockResults.filter(result => 
        result.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
        result.description.toLowerCase().includes(searchQuery.toLowerCase())
      );

      setSearchResults(filteredResults);
      setNoResults(filteredResults.length === 0);
      setIsLoading(false);
    }, 1000);
  };

  const handleFilterChange = (filter) => {
    setActiveFilter(filter);
  };

  const filterResults = () => {
    if (activeFilter === 'all') {
      return searchResults;
    }
    return searchResults.filter(result => 
      result.category === activeFilter || result.type === activeFilter
    );
  };

  const handleReSearch = (e) => {
    e.preventDefault();
    navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
  };

  const filteredResults = filterResults();

  // Categories and their icons for filtering
  const filterCategories = [
    { id: 'all', name: 'All Results', icon: <FaSearch /> },
    { id: 'water', name: 'Water Projects', icon: <FaWater /> },
    { id: 'education', name: 'Education', icon: <FaBookOpen /> },
    { id: 'health', name: 'Healthcare', icon: <FaHeartbeat /> },
    { id: 'shelter', name: 'Shelter', icon: <FaHome /> },
    { id: 'food', name: 'Food Aid', icon: <FaBreadSlice /> },
    { id: 'sponsorship', name: 'Sponsorship', icon: <FaHandHoldingHeart /> },
    { id: 'religious', name: 'Religious', icon: <FaMosque /> },
    { id: 'sustainable', name: 'Sustainable', icon: <FaSeedling /> },
  ];

  const getCategoryIcon = (category) => {
    const categoryItem = filterCategories.find(item => item.id === category);
    return categoryItem ? categoryItem.icon : <FaHandsHelping />;
  };

  // Add custom CSS for ping animation
  const pingAnimationStyle = {
    animation: 'ping 2s cubic-bezier(0, 0, 0.2, 1) infinite',
    animationDelay: '0.5s'
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="search-results-page bg-gradient-to-b from-gray-50 to-white min-h-screen" 
      style={{ paddingTop: `${navbarHeight + 20}px` }}
    >
      <style jsx="true">{`
        @keyframes ping {
          75%, 100% {
            transform: scale(1.5);
            opacity: 0;
          }
        }
        .animate-ping-slow {
          animation: ping 2s cubic-bezier(0, 0, 0.2, 1) infinite;
        }
        .result-card:hover .hover-reveal {
          opacity: 1;
          transform: translateY(0);
        }
        .result-card .hover-reveal {
          opacity: 0;
          transform: translateY(10px);
          transition: all 0.3s ease-in-out;
        }
        .search-highlight {
          background: linear-gradient(to right, rgba(37, 99, 235, 0.1), rgba(37, 99, 235, 0.05));
          border-left: 3px solid #2563eb;
          padding-left: 8px;
        }
      `}</style>

      <div className="container mx-auto px-4 py-8">
        <div className="search-header mb-12">
          <motion.div 
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="search-form mb-8"
          >
            <form onSubmit={handleReSearch} className="max-w-4xl mx-auto">
              <div className="relative flex items-center shadow-lg rounded-full overflow-hidden bg-white backdrop-blur-sm border border-gray-100">
                <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                  <FaSearch className="h-5 w-5 text-gray-500" />
                </div>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="block w-full pl-14 pr-32 py-4 border-none rounded-full bg-white/80 focus:outline-none focus:ring-2 focus:ring-primary-500 text-gray-700 placeholder-gray-400"
                  placeholder="Search for projects, campaigns, initiatives..."
                />
                <div className="absolute right-2">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    type="submit"
                    className="bg-primary-600 hover:bg-primary-700 text-white font-medium py-3 px-6 rounded-full transition duration-200 shadow-sm flex items-center gap-2"
                  >
                    <span>Search</span>
                    <FaSearch className="h-4 w-4" />
                  </motion.button>
                </div>
              </div>
            </form>
          </motion.div>

          <motion.div 
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="search-stats flex justify-between items-center flex-wrap gap-4 max-w-4xl mx-auto"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center text-primary-600">
                <FaSearch className="h-5 w-5" />
              </div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
                {isLoading ? (
                  <span className="text-gray-500">Searching...</span>
                ) : (
                  <span>
                    <span className="text-primary-600">{filteredResults.length}</span> result{filteredResults.length !== 1 ? 's' : ''} for "<span className="text-primary-600">{searchQuery}</span>"
                  </span>
                )}
              </h1>
            </div>
            
            <div className="flex items-center">
              <motion.button 
                onClick={() => setShowFilters(!showFilters)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 text-gray-600 hover:text-primary-600 transition-colors bg-white py-2 px-4 rounded-lg shadow-sm border border-gray-200"
              >
                <FaFilter className="h-4 w-4" />
                <span>Filter Results</span>
                <motion.div
                  animate={{ rotate: showFilters ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <FaChevronDown className="h-4 w-4" />
                </motion.div>
              </motion.button>
            </div>
          </motion.div>
          
          <AnimatePresence>
            {showFilters && (
              <motion.div 
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="filter-options mt-6 overflow-hidden max-w-4xl mx-auto"
              >
                <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
                  <h3 className="text-lg font-medium text-gray-700 mb-4 flex items-center gap-2">
                    <FaFilter className="text-primary-500" />
                    Filter by Category
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                    {filterCategories.map(filter => (
                      <motion.button
                        key={filter.id}
                        onClick={() => handleFilterChange(filter.id)}
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        className={`px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 flex flex-col items-center gap-2 ${
                          activeFilter === filter.id
                            ? 'bg-primary-600 text-white shadow-md'
                            : 'bg-gray-50 text-gray-700 hover:bg-gray-100 border border-gray-200'
                        }`}
                      >
                        <div className={`text-xl ${activeFilter === filter.id ? 'text-white' : 'text-primary-500'}`}>
                          {filter.icon}
                        </div>
                        <span>{filter.name}</span>
                      </motion.button>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {isLoading ? (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col justify-center items-center py-24"
          >
            <div className="relative">
              <div className="w-16 h-16 border-4 border-gray-200 border-t-primary-600 rounded-full animate-spin"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <FaSearch className="w-6 h-6 text-primary-600 animate-pulse" />
              </div>
            </div>
            <p className="mt-4 text-gray-600 font-medium">Searching for results...</p>
          </motion.div>
        ) : noResults ? (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-20 max-w-2xl mx-auto"
          >
            <div className="mb-8 relative">
              <div className="w-24 h-24 mx-auto bg-gray-100 rounded-full flex items-center justify-center">
                <FaSearch className="h-10 w-10 text-gray-400" />
              </div>
              <div className="absolute top-0 right-1/3 -mr-3 w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center animate-ping-slow">
                <FaTimesCircle className="h-4 w-4 text-red-500" />
              </div>
            </div>
            <h2 className="text-3xl font-bold text-gray-800 mb-3">No results found</h2>
            <p className="text-gray-600 max-w-md mx-auto mb-8 text-lg">
              We couldn't find any matches for "<span className="font-semibold text-primary-600">{searchQuery}</span>". Please try another search term or browse our categories.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link to="/donate" className="inline-block bg-primary-600 hover:bg-primary-700 text-white font-medium py-3 px-8 rounded-xl transition duration-200 shadow-md">
                  Browse All Projects
                </Link>
              </motion.div>
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSearchQuery('')}
                className="inline-block bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium py-3 px-8 rounded-xl transition duration-200"
              >
                Clear Search
              </motion.button>
            </div>
          </motion.div>
        ) : (
          <div>
            <div className="mb-10 overflow-auto pb-4">
              <div className="flex gap-3">
                {filterCategories.map(filter => (
                  <motion.button
                    key={filter.id}
                    onClick={() => handleFilterChange(filter.id)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`px-4 py-2 rounded-full text-sm whitespace-nowrap ${
                      activeFilter === filter.id
                        ? 'bg-primary-600 text-white shadow-md'
                        : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
                    } flex items-center gap-2`}
                  >
                    <span className={activeFilter === filter.id ? 'text-white' : 'text-primary-500'}>
                      {filter.icon}
                    </span>
                    <span>{filter.name}</span>
                  </motion.button>
                ))}
              </div>
            </div>
            
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="search-results grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filteredResults.map((result, index) => (
                <motion.div
                  key={result.id}
                  variants={itemVariants}
                  onMouseEnter={() => setHoverIndex(index)}
                  onMouseLeave={() => setHoverIndex(null)}
                  className="result-card bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 hover:translate-y-[-5px] border border-gray-100"
                >
                  <div className="relative h-48 overflow-hidden group">
                    <img 
                      src={result.image} 
                      alt={result.title} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="absolute top-0 left-0 m-3">
                      <span className="inline-flex items-center px-3 py-1.5 text-xs font-semibold bg-white text-primary-600 rounded-full shadow-sm">
                        {getCategoryIcon(result.category)}
                        <span className="ml-1.5 capitalize">{result.category}</span>
                      </span>
                    </div>
                    <div className="absolute bottom-0 right-0 m-3">
                      <span className="inline-block px-3 py-1 text-xs font-semibold bg-black/70 text-white rounded-full">
                        {result.type}
                      </span>
                    </div>
                    <div className="absolute bottom-0 left-0 p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                      <Link 
                        to={`/${result.type}s/${result.id}`}
                        className="text-white bg-primary-600 hover:bg-primary-700 py-2 px-4 rounded-lg inline-flex items-center gap-1.5 text-sm font-medium transition-colors shadow-md"
                      >
                        <span>View Details</span>
                        <FaChevronRight className="h-3 w-3" />
                      </Link>
                    </div>
                    {hoverIndex === index && (
                      <motion.div 
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="absolute top-2 right-2"
                      >
                        <div className="bg-white/90 backdrop-blur-sm p-1 rounded-full shadow-md">
                          <FaStar className="text-yellow-500 h-4 w-4" />
                        </div>
                      </motion.div>
                    )}
                  </div>
                  <div className="p-5">
                    <h3 className="text-lg font-bold text-gray-800 line-clamp-2 hover:text-primary-600 transition-colors duration-200 mb-2">{result.title}</h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2 search-highlight">{result.description}</p>
                    <div className="flex justify-between items-center mt-auto">
                      <div className="flex items-center gap-1">
                        <div className="w-2 h-2 rounded-full bg-green-500"></div>
                        <span className="text-xs text-gray-500">Active</span>
                      </div>
                      <div className="text-xs font-medium px-2 py-1 rounded-full bg-primary-50 text-primary-600">
                        Relevance: {Math.round(result.relevance * 100)}%
                      </div>
                    </div>
                    <div className="mt-4 pt-3 border-t border-gray-100 hover-reveal">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-1.5">
                          <FaCrosshairs className="text-primary-500 h-3 w-3" />
                          <span className="text-xs text-gray-600">Matched in: {result.type}</span>
                        </div>
                        <Link 
                          to={`/${result.type}s`}
                          className="text-primary-600 hover:text-primary-700 text-xs font-medium"
                        >
                          View similar
                        </Link>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
            
            {filteredResults.length > 0 && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="mt-12 text-center bg-white p-8 rounded-xl shadow-sm border border-gray-100"
              >
                <p className="text-gray-500 mb-6">Found {filteredResults.length} results matching your search</p>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link 
                    to="/projects"
                    className="inline-flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white font-medium py-2 px-6 rounded-lg transition-colors shadow-sm"
                  >
                    View all projects <FaChevronRight className="h-3 w-3" />
                  </Link>
                </motion.div>
              </motion.div>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default SearchResultsPage; 