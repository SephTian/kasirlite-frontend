export type Menu = {
  id: number;
  image: string;
  name: string;
  menuType: string;
  menuTypeId: string;
  price: number;
  discount: number;
  disabled: boolean;
};

export type MenuCart = {
  menu: Omit<Menu, 'disabled'>;
  quantity: number;
  // additional: menu[];
};
