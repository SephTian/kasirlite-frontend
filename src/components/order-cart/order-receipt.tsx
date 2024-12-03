'use client';

import React, { Dispatch, SetStateAction, useMemo } from 'react';
import Button from '../custom-ui/button';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/lib/states';
import { setSelectedMenu } from '@/lib/states/slices/cartSlice';

type Props = {
  setModalType: Dispatch<SetStateAction<'add' | 'edit'>>;
  toggleModal: () => void;
};

export default function OrderReceipt({ setModalType, toggleModal }: Props) {
  const { cart } = useSelector((state: RootState) => state.cart);
  const dispatch: AppDispatch = useDispatch();

  const handleEditModal = (index: number) => {
    dispatch(setSelectedMenu({ ...cart[index], menuIndex: index }));
    setModalType('edit');
    toggleModal();
  };

  // Count total price from cart
  const totalPrice: number = useMemo(
    () =>
      cart.reduce<number>((totalPrice, item) => {
        return (totalPrice += (item.menu.price - item.menu.discount) * item.quantity);
      }, 0),
    [cart]
  );

  return (
    <div className="min-w-[100px] h-full w-full px-6 py-6 bg-white border border-gray-200 rounded-lg shadow-lg space-y-2">
      <div className="text-center font-semibold mb-4">Transaksi</div>

      {/* List menu on cart */}
      <div className="h-[350px] overflow-y-auto border border-gray-500 rounded-sm">
        <table className="table-auto w-full text-left ">
          <thead className="sticky top-0 text-xs font-medium text-gray-50 bg-gray-500">
            <tr className="w-full">
              <th className="p-2">Jumlah</th>
              <th className="p-2">Nama</th>
              <th className="p-2">Harga</th>
            </tr>
          </thead>
          <tbody className="text-xs text-customBlack">
            {cart.map((item, idx) => {
              return (
                <tr key={idx} onClick={() => handleEditModal(idx)} className="odd:bg-slate-300 even:bg-slate-200 w-full cursor-pointer">
                  <td className="px-2 py-4">{item.quantity}</td>
                  <td className="px-2 py-4">{item.menu.name}</td>
                  <td className="px-2 py-4 font-semibold">Rp.{(item.menu.price - item.menu.discount) * item.quantity}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
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
