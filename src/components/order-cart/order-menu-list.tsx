'use client';
import MenuCard from '@/components/order-cart/menu-card';
import MenuTypeFilter from './menu-type-filter';
import { Input } from '@/components/ui/input';
import { menu, menuCart } from '@/lib/types';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { ChangeEvent, Dispatch, SetStateAction, useCallback, useMemo } from 'react';

type Props = {
  menu: menu[];
  setCart: Dispatch<SetStateAction<menuCart[]>>;
  handleAddModal: (param: number) => void;
  cart: menuCart[];
};

export default function OrderMenuList({ menu, cart, setCart, handleAddModal }: Props) {
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

  const handleAddCart = (param: Omit<menu, 'isAdditional' | 'disabled'>) => {
    handleAddModal(param.id);
    let isInCart = false;
    const currentCart = cart.map((item) => {
      // Checking if item in cart, so the quantity will be incremented
      if (item.menu.id === param.id) {
        isInCart = true;
        return { ...item, quantity: item.quantity + 1 };
      }
      return item;
    });

    // If item not in cart then we add new item
    if (!isInCart) {
      const object: menuCart = {
        menu: param,
        quantity: 1,
        additional: [],
      };
      setCart((prev) => [...prev, object]);
      return;
    }

    setCart(currentCart);
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
