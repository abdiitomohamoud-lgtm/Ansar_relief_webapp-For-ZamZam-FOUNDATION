import React from 'react';
import { Link } from 'react-router-dom';
import { FaPray } from 'react-icons/fa';

const Header = () => {
  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link to="/" className="flex items-center group">
            <div className="w-10 h-10 bg-primary-600 rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform">
              <FaPray className="text-white text-xl" />
            </div>
            <div className="ml-3">
              <span className="text-xl font-bold text-primary-600 group-hover:text-primary-700 transition-colors">Ansar</span>
              <span className="text-xl font-bold text-gray-700 ml-1">Relief</span>
            </div>
          </Link>
          
          <nav className="flex space-x-8">
            <Link to="/" className="text-gray-500 hover:text-primary-600 px-3 py-2 text-sm font-medium">Home</Link>
            <Link to="/about" className="text-gray-500 hover:text-primary-600 px-3 py-2 text-sm font-medium">About</Link>
            <Link to="/campaigns" className="text-gray-500 hover:text-primary-600 px-3 py-2 text-sm font-medium">Campaigns</Link>
            <Link to="/sponsorships/orphan" className="text-gray-500 hover:text-primary-600 px-3 py-2 text-sm font-medium">Sponsorships</Link>
          </nav>
          
          <div className="flex items-center space-x-4">
            <Link to="/donate" className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700">
              Donate
            </Link>
            <Link to="/login" className="text-primary-600 hover:text-primary-700 px-3 py-2 text-sm font-medium">
              Login
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header; 