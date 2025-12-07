import React from 'react';
import Sidebar from './Sidebar';
import Topbar from './Topbar';

/**
 * AdminLayout wraps all admin pages with sidebar and topbar.
 */
const AdminLayout = ({ children }) => (
  <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
    <Sidebar />
    <div className="flex-1 flex flex-col">
      <Topbar />
      <main className="flex-1 p-4 md:p-8">{children}</main>
    </div>
  </div>
);

export default AdminLayout;
