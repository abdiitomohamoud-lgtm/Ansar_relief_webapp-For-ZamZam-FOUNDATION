import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaTachometerAlt, FaUsers, FaBoxOpen, FaComments, FaCog, FaListAlt, FaHandsHelping } from 'react-icons/fa';

const navItems = [
  { to: '/admin', label: 'Dashboard', icon: <FaTachometerAlt /> },
  { to: '/admin/users', label: 'Users', icon: <FaUsers /> },
  { to: '/admin/content', label: 'Content', icon: <FaBoxOpen /> },
  { to: '/admin/categories', label: 'Categories', icon: <FaListAlt /> },
  { to: '/admin/volunteers', label: 'Volunteers', icon: <FaHandsHelping /> },
  { to: '/admin/messages', label: 'Messages', icon: <FaComments /> },
  { to: '/admin/settings', label: 'Settings', icon: <FaCog /> },
];

const Sidebar = () => (
  <aside className="w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col min-h-screen">
    <div className="h-16 flex items-center justify-center font-bold text-xl text-primary-600 dark:text-primary-300 border-b border-gray-200 dark:border-gray-700">
      Admin Panel
    </div>
    <nav className="flex-1 py-4">
      {navItems.map(item => (
        <NavLink
          key={item.to}
          to={item.to}
          className={({ isActive }) =>
            `flex items-center px-6 py-3 text-base font-medium transition-colors rounded-lg mb-2 ${
              isActive ? 'bg-primary-100 text-primary-700 dark:bg-primary-900 dark:text-primary-200' : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700'
            }`
          }
        >
          <span className="mr-3 text-lg">{item.icon}</span>
          {item.label}
        </NavLink>
      ))}
    </nav>
  </aside>
);

export default Sidebar;
