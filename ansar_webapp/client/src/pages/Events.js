import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaCalendarAlt, 
  FaMapMarkerAlt, 
  FaClock, 
  FaUsers, 
  FaRegCheckCircle, 
  FaSignInAlt, 
  FaUserPlus,
  FaGlassMartiniAlt,
  FaHandHoldingHeart,
  FaMicrophone,
  FaInfoCircle,
  FaArrowRight,
  FaRegStar,
  FaRegPaperPlane,
  FaCalendarDay,
  FaCalendarTimes,
  FaQuoteLeft,
  FaCheck,
  FaChevronLeft,
  FaCheckCircle,
  FaTimes,
  FaHandsHelping,
  FaRegCalendarCheck,
  FaEnvelope
} from 'react-icons/fa';
import LoadingSpinner from '../components/common/LoadingSpinner';
import { useDispatch, useSelector } from 'react-redux';
import { addNotification } from '../store/slices/appSlice';

// Import mock data
import eventsPageData from '../data/eventsPageData.json';

const Events = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.auth);
  const [loading, setLoading] = useState(false); // No longer loading since we're using mock data
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [activeFilter, setActiveFilter] = useState('all');
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [registrationForm, setRegistrationForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    attendees: 1,
    comments: '',
  });
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const [pageContent, setPageContent] = useState(null);

  // Using mock data directly, no API calls needed
  useEffect(() => {
    // Set document title
    document.title = "Events - Ansar Relief";
    
    // Scroll to top
    window.scrollTo(0, 0);
    
    // Using mock data directly
    setLoading(true);
    try {
      // Simulate a small delay to show loading state
      setTimeout(() => {
        // Transform mock data to match expected format
        const mockEvents = eventsPageData.events.map((event, index) => ({
          ...event,
          id: event.id,
          title: event.title,
          date: event.date,
          time: event.time,
          location: event.location,
          description: event.description,
          category: event.category,
          registered: event.attendees,
          capacity: event.maxAttendees,
          image: event.image,
          featured: index < 2, // Mark first two as featured
          organizer: event.organizer
        }));        
        setEvents(mockEvents);
        setFilteredEvents(mockEvents);
        setPageContent(eventsPageData);
        setLoading(false);
      }, 500);
    } catch (error) {
      console.error('Error setting up mock events:', error);
      dispatch(addNotification({
        type: 'error',
        message: 'Failed to load events. Please try again later.',
      }));
      setLoading(false);
    }
  }, [dispatch]);
  // Handle filtering
  const handleFilterChange = (filter) => {
    setActiveFilter(filter);
    
    if (filter === 'all') {
      setFilteredEvents(events);
    } else if (filter === 'upcoming') {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      setFilteredEvents(events.filter(event => new Date(event.date) >= today));
    } else {
      setFilteredEvents(events.filter(event => event.category === filter));
    }
  };

  // Handle registration form change
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setRegistrationForm({
      ...registrationForm,
      [name]: value,
    });
  };

  // Pre-populate form with user data when available
  useEffect(() => {
    if (user && selectedEvent) {
      setRegistrationForm({
        ...registrationForm,
        fullName: user.name || '',
        email: user.email || '',
      });
    }
  }, [user, selectedEvent]);

  // Open registration modal
  const openRegisterModal = (event) => {
    setSelectedEvent(event);
    setShowRegisterModal(true);
    
    // Pre-fill form with user data if available
    if (user) {
      setRegistrationForm({
        ...registrationForm,
        fullName: user.name || '',
        email: user.email || '',
      });
    }
  };

  // Submit registration
  const handleRegistrationSubmit = async (e) => {
    e.preventDefault();

    // If user is not logged in, show message and redirect to login
    if (!user) {
      dispatch(addNotification({
        type: 'info',
        message: 'Please log in or register to complete your event registration.',
      }));
      closeRegisterModal();
      return;
    }

    setLoading(true);

    try {
      // Prepare registration data
      const registrationData = {
        ...registrationForm,
        eventId: selectedEvent?._id || selectedEvent?.id,
        userId: user?._id || user?.id,
      };

      // Using mock data, no actual API call needed
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      setRegistrationSuccess(true);
      setLoading(false);

      dispatch(addNotification({
        type: 'success',
        message: `You have successfully registered for ${selectedEvent.title}`,
      }));
    } catch (error) {
      setLoading(false);
      dispatch(addNotification({
        type: 'error',
        message: 'Registration failed. Please try again later.',
      }));
    }
  };  
  // Reset and close the modal
  const resetAndCloseModal = () => {
    setShowRegisterModal(false);
    setSelectedEvent(null);
    setRegistrationSuccess(false);
    setRegistrationForm({
      fullName: '',
      email: '',
      phone: '',
      attendees: 1,
      comments: '',
    });
  };

  // Close registration modal
  const closeRegisterModal = () => {
    resetAndCloseModal();
  };

  // Format date
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  // Calculate spots remaining
  const spotsRemaining = (event) => {
    if (!event.capacity) return 'Unlimited';
    return event.capacity - event.registered;
  };

  // Add image fallback handling function
  const handleImageError = (e) => {
    e.target.src = 'https://images.unsplash.com/photo-1531685250784-7569952593d2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80';
    e.target.onerror = null; // Prevent infinite fallback loop
  };

  // Only use event documents (type: 'event' or no type) for event lists
  const eventItems = filteredEvents.filter(e => !e.type || e.type === 'event');

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section - Fullscreen with Background Image */}
      <section className="relative bg-gradient-to-r from-primary-800 via-primary-700 to-primary-900 text-white min-h-[75vh] flex items-center py-16 pt-32 sm:py-24 sm:pt-32 md:py-28 md:pt-36 lg:py-32 lg:pt-36 overflow-hidden">
        {/* Background Pattern with animation */}
        <div className="absolute inset-0 overflow-hidden opacity-10">
          <motion.div 
            initial={{ rotate: 0 }}
            animate={{ rotate: 10 }}
            transition={{ duration: 80, repeat: Infinity, repeatType: "reverse", ease: "linear" }}
            className="absolute inset-0" 
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23FFFFFF' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              backgroundSize: '30px 30px'
            }}
          ></motion.div>
        </div>

        {/* Enhanced background image with parallax effect */}
        <motion.div 
          initial={{ y: 0 }}
          animate={{ y: -20 }}
          transition={{ duration: 20, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
          className="absolute inset-0 z-0 opacity-30"
        >
          <img 
            src={pageContent?.hero?.backgroundImage || "https://images.unsplash.com/photo-1511632765486-a01980e01a18?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"} 
            alt=""
            className="w-full h-full object-cover scale-110"
            onError={handleImageError}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-primary-900/90 via-primary-800/70 to-primary-900/90"></div>
        </motion.div>
        
        {/* Decorative Elements */}
        <div className="absolute top-1/4 right-10 md:right-20 w-64 h-64 rounded-full bg-primary-600 opacity-20 blur-3xl"></div>
        <div className="absolute bottom-1/4 left-10 md:left-20 w-48 h-48 rounded-full bg-primary-400 opacity-20 blur-3xl"></div>
        <div className="absolute top-10 left-10 w-16 h-16 rounded-full bg-primary-300 opacity-20 animate-pulse" style={{animationDuration: '8s'}}></div>
        <div className="absolute bottom-20 right-1/4 w-24 h-24 rounded-full bg-primary-300 opacity-10 animate-pulse" style={{animationDuration: '12s'}}></div>
        
        <div className="absolute left-0 right-0 bottom-0 z-10">
          <svg className="w-full text-gray-50" viewBox="0 0 1440 120" fill="currentColor" preserveAspectRatio="none">
            <path d="M0,96L60,80C120,64,240,32,360,26.7C480,21,600,43,720,48C840,53,960,43,1080,42.7C1200,43,1320,53,1380,58.7L1440,64L1440,120L1380,120C1320,120,1200,120,1080,120C960,120,840,120,720,120C600,120,480,120,360,120C240,120,120,120,60,120L0,120Z"></path>
          </svg>
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 z-10 relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-3xl mx-auto text-center"
          >
            <div className="inline-block mb-6">
              <motion.div 
                className="bg-white/20 backdrop-blur-md px-4 py-1.5 rounded-full text-sm font-medium inline-flex items-center space-x-2 border border-white/30 shadow-lg"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                <span className="flex h-2 w-2 rounded-full bg-primary-300 animate-pulse"></span>
                <span>{pageContent?.hero?.badge || 'Join us in creating positive change'}</span>
              </motion.div>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight">
              {pageContent?.hero?.heading || (
                <>
                  Make an <span className="text-primary-300 relative inline-block">
                    Impact
                    <motion.div 
                      className="absolute -bottom-1 left-0 w-full h-1 bg-primary-300/50"
                      initial={{ width: 0 }}
                      animate={{ width: "100%" }}
                      transition={{ delay: 0.6, duration: 0.8 }}
                    ></motion.div>
                  </span> at Our <span className="relative">
                    Events
                    <svg className="absolute w-full h-3 -bottom-1 left-0 text-primary-400/40" viewBox="0 0 100 8" preserveAspectRatio="none">
                      <path d="M0,5 C25,0 75,8 100,3 L100,8 L0,8 Z" fill="currentColor"></path>
                    </svg>
                  </span>
                </>
              )}
            </h1>
            <p className="text-lg sm:text-xl opacity-90 mb-10 leading-relaxed max-w-2xl mx-auto">
              {pageContent?.hero?.description || "Join our community events to connect, contribute, and create meaningful change together. From fundraisers to workshops, there's a way for everyone to get involved."}
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <motion.button 
                whileHover={{ scale: 1.05, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.2)" }}
                whileTap={{ scale: 0.98 }}
                className="px-8 py-3.5 rounded-full bg-white text-primary-700 font-medium shadow-lg hover:bg-primary-50 transition-all duration-300 flex items-center"
                onClick={() => handleFilterChange('upcoming')}
              >
                <FaCalendarAlt className="mr-2" />
                {pageContent?.hero?.buttons?.[0]?.label || 'Explore Upcoming Events'}
              </motion.button>
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                className="px-8 py-3.5 rounded-full bg-primary-600 text-white font-medium shadow-lg hover:bg-primary-700 transition-all duration-300 flex items-center border border-primary-500"
                onClick={() => navigate('/volunteer')}
              >
                <FaUserPlus className="mr-2" />
                {pageContent?.hero?.buttons?.[1]?.label || 'Become a Volunteer'}
              </motion.button>
            </div>
            <div className="mt-14 pt-4 flex flex-wrap justify-center gap-x-8 gap-y-4">
              {(pageContent?.hero?.stats || []).map((stat, index) => {
                // Always use dynamic counts for these stats
                let count = stat.count;
                if (stat.label === 'Total Events') count = eventItems.length;
                if (stat.label === 'Featured Events') count = eventItems.filter(e => e.featured).length;
                // Render icon from string name if provided
                let icon = null;
                if (stat.icon === 'FaCalendarAlt') icon = <FaCalendarAlt className="w-6 h-6 mb-2 mx-auto text-primary-300" />;
                else if (stat.icon === 'FaRegStar') icon = <FaRegStar className="w-6 h-6 mb-2 mx-auto text-primary-300" />;
                else if (stat.icon === 'FaHandsHelping') icon = <FaHandsHelping className="w-6 h-6 mb-2 mx-auto text-primary-300" />;
                if (!icon && stat.icon && React.isValidElement(stat.icon)) icon = stat.icon;
                return (
                  <motion.div 
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 + (index * 0.1), duration: 0.5 }}
                    className="text-center px-4 py-3 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20"
                  >
                    {icon}
                    <div className="text-2xl sm:text-3xl font-bold text-white">{count || ''}</div>
                    <div className="text-sm text-primary-200">{stat.label || ''}</div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-12 bg-white border-b border-gray-100 relative">
        <div className="absolute left-0 top-0 w-full h-20 bg-gradient-to-b from-gray-50 to-transparent"></div>
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-center mb-8"
            >
              <h2 className="text-3xl font-bold text-gray-800 mb-4 relative inline-block">
                {pageContent?.filter?.heading || 'Find Your Perfect Event'}
                <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-primary-400 to-primary-600 rounded-full transform"></div>
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                {pageContent?.filter?.description || 'Explore our diverse range of events designed to create positive impact and foster community engagement.'}
              </p>
            </motion.div>
            <div className="relative bg-gray-50 rounded-xl p-2 shadow-sm hover:shadow-md transition-all duration-300">
              {/* Animated Selection Indicator */}
              <motion.div 
                className="absolute h-full top-0 rounded-lg bg-white shadow-md z-0"
                initial={false}
                animate={{ 
                  left: activeFilter === 'all' ? '0%' : 
                        activeFilter === 'upcoming' ? '14.28%' : 
                        activeFilter === 'gala' ? '28.57%' : 
                        activeFilter === 'workshop' ? '42.85%' : 
                        activeFilter === 'fundraiser' ? '57.14%' : 
                        activeFilter === 'conference' ? '71.42%' : 
                        '85.71%',
                  width: '14.28%'
                }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
              
              <div className="grid grid-cols-7 relative z-10">
                {(pageContent?.filter?.filters || [
                  { id: 'all', label: 'All', icon: <FaCalendarAlt /> },
                  { id: 'upcoming', label: 'Upcoming', icon: <FaCalendarAlt /> },
                  { id: 'gala', label: 'Galas', icon: <FaGlassMartiniAlt /> },
                  { id: 'workshop', label: 'Workshops', icon: <FaUsers /> },
                  { id: 'fundraiser', label: 'Fundraisers', icon: <FaHandHoldingHeart /> },
                  { id: 'conference', label: 'Conferences', icon: <FaMicrophone /> },
                  { id: 'community', label: 'Community', icon: <FaHandsHelping /> }
                ]).map((filter) => {
                  let icon = null;
                  if (filter.icon === 'FaCalendarAlt') icon = <FaCalendarAlt />;
                  else if (filter.icon === 'FaGlassMartiniAlt') icon = <FaGlassMartiniAlt />;
                  else if (filter.icon === 'FaUsers') icon = <FaUsers />;
                  else if (filter.icon === 'FaHandHoldingHeart') icon = <FaHandHoldingHeart />;
                  else if (filter.icon === 'FaMicrophone') icon = <FaMicrophone />;
                  else if (filter.icon === 'FaHandsHelping') icon = <FaHandsHelping />;
                  if (!icon && filter.icon && React.isValidElement(filter.icon)) icon = filter.icon;
                  return (
                    <motion.button
                      key={filter.id}
                      onClick={() => handleFilterChange(filter.id)}
                      className={`px-1 py-3 rounded-lg text-sm font-medium transition-all duration-300 relative flex flex-col items-center justify-center ${
                        activeFilter === filter.id ? 'text-primary-700' : 'text-gray-500 hover:text-gray-800'
                      }`}
                      whileHover={{ y: -2 }}
                      whileTap={{ y: 0 }}
                    >
                      <motion.div
                        animate={activeFilter === filter.id ? { scale: 1.2, y: 0 } : { scale: 1, y: 0 }}
                        transition={{ duration: 0.2 }}
                        className={`text-lg mb-1 ${activeFilter === filter.id ? 'text-primary-600' : ''}`}
                      >
                        {icon}
                      </motion.div>
                      {filter.label}
                      {activeFilter === filter.id && (
                        <motion.div
                          layoutId="activeFilterIndicator"
                          className="absolute -bottom-0.5 left-0 right-0 mx-auto h-1 w-10 bg-primary-500 rounded-full"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.2 }}
                        />
                      )}
                    </motion.button>
                  );
                })}
              </div>
            </div>
            <div className="mt-6 p-4 bg-primary-50 border border-primary-100 rounded-lg text-sm text-primary-700 flex items-start">
              <div className="bg-primary-100 p-2 rounded-full text-primary-600 mr-3 flex-shrink-0 mt-0.5">
                <FaInfoCircle />
              </div>
              <div>
                <p className="font-medium mb-1">{pageContent?.filter?.notice?.title || 'Upcoming Events Notice'}</p>
                <p className="text-primary-600 text-xs">
                  {pageContent?.filter?.notice?.description || 'Due to COVID-19 guidelines, some events may have limited capacity or additional safety measures in place. Virtual participation options are available for select events.'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Events Listing */}
      <section className="container mx-auto px-4 py-16">
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <LoadingSpinner size="large" />
          </div>
        ) : (
          <>
            {/* Featured Events */}
            {filteredEvents.some(event => event.featured) && (
              <div className="mb-16">
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 flex items-center group">
                      <span className="w-10 h-10 rounded-full bg-primary-100 text-primary-700 flex items-center justify-center mr-3 group-hover:scale-110 transition-transform duration-300">
                        <motion.div
                          animate={{ rotate: [0, 360] }}
                          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                        >
                          <FaRegStar />
                        </motion.div>
                      </span>
                      Featured Events
                    </h2>
                    <p className="text-gray-600 mt-1">Special events that you don't want to miss</p>
                  </div>
                  <Link 
                    to="/events" 
                    className="hidden sm:flex items-center text-primary-600 hover:text-primary-700 font-medium transition-colors group"
                  >
                    View All <FaArrowRight className="ml-2 text-sm transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredEvents
                    .filter(event => event.featured)
                    .map((event, index) => (
                      <motion.div
                        key={event.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 * index }}
                        className="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-500 relative border border-gray-100 hover:border-primary-200"
                        whileHover={{ y: -5 }}
                      >
                        <div className="relative h-48 overflow-hidden">
                          <img 
                            src={event.image || 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'} 
                            alt={event.title} 
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            onError={handleImageError}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                          <div className="absolute top-0 left-0 right-0 p-4 flex justify-between items-start">
                            <div className="bg-primary-600 text-white text-xs font-bold px-3 py-1.5 rounded-full uppercase flex items-center space-x-1 shadow-lg">
                              <FaRegStar className="mr-1" size={10} />
                              <span>Featured</span>
                            </div>
                            <div className="bg-black/60 backdrop-blur-sm text-white text-xs font-medium px-3 py-1.5 rounded-full flex items-center space-x-1 shadow-lg">
                              <FaMapMarkerAlt className="mr-1" size={10} />
                              <span>{event.location.split(',')[0]}</span>
                            </div>
                          </div>
                          <div className="absolute bottom-0 left-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0">
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => openRegisterModal(event)}
                              className="w-full bg-white text-primary-700 font-medium py-2 rounded-lg shadow-lg hover:bg-primary-50 transition-colors duration-300 flex items-center justify-center"
                            >
                              <FaRegPaperPlane className="mr-2" size={14} />
                              Register Now
                            </motion.button>
                          </div>
                        </div>
                        <div className="p-6">
                          <div className="flex justify-between items-start mb-3">
                            <h3 className="text-xl font-bold text-gray-800 group-hover:text-primary-600 transition-colors duration-300 line-clamp-2">{event.title}</h3>
                            <div className={`ml-3 flex-shrink-0 px-2 py-1 rounded-full text-xs font-medium ${
                              event.category === 'gala' ? 'bg-purple-100 text-purple-700' :
                              event.category === 'workshop' ? 'bg-blue-100 text-blue-700' :
                              event.category === 'fundraiser' ? 'bg-green-100 text-green-700' :
                              event.category === 'conference' ? 'bg-amber-100 text-amber-700' :
                              'bg-gray-100 text-gray-700'
                            }`}>
                              {event.category.charAt(0).toUpperCase() + event.category.slice(1)}
                            </div>
                          </div>
                          
                          <div className="space-y-2 mb-4">
                            <div className="flex items-center text-gray-600 text-sm">
                              <FaCalendarAlt className="mr-2 text-primary-500 flex-shrink-0" />
                              <span>{formatDate(event.date)}</span>
                            </div>
                            <div className="flex items-center text-gray-600 text-sm">
                              <FaClock className="mr-2 text-primary-500 flex-shrink-0" />
                              <span>{event.time}</span>
                            </div>
                            <div className="flex items-center text-gray-600 text-sm">
                              <FaMapMarkerAlt className="mr-2 text-primary-500 flex-shrink-0" />
                              <span className="line-clamp-1">{event.location}</span>
                            </div>
                          </div>
                          
                          <p className="text-gray-600 mb-6 line-clamp-2 text-sm">{event.description}</p>
                          
                          <div className="pt-4 mt-auto border-t border-gray-100 flex items-center justify-between">
                            <div className="flex items-center text-sm text-gray-600">
                              <div className="bg-primary-50 p-1.5 rounded-full text-primary-600 mr-2">
                                <FaUsers className="text-xs" />
                              </div>
                              <span>
                                <span className="font-medium text-gray-900">{event.registered}</span> registered
                              </span>
                            </div>
                            <div className="flex items-center">
                              {event.capacity && (
                                <div className={`text-xs font-medium ${
                                  spotsRemaining(event) < 10 ? 'text-red-700' : 'text-green-700'
                                }`}>
                                  {spotsRemaining(event)} spots left
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                </div>
              </div>
            )}

            {/* All Events */}
            <div className="my-16">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 flex items-center">
                    <span className="w-10 h-10 rounded-full bg-primary-100 text-primary-700 flex items-center justify-center mr-3">
                      <FaCalendarDay />
                    </span>
                    All Events
                  </h2>
                  <p className="text-gray-600 mt-1">Browse all our upcoming events and activities</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {eventItems.map((event, index) => (
                  <motion.div
                    key={event.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.05 * index }}
                    className="flex flex-col bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 border border-gray-100 h-full hover:border-primary-200 relative group"
                    whileHover={{ y: -5 }}
                  >
                    {/* New ribbon for upcoming events */}
                    {new Date(event.date) > new Date() && 
                      new Date(event.date) < new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) && (
                      <div className="absolute top-3 left-0 bg-green-500 text-white text-xs font-bold py-1 px-3 rounded-r-full z-10 shadow-md transform -translate-x-1 group-hover:translate-x-0 transition-transform duration-300">
                        Soon
                      </div>
                    )}
                    
                    <div className="relative h-36 overflow-hidden">
                      <img 
                        src={event.image || 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'} 
                        alt={event.title} 
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        onError={handleImageError}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-20 group-hover:opacity-70 transition-opacity duration-500"></div>
                      <div className={`absolute top-3 right-3 px-2 py-1 rounded-full text-xs font-medium shadow-sm ${
                        event.category === 'gala' ? 'bg-purple-100 text-purple-700' :
                        event.category === 'workshop' ? 'bg-blue-100 text-blue-700' :
                        event.category === 'fundraiser' ? 'bg-green-100 text-green-700' :
                        event.category === 'conference' ? 'bg-amber-100 text-amber-700' :
                        'bg-gray-100 text-gray-700'
                      }`}>
                        {event.category.charAt(0).toUpperCase() + event.category.slice(1)}
                      </div>
                      
                      {/* New date display */}
                      <div className="absolute -bottom-3 left-5 w-14 h-14 bg-white rounded-lg shadow-lg flex flex-col items-center justify-center transform translate-y-0 group-hover:translate-y-2 transition-transform duration-300">
                        <span className="text-xs text-gray-500">{new Date(event.date).toLocaleString('en-US', {month: 'short'})}</span>
                        <span className="text-lg font-bold text-primary-700">{new Date(event.date).getDate()}</span>
                      </div>
                    </div>
                    
                    <div className="flex-1 p-5 pt-6">
                      <h3 className="text-lg font-bold text-gray-800 mb-2 hover:text-primary-600 transition-colors line-clamp-1 mt-2">
                        {event.title}
                      </h3>
                      
                      <div className="flex items-center text-gray-500 text-xs mb-2">
                        <div className="flex items-center">
                          <FaClock className="mr-1.5 text-primary-500" />
                          <span>{event.time.split(' - ')[0]}</span>
                        </div>
                        <span className="mx-2 text-gray-300">•</span>
                        <div className="flex items-center">
                          <FaMapMarkerAlt className="mr-1.5 text-primary-500" />
                          <span className="truncate">{event.location.split(',')[0]}</span>
                        </div>
                      </div>
                      
                      <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                        {event.description}
                      </p>
                    </div>
                    
                    <div className="p-5 pt-0 mt-auto">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center text-xs text-gray-500">
                          <div className="p-1 rounded-full bg-primary-50 mr-1.5">
                            <FaUsers className="text-xs text-primary-500" />
                          </div>
                          <span><b>{event.registered}</b> attending</span>
                        </div>
                        {event.capacity && (
                          <div className={`text-xs font-medium ${
                            spotsRemaining(event) < 10 ? 'text-red-600' : 'text-green-600'
                          }`}>
                            {spotsRemaining(event) < 10 ? `Only ${spotsRemaining(event)} spots left!` : `${spotsRemaining(event)} spots available`}
                          </div>
                        )}
                      </div>
                      
                      <motion.button
                        whileHover={{ scale: 1.02, boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)" }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => openRegisterModal(event)}
                        className="w-full py-2 px-4 bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-500 hover:to-primary-600 text-white text-sm font-medium rounded-md shadow-sm transition-all duration-300 flex items-center justify-center"
                      >
                        <FaRegCalendarCheck className="mr-2" />
                        Register Now
                      </motion.button>
                    </div>
                  </motion.div>
                ))}
              </div>
              
              {filteredEvents.length === 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-gray-50 rounded-lg p-8 text-center"
                >
                  <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                    <FaCalendarTimes className="text-gray-400 text-xl" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-700 mb-2">No Events Found</h3>
                  <p className="text-gray-500 mb-4">
                    There are no events matching your current filter. Please try a different category.
                  </p>
                  <button
                    onClick={() => handleFilterChange('all')}
                    className="px-4 py-2 bg-primary-600 text-white rounded-md text-sm font-medium hover:bg-primary-700 transition-colors"
                  >
                    Show All Events
                  </button>
                </motion.div>
              )}
            </div>
            
            {/* Past Events Highlights */}
            <div className="my-20 bg-gray-50 rounded-2xl overflow-hidden border border-gray-100 shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="grid grid-cols-1 lg:grid-cols-2">
                <div className="p-8 lg:p-12 flex flex-col justify-center relative">
                  {/* Background decoration */}
                  <div className="absolute -right-6 top-1/2 transform -translate-y-1/2 w-12 h-32 bg-primary-100 rounded-l-full opacity-40"></div>
                  
                  <div className="inline-block mb-3">
                    <span className="bg-primary-100 text-primary-700 text-xs font-medium px-3 py-1 rounded-full">
                      Past Events
                    </span>
                  </div>
                  <h2 className="text-3xl font-bold text-gray-800 mb-4">The Impact We've Made Together</h2>
                  <p className="text-gray-600 mb-6">
                    Our past events have made a significant difference in communities around the world. 
                    From raising funds for critical causes to building awareness, each event contributes 
                    to our mission of humanitarian relief.
                  </p>
                  <ul className="space-y-3 mb-6">
                    {[
                      '$2.5 million raised for humanitarian causes',
                      '15,000+ attendees at our events last year',
                      '40+ projects funded through our fundraising events',
                      'Volunteer community expanded by 35%'
                    ].map((item, index) => (
                      <motion.li 
                        key={index} 
                        className="flex items-start"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        viewport={{ once: true }}
                      >
                        <div className="mt-1 flex-shrink-0 w-5 h-5 rounded-full bg-primary-100 flex items-center justify-center text-primary-600">
                          <FaCheck className="text-xs" />
                        </div>
                        <span className="ml-2 text-gray-700">{item}</span>
                      </motion.li>
                    ))}
                  </ul>
                  
                  <Link to="/about#impact" className="text-primary-600 hover:text-primary-700 font-medium flex items-center transition-colors group">
                    Read our impact report <FaArrowRight className="ml-2 text-xs transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>
                </div>
                
                <div className="relative h-64 lg:h-auto overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1559027615-cd4628902d4a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                    alt="Past event" 
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                    onError={handleImageError}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex flex-col justify-end p-8 text-white">
                    <div className="flex items-center mb-2">
                      <div className="w-8 h-8 rounded-full bg-primary-500/30 flex items-center justify-center mr-3">
                        <FaQuoteLeft className="text-primary-300" />
                      </div>
                      <span className="text-sm font-medium">Success Story</span>
                    </div>
                    <p className="text-lg italic text-white/90 mb-2 drop-shadow-md">
                      "The Annual Charity Gala last year was transformative for our clean water initiative, 
                      raising enough funds to bring safe water to 15 communities."
                    </p>
                    <div className="text-sm">— Program Director, Water for Life Project</div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Event Subscription */}
            <div className="my-16 relative overflow-hidden rounded-2xl bg-gradient-to-r from-primary-700 to-primary-900 shadow-xl">
              {/* Background image */}
              <div className="absolute inset-0 opacity-20 z-0">
                <img 
                  src="https://images.unsplash.com/photo-1560439514-4e9645039924?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80" 
                  alt=""
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                  onError={(e) => { e.target.style.display = 'none' }}
                />
                <div className="absolute inset-0 bg-gradient-to-br from-primary-800/70 via-primary-900/80 to-primary-800/70"></div>
              </div>
              
              {/* Enhanced decorative elements */}
              <motion.div 
                animate={{ 
                  rotate: 360,
                  scale: [1, 1.1, 1]
                }} 
                transition={{ 
                  rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                  scale: { duration: 8, repeat: Infinity, repeatType: "reverse" }
                }}
                className="absolute top-0 right-0 w-72 h-72 rounded-full bg-white/10 -mr-32 -mt-32 z-0"
              ></motion.div>
              <motion.div 
                animate={{ 
                  rotate: -360,
                  scale: [1, 1.2, 1]
                }} 
                transition={{ 
                  rotate: { duration: 25, repeat: Infinity, ease: "linear" },
                  scale: { duration: 10, repeat: Infinity, repeatType: "reverse" }
                }}
                className="absolute bottom-0 left-0 w-56 h-56 rounded-full bg-white/10 -ml-20 -mb-20 z-0"
              ></motion.div>
              
              <div className="relative p-8 lg:p-12 text-center z-10">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="max-w-xl mx-auto"
                >
                  <div className="inline-block mb-3">
                    <span className="bg-white/20 text-white text-xs font-medium px-3 py-1 rounded-full backdrop-blur-sm">
                      Stay Connected
                    </span>
                  </div>
                   <h2 className="text-3xl font-bold text-white mb-3">Stay Updated on Upcoming Events</h2>
                  
                  <p className="text-primary-100 mb-6">
                    Subscribe to our newsletter to receive notifications about new events, 
                    volunteer opportunities, and ways to make an impact.
                  </p>
                  
                  <form className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
                    <input
                      type="email"
                      placeholder="Your email address"
                      className="flex-1 px-4 py-3 rounded-md border-none focus:ring-2 focus:ring-primary-300 text-gray-700"
                    />
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      type="submit"
                      className="bg-white text-primary-700 font-medium px-6 py-3 rounded-md hover:bg-primary-50 transition-colors duration-300 flex-shrink-0 shadow-md"
                    >
                      Subscribe
                    </motion.button>
                  </form>
                  
                  <p className="mt-4 text-xs text-primary-200">
                    We respect your privacy. Unsubscribe at any time.
                  </p>
                </motion.div>
              </div>
            </div>

            {/* Image Gallery Section - New addition */}
            <div className="my-20">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 flex items-center">
                    <span className="w-10 h-10 rounded-full bg-primary-100 text-primary-700 flex items-center justify-center mr-3">
                      <FaRegStar />
                    </span>
                    {pageContent?.gallery?.heading || 'Event Gallery'}
                  </h2>
                  <p className="text-gray-600 mt-1">{pageContent?.gallery?.description || 'Moments captured from our previous events'}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {(pageContent?.gallery?.images || [
                  'https://images.unsplash.com/photo-1531545514256-b1400bc00f31?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                  'https://images.unsplash.com/photo-1560439513-74b037a25d84?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                  'https://images.unsplash.com/photo-1491438590914-bc09fcaaf77a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                  'https://images.unsplash.com/photo-1505236858219-8359eb29e329?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                  'https://images.unsplash.com/photo-1540575861501-7cf05a4b125a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                  'https://images.unsplash.com/photo-1527529482837-4698179dc6ce?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                  'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                  'https://images.unsplash.com/photo-1563863242679-325da3a7bc27?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
                ]).map((image, index) => (
                  <motion.div 
                    key={index}
                    className={`rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 relative group ${index === 0 || index === 3 ? 'col-span-2 row-span-2' : ''}`}
                    whileHover={{ y: -5 }}
                  >
                    <img 
                      src={image} 
                      alt={pageContent?.gallery?.captions?.[index] || `Event gallery image ${index + 1}`} 
                      className="w-full h-full object-cover aspect-square"
                      onError={handleImageError}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                      <span className="text-white text-sm font-medium">{pageContent?.gallery?.captions?.[index] || ''}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </>
        )}
      </section>

      {/* Enhanced Registration Modal */}
      <AnimatePresence>
        {showRegisterModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4"
            style={{ backgroundColor: 'rgba(0, 0, 0, 0.75)' }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="bg-white rounded-xl shadow-2xl overflow-hidden w-full max-w-2xl relative"
            >
              {/* Close button */}
              <button
                onClick={closeRegisterModal}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors z-10"
                aria-label="Close"
              >
                <FaTimes size={20} />
              </button>
              
              {!registrationSuccess ? (
                <div className="grid grid-cols-1 md:grid-cols-2">
                  {/* Event info section */}
                  <div className="bg-gradient-to-br from-primary-700 to-primary-900 text-white p-6 relative overflow-hidden flex flex-col">
                    {/* Decorative elements */}
                    <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-white/10 -mr-10 -mt-10"></div>
                    <div className="absolute bottom-0 left-0 w-24 h-24 rounded-full bg-white/10 -ml-10 -mb-10"></div>
                    
                    <div className="mb-auto relative z-10">
                      <button
                        onClick={closeRegisterModal}
                        className="flex items-center text-primary-200 hover:text-white text-sm font-medium mb-6 transition-colors"
                      >
                        <FaChevronLeft className="mr-1" />
                        Back to events
                      </button
                      >
                      
                      <h3 className="text-xl font-bold mb-2">
                        {selectedEvent?.title}
                      </h3>
                      
                      <div className={`inline-block px-2 py-1 text-xs font-medium rounded-full mb-4 ${
                        selectedEvent?.category === 'gala' ? 'bg-purple-700/30 text-purple-100' :
                        selectedEvent?.category === 'workshop' ? 'bg-blue-700/30 text-blue-100' :
                        selectedEvent?.category === 'fundraiser' ? 'bg-green-700/30 text-green-100' :
                        selectedEvent?.category === 'conference' ? 'bg-amber-700/30 text-amber-100' :
                        'bg-gray-700/30 text-gray-100'
                      }`}>
                        {selectedEvent?.category.charAt(0).toUpperCase() + selectedEvent?.category.slice(1)}
                      </div>
                      
                      <div className="space-y-3 text-sm text-primary-100">
                        <div className="flex items-center">
                          <div className="bg-white/20 p-1.5 rounded-full mr-3 flex-shrink-0">
                            <FaCalendarAlt className="text-xs" />
                          </div>
                          <span>{selectedEvent && formatDate(selectedEvent.date)}</span>
                        </div>
                        
                        <div className="flex items-center">
                          <div className="bg-white/20 p-1.5 rounded-full mr-3 flex-shrink-0">
                            <FaClock className="text-xs" />
                          </div>
                          <span>{selectedEvent?.time}</span>
                        </div>
                        
                        <div className="flex items-start">
                          <div className="bg-white/20 p-1.5 rounded-full mr-3 flex-shrink-0 mt-0.5">
                            <FaMapMarkerAlt className="text-xs" />
                          </div>
                          <span>{selectedEvent?.location}</span>
                        </div>
                        
                        <div className="flex items-center">
                          <div className="bg-white/20 p-1.5 rounded-full mr-3 flex-shrink-0">
                            <FaUsers className="text-xs" />
                          </div>
                          <span>
                            <b className="text-white">{selectedEvent?.registered}</b> people registered
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-6 pt-4 border-t border-white/20 relative z-10">
                      <div className="text-sm">
                        {selectedEvent?.capacity ? (
                          <div>
                            <div className="mb-2 flex justify-between">
                              <span>Capacity</span>
                              <span className="font-medium text-white">
                                {selectedEvent.registered}/{selectedEvent.capacity} spots filled
                              </span>
                            </div>
                            <div className="w-full h-2 bg-white/20 rounded-full overflow-hidden">
                              <div 
                                className="h-full bg-primary-300 rounded-full"
                                style={{ width: `${(selectedEvent.registered / selectedEvent.capacity) * 100}%` }}
                              ></div>
                            </div>
                            
                            {spotsRemaining(selectedEvent) < 10 && (
                              <div className="mt-2 text-xs text-primary-200 flex items-center">
                                <FaInfoCircle className="mr-1.5" />
                                <span>Only {spotsRemaining(selectedEvent)} spots remaining!</span>
                              </div>
                            )}
                          </div>
                        ) : (
                          <div className="text-primary-200 flex items-center">
                            <FaInfoCircle className="mr-1.5" />
                            <span>Unlimited capacity</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  {/* Registration form section */}
                  <div className="p-6">
                    <div className="text-center mb-5">
                      <h2 className="text-xl font-bold text-gray-800">Event Registration</h2>
                      <p className="text-gray-500 text-sm">Please fill in your details to register</p>
                    </div>
                    
                    <form onSubmit={handleRegistrationSubmit} className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                          <input
                            type="text"
                            name="fullName"
                            value={registrationForm.fullName}
                            onChange={handleFormChange}
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200"
                            placeholder="Your full name"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                          <input
                            type="email"
                            name="email"
                            value={registrationForm.email}
                            onChange={handleFormChange}
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200"
                            placeholder="your.email@example.com"
                          />
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                          <input
                            type="tel"
                            name="phone"
                            value={registrationForm.phone}
                            onChange={handleFormChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200"
                            placeholder="Your phone number"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Number of Attendees</label>
                          <input
                            type="number"
                            name="attendees"
                            value={registrationForm.attendees}
                            onChange={handleFormChange}
                            min="1"
                            max={selectedEvent?.capacity ? spotsRemaining(selectedEvent) : 10}
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200"
                          />
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Additional Comments</label>
                        <textarea
                          name="comments"
                          value={registrationForm.comments}
                          onChange={handleFormChange}
                          rows="3"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200"
                          placeholder="Any special requirements or questions?"
                        ></textarea>
                      </div>
                      
                      <div className="py-3 border-t border-gray-100 text-center mt-4">
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          type="submit"
                          className="w-full py-3 bg-primary-600 text-white font-medium rounded-md hover:bg-primary-700 transition-colors duration-300 flex items-center justify-center"
                          disabled={loading}
                        >
                          {loading ? (
                            <span className="flex items-center">
                              <LoadingSpinner size="small" className="mr-2" /> Processing...
                            </span>
                          ) : (
                            <span className="flex items-center">
                              <FaRegCalendarCheck className="mr-2" />
                              Complete Registration
                            </span>
                          )}
                        </motion.button>
                        
                        {!user && (
                          <p className="mt-3 text-sm text-gray-500">
                            Not logged in? You can still register, but{' '}
                            <Link to="/login" className="text-primary-600 hover:text-primary-700 font-medium">
                              signing in
                            </Link>{' '}
                            will save you time.
                          </p>
                        )}
                      </div>
                    </form>
                  </div>
                </div>
              ) : (
                <div className="p-8 text-center">
                  <div className="flex justify-center items-center mb-6">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 10
                      }}
                      className="bg-green-100 rounded-full p-4 text-green-600"
                    >
                      <FaCheckCircle size={48} />
                    </motion.div>
                  </div>
                  
                  <h2 className="text-2xl font-bold text-gray-800 mb-3">Registration Successful!</h2>
                  <p className="text-gray-600 mb-6 max-w-md mx-auto">
                    Thank you for registering for <span className="font-medium text-primary-600">{selectedEvent?.title}</span>.
                    We've sent a confirmation email with all the details to your inbox.
                  </p>
                  
                  <div className="bg-gray-50 p-4 rounded-lg mb-6 text-left max-w-md mx-auto">
                    <h3 className="text-sm font-medium text-gray-800 mb-2">Event Details:</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center">
                        <FaCalendarAlt className="text-primary-500 mr-2 flex-shrink-0" />
                        <span>{selectedEvent && formatDate(selectedEvent.date)}</span>
                      </div>
                      <div className="flex items-center">
                        <FaClock className="text-primary-500 mr-2 flex-shrink-0" />
                        <span>{selectedEvent?.time}</span>
                      </div>
                      <div className="flex items-start">
                        <FaMapMarkerAlt className="text-primary-500 mr-2 flex-shrink-0 mt-1" />
                        <span>{selectedEvent?.location}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={resetAndCloseModal}
                      className="px-5 py-2.5 bg-primary-600 text-white rounded-md font-medium hover:bg-primary-700 transition-colors"
                    >
                      Close
                    </motion.button>
                    
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => navigate('/dashboard/my-events')}
                      className="px-5 py-2.5 border border-gray-300 text-gray-700 rounded-md font-medium hover:bg-gray-50 transition-colors"
                    >
                      View My Events
                    </motion.button>
                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Events;