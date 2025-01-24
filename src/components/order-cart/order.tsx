'use client';
import OrderMenu from './order-menu';
import OrderReceipt from './order-receipt';
import CartDetailModal from '../modals/cart-detail-modal';
import useModal from '@/hooks/useModal';
import { useCallback, useState } from 'react';
import ReceiptModal from '../modals/receipt-modal';
import { TAX } from '@/utils/constan';
import { AppDispatch, RootState } from '@/lib/states';
import { useDispatch, useSelector } from 'react-redux';
import { MenuCart } from '@/lib/types';
import { setSelectedMenu } from '@/lib/states/slices/cartSlice';

export default function Order() {
  // modal
  const [isOpenCartModal, toggleCartModal] = useModal() as [boolean, () => void];
  const [isOpenReceiptModal, toggleReceiptModal] = useModal() as [boolean, () => void];

  // state for cart modal
  const [cartModalType, setCartModalType] = useState<'add' | 'edit'>('add');

  // state
  const dispatch: AppDispatch = useDispatch();
  const { cart } = useSelector((state: RootState) => state.cart);

  // Add cart to
  const handleOpenAddCartModal = useCallback(
    (inputMenu: MenuCart['menu']) => {
      dispatch(setSelectedMenu({ menu: inputMenu, quantity: 1, menuIndex: null }));
      setCartModalType('add');
      toggleCartModal();
    },
    [dispatch, toggleCartModal]
  );

  const handleOpenEditCartModal = useCallback(
    (index: number) => {
      dispatch(setSelectedMenu({ ...cart[index], menuIndex: index }));
      setCartModalType('edit');
      toggleCartModal();
    },
    [dispatch, toggleCartModal, cart]
  );

  return (
    <>
      {/* mobile max height work because the item list height can overflow */}
      <div className="flex flex-col gap-4 h-full max-h-[650px] sm:max-h-[calc(100vh-118px)] sm:col-span-3 lg:col-span-4">
        <OrderMenu onOpenAddCartModal={handleOpenAddCartModal} />
      </div>

      {/* mobile max height NOT work because order receipt not overflowing. Can be overflowing, but when too much order in cart */}
      <div className="flex flex-col gap-2 w-full min-w-[100px] h-full max-h-[650px] sm:max-h-[calc(100vh-118px)] sm:col-span-3 lg:col-span-2">
        <OrderReceipt tax={TAX} onOpenEditCartModal={handleOpenEditCartModal} toggleReceiptModal={toggleReceiptModal} />
      </div>
      <CartDetailModal isOpen={isOpenCartModal} closeModal={toggleCartModal} modalType={cartModalType} />
      <ReceiptModal tax={TAX} isOpen={isOpenReceiptModal} closeModal={toggleReceiptModal} />
    </>
  );
}
