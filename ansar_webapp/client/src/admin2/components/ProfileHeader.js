import React from 'react';

/**
 * ProfileHeader - User profile display and quick actions for admin dashboard.
 * Extend with user analytics, session management, and security controls.
 */
export default function ProfileHeader({ user }) {
  return (
    <div className="flex items-center gap-4 p-4 bg-white dark:bg-gray-900 rounded shadow">
      <img
        src={user?.avatar || '/images/avatars/default.png'}
        alt="User Avatar"
        className="w-16 h-16 rounded-full border border-gray-300 dark:border-gray-600"
      />
      <div>
        <div className="font-bold text-lg">{user?.name || 'Admin User'}</div>
        <div className="text-sm text-gray-500">{user?.email || 'admin@example.com'}</div>
        <div className="text-xs text-primary-700 dark:text-primary-300 font-semibold mt-1">Role: {user?.role || 'admin'}</div>
        {/* Add quick actions, analytics, session controls here */}
      </div>
    </div>
  );
}
