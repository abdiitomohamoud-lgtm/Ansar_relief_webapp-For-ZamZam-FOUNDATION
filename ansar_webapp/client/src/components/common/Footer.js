import React from 'react';

const Footer = () => (
  <footer className="w-full bg-white border-t border-gray-200 py-6 px-8 text-center text-gray-500 mt-auto">
    <div className="mb-2">
      &copy; {new Date().getFullYear()} Ansar Humanitarian Relief. All rights reserved.
    </div>
    <div className="space-x-4">
      <a href="/privacy-policy" className="hover:text-primary-600">Privacy Policy</a>
      <a href="/terms-of-service" className="hover:text-primary-600">Terms of Service</a>
      <a href="/contact" className="hover:text-primary-600">Contact</a>
    </div>
  </footer>
);

export default Footer;
