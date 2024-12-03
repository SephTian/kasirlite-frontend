import { ReactNode } from 'react';

type Props = {
  isOpen: boolean;
  closeModal: () => void;
  children: ReactNode;
};

function ModalWrapper({ isOpen, closeModal, children }: Props) {
  if (!isOpen) {
    return null;
  }
  return (
    <div className="fixed top-0 left-0 z-[1000] w-full h-full flex items-center justify-center">
      <div className="w-full h-full bg-black opacity-40" onClick={closeModal}></div>
      <div className="absolute p-3">{children}</div>
    </div>
  );
}

export default ModalWrapper;
