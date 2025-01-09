import React, { forwardRef } from 'react';
import { Input } from '../ui/input';

type Props = {
  label: string;
  isError: boolean;
  isImportant?: boolean;
} & React.InputHTMLAttributes<HTMLInputElement>;

const LabelRupiahInput = forwardRef<HTMLInputElement, Props>(({ label, name, isError, isImportant, ...props }, ref) => {
  return (
    <div>
      <label htmlFor={name} className="block text-sm mb-1">
        {label}
        {isImportant && <span className="text-red-600 text-xs">*</span>}
      </label>
      <div className={`overflow-hidden flex w-full bg-white rounded-md border-2 ${isError ? 'border-red-600' : 'border-customOrange'}`}>
        <div className="flex px-3 flex-auto justify-center items-center bg-customOrange">Rp</div>
        <Input ref={ref} id={name} name={name} type="text" {...props} className={`rounded-none w-full bg-white text-md focus-visible:ring-0 focus-visible:outline-none read-only:bg-slate-200`} />
      </div>
    </div>
  );
});

LabelRupiahInput.displayName = 'LabelRupiahInput';

export default LabelRupiahInput;
