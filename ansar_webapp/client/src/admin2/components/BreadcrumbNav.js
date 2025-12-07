import React from 'react';

/**
 * BreadcrumbNav - Auto-generated navigation breadcrumbs for admin dashboard.
 * Replace with real route integration.
 */
export default function BreadcrumbNav({ items = [] }) {
  if (!items.length) return null;
  return (
    <nav className="flex items-center text-sm text-gray-500 dark:text-gray-300 py-2" aria-label="Breadcrumb">
      {items.map((item, idx) => (
        <span key={item.to || item.label}>
          {idx > 0 && <span className="mx-2">/</span>}
          {item.to ? (
            <a href={item.to} className="hover:underline text-primary-600 dark:text-primary-300">{item.label}</a>
          ) : (
            <span>{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}
