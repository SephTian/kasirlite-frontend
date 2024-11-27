export type menu = {
  id: number;
  image: string;
  name: string;
  menuType: string;
  menuTypeId: string;
  hasAdditional: boolean;
  isAdditional: boolean;
  price: number;
  discount: number;
  disabled: boolean;
};

export type menuCart = {
  menu: Omit<menu, 'isAdditional' | 'disabled'>;
  quantity: number;
  additional: menu[];
};
