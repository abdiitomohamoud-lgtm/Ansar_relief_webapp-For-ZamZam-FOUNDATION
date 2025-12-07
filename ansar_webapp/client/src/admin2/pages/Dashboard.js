
import React from 'react';
import AdminLayout from '../components/AdminLayout';
import DashboardGrid from '../components/DashboardGrid';
import NotificationCenter from '../components/NotificationCenter';
import BreadcrumbNav from '../components/BreadcrumbNav';

/**
 * Dashboard - Production-ready admin dashboard with widgets, notifications, and breadcrumbs.
 */
export default function Dashboard() {
  // Example breadcrumb items
  const breadcrumbs = [
    { label: 'Home', to: '/admin2/dashboard' },
    { label: 'Dashboard' },
  ];
  return (
    <AdminLayout>
      <BreadcrumbNav items={breadcrumbs} />
      <div className="relative">
        <NotificationCenter />
      </div>
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
      <DashboardGrid />
    </AdminLayout>
  );
}
