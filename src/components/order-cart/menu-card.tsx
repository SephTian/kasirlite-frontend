import { Menu, MenuCart } from '@/lib/types';
import { formatRupiah } from '@/utils';
import React from 'react';
type Props = Omit<Menu, 'menuType' | 'menuTypeId'> & {
  onAddCart?: (param: MenuCart['menu']) => void;
};

export default function MenuCard({ id, image, name, price, discount, disabled, onAddCart }: Props) {
  const handleClick = () => {
    if (!disabled) {
      onAddCart?.({ id, name, price, discount });
    }
  };

  return (
    <div
      className={`transition-transform relative transform duration-100 rounded-md bg-gray-200 p-1 h-fit ${disabled ? 'cursor-not-allowed ' : 'cursor-pointer hover:scale-105'}`}
      onClick={handleClick}
    >
      <div className="w-full rounded-sm aspect-video bg-gray-300">
        {/* TODO: PASANG IMAGE */} {image}
      </div>
      <div className="">
        <p className="font-bold truncate text-xs my-2">{name}</p>
        <p className={`font-medium text-xs`}>{formatRupiah(price - discount)}</p>
      </div>
      {disabled && <div className="bg-white w-full h-full absolute top-0 left-0 opacity-50"></div>}
    </div>
  );
}
