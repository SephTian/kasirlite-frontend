import { Menu, MenuCart } from '@/lib/types';
import { formatRupiah } from '@/utils';
import foodItem from '@/assets/food-item.png';
import Image from 'next/image';
import React from 'react';
type Props = Omit<Menu, 'menuCategory'> & {
  onAddCart?: (param: MenuCart['menu']) => void;
};

export default function MenuCard({ id, image, name, price, discount, disabled, onAddCart }: Props) {
  const handleClick = () => {
    if (!disabled) {
      onAddCart?.({ id, name, price: Number(price), discount: Number(discount), image });
    }
  };

  return (
    <div
      className={`w-full transition-transform relative transform duration-100 rounded-md bg-gray-200 p-1 ${disabled ? 'cursor-not-allowed ' : 'cursor-pointer hover:scale-105'}`}
      onClick={handleClick}
    >
      <div className="w-full rounded-sm aspect-video bg-gray-300">
        <Image className="w-full h-full object-contain" src={image ?? foodItem} alt="error" />
      </div>
      <div className="">
        <p className="font-bold truncate text-xs my-2">{name}</p>
        <p className={`font-medium text-xs`}>{formatRupiah(price - discount)}</p>
      </div>
      {disabled && <div className="bg-white w-full h-full absolute top-0 left-0 opacity-50"></div>}
    </div>
  );
}
