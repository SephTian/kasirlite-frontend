import React, { forwardRef } from 'react';
import { Input } from '../ui/input';

type Props = {
  label: string;
  type: string;
  isError: boolean;
  isImportant?: boolean;
  classname?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

const LabelInput = forwardRef<HTMLInputElement, Props>(({ className, label, type, name, isError, isImportant, ...props }, ref) => {
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
        type={type}
        {...props}
        className={`border-2 ${
          isError ? 'border-red-600' : 'border-customOrange'
        } w-full bg-white rounded-md shadow-inner text-md focus-visible:ring-0 focus-visible:outline-none read-only:bg-slate-200`}
      />
    </div>
  );
});

LabelInput.displayName = 'LabelInput';

export default LabelInput;
