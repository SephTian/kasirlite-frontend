'use client';
import { useState } from 'react';
import OrderMenuList from './order-menu-list';
import { menu, menuCart } from '@/lib/types';
import OrderReceipt from './order-receipt';

type Props = {
  menu: menu[];
};

export default function Order({ menu }: Props) {
  const [cart, setCart] = useState<menuCart[]>([]);
  // const [additionalModal, setAdditionalModal] = useState(false);
  const [selectedDetail, setSelectedDetail] = useState<menu>();
  const [editModal, setEditModal] = useState(false);
  const [addModal, setAddModal] = useState(false);
  {
    /* TODO: 
      0. mungkin tanpa modal tapi ordermenu listnya diubah
      1. modal buat edit item 
      1. modal buat input jika hasAdditional
      3. modal buat transaksi terakhir
  */
  }
  const handleEditModal = (index: number) => {
    // TODO: find item by index di cart
    // TODO: set di selected item
    // TODO: after that make a button to save the current state
    // TODO: clear selected state
    //setSelectedDetail()
    console.log(index);
    setEditModal(true);
  };

  const handleAddModal = (id: number) => {
    // TODO: find item by id di menu
    // TODO: set di selected item
    // TODO: after that make a button to add to cart
    // TODO: clear selected state
    //setSelectedDetail()
    console.log(id);
    setAddModal(true);
  };
  return (
    <>
      <div className="sm:col-span-3 lg:col-span-4">
        <OrderMenuList menu={menu} cart={cart} setCart={setCart} handleAddModal={handleAddModal} />
      </div>
      <div className="sm:col-span-3 lg:col-span-2">
        <OrderReceipt cart={cart} setCart={setCart} handleEditModal={handleEditModal} />
      </div>

      {editModal && (
        <div className="fixed top-0 left-0 z-[1000] w-full h-full flex items-center justify-center bg-black opacity-40">
          <div className="h-10 w-10 bg-white" onClick={() => setEditModal((prev) => !prev)}></div>
        </div>
      )}
    </>
  );
}
