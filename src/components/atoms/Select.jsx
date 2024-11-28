import React from 'react';
import { ChevronDown } from 'lucide-react';

const Select = ({
  value,
  onChange,
  options = [],
  label,
  placeholder = 'Auswählen...',
  error,
  disabled = false,
  className = ''
}) => {
  return (
    <div className="space-y-1">
      {label && (
        <label className="block text-sm font-medium text-gray-200">
          {label}
        </label>
      )}
      <div className="relative">
        <select
          value={value}
          onChange={onChange}
          disabled={disabled}
          className={`
            w-full p-2 pr-8 bg-slate-700 rounded border appearance-none
            ${error ? 'border-red-500' : 'border-gray-600'}
            ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
            text-gray-200
            focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent
            ${className}
          `}
        >
          <option value="" disabled>
            {placeholder}
          </option>
          {options.map((option) => (
            <option 
              key={option.value} 
              value={option.value}
              className="bg-slate-700"
            >
              {option.label}
            </option>
          ))}
        </select>
        <ChevronDown 
          className="absolute right-2 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" 
        />
      </div>
      {error && (
        <p className="text-sm text-red-500 mt-1">{error}</p>
      )}
    </div>
  );
};

export default Select;
