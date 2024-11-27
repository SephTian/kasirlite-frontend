import React from 'react';
import MenuType from './menu-type-card';
import Link from 'next/link';

type Props = {
  menuTypes: string[];
  selectedType: string;
  createSearchQuery: (key: string, value: string) => string;
};

export default function MenuTypeFilter({ menuTypes, selectedType, createSearchQuery }: Props) {
  return (
    <div className="flex gap-3 overflow-x-scroll">
      <Link href={`?${createSearchQuery('type', '')}`} replace>
        <MenuType isSelected={selectedType === ''} type="Semua" />
      </Link>
      {menuTypes.map((item, key) => {
        const isSelected = item.toLocaleLowerCase() === selectedType;
        return (
          <Link key={key} href={`?${createSearchQuery('type', selectedType === item ? '' : item)}`} replace>
            <MenuType isSelected={isSelected} type={item} />
          </Link>
        );
      })}
    </div>
  );
}
