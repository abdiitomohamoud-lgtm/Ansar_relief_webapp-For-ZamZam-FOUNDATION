import React, { useState } from 'react';

/**
 * DashboardGrid - Drag-and-drop widget grid for admin dashboard.
 * Replace with react-grid-layout or similar for production.
 */
const defaultWidgets = [
  { id: 1, name: 'Stats', content: '📊 Stats Widget' },
  { id: 2, name: 'Recent Activity', content: '🕒 Activity Widget' },
  { id: 3, name: 'Quick Actions', content: '⚡ Quick Actions Widget' },
];

export default function DashboardGrid() {
  const [widgets] = useState(defaultWidgets);
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {widgets.map(w => (
        <div key={w.id} className="bg-white dark:bg-gray-800 rounded shadow p-4 flex flex-col items-center justify-center min-h-[120px]">
          <div className="text-2xl mb-2">{w.content}</div>
          <div className="text-sm text-gray-500">{w.name}</div>
        </div>
      ))}
    </div>
  );
}
