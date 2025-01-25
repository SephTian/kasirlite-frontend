'use client';

import api from '@/lib/services/api';
import { useQuery } from '@tanstack/react-query';
import { getSession } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';
import React from 'react';

export default function Menu({}) {
  const searchParams = useSearchParams();
  const keywordParams = searchParams.get('keyword')?.toLowerCase() || '';
  const categoryParams = searchParams.get('category')?.toLowerCase() || '';
  const pageParams = searchParams.get('page') || 1;

  // menu data with tanstack query
  const menuData = useQuery({
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

  //@ TODO buat modal edit, create, detail

  //@ TODO buat filter search, kategori

  console.log(menuData.data);

  return (
    <>
      <div className="space-y-2">
        <div className="flex w-full gap-2">
          <div className="flex-grow border border-red-600">filter search</div>
        </div>
        <div>
          <div>filter</div>
          <div className="flex gap-2 flex-wrap">
            <div className="border border-green-600">filter category</div>
            <div className="border border-orange-600">filter min price</div>
            <div className="border border-orange-600">filter max price</div>
          </div>
        </div>
        <div>apply filter</div>
      </div>
      <div>table</div>
      <div className="w-full flex justify-between">
        <div>total data (10 of 10)</div>
        <div>pagination</div>
      </div>
    </>
  );
}
