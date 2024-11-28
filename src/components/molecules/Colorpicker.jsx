import React from 'react';

const predefinedColors = [
  { value: '#ef4444', label: 'Rot' },
  { value: '#f97316', label: 'Orange' },
  { value: '#eab308', label: 'Gelb' },
  { value: '#22c55e', label: 'Grün' },
  { value: '#3b82f6', label: 'Blau' },
  { value: '#a855f7', label: 'Lila' },
  { value: '#ec4899', label: 'Pink' },
  { value: '#ffffff', label: 'Weiß' }
];

const ColorPicker = ({
  value,
  onChange,
  label,
  showCustom = true,
  className = ''
}) => {
  return (
    <div className={`space-y-2 ${className}`}>
      {label && (
        <label className="block text-sm font-medium text-gray-200">
          {label}
        </label>
      )}

      <div className="grid grid-cols-4 gap-2">
        {predefinedColors.map((color) => (
          <button
            key={color.value}
            onClick={() => onChange(color.value)}
            className={`
              w-12 h-12 rounded-lg border-2 transition-all duration-200
              ${value === color.value ? 'border-amber-500 scale-110' : 'border-transparent'}
              hover:scale-105
            `}
            style={{ backgroundColor: color.value }}
            title={color.label}
          />
        ))}
      </div>

      {showCustom && (
        <div className="mt-4">
          <input
            type="color"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="w-full h-10 bg-slate-700 rounded border border-gray-600"
          />
        </div>
      )}
    </div>
  );
};

export default ColorPicker;
