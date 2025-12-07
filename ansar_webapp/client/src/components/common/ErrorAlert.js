import { FaExclamationCircle } from 'react-icons/fa';
import { motion } from 'framer-motion';

const ErrorAlert = ({ message, className = '' }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex items-center p-4 bg-red-50 rounded-lg ${className}`}
    >
      <FaExclamationCircle className="w-5 h-5 text-red-600 mr-3" />
      <div>
        <h3 className="text-sm font-medium text-red-800">Error</h3>
        <div className="mt-1 text-sm text-red-700">{message}</div>
      </div>
    </motion.div>
  );
};

export default ErrorAlert; 