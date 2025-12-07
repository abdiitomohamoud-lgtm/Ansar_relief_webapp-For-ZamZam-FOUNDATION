import React, { useState } from 'react';

/**
 * MediaLibrary - Asset management for images and files.
 * Replace with real API integration and cloud storage as needed.
 */
const mockMedia = [
  { id: 1, url: '/images/sample/sample1.jpg', name: 'Sample 1' },
  { id: 2, url: '/images/sample/sample2.jpg', name: 'Sample 2' },
];

export default function MediaLibrary({ onSelect }) {
  const [media] = useState(mockMedia);
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {media.map(item => (
        <button
          key={item.id}
          className="border rounded overflow-hidden focus:ring-2 focus:ring-primary-500"
          onClick={() => onSelect && onSelect(item)}
          aria-label={`Select ${item.name}`}
        >
          <img src={item.url} alt={item.name} className="w-full h-24 object-cover" />
          <div className="p-1 text-xs text-center bg-gray-100 dark:bg-gray-800">{item.name}</div>
        </button>
      ))}
    </div>
  );
}
