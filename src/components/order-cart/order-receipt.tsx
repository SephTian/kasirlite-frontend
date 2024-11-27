'use client';
import { menuCart } from '@/lib/types';
import React, { Dispatch, SetStateAction, useMemo } from 'react';
import Button from '../custom-ui/button';
import CartCard from './cart-card';

type Props = {
  cart: menuCart[];
  setCart: Dispatch<SetStateAction<menuCart[]>>;
  handleEditModal: (param: number) => void;
};

export default function OrderReceipt({ cart, setCart, handleEditModal }: Props) {
  const totalPrice: number = useMemo(
    () =>
      cart.reduce<number>((totalPrice, item) => {
        console.log('hi');
        return (totalPrice += (item.menu.price - item.menu.discount) * item.quantity);
      }, 0),
    [cart]
  );

  return (
    <div className="min-w-[100px] h-fit w-full px-6 py-6 bg-white border border-gray-200 rounded-lg shadow-lg space-y-2">
      <div className="text-center font-semibold mb-4">Transaksi</div>
      <div className="space-y-2 overflow-y-scroll h-[500px] border border-gray-300 rounded-md p-2">
        {cart.map((item, idx) => {
          return <CartCard key={idx} cartIndex={idx} cartItem={item} cart={cart} setCart={setCart} onEditModal={handleEditModal} />;
        })}
      </div>
      <div className="flex justify-between items-center">
        <p className="text-sm font-semibold">Pajak</p>
        <p className="text-sm font-semibold">Rp.{totalPrice}</p>
      </div>
      <div className="flex justify-between items-center">
        <p className="text-sm font-semibold">Total Harga</p>
        <p className="text-sm font-semibold">Rp.{totalPrice}</p>
      </div>
      {/* <Link href="/setting">tes</Link> */}
      <Button
        disabled={cart.length === 0}
        onClick={async () => {
          ///handleSession();
          // await signOut({ redirect: false });
          // router.push('/login');
        }}
        className="w-full bg-customOrange text-white px-3 py-2 font-semibold hover:bg-customDarkOrange disabled:bg-orange-300"
      >
        Bayar
      </Button>
    </div>
  );
}
