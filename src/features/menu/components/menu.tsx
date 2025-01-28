'use client';
import DebounceInput from '@/components/custom-ui/debounce-input';
import api from '@/lib/services/api';
import { paramsChange } from '@/utils';
import { useQuery } from '@tanstack/react-query';
import { getSession } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import React, { useCallback, useState } from 'react';
import Filter from './filter';
import { FaRegPlusSquare } from 'react-icons/fa';

import MenuTable from './menu-table';
import MenuTableLoading from './menu-table-loading';
import Button from '@/components/custom-ui/button';
import useModal from '@/hooks/useModal';
import AddMenuModal from '../modals/add-menu-modal';
import EditMenuModal from '../modals/edit-menu-modal';
import DetailMenuModal from '../modals/detail-menu-modal';

export default function Menu({}) {
  const searchParams = useSearchParams();
  const router = useRouter();

  // Modal state
  const [isOpenAddMenuModal, toggleAddMenuModal] = useModal();
  const [isOpenEditMenuModal, toggleEditMenuModal] = useModal();
  const [selectedEditMenuId, setSelectedEditMenuId] = useState<null | number>(null);
  const [isOpenDetailMenuModal, toggleDetailMenuModal] = useModal();
  const [selectedDetailMenuId, setSelectedDetailMenuId] = useState<null | number>(null);

  // search params var
  const keywordParams = searchParams.get('keyword')?.toLowerCase() || '';
  const categoryParams = searchParams.get('category')?.toLowerCase() || '';
  const pageParams = searchParams.get('page') || 1;

  // menu data with tanstack query
  const {
    data: menuData,
    isPending: menuPending,
    error: menuError,
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
    placeholderData: (previousData) => previousData,
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
  const currentPage = menuData?.pagination?.currentPage || pageParams;
  const totalPages = menuData?.pagination?.totalPages || 0;
  const totalItems = menuData?.pagination?.totalItems || 0;
  const limit = menuData?.pagination?.limit || 0;

  function handleOpenEditMenuModal(id: number) {
    setSelectedEditMenuId(id);
    toggleEditMenuModal();
  }

  function handleOpenDetailMenuModal(id: number) {
    setSelectedDetailMenuId(id);
    toggleDetailMenuModal();
  }

  //@ TODO Betulin masalah angka di showing of entries dan nomor di tabel -- done
  return (
    <>
      <div className="w-full sm:min-h-[calc(100vh-86px)] space-y-6">
        <Filter />
        <div className="border rounded-lg bg-[#fdfdfd] p-4 space-y-4">
          <div className="flex gap-3">
            <DebounceInput classname="flex-grow" onChange={handleSearchChange} placeholder="Cari menu..." debounceTime={500} searchParamName="keyword" />
            <Button className="bg-customOrange hover:bg-customDarkOrange text-white px-2 py-1 text-sm font-medium" onClick={toggleAddMenuModal}>
              <FaRegPlusSquare size={20} />
              Tambah
            </Button>
          </div>
          {menuPending && <MenuTableLoading />}
          {menuData && !menuPending && (
            <MenuTable
              menus={menuData?.menus}
              currentPage={currentPage}
              limit={limit}
              totalPages={totalPages}
              totalItems={totalItems}
              handlePageChange={handlePageChange}
              handleOpenEditMenuModal={handleOpenEditMenuModal}
              handleOpenDetailMenuModal={handleOpenDetailMenuModal}
            />
          )}
          {menuError && !menuPending && (
            <div className="w-full flex justify-center items-center h-10">
              <p className="text-center text-gray-500">Silahkan muat ulang halaman</p>
            </div>
          )}
        </div>
      </div>
      <AddMenuModal isOpen={isOpenAddMenuModal} closeModal={toggleAddMenuModal} />
      <EditMenuModal menus={menuData?.menus} menuId={selectedEditMenuId} isOpen={isOpenEditMenuModal} closeModal={toggleEditMenuModal} />
      <DetailMenuModal menus={menuData?.menus} menuId={selectedDetailMenuId} isOpen={isOpenDetailMenuModal} closeModal={toggleDetailMenuModal} />
    </>
  );
}
