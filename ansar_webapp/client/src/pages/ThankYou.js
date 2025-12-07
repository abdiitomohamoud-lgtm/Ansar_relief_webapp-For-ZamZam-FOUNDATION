import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaCheckCircle, FaArrowRight } from 'react-icons/fa';

const ThankYou = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg"
      >
        <div className="text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2 }}
            className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100"
          >
            <FaCheckCircle className="h-8 w-8 text-green-600" />
          </motion.div>
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Thank You for Your Donation!
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Your generosity helps us make a real difference in people's lives.
          </p>
        </div>

        <div className="mt-8 space-y-6">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-medium text-gray-900">What happens next?</h3>
            <ul className="mt-4 space-y-3">
              <li className="flex items-start">
                <span className="flex-shrink-0 h-6 w-6 text-green-500">✓</span>
                <span className="ml-3 text-gray-600">
                  You'll receive a confirmation email with your donation details
                </span>
              </li>
              <li className="flex items-start">
                <span className="flex-shrink-0 h-6 w-6 text-green-500">✓</span>
                <span className="ml-3 text-gray-600">
                  We'll keep you updated on the campaign's progress
                </span>
              </li>
              <li className="flex items-start">
                <span className="flex-shrink-0 h-6 w-6 text-green-500">✓</span>
                <span className="ml-3 text-gray-600">
                  Your donation will be put to work immediately
                </span>
              </li>
            </ul>
          </div>

          <div className="flex flex-col space-y-4">
            <Link
              to="/campaigns"
              className="w-full flex items-center justify-center px-4 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
            >
              View More Campaigns <FaArrowRight className="ml-2" />
            </Link>
            <Link
              to="/"
              className="w-full flex items-center justify-center px-4 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
            >
              Return to Home
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ThankYou; 