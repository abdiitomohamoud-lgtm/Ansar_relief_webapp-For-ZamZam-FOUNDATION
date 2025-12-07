import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => (
  <nav className="w-full bg-white shadow-md py-4 px-8 flex items-center justify-between fixed top-0 left-0 z-50">
    <Link to="/" className="text-2xl font-bold text-primary-600">Ansar</Link>
    <div className="flex items-center space-x-6">
      <Link to="/about" className="text-gray-700 hover:text-primary-600 transition">About</Link>
      <Link to="/projects" className="text-gray-700 hover:text-primary-600 transition">Projects</Link>
      <Link to="/contact" className="text-gray-700 hover:text-primary-600 transition">Contact</Link>
      <Link to="/login" className="bg-primary-600 text-white px-4 py-2 rounded hover:bg-primary-700 transition">Login</Link>
    </div>
  </nav>
);

export default Navbar;
