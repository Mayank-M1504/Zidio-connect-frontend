import React from 'react';

const InputField = ({ label, type = 'text', value, onChange, error, className = '', labelClassName = '', errorClassName = '', ...props }) => (
  <div className="mb-4">
    <label className={`block text-sm font-medium mb-1 ${labelClassName}`}>{label}</label>
    <input
      type={type}
      value={value}
      onChange={onChange}
      className={`w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 ${error ? 'border-red-500' : 'border-gray-300'} ${className}`}
      {...props}
    />
    {error && <p className={`text-xs text-red-500 mt-1 ${errorClassName}`}>{error}</p>}
  </div>
);

export default InputField; 