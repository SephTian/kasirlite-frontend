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

  return (
    <>
      {/* mobile max height work because the item list height can overflow */}
      <div className="p-6 flex flex-col gap-4 h-full max-h-[650px] sm:max-h-[calc(100vh-86px)] bg-[#fdfdfd] sm:col-span-3 lg:col-span-4 shadow-lg border rounded-lg">
        <OrderMenu setModalType={setCartModalType} toggleModal={toggleCartModal} menu={menu} />
      </div>

      {/* mobile max height NOT work because order receipt not overflowing. Can be overflowing, but when too much order in cart */}
      <div className="px-6 py-6 w-full min-w-[100px] h-full max-h-[650px] sm:max-h-[calc(100vh-86px)] flex flex-col gap-2 sm:col-span-3 lg:col-span-2 bg-[#fdfdfd] shadow-lg border rounded-lg">
        <OrderReceipt setCartModalType={setCartModalType} toggleCartModal={toggleCartModal} toggleReceiptModal={toggleReceiptModal} />
      </div>
      <CartDetailModal isOpen={isOpenCartModal} closeModal={toggleCartModal} modalType={cartModalType} />
      <ReceiptModal isOpen={isOpenReceiptModal} closeModal={toggleReceiptModal} />
    </>
  );
}
