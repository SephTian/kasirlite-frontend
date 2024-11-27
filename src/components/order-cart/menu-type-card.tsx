import React from 'react';

type Props = {
  type: string;
  isSelected: boolean;
};

export default function MenuTypeCard({ type, isSelected }: Props) {
  return (
    <div className={`border border-customOrange rounded-sm ${isSelected ? 'bg-customOrange' : 'bg-white'} p-2 text-xs font-semibold cursor-pointer hover:bg-customOrange text-nowrap`}>{type}</div>
  );
}
