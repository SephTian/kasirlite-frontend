import React, { forwardRef } from 'react';
import { Input } from '../ui/input';

type Props = {
  label: string;
  isError: boolean;
  isImportant?: boolean;
  classname?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

const LabelDate = forwardRef<HTMLInputElement, Props>(({ className, label, name, isError, isImportant, ...props }, ref) => {
  return (
    <div className={className}>
      <label htmlFor={name} className="block text-xs mb-0.5">
        {label}
        {isImportant && <span className="text-red-600 text-xs">*</span>}
      </label>
      <Input
        ref={ref}
        id={name}
        name={name}
        type="date"
        {...props}
        className={`border-2 block ${
          isError ? 'border-red-600' : 'border-customOrange'
        } w-full bg-white rounded-md shadow-inner text-md focus-visible:ring-0 focus-visible:outline-none read-only:bg-slate-200`}
      />
    </div>
  );
});

LabelDate.displayName = 'LabelDate';

export default LabelDate;
