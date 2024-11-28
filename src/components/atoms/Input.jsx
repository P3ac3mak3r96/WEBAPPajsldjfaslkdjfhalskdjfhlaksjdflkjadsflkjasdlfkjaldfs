import React from 'react';

const Input = ({
  type = 'text',
  value,
  onChange,
  label,
  placeholder,
  error,
  disabled = false,
  className = '',
  ...props
}) => {
  return (
    <div className="space-y-1">
      {label && (
        <label className="block text-sm font-medium text-gray-200">
          {label}
        </label>
      )}
      <input
        type={type}
        value={value}
        onChange={onChange}
        disabled={disabled}
        placeholder={placeholder}
        className={`
          w-full p-2 bg-slate-700 rounded border
          ${error ? 'border-red-500' : 'border-gray-600'}
          ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
          text-gray-200 placeholder-gray-400
          focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent
          ${className}
        `}
        {...props}
      />
      {error && (
        <p className="text-sm text-red-500 mt-1">{error}</p>
      )}
    </div>
  );
};

export default Input;
