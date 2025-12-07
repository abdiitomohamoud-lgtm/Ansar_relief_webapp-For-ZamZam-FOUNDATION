
import React from 'react';
import { useRole } from '../hooks/useRole';

// Placeholder for user profile (replace with real user data)
function UserProfile() {
  // In production, pull from Redux or AuthContext
  return (
    <div className="flex items-center gap-2">
      <img
        src="/images/avatars/default.png"
        alt="User Avatar"
        className="w-8 h-8 rounded-full border border-gray-300 dark:border-gray-600"
      />
      <span className="hidden md:inline text-sm font-medium">Admin User</span>
    </div>
  );
}

export default function Topbar() {
  const role = useRole();
  return (
    <header className="w-full h-16 flex items-center justify-between px-4 md:px-6 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 shadow-sm">
      <div className="flex items-center gap-4">
        <span className="font-bold text-lg text-primary-700 dark:text-primary-200">Admin Dashboard</span>
        {/* Global search placeholder */}
        <input
          type="text"
          placeholder="Search..."
          className="hidden md:block px-2 py-1 rounded border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
          aria-label="Global Search"
        />
      </div>
      <div className="flex items-center gap-4">
        {/* Notification badge placeholder */}
        <button className="relative p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 focus:outline-none" aria-label="Notifications">
          <span role="img" aria-label="bell">🔔</span>
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full px-1">3</span>
        </button>
        {/* Quick actions placeholder */}
        <button className="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 focus:outline-none" aria-label="Quick Actions">
          <span role="img" aria-label="lightning">⚡</span>
        </button>
        {/* User profile */}
        <UserProfile />
        {/* Role indicator */}
        <span className="hidden md:inline text-xs text-gray-600 dark:text-gray-300" aria-label="Current Role">{role}</span>
      </div>
    </header>
  );
}
