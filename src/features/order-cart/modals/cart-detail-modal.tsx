import { AppDispatch, RootState } from '@/lib/states';
import ModalWrapper from '@/components/custom-ui/modal-wrapper';
import foodItem from '@/assets/food-item.png';
import { useDispatch, useSelector } from 'react-redux';
import { IoCloseCircleOutline } from 'react-icons/io5';
import { Button } from '@/components/ui/button';
import { addCartItem, deleteCartItem, setSelectedMenu, updateCartItem } from '@/lib/states/slices/cartSlice';
import { useToast } from '@/hooks/use-toast';
import Image from 'next/image';

type Props = {
  isOpen: boolean;
  closeModal: () => void;
  modalType: 'add' | 'edit'; // ini untuk aksi saat simpan barang dalam cart
};

export default function CartDetailModal({ isOpen, closeModal, modalType }: Props) {
  const dispatch: AppDispatch = useDispatch();
  const { toast } = useToast();
  const { selectedMenu } = useSelector((state: RootState) => state.cart);

  // Ini akan decrement item dari current item
  const handleDecrementItem = () => {
    if (!selectedMenu) return;

    if (selectedMenu.quantity > 1) {
      const updatedMenu = {
        ...selectedMenu,
        quantity: selectedMenu.quantity - 1,
      };
      dispatch(setSelectedMenu(updatedMenu));
    }
  };

  // Ini akan increment item dari current item
  const handleIncrementItem = () => {
    if (!selectedMenu) return;

    const updatedMenu = {
      ...selectedMenu,
      quantity: selectedMenu.quantity + 1,
    };
    dispatch(setSelectedMenu(updatedMenu));
  };

  const addButtons = (
    <Button
      className="w-full bg-customOrange text-white hover:bg-customDarkOrange text-secondary"
      onClick={() => {
        if (selectedMenu) {
          dispatch(addCartItem(selectedMenu));
          toast({
            variant: 'informative',
            title: 'Keranjang Berubah',
            description: 'Menu berhasil ditambahkan',
          });
        }
        closeModal();
      }}
    >
      Tambah
    </Button>
  );

  const editButtons = (
    <>
      <Button
        className="w-full bg-red-500 text-white hover:bg-red-800"
        onClick={() => {
          if (selectedMenu && selectedMenu.menuIndex !== null) {
            dispatch(deleteCartItem({ index: selectedMenu.menuIndex }));
            toast({
              variant: 'informative',
              title: 'Keranjang Berubah',
              description: 'Menu berhasil dihapus',
            });
            closeModal();
          }
        }}
      >
        Hapus
      </Button>
      <Button
        className="w-full bg-customOrange text-white hover:bg-customDarkOrange"
        onClick={() => {
          if (selectedMenu && selectedMenu.menuIndex !== null) {
            dispatch(updateCartItem({ index: selectedMenu.menuIndex, quantity: selectedMenu.quantity }));
            toast({
              variant: 'informative',
              title: 'Keranjang Berubah',
              description: 'Menu berhasil diubah',
            });
            closeModal();
          }
        }}
      >
        Simpan
      </Button>
    </>
  );

  return (
    <ModalWrapper isOpen={isOpen} closeModal={closeModal}>
      <div className="flex w-full items-center justify-between mb-3">
        <p className="text-md font-bold">{modalType === 'add' ? 'Tambah' : 'Ubah'}</p>
        <IoCloseCircleOutline className="w-6 h-6 cursor-pointer" onClick={closeModal} />
      </div>
      <div className="flex flex-col gap-1 items-center">
        <div className="w-[200px] aspect-square bg-gray-200 rounded-sm overflow-hidden">
          <Image className="w-full h-full object-contain" src={selectedMenu?.menu.image ?? foodItem} alt="error" />
        </div>
        <p className="text-md font-semibold">{selectedMenu?.menu.name}</p>
        <p className="text-sm font-medium text-gray-600">Rp {(selectedMenu?.menu.price || 0) - (selectedMenu?.menu.discount || 0)}</p>
        <div>
          <div className="flex h-8 w-fit items-center rounded-sm overflow-hidden border border-customOrange">
            <Button
              onClick={() => {
                handleDecrementItem();
              }}
              className="h-full w-8 bg-customOrange text-white rounded-none justify-center items-center hover:bg-customDarkOrange"
            >
              -
            </Button>
            <div className="w-14 text-center">{selectedMenu?.quantity}</div>
            <Button
              onClick={() => {
                handleIncrementItem();
              }}
              className="h-full w-8 bg-customOrange text-white flex rounded-none justify-center items-center hover:bg-customDarkOrange"
            >
              +
            </Button>
          </div>
        </div>
        <div className="flex gap-2 mt-6 w-full">
          {modalType === 'add' && addButtons}
          {modalType === 'edit' && editButtons}
        </div>
      </div>
    </ModalWrapper>
  );
}
