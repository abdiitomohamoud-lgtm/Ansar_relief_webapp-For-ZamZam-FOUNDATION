import React, { useState, useEffect } from 'react';
import { Link, useLocation, Outlet } from 'react-router-dom';
import { 
  FaTachometerAlt, FaUsers, FaHandHoldingHeart, FaProjectDiagram, 
  FaMoneyBillWave, FaNewspaper, FaCalendarAlt, FaQuestionCircle, 
  FaUserFriends, FaChartBar, FaCog, FaBars, FaTimes, FaSignOutAlt,
  FaRegBell, FaUserCircle, FaSearch, FaHandshake, FaMosque
} from 'react-icons/fa';
import axios from 'axios';

// Navigation items for the sidebar
const navigationItems = [
  { name: 'Dashboard', to: '/admin', icon: FaTachometerAlt },
  { name: 'Campaigns', to: '/admin/campaigns', icon: FaHandHoldingHeart },
  { name: 'Projects', to: '/admin/projects', icon: FaProjectDiagram },
  { name: 'Donations', to: '/admin/donations', icon: FaMoneyBillWave },
  { name: 'Sponsorships', to: '/admin/sponsorships', icon: FaHandshake },
  { name: 'Sadaqah', to: '/admin/sadaqah', icon: FaMosque },
  { name: 'Users', to: '/admin/users', icon: FaUsers },
  { name: 'News', to: '/admin/news', icon: FaNewspaper },
  { name: 'Events', to: '/admin/events', icon: FaCalendarAlt },
  { name: 'FAQs', to: '/admin/faqs', icon: FaQuestionCircle },
  { name: 'Team', to: '/admin/team', icon: FaUserFriends },
  { name: 'Reports', to: '/admin/reports', icon: FaChartBar },
  { name: 'Settings', to: '/admin/settings', icon: FaCog },
];

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    // Fetch current admin user
    const fetchUser = async () => {
      try {
        const response = await axios.get('/api/auth/profile');
        setUser(response.data.data.user);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching user profile:', error);
        setLoading(false);
        
        // For demo purposes, set a mock user
        setUser({
          firstName: 'Admin',
          lastName: 'User',
          email: 'admin@ansarrelief.org',
          photo: '/images/team/admin-user.jpg'
        });
      }
    };

    fetchUser();
  }, []);

  // Close mobile menu when location changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const handleLogout = async () => {
    try {
      await axios.get('/api/auth/logout');
      window.location.href = '/login';
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const isActive = (path) => {
    return location.pathname === path || location.pathname.startsWith(`${path}/`);
  };

  return (
    <div className="h-screen flex overflow-hidden bg-gray-100">
      {/* Mobile sidebar */}
      <div className={`md:hidden ${mobileMenuOpen ? 'block' : 'hidden'} fixed inset-0 z-40 flex`}>
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75" onClick={() => setMobileMenuOpen(false)}></div>
        <div className="relative flex-1 flex flex-col max-w-xs w-full bg-primary-800">
          <div className="absolute top-0 right-0 -mr-12 pt-2">
            <button
              className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Close sidebar</span>
              <FaTimes className="h-6 w-6 text-white" />
            </button>
          </div>
          <div className="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
            <div className="flex-shrink-0 flex items-center px-4">
              <img className="h-8 w-auto" src="/images/logos/logo-white.png" alt="Ansar Admin" />
              <span className="ml-2 text-white font-bold text-lg">Ansar Admin</span>
            </div>
            <nav className="mt-5 px-2 space-y-1">
              {navigationItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.to}
                  className={`group flex items-center px-2 py-2 text-base font-medium rounded-md ${
                    isActive(item.to)
                      ? 'bg-primary-900 text-white'
                      : 'text-primary-100 hover:bg-primary-700 hover:text-white'
                  }`}
                >
                  <item.icon
                    className={`mr-4 flex-shrink-0 h-6 w-6 ${
                      isActive(item.to) ? 'text-primary-300' : 'text-primary-300 group-hover:text-primary-100'
                    }`}
                  />
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
          <div className="flex-shrink-0 flex border-t border-primary-700 p-4">
            <button
              onClick={handleLogout}
              className="flex-shrink-0 group block w-full flex items-center"
            >
              <div className="flex items-center">
                <div>
                  <img
                    className="inline-block h-10 w-10 rounded-full"
                    src={user?.photo || '/images/team/default-avatar.png'}
                    alt="User avatar"
                  />
                </div>
                <div className="ml-3">
                  <p className="text-base font-medium text-white">
                    {user ? `${user.firstName} ${user.lastName}` : 'Admin User'}
                  </p>
                  <p className="text-sm font-medium text-primary-200 group-hover:text-primary-100">
                    <span className="flex items-center">
                      <FaSignOutAlt className="mr-1" /> Logout
                    </span>
                  </p>
                </div>
              </div>
            </button>
          </div>
        </div>
        <div className="flex-shrink-0 w-14">{/* Dummy element to force sidebar to shrink to fit close icon */}</div>
      </div>

      {/* Desktop sidebar */}
      <div className={`hidden md:flex md:flex-shrink-0 transition-all duration-300 ${sidebarOpen ? 'md:w-64' : 'md:w-20'}`}>
        <div className={`flex flex-col w-full transition-all duration-300 ${sidebarOpen ? 'md:w-64' : 'md:w-20'}`}>
          <div className="flex-1 flex flex-col min-h-0 bg-primary-800">
            <div className="flex items-center h-16 flex-shrink-0 px-4 bg-primary-900">
              {sidebarOpen ? (
                <div className="flex items-center">
                  <img className="h-8 w-auto" src="/images/logos/logo-white.png" alt="Ansar Admin" />
                  <span className="ml-2 text-white font-bold text-lg">Ansar Admin</span>
                </div>
              ) : (
                <img className="h-8 w-auto mx-auto" src="/images/logos/logo-icon-white.png" alt="Ansar" />
              )}
              <button
                onClick={toggleSidebar}
                className={`${sidebarOpen ? 'ml-auto' : 'mx-auto mt-4'} text-primary-200 hover:text-white focus:outline-none`}
              >
                {sidebarOpen ? <FaBars className="h-5 w-5" /> : <FaBars className="h-5 w-5" />}
              </button>
            </div>
            <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
              <nav className="mt-5 flex-1 px-2 space-y-1">
                {navigationItems.map((item) => (
                  <Link
                    key={item.name}
                    to={item.to}
                    className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                      isActive(item.to)
                        ? 'bg-primary-900 text-white'
                        : 'text-primary-100 hover:bg-primary-700 hover:text-white'
                    }`}
                  >
                    <item.icon
                      className={`${sidebarOpen ? 'mr-3' : 'mx-auto'} flex-shrink-0 h-6 w-6 ${
                        isActive(item.to) ? 'text-primary-300' : 'text-primary-300 group-hover:text-primary-100'
                      }`}
                    />
                    {sidebarOpen && <span>{item.name}</span>}
                    {!sidebarOpen && (
                      <span className="sr-only">{item.name}</span>
                    )}
                  </Link>
                ))}
              </nav>
            </div>
            <div className="flex-shrink-0 flex border-t border-primary-700 p-4">
              <button
                onClick={handleLogout}
                className="flex-shrink-0 w-full group block"
              >
                {sidebarOpen ? (
                  <div className="flex items-center">
                    <div>
                      <img
                        className="inline-block h-9 w-9 rounded-full"
                        src={user?.photo || '/images/team/default-avatar.png'}
                        alt="User avatar"
                      />
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-white">
                        {user ? `${user.firstName} ${user.lastName}` : 'Admin User'}
                      </p>
                      <p className="text-xs font-medium text-primary-200 group-hover:text-primary-100">
                        <span className="flex items-center">
                          <FaSignOutAlt className="mr-1" /> Logout
                        </span>
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center">
                    <img
                      className="inline-block h-8 w-8 rounded-full"
                      src={user?.photo || '/images/team/default-avatar.png'}
                      alt="User avatar"
                    />
                    <FaSignOutAlt className="mt-2 h-5 w-5 text-primary-200 group-hover:text-primary-100" />
                  </div>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex flex-col w-0 flex-1 overflow-hidden">
        <div className="relative z-10 flex-shrink-0 flex h-16 bg-white shadow">
          <button
            className="px-4 border-r border-gray-200 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500 md:hidden"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open sidebar</span>
            <FaBars className="h-6 w-6" />
          </button>
          <div className="flex-1 px-4 flex justify-between">
            <div className="flex-1 flex">
              <form className="w-full flex md:ml-0" action="#" method="GET">
                <label htmlFor="search-field" className="sr-only">
                  Search
                </label>
                <div className="relative w-full text-gray-400 focus-within:text-gray-600">
                  <div className="absolute inset-y-0 left-0 flex items-center pointer-events-none">
                    <FaSearch className="h-5 w-5" />
                  </div>
                  <input
                    id="search-field"
                    className="block w-full h-full pl-8 pr-3 py-2 border-transparent text-gray-900 placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-0 focus:border-transparent sm:text-sm"
                    placeholder="Search"
                    type="search"
                    name="search"
                  />
                </div>
              </form>
            </div>
            <div className="ml-4 flex items-center md:ml-6">
              <button className="bg-white p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
                <span className="sr-only">View notifications</span>
                <FaRegBell className="h-6 w-6" />
              </button>

              {/* Profile dropdown */}
              <div className="ml-3 relative">
                <div>
                  <button className="max-w-xs bg-white flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
                    <span className="sr-only">Open user menu</span>
                    <img
                      className="h-8 w-8 rounded-full"
                      src={user?.photo || '/images/team/default-avatar.png'}
                      alt="User avatar"
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <main className="flex-1 relative overflow-y-auto focus:outline-none">
          <div className="py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
              <Outlet />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;