import React from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const stats = [
    { label: 'Total Donations', value: '$12,450' },
    { label: 'Campaigns Supported', value: '8' },
    { label: 'Impact Lives', value: '1,240' },
    { label: 'Volunteer Hours', value: '156' }
  ];

  const recentActivities = [
    {
      id: 1,
      type: 'Donation',
      description: 'You donated $100 to Emergency Relief for Yemen',
      date: '2 days ago'
    },
    {
      id: 2,
      type: 'Registration',
      description: 'You signed up for the Volunteer Program',
      date: '1 week ago'
    },
    {
      id: 3,
      type: 'Donation',
      description: 'You donated $50 to Water Wells for Somalia',
      date: '2 weeks ago'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-extrabold text-gray-900">Dashboard</h1>
          <p className="mt-2 text-lg text-gray-600">
            Welcome back! Monitor your contributions and impact.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white overflow-hidden shadow rounded-lg p-5">
              <dt className="text-sm font-medium text-gray-500 truncate">{stat.label}</dt>
              <dd className="mt-1 text-3xl font-semibold text-gray-900">{stat.value}</dd>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Activity Section */}
          <div className="lg:col-span-2">
            <div className="bg-white shadow rounded-lg">
              <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
                <h3 className="text-lg font-medium leading-6 text-gray-900">Recent Activity</h3>
              </div>
              <div className="divide-y divide-gray-200">
                {recentActivities.map((activity) => (
                  <div key={activity.id} className="px-4 py-4 sm:px-6">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-primary-600 truncate">
                        {activity.type}
                      </p>
                      <div className="ml-2 flex-shrink-0 flex">
                        <p className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          {activity.date}
                        </p>
                      </div>
                    </div>
                    <div className="mt-2 sm:flex sm:justify-between">
                      <div className="sm:flex">
                        <p className="text-sm text-gray-600">
                          {activity.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="lg:col-span-1">
            <div className="bg-white shadow rounded-lg">
              <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
                <h3 className="text-lg font-medium leading-6 text-gray-900">Quick Actions</h3>
              </div>
              <div className="p-4 space-y-3">
                <Link to="/donate" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700">
                  Make a Donation
                </Link>
                <Link to="/volunteer" className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                  Volunteer
                </Link>
                <Link to="/profile" className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                  Update Profile
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;