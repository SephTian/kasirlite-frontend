'use client';

import { useSearchParams } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { useDebouncedCallback } from 'use-debounce';

type Props = {
  placeholder: string;
  onChange?: (value: string) => void;
  classname?: string;
  debounceTime: number;
  searchParamName: string;
};

export default function DebounceInput({ classname, placeholder, debounceTime, searchParamName, onChange }: Props) {
  const searchParams = useSearchParams();

  // Set keyword params on URL
  const handleChange = useDebouncedCallback((value) => {
    onChange?.(value);
  }, debounceTime);

  return (
    <Input
      onChange={(e) => {
        handleChange(e.target.value);
      }}
      defaultValue={searchParams.get(`${searchParamName}`)?.toLowerCase() || ''}
      className={`${classname} border-2 border-customOrange bg-white focus-visible:ring-0 focus-visible:outline-none`}
      type="text"
      placeholder={placeholder}
    />
  );
}
