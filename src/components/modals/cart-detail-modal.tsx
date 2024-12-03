import { RootState } from '@/lib/states';
import ModalWrapper from '../custom-ui/modal-wrapper';
import { useSelector } from 'react-redux';

type Props = {
  isOpen: boolean;
  closeModal: () => void;
  modalType: 'add' | 'edit'; // ini untuk aksi saat simpan barang dalam cart
};

export default function CartDetailModal({ isOpen, closeModal, modalType }: Props) {
  const { selectedMenu } = useSelector((state: RootState) => state.cart);

  // TODO: BUAT FUNGSI ADD DAN EDIT DENGAN CONDITIONAL TYPE
  return (
    <ModalWrapper isOpen={isOpen} closeModal={closeModal}>
      <div className="p-3 bg-white">
        <p>{selectedMenu?.menu.name}</p>
        <p>{selectedMenu?.quantity}</p>
        <p>{modalType}</p>
      </div>
    </ModalWrapper>
  );
}
