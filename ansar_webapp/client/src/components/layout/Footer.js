import React from 'react';
import { Link } from 'react-router-dom';
import { 
  FaFacebookF, 
  FaTwitter, 
  FaInstagram, 
  FaYoutube, 
  FaLinkedinIn,
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
  FaGlobe,
  FaHeart,
  FaArrowRight
} from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* About Column */}
          <div>
            <div className="flex items-center mb-4">
              <img src="/images/logo-white.png" alt="Ansar Logo" className="h-10 mr-3" />
              <h3 className="text-xl font-bold">Ansar</h3>
            </div>
            <p className="text-gray-400 mb-6">
              Empowering communities through humanitarian aid, education, and sustainable development projects worldwide.
            </p>
            <div className="flex space-x-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="bg-gray-800 hover:bg-primary-600 h-10 w-10 rounded-full flex items-center justify-center transition-colors">
                <FaFacebookF />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="bg-gray-800 hover:bg-primary-600 h-10 w-10 rounded-full flex items-center justify-center transition-colors">
                <FaTwitter />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="bg-gray-800 hover:bg-primary-600 h-10 w-10 rounded-full flex items-center justify-center transition-colors">
                <FaInstagram />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="bg-gray-800 hover:bg-primary-600 h-10 w-10 rounded-full flex items-center justify-center transition-colors">
                <FaYoutube />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4 border-b border-gray-700 pb-2">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-gray-400 hover:text-white transition-colors flex items-center">
                  <FaArrowRight className="mr-2 text-xs" />
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/campaigns" className="text-gray-400 hover:text-white transition-colors flex items-center">
                  <FaArrowRight className="mr-2 text-xs" />
                  Our Campaigns
                </Link>
              </li>
              <li>
                <Link to="/donate" className="text-gray-400 hover:text-white transition-colors flex items-center">
                  <FaArrowRight className="mr-2 text-xs" />
                  Donate Now
                </Link>
              </li>
              <li>
                <Link to="/volunteer" className="text-gray-400 hover:text-white transition-colors flex items-center">
                  <FaArrowRight className="mr-2 text-xs" />
                  Become a Volunteer
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-white transition-colors flex items-center">
                  <FaArrowRight className="mr-2 text-xs" />
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/privacy-policy" className="text-gray-400 hover:text-white transition-colors flex items-center">
                  <FaArrowRight className="mr-2 text-xs" />
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Campaigns */}
          <div>
            <h4 className="text-lg font-semibold mb-4 border-b border-gray-700 pb-2">Our Campaigns</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/campaigns/water" className="text-gray-400 hover:text-white transition-colors flex items-center">
                  <FaArrowRight className="mr-2 text-xs" />
                  Water Projects
                </Link>
              </li>
              <li>
                <Link to="/campaigns/education" className="text-gray-400 hover:text-white transition-colors flex items-center">
                  <FaArrowRight className="mr-2 text-xs" />
                  Education Support
                </Link>
              </li>
              <li>
                <Link to="/campaigns/orphans" className="text-gray-400 hover:text-white transition-colors flex items-center">
                  <FaArrowRight className="mr-2 text-xs" />
                  Orphan Sponsorship
                </Link>
              </li>
              <li>
                <Link to="/campaigns/food" className="text-gray-400 hover:text-white transition-colors flex items-center">
                  <FaArrowRight className="mr-2 text-xs" />
                  Food Security
                </Link>
              </li>
              <li>
                <Link to="/campaigns/emergency" className="text-gray-400 hover:text-white transition-colors flex items-center">
                  <FaArrowRight className="mr-2 text-xs" />
                  Emergency Relief
                </Link>
              </li>
              <li>
                <Link to="/campaigns/healthcare" className="text-gray-400 hover:text-white transition-colors flex items-center">
                  <FaArrowRight className="mr-2 text-xs" />
                  Healthcare Access
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4 border-b border-gray-700 pb-2">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex">
                <FaMapMarkerAlt className="text-primary-500 mt-1 mr-3 flex-shrink-0" />
                <span className="text-gray-400">
                  123 Charity Street, Doha, Qatar
                </span>
              </li>
              <li className="flex">
                <FaPhone className="text-primary-500 mt-1 mr-3 flex-shrink-0" />
                <span className="text-gray-400">
                  +974 1234 5678
                </span>
              </li>
              <li className="flex">
                <FaEnvelope className="text-primary-500 mt-1 mr-3 flex-shrink-0" />
                <span className="text-gray-400">
                  info@ansarrelief.org
                </span>
              </li>
              <li className="flex">
                <FaGlobe className="text-primary-500 mt-1 mr-3 flex-shrink-0" />
                <span className="text-gray-400">
                  www.ansarrelief.org
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Newsletter */}
        <div className="bg-gray-800 rounded-lg p-6 mb-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
            <div className="md:col-span-2">
              <h4 className="text-xl font-semibold mb-2">Subscribe to Our Newsletter</h4>
              <p className="text-gray-400">Stay updated with our latest campaigns and impact stories</p>
            </div>
            <div>
              <form className="flex">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="flex-grow px-4 py-2 rounded-l-lg focus:outline-none text-gray-900"
                />
                <button
                  type="submit"
                  className="bg-primary-600 hover:bg-primary-700 px-4 py-2 rounded-r-lg transition-colors"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm mb-4 md:mb-0">
              &copy; {currentYear} Ansar Relief. All rights reserved.
            </p>
            <div className="flex items-center">
              <span className="text-gray-500 text-sm mr-2">Made with</span>
              <FaHeart className="text-primary-600 mx-1" />
              <span className="text-gray-500 text-sm">for humanity</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 