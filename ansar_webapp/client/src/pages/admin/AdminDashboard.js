import React from 'react';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  // Normally this data would come from API calls
  const stats = [
    { name: 'Total Donations', value: '$25,634', change: '+12.5%', changeType: 'positive' },
    { name: 'Active Campaigns', value: '16', change: '+2', changeType: 'positive' },
    { name: 'Active Users', value: '1,283', change: '+8.1%', changeType: 'positive' },
    { name: 'Pending Approvals', value: '5', change: '-2', changeType: 'negative' },
  ];

  const recentDonations = [
    { id: 1, donor: 'John Smith', amount: '$250.00', campaign: 'Water for All', date: '2023-09-15' },
    { id: 2, donor: 'Sarah Johnson', amount: '$100.00', campaign: 'Orphan Support', date: '2023-09-14' },
    { id: 3, donor: 'Ahmed Hassan', amount: '$500.00', campaign: 'Mosque Renovation', date: '2023-09-14' },
    { id: 4, donor: 'Fatima Ali', amount: '$75.00', campaign: 'Emergency Relief', date: '2023-09-13' },
    { id: 5, donor: 'Michael Brown', amount: '$150.00', campaign: 'Education Fund', date: '2023-09-12' },
  ];

  const pendingApprovals = [
    { id: 1, type: 'Campaign', name: 'Winter Relief 2023', submittedBy: 'Admin Team', date: '2023-09-10' },
    { id: 2, type: 'Mosque', name: 'Al-Nur Mosque Repairs', submittedBy: 'Mosque Committee', date: '2023-09-09' },
    { id: 3, type: 'Blog Post', name: 'Impact of Your Donations', submittedBy: 'Content Team', date: '2023-09-08' },
    { id: 4, type: 'Event', name: 'Annual Fundraising Dinner', submittedBy: 'Events Team', date: '2023-09-07' },
    { id: 5, type: 'Orphan Profile', name: 'Ahmed (ID: 12346)', submittedBy: 'Field Team', date: '2023-09-06' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="md:flex md:items-center md:justify-between">
        <div className="flex-1 min-w-0">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
            Admin Dashboard
          </h2>
        </div>
        <div className="mt-4 flex md:mt-0 md:ml-4">
          <Link
            to="/admin/reports"
            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
          >
            Reports
          </Link>
          <Link
            to="/admin/campaigns/new"
            className="ml-3 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
          >
            Create Campaign
          </Link>
        </div>
      </div>

      {/* Stats */}
      <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.name} className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className={`h-10 w-10 rounded-full flex items-center justify-center ${stat.changeType === 'positive' ? 'bg-green-100' : 'bg-red-100'}`}>
                    {stat.changeType === 'positive' ? (
                      <svg className="h-6 w-6 text-green-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                      </svg>
                    ) : (
                      <svg className="h-6 w-6 text-red-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                      </svg>
                    )}
                  </div>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dt className="text-sm font-medium text-gray-500 truncate">{stat.name}</dt>
                  <dd className="flex items-baseline">
                    <div className="text-2xl font-semibold text-gray-900">{stat.value}</div>
                    <div className={`ml-2 flex items-baseline text-sm font-semibold ${stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'}`}>
                      {stat.change}
                    </div>
                  </dd>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 grid grid-cols-1 gap-5 lg:grid-cols-2">
        {/* Recent Donations */}
        <div className="bg-white shadow rounded-lg">
          <div className="px-4 py-5 border-b border-gray-200 sm:px-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Recent Donations
            </h3>
          </div>
          <div className="p-4 sm:p-6">
            <div className="flow-root">
              <ul className="-my-5 divide-y divide-gray-200">
                {recentDonations.map((donation) => (
                  <li key={donation.id} className="py-4">
                    <div className="flex items-center space-x-4">
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {donation.donor}
                        </p>
                        <p className="text-sm text-gray-500 truncate">
                          {donation.campaign}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-900">
                          {donation.amount}
                        </p>
                        <p className="text-sm text-gray-500">
                          {new Date(donation.date).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-6">
              <Link
                to="/admin/donations"
                className="w-full flex justify-center items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
              >
                View all
              </Link>
            </div>
          </div>
        </div>

        {/* Pending Approvals */}
        <div className="bg-white shadow rounded-lg">
          <div className="px-4 py-5 border-b border-gray-200 sm:px-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Pending Approvals
            </h3>
          </div>
          <div className="p-4 sm:p-6">
            <div className="flow-root">
              <ul className="-my-5 divide-y divide-gray-200">
                {pendingApprovals.map((item) => (
                  <li key={item.id} className="py-4">
                    <div className="flex items-center space-x-4">
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {item.name}
                        </p>
                        <p className="text-sm text-gray-500 truncate">
                          {item.type} • Submitted by {item.submittedBy}
                        </p>
                      </div>
                      <div>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                          Pending
                        </span>
                        <p className="text-sm text-gray-500 mt-1">
                          {new Date(item.date).toLocaleDateString()}
                        </p>
                      </div>
                      <div>
                        <button
                          type="button"
                          className="inline-flex items-center p-1 border border-transparent rounded-full text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                        >
                          <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-6">
              <Link
                to="/admin/approvals"
                className="w-full flex justify-center items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
              >
                View all
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-8">
        <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
          Quick Actions
        </h3>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          <Link
            to="/admin/campaigns"
            className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow duration-300"
          >
            <div className="flex items-center">
              <div className="flex-shrink-0 h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center">
                <svg className="h-6 w-6 text-primary-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <div className="ml-4">
                <h4 className="text-base font-medium text-gray-900">Manage Campaigns</h4>
                <p className="text-sm text-gray-500">Edit, create, and monitor campaigns</p>
              </div>
            </div>
          </Link>

          <Link
            to="/admin/users"
            className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow duration-300"
          >
            <div className="flex items-center">
              <div className="flex-shrink-0 h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center">
                <svg className="h-6 w-6 text-primary-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <div className="ml-4">
                <h4 className="text-base font-medium text-gray-900">Manage Users</h4>
                <p className="text-sm text-gray-500">View and manage user accounts</p>
              </div>
            </div>
          </Link>

          <Link
            to="/admin/content"
            className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow duration-300"
          >
            <div className="flex items-center">
              <div className="flex-shrink-0 h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center">
                <svg className="h-6 w-6 text-primary-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </div>
              <div className="ml-4">
                <h4 className="text-base font-medium text-gray-900">Content Management</h4>
                <p className="text-sm text-gray-500">Edit site content and blog</p>
              </div>
            </div>
          </Link>

          <Link
            to="/admin/settings"
            className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow duration-300"
          >
            <div className="flex items-center">
              <div className="flex-shrink-0 h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center">
                <svg className="h-6 w-6 text-primary-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div className="ml-4">
                <h4 className="text-base font-medium text-gray-900">Site Settings</h4>
                <p className="text-sm text-gray-500">Configure site preferences</p>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard; 