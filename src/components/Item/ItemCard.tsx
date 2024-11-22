import { food } from '@/lib/types';
import React from 'react';
type Props = food & {
  disabled: boolean;
  onClick?: (param: food) => void;
};

function ItemCard({ id, image, name, price, discount, isAdditional, menuType, menuTypeId, disabled, onClick }: Props) {
  const handleClick = () => {
    if (!disabled) {
      onClick?.({ id, image, name, menuType, menuTypeId, isAdditional, price, discount });
    }
  };

  return (
    <div
      className={`transition-transform relative transform duration-100 rounded-md bg-gray-200 p-3 ${
        disabled ? 'cursor-not-allowed after:w-full after:bg-white after:h-full after:top-0' : 'cursor-pointer hover:scale-105'
      }`}
      onClick={handleClick}
    >
      <div className="space-y-1">
        <div className="w-full rounded-sm aspect-video bg-gray-300">{/* TODO: PASANG IMAGE */}</div>
        <div className="">
          <p className="font-bold truncate">
            {name} - {id} - {image}
          </p>
          <p className="font-medium text-xs line-through text-gray-500">Rp.{price}</p>
          <p className="font-medium">Rp.{price - discount}</p>
        </div>
      </div>

      {disabled && <div className="bg-white w-full h-full absolute top-0 left-0 opacity-50"></div>}
    </div>
  );
}

export default ItemCard;
