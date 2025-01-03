'use client';
import MenuCard from '@/components/order-cart/menu-card';
import MenuTypeFilter from './menu-type-filter';
import { Menu, MenuCart } from '@/lib/types';
import { useSearchParams } from 'next/navigation';
import { Dispatch, SetStateAction, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/lib/states';
import { setSelectedMenu } from '@/lib/states/slices/cartSlice';
import MenuQueryFilter from './menu-query-filter';

type Props = {
  menu: Menu[];
  setModalType: Dispatch<SetStateAction<'add' | 'edit'>>;
  toggleModal: () => void;
};

export default function OrderMenu({ menu, setModalType, toggleModal }: Props) {
  const dispatch: AppDispatch = useDispatch();
  const searchParams = useSearchParams();
  const menuTypeParams = searchParams.get('type')?.toLowerCase() || '';
  const menuKeywordParams = searchParams.get('keyword')?.toLowerCase() || '';

  // Add cart to
  const handleAddCart = (inputMenu: MenuCart['menu']) => {
    dispatch(setSelectedMenu({ menu: inputMenu, quantity: 1, menuIndex: null }));
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
    <>
      <MenuQueryFilter />
      <MenuTypeFilter menuTypes={menuTypes} selectedType={menuTypeParams} />
      <h1 className="font-semibold">Daftar makanan:</h1>
      <div className="w-full p-1 min-h-0 flex-auto overflow-y-scroll">
        <div className="h-fit w-full grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {filteredItem.map((item) => {
            return <MenuCard onAddCart={handleAddCart} key={item.id} {...item} />;
          })}
          {filteredItem.map((item) => {
            return <MenuCard onAddCart={handleAddCart} key={item.id} {...item} />;
          })}
          {filteredItem.map((item) => {
            return <MenuCard onAddCart={handleAddCart} key={item.id} {...item} />;
          })}
          {filteredItem.map((item) => {
            return <MenuCard onAddCart={handleAddCart} key={item.id} {...item} />;
          })}
        </div>
      </div>
    </>
  );
}
