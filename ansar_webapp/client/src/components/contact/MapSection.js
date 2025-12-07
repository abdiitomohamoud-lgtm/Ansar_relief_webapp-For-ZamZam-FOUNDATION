import React from 'react';

const MapSection = ({ location }) => (
  <div className="rounded-xl overflow-hidden shadow-lg mt-8">
    <iframe
      src={`https://maps.google.com/maps?q=${location.lat},${location.lng}&z=15&output=embed`}
      width="100%"
      height="300"
      frameBorder="0"
      style={{ border: 0 }}
      allowFullScreen=""
      aria-hidden="false"
      tabIndex="0"
      title="Office Location"
    />
  </div>
);

export default MapSection;
