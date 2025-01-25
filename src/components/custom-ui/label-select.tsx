import React, { forwardRef, ReactNode } from 'react';

type Props = {
  label: string;
  isError: boolean;
  children: ReactNode;
  isImportant?: boolean;
  classname?: string;
} & React.InputHTMLAttributes<HTMLSelectElement>;

const LabelSelect = forwardRef<HTMLSelectElement, Props>(({ className, label, name, isError, children, isImportant, ...props }, ref) => {
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
        {children}
      </select>
    </div>
  );
});

LabelSelect.displayName = 'LabelSelect';

export default LabelSelect;
