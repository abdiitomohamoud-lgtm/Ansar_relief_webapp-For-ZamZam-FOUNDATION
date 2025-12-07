import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const ContactCTA = ({ title, subtitle, buttonText, buttonLink, backgroundImage }) => {
  return (
    <div className="bg-gray-100">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">{title}</h2>
          <p className="text-gray-700 text-lg mb-8">{subtitle}</p>
          <div className="flex flex-col md:flex-row items-center justify-center">
            <Link
              to={buttonLink}
              className="bg-primary-600 hover:bg-primary-700 text-white font-medium py-3 px-6 rounded-md transition-colors duration-200"
            >
              {buttonText}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactCTA; 