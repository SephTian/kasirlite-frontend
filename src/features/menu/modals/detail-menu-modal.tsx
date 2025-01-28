import ModalWrapper from '@/components/custom-ui/modal-wrapper';
import { Menu } from '@/lib/types';
import React from 'react';
import { IoCloseCircleOutline } from 'react-icons/io5';

type Props = {
  isOpen: boolean;
  closeModal: () => void;
  menus?: Menu[];
  menuId?: number | null;
};

export default function DetailMenuModal({ isOpen, closeModal, menus, menuId }: Props) {
  const selectedMenu = menus?.filter((item: Menu) => Number(item.id) === menuId) || {};
  if (isOpen) {
    console.log(selectedMenu);
  }
  return (
    <ModalWrapper isOpen={isOpen} closeModal={closeModal} classname="w-full min-w-[300px] max-w-[600px]">
      <div className="flex w-full items-center justify-between mb-3">
        <p className="text-md font-bold">Detail Menu</p>
        <IoCloseCircleOutline className="w-6 h-6 cursor-pointer" onClick={closeModal} />
      </div>
      {selectedMenu && <div>ini form</div>}
    </ModalWrapper>
  );
}
