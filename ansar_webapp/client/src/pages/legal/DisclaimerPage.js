import React from 'react';
import { motion } from 'framer-motion';

const DisclaimerPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-xl shadow-lg p-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Disclaimer</h1>
          
          <div className="prose prose-emerald max-w-none">
            <p className="text-gray-600 mb-6">
              Last updated: {new Date().toLocaleDateString()}
            </p>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. General Disclaimer</h2>
              <p className="text-gray-600 mb-4">
                The information provided on this website is for general informational purposes only. While we strive to keep the information up to date and correct, we make no representations or warranties of any kind, express or implied, about the completeness, accuracy, reliability, suitability, or availability of the website or the information, products, services, or related graphics contained on the website for any purpose.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. No Professional Advice</h2>
              <p className="text-gray-600 mb-4">
                The content on this website is not intended to be a substitute for professional advice. We recommend that you:
              </p>
              <ul className="list-disc pl-6 text-gray-600 mb-4">
                <li>Consult with appropriate professionals before making decisions</li>
                <li>Verify any information independently</li>
                <li>Consider your specific circumstances</li>
                <li>Seek expert guidance when needed</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. Donations and Financial Information</h2>
              <p className="text-gray-600 mb-4">
                Regarding donations and financial matters:
              </p>
              <ul className="list-disc pl-6 text-gray-600 mb-4">
                <li>All donations are voluntary and non-refundable</li>
                <li>We are not responsible for any tax implications</li>
                <li>Financial information is provided for informational purposes only</li>
                <li>We recommend consulting with financial advisors</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. External Links</h2>
              <p className="text-gray-600 mb-4">
                Our website may contain links to external websites that are not provided or maintained by us. We:
              </p>
              <ul className="list-disc pl-6 text-gray-600 mb-4">
                <li>Do not guarantee the accuracy of external content</li>
                <li>Are not responsible for external website content</li>
                <li>Do not endorse external websites</li>
                <li>Recommend reviewing external privacy policies</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Limitation of Liability</h2>
              <p className="text-gray-600 mb-4">
                In no event shall Ansar Relief be liable for any loss or damage including without limitation:
              </p>
              <ul className="list-disc pl-6 text-gray-600 mb-4">
                <li>Indirect or consequential loss or damage</li>
                <li>Loss of data or profits</li>
                <li>Loss arising from the use of this website</li>
                <li>Loss arising from any linked websites</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Changes to Disclaimer</h2>
              <p className="text-gray-600 mb-4">
                We reserve the right to modify this disclaimer at any time. Changes may include:
              </p>
              <ul className="list-disc pl-6 text-gray-600 mb-4">
                <li>Updates to terms and conditions</li>
                <li>Modifications to liability clauses</li>
                <li>Changes to external link policies</li>
                <li>Updates to financial disclaimers</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Contact Information</h2>
              <p className="text-gray-600">
                If you have any questions about this disclaimer, please contact us at:
              </p>
              <div className="mt-2 text-gray-600">
                <p>Email: legal@ansarrelief.org</p>
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

export default DisclaimerPage; 