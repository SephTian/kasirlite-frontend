'use client';

import React, { useCallback } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { MenuType } from '@/lib/types';

type Props = {
  menuTypes: MenuType[];
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
    <div className="flex flex-wrap gap-3">
      {/* for all type */}
      <Link href={`?${createSearchQuery('type', '')}`} replace>
        <div className={`border border-customOrange rounded-sm ${selectedType === '' ? 'bg-customOrange' : 'bg-[#fdfdfd]'} p-2 text-xs font-semibold cursor-pointer hover:bg-customOrange text-nowrap`}>
          Semua
        </div>
      </Link>
      {/* for custom type */}
      {menuTypes.map((item, key) => {
        const isSelected = item.name.toLocaleLowerCase() === selectedType;
        return (
          <Link key={key} href={`?${createSearchQuery('type', selectedType === item.name ? '' : item.name)}`} replace>
            <div className={`border border-customOrange rounded-sm ${isSelected ? 'bg-customOrange' : 'bg-[#fdfdfd]'} p-2 text-xs font-semibold cursor-pointer hover:bg-customOrange text-nowrap`}>
              {item.name}
            </div>
          </Link>
        );
      })}
    </div>
  );
}
