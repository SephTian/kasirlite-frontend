'use client';
import OrderMenuList from './order-menu-list';
import { menu } from '@/lib/types';
import OrderReceipt from './order-receipt';
import CartDetailModal from '../modals/cart-detail-modal';
import useModal from '@/hooks/useModal';
import { useState } from 'react';

type Props = {
  menu: menu[];
};

export default function Order({ menu }: Props) {
  const [isOpen, toggleModal] = useModal() as [boolean, () => void];
  const [modalType, setModalType] = useState<'add' | 'edit'>('add');
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
      <div className="sm:col-span-3 lg:col-span-4">
        <OrderMenuList setModalType={setModalType} toggleModal={toggleModal} menu={menu} />
      </div>
      <div className="sm:col-span-3 lg:col-span-2">
        <OrderReceipt setModalType={setModalType} toggleModal={toggleModal} />
      </div>
      <CartDetailModal isOpen={isOpen} closeModal={toggleModal} modalType={modalType} />
    </>
  );
}
