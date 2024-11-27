import { ReactNode } from 'react';

type Props = {
  isOpen: boolean;
  children: ReactNode;
};

function ModalWrapper({ isOpen, children }: Props) {
  if (!isOpen) {
    return null;
  }
  return <div className="fixed top-0 left-0 z-[1000] w-full h-full flex items-center justify-center bg-black opacity-40">{children}</div>;
}

export default ModalWrapper;
