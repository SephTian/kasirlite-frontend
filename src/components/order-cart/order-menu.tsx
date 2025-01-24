'use client';

import MenuCategoryFilter from './menu-category-filter';
import { MenuCart } from '@/lib/types';
import { useSearchParams } from 'next/navigation';
import { Dispatch, SetStateAction } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/lib/states';
import { setSelectedMenu } from '@/lib/states/slices/cartSlice';
import MenuQueryFilter from './menu-query-filter';
import { useQuery } from '@tanstack/react-query';
import api from '@/lib/services/api';
import { getSession } from 'next-auth/react';
import MenuList from './menu-list';

type Props = {
  setModalType: Dispatch<SetStateAction<'add' | 'edit'>>;
  toggleModal: () => void;
};

export default function OrderMenu({ setModalType, toggleModal }: Props) {
  const dispatch: AppDispatch = useDispatch();
  const searchParams = useSearchParams();
  const menuKeywordParams = searchParams.get('keyword')?.toLowerCase() || '';
  const menuCategoryParams = searchParams.get('category')?.toLowerCase() || '';

  // menu data with tanstack query
  const menuData = useQuery({
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
  const menuCategoryData = useQuery({
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

  // Add cart to
  const handleOpenAddCartModal = (inputMenu: MenuCart['menu']) => {
    dispatch(setSelectedMenu({ menu: inputMenu, quantity: 1, menuIndex: null }));
    setModalType('add');
    toggleModal();
  };

  return (
    <>
      <MenuQueryFilter selectedKeyword={menuKeywordParams} />
      {menuCategoryData.data ? <MenuCategoryFilter menuCategories={menuCategoryData.data} selectedCategory={menuCategoryParams} /> : <p>Silahkan muat ulang halaman</p>}
      <h1 className="font-semibold">Daftar makanan:</h1>
      <div className="w-full p-2 min-h-0 flex-auto overflow-y-scroll rounded-lg bg-slate-100 shadow-inner">
        {menuData.error && <p>Silahkan muat ulang halaman</p>}
        {menuData.data && <MenuList onOpenAddCartModal={handleOpenAddCartModal} menus={menuData.data}></MenuList>}
      </div>
    </>
  );
}
