'use client';
import OrderMenu from './order-menu';
import { Menu } from '@/lib/types';
import OrderReceipt from './order-receipt';
import CartDetailModal from '../modals/cart-detail-modal';
import useModal from '@/hooks/useModal';
import { useState } from 'react';
import ReceiptModal from '../modals/receipt-modal';

type Props = {
  menu: Menu[];
};

export default function Order({ menu }: Props) {
  const [isOpenCartModal, toggleCartModal] = useModal() as [boolean, () => void];
  const [cartModalType, setCartModalType] = useState<'add' | 'edit'>('add');
  const [isOpenReceiptModal, toggleReceiptModal] = useModal() as [boolean, () => void];
  {
    /* TODO: 
      0. mungkin tanpa modal tapi ordermenu listnya diubah
      1. modal buat edit item 
      1. modal buat input jika hasAdditional
      3. modal buat transaksi terakhir
  */
  }

  return (
    <>
      <div className="sm:col-span-3 lg:col-span-4 h-full bg-[#fdfdfd] shadow-lg border rounded-lg">
        <OrderMenu setModalType={setCartModalType} toggleModal={toggleCartModal} menu={menu} />
      </div>
      <div className="sm:col-span-3 lg:col-span-2 h-fit min-w-[100px] bg-[#fdfdfd] shadow-lg border rounded-lg">
        <OrderReceipt setCartModalType={setCartModalType} toggleCartModal={toggleCartModal} toggleReceiptModal={toggleReceiptModal} />
      </div>
      <CartDetailModal isOpen={isOpenCartModal} closeModal={toggleCartModal} modalType={cartModalType} />
      <ReceiptModal isOpen={isOpenReceiptModal} closeModal={toggleReceiptModal} />
    </>
  );
}
