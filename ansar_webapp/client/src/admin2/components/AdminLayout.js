
import React from 'react';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
// Placeholder imports for future CMS features
// import NotificationCenter from './NotificationCenter';
// import ThemeProvider from '../utils/ThemeProvider';
// import BreadcrumbNav from './BreadcrumbNav';

/**
 * AdminLayout - Responsive, CMS-ready admin dashboard layout.
 * Includes Sidebar, Topbar, NotificationCenter, ThemeProvider, BreadcrumbNav.
 */
export default function AdminLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      {/* ThemeProvider can wrap the entire layout for theme switching */}
      {/* <ThemeProvider> */}
      <Topbar />
      {/* <NotificationCenter /> */}
      {/* <BreadcrumbNav /> */}
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-4 md:p-8 overflow-y-auto" tabIndex={-1} aria-label="Main Content">
          {children}
        </main>
      </div>
      {/* </ThemeProvider> */}
    </div>
  );
}
