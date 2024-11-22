import React from 'react';

type Props = {
  type: string;
  isSelected: boolean;
};

function ItemType({ type, isSelected }: Props) {
  return <div className={`border border-customOrange rounded-sm ${isSelected ? 'bg-customOrange' : 'bg-white'} p-2 text-sm font-semibold cursor-pointer hover:bg-customOrange`}>{type}</div>;
}

export default ItemType;
