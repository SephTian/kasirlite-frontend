'use client';

import React, { Dispatch, SetStateAction, useEffect } from 'react';
import Button from '../custom-ui/button';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/lib/states';
import { setSelectedMenu, setTotalPrice } from '@/lib/states/slices/cartSlice';
import ReceiptTable from './receipt-table';
import { formatRupiah } from '@/utils';

type Props = {
  setCartModalType: Dispatch<SetStateAction<'add' | 'edit'>>;
  toggleCartModal: () => void;
  toggleReceiptModal: () => void;
  tax: number;
};

export default function OrderReceipt({ setCartModalType, toggleCartModal, toggleReceiptModal, tax }: Props) {
  const { cart, totalPrice } = useSelector((state: RootState) => state.cart);
  const dispatch: AppDispatch = useDispatch();

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
    <>
      <div className="text-center font-semibold">Transaksi</div>
      <div className="min-h-[150px] flex-auto overflow-y-scroll">
        <ReceiptTable cart={cart} handleEditModal={handleEditModal} />
      </div>
      <div className="px-2 space-y-2">
        <div className="flex justify-between items-center text-gray-500">
          <p className="text-xs font-semibold">Total</p>
          <p className="text-xs font-semibold">{formatRupiah(totalPrice)}</p>
        </div>
        <div className="flex justify-between items-center text-gray-500">
          <p className="text-xs font-semibold">Pajak</p>
          <p className="text-xs font-semibold">{formatRupiah(totalPrice * tax)}</p>
        </div>
        <div className="flex justify-between items-center">
          <p className="text-sm font-semibold ">Harga Total</p>
          <p className="text-sm font-semibold">{formatRupiah(totalPrice + totalPrice * tax)}</p>
        </div>
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
    </>
  );
}
