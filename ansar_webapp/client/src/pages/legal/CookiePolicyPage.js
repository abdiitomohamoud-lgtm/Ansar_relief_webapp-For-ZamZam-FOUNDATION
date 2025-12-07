import React from 'react';
import { motion } from 'framer-motion';

const CookiePolicyPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-xl shadow-lg p-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Cookie Policy</h1>
          
          <div className="prose prose-emerald max-w-none">
            <p className="text-gray-600 mb-6">
              Last updated: {new Date().toLocaleDateString()}
            </p>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. What Are Cookies</h2>
              <p className="text-gray-600 mb-4">
                Cookies are small text files that are placed on your computer or mobile device when you visit our website. They help us provide you with a better experience by:
              </p>
              <ul className="list-disc pl-6 text-gray-600 mb-4">
                <li>Remembering your preferences</li>
                <li>Understanding how you use our website</li>
                <li>Improving our services</li>
                <li>Providing personalized content</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Types of Cookies We Use</h2>
              
              <h3 className="text-xl font-medium text-gray-800 mb-3">2.1 Essential Cookies</h3>
              <p className="text-gray-600 mb-4">
                These cookies are necessary for the website to function properly. They enable core functionality such as:
              </p>
              <ul className="list-disc pl-6 text-gray-600 mb-4">
                <li>Security features</li>
                <li>Account authentication</li>
                <li>Session management</li>
                <li>Payment processing</li>
              </ul>

              <h3 className="text-xl font-medium text-gray-800 mb-3">2.2 Performance Cookies</h3>
              <p className="text-gray-600 mb-4">
                These cookies help us understand how visitors interact with our website by:
              </p>
              <ul className="list-disc pl-6 text-gray-600 mb-4">
                <li>Collecting analytics data</li>
                <li>Measuring page load times</li>
                <li>Tracking user behavior</li>
                <li>Identifying areas for improvement</li>
              </ul>

              <h3 className="text-xl font-medium text-gray-800 mb-3">2.3 Functionality Cookies</h3>
              <p className="text-gray-600 mb-4">
                These cookies enable enhanced functionality and personalization:
              </p>
              <ul className="list-disc pl-6 text-gray-600 mb-4">
                <li>Language preferences</li>
                <li>Theme settings</li>
                <li>Customized content</li>
                <li>User preferences</li>
              </ul>

              <h3 className="text-xl font-medium text-gray-800 mb-3">2.4 Marketing Cookies</h3>
              <p className="text-gray-600 mb-4">
                These cookies are used to track visitors across websites to:
              </p>
              <ul className="list-disc pl-6 text-gray-600 mb-4">
                <li>Display relevant advertisements</li>
                <li>Measure campaign effectiveness</li>
                <li>Limit ad frequency</li>
                <li>Target specific audiences</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. How to Control Cookies</h2>
              <p className="text-gray-600 mb-4">
                You can control and/or delete cookies as you wish. You can:
              </p>
              <ul className="list-disc pl-6 text-gray-600 mb-4">
                <li>Delete all cookies from your browser</li>
                <li>Set your browser to block cookies</li>
                <li>Use our cookie consent tool to manage preferences</li>
                <li>Opt-out of specific cookie types</li>
              </ul>
              <p className="text-gray-600">
                Please note that blocking certain cookies may impact your experience on our website.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Third-Party Cookies</h2>
              <p className="text-gray-600 mb-4">
                We use services from third parties that may also set cookies on your device:
              </p>
              <ul className="list-disc pl-6 text-gray-600 mb-4">
                <li>Google Analytics</li>
                <li>Payment processors</li>
                <li>Social media platforms</li>
                <li>Advertising networks</li>
              </ul>
              <p className="text-gray-600">
                These third parties have their own privacy policies and cookie practices.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Updates to This Policy</h2>
              <p className="text-gray-600 mb-4">
                We may update this Cookie Policy from time to time to:
              </p>
              <ul className="list-disc pl-6 text-gray-600 mb-4">
                <li>Reflect changes in our practices</li>
                <li>Comply with new regulations</li>
                <li>Improve transparency</li>
                <li>Address new technologies</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Contact Us</h2>
              <p className="text-gray-600">
                If you have any questions about our Cookie Policy, please contact us at:
              </p>
              <div className="mt-2 text-gray-600">
                <p>Email: privacy@ansarrelief.org</p>
                <p>Phone: +1 (555) 123-4567</p>
                <p>Address: 123 Charity Street, Humanitarian City, HC 12345</p>
              </div>
            </section>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default CookiePolicyPage; 