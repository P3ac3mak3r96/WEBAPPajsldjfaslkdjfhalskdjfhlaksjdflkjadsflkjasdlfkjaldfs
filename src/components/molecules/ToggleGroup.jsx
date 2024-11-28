import React from 'react';

const ToggleGroup = ({
  options = [],
  value,
  onChange,
  label,
  disabled = false,
  className = ''
}) => {
  return (
    <div className={`space-y-2 ${className}`}>
      {label && (
        <label className="block text-sm font-medium text-gray-200">
          {label}
        </label>
      )}
      
      <div className="flex rounded-lg bg-slate-700 p-1">
        {options.map((option) => (
          <button
            key={option.value}
            onClick={() => onChange(option.value)}
            disabled={disabled}
            className={`
              flex-1 px-4 py-2 text-sm font-medium rounded-md
              transition-all duration-200
              ${value === option.value 
                ? 'bg-amber-600 text-white' 
                : 'text-gray-400 hover:text-white'}
              ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
            `}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ToggleGroup;
