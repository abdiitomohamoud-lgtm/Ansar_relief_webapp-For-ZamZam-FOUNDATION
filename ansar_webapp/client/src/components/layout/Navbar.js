import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaBars, 
  FaTimes,
  FaSearch,
  FaShoppingCart,
  FaChevronDown,
  FaCalculator,
  FaUserAlt,
  FaGlobeAsia,
  FaPhoneAlt,
  FaHeart,
  FaRegHeart,
  FaCalendarAlt,
  FaHandsHelping
} from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { useQuery } from '@tanstack/react-query';
import { fetchUserCart } from '../../api/user';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [currency, setCurrency] = useState('USD');
  const [language, setLanguage] = useState('EN');
  const location = useLocation();
  const user = useSelector((state) => state.auth.user);
  const { data: cart } = useQuery({
    queryKey: ['userCart'],
    queryFn: fetchUserCart
  });
  const cartItems = Array.isArray(cart?.cartItems) ? cart.cartItems : [];
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  const mainNavLinks = [
    { 
      name: 'Home', 
      path: '/',
      exact: true
    },
    { 
      name: 'About', 
      path: '/about',
      exact: true
    },
    { 
      name: 'Initiatives', 
      path: '/initiatives',
      exact: true
    },
    { 
      name: 'Campaigns', 
      path: '/campaigns',
      exact: true
    },
    { 
      name: 'Events', 
      path: '/events',
      exact: true
    },
    { 
      name: 'Sadaqah', 
      path: '/sadaqah',
      exact: true
    },
    { 
      name: 'Sponsorship', 
      path: '/sponsorship', 
      exact: false,
      submenu: [
        { name: 'Orphan', path: '/sponsorship/orphan' },
        { name: 'Student', path: '/sponsorship/student' },
        { name: 'Family', path: '/sponsorship/family' },
        { name: 'Teacher', path: '/sponsorship/teacher' },
        { name: 'Special Needs', path: '/sponsorship/special-needs' },
      ]
    },
    { 
      name: 'Projects', 
      path: '/projects',
      exact: false,
      submenu: [
        { name: 'Mosques', path: '/projects/categories/mosques' },
        { name: 'Housing', path: '/projects/categories/housing' },
        { name: 'Water', path: '/projects/categories/water' },
        { name: 'Health', path: '/projects/categories/health' },
        { name: 'Education', path: '/projects/categories/education' },
        { name: 'Income', path: '/projects/categories/income' },
        { name: 'Relief', path: '/projects/categories/relief' },
      ]
    },
  ];

  const currencyOptions = [
    { value: 'USD', label: 'USD' },
    { value: 'EUR', label: 'EUR' },
    { value: 'QAR', label: 'QAR' },
    { value: 'GBP', label: 'GBP' },
  ];

  const languageOptions = [
    { value: 'EN', label: 'EN' },
    { value: 'AR', label: 'AR' },
  ];

  // Handle navigation
  const handleNavigation = (e, path) => {
    e.preventDefault();
    navigate(path);
    window.scrollTo(0, 0); // Scroll to top on navigation
  };

  // Add user-dependent rendering
  const renderAuthButtons = () => {
    if (user) {
      return (
        <Link
          to="/user/profile"
          className="group flex items-center gap-1.5 text-gray-600 hover:text-primary-600 transition-all duration-200 px-2 py-0.5 rounded-md hover:bg-gray-50 text-[10px]"
        >
          <div className="w-4 h-4 bg-gradient-to-br from-primary-100 to-primary-200 text-primary-600 rounded-full flex items-center justify-center text-[8px] group-hover:from-primary-200 group-hover:to-primary-300 transition-all duration-200">
            <FaUserAlt />
          </div>
          <span className="font-medium">{user.name || 'My Profile'}</span>
        </Link>
      );
    }
    return (
      <Link
        to="/login"
        className="group flex items-center gap-1.5 text-gray-600 hover:text-primary-600 transition-all duration-200 px-2 py-0.5 rounded-md hover:bg-gray-50 text-[10px]"
      >
        <div className="w-4 h-4 bg-gradient-to-br from-primary-100 to-primary-200 text-primary-600 rounded-full flex items-center justify-center text-[8px] group-hover:from-primary-200 group-hover:to-primary-300 transition-all duration-200">
          <FaUserAlt />
        </div>
        <span className="font-medium">Login</span>
      </Link>
    );
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md shadow-sm transition-all duration-300">
        {/* Top Bar */}
      <div className="bg-gradient-to-r from-gray-50 via-gray-100 to-gray-50 text-gray-600 border-b border-gray-200/80 py-0.5 text-[10px]">
        <div className="container mx-auto px-3">
          <div className="flex justify-between items-center">
            <div className="hidden sm:flex items-center divide-x divide-gray-300">
              <Link to="/contact" className="hover:text-primary-600 transition-colors duration-200 flex items-center pr-2 group">
                <span className="bg-primary-50 text-primary-600 p-0.5 rounded-full group-hover:bg-primary-100 transition-colors duration-200 mr-1">
                  <FaPhoneAlt className="text-[8px]" />
                </span>
                <span>Contact Us</span>
              </Link>
              <Link to="/volunteer" className="hover:text-primary-600 transition-colors duration-200 flex items-center px-2 group">
                <span className="bg-primary-50 text-primary-600 p-0.5 rounded-full group-hover:bg-primary-100 transition-colors duration-200 mr-1">
                  <FaHandsHelping className="text-[8px]" />
                </span>
                <span>Volunteer</span>
              </Link>
              {renderAuthButtons()}
            </div>
            
            <Link to="/sadaqah/zakat-calculator" className="sm:hidden hover:text-primary-600 transition-colors duration-200 flex items-center group">
              <span className="bg-primary-50 text-primary-600 p-0.5 rounded-full group-hover:bg-primary-100 transition-colors duration-200 mr-1">
                <FaCalculator className="text-[8px]" />
              </span>
              <span>Zakat</span>
            </Link>
            
            <div className="flex items-center space-x-3">
              <Link to="/sadaqah/zakat-calculator" className="hidden sm:flex hover:text-primary-600 transition-colors duration-200 items-center group">
                <span className="bg-primary-50 text-primary-600 p-0.5 rounded-full group-hover:bg-primary-100 transition-colors duration-200 mr-1">
                  <FaCalculator className="text-[8px]" />
                </span>
                <span>Zakat Calculator</span>
              </Link>
              
              <div className="relative group">
                <button className="flex items-center hover:text-primary-600 transition-colors duration-200 py-0.5 px-1.5 rounded-md group-hover:bg-gray-50">
                  <FaGlobeAsia className="mr-1 text-[8px] text-primary-600" />
                  <span>{language}</span>
                  <FaChevronDown className="ml-0.5 text-[7px] group-hover:rotate-180 transition-transform duration-300" />
                </button>
                <div className="absolute right-0 mt-1 w-20 bg-white shadow-lg rounded-md overflow-hidden z-50 invisible group-hover:visible border border-gray-100 transform origin-top scale-95 group-hover:scale-100 opacity-0 group-hover:opacity-100 transition-all duration-200">
                  {languageOptions.map(option => (
                <button 
                      key={option.value}
                      className="block w-full text-left px-2.5 py-1.5 text-[10px] text-gray-700 hover:bg-primary-50 hover:text-primary-600 transition-colors duration-200"
                      onClick={() => setLanguage(option.value)}
                    >
                      {option.label}
                </button>
                  ))}
                </div>
              </div>
              
              <div className="relative group">
                <button className="flex items-center hover:text-primary-600 transition-colors duration-200 py-0.5 px-1.5 rounded-md group-hover:bg-gray-50">
                  <span>{currency}</span>
                  <FaChevronDown className="ml-0.5 text-[7px] group-hover:rotate-180 transition-transform duration-300" />
                </button>
                <div className="absolute right-0 mt-1 w-20 bg-white shadow-lg rounded-md overflow-hidden z-50 invisible group-hover:visible border border-gray-100 transform origin-top scale-95 group-hover:scale-100 opacity-0 group-hover:opacity-100 transition-all duration-200">
                  {currencyOptions.map(option => (
                    <button
                      key={option.value}
                      className="block w-full text-left px-2.5 py-1.5 text-[10px] text-gray-700 hover:bg-primary-50 hover:text-primary-600 transition-colors duration-200"
                      onClick={() => setCurrency(option.value)}
                    >
                      {option.label}
                    </button>
                  ))}
                  </div>
              </div>
              </div>
            </div>
          </div>
        </div>

      {/* Main Navbar */}
      <div 
        className={`bg-gradient-to-b from-white to-gray-50/70 border-b border-gray-100 transition-all duration-300 ${isScrolled ? 'py-2.5 shadow-md' : 'py-3'}`}
      >
        <div className="container mx-auto px-3">
          <div className="flex items-center justify-between">
              {/* Logo */}
            <Link to="/" className="flex items-center group relative">
              <div className="mr-1.5 w-7 h-7 bg-gradient-to-br from-primary-500 to-primary-700 rounded-full flex items-center justify-center text-white font-bold text-[11px] group-hover:from-primary-600 group-hover:to-primary-800 transition-all duration-200 shadow-sm group-hover:shadow">
                <span className="relative z-10">A</span>
                <motion.div 
                  className="absolute inset-0 bg-primary-500/20 rounded-full z-0"
                  initial={{ scale: 0 }}
                  whileHover={{ scale: 1.6, opacity: 0.6 }}
                  transition={{ duration: 0.5 }}
                />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-xl text-primary-600 tracking-wider group-hover:text-primary-700 transition-colors duration-200">ANSAR</span>
                <span className="text-[10px] text-gray-500 tracking-widest -mt-1">HUMANITARIAN RELIEF</span>
                </div>
              </Link>

              {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center">
              <nav className="flex items-center bg-gray-50/80 rounded-full px-2 py-1 shadow-inner">
                {mainNavLinks.map((link) => (
                  <div key={link.path} className="relative group mx-0.5">
                    <motion.div whileHover={{ y: -1 }} whileTap={{ y: 0 }}>
                    <Link
                      to={link.path}
                        className={`px-3.5 py-2 text-xs font-medium rounded-full transition-all duration-200 flex items-center ${
                        location.pathname === link.path 
                            ? 'text-white bg-gradient-to-r from-primary-500 to-primary-600 shadow-sm ring-2 ring-primary-200 ring-opacity-50' 
                            : 'text-gray-600 hover:bg-white hover:shadow-sm'
                      }`}
                    >
                      {link.name}
                      {link.submenu && (
                        <FaChevronDown className="ml-1 text-[8px] group-hover:rotate-180 transition-transform duration-300" />
                      )}
                    </Link>
                    </motion.div>
                    
                    {link.submenu && (
                      <div className="absolute left-0 mt-1.5 w-48 bg-white/95 backdrop-blur-sm shadow-xl rounded-lg overflow-hidden z-50 invisible group-hover:visible opacity-0 group-hover:opacity-100 transform -translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                        <div className="py-1.5">
                          {link.submenu.map((subitem, idx) => (
                            <motion.div key={subitem.path} whileHover={{ x: 2 }} transition={{ duration: 0.2 }}>
                            <Link
                              to={subitem.path}
                                className="block px-3 py-2 text-xs text-gray-600 hover:bg-primary-50 hover:text-primary-600 transition-colors duration-200"
                            >
                              {subitem.name}
                            </Link>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </nav>
              </div>

            {/* Right Side Actions */}
            <div className="flex items-center space-x-3">
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsSearchOpen(true)}
                className="text-gray-500 hover:text-primary-600 transition-colors duration-200 bg-gray-100 hover:bg-gray-200 p-2 rounded-full"
                aria-label="Search"
              >
                <FaSearch size={13} />
              </motion.button>
              
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                to="/cart" 
                  className="text-gray-500 hover:text-primary-600 transition-colors duration-200 bg-gray-100 hover:bg-gray-200 p-2 rounded-full relative block"
                aria-label="Cart"
              >
                  <FaShoppingCart size={13} />
                {cartItems.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-gradient-to-r from-primary-500 to-primary-600 text-white text-[8px] rounded-full h-4 w-4 flex items-center justify-center border border-white">
                    {cartItems.length}
                  </span>
                )}
                </Link>
              </motion.div>
              
              {/* Desktop Donate Button */}
              <motion.div 
                className="relative"
                whileHover={{ scale: 1.03 }} 
                whileTap={{ scale: 0.97 }}
              >
                <Link 
                  to="/donate"
                  className="bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-xs px-4 py-1.5 rounded-full shadow-sm hover:shadow flex items-center text-white font-medium transition-all duration-200 relative z-10"
                >
                  <FaHeart className="mr-1.5 text-[10px]" />
                  Donate
                </Link>
                <motion.div 
                  className="absolute inset-0 bg-primary-400 rounded-full z-0"
                  animate={{ 
                    scale: [1, 1.1, 1],
                    opacity: [0.7, 0, 0.7]
                  }}
                  transition={{ 
                    duration: 2,
                    repeat: Infinity,
                    repeatType: "loop"
                  }}
                />
              </motion.div>
              
              {/* Mobile Menu Button */}
              <div className="lg:hidden">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className="p-2 text-gray-500 hover:text-primary-600 transition-colors duration-200 bg-gray-100 hover:bg-gray-200 rounded-full"
                  aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
                >
                  {isMobileMenuOpen ? <FaTimes size={15} /> : <FaBars size={15} />}
                </motion.button>
              </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
            initial={{ opacity: 0, height: 0, y: -10 }}
            animate={{ opacity: 1, height: 'auto', y: 0 }}
            exit={{ opacity: 0, height: 0, y: -10 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="lg:hidden bg-white/95 backdrop-blur-sm shadow-xl overflow-auto max-h-[70vh] border-b border-gray-200 rounded-b-xl mx-3 mt-1"
          >
            <div className="container mx-auto px-3 py-2">
              <div className="space-y-0.5">
                {mainNavLinks.map((link, index) => (
                  <motion.div 
                    key={link.path} 
                    className="border-b border-gray-100 last:border-0 py-1.5"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05, duration: 0.2 }}
                  >
                    <Link
                      to={link.path}
                      onClick={(e) => handleNavigation(e, link.path)}
                      className={`block text-[11px] font-medium p-1.5 rounded-md ${
                        link.submenu ? 'flex items-center' : ''
                      } ${
                        (link.exact 
                          ? location.pathname === link.path 
                          : location.pathname.startsWith(link.path))
                        ? 'bg-primary-100 text-primary-700 font-semibold'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-primary-600'
                      }`}
                    >
                      {link.name}
                    </Link>
                    
                    {link.submenu && (
                      <div className="pl-2 mt-1 border-l-2 border-primary-100 ml-1.5">
                        <div className="grid grid-cols-2 gap-x-1 gap-y-0.5">
                          {link.submenu.map((subitem, subIndex) => (
                            <motion.div
                              key={subitem.path}
                              initial={{ opacity: 0, x: -5 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: (index * 0.05) + ((subIndex + 1) * 0.03), duration: 0.2 }}
                            >
                              <Link
                              to={subitem.path}
                                className="block py-1 px-1.5 text-[9px] text-gray-500 hover:text-primary-600 hover:bg-primary-50 rounded-md transition-colors duration-200"
                            >
                              {subitem.name}
                          </Link>
                            </motion.div>
                        ))}
                          </div>
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
              
              <motion.div 
                className="flex flex-col gap-2 pt-2 mt-2 border-t border-gray-100"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: mainNavLinks.length * 0.05 + 0.1, duration: 0.2 }}
              >
                <div className="w-full">
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full"
                  >
                {renderAuthButtons()}
                  </motion.div>
                </div>
                
                {/* Mobile Donate Button */}
                <div className="relative w-full">
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Link
                  to="/donate"
                      className="w-full bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-xs py-2 rounded-md shadow-sm hover:shadow flex items-center justify-center text-white font-medium transition-all duration-200 relative z-10"
                >
                      <FaHeart className="mr-1.5 text-[10px]" />
                  Donate Now
                </Link>
                  </motion.div>
                  <motion.div 
                    className="absolute inset-0 bg-primary-400 rounded-md z-0"
                    animate={{ 
                      scale: [1, 1.05, 1],
                      opacity: [0.5, 0, 0.5]
                    }}
                    transition={{ 
                      duration: 2,
                      repeat: Infinity,
                      repeatType: "loop"
                    }}
                  />
              </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Search Overlay */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-start justify-center pt-20 px-3 z-50"
            onClick={() => setIsSearchOpen(false)}
          >
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.3, type: "spring", stiffness: 300, damping: 25 }}
              className="w-full max-w-xl bg-white/95 backdrop-blur-sm rounded-xl shadow-2xl overflow-hidden border border-gray-100"
              onClick={e => e.stopPropagation()}
            >
              <div className="relative">
                <div className="flex items-center border-b border-gray-100">
                  <FaSearch className="absolute left-4 text-primary-500" size={14} />
                  <form onSubmit={(e) => {
                    e.preventDefault();
                    if (searchQuery.trim()) {
                      setIsSearchOpen(false);
                      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
                    }
                  }} className="w-full flex">
                  <input
                    type="text"
                      placeholder="Search campaigns, projects, initiatives..."
                      className="w-full pl-10 pr-32 py-4 outline-none text-sm bg-white/90 text-gray-700 placeholder-gray-400 transition-all duration-200 focus:bg-white"
                    autoFocus
                      value={searchQuery}
                      onChange={e => setSearchQuery(e.target.value)}
                      onKeyDown={e => {
                        if (e.key === 'Enter' && e.target.value.trim()) {
                          e.preventDefault();
                          setIsSearchOpen(false);
                          navigate(`/search?q=${encodeURIComponent(e.target.value.trim())}`);
                        }
                      }}
                    />
                    <div className="absolute right-10 top-1/2 transform -translate-y-1/2">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        type="submit"
                        className="bg-gradient-to-r from-primary-500 to-primary-600 text-white px-4 py-1.5 rounded-md text-xs font-medium hover:from-primary-600 hover:to-primary-700 transition-all duration-200 shadow-sm flex items-center gap-1.5"
                        disabled={!searchQuery.trim()}
                      >
                        <FaSearch className="text-[9px]" />
                        <span>Search</span>
                      </motion.button>
                    </div>
                  </form>
                  <motion.button
                    whileHover={{ scale: 1.1, rotate: 90 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setIsSearchOpen(false)}
                    className="absolute right-3 p-1.5 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100 transition-colors"
                    aria-label="Close search"
                  >
                    <FaTimes size={14} />
                  </motion.button>
                </div>
                
                <div className="p-4 text-xs">
                  <div className="mb-4">
                    <h3 className="font-semibold text-gray-700 mb-2 flex items-center gap-1.5 text-xs">
                      <div className="bg-primary-50 text-primary-500 p-0.5 rounded-md">
                        <FaSearch className="text-[9px]" />
                      </div>
                      Popular Searches
                    </h3>
                    <div className="flex flex-wrap gap-1.5">
                      {['Water Projects', 'Orphan Sponsorship', 'Medical Aid', 'Education', 'Food Aid', 'Emergency Relief'].map((term, index) => (
                        <motion.button
                          key={index}
                          whileHover={{ scale: 1.03, y: -1 }}
                          whileTap={{ scale: 0.97 }}
                          className="bg-gray-100 hover:bg-primary-50 text-gray-700 hover:text-primary-600 px-2.5 py-1 rounded-md text-[10px] transition-all duration-200 flex items-center gap-1 shadow-sm hover:shadow"
                          onClick={() => {
                            setIsSearchOpen(false);
                            navigate(`/search?q=${encodeURIComponent(term)}`);
                          }}
                        >
                          <span>{term}</span>
                        </motion.button>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-gray-700 mb-2 flex items-center gap-1.5 text-xs">
                      <motion.div
                        animate={{ rotate: [0, 360] }}
                        transition={{ duration: 2, ease: "linear", repeat: Infinity }}
                        className="bg-primary-50 text-primary-500 p-0.5 rounded-md"
                      >
                        <FaSearch className="text-[9px]" />
                      </motion.div>
                      Quick Filters
                    </h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {[
                        { name: 'Campaigns', color: 'bg-blue-50 text-blue-600 border-blue-100' },
                        { name: 'Projects', color: 'bg-green-50 text-green-600 border-green-100' },
                        { name: 'Sponsorships', color: 'bg-purple-50 text-purple-600 border-purple-100' },
                        { name: 'Sadaqah', color: 'bg-amber-50 text-amber-600 border-amber-100' },
                        { name: 'Water', color: 'bg-cyan-50 text-cyan-600 border-cyan-100' },
                        { name: 'Orphans', color: 'bg-pink-50 text-pink-600 border-pink-100' },
                      ].map((category, index) => (
                        <motion.button
                          key={index}
                          whileHover={{ scale: 1.02, y: -1 }}
                          whileTap={{ scale: 0.98 }}
                          className={`${category.color} px-2 py-2 rounded-md text-[10px] transition-all duration-200 flex justify-center items-center border shadow-sm hover:shadow font-medium`}
                          onClick={() => {
                            setIsSearchOpen(false);
                            navigate(`/search?q=${encodeURIComponent(category.name)}`);
                          }}
                        >
                          {category.name}
                        </motion.button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
  );
};

export default Navbar; 