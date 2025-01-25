'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback } from 'react';
import { Input } from '@/components/ui/input';
import { useDebouncedCallback } from 'use-debounce';

type Props = {
  selectedKeyword: string;
};

export default function MenuQueryFilter({ selectedKeyword }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();

  // create search params
  const createSearchQuery = useCallback(
    (key: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(key, value);
      return params.toString();
    },
    [searchParams]
  );

  // Set keyword params on URL
  const handleKeyword = useDebouncedCallback((value) => {
    router.replace(`?${createSearchQuery('keyword', value)}`, { scroll: false });
  }, 500);

  return (
    <div className="rounded-md space-y-1 w-full">
      <Input
        onChange={(e) => {
          handleKeyword(e.target.value);
        }}
        defaultValue={selectedKeyword}
        className="w-full border-2 border-customOrange bg-white focus-visible:ring-0 focus-visible:outline-none"
        type="text"
        placeholder="Cari menu..."
        id="searchItem"
      />
    </div>
  );
}
