import React, { forwardRef } from 'react';
import { Input } from '../ui/input';

type Props = {
  label: string;
  type: string;
  placeholder: string;
  isError: boolean;
} & React.InputHTMLAttributes<HTMLInputElement>;

const LabelInput = forwardRef<HTMLInputElement, Props>(({ label, placeholder, type, name, isError, ...props }, ref) => {
  return (
    <div>
      <label htmlFor={name} className="block text-sm mb-1">
        {label}
      </label>
      <Input
        ref={ref}
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        {...props}
        className={`border-2 ${isError ? 'border-red-600' : 'border-customOrange'} w-full bg-white rounded-md shadow-inner text-md focus-visible:ring-0 focus-visible:outline-none`}
      />
    </div>
  );
});

LabelInput.displayName = 'LabelInput';

export default LabelInput;
