import React, { forwardRef } from 'react';

type Props = {
  label: string;
  isError: boolean;
  isImportant?: boolean;
  classname?: string;
} & React.InputHTMLAttributes<HTMLTextAreaElement>;

const LabelTextarea = forwardRef<HTMLTextAreaElement, Props>(({ className, label, name, isError, isImportant, ...props }, ref) => {
  return (
    <div className={className}>
      <label htmlFor={name} className="block text-xs mb-0.5">
        {label}
        {isImportant && <span className="text-red-600 text-xs">*</span>}
      </label>
      <textarea
        ref={ref}
        id={name}
        name={name}
        rows={4}
        cols={50}
        {...props}
        className={`border-2 p-2 ${
          isError ? 'border-red-600' : 'border-customOrange'
        } w-full bg-white rounded-md shadow-inner text-sm focus-visible:ring-0 focus-visible:outline-none read-only:bg-slate-200`}
      ></textarea>
    </div>
  );
});

LabelTextarea.displayName = 'LabelTextarea';

export default LabelTextarea;
