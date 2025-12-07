import React, { useState, useMemo } from 'react';

/**
 * Generic Table component for admin dashboard.
 * @param {Array} columns - [{ key, label, render? }]
 * @param {Array} data - Array of row objects
 * @param {Function} onEdit - Edit handler
 * @param {Function} onDelete - Delete handler
 * @param {Array} filters - [{ key, label, options }]
 */
const Table = ({ columns, data, onEdit, onDelete, filters = [] }) => {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [filterValues, setFilterValues] = useState({});

  // Filtering
  const filteredData = useMemo(() => {
    let filtered = data;
    if (search) {
      filtered = filtered.filter(row =>
        columns.some(col =>
          String(row[col.key] || '').toLowerCase().includes(search.toLowerCase())
        )
      );
    }
    filters.forEach(f => {
      if (filterValues[f.key]) {
        filtered = filtered.filter(row => String(row[f.key]) === String(filterValues[f.key]));
      }
    });
    return filtered;
  }, [data, search, filterValues, filters, columns]);

  // Pagination
  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const paginatedData = useMemo(() =>
    filteredData.slice((page - 1) * rowsPerPage, page * rowsPerPage),
    [filteredData, page, rowsPerPage]
  );

  const handleFilterChange = (key, value) => {
    setFilterValues(prev => ({ ...prev, [key]: value }));
    setPage(1);
  };

  return (
    <div>
      <div className="flex flex-wrap items-center gap-2 mb-4">
        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={e => { setSearch(e.target.value); setPage(1); }}
          className="px-3 py-2 border rounded w-48"
        />
        {filters.map(f => (
          <select
            key={f.key}
            value={filterValues[f.key] || ''}
            onChange={e => handleFilterChange(f.key, e.target.value)}
            className="px-3 py-2 border rounded"
          >
            <option value="">All {f.label}</option>
            {f.options.map(opt => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
        ))}
      </div>
      <div className="overflow-x-auto rounded-lg shadow">
        <table className="min-w-full bg-white dark:bg-gray-800">
          <thead>
            <tr>
              {columns.map(col => (
                <th key={col.key} className="px-4 py-2 text-left text-xs font-semibold text-gray-700 dark:text-gray-200 uppercase tracking-wider">
                  {col.label}
                </th>
              ))}
              {(onEdit || onDelete) && <th className="px-4 py-2">Actions</th>}
            </tr>
          </thead>
          <tbody>
            {paginatedData.map(row => (
              <tr key={row._id || row.id} className="border-b border-gray-200 dark:border-gray-700">
                {columns.map(col => (
                  <td key={col.key} className="px-4 py-2 whitespace-nowrap">
                    {col.render ? col.render(row) : row[col.key]}
                  </td>
                ))}
                {(onEdit || onDelete) && (
                  <td className="px-4 py-2">
                    {onEdit && <button className="text-blue-600 mr-2" onClick={() => onEdit(row)}>Edit</button>}
                    {onDelete && <button className="text-red-600" onClick={() => onDelete(row)}>Delete</button>}
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Pagination Controls */}
      <div className="flex items-center justify-between mt-4">
        <div>
          Rows per page:
          <select
            value={rowsPerPage}
            onChange={e => { setRowsPerPage(Number(e.target.value)); setPage(1); }}
            className="ml-2 px-2 py-1 border rounded"
          >
            {[10, 20, 50, 100].map(n => <option key={n} value={n}>{n}</option>)}
          </select>
        </div>
        <div>
          <button disabled={page === 1} onClick={() => setPage(p => Math.max(1, p - 1))} className="px-2 py-1 mx-1 border rounded disabled:opacity-50">Prev</button>
          <span>Page {page} of {totalPages || 1}</span>
          <button disabled={page === totalPages || totalPages === 0} onClick={() => setPage(p => Math.min(totalPages, p + 1))} className="px-2 py-1 mx-1 border rounded disabled:opacity-50">Next</button>
        </div>
      </div>
    </div>
  );
};

export default Table;
