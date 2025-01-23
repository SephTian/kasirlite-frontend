import { Menu, MenuCart } from '@/lib/types';
import MenuCard from './menu-card';

type Props = {
  menus: Omit<Menu[], 'menuCategoryId'>;
  onOpenAddCartModal?: (param: MenuCart['menu']) => void;
};

function MenuList({ menus, onOpenAddCartModal }: Props) {
  if (menus.length === 0) {
    return <p>menu tidak ada</p>;
  }
  return (
    <div className="h-fit w-full grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
      {menus.map((item: Menu) => {
        return <MenuCard onOpenAddCartModal={onOpenAddCartModal} key={item.id} {...item} />;
      })}
    </div>
  );
}

export default MenuList;
