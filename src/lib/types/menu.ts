import { MenuCategory } from './menuCategory';

export type Menu = {
  id: number | bigint;
  menuCategoryId: number;
  image?: string | null;
  name: string;
  menuCategory: MenuCategory;
  price: number;
  discount: number;
  disabled: boolean;
};

export type MenuCart = {
  menu: Omit<Menu, 'disabled' | 'menuCategory' | 'menuCategoryId' | 'id'> & {
    id?: number | null;
  };
  subPrice: number;
  quantity: number;
};
