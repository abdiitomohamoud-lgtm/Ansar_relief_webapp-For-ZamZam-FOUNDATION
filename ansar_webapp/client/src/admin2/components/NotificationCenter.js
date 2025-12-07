import React from 'react';

/**
 * NotificationCenter - Real-time alerts and notifications for admin dashboard.
 * Replace with real-time data and API integration.
 */
const mockNotifications = [
  { id: 1, message: 'New user registered', time: '1m ago' },
  { id: 2, message: 'Campaign approved', time: '10m ago' },
];

export default function NotificationCenter() {
  return (
    <div className="absolute top-16 right-4 w-80 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded shadow-lg z-50">
      <div className="p-4 font-semibold border-b border-gray-200 dark:border-gray-700">Notifications</div>
      <ul className="divide-y divide-gray-200 dark:divide-gray-700">
        {mockNotifications.map(n => (
          <li key={n.id} className="p-3 text-sm">
            <div>{n.message}</div>
            <div className="text-xs text-gray-500">{n.time}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}
