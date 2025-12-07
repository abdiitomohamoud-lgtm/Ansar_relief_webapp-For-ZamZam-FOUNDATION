import React from 'react';

/**
 * Generic Form component for admin dashboard.
 * @param {Array} fields - [{ name, label, type, ... }]
 * @param {Object} values - Form values
 * @param {Function} onChange - Change handler
 * @param {Function} onSubmit - Submit handler
 * @param {String} submitLabel - Button label
 */
const Form = ({ fields, values, onChange, onSubmit, submitLabel }) => (
  <form onSubmit={onSubmit} className="space-y-4">
    {fields.map(field => (
      <div key={field.name}>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">{field.label}</label>
        <input
          type={field.type || 'text'}
          name={field.name}
          value={values[field.name] || ''}
          onChange={onChange}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-500"
        />
      </div>
    ))}
    <button type="submit" className="px-4 py-2 bg-primary-600 text-white rounded hover:bg-primary-700">{submitLabel || 'Submit'}</button>
  </form>
);

export default Form;
