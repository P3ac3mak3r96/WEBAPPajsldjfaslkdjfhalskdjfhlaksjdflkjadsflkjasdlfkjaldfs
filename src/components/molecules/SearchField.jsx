import React from 'react';
import { Search, X } from 'lucide-react';

const SearchField = ({
  value,
  onChange,
  onClear,
  placeholder = 'Suchen...',
  className = ''
}) => {
  return (
    <div className={`relative ${className}`}>
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
      
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full pl-10 pr-10 py-2 bg-slate-700 rounded-lg border border-gray-600
                   text-gray-200 placeholder-gray-400
                   focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
      />
      
      {value && (
        <button
          onClick={onClear}
          className="absolute right-3 top-1/2 transform -translate-y-1/2
                     text-gray-400 hover:text-gray-200"
        >
          <X className="w-5 h-5" />
        </button>
      )}
    </div>
  );
};

export default SearchField;
