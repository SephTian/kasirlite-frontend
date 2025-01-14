import { MenuCategory } from './menuCategory';

export type Menu = {
  id: number;
  image: string;
  name: string;
  menuCategory: MenuCategory;
  price: number;
  discount: number;
  disabled: boolean;
};

export type MenuCart = {
  menu: Omit<Menu, 'disabled' | 'menuCategory'>;
  quantity: number;
};

// additional: menu[];
