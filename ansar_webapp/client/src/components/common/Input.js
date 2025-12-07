import { forwardRef } from 'react';

const Input = forwardRef(({
  label,
  error,
  type = 'text',
  className = '',
  helperText,
  startIcon,
  endIcon,
  ...props
}, ref) => {
  const baseInputStyles = 'w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all duration-200';
  const errorInputStyles = 'border-red-500 focus:ring-red-500 focus:border-red-500';
  const successInputStyles = 'border-green-500 focus:ring-green-500 focus:border-green-500';
  const disabledInputStyles = 'bg-gray-100 cursor-not-allowed opacity-75';

  return (
    <div className={className}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      <div className="relative">
        {startIcon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            {startIcon}
          </div>
        )}
        <input
          ref={ref}
          type={type}
          className={`
            ${baseInputStyles}
            ${error ? errorInputStyles : ''}
            ${props.disabled ? disabledInputStyles : ''}
            ${startIcon ? 'pl-10' : ''}
            ${endIcon ? 'pr-10' : ''}
          `}
          {...props}
        />
        {endIcon && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            {endIcon}
          </div>
        )}
      </div>
      {(error || helperText) && (
        <p
          className={`mt-1 text-sm ${
            error ? 'text-red-600' : 'text-gray-500'
          }`}
        >
          {error || helperText}
        </p>
      )}
    </div>
  );
});

Input.displayName = 'Input';

export default Input; 