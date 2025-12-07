import React, { useState } from "react";



import { useSelector, useDispatch } from "react-redux";
// import { FaPlus, FaCalendarAlt, FaEnvelope, FaUsers } from 'react-icons/fa';
import ProfileTab from './UserProfileTabs/ProfileTab';
import EventsTab from './UserProfileTabs/EventsTab';
import { useQuery } from '@tanstack/react-query';
import { fetchUserForms } from '../api/user';
import ContactTab from './UserProfileTabs/ContactTab';
import VolunteerTab from './UserProfileTabs/VolunteerTab';
import CommentsTab from './UserProfileTabs/CommentsTab';
import CartTab from './UserProfileTabs/CartTab';
import DonationsTab from './UserProfileTabs/DonationsTab';
import WishlistTab from './UserProfileTabs/WishlistTab';
import PasswordTab from './UserProfileTabs/PasswordTab';
import SettingsTab from './UserProfileTabs/SettingsTab';
import { logout } from '../redux/slices/authSlice';
// import { Card, CardBody } from '../components/common';
// Import your system's styles (Tailwind or custom CSS)
// import "../../index.css";




const tabs = [
  { key: 'profile', label: 'Profile' },
  { key: 'events', label: 'Event Forms' },
  { key: 'contact', label: 'Contact Forms' },
  { key: 'volunteer', label: 'Volunteer Forms' },
  { key: 'cart', label: 'Cart' },
  { key: 'donations', label: 'Donation History' },
  { key: 'wishlist', label: 'Wishlist' },
  { key: 'password', label: 'Password Management' },
  { key: 'comments', label: 'Comments' },
  { key: 'settings', label: 'Settings' },
];



const UserProfile = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const dispatch = useDispatch();

  // Get avatar, username, and email from Redux profile state
  const profileState = useSelector(state => state.auth);
  const profileInfo = profileState?.user || {};

  // Update avatar and username logic to use the profile state
  let avatar = profileInfo.avatar && typeof profileInfo.avatar === 'string' && profileInfo.avatar.trim() !== '' ? profileInfo.avatar : '/images/avatar-placeholder.png';
  let username = profileInfo.username && typeof profileInfo.username === 'string' && profileInfo.username.trim() !== '' ? profileInfo.username : (profileInfo.email && typeof profileInfo.email === 'string' ? profileInfo.email.split('@')[0] : 'user');
  const email = profileInfo.email || '';

  // Fetch event forms for EventsTab (React Query v5 object form)
  const { data: eventForms = [], isLoading: loadingEvents, error: errorEvents } = useQuery({
    queryKey: ['userEventForms'],
    queryFn: () => fetchUserForms('event'),
  });

  // Fetch volunteer forms for VolunteerTab
  const { data: volunteerForms = [], isLoading: loadingVolunteers, error: errorVolunteers } = useQuery({
    queryKey: ['userVolunteerForms'],
    queryFn: () => fetchUserForms('volunteer'),
  });

  // Fetch contact forms for ContactTab
  const { data: contactForms = [], isLoading: loadingContacts, error: errorContacts } = useQuery({
    queryKey: ['userContactForms'],
    queryFn: () => fetchUserForms('contact'),
  });

  // Logout handler: clears tokens and redirects to login
  const handleLogout = async () => {
    try {
      await dispatch(logout()).unwrap();

      // Clear tokens from both localStorage and sessionStorage
      localStorage.removeItem('token');
      sessionStorage.removeItem('token');

      window.location.href = '/login';
    } catch (error) {
      console.error('Logout failed:', error);
      alert('Failed to log out. Please try again.');
    }
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'profile':
        return <ProfileTab />;
      case 'events':
        return <EventsTab eventForms={eventForms} loadingEvents={loadingEvents} errorEvents={errorEvents} />;
      case 'contact':
        return <ContactTab contactForms={contactForms} loadingContacts={loadingContacts} errorContacts={errorContacts} />;
      case 'volunteer':
        return <VolunteerTab volunteerForms={volunteerForms} loadingVolunteers={loadingVolunteers} errorVolunteers={errorVolunteers} />;
      case 'cart':
        return <CartTab />;
      case 'donations':
        return <DonationsTab />;
      case 'wishlist':
        return <WishlistTab />;
      case 'comments':
        return <CommentsTab />;
      case 'password':
        return <PasswordTab />;
      case 'settings':
        return <SettingsTab />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 w-full flex flex-col pt-20 pb-8 px-0">
      <div className="w-full max-w-full mx-auto flex flex-row gap-0 h-full">
        {/* Left Panel Tabs */}
        <div className="w-64 min-w-[220px] border-r border-green-100 bg-gradient-to-b from-green-200 to-green-50 rounded-none py-10 px-4 flex flex-col gap-2 shadow-md">
          <div className="mb-8 flex items-center gap-3 px-2">
            <img src={avatar} alt="User avatar" className="w-12 h-12 rounded-full object-cover border-2 border-green-400 shadow" />
            <div>
              <div className="font-semibold text-green-900">@{username}</div>
              <div className="text-xs text-green-700">{email}</div>
            </div>
          </div>
          {/* Enhanced Logout Button */}
          <button
            className="mb-4 flex items-center gap-3 px-4 py-2 bg-gradient-to-r from-red-500 to-red-400 hover:from-red-600 hover:to-red-500 text-white rounded-xl shadow-lg font-bold text-base transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-red-300"
            onClick={() => setShowLogoutModal(true)}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 01-2 2H7a2 2 0 01-2-2V7a2 2 0 012-2h4a2 2 0 012 2v1" /></svg>
            Logout
          </button>
          {/* Logout Confirmation Modal */}
          {showLogoutModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
              <div className="bg-white rounded-xl shadow-2xl p-8 max-w-sm w-full flex flex-col items-center">
                <div className="text-lg font-bold text-red-600 mb-2">Confirm Logout</div>
                <div className="text-gray-700 mb-6 text-center">Are you sure you want to log out?</div>
                <div className="flex gap-4">
                  <button
                    className="px-4 py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white font-semibold shadow"
                    onClick={handleLogout}
                  >
                    Yes, Logout
                  </button>
                  <button
                    className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold shadow"
                    onClick={() => setShowLogoutModal(false)}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}
          <div role="tablist" aria-label="Profile sections" className="flex flex-col gap-2">
            {tabs.map((tab, idx) => (
              <button
                key={tab.key}
                id={`tab-${tab.key}`}
                role="tab"
                aria-selected={activeTab === tab.key}
                aria-controls={`tabpanel-${tab.key}`}
                tabIndex={activeTab === tab.key ? 0 : -1}
                onClick={() => setActiveTab(tab.key)}
                onKeyDown={e => {
                  if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
                    e.preventDefault();
                    setActiveTab(tabs[(idx + 1) % tabs.length].key);
                  } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
                    e.preventDefault();
                    setActiveTab(tabs[(idx - 1 + tabs.length) % tabs.length].key);
                  }
                }}
                className={`text-left px-4 py-2 rounded-lg font-semibold text-base flex items-center gap-2 transition-all duration-200
                  ${activeTab === tab.key ? 'bg-gradient-to-r from-green-500 to-green-400 text-white shadow-lg scale-105' : 'text-green-900 hover:bg-green-100 hover:scale-105'}`}
              >
                {/* Icon placeholder for future enhancement */}
                <span className="inline-block w-2 h-2 rounded-full mr-2" style={{ background: activeTab === tab.key ? '#fff' : '#22c55e', opacity: activeTab === tab.key ? 1 : 0.3 }}></span>
                {tab.label}
              </button>
            ))}
          </div>
        </div>
        {/* Main Content */}
        <div className="flex-1 p-10 bg-white/80 rounded-r-2xl shadow-xl min-h-[80vh] flex flex-col overflow-y-auto transition-all duration-300">
          {renderTabContent()}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
