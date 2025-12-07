import React from 'react';

const steps = [
  { label: 'Sign Up' },
  { label: 'Verify' },
  { label: 'Success' }
];

export default function ProgressSteps({ currentStep = 1 }) {
  return (
    <div className="flex items-center justify-center mb-8">
      {steps.map((step, idx) => {
        const active = currentStep === idx + 1;
        const completed = currentStep > idx + 1;
        return (
          <React.Fragment key={step.label}>
            <div className="flex flex-col items-center">
              <div
                className={`w-8 h-8 flex items-center justify-center rounded-full font-bold text-white transition-colors duration-300
                  ${active ? 'bg-primary-600' : completed ? 'bg-green-500' : 'bg-gray-300'}
                `}
              >
                {completed ? <span>&#10003;</span> : idx + 1}
              </div>
              <span className={`mt-2 text-xs font-medium ${active ? 'text-primary-700' : 'text-gray-500'}`}>{step.label}</span>
            </div>
            {idx < steps.length - 1 && (
              <div className={`w-12 h-1 mx-2 rounded ${completed ? 'bg-green-500' : 'bg-gray-300'}`}></div>
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}
