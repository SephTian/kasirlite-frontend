import React, { useState } from 'react';
import ModalWrapper from '../custom-ui/modal-wrapper';
import { food, foodCart } from '@/lib/types';

type Props = {
  selectedMenu: foodCart;
  additionalMenu: food;
  handleCart: () => void;
};

export default function CartDetailModal({ selectedMenu, food, handleCart }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [additional, setAdditional] = useState(selectedMenu.additional);

  return (
    <ModalWrapper isOpen={isOpen}>
      <div className="p-3 bg-white">
        <p>{selectedMenu.food.name}</p>
        <p>{selectedMenu.quantity}</p>
      </div>
    </ModalWrapper>
  );
}
