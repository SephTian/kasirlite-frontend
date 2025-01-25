import { MenuCart } from '@/lib/types';
import { formatRupiah } from '@/utils';
import React from 'react';

type Props = {
  cart: MenuCart[];
  onOpenEditCartModal?: (idx: number) => void;
};

export default function ReceiptTable({ cart, onOpenEditCartModal }: Props) {
  return (
    <div className="h-full overflow-y-auto border border-gray-500 rounded-sm bg-slate-50">
      <table className="table-auto w-full text-left">
        <thead className="sticky top-0 text-xs font-medium text-gray-50 bg-gray-500">
          <tr className="w-full">
            <th className="p-2">Jumlah</th>
            <th className="p-2">Nama</th>
            <th className="p-2">Harga</th>
          </tr>
        </thead>
        <tbody className="text-xs text-customBlack">
          {cart.map((item, idx) => {
            return (
              <tr key={idx} onClick={() => onOpenEditCartModal?.(idx)} className="odd:bg-slate-300 even:bg-slate-200 w-full cursor-pointer">
                <td className="px-2 py-4">{item.quantity}</td>
                <td className="px-2 py-4">{item.menu.name}</td>
                <td className="px-2 py-4 font-semibold">{formatRupiah(item.subPrice)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
