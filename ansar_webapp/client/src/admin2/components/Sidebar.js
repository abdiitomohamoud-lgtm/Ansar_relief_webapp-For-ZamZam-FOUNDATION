
import React, { useState, useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useRole } from '../hooks/useRole';

// Example dynamic menu config (extend as needed)
const MENU_CONFIG = [
  {
    label: 'Dashboard',
    to: '/admin2/dashboard',
    icon: '📊',
    roles: ['admin', 'manager', 'editor', 'viewer'],
  },
  {
    label: 'Content',
    icon: '📝',
    roles: ['admin', 'editor'],
    children: [
      { label: 'Pages', to: '/admin2/pages', roles: ['admin', 'editor'] },
      { label: 'Media Library', to: '/admin2/media', roles: ['admin', 'editor'] },
    ],
  },
  {
    label: 'Users',
    to: '/admin2/users',
    icon: '👤',
    roles: ['admin', 'manager'],
  },
  {
    label: 'Roles',
    to: '/admin2/roles',
    icon: '🔑',
    roles: ['admin'],
  },
  {
    label: 'Settings',
    to: '/admin2/settings',
    icon: '⚙️',
    roles: ['admin', 'manager', 'editor'],
  },
];

function filterMenuByRole(menu, role) {
  return menu
    .filter(item => item.roles.includes(role))
    .map(item =>
      item.children
        ? { ...item, children: filterMenuByRole(item.children, role) }
        : item
    );
}

export default function Sidebar() {
  const role = useRole();
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(() => {
    // Persist sidebar state in localStorage
    return localStorage.getItem('admin2_sidebar_collapsed') === 'true';
  });
  const [search, setSearch] = useState('');

  // Filter menu by role and search
  const menu = useMemo(() => {
    let filtered = filterMenuByRole(MENU_CONFIG, role);
    if (search) {
      const searchLower = search.toLowerCase();
      const filterRecursive = items =>
        items
          .map(item => {
            if (item.children) {
              const children = filterRecursive(item.children);
              if (children.length > 0 || item.label.toLowerCase().includes(searchLower)) {
                return { ...item, children };
              }
              return null;
            }
            return item.label.toLowerCase().includes(searchLower) ? item : null;
          })
          .filter(Boolean);
      filtered = filterRecursive(filtered);
    }
    return filtered;
  }, [role, search]);

  // Persist collapse state
  const toggleCollapse = () => {
    setCollapsed(c => {
      localStorage.setItem('admin2_sidebar_collapsed', !c);
      return !c;
    });
  };

  // Recursive menu rendering
  const renderMenu = items => (
    <ul className="py-2">
      {items.map(item => (
        <li key={item.to || item.label}>
          {item.to ? (
            <Link
              to={item.to}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-base font-medium focus:outline-none focus:ring-2 focus:ring-primary-500 transition-colors ${location.pathname === item.to ? 'bg-primary-100 dark:bg-primary-700 text-primary-800 dark:text-primary-100' : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700'}`}
              aria-current={location.pathname === item.to ? 'page' : undefined}
            >
              <span>{item.icon}</span>
              {!collapsed && <span>{item.label}</span>}
            </Link>
          ) : (
            <div className="flex items-center gap-2 px-4 py-2 text-gray-500 dark:text-gray-400 select-none">
              <span>{item.icon}</span>
              {!collapsed && <span>{item.label}</span>}
            </div>
          )}
          {item.children && !collapsed && (
            <div className="ml-4 border-l border-gray-200 dark:border-gray-700">
              {renderMenu(item.children)}
            </div>
          )}
        </li>
      ))}
    </ul>
  );

  return (
    <nav
      className={`transition-all duration-200 ${collapsed ? 'w-16' : 'w-56'} bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 min-h-full flex flex-col`}
      aria-label="Sidebar"
    >
      <div className="flex items-center justify-between px-4 py-2">
        {!collapsed && <span className="font-bold text-lg">Admin</span>}
        <button
          onClick={toggleCollapse}
          className="p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700 focus:outline-none"
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {collapsed ? '➡️' : '⬅️'}
        </button>
      </div>
      <div className="px-2 pb-2">
        <input
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search menu..."
          className="w-full px-2 py-1 rounded border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
        />
      </div>
      <div className="flex-1 overflow-y-auto">
        {renderMenu(menu)}
      </div>
    </nav>
  );
}
