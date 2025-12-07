import React from 'react';

/**
 * AdminDataTable - Advanced data table for CMS with inline editing, sorting, filtering, and bulk actions.
 * Replace with a real data grid (e.g., MUI DataGrid, AG Grid) for production.
 */
export default function AdminDataTable({ columns, data, onEdit, onDelete, onBulkAction }) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border rounded bg-white dark:bg-gray-900">
        <thead>
          <tr>
            {columns.map(col => (
              <th key={col.key} className="px-3 py-2 border-b text-left text-xs font-semibold text-gray-700 dark:text-gray-200">{col.label}</th>
            ))}
            <th className="px-3 py-2 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map(row => (
            <tr key={row.id} className="hover:bg-gray-50 dark:hover:bg-gray-800">
              {columns.map(col => (
                <td key={col.key} className="px-3 py-2 border-b text-sm">{row[col.key]}</td>
              ))}
              <td className="px-3 py-2 border-b">
                <button className="text-blue-600 hover:underline mr-2" onClick={() => onEdit && onEdit(row)}>Edit</button>
                <button className="text-red-600 hover:underline" onClick={() => onDelete && onDelete(row)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Bulk actions placeholder */}
      {onBulkAction && (
        <button className="mt-2 px-3 py-1 bg-primary-600 text-white rounded" onClick={onBulkAction}>
          Bulk Action
        </button>
      )}
    </div>
  );
}
