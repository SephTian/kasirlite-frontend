'use client';

import React, { Dispatch, SetStateAction, useEffect } from 'react';
import Button from '../custom-ui/button';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/lib/states';
import { setSelectedMenu, setTotalPrice } from '@/lib/states/slices/cartSlice';
import ReceiptTable from './receipt-table';

type Props = {
  setCartModalType: Dispatch<SetStateAction<'add' | 'edit'>>;
  toggleCartModal: () => void;
  toggleReceiptModal: () => void;
};

export default function OrderReceipt({ setCartModalType, toggleCartModal, toggleReceiptModal }: Props) {
  const { cart, totalPrice } = useSelector((state: RootState) => state.cart);
  const dispatch: AppDispatch = useDispatch();
  const TAX: number = 0.12;

  const handleEditModal = (index: number) => {
    dispatch(setSelectedMenu({ ...cart[index], menuIndex: index }));
    setCartModalType('edit');
    toggleCartModal();
  };

  // set total price inside redux
  useEffect(() => {
    const tp = cart.reduce<number>((totalPrice, item) => {
      return (totalPrice += (item.menu.price - item.menu.discount) * item.quantity);
    }, 0);
    dispatch(setTotalPrice(tp));
  }, [cart, dispatch]);

  return (
    <div className="w-full px-6 py-6 space-y-2">
      <div className="text-center font-semibold mb-4">Transaksi</div>
      <div className="h-[360px]">
        <ReceiptTable cart={cart} handleEditModal={handleEditModal} />
      </div>
      <div className="px-2 space-y-2">
        <div className="flex justify-between items-center text-gray-500">
          <p className="text-xs font-semibold">Pajak</p>
          <p className="text-xs font-semibold">Rp.{totalPrice * TAX}</p>
        </div>
        <div className="flex justify-between items-center text-gray-500">
          <p className="text-xs font-semibold">Total</p>
          <p className="text-xs font-semibold">Rp.{totalPrice}</p>
        </div>
        <div className="flex justify-between items-center">
          <p className="text-sm font-semibold ">Harga Total</p>
          <p className="text-sm font-semibold">Rp.{totalPrice + totalPrice * TAX}</p>
        </div>
      </div>

      {/* TODO: form untuk checkout */}
      <Button
        disabled={cart.length === 0}
        onClick={() => {
          toggleReceiptModal();
        }}
        className="w-full bg-customOrange text-white px-3 py-2 font-semibold hover:bg-customDarkOrange disabled:bg-orange-300 disabled:cursor-not-allowed"
      >
        Konfirmasi
      </Button>
    </div>
  );
}
