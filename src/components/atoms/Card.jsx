import React from 'react';

const Card = ({ 
  children, 
  title,
  action,
  padding = 'p-6',
  className = '' 
}) => {
  return (
    <div className={`bg-slate-800 rounded-lg shadow-lg ${className}`}>
      {(title || action) && (
        <div className="flex justify-between items-center p-6 border-b border-gray-700">
          {title && (
            <h3 className="text-lg font-bold text-gray-200">{title}</h3>
          )}
          {action && (
            <div className="flex items-center">{action}</div>
          )}
        </div>
      )}
      <div className={padding}>
        {children}
      </div>
    </div>
  );
};

export default Card;
