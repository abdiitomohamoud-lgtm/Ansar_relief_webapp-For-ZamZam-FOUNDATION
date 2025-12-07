import { motion, AnimatePresence } from 'framer-motion';
import {
  FaCheckCircle,
  FaExclamationCircle,
  FaInfoCircle,
  FaTimesCircle,
  FaTimes,
} from 'react-icons/fa';

const Notification = ({
  type = 'info',
  title,
  message,
  isOpen,
  onClose,
  duration = 5000,
  className = '',
}) => {
  const icons = {
    success: FaCheckCircle,
    error: FaTimesCircle,
    warning: FaExclamationCircle,
    info: FaInfoCircle,
  };

  const styles = {
    success: 'bg-green-50 text-green-800 border-green-200',
    error: 'bg-red-50 text-red-800 border-red-200',
    warning: 'bg-yellow-50 text-yellow-800 border-yellow-200',
    info: 'bg-blue-50 text-blue-800 border-blue-200',
  };

  const iconColors = {
    success: 'text-green-500',
    error: 'text-red-500',
    warning: 'text-yellow-500',
    info: 'text-blue-500',
  };

  const Icon = icons[type];

  if (duration > 0) {
    setTimeout(() => {
      onClose();
    }, duration);
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className={`
            fixed top-4 right-4 z-50 w-96 max-w-[calc(100vw-2rem)]
            p-4 rounded-lg shadow-lg border
            ${styles[type]}
            ${className}
          `}
        >
          <div className="flex items-start">
            {/* Icon */}
            <div className="flex-shrink-0">
              <Icon className={`w-5 h-5 ${iconColors[type]}`} />
            </div>

            {/* Content */}
            <div className="ml-3 flex-1">
              {title && (
                <h3 className="text-sm font-medium mb-1">{title}</h3>
              )}
              <p className="text-sm">{message}</p>
            </div>

            {/* Close Button */}
            <div className="ml-4 flex-shrink-0">
              <button
                onClick={onClose}
                className={`
                  inline-flex rounded-md p-1.5
                  hover:bg-opacity-10 hover:bg-black
                  focus:outline-none focus:ring-2 focus:ring-offset-2
                  focus:ring-${type === 'info' ? 'blue' : type}-500
                `}
              >
                <span className="sr-only">Close</span>
                <FaTimes className="w-4 h-4" />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Notification; 