import React from 'react';
import PropTypes from 'prop-types';

const LoadingScreen = ({ message = 'Loading...' }) => {
  return (
    <div className="fixed inset-0 bg-gray-50 flex items-center justify-center z-50">
      <div className="text-center">
        {/* Animated logo */}
        <div className="w-24 h-24 mb-4 mx-auto">
          <div className="relative w-full h-full">
            <div className="absolute inset-0 border-4 border-primary-200 rounded-full animate-ping"></div>
            <div className="absolute inset-0 border-4 border-primary-500 rounded-full animate-pulse"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <img 
                src="/logo.png" 
                alt="Logo"
                className="w-16 h-16 object-contain"
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
            </div>
          </div>
        </div>

        {/* Loading spinner */}
        <div className="mb-4">
          <div className="animate-spin rounded-full h-8 w-8 border-4 border-primary-500 border-t-transparent mx-auto"></div>
        </div>

        {/* Loading message */}
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-700 mb-2">
            {message}
          </h2>
          <p className="text-sm text-gray-500">
            Please wait while we set things up...
          </p>
        </div>

        {/* Loading progress bar */}
        <div className="max-w-md mx-auto mt-6">
          <div className="h-1 w-full bg-gray-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-primary-500 rounded-full animate-progress"
              style={{
                animation: 'progress 2s ease-in-out infinite',
                width: '0%'
              }}
            ></div>
          </div>
        </div>
      </div>

      {/* CSS for progress animation */}
      <style jsx>{`
        @keyframes progress {
          0% { width: 0%; }
          50% { width: 70%; }
          100% { width: 100%; }
        }
      `}</style>
    </div>
  );
};

LoadingScreen.propTypes = {
  message: PropTypes.string
};

export default LoadingScreen;