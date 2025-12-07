import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
  FaArrowRight
} from 'react-icons/fa';

const QCMemberships = () => {
  const memberships = [
    {
      id: 'dgcso',
      name: 'DGCSO',
      logo: '/images/memberships/dgcso.png',
      description: 'Development & Global Civil Society Organizations'
    },
    {
      id: 'ecosoc',
      name: 'ECOSOC',
      logo: '/images/memberships/ecosoc.png',
      description: 'United Nations Economic and Social Council'
    },
    {
      id: 'start',
      name: 'START Network',
      logo: '/images/memberships/start.png',
      description: 'Global Network of NGOs'
    },
    {
      id: 'dgmalliance',
      name: 'DGM Alliance',
      logo: '/images/memberships/dgmalliance.png',
      description: 'Digital Global Markets Alliance'
    },
    {
      id: 'iom',
      name: 'IOM',
      logo: '/images/memberships/iom.png',
      description: 'International Organization for Migration'
    }
  ];

  const downloadLinks = [
    {
      platform: 'App Store',
      image: '/images/app-store.png',
      url: '#'
    },
    {
      platform: 'Google Play',
      image: '/images/google-play.png',
      url: '#'
    },
    {
      platform: 'Huawei Store',
      image: '/images/huawei-store.png',
      url: '#'
    }
  ];

  const quickLinks = [
    { name: 'About Us', path: '/about' },
    { name: 'Contact Us', path: '/contact' },
    { name: 'Privacy Policy', path: '/privacy' },
    { name: 'Terms & Conditions', path: '/terms' },
    { name: 'Donation Guide', path: '/guide' },
    { name: 'FAQs', path: '/faqs' }
  ];

  const paymentMethods = [
    { name: 'Visa', image: '/images/payments/visa.png' },
    { name: 'Mastercard', image: '/images/payments/mastercard.png' },
    { name: 'American Express', image: '/images/payments/amex.png' },
    { name: 'PayPal', image: '/images/payments/paypal.png' },
    { name: 'Apple Pay', image: '/images/payments/apple-pay.png' },
    { name: 'Google Pay', image: '/images/payments/google-pay.png' }
  ];

  const socialLinks = [
    { name: 'Facebook', icon: FaFacebookF, url: '#' },
    { name: 'Twitter', icon: FaTwitter, url: '#' },
    { name: 'Instagram', icon: FaInstagram, url: '#' },
    { name: 'LinkedIn', icon: FaLinkedinIn, url: '#' },
    { name: 'YouTube', icon: FaYoutube, url: '#' }
  ];

  return (
    <footer className="bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* QC Memberships */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-6">QC Memberships</h3>
            <div className="grid grid-cols-2 gap-4">
              {memberships.map(membership => (
                <motion.div
                  key={membership.id}
                  whileHover={{ scale: 1.05 }}
                  className="bg-gray-800 rounded-lg p-3 flex items-center"
                >
                  <img
                    src={membership.logo}
                    alt={membership.name}
                    className="h-8 w-auto mr-3"
                  />
                  <div>
                    <span className="text-sm font-medium text-white">{membership.name}</span>
                    <span className="text-xs text-gray-400 block">{membership.description}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Download App */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-6">Download Our App</h3>
            <div className="space-y-4">
              {downloadLinks.map(link => (
                <motion.a
                  key={link.platform}
                  href={link.url}
                  whileHover={{ scale: 1.05 }}
                  className="block"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src={link.image}
                    alt={link.platform}
                    className="h-12 w-auto"
                  />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-6">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map(link => (
                <motion.li
                  key={link.path}
                  whileHover={{ x: 5 }}
                >
                  <Link
                    to={link.path}
                    className="flex items-center text-gray-400 hover:text-white transition-colors"
                  >
                    <FaArrowRight className="mr-2 text-sm" />
                    {link.name}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Payment Methods */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-6">Payment Methods</h3>
            <div className="grid grid-cols-3 gap-4">
              {paymentMethods.map((method, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.1 }}
                  className="bg-white rounded-lg p-2 flex items-center justify-center"
                >
                  <img
                    src={method.image}
                    alt={method.name}
                    className="h-8 w-auto"
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="py-6 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-center md:text-left">
              <p className="text-gray-400 text-sm">
                © {new Date().getFullYear()} Ansar Charity. All rights reserved.
              </p>
              <p className="text-gray-500 text-xs mt-1">
                Making a difference in people's lives through sustainable development
              </p>
            </div>

            <div className="flex space-x-4">
              {socialLinks.map(social => (
                <motion.a
                  key={social.name}
                  href={social.url}
                  whileHover={{ scale: 1.2, y: -2 }}
                  className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:text-white hover:bg-gray-700 transition-colors"
                >
                  <social.icon className="text-sm" />
                </motion.a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default QCMemberships; 