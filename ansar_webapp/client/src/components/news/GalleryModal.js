import React from 'react';

const GalleryModal = ({ open, images, index, onClose }) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80">
      <button
        className="absolute top-4 right-4 text-white text-3xl font-bold z-60"
        onClick={onClose}
        aria-label="Close"
      >
        &times;
      </button>
      <img
        src={images[index]}
        alt={`Gallery Full ${index + 1}`}
        className="max-h-[80vh] max-w-[90vw] rounded-xl shadow-2xl border-4 border-white"
      />
    </div>
  );
};

export default GalleryModal;
