import { menu } from '@/lib/types';
import React from 'react';
type Props = menu & {
  onClick?: (param: Omit<menu, 'isAdditional' | 'disabled'>) => void;
};

export default function MenuCard({ id, image, name, price, discount, menuType, menuTypeId, disabled, onClick }: Props) {
  const handleClick = () => {
    if (!disabled) {
      onClick?.({ id, image, name, menuType, menuTypeId, price, discount });
    }
  };

  return (
    <div className={`transition-transform relative transform duration-100 rounded-md bg-gray-200 p-1 ${disabled ? 'cursor-not-allowed ' : 'cursor-pointer hover:scale-105'}`} onClick={handleClick}>
      <div className="space-y-1">
        <div className="w-full rounded-sm aspect-video bg-gray-300">{/* TODO: PASANG IMAGE */}</div>
        <div className="">
          <p className="font-bold truncate text-xs">
            {name} - {id} - {image}
          </p>
          <p className="font-medium text-xs line-through text-gray-500">Rp.{price}</p>
          <p className="font-medium text-xs">Rp.{price - discount}</p>
        </div>
      </div>

      {disabled && <div className="bg-white w-full h-full absolute top-0 left-0 opacity-50"></div>}
    </div>
  );
}
