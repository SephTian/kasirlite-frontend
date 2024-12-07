import React, { useMemo } from 'react';
import ModalWrapper from '../custom-ui/modal-wrapper';
import { IoCloseCircleOutline } from 'react-icons/io5';
import ReceiptForm from '../forms/receipt-form';
import { useSelector } from 'react-redux';
import { RootState } from '@/lib/states';

type Props = {
  isOpen: boolean;
  closeModal: () => void;
};

export default function ReceiptModal({ isOpen, closeModal }: Props) {
  const { cart } = useSelector((state: RootState) => state.cart);

  // Count total price from cart
  const totalPrice: number = useMemo(
    () =>
      cart.reduce<number>((totalPrice, item) => {
        return (totalPrice += (item.menu.price - item.menu.discount) * item.quantity);
      }, 0),
    [cart]
  );

  // TODO: Maybe later using props to acces totalPriceWithTax
  const TAX: number = 0.12;
  const totalPriceWithTax = totalPrice + totalPrice * TAX;

  return (
    <ModalWrapper isOpen={isOpen} closeModal={closeModal}>
      {/* Card Title */}
      <div className="flex w-full items-center justify-between mb-3">
        <p className="text-md font-bold">Detil Transaksi</p>
        <IoCloseCircleOutline className="w-6 h-6 cursor-pointer" onClick={closeModal} />
      </div>

      {/* Card Body */}
      <div className="h-full">
        <div className="bg-customOrange rounded-md py-2 px-4 text-white shadow-lg">
          <div className="text-lg flex justify-between items-center">
            <p className="text-sm">Total Harga + Pajak:</p>
            <p className="font-semibold">Rp.{totalPriceWithTax}</p>
          </div>
        </div>
        <div className="text-center text-sm font-semibold text-gray-500 my-4">Masukkan detil pembayaran</div>
        <ReceiptForm totalPriceWithTax={totalPriceWithTax} />
      </div>
    </ModalWrapper>
  );
}
