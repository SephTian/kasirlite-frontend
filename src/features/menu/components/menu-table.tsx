import { Menu } from '@/lib/types';
import { formatRupiah } from '@/utils';
import Image from 'next/image';
import React from 'react';
import foodItem from '@/assets/food-item.png';
import Pagination from '@/components/custom-ui/pagination';
import { IoInformationCircleOutline } from 'react-icons/io5';
import { MdModeEdit } from 'react-icons/md';
import Button from '@/components/custom-ui/button';

type Props = {
  menus: Menu[];
  currentPage: number;
  limit: number;
  totalItems: number;
  totalPages: number;
  handlePageChange: (page: number) => void;
  handleOpenEditMenuModal: (id: number) => void;
  handleOpenDetailMenuModal: (id: number) => void;
};

export default function MenuTable({ menus, currentPage, limit, totalItems, totalPages, handlePageChange, handleOpenEditMenuModal, handleOpenDetailMenuModal }: Props) {
  return (
    <div>
      <table className="w-full border border-customOrange">
        <thead className="text-sm text-start font-medium text-gray-50 bg-customOrange">
          <tr className="w-full">
            <th className="p-2">No</th>
            <th className="p-2">Gambar</th>
            <th className="p-2">Nama</th>
            <th className="p-2">Kategori</th>
            <th className="p-2">Harga</th>
            <th className="p-2">Diskon</th>
            <th className="p-2">Apakah aktif?</th>
            <th className="p-2">Aksi</th>
          </tr>
        </thead>
        <tbody className="text-sm">
          {menus.length > 0 ? (
            menus.map((item, index: number) => {
              return (
                <tr key={item.id} className="text-center font-medium border-b-2 border-b-customOrange">
                  <td>{(currentPage - 1) * limit + index + 1}</td>
                  <td className="text-center p-1 flex justify-center items-center">
                    <div className="w-[60px] rounded-sm aspect-square bg-gray-300">
                      <Image className="w-full h-full object-contain" src={item.image ?? foodItem} alt="error" />
                    </div>
                  </td>
                  <td>{item.name}</td>
                  <td>{item.menuCategory.name}</td>
                  <td>{formatRupiah(Number(item.price))}</td>
                  <td>{formatRupiah(Number(item.discount))}</td>
                  <td>
                    <input className="h-6 w-6" readOnly type="checkbox" checked={!item.disabled} />
                  </td>
                  <td>
                    <div className="flex gap-3 justify-center items-center">
                      <Button onClick={() => handleOpenDetailMenuModal(Number(item.id))} className="p-2 bg-blue-500 text-white hover:bg-blue-600">
                        <IoInformationCircleOutline size={20} />
                      </Button>
                      <Button onClick={() => handleOpenEditMenuModal(Number(item.id))} className="p-2 bg-orange-500 text-white hover:bg-orange-600">
                        <MdModeEdit size={20} />
                      </Button>
                    </div>
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan={8} className="h-14 px-4 py-2 text-center text-gray-500">
                Tidak ada data yang tersedia
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <div className="w-full flex justify-between mt-5">
        <p className="text-sm text-slate-500">
          Showing {(currentPage - 1) * limit + 1} to {currentPage * limit < totalItems ? currentPage * limit : totalItems} entries of {totalItems}
        </p>
        <Pagination totalPages={totalPages} currentPage={currentPage} onPageChange={handlePageChange} />
      </div>
    </div>
  );
}
