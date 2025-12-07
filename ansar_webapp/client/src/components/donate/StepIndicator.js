import React from 'react';
import { FaCheck } from 'react-icons/fa';

const StepIndicator = ({ currentStep, totalSteps = 3 }) => {
  const steps = [
    { step: 1, label: 'Select Category' },
    { step: 2, label: 'Choose Amount' },
    { step: 3, label: 'Review & Donate' }
  ];

  return (
    <div className="px-5 py-3 bg-gray-50 border-b border-gray-200 relative">
      <div className="flex items-center justify-between mb-1">
        {steps.slice(0, totalSteps).map(({ step, label }) => (
          <div key={step} className="flex flex-col items-center">
            <div 
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium mb-1 transition-all duration-300
                ${currentStep === step 
                  ? 'bg-primary-600 text-white shadow-md' 
                  : currentStep > step 
                    ? 'bg-green-100 text-green-700' 
                    : 'bg-gray-200 text-gray-500'
                }`}
            >
              {currentStep > step ? <FaCheck size={12} /> : step}
            </div>
            <span className={`text-xs ${
              currentStep === step 
                ? 'text-primary-700 font-semibold' 
                : 'text-gray-500'
            }`}>
              {label}
            </span>
          </div>
        ))}
      </div>
      
      {/* Progress bar */}
      <div className="h-1.5 w-full bg-gray-200 rounded-full overflow-hidden">
        <div 
          className="h-full bg-primary-600 transition-all duration-500 rounded-full"
          style={{ width: `${((currentStep - 1) / (totalSteps - 1)) * 100}%` }}
        />
      </div>
    </div>
  );
};

export default StepIndicator; 