'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback } from 'react';
import { Input } from '../ui/input';
import { useDebouncedCallback } from 'use-debounce';

export default function MenuQueryFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const menuKeywordParams = searchParams.get('keyword')?.toString() || '';

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
        defaultValue={menuKeywordParams}
        className="w-full border-2 border-customOrange bg-white focus-visible:ring-0 focus-visible:outline-none"
        type="text"
        placeholder="Cari menu..."
        id="searchItem"
      />
    </div>
  );
}
