import { menuCart } from '@/lib/types';
import React from 'react';

type Props = {
  cartItem: menuCart;
  onClick?: () => void;
};

export default function ReceiptCard({ cartItem, onClick }: Props) {
  {
    /* <div className="space-y-2 overflow-y-scroll h-[500px] border border-gray-300 rounded-md">
        
        {cart.map((item, idx) => {
          return <ReceiptCard key={idx} onClick={() => handleEditModal(idx)} cartItem={item} />;
        })}
      </div> */
  }
  return (
    <div className={`rounded-sm overflow-hidden ${onClick ? 'cursor-pointer' : 'cursor-default'}`} onClick={onClick}>
      <div className="flex items-center justify-between bg-gray-200 p-3 rounded-t-sm gap-1">
        <p className="text-xs font-semibold truncate">{cartItem.menu.name}</p>
        <p className="text-xs font-semibold text-gray-600 text-nowrap">
          Rp.{cartItem.menu.price - cartItem.menu.discount} x {cartItem.quantity}
        </p>
      </div>
    </div>
  );
}
