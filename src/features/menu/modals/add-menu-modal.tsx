import ModalWrapper from '@/components/custom-ui/modal-wrapper';
import React from 'react';
import { IoCloseCircleOutline } from 'react-icons/io5';

type Props = {
  isOpen: boolean;
  closeModal: () => void;
};

export default function AddMenuModal({ isOpen, closeModal }: Props) {
  return (
    <ModalWrapper isOpen={isOpen} closeModal={closeModal} classname="w-full min-w-[300px] max-w-[600px]">
      <div className="flex w-full items-center justify-between mb-3">
        <p className="text-md font-bold">Tambah Menu</p>
        <IoCloseCircleOutline className="w-6 h-6 cursor-pointer" onClick={closeModal} />
      </div>
    </ModalWrapper>
  );
}
