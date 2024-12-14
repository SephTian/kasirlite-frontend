export type Menu = {
  id: number;
  image: string; //no
  name: string;
  menuType: string; //no
  menuTypeId: string; //no
  price: number;
  discount: number;
  disabled: boolean; //no
};

export type MenuCart = {
  menu: Omit<Menu, 'disabled' | 'menuType' | 'menuTypeId' | 'image'>;
  quantity: number;
  // additional: menu[];
};
