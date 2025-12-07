import React from 'react';

/**
 * ContentWorkflow - Draft, review, publish workflow for CMS content.
 * Replace with real workflow logic and API integration.
 */
export default function ContentWorkflow({ status = 'draft', onChange }) {
  const statuses = [
    { value: 'draft', label: 'Draft' },
    { value: 'review', label: 'In Review' },
    { value: 'published', label: 'Published' },
  ];
  return (
    <div className="flex items-center gap-4">
      <span className="font-semibold">Status:</span>
      <select
        value={status}
        onChange={e => onChange && onChange(e.target.value)}
        className="px-2 py-1 border rounded"
      >
        {statuses.map(s => (
          <option key={s.value} value={s.value}>{s.label}</option>
        ))}
      </select>
    </div>
  );
}
