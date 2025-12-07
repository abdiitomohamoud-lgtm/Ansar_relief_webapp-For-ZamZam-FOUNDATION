import React from 'react';

/**
 * RoleAssigner - Assign roles and permissions to users.
 * Replace with real permission matrix and API integration.
 */
export default function RoleAssigner({ user, onAssign }) {
  return (
    <div className="space-y-2">
      <div className="font-semibold">Assign Role for {user?.name || 'User'}</div>
      <select
        className="w-full px-2 py-1 border rounded"
        value={user?.role || 'viewer'}
        onChange={e => onAssign && onAssign(e.target.value)}
      >
        <option value="admin">Admin</option>
        <option value="manager">Manager</option>
        <option value="editor">Editor</option>
        <option value="viewer">Viewer</option>
      </select>
    </div>
  );
}
