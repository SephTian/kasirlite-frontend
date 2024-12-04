'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { ChangeEvent, useCallback } from 'react';
import { Input } from '../ui/input';

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
  const handleKeyword = (e: ChangeEvent<HTMLInputElement>) => {
    router.replace(`?${createSearchQuery('keyword', e.target.value)}`, { scroll: false });
  };

  return (
    <div className="rounded-md space-y-1 w-full">
      <Input
        onChange={handleKeyword}
        value={menuKeywordParams}
        className="w-full border-2 border-customOrange bg-gray-100 focus-visible:ring-0 focus-visible:outline-none"
        type="text"
        placeholder="Cari makanan...."
        id="searchItem"
      />
    </div>
  );
}
