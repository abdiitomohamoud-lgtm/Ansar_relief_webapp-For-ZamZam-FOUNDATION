import React from 'react';
import { FaMoon, FaSun, FaUserCircle } from 'react-icons/fa';

const Topbar = () => {
  // TODO: Add dark mode toggle, notifications, user menu
  return (
    <header className="h-16 flex items-center justify-between px-6 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
      <div className="font-semibold text-lg text-primary-700 dark:text-primary-200">Admin Dashboard</div>
      <div className="flex items-center gap-4">
        <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800">
          <FaMoon className="hidden dark:inline text-xl" />
          <FaSun className="inline dark:hidden text-xl" />
        </button>
        <button className="flex items-center gap-2 p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800">
          <FaUserCircle className="text-2xl" />
          <span className="hidden md:inline">Admin</span>
        </button>
      </div>
    </header>
  );
};

export default Topbar;
