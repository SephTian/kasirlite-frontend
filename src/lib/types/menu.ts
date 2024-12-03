export type menu = {
  id: number;
  image: string;
  name: string;
  menuType: string;
  menuTypeId: string;
  price: number;
  discount: number;
  disabled: boolean;
};

export type menuCart = {
  menu: Omit<menu, 'disabled'>;
  quantity: number;
  // additional: menu[];
};
