import React, { forwardRef, ReactNode } from 'react';

type Props = {
  label: string;
  isError: boolean;
  children: ReactNode;
  isImportant?: boolean;
} & React.InputHTMLAttributes<HTMLSelectElement>;

const LabelSelect = forwardRef<HTMLSelectElement, Props>(({ label, name, isError, children, isImportant, ...props }, ref) => {
  return (
    <div>
      <label htmlFor={name} className="block text-sm mb-1">
        {label}
        {isImportant && <span className="text-red-600 text-xs">*</span>}
      </label>
      <select
        ref={ref}
        id={name}
        name={name}
        {...props}
        className={`border-2 p-2 cursor-pointer ${
          isError ? 'border-red-600' : 'border-customOrange'
        } w-full bg-white rounded-md shadow-inner text-sm focus-visible:ring-0 focus-visible:outline-none read-only:bg-slate-200`}
      >
        {children}
      </select>
    </div>
  );
});

LabelSelect.displayName = 'LabelSelect';

export default LabelSelect;
