'use client';
import OrderMenu from './order-menu';
import OrderReceipt from './order-receipt';
import CartDetailModal from '../modals/cart-detail-modal';
import useModal from '@/hooks/useModal';
import { useState } from 'react';
import ReceiptModal from '../modals/receipt-modal';

export default function Order() {
  // modal
  const [isOpenCartModal, toggleCartModal] = useModal() as [boolean, () => void];
  const [isOpenReceiptModal, toggleReceiptModal] = useModal() as [boolean, () => void];

  // state for cart modal
  const [cartModalType, setCartModalType] = useState<'add' | 'edit'>('add');

  // tax
  const TAX: number = 0.11; // PPN 11%

  return (
    <>
      {/* mobile max height work because the item list height can overflow */}
      <div className="flex flex-col gap-4 h-full max-h-[650px] sm:max-h-[calc(100vh-118px)] sm:col-span-3 lg:col-span-4">
        <OrderMenu setModalType={setCartModalType} toggleModal={toggleCartModal} />
      </div>

      {/* mobile max height NOT work because order receipt not overflowing. Can be overflowing, but when too much order in cart */}
      <div className="flex flex-col gap-2 w-full min-w-[100px] h-full max-h-[650px] sm:max-h-[calc(100vh-118px)] sm:col-span-3 lg:col-span-2">
        <OrderReceipt tax={TAX} setCartModalType={setCartModalType} toggleCartModal={toggleCartModal} toggleReceiptModal={toggleReceiptModal} />
      </div>
      <CartDetailModal isOpen={isOpenCartModal} closeModal={toggleCartModal} modalType={cartModalType} />
      <ReceiptModal tax={TAX} isOpen={isOpenReceiptModal} closeModal={toggleReceiptModal} />
    </>
  );
}
