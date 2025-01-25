'use client';
import DebounceInput from '@/components/custom-ui/debounce-input';
import api from '@/lib/services/api';
import { formatRupiah, paramsChange } from '@/utils';
import { useQuery } from '@tanstack/react-query';
import { getSession } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import React, { useCallback } from 'react';
import Filter from './filter';
import foodItem from '@/assets/food-item.png';
import { Menu as MenuType } from '@/lib/types';
import Image from 'next/image';
import Pagination from '@/components/custom-ui/pagination';

export default function Menu({}) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const keywordParams = searchParams.get('keyword')?.toLowerCase() || '';
  const categoryParams = searchParams.get('category')?.toLowerCase() || '';
  const pageParams = searchParams.get('page') || 1;

  // menu data with tanstack query
  const {
    data: menuData,
    // isPending: menuPending,
    // error: menuError,
  } = useQuery({
    queryKey: ['getMenus', keywordParams, categoryParams, pageParams],
    queryFn: async () => {
      const session = await getSession();
      return api.getMenus({
        params: {
          keyword: keywordParams,
          category: categoryParams,
          page: pageParams,
        },
        headers: {
          Authorization: `Bearer ${session?.accessToken}`,
        },
      });
    },
    refetchOnMount: false,
    refetchOnReconnect: false,
  });

  //@ TODO buat modal edit, create, detail

  const handleSearchChange = useCallback(
    (keyword: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set('keyword', keyword);
      router.replace(`?${params.toString()}`, { scroll: false });
    },
    [router, searchParams]
  );

  function handlePageChange(page: number) {
    router.replace(`?${paramsChange('page', page.toString(), searchParams.toString())}`, { scroll: false });
  }

  // just to make the value easier to get
  const currentPage = menuData?.pagination?.currentPage || 1;
  const totalPages = menuData?.pagination?.totalPages || 0;
  const totalItems = menuData?.pagination?.totalItems || 0;
  const limit = menuData?.pagination?.limit || 0;

  //@ TODO Betulin masalah angka di showing of entries dan nomor di tabel
  return (
    <>
      <Filter />
      <div className="border rounded-lg bg-[#fdfdfd] p-4 space-y-4">
        <DebounceInput onChange={handleSearchChange} placeholder="Cari menu..." debounceTime={500} searchParamName="keyword" />
        <table className="w-full">
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
            {menuData?.menus.map((item: MenuType, index: number) => {
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
                  <td>{formatRupiah(item.price)}</td>
                  <td>{formatRupiah(item.discount)}</td>
                  <td>
                    <input className="h-6 w-6" readOnly type="checkbox" checked={!item.disabled} />
                  </td>
                  <td>action</td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <div className="w-full flex justify-between">
          <p className="text-sm text-slate-500">
            Showing {(currentPage - 1) * limit + 1} to {currentPage * limit < totalItems ? currentPage * limit : totalItems} entries of {totalItems}
          </p>
          <Pagination totalPages={totalPages} currentPage={currentPage} onPageChange={handlePageChange} />
        </div>
      </div>
    </>
  );
}
