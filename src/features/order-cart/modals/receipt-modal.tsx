import ModalWrapper from '@/components/custom-ui/modal-wrapper';
import { IoCloseCircleOutline } from 'react-icons/io5';
import ReceiptForm from '../forms/receipt-form';
import { useSelector } from 'react-redux';
import { RootState } from '@/lib/states';

type Props = {
  isOpen: boolean;
  closeModal: () => void;
  tax: number;
};

export default function ReceiptModal({ isOpen, closeModal, tax }: Props) {
  const { totalPrice } = useSelector((state: RootState) => state.cart);

  return (
    <ModalWrapper isOpen={isOpen} closeModal={closeModal} classname="w-full min-w-[300px] max-w-[800px]">
      {/* Card Title */}
      <div className="flex w-full items-center justify-between mb-3">
        <p className="text-md font-bold">Detil Transaksi</p>
        <IoCloseCircleOutline className="w-6 h-6 cursor-pointer" onClick={closeModal} />
      </div>

      {/* Card Body */}
      <div className="h-full w-full">
        <div className="text-center text-sm font-semibold text-gray-500 my-4">Masukkan detil pembayaran</div>
        <ReceiptForm totalPrice={totalPrice} tax={tax} closeModal={closeModal} />
      </div>
    </ModalWrapper>
  );
}
