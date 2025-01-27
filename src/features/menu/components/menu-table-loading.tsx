import React from 'react';

export default function MenuTableLoading({}) {
  const ROW = 5;
  const skeletonRow = [];

  for (let i = 0; i < ROW; i++) {
    skeletonRow.push(
      <tr key={i} className="border-b-2 border-b-customOrange">
        <td className="p-1">
          <div className="h-8 w-full bg-slate-300"></div>
        </td>
        <td className="p-1">
          <div className="h-8 w-full bg-slate-300"></div>
        </td>
        <td className="p-1">
          <div className="h-8 w-full bg-slate-300"></div>
        </td>
        <td className="p-1">
          <div className="h-8 w-full bg-slate-300"></div>
        </td>
        <td className="p-1">
          <div className="h-8 w-full bg-slate-300"></div>
        </td>
        <td className="p-1">
          <div className="h-8 w-full bg-slate-300"></div>
        </td>
        <td className="p-1">
          <div className="h-8 w-full bg-slate-300"></div>
        </td>
        <td className="p-1">
          <div className="h-8 w-full bg-slate-300"></div>
        </td>
      </tr>
    );
  }
  return (
    <div>
      <table className="w-full border border-customOrange rounded-lg">
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
        <tbody className="text-sm animate-pulse">{skeletonRow}</tbody>
      </table>
    </div>
  );
}
