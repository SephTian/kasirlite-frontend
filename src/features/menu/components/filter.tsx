import Button from '@/components/custom-ui/button';
import LabelRupiahInput from '@/components/custom-ui/label-rupiah-input';
import LabelSelect from '@/components/custom-ui/label-select';
import { useInput } from '@/hooks/useInput';
import { useInputPrice } from '@/hooks/useInputPrice';
import api from '@/lib/services/api';
import { MenuCategory } from '@/lib/types';
import { formatPriceToNumber } from '@/utils';
import { useQuery } from '@tanstack/react-query';
import { getSession } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import React from 'react';

export default function Filter({}) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [categoryFilter, handleCategoryFilterChange] = useInput('');
  const [minPriceFilter, handleMinPriceFilterChange] = useInputPrice('');
  const [maxPriceFilter, handleMaxPriceFilterChange] = useInputPrice('');

  // add filter to url
  const handleFilter = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('category', categoryFilter);
    if (minPriceFilter && minPriceFilter !== '') {
      params.set('minPrice', formatPriceToNumber(minPriceFilter).toString());
    } else {
      params.set('minPrice', '');
    }
    if (maxPriceFilter && maxPriceFilter !== '') {
      params.set('maxPrice', formatPriceToNumber(maxPriceFilter).toString());
    } else {
      params.set('maxPrice', '');
    }
    params.set('page', '1');
    router.replace(`?${params.toString()}`, { scroll: false });
  };

  // menu category data with tanstack query
  const { data: menuCategoryData, isPending: menuCategoryPending } = useQuery({
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

  return (
    <div className="space-y-2 border rounded-lg bg-[#fdfdfd] p-4">
      <div>
        <div className="flex w-full justify-between items-center gap-3">
          <div className="flex gap-3 items-center">
            <p className="font-semibold text-black mb-1">Filter:</p>
            <div className="flex gap-2 flex-wrap">
              <LabelSelect label="Kategori" isError={false} isImportant={false} value={categoryFilter} onChange={handleCategoryFilterChange}>
                <option value="">Semua</option>
                {menuCategoryData &&
                  !menuCategoryPending &&
                  menuCategoryData.map((item: MenuCategory) => {
                    return (
                      <option key={item.id} value={item.name.toLowerCase()}>
                        {item.name}
                      </option>
                    );
                  })}
              </LabelSelect>
              <LabelRupiahInput label="Harga minimum" isError={false} isImportant={false} value={minPriceFilter} onChange={handleMinPriceFilterChange} />
              <LabelRupiahInput label="Harga maksimum" isError={false} isImportant={false} value={maxPriceFilter} onChange={handleMaxPriceFilterChange} />
            </div>
          </div>
          <Button className="bg-customOrange py-2 px-3 text-sm font-semibold hover:bg-customDarkOrange text-gray-100 text-nowrap" onClick={handleFilter}>
            Gunakan filter
          </Button>
        </div>
      </div>
    </div>
  );
}
