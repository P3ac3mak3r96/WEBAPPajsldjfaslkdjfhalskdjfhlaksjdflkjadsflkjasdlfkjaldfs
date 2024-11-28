import React from 'react';
import { Activity } from 'lucide-react';

const variants = {
  primary: 'bg-amber-600 hover:bg-amber-700 text-white',
  secondary: 'bg-slate-600 hover:bg-slate-700 text-white',
  danger: 'bg-red-600 hover:bg-red-700 text-white',
  ghost: 'hover:bg-slate-700 text-gray-200'
};

const sizes = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2',
  lg: 'px-6 py-3 text-lg'
};

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  icon,
  loading = false,
  disabled = false,
  fullWidth = false,
  onClick,
  className = ''
}) => {
  const baseClasses = 'rounded-lg transition-all duration-200 flex items-center justify-center gap-2';
  const variantClasses = variants[variant] || variants.primary;
  const sizeClasses = sizes[size] || sizes.md;
  const widthClasses = fullWidth ? 'w-full' : '';
  const disabledClasses = disabled || loading ? 'opacity-50 cursor-not-allowed' : '';

  return (
    <button
      onClick={onClick}
      disabled={disabled || loading}
      className={`${baseClasses} ${variantClasses} ${sizeClasses} ${widthClasses} ${disabledClasses} ${className}`}
    >
      {loading ? (
        <Activity className="w-5 h-5 animate-spin" />
      ) : icon ? (
        <span className="w-5 h-5">{icon}</span>
      ) : null}
      {children}
    </button>
  );
};

export default Button;
