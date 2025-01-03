'use client';
import { ReactNode, useEffect, useRef } from 'react';

type Props = {
  isOpen: boolean;
  closeModal: () => void;
  children: ReactNode;
};

function ModalWrapper({ isOpen, closeModal, children }: Props) {
  const modalRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutsideModal = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        closeModal();
      }
    };

    if (isOpen) {
      document.addEventListener('click', handleClickOutsideModal);
    }

    return () => {
      document.removeEventListener('click', handleClickOutsideModal);
    };
  }, [isOpen, closeModal]);

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed top-0 left-0 z-[1000] w-screen h-screen flex items-center justify-center overflow-y-scroll overflow-hidden bg-black/50 p-6">
      {/* <div className="absolute -z-10 w-full h-full flex-grow bg-black opacity-40" onClick={closeModal}></div> */}
      <div ref={modalRef} className="m-auto h-fit bg-white rounded-sm p-3">
        {children}
      </div>
    </div>
  );
}

export default ModalWrapper;
