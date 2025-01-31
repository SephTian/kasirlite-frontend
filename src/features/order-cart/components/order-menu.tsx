'use client';

import MenuCategoryFilter from './menu-category-filter';
import { MenuCart } from '@/lib/types';
import { useRouter, useSearchParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import api from '@/lib/services/api';
import { getSession } from 'next-auth/react';
import MenuList from './menu-list';
import DebounceInput from '@/components/custom-ui/debounce-input';
import { useCallback } from 'react';

type Props = {
  onOpenAddCartModal: (param: MenuCart['menu']) => void;
};

export default function OrderMenu({ onOpenAddCartModal }: Props) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const menuKeywordParams = searchParams.get('keyword')?.toLowerCase() || '';
  const menuCategoryParams = searchParams.get('category')?.toLowerCase() || '';

  // menu data with tanstack query
  const {
    data: menuData,
    isPending: menuPending,
    error: menuError,
  } = useQuery({
    queryKey: ['getMenus', menuKeywordParams, menuCategoryParams],
    queryFn: async () => {
      const session = await getSession();
      return api.getMenus({
        params: {
          keyword: menuKeywordParams,
          category: menuCategoryParams,
        },
        headers: {
          Authorization: `Bearer ${session?.accessToken}`, // Token untuk otentikasi
        },
      });
    },
    refetchOnMount: false,
    refetchOnReconnect: false,
  });

  // menu category data with tanstack query
  const { data: menuCategoryData } = useQuery({
    queryKey: ['getMenuCategories'],
    queryFn: async () => {
      const session = await getSession();
      return api.getMenuCategories({
        headers: {
          Authorization: `Bearer ${session?.accessToken}`, // Token untuk otentikasi
        },
      });
    },
    refetchOnMount: false,
    refetchOnReconnect: false,
  });

  const handleSearchChange = useCallback(
    (keyword: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set('keyword', keyword);
      router.replace(`?${params.toString()}`, { scroll: false });
    },
    [router, searchParams]
  );

  return (
    <>
      <DebounceInput classname="w-full" placeholder="Cari menu.." debounceTime={500} searchParamName="keyword" onChange={handleSearchChange} />
      {menuCategoryData ? <MenuCategoryFilter menuCategories={menuCategoryData} selectedCategory={menuCategoryParams} /> : <p>Silahkan muat ulang halaman</p>}
      <h1 className="font-semibold">Daftar makanan:</h1>
      <div className="w-full p-2 min-h-0 flex-auto overflow-y-scroll rounded-lg bg-slate-100 shadow-inner">
        {menuData && !menuPending && <MenuList onOpenAddCartModal={onOpenAddCartModal} menus={menuData.menus}></MenuList>}
        {menuError && !menuPending && <p className="font-semibold">Silahkan refresh halaman!</p>}
      </div>
    </>
  );
}
