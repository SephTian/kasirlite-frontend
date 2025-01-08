import { MenuType } from './menuType';

export type Menu = {
  id: number;
  image: string;
  name: string;
  menuType: MenuType;
  price: number;
  discount: number;
  disabled: boolean;
};

export type MenuCart = {
  menu: Omit<Menu, 'disabled' | 'menuType' | 'menuTypeId'>;
  quantity: number;
};

// additional: menu[];
