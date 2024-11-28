import React from 'react';
import Input from '../../atoms/Input/Input';
import { X } from 'lucide-react';

const InputField = ({
  label,
  value,
  onChange,
  onClear,
  error,
  helperText,
  required = false,
  showClear = false,
  className = '',
  ...props
}) => {
  return (
    <div className={`space-y-1 ${className}`}>
      <div className="flex justify-between">
        <label className="block text-sm font-medium text-gray-200">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
        {helperText && (
          <span className="text-sm text-gray-400">{helperText}</span>
        )}
      </div>
      
      <div className="relative">
        <Input
          value={value}
          onChange={onChange}
          error={error}
          {...props}
        />
        {showClear && value && (
          <button
            onClick={onClear}
            className="absolute right-2 top-1/2 transform -translate-y-1/2
                       text-gray-400 hover:text-gray-200"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {error && (
        <p className="text-sm text-red-500 mt-1">{error}</p>
      )}
    </div>
  );
};

export default InputField;
