'use client';
import MenuCard from '@/components/order-cart/menu-card';
import MenuCategoryFilter from './menu-category-filter';
import { Menu, MenuCart } from '@/lib/types';
import { useSearchParams } from 'next/navigation';
import { Dispatch, SetStateAction } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/lib/states';
import { setSelectedMenu } from '@/lib/states/slices/cartSlice';
import MenuQueryFilter from './menu-query-filter';
import { useQuery } from '@tanstack/react-query';
import api from '@/lib/services/api';
import { getSession } from 'next-auth/react';

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
    queryKey: ['menus', menuKeywordParams, menuCategoryParams],
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
  });

  // menu category data with tanstack query
  const menuCategoryData = useQuery({
    queryKey: ['menuCategories'],
    queryFn: async () => {
      const session = await getSession();
      return api.getMenuCategories({
        headers: {
          Authorization: `Bearer ${session?.accessToken}`, // Token untuk otentikasi
        },
      });
    },
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
      <MenuCategoryFilter menuCategories={menuCategoryData.data} selectedCategory={menuCategoryParams} />
      <h1 className="font-semibold">Daftar makanan:</h1>
      <div className="w-full p-2 min-h-0 flex-auto overflow-y-scroll rounded-lg bg-slate-100 shadow-inner">
        <div className="h-fit w-full grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {menuData.data.map((item: Menu) => {
            return <MenuCard onOpenAddCartModal={handleOpenAddCartModal} key={item.id} {...item} />;
          })}
          {menuData.data.map((item: Menu) => {
            return <MenuCard onOpenAddCartModal={handleOpenAddCartModal} key={item.id} {...item} />;
          })}
          {menuData.data.map((item: Menu) => {
            return <MenuCard onOpenAddCartModal={handleOpenAddCartModal} key={item.id} {...item} />;
          })}
          {menuData.data.map((item: Menu) => {
            return <MenuCard onOpenAddCartModal={handleOpenAddCartModal} key={item.id} {...item} />;
          })}
        </div>
      </div>
    </>
  );
}
