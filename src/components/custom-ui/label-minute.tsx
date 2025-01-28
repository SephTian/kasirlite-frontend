import React, { forwardRef } from 'react';

type Props = {
  label: string;
  isError: boolean;
  isImportant?: boolean;
  classname?: string;
} & React.InputHTMLAttributes<HTMLSelectElement>;

const LabelMinute = forwardRef<HTMLSelectElement, Props>(({ className, label, name, isError, isImportant, ...props }, ref) => {
  return (
    <div className={className}>
      <label htmlFor={name} className="block text-xs mb-0.5">
        {label}
        {isImportant && <span className="text-red-600 text-xs">*</span>}
      </label>
      <select
        ref={ref}
        id={name}
        name={name}
        {...props}
        className={`border-2 p-2 cursor-pointer ${isError ? 'border-red-600' : 'border-customOrange'} w-full bg-white rounded-md shadow-inner text-sm focus-visible:ring-0 focus-visible:outline-none `}
      >
        {Array.from({ length: 60 }, (_, i) => (
          <option key={i} value={String(i).padStart(2, '0')}>
            {String(i).padStart(2, '0')}
          </option>
        ))}
      </select>
    </div>
  );
});

LabelMinute.displayName = 'LabelMinute';

export default LabelMinute;
