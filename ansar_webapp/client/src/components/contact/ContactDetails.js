import React from 'react';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaClock } from 'react-icons/fa';

const ContactDetails = ({ details }) => (
  <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
    <h2 className="text-xl font-bold mb-4 flex items-center gap-2"><FaEnvelope /> Contact Details</h2>
    <div className="space-y-2">
      <div><FaEnvelope /> {details.email}</div>
      <div><FaPhone /> {details.phone}</div>
      <div><FaMapMarkerAlt /> {details.address}</div>
      <div><FaClock /> {details.hours}</div>
    </div>
  </div>
);

export default ContactDetails;
