import React from 'react';

/**
 * BulkOperations - Mass content actions for CMS (delete, publish, etc.).
 * Replace with real selection and API logic.
 */
export default function BulkOperations({ onBulkDelete, onBulkPublish }) {
  return (
    <div className="flex gap-2 mt-2">
      <button className="px-3 py-1 bg-red-600 text-white rounded" onClick={onBulkDelete}>Bulk Delete</button>
      <button className="px-3 py-1 bg-green-600 text-white rounded" onClick={onBulkPublish}>Bulk Publish</button>
    </div>
  );
}
