import React from 'react';

/**
 * Generic Modal component for admin dashboard.
 * @param {Boolean} open - Show/hide modal
 * @param {Function} onClose - Close handler
 * @param {String} title - Modal title
 * @param {ReactNode} children - Modal content
 */
const Modal = ({ open, onClose, title, children }) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 w-full max-w-md relative">
        <button className="absolute top-2 right-2 text-gray-400 hover:text-gray-700" onClick={onClose}>&times;</button>
        {title && <h3 className="text-lg font-bold mb-4">{title}</h3>}
        {children}
      </div>
    </div>
  );
};

export default Modal;
