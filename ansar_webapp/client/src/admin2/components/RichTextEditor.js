import React from 'react';

/**
 * RichTextEditor - WYSIWYG editor for CMS content creation.
 * Replace with your preferred editor (e.g., TinyMCE, Slate, TipTap).
 */
export default function RichTextEditor({ value, onChange }) {
  // Placeholder: Replace with real editor integration
  return (
    <textarea
      className="w-full min-h-[200px] p-2 border rounded bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100"
      value={value}
      onChange={e => onChange(e.target.value)}
      placeholder="Write your content here..."
      aria-label="Rich Text Editor"
    />
  );
}
