'use client';
import MenuCard from '@/components/order-cart/menu-card';
import MenuTypeFilter from './menu-type-filter';
import { Input } from '@/components/ui/input';
import { menu } from '@/lib/types';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { ChangeEvent, Dispatch, SetStateAction, useCallback, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/lib/states';
import { addCartItem, setSelectedMenu } from '@/lib/states/slices/cartSlice';

type Props = {
  menu: menu[];
  setModalType: Dispatch<SetStateAction<'add' | 'edit'>>;
  toggleModal: () => void;
};

export default function OrderMenuList({ menu, setModalType, toggleModal }: Props) {
  const dispatch: AppDispatch = useDispatch();

  const router = useRouter();
  const searchParams = useSearchParams();
  const menuTypeParams = searchParams.get('type')?.toLowerCase() || '';
  const menuKeywordParams = searchParams.get('keyword')?.toLowerCase() || '';

  // create search params
  const createSearchQuery = useCallback(
    (key: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(key, value);
      return params.toString();
    },
    [searchParams]
  );

  // Set keyword params on URL
  const handleKeyword = (e: ChangeEvent<HTMLInputElement>) => {
    router.replace(`?${createSearchQuery('keyword', e.target.value)}`, { scroll: false });
  };

  // Add cart to
  const handleAddCart = (inputMenu: Omit<menu, 'disabled'>) => {
    dispatch(setSelectedMenu({ menu: inputMenu, quantity: 1 }));
    dispatch(addCartItem(inputMenu));
    setModalType('add');
    toggleModal();
  };

  // Getting type from item data
  const menuTypes: string[] = useMemo(() => {
    return menu?.reduce<string[]>((types, item) => {
      if (!types.includes(item.menuType)) {
        types.push(item.menuType);
      }
      return types;
    }, []);
  }, [menu]);

  // Filtering item with type and keyword
  const filteredItem = menu.filter((item) => {
    return item.menuType.toLowerCase().includes(menuTypeParams) && item.name.toLowerCase().includes(menuKeywordParams);
  });

  return (
    <div className="space-y-4 p-6 h-full rounded-md bg-white shadow-lg">
      <div className="rounded-md space-y-1 w-full">
        <Input onChange={handleKeyword} value={menuKeywordParams} className="w-full border-2 border-customOrange bg-gray-100" type="text" placeholder="Cari makanan...." id="searchItem" />
      </div>
      <MenuTypeFilter menuTypes={menuTypes} selectedType={menuTypeParams} createSearchQuery={createSearchQuery} />
      <div className="space-y-4">
        <h1 className="font-semibold">Daftar makanan:</h1>
        <div className="grid grid-cols-3 lg:grid-cols-5 gap-3">
          {filteredItem.map((item) => {
            return <MenuCard onClick={handleAddCart} key={item.id} {...item} />;
          })}
        </div>
      </div>
    </div>
  );
}
