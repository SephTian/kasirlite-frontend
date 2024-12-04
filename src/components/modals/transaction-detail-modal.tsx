import React from 'react';
import ModalWrapper from '../custom-ui/modal-wrapper';

type Props = {
  isOpen: boolean;
  closeModal: () => void;
};

export default function TransactionDetailModal({ isOpen, closeModal }: Props) {
  return (
    <ModalWrapper isOpen={isOpen} closeModal={closeModal}>
      <div className="p-3 min-w-[250px] bg-white rounded-sm">transaction-detail-modal</div>
    </ModalWrapper>
  );
}
