'use client';

import React, { useCallback } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

type Props = {
  menuTypes: string[];
  selectedType: string;
};

export default function MenuTypeFilter({ menuTypes, selectedType }: Props) {
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

  return (
    <div className="flex gap-3 overflow-x-scroll">
      {/* for all type */}
      <Link href={`?${createSearchQuery('type', '')}`} replace>
        <div className={`border border-customOrange rounded-sm ${selectedType === '' ? 'bg-customOrange' : 'bg-white'} p-2 text-xs font-semibold cursor-pointer hover:bg-customOrange text-nowrap`}>
          Semua
        </div>
      </Link>
      {/* for custom type */}
      {menuTypes.map((item, key) => {
        const isSelected = item.toLocaleLowerCase() === selectedType;
        return (
          <Link key={key} href={`?${createSearchQuery('type', selectedType === item ? '' : item)}`} replace>
            <div className={`border border-customOrange rounded-sm ${isSelected ? 'bg-customOrange' : 'bg-white'} p-2 text-xs font-semibold cursor-pointer hover:bg-customOrange text-nowrap`}>
              {item}
            </div>
          </Link>
        );
      })}
    </div>
  );
}
