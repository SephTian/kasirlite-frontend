import { menuCart } from '@/lib/types';
import React, { Dispatch, SetStateAction } from 'react';
import Button from '../custom-ui/button';

type Props = {
  cartItem: menuCart;
  cartIndex: number;
  cart: menuCart[];
  setCart: Dispatch<SetStateAction<menuCart[]>>;
  onEditModal: (param: number) => void;
};

export default function CartCard({ cartItem, cartIndex, cart, setCart, onEditModal }: Props) {
  // const handleDecrementItem = (id: number) => {
  //   let isZero = false;
  //   const currentCart = cart.map((item) => {
  //     // Checking if item in cart, so the quantity will be incremented
  //     if (item.menu.id === id) {
  //       if (item.quantity - 1 > 0) {
  //         return { ...item, quantity: item.quantity - 1 };
  //       }

  //       isZero = true;
  //       return item;
  //     }
  //     return item;
  //   });

  //   // If item not in cart then we add new item
  //   if (isZero) {
  //     const cartWithRemovedItem = cart.filter((item) => item.menu.id !== id);
  //     setCart(cartWithRemovedItem);
  //     return;
  //   }

  //   setCart(currentCart);
  // };

  // const handleIncrementItem = (id: number) => {
  //   const currentCart = cart.map((item) => {
  //     // Checking if item in cart, so the quantity will be incremented
  //     if (item.menu.id === id) {
  //       return { ...item, quantity: item.quantity + 1 };
  //     }
  //     return item;
  //   });

  //   setCart(currentCart);
  // };

  // // update cart by input
  // const handleUpdateQuantity = (id: number, quantity: number) => {
  //   const currentCart = cart.map((item) => {
  //     if (item.menu.id === id) {
  //       const formatedQuantity = !quantity || quantity < 1 ? 0 : quantity;
  //       return { ...item, quantity: formatedQuantity };
  //     }
  //     return item;
  //   });

  //   setCart(currentCart);
  // };
  return (
    <div className="rounded-sm overflow-hidden cursor-pointer" onClick={() => onEditModal(cartIndex)}>
      <div className="flex items-center justify-between bg-gray-200 p-3 rounded-t-sm gap-1">
        <p className="text-xs font-semibold truncate">{cartItem.menu.name}</p>
        <p className="text-xs font-semibold text-gray-600 text-nowrap">
          Rp.{cartItem.menu.price - cartItem.menu.discount} x {cartItem.quantity}
        </p>
        {/* <div className="flex h-8 w-fit items-center rounded-sm overflow-hidden border border-customOrange">
          <Button
            onClick={() => {
              handleDecrementItem(cartItem.menu.id);
            }}
            className="h-full w-8 bg-customOrange text-white rounded-none"
          >
            -
          </Button>
          <input
            className="h-full w-8 bg-orange-100 text-center focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none text-xs lg:text-base"
            type="number"
            value={cartItem.quantity}
            onChange={(e) => handleUpdateQuantity(cartItem.menu.id, parseInt(e.target.value))}
          />
          <Button
            onClick={() => {
              handleIncrementItem(cartItem.menu.id);
            }}
            className="h-full w-8 bg-customOrange text-white flex rounded-none"
          >
            +
          </Button>
        </div> */}
      </div>
      {cartItem.menu.hasAdditional && (
        <>
          <div className="bg-gray-300 space-y-1 py-2 px-3">
            <p className="text-xs font-semibold text-gray-600">Tambahan:</p>

            {/* TODO: buat additional item */}
            <div className="pl-5">
              <div className="flex justify-between items-center gap-1 flex-nowrap">
                <p className="text-xs font-semibold truncate">Telor Dadar</p>
                <p className="text-xs font-semibold text-gray-600">Rp.{cartItem.menu.price - cartItem.menu.discount}</p>
              </div>
            </div>
          </div>
          {/* <Button className="bg-customOrange rounded-none text-white w-full text-sm py-2">Tambahan</Button> */}
        </>
      )}
    </div>
  );
}
