import React from 'react';

/**
 * ActivityMonitor - Audit log and activity tracking for admin users.
 * Replace with real data source and filtering.
 */
const mockLogs = [
  { id: 1, user: 'admin', action: 'Created campaign', time: '2025-07-27 10:00' },
  { id: 2, user: 'editor', action: 'Edited page', time: '2025-07-27 09:45' },
];

export default function ActivityMonitor() {
  return (
    <div className="space-y-2">
      <div className="font-semibold">Recent Activity</div>
      <ul className="divide-y divide-gray-200 dark:divide-gray-700">
        {mockLogs.map(log => (
          <li key={log.id} className="py-2 text-sm">
            <span className="font-bold">{log.user}</span>: {log.action} <span className="text-xs text-gray-500">({log.time})</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
