import React from 'react';

const DashboardOverview = () => {
  // TODO: Fetch analytics, stats, and recent activity from API
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Dashboard Overview</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Example stat cards */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div className="text-3xl font-bold text-primary-600">123</div>
          <div className="text-gray-500">Total Users</div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div className="text-3xl font-bold text-primary-600">45</div>
          <div className="text-gray-500">Active Campaigns</div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div className="text-3xl font-bold text-primary-600">$12,345</div>
          <div className="text-gray-500">Total Donations</div>
        </div>
      </div>
      {/* TODO: Add charts, recent activity, etc. */}
    </div>
  );
};

export default DashboardOverview;
